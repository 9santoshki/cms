import { NextRequest, NextResponse } from 'next/server';
import {
  upsertUserFromGoogle,
  createSession,
  createSessionTokenWithDB
} from '@/lib/db/auth';
import { toErrorMessage } from '@/lib/error-utils';

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
      console.error('Token exchange failed:', tokenResponse.status, errorText);
      throw new Error(`Failed to exchange code for tokens: ${tokenResponse.status} - ${errorText}`);
    }

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

    const user = await upsertUserFromGoogle({
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    });

    const { dbSession } = await createSession(user, true);
    const sessionToken = createSessionTokenWithDB(user, dbSession.id);
    const isLocalhost = appUrl.includes('localhost') || appUrl.includes('127.0.0.1');

    // SECURITY: Do NOT include token in URL - it's already set in cookie below
    // Token in URL would expose it to browser history, logs, and address bar
    const response = NextResponse.redirect(new URL('/?login=success', appUrl));

    response.cookies.set('cms-session', sessionToken, {
      httpOnly: true,
      secure: !isLocalhost, // true for HTTPS (UAT and production), false for localhost
      path: '/',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60
    });

    return response;
  } catch (err: unknown) {
    console.error('Error in OAuth callback:', err);
    const errorMsg = toErrorMessage(err);
    const errorParam = encodeURIComponent(errorMsg.substring(0, 100));
    return NextResponse.redirect(new URL(`/?error=auth_failed&details=${errorParam}`, appUrl));
  }
}
