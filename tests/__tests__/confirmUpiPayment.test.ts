/**
 * @jest-environment node
 *
 * POST /api/orders/[id]/confirm-payment — admin manual UPI verification.
 *
 * Covers the guard rules for the new endpoint that lets an admin/moderator
 * confirm a UPI QR order once they've manually checked the bank account:
 *  - non-admin/moderator sessions are rejected.
 *  - a Razorpay order can't be "confirmed" through this endpoint.
 *  - an order that's already been confirmed (or otherwise not awaiting
 *    verification) is rejected instead of being processed twice.
 *  - the happy path calls the shared stock-deduction/status-history function
 *    (no duplicated logic) and returns success.
 */
import { NextRequest } from 'next/server';

jest.mock('@/lib/db/auth', () => ({
  getSessionFromCookieWithDB: jest.fn(),
}));
jest.mock('@/lib/services/checkout-service', () => ({
  findOrderForPaymentConfirmation: jest.fn(),
  completeOrderWithStockDeduction: jest.fn(),
  getOrderDetailsForEmail: jest.fn(),
}));
jest.mock('@/lib/email', () => ({
  sendOrderConfirmationEmail: jest.fn().mockResolvedValue(undefined),
}));

import { POST } from '@/app/api/orders/[id]/confirm-payment/route';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  findOrderForPaymentConfirmation,
  completeOrderWithStockDeduction,
  getOrderDetailsForEmail,
} from '@/lib/services/checkout-service';

const mockSession = getSessionFromCookieWithDB as jest.Mock;
const mockFindOrder = findOrderForPaymentConfirmation as jest.Mock;
const mockComplete = completeOrderWithStockDeduction as jest.Mock;
const mockGetEmailDetails = getOrderDetailsForEmail as jest.Mock;

function callRoute(orderId: string) {
  const req = new NextRequest(`http://localhost/api/orders/${orderId}/confirm-payment`, { method: 'POST' });
  return POST(req, { params: Promise.resolve({ id: orderId }) });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockGetEmailDetails.mockResolvedValue(null);
});

describe('confirm-payment guards', () => {
  it('rejects sessions that are not admin or moderator', async () => {
    mockSession.mockResolvedValue({ userId: 'u1', role: 'customer', name: 'Cust' });

    const res = await callRoute('5');
    const body = await res.json();

    expect(res.status).toBe(403);
    expect(body.success).toBe(false);
    expect(mockFindOrder).not.toHaveBeenCalled();
  });

  it('rejects an order that was not placed via UPI Scan & Pay', async () => {
    mockSession.mockResolvedValue({ userId: 'a1', role: 'admin', name: 'Admin' });
    mockFindOrder.mockResolvedValue({
      id: 5, user_id: 'u1', status: 'pending', payment_method: 'razorpay', payment_status: 'paid',
    });

    const res = await callRoute('5');
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error).toMatch(/not placed via UPI/);
    expect(mockComplete).not.toHaveBeenCalled();
  });

  it('rejects an order that is not awaiting verification (already confirmed)', async () => {
    mockSession.mockResolvedValue({ userId: 'a1', role: 'admin', name: 'Admin' });
    mockFindOrder.mockResolvedValue({
      id: 5, user_id: 'u1', status: 'processing', payment_method: 'upi_qr', payment_status: 'paid',
    });

    const res = await callRoute('5');
    const body = await res.json();

    expect(res.status).toBe(409);
    expect(body.error).toMatch(/already paid/);
    expect(mockComplete).not.toHaveBeenCalled();
  });

  it('confirms a valid awaiting-verification UPI order via the shared completion function', async () => {
    mockSession.mockResolvedValue({ userId: 'a1', role: 'moderator', name: 'Mod Person' });
    mockFindOrder.mockResolvedValue({
      id: 5, user_id: 'u1', status: 'pending', payment_method: 'upi_qr', payment_status: 'awaiting_verification',
    });
    mockComplete.mockResolvedValue(undefined);

    const res = await callRoute('5');
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual({ order_id: 5, payment_status: 'paid', status: 'processing' });
    expect(mockComplete).toHaveBeenCalledWith(
      expect.objectContaining({ id: 5 }),
      'UPI-MANUAL-5',
      expect.objectContaining({ source: 'Mod Person' }),
    );
  });
});
