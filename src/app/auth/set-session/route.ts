import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/connection';

export async function GET(request: NextRequest) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
    const searchParams = request.nextUrl.searchParams;
    const tempToken = searchParams.get('token');

    console.log('🔄 Set-session route called with token:', tempToken ? 'present' : 'missing');

    if (!tempToken) {
      console.error('❌ No temp token provided');
      return NextResponse.redirect(new URL('/?error=no_token', appUrl));
    }

    // Retrieve session token from temporary storage
    const result = await query(
      'SELECT session_token FROM temp_auth_tokens WHERE temp_token = $1 AND expires_at > NOW()',
      [tempToken]
    );

    console.log('🔍 Temp token lookup result:', result.rows.length, 'rows');

    if (result.rows.length === 0) {
      console.error('❌ Invalid or expired temp token');
      return NextResponse.redirect(new URL('/?error=invalid_token', appUrl));
    }

    const sessionToken = result.rows[0].session_token;
    console.log('✅ Found session token, length:', sessionToken.length);

    // Delete the temporary token
    await query('DELETE FROM temp_auth_tokens WHERE temp_token = $1', [tempToken]);
    console.log('🗑️ Deleted temp token');

    // Build cookie string manually (bypass Next.js cookie API)
    const maxAge = 60 * 60 * 24 * 30; // 30 days
    const isProduction = process.env.NODE_ENV === 'production';

    // Extract domain from APP_URL for JavaScript cookie setting
    const domain = appUrl ? new URL(appUrl).hostname : undefined;

    // IMPORTANT: Don't set Domain attribute in HTTP header for better Chrome compatibility
    // Cookies without Domain attribute work more reliably across browsers
    const cookieString = [
      `cms-session=${sessionToken}`,
      `Max-Age=${maxAge}`,
      `Path=/`,
      `SameSite=Lax`,
      isProduction ? 'Secure' : null,
      'HttpOnly'
    ].filter(Boolean).join('; ');

    console.log('✅✅✅ Setting cookie with raw header (no Domain attribute for Chrome compatibility)');
    console.log('Cookie string length:', cookieString.length);
    console.log('Domain extracted (for JS fallback):', domain);

    // Return HTML page that sets cookie via JavaScript and redirects
    // Using JavaScript to set cookie since HTTP headers aren't working
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Login Successful</title>
          <style>
            body {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%);
            }
            .loader {
              text-align: center;
            }
            .spinner {
              border: 3px solid #f3f3f3;
              border-top: 3px solid #c19a6b;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto 20px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            h2 { color: #333; margin: 0 0 10px; }
            p { color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="loader">
            <div class="spinner"></div>
            <h2>Login successful!</h2>
            <p>Setting up your session...</p>
          </div>
          <script>
            console.log('🔄 Setting session cookie via JavaScript...');
            console.log('User agent:', navigator.userAgent);

            var isProduction = ${isProduction};
            var domain = "${domain || ''}";
            var isChrome = navigator.userAgent.indexOf('Chrome') > -1;

            // CRITICAL: Clear any existing cms-session cookies first (aggressive clearing for Chrome)
            // This prevents "invalid signature" errors from old cookies
            console.log('🗑️ Aggressively clearing old cms-session cookies (Chrome-compatible)...');

            // Clear without domain
            document.cookie = "cms-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "cms-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;";

            // Clear with domain variations
            if (domain) {
              document.cookie = "cms-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + domain;
              document.cookie = "cms-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + domain + "; SameSite=Lax;";

              // Also try with dot prefix for Chrome
              document.cookie = "cms-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domain;
            }

            console.log('✅ Old cookies cleared');

            // Set new cookie via JavaScript (not HttpOnly, but it will work!)
            var expires = new Date();
            expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days

            // Build cookie string - NO domain attribute for better Chrome compatibility
            // Cookies without domain attribute work better cross-browser
            var cookieStr = "cms-session=${sessionToken.replace(/"/g, '\\"')}; expires=" + expires.toUTCString() + "; path=/; SameSite=Lax" + (isProduction ? "; Secure" : "");
            document.cookie = cookieStr;

            console.log('✅ Cookie set!');
            console.log('Cookie string:', cookieStr);
            console.log('Cookie value:', document.cookie);
            console.log('Is Chrome:', isChrome);

            // Verify cookie was set
            var cookieSet = document.cookie.indexOf('cms-session=') !== -1;
            console.log('Cookie verification:', cookieSet ? '✅ Cookie present' : '❌ Cookie NOT found!');

            // Wait longer for Chrome to process cookie changes
            var delay = isChrome ? 1000 : 500;
            setTimeout(function() {
              console.log('🔄 Redirecting to homepage...');
              // Use replace to force a full page reload and ensure session loads
              window.location.replace('/?login=success');
            }, delay);
          </script>
        </body>
      </html>
    `;

    // Create clear cookie header to remove old invalid cookies (no Domain for Chrome compatibility)
    const clearCookieString = [
      `cms-session=`,
      `Max-Age=0`,
      `Path=/`,
      `Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    ].filter(Boolean).join('; ');

    // Use Headers API to set multiple Set-Cookie headers
    const headers = new Headers();
    headers.set('Content-Type', 'text/html');
    headers.append('Set-Cookie', clearCookieString);
    headers.append('Set-Cookie', cookieString);

    const response = new NextResponse(html, {
      status: 200,
      headers,
    });

    console.log('🔄 Returning HTML page with cookie header...');
    console.log('Clear cookie:', clearCookieString);
    console.log('Set cookie:', cookieString.substring(0, 100) + '...');

    return response;
  } catch (error) {
    console.error('❌ Error in set-session:', error);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
    return NextResponse.redirect(new URL('/?error=auth_failed', appUrl));
  }
}
