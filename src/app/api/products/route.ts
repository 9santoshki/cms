import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getProductsWithImages, createProduct, generateUniqueSlug } from '@/lib/db/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const subcategory = searchParams.get('subcategory') || '';
    const minPrice = searchParams.get('minPrice')
      ? parseFloat(searchParams.get('minPrice')!)
      : undefined;
    const maxPrice = searchParams.get('maxPrice')
      ? parseFloat(searchParams.get('maxPrice')!)
      : undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Fast-path: skip DB session lookup for unauthenticated requests (most public traffic)
    // Importing cookies here avoids a full DB round-trip for every anonymous page load
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('cms-session');
    let isAdmin = false;
    if (sessionCookie) {
      const session = await getSessionFromCookieWithDB();
      isAdmin = session?.role === 'admin' || session?.role === 'moderator';
    }

    const result = await getProductsWithImages({
      search,
      category,
      subcategory,
      minPrice,
      maxPrice,
      page,
      limit,
      // Public visitors only see published products
      publishedOnly: !isAdmin,
    });

    return NextResponse.json({
      success: true,
      data: {
        products: result.products,
        pagination: result.pagination,
      },
    });
  } catch (err: unknown) {
    console.error('[products GET] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
    const productStatus: 'draft' | 'published' | 'archived' =
      validStatuses.includes(status) ? status : 'draft';

    // Generate a clean, unique, SEO-friendly slug
    const slug = await generateUniqueSlug(name);

    const product = await createProduct({
      name,
      description,
      price,
      sale_price,
      image_url,
      category,
      stock_quantity,
      slug,
      status: productStatus,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...product,
          images: [],
          primary_image: product.image_url,
          message:
            productStatus === 'draft'
              ? 'Product saved as draft. Publish it once images and variants are ready.'
              : 'Product created. Upload images using /api/products/images/upload',
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('[products POST] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
