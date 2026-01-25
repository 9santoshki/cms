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

    // Delete cookie WITHOUT domain (new format)
    response.cookies.set('cms-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 0,
      expires: new Date(0),
    });

    // ALSO delete cookie WITH domain (old format, migration)
    // This ensures old cookies are cleaned up
    if (domain) {
      response.cookies.set('cms-session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 0,
        expires: new Date(0),
        domain: domain,
      });
      console.log('✅ Cleared both cookie versions (with and without domain)');
    } else {
      console.log('✅ Cookie cleared (no domain parameter)');
    }

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

    // Delete both cookie versions
    response.cookies.set('cms-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 0,
      expires: new Date(0)
    });

    if (domain) {
      response.cookies.set('cms-session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 0,
        expires: new Date(0),
        domain: domain,
      });
    }

    console.log('✅ Cookie cleared on error (both versions)');

    return response;
  }
}
