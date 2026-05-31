import { query, getClient } from './connection';
import { getProductImages, getProductImagesBatch } from './productImages';
import { getCloudflareImageUrl } from '../cloudflare';
import { buildUpdateQueryById } from './query-builder';
import { generateUniqueSlug as generateSlug } from './slug-utils';

/**
 * Generate a unique product slug.
 * Thin wrapper around the shared utility for backward compatibility.
 */
export async function generateUniqueSlug(name: string, excludeId?: string): Promise<string> {
  return generateSlug(name, 'products', 'slug', excludeId ? Number(excludeId) : undefined);
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  image_url?: string;
  category?: string;
  subcategory?: string;
  slug?: string;
  stock_quantity?: number;
  /** Lifecycle state — customers only see 'published' products */
  status?: 'draft' | 'pending_review' | 'published' | 'rejected' | 'archived';
  /** Reviewer (admin/checker) comment */
  reviewer_comment?: string;
  created_at?: string;
  updated_at?: string;
  // Rich-content fields
  brand?: string;
  delivery_time?: string;
  highlights?: string;
  description_html?: string;
  faqs_html?: string;
  warranty_policy?: string;
}

export interface ProductImageWithUrl {
  id: string;
  url: string;
  cloudflare_image_id: string;
  is_primary: boolean;
  display_order: number;
}

export interface ProductWithImages extends Product {
  images: ProductImageWithUrl[];
  primary_image?: string;
  category_ids?: number[];
}

/**
 * Helper to transform database image rows into images with Cloudflare URLs.
 */
function buildImagesWithUrls(images: Array<{ id: string; cloudflare_image_id: string; is_primary: boolean; display_order: number }>): ProductImageWithUrl[] {
  return images.map((img) => ({
    id: img.id,
    url: getCloudflareImageUrl(img.cloudflare_image_id),
    cloudflare_image_id: img.cloudflare_image_id,
    is_primary: img.is_primary,
    display_order: img.display_order,
  }));
}

/**
 * Helper to find primary image URL from images array.
 */
function findPrimaryImageUrl(images: ProductImageWithUrl[], fallbackUrl?: string): string | undefined {
  const primaryImage = images.find((img) => img.is_primary);
  return primaryImage?.url || fallbackUrl;
}

export async function getProducts(filters: {
  search?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  /** When true, only return products with status = 'published' (default: false for admin) */
  publishedOnly?: boolean;
}) {
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;

  const whereConditions: string[] = [];
  const params: unknown[] = [];
  let paramCount = 1;

  // Public-facing calls only show published products
  if (filters.publishedOnly) {
    whereConditions.push(`status = 'published'`);
  }

  if (filters.search) {
    whereConditions.push(`(name ILIKE $${paramCount} OR description ILIKE $${paramCount})`);
    params.push(`%${filters.search}%`);
    paramCount++;
  }

  if (filters.category) {
    whereConditions.push(`category = $${paramCount}`);
    params.push(filters.category);
    paramCount++;
  }

  if (filters.subcategory) {
    whereConditions.push(`subcategory = $${paramCount}`);
    params.push(filters.subcategory);
    paramCount++;
  }

  if (filters.brand) {
    whereConditions.push(`brand = $${paramCount}`);
    params.push(filters.brand);
    paramCount++;
  }

  if (filters.minPrice !== undefined && filters.minPrice !== null) {
    whereConditions.push(`price >= $${paramCount}`);
    params.push(filters.minPrice);
    paramCount++;
  }

  if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
    whereConditions.push(`price <= $${paramCount}`);
    params.push(filters.maxPrice);
    paramCount++;
  }

  const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

  // Get products
  const productsQuery = `
    SELECT * FROM products
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${paramCount} OFFSET $${paramCount + 1}
  `;
  params.push(limit, offset);

  const countQuery = `SELECT COUNT(*) as count FROM products ${whereClause}`;
  const [productsResult, countResult] = await Promise.all([
    query(productsQuery, params),
    query(countQuery, params.slice(0, paramCount - 1)),
  ]);
  const total = parseInt(countResult.rows[0].count);

  return {
    products: productsResult.rows,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasMore: page < Math.ceil(total / limit),
    },
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  const result = await query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const result = await query('SELECT * FROM products WHERE slug = $1', [slug]);
  return result.rows[0] || null;
}

export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  image_url?: string;
  category?: string;
  subcategory?: string;
  slug: string;
  stock_quantity?: number;
  status?: 'draft' | 'published' | 'archived';
  brand?: string;
  delivery_time?: string;
  highlights?: string;
  description_html?: string;
  faqs_html?: string;
  warranty_policy?: string;
}): Promise<Product> {
  const result = await query(
    `INSERT INTO products
       (name, description, price, sale_price, image_url, category, subcategory, slug,
        stock_quantity, status, brand, delivery_time, highlights, description_html, faqs_html, warranty_policy)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     RETURNING *`,
    [
      product.name,
      product.description,
      product.price,
      product.sale_price || null,
      product.image_url,
      product.category,
      product.subcategory || null,
      product.slug,
      product.stock_quantity || 0,
      product.status || 'draft',
      product.brand || null,
      product.delivery_time || null,
      product.highlights || null,
      product.description_html || null,
      product.faqs_html || null,
      product.warranty_policy || null,
    ]
  );
  return result.rows[0];
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  const result = buildUpdateQueryById('products', id, updates);
  if (!result) {
    return getProductById(id);
  }

  const queryResult = await query(result.query, result.values);
  return queryResult.rows[0] || null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await query('DELETE FROM products WHERE id = $1', [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}

/**
 * Get all category IDs assigned to a product via the junction table.
 */
export async function getProductCategories(productId: string): Promise<number[]> {
  const result = await query(
    'SELECT category_id FROM product_categories WHERE product_id = $1',
    [productId]
  );
  return result.rows.map((r: { category_id: number }) => r.category_id);
}

/**
 * Replace all category assignments for a product (junction table).
 * Also syncs products.category / products.subcategory for backward compat.
 */
export async function setProductCategories(productId: string, categoryIds: number[]): Promise<void> {
  const client = await getClient();
  try {
    await client.query('BEGIN');

    await client.query('DELETE FROM product_categories WHERE product_id = $1', [productId]);

    if (categoryIds.length > 0) {
      const placeholders = categoryIds.map((_, i) => `($1, $${i + 2})`).join(', ');
      await client.query(
        `INSERT INTO product_categories (product_id, category_id) VALUES ${placeholders} ON CONFLICT DO NOTHING`,
        [productId, ...categoryIds]
      );
    }

    // Sync backward-compat text columns: pick first parent + first subcategory
    const catResult = await client.query(
      `SELECT c.name, c.parent_id
       FROM product_categories pc
       JOIN categories c ON c.id = pc.category_id
       WHERE pc.product_id = $1
       ORDER BY c.parent_id NULLS FIRST, c.name`,
      [productId]
    );

    const primaryParent = catResult.rows.find((r: { parent_id: number | null }) => r.parent_id === null);
    const primarySub = catResult.rows.find((r: { parent_id: number | null }) => r.parent_id !== null);

    await client.query(
      'UPDATE products SET category = $1, subcategory = $2 WHERE id = $3',
      [primaryParent?.name ?? null, primarySub?.name ?? null, productId]
    );

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

/**
 * Attach images to a product row, fetching them from Cloudflare.
 */
async function attachImages(product: Product): Promise<ProductWithImages> {
  const [images, categoryIds] = await Promise.all([
    getProductImages(product.id),
    getProductCategories(product.id),
  ]);
  const imagesWithUrls = buildImagesWithUrls(images);
  return {
    ...product,
    images: imagesWithUrls,
    primary_image: findPrimaryImageUrl(imagesWithUrls, product.image_url),
    category_ids: categoryIds,
  };
}

/**
 * Get a product with its images from Cloudflare
 */
export async function getProductWithImages(id: string): Promise<ProductWithImages | null> {
  const product = await getProductById(id);
  return product ? attachImages(product) : null;
}

/**
 * Get a product by slug with its images
 */
export async function getProductBySlugWithImages(slug: string): Promise<ProductWithImages | null> {
  const product = await getProductBySlug(slug);
  return product ? attachImages(product) : null;
}

/**
 * Get products with their images
 */
export async function getProductsWithImages(filters: {
  search?: string;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  publishedOnly?: boolean;
}) {
  const result = await getProducts(filters);

  if (result.products.length === 0) {
    return {
      products: [],
      pagination: result.pagination,
    };
  }

  // Batch fetch all images for all products in a single query (no N+1)
  const productIds = result.products.map(p => p.id);
  const imagesByProductId = await getProductImagesBatch(productIds);

  const productsWithImages = result.products.map((product) => {
    const images = imagesByProductId.get(product.id) || [];
    const imagesWithUrls = buildImagesWithUrls(images);

    return {
      ...product,
      images: imagesWithUrls,
      primary_image: findPrimaryImageUrl(imagesWithUrls, product.image_url),
    };
  });

  return {
    products: productsWithImages,
    pagination: result.pagination,
  };
}
