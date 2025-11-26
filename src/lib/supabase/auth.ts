import { createClient } from '@/lib/supabase/client';

// Sign in with Google OAuth
export const signInWithGoogle = async () => {
  const supabase = createClient();

  const redirectTo = `${window.location.origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo,
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

// Get user profile from the profiles table
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

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error('Error getting user profile:', profileError);
    return null;
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