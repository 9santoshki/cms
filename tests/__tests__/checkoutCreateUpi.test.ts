/**
 * @jest-environment node
 *
 * Checkout create — UPI "Scan and Pay" branch.
 *
 * Covers the new payment_method='upi_qr' path added to POST /api/checkout/create:
 *  - it must skip Razorpay entirely and insert the order directly as
 *    payment_status='awaiting_verification', payment_method='upi_qr'.
 *  - it must be rejected (400) when UPI is not enabled in site settings.
 *  - the default/omitted payment_method must keep the existing Razorpay
 *    behavior unchanged (regression guard).
 *
 * All DB modules are mocked — this is a unit test of the route's branching
 * logic, not an integration test against a real database.
 */
import { NextRequest } from 'next/server';

jest.mock('@/lib/db/auth', () => ({
  getSessionFromCookieWithDB: jest.fn(),
}));
jest.mock('@/lib/db/connection', () => ({
  query: jest.fn(),
  getClient: jest.fn(),
}));
jest.mock('@/lib/db/suppliers', () => ({
  checkVariantStock: jest.fn(),
}));
jest.mock('@/lib/db/settings', () => ({
  getSettings: jest.fn(),
}));

import { POST } from '@/app/api/checkout/create/route';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { query, getClient } from '@/lib/db/connection';
import { getSettings } from '@/lib/db/settings';

const mockSession = getSessionFromCookieWithDB as jest.Mock;
const mockQuery = query as jest.Mock;
const mockGetClient = getClient as jest.Mock;
const mockGetSettings = getSettings as jest.Mock;

const BASE_SETTINGS = {
  shipping: { enabled: false, flat_rate: 0, min_order_amount: 0 },
  tax: { enabled: false, rate: 0, type: 'percentage' },
  upi: { enabled: true, vpa: 'merchant@icici', payee_name: 'Merchant' },
};

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost/api/checkout/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const cartItems = [{ product_id: 1, quantity: 1, price: 1000, name: 'Test Product' }];
const shippingAddress = { name: 'Test', address: '123 St', city: 'City', state: 'ST', zipCode: '000000' };

beforeEach(() => {
  jest.clearAllMocks();
  mockSession.mockResolvedValue({ userId: 'u1' });
  mockQuery.mockResolvedValue({ rows: [{ id: 123 }] });
  mockGetClient.mockResolvedValue({ query: jest.fn().mockResolvedValue({}), release: jest.fn() });
});

describe('checkout/create — UPI QR branch', () => {
  it('creates the order directly, skipping Razorpay, when payment_method=upi_qr', async () => {
    mockGetSettings.mockResolvedValue(BASE_SETTINGS);

    const res = await POST(makeRequest({
      items: cartItems,
      shipping_address: shippingAddress,
      payment_method: 'upi_qr',
    }));
    const body = await res.json();

    expect(body.success).toBe(true);
    expect(body.data.payment_method).toBe('upi_qr');
    expect(body.data.order_id).toBe(123);
    expect(body.data.razorpay_order_id).toBeUndefined();

    // The orders INSERT must carry payment_method + awaiting_verification, and no payment_id.
    const insertCall = mockQuery.mock.calls.find(([sql]) => String(sql).includes('INSERT INTO orders'));
    expect(insertCall).toBeDefined();
    const [, params] = insertCall!;
    expect(params).toEqual(expect.arrayContaining(['awaiting_verification', 'upi_qr']));
  });

  it('rejects payment_method=upi_qr when UPI is disabled in settings', async () => {
    mockGetSettings.mockResolvedValue({ ...BASE_SETTINGS, upi: { ...BASE_SETTINGS.upi, enabled: false } });

    const res = await POST(makeRequest({
      items: cartItems,
      shipping_address: shippingAddress,
      payment_method: 'upi_qr',
    }));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toMatch(/UPI payment is not available/);
  });

  it('keeps the existing Razorpay behavior when payment_method is omitted (regression guard)', async () => {
    mockGetSettings.mockResolvedValue(BASE_SETTINGS);
    const originalKey = process.env.RAZORPAY_KEY_ID;
    const originalSecret = process.env.RAZORPAY_KEY_SECRET;
    delete process.env.RAZORPAY_KEY_ID;
    delete process.env.RAZORPAY_KEY_SECRET;

    try {
      const res = await POST(makeRequest({ items: cartItems, shipping_address: shippingAddress }));
      const body = await res.json();

      // Same "not configured" error as before this change — proves the default
      // path still requires Razorpay and wasn't accidentally rerouted to UPI.
      expect(res.status).toBe(500);
      expect(body.error).toMatch(/Payment gateway not configured/);
    } finally {
      if (originalKey) process.env.RAZORPAY_KEY_ID = originalKey;
      if (originalSecret) process.env.RAZORPAY_KEY_SECRET = originalSecret;
    }
  });
});
