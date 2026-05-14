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

    // Check if product has variants
    const hasVariants = await productHasVariants(productId);

    if (!hasVariants) {
      // Product has no variants - return empty response
      return ok({
        hasVariants: false,
        variants: [],
        optionTypes: [],
        optionsByType: {}
      });
    }

    // Get variants and options
    const variants = await getProductVariants(productId);
    const optionTypes = await getVariantOptionTypes();

    // Build options grouped by type
    const optionsByType: Record<string, unknown[]> = {};
    for (const type of optionTypes) {
      optionsByType[type.name] = await getVariantOptionsByType(type.id);
    }

    return ok({
      hasVariants: true,
      variants,
      optionTypes,
      optionsByType
    });
  } catch (err: unknown) {
    console.error('Error fetching product variants:', err);
    return serverError('Failed to fetch variants');
  }
}