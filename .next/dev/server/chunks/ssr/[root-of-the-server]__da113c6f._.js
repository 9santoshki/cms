module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/sk/codebase/newprojs/qwenproj/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
        this.baseUrl = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : process.env.API_BASE_URL || '';
        this.token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    }
    setToken(token) {
        this.token = token;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
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
}),
"[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useAppContext",
    ()=>useAppContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/lib/api.ts [app-ssr] (ecmascript)");
'use client';
;
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
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AppProvider = ({ children })=>{
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(appReducer, initialState);
    // Load user and token from localStorage on initial render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, []);
    // Load cart from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, []);
    // Save cart to localStorage whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getProducts();
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getCartItems();
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].addToCart(product.id, quantity);
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].updateCartItem(productId, quantity);
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].removeFromCart(productId);
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].clearCart();
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getOrders();
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].createOrder(orderData);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].login(credentials);
            if (response.success && response.data) {
                __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].setToken(response.data.token);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].register(userData);
            if (response.success && response.data) {
                __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].setToken(response.data.token);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getOrders();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx",
        lineNumber: 578,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useAppContext = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__da113c6f._.js.map