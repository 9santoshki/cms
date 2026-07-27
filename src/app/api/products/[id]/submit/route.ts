import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getProductById, updateProduct } from '@/lib/db/products';

// Maker submits a draft or rejected product for admin review
export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 });
    }

    const { id } = await context.params;
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    if (product.status !== 'draft' && product.status !== 'rejected') {
      return NextResponse.json(
        { success: false, error: `Cannot submit a product with status "${product.status}"` },
        { status: 400 }
      );
    }

    await updateProduct(id, { status: 'pending_review', reviewer_comment: undefined });

    return NextResponse.json({ success: true, message: 'Product submitted for review' });
  } catch (err) {
    console.error('[product submit] Error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
