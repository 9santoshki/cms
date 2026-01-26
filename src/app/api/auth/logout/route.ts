import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logoutSession } from '@/lib/db/auth';

export async function POST(request: NextRequest) {
  try {
    await logoutSession();

    const cookieStore = await cookies();
    const oldCookies = [
      'next-auth.callback-url',
      'next-auth.csrf-token',
      'sb-fykdwqlayqcxycrvbhew-auth-token.0',
      'sb-fykdwqlayqcxycrvbhew-auth-token.1',
      'sb-fykdwqlayqcxycrvbhew-auth-token',
    ];

    oldCookies.forEach(cookieName => {
      cookieStore.delete(cookieName);
    });

    const response = NextResponse.json({ success: true }, { status: 200 });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
    const domain = appUrl ? new URL(appUrl).hostname : undefined;
    const isSecure = process.env.NODE_ENV !== 'development';

    const cookieAttributes = `Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${isSecure ? 'Secure; ' : ''}HttpOnly; SameSite=lax`;
    const cookiesToDelete = [
      `cms-session=; ${cookieAttributes}`,
    ];

    if (domain) {
      cookiesToDelete.push(`cms-session=; ${cookieAttributes}; Domain=${domain}`);
    }

    cookiesToDelete.forEach(cookie => {
      response.headers.append('Set-Cookie', cookie);
    });

    return response;
  } catch (error) {
    console.error('Error during logout:', error);

    const response = NextResponse.json(
      { success: true, message: 'Logged out (with errors)' },
      { status: 200 }
    );

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
    const domain = appUrl ? new URL(appUrl).hostname : undefined;
    const isSecure = process.env.NODE_ENV !== 'development';

    const cookieAttributes = `Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${isSecure ? 'Secure; ' : ''}HttpOnly; SameSite=lax`;
    const cookiesToDelete = [
      `cms-session=; ${cookieAttributes}`,
    ];

    if (domain) {
      cookiesToDelete.push(`cms-session=; ${cookieAttributes}; Domain=${domain}`);
    }

    cookiesToDelete.forEach(cookie => {
      response.headers.append('Set-Cookie', cookie);
    });

    return response;
  }
}
