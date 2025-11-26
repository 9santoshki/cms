import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Verify JWT token and get user ID
async function getUserIdFromRequest(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;

  if (!accessToken) {
    return null;
  }

  // Get user from Supabase auth
  const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

  if (authError || !user) {
    return null;
  }

  return user.id;
}

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
    // Verify user authentication
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Extract query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date'); // Filter by specific date
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Build the query using Supabase client
    let query = supabase
      .from('appointments')
      .select(`
        id,
        user_id,
        appointment_date,
        status,
        notes,
        created_at,
        updated_at
      `)
      .eq('user_id', userId) // Only fetch appointments for the current user
      .range(offset, offset + limit - 1)
      .order('appointment_date', { ascending: true });

    // Add status filter if provided
    if (status) {
      query = query.eq('status', status);
    }

    // Add date filter if provided
    if (date) {
      query = query.eq('appointment_date', date);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching appointments:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch appointments' },
        { status: 500 }
      );
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('appointments')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (status) {
      countQuery = countQuery.eq('status', status);
    }

    if (date) {
      countQuery = countQuery.eq('appointment_date', date);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error('Error counting appointments:', countError);
      return NextResponse.json(
        { success: false, error: 'Failed to count appointments' },
        { status: 500 }
      );
    }

    const total = count || 0;

    return NextResponse.json({
      success: true,
      data: {
        appointments: data,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasMore: page < Math.ceil(total / limit)
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
    console.error('Error fetching appointments:', error);
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
    // Verify user authentication
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { appointment_date, notes } = await request.json();

    // Validate required fields
    if (!appointment_date) {
      return NextResponse.json(
        { success: false, error: 'Appointment date is required' },
        { status: 400 }
      );
    }

    // Validate date format and ensure it's in the future
    const appointmentDate = new Date(appointment_date);
    const now = new Date();
    
    if (appointmentDate <= now) {
      return NextResponse.json(
        { success: false, error: 'Appointment date must be in the future' },
        { status: 400 }
      );
    }

    // Check for existing appointments at the same time or overlapping
    const { data: existingAppointments, error: checkError } = await supabase
      .from('appointments')
      .select('id')
      .eq('appointment_date', appointment_date)
      .eq('status', 'confirmed'); // Only check confirmed appointments

    if (checkError) {
      console.error('Error checking existing appointments:', checkError);
      return NextResponse.json(
        { success: false, error: 'Failed to check availability' },
        { status: 500 }
      );
    }

    if (existingAppointments && existingAppointments.length > 0) {
      return NextResponse.json(
        { success: false, error: 'The selected time slot is already booked' },
        { status: 400 }
      );
    }

    // Create the appointment
    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert([
        {
          user_id: userId,
          appointment_date: appointment_date,
          notes: notes || null,
          status: 'pending' // Default to pending status
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating appointment:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create appointment' },
        { status: 500 }
      );
    }

    // TODO: Send confirmation email to the user
    // This would typically trigger an email service
    console.log(`Sending confirmation email for appointment ${appointment.id}`);

    return NextResponse.json(
      {
        success: true,
        data: appointment
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
    console.error('Error creating appointment:', error);
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