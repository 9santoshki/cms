/**
 * @jest-environment node
 *
 * Bulk upload — CSV template column alignment.
 *
 * Covers a real bug found on production: the downloaded template's header
 * row was built with a plain `.join(',')`, which doesn't CSV-quote column
 * names containing a literal comma (the fixed "Warranty, Return & Exchange
 * Policy" column). That silently split one header cell into two, so the
 * header row had one more field than every data row — shifting every
 * column after it (all variant columns, SKU, Price, Stock) by one position
 * relative to the data underneath it.
 *
 * Also covers a second bug: variant columns were labeled with the option
 * type's internal `name` slug instead of its human-readable `display_name`
 * — on production, `name` was garbage for several types (e.g. a specific
 * hinge model number). The header must show display_name, and the upload
 * parser must look values up by that same field so a freshly downloaded
 * template actually re-uploads correctly.
 */
import { NextRequest } from 'next/server';

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

import { GET, POST } from '@/app/api/admin/bulk-upload/route';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { createProduct, generateUniqueSlug, getProductByName } from '@/lib/db/products';
import {
  createProductVariant,
  findOrCreateVariantOption,
  findVariantByOptions,
  getVariantOptionsByType,
  getVariantOptionTypes,
} from '@/lib/db/variants';

const mockSession = getSessionFromCookieWithDB as jest.Mock;
const mockGetProductByName = getProductByName as jest.Mock;
const mockCreateProduct = createProduct as jest.Mock;
const mockGenerateUniqueSlug = generateUniqueSlug as jest.Mock;
const mockGetVariantOptionTypes = getVariantOptionTypes as jest.Mock;
const mockGetVariantOptionsByType = getVariantOptionsByType as jest.Mock;
const mockFindOrCreateVariantOption = findOrCreateVariantOption as jest.Mock;
const mockFindVariantByOptions = findVariantByOptions as jest.Mock;
const mockCreateProductVariant = createProductVariant as jest.Mock;

// Mirrors the corrupted production data: `name` is a garbage internal slug,
// `display_name` is the clean label admins actually configured.
const HINGE_TYPE = { id: 106, name: 'hinges_crank', display_name: 'Hinges', is_active: true, display_order: 3 };

/** Quote-aware single-line CSV field splitter (handles the quoted "Warranty, ..." column). */
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      const end = line.indexOf('"', i + 1);
      fields.push(line.slice(i + 1, end));
      i = end + 2;
    } else {
      const end = line.indexOf(',', i);
      if (end === -1) { fields.push(line.slice(i)); break; }
      fields.push(line.slice(i, end));
      i = end + 1;
    }
  }
  return fields;
}

function csvRequestRaw(csv: string): NextRequest {
  const form = new FormData();
  form.append('file', new File([csv], 'upload.csv', { type: 'text/csv' }));
  return new NextRequest('http://localhost/api/admin/bulk-upload', { method: 'POST', body: form });
}

beforeEach(() => {
  jest.clearAllMocks();
  mockSession.mockResolvedValue({ role: 'admin' });
  mockFindVariantByOptions.mockResolvedValue(null);
  mockCreateProductVariant.mockResolvedValue({ id: 1 });
  mockGetProductByName.mockResolvedValue(null);
  mockGenerateUniqueSlug.mockResolvedValue('new-product');
  mockCreateProduct.mockResolvedValue({ id: '1' });
});

describe('bulk upload template — header/data column alignment', () => {
  it('produces a header row with the same field count as its data rows (fixed columns only)', async () => {
    mockGetVariantOptionTypes.mockResolvedValue([]);

    const res = await GET();
    const text = await res.text();
    const [headerLine, dataLine] = text.trim().split('\n');

    const headerFields = parseCsvLine(headerLine);
    const dataFields = parseCsvLine(dataLine);
    // This is the actual regression check: a naive (unquoted) join would
    // have split "Warranty, Return & Exchange Policy" into two header
    // cells, giving the header one more field than every data row.
    expect(headerFields).toContain('Warranty, Return & Exchange Policy');
    expect(headerFields.length).toBe(dataFields.length);
  });

  it('produces a header row with the same field count as its data rows (with variant columns)', async () => {
    mockGetVariantOptionTypes.mockResolvedValue([HINGE_TYPE]);
    mockGetVariantOptionsByType.mockResolvedValue([{ display_value: '0 Crank' }]);

    const res = await GET();
    const text = await res.text();
    const [headerLine, dataLine] = text.trim().split('\n');
    expect(parseCsvLine(headerLine).length).toBe(parseCsvLine(dataLine).length);
  });

  it('labels the variant column with display_name, not the internal name slug', async () => {
    mockGetVariantOptionTypes.mockResolvedValue([HINGE_TYPE]);
    mockGetVariantOptionsByType.mockResolvedValue([{ display_value: '0 Crank' }]);

    const res = await GET();
    const header = (await res.text()).split('\n')[0];
    expect(header).toContain('Hinges');
    expect(header).not.toContain('hinges_crank');
  });
});

describe('bulk upload — parsing a column keyed by display_name', () => {
  it('resolves a variant option using the display_name column header (matches what GET() now emits)', async () => {
    mockGetVariantOptionTypes.mockResolvedValue([HINGE_TYPE]);
    mockFindOrCreateVariantOption.mockResolvedValue({ id: 55, display_value: '0 Crank' });

    const csv = [
      'Product Name,Description,Regular Price,Sale Price,Categories,Brand,Delivery Time,Product Highlights,Rich Description,FAQs,"Warranty, Return & Exchange Policy",Hinges,SKU,Price,Variant Sale Price,HSN Code,Supplier Price,Stock',
      'Door,A door,1000,,,,,,,,,0 Crank,SKU-1,1000,,,,5',
    ].join('\n');

    const res = await POST(csvRequestRaw(csv));
    const body = await res.json();

    expect(body.data.errors).toEqual([]);
    // findOrCreateVariantOption called with the Hinges type's id and the
    // value pulled from the "Hinges" column — proves the lookup used
    // display_name, not the garbage `hinges_crank` internal slug.
    expect(mockFindOrCreateVariantOption).toHaveBeenCalledWith(106, '0 Crank');
    expect(mockCreateProductVariant).toHaveBeenCalledWith(1, 1000, [55], 'SKU-1', undefined, 5, undefined, undefined);
  });
});
