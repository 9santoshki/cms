/**
 * Utility functions for narrowing `unknown` errors to readable strings.
 * Never use `catch (err: any)` — use these helpers instead.
 */

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

export function toErrorMessage(value: unknown): string {
  if (isError(value)) return value.message;
  if (typeof value === 'string') return value;
  if (
    value !== null &&
    typeof value === 'object' &&
    'message' in value &&
    typeof (value as Record<string, unknown>).message === 'string'
  ) {
    return (value as Record<string, unknown>).message as string;
  }
  return 'An unexpected error occurred';
}

/**
 * Checks if an error is an R2/S3 "NoSuchKey" error (object not found).
 * Used by the image proxy endpoint to return 404 instead of 500.
 */
export function isR2NoSuchKeyError(err: unknown): boolean {
  if (err === null || typeof err !== 'object') return false;
  const e = err as Record<string, unknown>;
  return e?.name === 'NoSuchKey' || e?.Code === 'NoSuchKey';
}
