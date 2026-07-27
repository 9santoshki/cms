import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logoutSession } from '@/lib/db/auth';

function buildLogoutResponse(request: NextRequest, message?: string): NextResponse {
  const response = NextResponse.json(
    { success: true, ...(message ? { message } : {}) },
    { status: 200 },
  );

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  const domain = appUrl ? new URL(appUrl).hostname : undefined;
  const isSecure = process.env.NODE_ENV !== 'development';
  const attrs = `Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${isSecure ? 'Secure; ' : ''}HttpOnly; SameSite=lax`;

  const cookiesToDelete = [`cms-session=; ${attrs}`];
  if (domain) {
    cookiesToDelete.push(`cms-session=; ${attrs}; Domain=${domain}`);
  }
  cookiesToDelete.forEach((c) => response.headers.append('Set-Cookie', c));

  return response;
}

export async function POST(request: NextRequest) {
  let errorOccurred = false;

  try {
    await logoutSession();
  } catch (err: unknown) {
    console.error('[logout] Session cleanup error:', err);
    errorOccurred = true;
  } finally {
    // Always clear stale cookies
    try {
      const cookieStore = await cookies();
      const staleCookies = [
        'next-auth.callback-url',
        'next-auth.csrf-token',
        'sb-fykdwqlayqcxycrvbhew-auth-token.0',
        'sb-fykdwqlayqcxycrvbhew-auth-token.1',
        'sb-fykdwqlayqcxycrvbhew-auth-token',
      ];
      staleCookies.forEach((name) => cookieStore.delete(name));
    } catch {
      // ignore cookie cleanup errors
    }
  }

  return buildLogoutResponse(request, errorOccurred ? 'Logged out (with errors)' : undefined);
}
