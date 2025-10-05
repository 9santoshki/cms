const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authRoutes = require('../routes/auth');

// Mock the User model
jest.mock('../models/User');

// Create express app for testing
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        created_at: new Date().toISOString()
      };

      User.create.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123'
        })
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      });
      expect(User.create).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123'
      });
    });

    it('should return 400 if user already exists', async () => {
      User.findByEmail.mockResolvedValue({ id: 1, email: 'test@example.com' });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123'
        })
        .expect(400);

      expect(response.body).toEqual({ message: 'User already exists' });
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: '',
          email: 'invalid-email',
          password: '123'
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Validation Error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: await bcrypt.hash('Password123', 10)
      };

      User.findByEmail.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      });
    });

    it('should return 400 for invalid credentials', async () => {
      User.findByEmail.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(400);

      expect(response.body).toEqual({ message: 'Invalid credentials' });
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'invalid-email',
          password: ''
        })
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Validation Error');
    });
  });
});