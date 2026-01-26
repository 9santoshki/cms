/**
 * Authentication context provider
 * - Manages user session state with cookie and localStorage fallback
 * - Handles Google OAuth sign-in and logout flows
 * - Syncs cart state with authentication status
 */
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

  const logout = useCallback(async () => {
    console.log('[Auth] Logout started');
    dispatch({ type: 'LOGOUT' });

    // Clear persisted cart storage first, then clear cart state
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart-storage');
      console.log('[Auth] Cleared cart-storage from localStorage');
    }

    try {
      const { useCartStore } = await import('@/store/cartStore');
      useCartStore.setState({ items: [] });
      console.log('[Auth] Cleared cart state');
    } catch (cartError) {
    }

    signOut().catch(e => {
    });

    if (typeof window !== 'undefined') {
      localStorage.removeItem('cms-session-token');
    }

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

  useEffect(() => {
    const checkCurrentSession = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUser(user);
          console.log('[Auth] User logged in, loading cart from server');

          try {
            const { useCartStore } = await import('@/store/cartStore');
            await useCartStore.getState().loadServerCart();
          } catch (cartError) {
            console.error('[Auth] Error loading cart:', cartError);
          }
        }
      } catch (error) {
        console.error('Error checking current session:', error);
      }
    };

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get('token');

      if (tokenFromUrl) {
        localStorage.setItem('cms-session-token', tokenFromUrl);

        urlParams.delete('token');
        const newUrl = urlParams.toString()
          ? `${window.location.pathname}?${urlParams.toString()}`
          : window.location.pathname + (urlParams.get('login') === 'success' ? '?login=success' : '');
        window.history.replaceState({}, '', newUrl);
      }
    }

    checkCurrentSession();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
      const forceSessionCheck = async (attempt = 1, maxAttempts = 5) => {
        const user = await getCurrentUser();

        if (user) {
          setUser(user);

          try {
            const { useCartStore } = await import('@/store/cartStore');
            await useCartStore.getState().loadServerCart();
          } catch (cartError) {
            console.error('Error loading cart after login:', cartError);
          }

          window.history.replaceState({}, '', '/');
        } else if (attempt < maxAttempts) {
          setTimeout(() => forceSessionCheck(attempt + 1, maxAttempts), 200);
        }
      };

      forceSessionCheck();
    }

    const sub = onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        const user = session.user;
        if (!user) return;

        setUser(user);
        setToken(null);

        try {
          const { useCartStore } = await import('@/store/cartStore');
          await useCartStore.getState().loadServerCart();
        } catch (cartError) {
          console.error('Error loading cart after sign in:', cartError);
        }
      }

      if (event === 'SIGNED_OUT') {
        dispatch({ type: 'LOGOUT' });

        try {
          const { useCartStore } = await import('@/store/cartStore');
          useCartStore.setState({ items: [] });
        } catch (cartError) {
          console.error('Error clearing cart after sign out:', cartError);
        }
      }

      if (event === 'USER_UPDATED') {
        const user = session.user;
        if (!user) return;

        setUser(user);
      }
    });

    const handleWindowFocus = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const { useCartStore } = await import('@/store/cartStore');
          await useCartStore.getState().loadServerCart();
        }
      } catch (error) {
        console.error('Error reloading cart on focus:', error);
      }
    };

    window.addEventListener('focus', handleWindowFocus);

    return () => {
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
