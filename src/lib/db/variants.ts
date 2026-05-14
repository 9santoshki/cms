/**
 * Database operations for product variants.
 * Handles variant option types, options, and product-specific variants.
 */
import { query, getClient } from './connection';
import type {
  VariantOptionType,
  VariantOption,
  ProductVariant,
  ProductVariantValue
} from '@/types';

// ============================================================================
// Variant Option Types (thickness, size, color)
// ============================================================================

/** Get all active option types */
export async function getVariantOptionTypes(): Promise<VariantOptionType[]> {
  const result = await query(
    `SELECT * FROM variant_option_types WHERE is_active = TRUE ORDER BY display_order`
  );
  return result.rows;
}

/** Get option type by ID */
export async function getVariantOptionTypeById(id: number): Promise<VariantOptionType | null> {
  const result = await query(
    `SELECT * FROM variant_option_types WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

/** Create new option type */
export async function createVariantOptionType(
  name: string,
  displayName: string,
  description?: string,
  displayOrder: number = 0
): Promise<VariantOptionType> {
  const result = await query(
    `INSERT INTO variant_option_types (name, display_name, description, display_order)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, displayName, description || null, displayOrder]
  );
  return result.rows[0];
}

/** Update option type */
export async function updateVariantOptionType(
  id: number,
  updates: Partial<Pick<VariantOptionType, 'display_name' | 'description' | 'display_order' | 'is_active'>>
): Promise<VariantOptionType | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (updates.display_name !== undefined) {
    fields.push(`display_name = $${paramIndex++}`);
    values.push(updates.display_name);
  }
  if (updates.description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    values.push(updates.description);
  }
  if (updates.display_order !== undefined) {
    fields.push(`display_order = $${paramIndex++}`);
    values.push(updates.display_order);
  }
  if (updates.is_active !== undefined) {
    fields.push(`is_active = $${paramIndex++}`);
    values.push(updates.is_active);
  }

  if (fields.length === 0) return null;

  values.push(id);
  const result = await query(
    `UPDATE variant_option_types SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
  return result.rows[0] || null;
}

// ============================================================================
// Variant Options (thin, standard, thick for thickness)
// ============================================================================

/** Get all active options for a given option type */
export async function getVariantOptionsByType(optionTypeId: number): Promise<VariantOption[]> {
  const result = await query(
    `SELECT * FROM variant_options WHERE option_type_id = $1 AND is_active = TRUE ORDER BY display_order`,
    [optionTypeId]
  );
  return result.rows;
}

/** Get all active options across all types */
export async function getAllVariantOptions(): Promise<VariantOption[]> {
  const result = await query(
    `SELECT o.*, t.name as type_name, t.display_name as type_display_name
     FROM variant_options o
     JOIN variant_option_types t ON o.option_type_id = t.id
     WHERE o.is_active = TRUE AND t.is_active = TRUE
     ORDER BY t.display_order, o.display_order`
  );
  return result.rows;
}

/** Get option by ID */
export async function getVariantOptionById(id: number): Promise<VariantOption | null> {
  const result = await query(
    `SELECT * FROM variant_options WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

/** Create new option for a type */
export async function createVariantOption(
  optionTypeId: number,
  value: string,
  displayValue: string,
  priceModifier: number = 0,
  displayOrder: number = 0
): Promise<VariantOption> {
  const result = await query(
    `INSERT INTO variant_options (option_type_id, value, display_value, price_modifier, display_order)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [optionTypeId, value, displayValue, priceModifier, displayOrder]
  );
  return result.rows[0];
}

/** Update option */
export async function updateVariantOption(
  id: number,
  updates: Partial<Pick<VariantOption, 'display_value' | 'price_modifier' | 'display_order' | 'is_active'>>
): Promise<VariantOption | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (updates.display_value !== undefined) {
    fields.push(`display_value = $${paramIndex++}`);
    values.push(updates.display_value);
  }
  if (updates.price_modifier !== undefined) {
    fields.push(`price_modifier = $${paramIndex++}`);
    values.push(updates.price_modifier);
  }
  if (updates.display_order !== undefined) {
    fields.push(`display_order = $${paramIndex++}`);
    values.push(updates.display_order);
  }
  if (updates.is_active !== undefined) {
    fields.push(`is_active = $${paramIndex++}`);
    values.push(updates.is_active);
  }

  if (fields.length === 0) return null;

  values.push(id);
  const result = await query(
    `UPDATE variant_options SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
  return result.rows[0] || null;
}

/** Delete option */
export async function deleteVariantOption(id: number): Promise<boolean> {
  const result = await query(
    `DELETE FROM variant_options WHERE id = $1`,
    [id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}

// ============================================================================
// Product Variants (SKU combinations)
// ============================================================================

/** Get all variants for a product with their option details */
export async function getProductVariants(productId: number): Promise<ProductVariant[]> {
  // Fetch variants with variant_name in a single query
  const variantsResult = await query(
    `SELECT v.*,
            COALESCE(
              (SELECT STRING_AGG(o.display_value, ' / ' ORDER BY t.display_order)
               FROM product_variant_values vv
               JOIN variant_options o ON vv.option_id = o.id
               JOIN variant_option_types t ON o.option_type_id = t.id
               WHERE vv.variant_id = v.id),
              ''
            ) as variant_name
     FROM product_variants v
     WHERE v.product_id = $1 AND v.is_active = TRUE
     ORDER BY v.id`,
    [productId]
  );

  const variants = variantsResult.rows as ProductVariant[];

  if (variants.length === 0) return variants;

  // Batch fetch all options for all variants (single query, not N+1)
  const variantIds = variants.map(v => v.id);
  const optionsResult = await query(
    `SELECT vv.variant_id, o.*, t.name as type_name, t.display_name as type_display_name
     FROM product_variant_values vv
     JOIN variant_options o ON vv.option_id = o.id
     JOIN variant_option_types t ON o.option_type_id = t.id
     WHERE vv.variant_id = ANY($1)
     ORDER BY t.display_order`,
    [variantIds]
  );

  // Group options by variant_id
  const optionsByVariantId: Record<number, VariantOption[]> = {};
  for (const row of optionsResult.rows) {
    const variantId = row.variant_id as number;
    if (!optionsByVariantId[variantId]) {
      optionsByVariantId[variantId] = [];
    }
    optionsByVariantId[variantId].push(row as VariantOption);
  }

  // Attach options to each variant
  for (const variant of variants) {
    variant.options = optionsByVariantId[variant.id] || [];
  }

  return variants;
}

/** Get all active variants across all products, with product name and options */
export async function getAllVariants(): Promise<ProductVariant[]> {
  const variantsResult = await query(
    `SELECT v.*, p.name as product_name,
            COALESCE(
              (SELECT STRING_AGG(o.display_value, ' / ' ORDER BY t.display_order)
               FROM product_variant_values vv
               JOIN variant_options o ON vv.option_id = o.id
               JOIN variant_option_types t ON o.option_type_id = t.id
               WHERE vv.variant_id = v.id),
              ''
            ) as variant_name
     FROM product_variants v
     JOIN products p ON v.product_id = p.id
     WHERE v.is_active = TRUE
     ORDER BY p.name, v.id`
  );

  const variants = variantsResult.rows as ProductVariant[];
  if (variants.length === 0) return variants;

  const variantIds = variants.map(v => v.id);
  const optionsResult = await query(
    `SELECT vv.variant_id, o.*, t.name as type_name, t.display_name as type_display_name
     FROM product_variant_values vv
     JOIN variant_options o ON vv.option_id = o.id
     JOIN variant_option_types t ON o.option_type_id = t.id
     WHERE vv.variant_id = ANY($1)
     ORDER BY t.display_order`,
    [variantIds]
  );

  const optionsByVariantId: Record<number, VariantOption[]> = {};
  for (const row of optionsResult.rows) {
    const variantId = row.variant_id as number;
    if (!optionsByVariantId[variantId]) optionsByVariantId[variantId] = [];
    optionsByVariantId[variantId].push(row as VariantOption);
  }

  for (const variant of variants) {
    variant.options = optionsByVariantId[variant.id] || [];
  }

  return variants;
}

/** Get variant by ID with option details */
export async function getProductVariantById(variantId: number): Promise<ProductVariant | null> {
  const result = await query(
    `SELECT v.*,
            COALESCE(
              (SELECT STRING_AGG(o.display_value, ' / ' ORDER BY t.display_order)
               FROM product_variant_values vv
               JOIN variant_options o ON vv.option_id = o.id
               JOIN variant_option_types t ON o.option_type_id = t.id
               WHERE vv.variant_id = v.id),
              ''
            ) as variant_name
     FROM product_variants v
     WHERE v.id = $1`,
    [variantId]
  );

  const variant = result.rows[0] as ProductVariant | null;
  if (variant) {
    // Single query for this variant's options (no N+1 issue for single fetch)
    variant.options = await getVariantOptionsForVariant(variant.id);
  }

  return variant;
}

/** Get options assigned to a specific variant */
export async function getVariantOptionsForVariant(variantId: number): Promise<VariantOption[]> {
  const result = await query(
    `SELECT o.*, t.name as type_name, t.display_name as type_display_name
     FROM product_variant_values vv
     JOIN variant_options o ON vv.option_id = o.id
     JOIN variant_option_types t ON o.option_type_id = t.id
     WHERE vv.variant_id = $1
     ORDER BY t.display_order`,
    [variantId]
  );
  return result.rows;
}

/** Find variant by product and specific option combination */
export async function findVariantByOptions(
  productId: number,
  optionIds: number[]
): Promise<ProductVariant | null> {
  // Build query to find variant that has all specified options
  const result = await query(
    `SELECT v.* FROM product_variants v
     WHERE v.product_id = $1 AND v.is_active = TRUE
     AND (
       SELECT COUNT(*) FROM product_variant_values vv
       WHERE vv.variant_id = v.id AND vv.option_id = ANY($2::int[])
     ) = $3`,
    [productId, optionIds, optionIds.length]
  );

  const variant = result.rows[0] as ProductVariant | null;
  if (variant) {
    variant.options = await getVariantOptionsForVariant(variant.id);
    variant.variant_name = variant.options?.map(o => o.display_value).join(' / ') || '';
  }

  return variant;
}

/** Create new product variant with specified options */
export async function createProductVariant(
  productId: number,
  price: number,
  optionIds: number[],
  sku?: string,
  salePrice?: number,
  stockQuantity: number = 0
): Promise<ProductVariant> {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    // Insert variant
    const variantResult = await client.query(
      `INSERT INTO product_variants (product_id, sku, price, sale_price, stock_quantity)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [productId, sku || null, price, salePrice || null, stockQuantity]
    );

    const variant = variantResult.rows[0] as ProductVariant;

    // Insert variant values (link to options)
    for (const optionId of optionIds) {
      await client.query(
        `INSERT INTO product_variant_values (variant_id, option_id)
         VALUES ($1, $2)`,
        [variant.id, optionId]
      );
    }

    await client.query('COMMIT');

    // Populate options and variant_name
    variant.options = await getVariantOptionsForVariant(variant.id);
    variant.variant_name = variant.options.map(o => o.display_value).join(' / ');

    return variant;
  } catch (err: unknown) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

/** Update variant */
export async function updateProductVariant(
  variantId: number,
  updates: Partial<Pick<ProductVariant, 'sku' | 'price' | 'sale_price' | 'stock_quantity' | 'is_active'>>
): Promise<ProductVariant | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (updates.sku !== undefined) {
    fields.push(`sku = $${paramIndex++}`);
    values.push(updates.sku);
  }
  if (updates.price !== undefined) {
    fields.push(`price = $${paramIndex++}`);
    values.push(updates.price);
  }
  if (updates.sale_price !== undefined) {
    fields.push(`sale_price = $${paramIndex++}`);
    values.push(updates.sale_price);
  }
  if (updates.stock_quantity !== undefined) {
    fields.push(`stock_quantity = $${paramIndex++}`);
    values.push(updates.stock_quantity);
  }
  if (updates.is_active !== undefined) {
    fields.push(`is_active = $${paramIndex++}`);
    values.push(updates.is_active);
  }

  if (fields.length === 0) return null;

  values.push(variantId);
  const result = await query(
    `UPDATE product_variants SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );

  const variant = result.rows[0] as ProductVariant | null;
  if (variant) {
    variant.options = await getVariantOptionsForVariant(variant.id);
    variant.variant_name = variant.options.map(o => o.display_value).join(' / ');
  }

  return variant;
}

/** Delete variant */
export async function deleteProductVariant(variantId: number): Promise<boolean> {
  const result = await query(
    `DELETE FROM product_variants WHERE id = $1`,
    [variantId]
  );
  return result.rowCount !== null && result.rowCount > 0;
}

/** Check if product has variants */
export async function productHasVariants(productId: number): Promise<boolean> {
  const result = await query(
    `SELECT EXISTS(SELECT 1 FROM product_variants WHERE product_id = $1 AND is_active = TRUE)`,
    [productId]
  );
  return result.rows[0].exists;
}

/** Update variant stock quantity */
export async function updateVariantStock(
  variantId: number,
  quantityChange: number
): Promise<boolean> {
  const result = await query(
    `UPDATE product_variants
     SET stock_quantity = stock_quantity + $1
     WHERE id = $2 AND stock_quantity + $1 >= 0
     RETURNING id`,
    [quantityChange, variantId]
  );
  return result.rowCount !== null && result.rowCount > 0;
}