import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');

    if (!query && !category) {
      return NextResponse.json(
        { success: false, error: 'Query or category parameter is required' },
        { status: 400 }
      );
    }

    let sqlQuery = 'SELECT * FROM products WHERE ';
    const params: string[] = [];
    let paramIndex = 1;

    if (query) {
      sqlQuery += `(name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      params.push(`%${query}%`);
      paramIndex++;
    }

    if (query && category) {
      sqlQuery += ' AND ';
    }

    if (category) {
      if (query) {
        sqlQuery += `category ILIKE $${paramIndex}`;
      } else {
        sqlQuery += `category ILIKE $${paramIndex}`;
      }
      params.push(`%${category}%`);
    }

    let queryBuilder = supabase.from('products').select('*');

    if (query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
    }

    if (category) {
      queryBuilder = queryBuilder.ilike('category', `%${category}%`);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { success: false, error: 'Search failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}