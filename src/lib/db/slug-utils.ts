/**
 * Shared slug generation utility.
 *
 * Replaces the duplicated generateUniqueSlug() implementations in
 * products.ts and categories.ts.
 */
import { query } from './connection';

/**
 * Generate a URL-safe slug from a name and ensure it is unique
 * in the given table/column.
 */
export async function generateUniqueSlug(
  name: string,
  table: string,
  slugColumn = 'slug',
  excludeId?: number,
): Promise<string> {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || table;

  let result;
  if (excludeId !== undefined) {
    result = await query(
      `SELECT ${slugColumn} FROM ${table} WHERE (${slugColumn} = $1 OR ${slugColumn} LIKE $2) AND id != $3`,
      [base, `${base}-%`, excludeId],
    );
  } else {
    result = await query(
      `SELECT ${slugColumn} FROM ${table} WHERE ${slugColumn} = $1 OR ${slugColumn} LIKE $2`,
      [base, `${base}-%`],
    );
  }

  const existing = new Set(result.rows.map((r: any) => r[slugColumn]));
  if (!existing.has(base)) return base;

  for (let counter = 2; counter <= 100; counter++) {
    const candidate = `${base}-${counter}`;
    if (!existing.has(candidate)) return candidate;
  }

  return `${base}-${Date.now()}`;
}
