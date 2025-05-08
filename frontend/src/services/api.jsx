// src/services/api.js
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - can be used to add auth token, etc.
api.interceptors.request.use(
  (config) => {
    // You can modify request config here
    // Example: add auth token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
      
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - handle auth errors
          console.error('Unauthorized request');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          break;
      }
    } else if (error.request) {
      // No response received
      console.error('No response received from server');
    } else {
      // Error in request setup
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API functions

/**
 * Upload image for disease detection
 * @param {FormData} formData - Form data with 'image' field
 * @returns {Promise} - Response from API
 */
export const uploadImage = (formData) => {
  // Override default headers for file upload
  return api.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Get disease information by ID
 * @param {string} diseaseId - Disease ID
 * @returns {Promise} - Response from API
 */
export const getDiseaseInfo = (diseaseId) => {
  return api.get(`/diseases/${diseaseId}`);
};

/**
 * Get all diseases
 * @returns {Promise} - Response from API
 */
export const getAllDiseases = () => {
  return api.get('/diseases');
};

export default api;