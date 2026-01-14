import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToCloudflare, getCloudflareImageUrl } from '@/lib/cloudflare';
import { addProductImage } from '@/lib/db/productImages';
import { getProductById } from '@/lib/db/products';

/**
 * Upload product images to Cloudflare
 * POST /api/products/images/upload
 */
export async function POST(request: NextRequest) {
  try {
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
          const dbImage = await addProductImage(
            productId,
            uploadResponse.result.id,
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
      } catch (error: any) {
        console.error(`Error uploading ${file.name}:`, error);
        uploadResults.push({
          success: false,
          filename: file.name,
          error: error.message || 'Upload failed',
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
  } catch (error: any) {
    console.error('Error in image upload:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
