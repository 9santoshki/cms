import { NextRequest, NextResponse } from 'next/server';
import { fetchImageFromR2 } from '@/lib/cloudflare';

/**
 * Image proxy endpoint - serves images from private R2 bucket
 * GET /api/images/[key]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    // Next.js 16: params is now a Promise and must be awaited
    const { key } = await params;

    // Decode the image key from URL
    const imageKey = decodeURIComponent(key);

    if (!imageKey) {
      return new NextResponse('Image key is required', { status: 400 });
    }

    // Fetch image from R2 with authentication
    const { stream, contentType, contentLength } = await fetchImageFromR2(imageKey);

    if (!stream) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Stream the image to the client with appropriate headers
    const headers = new Headers({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
    });

    if (contentLength) {
      headers.set('Content-Length', contentLength.toString());
    }

    return new NextResponse(stream, {
      headers,
      status: 200,
    });
  } catch (error: any) {
    console.error('Error serving image:', error);

    // Check if it's a 404 (NoSuchKey) error
    if (error?.name === 'NoSuchKey' || error?.Code === 'NoSuchKey') {
      return new NextResponse('Image not found', { status: 404 });
    }

    return new NextResponse('Failed to fetch image', { status: 500 });
  }
}
