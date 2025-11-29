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
"[project]/src/lib/supabase/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
const createClient = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://fykdwqlayqcxycrvbhew.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo"));
}),
"[project]/src/lib/supabase/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllUserProfiles",
    ()=>getAllUserProfiles,
    "getCurrentSession",
    ()=>getCurrentSession,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getUserProfile",
    ()=>getUserProfile,
    "onAuthStateChange",
    ()=>onAuthStateChange,
    "signInWithGoogle",
    ()=>signInWithGoogle,
    "signOut",
    ()=>signOut,
    "updateUserRole",
    ()=>updateUserRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const signInWithGoogle = async ()=>{
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    // Use the current window location as the redirect URL to ensure we return to the same origin
    // This ensures the auth state change event fires properly in the same session
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirectTo,
            // Ensure we get full user profile data
            queryParams: {
                access_type: 'offline',
                prompt: 'consent'
            }
        }
    });
    if (error) {
        console.error('Error signing in with Google:', error.message);
        throw error;
    }
    return data;
};
const signOut = async ()=>{
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error.message);
        throw error;
    }
    return {
        success: true
    };
};
const getCurrentSession = async ()=>{
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Error getting session:', error.message);
        return null;
    }
    return session;
};
const getCurrentUser = async ()=>{
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};
const getUserProfile = async ()=>{
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        console.error('Error getting user:', userError);
        return null;
    }
    // First, try to get the existing profile
    const { data: profile, error: profileError } = await supabase.from('profiles').select('id, role').eq('id', user.id).single();
    if (profileError) {
        // Profile doesn't exist, create it with default customer role
        console.warn('Profile not found, creating new profile for user:', user.id);
        const { error: insertError } = await supabase.from('profiles').insert([
            {
                id: user.id,
                role: 'customer'
            }
        ]);
        if (insertError) {
            console.error('Error creating user profile:', insertError);
            return null;
        }
        // Now fetch the profile that was just created
        const { data: newProfile, error: fetchError } = await supabase.from('profiles').select('id, role').eq('id', user.id).single();
        if (fetchError) {
            console.error('Error fetching newly created user profile:', fetchError);
            return null;
        }
        return newProfile;
    }
    return profile;
};
const updateUserRole = async (userId, newRole)=>{
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from('profiles').update({
        role: newRole
    }).eq('id', userId);
    if (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
};
const getAllUserProfiles = async ()=>{
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('profiles').select('id, role, created_at, updated_at').order('created_at', {
        ascending: false
    });
    if (error) {
        console.error('Error fetching user profiles:', error);
        throw error;
    }
    return data;
};
const onAuthStateChange = (callback)=>{
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return ()=>{
        subscription.unsubscribe();
    };
};
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/auth.ts [app-ssr] (ecmascript)");
'use client';
;
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
    // Load user from Supabase session on initial render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isMounted = true;
        setLoading('user', true);
        const initializeAuth = async ()=>{
            try {
                const supabaseUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])();
                if (isMounted && supabaseUser) {
                    const userProfile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserProfile"])();
                    if (userProfile) {
                        const userObject = {
                            id: userProfile.id,
                            name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
                            email: supabaseUser.email,
                            avatar: supabaseUser.user_metadata?.avatar || supabaseUser.user_metadata?.picture || null,
                            role: userProfile.role,
                            created_at: supabaseUser.created_at
                        };
                        dispatch({
                            type: ACTIONS.SET_USER,
                            payload: userObject
                        });
                        localStorage.setItem('user', JSON.stringify(userObject));
                        console.log('✅ User restored from Supabase session:', userObject);
                    } else {
                        const userObject = {
                            id: supabaseUser.id,
                            name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
                            email: supabaseUser.email,
                            avatar: supabaseUser.user_metadata?.avatar || supabaseUser.user_metadata?.picture || null,
                            role: 'customer',
                            created_at: supabaseUser.created_at
                        };
                        dispatch({
                            type: ACTIONS.SET_USER,
                            payload: userObject
                        });
                        localStorage.setItem('user', JSON.stringify(userObject));
                        console.log('✅ User restored from Supabase session (fallback):', userObject);
                    }
                } else if (isMounted) {
                    localStorage.removeItem('user');
                    console.log('❌ No user in Supabase session, cleared user data');
                }
            } catch (error) {
                console.error('Error initializing auth with Supabase:', error);
                if (isMounted) {
                    localStorage.removeItem('user');
                    dispatch({
                        type: ACTIONS.SET_USER,
                        payload: null
                    });
                }
            } finally{
                if (isMounted) {
                    setLoading('user', false);
                }
            }
        };
        initializeAuth();
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onAuthStateChange"])(async (event, session)=>{
            console.log('🔍 Auth state changed:', event);
            if (isMounted && event === 'SIGNED_IN' && session?.user) {
                const userProfile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserProfile"])();
                if (userProfile) {
                    const userObject = {
                        id: userProfile.id,
                        name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                        email: session.user.email,
                        avatar: session.user.user_metadata?.avatar || session.user.user_metadata?.picture || null,
                        role: userProfile.role,
                        created_at: session.user.created_at
                    };
                    dispatch({
                        type: ACTIONS.SET_USER,
                        payload: userObject
                    });
                    localStorage.setItem('user', JSON.stringify(userObject));
                    console.log('✅ User set after sign in:', userObject);
                } else {
                    const userObject = {
                        id: session.user.id,
                        name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
                        email: session.user.email,
                        avatar: session.user.user_metadata?.avatar || session.user.user_metadata?.picture || null,
                        role: 'customer',
                        created_at: session.user.created_at
                    };
                    dispatch({
                        type: ACTIONS.SET_USER,
                        payload: userObject
                    });
                    localStorage.setItem('user', JSON.stringify(userObject));
                    console.log('✅ User set after sign in (fallback):', userObject);
                }
            } else if (isMounted && event === 'SIGNED_OUT') {
                localStorage.removeItem('user');
                localStorage.removeItem('cartItems');
                dispatch({
                    type: ACTIONS.SET_USER,
                    payload: null
                });
                dispatch({
                    type: ACTIONS.SET_CART_ITEMS,
                    payload: []
                });
                console.log('✅ User cleared after sign out');
            }
        });
        return ()=>{
            isMounted = false;
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);
    // Fetch cart items
    const fetchCartItems = async ()=>{
        if (!state.user) {
            // For guest users, always set cart to empty as requested
            dispatch({
                type: ACTIONS.SET_CART_ITEMS,
                payload: []
            });
            // Sync Zustand cart with empty array
            __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                module.useCartStore.getState().clearCart();
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
                    type: ACTIONS.SET_CART_ITEMS,
                    payload: []
                });
                // Sync Zustand cart with empty array
                __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                    module.useCartStore.getState().clearCart();
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
            // Sync Zustand cart with empty array
            __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                module.useCartStore.getState().clearCart();
            });
        } finally{
            setLoading('cart', false);
        }
    };
    // Load cart from localStorage based on login state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!state.user) {
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
        state.user
    ]); // Re-run when user changes
    // Sync Zustand cart with AppContext cart
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initialize Zustand cart from AppContext
        __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
            const { items } = module.useCartStore.getState();
            if (items.length === 0 && state.cartItems.length > 0) {
                // If Zustand store is empty but AppContext has items, populate Zustand
                state.cartItems.forEach((item)=>{
                    module.useCartStore.getState().addItem(item);
                });
            } else if (items.length > 0 && state.cartItems.length === 0) {
                // If Zustand has items but AppContext is empty, populate AppContext
                dispatch({
                    type: ACTIONS.SET_CART_ITEMS,
                    payload: items
                });
            }
        });
    }, [
        state.cartItems
    ]);
    // Save cart to localStorage only when not logged in
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Only save guest cart to localStorage if not logged in
        if (!state.user) {
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    }, [
        state.cartItems,
        state.user
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
        if (state.user) {
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
                    // Sync with Zustand store
                    __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                        module.useCartStore.getState().addItem(response.data);
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
        }
    };
    // Update cart item
    const updateCartItem = async (productId, quantity)=>{
        // Only proceed if product ID is valid
        if (!productId || typeof productId !== 'number' || productId <= 0) {
            console.error('Invalid product ID provided to updateCartItem:', productId);
            return;
        }
        if (state.user) {
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
                    // Sync with Zustand store
                    __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                        module.useCartStore.getState().updateItem(product_id, quantity);
                    });
                } else if (quantity <= 0 && response.success) {
                    // When quantity is 0, the item was removed
                    dispatch({
                        type: ACTIONS.REMOVE_FROM_CART,
                        payload: product_id
                    });
                    // Sync with Zustand store
                    __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                        module.useCartStore.getState().removeItem(product_id);
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
                // Sync with Zustand store
                __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                    module.useCartStore.getState().removeItem(productId);
                });
            } else {
                dispatch({
                    type: ACTIONS.UPDATE_CART_ITEM,
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
        if (state.user) {
            setLoading('cart', true);
            setError('cart', null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].removeFromCart(productId);
                if (response.success) {
                    dispatch({
                        type: ACTIONS.REMOVE_FROM_CART,
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
                setError('cart', error.message || 'Failed to remove item from cart. Please try again.');
            } finally{
                setLoading('cart', false);
            }
        } else {
            dispatch({
                type: ACTIONS.REMOVE_FROM_CART,
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
        if (state.user) {
            setLoading('cart', true);
            setError('cart', null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].clearCart();
                if (response.success) {
                    dispatch({
                        type: ACTIONS.CLEAR_CART
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
                setError('cart', error.message || 'Failed to clear cart. Please try again.');
            } finally{
                setLoading('cart', false);
            }
        } else {
            dispatch({
                type: ACTIONS.CLEAR_CART
            });
            // Sync with Zustand store
            __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)").then((module)=>{
                module.useCartStore.getState().clearCart();
            });
            // Clear localStorage for guest cart
            localStorage.removeItem('cartItems');
        }
    };
    // Fetch orders
    const fetchOrders = async ()=>{
        if (!state.user) return;
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
        if (!state.user) return;
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
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('user', error.message || 'Failed to update profile. Please try again.');
            throw error;
        } finally{
            setLoading('user', false);
        }
    };
    // Login - This should be removed since we're using Google OAuth exclusively
    const login = async (credentials)=>{
        throw new Error('Email/password login is not supported. Please use Google OAuth.');
    };
    // Register - This should be removed since we're using Google OAuth exclusively
    const register = async (userData)=>{
        throw new Error('Email/password registration is not supported. Please use Google OAuth.');
    };
    // Logout
    const logout = async ()=>{
        try {
            // Store the current cart in temp ref for potential restoration on login
            tempSavedCart.current = [
                ...state.cartItems
            ];
            // Clear cart items from localStorage to ensure cart appears empty after logout
            localStorage.removeItem('cartItems');
            // Clear user from app context
            setUser(null);
            setToken(null);
            // Clear all user-related data from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            // Dispatch actions to clear state
            dispatch({
                type: ACTIONS.CLEAR_CART
            });
            dispatch({
                type: ACTIONS.SET_ORDERS,
                payload: []
            });
            // Also logout from Supabase to clear all session cookies
            try {
                const { createClient } = await __turbopack_context__.A("[project]/src/lib/supabase/client.ts [app-ssr] (ecmascript, async loader)");
                const supabase = createClient();
                const { error } = await supabase.auth.signOut();
                if (error) {
                    console.error('Supabase sign out error:', error);
                }
            } catch (supabaseSignOutError) {
                console.error('Error with main Supabase sign out:', supabaseSignOutError);
            }
            // For good measure, also try to clear any possible remaining session data
            // by calling the signOut function from auth utils which we updated
            try {
                const { signOut } = await __turbopack_context__.A("[project]/src/lib/supabase/auth.ts [app-ssr] (ecmascript, async loader)");
                await signOut();
            } catch (authSignOutError) {
                // If auth signOut fails, that's ok as long as the main signOut worked
                console.warn('Additional signOut failed (this is ok):', authSignOutError);
            }
            // Reset the API client token to ensure it doesn't hold any auth data
            try {
                const { apiClient } = await __turbopack_context__.A("[project]/src/lib/api.ts [app-ssr] (ecmascript, async loader)");
                apiClient.setToken(null);
            } catch (apiClientError) {
                console.warn('Error resetting API client token:', apiClientError);
            }
            // Add a small delay to ensure all async operations complete
            await new Promise((resolve)=>setTimeout(resolve, 300));
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    // Create product
    const createProduct = async (productData)=>{
        if (!state.user) return;
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
        if (!state.user) return;
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
    // Search products
    const searchProducts = async (params)=>{
        setLoading('products', true);
        setError('products', null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].searchProducts(params);
            if (response.success && response.data) {
                // Handle both response formats (old direct array and new with pagination object)
                const productsData = Array.isArray(response.data) ? response.data : response.data?.products || [];
                // Map imageClass to products
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
                        image_url: product.image_url && (product.image_url.startsWith('http') || product.image_url.startsWith('/')) ? product.image_url : undefined,
                        imageClass: mapImageIdentifierToClass(product.image_url) || product.imageClass || 'modern'
                    }));
                dispatch({
                    type: ACTIONS.SET_PRODUCTS,
                    payload: formattedProducts
                });
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
        } catch (error) {
            console.error('Error searching products:', error);
            setError('products', error.message || 'Failed to search products. Please try again.');
            throw error;
        } finally{
            setLoading('products', false);
        }
    };
    // Verify token - we can use any authenticated endpoint to verify the token
    const verifyToken = async ()=>{
        if (!state.user) return false;
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
    // Fetch appointments
    const fetchAppointments = async (filters)=>{
        if (!state.user) return;
        setLoading('appointments', true);
        setError('appointments', null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getAppointments(filters);
            if (response.success && response.data) {
                dispatch({
                    type: ACTIONS.SET_APPOINTMENTS,
                    payload: response.data.appointments
                });
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('appointments', error.message || 'Failed to fetch appointments. Please try again.');
            throw error;
        } finally{
            setLoading('appointments', false);
        }
    };
    // Create appointment
    const createAppointment = async (appointmentData)=>{
        if (!state.user) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].createAppointment(appointmentData);
            if (response.success && response.data) {
                // Refresh appointments list after creating new one
                await fetchAppointments();
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to create appointment');
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    };
    // Update appointment
    const updateAppointment = async (id, updateData)=>{
        if (!state.user) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].updateAppointment(id, updateData);
            if (response.success && response.data) {
                // Refresh appointments list after updating
                await fetchAppointments();
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to update appointment');
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw error;
        }
    };
    // Clear pending cart action
    const clearPendingCartAction = ()=>{
        localStorage.removeItem('pendingCartAction');
    };
    // Add item to cart or request login if guest
    const addToCartWithAuth = (product, quantity = 1)=>{
        if (state.user) {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AppContext.tsx",
        lineNumber: 1298,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__af3ea7b6._.js.map