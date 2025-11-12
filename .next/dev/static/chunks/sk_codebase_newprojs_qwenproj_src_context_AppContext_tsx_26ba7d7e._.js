(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { apiClient } from '@/lib/api';
// Initial state
const initialState = {
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
const appReducer = (state, action)=>{
    switch(action.type){
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
            const existingItem = state.cartItems.find((item)=>item.id === action.payload.id);
            let updatedCartItems;
            if (existingItem) {
                updatedCartItems = state.cartItems.map((item)=>item.id === action.payload.id ? {
                        ...item,
                        quantity: item.quantity + action.payload.quantity
                    } : item);
            } else {
                updatedCartItems = [
                    ...state.cartItems,
                    action.payload
                ];
            }
            return {
                ...state,
                cartItems: updatedCartItems
            };
        case ACTIONS.UPDATE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.map((item)=>item.id === action.payload.id ? {
                        ...item,
                        quantity: action.payload.quantity
                    } : item)
            };
        case ACTIONS.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item)=>item.id !== action.payload)
            };
        case ACTIONS.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            };
        case ACTIONS.ADD_ORDER:
            return {
                ...state,
                orders: [
                    action.payload,
                    ...state.orders
                ]
            };
        default:
            return state;
    }
};
// Create context
const AppContext = /*#__PURE__*/ createContext(undefined);
export const AppProvider = ({ children })=>{
    _s();
    const [state, dispatch] = useReducer(appReducer, initialState);
    // Load user and token from localStorage on initial render
    useEffect({
        "AppProvider.useEffect": ()=>{
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (token) {
                dispatch({
                    type: ACTIONS.SET_TOKEN,
                    payload: token
                });
            }
            if (user) {
                try {
                    const parsedUser = JSON.parse(user);
                    dispatch({
                        type: ACTIONS.SET_USER,
                        payload: parsedUser
                    });
                } catch (error) {
                    console.error('Error parsing user from localStorage:', error);
                    localStorage.removeItem('user');
                }
            }
        }
    }["AppProvider.useEffect"], []);
    // Load cart from localStorage
    useEffect({
        "AppProvider.useEffect": ()=>{
            const savedCart = localStorage.getItem('cartItems');
            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart);
                    dispatch({
                        type: ACTIONS.SET_CART_ITEMS,
                        payload: parsedCart
                    });
                } catch (error) {
                    console.error('Error parsing cart from localStorage:', error);
                    localStorage.removeItem('cartItems');
                }
            }
        }
    }["AppProvider.useEffect"], []);
    // Save cart to localStorage whenever it changes
    useEffect({
        "AppProvider.useEffect": ()=>{
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    }["AppProvider.useEffect"], [
        state.cartItems
    ]);
    // Actions
    const setUser = (user)=>{
        dispatch({
            type: ACTIONS.SET_USER,
            payload: user
        });
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    };
    const setToken = (token)=>{
        dispatch({
            type: ACTIONS.SET_TOKEN,
            payload: token
        });
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    };
    const setLoading = (type, value)=>{
        dispatch({
            type: ACTIONS.SET_LOADING,
            payload: {
                type,
                value
            }
        });
    };
    const setError = (type, value)=>{
        dispatch({
            type: ACTIONS.SET_ERROR,
            payload: {
                type,
                value
            }
        });
    };
    // Fetch products
    const fetchProducts = async ()=>{
        // Don't fetch if already loading to prevent race conditions
        if (loading.products) return;
        setLoading('products', true);
        setError('products', null);
        try {
            const response = await apiClient.getProducts();
            if (response.success && response.data) {
                // Convert price strings to numbers for proper formatting
                const formattedProducts = response.data.map((product)=>({
                        ...product,
                        price: typeof product.price === 'number' ? product.price : parseFloat(product.price),
                        $imageClass: product.image_url || 'modern'
                    }));
                dispatch({
                    type: ACTIONS.SET_PRODUCTS,
                    payload: formattedProducts
                });
            } else {
                throw new Error(response.error || 'Failed to load products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('products', error.message || 'Failed to load products. Please try again later.');
        } finally{
            setLoading('products', false);
        }
    };
    // Fetch cart items
    const fetchCartItems = async ()=>{
        if (!state.token) return;
        setLoading('cart', true);
        setError('cart', null);
        try {
            const response = await apiClient.getCartItems();
            if (response.success && response.data) {
                dispatch({
                    type: ACTIONS.SET_CART_ITEMS,
                    payload: response.data
                });
            } else {
                throw new Error(response.error || 'Failed to load cart items');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setError('cart', error.message || 'Failed to load cart items. Please try again later.');
        } finally{
            setLoading('cart', false);
        }
    };
    // Add item to cart
    const addToCart = async (product, quantity = 1)=>{
        if (state.token) {
            setLoading('cart', true);
            setError('cart', null);
            try {
                const response = await apiClient.addToCart(product.id, quantity);
                if (response.success && response.data) {
                    dispatch({
                        type: ACTIONS.ADD_TO_CART,
                        payload: response.data
                    });
                } else {
                    throw new Error(response.error || 'Failed to add item to cart');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
                setError('cart', error.message || 'Failed to add item to cart. Please try again.');
            } finally{
                setLoading('cart', false);
            }
        } else {
            dispatch({
                type: ACTIONS.ADD_TO_CART,
                payload: {
                    ...product,
                    quantity
                }
            });
        }
    };
    // Update cart item
    const updateCartItem = async (productId, quantity)=>{
        if (state.token) {
            setLoading('cart', true);
            setError('cart', null);
            try {
                const response = await apiClient.updateCartItem(productId, quantity);
                if (response.success && response.data) {
                    dispatch({
                        type: ACTIONS.UPDATE_CART_ITEM,
                        payload: response.data
                    });
                } else if (quantity <= 0 && response.success) {
                    // When quantity is 0, the item was removed
                    dispatch({
                        type: ACTIONS.REMOVE_FROM_CART,
                        payload: productId
                    });
                } else {
                    throw new Error(response.error || 'Failed to update cart item');
                }
            } catch (error) {
                console.error('Error updating cart item:', error);
                setError('cart', error.message || 'Failed to update cart item. Please try again.');
            } finally{
                setLoading('cart', false);
            }
        } else {
            if (quantity <= 0) {
                dispatch({
                    type: ACTIONS.REMOVE_FROM_CART,
                    payload: productId
                });
            } else {
                dispatch({
                    type: ACTIONS.UPDATE_CART_ITEM,
                    payload: {
                        id: productId,
                        quantity
                    }
                });
            }
        }
    };
    // Remove item from cart
    const removeFromCart = async (productId)=>{
        if (state.token) {
            setLoading('cart', true);
            setError('cart', null);
            try {
                const response = await apiClient.removeFromCart(productId);
                if (response.success) {
                    dispatch({
                        type: ACTIONS.REMOVE_FROM_CART,
                        payload: productId
                    });
                } else {
                    throw new Error(response.error || 'Failed to remove item from cart');
                }
            } catch (error) {
                console.error('Error removing from cart:', error);
                setError('cart', error.message || 'Failed to remove item from cart. Please try again.');
            } finally{
                setLoading('cart', false);
            }
        } else {
            dispatch({
                type: ACTIONS.REMOVE_FROM_CART,
                payload: productId
            });
        }
    };
    // Clear cart
    const clearCart = async ()=>{
        if (state.token) {
            setLoading('cart', true);
            setError('cart', null);
            try {
                const response = await apiClient.clearCart();
                if (response.success) {
                    dispatch({
                        type: ACTIONS.CLEAR_CART
                    });
                } else {
                    throw new Error(response.error || 'Failed to clear cart');
                }
            } catch (error) {
                console.error('Error clearing cart:', error);
                setError('cart', error.message || 'Failed to clear cart. Please try again.');
            } finally{
                setLoading('cart', false);
            }
        } else {
            dispatch({
                type: ACTIONS.CLEAR_CART
            });
        }
    };
    // Fetch orders
    const fetchOrders = async ()=>{
        if (!state.token) return;
        setLoading('orders', true);
        setError('orders', null);
        try {
            const response = await apiClient.getOrders();
            if (response.success && response.data) {
                dispatch({
                    type: ACTIONS.SET_ORDERS,
                    payload: response.data
                });
            } else {
                throw new Error(response.error || 'Failed to load orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('orders', error.message || 'Failed to load orders. Please try again later.');
        } finally{
            setLoading('orders', false);
        }
    };
    // Create order
    const createOrder = async (orderData)=>{
        if (!state.token) return;
        setLoading('orders', true);
        setError('orders', null);
        try {
            const response = await apiClient.createOrder(orderData);
            if (response.success && response.data) {
                dispatch({
                    type: ACTIONS.ADD_ORDER,
                    payload: response.data
                });
                dispatch({
                    type: ACTIONS.CLEAR_CART
                });
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to create order');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            // Handle validation errors from backend
            if (error.message && error.message.includes('Validation Error')) {
                setError('orders', 'Please check your order details and try again.');
            } else {
                setError('orders', error.message || 'Failed to create order. Please try again.');
            }
            throw error;
        } finally{
            setLoading('orders', false);
        }
    };
    // Login
    const login = async (credentials)=>{
        setLoading('auth', true);
        setError('auth', null);
        try {
            const response = await apiClient.login(credentials);
            if (response.success && response.data) {
                apiClient.setToken(response.data.token);
                setToken(response.data.token);
                setUser(response.data.user);
                return response.data;
            } else {
                throw new Error(response.error || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            // Handle specific error messages from backend
            if (error.message) {
                setError('auth', error.message);
            } else {
                setError('auth', 'Login failed. Please check your credentials.');
            }
            throw error;
        } finally{
            setLoading('auth', false);
        }
    };
    // Register
    const register = async (userData)=>{
        setLoading('auth', true);
        setError('auth', null);
        try {
            const response = await apiClient.register(userData);
            if (response.success && response.data) {
                apiClient.setToken(response.data.token);
                setToken(response.data.token);
                setUser(response.data.user);
                return response.data;
            } else {
                throw new Error(response.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            // Handle validation errors from backend
            if (error.message) {
                setError('auth', error.message);
            } else {
                setError('auth', 'Registration failed. Please try again.');
            }
            throw error;
        } finally{
            setLoading('auth', false);
        }
    };
    // Logout
    const logout = ()=>{
        setToken(null);
        setUser(null);
        dispatch({
            type: ACTIONS.CLEAR_CART
        });
        dispatch({
            type: ACTIONS.SET_ORDERS,
            payload: []
        });
    };
    // Verify token - we can use any authenticated endpoint to verify the token
    const verifyToken = async ()=>{
        if (!state.token) return false;
        try {
            // Using the getOrders endpoint as a way to verify the token
            const response = await apiClient.getOrders();
            if (response.success) {
                return true;
            } else {
                throw new Error('Token verification failed');
            }
        } catch (error) {
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
    return /*#__PURE__*/ _jsxDEV(AppContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx",
        lineNumber: 577,
        columnNumber: 5
    }, this);
};
_s(AppProvider, "s3jE+e7wLGXN/2uWqdAG2uRSMfA=");
_c = AppProvider;
// Custom hook to use the context
export const useAppContext = ()=>{
    _s1();
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
_s1(useAppContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=sk_codebase_newprojs_qwenproj_src_context_AppContext_tsx_26ba7d7e._.js.map