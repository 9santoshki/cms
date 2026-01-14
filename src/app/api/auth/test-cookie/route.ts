import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    message: 'Test cookie set',
    timestamp: new Date().toISOString()
  });

  // Set a test cookie
  response.cookies.set({
    name: 'test-cookie',
    value: 'test-value-' + Date.now(),
    httpOnly: true,
    secure: false, // Allow on localhost
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  });

  return response;
}
