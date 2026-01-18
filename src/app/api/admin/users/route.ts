import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getAllUserProfiles } from '@/lib/db/auth';

export async function GET(request: NextRequest) {
  console.log('🔍 [API /admin/users] Request received');

  try {
    // Verify user is authenticated and is an admin
    console.log('🔐 [API /admin/users] Checking authentication...');
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      console.log('❌ [API /admin/users] No session found');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('✅ [API /admin/users] Session found:', {
      userId: session.userId,
      email: session.email,
      role: session.role
    });

    if (session.role !== 'admin') {
      console.log('❌ [API /admin/users] User is not admin');
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    // Fetch all users
    console.log('📊 [API /admin/users] Fetching all users from database...');
    const users = await getAllUserProfiles();
    console.log('✅ [API /admin/users] Fetched', users.length, 'users');
    console.log('👥 [API /admin/users] Users data:', users);

    return NextResponse.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('💥 [API /admin/users] Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
