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

export async function GET(request: NextRequest) {
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

    // Get user profile from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role, created_at, updated_at')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error getting user profile:', profileError);
      return NextResponse.json(
        { success: false, error: 'Failed to get user profile' },
        { status: 500 }
      );
    }

    // Combine user and profile data
    const userData = {
      id: profile.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      role: profile.role,
      avatar: user.user_metadata?.avatar || user.user_metadata?.picture || null,
      created_at: profile.created_at,
      updated_at: profile.updated_at
    };

    return NextResponse.json(
      { success: true, data: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in profile API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    // Get the updated profile data from the request
    const { name, avatar } = await request.json();

    // Update the user's metadata in Supabase auth
    const { data: updatedAuthUser, error: authUpdateError } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: {
        full_name: name,
        avatar: avatar
      }
    });

    if (authUpdateError) {
      console.error('Error updating user metadata in auth:', authUpdateError);
      return NextResponse.json(
        { success: false, error: 'Failed to update user profile in auth' },
        { status: 500 }
      );
    }

    // Get user profile from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role, created_at, updated_at')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error getting user profile:', profileError);
      return NextResponse.json(
        { success: false, error: 'Failed to get user profile' },
        { status: 500 }
      );
    }

    // Combine user and profile data
    const updatedUserData = {
      id: profile.id,
      email: updatedAuthUser.user.email,
      name: updatedAuthUser.user.user_metadata?.full_name || updatedAuthUser.user.user_metadata?.name || updatedAuthUser.user.email?.split('@')[0] || 'User',
      role: profile.role,
      avatar: updatedAuthUser.user.user_metadata?.avatar || updatedAuthUser.user.user_metadata?.picture || null,
      created_at: profile.created_at,
      updated_at: new Date().toISOString() // Use current time as the updated time
    };

    return NextResponse.json(
      { success: true, data: updatedUserData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in profile update API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}