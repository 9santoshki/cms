module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/auth/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const signInWithGoogle = async ()=>{
    // Use NEXT_PUBLIC_APP_URL if set, otherwise fall back to window.location.origin
    const appUrl = ("TURBOPACK compile-time value", "http://localhost:3000") || window.location.origin;
    const redirectUri = `${appUrl}/auth/callback`;
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
            return {
                user: null
            };
        }
        const data = await response.json();
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
        id: String(user.id),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/client.ts [app-ssr] (ecmascript)");
'use client';
;
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
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(authReducer, initialState);
    // Memoized setters
    const setUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((u)=>dispatch({
            type: 'SET_USER',
            payload: u
        }), []);
    const setToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((t)=>dispatch({
            type: 'SET_TOKEN',
            payload: t
        }), []);
    const setLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((l)=>dispatch({
            type: 'SET_LOADING',
            payload: l
        }), []);
    const setError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>dispatch({
            type: 'SET_ERROR',
            payload: e
        }), []);
    // Clean Logout
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        dispatch({
            type: 'LOGOUT'
        });
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])();
        } catch (e) {}
    }, []);
    // Google Login
    const signInWithGoogle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setLoading(true);
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithGoogle"])();
        } catch (err) {
            setError(err?.message || 'Google sign-in failed');
            throw err;
        } finally{
            setLoading(false);
        }
    }, [
        setLoading,
        setError
    ]);
    // 🔥 Stable auth listener with initial session check
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log('AuthContext: Setting up auth state change listener');
        // Check current session on mount - run immediately without delay
        const checkCurrentSession = async ()=>{
            console.log('AuthContext: Checking current session on mount...');
            try {
                const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])();
                console.log('AuthContext: getCurrentUser result:', user);
                if (user) {
                    console.log('AuthContext: Current user found on mount:', user);
                    setUser(user);
                    // Load user's cart from server IMMEDIATELY
                    try {
                        const { useCartStore } = await __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)");
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
        };
        // Run immediately - don't delay with setTimeout
        checkCurrentSession();
        console.log('AuthContext: Subscribing to auth state changes...');
        const sub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onAuthStateChange"])(async (event, session)=>{
            console.log('AuthContext: Auth state changed event:', event, 'Session:', session);
            if (event === 'SIGNED_IN') {
                const user = session.user;
                if (!user) return;
                console.log('AuthContext: Processing SIGNED_IN event for user:', user);
                setUser(user);
                setToken(null); // We use cookie-based sessions now
                // Load user's cart from server after sign in
                try {
                    const { useCartStore } = await __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)");
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
                    const { useCartStore } = await __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)");
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
        });
        // Reload cart when window regains focus (in case user logged in from another tab)
        const handleWindowFocus = async ()=>{
            console.log('AuthContext: Window focused, checking for cart updates...');
            try {
                const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])();
                if (user) {
                    const { useCartStore } = await __turbopack_context__.A("[project]/src/store/cartStore.ts [app-ssr] (ecmascript, async loader)");
                    await useCartStore.getState().loadServerCart();
                    console.log('AuthContext: ✅ Cart reloaded on window focus');
                }
            } catch (error) {
                console.error('AuthContext: ❌ Error reloading cart on focus:', error);
            }
        };
        window.addEventListener('focus', handleWindowFocus);
        return ()=>{
            console.log('AuthContext: Cleaning up auth subscription');
            window.removeEventListener('focus', handleWindowFocus);
            sub.unsubscribe();
        };
    }, [
        setUser,
        setToken
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
const useAuth = ()=>{
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
}),
"[project]/src/store/cartStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCartStore",
    ()=>useCartStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
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
const useCartStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeWithSelector"])((set, get)=>({
        items: [],
        isLoading: false,
        addItem: async (item)=>{
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
                    return {
                        items: updatedItems
                    };
                } else {
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
                if (isAuth) {
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
                    if (!response.ok) {
                        console.error('Failed to save cart item to server:', result);
                    }
                }
            } catch (error) {
                console.error('Failed to sync cart with server:', error);
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
            try {
                set({
                    isLoading: true
                });
                const response = await fetch('/api/cart');
                const data = await response.json();
                if (data.success && data.data) {
                    // Merge server cart with local cart
                    const serverItems = data.data;
                    const localItems = get().items;
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
                            // Sync the higher quantity back to server
                            if (serverItem.product_id && localItem.quantity) {
                                syncCartItemWithServer(serverItem.product_id, localItem.quantity);
                            }
                        } else {
                            mergedItems.push(serverItem);
                        }
                    });
                    // Add local items that aren't on server
                    for (const localItem of localItems){
                        if (!serverItemsMap.has(localItem.product_id)) {
                            mergedItems.push(localItem);
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
                    set({
                        items: mergedItems,
                        isLoading: false
                    });
                } else {
                    set({
                        isLoading: false
                    });
                }
            } catch (error) {
                console.error('Failed to load server cart:', error);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/cartStore.ts [app-ssr] (ecmascript)"); // Assuming you have this Zustand store
'use client';
;
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const CartProvider = ({ children })=>{
    const { items, addItem, updateItem, removeItem, clearCart, getTotalItems, getTotalPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCartStore"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
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
const useCart = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
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
    const fetchOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_LOADING,
            payload: true
        });
        dispatch({
            type: PRODUCT_ACTIONS.SET_ERROR,
            payload: null
        });
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getOrders();
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
    }, []);
    // Fetch appointments
    const fetchAppointments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_LOADING,
            payload: true
        });
        dispatch({
            type: PRODUCT_ACTIONS.SET_ERROR,
            payload: null
        });
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].getAppointments();
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
    }, []);
    // Create order
    const createOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (orderData)=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_LOADING,
            payload: true
        });
        dispatch({
            type: PRODUCT_ACTIONS.SET_ERROR,
            payload: null
        });
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].createOrder(orderData);
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
    }, []);
    // Create appointment
    const createAppointment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (appointmentData)=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_LOADING,
            payload: true
        });
        dispatch({
            type: PRODUCT_ACTIONS.SET_ERROR,
            payload: null
        });
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].createAppointment(appointmentData);
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
    }, [
        state.appointments
    ]);
    // Update product
    const updateProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id, data)=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_LOADING,
            payload: true
        });
        dispatch({
            type: PRODUCT_ACTIONS.SET_ERROR,
            payload: null
        });
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].updateProduct(id, data);
            if (response.success && response.data) {
                dispatch({
                    type: PRODUCT_ACTIONS.SET_PRODUCTS,
                    payload: state.products.map((p)=>p.id === id ? response.data : p)
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
    }, [
        state.products
    ]);
    // Delete product
    const deleteProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_LOADING,
            payload: true
        });
        dispatch({
            type: PRODUCT_ACTIONS.SET_ERROR,
            payload: null
        });
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].deleteProduct(id);
            if (response.success) {
                dispatch({
                    type: PRODUCT_ACTIONS.SET_PRODUCTS,
                    payload: state.products.filter((p)=>p.id !== id)
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
    }, [
        state.products
    ]);
    // Create product
    const createProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (productData)=>{
        dispatch({
            type: PRODUCT_ACTIONS.SET_LOADING,
            payload: true
        });
        dispatch({
            type: PRODUCT_ACTIONS.SET_ERROR,
            payload: null
        });
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].createProduct(productData);
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
    }, [
        state.products
    ]);
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
const AppProvider = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ProductContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProductProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartProvider"], {
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
"[project]/node_modules/zustand/esm/vanilla.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore
]);
const createStoreImpl = (createState)=>{
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace)=>{
        const nextState = typeof partial === "function" ? partial(state) : partial;
        if (!Object.is(nextState, state)) {
            const previousState = state;
            state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
            listeners.forEach((listener)=>listener(state, previousState));
        }
    };
    const getState = ()=>state;
    const getInitialState = ()=>initialState;
    const subscribe = (listener)=>{
        listeners.add(listener);
        return ()=>listeners.delete(listener);
    };
    const api = {
        setState,
        getState,
        getInitialState,
        subscribe
    };
    const initialState = state = createState(setState, getState, api);
    return api;
};
const createStore = (createState)=>createState ? createStoreImpl(createState) : createStoreImpl;
;
}),
"[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "create",
    ()=>create,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/vanilla.mjs [app-ssr] (ecmascript)");
;
;
const identity = (arg)=>arg;
function useStore(api, selector = identity) {
    const slice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useSyncExternalStore(api.subscribe, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>selector(api.getState()), [
        api,
        selector
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>selector(api.getInitialState()), [
        api,
        selector
    ]));
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useDebugValue(slice);
    return slice;
}
const createImpl = (createState)=>{
    const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStore"])(createState);
    const useBoundStore = (selector)=>useStore(api, selector);
    Object.assign(useBoundStore, api);
    return useBoundStore;
};
const create = (createState)=>createState ? createImpl(createState) : createImpl;
;
}),
"[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "combine",
    ()=>combine,
    "createJSONStorage",
    ()=>createJSONStorage,
    "devtools",
    ()=>devtools,
    "persist",
    ()=>persist,
    "redux",
    ()=>redux,
    "subscribeWithSelector",
    ()=>subscribeWithSelector
]);
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("node_modules/zustand/esm/middleware.mjs")}`;
    }
};
const reduxImpl = (reducer, initial)=>(set, _get, api)=>{
        api.dispatch = (action)=>{
            set((state)=>reducer(state, action), false, action);
            return action;
        };
        api.dispatchFromDevtools = true;
        return {
            dispatch: (...args)=>api.dispatch(...args),
            ...initial
        };
    };
const redux = reduxImpl;
const trackedConnections = /* @__PURE__ */ new Map();
const getTrackedConnectionState = (name)=>{
    const api = trackedConnections.get(name);
    if (!api) return {};
    return Object.fromEntries(Object.entries(api.stores).map(([key, api2])=>[
            key,
            api2.getState()
        ]));
};
const extractConnectionInformation = (store, extensionConnector, options)=>{
    if (store === void 0) {
        return {
            type: "untracked",
            connection: extensionConnector.connect(options)
        };
    }
    const existingConnection = trackedConnections.get(options.name);
    if (existingConnection) {
        return {
            type: "tracked",
            store,
            ...existingConnection
        };
    }
    const newConnection = {
        connection: extensionConnector.connect(options),
        stores: {}
    };
    trackedConnections.set(options.name, newConnection);
    return {
        type: "tracked",
        store,
        ...newConnection
    };
};
const removeStoreFromTrackedConnections = (name, store)=>{
    if (store === void 0) return;
    const connectionInfo = trackedConnections.get(name);
    if (!connectionInfo) return;
    delete connectionInfo.stores[store];
    if (Object.keys(connectionInfo.stores).length === 0) {
        trackedConnections.delete(name);
    }
};
const findCallerName = (stack)=>{
    var _a, _b;
    if (!stack) return void 0;
    const traceLines = stack.split("\n");
    const apiSetStateLineIndex = traceLines.findIndex((traceLine)=>traceLine.includes("api.setState"));
    if (apiSetStateLineIndex < 0) return void 0;
    const callerLine = ((_a = traceLines[apiSetStateLineIndex + 1]) == null ? void 0 : _a.trim()) || "";
    return (_b = /.+ (.+) .+/.exec(callerLine)) == null ? void 0 : _b[1];
};
const devtoolsImpl = (fn, devtoolsOptions = {})=>(set, get, api)=>{
        const { enabled, anonymousActionType, store, ...options } = devtoolsOptions;
        let extensionConnector;
        try {
            extensionConnector = (enabled != null ? enabled : (__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
        } catch (e) {}
        if (!extensionConnector) {
            return fn(set, get, api);
        }
        const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options);
        let isRecording = true;
        api.setState = (state, replace, nameOrAction)=>{
            const r = set(state, replace);
            if (!isRecording) return r;
            const action = nameOrAction === void 0 ? {
                type: anonymousActionType || findCallerName(new Error().stack) || "anonymous"
            } : typeof nameOrAction === "string" ? {
                type: nameOrAction
            } : nameOrAction;
            if (store === void 0) {
                connection == null ? void 0 : connection.send(action, get());
                return r;
            }
            connection == null ? void 0 : connection.send({
                ...action,
                type: `${store}/${action.type}`
            }, {
                ...getTrackedConnectionState(options.name),
                [store]: api.getState()
            });
            return r;
        };
        api.devtools = {
            cleanup: ()=>{
                if (connection && typeof connection.unsubscribe === "function") {
                    connection.unsubscribe();
                }
                removeStoreFromTrackedConnections(options.name, store);
            }
        };
        const setStateFromDevtools = (...a)=>{
            const originalIsRecording = isRecording;
            isRecording = false;
            set(...a);
            isRecording = originalIsRecording;
        };
        const initialState = fn(api.setState, get, api);
        if (connectionInformation.type === "untracked") {
            connection == null ? void 0 : connection.init(initialState);
        } else {
            connectionInformation.stores[connectionInformation.store] = api;
            connection == null ? void 0 : connection.init(Object.fromEntries(Object.entries(connectionInformation.stores).map(([key, store2])=>[
                    key,
                    key === connectionInformation.store ? initialState : store2.getState()
                ])));
        }
        if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
            let didWarnAboutReservedActionType = false;
            const originalDispatch = api.dispatch;
            api.dispatch = (...args)=>{
                if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && args[0].type === "__setState" && !didWarnAboutReservedActionType) {
                    console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.');
                    didWarnAboutReservedActionType = true;
                }
                originalDispatch(...args);
            };
        }
        connection.subscribe((message)=>{
            var _a;
            switch(message.type){
                case "ACTION":
                    if (typeof message.payload !== "string") {
                        console.error("[zustand devtools middleware] Unsupported action format");
                        return;
                    }
                    return parseJsonThen(message.payload, (action)=>{
                        if (action.type === "__setState") {
                            if (store === void 0) {
                                setStateFromDevtools(action.state);
                                return;
                            }
                            if (Object.keys(action.state).length !== 1) {
                                console.error(`
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);
                            }
                            const stateFromDevtools = action.state[store];
                            if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                                return;
                            }
                            if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                                setStateFromDevtools(stateFromDevtools);
                            }
                            return;
                        }
                        if (!api.dispatchFromDevtools) return;
                        if (typeof api.dispatch !== "function") return;
                        api.dispatch(action);
                    });
                case "DISPATCH":
                    switch(message.payload.type){
                        case "RESET":
                            setStateFromDevtools(initialState);
                            if (store === void 0) {
                                return connection == null ? void 0 : connection.init(api.getState());
                            }
                            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                        case "COMMIT":
                            if (store === void 0) {
                                connection == null ? void 0 : connection.init(api.getState());
                                return;
                            }
                            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                        case "ROLLBACK":
                            return parseJsonThen(message.state, (state)=>{
                                if (store === void 0) {
                                    setStateFromDevtools(state);
                                    connection == null ? void 0 : connection.init(api.getState());
                                    return;
                                }
                                setStateFromDevtools(state[store]);
                                connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                            });
                        case "JUMP_TO_STATE":
                        case "JUMP_TO_ACTION":
                            return parseJsonThen(message.state, (state)=>{
                                if (store === void 0) {
                                    setStateFromDevtools(state);
                                    return;
                                }
                                if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                                    setStateFromDevtools(state[store]);
                                }
                            });
                        case "IMPORT_STATE":
                            {
                                const { nextLiftedState } = message.payload;
                                const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
                                if (!lastComputedState) return;
                                if (store === void 0) {
                                    setStateFromDevtools(lastComputedState);
                                } else {
                                    setStateFromDevtools(lastComputedState[store]);
                                }
                                connection == null ? void 0 : connection.send(null, // FIXME no-any
                                nextLiftedState);
                                return;
                            }
                        case "PAUSE_RECORDING":
                            return isRecording = !isRecording;
                    }
                    return;
            }
        });
        return initialState;
    };
const devtools = devtoolsImpl;
const parseJsonThen = (stringified, fn)=>{
    let parsed;
    try {
        parsed = JSON.parse(stringified);
    } catch (e) {
        console.error("[zustand devtools middleware] Could not parse the received json", e);
    }
    if (parsed !== void 0) fn(parsed);
};
const subscribeWithSelectorImpl = (fn)=>(set, get, api)=>{
        const origSubscribe = api.subscribe;
        api.subscribe = (selector, optListener, options)=>{
            let listener = selector;
            if (optListener) {
                const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
                let currentSlice = selector(api.getState());
                listener = (state)=>{
                    const nextSlice = selector(state);
                    if (!equalityFn(currentSlice, nextSlice)) {
                        const previousSlice = currentSlice;
                        optListener(currentSlice = nextSlice, previousSlice);
                    }
                };
                if (options == null ? void 0 : options.fireImmediately) {
                    optListener(currentSlice, currentSlice);
                }
            }
            return origSubscribe(listener);
        };
        const initialState = fn(set, get, api);
        return initialState;
    };
const subscribeWithSelector = subscribeWithSelectorImpl;
function combine(initialState, create) {
    return (...args)=>Object.assign({}, initialState, create(...args));
}
function createJSONStorage(getStorage, options) {
    let storage;
    try {
        storage = getStorage();
    } catch (e) {
        return;
    }
    const persistStorage = {
        getItem: (name)=>{
            var _a;
            const parse = (str2)=>{
                if (str2 === null) {
                    return null;
                }
                return JSON.parse(str2, options == null ? void 0 : options.reviver);
            };
            const str = (_a = storage.getItem(name)) != null ? _a : null;
            if (str instanceof Promise) {
                return str.then(parse);
            }
            return parse(str);
        },
        setItem: (name, newValue)=>storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
        removeItem: (name)=>storage.removeItem(name)
    };
    return persistStorage;
}
const toThenable = (fn)=>(input)=>{
        try {
            const result = fn(input);
            if (result instanceof Promise) {
                return result;
            }
            return {
                then (onFulfilled) {
                    return toThenable(onFulfilled)(result);
                },
                catch (_onRejected) {
                    return this;
                }
            };
        } catch (e) {
            return {
                then (_onFulfilled) {
                    return this;
                },
                catch (onRejected) {
                    return toThenable(onRejected)(e);
                }
            };
        }
    };
const persistImpl = (config, baseOptions)=>(set, get, api)=>{
        let options = {
            storage: createJSONStorage(()=>localStorage),
            partialize: (state)=>state,
            version: 0,
            merge: (persistedState, currentState)=>({
                    ...currentState,
                    ...persistedState
                }),
            ...baseOptions
        };
        let hasHydrated = false;
        const hydrationListeners = /* @__PURE__ */ new Set();
        const finishHydrationListeners = /* @__PURE__ */ new Set();
        let storage = options.storage;
        if (!storage) {
            return config((...args)=>{
                console.warn(`[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`);
                set(...args);
            }, get, api);
        }
        const setItem = ()=>{
            const state = options.partialize({
                ...get()
            });
            return storage.setItem(options.name, {
                state,
                version: options.version
            });
        };
        const savedSetState = api.setState;
        api.setState = (state, replace)=>{
            savedSetState(state, replace);
            return setItem();
        };
        const configResult = config((...args)=>{
            set(...args);
            return setItem();
        }, get, api);
        api.getInitialState = ()=>configResult;
        let stateFromStorage;
        const hydrate = ()=>{
            var _a, _b;
            if (!storage) return;
            hasHydrated = false;
            hydrationListeners.forEach((cb)=>{
                var _a2;
                return cb((_a2 = get()) != null ? _a2 : configResult);
            });
            const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
            return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue)=>{
                if (deserializedStorageValue) {
                    if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
                        if (options.migrate) {
                            const migration = options.migrate(deserializedStorageValue.state, deserializedStorageValue.version);
                            if (migration instanceof Promise) {
                                return migration.then((result)=>[
                                        true,
                                        result
                                    ]);
                            }
                            return [
                                true,
                                migration
                            ];
                        }
                        console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`);
                    } else {
                        return [
                            false,
                            deserializedStorageValue.state
                        ];
                    }
                }
                return [
                    false,
                    void 0
                ];
            }).then((migrationResult)=>{
                var _a2;
                const [migrated, migratedState] = migrationResult;
                stateFromStorage = options.merge(migratedState, (_a2 = get()) != null ? _a2 : configResult);
                set(stateFromStorage, true);
                if (migrated) {
                    return setItem();
                }
            }).then(()=>{
                postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
                stateFromStorage = get();
                hasHydrated = true;
                finishHydrationListeners.forEach((cb)=>cb(stateFromStorage));
            }).catch((e)=>{
                postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
            });
        };
        api.persist = {
            setOptions: (newOptions)=>{
                options = {
                    ...options,
                    ...newOptions
                };
                if (newOptions.storage) {
                    storage = newOptions.storage;
                }
            },
            clearStorage: ()=>{
                storage == null ? void 0 : storage.removeItem(options.name);
            },
            getOptions: ()=>options,
            rehydrate: ()=>hydrate(),
            hasHydrated: ()=>hasHydrated,
            onHydrate: (cb)=>{
                hydrationListeners.add(cb);
                return ()=>{
                    hydrationListeners.delete(cb);
                };
            },
            onFinishHydration: (cb)=>{
                finishHydrationListeners.add(cb);
                return ()=>{
                    finishHydrationListeners.delete(cb);
                };
            }
        };
        if (!options.skipHydration) {
            hydrate();
        }
        return stateFromStorage || configResult;
    };
const persist = persistImpl;
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__57dd9210._.js.map