import { NextRequest, NextResponse } from 'next/server';
import { deleteProductImage } from '@/lib/db/productImages';
import { deleteImageFromCloudflare } from '@/lib/cloudflare';
import { query } from '@/lib/db/connection';

/**
 * Delete a product image
 * DELETE /api/products/images/[imageId]
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ imageId: string }> }
) {
  try {
    const params = await context.params;
    const { imageId } = params;

    if (!imageId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image ID is required',
        },
        { status: 400 }
      );
    }

    // Get the image details first to get Cloudflare ID
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
    const dbDeleted = await deleteProductImage(imageId);

    if (!dbDeleted) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to delete image from database',
        },
        { status: 500 }
      );
    }

    // Delete from Cloudflare (don't fail if this fails)
    try {
      await deleteImageFromCloudflare(cloudflareImageId);
    } catch (error) {
      console.error('Failed to delete from Cloudflare, but DB deletion succeeded:', error);
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

/**
 * Update image properties (e.g., set as primary, update order)
 * PATCH /api/products/images/[imageId]
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ imageId: string }> }
) {
  try {
    const params = await context.params;
    const { imageId } = params;
    const body = await request.json();
    const { isPrimary, displayOrder } = body;

    if (!imageId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image ID is required',
        },
        { status: 400 }
      );
    }

    // Get image details
    const imageResult = await query(
      'SELECT product_id FROM product_images WHERE id = $1',
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

    const productId = imageResult.rows[0].product_id;

    // Build update query
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (isPrimary !== undefined) {
      // If setting as primary, first unset all primary images for this product
      if (isPrimary) {
        await query(
          'UPDATE product_images SET is_primary = false WHERE product_id = $1',
          [productId]
        );
      }
      updates.push(`is_primary = $${paramCount++}`);
      values.push(isPrimary);
    }

    if (displayOrder !== undefined) {
      updates.push(`display_order = $${paramCount++}`);
      values.push(displayOrder);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No updates provided',
        },
        { status: 400 }
      );
    }

    values.push(imageId);

    const result = await query(
      `UPDATE product_images SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error('Error updating image:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
