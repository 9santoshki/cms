import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logoutSession } from '@/lib/db/auth';

export async function POST(request: NextRequest) {
  try {
    // Enhanced logout that clears both cookie and database session
    await logoutSession();

    // Also clear any old cookies from previous auth implementations
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

    console.log('User logged out successfully, cleared all auth cookies');

    // Create response with explicit cookie clearing headers
    const response = NextResponse.json({ success: true }, { status: 200 });

    // Get domain for migration purposes
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
    const domain = appUrl ? new URL(appUrl).hostname : undefined;
    const isSecure = process.env.NODE_ENV !== 'development';

    // Build cookie deletion strings manually to ensure both versions are sent
    const cookieAttributes = `Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${isSecure ? 'Secure; ' : ''}HttpOnly; SameSite=lax`;
    const cookiesToDelete = [
      `cms-session=; ${cookieAttributes}`, // Without domain
    ];

    // Add domain version if domain exists (for migration from old cookies)
    if (domain) {
      cookiesToDelete.push(`cms-session=; ${cookieAttributes}; Domain=${domain}`);
    }

    // Set all Set-Cookie headers
    cookiesToDelete.forEach(cookie => {
      response.headers.append('Set-Cookie', cookie);
    });

    console.log(`✅ Cleared cookie versions: ${cookiesToDelete.length}`, cookiesToDelete);

    return response;
  } catch (error) {
    console.error('Error during logout:', error);

    // Even on error, return success and clear cookies
    // This ensures frontend can logout even if backend fails
    const response = NextResponse.json(
      { success: true, message: 'Logged out (with errors)' },
      { status: 200 }
    );

    // Get domain for migration purposes
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
    const domain = appUrl ? new URL(appUrl).hostname : undefined;
    const isSecure = process.env.NODE_ENV !== 'development';

    // Build cookie deletion strings manually to ensure both versions are sent
    const cookieAttributes = `Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${isSecure ? 'Secure; ' : ''}HttpOnly; SameSite=lax`;
    const cookiesToDelete = [
      `cms-session=; ${cookieAttributes}`, // Without domain
    ];

    // Add domain version if domain exists
    if (domain) {
      cookiesToDelete.push(`cms-session=; ${cookieAttributes}; Domain=${domain}`);
    }

    // Set all Set-Cookie headers
    cookiesToDelete.forEach(cookie => {
      response.headers.append('Set-Cookie', cookie);
    });

    console.log(`✅ Cookie cleared on error (${cookiesToDelete.length} versions)`);

    return response;
  }
}
