// backend/routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middleware/upload');
const imageController = require('../controllers/imageController');

// Upload image route
router.post('/upload', uploadMiddleware, imageController.uploadImage);

// Get image by id
router.get('/images/:id', imageController.getImageById);

module.exports = router;