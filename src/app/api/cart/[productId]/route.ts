import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import db from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;

  // Extract token from headers
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  const token = authHeader.substring(7);
  
  try {
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = decodedToken.userId;
    
    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const productIdNum = parseInt(productId);

    try {
      const deleteQuery = `
        DELETE FROM cart_items 
        WHERE user_id = $1 AND product_id = $2 
        RETURNING *
      `;
      const result = await db.query(deleteQuery, [userId, productIdNum]);

      if (result.rows.length === 0) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Cart item not found' 
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { 
          success: true, 
          message: 'Item removed from cart' 
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Internal server error' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
}