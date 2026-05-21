/**
 * Helper for building dynamic SQL UPDATE queries.
 * Avoids repetition of the fields/values array pattern across db modules.
 */

// SECURITY: Whitelist of allowed table names to prevent SQL injection
const ALLOWED_TABLES = [
  'users',
  'products',
  'product_images',
  'product_variants',
  'orders',
  'order_items',
  'cart',
  'appointments',
  'reviews',
  'suppliers',
  'supplier_variants',
  'sessions',
  'inventory_logs',
  'variant_options',
  'variant_option_types',
  'product_variant_values',
  'temp_auth_tokens',
];

/**
 * Validate table name against whitelist.
 * Throws error if table name is not in the allowed list.
 */
function validateTableName(table: string): void {
  if (!ALLOWED_TABLES.includes(table)) {
    throw new Error(`Invalid table name: "${table}". Table must be one of: ${ALLOWED_TABLES.join(', ')}`);
  }
}

interface UpdateQueryResult {
  query: string;
  values: unknown[];
}

/**
 * Build an UPDATE query dynamically from an object of updates.
 *
 * @param table - Table name to update
 * @param updates - Object with field names and values to update
 * @param whereClause - WHERE clause condition (e.g., "id = $1")
 * @param whereValues - Values for the WHERE clause
 * @returns Object with query string and values array
 *
 * @example
 * const result = buildUpdateQuery('products', { name: 'New Name', price: 100 }, 'id = $1', ['123']);
 * // result.query = "UPDATE products SET name = $2, price = $3, updated_at = NOW() WHERE id = $1 RETURNING *"
 * // result.values = ['123', 'New Name', 100]
 */
export function buildUpdateQuery(
  table: string,
  updates: Record<string, unknown>,
  whereClause: string,
  whereValues: unknown[]
): UpdateQueryResult | null {
  // SECURITY: Validate table name against whitelist
  validateTableName(table);

  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = whereValues.length + 1;

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      fields.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  }

  if (fields.length === 0) {
    return null;
  }

  const query = `UPDATE ${table} SET ${fields.join(', ')}, updated_at = NOW() WHERE ${whereClause} RETURNING *`;

  return {
    query,
    values: [...whereValues, ...values],
  };
}

/**
 * Build an UPDATE query for integer primary keys.
 * Convenience wrapper for the common case of WHERE id = $1.
 */
export function buildUpdateQueryById(
  table: string,
  id: string | number,
  updates: Record<string, unknown>
): UpdateQueryResult | null {
  return buildUpdateQuery(table, updates, 'id = $1', [id]);
}