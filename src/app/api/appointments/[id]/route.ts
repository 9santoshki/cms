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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify user authentication
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Fetch the specific appointment
    const { data: appointment, error } = await supabase
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
      .eq('id', id)
      .eq('user_id', userId) // Ensure user can only access their own appointments
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows found
        return NextResponse.json(
          { success: false, error: 'Appointment not found' },
          { status: 404 }
        );
      }
      
      console.error('Error fetching appointment:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
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
    // Verify user authentication
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = params;
    const { status, notes } = await request.json();

    // Verify the appointment exists and belongs to the user
    const { data: existingAppointment, error: fetchError } = await supabase
      .from('appointments')
      .select('id, user_id, status')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !existingAppointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (status) {
      // Only allow valid status transitions
      if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
        return NextResponse.json(
          { success: false, error: 'Invalid status' },
          { status: 400 }
        );
      }
      
      // Prevent unauthorized status changes (admin/moderator can change any status)
      // For now, only allow users to cancel their own appointments
      if (status === 'cancelled' && (existingAppointment.status !== 'cancelled' || existingAppointment.status !== 'completed')) {
        updateData.status = status;
      } else if (status === 'pending' && existingAppointment.status === 'cancelled') {
        // Allow rescheduling from cancelled to pending
        updateData.status = status;
      } else {
        // For other status changes, the user may need to go through admin/moderator
        // For now, we'll limit to what users can do directly
        return NextResponse.json(
          { success: false, error: 'You cannot change the appointment status to ' + status },
          { status: 400 }
        );
      }
    }
    
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    // Update the appointment
    const { data: updatedAppointment, error } = await supabase
      .from('appointments')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating appointment:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedAppointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify user authentication
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Verify the appointment exists and belongs to the user
    const { data: existingAppointment, error: fetchError } = await supabase
      .from('appointments')
      .select('id, user_id, status')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !existingAppointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Only allow deletion for pending or cancelled appointments
    // Don't allow deletion of confirmed/completed appointments
    if (existingAppointment.status === 'confirmed' || existingAppointment.status === 'completed') {
      return NextResponse.json(
        { success: false, error: 'Cannot delete a confirmed or completed appointment' },
        { status: 400 }
      );
    }

    // Delete the appointment
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting appointment:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}