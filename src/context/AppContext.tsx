'use client';

import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { apiClient } from '@/lib/api';
import { User, Product, CartItem, Order, LoadingState, ErrorState, State } from '@/types';
import { getCurrentUser, onAuthStateChange, getUserProfile } from '@/lib/supabase/auth';

// Action types
interface Action {
  type: string;
  payload?: any;
}

// Initial state
const initialState: State = {
  user: null,
  token: null,
  products: [],
  cartItems: [],
  orders: [],
  appointments: [],
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

// Action types
const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_ORDERS: 'SET_ORDERS',
  SET_APPOINTMENTS: 'SET_APPOINTMENTS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  ADD_ORDER: 'ADD_ORDER'
};

// Reducer
const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    case ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case ACTIONS.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload
      };

    case ACTIONS.SET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };

    case ACTIONS.SET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.value
        },
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.type]: action.payload.value
        }
      };

    case ACTIONS.ADD_TO_CART:
      // The API response contains the final cart item with the updated quantity
      // So we should update the existing item or add a new one
      const existingItem = state.cartItems.find(item => item.product_id === action.payload.product_id);
      let updatedCartItems: CartItem[];

      if (existingItem) {
        // Replace the existing item with the updated one from the API response
        updatedCartItems = state.cartItems.map(item =>
          item.product_id === action.payload.product_id ? action.payload : item
        );
      } else {
        // Add the new item as returned by the API
        updatedCartItems = [...state.cartItems, action.payload];
      }

      return {
        ...state,
        cartItems: updatedCartItems
      };

    case ACTIONS.UPDATE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product_id !== action.payload)
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };

    case ACTIONS.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };

    default:
      return state;
  }
};

// Create context
export const AppContext = createContext<{
  // State
  user: User | null;
  token: string | null;
  products: Product[];
  cartItems: CartItem[];
  orders: Order[];
  appointments: any[];
  loading: LoadingState;
  error: ErrorState;
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (type: keyof LoadingState, value: boolean) => void;
  setError: (type: keyof ErrorState, value: string | null) => void;
  fetchProducts: () => Promise<void>;
  fetchCartItems: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateCartItem: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  createOrder: (orderData: any) => Promise<any>;
  login: (credentials: any) => Promise<any>;
  register: (userData: any) => Promise<any>;
  logout: () => void;
  verifyToken: () => Promise<boolean>;
  fetchUserProfile: () => Promise<any>;
  updateUserProfile: (profileData: any) => Promise<any>;
  createProduct: (productData: any) => Promise<any>;
  updateProduct: (id: number, productData: any) => Promise<any>;
  fetchProductBySlug: (slug: string) => Promise<Product>,
  searchProducts: (params: {
    q?: string;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) => Promise<any>;
  fetchAppointments: (filters?: {
    status?: string;
    date?: string;
    page?: number;
    limit?: number;
  }) => Promise<any>;
  createAppointment: (appointmentData: {
    appointment_date: string;
    notes?: string;
  }) => Promise<any>;
  updateAppointment: (id: string, updateData: {
    status?: string;
    notes?: string;
  }) => Promise<any>;
  addToCartWithAuth: (product: Product, quantity?: number) => {
    success: boolean;
    requiresLogin: boolean;
    product?: Product;
    quantity?: number;
    action?: () => Promise<void>;
  };
  clearPendingCartAction: () => void;
} | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const tempSavedCart = useRef<CartItem[] | null>(null);

  // DEBUG: Track initialization
  console.log('🔄 AppContext initializing...');

  // Load user from Supabase session on initial render
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount

    const initializeAuth = async () => {
      try {
        const supabaseUser = await getCurrentUser();

        if (isMounted && supabaseUser) {
          // Get user profile from the profiles table
          const userProfile = await getUserProfile();

          if (userProfile) {
            const userObject = {
              id: userProfile.id,
              name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
              email: supabaseUser.email,
              avatar: supabaseUser.user_metadata?.avatar || supabaseUser.user_metadata?.picture || null,
              role: userProfile.role,
              created_at: supabaseUser.created_at
            };

            if (isMounted) {
              dispatch({ type: ACTIONS.SET_USER, payload: userObject });
              localStorage.setItem('user', JSON.stringify(userObject));
              console.log('✅ User restored from Supabase session:', userObject);
            }
          } else {
            // Fallback: use session data directly if profile fetch fails
            const userObject = {
              id: supabaseUser.id,
              name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
              email: supabaseUser.email,
              avatar: supabaseUser.user_metadata?.avatar || supabaseUser.user_metadata?.picture || null,
              role: 'customer', // Default role if profile doesn't exist yet
              created_at: supabaseUser.created_at
            };

            if (isMounted) {
              dispatch({ type: ACTIONS.SET_USER, payload: userObject });
              localStorage.setItem('user', JSON.stringify(userObject));
              console.log('✅ User restored from Supabase session (fallback):', userObject);
            }
          }
        } else if (isMounted) {
          // No user in Supabase session, clear any local data
          localStorage.removeItem('user');
          console.log('❌ No user in Supabase session, cleared user data');
        }
      } catch (error) {
        console.error('Error initializing auth with Supabase:', error);
        if (isMounted) {
          localStorage.removeItem('user');
          dispatch({ type: ACTIONS.SET_USER, payload: null });
        }
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const unsubscribe = onAuthStateChange(async (event, session) => {
      console.log('🔍 Auth state changed:', event);

      if (isMounted && event === 'SIGNED_IN' && session?.user) {
        // Get user profile from the profiles table
        const userProfile = await getUserProfile();

        if (userProfile) {
          const userObject = {
            id: userProfile.id,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email,
            avatar: session.user.user_metadata?.avatar || session.user.user_metadata?.picture || null,
            role: userProfile.role,
            created_at: session.user.created_at
          };

          dispatch({ type: ACTIONS.SET_USER, payload: userObject });
          localStorage.setItem('user', JSON.stringify(userObject));
          console.log('✅ User set after sign in:', userObject);
        } else {
          // Fallback: use session data directly if profile fetch fails
          const userObject = {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email,
            avatar: session.user.user_metadata?.avatar || session.user.user_metadata?.picture || null,
            role: 'customer', // Default role if profile doesn't exist yet
            created_at: session.user.created_at
          };

          dispatch({ type: ACTIONS.SET_USER, payload: userObject });
          localStorage.setItem('user', JSON.stringify(userObject));
          console.log('✅ User set after sign in (fallback):', userObject);
        }
      } else if (isMounted && event === 'SIGNED_OUT') {
        localStorage.removeItem('user');
        localStorage.removeItem('cartItems');
        dispatch({ type: ACTIONS.SET_USER, payload: null });
        dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: [] });
        console.log('✅ User cleared after sign out');
      }
    });

    // Cleanup function
    return () => {
      isMounted = false;
      unsubscribe && unsubscribe();
    };
  }, []);

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!state.user) {
      // For guest users, always set cart to empty as requested
      dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: [] });
      // Sync Zustand cart with empty array
      useCartStore.getState().clearCart();
      return;
    }

    setLoading('cart', true);
    setError('cart', null);

    try {
      const response = await apiClient.getCartItems();
      if (response.success && response.data) {
        dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: response.data });
        // Sync Zustand cart with fetched data
        useCartStore.getState().clearCart();
        response.data.forEach(item => {
          useCartStore.getState().addItem(item);
        });
      } else {
        // Don't throw an error for empty cart, just log and handle gracefully
        console.warn('No cart items found for user:', response.error);
        dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: [] });
        // Sync Zustand cart with empty array
        useCartStore.getState().clearCart();
      }
    } catch (error: any) {
      // Handle network errors, etc.
      console.error('Error fetching cart items:', error);
      setError('cart', error.message || 'Failed to load cart items. Please try again later.');
      // Still set empty cart to avoid breaking the UI
      dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: [] });
      // Sync Zustand cart with empty array
      useCartStore.getState().clearCart();
    } finally {
      setLoading('cart', false);
    }
  };

  // Load cart from localStorage based on login state
  useEffect(() => {
    if (!state.user) {
      // User is not logged in, set cart to empty to ensure it appears empty in the UI
      dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: [] });
    } else {
      // User is logged in, fetch their cart from the server
      fetchCartItems();
    }
  }, [state.user]); // Re-run when user changes

  // Sync Zustand cart with AppContext cart
  useEffect(() => {
    // Initialize Zustand cart from AppContext
    const { items } = useCartStore.getState();
    if (items.length === 0 && state.cartItems.length > 0) {
      // If Zustand store is empty but AppContext has items, populate Zustand
      state.cartItems.forEach(item => {
        useCartStore.getState().addItem(item);
      });
    } else if (items.length > 0 && state.cartItems.length === 0) {
      // If Zustand has items but AppContext is empty, populate AppContext
      dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: items });
    }
  }, [state.cartItems]);

  // Save cart to localStorage only when not logged in
  useEffect(() => {
    // Only save guest cart to localStorage if not logged in
    if (!state.user) {
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  }, [state.cartItems, state.user]);

  // Actions
  const setUser = (user: User | null) => {
    dispatch({ type: ACTIONS.SET_USER, payload: user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };

  const setToken = (token: string | null) => {
    dispatch({ type: ACTIONS.SET_TOKEN, payload: token });
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  const setLoading = (type: keyof LoadingState, value: boolean) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: { type, value } });
  };

  const setError = (type: keyof ErrorState, value: string | null) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: { type, value } });
  };

  // Fetch products
  const fetchProducts = async () => {
    // Don't fetch if already loading to prevent race conditions
    if (state.loading.products) return;

    setLoading('products', true);
    setError('products', null);

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
        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: formattedProducts });
      } else {
        throw new Error(response.error || 'Failed to load products');
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setError('products', error.message || 'Failed to load products. Please try again later.');
    } finally {
      setLoading('products', false);
    }
  };

  // Add item to cart
  // Track ongoing cart requests to prevent duplicates
  const ongoingCartRequests = new Set<number>(); // Set to track product IDs with ongoing requests

  const addToCart = async (product: Product, quantity = 1) => {
    // Prevent multiple requests for the same product
    if (ongoingCartRequests.has(product.id)) {
      return; // Skip if already processing a request for this product
    }

    if (state.user) {
      ongoingCartRequests.add(product.id); // Mark this product as having an ongoing request
      setLoading('cart', true);
      setError('cart', null);

      try {
        const response = await apiClient.addToCart(product.id, quantity);
        if (response.success && response.data) {
          dispatch({ type: ACTIONS.ADD_TO_CART, payload: response.data });
          // Sync with Zustand store
          useCartStore.getState().addItem(response.data);
        } else {
          throw new Error(response.error || 'Failed to add item to cart');
        }
      } catch (error: any) {
        console.error('Error adding to cart:', error);
        setError('cart', error.message || 'Failed to add item to cart. Please try again.');
      } finally {
        ongoingCartRequests.delete(product.id); // Remove the tracking
        setLoading('cart', false);
      }
    } else {
      // For non-authenticated users, add to Zustand cart directly
      const cartItem = {
        id: Date.now(), // Temporary ID
        product_id: product.id,
        quantity,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      };
      
      useCartStore.getState().addItem(cartItem);
    }
  };

  // Update cart item
  const updateCartItem = async (productId: number, quantity: number) => {
    // Only proceed if product ID is valid
    if (!productId || typeof productId !== 'number' || productId <= 0) {
      console.error('Invalid product ID provided to updateCartItem:', productId);
      return;
    }

    if (state.user) {
      setLoading('cart', true);
      setError('cart', null);

      try {
        const response = await apiClient.updateCartItem(productId, quantity);
        if (response.success && response.data) {
          // Use ADD_TO_CART action to properly handle the full cart item data from API
          // This will add a new item or update an existing one with the full API response data
          dispatch({ type: ACTIONS.ADD_TO_CART, payload: response.data });
          // Sync with Zustand store
          useCartStore.getState().updateItem(productId, quantity);
        } else if (quantity <= 0 && response.success) {
          // When quantity is 0, the item was removed
          dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
          // Sync with Zustand store
          useCartStore.getState().removeItem(productId);
        } else {
          throw new Error(response.error || 'Failed to update cart item');
        }
      } catch (error: any) {
        console.error('Error updating cart item:', error);
        setError('cart', error.message || 'Failed to update cart item. Please try again.');
      } finally {
        setLoading('cart', false);
      }
    } else {
      if (quantity <= 0) {
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
        // Sync with Zustand store
        useCartStore.getState().removeItem(productId);
      } else {
        dispatch({ type: ACTIONS.UPDATE_CART_ITEM, payload: { product_id: productId, quantity } });
        // Sync with Zustand store
        useCartStore.getState().updateItem(productId, quantity);
      }

      // Update localStorage for guest cart
      const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingItemIndex = currentCart.findIndex((item: any) => item.product_id === productId);

      if (existingItemIndex !== -1) {
        if (quantity <= 0) {
          // Remove item from localStorage
          currentCart.splice(existingItemIndex, 1);
        } else {
          // Update quantity in localStorage
          currentCart[existingItemIndex].quantity = quantity;
        }
      } else if (quantity > 0) {
        // Find the product to get its details and add to localStorage
        const product = state.products.find(p => p.id === productId);
        if (product) {
          currentCart.push({
            id: product.id,
            product_id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image_url: product.image_url,
            user_id: null
          });
        }
      }

      localStorage.setItem('cartItems', JSON.stringify(currentCart));
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId: number) => {
    // Only proceed if product ID is valid
    if (!productId || typeof productId !== 'number' || productId <= 0) {
      console.error('Invalid product ID provided to removeFromCart:', productId);
      return;
    }

    if (state.user) {
      setLoading('cart', true);
      setError('cart', null);

      try {
        const response = await apiClient.removeFromCart(productId);
        if (response.success) {
          dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
          // Sync with Zustand store
          useCartStore.getState().removeItem(productId);
        } else {
          throw new Error(response.error || 'Failed to remove item from cart');
        }
      } catch (error: any) {
        console.error('Error removing from cart:', error);
        setError('cart', error.message || 'Failed to remove item from cart. Please try again.');
      } finally {
        setLoading('cart', false);
      }
    } else {
      dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
      // Sync with Zustand store
      useCartStore.getState().removeItem(productId);

      // Update localStorage for guest cart
      const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const updatedCart = currentCart.filter((item: any) => item.product_id !== productId);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (state.user) {
      setLoading('cart', true);
      setError('cart', null);

      try {
        const response = await apiClient.clearCart();
        if (response.success) {
          dispatch({ type: ACTIONS.CLEAR_CART });
          // Sync with Zustand store
          useCartStore.getState().clearCart();
        } else {
          throw new Error(response.error || 'Failed to clear cart');
        }
      } catch (error: any) {
        console.error('Error clearing cart:', error);
        setError('cart', error.message || 'Failed to clear cart. Please try again.');
      } finally {
        setLoading('cart', false);
      }
    } else {
      dispatch({ type: ACTIONS.CLEAR_CART });
      // Sync with Zustand store
      useCartStore.getState().clearCart();
      // Clear localStorage for guest cart
      localStorage.removeItem('cartItems');
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    if (!state.user) return;

    setLoading('orders', true);
    setError('orders', null);

    try {
      const response = await apiClient.getOrders();
      if (response.success && response.data) {
        dispatch({ type: ACTIONS.SET_ORDERS, payload: response.data });
      } else {
        throw new Error(response.error || 'Failed to load orders');
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      setError('orders', error.message || 'Failed to load orders. Please try again later.');
    } finally {
      setLoading('orders', false);
    }
  };

  // Create order
  const createOrder = async (orderData: any) => {
    if (!state.user) return;

    setLoading('orders', true);
    setError('orders', null);

    try {
      const response = await apiClient.createOrder(orderData);
      if (response.success && response.data) {
        dispatch({ type: ACTIONS.ADD_ORDER, payload: response.data });
        dispatch({ type: ACTIONS.CLEAR_CART });
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to create order');
      }
    } catch (error: any) {
      console.error('Error creating order:', error);

      // Handle validation errors from backend
      if (error.message && error.message.includes('Validation Error')) {
        setError('orders', 'Please check your order details and try again.');
      } else {
        setError('orders', error.message || 'Failed to create order. Please try again.');
      }

      throw error;
    } finally {
      setLoading('orders', false);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!state.user) return;

    setLoading('user', true);
    setError('user', null);

    try {
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${state.token}` // This might need to be updated for Supabase
        }
      });

      const result = await response.json();
      if (result.success && result.data) {
        // Always update user in context with the latest data from the API
        setUser(result.data);
        return result.data;
      } else {
        // If API call fails, and we have existing user data, return that.
        // Otherwise, throw an error.
        if (state.user) {
          return state.user;
        } else {
          throw new Error(result.error || 'Failed to fetch user profile');
        }
      }
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      // If an error occurs and we have existing user data, return that.
      // Otherwise, set an error.
      if (state.user) {
        return state.user;
      }
      setError('user', error.message || 'Failed to fetch user profile. Please try again later.');
      throw error; // Re-throw to propagate the error for handling in components
    } finally {
      setLoading('user', false);
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData: any) => {
    if (!state.user) return;

    setLoading('user', true);
    setError('user', null);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}` // This might need to be updated for Supabase
        },
        body: JSON.stringify(profileData)
      });

      const result = await response.json();
      if (result.success && result.data) {
        // Update user in context
        setUser(result.data);
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError('user', error.message || 'Failed to update profile. Please try again.');
      throw error;
    } finally {
      setLoading('user', false);
    }
  };

  // Login - This should be removed since we're using Google OAuth exclusively
  const login = async (credentials: any) => {
    throw new Error('Email/password login is not supported. Please use Google OAuth.');
  };

  // Register - This should be removed since we're using Google OAuth exclusively
  const register = async (userData: any) => {
    throw new Error('Email/password registration is not supported. Please use Google OAuth.');
  };

  // Logout
  const logout = () => {
    // Store the current cart in temp ref for potential restoration on login
    tempSavedCart.current = [...state.cartItems];

    // Clear cart items from localStorage to ensure cart appears empty after logout
    localStorage.removeItem('cartItems');

    setUser(null);
    setToken(null);
    dispatch({ type: ACTIONS.CLEAR_CART });
    dispatch({ type: ACTIONS.SET_ORDERS, payload: [] });
  };

  // Create product
  const createProduct = async (productData: any) => {
    if (!state.user) return;

    setLoading('products', true);
    setError('products', null);

    try {
      const response = await apiClient.createProduct(productData);
      if (response.success && response.data) {
        // Update products list to include the new product
        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: [...state.products, response.data] });
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to create product');
      }
    } catch (error: any) {
      console.error('Error creating product:', error);
      setError('products', error.message || 'Failed to create product. Please try again.');
      throw error;
    } finally {
      setLoading('products', false);
    }
  };

  // Update product
  const updateProduct = async (id: number, productData: any) => {
    if (!state.user) return;

    setLoading('products', true);
    setError('products', null);

    try {
      const response = await apiClient.updateProduct(id, productData);
      if (response.success && response.data) {
        // Update products list to reflect the changes
        const updatedProducts = state.products.map(product =>
          product.id === id ? response.data : product
        );
        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: updatedProducts });
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update product');
      }
    } catch (error: any) {
      console.error('Error updating product:', error);
      setError('products', error.message || 'Failed to update product. Please try again.');
      throw error;
    } finally {
      setLoading('products', false);
    }
  };

  // Fetch specific product by slug
  const fetchProductBySlug = async (slug: string): Promise<Product> => {
    setLoading('products', true);
    setError('products', null);

    try {
      const response = await apiClient.getProductBySlug(slug);
      if (response.success && response.data) {
        // Ensure slug is present in the returned product
        const productData: Product = {
          ...response.data,
          slug: response.data.slug || slug
        };

        // Add the fetched product to the products list
        const updatedProducts = [...state.products];
        const existingIndex = updatedProducts.findIndex(p => p.id === productData.id);

        if (existingIndex !== -1) {
          // Update existing product
          updatedProducts[existingIndex] = productData;
        } else {
          // Add new product
          updatedProducts.push(productData);
        }

        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: updatedProducts });
        return productData;
      } else {
        throw new Error(response.error || 'Failed to fetch product');
      }
    } catch (error: any) {
      console.error('Error fetching product by slug:', error);
      setError('products', error.message || 'Failed to fetch product. Please try again.');
      throw error;
    } finally {
      setLoading('products', false);
    }
  };

  // Search products
  const searchProducts = async (params: {
    q?: string;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) => {
    setLoading('products', true);
    setError('products', null);

    try {
      const response = await apiClient.searchProducts(params);
      if (response.success && response.data) {
        // Handle both response formats (old direct array and new with pagination object)
        const productsData = Array.isArray(response.data) ? response.data : response.data?.products || [];
        
        // Map imageClass to products
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
          image_url: product.image_url && (product.image_url.startsWith('http') || product.image_url.startsWith('/'))
            ? product.image_url
            : undefined,
          imageClass: mapImageIdentifierToClass(product.image_url) || product.imageClass || 'modern'
        }));

        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: formattedProducts });
        
        // Return pagination data if it exists
        if (response.data.pagination) {
          return {
            products: formattedProducts,
            pagination: response.data.pagination,
            filters: response.data.filters
          };
        } else {
          return formattedProducts;
        }
      } else {
        throw new Error(response.error || 'Failed to search products');
      }
    } catch (error: any) {
      console.error('Error searching products:', error);
      setError('products', error.message || 'Failed to search products. Please try again.');
      throw error;
    } finally {
      setLoading('products', false);
    }
  };

  // Verify token - we can use any authenticated endpoint to verify the token
  const verifyToken = async () => {
    if (!state.user) return false;

    try {
      // Using the getOrders endpoint as a way to verify the token
      const response = await apiClient.getOrders();
      if (response.success) {
        return true;
      } else {
        throw new Error('Token verification failed');
      }
    } catch (error: any) {
      console.error('Token verification failed:', error);
      logout();
      return false;
    }
  };

  // Fetch appointments
  const fetchAppointments = async (filters?: {
    status?: string;
    date?: string;
    page?: number;
    limit?: number;
  }) => {
    if (!state.user) return;

    setLoading('appointments', true);
    setError('appointments', null);

    try {
      const response = await apiClient.getAppointments(filters);
      if (response.success && response.data) {
        dispatch({ type: ACTIONS.SET_APPOINTMENTS, payload: response.data.appointments });
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to fetch appointments');
      }
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      setError('appointments', error.message || 'Failed to fetch appointments. Please try again.');
      throw error;
    } finally {
      setLoading('appointments', false);
    }
  };

  // Create appointment
  const createAppointment = async (appointmentData: {
    appointment_date: string;
    notes?: string;
  }) => {
    if (!state.user) return;

    try {
      const response = await apiClient.createAppointment(appointmentData);
      if (response.success && response.data) {
        // Refresh appointments list after creating new one
        await fetchAppointments();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to create appointment');
      }
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  };

  // Update appointment
  const updateAppointment = async (id: string, updateData: {
    status?: string;
    notes?: string;
  }) => {
    if (!state.user) return;

    try {
      const response = await apiClient.updateAppointment(id, updateData);
      if (response.success && response.data) {
        // Refresh appointments list after updating
        await fetchAppointments();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update appointment');
      }
    } catch (error: any) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  };

  // Clear pending cart action
  const clearPendingCartAction = () => {
    localStorage.removeItem('pendingCartAction');
  };

  // Add item to cart or request login if guest
  const addToCartWithAuth = (product: Product, quantity = 1) => {
    if (state.user) {
      // User is logged in, return success and the cart action to be performed
      return { success: true, requiresLogin: false, product, quantity, action: () => addToCart(product, quantity) };
    } else {
      // User is not logged in, indicate they need to log in
      return { success: false, requiresLogin: true, product, quantity };
    }
  };

  const value = {
    ...state,
    setUser,
    setToken,
    setLoading,
    setError,
    fetchProducts,
    fetchCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchOrders,
    createOrder,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    login,
    register,
    logout,
    verifyToken,
    fetchUserProfile,
    updateUserProfile,
    createProduct,
    updateProduct,
    fetchProductBySlug,
    searchProducts,
    addToCartWithAuth,
    clearPendingCartAction
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};