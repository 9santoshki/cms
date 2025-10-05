const db = require('../config/db');
const logger = require('../utils/logger');

const Order = {
  // Create a new order
  async create(orderData) {
    const { user_id, total_amount, items } = orderData;
    
    logger.info('Creating new order', { userId: user_id, totalAmount: total_amount, itemCount: items.length });
    
    try {
      // Insert order
      const orderQuery = `
        INSERT INTO orders (user_id, total_amount)
        VALUES ($1, $2)
        RETURNING *
      `;
      const orderResult = await db.query(orderQuery, [user_id, total_amount]);
      const order = orderResult.rows[0];
      
      // Insert order items
      for (const item of items) {
        const itemQuery = `
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES ($1, $2, $3, $4)
        `;
        await db.query(itemQuery, [order.id, item.id, item.quantity, item.price]);
      }
      
      // Return order with items
      const fullOrderQuery = `
        SELECT o.*, oi.product_id, oi.quantity, oi.price, p.name as product_name
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE o.id = $1
      `;
      const fullOrderResult = await db.query(fullOrderQuery, [order.id]);
      
      logger.info('Order created successfully', { orderId: order.id, userId: user_id });
      
      return {
        ...order,
        items: fullOrderResult.rows
      };
    } catch (error) {
      logger.error('Error creating order:', error);
      throw error;
    }
  },
  
  // Get orders for a user
  async getUserOrders(userId) {
    logger.debug('Fetching orders for user', { userId });
    
    const query = `
      SELECT o.*, oi.product_id, oi.quantity, oi.price, p.name as product_name
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
    `;
    
    try {
      const result = await db.query(query, [userId]);
      
      // Group items by order
      const orders = {};
      result.rows.forEach(row => {
        if (!orders[row.id]) {
          orders[row.id] = {
            id: row.id,
            user_id: row.user_id,
            total_amount: row.total_amount,
            created_at: row.created_at,
            items: []
          };
        }
        orders[row.id].items.push({
          product_id: row.product_id,
          product_name: row.product_name,
          quantity: row.quantity,
          price: row.price
        });
      });
      
      const orderList = Object.values(orders);
      logger.debug('User orders fetched successfully', { userId, count: orderList.length });
      
      return orderList;
    } catch (error) {
      logger.error('Error fetching user orders:', error);
      throw error;
    }
  },
  
  // Get order by ID
  async findById(id) {
    logger.debug('Fetching order by ID', { orderId: id });
    
    const query = `
      SELECT o.*, oi.product_id, oi.quantity, oi.price, p.name as product_name
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.id = $1
    `;
    
    try {
      const result = await db.query(query, [id]);
      
      if (result.rows.length === 0) {
        logger.debug('Order not found', { orderId: id });
        return null;
      }
      
      const order = {
        id: result.rows[0].id,
        user_id: result.rows[0].user_id,
        total_amount: result.rows[0].total_amount,
        created_at: result.rows[0].created_at,
        items: result.rows.map(row => ({
          product_id: row.product_id,
          product_name: row.product_name,
          quantity: row.quantity,
          price: row.price
        }))
      };
      
      logger.debug('Order fetched successfully', { orderId: id });
      
      return order;
    } catch (error) {
      logger.error('Error fetching order:', error);
      throw error;
    }
  }
};

module.exports = Order;