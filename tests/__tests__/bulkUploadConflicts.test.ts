/**
 * @jest-environment node
 *
 * Bulk upload — data conflict rules.
 *
 * Covers the three conflict-handling gaps fixed after review:
 *  1. A CSV row for a Product Name that already exists must add a variant to
 *     that product, not silently create a duplicate product.
 *  2. The "Categories" column must resolve to real category_id rows (like the
 *     normal product form does), reporting unmatched names without failing
 *     the whole row.
 *  3. A SKU collision (globally unique across the catalog) must surface a
 *     clear message instead of the raw Postgres error text.
 *
 * All DB modules are mocked — this is a unit test of the route's conflict
 * logic, not an integration test against a real database.
 */
import { NextRequest } from 'next/server';

// The route now imports validateHsnGstInput from '@/lib/db/hsnGst', which in
// turn imports the real './connection' (pg Pool) — mock just the connection
// so that module loads without requiring live DB env vars. validateHsnGstInput
// itself is pure (no query() calls) so it runs for real, unmocked.
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
  getVariantBySku: jest.fn(),
  updateProductVariant: jest.fn(),
}));

import { POST } from '@/app/api/admin/bulk-upload/route';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { createProduct, deleteProduct, generateUniqueSlug, getProductByName, setProductCategories } from '@/lib/db/products';
import { getCategoryByName } from '@/lib/db/categories';
import { createProductVariant, findVariantByOptions, getVariantOptionTypes, getVariantBySku } from '@/lib/db/variants';

const mockSession = getSessionFromCookieWithDB as jest.Mock;
const mockGetProductByName = getProductByName as jest.Mock;
const mockCreateProduct = createProduct as jest.Mock;
const mockGenerateUniqueSlug = generateUniqueSlug as jest.Mock;
const mockDeleteProduct = deleteProduct as jest.Mock;
const mockSetProductCategories = setProductCategories as jest.Mock;
const mockGetCategoryByName = getCategoryByName as jest.Mock;
const mockGetVariantOptionTypes = getVariantOptionTypes as jest.Mock;
const mockFindVariantByOptions = findVariantByOptions as jest.Mock;
const mockCreateProductVariant = createProductVariant as jest.Mock;
const mockGetVariantBySku = getVariantBySku as jest.Mock;

// Fixed columns, no variant-dimension columns in these tests (getVariantOptionTypes -> [])
const COLS = [
  'Product Name', 'Description', 'Regular Price', 'Sale Price', 'Categories', 'Brand',
  'Delivery Time', 'Product Highlights', 'Rich Description', 'FAQs',
  'Warranty, Return & Exchange Policy', 'SKU', 'Price', 'Variant Sale Price',
  'HSN Code', 'Supplier Price', 'Stock',
];

/** Build one CSV row from a partial map of column name -> value (missing columns become ''). */
function row(fields: Partial<Record<typeof COLS[number], string>>): string {
  return COLS.map(c => {
    const v = fields[c] ?? '';
    return v.includes(',') ? `"${v}"` : v;
  }).join(',');
}

const HEADER_LINE = COLS.map(c => c.includes(',') ? `"${c}"` : c).join(',');

function csvRequest(rows: string[]): NextRequest {
  const csv = [HEADER_LINE, ...rows].join('\n');
  const form = new FormData();
  form.append('file', new File([csv], 'upload.csv', { type: 'text/csv' }));
  return new NextRequest('http://localhost/api/admin/bulk-upload', { method: 'POST', body: form });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockSession.mockResolvedValue({ role: 'admin' });
  mockGetVariantOptionTypes.mockResolvedValue([]);
  mockFindVariantByOptions.mockResolvedValue(null);
  mockCreateProductVariant.mockResolvedValue({ id: 1 });
  // No existing variant with this SKU by default — exercises the
  // create-new-variant path these tests are actually about. Individual
  // tests that care about the re-upload/update path override this.
  mockGetVariantBySku.mockResolvedValue(null);
});

describe('bulk upload — duplicate product name', () => {
  it('adds a variant to the existing product instead of creating a duplicate', async () => {
    mockGetProductByName.mockResolvedValue({ id: '42', name: 'Existing Product' });

    // Product-level fields left blank — they must be ignored, not rejected,
    // when the row is appending to an existing product.
    const res = await POST(csvRequest([
      row({ 'Product Name': 'Existing Product', 'SKU': 'SKU-100', 'Price': '1000', 'Stock': '5' }),
    ]));
    const body = await res.json();

    expect(mockCreateProduct).not.toHaveBeenCalled();
    expect(mockCreateProductVariant).toHaveBeenCalledWith(
      42, 1000, [], 'SKU-100', undefined, 5, undefined, undefined
    );
    expect(body.data.created_products).toBe(0);
    expect(body.data.created_variants).toBe(1);
    expect(body.data.errors).toEqual([]);
  });
});

describe('bulk upload — category resolution', () => {
  it('links matched category names via the junction table and reports unmatched ones without failing the row', async () => {
    mockGetProductByName.mockResolvedValue(null);
    mockGenerateUniqueSlug.mockResolvedValue('new-product');
    mockCreateProduct.mockResolvedValue({ id: '7' });
    mockGetCategoryByName.mockImplementation((name: string) =>
      Promise.resolve(name === 'Sofas' ? { id: 1, name: 'Sofas' } : null)
    );

    const res = await POST(csvRequest([
      row({
        'Product Name': 'New Product', 'Description': 'Desc', 'Regular Price': '1000',
        'Categories': 'Sofas,Nonexistent', 'SKU': 'SKU-200', 'Price': '1000', 'Stock': '5',
      }),
    ]));
    const body = await res.json();

    expect(mockSetProductCategories).toHaveBeenCalledWith('7', [1]);
    expect(body.data.created_products).toBe(1); // not rolled back
    expect(body.data.errors).toEqual([
      expect.objectContaining({ error: expect.stringContaining('Nonexistent') }),
    ]);
  });
});

describe('bulk upload — SKU uniqueness', () => {
  it('reports a clear message on a SKU collision instead of the raw DB error', async () => {
    mockGetProductByName.mockResolvedValue(null);
    mockGenerateUniqueSlug.mockResolvedValue('new-product');
    mockCreateProduct.mockResolvedValue({ id: '9' });
    mockDeleteProduct.mockResolvedValue(true);
    mockCreateProductVariant.mockRejectedValue(
      Object.assign(new Error('duplicate key value violates unique constraint "product_variants_sku_key"'), { code: '23505' })
    );

    const res = await POST(csvRequest([
      row({ 'Product Name': 'New Product', 'Description': 'Desc', 'Regular Price': '1000', 'SKU': 'SKU-DUP', 'Price': '1000', 'Stock': '5' }),
    ]));
    const body = await res.json();

    expect(body.data.errors).toEqual([
      expect.objectContaining({
        error: 'SKU "SKU-DUP" already exists — SKUs must be unique across the entire catalog, not just this product',
      }),
      expect.objectContaining({ error: 'All variants failed — product creation rolled back' }),
    ]);
    // All variants for this newly-created product failed -> rolled back.
    expect(mockDeleteProduct).toHaveBeenCalledWith('9');
    expect(body.data.created_products).toBe(0);
  });
});
