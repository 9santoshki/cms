const db = require('../config/db');
const logger = require('../utils/logger');

const Cart = {
  // Get cart items for a user
  async getCartItems(userId) {
    logger.debug('Fetching cart items for user', { userId });
    
    const query = `
      SELECT c.*, p.name, p.price, p.image_url
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
    `;
    
    try {
      const result = await db.query(query, [userId]);
      logger.debug('Cart items fetched successfully', { userId, count: result.rows.length });
      return result.rows;
    } catch (err) {
      logger.error('Error fetching cart items:', err);
      throw err;
    }
  },
  
  // Add item to cart
  async addItem(userId, productId, quantity) {
    logger.info('Adding item to cart', { userId, productId, quantity });
    
    // Check if item already exists in cart
    const checkQuery = 'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2';
    
    try {
      const checkResult = await db.query(checkQuery, [userId, productId]);
      
      if (checkResult.rows.length > 0) {
        // Update quantity if item exists
        const updateQuery = `
          UPDATE cart_items 
          SET quantity = quantity + $1, updated_at = NOW()
          WHERE user_id = $2 AND product_id = $3
          RETURNING *
        `;
        const result = await db.query(updateQuery, [quantity, userId, productId]);
        logger.info('Cart item quantity updated', { userId, productId, newQuantity: result.rows[0].quantity });
        return result.rows[0];
      } else {
        // Add new item to cart
        const insertQuery = `
          INSERT INTO cart_items (user_id, product_id, quantity)
          VALUES ($1, $2, $3)
          RETURNING *
        `;
        const result = await db.query(insertQuery, [userId, productId, quantity]);
        logger.info('Item added to cart successfully', { userId, productId, cartItemId: result.rows[0].id });
        return result.rows[0];
      }
    } catch (err) {
      logger.error('Error adding item to cart:', err);
      throw err;
    }
  },
  
  // Update item quantity in cart
  async updateItem(userId, productId, quantity) {
    logger.info('Updating cart item quantity', { userId, productId, quantity });
    
    const query = `
      UPDATE cart_items 
      SET quantity = $1, updated_at = NOW()
      WHERE user_id = $2 AND product_id = $3
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [quantity, userId, productId]);
      if (result.rows.length > 0) {
        logger.info('Cart item quantity updated successfully', { userId, productId, newQuantity: result.rows[0].quantity });
      } else {
        logger.warn('Cart item not found for update', { userId, productId });
      }
      return result.rows[0];
    } catch (err) {
      logger.error('Error updating cart item:', err);
      throw err;
    }
  },
  
  // Remove item from cart
  async removeItem(userId, productId) {
    logger.info('Removing item from cart', { userId, productId });
    
    const query = 'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2 RETURNING *';
    
    try {
      const result = await db.query(query, [userId, productId]);
      if (result.rows.length > 0) {
        logger.info('Item removed from cart successfully', { userId, productId });
      } else {
        logger.warn('Cart item not found for removal', { userId, productId });
      }
      return result.rows[0];
    } catch (err) {
      logger.error('Error removing item from cart:', err);
      throw err;
    }
  },
  
  // Clear cart
  async clearCart(userId) {
    logger.info('Clearing cart', { userId });
    
    const query = 'DELETE FROM cart_items WHERE user_id = $1';
    
    try {
      await db.query(query, [userId]);
      logger.info('Cart cleared successfully', { userId });
    } catch (err) {
      logger.error('Error clearing cart:', err);
      throw err;
    }
  }
};

module.exports = Cart;