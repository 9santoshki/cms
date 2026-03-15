/**
 * Lightweight input validators — no extra dependencies.
 * Each validator returns either `undefined` (valid) or a `ValidationError`.
 */

export class ValidationError extends Error {
  constructor(
    public readonly field: string,
    message: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function isValidationError(value: unknown): value is ValidationError {
  return value instanceof ValidationError;
}

// ---------------------------------------------------------------------------
// Primitive validators
// ---------------------------------------------------------------------------

export function validatePositiveInt(
  value: unknown,
  field: string
): ValidationError | undefined {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) {
    return new ValidationError(field, `${field} must be a positive integer`);
  }
}

export function validateNonNegativeInt(
  value: unknown,
  field: string
): ValidationError | undefined {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0) {
    return new ValidationError(field, `${field} must be a non-negative integer`);
  }
}

export function validateString(
  value: unknown,
  field: string,
  maxLen = 1000
): ValidationError | undefined {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return new ValidationError(field, `${field} must be a non-empty string`);
  }
  if (value.length > maxLen) {
    return new ValidationError(field, `${field} must be at most ${maxLen} characters`);
  }
}

export function validateEmail(value: unknown): ValidationError | undefined {
  if (
    typeof value !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    return new ValidationError('email', 'email must be a valid email address');
  }
}

// ---------------------------------------------------------------------------
// Domain validators
// ---------------------------------------------------------------------------

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'completed'
  | 'cancelled';

const ORDER_STATUSES: OrderStatus[] = [
  'pending',
  'processing',
  'shipped',
  'completed',
  'cancelled',
];

export function validateOrderStatus(
  value: unknown
): ValidationError | undefined {
  if (!ORDER_STATUSES.includes(value as OrderStatus)) {
    return new ValidationError(
      'status',
      `status must be one of: ${ORDER_STATUSES.join(', ')}`
    );
  }
}

export function validateReviewRating(
  value: unknown
): ValidationError | undefined {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 5) {
    return new ValidationError('rating', 'rating must be an integer between 1 and 5');
  }
}
