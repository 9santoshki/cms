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

export async function PUT(request: NextRequest) {
  try {
    // Get the session from Supabase auth
    const cookieStore = cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;
    const refreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: 'No access token found' },
        { status: 401 }
      );
    }

    // Get user from Supabase auth
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if the current user is an admin by getting their profile
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !userProfile || userProfile.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Only admins can update user roles' },
        { status: 403 }
      );
    }

    // Get the request body
    const { userId, newRole } = await request.json();

    // Validate the input
    if (!userId || !newRole) {
      return NextResponse.json(
        { success: false, error: 'userId and newRole are required' },
        { status: 400 }
      );
    }

    const validRoles = ['customer', 'moderator', 'admin'];
    if (!validRoles.includes(newRole)) {
      return NextResponse.json(
        { success: false, error: `newRole must be one of: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    // Update the user role in the profiles table
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating user role:', updateError);
      return NextResponse.json(
        { success: false, error: 'Failed to update user role' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data: {
          message: `User role updated successfully to ${newRole}`,
          updatedUser: {
            id: updatedProfile.id,
            role: updatedProfile.role
          }
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in update role API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}