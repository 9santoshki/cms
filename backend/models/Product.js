const db = require('../config/db');
const logger = require('../utils/logger');

const Product = {
  // Get all products
  async findAll() {
    logger.debug('Fetching all products');
    
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    
    try {
      const result = await db.query(query);
      logger.debug('Products fetched successfully', { count: result.rows.length });
      return result.rows;
    } catch (err) {
      logger.error('Error fetching products:', err);
      throw err;
    }
  },
  
  // Get product by ID
  async findById(id) {
    logger.debug('Fetching product by ID', { productId: id });
    
    const query = 'SELECT * FROM products WHERE id = $1';
    
    try {
      const result = await db.query(query, [id]);
      if (result.rows.length > 0) {
        logger.debug('Product found by ID', { productId: id });
      } else {
        logger.debug('Product not found by ID', { productId: id });
      }
      return result.rows[0];
    } catch (err) {
      logger.error('Error fetching product by ID:', err);
      throw err;
    }
  },
  
  // Create a new product
  async create(productData) {
    const { name, description, price, image_url } = productData;
    
    logger.info('Creating new product', { name });
    
    const query = `
      INSERT INTO products (name, description, price, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [name, description, price, image_url]);
      logger.info('Product created successfully', { productId: result.rows[0].id, name });
      return result.rows[0];
    } catch (err) {
      logger.error('Error creating product:', err);
      throw err;
    }
  },
  
  // Update a product
  async update(id, productData) {
    const { name, description, price, image_url } = productData;
    
    logger.info('Updating product', { productId: id });
    
    const query = `
      UPDATE products 
      SET name = $1, description = $2, price = $3, image_url = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `;
    
    try {
      const result = await db.query(query, [name, description, price, image_url, id]);
      if (result.rows.length > 0) {
        logger.info('Product updated successfully', { productId: result.rows[0].id });
      } else {
        logger.warn('Product not found for update', { productId: id });
      }
      return result.rows[0];
    } catch (err) {
      logger.error('Error updating product:', err);
      throw err;
    }
  },
  
  // Delete a product
  async delete(id) {
    logger.info('Deleting product', { productId: id });
    
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    
    try {
      const result = await db.query(query, [id]);
      if (result.rows.length > 0) {
        logger.info('Product deleted successfully', { productId: result.rows[0].id });
      } else {
        logger.warn('Product not found for deletion', { productId: id });
      }
      return result.rows[0];
    } catch (err) {
      logger.error('Error deleting product:', err);
      throw err;
    }
  }
};

module.exports = Product;