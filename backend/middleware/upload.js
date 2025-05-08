// backend/middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_PATH || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + extension);
  },
});

// File filter for image types
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File harus berupa gambar (JPEG, PNG, JPG)'), false);
  }
};

// Set file size limit - default 5MB
const maxSize = parseInt(process.env.UPLOAD_LIMIT || 5) * 1024 * 1024;

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: maxSize,
  },
});

// Export middleware function
const uploadMiddleware = (req, res, next) => {
  // Single file upload with field name 'image'
  const uploadSingle = upload.single('image');
  
  uploadSingle(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // Multer error (like file size exceeded)
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            status: 'error',
            message: `Ukuran file terlalu besar, maksimal ${process.env.UPLOAD_LIMIT || 5}MB`,
          });
        }
        return res.status(400).json({
          status: 'error',
          message: err.message,
        });
      }
      
      // Other errors
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
    
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Silakan unggah file gambar',
      });
    }
    
    // Continue to next middleware
    next();
  });
};

module.exports = uploadMiddleware;