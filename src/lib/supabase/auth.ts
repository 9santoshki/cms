import { createClient } from '@/lib/supabase/client';

// Sign in with Google OAuth
export const signInWithGoogle = async () => {
  const supabase = createClient();

  // Use the current window location as the redirect URL to ensure we return to the same origin
  // This ensures the auth state change event fires properly in the same session
  const redirectTo = `${window.location.origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo,
      // Ensure we get full user profile data
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
    throw error;
  }

  return data;
};

// Sign out
export const signOut = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
  
  return { success: true };
};

// Get current session
export const getCurrentSession = async () => {
  const supabase = createClient();

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error.message);
    return null;
  }

  return session;
};

// Get current user
export const getCurrentUser = async () => {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return user;
};

// Get user profile from the profiles table, creating it if it doesn't exist
export const getUserProfile = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Error getting user:', userError);
    return null;
  }

  // First, try to get the existing profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single();

  if (profileError) {
    // Profile doesn't exist, create it with default customer role
    console.warn('Profile not found, creating new profile for user:', user.id);
    
    const { error: insertError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, role: 'customer' }]);

    if (insertError) {
      console.error('Error creating user profile:', insertError);
      return null;
    }
    
    // Now fetch the profile that was just created
    const { data: newProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching newly created user profile:', fetchError);
      return null;
    }
    
    return newProfile;
  }

  return profile;
};

// Update user role (for admin use only)
export const updateUserRole = async (userId: string, newRole: 'customer' | 'moderator' | 'admin') => {
  const supabase = createClient();

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

// Get all user profiles (for admin use only)
export const getAllUserProfiles = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('id, role, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user profiles:', error);
    throw error;
  }

  return data;
};

// Listen for auth changes
export const onAuthStateChange = (callback: (event: any, session: any) => void) => {
  const supabase = createClient();

  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);

  return () => {
    subscription.unsubscribe();
  };
};