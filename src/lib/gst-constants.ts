/**
 * GST constants shared between DB layer, API routes, and client components.
 * No Node.js dependencies — safe to import from 'use client' files.
 */

export const VALID_GST_RATES = [0, 0.25, 3, 5, 12, 18, 28] as const;
export type GstRate = typeof VALID_GST_RATES[number];

/** Shape of an hsn_gst_rates row returned by the API */
export interface HsnGstRate {
  id: number;
  hsn_code: string;
  description: string | null;
  gst_rate: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
