(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/styles/HeaderStyles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Header styles
__turbopack_context__.s([
    "CartCount",
    ()=>CartCount,
    "HeaderContainer",
    ()=>HeaderContainer,
    "HeaderIcons",
    ()=>HeaderIcons,
    "HeaderLink",
    ()=>HeaderLink,
    "HeaderLogo",
    ()=>HeaderLogo,
    "HeaderMenu",
    ()=>HeaderMenu,
    "MobileMenuToggle",
    ()=>MobileMenuToggle,
    "NavIcon",
    ()=>NavIcon,
    "SharedHeader",
    ()=>SharedHeader,
    "UserGreeting",
    ()=>UserGreeting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const SharedHeader = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "HeaderStyles__SharedHeader",
    componentId: "sc-2ajkgs-0"
})([
    "background-color:rgba(255,255,255,0.95);backdrop-filter:blur(10px);box-shadow:0 2px 20px rgba(0,0,0,0.08);position:sticky;top:0;z-index:1000;padding:15px 0;font-family:'Playfair Display',serif;transition:all 0.4s ease;border-bottom:1px solid rgba(193,154,107,0.1);width:100%;@media (max-width:768px){padding:10px 0;}"
]);
const HeaderContainer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "HeaderStyles__HeaderContainer",
    componentId: "sc-2ajkgs-1"
})([
    "display:flex;justify-content:space-between;align-items:center;max-width:1400px;margin:0 auto;padding:0 40px;gap:20px;width:100%;box-sizing:border-box;@media (max-width:992px){padding:0 20px;gap:12px;}@media (max-width:768px){padding:0 10px;gap:8px;}@media (max-width:480px){padding:0 8px;gap:6px;}"
]);
const HeaderLogo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "HeaderStyles__HeaderLogo",
    componentId: "sc-2ajkgs-2"
})([
    "display:flex;align-items:center;flex-shrink:0;min-width:fit-content;a{text-decoration:none;display:flex;align-items:center;opacity:1 !important;&:hover{opacity:1 !important;}}.logo-image{height:80px;max-height:80px;object-fit:contain;transition:transform 0.3s ease;opacity:1 !important;&:hover{transform:scale(1.02);opacity:1 !important;}@media (max-width:768px){height:55px;max-height:55px;}@media (max-width:480px){height:45px;max-height:45px;}}"
]);
const HeaderMenu = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "HeaderStyles__HeaderMenu",
    componentId: "sc-2ajkgs-3"
})([
    "display:flex;gap:35px;flex:1;justify-content:center;min-width:0;overflow:hidden;@media (max-width:1200px){gap:25px;}@media (max-width:1024px){gap:15px;}@media (max-width:900px){display:none;}"
]);
const HeaderLink = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].a.withConfig({
    displayName: "HeaderStyles__HeaderLink",
    componentId: "sc-2ajkgs-4"
})([
    "text-decoration:none;color:",
    ";font-weight:400;font-size:13px;text-transform:uppercase;letter-spacing:1.2px;transition:all 0.3s ease;position:relative;padding:10px 0;display:inline-block;font-family:var(--font-montserrat),'Montserrat',sans-serif;white-space:nowrap;flex-shrink:0;@media (max-width:1200px){font-size:12px;letter-spacing:1px;}@media (max-width:1024px){font-size:11px;letter-spacing:0.5px;padding:8px 0;}&:hover{color:#c19a6b;}&::before{content:'';position:absolute;width:0;height:2px;bottom:0;left:0;background:linear-gradient(to right,#c19a6b,transparent);transition:width 0.4s ease;}&::after{content:'';position:absolute;width:",
    ";height:2px;bottom:0;right:0;background:linear-gradient(to left,#c19a6b,transparent);transition:width 0.4s ease;}&:hover::before{width:100%;}&::after{",
    "}&:hover{transform:translateY(-2px);}"
], (props)=>props.$active ? '#c19a6b' : '#333', (props)=>props.$active ? '100%' : '0', (props)=>props.$active && `
      width: 100%;
    `);
const HeaderIcons = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "HeaderStyles__HeaderIcons",
    componentId: "sc-2ajkgs-5"
})([
    "display:flex;gap:20px;align-items:center;flex-shrink:0;min-width:fit-content;@media (max-width:992px){gap:12px;}@media (max-width:768px){gap:8px;}@media (max-width:480px){gap:4px;}@media (max-width:360px){gap:2px;}"
]);
const CartCount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].span.withConfig({
    displayName: "HeaderStyles__CartCount",
    componentId: "sc-2ajkgs-6"
})([
    "position:absolute;top:-10px;right:-10px;background:linear-gradient(135deg,#c19a6b,#a8825f);color:white;border-radius:50%;width:22px;height:22px;font-size:12px;display:flex;align-items:center;justify-content:center;font-weight:600;box-shadow:0 2px 8px rgba(193,154,107,0.3);@media (max-width:480px){width:18px;height:18px;font-size:10px;top:-8px;right:-8px;}@media (max-width:360px){width:16px;height:16px;font-size:9px;top:-6px;right:-6px;}"
]);
const UserGreeting = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].span.withConfig({
    displayName: "HeaderStyles__UserGreeting",
    componentId: "sc-2ajkgs-7"
})([
    "color:#333;font-family:'Montserrat',sans-serif;font-size:15px;margin:0 10px;font-weight:500;text-align:right;"
]);
const NavIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "HeaderStyles__NavIcon",
    componentId: "sc-2ajkgs-8"
})([
    "background:none;border:none;font-size:20px;cursor:pointer;color:#333;transition:all 0.3s ease;position:relative;padding:8px;border-radius:4px;flex-shrink:0;min-width:36px;display:flex;align-items:center;justify-content:center;&:hover{color:#c19a6b;background-color:rgba(193,154,107,0.08);transform:translateY(-2px);}@media (max-width:768px){font-size:18px;padding:5px;min-width:32px;}@media (max-width:480px){font-size:16px;padding:4px;min-width:28px;}@media (max-width:360px){font-size:15px;padding:3px;min-width:26px;}"
]);
const MobileMenuToggle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "HeaderStyles__MobileMenuToggle",
    componentId: "sc-2ajkgs-9"
})([
    "display:none;flex-direction:column;background:none;border:none;cursor:pointer;padding:5px;flex-shrink:0;@media (max-width:768px){display:flex;}@media (max-width:480px){padding:3px;}span{width:25px;height:3px;background-color:#333;margin:3px 0;transition:0.3s;border-radius:2px;@media (max-width:480px){width:20px;height:2.5px;margin:2.5px 0;}@media (max-width:360px){width:18px;height:2px;margin:2px 0;}}"
]);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LoginModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const LoginModal = ({ isOpen, onClose })=>{
    _s();
    const { signInWithGoogle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const modalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginModal.useEffect": ()=>{
            const handleClickOutside = {
                "LoginModal.useEffect.handleClickOutside": (event)=>{
                    if (modalRef.current && !modalRef.current.contains(event.target)) {
                        onClose();
                    }
                }
            }["LoginModal.useEffect.handleClickOutside"];
            if (isOpen) document.addEventListener('mousedown', handleClickOutside);
            return ({
                "LoginModal.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["LoginModal.useEffect"];
        }
    }["LoginModal.useEffect"], [
        isOpen,
        onClose
    ]);
    // Close on ESC
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginModal.useEffect": ()=>{
            const handleEscKey = {
                "LoginModal.useEffect.handleEscKey": (event)=>{
                    if (event.key === 'Escape') onClose();
                }
            }["LoginModal.useEffect.handleEscKey"];
            if (isOpen) document.addEventListener('keydown', handleEscKey);
            return ({
                "LoginModal.useEffect": ()=>document.removeEventListener('keydown', handleEscKey)
            })["LoginModal.useEffect"];
        }
    }["LoginModal.useEffect"], [
        isOpen,
        onClose
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",
        style: {
            backdropFilter: 'blur(2px)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: modalRef,
            className: "bg-white rounded-lg shadow-lg w-60 overflow-hidden relative",
            style: {
                fontFamily: 'Playfair Display, serif',
                border: '1px solid #c19a6b',
                boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
                backgroundColor: '#ffffff',
                // Fully opaque white background
                minWidth: '240px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: " top-3  text-gray-800 hover:text-gray-900 focus:outline-none z-10 transition-colors duration-200",
                    style: {
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(248, 244, 240, 0.7)',
                        borderRadius: '50%',
                        padding: '2px',
                        align: 'right',
                        position: 'absolute',
                        right: '10px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-5 h-5",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LoginModal.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/LoginModal.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/LoginModal.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 border-b",
                    style: {
                        background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold text-center mb-1",
                            style: {
                                color: '#333333'
                            },
                            align: "center",
                            children: "Welcome"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LoginModal.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-600 text-center",
                            style: {
                                fontFamily: 'Montserrat, sans-serif',
                                lineHeight: '1'
                            },
                            align: "center",
                            children: "Sign in to access your account"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LoginModal.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LoginModal.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 pt-4",
                    style: {
                        backgroundColor: '#fffaf5'
                    },
                    align: "center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: async ()=>{
                                try {
                                    await signInWithGoogle();
                                } catch (err) {
                                    console.error('Google sign-in error:', err);
                                }
                            },
                            className: "w-full flex items-center justify-center px-3 py-2 rounded-md text-xs font-medium  text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 hover:border-amber-500 transition-all duration-200 shadow-sm hover:shadow-md",
                            style: {
                                fontFamily: 'Montserrat, sans-serif',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                minHeight: '42px',
                                minWidth: '42px',
                                paddingRight: '12px',
                                paddingLeft: '12px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "18",
                                height: "18",
                                viewBox: "0 0 48 48",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#EA4335",
                                        d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.61 0 6.51 5.38 2.56 13.19l7.98 6.19C12.43 12.03 17.74 9.5 24 9.5z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LoginModal.tsx",
                                        lineNumber: 110,
                                        columnNumber: 3
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#4285F4",
                                        d: "M46.1 24.5c0-1.57-.15-3.09-.43-4.5H24v9h12.65c-.55 2.94-2.22 5.44-4.72 7.11l7.23 5.65C43.81 37.41 46.1 31.36 46.1 24.5z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LoginModal.tsx",
                                        lineNumber: 111,
                                        columnNumber: 3
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#FBBC05",
                                        d: "M10.54 28.19c-.48-1.45-.74-2.99-.74-4.59s.26-3.14.74-4.59L2.56 12.81A23.85 23.85 0 000 23.6c0 3.9.93 7.59 2.56 10.79l7.98-6.2z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LoginModal.tsx",
                                        lineNumber: 112,
                                        columnNumber: 3
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#34A853",
                                        d: "M24 48c6.47 0 11.96-2.13 15.94-5.78l-7.23-5.65c-2.03 1.37-4.63 2.18-7.71 2.18-6.26 0-11.57-3.53-14.46-8.7l-7.98 6.2C6.51 42.62 14.61 48 24 48z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LoginModal.tsx",
                                        lineNumber: 113,
                                        columnNumber: 3
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LoginModal.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/LoginModal.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: [
                                    "By signing in, you agree to our",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-700 font-medium",
                                        children: "Terms"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LoginModal.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LoginModal.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/LoginModal.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LoginModal.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/LoginModal.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/LoginModal.tsx",
        lineNumber: 38,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LoginModal, "yL1FDqQYzn3cDiTl0SS359dLFu4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = LoginModal;
const __TURBOPACK__default__export__ = LoginModal;
var _c;
__turbopack_context__.k.register(_c, "LoginModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/UserMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoginModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LoginModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/styles/HeaderStyles.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const UserMenu = ({ onNavigate })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { items, cartCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])(); // Get both items and cartCount
    // Debug logging
    console.log('🔍 UserMenu - Current user:', user);
    console.log('🔍 UserMenu - User avatar:', user?.avatar);
    console.log('🔍 UserMenu - Has avatar:', !!user?.avatar);
    console.log('🔍 UserMenu - Cart count:', cartCount);
    console.log('🔍 UserMenu - User exists:', !!user);
    const [isDropdownOpen, setIsDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const closeAuthModal = ()=>{
        setIsAuthModalOpen(false);
        // Clear pending cart action if user closes modal without logging in
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('pendingCartAction');
        }
    };
    const handleLogout = ()=>{
        logout();
        onNavigate('/');
        setIsDropdownOpen(false);
    };
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserMenu.useEffect": ()=>{
            const handleClickOutside = {
                "UserMenu.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setIsDropdownOpen(false);
                    }
                }
            }["UserMenu.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "UserMenu.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["UserMenu.useEffect"];
        }
    }["UserMenu.useEffect"], []);
    // Listen for showLoginModal event (triggered when user tries to add to cart without logging in)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserMenu.useEffect": ()=>{
            const handleShowLoginModal = {
                "UserMenu.useEffect.handleShowLoginModal": ()=>{
                    console.log('🔑 Login required: User tried to add item to cart');
                    setIsAuthModalOpen(true);
                }
            }["UserMenu.useEffect.handleShowLoginModal"];
            window.addEventListener('showLoginModal', handleShowLoginModal);
            return ({
                "UserMenu.useEffect": ()=>{
                    window.removeEventListener('showLoginModal', handleShowLoginModal);
                }
            })["UserMenu.useEffect"];
        }
    }["UserMenu.useEffect"], []);
    // Process pending cart action after successful login
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserMenu.useEffect": ()=>{
            if (user && ("TURBOPACK compile-time value", "object") !== 'undefined') {
                const pendingAction = localStorage.getItem('pendingCartAction');
                if (pendingAction) {
                    try {
                        const { product, quantity } = JSON.parse(pendingAction);
                        console.log('🛒 Processing pending cart action after login:', product.name);
                        // Add the item to cart
                        __turbopack_context__.A("[project]/src/store/cartStore.ts [app-client] (ecmascript, async loader)").then({
                            "UserMenu.useEffect": (module)=>{
                                module.useCartStore.getState().addItem({
                                    id: Date.now(),
                                    product_id: product.id,
                                    quantity: quantity || 1,
                                    name: product.name,
                                    price: product.price,
                                    image_url: product.primary_image || product.image_url
                                });
                                console.log('✅ Item added to cart after login');
                            }
                        }["UserMenu.useEffect"]);
                        // Clear the pending action
                        localStorage.removeItem('pendingCartAction');
                    } catch (error) {
                        console.error('Error processing pending cart action:', error);
                    }
                }
            }
        }
    }["UserMenu.useEffect"], [
        user
    ]);
    const renderUserAccountIcon = ()=>{
        if (user) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0
                },
                ref: dropdownRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavIcon"], {
                        onClick: ()=>setIsDropdownOpen(!isDropdownOpen),
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            lineHeight: 0
                        },
                        children: user.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: user.avatar,
                            style: {
                                width: '24px',
                                height: '24px',
                                display: 'block'
                            },
                            className: "user-avatar-icon rounded-full object-cover",
                            alt: "avatar",
                            referrerPolicy: "no-referrer",
                            crossOrigin: "anonymous",
                            onError: (e)=>{
                                console.error('Avatar failed to load:', user.avatar);
                                e.currentTarget.style.display = 'none';
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/UserMenu.tsx",
                            lineNumber: 119,
                            columnNumber: 26
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-user"
                        }, void 0, false, {
                            fileName: "[project]/src/components/UserMenu.tsx",
                            lineNumber: 126,
                            columnNumber: 19
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/UserMenu.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    isDropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 'calc(100% + 10px)',
                            right: 0,
                            width: '280px',
                            backgroundColor: 'white',
                            border: '1px solid #e8d5c4',
                            boxShadow: '0 10px 30px rgba(193, 154, 107, 0.15)',
                            zIndex: 9999,
                            overflow: 'hidden',
                            animation: 'slideDown 0.2s ease-out'
                        },
                        className: "jsx-8a79e608e22bc54b",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                id: "8a79e608e22bc54b",
                                children: "@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}"
                            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                    padding: '20px',
                                    background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)',
                                    borderBottom: '1px solid #e8d5c4'
                                },
                                className: "jsx-8a79e608e22bc54b",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px'
                                        },
                                        className: "jsx-8a79e608e22bc54b",
                                        children: [
                                            user.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: user.avatar,
                                                style: {
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '50%',
                                                    border: '2px solid white',
                                                    objectFit: 'cover',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                },
                                                alt: user.name,
                                                referrerPolicy: "no-referrer",
                                                crossOrigin: "anonymous",
                                                onError: (e)=>{
                                                    console.error('Dropdown avatar failed to load:', user.avatar);
                                                    const parent = e.currentTarget.parentElement;
                                                    e.currentTarget.style.display = 'none';
                                                    if (parent) {
                                                        const fallback = document.createElement('div');
                                                        fallback.style.cssText = 'width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg, #e8d5c4, #c19a6b);color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:400;box-shadow:0 2px 8px rgba(0,0,0,0.1);font-family:var(--font-playfair),"Playfair Display",serif';
                                                        fallback.textContent = user.name?.charAt(0)?.toUpperCase() || 'U';
                                                        parent.appendChild(fallback);
                                                    }
                                                },
                                                className: "jsx-8a79e608e22bc54b"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 169,
                                                columnNumber: 32
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #e8d5c4, #c19a6b)',
                                                    color: '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '20px',
                                                    fontWeight: '400',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                    fontFamily: 'var(--font-playfair), "Playfair Display", serif'
                                                },
                                                className: "jsx-8a79e608e22bc54b",
                                                children: user.name?.charAt(0)?.toUpperCase() || "U"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 186,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0
                                                },
                                                className: "jsx-8a79e608e22bc54b",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontWeight: '600',
                                                            color: '#222',
                                                            fontSize: '15px',
                                                            marginBottom: '3px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                                                        },
                                                        className: "jsx-8a79e608e22bc54b",
                                                        children: user.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/UserMenu.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: '#666',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                                                        },
                                                        className: "jsx-8a79e608e22bc54b",
                                                        children: user.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/UserMenu.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UserMenu.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '5px 14px',
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            color: user.role === 'admin' ? '#991b1b' : user.role === 'moderator' ? '#92400e' : '#065f46',
                                            background: user.role === 'admin' ? '#fee2e2' : user.role === 'moderator' ? '#fef3c7' : '#d1fae5',
                                            border: `1px solid ${user.role === 'admin' ? '#fecaca' : user.role === 'moderator' ? '#fde68a' : '#a7f3d0'}`,
                                            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                                            alignSelf: 'flex-start'
                                        },
                                        className: "jsx-8a79e608e22bc54b",
                                        children: user.role
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UserMenu.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UserMenu.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '8px 0'
                                },
                                className: "jsx-8a79e608e22bc54b",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onNavigate("/account");
                                            setIsDropdownOpen(false);
                                        },
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            width: '100%',
                                            padding: '12px 20px',
                                            fontSize: '14px',
                                            color: '#333',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.background = 'rgba(193, 154, 107, 0.08)';
                                            e.currentTarget.style.color = '#c19a6b';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#333';
                                        },
                                        className: "jsx-8a79e608e22bc54b",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                style: {
                                                    width: '18px',
                                                    textAlign: 'center',
                                                    color: '#c19a6b'
                                                },
                                                className: "jsx-8a79e608e22bc54b" + " " + "fas fa-user-circle"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 279,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-8a79e608e22bc54b",
                                                children: "Account Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 284,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UserMenu.tsx",
                                        lineNumber: 256,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onNavigate("/orders");
                                            setIsDropdownOpen(false);
                                        },
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            width: '100%',
                                            padding: '12px 20px',
                                            fontSize: '14px',
                                            color: '#333',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.background = 'rgba(193, 154, 107, 0.08)';
                                            e.currentTarget.style.color = '#c19a6b';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#333';
                                        },
                                        className: "jsx-8a79e608e22bc54b",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                style: {
                                                    width: '18px',
                                                    textAlign: 'center',
                                                    color: '#c19a6b'
                                                },
                                                className: "jsx-8a79e608e22bc54b" + " " + "fas fa-history"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 310,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-8a79e608e22bc54b",
                                                children: "Order History"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UserMenu.tsx",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    (user.role === "admin" || user.role === "moderator") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: '1px',
                                                    background: '#f0f0f0',
                                                    margin: '8px 20px'
                                                },
                                                className: "jsx-8a79e608e22bc54b"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 319,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    onNavigate("/dashboard");
                                                    setIsDropdownOpen(false);
                                                },
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    width: '100%',
                                                    padding: '12px 20px',
                                                    fontSize: '14px',
                                                    color: '#333',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.background = 'rgba(193, 154, 107, 0.08)';
                                                    e.currentTarget.style.color = '#c19a6b';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = '#333';
                                                },
                                                className: "jsx-8a79e608e22bc54b",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        style: {
                                                            width: '18px',
                                                            textAlign: 'center',
                                                            color: '#c19a6b'
                                                        },
                                                        className: "jsx-8a79e608e22bc54b" + " " + "fas fa-tachometer-alt"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/UserMenu.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-8a79e608e22bc54b",
                                                        children: "Admin Dashboard"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/UserMenu.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 324,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: '1px',
                                            background: '#f0f0f0',
                                            margin: '8px 20px'
                                        },
                                        className: "jsx-8a79e608e22bc54b"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/UserMenu.tsx",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLogout,
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            width: '100%',
                                            padding: '12px 20px',
                                            fontSize: '14px',
                                            color: '#dc2626',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.08)';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = 'transparent';
                                        },
                                        className: "jsx-8a79e608e22bc54b",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                style: {
                                                    width: '18px',
                                                    textAlign: 'center',
                                                    color: '#dc2626'
                                                },
                                                className: "jsx-8a79e608e22bc54b" + " " + "fas fa-sign-out-alt"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 380,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-8a79e608e22bc54b",
                                                children: "Log Out"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/UserMenu.tsx",
                                                lineNumber: 385,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/UserMenu.tsx",
                                        lineNumber: 362,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/UserMenu.tsx",
                                lineNumber: 253,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/UserMenu.tsx",
                        lineNumber: 130,
                        columnNumber: 28
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UserMenu.tsx",
                lineNumber: 107,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        }
        // NOT LOGGED IN
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavIcon"], {
            onClick: ()=>setIsAuthModalOpen(true),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "fas fa-user text-xl"
            }, void 0, false, {
                fileName: "[project]/src/components/UserMenu.tsx",
                lineNumber: 394,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/UserMenu.tsx",
            lineNumber: 393,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "dd47596b8753b80",
                children: ".user-avatar-icon.jsx-dd47596b8753b80{width:24px;height:24px;display:block}@media (width<=480px){.user-avatar-icon.jsx-dd47596b8753b80{width:20px!important;height:20px!important}}@media (width<=360px){.user-avatar-icon.jsx-dd47596b8753b80{width:18px!important;height:18px!important}}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0)),
            user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0
                },
                className: "jsx-dd47596b8753b80",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavIcon"], {
                        onClick: ()=>onNavigate('/cart'),
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            lineHeight: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "jsx-dd47596b8753b80" + " " + "fas fa-shopping-cart"
                        }, void 0, false, {
                            fileName: "[project]/src/components/UserMenu.tsx",
                            lineNumber: 433,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/UserMenu.tsx",
                        lineNumber: 427,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartCount"], {
                        children: cartCount
                    }, void 0, false, {
                        fileName: "[project]/src/components/UserMenu.tsx",
                        lineNumber: 435,
                        columnNumber: 29
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UserMenu.tsx",
                lineNumber: 421,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0)),
            user && console.log("Cart icon rendered - user is logged in"),
            !user && console.log("Cart icon not rendered - user is not logged in"),
            renderUserAccountIcon(),
            isAuthModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: '60px',
                    // Position below the header
                    right: '20px',
                    // Position on the right side of the screen
                    zIndex: 10000
                },
                className: "jsx-dd47596b8753b80",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoginModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    isOpen: isAuthModalOpen,
                    onClose: closeAuthModal
                }, void 0, false, {
                    fileName: "[project]/src/components/UserMenu.tsx",
                    lineNumber: 452,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/UserMenu.tsx",
                lineNumber: 444,
                columnNumber: 27
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(UserMenu, "vBxzXt1Wn9BJm0uS2Jo3E4SmAuk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = UserMenu;
const __TURBOPACK__default__export__ = UserMenu;
var _c;
__turbopack_context__.k.register(_c, "UserMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MobileMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const MobileMenu = ({ isOpen, onClose, onNavigate, activePage = '' })=>{
    _s();
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    if (!isOpen) return null;
    const handleLogout = ()=>{
        logout();
        onNavigate('/');
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mobile-menu",
        style: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: 'white',
            boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
            padding: '20px 0',
            zIndex: 999,
            gap: '0'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu-item",
                style: {
                    padding: '15px 40px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                },
                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                onClick: ()=>{
                    onNavigate('/');
                    onClose();
                },
                children: "Home"
            }, void 0, false, {
                fileName: "[project]/src/components/MobileMenu.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu-item",
                style: {
                    padding: '15px 40px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                },
                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                onClick: ()=>{
                    onNavigate('/shop');
                    onClose();
                },
                children: "Shop"
            }, void 0, false, {
                fileName: "[project]/src/components/MobileMenu.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu-item",
                style: {
                    padding: '15px 40px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                },
                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                onClick: ()=>{
                    onNavigate('/portfolio');
                    onClose();
                },
                children: "Portfolio"
            }, void 0, false, {
                fileName: "[project]/src/components/MobileMenu.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu-item",
                style: {
                    padding: '15px 40px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                },
                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                onClick: ()=>{
                    onNavigate('/services');
                    onClose();
                },
                children: "Services"
            }, void 0, false, {
                fileName: "[project]/src/components/MobileMenu.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu-item",
                style: {
                    padding: '15px 40px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                },
                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                onClick: ()=>{
                    onNavigate('/booking');
                    onClose();
                },
                children: "Book Consultation"
            }, void 0, false, {
                fileName: "[project]/src/components/MobileMenu.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            user && (user.role === 'admin' || user.role === 'moderator') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu-item",
                style: {
                    padding: '15px 40px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                },
                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                onClick: ()=>{
                    onNavigate('/dashboard');
                    onClose();
                },
                children: "Dashboard"
            }, void 0, false, {
                fileName: "[project]/src/components/MobileMenu.tsx",
                lineNumber: 91,
                columnNumber: 72
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu-item",
                style: {
                    padding: '15px 40px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                },
                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                onClick: ()=>{
                    onNavigate('/about');
                    onClose();
                },
                children: "About"
            }, void 0, false, {
                fileName: "[project]/src/components/MobileMenu.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu-item",
                style: {
                    padding: '15px 40px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                },
                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                onClick: ()=>{
                    onNavigate('/contact');
                    onClose();
                },
                children: "Contact"
            }, void 0, false, {
                fileName: "[project]/src/components/MobileMenu.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            !user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu-item",
                style: {
                    padding: '15px 40px',
                    backgroundColor: '#fef3c7',
                    // amber-100 equivalent
                    color: '#92400e',
                    // amber-700 equivalent
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    fontWeight: '500'
                },
                onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#fde68a',
                onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '#fef3c7',
                onClick: ()=>{
                    onNavigate('/login');
                    onClose();
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-user",
                        style: {
                            marginRight: '10px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/MobileMenu.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Sign In"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MobileMenu.tsx",
                lineNumber: 121,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobile-menu-item",
                        style: {
                            padding: '15px 40px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        },
                        onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                        onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                        onClick: ()=>{
                            onNavigate('/account');
                            onClose();
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-user-circle",
                                style: {
                                    marginRight: '10px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/MobileMenu.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Account"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MobileMenu.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobile-menu-item",
                        style: {
                            padding: '15px 40px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        },
                        onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                        onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                        onClick: handleLogout,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-sign-out-alt",
                                style: {
                                    marginRight: '10px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/MobileMenu.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Logout"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MobileMenu.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    (user.role === 'admin' || user.role === 'moderator') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobile-menu-item",
                        style: {
                            padding: '15px 40px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        },
                        onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = '#f8f9fa',
                        onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = '',
                        onClick: ()=>{
                            onNavigate('/dashboard');
                            onClose();
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-tachometer-alt",
                                style: {
                                    marginRight: '10px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/MobileMenu.tsx",
                                lineNumber: 172,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Dashboard"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MobileMenu.tsx",
                        lineNumber: 164,
                        columnNumber: 68
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MobileMenu.tsx",
                lineNumber: 140,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MobileMenu.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MobileMenu, "mK8Jec3ahU24R8k1D55T5S+thrE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = MobileMenu;
const __TURBOPACK__default__export__ = MobileMenu;
var _c;
__turbopack_context__.k.register(_c, "MobileMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SearchBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const SearchBar = ({ isOpen, onToggle })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSearch = (e)=>{
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            onToggle(); // Close the search bar after search
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            backgroundColor: '#f9fafb',
            padding: '15px 20px',
            borderBottom: '1px solid #e5e7eb',
            zIndex: 999
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSearch,
                style: {
                    display: 'flex',
                    width: '100%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: searchQuery,
                        onChange: (e)=>setSearchQuery(e.target.value),
                        placeholder: "Search products by name, category...",
                        style: {
                            flex: 1,
                            padding: '12px 15px',
                            fontSize: '16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px 0 0 4px',
                            outline: 'none'
                        },
                        autoFocus: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBar.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        style: {
                            padding: '12px 20px',
                            backgroundColor: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0 4px 4px 0',
                            cursor: 'pointer',
                            fontSize: '16px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-search"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SearchBar.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBar.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onToggle,
                        style: {
                            marginLeft: '10px',
                            padding: '12px 15px',
                            backgroundColor: '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-times"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SearchBar.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBar.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBar.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/SearchBar.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/SearchBar.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SearchBar, "JbivL2BM6NmsD/1Vf3SyNbZjqaM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SearchBar;
const __TURBOPACK__default__export__ = SearchBar;
var _c;
__turbopack_context__.k.register(_c, "SearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/NavLinks.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/styles/HeaderStyles.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const NavLinks = ({ activePage = '', onNavigate })=>{
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                href: "#",
                $active: activePage === 'home',
                onClick: (e)=>{
                    e.preventDefault();
                    onNavigate('/');
                },
                children: "Home"
            }, void 0, false, {
                fileName: "[project]/src/components/NavLinks.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                href: "#",
                $active: activePage === 'shop',
                onClick: (e)=>{
                    e.preventDefault();
                    onNavigate('/shop');
                },
                children: "Shop"
            }, void 0, false, {
                fileName: "[project]/src/components/NavLinks.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                href: "#",
                $active: activePage === 'portfolio',
                onClick: (e)=>{
                    e.preventDefault();
                    onNavigate('/portfolio');
                },
                children: "Portfolio"
            }, void 0, false, {
                fileName: "[project]/src/components/NavLinks.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                href: "#",
                $active: activePage === 'services',
                onClick: (e)=>{
                    e.preventDefault();
                    onNavigate('/services');
                },
                children: "Services"
            }, void 0, false, {
                fileName: "[project]/src/components/NavLinks.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                href: "#",
                $active: activePage === 'booking',
                onClick: (e)=>{
                    e.preventDefault();
                    onNavigate('/booking');
                },
                children: "Book Consultation"
            }, void 0, false, {
                fileName: "[project]/src/components/NavLinks.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            user && (user.role === 'admin' || user.role === 'moderator') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                href: "#",
                $active: activePage === 'dashboard',
                onClick: (e)=>{
                    e.preventDefault();
                    onNavigate('/dashboard');
                },
                children: "Dashboard"
            }, void 0, false, {
                fileName: "[project]/src/components/NavLinks.tsx",
                lineNumber: 49,
                columnNumber: 72
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                href: "#",
                $active: activePage === 'about',
                onClick: (e)=>{
                    e.preventDefault();
                    onNavigate('/about');
                },
                children: "About"
            }, void 0, false, {
                fileName: "[project]/src/components/NavLinks.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                href: "#",
                $active: activePage === 'contact',
                onClick: (e)=>{
                    e.preventDefault();
                    onNavigate('/contact');
                },
                children: "Contact"
            }, void 0, false, {
                fileName: "[project]/src/components/NavLinks.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NavLinks.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(NavLinks, "WQN1piNkMjaOM8k1F55whTN++Jc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = NavLinks;
const __TURBOPACK__default__export__ = NavLinks;
var _c;
__turbopack_context__.k.register(_c, "NavLinks");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/styles/HeaderStyles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UserMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UserMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MobileMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MobileMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SearchBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavLinks$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NavLinks.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
const Header = ({ activePage = '' })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSearchOpen, setIsSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const navigate = (path)=>{
        router.push(path);
        setIsMobileMenuOpen(false); // Close mobile menu after navigation
    };
    // Toggle mobile menu
    const toggleMobileMenu = ()=>{
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    // Toggle search
    const toggleSearch = ()=>{
        setIsSearchOpen(!isSearchOpen);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SharedHeader"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderContainer"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLogo"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#",
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/');
                            },
                            className: "jsx-310df86abecdc5a",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/logo.svg",
                                alt: "Colour My Space Logo",
                                className: "jsx-310df86abecdc5a" + " " + "logo-image"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Header.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavLinks$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        activePage: activePage,
                        onNavigate: navigate
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderIcons"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleSearch,
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    color: '#333',
                                    padding: '8px',
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                className: "jsx-310df86abecdc5a" + " " + "search-btn",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "jsx-310df86abecdc5a" + " " + "fas fa-search"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UserMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onNavigate: navigate
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileMenuToggle"], {
                                onClick: toggleMobileMenu,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-310df86abecdc5a"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-310df86abecdc5a"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-310df86abecdc5a"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        id: "310df86abecdc5a",
                        children: "@media (width<=768px){.search-btn.jsx-310df86abecdc5a{padding:5px!important;font-size:18px!important}}@media (width<=480px){.search-btn.jsx-310df86abecdc5a{display:none!important}}"
                    }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MobileMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isMobileMenuOpen,
                onClose: ()=>setIsMobileMenuOpen(false),
                onNavigate: navigate,
                activePage: activePage
            }, void 0, false, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isSearchOpen,
                onToggle: toggleSearch
            }, void 0, false, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Header.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Header, "LmKUQ+U7m4esT3OJt+DMu7fT9jA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Header;
const __TURBOPACK__default__export__ = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/FooterStyles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FooterBottom",
    ()=>FooterBottom,
    "FooterColumn",
    ()=>FooterColumn,
    "FooterContainer",
    ()=>FooterContainer,
    "FooterContent",
    ()=>FooterContent,
    "FooterDescription",
    ()=>FooterDescription,
    "FooterGrid",
    ()=>FooterGrid,
    "FooterHeading",
    ()=>FooterHeading,
    "FooterList",
    ()=>FooterList,
    "FooterListItem",
    ()=>FooterListItem,
    "FooterLogo",
    ()=>FooterLogo,
    "FooterSubsection",
    ()=>FooterSubsection,
    "NewsletterSection",
    ()=>NewsletterSection,
    "SocialIcons",
    ()=>SocialIcons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const FooterContainer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].footer.withConfig({
    displayName: "FooterStyles__FooterContainer",
    componentId: "sc-1lpo1gk-0"
})([
    "background:linear-gradient(135deg,#1a1a1a 0%,#0d0d0d 100%);color:#fff;padding:80px 0 0;margin-top:auto;font-family:'Montserrat',sans-serif;@media (max-width:768px){padding:60px 0 0;}"
]);
const FooterContent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "FooterStyles__FooterContent",
    componentId: "sc-1lpo1gk-1"
})([
    "max-width:1400px;margin:0 auto;padding:0 40px 40px;@media (max-width:768px){padding:0 20px 30px;}"
]);
const FooterGrid = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "FooterStyles__FooterGrid",
    componentId: "sc-1lpo1gk-2"
})([
    "display:grid;grid-template-columns:repeat(4,1fr);gap:50px;margin-bottom:60px;@media (max-width:992px){grid-template-columns:repeat(2,1fr);gap:40px;}@media (max-width:768px){grid-template-columns:1fr;gap:30px;}"
]);
const FooterColumn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "FooterStyles__FooterColumn",
    componentId: "sc-1lpo1gk-3"
})([
    "&:nth-child(1){grid-column:span 1;@media (max-width:992px){grid-column:span 2;}}"
]);
const FooterLogo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].h3.withConfig({
    displayName: "FooterStyles__FooterLogo",
    componentId: "sc-1lpo1gk-4"
})([
    "font-family:'Playfair Display',serif;font-size:28px;margin-bottom:20px;color:#fff;letter-spacing:1px;"
]);
const FooterDescription = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "FooterStyles__FooterDescription",
    componentId: "sc-1lpo1gk-5"
})([
    "color:#ccc;line-height:1.7;margin-bottom:25px;font-size:15px;"
]);
const SocialIcons = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "FooterStyles__SocialIcons",
    componentId: "sc-1lpo1gk-6"
})([
    "display:flex;gap:15px;margin-bottom:30px;a{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background-color:rgba(255,255,255,0.1);color:#fff;font-size:16px;transition:all 0.3s ease;&:hover{background-color:#c19a6b;transform:translateY(-3px);}}"
]);
const FooterSubsection = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "FooterStyles__FooterSubsection",
    componentId: "sc-1lpo1gk-7"
})([
    "h4{font-size:16px;margin-bottom:15px;color:#c19a6b;text-transform:uppercase;letter-spacing:1.5px;}p{color:#aaa;font-size:14px;line-height:1.6;}"
]);
const FooterHeading = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].h4.withConfig({
    displayName: "FooterStyles__FooterHeading",
    componentId: "sc-1lpo1gk-8"
})([
    "font-size:18px;margin-bottom:25px;color:#fff;position:relative;padding-bottom:10px;text-transform:uppercase;letter-spacing:1.5px;&::after{content:'';position:absolute;left:0;bottom:0;width:40px;height:2px;background:linear-gradient(to right,#c19a6b,transparent);}"
]);
const FooterList = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].ul.withConfig({
    displayName: "FooterStyles__FooterList",
    componentId: "sc-1lpo1gk-9"
})([
    "list-style:none;padding:0;margin:0;"
]);
const FooterListItem = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].li.withConfig({
    displayName: "FooterStyles__FooterListItem",
    componentId: "sc-1lpo1gk-10"
})([
    "margin-bottom:15px;a{color:#ccc;text-decoration:none;transition:all 0.3s ease;position:relative;padding-left:15px;font-size:15px;&::before{content:'\u2192';position:absolute;left:0;color:#c19a6b;opacity:0;transition:all 0.3s ease;}&:hover{color:#c19a6b;padding-left:20px;&::before{opacity:1;left:5px;}}}"
]);
const FooterBottom = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "FooterStyles__FooterBottom",
    componentId: "sc-1lpo1gk-11"
})([
    "border-top:1px solid rgba(255,255,255,0.1);padding:25px 0;text-align:center;margin-top:40px;p{color:#aaa;font-size:14px;margin:0;}"
]);
const NewsletterSection = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "FooterStyles__NewsletterSection",
    componentId: "sc-1lpo1gk-12"
})([
    "margin-bottom:30px;h4{margin-bottom:15px;}.newsletter-form{display:flex;gap:10px;input{flex:1;padding:12px 15px;border:none;border-radius:4px;font-size:14px;}button{background:#c19a6b;color:white;border:none;padding:12px 20px;border-radius:4px;cursor:pointer;transition:background 0.3s ease;&:hover{background:#a8825f;}}}"
]);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/styles/FooterStyles.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const Footer = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const navigate = (path)=>{
        router.push(path);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterContainer"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterContent"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterGrid"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterColumn"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterLogo"], {
                                    children: "Colour My Space"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 19,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterDescription"], {
                                    children: "Creating extraordinary interiors that blend timeless elegance with contemporary functionality. Award-winning design services for residential and commercial spaces."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SocialIcons"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            onClick: (e)=>{
                                                e.preventDefault();
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fab fa-instagram"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 28,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 25,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            onClick: (e)=>{
                                                e.preventDefault();
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fab fa-pinterest"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 33,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            onClick: (e)=>{
                                                e.preventDefault();
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fab fa-houzz"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 38,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 35,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            onClick: (e)=>{
                                                e.preventDefault();
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fab fa-linkedin-in"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 43,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 24,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterSubsection"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            children: "Awards & Recognition"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 47,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Featured in Architectural Digest, Elle Decor, and House Beautiful"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 48,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterColumn"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterHeading"], {
                                    children: "Quick Links"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterList"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/');
                                                },
                                                children: "Home"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 56,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/portfolio');
                                                },
                                                children: "Portfolio"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 62,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services');
                                                },
                                                children: "Services"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 68,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/shop');
                                                },
                                                children: "Shop"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/about');
                                                },
                                                children: "About"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 80,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/contact');
                                                },
                                                children: "Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterColumn"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterHeading"], {
                                    children: "Services"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterList"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services#residential');
                                                },
                                                children: "Residential Design"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 98,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services#commercial');
                                                },
                                                children: "Commercial Design"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 104,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services#space-planning');
                                                },
                                                children: "Space Planning"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 110,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services#color-consulting');
                                                },
                                                children: "Color Consulting"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 116,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services#furniture-design');
                                                },
                                                children: "Furniture Design"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 122,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterColumn"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterHeading"], {
                                    children: "Shop"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterList"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/shop');
                                                },
                                                children: "All Products"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/shop');
                                                },
                                                children: "New Arrivals"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/shop');
                                                },
                                                children: "Best Sellers"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 146,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/shop');
                                                },
                                                children: "Sale Items"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/orders');
                                                },
                                                children: "Order History"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.tsx",
                                                lineNumber: 158,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Footer.tsx",
                                            lineNumber: 157,
                                            columnNumber: 24
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Footer.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FooterBottom"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "© 2023 Colour My Space Interior Design. All rights reserved."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Footer.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Footer, "oDZqiZfBBLaIfkXv6FgMIsfX0Ho=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Footer;
const __TURBOPACK__default__export__ = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/SearchStyles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApplyButton",
    ()=>ApplyButton,
    "CategoryItem",
    ()=>CategoryItem,
    "CategoryList",
    ()=>CategoryList,
    "ClearButton",
    ()=>ClearButton,
    "EmptyState",
    ()=>EmptyState,
    "FilterGroup",
    ()=>FilterGroup,
    "FiltersCard",
    ()=>FiltersCard,
    "FiltersSection",
    ()=>FiltersSection,
    "LoadingState",
    ()=>LoadingState,
    "MobileFilterToggle",
    ()=>MobileFilterToggle,
    "MobileFiltersOverlay",
    ()=>MobileFiltersOverlay,
    "MobileFiltersPanel",
    ()=>MobileFiltersPanel,
    "PriceRange",
    ()=>PriceRange,
    "ProductCard",
    ()=>ProductCard,
    "ProductImage",
    ()=>ProductImage,
    "ProductInfo",
    ()=>ProductInfo,
    "ProductsGrid",
    ()=>ProductsGrid,
    "ResultsHeader",
    ()=>ResultsHeader,
    "ResultsSection",
    ()=>ResultsSection,
    "SearchContainer",
    ()=>SearchContainer,
    "SearchContent",
    ()=>SearchContent,
    "SearchHeaderSection",
    ()=>SearchHeaderSection,
    "SearchInputWrapper",
    ()=>SearchInputWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const SearchContainer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__SearchContainer",
    componentId: "sc-un1lh1-0"
})([
    "display:flex;flex-direction:column;min-height:100vh;background:linear-gradient(135deg,#ffffff 0%,#f8f9fa 50%,#ffffff 100%);font-family:var(--font-montserrat),'Montserrat',sans-serif;"
]);
const SearchHeaderSection = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__SearchHeaderSection",
    componentId: "sc-un1lh1-1"
})([
    "padding:10px 0 20px;text-align:center;background:linear-gradient(135deg,#ffffff 0%,#f8f9fa 100%);h1{font-size:2.5rem;margin-bottom:10px;color:#222;font-weight:400;letter-spacing:2px;font-family:var(--font-playfair),'Playfair Display',serif;text-transform:uppercase;}h1::after{content:'';display:block;width:80px;height:2px;background:linear-gradient(to right,transparent,#c19a6b,transparent);margin:15px auto 0;opacity:0.7;}.search-query{color:#666;font-size:1rem;margin-top:10px;span{color:#c19a6b;font-weight:500;}}"
]);
const SearchContent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__SearchContent",
    componentId: "sc-un1lh1-2"
})([
    "max-width:1400px;margin:0 auto;padding:0 40px 60px;display:grid;grid-template-columns:280px 1fr;gap:40px;flex:1;@media (max-width:992px){grid-template-columns:1fr;padding:0 20px 40px;}"
]);
const FiltersSection = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].aside.withConfig({
    displayName: "SearchStyles__FiltersSection",
    componentId: "sc-un1lh1-3"
})([
    "@media (max-width:992px){order:-1;}"
]);
const FiltersCard = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__FiltersCard",
    componentId: "sc-un1lh1-4"
})([
    "background:white;padding:25px;box-shadow:0 5px 20px rgba(0,0,0,0.06);border:1px solid #f0f0f0;position:sticky;top:120px;h3{font-size:1.2rem;color:#222;font-weight:400;font-family:var(--font-playfair),'Playfair Display',serif;margin-bottom:20px;padding-bottom:12px;border-bottom:2px solid #f0f0f0;}@media (max-width:992px){position:static;}"
]);
const FilterGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__FilterGroup",
    componentId: "sc-un1lh1-5"
})([
    "margin-bottom:25px;&:last-child{margin-bottom:0;}h4{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#333;margin-bottom:12px;}"
]);
const CategoryList = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__CategoryList",
    componentId: "sc-un1lh1-6"
})([
    "display:flex;flex-direction:column;gap:8px;"
]);
const CategoryItem = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "SearchStyles__CategoryItem",
    componentId: "sc-un1lh1-7"
})([
    "display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:",
    ";border:1px solid ",
    ";color:",
    ";font-size:13px;font-family:var(--font-montserrat),'Montserrat',sans-serif;cursor:pointer;transition:all 0.3s ease;&:hover{border-color:#c19a6b;color:#c19a6b;background:rgba(193,154,107,0.05);}.count{font-size:11px;color:#999;}"
], (props)=>props.$active ? 'rgba(193, 154, 107, 0.1)' : 'transparent', (props)=>props.$active ? '#c19a6b' : '#e8e8e8', (props)=>props.$active ? '#c19a6b' : '#555');
const PriceRange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__PriceRange",
    componentId: "sc-un1lh1-8"
})([
    "display:flex;gap:10px;align-items:center;input{flex:1;padding:10px 12px;border:1px solid #e8e8e8;font-size:13px;font-family:var(--font-montserrat),'Montserrat',sans-serif;transition:all 0.3s ease;width:100%;&:focus{outline:none;border-color:#c19a6b;}&::placeholder{color:#aaa;}}span{color:#999;font-size:12px;}"
]);
const ApplyButton = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "SearchStyles__ApplyButton",
    componentId: "sc-un1lh1-9"
})([
    "width:100%;padding:12px;background:#c19a6b;color:white;border:none;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all 0.3s ease;margin-top:15px;font-family:var(--font-montserrat),'Montserrat',sans-serif;&:hover{background:#a8825f;}"
]);
const ClearButton = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "SearchStyles__ClearButton",
    componentId: "sc-un1lh1-10"
})([
    "width:100%;padding:10px;background:transparent;color:#999;border:1px solid #e8e8e8;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all 0.3s ease;margin-top:10px;font-family:var(--font-montserrat),'Montserrat',sans-serif;&:hover{border-color:#c19a6b;color:#c19a6b;}"
]);
const ResultsSection = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].main.withConfig({
    displayName: "SearchStyles__ResultsSection",
    componentId: "sc-un1lh1-11"
})([
    ""
]);
const ResultsHeader = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__ResultsHeader",
    componentId: "sc-un1lh1-12"
})([
    "display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;padding-bottom:15px;border-bottom:1px solid #f0f0f0;.results-count{color:#666;font-size:14px;span{font-weight:600;color:#222;}}.sort-by{display:flex;align-items:center;gap:10px;label{font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.5px;}select{padding:8px 30px 8px 12px;border:1px solid #e8e8e8;font-size:13px;font-family:var(--font-montserrat),'Montserrat',sans-serif;cursor:pointer;background:white url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E\") no-repeat right 10px center;appearance:none;&:focus{outline:none;border-color:#c19a6b;}}}@media (max-width:640px){flex-direction:column;gap:15px;align-items:flex-start;}"
]);
const ProductsGrid = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__ProductsGrid",
    componentId: "sc-un1lh1-13"
})([
    "display:grid;grid-template-columns:repeat(3,1fr);gap:25px;@media (max-width:1200px){grid-template-columns:repeat(2,1fr);}@media (max-width:640px){grid-template-columns:1fr;}"
]);
const ProductCard = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__ProductCard",
    componentId: "sc-un1lh1-14"
})([
    "background:white;box-shadow:0 5px 20px rgba(0,0,0,0.06);border:1px solid #f0f0f0;overflow:hidden;transition:all 0.4s ease;cursor:pointer;&:hover{transform:translateY(-8px);box-shadow:0 15px 40px rgba(0,0,0,0.12);}"
]);
const ProductImage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__ProductImage",
    componentId: "sc-un1lh1-15"
})([
    "height:220px;background-color:#f5f5f5;background-size:cover;background-position:center;background-repeat:no-repeat;position:relative;overflow:hidden;.product-img{width:100%;height:100%;object-fit:cover;}.placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#e8d5c4;color:#c19a6b;font-size:40px;}.category-badge{position:absolute;top:15px;left:15px;background:white;padding:5px 12px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#666;z-index:1;}"
]);
const ProductInfo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__ProductInfo",
    componentId: "sc-un1lh1-16"
})([
    "padding:20px;h3{font-size:1.1rem;color:#222;font-weight:500;margin-bottom:8px;font-family:var(--font-playfair),'Playfair Display',serif;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}.description{font-size:13px;color:#888;line-height:1.5;margin-bottom:15px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}.price-row{display:flex;justify-content:space-between;align-items:center;.price{font-size:1.25rem;color:#c19a6b;font-weight:600;font-family:var(--font-playfair),'Playfair Display',serif;}.view-btn{padding:8px 16px;background:transparent;border:1px solid #c19a6b;color:#c19a6b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all 0.3s ease;&:hover{background:#c19a6b;color:white;}}}"
]);
const LoadingState = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__LoadingState",
    componentId: "sc-un1lh1-17"
})([
    "display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;text-align:center;.spinner{width:50px;height:50px;border:3px solid rgba(193,154,107,0.2);border-top:3px solid #c19a6b;border-radius:50%;animation:spin 1s linear infinite;margin-bottom:20px;}@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}p{color:#666;font-size:14px;}"
]);
const EmptyState = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__EmptyState",
    componentId: "sc-un1lh1-18"
})([
    "display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;text-align:center;background:white;border:1px solid #f0f0f0;.icon{font-size:60px;color:#e8d5c4;margin-bottom:20px;}h3{font-size:1.5rem;color:#222;font-weight:400;font-family:var(--font-playfair),'Playfair Display',serif;margin-bottom:10px;}p{color:#888;font-size:14px;max-width:400px;line-height:1.6;}.browse-btn{margin-top:25px;padding:12px 30px;background:#c19a6b;color:white;border:none;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all 0.3s ease;&:hover{background:#a8825f;}}"
]);
const SearchInputWrapper = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__SearchInputWrapper",
    componentId: "sc-un1lh1-19"
})([
    "max-width:600px;margin:0 auto 30px;display:flex;gap:10px;input{flex:1;padding:14px 20px;border:2px solid #e8e8e8;font-size:15px;font-family:var(--font-montserrat),'Montserrat',sans-serif;transition:all 0.3s ease;&:focus{outline:none;border-color:#c19a6b;}&::placeholder{color:#aaa;}}button{padding:14px 25px;background:#c19a6b;color:white;border:none;font-size:14px;cursor:pointer;transition:all 0.3s ease;&:hover{background:#a8825f;}i{font-size:16px;}}"
]);
const MobileFilterToggle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "SearchStyles__MobileFilterToggle",
    componentId: "sc-un1lh1-20"
})([
    "display:none;width:100%;padding:12px;background:white;border:1px solid #e8e8e8;font-size:13px;font-weight:500;color:#333;cursor:pointer;margin-bottom:20px;font-family:var(--font-montserrat),'Montserrat',sans-serif;i{margin-right:8px;color:#c19a6b;}@media (max-width:992px){display:block;}"
]);
const MobileFiltersOverlay = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__MobileFiltersOverlay",
    componentId: "sc-un1lh1-21"
})([
    "display:none;@media (max-width:992px){display:",
    ";position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;}"
], (props)=>props.$isOpen ? 'block' : 'none');
const MobileFiltersPanel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "SearchStyles__MobileFiltersPanel",
    componentId: "sc-un1lh1-22"
})([
    "display:none;@media (max-width:992px){display:block;position:fixed;top:0;left:0;bottom:0;width:300px;background:white;z-index:1001;transform:",
    ";transition:transform 0.3s ease;overflow-y:auto;padding:20px;.close-btn{position:absolute;top:15px;right:15px;background:none;border:none;font-size:20px;color:#666;cursor:pointer;}}"
], (props)=>props.$isOpen ? 'translateX(0)' : 'translateX(-100%)');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/search/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/styles/SearchStyles.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const CATEGORIES = [
    {
        id: '',
        name: 'All Categories'
    },
    {
        id: 'furniture',
        name: 'Furniture'
    },
    {
        id: 'decor',
        name: 'Home Decor'
    },
    {
        id: 'lighting',
        name: 'Lighting'
    },
    {
        id: 'textiles',
        name: 'Textiles'
    },
    {
        id: 'outdoor',
        name: 'Outdoor'
    },
    {
        id: 'accessories',
        name: 'Accessories'
    }
];
const SearchPage = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchInput, setSearchInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Filters
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [minPrice, setMinPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [maxPrice, setMaxPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('relevance');
    const [mobileFiltersOpen, setMobileFiltersOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Perform search
    const performSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchPage.useCallback[performSearch]": async (searchQuery, category, min, max)=>{
            setLoading(true);
            setError(null);
            try {
                const params = {};
                if (searchQuery) params.q = searchQuery;
                if (category) params.category = category;
                if (min) params.minPrice = parseFloat(min);
                if (max) params.maxPrice = parseFloat(max);
                params.limit = 50;
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].searchProducts(params);
                if (result && result.success && result.data?.products) {
                    let products = result.data.products;
                    // Sort products
                    if (sortBy === 'price-low') {
                        products = [
                            ...products
                        ].sort({
                            "SearchPage.useCallback[performSearch]": (a, b)=>(a.price || 0) - (b.price || 0)
                        }["SearchPage.useCallback[performSearch]"]);
                    } else if (sortBy === 'price-high') {
                        products = [
                            ...products
                        ].sort({
                            "SearchPage.useCallback[performSearch]": (a, b)=>(b.price || 0) - (a.price || 0)
                        }["SearchPage.useCallback[performSearch]"]);
                    } else if (sortBy === 'name') {
                        products = [
                            ...products
                        ].sort({
                            "SearchPage.useCallback[performSearch]": (a, b)=>(a.name || '').localeCompare(b.name || '')
                        }["SearchPage.useCallback[performSearch]"]);
                    }
                    setSearchResults(products);
                } else {
                    setSearchResults([]);
                }
            } catch (err) {
                console.error('Search error:', err);
                setError('An error occurred during search. Please try again.');
                setSearchResults([]);
            } finally{
                setLoading(false);
            }
        }
    }["SearchPage.useCallback[performSearch]"], [
        sortBy
    ]);
    // Initial load - read query from URL
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchPage.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const params = new URLSearchParams(window.location.search);
                const q = params.get('q') || '';
                const cat = params.get('category') || '';
                setQuery(q);
                setSearchInput(q);
                setSelectedCategory(cat);
                performSearch(q, cat, minPrice, maxPrice);
            }
        }
    }["SearchPage.useEffect"], []);
    // Re-search when sort changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchPage.useEffect": ()=>{
            if (!loading && searchResults.length > 0) {
                performSearch(query, selectedCategory, minPrice, maxPrice);
            }
        }
    }["SearchPage.useEffect"], [
        sortBy
    ]);
    // Handle search form submit
    const handleSearch = (e)=>{
        e.preventDefault();
        setQuery(searchInput);
        // Update URL
        const params = new URLSearchParams();
        if (searchInput) params.set('q', searchInput);
        if (selectedCategory) params.set('category', selectedCategory);
        router.push(`/search?${params.toString()}`);
        performSearch(searchInput, selectedCategory, minPrice, maxPrice);
    };
    // Handle filter apply
    const handleApplyFilters = ()=>{
        setMobileFiltersOpen(false);
        performSearch(query, selectedCategory, minPrice, maxPrice);
    };
    // Handle clear filters
    const handleClearFilters = ()=>{
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        performSearch(query, '', '', '');
    };
    // Handle category click
    const handleCategoryClick = (categoryId)=>{
        setSelectedCategory(categoryId);
    };
    // Navigate to product
    const handleProductClick = (product)=>{
        router.push(`/products/${product.slug || product.id}`);
    };
    // Get image URL - prioritize Cloudflare R2 URLs
    const getImageUrl = (product)=>{
        // First check primary_image (should have Cloudflare URL)
        if (product.primary_image && product.primary_image.startsWith('http')) {
            return product.primary_image;
        }
        // Check images array for Cloudflare URLs
        if (product.images && product.images.length > 0) {
            const primaryImg = product.images.find((img)=>img.is_primary);
            if (primaryImg?.url && primaryImg.url.startsWith('http')) {
                return primaryImg.url;
            }
            // Use first image if no primary
            const firstImg = product.images[0];
            if (firstImg?.url && firstImg.url.startsWith('http')) {
                return firstImg.url;
            }
        }
        // Check image_url if it's a valid URL
        if (product.image_url && product.image_url.startsWith('http')) {
            return product.image_url;
        }
        // Return null to show placeholder
        return null;
    };
    // Render filters
    const renderFilters = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterGroup"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            children: "Category"
                        }, void 0, false, {
                            fileName: "[project]/src/app/search/page.tsx",
                            lineNumber: 174,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryList"], {
                            children: CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryItem"], {
                                    $active: selectedCategory === cat.id,
                                    onClick: ()=>handleCategoryClick(cat.id),
                                    children: cat.name
                                }, cat.id, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 34
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/app/search/page.tsx",
                            lineNumber: 175,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/search/page.tsx",
                    lineNumber: 173,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterGroup"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            children: "Price Range"
                        }, void 0, false, {
                            fileName: "[project]/src/app/search/page.tsx",
                            lineNumber: 183,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PriceRange"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    placeholder: "Min",
                                    value: minPrice,
                                    onChange: (e)=>setMinPrice(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "to"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    placeholder: "Max",
                                    value: maxPrice,
                                    onChange: (e)=>setMaxPrice(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 187,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/search/page.tsx",
                            lineNumber: 184,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/search/page.tsx",
                    lineNumber: 182,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApplyButton"], {
                    onClick: handleApplyFilters,
                    children: "Apply Filters"
                }, void 0, false, {
                    fileName: "[project]/src/app/search/page.tsx",
                    lineNumber: 191,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                (selectedCategory || minPrice || maxPrice) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClearButton"], {
                    onClick: handleClearFilters,
                    children: "Clear All Filters"
                }, void 0, false, {
                    fileName: "[project]/src/app/search/page.tsx",
                    lineNumber: 195,
                    columnNumber: 54
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchContainer"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                activePage: "search"
            }, void 0, false, {
                fileName: "[project]/src/app/search/page.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchHeaderSection"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Search"
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/page.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "search-query",
                        children: [
                            "Results for ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    '"',
                                    query,
                                    '"'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/search/page.tsx",
                                lineNumber: 205,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/search/page.tsx",
                        lineNumber: 204,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/search/page.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchInputWrapper"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSearch,
                    style: {
                        display: 'flex',
                        flex: 1,
                        gap: '10px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Search for products...",
                            value: searchInput,
                            onChange: (e)=>setSearchInput(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/app/search/page.tsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-search"
                            }, void 0, false, {
                                fileName: "[project]/src/app/search/page.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/search/page.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/search/page.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/search/page.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchContent"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileFilterToggle"], {
                        onClick: ()=>setMobileFiltersOpen(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-filter"
                            }, void 0, false, {
                                fileName: "[project]/src/app/search/page.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Filters"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/search/page.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileFiltersOverlay"], {
                        $isOpen: mobileFiltersOpen,
                        onClick: ()=>setMobileFiltersOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/page.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileFiltersPanel"], {
                        $isOpen: mobileFiltersOpen,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "close-btn",
                                onClick: ()=>setMobileFiltersOpen(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-times"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/app/search/page.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    marginBottom: '20px',
                                    fontFamily: 'var(--font-playfair)'
                                },
                                children: "Filters"
                            }, void 0, false, {
                                fileName: "[project]/src/app/search/page.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            renderFilters()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/search/page.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiltersSection"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiltersCard"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "Filters"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderFilters()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/search/page.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/page.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResultsSection"], {
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingState"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "spinner"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Searching products..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/search/page.tsx",
                            lineNumber: 254,
                            columnNumber: 22
                        }, ("TURBOPACK compile-time value", void 0)) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-exclamation-circle"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/search/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "Something went wrong"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 261,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "browse-btn",
                                    onClick: ()=>performSearch(query, selectedCategory, minPrice, maxPrice),
                                    children: "Try Again"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/search/page.tsx",
                            lineNumber: 257,
                            columnNumber: 39
                        }, ("TURBOPACK compile-time value", void 0)) : searchResults.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResultsHeader"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "results-count",
                                            children: [
                                                "Showing ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: searchResults.length
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/search/page.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " products"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/search/page.tsx",
                                            lineNumber: 268,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "sort-by",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: "Sort by:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/search/page.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: sortBy,
                                                    onChange: (e)=>setSortBy(e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "relevance",
                                                            children: "Relevance"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/search/page.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "price-low",
                                                            children: "Price: Low to High"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/search/page.tsx",
                                                            lineNumber: 275,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "price-high",
                                                            children: "Price: High to Low"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/search/page.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "name",
                                                            children: "Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/search/page.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/search/page.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/search/page.tsx",
                                            lineNumber: 271,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductsGrid"], {
                                    children: searchResults.map((product)=>{
                                        const imageUrl = getImageUrl(product);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
                                            onClick: ()=>handleProductClick(product),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductImage"], {
                                                    children: [
                                                        imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: imageUrl,
                                                            alt: product.name,
                                                            className: "product-img",
                                                            onError: (e)=>{
                                                                // On error, hide image and show placeholder
                                                                e.currentTarget.style.display = 'none';
                                                                const placeholder = e.currentTarget.nextElementSibling;
                                                                if (placeholder) placeholder.style.display = 'flex';
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/search/page.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)) : null,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "placeholder",
                                                            style: {
                                                                display: imageUrl ? 'none' : 'flex'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "fas fa-image"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/search/page.tsx",
                                                                lineNumber: 296,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/search/page.tsx",
                                                            lineNumber: 293,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        product.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "category-badge",
                                                            children: product.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/search/page.tsx",
                                                            lineNumber: 298,
                                                            columnNumber: 46
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/search/page.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductInfo"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            children: product.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/search/page.tsx",
                                                            lineNumber: 301,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        product.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "description",
                                                            children: product.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/search/page.tsx",
                                                            lineNumber: 302,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "price-row",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "price",
                                                                    children: [
                                                                        "₹",
                                                                        (typeof product.price === 'number' ? product.price : parseFloat(product.price || '0')).toLocaleString()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/search/page.tsx",
                                                                    lineNumber: 304,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "view-btn",
                                                                    children: "View"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/search/page.tsx",
                                                                    lineNumber: 307,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/search/page.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/search/page.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, product.id, true, {
                                            fileName: "[project]/src/app/search/page.tsx",
                                            lineNumber: 285,
                                            columnNumber: 22
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$SearchStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-search"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/search/page.tsx",
                                        lineNumber: 315,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 314,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "No products found"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 317,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: query ? `We couldn't find any products matching "${query}". Try different keywords or browse our categories.` : 'Enter a search term or select a category to find products.'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 318,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "browse-btn",
                                    onClick: ()=>router.push('/shop'),
                                    children: "Browse All Products"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/search/page.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/search/page.tsx",
                            lineNumber: 313,
                            columnNumber: 19
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/search/page.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/search/page.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/search/page.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/search/page.tsx",
        lineNumber: 199,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SearchPage, "iIr3a/axXqkOoE/Sz8NbkquJ+0c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SearchPage;
const __TURBOPACK__default__export__ = SearchPage;
var _c;
__turbopack_context__.k.register(_c, "SearchPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_deb4a543._.js.map