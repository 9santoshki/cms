import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';

export async function GET(_request: NextRequest) {
  try {
    // For development/testing without database
    return NextResponse.json({ 
      success: true, 
      data: mockProducts 
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, image_url, category } = body;

    if (!name || !description || !price || price <= 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name, description, and price are required' 
        },
        { status: 400 }
      );
    }

    // In a real implementation, this would add to the database
    // For now, we'll just return the submitted data
    const newProduct = {
      id: mockProducts.length + 1,
      name,
      description,
      price,
      image_url: image_url || 'default',
      category: category || 'Furniture',
      created_at: new Date().toISOString()
    };

    return NextResponse.json(
      { 
        success: true, 
        data: newProduct 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}