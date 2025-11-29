'use client';

import React, { createContext, useContext, useReducer } from 'react';

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

interface UIAction {
  type: string;
  payload?: any;
}

// Action types
const UI_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state
const initialState: UIState = {
  loading: {
    products: false,
    cart: false,
    orders: false,
    appointments: false,
    auth: false,
    user: false
  },
  error: {
    products: null,
    cart: null,
    orders: null,
    appointments: null,
    auth: null,
    user: null
  }
};

// Reducer
const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case UI_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.value
        }
      };
    case UI_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.type]: action.payload.value
        }
      };
    case UI_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.type]: null
        }
      };
    default:
      return state;
  }
};

// Create context
export const UIContext = createContext<{
  loading: LoadingState;
  error: ErrorState;
  setLoading: (type: keyof LoadingState, value: boolean) => void;
  setError: (type: keyof ErrorState, value: string | null) => void;
  clearError: (type: keyof ErrorState) => void;
} | undefined>(undefined);

// Provider component
interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const setLoading = (type: keyof LoadingState, value: boolean) => {
    dispatch({ type: UI_ACTIONS.SET_LOADING, payload: { type, value } });
  };

  const setError = (type: keyof ErrorState, value: string | null) => {
    dispatch({ type: UI_ACTIONS.SET_ERROR, payload: { type, value } });
  };

  const clearError = (type: keyof ErrorState) => {
    dispatch({ type: UI_ACTIONS.CLEAR_ERROR, payload: { type } });
  };

  return (
    <UIContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        setLoading,
        setError,
        clearError
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};