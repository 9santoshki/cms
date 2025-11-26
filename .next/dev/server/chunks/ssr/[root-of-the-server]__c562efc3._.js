module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
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
            // Include credentials to support NextAuth cookie authentication
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
}
const apiClient = new ApiClient();
}),
"[project]/src/context/AppContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppContext",
    ()=>AppContext,
    "AppProvider",
    ()=>AppProvider,
    "useAppContext",
    ()=>useAppContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
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
        auth: false,
        user: false
    },
    error: {
        products: null,
        cart: null,
        orders: null,
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
            // The API response contains the final cart item with the updated quantity
            // So we should update the existing item or add a new one
            const existingItem = state.cartItems.find((item)=>item.product_id === action.payload.product_id);
            let updatedCartItems;
            if (existingItem) {
                // Replace the existing item with the updated one from the API response
                updatedCartItems = state.cartItems.map((item)=>item.product_id === action.payload.product_id ? action.payload : item);
            } else {
                // Add the new item as returned by the API
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
                cartItems: state.cartItems.map((item)=>item.product_id === action.payload.product_id ? {
                        ...item,
                        quantity: action.payload.quantity
                    } : item)
            };
        case ACTIONS.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item)=>item.product_id !== action.payload)
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
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AppProvider = ({ children })=>{
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(appReducer, initialState);
    const tempSavedCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // DEBUG: Track initialization
    console.log('🔄 AppContext initializing...');
    // Load user and token from localStorage on initial render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initializeAuth = async ()=>{
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            console.log('🔍 Initializing auth - token exists?', !!token);
            console.log('🔍 Initializing auth - user exists in localStorage?', !!user);
            if (user) {
                try {
                    const parsedUser = JSON.parse(user);
                    console.log('🔍 Parsed user from localStorage:', parsedUser);
                } catch (e) {
                    console.error('Error parsing user:', e);
                }
            }
            if (token) {
                dispatch({
                    type: ACTIONS.SET_TOKEN,
                    payload: token
                });
                // Verify token and restore user if valid
                if (user) {
                    try {
                        const parsedUser = JSON.parse(user);
                        dispatch({
                            type: ACTIONS.SET_USER,
                            payload: parsedUser
                        });
                        console.log('✅ User restored from localStorage:', parsedUser);
                    } catch (error) {
                        console.error('Error parsing user from localStorage:', error);
                        localStorage.removeItem('user');
                        // If user data is corrupted, try to fetch user profile using the token
                        try {
                            const response = await fetch('/api/profile', {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });
                            const result = await response.json();
                            if (result.success && result.data) {
                                dispatch({
                                    type: ACTIONS.SET_USER,
                                    payload: result.data
                                });
                                localStorage.setItem('user', JSON.stringify(result.data));
                                console.log('✅ User fetched via /api/profile:', result.data);
                            } else {
                                // Token might be invalid, clear it
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                dispatch({
                                    type: ACTIONS.SET_TOKEN,
                                    payload: null
                                });
                                dispatch({
                                    type: ACTIONS.SET_USER,
                                    payload: null
                                });
                                console.log('❌ Token invalid, cleared auth state');
                            }
                        } catch (fetchError) {
                            console.error('Error fetching user profile during initialization:', fetchError);
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            dispatch({
                                type: ACTIONS.SET_TOKEN,
                                payload: null
                            });
                            dispatch({
                                type: ACTIONS.SET_USER,
                                payload: null
                            });
                        }
                    }
                } else {
                    // User data is missing but token exists, try to fetch user profile
                    try {
                        const response = await fetch('/api/profile', {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const result = await response.json();
                        if (result.success && result.data) {
                            dispatch({
                                type: ACTIONS.SET_USER,
                                payload: result.data
                            });
                            localStorage.setItem('user', JSON.stringify(result.data));
                            console.log('✅ User fetched via /api/profile (no localStorage data):', result.data);
                        } else {
                            // Token might be invalid, clear it
                            localStorage.removeItem('token');
                            dispatch({
                                type: ACTIONS.SET_TOKEN,
                                payload: null
                            });
                            dispatch({
                                type: ACTIONS.SET_USER,
                                payload: null
                            });
                            console.log('❌ Invalid token, cleared auth state');
                        }
                    } catch (fetchError) {
                        console.error('Error fetching user profile during initialization:', fetchError);
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        dispatch({
                            type: ACTIONS.SET_TOKEN,
                            payload: null
                        });
                        dispatch({
                            type: ACTIONS.SET_USER,
                            payload: null
                        });
                    }
                }
            } else if (user) {
                // User exists without token, clear user data
                localStorage.removeItem('user');
                console.log('❌ User in localStorage without token, cleared user data');
            }
        };
        initializeAuth();
    }, []);
    // Fetch cart items
    const fetchCartItems = async ()=>{
        if (!state.token) {
            // For guest users, always set cart to empty as requested
            dispatch({
                type: ACTIONS.SET_CART_ITEMS,
                payload: []
            });
            return;
        }
        setLoading('cart', true);
        setError('cart', null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getCartItems();
            if (response.success && response.data) {
                dispatch({
                    type: ACTIONS.SET_CART_ITEMS,
                    payload: response.data
                });
            } else {
                // Don't throw an error for empty cart, just log and handle gracefully
                console.warn('No cart items found for user:', response.error);
                dispatch({
                    type: ACTIONS.SET_CART_ITEMS,
                    payload: []
                });
            }
        } catch (error) {
            // Handle network errors, etc.
            console.error('Error fetching cart items:', error);
            setError('cart', error.message || 'Failed to load cart items. Please try again later.');
            // Still set empty cart to avoid breaking the UI
            dispatch({
                type: ACTIONS.SET_CART_ITEMS,
                payload: []
            });
        } finally{
            setLoading('cart', false);
        }
    };
    // Load cart from localStorage based on login state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!state.token) {
            // User is not logged in, set cart to empty to ensure it appears empty in the UI
            dispatch({
                type: ACTIONS.SET_CART_ITEMS,
                payload: []
            });
        } else {
            // User is logged in, fetch their cart from the server
            fetchCartItems();
        }
    }, [
        state.token
    ]); // Re-run when token changes
    // Save cart to localStorage only when not logged in
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Only save guest cart to localStorage if not logged in
        if (!state.token) {
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    }, [
        state.cartItems,
        state.token
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getProducts();
            if (response.success && response.data) {
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
                const formattedProducts = response.data.map((product)=>({
                        ...product,
                        price: typeof product.price === 'number' ? product.price : parseFloat(product.price),
                        // Only set image_url to undefined if it's not a proper URL
                        // If it looks like an actual URL (contains http), keep it
                        image_url: product.image_url && (product.image_url.startsWith('http') || product.image_url.startsWith('/')) ? product.image_url : undefined,
                        // Use the identifier to determine the appropriate CSS class
                        imageClass: mapImageIdentifierToClass(product.image_url) || product.imageClass || 'modern'
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
    // Add item to cart
    // Track ongoing cart requests to prevent duplicates
    const ongoingCartRequests = new Set(); // Set to track product IDs with ongoing requests
    const addToCart = async (product, quantity = 1)=>{
        // Prevent multiple requests for the same product
        if (ongoingCartRequests.has(product.id)) {
            return; // Skip if already processing a request for this product
        }
        if (state.token) {
            ongoingCartRequests.add(product.id); // Mark this product as having an ongoing request
            setLoading('cart', true);
            setError('cart', null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].addToCart(product.id, quantity);
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
                ongoingCartRequests.delete(product.id); // Remove the tracking
                setLoading('cart', false);
            }
        } else {
            // For users without token (guests), trigger login modal instead of adding to cart
            // Store the pending cart action in localStorage
            localStorage.setItem('pendingCartAction', JSON.stringify({
                product: product,
                quantity: quantity
            }));
            // Dispatch a custom event to trigger the login modal
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        // Don't add to cart for non-authenticated users
        }
    };
    // Update cart item
    const updateCartItem = async (productId, quantity)=>{
        // Only proceed if product ID is valid
        if (!productId || typeof productId !== 'number' || productId <= 0) {
            console.error('Invalid product ID provided to updateCartItem:', productId);
            return;
        }
        if (state.token) {
            setLoading('cart', true);
            setError('cart', null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].updateCartItem(productId, quantity);
                if (response.success && response.data) {
                    // Use ADD_TO_CART action to properly handle the full cart item data from API
                    // This will add a new item or update an existing one with the full API response data
                    dispatch({
                        type: ACTIONS.ADD_TO_CART,
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
                        product_id: productId,
                        quantity
                    }
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
                const product = state.products.find((p)=>p.id === productId);
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
    const removeFromCart = async (productId)=>{
        // Only proceed if product ID is valid
        if (!productId || typeof productId !== 'number' || productId <= 0) {
            console.error('Invalid product ID provided to removeFromCart:', productId);
            return;
        }
        if (state.token) {
            setLoading('cart', true);
            setError('cart', null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].removeFromCart(productId);
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
            // Update localStorage for guest cart
            const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
            const updatedCart = currentCart.filter((item)=>item.product_id !== productId);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        }
    };
    // Clear cart
    const clearCart = async ()=>{
        if (state.token) {
            setLoading('cart', true);
            setError('cart', null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].clearCart();
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
            // Clear localStorage for guest cart
            localStorage.removeItem('cartItems');
        }
    };
    // Fetch orders
    const fetchOrders = async ()=>{
        if (!state.token) return;
        setLoading('orders', true);
        setError('orders', null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getOrders();
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].createOrder(orderData);
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
    // Fetch user profile
    const fetchUserProfile = async ()=>{
        if (!state.token) return;
        setLoading('user', true);
        setError('user', null);
        try {
            const response = await fetch('/api/profile', {
                headers: {
                    'Authorization': `Bearer ${state.token}`
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
        } catch (error) {
            console.error('Error fetching user profile:', error);
            // If an error occurs and we have existing user data, return that.
            // Otherwise, set an error.
            if (state.user) {
                return state.user;
            }
            setError('user', error.message || 'Failed to fetch user profile. Please try again later.');
            throw error; // Re-throw to propagate the error for handling in components
        } finally{
            setLoading('user', false);
        }
    };
    // Update user profile
    const updateUserProfile = async (profileData)=>{
        if (!state.token) return;
        setLoading('user', true);
        setError('user', null);
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token}`
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
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('user', error.message || 'Failed to update profile. Please try again.');
            throw error;
        } finally{
            setLoading('user', false);
        }
    };
    // Login
    const login = async (credentials)=>{
        setLoading('auth', true);
        setError('auth', null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].login(credentials);
            if (response.success && response.data) {
                console.log('✅ Login API response success:', response.data);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].setToken(response.data.token);
                setToken(response.data.token);
                setUser(response.data.user);
                // DEBUG: Check what was set in state
                console.log('🔍 User set to:', response.data.user);
                console.log('🔍 Token set to:', response.data.token);
                console.log('🔍 state.user after setUser:', state.user);
                // Clear any guest cart from localStorage 
                localStorage.removeItem('cartItems');
                // Clear any pending cart action
                localStorage.removeItem('pendingCartAction');
                // Clear the temporary saved cart
                tempSavedCart.current = null;
                // Fetch the user's cart from the server to show last logged-in session status
                await fetchCartItems();
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].register(userData);
            if (response.success && response.data) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].setToken(response.data.token);
                setToken(response.data.token);
                setUser(response.data.user);
                // Clear any guest cart from localStorage 
                localStorage.removeItem('cartItems');
                // Clear any pending cart action
                localStorage.removeItem('pendingCartAction');
                // Clear the temporary saved cart
                tempSavedCart.current = null;
                // Fetch the user's cart from the server to show last logged-in session status
                await fetchCartItems();
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
        // Store the current cart in temp ref for potential restoration on login
        tempSavedCart.current = [
            ...state.cartItems
        ];
        // Clear cart items from localStorage to ensure cart appears empty after logout
        localStorage.removeItem('cartItems');
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
    // Create product
    const createProduct = async (productData)=>{
        if (!state.token) return;
        setLoading('products', true);
        setError('products', null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].createProduct(productData);
            if (response.success && response.data) {
                // Update products list to include the new product
                dispatch({
                    type: ACTIONS.SET_PRODUCTS,
                    payload: [
                        ...state.products,
                        response.data
                    ]
                });
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            setError('products', error.message || 'Failed to create product. Please try again.');
            throw error;
        } finally{
            setLoading('products', false);
        }
    };
    // Update product
    const updateProduct = async (id, productData)=>{
        if (!state.token) return;
        setLoading('products', true);
        setError('products', null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].updateProduct(id, productData);
            if (response.success && response.data) {
                // Update products list to reflect the changes
                const updatedProducts = state.products.map((product)=>product.id === id ? response.data : product);
                dispatch({
                    type: ACTIONS.SET_PRODUCTS,
                    payload: updatedProducts
                });
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setError('products', error.message || 'Failed to update product. Please try again.');
            throw error;
        } finally{
            setLoading('products', false);
        }
    };
    // Fetch specific product by slug
    const fetchProductBySlug = async (slug)=>{
        setLoading('products', true);
        setError('products', null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getProductBySlug(slug);
            if (response.success && response.data) {
                // Ensure slug is present in the returned product
                const productData = {
                    ...response.data,
                    slug: response.data.slug || slug
                };
                // Add the fetched product to the products list
                const updatedProducts = [
                    ...state.products
                ];
                const existingIndex = updatedProducts.findIndex((p)=>p.id === productData.id);
                if (existingIndex !== -1) {
                    // Update existing product
                    updatedProducts[existingIndex] = productData;
                } else {
                    // Add new product
                    updatedProducts.push(productData);
                }
                dispatch({
                    type: ACTIONS.SET_PRODUCTS,
                    payload: updatedProducts
                });
                return productData;
            } else {
                throw new Error(response.error || 'Failed to fetch product');
            }
        } catch (error) {
            console.error('Error fetching product by slug:', error);
            setError('products', error.message || 'Failed to fetch product. Please try again.');
            throw error;
        } finally{
            setLoading('products', false);
        }
    };
    // Verify token - we can use any authenticated endpoint to verify the token
    const verifyToken = async ()=>{
        if (!state.token) return false;
        try {
            // Using the getOrders endpoint as a way to verify the token
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getOrders();
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
    // Clear pending cart action
    const clearPendingCartAction = ()=>{
        localStorage.removeItem('pendingCartAction');
    };
    // Add item to cart or request login if guest
    const addToCartWithAuth = (product, quantity = 1)=>{
        if (state.token) {
            // User is logged in, return success and the cart action to be performed
            return {
                success: true,
                requiresLogin: false,
                product,
                quantity,
                action: ()=>addToCart(product, quantity)
            };
        } else {
            // User is not logged in, indicate they need to log in
            return {
                success: false,
                requiresLogin: true,
                product,
                quantity
            };
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
        verifyToken,
        fetchUserProfile,
        updateUserProfile,
        createProduct,
        updateProduct,
        fetchProductBySlug,
        addToCartWithAuth,
        clearPendingCartAction
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AppContext.tsx",
        lineNumber: 1079,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const useAppContext = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
}),
"[project]/src/components/NextAuthProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NextAuthProvider",
    ()=>NextAuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
'use client';
;
;
function NextAuthProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionProvider"], {
        ...props,
        basePath: "/api/auth",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/NextAuthProvider.tsx",
        lineNumber: 9,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c562efc3._.js.map