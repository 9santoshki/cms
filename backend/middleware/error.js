const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('Unhandled error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      error: err.message,
      details: err.errors || []
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Unauthorized',
      error: err.message
    });
  }
  
  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      message: 'Not Found',
      error: err.message
    });
  }
  
  // Handle database errors
  if (err.code === '23505') { // Unique violation
    return res.status(400).json({
      message: 'Duplicate Entry',
      error: 'This record already exists'
    });
  }
  
  if (err.code === '23503') { // Foreign key violation
    return res.status(400).json({
      message: 'Invalid Reference',
      error: 'Referenced record does not exist'
    });
  }
  
  if (err.code === '23514') { // Check constraint violation
    return res.status(400).json({
      message: 'Constraint Violation',
      error: 'Data does not meet required constraints'
    });
  }
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid Token',
      error: 'Your session is invalid. Please log in again.'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token Expired',
      error: 'Your session has expired. Please log in again.'
    });
  }
  
  // Handle database connection errors
  if (err.code === 'ECONNREFUSED') {
    logger.error('Database connection refused:', err);
    return res.status(503).json({
      message: 'Service Unavailable',
      error: 'Database connection failed. Please try again later.'
    });
  }
  
  // Handle network errors
  if (err.code === 'ENOTFOUND' || err.code === 'EAI_AGAIN') {
    logger.error('Network error:', err);
    return res.status(503).json({
      message: 'Service Unavailable',
      error: 'Network connection failed. Please check your connection and try again.'
    });
  }
  
  // Default error response
  res.status(500).json({
    message: 'Server Error',
    error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
};

module.exports = errorHandler;