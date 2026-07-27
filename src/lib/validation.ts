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

// Re-exported from canonical types to avoid duplication
import type { OrderStatus as AppOrderStatus } from '@/types';

export type OrderStatus = AppOrderStatus;

export type ProductStatus = 'draft' | 'published' | 'archived';

export type AppointmentStatus =
  | 'pending'
  | 'scheduled'
  | 'confirmed'
  | 'completed'
  | 'cancelled';

const ORDER_STATUSES: OrderStatus[] = [
  'pending',
  'processing',
  'shipped',
  'completed',
  'cancelled',
  'returned',
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

// ---------------------------------------------------------------------------
// Shared domain validators (replaces inline checks in multiple routes)
// ---------------------------------------------------------------------------

const PRODUCT_STATUSES: ProductStatus[] = ['draft', 'published', 'archived'];

export function validateProductStatus(
  value: unknown
): ValidationError | undefined {
  if (!PRODUCT_STATUSES.includes(value as ProductStatus)) {
    return new ValidationError(
      'status',
      `status must be one of: ${PRODUCT_STATUSES.join(', ')}`,
    );
  }
}

export function validateProductInput(body: {
  name?: unknown;
  description?: unknown;
  price?: unknown;
}): ValidationError | undefined {
  const nameErr = validateString(body.name, 'name');
  if (nameErr) return nameErr;
  const descErr = validateString(body.description, 'description');
  if (descErr) return descErr;
  const price = Number(body.price);
  if (!Number.isFinite(price) || price <= 0) {
    return new ValidationError('price', 'price must be a positive number');
  }
}

export function validateStatus<T extends string>(
  value: unknown,
  allowed: readonly T[],
  field = 'status',
): ValidationError | undefined {
  if (!allowed.includes(value as T)) {
    return new ValidationError(field, `${field} must be one of: ${allowed.join(', ')}`);
  }
}

const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  'pending',
  'scheduled',
  'confirmed',
  'completed',
  'cancelled',
];

export function validateAppointmentStatus(
  value: unknown,
): ValidationError | undefined {
  return validateStatus(value, APPOINTMENT_STATUSES, 'status');
}
