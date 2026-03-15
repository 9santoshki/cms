'use client';

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { Product, Order, Appointment } from '@/types';
import { apiClient } from '@/lib/api';
import { toErrorMessage } from '@/lib/error-utils';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  appointments: Appointment[];
  orders: Order[];
}

type ProductAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_APPOINTMENTS'; payload: Appointment[] }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order };

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  appointments: [],
  orders: [],
};

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: Array.isArray(action.payload) ? action.payload : [] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: Array.isArray(action.payload) ? action.payload : [] };
    case 'SET_ORDERS':
      return { ...state, orders: Array.isArray(action.payload) ? action.payload : [] };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    default:
      return state;
  }
};

interface ProductContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
  appointments: Appointment[];
  orders: Order[];
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAppointments: (appointments: Appointment[]) => void;
  setOrders: (orders: Order[]) => void;
  fetchProducts: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchAppointments: () => Promise<void>;
  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  createAppointment: (appointmentData: Partial<Appointment>) => Promise<Appointment>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: number) => Promise<boolean>;
  createProduct: (productData: Partial<Product>) => Promise<Product>;
}

export const ProductContext = createContext<ProductContextValue | undefined>(undefined);

interface ProductProviderProps {
  children: React.ReactNode;
}

/** Extracts a CSS class hint from a product image URL for legacy display purposes. */
function mapImageIdentifierToClass(identifier: string): string {
  if (!identifier) return 'modern';
  const lower = identifier.toLowerCase();
  if (lower.includes('modern') || lower.includes('coffee') || lower.includes('sofa')) return 'modern';
  if (lower.includes('classic') || lower.includes('armchair')) return 'classic';
  if (lower.includes('vintage') || lower.includes('lamp')) return 'coastal';
  if (lower.includes('dining') || lower.includes('dresser')) return 'office';
  if (lower.includes('wall') || lower.includes('art')) return 'hotel';
  if (lower.includes('rug')) return 'restaurant';
  return 'modern';
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const setProducts = useCallback((products: Product[]) => {
    dispatch({ type: 'SET_PRODUCTS', payload: products });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const setAppointments = useCallback((appointments: Appointment[]) => {
    dispatch({ type: 'SET_APPOINTMENTS', payload: appointments });
  }, []);

  const setOrders = useCallback((orders: Order[]) => {
    dispatch({ type: 'SET_ORDERS', payload: orders });
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.getProducts();
      if (response.success && response.data) {
        const productsData: unknown[] = Array.isArray(response.data)
          ? response.data
          : ((response.data as { products?: unknown[] })?.products ?? []);

        const formattedProducts: Product[] = (productsData as Product[]).map((product) => ({
          ...product,
          price: typeof product.price === 'number' ? product.price : parseFloat(String(product.price)),
          image_url:
            product.image_url &&
            (product.image_url.startsWith('http') || product.image_url.startsWith('/'))
              ? product.image_url
              : undefined,
          primary_image: product.primary_image || product.image_url,
          imageClass: mapImageIdentifierToClass(product.image_url ?? '') || 'modern',
        }));
        setProducts(formattedProducts);
      } else {
        setProducts([]);
      }
    } catch (err: unknown) {
      setError(toErrorMessage(err) || 'Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setProducts]);

  const fetchOrders = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const response = await apiClient.getOrders();
      if (response.success && response.data) {
        dispatch({
          type: 'SET_ORDERS',
          payload: Array.isArray(response.data) ? (response.data as Order[]) : [],
        });
      } else {
        dispatch({ type: 'SET_ORDERS', payload: [] });
      }
    } catch (err: unknown) {
      dispatch({ type: 'SET_ERROR', payload: toErrorMessage(err) || 'Failed to load orders.' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const response = await apiClient.getAppointments();
      if (response.success && response.data) {
        const raw = response.data as unknown;
        const data = (raw as { appointments?: Appointment[] })?.appointments ?? (raw as Appointment[]);
        dispatch({ type: 'SET_APPOINTMENTS', payload: Array.isArray(data) ? data : [] });
      } else {
        dispatch({ type: 'SET_APPOINTMENTS', payload: [] });
      }
    } catch (err: unknown) {
      dispatch({ type: 'SET_ERROR', payload: toErrorMessage(err) || 'Failed to load appointments.' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const createOrder = useCallback(async (orderData: Partial<Order>): Promise<Order> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const response = await apiClient.createOrder(orderData);
      if (response.success && response.data) {
        dispatch({ type: 'ADD_ORDER', payload: response.data as Order });
        return response.data as Order;
      }
      throw new Error(response.error || 'Failed to create order');
    } catch (err: unknown) {
      dispatch({ type: 'SET_ERROR', payload: toErrorMessage(err) || 'Failed to create order.' });
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const createAppointment = useCallback(async (appointmentData: Partial<Appointment>): Promise<Appointment> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const response = await apiClient.createAppointment(appointmentData as { appointment_date: string; notes?: string });
      if (response.success && response.data) {
        dispatch({
          type: 'SET_APPOINTMENTS',
          payload: [response.data as Appointment, ...state.appointments],
        });
        return response.data as Appointment;
      }
      throw new Error(response.error || 'Failed to create appointment');
    } catch (err: unknown) {
      dispatch({ type: 'SET_ERROR', payload: toErrorMessage(err) || 'Failed to create appointment.' });
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.appointments]);

  const updateProduct = useCallback(async (id: number, data: Partial<Product>): Promise<Product> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const response = await apiClient.updateProduct(id, data as { name: string; description: string; price: number });
      if (response.success && response.data) {
        dispatch({
          type: 'SET_PRODUCTS',
          payload: state.products.map((p) => (p.id === id ? (response.data as Product) : p)),
        });
        return response.data as Product;
      }
      throw new Error(response.error || 'Failed to update product');
    } catch (err: unknown) {
      dispatch({ type: 'SET_ERROR', payload: toErrorMessage(err) || 'Failed to update product.' });
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.products]);

  const deleteProduct = useCallback(async (id: number): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const response = await apiClient.deleteProduct(id);
      if (response.success) {
        dispatch({ type: 'SET_PRODUCTS', payload: state.products.filter((p) => p.id !== id) });
        return true;
      }
      throw new Error(response.error || 'Failed to delete product');
    } catch (err: unknown) {
      dispatch({ type: 'SET_ERROR', payload: toErrorMessage(err) || 'Failed to delete product.' });
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.products]);

  const createProduct = useCallback(async (productData: Partial<Product>): Promise<Product> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const response = await apiClient.createProduct(productData as { name: string; description: string; price: number });
      if (response.success && response.data) {
        dispatch({
          type: 'SET_PRODUCTS',
          payload: [response.data as Product, ...state.products],
        });
        return response.data as Product;
      }
      throw new Error(response.error || 'Failed to create product');
    } catch (err: unknown) {
      dispatch({ type: 'SET_ERROR', payload: toErrorMessage(err) || 'Failed to create product.' });
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.products]);

  const value = useMemo<ProductContextValue>(
    () => ({
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
      createProduct,
    }),
    [
      state,
      setProducts, setLoading, setError, setAppointments, setOrders,
      fetchProducts, fetchOrders, fetchAppointments,
      createOrder, createAppointment, updateProduct, deleteProduct, createProduct,
    ]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct(): ProductContextValue {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}
