import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookie, getUserProfile } from '@/lib/db/auth';
import { query } from '@/lib/db/connection';

export async function GET(request: NextRequest) {
  try {
    // Verify user is admin or moderator
    const session = await getSessionFromCookie();
    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const profile = await getUserProfile(session.userId);
    if (!profile || (profile.role !== 'admin' && profile.role !== 'moderator')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Fetch all stats in parallel
    const [productsResult, ordersResult, usersResult, appointmentsResult] = await Promise.all([
      query('SELECT COUNT(*) as count FROM products'),
      query('SELECT COUNT(*) as count FROM orders'),
      query('SELECT COUNT(*) as count FROM users'),
      query("SELECT COUNT(*) as count FROM appointments WHERE status = 'pending'"),
    ]);

    const stats = {
      totalProducts: parseInt(productsResult.rows[0]?.count || '0'),
      totalOrders: parseInt(ordersResult.rows[0]?.count || '0'),
      totalUsers: parseInt(usersResult.rows[0]?.count || '0'),
      pendingAppointments: parseInt(appointmentsResult.rows[0]?.count || '0'),
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
