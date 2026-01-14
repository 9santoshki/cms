import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookie, getUserProfile, updateUserRole } from '@/lib/db/auth';

export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookie();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if the current user is an admin
    const userProfile = await getUserProfile(session.userId);

    if (!userProfile || userProfile.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Only admins can update user roles' },
        { status: 403 }
      );
    }

    // Get the request body
    const { userId, newRole } = await request.json();

    // Validate the input
    if (!userId || !newRole) {
      return NextResponse.json(
        { success: false, error: 'userId and newRole are required' },
        { status: 400 }
      );
    }

    const validRoles = ['customer', 'moderator', 'admin'];
    if (!validRoles.includes(newRole)) {
      return NextResponse.json(
        { success: false, error: `newRole must be one of: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    // Update the user role
    await updateUserRole(userId, newRole);

    return NextResponse.json(
      {
        success: true,
        data: {
          message: `User role updated successfully to ${newRole}`,
          updatedUser: {
            id: userId,
            role: newRole
          }
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in update role API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return PUT(request);
}