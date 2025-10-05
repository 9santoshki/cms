const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const logger = require('../utils/logger');
const { productValidation, validate } = require('../middleware/validation');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    logger.info('Fetching all products');
    const products = await Product.findAll();
    logger.info('Products fetched successfully', { count: products.length });
    res.json(products);
  } catch (err) {
    logger.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      logger.warn('Invalid product ID requested', { productId: req.params.id });
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    
    logger.info('Fetching product by ID', { productId: id });
    const product = await Product.findById(id);
    if (!product) {
      logger.warn('Product not found', { productId: id });
      return res.status(404).json({ message: 'Product not found' });
    }
    
    logger.info('Product fetched successfully', { productId: product.id });
    res.json(product);
  } catch (err) {
    logger.error('Error fetching product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product (admin only)
router.post('/', auth, productValidation, validate, async (req, res) => {
  try {
    logger.info('Creating new product', { userId: req.user.id });
    
    // In a real app, you would check if user is admin
    const product = await Product.create(req.body);
    logger.info('Product created successfully', { productId: product.id, userId: req.user.id });
    res.status(201).json(product);
  } catch (err) {
    logger.error('Error creating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (admin only)
router.put('/:id', auth, productValidation, validate, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      logger.warn('Invalid product ID for update', { productId: req.params.id, userId: req.user.id });
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    
    logger.info('Updating product', { productId: id, userId: req.user.id });
    
    // In a real app, you would check if user is admin
    const product = await Product.update(id, req.body);
    if (!product) {
      logger.warn('Product update failed: Product not found', { productId: id, userId: req.user.id });
      return res.status(404).json({ message: 'Product not found' });
    }
    
    logger.info('Product updated successfully', { productId: product.id, userId: req.user.id });
    res.json(product);
  } catch (err) {
    logger.error('Error updating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      logger.warn('Invalid product ID for deletion', { productId: req.params.id, userId: req.user.id });
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    
    logger.info('Deleting product', { productId: id, userId: req.user.id });
    
    // In a real app, you would check if user is admin
    const product = await Product.delete(id);
    if (!product) {
      logger.warn('Product deletion failed: Product not found', { productId: id, userId: req.user.id });
      return res.status(404).json({ message: 'Product not found' });
    }
    
    logger.info('Product deleted successfully', { productId: id, userId: req.user.id });
    res.json({ message: 'Product removed' });
  } catch (err) {
    logger.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;