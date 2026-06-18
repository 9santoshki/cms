import { NextRequest } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { updateOrderCost } from '@/lib/db/orders';
import { ok, badRequest, unauthorized, forbidden, notFound, fromError } from '@/lib/api-response';

/**
 * PUT /api/orders/[id]/cost
 * Save cost_price and cash_expense for an order.
 * Admin/moderator only.
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();
    if (session.role !== 'admin' && session.role !== 'moderator') return forbidden();

    const { id: orderId } = await context.params;

    const body = await request.json();
    const costPrice = body.costPrice != null ? parseFloat(body.costPrice) : null;
    const cashExpense = body.cashExpense != null ? parseFloat(body.cashExpense) : null;
    const costNotes = typeof body.costNotes === 'string' ? body.costNotes.trim() || null : null;

    if (costPrice !== null && isNaN(costPrice)) return badRequest('Invalid cost price');
    if (cashExpense !== null && isNaN(cashExpense)) return badRequest('Invalid cash expense');

    const order = await updateOrderCost(orderId, costPrice, cashExpense, costNotes);
    if (!order) return notFound('Order not found');

    return ok({ cost_price: order.cost_price, cash_expense: order.cash_expense, cost_notes: order.cost_notes }, 'Costs saved');
  } catch (err) {
    return fromError(err, 'PUT /api/orders/[id]/cost');
  }
}
