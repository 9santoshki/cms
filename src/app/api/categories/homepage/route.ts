/**
 * Public API: Get categories for homepage display
 * Returns active subcategories marked as show_on_homepage
 */
import { getHomepageSubcategories } from '@/lib/db/categories';
import { getCloudflareImageUrl } from '@/lib/cloudflare';
import { ok, serverError } from '@/lib/api-response';

/**
 * GET /api/categories/homepage
 * Returns subcategories for homepage browse by category section.
 * product_image is the proxied URL of a real product image in that subcategory
 * (falls back to the static category image when no product image exists).
 */
export async function GET() {
  try {
    const subcategories = await getHomepageSubcategories();
    const data = subcategories.map(s => ({
      ...s,
      product_image: s.product_image_key
        ? getCloudflareImageUrl(s.product_image_key)
        : null,
    }));
    return ok(data);
  } catch (err: unknown) {
    console.error('Error fetching homepage categories:', err);
    return serverError('Failed to fetch homepage categories');
  }
}