/**
 * Admin API: Bulk product upload via CSV
 * GET  — download CSV template
 * POST — parse CSV and create products with variants (status: draft)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { createProduct, generateUniqueSlug, deleteProduct } from '@/lib/db/products';
import {
  findOrCreateVariantOptionType,
  findOrCreateVariantOption,
  createProductVariant,
  findVariantByOptions,
} from '@/lib/db/variants';
import { ok, badRequest, unauthorized, forbidden, serverError } from '@/lib/api-response';
import { toErrorMessage } from '@/lib/error-utils';
import type { VariantOptionType, VariantOption } from '@/types';

// ─── Types ───────────────────────────────────────────────────────────────────

type CSVRow = Record<string, string> & { _row: number };

// ─── Constants ───────────────────────────────────────────────────────────────

const VARIANT_COLS = ['color', 'size', 'thickness', 'material'] as const;

const TEMPLATE_CSV = [
  'name,description,brand,category,subcategory,price,sale_price,sku,stock_quantity,delivery_time,highlights,hsn_code,supplier_price,color,size,thickness,material',
  '"Luxury Wallpaper","Modern geometric design",BrandX,Wallpapers,Geometric,2500,2200,WP-GEO-BLK-SM,50,3-5 days,,,,Black,Small,,',
  '"Luxury Wallpaper","Modern geometric design",BrandX,Wallpapers,Geometric,2600,2300,WP-GEO-GRY-SM,40,3-5 days,,,,Grey,Small,,',
].join('\n');

// ─── CSV parser ───────────────────────────────────────────────────────────────

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      let field = '';
      i++;
      while (i < line.length) {
        if (line[i] === '"' && line[i + 1] === '"') { field += '"'; i += 2; }
        else if (line[i] === '"') { i++; break; }
        else { field += line[i++]; }
      }
      fields.push(field);
      if (line[i] === ',') i++;
    } else {
      const end = line.indexOf(',', i);
      if (end === -1) { fields.push(line.slice(i)); break; }
      fields.push(line.slice(i, end));
      i = end + 1;
    }
  }
  return fields;
}

function parseCSV(text: string): CSVRow[] {
  const lines = text.trim().split('\n').map(l => l.replace(/\r$/, ''));
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
  const rows: CSVRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = parseCSVLine(lines[i]);
    if (vals.every(v => !v.trim())) continue; // skip blank rows
    const row = { _row: i + 1 } as CSVRow;   // +1: header is row 1, first data row is row 2
    headers.forEach((h, idx) => { row[h] = (vals[idx] ?? '').trim(); });
    rows.push(row);
  }
  return rows;
}

// ─── Template download ────────────────────────────────────────────────────────

export async function GET() {
  return new NextResponse(TEMPLATE_CSV, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="product-upload-template.csv"',
    },
  });
}

// ─── Upload ───────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return forbidden('Admin or moderator access required');
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) return badRequest('CSV file is required');

    const text = await file.text();
    const rows = parseCSV(text);
    if (rows.length === 0) return badRequest('CSV is empty or has no data rows');

    // Group rows by product name, preserving CSV order
    const groups = new Map<string, CSVRow[]>();
    for (const row of rows) {
      const key = (row['name'] ?? '').toLowerCase();
      if (!key) continue;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(row);
    }

    const errors: { row: number; error: string }[] = [];
    let createdProducts = 0;
    let createdVariants = 0;
    const isAdmin = session.role === 'admin';

    // Request-scoped caches: avoid O(rows × cols) repeated DB lookups for the same
    // option type / option value across all rows in the upload.
    const optionTypeCache = new Map<string, VariantOptionType>();
    const optionValueCache = new Map<string, VariantOption>();

    for (const groupRows of groups.values()) {
      const first = groupRows[0];

      // Validate required product fields from the first row of the group
      if (!first['name'] || !first['description'] || !first['price']) {
        groupRows.forEach(r => errors.push({ row: r._row, error: 'Missing required field(s): name, description, price' }));
        continue;
      }

      const basePrice = parseFloat(first['price']);
      if (isNaN(basePrice)) {
        groupRows.forEach(r => errors.push({ row: r._row, error: 'Invalid price — skipping product group' }));
        continue;
      }

      // Create the product (draft, no image required)
      let productId: number;
      try {
        const slug = await generateUniqueSlug(first['name']);
        const product = await createProduct({
          name: first['name'],
          description: first['description'],
          price: basePrice,
          sale_price: first['sale_price'] ? parseFloat(first['sale_price']) : undefined,
          category: first['category'] || undefined,
          subcategory: first['subcategory'] || undefined,
          brand: first['brand'] || undefined,
          delivery_time: first['delivery_time'] || undefined,
          highlights: first['highlights'] || undefined,
          slug,
          status: 'draft',
        });
        productId = parseInt(product.id, 10);
        createdProducts++;
      } catch (err) {
        groupRows.forEach(r => errors.push({
          row: r._row,
          error: `Failed to create product: ${toErrorMessage(err)}`,
        }));
        continue;
      }

      // Create a variant for each row in the group
      const variantsCreatedForProduct: number[] = []; // track count for orphan cleanup
      for (const row of groupRows) {
        const varPrice = parseFloat(row['price']);
        if (isNaN(varPrice)) {
          errors.push({ row: row._row, error: 'Invalid price — variant skipped' });
          continue;
        }

        try {
          // Resolve variant option IDs (auto-create unknown values).
          // Cache results to avoid repeat DB hits for the same col/value across rows.
          const optionIds: number[] = [];
          for (const col of VARIANT_COLS) {
            const val = row[col];
            if (!val) continue;

            let optType = optionTypeCache.get(col);
            if (!optType) {
              optType = await findOrCreateVariantOptionType(col);
              optionTypeCache.set(col, optType);
            }

            const valueKey = `${col}:${val.toLowerCase()}`;
            let opt = optionValueCache.get(valueKey);
            if (!opt) {
              opt = await findOrCreateVariantOption(optType.id, val);
              optionValueCache.set(valueKey, opt);
            }

            optionIds.push(opt.id);
          }

          // Skip duplicate variant combinations within this product
          const dup = await findVariantByOptions(productId, optionIds);
          if (dup) {
            errors.push({ row: row._row, error: 'Duplicate variant combination — skipped' });
            continue;
          }

          await createProductVariant(
            productId,
            varPrice,
            optionIds,
            row['sku'] || undefined,
            row['sale_price'] ? parseFloat(row['sale_price']) : undefined,
            row['stock_quantity'] ? parseInt(row['stock_quantity'], 10) : 0,
            isAdmin && row['hsn_code'] ? row['hsn_code'] : undefined,
            isAdmin && row['supplier_price'] ? parseFloat(row['supplier_price']) : undefined,
          );
          createdVariants++;
          variantsCreatedForProduct.push(productId);
        } catch (err) {
          errors.push({
            row: row._row,
            error: `Failed to create variant: ${toErrorMessage(err)}`,
          });
        }
      }

      // If every variant row failed, remove the orphan product so the catalog
      // stays clean. Draft products with no variants are unreachable by customers
      // but would still clutter the admin dashboard.
      if (variantsCreatedForProduct.length === 0) {
        await deleteProduct(String(productId));
        createdProducts--;
        groupRows.forEach(r => errors.push({
          row: r._row,
          error: 'All variants failed — product creation rolled back',
        }));
      }
    }

    return ok({ created_products: createdProducts, created_variants: createdVariants, errors });
  } catch (err) {
    console.error('Bulk upload error:', err);
    return serverError('Bulk upload failed');
  }
}
