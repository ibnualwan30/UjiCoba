// backend/routes/predictionRoutes.js
const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middleware/upload');
const predictionController = require('../controllers/predictionController');

// Predict disease from image
router.post('/predict', uploadMiddleware, predictionController.predictDisease);

// Get all supported diseases
router.get('/diseases', predictionController.getAllDiseases);

// Get disease info by id
router.get('/diseases/:id', predictionController.getDiseaseById);

module.exports = router;