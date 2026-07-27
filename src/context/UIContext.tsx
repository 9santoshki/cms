'use client';

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

interface LoadingState {
  products: boolean;
  cart: boolean;
  orders: boolean;
  appointments: boolean;
  auth: boolean;
  user: boolean;
}

interface ErrorState {
  products: string | null;
  cart: string | null;
  orders: string | null;
  appointments: string | null;
  auth: string | null;
  user: string | null;
}

interface UIState {
  loading: LoadingState;
  error: ErrorState;
}

type UIAction =
  | { type: 'SET_LOADING'; payload: { type: keyof LoadingState; value: boolean } }
  | { type: 'SET_ERROR'; payload: { type: keyof ErrorState; value: string | null } }
  | { type: 'CLEAR_ERROR'; payload: { type: keyof ErrorState } };

const initialState: UIState = {
  loading: {
    products: false,
    cart: false,
    orders: false,
    appointments: false,
    auth: false,
    user: false,
  },
  error: {
    products: null,
    cart: null,
    orders: null,
    appointments: null,
    auth: null,
    user: null,
  },
};

const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.type]: action.payload.value },
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: { ...state.error, [action.payload.type]: action.payload.value },
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: { ...state.error, [action.payload.type]: null },
      };
    default:
      return state;
  }
};

interface UIContextValue {
  loading: LoadingState;
  error: ErrorState;
  setLoading: (type: keyof LoadingState, value: boolean) => void;
  setError: (type: keyof ErrorState, value: string | null) => void;
  clearError: (type: keyof ErrorState) => void;
}

export const UIContext = createContext<UIContextValue | undefined>(undefined);

interface UIProviderProps {
  children: React.ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const setLoading = useCallback((type: keyof LoadingState, value: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: { type, value } });
  }, []);

  const setError = useCallback((type: keyof ErrorState, value: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: { type, value } });
  }, []);

  const clearError = useCallback((type: keyof ErrorState) => {
    dispatch({ type: 'CLEAR_ERROR', payload: { type } });
  }, []);

  const value = useMemo<UIContextValue>(
    () => ({ loading: state.loading, error: state.error, setLoading, setError, clearError }),
    [state.loading, state.error, setLoading, setError, clearError]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
