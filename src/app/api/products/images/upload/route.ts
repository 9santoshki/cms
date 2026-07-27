import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { uploadImageToCloudflare, getCloudflareImageUrl } from '@/lib/cloudflare';
import { addProductImage } from '@/lib/db/productImages';
import { getProductById } from '@/lib/db/products';
import { toErrorMessage } from '@/lib/error-utils';

/**
 * Upload product images to Cloudflare
 * POST /api/products/images/upload
 *
 * SECURITY: Requires admin or moderator authentication
 */
export async function POST(request: NextRequest) {
  try {
    // ── Authentication check ─────────────────────────────────────────────────
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return NextResponse.json(
        { success: false, error: 'Admin or moderator access required' },
        { status: 403 }
      );
    }
    // ─────────────────────────────────────────────────────────────────────────

    const formData = await request.formData();
    const productId = formData.get('productId') as string;
    const isPrimary = formData.get('isPrimary') === 'true';
    const files = formData.getAll('images') as File[];

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product ID is required',
        },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No images provided',
        },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = await getProductById(productId);
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Upload images to Cloudflare
    const uploadResults = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        // Upload to Cloudflare
        const uploadResponse = await uploadImageToCloudflare(file, file.name);

        if (uploadResponse.success && uploadResponse.result) {
          // Save to database
          const isPrimaryImage = isPrimary && i === 0; // Only first image can be primary
          const imageUrl = getCloudflareImageUrl(uploadResponse.result.id);
          const dbImage = await addProductImage(
            productId,
            uploadResponse.result.id,
            imageUrl,
            file.name,
            isPrimaryImage,
            i
          );

          uploadResults.push({
            success: true,
            filename: file.name,
            imageId: dbImage.id,
            cloudflareImageId: uploadResponse.result.id,
            url: getCloudflareImageUrl(uploadResponse.result.id),
            isPrimary: isPrimaryImage,
          });
        } else {
          uploadResults.push({
            success: false,
            filename: file.name,
            error: 'Upload to Cloudflare failed',
          });
        }
      } catch (err: unknown) {
        console.error(`Error uploading ${file.name}:`, err);
        const errorMessage = toErrorMessage(err);
        console.error(`Error message: ${errorMessage}`);
        uploadResults.push({
          success: false,
          filename: file.name,
          error: errorMessage || 'Upload failed',
        });
      }
    }

    const successCount = uploadResults.filter((r) => r.success).length;
    const failCount = uploadResults.filter((r) => !r.success).length;

    return NextResponse.json({
      success: successCount > 0,
      message: `Uploaded ${successCount} image(s)${failCount > 0 ? `, ${failCount} failed` : ''}`,
      results: uploadResults,
    });
  } catch (err: unknown) {
    console.error('Error in image upload:', err);
    return NextResponse.json(
      {
        success: false,
        error: toErrorMessage(err) || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
