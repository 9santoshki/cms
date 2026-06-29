import { query } from './connection';
import { buildUpdateQueryById } from './query-builder';

export const VALID_GST_RATES = [0, 0.25, 3, 5, 12, 18, 28] as const;
export type GstRate = typeof VALID_GST_RATES[number];

export interface HsnGstRate {
  id: number;
  hsn_code: string;
  description: string | null;
  gst_rate: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HsnGstListOptions {
  search?: string;
  gst_rate?: number;
  active_only?: boolean;
}

/**
 * Validate HSN/GST input fields. Returns an error string, or null if valid.
 * Pass `required: true` for create (POST) — all key fields become mandatory.
 */
export function validateHsnGstInput(
  body: { hsn_code?: unknown; gst_rate?: unknown; description?: unknown },
  { required = false }: { required?: boolean } = {}
): string | null {
  const { hsn_code, gst_rate, description } = body;

  if (required && (!hsn_code || typeof hsn_code !== 'string')) {
    return 'HSN code is required';
  }
  if (hsn_code !== undefined) {
    if (!/^\d{4,8}$/.test(String(hsn_code).trim())) return 'HSN code must be 4–8 digits';
  }
  if (required && (gst_rate === undefined || gst_rate === null)) {
    return 'GST rate is required';
  }
  if (gst_rate !== undefined && gst_rate !== null) {
    const rate = parseFloat(String(gst_rate));
    if (isNaN(rate) || !(VALID_GST_RATES as readonly number[]).includes(rate)) {
      return `GST rate must be one of: ${VALID_GST_RATES.join(', ')}`;
    }
  }
  if (description != null && String(description).length > 500) {
    return 'Description max 500 characters';
  }
  return null;
}

export async function listHsnGstRates(opts: HsnGstListOptions = {}): Promise<HsnGstRate[]> {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (opts.active_only) {
    conditions.push(`is_active = true`);
  }
  if (opts.gst_rate !== undefined) {
    values.push(opts.gst_rate);
    conditions.push(`gst_rate = $${values.length}`);
  }
  if (opts.search) {
    values.push(`%${opts.search}%`);
    const n = values.length;
    conditions.push(`(hsn_code ILIKE $${n} OR description ILIKE $${n})`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const res = await query(
    `SELECT * FROM hsn_gst_rates ${where} ORDER BY hsn_code ASC`,
    values
  );
  return res.rows.map(normalise);
}

export async function getHsnGstRateById(id: number): Promise<HsnGstRate | null> {
  const res = await query(`SELECT * FROM hsn_gst_rates WHERE id = $1`, [id]);
  return res.rows[0] ? normalise(res.rows[0]) : null;
}

export async function createHsnGstRate(
  hsn_code: string,
  gst_rate: number,
  description?: string
): Promise<HsnGstRate> {
  const res = await query(
    `INSERT INTO hsn_gst_rates (hsn_code, gst_rate, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [hsn_code.trim(), gst_rate, description?.trim() || null]
  );
  return normalise(res.rows[0]);
}

export async function updateHsnGstRate(
  id: number,
  updates: Partial<Pick<HsnGstRate, 'hsn_code' | 'gst_rate' | 'description' | 'is_active'>>
): Promise<HsnGstRate | null> {
  const dbUpdates: Record<string, unknown> = {};
  if (updates.hsn_code !== undefined) dbUpdates.hsn_code = updates.hsn_code.trim();
  if (updates.gst_rate !== undefined) dbUpdates.gst_rate = updates.gst_rate;
  if (updates.description !== undefined) dbUpdates.description = updates.description?.trim() || null;
  if (updates.is_active !== undefined) dbUpdates.is_active = updates.is_active;

  const built = buildUpdateQueryById('hsn_gst_rates', id, dbUpdates);
  if (!built) return null; // nothing to update

  const res = await query(built.query, built.values);
  return res.rows[0] ? normalise(res.rows[0]) : null;
}

export async function deleteHsnGstRate(id: number): Promise<boolean> {
  const res = await query(`DELETE FROM hsn_gst_rates WHERE id = $1 RETURNING id`, [id]);
  return res.rowCount !== null && res.rowCount > 0;
}

function normalise(row: any): HsnGstRate {
  return {
    ...row,
    gst_rate: parseFloat(row.gst_rate),
  };
}
