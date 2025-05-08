// backend/controllers/imageController.js
const path = require('path');
const fs = require('fs');

/**
 * Handle image upload
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const uploadImage = (req, res) => {
  try {
    // File is already uploaded by middleware
    const file = req.file;
    
    // Create response with file info
    res.status(200).json({
      status: 'success',
      message: 'File berhasil diunggah',
      data: {
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
        url: `/uploads/${file.filename}`,
      },
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat mengunggah gambar',
    });
  }
};

/**
 * Get image by ID (filename)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getImageById = (req, res) => {
  try {
    const imageId = req.params.id;
    const uploadDir = process.env.UPLOAD_PATH || './uploads';
    const imagePath = path.join(uploadDir, imageId);
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({
        status: 'error',
        message: 'Gambar tidak ditemukan',
      });
    }
    
    // Send file
    res.sendFile(imagePath, { root: './' });
  } catch (error) {
    console.error('Error getting image:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat mengambil gambar',
    });
  }
};

module.exports = {
  uploadImage,
  getImageById,
};