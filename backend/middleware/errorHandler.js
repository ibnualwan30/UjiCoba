// backend/middleware/errorHandler.js
/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    // Log error for server-side debugging
    console.error('ERROR:', err);
    
    // Get error details
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Terjadi kesalahan pada server';
    
    // Create error response
    const errorResponse = {
      status: 'error',
      message,
    };
    
    // Add error stack in development mode
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
    }
    
    // Send response
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;