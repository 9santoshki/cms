import { NextRequest, NextResponse } from 'next/server';
import { searchProducts, getProducts } from '@/lib/db/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');

    if (!query && !category) {
      return NextResponse.json(
        { success: false, error: 'Query or category parameter is required' },
        { status: 400 }
      );
    }

    if (query) {
      const products = await searchProducts(query, 50);
      return NextResponse.json({
        success: true,
        data: products.map((p) => ({
          ...p,
          images: p.image_url ? [p.image_url] : [],
          primary_image: p.image_url,
        })),
      });
    }

    if (category) {
      const result = await getProducts({ category, limit: 50 });
      return NextResponse.json({
        success: true,
        data: result.products.map((p) => ({
          ...p,
          images: p.image_url ? [p.image_url] : [],
          primary_image: p.image_url,
        })),
      });
    }

    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}