import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
  
  return NextResponse.json({
    success: true,
    razorpayKeyIdExists: !!razorpayKeyId,
    razorpayKeySecretExists: !!razorpayKeySecret,
    razorpayKeyIdPreview: razorpayKeyId ? `${razorpayKeyId.substring(0, 5)}...${razorpayKeyId.substring(razorpayKeyId.length - 5)}` : 'NOT SET',
    razorpayKeySecretPreview: razorpayKeySecret ? `${razorpayKeySecret.substring(0, 5)}...${razorpayKeySecret.substring(razorpayKeySecret.length - 5)}` : 'NOT SET'
  });
}