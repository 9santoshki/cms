import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getProductById, updateProduct } from '@/lib/db/products';

// Checker (admin) rejects a pending_review product with a mandatory comment
export async function POST(
  request: NextRequest,
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

    if (product.status !== 'pending_review') {
      return NextResponse.json(
        { success: false, error: `Product is not pending review (status: "${product.status}")` },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const comment = body.comment?.trim();
    if (!comment) {
      return NextResponse.json(
        { success: false, error: 'A reviewer comment is required when rejecting a product' },
        { status: 400 }
      );
    }

    await updateProduct(id, { status: 'rejected', reviewer_comment: comment });

    return NextResponse.json({ success: true, message: 'Product rejected' });
  } catch (err) {
    console.error('[product reject] Error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
