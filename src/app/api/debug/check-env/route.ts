import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    env: process.env.NODE_ENV,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?
      `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.substring(0, 20)}...` : 'NOT SET',
    hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasJwtSecret: !!process.env.JWT_SECRET,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    hasDbPassword: !!process.env.DB_PASSWORD,
  });
}
