import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db/connection';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tempToken } = body;

    if (!tempToken) {
      return NextResponse.json({ error: 'No temp token provided' }, { status: 400 });
    }

    const result = await query(
      'SELECT session_token FROM temp_auth_tokens WHERE temp_token = $1 AND expires_at > NOW()',
      [tempToken]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired temp token' }, { status: 401 });
    }

    const sessionToken = result.rows[0].session_token;

    await query('DELETE FROM temp_auth_tokens WHERE temp_token = $1', [tempToken]);

    const cookieStore = await cookies();
    cookieStore.set('cms-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error finalizing auth:', error);
    return NextResponse.json({ error: 'Failed to finalize authentication' }, { status: 500 });
  }
}
