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

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
      "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    // Extract search, filter, and pagination parameters from query
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : null;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    // Build the query using Supabase client
    let query = supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        price,
        category,
        images,
        stock_quantity,
        created_at,
        updated_at,
        slug
      `)
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(`name.ilike.${`%${search}%`},description.ilike.${`%${search}%`}`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (minPrice !== null && !isNaN(minPrice)) {
      query = query.gte('price', minPrice);
    }

    if (maxPrice !== null && !isNaN(maxPrice)) {
      query = query.lte('price', maxPrice);
    }

    query = query.order('created_at', { ascending: false });
    
    // Execute the main query
    const { data: productsResult, error: productsError } = await query;

    if (productsError) {
      console.error('Error fetching products:', productsError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    // For each product, try to fetch its associated images
    const productsWithImages = await Promise.all(productsResult.map(async (product) => {
      try {
        const { data: imagesResult, error: imageError } = await supabase
          .from('product_images')
          .select('image_url, is_primary, sort_order')
          .eq('product_id', product.id)
          .order('sort_order');

        if (imageError) {
          throw imageError;
        }

        return {
          ...product,
          images: imagesResult.map((img: any) => img.image_url),
          primary_image: imagesResult.find((img: any) => img.is_primary)?.image_url || product.image_url
        };
      } catch (imageError) {
        // If product_images table doesn't exist or has an error, return product with just the images field
        console.warn(`Could not fetch images for product ${product.id}:`, (imageError as Error).message || imageError);
        return {
          ...product,
          images: Array.isArray(product.images) ? product.images : (product.image_url ? [product.image_url] : []),
          primary_image: product.image_url
        };
      }
    }));

    // Get total count for pagination
    let countQuery = supabase
      .from('products')
      .select('id', { count: 'exact', head: true });

    if (search) {
      countQuery = countQuery.or(`name.ilike.${`%${search}%`},description.ilike.${`%${search}%`}`);
    }

    if (category) {
      countQuery = countQuery.eq('category', category);
    }

    if (minPrice !== null && !isNaN(minPrice)) {
      countQuery = countQuery.gte('price', minPrice);
    }

    if (maxPrice !== null && !isNaN(maxPrice)) {
      countQuery = countQuery.lte('price', maxPrice);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error('Error counting products:', countError);
      return NextResponse.json(
        { success: false, error: 'Failed to count products' },
        { status: 500 }
      );
    }

    const total = count || 0;

    return NextResponse.json({
      success: true,
      data: {
        products: productsWithImages,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasMore: page < Math.ceil(total / limit)
        },
        filters: {
          search,
          category,
          minPrice,
          maxPrice
        }
      }
    }, {
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, image_url, image_urls, category } = body;

    if (!name || !description || !price || price <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name, description, and price are required'
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        }
      );
    }

    // Generate a unique slug for the product
    const slug = await generateUniqueSlug(name);

    // Create the product first
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([
        { name, description, price, image_url, category, slug }
      ])
      .select()
      .single();

    if (productError) {
      console.error('Error creating product:', productError);
      return NextResponse.json(
        { success: false, error: productError.message },
        { status: 500 }
      );
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

        const { error: imagesError } = await supabase
          .from('product_images')
          .insert(imagesToInsert);

        if (imagesError) {
          throw imagesError;
        }
      } catch (insertError) {
        console.warn(`Could not insert images for product ${product.id}:`, (insertError as Error).message || insertError);
      }
    } else if (image_url) {
      // If only a single image is provided, add it as a primary image
      try {
        const { error: imageError } = await supabase
          .from('product_images')
          .insert([
            { product_id: product.id, image_url, is_primary: true, sort_order: 0 }
          ]);

        if (imageError) {
          throw imageError;
        }
      } catch (insertError) {
        console.warn(`Could not insert image for product ${product.id}:`, (insertError as Error).message || insertError);
      }
    }

    // Fetch the product with its images to return
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

    return NextResponse.json(
      {
        success: true,
        data: productWithImages
      },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
        },
      }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
        },
      }
    );
  }
}