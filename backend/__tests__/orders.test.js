const request = require('supertest');
const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const orderRoutes = require('../routes/orders');
const auth = require('../middleware/auth');

// Mock the Order and Cart models
jest.mock('../models/Order');
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
app.use('/api/orders', orderRoutes);

describe('Order Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const mockOrder = {
        id: 1,
        user_id: 1,
        total_amount: '300.00',
        items: [
          { product_id: 1, quantity: 2, price: '100.00' },
          { product_id: 2, quantity: 1, price: '100.00' }
        ]
      };

      Order.create.mockResolvedValue(mockOrder);
      Cart.clearCart.mockResolvedValue();

      const response = await request(app)
        .post('/api/orders')
        .send({
          items: [
            { id: 1, quantity: 2, price: '100.00' },
            { id: 2, quantity: 1, price: '100.00' }
          ],
          total_amount: '300.00'
        })
        .expect(201);

      expect(response.body).toEqual(mockOrder);
      expect(Order.create).toHaveBeenCalledWith({
        user_id: 1,
        total_amount: '300.00',
        items: [
          { id: 1, quantity: 2, price: '100.00' },
          { id: 2, quantity: 1, price: '100.00' }
        ]
      });
      expect(Cart.clearCart).toHaveBeenCalledWith(1);
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          items: [],
          total_amount: '-100'
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Validation Error');
    });
  });

  describe('GET /api/orders', () => {
    it('should get user orders', async () => {
      const mockOrders = [
        {
          id: 1,
          user_id: 1,
          total_amount: '300.00',
          created_at: '2023-01-01T00:00:00Z',
          items: [
            { product_id: 1, quantity: 2, price: '100.00' }
          ]
        }
      ];

      Order.getUserOrders.mockResolvedValue(mockOrders);

      const response = await request(app)
        .get('/api/orders')
        .expect(200);

      expect(response.body).toEqual(mockOrders);
      expect(Order.getUserOrders).toHaveBeenCalledWith(1);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should get order by ID', async () => {
      const mockOrder = {
        id: 1,
        user_id: 1,
        total_amount: '300.00',
        created_at: '2023-01-01T00:00:00Z',
        items: [
          { product_id: 1, quantity: 2, price: '100.00' }
        ]
      };

      Order.findById.mockResolvedValue(mockOrder);

      const response = await request(app)
        .get('/api/orders/1')
        .expect(200);

      expect(response.body).toEqual(mockOrder);
      expect(Order.findById).toHaveBeenCalledWith(1);
    });

    it('should return 404 if order not found', async () => {
      Order.findById.mockResolvedValue(null);

      const response = await request(app)
        .get('/api/orders/999')
        .expect(404);

      expect(response.body).toEqual({ message: 'Order not found' });
    });

    it('should return 404 if order does not belong to user', async () => {
      const mockOrder = {
        id: 1,
        user_id: 2, // Different user
        total_amount: '300.00',
        created_at: '2023-01-01T00:00:00Z'
      };

      Order.findById.mockResolvedValue(mockOrder);

      const response = await request(app)
        .get('/api/orders/1')
        .expect(404);

      expect(response.body).toEqual({ message: 'Order not found' });
    });

    it('should return 400 for invalid order ID', async () => {
      const response = await request(app)
        .get('/api/orders/invalid')
        .expect(400);

      expect(response.body).toEqual({ message: 'Invalid order ID' });
    });
  });
});