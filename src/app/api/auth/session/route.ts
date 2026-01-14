import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB, getUserProfile } from '@/lib/db/auth';

export async function GET(request: NextRequest) {
  try {
    console.log('=== SESSION API CALLED ===');

    // Use database-backed session validation
    const session = await getSessionFromCookieWithDB();
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
      return NextResponse.json({ user: null }, { status: 200 });
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

    return NextResponse.json({
      user: userData,
    });
  } catch (error) {
    console.error('❌ Error getting session:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
