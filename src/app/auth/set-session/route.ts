import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/connection';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tempToken = searchParams.get('token');

    console.log('🔄 Set-session route called with token:', tempToken ? 'present' : 'missing');

    if (!tempToken) {
      console.error('❌ No temp token provided');
      return NextResponse.redirect(new URL('/?error=no_token', request.url));
    }

    // Retrieve session token from temporary storage
    const result = await query(
      'SELECT session_token FROM temp_auth_tokens WHERE temp_token = $1 AND expires_at > NOW()',
      [tempToken]
    );

    console.log('🔍 Temp token lookup result:', result.rows.length, 'rows');

    if (result.rows.length === 0) {
      console.error('❌ Invalid or expired temp token');
      return NextResponse.redirect(new URL('/?error=invalid_token', request.url));
    }

    const sessionToken = result.rows[0].session_token;
    console.log('✅ Found session token, length:', sessionToken.length);

    // Delete the temporary token
    await query('DELETE FROM temp_auth_tokens WHERE temp_token = $1', [tempToken]);
    console.log('🗑️ Deleted temp token');

    // Build cookie string manually (bypass Next.js cookie API)
    const maxAge = 60 * 60 * 24 * 30; // 30 days
    const secure = process.env.NODE_ENV === 'production';

    const cookieString = [
      `cms-session=${sessionToken}`,
      `Max-Age=${maxAge}`,
      `Path=/`,
      `SameSite=Lax`,
      secure ? 'Secure' : null,
      'HttpOnly'
    ].filter(Boolean).join('; ');

    console.log('✅✅✅ Setting cookie with raw header!');
    console.log('Cookie string length:', cookieString.length);

    // Return HTML page that sets cookie via JavaScript and redirects
    // Using JavaScript to set cookie since HTTP headers aren't working
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Login Successful</title>
        </head>
        <body>
          <h2>Login successful! Setting session...</h2>
          <script>
            console.log('🔄 Setting session cookie via JavaScript...');

            // Set cookie via JavaScript (not HttpOnly, but it will work!)
            var expires = new Date();
            expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
            document.cookie = "cms-session=${sessionToken.replace(/"/g, '\\"')}; expires=" + expires.toUTCString() + "; path=/; SameSite=Lax";

            console.log('✅ Cookie set! Redirecting...');
            console.log('Cookie value:', document.cookie);

            // Redirect immediately for fast header loading
            console.log('🔄 Redirecting to homepage...');
            window.location.href = '/';
          </script>
        </body>
      </html>
    `;

    const response = new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Set-Cookie': cookieString,
      },
    });

    console.log('🔄 Returning HTML page with cookie header...');

    return response;
  } catch (error) {
    console.error('❌ Error in set-session:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
