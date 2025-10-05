const request = require('supertest');
const express = require('express');
const Cart = require('../models/Cart');
const cartRoutes = require('../routes/cart');
const auth = require('../middleware/auth');

// Mock the Cart model
jest.mock('../models/Cart');

// Mock the auth middleware
jest.mock('../middleware/auth', () => {
  return (req, res, next) => {
    req.user = { id: 1 };
    next();
  };
});

// Create express app for testing
const app = express();
app.use(express.json());
app.use('/api/cart', cartRoutes);

describe('Cart Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/cart', () => {
    it('should get cart items for user', async () => {
      const mockCartItems = [
        { id: 1, product_id: 1, quantity: 2, name: 'Product 1', price: '100.00' },
        { id: 2, product_id: 2, quantity: 1, name: 'Product 2', price: '200.00' }
      ];

      Cart.getCartItems.mockResolvedValue(mockCartItems);

      const response = await request(app)
        .get('/api/cart')
        .expect(200);

      expect(response.body).toEqual(mockCartItems);
      expect(Cart.getCartItems).toHaveBeenCalledWith(1);
    });
  });

  describe('POST /api/cart/add', () => {
    it('should add item to cart', async () => {
      const mockCartItem = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 2
      };

      Cart.addItem.mockResolvedValue(mockCartItem);

      const response = await request(app)
        .post('/api/cart/add')
        .send({
          product_id: 1,
          quantity: 2
        })
        .expect(200);

      expect(response.body).toEqual(mockCartItem);
      expect(Cart.addItem).toHaveBeenCalledWith(1, 1, 2);
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/cart/add')
        .send({
          product_id: -1,
          quantity: 0
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Validation Error');
    });
  });

  describe('PUT /api/cart/update', () => {
    it('should update cart item', async () => {
      const mockCartItem = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 5
      };

      Cart.updateItem.mockResolvedValue(mockCartItem);

      const response = await request(app)
        .put('/api/cart/update')
        .send({
          product_id: 1,
          quantity: 5
        })
        .expect(200);

      expect(response.body).toEqual(mockCartItem);
      expect(Cart.updateItem).toHaveBeenCalledWith(1, 1, 5);
    });

    it('should return 404 if cart item not found', async () => {
      Cart.updateItem.mockResolvedValue(null);

      const response = await request(app)
        .put('/api/cart/update')
        .send({
          product_id: 999,
          quantity: 5
        })
        .expect(404);

      expect(response.body).toEqual({ message: 'Cart item not found' });
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .put('/api/cart/update')
        .send({
          product_id: 'invalid',
          quantity: -1
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Validation Error');
    });
  });

  describe('DELETE /api/cart/remove/:productId', () => {
    it('should remove item from cart', async () => {
      const mockCartItem = {
        id: 1,
        user_id: 1,
        product_id: 1
      };

      Cart.removeItem.mockResolvedValue(mockCartItem);

      const response = await request(app)
        .delete('/api/cart/remove/1')
        .expect(200);

      expect(response.body).toEqual({ message: 'Item removed from cart' });
      expect(Cart.removeItem).toHaveBeenCalledWith(1, 1);
    });

    it('should return 404 if cart item not found', async () => {
      Cart.removeItem.mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/cart/remove/999')
        .expect(404);

      expect(response.body).toEqual({ message: 'Cart item not found' });
    });

    it('should return 400 for invalid product ID', async () => {
      const response = await request(app)
        .delete('/api/cart/remove/invalid')
        .expect(400);

      expect(response.body).toEqual({ message: 'Invalid product ID' });
    });
  });

  describe('DELETE /api/cart/clear', () => {
    it('should clear cart', async () => {
      Cart.clearCart.mockResolvedValue();

      const response = await request(app)
        .delete('/api/cart/clear')
        .expect(200);

      expect(response.body).toEqual({ message: 'Cart cleared' });
      expect(Cart.clearCart).toHaveBeenCalledWith(1);
    });
  });
});