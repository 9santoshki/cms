/**
 * GET /api/admin/inventory/all
 *
 * Returns every active variant with its supplier stock breakdown.
 * Used by the "All Stock" tab on the admin inventory page so admins
 * can edit stock for variants that are in stock (not just alert items).
 */
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getAllInventoryVariants } from '@/lib/db/suppliers';
import { ok, unauthorized, forbidden, serverError } from '@/lib/api-response';

export async function GET() {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return forbidden('Admin or moderator access required');
    }

    const variants = await getAllInventoryVariants();
    return ok({ variants, total: variants.length });
  } catch (err: unknown) {
    console.error('[inventory/all] Error:', err);
    return serverError('Failed to fetch inventory');
  }
}
