(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/DashboardLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const DashboardLayout = ({ children, title, description })=>{
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!user) {
        return null;
    }
    const isAdmin = user.role === 'admin';
    const menuItems = [
        {
            icon: 'fas fa-tachometer-alt',
            label: 'Overview',
            href: '/dashboard'
        },
        {
            icon: 'fas fa-box',
            label: 'Products',
            href: '/dashboard/products',
            show: isAdmin
        },
        {
            icon: 'fas fa-shopping-bag',
            label: 'Orders',
            href: '/dashboard/orders',
            show: true
        },
        {
            icon: 'fas fa-calendar-check',
            label: 'Appointments',
            href: '/dashboard/appointments',
            show: true
        },
        {
            icon: 'fas fa-users',
            label: 'Users',
            href: '/dashboard/users',
            show: isAdmin
        },
        {
            icon: 'fas fa-cog',
            label: 'Settings',
            href: '/dashboard/settings',
            show: isAdmin
        }
    ].filter((item)=>item.show !== false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "d4b9965889f23bd8",
                dynamic: [
                    mobileMenuOpen ? '0' : '-100%'
                ],
                children: `@media (width<=768px){.dashboard-header-title.__jsx-style-dynamic-selector,.dashboard-header-divider.__jsx-style-dynamic-selector{display:none!important}.dashboard-sidebar.__jsx-style-dynamic-selector{top:72px!important;left:${mobileMenuOpen ? '0' : '-100%'}!important;z-index:999!important;background:#fff!important;width:280px!important;height:calc(100vh - 72px)!important;padding:16px!important;transition:left .3s!important;position:fixed!important;overflow-y:auto!important}.dashboard-content-wrapper.__jsx-style-dynamic-selector{flex-direction:column!important;padding:16px 12px!important}.dashboard-content.__jsx-style-dynamic-selector{width:100%!important}.mobile-menu-button.__jsx-style-dynamic-selector{display:flex!important}.user-info-text.__jsx-style-dynamic-selector{display:none!important}.dashboard-title.__jsx-style-dynamic-selector{font-size:24px!important}}@media (width>=769px){.mobile-menu-button.__jsx-style-dynamic-selector,.mobile-overlay.__jsx-style-dynamic-selector{display:none!important}}`
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)',
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                },
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "d4b9965889f23bd8",
                        [
                            mobileMenuOpen ? '0' : '-100%'
                        ]
                    ]
                ]),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderBottom: '1px solid #e8d5c4',
                            boxShadow: '0 2px 8px rgba(193, 154, 107, 0.1)',
                            position: 'sticky',
                            top: 0,
                            zIndex: 100
                        },
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "d4b9965889f23bd8",
                                [
                                    mobileMenuOpen ? '0' : '-100%'
                                ]
                            ]
                        ]),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                maxWidth: '1400px',
                                margin: '0 auto',
                                padding: '0 16px',
                                height: '72px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            },
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                [
                                    "d4b9965889f23bd8",
                                    [
                                        mobileMenuOpen ? '0' : '-100%'
                                    ]
                                ]
                            ]),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px'
                                    },
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                        [
                                            "d4b9965889f23bd8",
                                            [
                                                mobileMenuOpen ? '0' : '-100%'
                                            ]
                                        ]
                                    ]),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                                            style: {
                                                display: 'none',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '40px',
                                                height: '40px',
                                                background: 'transparent',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: '#c19a6b',
                                                fontSize: '20px',
                                                cursor: 'pointer'
                                            },
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                [
                                                    "d4b9965889f23bd8",
                                                    [
                                                        mobileMenuOpen ? '0' : '-100%'
                                                    ]
                                                ]
                                            ]) + " " + "mobile-menu-button",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                    [
                                                        "d4b9965889f23bd8",
                                                        [
                                                            mobileMenuOpen ? '0' : '-100%'
                                                        ]
                                                    ]
                                                ]) + " " + ((mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars') || "")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DashboardLayout.tsx",
                                                lineNumber: 148,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DashboardLayout.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            style: {
                                                fontSize: '20px',
                                                fontWeight: '600',
                                                color: '#c19a6b',
                                                textDecoration: 'none',
                                                fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                                                letterSpacing: '0.5px'
                                            },
                                            children: "← Colour My Space"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DashboardLayout.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: '1px',
                                                height: '32px',
                                                background: '#e8d5c4'
                                            },
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                [
                                                    "d4b9965889f23bd8",
                                                    [
                                                        mobileMenuOpen ? '0' : '-100%'
                                                    ]
                                                ]
                                            ]) + " " + "dashboard-header-divider"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DashboardLayout.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: {
                                                fontSize: '18px',
                                                fontWeight: '500',
                                                color: '#333',
                                                margin: 0,
                                                letterSpacing: '0.5px'
                                            },
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                [
                                                    "d4b9965889f23bd8",
                                                    [
                                                        mobileMenuOpen ? '0' : '-100%'
                                                    ]
                                                ]
                                            ]) + " " + "dashboard-header-title",
                                            children: "Admin Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DashboardLayout.tsx",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DashboardLayout.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px'
                                    },
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                        [
                                            "d4b9965889f23bd8",
                                            [
                                                mobileMenuOpen ? '0' : '-100%'
                                            ]
                                        ]
                                    ]),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '8px 12px',
                                            background: 'linear-gradient(135deg, #f8f4f0, #efe9e3)',
                                            borderRadius: '8px'
                                        },
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                            [
                                                "d4b9965889f23bd8",
                                                [
                                                    mobileMenuOpen ? '0' : '-100%'
                                                ]
                                            ]
                                        ]),
                                        children: [
                                            user.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: user.avatar,
                                                alt: user.name,
                                                style: {
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    border: '2px solid #c19a6b'
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                    [
                                                        "d4b9965889f23bd8",
                                                        [
                                                            mobileMenuOpen ? '0' : '-100%'
                                                        ]
                                                    ]
                                                ])
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DashboardLayout.tsx",
                                                lineNumber: 189,
                                                columnNumber: 32
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '14px',
                                                    fontWeight: '600'
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                    [
                                                        "d4b9965889f23bd8",
                                                        [
                                                            mobileMenuOpen ? '0' : '-100%'
                                                        ]
                                                    ]
                                                ]),
                                                children: user.name?.charAt(0).toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DashboardLayout.tsx",
                                                lineNumber: 194,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                    [
                                                        "d4b9965889f23bd8",
                                                        [
                                                            mobileMenuOpen ? '0' : '-100%'
                                                        ]
                                                    ]
                                                ]) + " " + "user-info-text",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '14px',
                                                            fontWeight: '600',
                                                            color: '#333'
                                                        },
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                            [
                                                                "d4b9965889f23bd8",
                                                                [
                                                                    mobileMenuOpen ? '0' : '-100%'
                                                                ]
                                                            ]
                                                        ]),
                                                        children: user.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DashboardLayout.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '11px',
                                                            color: '#c19a6b',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px',
                                                            fontWeight: '600'
                                                        },
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                            [
                                                                "d4b9965889f23bd8",
                                                                [
                                                                    mobileMenuOpen ? '0' : '-100%'
                                                                ]
                                                            ]
                                                        ]),
                                                        children: user.role
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DashboardLayout.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/DashboardLayout.tsx",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DashboardLayout.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DashboardLayout.tsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DashboardLayout.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/DashboardLayout.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setMobileMenuOpen(false),
                        style: {
                            position: 'fixed',
                            top: '72px',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 998
                        },
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "d4b9965889f23bd8",
                                [
                                    mobileMenuOpen ? '0' : '-100%'
                                ]
                            ]
                        ]) + " " + "mobile-overlay"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DashboardLayout.tsx",
                        lineNumber: 230,
                        columnNumber: 28
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: '1400px',
                            margin: '0 auto',
                            padding: '32px 24px',
                            display: 'flex',
                            gap: '32px'
                        },
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "d4b9965889f23bd8",
                                [
                                    mobileMenuOpen ? '0' : '-100%'
                                ]
                            ]
                        ]) + " " + "dashboard-content-wrapper",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '260px',
                                    flexShrink: 0
                                },
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "d4b9965889f23bd8",
                                        [
                                            mobileMenuOpen ? '0' : '-100%'
                                        ]
                                    ]
                                ]) + " " + "dashboard-sidebar",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'white',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                                        border: '1px solid #e8d5c4',
                                        position: 'sticky',
                                        top: '104px'
                                    },
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                        [
                                            "d4b9965889f23bd8",
                                            [
                                                mobileMenuOpen ? '0' : '-100%'
                                            ]
                                        ]
                                    ]),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '11px',
                                                fontWeight: '700',
                                                color: '#999',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '12px',
                                                padding: '0 12px'
                                            },
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                [
                                                    "d4b9965889f23bd8",
                                                    [
                                                        mobileMenuOpen ? '0' : '-100%'
                                                    ]
                                                ]
                                            ]),
                                            children: "Navigation"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DashboardLayout.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        menuItems.map((item, index)=>{
                                            const isActive = pathname === item.href;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: item.href,
                                                onClick: ()=>setMobileMenuOpen(false),
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    padding: '12px',
                                                    marginBottom: '4px',
                                                    borderRadius: '8px',
                                                    textDecoration: 'none',
                                                    color: isActive ? '#c19a6b' : '#666',
                                                    background: isActive ? 'linear-gradient(135deg, rgba(193, 154, 107, 0.1), rgba(193, 154, 107, 0.05))' : 'transparent',
                                                    fontWeight: isActive ? '600' : '500',
                                                    fontSize: '14px',
                                                    transition: 'all 0.2s ease',
                                                    border: isActive ? '1px solid rgba(193, 154, 107, 0.2)' : '1px solid transparent'
                                                },
                                                onMouseEnter: (e)=>{
                                                    if (!isActive) {
                                                        e.currentTarget.style.background = 'rgba(193, 154, 107, 0.05)';
                                                        e.currentTarget.style.transform = 'translateX(4px)';
                                                    }
                                                },
                                                onMouseLeave: (e)=>{
                                                    if (!isActive) {
                                                        e.currentTarget.style.background = 'transparent';
                                                        e.currentTarget.style.transform = 'translateX(0)';
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        style: {
                                                            width: '20px',
                                                            textAlign: 'center',
                                                            fontSize: '16px'
                                                        },
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                            [
                                                                "d4b9965889f23bd8",
                                                                [
                                                                    mobileMenuOpen ? '0' : '-100%'
                                                                ]
                                                            ]
                                                        ]) + " " + (item.icon || "")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DashboardLayout.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                            [
                                                                "d4b9965889f23bd8",
                                                                [
                                                                    mobileMenuOpen ? '0' : '-100%'
                                                                ]
                                                            ]
                                                        ]),
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DashboardLayout.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/components/DashboardLayout.tsx",
                                                lineNumber: 274,
                                                columnNumber: 22
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/DashboardLayout.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/DashboardLayout.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    minWidth: 0
                                },
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "d4b9965889f23bd8",
                                        [
                                            mobileMenuOpen ? '0' : '-100%'
                                        ]
                                    ]
                                ]) + " " + "dashboard-content",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '24px'
                                        },
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                            [
                                                "d4b9965889f23bd8",
                                                [
                                                    mobileMenuOpen ? '0' : '-100%'
                                                ]
                                            ]
                                        ]),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: '28px',
                                                    fontWeight: '600',
                                                    color: '#333',
                                                    margin: '0 0 8px 0',
                                                    fontFamily: 'var(--font-playfair), "Playfair Display", serif'
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                    [
                                                        "d4b9965889f23bd8",
                                                        [
                                                            mobileMenuOpen ? '0' : '-100%'
                                                        ]
                                                    ]
                                                ]) + " " + "dashboard-title",
                                                children: title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DashboardLayout.tsx",
                                                lineNumber: 318,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '14px',
                                                    color: '#666',
                                                    margin: 0
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                    [
                                                        "d4b9965889f23bd8",
                                                        [
                                                            mobileMenuOpen ? '0' : '-100%'
                                                        ]
                                                    ]
                                                ]),
                                                children: description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DashboardLayout.tsx",
                                                lineNumber: 327,
                                                columnNumber: 31
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DashboardLayout.tsx",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    children
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DashboardLayout.tsx",
                                lineNumber: 311,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DashboardLayout.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DashboardLayout.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(DashboardLayout, "GwBOff65sP31dNH2gYBHpSY7xVA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardLayout;
const __TURBOPACK__default__export__ = DashboardLayout;
var _c;
__turbopack_context__.k.register(_c, "DashboardLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/dashboard/appointments/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DashboardLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DashboardLayout.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const DashboardAppointmentsPage = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [appointments, setAppointments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardAppointmentsPage.useEffect": ()=>{
            if (!user) {
                router.push('/auth?redirect=/dashboard/appointments');
                return;
            }
            if (user.role !== 'admin' && user.role !== 'moderator') {
                router.push('/dashboard');
                return;
            }
            fetchAppointments();
        }
    }["DashboardAppointmentsPage.useEffect"], [
        user
    ]);
    const fetchAppointments = async ()=>{
        try {
            setLoading(true);
            const response = await fetch('/api/appointments');
            const data = await response.json();
            if (data.success) {
                setAppointments(Array.isArray(data.data) ? data.data : []);
            } else {
                setAppointments([]);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setAppointments([]);
        } finally{
            setLoading(false);
        }
    };
    const updateAppointmentStatus = async (appointmentId, newStatus)=>{
        try {
            const response = await fetch(`/api/appointments/${appointmentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });
            if (response.ok) {
                setAppointments((prev)=>prev.map((app)=>app.id === appointmentId ? {
                            ...app,
                            status: newStatus
                        } : app));
            }
        } catch (error) {
            console.error('Error updating appointment status:', error);
        }
    };
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    if (!user || loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center'
                },
                className: "jsx-776cdcbc0448e4ea",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '48px',
                            height: '48px',
                            border: '3px solid #f0f0f0',
                            borderTop: '3px solid #c19a6b',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto'
                        },
                        className: "jsx-776cdcbc0448e4ea"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        id: "776cdcbc0448e4ea",
                        children: "@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"
                    }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            marginTop: '16px',
                            color: '#666',
                            fontSize: '14px'
                        },
                        className: "jsx-776cdcbc0448e4ea",
                        children: "Loading appointments..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/appointments/page.tsx",
            lineNumber: 76,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    const filteredAppointments = statusFilter === 'all' ? appointments : appointments.filter((app)=>app.status === statusFilter);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "ceffd8efe7c94dc5",
                children: "@media (width<=768px){.appointments-filter-bar.jsx-ceffd8efe7c94dc5{flex-direction:column!important;align-items:stretch!important}.appointments-filter-bar.jsx-ceffd8efe7c94dc5 button.jsx-ceffd8efe7c94dc5{width:100%!important}.appointment-card-content.jsx-ceffd8efe7c94dc5{flex-direction:column!important;gap:16px!important}.appointment-card-right.jsx-ceffd8efe7c94dc5{text-align:left!important}.appointment-controls.jsx-ceffd8efe7c94dc5{flex-direction:column!important;gap:12px!important}.appointment-controls.jsx-ceffd8efe7c94dc5 select.jsx-ceffd8efe7c94dc5,.appointment-controls.jsx-ceffd8efe7c94dc5 button.jsx-ceffd8efe7c94dc5{width:100%!important}}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DashboardLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Appointment Management",
                description: "View and manage customer consultations, update appointment status, and track schedules.",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '24px',
                            boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                            border: '1px solid #e8d5c4'
                        },
                        className: "jsx-ceffd8efe7c94dc5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '16px',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            },
                            className: "jsx-ceffd8efe7c94dc5" + " " + "appointments-filter-bar",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#666'
                                    },
                                    className: "jsx-ceffd8efe7c94dc5",
                                    children: "Filter by Status:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: statusFilter,
                                    onChange: (e)=>setStatusFilter(e.target.value),
                                    style: {
                                        padding: '8px 14px',
                                        border: '1px solid #e8d5c4',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    },
                                    className: "jsx-ceffd8efe7c94dc5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "all",
                                            className: "jsx-ceffd8efe7c94dc5",
                                            children: "All Appointments"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "pending",
                                            className: "jsx-ceffd8efe7c94dc5",
                                            children: "Pending"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                            lineNumber: 169,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "confirmed",
                                            className: "jsx-ceffd8efe7c94dc5",
                                            children: "Confirmed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                            lineNumber: 170,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "completed",
                                            className: "jsx-ceffd8efe7c94dc5",
                                            children: "Completed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                            lineNumber: 171,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "cancelled",
                                            className: "jsx-ceffd8efe7c94dc5",
                                            children: "Cancelled"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                    lineNumber: 160,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1
                                    },
                                    className: "jsx-ceffd8efe7c94dc5"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: fetchAppointments,
                                    style: {
                                        padding: '8px 20px',
                                        background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    },
                                    className: "jsx-ceffd8efe7c94dc5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "jsx-ceffd8efe7c94dc5" + " " + "fas fa-sync-alt"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Refresh"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                            lineNumber: 147,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                        lineNumber: 139,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: '12px',
                            padding: '64px',
                            textAlign: 'center',
                            boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                            border: '1px solid #e8d5c4'
                        },
                        className: "jsx-ceffd8efe7c94dc5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '48px',
                                    height: '48px',
                                    border: '3px solid #f0f0f0',
                                    borderTop: '3px solid #c19a6b',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                    margin: '0 auto'
                                },
                                className: "jsx-ceffd8efe7c94dc5"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    marginTop: '16px',
                                    color: '#666',
                                    fontSize: '14px'
                                },
                                className: "jsx-ceffd8efe7c94dc5",
                                children: "Loading appointments..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                        lineNumber: 197,
                        columnNumber: 18
                    }, ("TURBOPACK compile-time value", void 0)) : filteredAppointments.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: '12px',
                            padding: '64px 32px',
                            textAlign: 'center',
                            boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                            border: '1px solid #e8d5c4'
                        },
                        className: "jsx-ceffd8efe7c94dc5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                style: {
                                    fontSize: '64px',
                                    color: '#e8d5c4',
                                    marginBottom: '16px'
                                },
                                className: "jsx-ceffd8efe7c94dc5" + " " + "fas fa-calendar-check"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                },
                                className: "jsx-ceffd8efe7c94dc5",
                                children: "No Appointments Found"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#666',
                                    fontSize: '14px'
                                },
                                className: "jsx-ceffd8efe7c94dc5",
                                children: statusFilter === 'all' ? 'No appointments scheduled yet.' : `No ${statusFilter} appointments found.`
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                        lineNumber: 219,
                        columnNumber: 54
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                            border: '1px solid #e8d5c4'
                        },
                        className: "jsx-ceffd8efe7c94dc5",
                        children: filteredAppointments.map((appointment, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '20px',
                                    borderBottom: index < filteredAppointments.length - 1 ? '1px solid #f0f0f0' : 'none',
                                    transition: 'background 0.2s ease'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.background = 'rgba(193, 154, 107, 0.02)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.background = 'transparent';
                                },
                                className: "jsx-ceffd8efe7c94dc5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'start',
                                            marginBottom: '12px'
                                        },
                                        className: "jsx-ceffd8efe7c94dc5" + " " + "appointment-card-content",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-ceffd8efe7c94dc5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontSize: '16px',
                                                            fontWeight: '600',
                                                            color: '#333',
                                                            marginBottom: '8px'
                                                        },
                                                        className: "jsx-ceffd8efe7c94dc5",
                                                        children: [
                                                            "Consultation Request #",
                                                            appointment.id?.slice(0, 8)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                        lineNumber: 269,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            marginBottom: '4px'
                                                        },
                                                        className: "jsx-ceffd8efe7c94dc5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                style: {
                                                                    fontSize: '12px',
                                                                    color: '#999'
                                                                },
                                                                className: "jsx-ceffd8efe7c94dc5" + " " + "fas fa-user"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                                lineNumber: 283,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    color: '#666'
                                                                },
                                                                className: "jsx-ceffd8efe7c94dc5",
                                                                children: appointment.user_name || appointment.guest_name || 'N/A'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                                lineNumber: 287,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            marginBottom: '4px'
                                                        },
                                                        className: "jsx-ceffd8efe7c94dc5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                style: {
                                                                    fontSize: '12px',
                                                                    color: '#999'
                                                                },
                                                                className: "jsx-ceffd8efe7c94dc5" + " " + "fas fa-envelope"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                                lineNumber: 300,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    color: '#666'
                                                                },
                                                                className: "jsx-ceffd8efe7c94dc5",
                                                                children: appointment.user_email || appointment.guest_email || 'N/A'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                                lineNumber: 304,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    (appointment.user_phone || appointment.guest_phone) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            marginBottom: '4px'
                                                        },
                                                        className: "jsx-ceffd8efe7c94dc5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                style: {
                                                                    fontSize: '12px',
                                                                    color: '#999'
                                                                },
                                                                className: "jsx-ceffd8efe7c94dc5" + " " + "fas fa-phone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                                lineNumber: 317,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    color: '#666'
                                                                },
                                                                className: "jsx-ceffd8efe7c94dc5",
                                                                children: appointment.user_phone || appointment.guest_phone
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                                lineNumber: 321,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 75
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            marginBottom: '4px'
                                                        },
                                                        className: "jsx-ceffd8efe7c94dc5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                style: {
                                                                    fontSize: '12px',
                                                                    color: '#999'
                                                                },
                                                                className: "jsx-ceffd8efe7c94dc5" + " " + "fas fa-calendar"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                                lineNumber: 334,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    color: '#666'
                                                                },
                                                                className: "jsx-ceffd8efe7c94dc5",
                                                                children: [
                                                                    "Preferred: ",
                                                                    formatDate(appointment.appointment_date)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    appointment.service_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px'
                                                        },
                                                        className: "jsx-ceffd8efe7c94dc5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                style: {
                                                                    fontSize: '12px',
                                                                    color: '#999'
                                                                },
                                                                className: "jsx-ceffd8efe7c94dc5" + " " + "fas fa-clock"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                                lineNumber: 350,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    color: '#666'
                                                                },
                                                                className: "jsx-ceffd8efe7c94dc5",
                                                                children: appointment.service_type
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                                lineNumber: 354,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 48
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                lineNumber: 268,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: 'right'
                                                },
                                                className: "jsx-ceffd8efe7c94dc5" + " " + "appointment-card-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'inline-block',
                                                        padding: '6px 12px',
                                                        background: appointment.status === 'completed' ? 'rgba(34, 197, 94, 0.1)' : appointment.status === 'confirmed' ? 'rgba(59, 130, 246, 0.1)' : appointment.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : appointment.status === 'cancelled' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                                                        color: appointment.status === 'completed' ? '#16a34a' : appointment.status === 'confirmed' ? '#3b82f6' : appointment.status === 'pending' ? '#f59e0b' : appointment.status === 'cancelled' ? '#ef4444' : '#6b7280',
                                                        borderRadius: '6px',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase'
                                                    },
                                                    className: "jsx-ceffd8efe7c94dc5",
                                                    children: appointment.status || 'Pending'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                lineNumber: 362,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    appointment.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: '12px',
                                            background: 'rgba(193, 154, 107, 0.03)',
                                            borderRadius: '8px',
                                            marginBottom: '12px',
                                            borderLeft: '3px solid #c19a6b'
                                        },
                                        className: "jsx-ceffd8efe7c94dc5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: '13px',
                                                color: '#666',
                                                lineHeight: '1.5'
                                            },
                                            className: "jsx-ceffd8efe7c94dc5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        color: '#c19a6b'
                                                    },
                                                    className: "jsx-ceffd8efe7c94dc5",
                                                    children: "Notes:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                    lineNumber: 392,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                appointment.notes
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                            lineNumber: 387,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                        lineNumber: 380,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '12px',
                                            alignItems: 'center',
                                            paddingTop: '12px',
                                            borderTop: '1px solid #f0f0f0'
                                        },
                                        className: "jsx-ceffd8efe7c94dc5" + " " + "appointment-controls",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: appointment.status,
                                                onChange: (e)=>updateAppointmentStatus(appointment.id, e.target.value),
                                                style: {
                                                    padding: '8px 14px',
                                                    border: '1px solid #e8d5c4',
                                                    borderRadius: '8px',
                                                    fontSize: '13px',
                                                    outline: 'none',
                                                    cursor: 'pointer',
                                                    background: 'white'
                                                },
                                                className: "jsx-ceffd8efe7c94dc5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "pending",
                                                        className: "jsx-ceffd8efe7c94dc5",
                                                        children: "Pending"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                        lineNumber: 415,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "confirmed",
                                                        className: "jsx-ceffd8efe7c94dc5",
                                                        children: "Confirmed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "completed",
                                                        className: "jsx-ceffd8efe7c94dc5",
                                                        children: "Completed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "cancelled",
                                                        className: "jsx-ceffd8efe7c94dc5",
                                                        children: "Cancelled"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                        lineNumber: 418,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                lineNumber: 406,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>router.push(`/dashboard/appointments/${appointment.id}`),
                                                style: {
                                                    padding: '8px 16px',
                                                    border: '1px solid #e8d5c4',
                                                    borderRadius: '8px',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    background: 'white',
                                                    color: '#c19a6b',
                                                    transition: 'all 0.2s ease'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.background = '#c19a6b';
                                                    e.currentTarget.style.color = 'white';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.background = 'white';
                                                    e.currentTarget.style.color = '#c19a6b';
                                                },
                                                className: "jsx-ceffd8efe7c94dc5",
                                                children: "View Details"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                                lineNumber: 420,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, appointment.id, true, {
                                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                                lineNumber: 253,
                                columnNumber: 74
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                        lineNumber: 246,
                        columnNumber: 18
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/appointments/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(DashboardAppointmentsPage, "gCoVJRIkmD39lIyP01F+YY5Y/CM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = DashboardAppointmentsPage;
const __TURBOPACK__default__export__ = DashboardAppointmentsPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardAppointmentsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_8161fcb7._.js.map