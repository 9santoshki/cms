/**
 * Admin API: Manage product variants (SKU combinations)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getProductVariants,
  getProductVariantById,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
  findVariantByOptions
} from '@/lib/db/variants';
import { ok, created, badRequest, unauthorized, forbidden, notFound, serverError } from '@/lib/api-response';

/**
 * GET /api/admin/product-variants
 * Returns variants for a product via ?product_id= query param
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');

    if (!productId) {
      return badRequest('product_id is required');
    }

    const variants = await getProductVariants(parseInt(productId, 10));
    return ok(variants);
  } catch (err: unknown) {
    console.error('Error fetching variants:', err);
    return serverError('Failed to fetch variants');
  }
}

/**
 * POST /api/admin/product-variants
 * Create new product variant
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can create variants');
    }

    const body = await request.json();
    const { product_id, price, sale_price, sku, stock_quantity, option_ids } = body;

    if (!product_id || !price || !option_ids || !Array.isArray(option_ids)) {
      return badRequest('product_id, price, and option_ids array are required');
    }

    // Check if variant with same options already exists
    const existing = await findVariantByOptions(product_id, option_ids);
    if (existing) {
      return badRequest('Variant with these options already exists');
    }

    const variant = await createProductVariant(
      product_id,
      price,
      option_ids,
      sku,
      sale_price,
      stock_quantity || 0
    );

    return created(variant);
  } catch (err: unknown) {
    console.error('Error creating variant:', err);
    return serverError('Failed to create variant');
  }
}

/**
 * PUT /api/admin/product-variants
 * Update variant
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can update variants');
    }

    const body = await request.json();
    const { id, sku, price, sale_price, stock_quantity, is_active } = body;

    if (!id) {
      return badRequest('id is required');
    }

    const existing = await getProductVariantById(id);
    if (!existing) {
      return notFound('Variant not found');
    }

    const updated = await updateProductVariant(id, {
      sku,
      price,
      sale_price,
      stock_quantity,
      is_active
    });

    return ok(updated);
  } catch (err: unknown) {
    console.error('Error updating variant:', err);
    return serverError('Failed to update variant');
  }
}

/**
 * DELETE /api/admin/product-variants
 * Delete variant
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can delete variants');
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return badRequest('id is required');
    }

    const deleted = await deleteProductVariant(parseInt(id, 10));
    if (!deleted) {
      return notFound('Variant not found');
    }

    return ok({ message: 'Variant deleted successfully' });
  } catch (err: unknown) {
    console.error('Error deleting variant:', err);
    return serverError('Failed to delete variant');
  }
}