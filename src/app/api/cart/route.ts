import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { mockCartItems, mockProducts } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  // Extract token from headers
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For development/testing without authentication
    return NextResponse.json({ 
      success: true, 
      data: mockCartItems 
    });
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

    // For development/testing, return mock data
    return NextResponse.json({ 
      success: true, 
      data: mockCartItems 
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Extract token from headers
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For development/testing without authentication
    const body = await request.json();
    const { product_id, quantity = 1 } = body;

    if (!product_id || quantity <= 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Product ID and quantity are required' 
        },
        { status: 400 }
      );
    }

    // Find the product that's being added
    const product = mockProducts.find(p => p.id === product_id);
    if (!product) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Product not found' 
        },
        { status: 404 }
      );
    }

    // Create a mock cart item
    const cartItem = {
      id: mockCartItems.length + 1,
      product_id,
      name: product.name,
      price: product.price,
      quantity,
      image_url: product.image_url
    };

    return NextResponse.json(
      { 
        success: true, 
        data: cartItem 
      },
      { status: 200 }
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
    const body = await request.json();
    const { product_id, quantity = 1 } = body;

    if (!product_id || quantity <= 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Product ID and quantity are required' 
        },
        { status: 400 }
      );
    }

    // In a real implementation, this would interact with the database
    // For now, we'll return mock data
    const product = mockProducts.find(p => p.id === product_id);
    if (!product) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Product not found' 
        },
        { status: 404 }
      );
    }

    const cartItem = {
      id: mockCartItems.length + 1,
      product_id,
      name: product.name,
      price: product.price,
      quantity,
      image_url: product.image_url
    };

    return NextResponse.json(
      { 
        success: true, 
        data: cartItem 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Extract token from headers
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For development/testing without authentication
    const body = await request.json();
    const { product_id, quantity } = body;

    if (!product_id || quantity < 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Product ID and quantity are required' 
        },
        { status: 400 }
      );
    }

    if (quantity === 0) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Item removed from cart' 
        },
        { status: 200 }
      );
    } else {
      // Return updated item
      const updatedItem = {
        id: 1,  // mock ID
        product_id,
        quantity,
        name: "Mock Product",
        price: 99.99,
        image_url: "mock"
      };

      return NextResponse.json(
        { 
          success: true, 
          data: updatedItem 
        },
        { status: 200 }
      );
    }
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
    const body = await request.json();
    const { product_id, quantity } = body;

    if (!product_id || quantity < 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Product ID and quantity are required' 
        },
        { status: 400 }
      );
    }

    if (quantity === 0) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Item removed from cart' 
        },
        { status: 200 }
      );
    } else {
      // Return updated item
      const updatedItem = {
        id: 1,  // mock ID
        product_id,
        quantity,
        name: "Mock Product",
        price: 99.99,
        image_url: "mock"
      };

      return NextResponse.json(
        { 
          success: true, 
          data: updatedItem 
        },
        { status: 200 }
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

export async function DELETE(request: NextRequest) {
  // Extract token from headers
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For development/testing without authentication
    return NextResponse.json(
      { 
        success: true, 
        message: 'Cart cleared' 
      },
      { status: 200 }
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

    // For development/testing, return success
    return NextResponse.json(
      { 
        success: true, 
        message: 'Cart cleared' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
}