// Builds API URL routing through the PHP proxy on Hostinger
// Avoids Mixed Content (HTTPS front → HTTP VPS)
const BASE = process.env.REACT_APP_API_URL || '';

export const apiUrl = (path) =>
  process.env.NODE_ENV === 'production'
    ? `${BASE}/api-proxy.php?path=${encodeURIComponent(path)}`
    : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${path}`;
