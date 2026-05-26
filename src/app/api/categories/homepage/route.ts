/**
 * Public API: Get categories for homepage display
 * Returns active subcategories marked as show_on_homepage
 */
import { NextResponse } from 'next/server';
import { getHomepageSubcategories } from '@/lib/db/categories';
import { ok, serverError } from '@/lib/api-response';

/**
 * GET /api/categories/homepage
 * Returns subcategories for homepage browse by category section
 */
export async function GET() {
  try {
    const subcategories = await getHomepageSubcategories();
    return ok(subcategories);
  } catch (err: unknown) {
    console.error('Error fetching homepage categories:', err);
    return serverError('Failed to fetch homepage categories');
  }
}