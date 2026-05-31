import { NextRequest, NextResponse } from 'next/server';
import { getProductsWithImages } from '@/lib/db/products';

/**
 * GET /api/search/products?q=...&limit=...
 *
 * Server-side responsibility: text search only.
 * All other filtering (category, subcategory, brand, price) is done
 * client-side on the search page, consistent with how the shop page works.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q') || searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '100');

    const result = await getProductsWithImages({
      search,
      limit,
      publishedOnly: true,
    });

    return NextResponse.json({
      success: true,
      data: {
        products: result.products,
        pagination: result.pagination,
      },
    });
  } catch (err: unknown) {
    console.error('[search/products] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
