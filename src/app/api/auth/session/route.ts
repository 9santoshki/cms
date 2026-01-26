/**
 * Session API route
 * - Validates user session from cookie or Authorization header (Safari fallback)
 * - Returns current user profile with role information from database
 * - Prevents CDN/Cloudflare caching of authentication responses
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB, getUserProfile, validateSession } from '@/lib/db/auth';

// Handle CORS preflight for custom Authorization header
export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json({}, { status: 200 });

  // CRITICAL: Prevent Cloudflare/CDN caching
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private, max-age=0');
  response.headers.set('CDN-Cache-Control', 'no-store');
  response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store');

  response.headers.set('Access-Control-Allow-Origin', request.headers.get('origin') || '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours
  return response;
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    let session = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      session = await validateSession(token);
    }

    if (!session) {
      session = await getSessionFromCookieWithDB();
    }

    if (!session) {
      const response = NextResponse.json({ user: null }, { status: 200 });

      // CRITICAL: Prevent Cloudflare/CDN caching
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private, max-age=0');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('CDN-Cache-Control', 'no-store');
      response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store');

      // Add CORS headers for Safari compatibility
      const origin = request.headers.get('origin');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      if (origin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
      }
      response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

      return response;
    }

    const userProfile = await getUserProfile(session.userId);

    if (!userProfile) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userData = {
      id: userProfile.id,
      email: userProfile.email,
      name: userProfile.name,
      avatar: userProfile.avatar,
      role: userProfile.role,
    };

    const response = NextResponse.json({
      user: userData,
    });

    // CRITICAL: Prevent Cloudflare/CDN caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('CDN-Cache-Control', 'no-store');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store');

    // Add CORS headers for Safari compatibility
    const origin = request.headers.get('origin');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    if (origin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

    return response;
  } catch (error) {
    console.error('❌ Error getting session:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
