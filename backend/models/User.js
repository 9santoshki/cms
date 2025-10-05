const db = require('../config/db');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

const User = {
  // Create a new user
  async create(userData) {
    const { name, email, password } = userData;
    
    logger.info('Creating new user', { email });
    
    // Hash password with stronger salt
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;
    
    try {
      const result = await db.query(query, [name, email, hashedPassword]);
      logger.info('User created successfully', { userId: result.rows[0].id, email });
      return result.rows[0];
    } catch (err) {
      logger.error('Error creating user:', err);
      throw err;
    }
  },
  
  // Find user by email
  async findByEmail(email) {
    logger.debug('Finding user by email', { email });
    
    const query = 'SELECT * FROM users WHERE email = $1';
    
    try {
      const result = await db.query(query, [email]);
      if (result.rows.length > 0) {
        logger.debug('User found by email', { email });
      } else {
        logger.debug('User not found by email', { email });
      }
      return result.rows[0];
    } catch (err) {
      logger.error('Error finding user by email:', err);
      throw err;
    }
  },
  
  // Find user by ID
  async findById(id) {
    logger.debug('Finding user by ID', { userId: id });
    
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
    
    try {
      const result = await db.query(query, [id]);
      if (result.rows.length > 0) {
        logger.debug('User found by ID', { userId: id });
      } else {
        logger.debug('User not found by ID', { userId: id });
      }
      return result.rows[0];
    } catch (err) {
      logger.error('Error finding user by ID:', err);
      throw err;
    }
  }
};

module.exports = User;