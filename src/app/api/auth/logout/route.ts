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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
