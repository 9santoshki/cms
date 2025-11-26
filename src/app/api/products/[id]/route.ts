import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateUniqueSlug } from '@/lib/slug';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Wait for params to be resolved in Next.js 13+ App Router
    const params = await context.params;
    const productIdOrSlug = params.id;

    if (productIdOrSlug === undefined) {
      console.error('Parameter is undefined');
      return NextResponse.json(
        {
          success: false,
          error: 'Product parameter is missing'
        },
        { status: 400 }
      );
    }

    // Prefer slug lookup for better SEO and UX
    // First try to find by slug (non-numeric string)
    const isNumericId = /^\d+$/.test(productIdOrSlug);
    let product;

    if (!isNumericId) {
      // Parameter is a slug (string with non-numeric characters)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', productIdOrSlug)
        .single();

      if (error || !data) {
        return NextResponse.json(
          {
            success: false,
            error: 'Product not found'
          },
          { status: 404 }
        );
      }
      
      product = data;
    } else {
      // Parameter is a numeric ID
      const productId = parseInt(productIdOrSlug, 10);
      if (isNaN(productId)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid product ID: ${productIdOrSlug}`
          },
          { status: 400 }
        );
      }
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error || !data) {
        return NextResponse.json(
          {
            success: false,
            error: 'Product not found'
          },
          { status: 404 }
        );
      }
      
      product = data;
    }

    // Fetch associated images for the product
    // Handle case where product_images table might not exist yet
    let productWithImages;
    try {
      const { data: imagesResult, error: imageError } = await supabase
        .from('product_images')
        .select('image_url, is_primary, sort_order')
        .eq('product_id', product.id)
        .order('sort_order');

      if (imageError) {
        throw imageError;
      }

      productWithImages = {
        ...product,
        images: imagesResult.map((img: any) => img.image_url),
        primary_image: imagesResult.find((img: any) => img.is_primary)?.image_url || product.image_url
      };
    } catch (imageError) {
      // If product_images table doesn't exist, return product with just the original image_url
      console.warn(`Could not fetch images for product ${product.id}:`, (imageError as Error).message || imageError);
      productWithImages = {
        ...product,
        images: product.image_url ? [product.image_url] : [],
        primary_image: product.image_url
      };
    }

    return NextResponse.json({
      success: true,
      data: productWithImages
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

    // Convert the id to integer for database query
    const productId = parseInt(id, 10);

    const body = await request.json();
    const { name, description, price, image_url, image_urls, category } = body;

    if (!name || !description || !price || price <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name, description, and price are required'
        },
        { status: 400 }
      );
    }

    // First fetch the existing product
    const { data: existingProduct, error: existingError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (existingError || !existingProduct) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found'
        },
        { status: 404 }
      );
    }

    // If name has changed, generate a new unique slug
    let updatedFields: any = { name, description, price, image_url, category };

    if (name !== existingProduct.name) {
      // Generate new slug based on the new name
      const newSlug = await generateUniqueSlug(name, productId.toString());
      updatedFields.slug = newSlug;
    }

    // Update the product
    const { data: product, error: productError } = await supabase
      .from('products')
      .update(updatedFields)
      .eq('id', productId)
      .select()
      .single();

    if (productError || !product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found'
        },
        { status: 404 }
      );
    }

    // Delete existing images for this product (handle case where table might not exist)
    try {
      const { error: deleteError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId);

      if (deleteError) {
        throw deleteError;
      }
    } catch (deleteError) {
      console.warn(`Could not delete images for product ${productId}:`, (deleteError as Error).message || deleteError);
    }

    // If multiple images are provided, add them to the product_images table
    if (Array.isArray(image_urls) && image_urls.length > 0) {
      try {
        const imagesToInsert = image_urls.map((img_url: string, index: number) => ({
          product_id: product.id,
          image_url: img_url,
          is_primary: index === 0, // Make the first image primary by default
          sort_order: index
        }));

        const { error: insertError } = await supabase
          .from('product_images')
          .insert(imagesToInsert);

        if (insertError) {
          throw insertError;
        }
      } catch (insertError) {
        console.warn(`Could not insert images for product ${product.id}:`, (insertError as Error).message || insertError);
      }
    } else if (image_url) {
      // If only a single image is provided, add it as a primary image
      try {
        const { error: insertError } = await supabase
          .from('product_images')
          .insert([
            { product_id: product.id, image_url, is_primary: true, sort_order: 0 }
          ]);

        if (insertError) {
          throw insertError;
        }
      } catch (insertError) {
        console.warn(`Could not insert image for product ${product.id}:`, (insertError as Error).message || insertError);
      }
    }

    // Fetch the updated product with its images to return
    // Handle case where product_images table might not exist yet
    let productWithImages;
    try {
      const { data: imagesResult, error: imageError } = await supabase
        .from('product_images')
        .select('image_url, is_primary, sort_order')
        .eq('product_id', product.id)
        .order('sort_order');

      if (imageError) {
        throw imageError;
      }

      productWithImages = {
        ...product,
        images: imagesResult.map((img: any) => img.image_url),
        primary_image: imagesResult.find((img: any) => img.is_primary)?.image_url || product.image_url
      };
    } catch (imageError) {
      // If product_images table doesn't exist, return product with just the original image_url
      console.warn(`Could not fetch images for product ${product.id}:`, (imageError as Error).message || imageError);
      productWithImages = {
        ...product,
        images: product.image_url ? [product.image_url] : [],
        primary_image: product.image_url
      };
    }

    return NextResponse.json({
      success: true,
      data: productWithImages
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

    // Convert the id to integer for database query
    const productId = parseInt(id, 10);

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
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