import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB, getUserProfile, updateUserProfile } from '@/lib/db/auth';

export async function GET() {
  try {
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const profile = await getUserProfile(session.userId);

    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'User profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (err: unknown) {
    console.error('[profile GET] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { name, avatar } = await request.json();

    const updatedProfile = await updateUserProfile(session.userId, { name, avatar });

    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, error: 'Failed to update user profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: updatedProfile });
  } catch (err: unknown) {
    console.error('[profile PUT] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
