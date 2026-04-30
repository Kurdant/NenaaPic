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

// Create default category folders
const defaultCategories = [
  'portfolio/mariages',
  'portfolio/portraits',
  'portfolio/couples',
  'portfolio/entreprise',
  'services',
  'header',
  'footer'
];

defaultCategories.forEach(category => {
  const categoryPath = path.join(UPLOAD_DIR, category);
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath, { recursive: true });
  }
});

// Middleware - CORS DOIT ÊTRE EN PREMIER ⚠️
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://nenaa-pic.kurdant.fr'], // 👈 Origines autorisées
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-password', 'Authorization'],
  credentials: true // 👈 Changé de false à true pour les headers personnalisés
}));

// 👇 Gestion explicite des requêtes OPTIONS (preflight)
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // 👈 Ajouté "extended: true"

// Serve static files from uploads
app.use('/api/uploads', express.static(UPLOAD_DIR));

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

// Upload image endpoint with category support
app.post('/api/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { category, filename } = req.body;

    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    // Validate category path to prevent directory traversal
    const validatedCategory = category.replace(/\.\./g, '').replace(/^\//, '');
    const categoryPath = path.join(UPLOAD_DIR, validatedCategory);

    // Ensure category path is within UPLOAD_DIR
    if (!categoryPath.startsWith(UPLOAD_DIR)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Create category folder if it doesn't exist
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    // Generate filename with user-provided name or timestamp
    const fileExt = '.webp';
    const baseName = filename ? filename.replace(/\W/g, '-').toLowerCase() : `image-${Date.now()}`;
    let finalFilename = `${baseName}${fileExt}`;
    let filepath = path.join(categoryPath, finalFilename);

    // Handle duplicate filenames
    let counter = 1;
    while (fs.existsSync(filepath)) {
      finalFilename = `${baseName}-${counter}${fileExt}`;
      filepath = path.join(categoryPath, finalFilename);
      counter++;
    }

    // Optimize and convert to WebP
    await sharp(req.file.buffer)
      .resize(1920, 1440, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(filepath);

    const publicUrl = `/api/uploads/${validatedCategory}/${finalFilename}`;

    res.json({
      success: true,
      message: 'Image uploaded and optimized successfully',
      url: publicUrl,
      filename: finalFilename,
      category: validatedCategory,
      size: fs.statSync(filepath).size
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get list of images in a category
app.get('/api/uploads/:category(*)', (req, res) => {
  try {
    const { category } = req.params;

    // Validate category path
    const validatedCategory = category.replace(/\.\./g, '').replace(/^\//, '');
    const categoryPath = path.join(UPLOAD_DIR, validatedCategory);

    // Ensure category path is within UPLOAD_DIR
    if (!categoryPath.startsWith(UPLOAD_DIR)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    if (!fs.existsSync(categoryPath)) {
      return res.json([]);
    }

    const files = fs.readdirSync(categoryPath);
    const images = files.filter(file => {
      const filePath = path.join(categoryPath, file);
      return fs.statSync(filePath).isFile();
    });

    res.json(images);
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete image endpoint
app.delete('/api/delete', authenticate, (req, res) => {
  try {
    const { category, filename } = req.body;

    if (!category || !filename) {
      return res.status(400).json({ error: 'Category and filename are required' });
    }

    // Validate paths
    const validatedCategory = category.replace(/\.\./g, '').replace(/^\//, '');
    const validatedFilename = filename.replace(/\.\./g, '').replace(/^\//, '');
    const filepath = path.join(UPLOAD_DIR, validatedCategory, validatedFilename);

    // Security: ensure the file is in the uploads directory
    if (!filepath.startsWith(UPLOAD_DIR)) {
      return res.status(400).json({ error: 'Invalid path' });
    }

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(filepath);
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all images (admin list)
app.get('/api/images', authenticate, (req, res) => {
  try {
    const images = [];

    const walkDir = (dir, prefix = '') => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          walkDir(filePath, prefix ? `${prefix}/${file}` : file);
        } else {
          images.push({
            filename: file,
            category: prefix || 'root',
            url: `/api/uploads/${prefix ? prefix + '/' : ''}${file}`,
            size: stat.size,
            uploadedAt: stat.mtime
          });
        }
      });
    };

    walkDir(UPLOAD_DIR);

    res.json({
      success: true,
      count: images.length,
      images
    });
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
  console.log('Default categories created');
  console.log('CORS enabled for:', ['http://localhost:3000', 'http://localhost:5173', 'https://nenaa-pic.kurdant.fr']);
});
