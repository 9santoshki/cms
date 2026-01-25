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

    // Explicitly set cookie deletion (max-age=0, expires in past)
    // IMPORTANT: Must match parameters from OAuth callback (no domain parameter)
    response.cookies.set('cms-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 0,
      expires: new Date(0),
    });

    console.log('✅ Cookie cleared (no domain parameter)');

    return response;
  } catch (error) {
    console.error('Error during logout:', error);

    // Even on error, return success and clear cookies
    // This ensures frontend can logout even if backend fails
    const response = NextResponse.json(
      { success: true, message: 'Logged out (with errors)' },
      { status: 200 }
    );

    response.cookies.set('cms-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 0,
      expires: new Date(0)
    });

    console.log('✅ Cookie cleared on error (no domain parameter)');

    return response;
  }
}
