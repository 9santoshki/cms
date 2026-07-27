/**
 * Route handler wrappers for authentication and authorization.
 *
 * Usage:
 *   export const GET = withAuth(async (request, context, session) => {
 *     // session is guaranteed non-null with the required role
 *     return ok(data);
 *   }, { requiredRole: 'admin' });
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB, SessionData } from '@/lib/db/auth';
import { unauthorized, forbidden, serverError } from '@/lib/api-response';

export type Role = 'admin' | 'moderator' | 'customer' | 'supplier';

export interface AuthOptions {
  /** Single role or array of roles that are allowed. Default: any authenticated user. */
  requiredRole?: Role | Role[];
}

type HandlerContext = { params: any };

type AuthenticatedHandler = (
  request: NextRequest,
  context: HandlerContext,
  session: SessionData,
) => Promise<NextResponse> | NextResponse;

type Handler = (
  request: NextRequest,
  context: HandlerContext,
) => Promise<NextResponse> | NextResponse;

/**
 * Check if the session has one of the required roles.
 */
function hasRole(session: SessionData, role?: Role | Role[]): boolean {
  if (!role) return true; // any authenticated user
  const allowed = Array.isArray(role) ? role : [role];
  return allowed.includes(session.role as Role);
}

/**
 * Wrap a route handler with session validation and optional role checking.
 * Eliminates the ~25 repeated auth blocks across API routes.
 */
export function withAuth(handler: AuthenticatedHandler, options?: AuthOptions): Handler {
  return async (request: NextRequest, context: HandlerContext) => {
    try {
      const session = await getSessionFromCookieWithDB();

      if (!session) {
        return unauthorized();
      }

      if (!hasRole(session, options?.requiredRole)) {
        return forbidden();
      }

      return await handler(request, context, session);
    } catch (err: unknown) {
      console.error('[withAuth] Unhandled error:', err);
      return serverError();
    }
  };
}

/**
 * Like withAuth but catches errors via the provided error handler.
 */
export function withAuthSafe(
  handler: AuthenticatedHandler,
  options?: AuthOptions,
): Handler {
  return async (request: NextRequest, context: HandlerContext) => {
    try {
      const session = await getSessionFromCookieWithDB();

      if (!session) {
        return unauthorized();
      }

      if (!hasRole(session, options?.requiredRole)) {
        return forbidden();
      }

      return await handler(request, context, session);
    } catch (err: unknown) {
      console.error('[withAuth] Unhandled error:', err);
      return serverError();
    }
  };
}
