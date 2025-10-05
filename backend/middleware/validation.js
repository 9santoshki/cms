const { body, validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation failed', {
      url: req.url,
      method: req.method,
      errors: errors.array()
    });
    
    // Format errors for better client-side handling
    const formattedErrors = errors.array().map(error => ({
      field: error.param,
      message: error.msg,
      value: error.value
    }));
    
    return res.status(400).json({
      message: 'Validation Error',
      errors: formattedErrors
    });
  }
  next();
};

// Validation rules for user registration
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one digit')
];

// Validation rules for user login
const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for product creation/update
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Product name is required')
    .isLength({ max: 255 })
    .withMessage('Product name must be less than 255 characters'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Product description is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('image_url')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Image URL is required')
];

// Validation rules for cart operations
const cartItemValidation = [
  body('product_id')
    .isInt({ min: 1 })
    .withMessage('Product ID must be a positive integer'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer')
];

// Validation rules for order creation
const orderValidation = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.id')
    .isInt({ min: 1 })
    .withMessage('Each item must have a valid product ID'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Each item must have a valid quantity'),
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('Each item must have a valid price'),
  body('total_amount')
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a positive number')
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  productValidation,
  cartItemValidation,
  orderValidation
};