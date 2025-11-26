import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Using service role to bypass RLS
);

// Verify JWT token and get user ID
async function getUserIdFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }

  try {
    const decoded = await import('jsonwebtoken').then(jwt => 
      jwt.verify(token, jwtSecret!) as { id: number; email: string; role: string }
    );

    // Verify that the user actually exists
    const { data: user, error } = await supabase
      .from('users')
      .select('id')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      return null;
    }

    return decoded.id;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the order ID from query parameters
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Verify user authentication
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Fetch order details from the database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          quantity,
          price,
          products (name, image_url)
        )
      `)
      .eq('id', orderId)
      .eq('user_id', userId)
      .single();

    if (orderError) {
      console.error('Error fetching order:', orderError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch order details' },
        { status: 500 }
      );
    }

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Format the response to include both order and order items with product details
    const formattedOrder = {
      ...order,
      items: order.order_items?.map((item: any) => ({
        ...item,
        product_name: item.products?.name,
        product_image: item.products?.image_url
      }))
    };

    return NextResponse.json({
      success: true,
      data: formattedOrder
    });
  } catch (error: any) {
    console.error('Error in order details API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}