(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const AuthForm = ({ onClose: _onClose = ()=>{} })=>{
    _s();
    const { error, loading, setError, login, register } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const navigate = (path)=>{
        router.push(path);
    };
    const [isLogin, setIsLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error.auth) setError('auth', '');
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            if (isLogin) {
                // Login validation
                if (!formData.email || !formData.password) {
                    throw new Error('Please fill in all fields');
                }
                await login({
                    email: formData.email,
                    password: formData.password
                });
                navigate('/'); // Navigate to home page after login
            } else {
                // Registration validation
                if (!formData.name || !formData.email || !formData.password) {
                    throw new Error('Please fill in all fields');
                }
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                // Password strength validation
                if (formData.password.length < 6) {
                    throw new Error('Password must be at least 6 characters long');
                }
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
                    throw new Error('Password must contain at least one lowercase letter, one uppercase letter, and one digit');
                }
                await register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
                navigate('/'); // Navigate to home page after registration
            }
        } catch (err) {
            console.error('Auth error:', err);
        // Error is handled by the context
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "auth-page",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "auth-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "auth-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: isLogin ? 'Welcome Back' : 'Create Account'
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: isLogin ? 'Sign in to continue' : 'Join us today'
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                error.auth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "error-message",
                    children: error.auth
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                    lineNumber: 93,
                    columnNumber: 24
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "auth-form",
                    children: [
                        !isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "name",
                                placeholder: "Full Name",
                                value: formData.name,
                                onChange: handleChange,
                                required: !isLogin
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "email",
                                name: "email",
                                placeholder: "Email Address",
                                value: formData.email,
                                onChange: handleChange,
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    name: "password",
                                    placeholder: "Password",
                                    value: formData.password,
                                    onChange: handleChange,
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                !isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "password-hint",
                                    children: "Password must be at least 6 characters and contain uppercase, lowercase, and digit"
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        !isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "form-group",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                name: "confirmPassword",
                                placeholder: "Confirm Password",
                                value: formData.confirmPassword,
                                onChange: handleChange,
                                required: !isLogin
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                                lineNumber: 138,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "btn primary auth-button",
                            disabled: loading.auth,
                            children: loading.auth ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "auth-toggle",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            isLogin ? "Don't have an account? " : "Already have an account? ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setIsLogin(!isLogin);
                                    setError('auth', '');
                                },
                                children: isLogin ? 'Sign Up' : 'Sign In'
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/AuthForm.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthForm, "7zd8Mdkt5XFcChyXyEeEqFOvJ54=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthForm;
const __TURBOPACK__default__export__ = AuthForm;
var _c;
__turbopack_context__.k.register(_c, "AuthForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=sk_codebase_newprojs_qwenproj_28d942de._.js.map