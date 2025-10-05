import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { productsAPI, authAPI, cartAPI, ordersAPI } from '../utils/api';
import { User, Product, CartItem, Order, LoadingState, ErrorState, State } from '../types';

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
  loading: {
    products: false,
    cart: false,
    orders: false,
    auth: false
  },
  error: {
    products: null,
    cart: null,
    orders: null,
    auth: null
  }
};

// Action types
const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_ORDERS: 'SET_ORDERS',
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
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.value
        }
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
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      let updatedCartItems: CartItem[];
      
      if (existingItem) {
        updatedCartItems = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
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
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
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
const AppContext = createContext<{ 
  // State
  user: User | null;
  token: string | null;
  products: Product[];
  cartItems: CartItem[];
  orders: Order[];
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
} | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load user and token from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token) {
      dispatch({ type: ACTIONS.SET_TOKEN, payload: token });
    }
    
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({ type: ACTIONS.SET_USER, payload: parsedUser });
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: parsedCart });
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cartItems');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);
  
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
    setLoading('products', true);
    setError('products', null);
    
    try {
      const data = await productsAPI.getAll();
      // Convert price strings to numbers for proper formatting
      const formattedProducts = data.map((product: any) => ({
        ...product,
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
        imageClass: product.image_url || 'modern'
      }));
      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: formattedProducts });
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setError('products', 'Failed to load products. Please try again later.');
    } finally {
      setLoading('products', false);
    }
  };
  
  // Fetch cart items
  const fetchCartItems = async () => {
    if (!state.token) return;
    
    setLoading('cart', true);
    setError('cart', null);
    
    try {
      const data = await cartAPI.getItems(state.token);
      dispatch({ type: ACTIONS.SET_CART_ITEMS, payload: data });
    } catch (error: any) {
      console.error('Error fetching cart items:', error);
      setError('cart', 'Failed to load cart items. Please try again later.');
    } finally {
      setLoading('cart', false);
    }
  };
  
  // Add item to cart
  const addToCart = async (product: Product, quantity = 1) => {
    if (state.token) {
      setLoading('cart', true);
      setError('cart', null);
      
      try {
        await cartAPI.addItem(product.id, quantity, state.token);
        dispatch({ type: ACTIONS.ADD_TO_CART, payload: { ...product, quantity } });
      } catch (error: any) {
        console.error('Error adding to cart:', error);
        setError('cart', 'Failed to add item to cart. Please try again.');
      } finally {
        setLoading('cart', false);
      }
    } else {
      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { ...product, quantity } });
    }
  };
  
  // Update cart item
  const updateCartItem = async (productId: number, quantity: number) => {
    if (state.token) {
      setLoading('cart', true);
      setError('cart', null);
      
      try {
        if (quantity <= 0) {
          await cartAPI.removeItem(productId, state.token);
          dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
        } else {
          await cartAPI.updateItem(productId, quantity, state.token);
          dispatch({ type: ACTIONS.UPDATE_CART_ITEM, payload: { id: productId, quantity } });
        }
      } catch (error: any) {
        console.error('Error updating cart item:', error);
        setError('cart', 'Failed to update cart item. Please try again.');
      } finally {
        setLoading('cart', false);
      }
    } else {
      if (quantity <= 0) {
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
      } else {
        dispatch({ type: ACTIONS.UPDATE_CART_ITEM, payload: { id: productId, quantity } });
      }
    }
  };
  
  // Remove item from cart
  const removeFromCart = async (productId: number) => {
    if (state.token) {
      setLoading('cart', true);
      setError('cart', null);
      
      try {
        await cartAPI.removeItem(productId, state.token);
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
      } catch (error: any) {
        console.error('Error removing from cart:', error);
        setError('cart', 'Failed to remove item from cart. Please try again.');
      } finally {
        setLoading('cart', false);
      }
    } else {
      dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
    }
  };
  
  // Clear cart
  const clearCart = async () => {
    if (state.token) {
      setLoading('cart', true);
      setError('cart', null);
      
      try {
        await cartAPI.clear(state.token);
        dispatch({ type: ACTIONS.CLEAR_CART });
      } catch (error: any) {
        console.error('Error clearing cart:', error);
        setError('cart', 'Failed to clear cart. Please try again.');
      } finally {
        setLoading('cart', false);
      }
    } else {
      dispatch({ type: ACTIONS.CLEAR_CART });
    }
  };
  
  // Fetch orders
  const fetchOrders = async () => {
    if (!state.token) return;
    
    setLoading('orders', true);
    setError('orders', null);
    
    try {
      const data = await ordersAPI.getAll(state.token);
      dispatch({ type: ACTIONS.SET_ORDERS, payload: data });
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      setError('orders', 'Failed to load orders. Please try again later.');
    } finally {
      setLoading('orders', false);
    }
  };
  
  // Create order
  const createOrder = async (orderData: any) => {
    if (!state.token) return;
    
    setLoading('orders', true);
    setError('orders', null);
    
    try {
      const data = await ordersAPI.create(orderData, state.token);
      dispatch({ type: ACTIONS.ADD_ORDER, payload: data });
      dispatch({ type: ACTIONS.CLEAR_CART });
      return data;
    } catch (error: any) {
      console.error('Error creating order:', error);
      
      // Handle validation errors from backend
      if (error.message && error.message.includes('Validation Error')) {
        setError('orders', 'Please check your order details and try again.');
      } else {
        setError('orders', 'Failed to create order. Please try again.');
      }
      
      throw error;
    } finally {
      setLoading('orders', false);
    }
  };
  
  // Login
  const login = async (credentials: any) => {
    setLoading('auth', true);
    setError('auth', null);
    
    try {
      const response = await authAPI.login(credentials);
      setToken(response.token);
      setUser(response.user);
      return response;
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error messages from backend
      if (error.message) {
        setError('auth', error.message);
      } else {
        setError('auth', 'Login failed. Please check your credentials.');
      }
      
      throw error;
    } finally {
      setLoading('auth', false);
    }
  };
  
  // Register
  const register = async (userData: any) => {
    setLoading('auth', true);
    setError('auth', null);
    
    try {
      const response = await authAPI.register(userData);
      setToken(response.token);
      setUser(response.user);
      return response;
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle validation errors from backend
      if (error.message) {
        setError('auth', error.message);
      } else {
        setError('auth', 'Registration failed. Please try again.');
      }
      
      throw error;
    } finally {
      setLoading('auth', false);
    }
  };
  
  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    dispatch({ type: ACTIONS.CLEAR_CART });
    dispatch({ type: ACTIONS.SET_ORDERS, payload: [] });
  };
  
  // Verify token
  const verifyToken = async () => {
    if (!state.token) return false;
    
    try {
      await authAPI.getProfile(state.token);
      return true;
    } catch (error: any) {
      console.error('Token verification failed:', error);
      logout();
      return false;
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
    login,
    register,
    logout,
    verifyToken
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