import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB, updateUserRole } from '@/lib/db/auth';
import { query } from '@/lib/db/connection';

export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if the current user is an admin
    if (session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Only admins can update user roles' },
        { status: 403 }
      );
    }

    // Get the request body (support both 'role' and 'newRole' for compatibility)
    const body = await request.json();
    const userId = body.userId;
    const newRole = body.role || body.newRole;

    // Validate the input
    if (!userId || !newRole) {
      return NextResponse.json(
        { success: false, error: 'userId and newRole are required' },
        { status: 400 }
      );
    }

    const validRoles = ['customer', 'moderator', 'admin', 'supplier'];
    if (!validRoles.includes(newRole)) {
      return NextResponse.json(
        { success: false, error: `newRole must be one of: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    // Update the user role
    await updateUserRole(userId, newRole);

    // When assigning supplier role, auto-create a suppliers table entry if one doesn't exist
    if (newRole === 'supplier') {
      const existing = await query(
        'SELECT id FROM suppliers WHERE user_id = $1',
        [userId]
      );
      if (existing.rows.length === 0) {
        const userResult = await query(
          'SELECT name FROM users WHERE id = $1',
          [userId]
        );
        const userName = userResult.rows[0]?.name || 'Unnamed Supplier';
        await query(
          'INSERT INTO suppliers (user_id, company_name) VALUES ($1, $2)',
          [userId, userName]
        );
      }
    }

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
  } catch (err: unknown) {
    console.error('Error in update role API:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return PUT(request);
}