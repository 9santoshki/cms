(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/auth/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Client-side authentication utilities
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const signInWithGoogle = async ()=>{
    const redirectUri = `${window.location.origin}/auth/callback`;
    const googleClientId = ("TURBOPACK compile-time value", "774770475031-c7nqt1nrj05ntj4h9h1a2co56o5peb2o.apps.googleusercontent.com");
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set('client_id', googleClientId);
    googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
    googleAuthUrl.searchParams.set('response_type', 'code');
    googleAuthUrl.searchParams.set('scope', 'openid email profile');
    googleAuthUrl.searchParams.set('access_type', 'offline');
    googleAuthUrl.searchParams.set('prompt', 'consent');
    window.location.href = googleAuthUrl.toString();
};
const signOut = async ()=>{
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Logout failed');
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};
const getCurrentSession = async ()=>{
    try {
        const response = await fetch('/api/auth/session', {
            credentials: 'include'
        });
        if (!response.ok) {
            console.log('getCurrentSession: Response not OK', response.status);
            return {
                user: null
            };
        }
        const data = await response.json();
        console.log('getCurrentSession: Received data from API:', data);
        console.log('getCurrentSession: User avatar:', data.user?.avatar);
        return {
            user: data.user || null
        };
    } catch (error) {
        console.error('Error getting session:', error);
        return {
            user: null
        };
    }
};
const getCurrentUser = async ()=>{
    const { user } = await getCurrentSession();
    return user;
};
const getUserProfile = async ()=>{
    const user = await getCurrentUser();
    if (!user) return null;
    return {
        id: user.id,
        role: user.role
    };
};
const updateUserRole = async (userId, newRole)=>{
    const response = await fetch('/api/admin/update-role', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            userId,
            newRole
        })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update user role');
    }
    return response.json();
};
const getAllUserProfiles = async ()=>{
    const response = await fetch('/api/admin/users', {
        credentials: 'include'
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch user profiles');
    }
    const data = await response.json();
    return data.users || [];
};
const onAuthStateChange = (callback)=>{
    let currentUser = null;
    const checkAuthState = async ()=>{
        const { user } = await getCurrentSession();
        if (user && !currentUser) {
            currentUser = user;
            callback('SIGNED_IN', {
                user
            });
        } else if (!user && currentUser) {
            currentUser = null;
            callback('SIGNED_OUT', {
                user: null
            });
        } else if (user && currentUser && user.id !== currentUser.id) {
            currentUser = user;
            callback('USER_UPDATED', {
                user
            });
        }
    };
    // Check immediately
    checkAuthState();
    // Poll every 2 seconds for faster cart sync after login
    const interval = setInterval(checkAuthState, 2000);
    return {
        unsubscribe: ()=>{
            clearInterval(interval);
        }
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthContext",
    ()=>AuthContext,
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
};
function authReducer(state, action) {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null
            };
        default:
            return state;
    }
}
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(authReducer, initialState);
    // Memoized setters
    const setUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[setUser]": (u)=>dispatch({
                type: 'SET_USER',
                payload: u
            })
    }["AuthProvider.useCallback[setUser]"], []);
    const setToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[setToken]": (t)=>dispatch({
                type: 'SET_TOKEN',
                payload: t
            })
    }["AuthProvider.useCallback[setToken]"], []);
    const setLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[setLoading]": (l)=>dispatch({
                type: 'SET_LOADING',
                payload: l
            })
    }["AuthProvider.useCallback[setLoading]"], []);
    const setError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[setError]": (e)=>dispatch({
                type: 'SET_ERROR',
                payload: e
            })
    }["AuthProvider.useCallback[setError]"], []);
    // Clean Logout
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": async ()=>{
            dispatch({
                type: 'LOGOUT'
            });
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])();
            } catch (e) {}
        }
    }["AuthProvider.useCallback[logout]"], []);
    // Google Login
    const signInWithGoogle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[signInWithGoogle]": async ()=>{
            setLoading(true);
            setError(null);
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithGoogle"])();
            } catch (err) {
                setError(err?.message || 'Google sign-in failed');
                throw err;
            } finally{
                setLoading(false);
            }
        }
    }["AuthProvider.useCallback[signInWithGoogle]"], [
        setLoading,
        setError
    ]);
    // 🔥 Stable auth listener with initial session check
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            console.log('AuthContext: Setting up auth state change listener');
            // Check current session on mount - run immediately without delay
            const checkCurrentSession = {
                "AuthProvider.useEffect.checkCurrentSession": async ()=>{
                    console.log('AuthContext: Checking current session on mount...');
                    try {
                        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
                        console.log('AuthContext: getCurrentUser result:', user);
                        if (user) {
                            console.log('AuthContext: Current user found on mount:', user);
                            setUser(user);
                            // Load user's cart from server IMMEDIATELY
                            try {
                                const { useCartStore } = await __turbopack_context__.A("[project]/src/store/cartStore.ts [app-client] (ecmascript, async loader)");
                                console.log('AuthContext: Loading cart from server...');
                                await useCartStore.getState().loadServerCart();
                                console.log('AuthContext: ✅ Cart loaded from server successfully');
                            } catch (cartError) {
                                console.error('AuthContext: ❌ Error loading cart:', cartError);
                            }
                        } else {
                            console.log('AuthContext: No current user found on mount');
                        }
                    } catch (error) {
                        console.error('AuthContext: Error checking current session:', error);
                    }
                }
            }["AuthProvider.useEffect.checkCurrentSession"];
            // Run immediately - don't delay with setTimeout
            checkCurrentSession();
            console.log('AuthContext: Subscribing to auth state changes...');
            const sub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onAuthStateChange"])({
                "AuthProvider.useEffect.sub": async (event, session)=>{
                    console.log('AuthContext: Auth state changed event:', event, 'Session:', session);
                    if (event === 'SIGNED_IN') {
                        const user = session.user;
                        if (!user) return;
                        console.log('AuthContext: Processing SIGNED_IN event for user:', user);
                        setUser(user);
                        setToken(null); // We use cookie-based sessions now
                        // Load user's cart from server after sign in
                        try {
                            const { useCartStore } = await __turbopack_context__.A("[project]/src/store/cartStore.ts [app-client] (ecmascript, async loader)");
                            console.log('AuthContext: Loading cart after sign in...');
                            await useCartStore.getState().loadServerCart();
                            console.log('AuthContext: ✅ Cart loaded from server after sign in');
                        } catch (cartError) {
                            console.error('AuthContext: ❌ Error loading cart after sign in:', cartError);
                        }
                    }
                    if (event === 'SIGNED_OUT') {
                        console.log('AuthContext: Processing SIGNED_OUT event');
                        dispatch({
                            type: 'LOGOUT'
                        });
                        // Clear local cart state only (keep database cart for when user logs back in)
                        try {
                            const { useCartStore } = await __turbopack_context__.A("[project]/src/store/cartStore.ts [app-client] (ecmascript, async loader)");
                            useCartStore.setState({
                                items: []
                            });
                            console.log('AuthContext: ✅ Local cart state cleared after sign out (database cart preserved)');
                        } catch (cartError) {
                            console.error('AuthContext: ❌ Error clearing cart after sign out:', cartError);
                        }
                    }
                    if (event === 'USER_UPDATED') {
                        console.log('AuthContext: Processing USER_UPDATED event');
                        const user = session.user;
                        if (!user) return;
                        setUser(user);
                    }
                }
            }["AuthProvider.useEffect.sub"]);
            // Reload cart when window regains focus (in case user logged in from another tab)
            const handleWindowFocus = {
                "AuthProvider.useEffect.handleWindowFocus": async ()=>{
                    console.log('AuthContext: Window focused, checking for cart updates...');
                    try {
                        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentUser"])();
                        if (user) {
                            const { useCartStore } = await __turbopack_context__.A("[project]/src/store/cartStore.ts [app-client] (ecmascript, async loader)");
                            await useCartStore.getState().loadServerCart();
                            console.log('AuthContext: ✅ Cart reloaded on window focus');
                        }
                    } catch (error) {
                        console.error('AuthContext: ❌ Error reloading cart on focus:', error);
                    }
                }
            }["AuthProvider.useEffect.handleWindowFocus"];
            window.addEventListener('focus', handleWindowFocus);
            return ({
                "AuthProvider.useEffect": ()=>{
                    console.log('AuthContext: Cleaning up auth subscription');
                    window.removeEventListener('focus', handleWindowFocus);
                    sub.unsubscribe();
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        setUser,
        setToken
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            ...state,
            setUser,
            setToken,
            setLoading,
            setError,
            signInWithGoogle,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.tsx",
        lineNumber: 222,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "z4yhBHQ1EGMcqdyhdeVchEIrqOQ=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
_s1(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/cartStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCartStore",
    ()=>useCartStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
// Helper to check if user is authenticated
async function isUserAuthenticated() {
    try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        return data.authenticated === true;
    } catch (error) {
        return false;
    }
}
// Sync cart item with server
async function syncCartItemWithServer(productId, quantity) {
    try {
        const isAuth = await isUserAuthenticated();
        if (!isAuth) return;
        if (quantity <= 0) {
            // Remove from server
            await fetch(`/api/cart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: 0
                })
            });
        } else {
            // Update on server
            await fetch(`/api/cart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity
                })
            });
        }
    } catch (error) {
        console.error('Failed to sync cart with server:', error);
    }
}
const useCartStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeWithSelector"])((set, get)=>({
        items: [],
        isLoading: false,
        addItem: async (item)=>{
            console.log('🛒 CartStore: Adding item to cart:', item);
            // Add to local state first for immediate UI update
            set((state)=>{
                const existingItemIndex = state.items.findIndex((cartItem)=>cartItem.product_id === item.product_id);
                if (existingItemIndex >= 0) {
                    const updatedItems = [
                        ...state.items
                    ];
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: updatedItems[existingItemIndex].quantity + item.quantity
                    };
                    console.log('🛒 CartStore: Updated existing item quantity');
                    return {
                        items: updatedItems
                    };
                } else {
                    console.log('🛒 CartStore: Added new item to cart');
                    return {
                        items: [
                            ...state.items,
                            item
                        ]
                    };
                }
            });
            // Sync with server
            try {
                const isAuth = await isUserAuthenticated();
                console.log('🛒 CartStore: User authenticated?', isAuth);
                if (isAuth) {
                    console.log('🛒 CartStore: Syncing item to server...');
                    const response = await fetch('/api/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            product_id: item.product_id,
                            quantity: item.quantity
                        })
                    });
                    const result = await response.json();
                    console.log('🛒 CartStore: Server response:', result);
                    if (!response.ok) {
                        console.error('❌ CartStore: Failed to save to server:', result);
                    } else {
                        console.log('✅ CartStore: Item saved to database successfully');
                    }
                } else {
                    console.log('⚠️ CartStore: User not authenticated, skipping server sync');
                }
            } catch (error) {
                console.error('❌ CartStore: Failed to sync add with server:', error);
            }
        },
        updateItem: async (productId, quantity)=>{
            // Update local state first
            set((state)=>{
                if (quantity <= 0) {
                    return {
                        items: state.items.filter((item)=>item.product_id !== productId)
                    };
                }
                const updatedItems = state.items.map((item)=>item.product_id === productId ? {
                        ...item,
                        quantity
                    } : item);
                return {
                    items: updatedItems
                };
            });
            // Sync with server
            await syncCartItemWithServer(productId, quantity);
        },
        removeItem: async (productId)=>{
            // Remove from local state first
            set((state)=>({
                    items: state.items.filter((item)=>item.product_id !== productId)
                }));
            // Sync with server
            await syncCartItemWithServer(productId, 0);
        },
        clearCart: async ()=>{
            set({
                items: []
            });
            // Clear server cart
            try {
                const isAuth = await isUserAuthenticated();
                if (isAuth) {
                    await fetch('/api/cart', {
                        method: 'DELETE'
                    });
                }
            } catch (error) {
                console.error('Failed to clear server cart:', error);
            }
        },
        // Load cart from server (called on login)
        loadServerCart: async ()=>{
            console.log('🔄 CartStore: Loading cart from server...');
            try {
                set({
                    isLoading: true
                });
                const response = await fetch('/api/cart');
                const data = await response.json();
                console.log('🔄 CartStore: Server cart response:', data);
                if (data.success && data.data) {
                    // Merge server cart with local cart
                    const serverItems = data.data;
                    const localItems = get().items;
                    console.log('🔄 CartStore: Server items:', serverItems.length);
                    console.log('🔄 CartStore: Local items:', localItems.length);
                    // Create a map of server items by product_id
                    const serverItemsMap = new Map(serverItems.map((item)=>[
                            item.product_id,
                            item
                        ]));
                    // Merge: server items take priority, but keep local items not in server
                    const mergedItems = [];
                    // Add all server items
                    serverItems.forEach((serverItem)=>{
                        const localItem = localItems.find((item)=>item.product_id === serverItem.product_id);
                        // If item exists locally, take the higher quantity
                        if (localItem && localItem.quantity > serverItem.quantity) {
                            mergedItems.push({
                                ...serverItem,
                                quantity: localItem.quantity
                            });
                            console.log(`🔄 CartStore: Syncing higher quantity for product ${serverItem.product_id}`);
                            // Sync the higher quantity back to server
                            syncCartItemWithServer(serverItem.product_id, localItem.quantity);
                        } else {
                            mergedItems.push(serverItem);
                        }
                    });
                    // Add local items that aren't on server
                    for (const localItem of localItems){
                        if (!serverItemsMap.has(localItem.product_id)) {
                            mergedItems.push(localItem);
                            console.log(`🔄 CartStore: Syncing local item ${localItem.product_id} to server`);
                            // Sync new local item to server
                            fetch('/api/cart', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    product_id: localItem.product_id,
                                    quantity: localItem.quantity
                                })
                            }).catch((err)=>console.error('Failed to sync local item:', err));
                        }
                    }
                    console.log('✅ CartStore: Merged cart items:', mergedItems.length);
                    set({
                        items: mergedItems,
                        isLoading: false
                    });
                } else {
                    console.log('⚠️ CartStore: No cart data from server');
                    set({
                        isLoading: false
                    });
                }
            } catch (error) {
                console.error('❌ CartStore: Failed to load server cart:', error);
                set({
                    isLoading: false
                });
            }
        },
        // Force sync current cart to server
        syncWithServer: async ()=>{
            try {
                const isAuth = await isUserAuthenticated();
                if (!isAuth) return;
                const items = get().items;
                // Sync each item to server
                for (const item of items){
                    await fetch('/api/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            product_id: item.product_id,
                            quantity: item.quantity
                        })
                    });
                }
            } catch (error) {
                console.error('Failed to sync cart with server:', error);
            }
        },
        getTotalItems: ()=>{
            const state = get();
            return state.items.reduce((total, item)=>total + item.quantity, 0);
        },
        getTotalPrice: ()=>{
            const state = get();
            return state.items.reduce((total, item)=>total + item.price * item.quantity, 0);
        }
    })), {
    name: 'cart-storage',
    partialize: (state)=>({
            items: state.items
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/CartContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartContext",
    ()=>CartContext,
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/cartStore.ts [app-client] (ecmascript)"); // Assuming you have this Zustand store
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const CartProvider = ({ children })=>{
    _s();
    const { items, addItem, updateItem, removeItem, clearCart, getTotalItems, getTotalPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            items,
            loading: false,
            error: null,
            cartCount: getTotalItems(),
            cartTotal: getTotalPrice(),
            addItem,
            updateItem,
            removeItem,
            clearCart
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/CartContext.tsx",
        lineNumber: 45,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CartProvider, "odT2+6A9h4pmURY+RfaIDDs8qjU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"]
    ];
});
_c = CartProvider;
const useCart = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        // Initialize token from localStorage in the browser
        if ("TURBOPACK compile-time truthy", 1) {
            this.token = localStorage.getItem('token');
        } else //TURBOPACK unreachable
        ;
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
    async deleteProduct(id) {
        return this.request(`/products/${id}`, {
            method: 'DELETE'
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/ProductContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductContext",
    ()=>ProductContext,
    "ProductProvider",
    ()=>ProductProvider,
    "useProduct",
    ()=>useProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
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
                orders: [
                    action.payload,
                    ...state.orders
                ]
            };
        default:
            return state;
    }
};
const ProductContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const ProductProvider = ({ children })=>{
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(productReducer, initialState);
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
        setLoading(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].getProducts();
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
                setProducts(formattedProducts);
            } else {
                console.warn('No products found:', response.error);
                // Even if no products are found, we should still set the products state
                // and turn off loading to avoid the infinite loading state
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message || 'Failed to load products. Please try again later.');
        } finally{
            setLoading(false);
        }
    };
    // Fetch orders
    const fetchOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductProvider.useCallback[fetchOrders]": async ()=>{
            dispatch({
                type: PRODUCT_ACTIONS.SET_LOADING,
                payload: true
            });
            dispatch({
                type: PRODUCT_ACTIONS.SET_ERROR,
                payload: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].getOrders();
                if (response.success && response.data) {
                    dispatch({
                        type: PRODUCT_ACTIONS.SET_ORDERS,
                        payload: Array.isArray(response.data) ? response.data : []
                    });
                } else {
                    dispatch({
                        type: PRODUCT_ACTIONS.SET_ORDERS,
                        payload: []
                    });
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                dispatch({
                    type: PRODUCT_ACTIONS.SET_ERROR,
                    payload: error.message || 'Failed to load orders.'
                });
            } finally{
                dispatch({
                    type: PRODUCT_ACTIONS.SET_LOADING,
                    payload: false
                });
            }
        }
    }["ProductProvider.useCallback[fetchOrders]"], []);
    // Fetch appointments
    const fetchAppointments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductProvider.useCallback[fetchAppointments]": async ()=>{
            dispatch({
                type: PRODUCT_ACTIONS.SET_LOADING,
                payload: true
            });
            dispatch({
                type: PRODUCT_ACTIONS.SET_ERROR,
                payload: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].getAppointments();
                if (response.success && response.data) {
                    dispatch({
                        type: PRODUCT_ACTIONS.SET_APPOINTMENTS,
                        payload: Array.isArray(response.data) ? response.data : []
                    });
                } else {
                    dispatch({
                        type: PRODUCT_ACTIONS.SET_APPOINTMENTS,
                        payload: []
                    });
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
                dispatch({
                    type: PRODUCT_ACTIONS.SET_ERROR,
                    payload: error.message || 'Failed to load appointments.'
                });
            } finally{
                dispatch({
                    type: PRODUCT_ACTIONS.SET_LOADING,
                    payload: false
                });
            }
        }
    }["ProductProvider.useCallback[fetchAppointments]"], []);
    // Create order
    const createOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductProvider.useCallback[createOrder]": async (orderData)=>{
            dispatch({
                type: PRODUCT_ACTIONS.SET_LOADING,
                payload: true
            });
            dispatch({
                type: PRODUCT_ACTIONS.SET_ERROR,
                payload: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].createOrder(orderData);
                if (response.success && response.data) {
                    dispatch({
                        type: PRODUCT_ACTIONS.ADD_ORDER,
                        payload: response.data
                    });
                    return response.data;
                }
                throw new Error(response.error || 'Failed to create order');
            } catch (error) {
                console.error('Error creating order:', error);
                dispatch({
                    type: PRODUCT_ACTIONS.SET_ERROR,
                    payload: error.message || 'Failed to create order.'
                });
                throw error;
            } finally{
                dispatch({
                    type: PRODUCT_ACTIONS.SET_LOADING,
                    payload: false
                });
            }
        }
    }["ProductProvider.useCallback[createOrder]"], []);
    // Create appointment
    const createAppointment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductProvider.useCallback[createAppointment]": async (appointmentData)=>{
            dispatch({
                type: PRODUCT_ACTIONS.SET_LOADING,
                payload: true
            });
            dispatch({
                type: PRODUCT_ACTIONS.SET_ERROR,
                payload: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].createAppointment(appointmentData);
                if (response.success && response.data) {
                    dispatch({
                        type: PRODUCT_ACTIONS.SET_APPOINTMENTS,
                        payload: [
                            response.data,
                            ...state.appointments
                        ]
                    });
                    return response.data;
                }
                throw new Error(response.error || 'Failed to create appointment');
            } catch (error) {
                console.error('Error creating appointment:', error);
                dispatch({
                    type: PRODUCT_ACTIONS.SET_ERROR,
                    payload: error.message || 'Failed to create appointment.'
                });
                throw error;
            } finally{
                dispatch({
                    type: PRODUCT_ACTIONS.SET_LOADING,
                    payload: false
                });
            }
        }
    }["ProductProvider.useCallback[createAppointment]"], [
        state.appointments
    ]);
    // Update product
    const updateProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductProvider.useCallback[updateProduct]": async (id, data)=>{
            dispatch({
                type: PRODUCT_ACTIONS.SET_LOADING,
                payload: true
            });
            dispatch({
                type: PRODUCT_ACTIONS.SET_ERROR,
                payload: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].updateProduct(id, data);
                if (response.success && response.data) {
                    dispatch({
                        type: PRODUCT_ACTIONS.SET_PRODUCTS,
                        payload: state.products.map({
                            "ProductProvider.useCallback[updateProduct]": (p)=>p.id === id ? response.data : p
                        }["ProductProvider.useCallback[updateProduct]"])
                    });
                    return response.data;
                }
                throw new Error(response.error || 'Failed to update product');
            } catch (error) {
                console.error('Error updating product:', error);
                dispatch({
                    type: PRODUCT_ACTIONS.SET_ERROR,
                    payload: error.message || 'Failed to update product.'
                });
                throw error;
            } finally{
                dispatch({
                    type: PRODUCT_ACTIONS.SET_LOADING,
                    payload: false
                });
            }
        }
    }["ProductProvider.useCallback[updateProduct]"], [
        state.products
    ]);
    // Delete product
    const deleteProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductProvider.useCallback[deleteProduct]": async (id)=>{
            dispatch({
                type: PRODUCT_ACTIONS.SET_LOADING,
                payload: true
            });
            dispatch({
                type: PRODUCT_ACTIONS.SET_ERROR,
                payload: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].deleteProduct(id);
                if (response.success) {
                    dispatch({
                        type: PRODUCT_ACTIONS.SET_PRODUCTS,
                        payload: state.products.filter({
                            "ProductProvider.useCallback[deleteProduct]": (p)=>p.id !== id
                        }["ProductProvider.useCallback[deleteProduct]"])
                    });
                    return true;
                }
                throw new Error(response.error || 'Failed to delete product');
            } catch (error) {
                console.error('Error deleting product:', error);
                dispatch({
                    type: PRODUCT_ACTIONS.SET_ERROR,
                    payload: error.message || 'Failed to delete product.'
                });
                throw error;
            } finally{
                dispatch({
                    type: PRODUCT_ACTIONS.SET_LOADING,
                    payload: false
                });
            }
        }
    }["ProductProvider.useCallback[deleteProduct]"], [
        state.products
    ]);
    // Create product
    const createProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductProvider.useCallback[createProduct]": async (productData)=>{
            dispatch({
                type: PRODUCT_ACTIONS.SET_LOADING,
                payload: true
            });
            dispatch({
                type: PRODUCT_ACTIONS.SET_ERROR,
                payload: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].createProduct(productData);
                if (response.success && response.data) {
                    dispatch({
                        type: PRODUCT_ACTIONS.SET_PRODUCTS,
                        payload: [
                            response.data,
                            ...state.products
                        ]
                    });
                    return response.data;
                }
                throw new Error(response.error || 'Failed to create product');
            } catch (error) {
                console.error('Error creating product:', error);
                dispatch({
                    type: PRODUCT_ACTIONS.SET_ERROR,
                    payload: error.message || 'Failed to create product.'
                });
                throw error;
            } finally{
                dispatch({
                    type: PRODUCT_ACTIONS.SET_LOADING,
                    payload: false
                });
            }
        }
    }["ProductProvider.useCallback[createProduct]"], [
        state.products
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductContext.Provider, {
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
            fetchOrders,
            fetchAppointments,
            createOrder,
            createAppointment,
            updateProduct,
            deleteProduct,
            createProduct
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ProductContext.tsx",
        lineNumber: 440,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ProductProvider, "72iABWJWNAO/Z5OiMVv1ABGZQ5M=");
_c = ProductProvider;
const useProduct = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};
_s1(useProduct, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ProductProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/UIContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UIContext",
    ()=>UIContext,
    "UIProvider",
    ()=>UIProvider,
    "useUI",
    ()=>useUI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
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
const UIContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const UIProvider = ({ children })=>{
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(uiReducer, initialState);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UIContext.Provider, {
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
_s(UIProvider, "6JWkGZ32UPfojeNx+xqn8ZU8A0Q=");
_c = UIProvider;
const useUI = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
_s1(useUI, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "UIProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/AppProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ProductContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ProductContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/UIContext.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const AppProvider = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UIProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ProductContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartProvider"], {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/context/AppProvider.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/context/AppProvider.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/context/AppProvider.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/context/AppProvider.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = AppProvider;
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_fce8eb66._.js.map