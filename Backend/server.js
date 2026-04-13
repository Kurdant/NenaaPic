const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
const API_PASSWORD = process.env.API_PASSWORD || 'nenaapic1234';
const GALLERY_FILE = path.join(__dirname, 'gallery.json');
const ADMIN_FILE = path.join(__dirname, 'admin.json');

// JWT secret — set via env var on VPS, fallback for dev only
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
const JWT_EXPIRY = '24h';

// Initialize admin credentials if they don't exist
const initAdmin = () => {
  if (!fs.existsSync(ADMIN_FILE)) {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'NenaaPic2024!';
    const hash = bcrypt.hashSync(defaultPassword, 12);
    const admin = {
      username: process.env.ADMIN_USERNAME || 'nenaapic',
      passwordHash: hash,
      createdAt: new Date().toISOString(),
    };
    fs.writeFileSync(ADMIN_FILE, JSON.stringify(admin, null, 2));
    console.log('✅ Admin account created (username:', admin.username, ')');
  }
};
initAdmin();

// Initialize gallery.json if it doesn't exist
if (!fs.existsSync(GALLERY_FILE)) {
  fs.writeFileSync(GALLERY_FILE, JSON.stringify([], null, 2));
}

// Helper: extract Google Drive file ID and build direct URL
const cleanDriveUrl = (rawUrl) => {
  const match = rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return {
    fileId: match[1],
    directUrl: `https://drive.google.com/uc?export=view&id=${match[1]}`,
    thumbnailUrl: `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`,
  };
};

const readGallery = () => {
  try {
    return JSON.parse(fs.readFileSync(GALLERY_FILE, 'utf-8'));
  } catch {
    return [];
  }
};

const writeGallery = (data) => {
  fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2));
};

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
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://nenaapic-test.kurdant.fr',
    'https://nenaapic-test.kurdant.fr',
    'https://nenaa-pic.kurdant.fr',
    'http://185.216.26.204',
    'http://185.216.26.204:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-password', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting — anti-bruteforce on login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: { error: 'Trop de tentatives de connexion. Réessaie dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Serve static files from uploads
app.use('/api/uploads', express.static(UPLOAD_DIR));

// ========== AUTH SYSTEM (JWT) ==========

// JWT middleware — verifies Bearer token
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  try {
    req.admin = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};

// POST /api/auth/login
app.post('/api/auth/login', loginLimiter, (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Identifiant et mot de passe requis' });
    }

    const cleanUser = username.trim().substring(0, 50);
    const cleanPass = password.substring(0, 128);

    if (!fs.existsSync(ADMIN_FILE)) {
      return res.status(500).json({ error: 'Admin not configured' });
    }

    const admin = JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf-8'));

    // Constant-time username comparison (prevents timing attacks)
    const usernameMatch = cleanUser.length === admin.username.length &&
      crypto.timingSafeEqual(Buffer.from(cleanUser), Buffer.from(admin.username));

    if (!usernameMatch || !bcrypt.compareSync(cleanPass, admin.passwordHash)) {
      return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { username: admin.username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    res.json({ success: true, token, expiresIn: JWT_EXPIRY, username: admin.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/auth/verify
app.get('/api/auth/verify', authenticateJWT, (req, res) => {
  res.json({ success: true, username: req.admin.username });
});

// POST /api/auth/change-password
app.post('/api/auth/change-password', authenticateJWT, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Les deux mots de passe sont requis' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit faire au moins 8 caractères' });
    }

    const admin = JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf-8'));
    if (!bcrypt.compareSync(currentPassword, admin.passwordHash)) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
    }

    admin.passwordHash = bcrypt.hashSync(newPassword, 12);
    admin.updatedAt = new Date().toISOString();
    fs.writeFileSync(ADMIN_FILE, JSON.stringify(admin, null, 2));
    res.json({ success: true, message: 'Mot de passe modifié' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Legacy API password auth (kept for backward compat during transition)
const authenticate = (req, res, next) => {
  // Accept JWT Bearer token OR legacy x-api-password
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      req.admin = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
      return next();
    } catch {
      return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
  }

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

// ========== GALLERY API (Google Drive URLs) ==========

// GET /api/gallery — public, returns all gallery images
app.get('/api/gallery', (req, res) => {
  try {
    const gallery = readGallery();
    res.json({ success: true, count: gallery.length, images: gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/gallery — add one or multiple images (authenticated)
app.post('/api/gallery', authenticate, (req, res) => {
  try {
    const { images } = req.body; // [{ url, title?, category? }]
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'images array is required' });
    }

    const gallery = readGallery();
    const added = [];

    for (const img of images) {
      if (!img.url) continue;
      const cleaned = cleanDriveUrl(img.url);
      if (!cleaned) {
        added.push({ url: img.url, error: 'Invalid Google Drive URL' });
        continue;
      }

      // Check for duplicate
      if (gallery.some(g => g.fileId === cleaned.fileId)) {
        added.push({ url: img.url, error: 'Already exists' });
        continue;
      }

      const entry = {
        id: crypto.randomUUID(),
        fileId: cleaned.fileId,
        directUrl: cleaned.directUrl,
        thumbnailUrl: cleaned.thumbnailUrl,
        originalUrl: img.url,
        title: img.title || '',
        category: img.category || 'portfolio',
        addedAt: new Date().toISOString(),
      };
      gallery.push(entry);
      added.push({ ...entry, status: 'added' });
    }

    writeGallery(gallery);
    res.json({ success: true, added, total: gallery.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/gallery/:id — remove an image by id (authenticated)
app.delete('/api/gallery/:id', authenticate, (req, res) => {
  try {
    const gallery = readGallery();
    const index = gallery.findIndex(g => g.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Image not found' });
    }
    const removed = gallery.splice(index, 1)[0];
    writeGallery(gallery);
    res.json({ success: true, removed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/gallery/:id — update title/category (authenticated)
app.put('/api/gallery/:id', authenticate, (req, res) => {
  try {
    const gallery = readGallery();
    const item = gallery.find(g => g.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Image not found' });
    }
    if (req.body.title !== undefined) item.title = req.body.title;
    if (req.body.category !== undefined) item.category = req.body.category;
    writeGallery(gallery);
    res.json({ success: true, updated: item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Uploads directory: ${UPLOAD_DIR}`);
  console.log('Default categories created');
  console.log('CORS enabled for:', ['http://localhost:3000', 'http://localhost:5173', 'https://nenaa-pic.kurdant.fr']);
});
