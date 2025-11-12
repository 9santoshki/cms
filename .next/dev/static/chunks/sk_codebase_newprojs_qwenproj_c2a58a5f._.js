(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sk/codebase/newprojs/qwenproj/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API utility functions for making requests to our Next.js API routes
__turbopack_context__.s([
    "apiClient",
    ()=>apiClient
]);
class ApiClient {
    baseUrl;
    token;
    constructor(){
        this.baseUrl = ("TURBOPACK compile-time truthy", 1) ? '' : "TURBOPACK unreachable";
        this.token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
    }
    setToken(token) {
        this.token = token;
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && token) {
            localStorage.setItem('token', token);
        } else if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('token');
        }
    }
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}/api${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...this.token && {
                'Authorization': `Bearer ${this.token}`
            },
            ...options.headers
        };
        const config = {
            ...options,
            headers
        };
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`API request error to ${url}:`, error);
            return {
                success: false,
                error: 'Network error or server unavailable'
            };
        }
    }
    // Authentication
    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }
    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
    // Products
    async getProducts() {
        return this.request('/products');
    }
    async getProduct(id) {
        return this.request(`/products/${id}`);
    }
    // Cart
    async getCartItems() {
        return this.request('/cart');
    }
    async addToCart(product_id, quantity = 1) {
        return this.request('/cart', {
            method: 'POST',
            body: JSON.stringify({
                product_id,
                quantity
            })
        });
    }
    async updateCartItem(product_id, quantity) {
        return this.request('/cart', {
            method: 'PUT',
            body: JSON.stringify({
                product_id,
                quantity
            })
        });
    }
    async removeFromCart(product_id) {
        return this.request(`/cart/${product_id}`, {
            method: 'DELETE'
        });
    }
    async clearCart() {
        return this.request('/cart', {
            method: 'DELETE'
        });
    }
    // Orders
    async getOrders() {
        return this.request('/orders');
    }
    async createOrder(orderData) {
        return this.request('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }
}
const apiClient = new ApiClient();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useAppContext",
    ()=>useAppContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
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
                    products: false
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
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AppProvider = ({ children })=>{
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(appReducer, initialState);
    // Load user and token from localStorage on initial render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
        if (state.loading.products) return;
        setLoading('products', true);
        setError('products', null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].getProducts();
            if (response.success && response.data) {
                // Convert price strings to numbers for proper formatting
                const formattedProducts = response.data.map((product)=>({
                        ...product,
                        price: typeof product.price === 'number' ? product.price : parseFloat(product.price),
                        image_url: product.image_url || undefined,
                        imageClass: product.image_url ? undefined : product.imageClass || 'modern' // Only set imageClass if no image_url
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].getCartItems();
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].addToCart(product.id, quantity);
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].updateCartItem(productId, quantity);
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].removeFromCart(productId);
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].clearCart();
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].getOrders();
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].createOrder(orderData);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].login(credentials);
            if (response.success && response.data) {
                __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].setToken(response.data.token);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].register(userData);
            if (response.success && response.data) {
                __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].setToken(response.data.token);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].getOrders();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx",
        lineNumber: 578,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AppProvider, "s3jE+e7wLGXN/2uWqdAG2uRSMfA=");
_c = AppProvider;
const useAppContext = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
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
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=sk_codebase_newprojs_qwenproj_c2a58a5f._.js.map