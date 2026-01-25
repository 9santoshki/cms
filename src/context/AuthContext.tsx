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
    console.log('AuthContext: Logout initiated');

    // Clear frontend state immediately
    dispatch({ type: 'LOGOUT' });

    // Clear cart state immediately
    try {
      const { useCartStore } = await import('@/store/cartStore');
      useCartStore.setState({ items: [] });
      console.log('AuthContext: ✅ Cart state cleared on logout');
    } catch (cartError) {
      console.error('AuthContext: ❌ Error clearing cart on logout:', cartError);
    }

    // Call logout API (don't wait for completion)
    signOut().catch(e => {
      console.error('AuthContext: ❌ Logout API error (non-critical):', e);
    });

    // Clear localStorage token immediately (Safari)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cms-session-token');
      console.log('AuthContext: ✅ Cleared localStorage token');
    }

    // Immediate redirect (don't wait for API)
    // Use replace() to prevent back button from returning to authenticated page
    console.log('AuthContext: Redirecting to homepage...');
    window.location.replace('/');
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

    // Safari workaround: Check URL for token parameter
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get('token');

      if (tokenFromUrl) {
        console.log('AuthContext: 🦁 Safari fallback - Found token in URL, storing in localStorage');
        localStorage.setItem('cms-session-token', tokenFromUrl);

        // Clean up URL immediately
        urlParams.delete('token');
        const newUrl = urlParams.toString()
          ? `${window.location.pathname}?${urlParams.toString()}`
          : window.location.pathname + (urlParams.get('login') === 'success' ? '?login=success' : '');
        window.history.replaceState({}, '', newUrl);
      }

      // Debug: Check if cookies are accessible
      console.log('AuthContext: Browser cookies:', document.cookie);
      console.log('AuthContext: Has cms-session cookie:', document.cookie.includes('cms-session'));
      console.log('AuthContext: Has localStorage token:', !!localStorage.getItem('cms-session-token'));
    }

    // Run immediately - don't delay with setTimeout
    checkCurrentSession();

    // Check if login was just completed
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
      console.log('AuthContext: Login success detected, forcing immediate session check...');

      // Force multiple session checks to ensure we catch the login
      const forceSessionCheck = async (attempt = 1, maxAttempts = 5) => {
        console.log(`AuthContext: Login check attempt ${attempt}/${maxAttempts}`);
        const user = await getCurrentUser();

        if (user) {
          console.log('AuthContext: ✅ User found after login!', user);
          setUser(user);

          // Load cart
          try {
            const { useCartStore } = await import('@/store/cartStore');
            await useCartStore.getState().loadServerCart();
            console.log('AuthContext: ✅ Cart loaded after login');
          } catch (cartError) {
            console.error('AuthContext: ❌ Error loading cart after login:', cartError);
          }

          // Clean up URL
          window.history.replaceState({}, '', '/');
        } else if (attempt < maxAttempts) {
          // Try again after a short delay
          setTimeout(() => forceSessionCheck(attempt + 1, maxAttempts), 200);
        } else {
          console.warn('AuthContext: ⚠️ Failed to load user after login');
        }
      };

      // Start checking immediately
      forceSessionCheck();
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
