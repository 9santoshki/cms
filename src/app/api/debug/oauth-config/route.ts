import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  return NextResponse.json({
    clientId: clientId ? `${clientId.substring(0, 20)}...` : 'NOT SET',
    clientIdFull: clientId || 'NOT SET',
    clientSecretSet: !!clientSecret,
    redirectUriLocal: 'http://localhost:3000/auth/callback',
    redirectUriProduction: 'https://uat.colourmyspace.com/auth/callback',
    environment: process.env.NODE_ENV,
    instructions: [
      '1. Go to https://console.cloud.google.com/apis/credentials',
      `2. Find OAuth Client ID: ${clientId}`,
      '3. Add these Authorized redirect URIs:',
      '   - http://localhost:3000/auth/callback',
      '   - https://uat.colourmyspace.com/auth/callback',
      '4. Make sure there are NO trailing slashes',
      '5. Save and wait 2-5 minutes for changes to propagate'
    ]
  });
}
