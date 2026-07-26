/**
 * Admin API: Bulk product upload via CSV
 * GET  — download CSV template (columns match templatev1.xlsx; variant columns dynamic from DB)
 * POST — parse CSV and create products with variants (status: draft).
 *        A row whose SKU already exists anywhere in the catalog is treated
 *        as a re-upload: price, stock, and supplier price are updated on the
 *        existing variant in place (options/HSN/product stay untouched)
 *        instead of failing on the SKU unique constraint.
 *
 * Column layout (mirrors templatev1.xlsx row 4):
 *   Product Name | Description | Regular Price | Sale Price | Categories | Brand |
 *   Delivery Time | Product Highlights | Rich Description | FAQs |
 *   Warranty, Return & Exchange Policy |
 *   [active variant types from DB…] |
 *   SKU | Price | Variant Sale Price | HSN Code | Supplier Price | Stock
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { createProduct, generateUniqueSlug, deleteProduct, getProductByName, setProductCategories } from '@/lib/db/products';
import { getCategoryByName } from '@/lib/db/categories';
import {
  getVariantOptionTypes,
  getVariantOptionsByType,
  findOrCreateVariantOption,
  createProductVariant,
  findVariantByOptions,
  getVariantBySku,
  updateProductVariant,
} from '@/lib/db/variants';
import { ok, badRequest, unauthorized, forbidden, serverError } from '@/lib/api-response';
import { toErrorMessage } from '@/lib/error-utils';
import { validateHsnGstInput } from '@/lib/db/hsnGst';
import type { VariantOption } from '@/types';

/** True when `err` is a Postgres unique-violation (duplicate key) error. */
function isUniqueViolation(err: unknown): boolean {
  return typeof err === 'object' && err !== null && (err as { code?: string }).code === '23505';
}

// Matches the DECIMAL(10,2) columns used for every price-like field (products
// and product_variants) — max representable value is 99999999.99. Catches a
// mistyped extra digit before it becomes a raw "numeric field overflow" error.
const MAX_DECIMAL_10_2 = 99999999.99;

// ─── Types ───────────────────────────────────────────────────────────────────

type CSVRow = Record<string, string> & { _row: number };

// ─── Column layout ────────────────────────────────────────────────────────────

// Fixed product-level columns (before variant columns)
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

// Fixed per-variant columns (after variant columns)
const PRICING_COLS = ['SKU', 'Price', 'Variant Sale Price', 'HSN Code', 'Supplier Price', 'Stock'];

// ─── CSV parser ───────────────────────────────────────────────────────────────

// Tokenizes the whole file into records (rows of fields) in one pass, honoring
// quoted fields per RFC 4180 — including quoted fields that contain literal
// newlines (e.g. multi-paragraph "FAQs" or "Rich Description" cells exported
// from Excel/Sheets). A naive line-by-line split breaks on those, since a
// single logical row can span many physical lines.
function tokenizeCSVRecords(text: string): string[][] {
  const records: string[][] = [];
  let record: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  const len = text.length;

  const endField = () => { record.push(field); field = ''; };
  const endRecord = () => { endField(); records.push(record); record = []; };

  while (i < len) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += ch; i++; continue;
    }
    if (ch === '"') { inQuotes = true; i++; continue; }
    if (ch === ',') { endField(); i++; continue; }
    if (ch === '\r') { i++; continue; } // dropped; \n (bare or in \r\n) ends the record
    if (ch === '\n') { endRecord(); i++; continue; }
    field += ch; i++;
  }
  if (field.length > 0 || record.length > 0) endRecord(); // trailing row with no final newline

  return records;
}

function parseCSV(text: string): CSVRow[] {
  const records = tokenizeCSVRecords(text.trim());
  if (records.length < 2) return [];

  const headers = records[0].map(h => h.trim().toLowerCase());

  // A repeated header (e.g. two columns both named "Sale Price") would silently
  // collide when rows are built into name-keyed objects below — one column's
  // data clobbering the other with no error. Fail loudly instead.
  const seen = new Set<string>();
  for (const h of headers) {
    if (!h) continue;
    if (seen.has(h)) {
      throw new Error(`Duplicate column header "${h}" — each column name must be unique (e.g. the per-variant sale price column must be named "Variant Sale Price", not "Sale Price")`);
    }
    seen.add(h);
  }

  const rows: CSVRow[] = [];
  for (let i = 1; i < records.length; i++) {
    const vals = records[i];
    if (vals.every(v => !v.trim())) continue; // skip blank rows
    const row = { _row: i + 1 } as CSVRow;   // +1: header is row 1, first data row is row 2
    headers.forEach((h, idx) => { row[h] = (vals[idx] ?? '').trim(); });
    rows.push(row);
  }
  return rows;
}

// ─── Template download ────────────────────────────────────────────────────────

// Wrap a value in quotes if it contains a comma — otherwise a plain join()
// silently splits it into extra fields (e.g. the "Warranty, Return &
// Exchange Policy" column name), throwing off every column after it.
const q = (v: string) => v.includes(',') ? `"${v}"` : v;

export async function GET() {
  try {
    const optionTypes = await getVariantOptionTypes(); // active types only
    // Column header shown to admins is the human-readable display_name, not
    // the internal `name` slug — the latter can be an arbitrary DB value
    // (e.g. a mistakenly-created type named after a specific product spec)
    // and is never meant to be shown as a column label.
    const variantColNames = optionTypes.map(t => t.display_name);
    const allCols = [...PRODUCT_COLS, ...variantColNames, ...PRICING_COLS];
    const header = allCols.map(q).join(',');

    // Fetch sample values for each active type to populate example rows
    const optionValuesList = await Promise.all(
      optionTypes.map(t => getVariantOptionsByType(t.id))
    );

    const makeRow = (sku: string, price: string, variantVals: string[]) =>
      [
        '"Sample Product"',       // Product Name
        '"Sample description"',   // Description
        price,                    // Regular Price
        '',                       // Sale Price
        'Category',               // Categories
        'BrandName',              // Brand
        '3-5 days',               // Delivery Time
        '',                       // Product Highlights
        '',                       // Rich Description
        '',                       // FAQs
        '',                       // Warranty, Return & Exchange Policy
        ...variantVals.map(q),    // variant columns
        sku,                      // SKU
        price,                    // Price (variant-level)
        '',                       // Variant Sale Price
        '',                       // HSN Code
        '',                       // Supplier Price
        '10',                     // Stock
      ].join(',');

    const rows = [header];

    const varVals1 = optionTypes.map((_, i) => optionValuesList[i][0]?.display_value ?? '');
    rows.push(makeRow('SKU-001', '1000', varVals1));

    // Row 2: vary the first option type if it has a second value (shows per-variant grouping)
    if (optionTypes.length > 0 && optionValuesList[0].length > 1) {
      const varVals2 = optionTypes.map((_, i) =>
        (i === 0 ? optionValuesList[0][1] : optionValuesList[i][0])?.display_value ?? ''
      );
      rows.push(makeRow('SKU-002', '1100', varVals2));
    }

    return new NextResponse(rows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="product-upload-template.csv"',
      },
    });
  } catch {
    // Fallback: minimal template without variant columns if DB is unavailable
    const fallbackCols = [...PRODUCT_COLS, ...PRICING_COLS].map(q).join(',');
    return new NextResponse(
      fallbackCols + '\n"Sample Product","Sample description",1000,,Category,BrandName,3-5 days,,,,,SKU-001,1000,,,, 10',
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
    let rows: CSVRow[];
    try {
      rows = parseCSV(text);
    } catch (err) {
      return badRequest(toErrorMessage(err));
    }
    if (rows.length === 0) return badRequest('CSV is empty or has no data rows');

    // Load active variant option types once for this request.
    // Only columns matching these types are treated as variant dimensions;
    // inactive or unknown columns are silently ignored.
    const activeOptionTypes = await getVariantOptionTypes();

    const errors: { row: number; error: string }[] = [];

    // Group rows by product name, preserving CSV order. A row with no
    // Product Name has nothing to group it with — it used to be silently
    // dropped here (no error, not created), which looked like the row had
    // vanished. Report it instead of ignoring it.
    const groups = new Map<string, CSVRow[]>();
    for (const row of rows) {
      const key = (row['product name'] ?? '').toLowerCase();
      if (!key) {
        errors.push({ row: row._row, error: 'Missing required field(s): Product Name' });
        continue;
      }
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(row);
    }

    let createdProducts = 0;
    let createdVariants = 0;
    let updatedVariants = 0;
    const isAdmin = session.role === 'admin';

    // Cache option values to avoid repeated DB hits for the same type/value across rows
    const optionValueCache = new Map<string, VariantOption>();

    // SKUs must be unique across the entire catalog. A DB round-trip catches
    // that against pre-existing rows, but two rows in the *same* file with
    // the same SKU wouldn't be caught until the second insert — tracking
    // what's been seen so far in this request reports it immediately,
    // consistently, without depending on insert ordering.
    const seenSkus = new Set<string>();

    for (const groupRows of groups.values()) {
      const first = groupRows[0];

      // If a product with this name already exists, add these rows as new variants
      // to it instead of creating a duplicate product. Product-level fields in the
      // CSV (description, price, categories, etc.) are ignored in that case — only
      // edit those from the Products page.
      const existingProduct = await getProductByName(first['product name']);
      let productId: number;
      const isNewProduct = !existingProduct;

      if (existingProduct) {
        productId = parseInt(existingProduct.id, 10);
      } else {
        // Validate required product fields — report exactly which are missing
        const missing = (
          [['product name', 'Product Name'], ['description', 'Description'], ['regular price', 'Regular Price']] as [string, string][]
        ).filter(([key]) => !first[key]).map(([, label]) => label);
        if (missing.length > 0) {
          groupRows.forEach(r => errors.push({ row: r._row, error: `Missing required field(s): ${missing.join(', ')}` }));
          continue;
        }

        const basePrice = parseFloat(first['regular price']);
        if (isNaN(basePrice)) {
          groupRows.forEach(r => errors.push({ row: r._row, error: `Invalid "Regular Price" "${first['regular price']}" — must be a number` }));
          continue;
        }
        if (basePrice < 0) {
          groupRows.forEach(r => errors.push({ row: r._row, error: `Invalid "Regular Price" "${first['regular price']}" — cannot be negative` }));
          continue;
        }
        if (basePrice > MAX_DECIMAL_10_2) {
          groupRows.forEach(r => errors.push({ row: r._row, error: `Invalid "Regular Price" "${first['regular price']}" — exceeds the maximum allowed value (${MAX_DECIMAL_10_2})` }));
          continue;
        }

        const baseSalePrice = first['sale price'] ? parseFloat(first['sale price']) : undefined;
        if (baseSalePrice !== undefined && isNaN(baseSalePrice)) {
          groupRows.forEach(r => errors.push({ row: r._row, error: `Invalid "Sale Price" "${first['sale price']}" — must be a number` }));
          continue;
        }
        if (baseSalePrice !== undefined && baseSalePrice < 0) {
          groupRows.forEach(r => errors.push({ row: r._row, error: `Invalid "Sale Price" "${first['sale price']}" — cannot be negative` }));
          continue;
        }

        // Create the product (draft, no image required)
        try {
          const slug = await generateUniqueSlug(first['product name']);
          const product = await createProduct({
            name: first['product name'],
            description: first['description'],
            price: basePrice,
            sale_price: baseSalePrice,
            category: first['categories'] || undefined,
            brand: first['brand'] || undefined,
            delivery_time: first['delivery time'] || undefined,
            highlights: first['product highlights'] || undefined,
            description_html: first['rich description'] || undefined,
            faqs_html: first['faqs'] || undefined,
            warranty_policy: first['warranty, return & exchange policy'] || undefined,
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

        // Resolve the "Categories" column (comma-separated names) against the real
        // categories table so the product actually shows up under category filters —
        // matching how the normal product form assigns categories. Unmatched names
        // don't block product creation; they're reported so the admin can fix them.
        const categoryNames = (first['categories'] || '')
          .split(',')
          .map(c => c.trim())
          .filter(Boolean);
        if (categoryNames.length > 0) {
          const categoryIds: number[] = [];
          const unmatched: string[] = [];
          for (const name of categoryNames) {
            const cat = await getCategoryByName(name);
            if (cat) categoryIds.push(cat.id);
            else unmatched.push(name);
          }
          if (categoryIds.length > 0) await setProductCategories(String(productId), categoryIds);
          if (unmatched.length > 0) {
            errors.push({
              row: first._row,
              error: `Categor${unmatched.length > 1 ? 'ies' : 'y'} not found: ${unmatched.join(', ')} — product created without ${unmatched.length > 1 ? 'them' : 'it'}`,
            });
          }
        }
      }

      // Create a variant for each row in the group
      const variantsCreatedForProduct: number[] = []; // track for orphan cleanup
      let variantsUpdatedForProduct = 0; // an existing-SKU update also means the product isn't an orphan
      for (const row of groupRows) {
        // Checks run left-to-right in the same order the columns appear in the
        // sheet (SKU, Price, Variant Sale Price, HSN Code, Supplier Price,
        // Stock), so when a row has multiple bad cells the first error
        // reported is always the leftmost one — matching how someone scanning
        // their spreadsheet would find it.

        if (!row['sku']) {
          errors.push({ row: row._row, error: 'Missing required field: SKU' });
          continue;
        }
        if (row['sku'].length > 100) {
          errors.push({ row: row._row, error: `"SKU" "${row['sku']}" is too long — must be 100 characters or fewer` });
          continue;
        }
        if (seenSkus.has(row['sku'])) {
          errors.push({ row: row._row, error: `SKU "${row['sku']}" is duplicated elsewhere in this file — SKUs must be unique across the entire catalog` });
          continue;
        }
        seenSkus.add(row['sku']);

        const varPrice = parseFloat(row['price']);
        if (isNaN(varPrice)) {
          errors.push({ row: row._row, error: `Invalid "Price" "${row['price']}" — must be a number` });
          continue;
        }
        if (varPrice < 0) {
          errors.push({ row: row._row, error: `Invalid "Price" "${row['price']}" — cannot be negative` });
          continue;
        }
        if (varPrice > MAX_DECIMAL_10_2) {
          errors.push({ row: row._row, error: `Invalid "Price" "${row['price']}" — exceeds the maximum allowed value (${MAX_DECIMAL_10_2})` });
          continue;
        }

        let varSalePrice: number | undefined;
        if (row['variant sale price']) {
          varSalePrice = parseFloat(row['variant sale price']);
          if (isNaN(varSalePrice)) {
            errors.push({ row: row._row, error: `Invalid "Variant Sale Price" "${row['variant sale price']}" — must be a number` });
            continue;
          }
          if (varSalePrice < 0) {
            errors.push({ row: row._row, error: `Invalid "Variant Sale Price" "${row['variant sale price']}" — cannot be negative` });
            continue;
          }
        }

        // HSN code format matches the app's own canonical rule (same regex
        // used for the HSN-GST rate admin page) rather than a separately
        // maintained copy that could drift out of sync with it.
        let hsnCode: string | undefined;
        if (isAdmin && row['hsn code']) {
          const hsnError = validateHsnGstInput({ hsn_code: row['hsn code'] });
          if (hsnError) {
            errors.push({ row: row._row, error: `Invalid "HSN Code" "${row['hsn code']}" — ${hsnError}` });
            continue;
          }
          hsnCode = row['hsn code'];
        }

        let varSupplierPrice: number | undefined;
        if (isAdmin && row['supplier price']) {
          varSupplierPrice = parseFloat(row['supplier price']);
          if (isNaN(varSupplierPrice)) {
            errors.push({ row: row._row, error: `Invalid "Supplier Price" "${row['supplier price']}" — must be a number` });
            continue;
          }
          if (varSupplierPrice < 0) {
            errors.push({ row: row._row, error: `Invalid "Supplier Price" "${row['supplier price']}" — cannot be negative` });
            continue;
          }
          if (varSupplierPrice > MAX_DECIMAL_10_2) {
            errors.push({ row: row._row, error: `Invalid "Supplier Price" "${row['supplier price']}" — exceeds the maximum allowed value (${MAX_DECIMAL_10_2})` });
            continue;
          }
        }

        let varStock = 0;
        if (row['stock']) {
          varStock = parseInt(row['stock'], 10);
          if (isNaN(varStock)) {
            errors.push({ row: row._row, error: `Invalid "Stock" "${row['stock']}" — must be a whole number` });
            continue;
          }
          if (varStock < 0) {
            errors.push({ row: row._row, error: `Invalid "Stock" "${row['stock']}" — cannot be negative` });
            continue;
          }
        }

        try {
          // Re-uploading a SKU that already exists (anywhere in the catalog,
          // not just this product) is treated as a price/stock/supplier-price
          // refresh rather than a failed insert: update those fields in place
          // and leave everything else about the variant — its options, HSN
          // code, which product it's attached to — untouched.
          const existingVariant = await getVariantBySku(row['sku']);
          if (existingVariant) {
            // supplier_price is only ever parsed for admins (moderators can't
            // see/set it); passing undefined here leaves it untouched rather
            // than clearing it when a moderator re-uploads the same SKU.
            await updateProductVariant(existingVariant.id, {
              price: varPrice,
              stock_quantity: varStock,
              supplier_price: varSupplierPrice,
            });
            updatedVariants++;
            variantsUpdatedForProduct++;
            continue;
          }

          // Resolve variant option IDs for active types only.
          // New option values (e.g. a new colour) are created automatically.
          const optionIds: number[] = [];
          for (const optType of activeOptionTypes) {
            // Column is keyed by display_name — matches the header the GET
            // template shows admins (the internal `name` slug is never
            // displayed, so it must never be used to look up a CSV column).
            const val = row[optType.display_name.toLowerCase()];
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
              .filter(t => row[t.display_name.toLowerCase()])
              .map(t => `${t.display_name}=${row[t.display_name.toLowerCase()]}`)
              .join(', ');
            errors.push({ row: row._row, error: `Duplicate variant${variantDesc ? ` [${variantDesc}]` : ''} — already defined for this product` });
            continue;
          }

          await createProductVariant(
            productId,
            varPrice,
            optionIds,
            row['sku'], // validated non-blank above
            varSalePrice,
            varStock,
            hsnCode,
            varSupplierPrice,
          );
          createdVariants++;
          variantsCreatedForProduct.push(productId);
        } catch (err) {
          const error = isUniqueViolation(err)
            ? `SKU "${row['sku']}" already exists — SKUs must be unique across the entire catalog, not just this product`
            : `Failed to create variant: ${toErrorMessage(err)}`;
          errors.push({ row: row._row, error });
        }
      }

      // If the product we just created ends up with none of its own variants,
      // remove the orphan so the catalog stays clean — draft products with no
      // variants are unreachable by customers but would still clutter the
      // admin dashboard. Never delete a pre-existing product just because its
      // new variant rows failed. This also covers the case where every row's
      // SKU already existed under a *different* product: nothing was actually
      // created for this one, even though those rows succeeded (as updates
      // elsewhere) rather than failed — hence the two different messages.
      if (isNewProduct && variantsCreatedForProduct.length === 0) {
        await deleteProduct(String(productId));
        createdProducts--;
        const message = variantsUpdatedForProduct > 0
          ? 'Product not created — its SKU(s) already existed elsewhere in the catalog and were updated there instead'
          : 'All variants failed — product creation rolled back';
        groupRows.forEach(r => errors.push({ row: r._row, error: message }));
      }
    }

    return ok({ created_products: createdProducts, created_variants: createdVariants, updated_variants: updatedVariants, errors });
  } catch (err) {
    console.error('Bulk upload error:', err);
    return serverError('Bulk upload failed');
  }
}
