/**
 * PUT /api/admin/inventory/supplier-stock
 *
 * Admin override: set a specific supplier's stock allocation for a variant.
 * Uses the same transactional function as supplier self-updates so that:
 *   - supplier_variants.stock_quantity is updated
 *   - product_variants.stock_quantity is recomputed as SUM across all suppliers
 *   - an audit log entry with change_type='admin_update' is written
 *
 * Body:
 *   { variant_id: number, supplier_id: number, new_quantity: number, notes?: string }
 */
import { NextRequest } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { updateVariantStockWithLog } from '@/lib/db/suppliers';
import { ok, badRequest, unauthorized, forbidden, notFound, serverError } from '@/lib/api-response';

export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return forbidden('Admin or moderator access required');
    }

    const body = await request.json();
    const { variant_id, supplier_id, new_quantity, notes } = body;

    // ── Validate inputs ──────────────────────────────────────────────────────
    if (!variant_id || !supplier_id || new_quantity === undefined) {
      return badRequest('variant_id, supplier_id, and new_quantity are required');
    }
    const qty = Number(new_quantity);
    if (!Number.isInteger(qty) || qty < 0) {
      return badRequest('new_quantity must be a non-negative integer');
    }

    // ── Apply update via shared transactional function ───────────────────────
    const result = await updateVariantStockWithLog(
      Number(variant_id),
      Number(supplier_id),
      qty,
      Number(session.userId),
      'admin_update',
      notes ? String(notes).trim() : `Admin override by ${session.name ?? session.email}`,
    );

    if (!result) {
      return notFound('Variant or supplier assignment not found');
    }

    console.info(
      `[admin/supplier-stock] Admin ${session.email} set supplier ${supplier_id} ` +
      `stock for variant ${variant_id} → ${qty} units`
    );

    return ok({
      variant:      result.variant,
      log:          result.log,
      message:      `Stock updated to ${qty} units`,
    });
  } catch (err: unknown) {
    console.error('[admin/supplier-stock] Error:', err);
    return serverError('Failed to update stock');
  }
}
