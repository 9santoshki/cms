import { NextRequest } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { recordProductView, getRecentlyViewed } from '@/lib/db/recentlyViewed';
import { ok, unauthorized, badRequest, serverError } from '@/lib/api-response';

/**
 * GET /api/recently-viewed
 * Returns the current user's recently viewed products (newest first).
 */
export async function GET() {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();

    const products = await getRecentlyViewed(parseInt(session.userId, 10));
    return ok(products);
  } catch (err: unknown) {
    console.error('Error fetching recently viewed:', err);
    return serverError('Failed to fetch recently viewed products');
  }
}

/**
 * POST /api/recently-viewed
 * Records a product view for the current user.
 * Body: { product_id: number }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();

    const body = await request.json();
    const productId = parseInt(body.product_id, 10);
    if (!productId || isNaN(productId)) {
      return badRequest('product_id is required');
    }

    await recordProductView(parseInt(session.userId, 10), productId);
    return ok(null, 'Recorded');
  } catch (err: unknown) {
    console.error('Error recording product view:', err);
    return serverError('Failed to record product view');
  }
}
