const request = require('supertest');
const app = require('../server');

describe('Server', () => {
  describe('GET /', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/nonexistent-route')
        .expect(404);

      // Check that we get a response body (even if empty)
      expect(response.body).toBeDefined();
    });
  });

  describe('GET /api/products', () => {
    it('should return products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});