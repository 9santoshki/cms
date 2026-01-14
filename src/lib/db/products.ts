import { query } from './connection';
import { getProductImages } from './productImages';
import { getCloudflareImageUrl } from '../cloudflare';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  sale_price?: number;
  image_url?: string;
  category?: string;
  slug?: string;
  stock_quantity?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductWithImages extends Product {
  images: Array<{
    id: string;
    url: string;
    cloudflare_image_id: string;
    is_primary: boolean;
    display_order: number;
  }>;
  primary_image?: string;
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
  let params: any[] = [];
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

  const productsResult = await query(productsQuery, params);

  // Get total count
  const countQuery = `SELECT COUNT(*) as count FROM products ${whereClause}`;
  const countResult = await query(countQuery, params.slice(0, paramCount - 1));
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
  original_price?: number;
  sale_price?: number;
  image_url?: string;
  category?: string;
  slug: string;
  stock_quantity?: number;
}): Promise<Product> {
  const result = await query(
    `INSERT INTO products (name, description, price, original_price, sale_price, image_url, category, slug, stock_quantity)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      product.name,
      product.description,
      product.price,
      product.original_price || null,
      product.sale_price || product.price,
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
  const fields: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = $${paramCount++}`);
      values.push(value);
    }
  });

  if (fields.length === 0) {
    return getProductById(id);
  }

  values.push(id);

  const result = await query(
    `UPDATE products SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`,
    values
  );

  return result.rows[0] || null;
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
  const imagesWithUrls = images.map((img) => ({
    id: img.id,
    url: getCloudflareImageUrl(img.cloudflare_image_id),
    cloudflare_image_id: img.cloudflare_image_id,
    is_primary: img.is_primary,
    display_order: img.display_order,
  }));

  const primaryImage = imagesWithUrls.find((img) => img.is_primary);

  return {
    ...product,
    images: imagesWithUrls,
    primary_image: primaryImage?.url || product.image_url,
  };
}

/**
 * Get a product by slug with its images
 */
export async function getProductBySlugWithImages(slug: string): Promise<ProductWithImages | null> {
  const product = await getProductBySlug(slug);
  if (!product) return null;

  const images = await getProductImages(product.id);
  const imagesWithUrls = images.map((img) => ({
    id: img.id,
    url: getCloudflareImageUrl(img.cloudflare_image_id),
    cloudflare_image_id: img.cloudflare_image_id,
    is_primary: img.is_primary,
    display_order: img.display_order,
  }));

  const primaryImage = imagesWithUrls.find((img) => img.is_primary);

  return {
    ...product,
    images: imagesWithUrls,
    primary_image: primaryImage?.url || product.image_url,
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

  // Fetch images for all products
  const productsWithImages = await Promise.all(
    result.products.map(async (product) => {
      const images = await getProductImages(product.id);
      const imagesWithUrls = images.map((img) => ({
        id: img.id,
        url: getCloudflareImageUrl(img.cloudflare_image_id),
        cloudflare_image_id: img.cloudflare_image_id,
        is_primary: img.is_primary,
        display_order: img.display_order,
      }));

      const primaryImage = imagesWithUrls.find((img) => img.is_primary);

      return {
        ...product,
        images: imagesWithUrls,
        primary_image: primaryImage?.url || product.image_url,
      };
    })
  );

  return {
    products: productsWithImages,
    pagination: result.pagination,
  };
}
