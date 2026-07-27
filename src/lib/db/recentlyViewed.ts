import { query } from './connection';
import { getCloudflareImageUrl } from '../cloudflare';

/** Maximum recently-viewed entries kept per user. */
const RECENTLY_VIEWED_LIMIT = 20;

/**
 * Record that a user viewed a product.
 * Upserts so the same product always refreshes to the top,
 * then trims entries older than the per-user limit.
 */
export async function recordProductView(
  userId: number,
  productId: number
): Promise<void> {
  await query(
    `INSERT INTO recently_viewed (user_id, product_id, viewed_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (user_id, product_id)
     DO UPDATE SET viewed_at = NOW()`,
    [userId, productId]
  );

  // Keep only the most recent N entries for this user
  await query(
    `DELETE FROM recently_viewed
     WHERE user_id = $1
       AND id NOT IN (
         SELECT id FROM recently_viewed
         WHERE user_id = $1
         ORDER BY viewed_at DESC
         LIMIT $2
       )`,
    [userId, RECENTLY_VIEWED_LIMIT]
  );
}

export interface RecentlyViewedProduct {
  product_id: number;
  viewed_at: string;
  name: string;
  price: number;
  sale_price?: number;
  slug?: string;
  image_url?: string;
  primary_image?: string;
  category?: string;
}

/**
 * Get a user's recently viewed products, newest first.
 */
export async function getRecentlyViewed(
  userId: number,
  limit = 8
): Promise<RecentlyViewedProduct[]> {
  const result = await query(
    `SELECT
       rv.product_id,
       rv.viewed_at,
       p.name,
       p.price,
       p.sale_price,
       p.slug,
       p.image_url,
       p.category,
       (SELECT pi.cloudflare_image_id
        FROM product_images pi
        WHERE pi.product_id = p.id AND pi.is_primary = true
        LIMIT 1) AS primary_image_id
     FROM recently_viewed rv
     JOIN products p ON rv.product_id = p.id
     WHERE rv.user_id = $1
       AND p.status = 'published'
     ORDER BY rv.viewed_at DESC
     LIMIT $2`,
    [userId, limit]
  );

  return result.rows.map((row: Record<string, unknown>) => ({
    product_id: row.product_id as number,
    viewed_at: row.viewed_at as string,
    name: row.name as string,
    price: parseFloat(String(row.price)),
    sale_price: row.sale_price ? parseFloat(String(row.sale_price)) : undefined,
    slug: row.slug as string | undefined,
    image_url: row.image_url as string | undefined,
    primary_image: row.primary_image_id
      ? getCloudflareImageUrl(row.primary_image_id as string)
      : undefined,
    category: row.category as string | undefined,
  }));
}
