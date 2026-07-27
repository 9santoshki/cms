import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { uploadImageToCloudflare, getCloudflareImageUrl } from '@/lib/cloudflare';
import { toErrorMessage } from '@/lib/error-utils';

/**
 * POST /api/admin/categories/upload-image
 * Upload a category image to Cloudflare R2 and return the proxy URL.
 */
export async function POST(request: NextRequest) {
  const session = await getSessionFromCookieWithDB();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
  }
  if (session.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    if (!file) {
      return NextResponse.json({ success: false, error: 'No image provided' }, { status: 400 });
    }

    const uploadResponse = await uploadImageToCloudflare(file, file.name);
    if (!uploadResponse.success || !uploadResponse.result) {
      return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
    }

    const url = getCloudflareImageUrl(uploadResponse.result.key);
    return NextResponse.json({ success: true, url });
  } catch (err) {
    console.error('Category image upload error:', err);
    return NextResponse.json({ success: false, error: toErrorMessage(err) }, { status: 500 });
  }
}
