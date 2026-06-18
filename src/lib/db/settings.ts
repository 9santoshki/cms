import { query } from './connection';

export interface SiteSettings {
  shipping: {
    enabled: boolean;
    flat_rate: number;
    min_order_amount: number;
  };
  tax: {
    enabled: boolean;
    rate: number;
    type: string;
  };
}

const DEFAULTS: SiteSettings = {
  shipping: { enabled: true, flat_rate: 1500, min_order_amount: 50000 },
  tax: { enabled: false, rate: 0, type: 'percentage' },
};

export async function getSettings(): Promise<SiteSettings> {
  const res = await query('SELECT * FROM site_settings WHERE id = 1');
  const row = res.rows[0];
  if (!row) return DEFAULTS;
  return {
    shipping: {
      enabled: row.shipping_enabled,
      flat_rate: parseFloat(row.shipping_flat_rate),
      min_order_amount: parseFloat(row.shipping_min_order_amount),
    },
    tax: {
      enabled: row.tax_enabled,
      rate: parseFloat(row.tax_rate),
      type: row.tax_type,
    },
  };
}

export async function updateSettings(settings: SiteSettings): Promise<void> {
  await query(
    `UPDATE site_settings SET
      shipping_enabled = $1,
      shipping_flat_rate = $2,
      shipping_min_order_amount = $3,
      tax_enabled = $4,
      tax_rate = $5,
      tax_type = $6,
      updated_at = NOW()
    WHERE id = 1`,
    [
      settings.shipping.enabled,
      settings.shipping.flat_rate,
      settings.shipping.min_order_amount,
      settings.tax.enabled,
      settings.tax.rate,
      settings.tax.type,
    ]
  );
}
