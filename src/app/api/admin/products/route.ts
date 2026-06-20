import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getProductsWithImages } from '@/lib/db/products';

/**
 * GET /api/admin/products
 *
 * Admin-only endpoint that returns ALL products regardless of status.
 * Used by the admin dashboard product list to show drafts, pending, rejected, etc.
 * The public /api/products route always enforces publishedOnly: true.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '200'), 500);

    const result = await getProductsWithImages({
      search,
      page,
      limit,
      publishedOnly: false,
    });

    return NextResponse.json({
      success: true,
      data: {
        products: result.products,
        pagination: result.pagination,
      },
    });
  } catch (err: unknown) {
    console.error('[admin/products GET] Error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
