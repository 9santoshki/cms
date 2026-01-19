import { NextRequest, NextResponse } from 'next/server';

/**
 * Diagnostic endpoint to check if environment variables are loaded
 * DO NOT expose this in production - delete or protect it!
 */
export async function GET(request: NextRequest) {
  const envVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'JWT_SECRET',
    'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'NEXT_PUBLIC_RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'ADMIN_EMAILS',
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_R2_ACCESS_KEY_ID',
    'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
    'CLOUDFLARE_R2_ENDPOINT',
    'CLOUDFLARE_R2_TOKEN_VALUE',
    'CLOUDFLARE_BUCKET',
    'CLOUDFLARE_PRODUCT_IMAGE_FOLDER',
  ];

  const status = envVars.map(varName => {
    const value = process.env[varName];
    return {
      name: varName,
      isSet: !!value,
      valueLength: value ? value.length : 0,
      preview: value ? `${value.substring(0, 3)}...${value.substring(value.length - 3)}` : 'NOT SET',
    };
  });

  return NextResponse.json({
    success: true,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    variables: status,
  });
}