const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const logger = require('../utils/logger');
const { registerValidation, loginValidation, validate } = require('../middleware/validation');

const router = express.Router();

// Register user
router.post('/register', registerValidation, validate, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    logger.info('User registration attempt', { email });
    
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      logger.warn('Registration failed: User already exists', { email });
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user
    const user = await User.create({ name, email, password });
    logger.info('User registered successfully', { userId: user.id, email });
    
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    logger.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', loginValidation, validate, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    logger.info('User login attempt', { email });
    
    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      logger.warn('Login failed: User not found', { email });
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn('Login failed: Invalid password', { email });
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    logger.info('User logged in successfully', { userId: user.id, email });
    
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    logger.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    logger.info('Fetching user profile', { userId: req.user.id });
    
    // User is attached to req by auth middleware
    const user = await User.findById(req.user.id);
    if (!user) {
      logger.warn('User profile not found', { userId: req.user.id });
      return res.status(404).json({ message: 'User not found' });
    }
    
    logger.info('User profile fetched successfully', { userId: user.id });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at
    });
  } catch (err) {
    logger.error('Profile fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;