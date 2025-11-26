// /src/app/api/update-product-slugs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import updateProductSlugs from '@/lib/updateProductSlugs';

export async function GET(request: NextRequest) {
  try {
    await updateProductSlugs();
    
    return NextResponse.json({
      success: true,
      message: 'Product slugs updated successfully'
    });
  } catch (error) {
    console.error('Error updating product slugs:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update product slugs'
      },
      { status: 500 }
    );
  }
}