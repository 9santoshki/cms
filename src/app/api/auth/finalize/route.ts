import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db/connection';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Finalize API called');
    const body = await request.json();
    console.log('📦 Request body:', body);
    const { tempToken } = body;

    if (!tempToken) {
      console.error('❌ No temp token in request');
      return NextResponse.json({ error: 'No temp token provided' }, { status: 400 });
    }

    console.log('🔍 Looking up temp token in database...');
    // Retrieve session token from temporary storage
    const result = await query(
      'SELECT session_token FROM temp_auth_tokens WHERE temp_token = $1 AND expires_at > NOW()',
      [tempToken]
    );

    console.log('🔍 Temp token lookup result:', result.rows.length, 'rows');

    if (result.rows.length === 0) {
      console.error('❌ Invalid or expired temp token');
      return NextResponse.json({ error: 'Invalid or expired temp token' }, { status: 401 });
    }

    const sessionToken = result.rows[0].session_token;
    console.log('✅ Found session token, length:', sessionToken.length);

    // Delete the temporary token
    await query('DELETE FROM temp_auth_tokens WHERE temp_token = $1', [tempToken]);
    console.log('🗑️ Deleted temp token from database');

    // Set the actual session cookie
    const cookieStore = await cookies();
    cookieStore.set('cms-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    console.log('✅ Session cookie set successfully via finalize endpoint:', {
      name: 'cms-session',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error finalizing auth:', error);
    return NextResponse.json({ error: 'Failed to finalize authentication' }, { status: 500 });
  }
}
