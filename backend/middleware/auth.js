const jwt = require('jsonwebtoken');
require('dotenv').config();
const logger = require('../utils/logger');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      logger.warn('No token provided for protected route', {
        url: req.url,
        method: req.method,
        ip: req.ip
      });
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    logger.info('User authenticated successfully', {
      userId: decoded.id,
      url: req.url,
      method: req.method
    });
    
    next();
  } catch (err) {
    logger.warn('Invalid token', {
      error: err.message,
      url: req.url,
      method: req.method,
      ip: req.ip
    });
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;