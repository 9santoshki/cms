'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { User } from '@/types';
import { signInWithGoogle as googleSignIn } from '@/lib/supabase/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthAction {
  type: string;
  payload?: any;
}

// Action types
const AUTH_ACTIONS = {
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT'
};

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case AUTH_ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext<{
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
} | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUser = (user: User | null) => {
    dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user });
  };

  const setToken = (token: string | null) => {
    dispatch({ type: AUTH_ACTIONS.SET_TOKEN, payload: token });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error });
  };

  const logout = async () => {
    try {
      // Also sign out from supabase
      await import('@/lib/supabase/auth').then(async ({ signOut }) => {
        await signOut();
      });
      
      // Clear the local state
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Error during logout:', error);
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if window is available (client-side only)
      if (typeof window === 'undefined') {
        throw new Error('Authentication can only be performed on the client side');
      }

      // Use the existing google sign-in implementation from the auth library
      await googleSignIn();
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google. Please try again.');
      throw error; // Re-throw so calling components can handle the error
    } finally {
      setLoading(false);
    }
  };

  // Set up auth state change listener
  React.useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      import('@/lib/supabase/auth').then(({ onAuthStateChange, getCurrentUser, getUserProfile }) => {
        const subscription = onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session?.user) {
              // Get user profile data
              const profile = await getUserProfile();
              if (profile) {
                // Create a User object with both session user data and profile info
                const user: User = {
                  id: session.user.id,
                  email: session.user.email || '',
                  name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
                  avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || '',
                  role: profile.role,
                  // Add any other fields as needed
                };
                setUser(user);
                setToken(session.access_token || null);
              } else {
                // If profile doesn't exist, at least set basic user info
                const user: User = {
                  id: session.user.id,
                  email: session.user.email || '',
                  name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
                  avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || '',
                  role: 'customer', // default role
                  // Add any other fields as needed
                };
                setUser(user);
                setToken(session.access_token || null);
              }
            }
          } else if (event === 'SIGNED_OUT') {
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
          } else if (event === 'USER_UPDATED') {
            // Update user info if it has been updated
            const user = await getCurrentUser();
            if (user) {
              const profile = await getUserProfile();
              if (profile) {
                const updatedUser: User = {
                  id: user.id,
                  email: user.email || '',
                  name: user.user_metadata?.full_name || user.user_metadata?.name || '',
                  avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
                  role: profile.role,
                  // Add any other fields as needed
                };
                setUser(updatedUser);
              }
            }
          }
        });

        // Clean up subscription on unmount
        return () => {
          subscription.unsubscribe();
        };
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        setUser,
        setToken,
        setLoading,
        setError,
        logout,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};