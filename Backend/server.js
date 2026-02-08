const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
const API_PASSWORD = process.env.API_PASSWORD || 'nenaapic1234';

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb' }));

// Serve static files
app.use('/uploads', express.static(UPLOAD_DIR));

// Authentication middleware
const authenticate = (req, res, next) => {
  const password = req.headers['x-api-password'] || req.body.password || req.query.password;
  if (password !== API_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF allowed.'));
    }
  }
});

// Upload image endpoint
app.post('/api/upload', authenticate, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.webp`;
    const filepath = path.join(UPLOAD_DIR, filename);

    // Optimize and convert to WebP
    await sharp(req.file.buffer)
      .resize(1920, 1440, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(filepath);

    const publicUrl = `/uploads/${filename}`;
    const fullPath = filepath;

    res.json({
      success: true,
      message: 'Image uploaded and optimized successfully',
      url: publicUrl,
      filename,
      fullPath,
      size: fs.statSync(filepath).size
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get list of all images
app.get('/api/images', authenticate, (req, res) => {
  try {
    const files = fs.readdirSync(UPLOAD_DIR);
    const images = files.map(filename => ({
      filename,
      url: `/uploads/${filename}`,
      uploadedAt: fs.statSync(path.join(UPLOAD_DIR, filename)).mtime
    }));

    res.json({
      success: true,
      count: images.length,
      images
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete image endpoint
app.delete('/api/images/:filename', authenticate, (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(UPLOAD_DIR, filename);

    // Security: ensure the file is in the uploads directory
    if (!filepath.startsWith(UPLOAD_DIR)) {
      return res.status(400).json({ error: 'Invalid filename' });
    }

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(filepath);
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Uploads directory: ${UPLOAD_DIR}`);
});
