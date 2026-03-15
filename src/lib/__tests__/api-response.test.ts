// Mock next/server before importing our module so NextResponse is available
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}));

import { ok, created, badRequest, unauthorized, forbidden, notFound, serverError, fromError } from '../api-response';

describe('api-response helpers', () => {
  describe('ok', () => {
    it('returns 200 with success:true and data', async () => {
      const res = ok({ id: 1 });
      const body = await res.json();
      expect(res.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data).toEqual({ id: 1 });
    });

    it('includes optional message', async () => {
      const res = ok('test', 'Operation succeeded');
      const body = await res.json();
      expect(body.message).toBe('Operation succeeded');
    });
  });

  describe('created', () => {
    it('returns 201 with success:true', async () => {
      const res = created({ id: 2 });
      const body = await res.json();
      expect(res.status).toBe(201);
      expect(body.success).toBe(true);
    });
  });

  describe('badRequest', () => {
    it('returns 400 with success:false', async () => {
      const res = badRequest('Invalid input');
      const body = await res.json();
      expect(res.status).toBe(400);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Invalid input');
    });
  });

  describe('unauthorized', () => {
    it('returns 401 with default message', async () => {
      const res = unauthorized();
      const body = await res.json();
      expect(res.status).toBe(401);
      expect(body.success).toBe(false);
    });
  });

  describe('forbidden', () => {
    it('returns 403', async () => {
      const res = forbidden();
      const body = await res.json();
      expect(res.status).toBe(403);
    });
  });

  describe('notFound', () => {
    it('returns 404', async () => {
      const res = notFound();
      const body = await res.json();
      expect(res.status).toBe(404);
    });
  });

  describe('serverError', () => {
    it('returns 500 with generic message', async () => {
      const res = serverError();
      const body = await res.json();
      expect(res.status).toBe(500);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Internal server error');
    });
  });

  describe('fromError', () => {
    it('returns 500 and does not expose error details', async () => {
      const res = fromError(new Error('DB connection failed'), 'test');
      const body = await res.json();
      expect(res.status).toBe(500);
      expect(body.error).toBe('Internal server error');
      expect(body.error).not.toContain('DB connection failed');
    });
  });
});
