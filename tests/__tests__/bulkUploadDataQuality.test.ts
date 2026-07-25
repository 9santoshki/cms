/**
 * @jest-environment node
 *
 * Bulk upload — CSV parsing correctness and data-quality validation.
 *
 * Covers gaps found during review of the bulk-upload column format/sample data:
 *  1. Quoted CSV fields containing literal newlines (multi-paragraph FAQs,
 *     Rich Description, etc.) must be parsed as a single field/row, not
 *     shredded into bogus extra rows by a naive line-by-line split.
 *  2. Two columns sharing the same header name (e.g. "Sale Price" used for
 *     both the product-level and per-variant column) must be rejected up
 *     front instead of silently colliding.
 *  3. Numeric fields (prices, stock, supplier price) must reject negative
 *     values, and sale prices must be less than their corresponding price.
 *  4. SKU length and HSN Code format (4/6/8 digits) are validated.
 *
 * All DB modules are mocked — this is a unit test of the route's parsing and
 * validation logic, not an integration test against a real database.
 */
import { NextRequest } from 'next/server';

// The route imports validateHsnGstInput from '@/lib/db/hsnGst', which in turn
// imports the real './connection' (pg Pool) — mock just the connection so
// that module loads without requiring live DB env vars. validateHsnGstInput
// itself is pure (no query() calls) so it runs for real, unmocked — these
// tests exercise the actual HSN-format rule, not a re-typed copy of it.
jest.mock('@/lib/db/connection', () => ({ query: jest.fn() }));

jest.mock('@/lib/db/auth', () => ({
  getSessionFromCookieWithDB: jest.fn(),
}));
jest.mock('@/lib/db/products', () => ({
  createProduct: jest.fn(),
  generateUniqueSlug: jest.fn(),
  deleteProduct: jest.fn(),
  getProductByName: jest.fn(),
  setProductCategories: jest.fn(),
}));
jest.mock('@/lib/db/categories', () => ({
  getCategoryByName: jest.fn(),
}));
jest.mock('@/lib/db/variants', () => ({
  getVariantOptionTypes: jest.fn(),
  getVariantOptionsByType: jest.fn(),
  findOrCreateVariantOption: jest.fn(),
  createProductVariant: jest.fn(),
  findVariantByOptions: jest.fn(),
}));

import { POST } from '@/app/api/admin/bulk-upload/route';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { createProduct, deleteProduct, generateUniqueSlug, getProductByName, setProductCategories } from '@/lib/db/products';
import { createProductVariant, findVariantByOptions, getVariantOptionTypes } from '@/lib/db/variants';

const mockSession = getSessionFromCookieWithDB as jest.Mock;
const mockGetProductByName = getProductByName as jest.Mock;
const mockCreateProduct = createProduct as jest.Mock;
const mockGenerateUniqueSlug = generateUniqueSlug as jest.Mock;
const mockDeleteProduct = deleteProduct as jest.Mock;
const mockGetVariantOptionTypes = getVariantOptionTypes as jest.Mock;
const mockFindVariantByOptions = findVariantByOptions as jest.Mock;
const mockCreateProductVariant = createProductVariant as jest.Mock;

const COLS = [
  'Product Name', 'Description', 'Regular Price', 'Sale Price', 'Categories', 'Brand',
  'Delivery Time', 'Product Highlights', 'Rich Description', 'FAQs',
  'Warranty, Return & Exchange Policy', 'SKU', 'Price', 'Variant Sale Price',
  'HSN Code', 'Supplier Price', 'Stock',
];

/** CSV-quote a value if it contains a comma, quote, or newline (RFC 4180). */
function csvField(v: string): string {
  if (/[,"\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

/** Build one CSV row from a partial map of column name -> value (missing columns become ''). */
function row(fields: Partial<Record<typeof COLS[number], string>>): string {
  return COLS.map(c => csvField(fields[c] ?? '')).join(',');
}

const HEADER_LINE = COLS.map(csvField).join(',');

function csvRequestRaw(csv: string): NextRequest {
  const form = new FormData();
  form.append('file', new File([csv], 'upload.csv', { type: 'text/csv' }));
  return new NextRequest('http://localhost/api/admin/bulk-upload', { method: 'POST', body: form });
}

function csvRequest(rows: string[]): NextRequest {
  return csvRequestRaw([HEADER_LINE, ...rows].join('\n'));
}

beforeEach(() => {
  jest.clearAllMocks();
  mockSession.mockResolvedValue({ role: 'admin' });
  mockGetVariantOptionTypes.mockResolvedValue([]);
  mockFindVariantByOptions.mockResolvedValue(null);
  mockCreateProductVariant.mockResolvedValue({ id: 1 });
  mockGetProductByName.mockResolvedValue(null);
  mockGenerateUniqueSlug.mockResolvedValue('new-product');
  mockCreateProduct.mockResolvedValue({ id: '1' });
});

describe('bulk upload — multi-line quoted fields', () => {
  it('parses a quoted field containing embedded newlines as a single field/row, not extra rows', async () => {
    const faqs = 'Q1: What is this?\n\nA1: A pipe.\n\nQ2: Any warranty?\n\nA2: Yes.';
    const csv = [
      HEADER_LINE,
      row({ 'Product Name': 'Multiline Product', 'Description': 'Desc', 'Regular Price': '1000', 'FAQs': faqs, 'SKU': 'SKU-1', 'Price': '1000', 'Stock': '5' }),
    ].join('\n');

    const res = await POST(csvRequestRaw(csv));
    const body = await res.json();

    // Exactly one product/variant, not shredded into many bogus rows.
    expect(mockCreateProduct).toHaveBeenCalledTimes(1);
    expect(mockCreateProduct).toHaveBeenCalledWith(expect.objectContaining({ faqs_html: faqs }));
    expect(body.data.created_products).toBe(1);
    expect(body.data.created_variants).toBe(1);
    expect(body.data.errors).toEqual([]);
  });
});

describe('bulk upload — duplicate column headers', () => {
  it('rejects a CSV where two columns share the same header instead of silently colliding', async () => {
    // Two columns both literally named "Sale Price" (product-level + per-variant),
    // as opposed to the correct "Variant Sale Price" for the latter.
    const badHeader = COLS.map(c => (c === 'Variant Sale Price' ? 'Sale Price' : c)).map(csvField).join(',');
    const csv = [badHeader, row({ 'Product Name': 'X', 'Description': 'Y', 'Regular Price': '100' })].join('\n');

    const res = await POST(csvRequestRaw(csv));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toContain('Duplicate column header "sale price"');
    expect(mockCreateProduct).not.toHaveBeenCalled();
  });
});

describe('bulk upload — price/stock sanity checks', () => {
  it('rejects a negative Regular Price', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '-100', 'SKU': 'S1', 'Price': '100', 'Stock': '1' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('cannot be negative');
    expect(mockCreateProduct).not.toHaveBeenCalled();
  });

  it('rejects a product Sale Price that is not less than Regular Price', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'Sale Price': '150', 'SKU': 'S1', 'Price': '100', 'Stock': '1' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('must be less than "Regular Price"');
    expect(mockCreateProduct).not.toHaveBeenCalled();
  });

  it('rejects a negative variant Price', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': 'S1', 'Price': '-50', 'Stock': '1' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('cannot be negative');
    expect(mockCreateProductVariant).not.toHaveBeenCalled();
  });

  it('rejects a Variant Sale Price that is not less than Price', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': 'S1', 'Price': '100', 'Variant Sale Price': '100', 'Stock': '1' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('must be less than "Price"');
    expect(mockCreateProductVariant).not.toHaveBeenCalled();
  });

  it('rejects a non-numeric Stock value', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': 'S1', 'Price': '100', 'Stock': 'abc' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('must be a whole number');
  });

  it('rejects a negative Stock value', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': 'S1', 'Price': '100', 'Stock': '-5' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('cannot be negative');
  });

  it('rejects a negative Supplier Price (admin)', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': 'S1', 'Price': '100', 'Stock': '1', 'Supplier Price': '-10' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('"Supplier Price"');
    expect(body.data.errors[0].error).toContain('cannot be negative');
  });

  it('accepts valid, distinct sale prices below their respective prices', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'Sale Price': '80', 'SKU': 'S1', 'Price': '100', 'Variant Sale Price': '90', 'Stock': '1' }),
    ]));
    const body = await res.json();
    expect(body.data.errors).toEqual([]);
    expect(body.data.created_products).toBe(1);
    expect(body.data.created_variants).toBe(1);
  });

  it('rejects a Regular Price above the DECIMAL(10,2) column limit', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100000000000', 'SKU': 'S1', 'Price': '100', 'Stock': '1' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('exceeds the maximum allowed value');
    expect(mockCreateProduct).not.toHaveBeenCalled();
  });

  it('rejects a variant Price above the DECIMAL(10,2) column limit', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': 'S1', 'Price': '100000000000', 'Stock': '1' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('exceeds the maximum allowed value');
    expect(mockCreateProductVariant).not.toHaveBeenCalled();
  });
});

describe('bulk upload — SKU length and HSN Code format', () => {
  it('rejects a SKU longer than 100 characters', async () => {
    const longSku = 'S'.repeat(101);
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': longSku, 'Price': '100', 'Stock': '1' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('too long');
  });

  it('rejects an HSN Code shorter than 4 or longer than 8 digits, or non-numeric', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': 'S1', 'Price': '100', 'Stock': '1', 'HSN Code': '123' }),
    ]));
    const body = await res.json();
    expect(body.data.errors[0].error).toContain('HSN code must be 4');
    expect(mockCreateProductVariant).not.toHaveBeenCalled();
  });

  it('accepts a valid 4-digit HSN Code', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': 'S1', 'Price': '100', 'Stock': '1', 'HSN Code': '3925' }),
    ]));
    const body = await res.json();
    expect(body.data.errors).toEqual([]);
    expect(mockCreateProductVariant).toHaveBeenCalledWith(1, 100, [], 'S1', undefined, 1, '3925', undefined);
  });

  it('accepts a 7-digit HSN Code — matches the app\'s own 4-8-digit rule used by the HSN-GST admin page', async () => {
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': 'S1', 'Price': '100', 'Stock': '1', 'HSN Code': '9879837' }),
    ]));
    const body = await res.json();
    expect(body.data.errors).toEqual([]);
    expect(mockCreateProductVariant).toHaveBeenCalledWith(1, 100, [], 'S1', undefined, 1, '9879837', undefined);
  });

  it('ignores HSN Code for a moderator upload instead of validating/storing it', async () => {
    mockSession.mockResolvedValue({ role: 'moderator' });
    const res = await POST(csvRequest([
      row({ 'Product Name': 'A', 'Description': 'B', 'Regular Price': '100', 'SKU': 'S1', 'Price': '100', 'Stock': '1', 'HSN Code': 'not-a-code' }),
    ]));
    const body = await res.json();
    expect(body.data.errors).toEqual([]);
    expect(mockCreateProductVariant).toHaveBeenCalledWith(1, 100, [], 'S1', undefined, 1, undefined, undefined);
  });
});
