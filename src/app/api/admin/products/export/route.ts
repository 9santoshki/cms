/**
 * Admin API: Export all products with their variants as CSV.
 * GET — streams a CSV with one row per variant.
 *
 * Column layout mirrors the bulk-upload template exactly (src/app/api/admin/
 * bulk-upload/route.ts) so an exported file can be re-imported via Bulk Upload
 * unchanged:
 *   Product Name | Description | Regular Price | Sale Price | Categories | Brand |
 *   Delivery Time | Product Highlights | Rich Description | FAQs |
 *   Warranty, Return & Exchange Policy |
 *   [active variant types from DB…] |
 *   SKU | Price | Variant Sale Price | HSN Code | Supplier Price | Stock
 *
 * HSN Code / Supplier Price are admin-only (blanked out for moderators), same
 * gating as bulk-upload POST.
 */
import { NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { query } from '@/lib/db/connection';
import { getAllVariants, getVariantOptionTypes } from '@/lib/db/variants';
import { unauthorized, forbidden, serverError } from '@/lib/api-response';
import type { ProductVariant, VariantOption } from '@/types';

// getAllVariants()'s SQL adds product_name/type_display_name via raw column
// aliases (see src/lib/db/variants.ts) that aren't part of the declared
// ProductVariant/VariantOption interfaces — same cast pattern used in
// src/app/api/products/[id]/variants/route.ts for the same reason.
type ExportedVariant = ProductVariant & { product_name?: string };
type ExportedOption = VariantOption & { type_display_name?: string };

const PRODUCT_COLS = [
  'Product Name',
  'Description',
  'Regular Price',
  'Sale Price',
  'Categories',
  'Brand',
  'Delivery Time',
  'Product Highlights',
  'Rich Description',
  'FAQs',
  'Warranty, Return & Exchange Policy',
];

const PRICING_COLS = ['SKU', 'Price', 'Variant Sale Price', 'HSN Code', 'Supplier Price', 'Stock'];

// Unlike the bulk-upload template's static sample rows, real product data can
// contain commas, quotes, and newlines (rich descriptions, FAQs, etc.) — so
// every field needs full RFC-4180 escaping, not just a comma check.
function csvEscape(value: unknown): string {
  const s = value === null || value === undefined ? '' : String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

interface ProductRow {
  id: number;
  description: string | null;
  price: string | null;
  sale_price: string | null;
  brand: string | null;
  delivery_time: string | null;
  highlights: string | null;
  description_html: string | null;
  faqs_html: string | null;
  warranty_policy: string | null;
}

export async function GET() {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return forbidden('Admin or moderator access required');
    }
    const isAdmin = session.role === 'admin';

    const variants = await getAllVariants(); // active variants, joined w/ product_name, variant_name, options[]
    const optionTypes = await getVariantOptionTypes(); // active types, ordered — same column order as bulk-upload
    const variantColNames = optionTypes.map(t => t.display_name);

    const header = [...PRODUCT_COLS, ...variantColNames, ...PRICING_COLS];
    const rows: string[] = [header.map(csvEscape).join(',')];

    if (variants.length > 0) {
      const productIds = [...new Set(variants.map(v => v.product_id))];

      const productsResult = await query(
        `SELECT id, description, price, sale_price, brand, delivery_time, highlights,
                description_html, faqs_html, warranty_policy
         FROM products WHERE id = ANY($1)`,
        [productIds]
      );
      const productsById = new Map<number, ProductRow>(
        productsResult.rows.map((p: ProductRow) => [p.id, p])
      );

      const catResult = await query(
        `SELECT pc.product_id, STRING_AGG(c.name, ', ' ORDER BY c.name) as categories
         FROM product_categories pc
         JOIN categories c ON c.id = pc.category_id
         WHERE pc.product_id = ANY($1)
         GROUP BY pc.product_id`,
        [productIds]
      );
      const categoriesByProductId = new Map<number, string>(
        catResult.rows.map((r: { product_id: number; categories: string }) => [r.product_id, r.categories])
      );

      for (const raw of variants) {
        const v = raw as ExportedVariant;
        const p = productsById.get(v.product_id);

        const variantOptionValues = variantColNames.map(typeDisplayName => {
          const opt = (v.options as ExportedOption[] | undefined)?.find(o => o.type_display_name === typeDisplayName);
          return opt?.display_value ?? '';
        });

        const row = [
          v.product_name ?? '',
          p?.description ?? '',
          p?.price ?? '',
          p?.sale_price ?? '',
          categoriesByProductId.get(v.product_id) ?? '',
          p?.brand ?? '',
          p?.delivery_time ?? '',
          p?.highlights ?? '',
          p?.description_html ?? '',
          p?.faqs_html ?? '',
          p?.warranty_policy ?? '',
          ...variantOptionValues,
          v.sku ?? '',
          v.price,
          v.sale_price ?? '',
          isAdmin ? (v.hsn_code ?? '') : '',
          isAdmin ? (v.supplier_price ?? '') : '',
          v.stock_quantity,
        ];
        rows.push(row.map(csvEscape).join(','));
      }
    }

    const filename = `products-export-${new Date().toISOString().slice(0, 10)}.csv`;
    return new NextResponse(rows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('Product export error:', err);
    return serverError('Export failed');
  }
}
