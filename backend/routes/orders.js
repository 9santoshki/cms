const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const logger = require('../utils/logger');
const { orderValidation, validate } = require('../middleware/validation');

const router = express.Router();

// Create order
router.post('/', auth, orderValidation, validate, async (req, res) => {
  try {
    logger.info('Creating order', { userId: req.user.id, ...req.body });
    
    const { items, total_amount } = req.body;
    
    const orderData = {
      user_id: req.user.id,
      total_amount,
      items
    };
    
    const order = await Order.create(orderData);
    
    // Clear cart after successful order
    await Cart.clearCart(req.user.id);
    
    logger.info('Order created successfully', { orderId: order.id, userId: req.user.id, totalAmount: total_amount });
    res.status(201).json(order);
  } catch (err) {
    logger.error('Error creating order:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    logger.info('Fetching user orders', { userId: req.user.id });
    const orders = await Order.getUserOrders(req.user.id);
    logger.info('User orders fetched successfully', { userId: req.user.id, count: orders.length });
    res.json(orders);
  } catch (err) {
    logger.error('Error fetching user orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      logger.warn('Invalid order ID requested', { orderId: req.params.id, userId: req.user.id });
      return res.status(400).json({ message: 'Invalid order ID' });
    }
    
    logger.info('Fetching order by ID', { orderId: id, userId: req.user.id });
    const order = await Order.findById(id);
    
    // Check if order belongs to user
    if (!order || order.user_id !== req.user.id) {
      logger.warn('Order not found or unauthorized access', { orderId: id, userId: req.user.id });
      return res.status(404).json({ message: 'Order not found' });
    }
    
    logger.info('Order fetched successfully', { orderId: order.id, userId: req.user.id });
    res.json(order);
  } catch (err) {
    logger.error('Error fetching order:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;