/**
 * Unified response factory for all API routes.
 * Import these helpers instead of constructing NextResponse.json() manually.
 */
import { NextResponse } from 'next/server';
import { toErrorMessage } from './error-utils';

// ---------------------------------------------------------------------------
// Success responses
// ---------------------------------------------------------------------------

export function ok<T>(data: T, message?: string): NextResponse {
  return NextResponse.json(
    { success: true, data, ...(message ? { message } : {}) },
    { status: 200 }
  );
}

export function created<T>(data: T, message?: string): NextResponse {
  return NextResponse.json(
    { success: true, data, ...(message ? { message } : {}) },
    { status: 201 }
  );
}

export function noContent(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

// ---------------------------------------------------------------------------
// Client error responses
// ---------------------------------------------------------------------------

export function badRequest(msg: string): NextResponse {
  return NextResponse.json(
    { success: false, error: msg },
    { status: 400 }
  );
}

export function unauthorized(msg = 'Authentication required'): NextResponse {
  return NextResponse.json(
    { success: false, error: msg },
    { status: 401 }
  );
}

export function forbidden(msg = 'Insufficient permissions'): NextResponse {
  return NextResponse.json(
    { success: false, error: msg },
    { status: 403 }
  );
}

export function notFound(msg = 'Resource not found'): NextResponse {
  return NextResponse.json(
    { success: false, error: msg },
    { status: 404 }
  );
}

// ---------------------------------------------------------------------------
// Server error responses
// ---------------------------------------------------------------------------

export function serverError(msg = 'Internal server error'): NextResponse {
  return NextResponse.json(
    { success: false, error: msg },
    { status: 500 }
  );
}

/**
 * Converts an unknown caught error into a 500 response.
 * Logs the full error server-side but never exposes internal details to the client.
 */
export function fromError(err: unknown, context?: string): NextResponse {
  const label = context ? `[${context}]` : '[API]';
  console.error(`${label} Unhandled error:`, err);
  return serverError();
}

/**
 * Convenience re-export of toErrorMessage for routes that need the string.
 */
export { toErrorMessage } from './error-utils';
