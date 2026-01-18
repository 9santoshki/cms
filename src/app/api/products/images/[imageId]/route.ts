import { NextRequest, NextResponse } from 'next/server';
import { deleteProductImage } from '@/lib/db/productImages';
import { query } from '@/lib/db/connection';
import { deleteImageFromCloudflare } from '@/lib/cloudflare';

/**
 * Delete a product image
 * DELETE /api/products/images/[imageId]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ imageId: string }> }
) {
  try {
    const { imageId } = await params;

    if (!imageId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image ID is required',
        },
        { status: 400 }
      );
    }

    // Get the image details before deleting
    const imageResult = await query(
      'SELECT cloudflare_image_id FROM product_images WHERE id = $1',
      [imageId]
    );

    if (imageResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image not found',
        },
        { status: 404 }
      );
    }

    const cloudflareImageId = imageResult.rows[0].cloudflare_image_id;

    // Delete from database
    const deleted = await deleteProductImage(imageId);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to delete image from database',
        },
        { status: 500 }
      );
    }

    // Try to delete from Cloudflare (non-blocking, log errors but don't fail the request)
    try {
      await deleteImageFromCloudflare(cloudflareImageId);
    } catch (cloudflareError: any) {
      console.error('Error deleting from Cloudflare:', cloudflareError);
      // Continue anyway since DB deletion succeeded
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
