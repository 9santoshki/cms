/**
 * Admin API: Bulk product upload via CSV
 * GET  — download CSV template (dynamic: reflects active variant types from DB)
 * POST — parse CSV and create products with variants (status: draft)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { createProduct, generateUniqueSlug, deleteProduct } from '@/lib/db/products';
import {
  getVariantOptionTypes,
  getVariantOptionsByType,
  findOrCreateVariantOption,
  createProductVariant,
  findVariantByOptions,
} from '@/lib/db/variants';
import { ok, badRequest, unauthorized, forbidden, serverError } from '@/lib/api-response';
import { toErrorMessage } from '@/lib/error-utils';
import type { VariantOption } from '@/types';

// ─── Types ───────────────────────────────────────────────────────────────────

type CSVRow = Record<string, string> & { _row: number };

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

const PRODUCT_COLS = [
  'name', 'description', 'brand', 'category', 'subcategory',
  'price', 'sale_price', 'sku', 'stock_quantity', 'delivery_time',
  'highlights', 'hsn_code', 'supplier_price',
];

export async function GET() {
  try {
    const optionTypes = await getVariantOptionTypes(); // active types only
    const variantColNames = optionTypes.map(t => t.name);
    const header = [...PRODUCT_COLS, ...variantColNames].join(',');

    // Fetch sample values for each active type to populate example rows
    const optionValuesList = await Promise.all(
      optionTypes.map(t => getVariantOptionsByType(t.id))
    );

    const makeRow = (sku: string, variantVals: string[]) =>
      ['"Luxury Wallpaper"', '"Modern geometric design"', 'BrandX', 'Wallpapers', 'Geometric',
        '2500', '2200', sku, '50', '3-5 days', '', '', '', ...variantVals].join(',');

    const rows = [header];

    // Row 1: first option value for each active type
    const varVals1 = optionTypes.map((_, i) => optionValuesList[i][0]?.display_value ?? '');
    rows.push(makeRow('WP-EXAMPLE-01', varVals1));

    // Row 2: vary the first option type if it has a second value (shows grouping by name)
    if (optionTypes.length > 0 && optionValuesList[0].length > 1) {
      const varVals2 = optionTypes.map((_, i) =>
        (i === 0 ? optionValuesList[0][1] : optionValuesList[i][0])?.display_value ?? ''
      );
      rows.push(makeRow('WP-EXAMPLE-02', varVals2));
    }

    return new NextResponse(rows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="product-upload-template.csv"',
      },
    });
  } catch {
    // Fallback: minimal template without variant columns if DB is unavailable
    return new NextResponse(
      PRODUCT_COLS.join(',') + '\n' +
      '"Luxury Wallpaper","Modern geometric design",BrandX,Wallpapers,Geometric,2500,2200,WP-EXAMPLE-01,50,3-5 days,,,',
      {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="product-upload-template.csv"',
        },
      }
    );
  }
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

    // Load active variant option types once for this request.
    // Only columns matching these types are treated as variant dimensions;
    // inactive or unknown columns are silently ignored.
    const activeOptionTypes = await getVariantOptionTypes();

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

    // Cache option values to avoid repeated DB hits for the same type/value across rows
    const optionValueCache = new Map<string, VariantOption>();

    for (const groupRows of groups.values()) {
      const first = groupRows[0];

      // Validate required product fields — report exactly which are missing
      const missing = ['name', 'description', 'price'].filter(f => !first[f]);
      if (missing.length > 0) {
        groupRows.forEach(r => errors.push({ row: r._row, error: `Missing required field(s): ${missing.join(', ')}` }));
        continue;
      }

      const basePrice = parseFloat(first['price']);
      if (isNaN(basePrice)) {
        groupRows.forEach(r => errors.push({ row: r._row, error: `Invalid price "${first['price']}" — must be a number` }));
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
      const variantsCreatedForProduct: number[] = []; // track for orphan cleanup
      for (const row of groupRows) {
        const varPrice = parseFloat(row['price']);
        if (isNaN(varPrice)) {
          errors.push({ row: row._row, error: `Invalid price "${row['price']}" — must be a number` });
          continue;
        }

        if (row['sale_price'] && isNaN(parseFloat(row['sale_price']))) {
          errors.push({ row: row._row, error: `Invalid sale_price "${row['sale_price']}" — must be a number` });
          continue;
        }

        try {
          // Resolve variant option IDs for active types only.
          // New option values (e.g. a new colour) are created automatically.
          const optionIds: number[] = [];
          for (const optType of activeOptionTypes) {
            const val = row[optType.name];
            if (!val) continue;

            const valueKey = `${optType.name}:${val.toLowerCase()}`;
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
            const variantDesc = activeOptionTypes
              .filter(t => row[t.name])
              .map(t => `${t.display_name}=${row[t.name]}`)
              .join(', ');
            errors.push({ row: row._row, error: `Duplicate variant${variantDesc ? ` [${variantDesc}]` : ''} — already defined for this product` });
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
