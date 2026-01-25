/**
 * Client-side authentication utilities
 * - Google OAuth sign-in flow with redirect
 * - Session management with cookie and localStorage fallback (Safari)
 * - User profile fetching and role management
 */
import { User } from '@/types';

// Sign in with Google OAuth - redirect to Google OAuth
export const signInWithGoogle = async () => {
  // Use NEXT_PUBLIC_APP_URL if set, otherwise fall back to window.location.origin
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  const redirectUri = `${appUrl}/auth/callback`;
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', googleClientId!);
  googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
  googleAuthUrl.searchParams.set('response_type', 'code');
  googleAuthUrl.searchParams.set('scope', 'openid email profile');
  googleAuthUrl.searchParams.set('access_type', 'offline');
  googleAuthUrl.searchParams.set('prompt', 'consent');

  window.location.href = googleAuthUrl.toString();
};

// Sign out
export const signOut = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem('cms-session-token');
    }

    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cms-session-token');
    }
    throw error;
  }
};

// Get current session/user
export const getCurrentSession = async (): Promise<{ user: User | null }> => {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('cms-session-token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch('/api/auth/session', {
      credentials: 'include',
      headers,
      cache: 'no-cache'
    });

    if (!response.ok) {
      console.warn('Session fetch failed:', response.status, response.statusText);
      return { user: null };
    }

    const data = await response.json();
    return { user: data.user || null };
  } catch (error) {
    console.error('Error getting session:', error);
    return { user: null };
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  const { user } = await getCurrentSession();
  return user;
};

// Get user profile (with role information)s
export const getUserProfile = async (): Promise<{ id: string; role: string } | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  return {
    id: String(user.id),
    role: user.role,
  };
};

// Update user role (admin only)
export const updateUserRole = async (userId: string, newRole: 'customer' | 'moderator' | 'admin') => {
  const response = await fetch('/api/admin/update-role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userId, newRole }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update user role');
  }

  return response.json();
};

// Get all user profiles (admin only)
export const getAllUserProfiles = async () => {
  const response = await fetch('/api/admin/users', {
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch user profiles');
  }

  const data = await response.json();
  return data.users || [];
};

// Listen for auth changes (polling-based since we don't have real-time subscriptions)
export const onAuthStateChange = (callback: (event: string, session: { user: User | null }) => void) => {
  let currentUser: User | null = null;

  const checkAuthState = async () => {
    const { user } = await getCurrentSession();

    if (user && !currentUser) {
      currentUser = user;
      callback('SIGNED_IN', { user });
    } else if (!user && currentUser) {
      currentUser = null;
      callback('SIGNED_OUT', { user: null });
    } else if (user && currentUser && user.id !== currentUser.id) {
      currentUser = user;
      callback('USER_UPDATED', { user });
    }
  };

  // Check immediately
  checkAuthState();

  // Poll every 5 seconds (increased from 2 seconds to reduce server load)
  // The ?login=success flow now handles immediate login detection
  const interval = setInterval(checkAuthState, 5000);

  return {
    unsubscribe: () => {
      clearInterval(interval);
    },
  };
};
