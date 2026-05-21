/**
 * Application-wide constants and validation limits.
 * Centralizes limits used across API routes for consistency.
 */

// ── Cart Validation Limits ────────────────────────────────────────────────────

/**
 * Maximum quantity allowed per item in cart.
 * Prevents excessive quantities that could:
 * - Cause inventory calculation issues
 * - Enable manipulation attacks
 * - Create unrealistic order totals
 */
export const MAX_CART_QUANTITY = 100;

/**
 * Maximum total items allowed in cart.
 * Prevents cart bloating and ensures reasonable order sizes.
 */
export const MAX_CART_TOTAL_ITEMS = 50;

// ── String Validation Limits ──────────────────────────────────────────────────

/**
 * Maximum length for general string inputs (names, titles, etc.)
 */
export const MAX_STRING_LENGTH = 1000;

/**
 * Maximum length for review/comments text.
 */
export const MAX_REVIEW_LENGTH = 2000;

/**
 * Maximum length for notes/descriptions.
 */
export const MAX_DESCRIPTION_LENGTH = 5000;

// ── Pagination Defaults ───────────────────────────────────────────────────────

/**
 * Default page size for list endpoints.
 */
export const DEFAULT_PAGE_SIZE = 12;

/**
 * Maximum allowed page size to prevent excessive data retrieval.
 */
export const MAX_PAGE_SIZE = 100;