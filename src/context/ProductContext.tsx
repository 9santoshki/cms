'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
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
        products: Array.isArray(action.payload) ? action.payload : []
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
        appointments: Array.isArray(action.payload) ? action.payload : []
      };
    case PRODUCT_ACTIONS.SET_ORDERS:
      return {
        ...state,
        orders: Array.isArray(action.payload) ? action.payload : []
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
  fetchOrders: () => Promise<void>;
  fetchAppointments: () => Promise<void>;
  createOrder: (orderData: any) => Promise<any>;
  createAppointment: (appointmentData: any) => Promise<any>;
  updateProduct: (id: number, data: any) => Promise<any>;
  deleteProduct: (id: number) => Promise<any>;
  createProduct: (productData: any) => Promise<any>;
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
        const productsData = Array.isArray(response.data) ? response.data : (response.data as any)?.products || [];

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
          // Preserve primary_image from API response (used for product gallery images)
          primary_image: product.primary_image || product.image_url,
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

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: null });
    try {
      const response = await apiClient.getOrders();
      if (response.success && response.data) {
        dispatch({ type: PRODUCT_ACTIONS.SET_ORDERS, payload: Array.isArray(response.data) ? response.data : [] });
      } else {
        dispatch({ type: PRODUCT_ACTIONS.SET_ORDERS, payload: [] });
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to load orders.' });
    } finally {
      dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Fetch appointments
  const fetchAppointments = useCallback(async () => {
    dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: null });
    try {
      const response = await apiClient.getAppointments();
      if (response.success && response.data) {
        dispatch({ type: PRODUCT_ACTIONS.SET_APPOINTMENTS, payload: Array.isArray(response.data) ? response.data : [] });
      } else {
        dispatch({ type: PRODUCT_ACTIONS.SET_APPOINTMENTS, payload: [] });
      }
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to load appointments.' });
    } finally {
      dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Create order
  const createOrder = useCallback(async (orderData: any) => {
    dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: null });
    try {
      const response = await apiClient.createOrder(orderData);
      if (response.success && response.data) {
        dispatch({ type: PRODUCT_ACTIONS.ADD_ORDER, payload: response.data });
        return response.data;
      }
      throw new Error(response.error || 'Failed to create order');
    } catch (error: any) {
      console.error('Error creating order:', error);
      dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to create order.' });
      throw error;
    } finally {
      dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Create appointment
  const createAppointment = useCallback(async (appointmentData: any) => {
    dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: null });
    try {
      const response = await apiClient.createAppointment(appointmentData);
      if (response.success && response.data) {
        dispatch({ type: PRODUCT_ACTIONS.SET_APPOINTMENTS, payload: [response.data, ...state.appointments] });
        return response.data;
      }
      throw new Error(response.error || 'Failed to create appointment');
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to create appointment.' });
      throw error;
    } finally {
      dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: false });
    }
  }, [state.appointments]);

  // Update product
  const updateProduct = useCallback(async (id: number, data: any) => {
    dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: null });
    try {
      const response = await apiClient.updateProduct(id, data);
      if (response.success && response.data) {
        dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCTS, payload: state.products.map(p => p.id === id ? response.data : p) });
        return response.data;
      }
      throw new Error(response.error || 'Failed to update product');
    } catch (error: any) {
      console.error('Error updating product:', error);
      dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to update product.' });
      throw error;
    } finally {
      dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: false });
    }
  }, [state.products]);

  // Delete product
  const deleteProduct = useCallback(async (id: number) => {
    dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: null });
    try {
      const response = await apiClient.deleteProduct(id);
      if (response.success) {
        dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCTS, payload: state.products.filter(p => p.id !== id) });
        return true;
      }
      throw new Error(response.error || 'Failed to delete product');
    } catch (error: any) {
      console.error('Error deleting product:', error);
      dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to delete product.' });
      throw error;
    } finally {
      dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: false });
    }
  }, [state.products]);

  // Create product
  const createProduct = useCallback(async (productData: any) => {
    dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: null });
    try {
      const response = await apiClient.createProduct(productData);
      if (response.success && response.data) {
        dispatch({ type: PRODUCT_ACTIONS.SET_PRODUCTS, payload: [response.data, ...state.products] });
        return response.data;
      }
      throw new Error(response.error || 'Failed to create product');
    } catch (error: any) {
      console.error('Error creating product:', error);
      dispatch({ type: PRODUCT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to create product.' });
      throw error;
    } finally {
      dispatch({ type: PRODUCT_ACTIONS.SET_LOADING, payload: false });
    }
  }, [state.products]);

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
        fetchProducts,
        fetchOrders,
        fetchAppointments,
        createOrder,
        createAppointment,
        updateProduct,
        deleteProduct,
        createProduct
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