import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';
import { Params } from 'next/dist/shared/lib/router/adapters/params';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Find the product by ID
    const product = mockProducts.find(p => p.id === parseInt(id));
    
    if (!product) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Product not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
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

    // In a real implementation, this would update the database
    // For now, we'll just return the updated data
    const updatedProduct = {
      id: parseInt(id),
      name,
      description,
      price,
      image_url: image_url || 'default',
      category: category || 'Furniture',
      created_at: new Date().toISOString()
    };
    
    return NextResponse.json({ 
      success: true, 
      data: updatedProduct 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // In a real implementation, this would delete from the database
    // For now, we'll just return a success message
    return NextResponse.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}