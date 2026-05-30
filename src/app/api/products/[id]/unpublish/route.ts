import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getProductById, updateProduct } from '@/lib/db/products';

// Admin moves a published product back to draft
export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }
    if (session.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await context.params;
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    if (product.status !== 'published') {
      return NextResponse.json(
        { success: false, error: `Product is not published (status: "${product.status}")` },
        { status: 400 }
      );
    }

    await updateProduct(id, { status: 'draft' });

    return NextResponse.json({ success: true, message: 'Product unpublished and moved to draft' });
  } catch (err) {
    console.error('[product unpublish] Error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
