import { NextRequest, NextResponse } from 'next/server';
import {
  getSessionFromCookieWithDB,
  getUserSessions,
  deleteSessionById,
  cleanupExpiredSessions
} from '@/lib/db/auth';

// GET /api/auth/sessions - Get all active sessions for the current user
export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const sessions = await getUserSessions(session.userId);

    return NextResponse.json({
      success: true,
      sessions: sessions.map(s => ({
        id: s.id,
        user_agent: s.user_agent,
        ip_address: s.ip_address,
        created_at: s.created_at,
        last_activity: s.last_activity,
        expires_at: s.expires_at,
        is_current: s.id === session.sessionId
      }))
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}

// DELETE /api/auth/sessions?session_id=xxx - Delete a specific session
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const sessionId = request.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'session_id parameter required' },
        { status: 400 }
      );
    }

    // Don't allow deleting current session (use logout for that)
    if (sessionId === session.sessionId) {
      return NextResponse.json(
        { error: 'Cannot delete current session. Use logout instead.' },
        { status: 400 }
      );
    }

    // Verify the session belongs to the user
    const userSessions = await getUserSessions(session.userId);
    const sessionToDelete = userSessions.find(s => s.id === sessionId);

    if (!sessionToDelete) {
      return NextResponse.json(
        { error: 'Session not found or does not belong to you' },
        { status: 404 }
      );
    }

    await deleteSessionById(sessionId);

    return NextResponse.json({
      success: true,
      message: 'Session deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    );
  }
}

// POST /api/auth/sessions/cleanup - Clean up expired sessions (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Only allow admins to manually trigger cleanup
    if (session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const deletedCount = await cleanupExpiredSessions();

    return NextResponse.json({
      success: true,
      deleted_count: deletedCount,
      message: `Cleaned up ${deletedCount} expired sessions`
    });
  } catch (error) {
    console.error('Error cleaning up sessions:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup sessions' },
      { status: 500 }
    );
  }
}
