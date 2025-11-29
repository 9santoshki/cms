module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/context/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthContext",
    ()=>AuthContext,
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
// Action types
const AUTH_ACTIONS = {
    SET_USER: 'SET_USER',
    SET_TOKEN: 'SET_TOKEN',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    LOGOUT: 'LOGOUT'
};
// Initial state
const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
};
// Reducer
const authReducer = (state, action)=>{
    switch(action.type){
        case AUTH_ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case AUTH_ACTIONS.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case AUTH_ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case AUTH_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                token: null
            };
        default:
            return state;
    }
};
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(authReducer, initialState);
    const setUser = (user)=>{
        dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: user
        });
    };
    const setToken = (token)=>{
        dispatch({
            type: AUTH_ACTIONS.SET_TOKEN,
            payload: token
        });
    };
    const setLoading = (loading)=>{
        dispatch({
            type: AUTH_ACTIONS.SET_LOADING,
            payload: loading
        });
    };
    const setError = (error)=>{
        dispatch({
            type: AUTH_ACTIONS.SET_ERROR,
            payload: error
        });
    };
    const logout = ()=>{
        dispatch({
            type: AUTH_ACTIONS.LOGOUT
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user: state.user,
            token: state.token,
            loading: state.loading,
            error: state.error,
            setUser,
            setToken,
            setLoading,
            setError,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.tsx",
        lineNumber: 117,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const useAuth = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
}),
"[project]/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
        // Initialize token from localStorage in the browser
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            this.token = null;
        }
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
            headers,
            // Include credentials for authentication
            credentials: 'include'
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
    // Products
    async getProducts() {
        return this.request('/products');
    }
    async getProduct(id) {
        return this.request(`/products/${id}`);
    }
    async getProductBySlug(slug) {
        return this.request(`/products/${slug}`);
    }
    async createProduct(productData) {
        return this.request('/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }
    async updateProduct(id, productData) {
        return this.request(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    }
    // Search
    async searchProducts(params) {
        const searchParams = new URLSearchParams();
        if (params.q) searchParams.append('q', params.q);
        if (params.search) searchParams.append('search', params.search);
        if (params.category) searchParams.append('category', params.category);
        if (params.minPrice !== undefined) searchParams.append('minPrice', params.minPrice.toString());
        if (params.maxPrice !== undefined) searchParams.append('maxPrice', params.maxPrice.toString());
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.limit) searchParams.append('limit', params.limit.toString());
        const queryString = searchParams.toString();
        const endpoint = queryString ? `/search/products?${queryString}` : '/search/products';
        return this.request(endpoint);
    }
    // Cart
    async getCartItems() {
        return this.request('/cart');
    }
    async addToCart(product_id, quantity = 1) {
        const headers = {
            'Content-Type': 'application/json'
        };
        // Only add authorization header if token exists
        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }
        return this.request('/cart', {
            method: 'POST',
            headers,
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
        // Instead of DELETE, send PUT request with quantity 0 to remove specific item
        return this.request('/cart', {
            method: 'PUT',
            body: JSON.stringify({
                product_id,
                quantity: 0
            })
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
    // Checkout
    async createCheckoutSession(cartData) {
        return this.request('/checkout/create', {
            method: 'POST',
            body: JSON.stringify(cartData)
        });
    }
    async verifyPayment(paymentData) {
        return this.request('/checkout/verify', {
            method: 'POST',
            body: JSON.stringify(paymentData)
        });
    }
    // Appointments
    async getAppointments(filters) {
        const searchParams = new URLSearchParams();
        if (filters?.status) searchParams.append('status', filters.status);
        if (filters?.date) searchParams.append('date', filters.date);
        if (filters?.page) searchParams.append('page', filters.page.toString());
        if (filters?.limit) searchParams.append('limit', filters.limit.toString());
        const queryString = searchParams.toString();
        const endpoint = queryString ? `/appointments?${queryString}` : '/appointments';
        return this.request(endpoint);
    }
    async createAppointment(appointmentData) {
        return this.request('/appointments', {
            method: 'POST',
            body: JSON.stringify(appointmentData)
        });
    }
    async getAppointment(id) {
        return this.request(`/appointments/${id}`);
    }
    async updateAppointment(id, updateData) {
        return this.request(`/appointments/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updateData)
        });
    }
    async deleteAppointment(id) {
        return this.request(`/appointments/${id}`, {
            method: 'DELETE'
        });
    }
}
const apiClient = new ApiClient();
}),
"[project]/src/context/CartContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartContext",
    ()=>CartContext,
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
// Action types
const CART_ACTIONS = {
    SET_ITEMS: 'SET_ITEMS',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    ADD_ITEM: 'ADD_ITEM',
    UPDATE_ITEM: 'UPDATE_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    CLEAR_CART: 'CLEAR_CART'
};
// Initial state
const initialState = {
    items: [],
    loading: false,
    error: null
};
// Reducer
const cartReducer = (state, action)=>{
    switch(action.type){
        case CART_ACTIONS.SET_ITEMS:
            return {
                ...state,
                items: action.payload
            };
        case CART_ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case CART_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CART_ACTIONS.ADD_ITEM:
            const existingItem = state.items.find((item)=>item.product_id === action.payload.product_id);
            let updatedItems;
            if (existingItem) {
                updatedItems = state.items.map((item)=>item.product_id === action.payload.product_id ? action.payload : item);
            } else {
                updatedItems = [
                    ...state.items,
                    action.payload
                ];
            }
            return {
                ...state,
                items: updatedItems
            };
        case CART_ACTIONS.UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map((item)=>item.product_id === action.payload.product_id ? {
                        ...item,
                        quantity: action.payload.quantity
                    } : item)
            };
        case CART_ACTIONS.REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter((item)=>item.product_id !== action.payload)
            };
        case CART_ACTIONS.CLEAR_CART:
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
};
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const CartProvider = ({ children, userId })=>{
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(cartReducer, initialState);
    const tempSavedCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ongoingCartRequests = new Set(); // Track ongoing cart requests
    // Calculate cart count and total
    const cartCount = state.items.reduce((total, item)=>total + (item.quantity || 0), 0);
    const cartTotal = state.items.reduce((total, item)=>total + (item.price || 0) * (item.quantity || 0), 0);
    // Fetch cart items
    const fetchItems = async ()=>{
        if (!userId) {
            // For guest users, always set cart to empty
            dispatch({
                type: CART_ACTIONS.SET_ITEMS,
                payload: []
            });
            // Sync Zustand cart with empty array
            __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                module.useCartStore.getState().clearCart();
            });
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getCartItems();
            if (response.success && response.data) {
                dispatch({
                    type: CART_ACTIONS.SET_ITEMS,
                    payload: response.data
                });
                // Sync Zustand cart with fetched data
                __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                    module.useCartStore.getState().clearCart();
                    response.data.forEach((item)=>{
                        module.useCartStore.getState().addItem(item);
                    });
                });
            } else {
                // Don't throw an error for empty cart, just log and handle gracefully
                console.warn('No cart items found for user:', response.error);
                dispatch({
                    type: CART_ACTIONS.SET_ITEMS,
                    payload: []
                });
                // Sync Zustand cart with empty array
                __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                    module.useCartStore.getState().clearCart();
                });
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setError(error.message || 'Failed to load cart items. Please try again later.');
            // Still set empty cart to avoid breaking the UI
            dispatch({
                type: CART_ACTIONS.SET_ITEMS,
                payload: []
            });
            // Sync Zustand cart with empty array
            __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                module.useCartStore.getState().clearCart();
            });
        } finally{
            setLoading(false);
        }
    };
    // Load cart from localStorage based on login state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!userId) {
            // User is not logged in, set cart to empty to ensure it appears empty in the UI
            const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            dispatch({
                type: CART_ACTIONS.SET_ITEMS,
                payload: savedCartItems
            });
        } else {
            // User is logged in, fetch their cart from the server
            fetchItems();
        }
    }, [
        userId
    ]);
    // Sync Zustand cart with CartContext cart
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initialize Zustand cart from CartContext
        __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
            const { items } = module.useCartStore.getState();
            if (items.length === 0 && state.items.length > 0) {
                // If Zustand store is empty but CartContext has items, populate Zustand
                state.items.forEach((item)=>{
                    module.useCartStore.getState().addItem(item);
                });
            } else if (items.length > 0 && state.items.length === 0) {
                // If Zustand has items but CartContext is empty, populate CartContext
                dispatch({
                    type: CART_ACTIONS.SET_ITEMS,
                    payload: items
                });
            }
        });
    }, [
        state.items
    ]);
    // Save cart to localStorage only when not logged in
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Only save guest cart to localStorage if not logged in
        if (!userId) {
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        }
    }, [
        state.items,
        userId
    ]);
    const setItems = (items)=>{
        dispatch({
            type: CART_ACTIONS.SET_ITEMS,
            payload: items
        });
    };
    const setLoading = (loading)=>{
        dispatch({
            type: CART_ACTIONS.SET_LOADING,
            payload: loading
        });
    };
    const setError = (error)=>{
        dispatch({
            type: CART_ACTIONS.SET_ERROR,
            payload: error
        });
    };
    // Add item to cart
    const addToCart = async (product, quantity = 1)=>{
        // Prevent multiple requests for the same product
        if (ongoingCartRequests.has(product.id)) {
            return; // Skip if already processing a request for this product
        }
        if (userId) {
            ongoingCartRequests.add(product.id); // Mark this product as having an ongoing request
            setLoading(true);
            setError(null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].addToCart(product.id, quantity);
                if (response.success && response.data) {
                    dispatch({
                        type: CART_ACTIONS.ADD_ITEM,
                        payload: response.data
                    });
                    // Sync with Zustand store
                    __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                        module.useCartStore.getState().addItem(response.data);
                    });
                } else {
                    throw new Error(response.error || 'Failed to add item to cart');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
                setError(error.message || 'Failed to add item to cart. Please try again.');
            } finally{
                ongoingCartRequests.delete(product.id); // Remove the tracking
                setLoading(false);
            }
        } else {
            // For non-authenticated users, add to Zustand cart directly
            const cartItem = {
                id: Date.now(),
                // Temporary ID
                product_id: product.id,
                quantity,
                name: product.name,
                price: product.price,
                image_url: product.image_url
            };
            __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                module.useCartStore.getState().addItem(cartItem);
            });
            // Update context state
            const existingItem = state.items.find((item)=>item.product_id === product.id);
            if (existingItem) {
                dispatch({
                    type: CART_ACTIONS.UPDATE_ITEM,
                    payload: {
                        product_id: product.id,
                        quantity: existingItem.quantity + quantity
                    }
                });
            } else {
                dispatch({
                    type: CART_ACTIONS.ADD_ITEM,
                    payload: cartItem
                });
            }
        }
    };
    // Update cart item
    const updateItem = async (productId, quantity)=>{
        // Only proceed if product ID is valid
        if (!productId || typeof productId !== 'number' || productId <= 0) {
            console.error('Invalid product ID provided to updateItem:', productId);
            return;
        }
        if (userId) {
            setLoading(true);
            setError(null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].updateCartItem(productId, quantity);
                if (response.success && response.data) {
                    // Use ADD_ITEM action to properly handle the full cart item data from API
                    dispatch({
                        type: CART_ACTIONS.ADD_ITEM,
                        payload: response.data
                    });
                    // Sync with Zustand store
                    __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                        module.useCartStore.getState().updateItem(productId, quantity);
                    });
                } else if (quantity <= 0 && response.success) {
                    // When quantity is 0, the item was removed
                    dispatch({
                        type: CART_ACTIONS.REMOVE_ITEM,
                        payload: productId
                    });
                    // Sync with Zustand store
                    __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                        module.useCartStore.getState().removeItem(productId);
                    });
                } else {
                    throw new Error(response.error || 'Failed to update cart item');
                }
            } catch (error) {
                console.error('Error updating cart item:', error);
                setError(error.message || 'Failed to update cart item. Please try again.');
            } finally{
                setLoading(false);
            }
        } else {
            if (quantity <= 0) {
                dispatch({
                    type: CART_ACTIONS.REMOVE_ITEM,
                    payload: productId
                });
                // Sync with Zustand store
                __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                    module.useCartStore.getState().removeItem(productId);
                });
            } else {
                dispatch({
                    type: CART_ACTIONS.UPDATE_ITEM,
                    payload: {
                        product_id: productId,
                        quantity
                    }
                });
                // Sync with Zustand store
                __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                    module.useCartStore.getState().updateItem(productId, quantity);
                });
            }
            // Update localStorage for guest cart
            const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
            const existingItemIndex = currentCart.findIndex((item)=>item.product_id === productId);
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
                // For guest cart, we'll use the current cart state to find product details
                const existingItem = state.items.find((p)=>p.product_id === productId);
                if (existingItem) {
                    currentCart.push({
                        id: existingItem.id,
                        product_id: existingItem.product_id,
                        name: existingItem.name,
                        price: existingItem.price,
                        quantity,
                        image_url: existingItem.image_url,
                        user_id: null
                    });
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(currentCart));
        }
    };
    // Remove item from cart
    const removeItem = async (productId)=>{
        // Only proceed if product ID is valid
        if (!productId || typeof productId !== 'number' || productId <= 0) {
            console.error('Invalid product ID provided to removeItem:', productId);
            return;
        }
        if (userId) {
            setLoading(true);
            setError(null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].removeFromCart(productId);
                if (response.success) {
                    dispatch({
                        type: CART_ACTIONS.REMOVE_ITEM,
                        payload: productId
                    });
                    // Sync with Zustand store
                    __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                        module.useCartStore.getState().removeItem(productId);
                    });
                } else {
                    throw new Error(response.error || 'Failed to remove item from cart');
                }
            } catch (error) {
                console.error('Error removing from cart:', error);
                setError(error.message || 'Failed to remove item from cart. Please try again.');
            } finally{
                setLoading(false);
            }
        } else {
            dispatch({
                type: CART_ACTIONS.REMOVE_ITEM,
                payload: productId
            });
            // Sync with Zustand store
            __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                module.useCartStore.getState().removeItem(productId);
            });
            // Update localStorage for guest cart
            const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
            const updatedCart = currentCart.filter((item)=>item.product_id !== productId);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        }
    };
    // Clear cart
    const clearCart = async ()=>{
        if (userId) {
            setLoading(true);
            setError(null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].clearCart();
                if (response.success) {
                    dispatch({
                        type: CART_ACTIONS.CLEAR_CART
                    });
                    // Sync with Zustand store
                    __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                        module.useCartStore.getState().clearCart();
                    });
                } else {
                    throw new Error(response.error || 'Failed to clear cart');
                }
            } catch (error) {
                console.error('Error clearing cart:', error);
                setError(error.message || 'Failed to clear cart. Please try again.');
            } finally{
                setLoading(false);
            }
        } else {
            dispatch({
                type: CART_ACTIONS.CLEAR_CART
            });
            // Sync with Zustand store
            __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                module.useCartStore.getState().clearCart();
            });
            // Update localStorage for guest cart
            localStorage.setItem('cartItems', JSON.stringify([]));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            items: state.items,
            loading: state.loading,
            error: state.error,
            setItems,
            setLoading,
            setError,
            fetchItems,
            addToCart,
            updateItem,
            removeItem,
            clearCart,
            cartCount,
            cartTotal
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/CartContext.tsx",
        lineNumber: 488,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const useCart = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
}),
"[project]/src/context/ProductContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductContext",
    ()=>ProductContext,
    "ProductProvider",
    ()=>ProductProvider,
    "useProduct",
    ()=>useProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
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
const initialState = {
    products: [],
    loading: false,
    error: null,
    appointments: [],
    orders: []
};
// Reducer
const productReducer = (state, action)=>{
    switch(action.type){
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
                orders: [
                    action.payload,
                    ...state.orders
                ]
            };
        default:
            return state;
    }
};
const ProductContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const ProductProvider = ({ children })=>{
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(productReducer, initialState);
    // Actions
    const setProducts = (products)=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_PRODUCTS,
            payload: products
        });
    };
    const setLoading = (loading)=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_LOADING,
            payload: loading
        });
    };
    const setError = (error)=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_ERROR,
            payload: error
        });
    };
    const setAppointments = (appointments)=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_APPOINTMENTS,
            payload: appointments
        });
    };
    const setOrders = (orders)=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_ORDERS,
            payload: orders
        });
    };
    // Fetch products
    const fetchProducts = async ()=>{
        // Don't fetch if already loading to prevent race conditions
        if (state.loading) return;
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getProducts();
            if (response.success && response.data) {
                // Handle the new response structure with pagination
                const productsData = Array.isArray(response.data) ? response.data : response.data?.products || [];
                // Convert price strings to numbers for proper formatting
                // Map mock image_url identifiers to appropriate imageClass values
                const mapImageIdentifierToClass = (identifier)=>{
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
                const formattedProducts = productsData.map((product)=>({
                        ...product,
                        price: typeof product.price === 'number' ? product.price : parseFloat(product.price),
                        // Only set image_url to undefined if it's not a proper URL
                        // If it looks like an actual URL (contains http), keep it
                        image_url: product.image_url && (product.image_url.startsWith('http') || product.image_url.startsWith('/')) ? product.image_url : undefined,
                        // Use the identifier to determine the appropriate CSS class
                        imageClass: mapImageIdentifierToClass(product.image_url) || product.imageClass || 'modern'
                    }));
                dispatch({
                    type: PRODUCT_ACTIONS.SET_PRODUCTS,
                    payload: formattedProducts
                });
            } else {
                throw new Error(response.error || 'Failed to load products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message || 'Failed to load products. Please try again later.');
        } finally{
            setLoading(false);
        }
    };
    // Fetch product by slug
    const fetchProductBySlug = async (slug)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getProductBySlug(slug);
            if (response.success && response.data) {
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to load product');
            }
        } catch (error) {
            console.error('Error fetching product by slug:', error);
            setError(error.message || 'Failed to load product. Please try again later.');
            throw error;
        }
    };
    // Search products
    const searchProducts = async (params)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].searchProducts(params);
            if (response.success && response.data) {
                // Format the products similar to fetchProducts
                const productsData = Array.isArray(response.data.products) ? response.data.products : response.data;
                const formattedProducts = Array.isArray(productsData) ? productsData.map((product)=>({
                        ...product,
                        price: typeof product.price === 'number' ? product.price : parseFloat(product.price),
                        image_url: product.image_url && (product.image_url.startsWith('http') || product.image_url.startsWith('/')) ? product.image_url : undefined
                    })) : [];
                dispatch({
                    type: PRODUCT_ACTIONS.SET_PRODUCTS,
                    payload: formattedProducts
                });
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to search products');
            }
        } catch (error) {
            console.error('Error searching products:', error);
            setError(error.message || 'Failed to search products. Please try again later.');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Fetch orders
    const fetchOrders = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getOrders();
            if (response.success && response.data) {
                dispatch({
                    type: PRODUCT_ACTIONS.SET_ORDERS,
                    payload: response.data
                });
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to load orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError(error.message || 'Failed to load orders. Please try again later.');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Create order
    const createOrder = async (orderData)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].createOrder(orderData);
            if (response.success && response.data) {
                dispatch({
                    type: PRODUCT_ACTIONS.ADD_ORDER,
                    payload: response.data
                });
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to create order');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            setError(error.message || 'Failed to create order. Please try again.');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Create product
    const createProduct = async (productData)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].createProduct(productData);
            if (response.success && response.data) {
                // Refresh the products list
                await fetchProducts();
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            setError(error.message || 'Failed to create product. Please try again.');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Update product
    const updateProduct = async (id, productData)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].updateProduct(id, productData);
            if (response.success && response.data) {
                // Refresh the products list
                await fetchProducts();
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setError(error.message || 'Failed to update product. Please try again.');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Fetch appointments
    const fetchAppointments = async (filters)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getAppointments(filters);
            if (response.success && response.data) {
                dispatch({
                    type: PRODUCT_ACTIONS.SET_APPOINTMENTS,
                    payload: response.data
                });
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to load appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError(error.message || 'Failed to load appointments. Please try again later.');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Create appointment
    const createAppointment = async (appointmentData)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].createAppointment(appointmentData);
            if (response.success && response.data) {
                // Refresh appointments list
                await fetchAppointments();
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to create appointment');
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
            setError(error.message || 'Failed to create appointment. Please try again.');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Update appointment
    const updateAppointment = async (id, updateData)=>{
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].updateAppointment(id, updateData);
            if (response.success && response.data) {
                // Refresh appointments list
                await fetchAppointments();
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to update appointment');
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
            setError(error.message || 'Failed to update appointment. Please try again.');
            throw error;
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductContext.Provider, {
        value: {
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
            fetchProductBySlug,
            searchProducts,
            fetchOrders,
            createOrder,
            createProduct,
            updateProduct,
            fetchAppointments,
            createAppointment,
            updateAppointment
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ProductContext.tsx",
        lineNumber: 441,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const useProduct = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};
}),
"[project]/src/context/UIContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UIContext",
    ()=>UIContext,
    "UIProvider",
    ()=>UIProvider,
    "useUI",
    ()=>useUI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
// Action types
const UI_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR'
};
// Initial state
const initialState = {
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
const uiReducer = (state, action)=>{
    switch(action.type){
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
const UIContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const UIProvider = ({ children })=>{
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(uiReducer, initialState);
    const setLoading = (type, value)=>{
        dispatch({
            type: UI_ACTIONS.SET_LOADING,
            payload: {
                type,
                value
            }
        });
    };
    const setError = (type, value)=>{
        dispatch({
            type: UI_ACTIONS.SET_ERROR,
            payload: {
                type,
                value
            }
        });
    };
    const clearError = (type)=>{
        dispatch({
            type: UI_ACTIONS.CLEAR_ERROR,
            payload: {
                type
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UIContext.Provider, {
        value: {
            loading: state.loading,
            error: state.error,
            setLoading,
            setError,
            clearError
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/UIContext.tsx",
        lineNumber: 131,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const useUI = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
}),
"[project]/src/context/AppProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/CartContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ProductContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ProductContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/UIContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
// Component that uses the auth context to pass user ID to the cart provider
const CartProviderWrapper = ({ children })=>{
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartProvider"], {
        userId: user?.id,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AppProvider.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const AppProvider = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ProductContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProductProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartProviderWrapper, {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/context/AppProvider.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/context/AppProvider.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/context/AppProvider.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/context/AppProvider.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__88321e6e._.js.map