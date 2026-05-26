/**
 * Shared utility helpers used across client and server code.
 */

/**
 * Returns a human-readable relative time string for a given date.
 * Suitable for display in tables and cards where exact timestamps aren't needed.
 */
export function timeAgo(dateStr: string | null): string {
  if (!dateStr) return 'Never updated';
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}

/**
 * Price-related utilities for product pricing display.
 * Used by product cards, shop page, homepage, and product detail.
 */

/** Safely parse price value (handles string or number inputs) */
export function parsePrice(price: unknown): number {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') return parseFloat(price) || 0;
  return 0;
}

/** Get the display price (sale price when valid discount, otherwise regular price) */
export function getDisplayPrice(product: { price?: unknown; sale_price?: unknown }): number {
  const price = parsePrice(product.price);
  const sale = parsePrice(product.sale_price);
  // Only use sale_price when it's a positive value strictly less than the regular price
  return (sale > 0 && sale < price) ? sale : price;
}

/** Check if product has an active discount */
export function hasDiscount(product: { price?: unknown; sale_price?: unknown }): boolean {
  const price = parsePrice(product.price);
  const sale = parsePrice(product.sale_price);
  return sale > 0 && price > sale;
}

/** Calculate discount percentage between original and sale price */
export function getDiscountPercentage(originalPrice: number, salePrice: number): number {
  if (!originalPrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Shared filter constants used by shop and search pages.
 */

export const PRICE_RANGES = [
  { value: 'all', label: 'All Prices' },
  { value: 'under5000', label: 'Under ₹5,000' },
  { value: '5000-15000', label: '₹5,000 - ₹15,000' },
  { value: 'over15000', label: 'Over ₹15,000' },
] as const;

export const SHOP_CATEGORIES = [
  { id: '', name: 'All Categories' },
  { id: 'Living Room', name: 'Living Room' },
  { id: 'Dining Room', name: 'Dining Room' },
  { id: 'Bedroom', name: 'Bedroom' },
  { id: 'Home Office', name: 'Home Office' },
  { id: 'Lighting', name: 'Lighting' },
  { id: 'Decor', name: 'Decor' },
  { id: 'Outdoor', name: 'Outdoor' },
] as const;

/** Get price range bounds from range value */
export function getPriceRangeBounds(range: string): { min?: number; max?: number } {
  if (range === 'under5000') return { max: 5000 };
  if (range === '5000-15000') return { min: 5000, max: 15000 };
  if (range === 'over15000') return { min: 15000 };
  return {};
}
