import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getProductBySlug, getProductWithImages, getProductBySlugWithImages, updateProduct, deleteProduct } from '@/lib/db/products';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const productIdOrSlug = params.id;

    if (productIdOrSlug === undefined) {
      console.error('Parameter is undefined');
      return NextResponse.json(
        {
          success: false,
          error: 'Product parameter is missing',
        },
        { status: 400 }
      );
    }

    // Check if it's a number (id) or a slug
    const isNumericId = /^\d+$/.test(productIdOrSlug);

    let product;
    if (isNumericId) {
      // It's a numeric ID
      product = await getProductWithImages(productIdOrSlug);
    } else {
      // It's a slug
      product = await getProductBySlugWithImages(productIdOrSlug);
    }

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    const body = await request.json();
    const { name, description, price, sale_price, image_url, category, stock_quantity } = body;

    if (!name || !description || !price || price <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name, description, and price are required',
        },
        { status: 400 }
      );
    }

    // Get existing product
    const existingProduct = await getProductById(id);

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    // If name has changed, generate a new slug
    let slug = existingProduct.slug;
    if (name !== existingProduct.name) {
      slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    }

    const product = await updateProduct(id, {
      name,
      description,
      price,
      sale_price,
      image_url,
      category,
      stock_quantity,
      slug,
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Fetch updated product with images
    const updatedProduct = await getProductWithImages(id);

    return NextResponse.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    const success = await deleteProduct(id);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
