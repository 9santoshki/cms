'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { apiClient } from '@/lib/api';

interface ProductState {
  products: any[];
  loading: boolean;
  error: string | null;
  appointments: any[];
  orders: any[];
}

interface ProductAction {
  type: string;
  payload?: any;
}

// Action types
const PRODUCT_ACTIONS = {
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_APPOINTMENTS: 'SET_APPOINTMENTS',
  SET_ORDERS: 'SET_ORDERS',
  ADD_ORDER: 'ADD_ORDER'
};

// Initial state
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  appointments: [],
  orders: []
};

// Reducer
const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case PRODUCT_ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case PRODUCT_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case PRODUCT_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case PRODUCT_ACTIONS.SET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload
      };
    case PRODUCT_ACTIONS.SET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case PRODUCT_ACTIONS.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    default:
      return state;
  }
};

// Create context
export const ProductContext = createContext<{
  products: any[];
  loading: boolean;
  error: string | null;
  appointments: any[];
  orders: any[];
  setProducts: (products: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAppointments: (appointments: any[]) => void;
  setOrders: (orders: any[]) => void;
  fetchProducts: () => Promise<void>;
} | undefined>(undefined);

// Provider component
interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Actions
  const setProducts = (products: any[]) => {
    dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCTS, payload: products });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error });
  };

  const setAppointments = (appointments: any[]) => {
    dispatch({ type: PRODUCT_ACTIONS.SET_APPOINTMENTS, payload: appointments });
  };

  const setOrders = (orders: any[]) => {
    dispatch({ type: PRODUCT_ACTIONS.SET_ORDERS, payload: orders });
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.getProducts();
      if (response.success && response.data) {
        // Handle the new response structure with pagination
        const productsData = Array.isArray(response.data) ? response.data : response.data?.products || [];

        // Convert price strings to numbers for proper formatting
        // Map mock image_url identifiers to appropriate imageClass values
        const mapImageIdentifierToClass = (identifier: string) => {
          if (!identifier) return 'modern';

          const lowerIdentifier = identifier.toLowerCase();
          if (lowerIdentifier.includes('modern') || lowerIdentifier.includes('coffee') || lowerIdentifier.includes('sofa')) {
            return 'modern';
          } else if (lowerIdentifier.includes('classic') || lowerIdentifier.includes('armchair')) {
            return 'classic';
          } else if (lowerIdentifier.includes('vintage') || lowerIdentifier.includes('lamp')) {
            return 'coastal'; // Using coastal for lighting items
          } else if (lowerIdentifier.includes('dining') || lowerIdentifier.includes('dresser')) {
            return 'office'; // Using office for furniture items
          } else if (lowerIdentifier.includes('wall') || lowerIdentifier.includes('art')) {
            return 'hotel'; // Using hotel for decor items
          } else if (lowerIdentifier.includes('rug')) {
            return 'restaurant'; // Using restaurant for decor items
          } else {
            return 'modern'; // default
          }
        };

        const formattedProducts = productsData.map((product: any) => ({
          ...product,
          price: typeof product.price === 'number' ? product.price : parseFloat(product.price),
          // Only set image_url to undefined if it's not a proper URL
          // If it looks like an actual URL (contains http), keep it
          image_url: product.image_url && (product.image_url.startsWith('http') || product.image_url.startsWith('/'))
            ? product.image_url
            : undefined,
          // Use the identifier to determine the appropriate CSS class
          imageClass: mapImageIdentifierToClass(product.image_url) || product.imageClass || 'modern'
        }));
        setProducts(formattedProducts);
      } else {
        console.warn('No products found:', response.error);
        // Even if no products are found, we should still set the products state 
        // and turn off loading to avoid the infinite loading state
        setProducts([]);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setError(error.message || 'Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        loading: state.loading,
        error: state.error,
        appointments: state.appointments,
        orders: state.orders,
        setProducts,
        setLoading,
        setError,
        setAppointments,
        setOrders,
        fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};