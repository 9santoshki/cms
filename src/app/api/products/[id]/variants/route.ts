/**
 * Public API: Get variant options for a product
 * Used by product detail page to display variant selection UI
 */
import { NextRequest, NextResponse } from 'next/server';
import { getProductVariants, productHasVariants } from '@/lib/db/variants';
import { getVariantOptionTypes, getVariantOptionsByType } from '@/lib/db/variants';
import { ok, notFound, serverError } from '@/lib/api-response';

/**
 * GET /api/products/[id]/variants
 * Returns all variants and available options for a product
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);

    if (!productId || productId <= 0) {
      return notFound('Invalid product ID');
    }

    // Always fetch option types and options so the UI can show selectors
    const optionTypes = await getVariantOptionTypes();

    const optionsByType: Record<string, unknown[]> = {};
    for (const type of optionTypes) {
      optionsByType[type.name] = await getVariantOptionsByType(type.id);
    }

    // Check if this specific product has DB-backed variants (for price/stock matching)
    const hasVariants = await productHasVariants(productId);
    const variants = hasVariants ? await getProductVariants(productId) : [];

    return ok({
      hasVariants,
      variants,
      optionTypes,
      optionsByType
    });
  } catch (err: unknown) {
    console.error('Error fetching product variants:', err);
    return serverError('Failed to fetch variants');
  }
}