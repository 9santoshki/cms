const request = require('supertest');
const express = require('express');
const Product = require('../models/Product');
const productRoutes = require('../routes/products');
const auth = require('../middleware/auth');

// Mock the Product model
jest.mock('../models/Product');

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
app.use('/api/products', productRoutes);

describe('Product Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: '100.00' },
        { id: 2, name: 'Product 2', price: '200.00' }
      ];

      Product.findAll.mockResolvedValue(mockProducts);

      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body).toEqual(mockProducts);
      expect(Product.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get a product by ID', async () => {
      const mockProduct = { id: 1, name: 'Product 1', price: '100.00' };

      Product.findById.mockResolvedValue(mockProduct);

      const response = await request(app)
        .get('/api/products/1')
        .expect(200);

      expect(response.body).toEqual(mockProduct);
      expect(Product.findById).toHaveBeenCalledWith(1);
    });

    it('should return 404 if product not found', async () => {
      Product.findById.mockResolvedValue(null);

      const response = await request(app)
        .get('/api/products/999')
        .expect(404);

      expect(response.body).toEqual({ message: 'Product not found' });
    });

    it('should return 400 for invalid product ID', async () => {
      const response = await request(app)
        .get('/api/products/invalid')
        .expect(400);

      expect(response.body).toEqual({ message: 'Invalid product ID' });
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const mockProduct = {
        id: 1,
        name: 'New Product',
        description: 'Product description',
        price: '150.00',
        image_url: 'image.jpg'
      };

      Product.create.mockResolvedValue(mockProduct);

      const response = await request(app)
        .post('/api/products')
        .send({
          name: 'New Product',
          description: 'Product description',
          price: '150.00',
          image_url: 'image.jpg'
        })
        .expect(201);

      expect(response.body).toEqual(mockProduct);
      expect(Product.create).toHaveBeenCalledWith({
        name: 'New Product',
        description: 'Product description',
        price: '150.00',
        image_url: 'image.jpg'
      });
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({
          name: '',
          description: '',
          price: '-100',
          image_url: ''
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Validation Error');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update a product', async () => {
      const mockProduct = {
        id: 1,
        name: 'Updated Product',
        description: 'Updated description',
        price: '200.00',
        image_url: 'updated-image.jpg'
      };

      Product.update.mockResolvedValue(mockProduct);

      const response = await request(app)
        .put('/api/products/1')
        .send({
          name: 'Updated Product',
          description: 'Updated description',
          price: '200.00',
          image_url: 'updated-image.jpg'
        })
        .expect(200);

      expect(response.body).toEqual(mockProduct);
      expect(Product.update).toHaveBeenCalledWith(1, {
        name: 'Updated Product',
        description: 'Updated description',
        price: '200.00',
        image_url: 'updated-image.jpg'
      });
    });

    it('should return 404 if product not found for update', async () => {
      Product.update.mockResolvedValue(null);

      const response = await request(app)
        .put('/api/products/999')
        .send({
          name: 'Updated Product',
          description: 'Updated description',
          price: '200.00',
          image_url: 'updated-image.jpg'
        })
        .expect(404);

      expect(response.body).toEqual({ message: 'Product not found' });
    });

    it('should return 400 for invalid product ID', async () => {
      const response = await request(app)
        .put('/api/products/invalid')
        .send({
          name: 'Updated Product',
          description: 'Updated description',
          price: '200.00',
          image_url: 'updated-image.jpg'
        })
        .expect(400);

      expect(response.body).toEqual({ message: 'Invalid product ID' });
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete a product', async () => {
      const mockProduct = { id: 1, name: 'Deleted Product' };

      Product.delete.mockResolvedValue(mockProduct);

      const response = await request(app)
        .delete('/api/products/1')
        .expect(200);

      expect(response.body).toEqual({ message: 'Product removed' });
      expect(Product.delete).toHaveBeenCalledWith(1);
    });

    it('should return 404 if product not found for deletion', async () => {
      Product.delete.mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/products/999')
        .expect(404);

      expect(response.body).toEqual({ message: 'Product not found' });
    });

    it('should return 400 for invalid product ID', async () => {
      const response = await request(app)
        .delete('/api/products/invalid')
        .expect(400);

      expect(response.body).toEqual({ message: 'Invalid product ID' });
    });
  });
});