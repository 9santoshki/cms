/**
 * GET /api/admin/inventory/out-of-stock
 *
 * Returns all active variants with zero stock, plus a separate list of
 * variants whose stock is low (≤ threshold query param, default 10).
 * Admin and moderator only.
 */
import { NextRequest } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getOutOfStockVariants, getLowStockVariants } from '@/lib/db/suppliers';
import { ok, unauthorized, forbidden, serverError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return forbidden('Admin or moderator access required');
    }

    const { searchParams } = new URL(request.url);
    const threshold = parseInt(searchParams.get('threshold') || '10', 10);

    const [outOfStock, lowStock] = await Promise.all([
      getOutOfStockVariants(),
      getLowStockVariants(threshold),
    ]);

    // Derived stats for the dashboard summary
    const noSupplierCount = outOfStock.filter(v => v.suppliers.length === 0).length;

    return ok({
      outOfStock,
      lowStock,
      summary: {
        outOfStockCount:  outOfStock.length,
        noSupplierCount,
        lowStockCount:    lowStock.length,
        threshold,
      },
    });
  } catch (err: unknown) {
    console.error('[inventory/out-of-stock] Error:', err);
    return serverError('Failed to fetch inventory alerts');
  }
}
