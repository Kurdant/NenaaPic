<?php
// Proxy API calls to VPS backend (bypasses Mixed Content restriction)
$VPS_URL = 'http://185.216.26.204';

$path = $_GET['path'] ?? '/api/gallery';

// Build target URL
$query = $_GET;
unset($query['path']);
$url = $VPS_URL . $path;
if (!empty($query)) {
    $url .= '?' . http_build_query($query);
}

// Forward relevant headers
$headers = [];
$incoming = getallheaders();
foreach ($incoming as $name => $value) {
    $lower = strtolower($name);
    if (in_array($lower, ['x-api-password', 'content-type', 'authorization'])) {
        $headers[] = "$name: $value";
    }
}

$method = $_SERVER['REQUEST_METHOD'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'])) {
    $body = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Proxy error: ' . $error]);
    exit;
}

http_response_code($httpCode);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, x-api-password, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

echo $response;
