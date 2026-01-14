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
"[project]/src/components/ProductImageManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductImageManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ProductImageManager({ productId, images: initialImages, onImagesChange }) {
    _s();
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialImages || []);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadProgress, setUploadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleFileSelect = async (event)=>{
        const files = event.target.files;
        if (!files || files.length === 0) return;
        setUploading(true);
        setUploadProgress('Uploading images to Cloudflare R2...');
        try {
            const formData = new FormData();
            formData.append('productId', productId);
            formData.append('isPrimary', images.length === 0 ? 'true' : 'false');
            Array.from(files).forEach((file)=>{
                formData.append('images', file);
            });
            const response = await fetch('/api/products/images/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                const successCount = data.results.filter((r)=>r.success).length;
                setUploadProgress(`Successfully uploaded ${successCount} image(s) to Cloudflare R2!`);
                const newImages = data.results.filter((r)=>r.success).map((r)=>({
                        id: r.imageId,
                        url: r.url,
                        cloudflare_image_id: r.cloudflareImageId,
                        is_primary: r.isPrimary,
                        display_order: images.length + data.results.indexOf(r)
                    }));
                setImages([
                    ...images,
                    ...newImages
                ]);
                onImagesChange?.();
                setTimeout(()=>setUploadProgress(''), 3000);
            } else {
                setUploadProgress(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadProgress(`Error: ${error.message}`);
        } finally{
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };
    const handleDeleteImage = async (imageId)=>{
        if (!confirm('Are you sure you want to delete this image? It will also be removed from Cloudflare R2.')) return;
        try {
            const response = await fetch(`/api/products/images/${imageId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                setImages(images.filter((img)=>img.id !== imageId));
                onImagesChange?.();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert(`Error: ${error.message}`);
        }
    };
    const handleSetPrimary = async (imageId)=>{
        try {
            const response = await fetch(`/api/products/images/${imageId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isPrimary: true
                })
            });
            const data = await response.json();
            if (data.success) {
                setImages(images.map((img)=>({
                        ...img,
                        is_primary: img.id === imageId
                    })));
                onImagesChange?.();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Set primary error:', error);
            alert(`Error: ${error.message}`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "4f533d39a41412ca",
                children: "@media (width<=768px){.image-grid.jsx-4f533d39a41412ca{grid-template-columns:repeat(2,1fr)!important}.image-header.jsx-4f533d39a41412ca{flex-direction:column!important;align-items:stretch!important;gap:12px!important}.image-header.jsx-4f533d39a41412ca button.jsx-4f533d39a41412ca{width:100%!important}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-4f533d39a41412ca",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '20px'
                        },
                        className: "jsx-4f533d39a41412ca" + " " + "image-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                },
                                className: "jsx-4f533d39a41412ca",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        style: {
                                            fontSize: '20px',
                                            color: '#c19a6b'
                                        },
                                        className: "jsx-4f533d39a41412ca" + " " + "fas fa-images"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductImageManager.tsx",
                                        lineNumber: 140,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            color: '#333',
                                            margin: 0
                                        },
                                        className: "jsx-4f533d39a41412ca",
                                        children: "Product Images"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductImageManager.tsx",
                                        lineNumber: 144,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 135,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>fileInputRef.current?.click(),
                                disabled: uploading,
                                style: {
                                    padding: '10px 20px',
                                    background: uploading ? '#999' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: uploading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 8px rgba(193, 154, 107, 0.2)'
                                },
                                className: "jsx-4f533d39a41412ca",
                                children: uploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: '16px',
                                                height: '16px',
                                                border: '2px solid #ffffff',
                                                borderTop: '2px solid transparent',
                                                borderRadius: '50%',
                                                animation: 'spin 0.8s linear infinite'
                                            },
                                            className: "jsx-4f533d39a41412ca"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ProductImageManager.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this),
                                        "Uploading..."
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "jsx-4f533d39a41412ca" + " " + "fas fa-cloud-upload-alt"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ProductImageManager.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this),
                                        "Upload Images"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 153,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                multiple: true,
                                accept: "image/*",
                                onChange: handleFileSelect,
                                style: {
                                    display: 'none'
                                },
                                className: "jsx-4f533d39a41412ca"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 183,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductImageManager.tsx",
                        lineNumber: 129,
                        columnNumber: 7
                    }, this),
                    uploadProgress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '16px 20px',
                            marginBottom: '20px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: uploadProgress.startsWith('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                            border: uploadProgress.startsWith('Error') ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(34, 197, 94, 0.3)'
                        },
                        className: "jsx-4f533d39a41412ca",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                style: {
                                    fontSize: '20px',
                                    color: uploadProgress.startsWith('Error') ? '#ef4444' : '#16a34a'
                                },
                                className: "jsx-4f533d39a41412ca" + " " + ((uploadProgress.startsWith('Error') ? 'fas fa-exclamation-circle' : 'fas fa-check-circle') || "")
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: uploadProgress.startsWith('Error') ? '#ef4444' : '#16a34a',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    margin: 0
                                },
                                className: "jsx-4f533d39a41412ca",
                                children: uploadProgress
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductImageManager.tsx",
                        lineNumber: 188,
                        columnNumber: 26
                    }, this),
                    images.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            border: '2px dashed #e8d5c4',
                            borderRadius: '12px',
                            padding: '64px 32px',
                            textAlign: 'center',
                            background: 'rgba(193, 154, 107, 0.02)'
                        },
                        className: "jsx-4f533d39a41412ca",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                style: {
                                    fontSize: '64px',
                                    color: '#e8d5c4',
                                    marginBottom: '16px'
                                },
                                className: "jsx-4f533d39a41412ca" + " " + "fas fa-cloud-upload-alt"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                style: {
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                },
                                className: "jsx-4f533d39a41412ca",
                                children: "No images uploaded yet"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '14px',
                                    color: '#666',
                                    marginBottom: '20px'
                                },
                                className: "jsx-4f533d39a41412ca",
                                children: "Upload your first product image to Cloudflare R2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>fileInputRef.current?.click(),
                                style: {
                                    padding: '10px 24px',
                                    background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                },
                                className: "jsx-4f533d39a41412ca",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "jsx-4f533d39a41412ca" + " " + "fas fa-plus"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductImageManager.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this),
                                    "Upload Images"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductImageManager.tsx",
                        lineNumber: 212,
                        columnNumber: 30
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: '16px',
                                    marginBottom: '16px'
                                },
                                className: "jsx-4f533d39a41412ca" + " " + "image-grid",
                                children: images.map((image)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'relative',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            border: '2px solid #e8d5c4',
                                            transition: 'all 0.2s ease',
                                            background: 'white'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.borderColor = '#c19a6b';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(193, 154, 107, 0.15)';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.borderColor = '#e8d5c4';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        },
                                        className: "jsx-4f533d39a41412ca",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'relative',
                                                paddingTop: '100%',
                                                background: 'linear-gradient(135deg, #f8f4f0, #efe9e3)'
                                            },
                                            className: "jsx-4f533d39a41412ca",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: image.url,
                                                    alt: "Product",
                                                    style: {
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    },
                                                    className: "jsx-4f533d39a41412ca"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ProductImageManager.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 19
                                                }, this),
                                                image.is_primary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: 'absolute',
                                                        top: '8px',
                                                        left: '8px',
                                                        padding: '4px 10px',
                                                        background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                                                        color: 'white',
                                                        borderRadius: '6px',
                                                        fontSize: '11px',
                                                        fontWeight: '700',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                                                    },
                                                    className: "jsx-4f533d39a41412ca",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            style: {
                                                                marginRight: '4px'
                                                            },
                                                            className: "jsx-4f533d39a41412ca" + " " + "fas fa-star"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ProductImageManager.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Primary"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ProductImageManager.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 40
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: 'absolute',
                                                        inset: 0,
                                                        background: 'rgba(0, 0, 0, 0.7)',
                                                        opacity: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '8px',
                                                        transition: 'opacity 0.2s ease'
                                                    },
                                                    onMouseEnter: (e)=>{
                                                        e.currentTarget.style.opacity = '1';
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        e.currentTarget.style.opacity = '0';
                                                    },
                                                    className: "jsx-4f533d39a41412ca",
                                                    children: [
                                                        !image.is_primary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleSetPrimary(image.id),
                                                            style: {
                                                                padding: '8px 14px',
                                                                background: 'white',
                                                                color: '#333',
                                                                border: 'none',
                                                                borderRadius: '6px',
                                                                fontSize: '12px',
                                                                fontWeight: '600',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px'
                                                            },
                                                            className: "jsx-4f533d39a41412ca",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "jsx-4f533d39a41412ca" + " " + "fas fa-star"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ProductImageManager.tsx",
                                                                    lineNumber: 340,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Set Primary"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/ProductImageManager.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 43
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDeleteImage(image.id),
                                                            style: {
                                                                padding: '8px 14px',
                                                                background: '#ef4444',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '6px',
                                                                fontSize: '12px',
                                                                fontWeight: '600',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px'
                                                            },
                                                            className: "jsx-4f533d39a41412ca",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "jsx-4f533d39a41412ca" + " " + "fas fa-trash"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ProductImageManager.tsx",
                                                                    lineNumber: 356,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Delete"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/ProductImageManager.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ProductImageManager.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ProductImageManager.tsx",
                                            lineNumber: 278,
                                            columnNumber: 17
                                        }, this)
                                    }, image.id, false, {
                                        fileName: "[project]/src/components/ProductImageManager.tsx",
                                        lineNumber: 262,
                                        columnNumber: 34
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '12px 16px',
                                    background: 'rgba(193, 154, 107, 0.05)',
                                    borderRadius: '8px',
                                    border: '1px solid #e8d5c4'
                                },
                                className: "jsx-4f533d39a41412ca",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: '13px',
                                        color: '#666',
                                        margin: 0,
                                        lineHeight: '1.5'
                                    },
                                    className: "jsx-4f533d39a41412ca",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            style: {
                                                marginRight: '8px',
                                                color: '#c19a6b'
                                            },
                                            className: "jsx-4f533d39a41412ca" + " " + "fas fa-info-circle"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ProductImageManager.tsx",
                                            lineNumber: 376,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "jsx-4f533d39a41412ca",
                                            children: images.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ProductImageManager.tsx",
                                            lineNumber: 380,
                                            columnNumber: 15
                                        }, this),
                                        " image(s) stored in Cloudflare R2. The primary image will be displayed in product listings and can be marked with the star icon."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ProductImageManager.tsx",
                                    lineNumber: 370,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductImageManager.tsx",
                                lineNumber: 364,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductImageManager.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ProductImageManager, "9F63Sl/KQC3RZr3ZkxAV6zMVqWc=");
_c = ProductImageManager;
var _c;
__turbopack_context__.k.register(_c, "ProductImageManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/dashboard/products/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditProductPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DashboardLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DashboardLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductImageManager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductImageManager.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function EditProductPage({ params }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingProduct, setLoadingProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [productId, setProductId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: ''
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditProductPage.useEffect": ()=>{
            params.then({
                "EditProductPage.useEffect": (p)=>setProductId(p.id)
            }["EditProductPage.useEffect"]);
        }
    }["EditProductPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditProductPage.useEffect": ()=>{
            if (!user) {
                router.push('/auth?redirect=/dashboard/products');
                return;
            }
            if (user.role !== 'admin') {
                router.push('/dashboard');
                return;
            }
            if (productId) {
                loadProduct();
            }
        }
    }["EditProductPage.useEffect"], [
        user,
        productId
    ]);
    const loadProduct = async ()=>{
        if (!productId) return;
        try {
            setLoadingProduct(true);
            const response = await fetch(`/api/products/${productId}`);
            const data = await response.json();
            if (data.success) {
                setProduct(data.data);
                setFormData({
                    name: data.data.name,
                    description: data.data.description,
                    price: data.data.price.toString(),
                    category: data.data.category || '',
                    stock_quantity: data.data.stock_quantity?.toString() || '0'
                });
            } else {
                setError(data.error || 'Failed to load product');
            }
        } catch (err) {
            console.error('Error loading product:', err);
            setError(err.message || 'Failed to load product');
        } finally{
            setLoadingProduct(false);
        }
    };
    const handleInputChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!productId) return;
        setSaving(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    stock_quantity: parseInt(formData.stock_quantity) || 0
                })
            });
            const data = await response.json();
            if (data.success) {
                setSuccessMessage('Product updated successfully!');
                loadProduct();
                setTimeout(()=>setSuccessMessage(null), 3000);
            } else {
                setError(data.error || 'Failed to update product');
            }
        } catch (err) {
            console.error('Error updating product:', err);
            setError(err.message || 'Failed to update product');
        } finally{
            setSaving(false);
        }
    };
    const handleDelete = async ()=>{
        if (!productId) return;
        if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            return;
        }
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                setSuccessMessage('Product deleted successfully');
                setTimeout(()=>{
                    router.push('/dashboard/products');
                }, 1000);
            } else {
                setError(data.error || 'Failed to delete product');
            }
        } catch (err) {
            console.error('Error deleting product:', err);
            setError(err.message || 'Failed to delete product');
        }
    };
    if (!user || loadingProduct) {
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
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        id: "776cdcbc0448e4ea",
                        children: "@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"
                    }, void 0, false, void 0, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            marginTop: '16px',
                            color: '#666',
                            fontSize: '14px'
                        },
                        className: "jsx-776cdcbc0448e4ea",
                        children: "Loading product..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                lineNumber: 162,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
            lineNumber: 155,
            columnNumber: 12
        }, this);
    }
    if (error && !product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DashboardLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            title: "Error",
            description: "Failed to load product",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'white',
                    borderRadius: '12px',
                    padding: '64px 32px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                    border: '1px solid #e8d5c4'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-exclamation-circle",
                        style: {
                            fontSize: '64px',
                            color: '#ef4444',
                            marginBottom: '16px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        },
                        children: "Error Loading Product"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: '#666',
                            fontSize: '14px',
                            marginBottom: '24px'
                        },
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/dashboard/products'),
                        style: {
                            padding: '10px 24px',
                            background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        },
                        children: "Back to Products"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                lineNumber: 190,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
            lineNumber: 189,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "1a2218f16ba3bdb4",
                children: "@media (width<=768px){.product-form-grid.jsx-1a2218f16ba3bdb4{grid-template-columns:1fr!important}.action-bar.jsx-1a2218f16ba3bdb4{flex-direction:column!important;gap:12px!important}.action-bar.jsx-1a2218f16ba3bdb4 button.jsx-1a2218f16ba3bdb4{width:100%!important}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DashboardLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: `Edit Product${product ? `: ${product.name}` : ''}`,
                description: "Update product details, manage images, and configure settings.",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            marginBottom: '24px',
                            boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                            border: '1px solid #e8d5c4',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        },
                        className: "jsx-1a2218f16ba3bdb4" + " " + "action-bar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push('/dashboard/products'),
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    background: 'transparent',
                                    color: '#666',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.background = 'rgba(193, 154, 107, 0.05)';
                                    e.currentTarget.style.color = '#c19a6b';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#666';
                                },
                                className: "jsx-1a2218f16ba3bdb4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "jsx-1a2218f16ba3bdb4" + " " + "fas fa-arrow-left"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                        lineNumber: 281,
                                        columnNumber: 11
                                    }, this),
                                    "Back to Products"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                lineNumber: 261,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleDelete,
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    background: 'transparent',
                                    color: '#ef4444',
                                    border: '1px solid #fecaca',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.background = '#ef4444';
                                    e.currentTarget.style.color = 'white';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#ef4444';
                                },
                                className: "jsx-1a2218f16ba3bdb4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "jsx-1a2218f16ba3bdb4" + " " + "fas fa-trash"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                        lineNumber: 305,
                                        columnNumber: 11
                                    }, this),
                                    "Delete Product"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                lineNumber: 285,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 250,
                        columnNumber: 7
                    }, this),
                    successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        },
                        className: "jsx-1a2218f16ba3bdb4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                style: {
                                    fontSize: '20px',
                                    color: '#16a34a'
                                },
                                className: "jsx-1a2218f16ba3bdb4" + " " + "fas fa-check-circle"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#16a34a',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    margin: 0
                                },
                                className: "jsx-1a2218f16ba3bdb4",
                                children: successMessage
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 311,
                        columnNumber: 26
                    }, this),
                    error && product && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        },
                        className: "jsx-1a2218f16ba3bdb4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                style: {
                                    fontSize: '20px',
                                    color: '#ef4444'
                                },
                                className: "jsx-1a2218f16ba3bdb4" + " " + "fas fa-exclamation-circle"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#ef4444',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    margin: 0
                                },
                                className: "jsx-1a2218f16ba3bdb4",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 335,
                        columnNumber: 28
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: '12px',
                            padding: '24px',
                            marginBottom: '24px',
                            boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                            border: '1px solid #e8d5c4'
                        },
                        className: "jsx-1a2218f16ba3bdb4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '24px'
                                },
                                className: "jsx-1a2218f16ba3bdb4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        style: {
                                            fontSize: '20px',
                                            color: '#c19a6b'
                                        },
                                        className: "jsx-1a2218f16ba3bdb4" + " " + "fas fa-edit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                        lineNumber: 374,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            color: '#333',
                                            margin: 0
                                        },
                                        className: "jsx-1a2218f16ba3bdb4",
                                        children: "Product Details"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                        lineNumber: 378,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                lineNumber: 368,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "jsx-1a2218f16ba3bdb4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '20px'
                                    },
                                    className: "jsx-1a2218f16ba3bdb4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1a2218f16ba3bdb4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        display: 'block',
                                                        fontSize: '13px',
                                                        fontWeight: '600',
                                                        color: '#666',
                                                        marginBottom: '8px'
                                                    },
                                                    className: "jsx-1a2218f16ba3bdb4",
                                                    children: "Product Name *"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "name",
                                                    value: formData.name,
                                                    onChange: handleInputChange,
                                                    required: true,
                                                    style: {
                                                        width: '100%',
                                                        padding: '10px 14px',
                                                        border: '1px solid #e8d5c4',
                                                        borderRadius: '8px',
                                                        fontSize: '14px',
                                                        outline: 'none'
                                                    },
                                                    className: "jsx-1a2218f16ba3bdb4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                    lineNumber: 405,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                            lineNumber: 395,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1a2218f16ba3bdb4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        display: 'block',
                                                        fontSize: '13px',
                                                        fontWeight: '600',
                                                        color: '#666',
                                                        marginBottom: '8px'
                                                    },
                                                    className: "jsx-1a2218f16ba3bdb4",
                                                    children: "Description *"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                    lineNumber: 417,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    name: "description",
                                                    value: formData.description,
                                                    onChange: handleInputChange,
                                                    required: true,
                                                    rows: 4,
                                                    style: {
                                                        width: '100%',
                                                        padding: '10px 14px',
                                                        border: '1px solid #e8d5c4',
                                                        borderRadius: '8px',
                                                        fontSize: '14px',
                                                        outline: 'none',
                                                        fontFamily: 'inherit',
                                                        resize: 'vertical'
                                                    },
                                                    className: "jsx-1a2218f16ba3bdb4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                    lineNumber: 426,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                            lineNumber: 416,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr 1fr',
                                                gap: '20px'
                                            },
                                            className: "jsx-1a2218f16ba3bdb4" + " " + "product-form-grid",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1a2218f16ba3bdb4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            style: {
                                                                display: 'block',
                                                                fontSize: '13px',
                                                                fontWeight: '600',
                                                                color: '#666',
                                                                marginBottom: '8px'
                                                            },
                                                            className: "jsx-1a2218f16ba3bdb4",
                                                            children: "Price (₹) *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                            lineNumber: 445,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            name: "price",
                                                            value: formData.price,
                                                            onChange: handleInputChange,
                                                            required: true,
                                                            min: "0",
                                                            step: "0.01",
                                                            style: {
                                                                width: '100%',
                                                                padding: '10px 14px',
                                                                border: '1px solid #e8d5c4',
                                                                borderRadius: '8px',
                                                                fontSize: '14px',
                                                                outline: 'none'
                                                            },
                                                            className: "jsx-1a2218f16ba3bdb4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                            lineNumber: 454,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1a2218f16ba3bdb4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            style: {
                                                                display: 'block',
                                                                fontSize: '13px',
                                                                fontWeight: '600',
                                                                color: '#666',
                                                                marginBottom: '8px'
                                                            },
                                                            className: "jsx-1a2218f16ba3bdb4",
                                                            children: "Stock Quantity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                            lineNumber: 465,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            name: "stock_quantity",
                                                            value: formData.stock_quantity,
                                                            onChange: handleInputChange,
                                                            min: "0",
                                                            style: {
                                                                width: '100%',
                                                                padding: '10px 14px',
                                                                border: '1px solid #e8d5c4',
                                                                borderRadius: '8px',
                                                                fontSize: '14px',
                                                                outline: 'none'
                                                            },
                                                            className: "jsx-1a2218f16ba3bdb4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                            lineNumber: 474,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                    lineNumber: 464,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1a2218f16ba3bdb4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            style: {
                                                                display: 'block',
                                                                fontSize: '13px',
                                                                fontWeight: '600',
                                                                color: '#666',
                                                                marginBottom: '8px'
                                                            },
                                                            className: "jsx-1a2218f16ba3bdb4",
                                                            children: "Category"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                            lineNumber: 485,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            name: "category",
                                                            value: formData.category,
                                                            onChange: handleInputChange,
                                                            style: {
                                                                width: '100%',
                                                                padding: '10px 14px',
                                                                border: '1px solid #e8d5c4',
                                                                borderRadius: '8px',
                                                                fontSize: '14px',
                                                                outline: 'none',
                                                                cursor: 'pointer',
                                                                background: 'white'
                                                            },
                                                            className: "jsx-1a2218f16ba3bdb4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    className: "jsx-1a2218f16ba3bdb4",
                                                                    children: "Select category"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                                    lineNumber: 504,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Living Room",
                                                                    className: "jsx-1a2218f16ba3bdb4",
                                                                    children: "Living Room"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                                    lineNumber: 505,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Dining Room",
                                                                    className: "jsx-1a2218f16ba3bdb4",
                                                                    children: "Dining Room"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                                    lineNumber: 506,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Bedroom",
                                                                    className: "jsx-1a2218f16ba3bdb4",
                                                                    children: "Bedroom"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                                    lineNumber: 507,
                                                                    columnNumber: 19
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Office",
                                                                    className: "jsx-1a2218f16ba3bdb4",
                                                                    children: "Office"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                                    lineNumber: 508,
                                                                    columnNumber: 19
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                    lineNumber: 484,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                            lineNumber: 439,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                paddingTop: '12px'
                                            },
                                            className: "jsx-1a2218f16ba3bdb4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: saving,
                                                style: {
                                                    padding: '10px 32px',
                                                    background: saving ? '#999' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    cursor: saving ? 'not-allowed' : 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: '0 2px 8px rgba(193, 154, 107, 0.2)'
                                                },
                                                className: "jsx-1a2218f16ba3bdb4",
                                                children: saving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: '16px',
                                                                height: '16px',
                                                                border: '2px solid #ffffff',
                                                                borderTop: '2px solid transparent',
                                                                borderRadius: '50%',
                                                                animation: 'spin 0.8s linear infinite'
                                                            },
                                                            className: "jsx-1a2218f16ba3bdb4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                            lineNumber: 535,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Saving..."
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "jsx-1a2218f16ba3bdb4" + " " + "fas fa-save"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                            lineNumber: 545,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Save Changes"
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                                lineNumber: 519,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                            lineNumber: 514,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                    lineNumber: 389,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                                lineNumber: 388,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 360,
                        columnNumber: 7
                    }, this),
                    product && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: '12px',
                            padding: '24px',
                            boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                            border: '1px solid #e8d5c4'
                        },
                        className: "jsx-1a2218f16ba3bdb4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductImageManager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            productId: product.id,
                            images: product.images,
                            onImagesChange: loadProduct
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                            lineNumber: 562,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                        lineNumber: 555,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/[id]/page.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(EditProductPage, "+dSwYWeCebpcVq2SQ/oi3dw4o8Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = EditProductPage;
var _c;
__turbopack_context__.k.register(_c, "EditProductPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_cd118634._.js.map