// backend/services/mlService.js
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Path to model
const MODEL_PATH = process.env.MODEL_PATH || './model';
let model = null;

/**
 * Load the TensorFlow.js model
 * @returns {Promise<tf.LayersModel>} Loaded model
 */
const loadModel = async () => {
  try {
    if (model) {
      return model;
    }
    
    // Create model directory if it doesn't exist
    try {
      await fs.mkdir(MODEL_PATH, { recursive: true });
    } catch (err) {
      console.log('Model directory already exists or could not be created:', err.message);
    }
    
    // Check if model exists
    const modelPath = path.join(MODEL_PATH, 'model.json');
    try {
      await fs.access(modelPath);
      console.log('Loading model from:', modelPath);
      model = await tf.loadLayersModel(`file://${modelPath}`);
      
      // Warm up the model
      const dummyInput = tf.zeros([1, 224, 224, 3]);
      model.predict(dummyInput);
      dummyInput.dispose();
      
      console.log('Model loaded successfully');
      return model;
    } catch (err) {
      console.error('Model not found, using mock model for development:', err.message);
      
      // Create a simple mock model for development
      model = await createMockModel();
      return model;
    }
  } catch (error) {
    console.error('Error loading model:', error);
    throw new Error('Failed to load model');
  }
};

/**
 * Create a mock model for development
 * @returns {Object} Mock model
 */
const createMockModel = async () => {
  console.log('Creating mock model for development');
  
  // This is a simple mock model that returns random predictions
  // In a real app, this would be replaced with the actual model
  return {
    predict: (tensor) => {
      // Mock classes
      const classes = ['early_blight', 'late_blight', 'leaf_mold', 'septoria_leaf_spot', 'healthy'];
      
      // Generate random probabilities
      const randomIndex = Math.floor(Math.random() * classes.length);
      
      // Return mock prediction
      const mockPrediction = tf.tidy(() => {
        const output = tf.zeros([1, classes.length]);
        const values = output.dataSync();
        values[randomIndex] = 0.7 + Math.random() * 0.25; // Random value between 0.7 and 0.95
        
        // Fill in other values with smaller random numbers
        for (let i = 0; i < values.length; i++) {
          if (i !== randomIndex) {
            values[i] = Math.random() * 0.2;
          }
        }
        
        return tf.tensor(values, [1, classes.length]);
      });
      
      return mockPrediction;
    },
    
    // Class labels for the mock model
    classNames: ['early_blight', 'late_blight', 'leaf_mold', 'septoria_leaf_spot', 'healthy']
  };
};

/**
 * Preprocess image for model
 * @param {string} imagePath - Path to image file
 * @returns {Promise<tf.Tensor>} Preprocessed image tensor
 */
const preprocessImage = async (imagePath) => {
  try {
    // Read image
    const imageBuffer = await fs.readFile(imagePath);
    
    // Resize and normalize image
    const processedImage = await sharp(imageBuffer)
      .resize(224, 224) // Standard input size for many models
      .toBuffer();
    
    // Convert to tensor
    const tensor = tf.node.decodeImage(processedImage, 3);
    
    // Expand dimensions to match model input shape [1, 224, 224, 3]
    const expandedTensor = tensor.expandDims(0);
    
    // Normalize pixel values to 0-1
    const normalizedTensor = expandedTensor.div(tf.scalar(255));
    
    // Clean up
    tensor.dispose();
    
    return normalizedTensor;
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw new Error('Failed to preprocess image');
  }
};

/**
 * Get class prediction from tensor
 * @param {tf.Tensor} predictionTensor - Model prediction tensor
 * @returns {Object} Prediction with class and confidence
 */
const getClassPrediction = (predictionTensor) => {
  // Get prediction data as array
  const predictions = predictionTensor.dataSync();
  
  // Find index with highest probability
  let maxProb = 0;
  let predictedClass = 0;
  
  for (let i = 0; i < predictions.length; i++) {
    if (predictions[i] > maxProb) {
      maxProb = predictions[i];
      predictedClass = i;
    }
  }
  
  // Get class names (would be loaded from model metadata in a real app)
  // For mock model: ["early_blight", "late_blight", "leaf_mold", "septoria_leaf_spot", "healthy"]
  const classNames = model.classNames || [
    'early_blight',
    'late_blight',
    'leaf_mold',
    'septoria_leaf_spot',
    'healthy'
  ];
  
  return {
    class: classNames[predictedClass],
    confidence: maxProb,
  };
};

/**
 * Predict disease from image
 * @param {string} imagePath - Path to image file
 * @returns {Promise<Object>} Prediction with class and confidence
 */
const predictImage = async (imagePath) => {
  try {
    // Load model if not already loaded
    const loadedModel = await loadModel();
    
    // Preprocess image
    const imageTensor = await preprocessImage(imagePath);
    
    // Predict
    const prediction = loadedModel.predict(imageTensor);
    
    // Get class prediction
    const result = getClassPrediction(prediction);
    
    // Clean up tensors
    imageTensor.dispose();
    prediction.dispose();
    
    return result;
  } catch (error) {
    console.error('Error predicting image:', error);
    throw new Error('Failed to predict image');
  }
};

module.exports = {
  loadModel,
  predictImage,
};