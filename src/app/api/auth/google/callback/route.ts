import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  upsertUserFromGoogle,
  createSession,
  createSessionTokenWithDB
} from '@/lib/db/auth';
import { query } from '@/lib/db/connection';

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

    // Don't set the session cookie directly on this response. This redirect
    // is the landing point right after a cross-site bounce from
    // accounts.google.com, and Safari's ITP unreliably persists cookies set
    // at that exact point — the session cookie would silently fail to stick
    // for some Safari users, forcing them to re-login every time (observed
    // in prod: one Safari user re-authenticated 49 times in ~2 months while
    // Chrome users averaged a handful).
    //
    // Instead: hand off through a short-lived, single-use temp token (NOT
    // the real session token — that would expose a 30-day session if it
    // leaked via browser history/referrer/logs). /auth/finalize exchanges
    // it for the real session cookie via a same-origin fetch, well after
    // the cross-site redirect has settled, which Safari handles reliably.
    const tempToken = crypto.randomBytes(32).toString('hex');
    await query(
      `INSERT INTO temp_auth_tokens (temp_token, session_token, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '2 minutes')`,
      [tempToken, sessionToken]
    );

    return NextResponse.redirect(new URL(`/auth/finalize?token=${tempToken}`, appUrl));
  } catch (err: unknown) {
    // Log full error server-side only — never expose internal details in redirect URL
    console.error('Error in OAuth callback:', err);
    return NextResponse.redirect(new URL('/?error=auth_failed', appUrl));
  }
}
