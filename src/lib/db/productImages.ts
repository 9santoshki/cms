import { query, getClient } from './connection';

export interface ProductImage {
  id: string;
  product_id: string;
  cloudflare_image_id: string;
  filename?: string;
  display_order: number;
  is_primary: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get all images for a product
 */
export async function getProductImages(productId: string): Promise<ProductImage[]> {
  const result = await query(
    'SELECT * FROM product_images WHERE product_id = $1 ORDER BY display_order ASC, created_at ASC',
    [productId]
  );
  return result.rows;
}

/**
 * Add an image to a product.
 * Wraps the "unset primary + insert" steps in a single client transaction
 * so both operations always run on the same connection.
 */
export async function addProductImage(
  productId: string,
  cloudflareImageId: string,
  url: string,
  filename?: string,
  isPrimary: boolean = false,
  displayOrder?: number
): Promise<ProductImage> {
  const client = await getClient();
  try {
    await client.query('BEGIN');

    // If this is being set as primary, unset any existing primary images
    if (isPrimary) {
      await client.query(
        'UPDATE product_images SET is_primary = false WHERE product_id = $1',
        [productId]
      );
    }

    // Get the next display order if not provided
    let order = displayOrder;
    if (order === undefined) {
      const orderResult = await client.query(
        'SELECT COALESCE(MAX(display_order), -1) + 1 as next_order FROM product_images WHERE product_id = $1',
        [productId]
      );
      order = orderResult.rows[0].next_order as number;
    }

    const result = await client.query(
      `INSERT INTO product_images (product_id, cloudflare_image_id, url, filename, is_primary, display_order)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [productId, cloudflareImageId, url, filename, isPrimary, order]
    );

    await client.query('COMMIT');
    return result.rows[0] as ProductImage;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Delete a product image
 */
export async function deleteProductImage(imageId: string): Promise<boolean> {
  const result = await query('DELETE FROM product_images WHERE id = $1', [imageId]);
  return result.rowCount ? result.rowCount > 0 : false;
}

/**
 * Delete all images for a product
 */
export async function deleteAllProductImages(productId: string): Promise<boolean> {
  const result = await query('DELETE FROM product_images WHERE product_id = $1', [productId]);
  return result.rowCount ? result.rowCount > 0 : false;
}

/**
 * Set an image as primary.
 * Uses a single dedicated client so both UPDATE statements run in
 * the same transaction on the same connection.
 */
export async function setPrimaryImage(productId: string, imageId: string): Promise<boolean> {
  const client = await getClient();
  try {
    await client.query('BEGIN');

    // Unset all primary images for this product
    await client.query(
      'UPDATE product_images SET is_primary = false WHERE product_id = $1',
      [productId]
    );

    // Set the specified image as primary
    const result = await client.query(
      'UPDATE product_images SET is_primary = true WHERE id = $1 AND product_id = $2',
      [imageId, productId]
    );

    await client.query('COMMIT');
    return result.rowCount ? result.rowCount > 0 : false;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Update image display order
 */
export async function updateImageOrder(
  imageId: string,
  newOrder: number
): Promise<boolean> {
  const result = await query(
    'UPDATE product_images SET display_order = $1 WHERE id = $2',
    [newOrder, imageId]
  );
  return result.rowCount ? result.rowCount > 0 : false;
}

/**
 * Get primary image for a product
 */
export async function getPrimaryImage(productId: string): Promise<ProductImage | null> {
  const result = await query(
    'SELECT * FROM product_images WHERE product_id = $1 AND is_primary = true',
    [productId]
  );
  return result.rows[0] as ProductImage || null;
}
