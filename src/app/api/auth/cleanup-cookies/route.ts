import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    // List of old cookies to remove
    const oldCookies = [
      'next-auth.callback-url',
      'next-auth.csrf-token',
      'sb-fykdwqlayqcxycrvbhew-auth-token.0',
      'sb-fykdwqlayqcxycrvbhew-auth-token.1',
      'sb-fykdwqlayqcxycrvbhew-auth-token',
      'g_state',
    ];

    oldCookies.forEach(cookieName => {
      cookieStore.delete(cookieName);
    });

    return NextResponse.json({
      success: true,
      message: 'Old cookies cleared',
      cleared: oldCookies
    });
  } catch (error) {
    console.error('Error cleaning cookies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clean cookies' },
      { status: 500 }
    );
  }
}
