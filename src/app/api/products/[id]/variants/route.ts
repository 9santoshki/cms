/**
 * Public API: Get variant options for a product
 * Used by product detail page to display variant selection UI
 */
import { NextRequest } from 'next/server';
import { getProductVariants } from '@/lib/db/variants';
import { ok, notFound, serverError } from '@/lib/api-response';

/**
 * GET /api/products/[id]/variants
 * Returns variant options for a specific product.
 * Only returns option types that this product's variants actually use.
 * If the product has no variants, returns empty arrays so the UI hides the selector.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);

    if (!productId || productId <= 0) {
      return notFound('Invalid product ID');
    }

    // Fetch the product's variants (with their options already populated).
    // An empty result means no variants — return early so the UI hides the selector.
    const variants = await getProductVariants(productId);

    if (variants.length === 0) {
      return ok({
        hasVariants: false,
        variants: [],
        optionTypes: [],
        optionsByType: {}
      });
    }

    // Derive option types AND the specific options used by this product's variants.
    // The SQL in getProductVariants orders by t.display_order, so Map insertion
    // order naturally preserves the correct display ordering.
    //
    // We collect only the options that actually appear across this product's variants
    // so the selector shows exactly what's available — no global options leaked in.
    const usedTypeMap = new Map<number, { id: number; name: string; display_name: string; is_active: boolean }>();
    // Map of type_name → options (in display_order, deduped by option id)
    const optionsByTypeMap = new Map<string, Map<number, unknown>>();

    for (const variant of variants) {
      for (const raw of (variant.options || [])) {
        const option = raw as typeof raw & { type_name?: string; type_display_name?: string };
        const typeName = option.type_name || '';
        const typeDisplayName = option.type_display_name || '';

        if (option.option_type_id && !usedTypeMap.has(option.option_type_id)) {
          usedTypeMap.set(option.option_type_id, {
            id: option.option_type_id,
            name: typeName,
            display_name: typeDisplayName,
            is_active: true,
          });
          optionsByTypeMap.set(typeName, new Map());
        }

        // Add this option to the type's option list (deduped by id)
        if (typeName && !optionsByTypeMap.get(typeName)?.has(option.id)) {
          optionsByTypeMap.get(typeName)!.set(option.id, {
            id: option.id,
            option_type_id: option.option_type_id,
            value: option.value,
            display_value: option.display_value,
            price_modifier: option.price_modifier,
            display_order: option.display_order,
            is_active: option.is_active,
          });
        }
      }
    }

    const optionTypes = Array.from(usedTypeMap.values());

    // Convert to plain arrays sorted by display_order
    const optionsByType: Record<string, unknown[]> = {};
    for (const type of optionTypes) {
      const opts = Array.from(optionsByTypeMap.get(type.name)?.values() ?? []);
      opts.sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0));
      optionsByType[type.name] = opts;
    }

    // anyInStock is derived purely from supplier-managed stock_quantity on each variant
    const anyInStock = variants.some(v => v.stock_quantity > 0);

    return ok({
      hasVariants: true,
      anyInStock,
      variants,
      optionTypes,
      optionsByType
    });
  } catch (err: unknown) {
    console.error('Error fetching product variants:', err);
    return serverError('Failed to fetch variants');
  }
}