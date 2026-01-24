import { NextRequest, NextResponse } from 'next/server';
import {
  upsertUserFromGoogle,
  createSession,
  createSessionTokenWithDB
} from '@/lib/db/auth';

export async function GET(request: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(new URL('/?error=oauth_failed', appUrl));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', appUrl));
  }

  try {
    // Exchange code for tokens
    console.log('🔄 Exchanging code for tokens...');
    console.log('Redirect URI:', `${appUrl}/auth/callback`);
    console.log('Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.substring(0, 20) + '...');

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${appUrl}/auth/callback`,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('❌ Token exchange failed:', tokenResponse.status, errorText);
      throw new Error(`Failed to exchange code for tokens: ${tokenResponse.status} - ${errorText}`);
    }

    console.log('✅ Token exchange successful');
    const tokens = await tokenResponse.json();

    // Get user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      throw new Error('Failed to get user info from Google');
    }

    const googleUser = await userInfoResponse.json();

    console.log('📸 Google User Data:', {
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
      pictureLength: googleUser.picture?.length
    });

    // Create or update user in database
    const user = await upsertUserFromGoogle({
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    });

    console.log('✅ User authenticated:', user.email);
    console.log('👤 User from database:', {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      avatarLength: user.avatar?.length,
      role: user.role
    });

    // Create database-backed session (30 days by default for persistent login)
    const { dbSession } = await createSession(user, true);
    console.log('Session created in database:', dbSession.id);

    // Create JWT token with session ID
    const sessionToken = createSessionTokenWithDB(user, dbSession.id);
    console.log('JWT Token created:', sessionToken);

    const response = NextResponse.redirect(new URL('/?login=success', appUrl));
    response.cookies.set('session_token', sessionToken, {
      name: 'cms-session',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax'
    });

    console.log('✅ Session token set and redirecting user to homepage');
    return response;
  } catch (error) {
    console.error('❌❌❌ Error in OAuth callback:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    const errorParam = encodeURIComponent(errorMsg.substring(0, 100));
    return NextResponse.redirect(new URL(`/?error=auth_failed&details=${errorParam}`, appUrl));
  }
}
