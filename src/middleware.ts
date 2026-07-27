// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import type { UserRole } from '@/types';

const SESSION_COOKIE_NAME = 'cms-session';

/**
 * Decode (NOT verify) a JWT payload for routing decisions in Edge Runtime.
 *
 * SECURITY MODEL: This function does NOT verify the JWT signature — it cannot,
 * because the `jsonwebtoken` library is not Edge Runtime compatible and the DB
 * is not reachable from middleware. A forged token with a fake role can bypass
 * these redirects and reach admin *pages* (HTML), but every API route calls
 * getSessionFromCookieWithDB() which verifies the signature and checks the DB,
 * blocking any actual data access. The middleware redirects are UX guardrails
 * only, not a security boundary.
 */
function decodeJWTPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const raw = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// ── Route access rules ────────────────────────────────────────────────────────
//
// Admin-only dashboard sections (moderators are redirected to /dashboard):
const ADMIN_ONLY_PATHS = [
  '/dashboard/suppliers',   // Supplier profiles & assignments
  '/dashboard/users',       // User management
  '/dashboard/settings',    // Site-wide settings
];

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  const { pathname }  = request.nextUrl;

  // ── 1. Unauthenticated guard ─────────────────────────────────────────────
  const protectedPaths = ['/account', '/cart', '/checkout', '/orders', '/dashboard', '/supplier'];
  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  if (isProtected && !sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.search   = `?redirect=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  // ── 2. Role-based access control ─────────────────────────────────────────
  if (sessionCookie) {
    const payload = decodeJWTPayload(sessionCookie.value);
    const role    = payload?.role as UserRole | undefined;

    // ── Supplier: only /supplier portal, never /dashboard
    if (role === 'supplier') {
      if (pathname.startsWith('/dashboard')) {
        const url = request.nextUrl.clone();
        url.pathname = '/supplier';
        url.search   = '';
        return NextResponse.redirect(url);
      }
    }

    // ── Customer: no dashboard, no supplier portal
    if (role === 'customer') {
      if (pathname.startsWith('/dashboard') || pathname.startsWith('/supplier')) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        url.search   = '';
        return NextResponse.redirect(url);
      }
    }

    // ── Moderator: can use dashboard but not admin-only sections
    if (role === 'moderator') {
      const blocked = ADMIN_ONLY_PATHS.some(p => pathname.startsWith(p));
      if (blocked) {
        // Redirect to dashboard home, not to a 403 page
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        url.search   = '';
        return NextResponse.redirect(url);
      }
    }

    // ── Admin: full access everywhere — no restriction needed
  }

  return NextResponse.next({
    request: { headers: request.headers },
  });
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-data' },
      ],
    },
  ],
};
