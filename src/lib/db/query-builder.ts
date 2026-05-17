/**
 * Helper for building dynamic SQL UPDATE queries.
 * Avoids repetition of the fields/values array pattern across db modules.
 */

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