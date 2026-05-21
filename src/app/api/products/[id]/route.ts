import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getProductById,
  getProductBySlug,
  getProductWithImages,
  getProductBySlugWithImages,
  updateProduct,
  deleteProduct,
  generateUniqueSlug,
} from '@/lib/db/products';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const productIdOrSlug = params.id;

    if (productIdOrSlug === undefined) {
      return NextResponse.json(
        { success: false, error: 'Product parameter is missing' },
        { status: 400 }
      );
    }

    const isNumericId = /^\d+$/.test(productIdOrSlug);
    const product = isNumericId
      ? await getProductWithImages(productIdOrSlug)
      : await getProductBySlugWithImages(productIdOrSlug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Non-admin visitors cannot see draft / archived products
    const session = await getSessionFromCookieWithDB();
    const isAdmin = session?.role === 'admin' || session?.role === 'moderator';
    if (!isAdmin && product.status && product.status !== 'published') {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (err: unknown) {
    console.error('Error fetching product:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return NextResponse.json(
        { success: false, error: 'Admin or moderator access required' },
        { status: 403 }
      );
    }

    const params = await context.params;
    const { id } = params;

    const body = await request.json();
    const { name, description, price, sale_price, image_url, category, stock_quantity, status } =
      body;

    if (!name || !description || !price || price <= 0) {
      return NextResponse.json(
        { success: false, error: 'Name, description, and price are required' },
        { status: 400 }
      );
    }

    // Validate status if provided
    const validStatuses = ['draft', 'published', 'archived'];
    const productStatus = validStatuses.includes(status) ? status : undefined;

    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Regenerate slug only if the name changed, using the clean slug generator
    let slug = existingProduct.slug;
    if (name !== existingProduct.name) {
      slug = await generateUniqueSlug(name, id);
    }

    const updates: Parameters<typeof updateProduct>[1] = {
      name,
      description,
      price,
      sale_price,
      image_url,
      category,
      stock_quantity,
      slug,
    };
    if (productStatus) {
      updates.status = productStatus;
    }

    const product = await updateProduct(id, updates);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const updatedProduct = await getProductWithImages(id);
    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (err: unknown) {
    console.error('Error updating product:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    if (session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const params = await context.params;
    const { id } = params;

    const success = await deleteProduct(id);
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (err: unknown) {
    console.error('Error deleting product:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
