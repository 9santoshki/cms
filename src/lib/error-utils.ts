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
