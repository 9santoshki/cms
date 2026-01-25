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
    console.log('=== SESSION API CALLED ===');
    console.log('Cookies:', request.cookies.getAll());
    const cmsSessionCookie = request.cookies.get('cms-session');
    console.log('Has cms-session cookie:', request.cookies.has('cms-session'));
    console.log('cms-session cookie value length:', cmsSessionCookie?.value?.length || 0);
    console.log('cms-session cookie preview:', cmsSessionCookie?.value?.substring(0, 30) + '...');
    console.log('Authorization header:', request.headers.get('authorization')?.substring(0, 20) + '...');
    console.log('User-Agent:', request.headers.get('user-agent'));

    // Safari workaround: Try Authorization header first (localStorage token)
    const authHeader = request.headers.get('authorization');
    let session = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      console.log('🦁 Safari: Validating token from Authorization header');
      session = await validateSession(token);
      console.log('🦁 Safari: Token validation result:', session ? 'SUCCESS' : 'FAILED');
    }

    // Fallback to cookie-based session (Chrome, Firefox, Edge)
    if (!session) {
      session = await getSessionFromCookieWithDB();
    }
    console.log('Session from cookie:', session ? {
      userId: session.userId,
      email: session.email,
      name: session.name,
      avatar: session.avatar,
      avatarLength: session.avatar?.length,
      role: session.role,
      sessionId: session.sessionId
    } : 'NULL');

    if (!session) {
      console.log('No session found, returning null user');
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

    // Get fresh user data from database
    const userProfile = await getUserProfile(session.userId);
    console.log('User profile from DB:', userProfile ? {
      id: userProfile.id,
      email: userProfile.email,
      name: userProfile.name,
      hasAvatar: !!userProfile.avatar,
      avatar: userProfile.avatar
    } : 'NULL');

    if (!userProfile) {
      console.log('No user profile found, returning null user');
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userData = {
      id: userProfile.id,
      email: userProfile.email,
      name: userProfile.name,
      avatar: userProfile.avatar,
      role: userProfile.role,
    };

    console.log('✅ Session API - Returning user data with avatar:', {
      ...userData,
      avatarLength: userData.avatar?.length || 0
    });

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
