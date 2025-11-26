import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// Initialize Supabase client with service role for bypassing RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key to bypass RLS
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
    const decoded = jwt.verify(token, jwtSecret) as { id: number; email: string; role: string };
    
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
    const userId = await getUserIdFromRequest(request);

    if (userId) {
      // Authenticated user - get database cart with service role client
      const { data: cartItems, error: cartError } = await supabase
        .from('cart_items')
        .select(`
          id, 
          product_id, 
          quantity,
          products (id, name, price, image_url)
        `)
        .eq('user_id', userId);

      if (cartError) {
        console.error('Error fetching cart items:', cartError);
        return NextResponse.json(
          { success: false, error: 'Failed to fetch cart items' },
          { status: 500 }
        );
      }

      // Format the response to match expected format
      const formattedCartItems = cartItems?.map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        name: item.products?.name || 'Unknown Product',
        price: item.products?.price || 0,
        image_url: item.products?.image_url || null,
        originalPrice: null,  // Default values for compatibility
        discount: 0
      })) || [];

      return NextResponse.json(
        { success: true, data: formattedCartItems },
        { status: 200 }
      );
    } else {
      // Unauthenticated user - return empty cart
      return NextResponse.json(
        { success: true, data: [] },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { product_id, quantity = 1 } = await request.json();

    if (!product_id || typeof product_id !== 'number' || product_id <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid product ID is required' },
        { status: 400 }
      );
    }

    if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid positive quantity is required' },
        { status: 400 }
      );
    }

    // Check if item already exists in cart
    const { data: existingItem, error: selectError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', userId)
      .eq('product_id', product_id)
      .single();

    if (existingItem) {
      // Item exists, update quantity by adding to existing quantity
      const newQuantity = existingItem.quantity + quantity;
      
      const { data, error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)
        .select('*, products(name, price, image_url)')
        .single();

      if (updateError) {
        console.error('Error updating cart item:', updateError);
        return NextResponse.json(
          { success: false, error: 'Failed to update cart item' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: {
            id: data.id,
            product_id: data.product_id,
            name: data.products?.name || 'Unknown Product',
            price: data.products?.price || 0,
            quantity: data.quantity,
            image_url: data.products?.image_url || null
          }
        },
        { status: 200 }
      );
    } else {
      // Item doesn't exist, insert new cart item
      const { data, error: insertError } = await supabase
        .from('cart_items')
        .insert([
          { user_id: userId, product_id, quantity }
        ])
        .select('*, products(name, price, image_url)')
        .single();

      if (insertError) {
        // Handle race condition - if item was inserted by another request in the meantime
        if (insertError.code === '23505' || // Unique violation
            insertError.message?.toLowerCase().includes('duplicate') ||
            insertError.message?.toLowerCase().includes('unique')) {
          
          // Try updating the item that was added by the other request
          const { data: updateData, error: updateError2 } = await supabase
            .from('cart_items')
            .update({ quantity: quantity })
            .eq('user_id', userId)
            .eq('product_id', product_id)
            .select('*, products(name, price, image_url)')
            .single();

          if (updateError2) {
            return NextResponse.json(
              { success: false, error: 'Failed to add item to cart' },
              { status: 500 }
            );
          }

          return NextResponse.json(
            {
              success: true,
              data: {
                id: updateData.id,
                product_id: updateData.product_id,
                name: updateData.products?.name || 'Unknown Product',
                price: updateData.products?.price || 0,
                quantity: updateData.quantity,
                image_url: updateData.products?.image_url || null
              }
            },
            { status: 200 }
          );
        } else {
          console.error('Error inserting cart item:', insertError);
          return NextResponse.json(
            { success: false, error: 'Failed to add item to cart' },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        {
          success: true,
          data: {
            id: data.id,
            product_id: data.product_id,
            name: data.products?.name || 'Unknown Product',
            price: data.products?.price || 0,
            quantity: data.quantity,
            image_url: data.products?.image_url || null
          }
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { product_id, quantity } = await request.json();

    if (!product_id || typeof product_id !== 'number' || product_id <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid product ID is required' },
        { status: 400 }
      );
    }

    if (typeof quantity !== 'number' || isNaN(quantity)) {
      return NextResponse.json(
        { success: false, error: 'Valid quantity is required' },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      // If quantity is 0 or negative, remove item from cart
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', product_id);

      if (error) {
        console.error('Error removing cart item:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to remove item from cart' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Item removed from cart' },
        { status: 200 }
      );
    } else {
      // Update quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', userId)
        .eq('product_id', product_id)
        .select('*, products(name, price, image_url)')
        .single();

      if (error) {
        console.error('Error updating cart item:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to update cart item' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: {
            id: data.id,
            product_id: data.product_id,
            name: data.products?.name || 'Unknown Product',
            price: data.products?.price || 0,
            quantity: data.quantity,
            image_url: data.products?.image_url || null
          }
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (userId) {
      // Authenticated user - clear database cart
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('Error clearing cart:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to clear cart' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Cart cleared' },
        { status: 200 }
      );
    } else {
      // Unauthenticated user - return success for client-side cart handling
      return NextResponse.json(
        { success: true, message: 'Cart cleared' },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}