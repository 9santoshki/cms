import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  upsertUserFromGoogle,
  createSession,
  createSessionTokenWithDB
} from '@/lib/db/auth';
import { query } from '@/lib/db/connection';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(new URL('/?error=oauth_failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${request.nextUrl.origin}/auth/callback`,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens');
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

    // Decode and log JWT payload to verify avatar is included
    const jwtPayload = JSON.parse(Buffer.from(sessionToken.split('.')[1], 'base64').toString());
    console.log('🔐 JWT Token Payload:', {
      userId: jwtPayload.userId,
      email: jwtPayload.email,
      name: jwtPayload.name,
      avatar: jwtPayload.avatar,
      avatarLength: jwtPayload.avatar?.length,
      role: jwtPayload.role,
      sessionId: jwtPayload.sessionId
    });

    // Generate a temporary token for secure transfer
    const tempToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store session token temporarily
    await query(
      'INSERT INTO temp_auth_tokens (temp_token, session_token, expires_at) VALUES ($1, $2, $3)',
      [tempToken, sessionToken, expiresAt]
    );

    console.log('✅ Persistent login successful for user:', user.email);
    console.log('✅ Temporary token created, redirecting to set-session route');

    // Redirect to server-side set-session route (no client-side JavaScript needed!)
    return NextResponse.redirect(new URL(`/auth/set-session?token=${tempToken}`, request.url));
  } catch (error) {
    console.error('Error in OAuth callback:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
