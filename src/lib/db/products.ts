import { query } from './connection';
import { getProductImages, getProductImagesBatch } from './productImages';
import { getCloudflareImageUrl } from '../cloudflare';
import { buildUpdateQueryById } from './query-builder';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  image_url?: string;
  category?: string;
  slug?: string;
  stock_quantity?: number;
  created_at?: string;
  updated_at?: string;
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
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) {
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;

  let whereConditions: string[] = [];
  let params: unknown[] = [];
  let paramCount = 1;

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
  slug: string;
  stock_quantity?: number;
}): Promise<Product> {
  const result = await query(
    `INSERT INTO products (name, description, price, sale_price, image_url, category, slug, stock_quantity)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      product.name,
      product.description,
      product.price,
      product.sale_price || null,
      product.image_url,
      product.category,
      product.slug,
      product.stock_quantity || 0,
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

export async function searchProducts(searchTerm: string, limit: number = 10) {
  const result = await query(
    `SELECT * FROM products
     WHERE name ILIKE $1 OR description ILIKE $1
     ORDER BY created_at DESC
     LIMIT $2`,
    [`%${searchTerm}%`, limit]
  );
  return result.rows;
}

/**
 * Get a product with its images from Cloudflare
 */
export async function getProductWithImages(id: string): Promise<ProductWithImages | null> {
  const product = await getProductById(id);
  if (!product) return null;

  const images = await getProductImages(id);
  const imagesWithUrls = buildImagesWithUrls(images);

  return {
    ...product,
    images: imagesWithUrls,
    primary_image: findPrimaryImageUrl(imagesWithUrls, product.image_url),
  };
}

/**
 * Get a product by slug with its images
 */
export async function getProductBySlugWithImages(slug: string): Promise<ProductWithImages | null> {
  const product = await getProductBySlug(slug);
  if (!product) return null;

  const images = await getProductImages(product.id);
  const imagesWithUrls = buildImagesWithUrls(images);

  return {
    ...product,
    images: imagesWithUrls,
    primary_image: findPrimaryImageUrl(imagesWithUrls, product.image_url),
  };
}

/**
 * Get products with their images
 */
export async function getProductsWithImages(filters: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
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
