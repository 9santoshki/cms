import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookie, getUserProfile, updateUserProfile } from '@/lib/db/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromCookie();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user profile from database
    const profile = await getUserProfile(session.userId);

    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Failed to get user profile' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: profile },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in profile API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookie();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the updated profile data from the request
    const { name, avatar } = await request.json();

    // Update the user profile in database
    const updatedProfile = await updateUserProfile(session.userId, { name, avatar });

    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, error: 'Failed to update user profile' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedProfile },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in profile update API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}