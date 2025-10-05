const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const logger = require('../utils/logger');
const { cartItemValidation, validate } = require('../middleware/validation');

const router = express.Router();

// Get cart items
router.get('/', auth, async (req, res) => {
  try {
    logger.info('Fetching cart items', { userId: req.user.id });
    const cartItems = await Cart.getCartItems(req.user.id);
    logger.info('Cart items fetched successfully', { userId: req.user.id, count: cartItems.length });
    res.json(cartItems);
  } catch (err) {
    logger.error('Error fetching cart items:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to cart
router.post('/add', auth, cartItemValidation, validate, async (req, res) => {
  try {
    logger.info('Adding item to cart', { userId: req.user.id, ...req.body });
    
    const { product_id, quantity } = req.body;
    const cartItem = await Cart.addItem(req.user.id, parseInt(product_id), parseInt(quantity));
    logger.info('Item added to cart successfully', { userId: req.user.id, cartItemId: cartItem.id });
    res.json(cartItem);
  } catch (err) {
    logger.error('Error adding item to cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item
router.put('/update', auth, cartItemValidation, validate, async (req, res) => {
  try {
    logger.info('Updating cart item', { userId: req.user.id, ...req.body });
    
    const { product_id, quantity } = req.body;
    const cartItem = await Cart.updateItem(req.user.id, parseInt(product_id), parseInt(quantity));
    if (!cartItem) {
      logger.warn('Update cart item failed: Item not found', { userId: req.user.id, productId: product_id });
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    logger.info('Cart item updated successfully', { userId: req.user.id, cartItemId: cartItem.id });
    res.json(cartItem);
  } catch (err) {
    logger.error('Error updating cart item:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      logger.warn('Invalid product ID for cart item removal', { userId: req.user.id, productId: req.params.productId });
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    
    logger.info('Removing item from cart', { userId: req.user.id, productId });
    const cartItem = await Cart.removeItem(req.user.id, productId);
    if (!cartItem) {
      logger.warn('Remove cart item failed: Item not found', { userId: req.user.id, productId });
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    logger.info('Cart item removed successfully', { userId: req.user.id, productId });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    logger.error('Error removing item from cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    logger.info('Clearing cart', { userId: req.user.id });
    await Cart.clearCart(req.user.id);
    logger.info('Cart cleared successfully', { userId: req.user.id });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    logger.error('Error clearing cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;