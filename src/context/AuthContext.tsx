'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { User } from '@/types';
import { signInWithGoogle as googleSignIn, signOut, onAuthStateChange, getCurrentUser, getUserProfile } from '@/lib/auth/client';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_TOKEN'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.payload };
    case 'SET_TOKEN': return { ...state, token: action.payload };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_ERROR': return { ...state, error: action.payload };
    case 'LOGOUT': return { ...state, user: null, token: null };
    default: return state;
  }
}

export const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Memoized setters
  const setUser = useCallback((u: User | null) => dispatch({ type: 'SET_USER', payload: u }), []);
  const setToken = useCallback((t: string | null) => dispatch({ type: 'SET_TOKEN', payload: t }), []);
  const setLoading = useCallback((l: boolean) => dispatch({ type: 'SET_LOADING', payload: l }), []);
  const setError = useCallback((e: string | null) => dispatch({ type: 'SET_ERROR', payload: e }), []);

  // Clean Logout
  const logout = useCallback(async () => {
    dispatch({ type: 'LOGOUT' });
    try { await signOut(); } catch (e) {}
  }, []);

  // Google Login
  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await googleSignIn();
    } catch (err: any) {
      setError(err?.message || 'Google sign-in failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  // 🔥 Stable auth listener with initial session check
  useEffect(() => {
    console.log('AuthContext: Setting up auth state change listener');

    // Check current session on mount - run immediately without delay
    const checkCurrentSession = async () => {
      console.log('AuthContext: Checking current session on mount...');

      try {
        const user = await getCurrentUser();
        console.log('AuthContext: getCurrentUser result:', user);
        if (user) {
          console.log('AuthContext: Current user found on mount:', user);
          setUser(user);

          // Load user's cart from server IMMEDIATELY
          try {
            const { useCartStore } = await import('@/store/cartStore');
            console.log('AuthContext: Loading cart from server...');
            await useCartStore.getState().loadServerCart();
            console.log('AuthContext: ✅ Cart loaded from server successfully');
          } catch (cartError) {
            console.error('AuthContext: ❌ Error loading cart:', cartError);
          }
        } else {
          console.log('AuthContext: No current user found on mount');
        }
      } catch (error) {
        console.error('AuthContext: Error checking current session:', error);
      }
    };

    // Run immediately - don't delay with setTimeout
    checkCurrentSession();

    // Add after checkCurrentSession() completes
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
      // Additional session check after Google login
      setTimeout(async () => {
        const user = await getCurrentUser();
        if (user && !state.user) {
          console.log('AuthContext: Detected login success, updating user state', user);
          setUser(user);
        }
      }, 500);
    }



    console.log('AuthContext: Subscribing to auth state changes...');
    const sub = onAuthStateChange(async (event, session) => {
      console.log('AuthContext: Auth state changed event:', event, 'Session:', session);

      if (event === 'SIGNED_IN') {
        const user = session.user;
        if (!user) return;

        console.log('AuthContext: Processing SIGNED_IN event for user:', user);
        setUser(user);
        setToken(null); // We use cookie-based sessions now

        // Load user's cart from server after sign in
        try {
          const { useCartStore } = await import('@/store/cartStore');
          console.log('AuthContext: Loading cart after sign in...');
          await useCartStore.getState().loadServerCart();
          console.log('AuthContext: ✅ Cart loaded from server after sign in');
        } catch (cartError) {
          console.error('AuthContext: ❌ Error loading cart after sign in:', cartError);
        }
      }

      if (event === 'SIGNED_OUT') {
        console.log('AuthContext: Processing SIGNED_OUT event');
        dispatch({ type: 'LOGOUT' });

        // Clear local cart state only (keep database cart for when user logs back in)
        try {
          const { useCartStore } = await import('@/store/cartStore');
          useCartStore.setState({ items: [] });
          console.log('AuthContext: ✅ Local cart state cleared after sign out (database cart preserved)');
        } catch (cartError) {
          console.error('AuthContext: ❌ Error clearing cart after sign out:', cartError);
        }
      }

      if (event === 'USER_UPDATED') {
        console.log('AuthContext: Processing USER_UPDATED event');
        const user = session.user;
        if (!user) return;

        setUser(user);
      }
    });

    // Reload cart when window regains focus (in case user logged in from another tab)
    const handleWindowFocus = async () => {
      console.log('AuthContext: Window focused, checking for cart updates...');
      try {
        const user = await getCurrentUser();
        if (user) {
          const { useCartStore } = await import('@/store/cartStore');
          await useCartStore.getState().loadServerCart();
          console.log('AuthContext: ✅ Cart reloaded on window focus');
        }
      } catch (error) {
        console.error('AuthContext: ❌ Error reloading cart on focus:', error);
      }
    };

    window.addEventListener('focus', handleWindowFocus);

    return () => {
      console.log('AuthContext: Cleaning up auth subscription');
      window.removeEventListener('focus', handleWindowFocus);
      sub.unsubscribe();
    };
  }, [setUser, setToken]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setUser,
        setToken,
        setLoading,
        setError,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
