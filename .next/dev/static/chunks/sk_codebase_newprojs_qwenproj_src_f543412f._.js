(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sk/codebase/newprojs/qwenproj/src/assets/logo.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/logo.bc970a22.svg");}),
"[project]/sk/codebase/newprojs/qwenproj/src/assets/logo.svg.mjs { IMAGE => \"[project]/sk/codebase/newprojs/qwenproj/src/assets/logo.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$assets$2f$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/assets/logo.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$assets$2f$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 200,
    height: 60,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/src/styles/HeaderStyles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
    "NavIcon",
    ()=>NavIcon,
    "SharedHeader",
    ()=>SharedHeader,
    "UserGreeting",
    ()=>UserGreeting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const SharedHeader = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].nav`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;
  font-family: Montserrat, Arial, sans-serif;
`;
const HeaderContainer = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;
const HeaderLogo = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
  }

  .logo-image {
    height: 60px;
    max-height: 60px;
    object-fit: contain;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;
const HeaderMenu = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  gap: 25px;
`;
const HeaderLink = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].a`
  text-decoration: none;
  color: ${(props)=>props.$active ? '#c19a6b' : '#333'};
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #c19a6b;
  }

  &::after {
    content: '';
    position: absolute;
    width: ${(props)=>props.$active ? '100%' : '0'};
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #c19a6b;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;
const HeaderIcons = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  gap: 15px;
  align-items: center;
`;
const CartCount = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #c19a6b;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UserGreeting = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].span`
  color: #333;
  font-family: Montserrat, Arial, sans-serif;
  font-size: 14px;
  margin: 0 10px;
  font-weight: 500;
`;
const NavIcon = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #c19a6b;
  }
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$assets$2f$logo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$assets$2f$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/sk/codebase/newprojs/qwenproj/src/assets/logo.svg.mjs { IMAGE => "[project]/sk/codebase/newprojs/qwenproj/src/assets/logo.svg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
// Import header styles
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/styles/HeaderStyles.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const Header = ({ activePage = '' })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const navigate = (path)=>{
        router.push(path);
    };
    const { user, cartItems, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"])();
    const cartCount = cartItems.reduce((total, item)=>total + item.quantity, 0);
    const handleLogout = ()=>{
        logout();
        navigate('/');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SharedHeader"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderContainer"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLogo"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#",
                        onClick: (e)=>{
                            e.preventDefault();
                            navigate('/');
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$assets$2f$logo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$assets$2f$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                            alt: "Colour My Space Logo",
                            className: "logo-image"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderMenu"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'home',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/');
                            },
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'shop',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/shop');
                            },
                            children: "Shop"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'portfolio',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/portfolio');
                            },
                            children: "Portfolio"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'services',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/services');
                            },
                            children: "Services"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'orders',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/orders');
                            },
                            children: "Orders"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        user && user.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'admin',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/admin');
                            },
                            children: "Admin Dashboard"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'about',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/about');
                            },
                            children: "About"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'contact',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/contact');
                            },
                            children: "Contact"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeaderIcons"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "nav-icon",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-search"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "nav-icon",
                                    onClick: handleLogout,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-sign-out-alt"
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserGreeting"], {
                                    children: [
                                        "Hi, ",
                                        user.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "nav-icon",
                            onClick: ()=>navigate('/auth'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-user"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "nav-icon",
                            onClick: ()=>navigate('/cart'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fas fa-shopping-cart"
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                cartItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartCount"], {
                                    children: cartCount
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 133,
                                    columnNumber: 38
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Header, "w9P51tJjY10FTDXdfi7MDwRrUDg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"]
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
"[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const Slider = ()=>{
    _s();
    const [currentSlide, setCurrentSlide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Array of background images for the slider
    const slides = [
        {
            url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
            title: 'Modern Living Room Design'
        },
        {
            url: 'https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
            title: 'Classic Elegance'
        },
        {
            url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
            title: 'Coastal Retreat'
        },
        {
            url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
            title: 'Minimalist Space'
        }
    ];
    // Auto-advance the slider every 5 seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Slider.useEffect": ()=>{
            const interval = setInterval({
                "Slider.useEffect.interval": ()=>{
                    setCurrentSlide({
                        "Slider.useEffect.interval": (prevSlide)=>prevSlide === slides.length - 1 ? 0 : prevSlide + 1
                    }["Slider.useEffect.interval"]);
                }
            }["Slider.useEffect.interval"], 5000);
            return ({
                "Slider.useEffect": ()=>clearInterval(interval)
            })["Slider.useEffect"];
        }
    }["Slider.useEffect"], []); // Empty dependency array since slides is constant
    // Function to go to a specific slide
    const goToSlide = (slideIndex)=>{
        setCurrentSlide(slideIndex);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "slider",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "slides",
                children: slides.map((slide, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `slide ${index === currentSlide ? 'active' : ''}`,
                        style: {
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.url})`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "slide-content",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "hero-title",
                                        children: "Transform Your Space Into Art"
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hero-subtitle",
                                        children: "ELEVATING INTERIORS WITH TIMELESS ELEGANCE AND FUNCTIONAL DESIGN"
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "slide-buttons",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn primary",
                                        onClick: ()=>document.getElementById('portfolio').scrollIntoView({
                                                behavior: 'smooth'
                                            }),
                                        children: "View Portfolio"
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn secondary",
                                        onClick: ()=>document.getElementById('contact').scrollIntoView({
                                                behavior: 'smooth'
                                            }),
                                        children: "Book Consultation"
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn tertiary",
                                        onClick: ()=>window.location.href = '/shop',
                                        children: "Shop Now"
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, index, true, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "slider-dots",
                children: slides.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `dot ${index === currentSlide ? 'active' : ''}`,
                        onClick: ()=>goToSlide(index)
                    }, index, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Slider, "/jm+XmndjAYlDCFyCnfFEXJOloU=");
_c = Slider;
const __TURBOPACK__default__export__ = Slider;
var _c;
__turbopack_context__.k.register(_c, "Slider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/src/styles/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Theme and style constants for the application
__turbopack_context__.s([
    "theme",
    ()=>theme
]);
const theme = {
    colors: {
        primary: '#c19a6b',
        primaryDark: '#a8825f',
        secondary: '#fafafa',
        background: '#fafafa',
        text: '#333',
        textSecondary: '#666',
        textLight: '#ddd',
        textDark: '#222',
        white: '#ffffff',
        black: '#000000',
        shadow: 'rgba(0, 0, 0, 0.1)',
        border: '#f0f0f0'
    },
    fonts: {
        primary: "'Playfair Display', 'Georgia', serif",
        secondary: "'Montserrat', 'Arial', sans-serif"
    },
    spacing: {
        xs: '5px',
        small: '10px',
        medium: '15px',
        large: '20px',
        xl: '25px',
        xxl: '30px',
        section: '100px',
        container: '20px'
    },
    breakpoints: {
        mobile: '768px',
        tablet: '992px',
        desktop: '1200px'
    },
    borderRadius: {
        none: '0',
        small: '2px',
        medium: '4px',
        large: '8px'
    },
    shadows: {
        light: '0 2px 5px rgba(0, 0, 0, 0.1)',
        medium: '0 5px 15px rgba(0, 0, 0, 0.05)',
        card: '0 5px 15px rgba(0, 0, 0, 0.05)',
        hover: '0 15px 30px rgba(0, 0, 0, 0.1)'
    },
    zIndex: {
        dropdown: 1000,
        sticky: 1020,
        fixed: 1030,
        modalBackdrop: 1040,
        modal: 1050,
        popover: 1060,
        tooltip: 1070
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetailStyles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CloseButton",
    ()=>CloseButton,
    "ErrorMessage",
    ()=>ErrorMessage,
    "ProductDetailActions",
    ()=>ProductDetailActions,
    "ProductDetailContainer",
    ()=>ProductDetailContainer,
    "ProductDetailContent",
    ()=>ProductDetailContent,
    "ProductDetailDescription",
    ()=>ProductDetailDescription,
    "ProductDetailImage",
    ()=>ProductDetailImage,
    "ProductDetailInfo",
    ()=>ProductDetailInfo,
    "ProductDetailOverlay",
    ()=>ProductDetailOverlay,
    "ProductDetailPrice",
    ()=>ProductDetailPrice,
    "ProductDetailTitle",
    ()=>ProductDetailTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/styles/theme.ts [app-client] (ecmascript)");
;
;
const ProductDetailOverlay = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;
const ProductDetailContainer = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  position: relative;
  background-color: white;
  border-radius: 0;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;
const CloseButton = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].colors.text};
  cursor: pointer;
  z-index: 10;
  padding: 5px;
  
  &:hover {
    color: ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].colors.primary};
  }
`;
const ProductDetailContent = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].breakpoints.mobile}) {
    flex-direction: row;
  }
`;
const ProductDetailImage = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  height: 300px;
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center;
  
  @media (min-width: ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].breakpoints.mobile}) {
    width: 50%;
    height: auto;
  }
  
  ${(props)=>props.imageClass === 'modern' && `
    background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${(props)=>props.imageClass === 'classic' && `
    background-image: url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${(props)=>props.imageClass === 'coastal' && `
    background-image: url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
`;
const ProductDetailInfo = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  padding: 30px;
  
  @media (min-width: ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].breakpoints.mobile}) {
    width: 50%;
    padding: 40px;
  }
`;
const ProductDetailTitle = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].colors.textDark};
  font-weight: 400;
  
  @media (min-width: ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].breakpoints.mobile}) {
    font-size: 2rem;
  }
`;
const ProductDetailPrice = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].colors.primary};
  margin-bottom: 20px;
`;
const ProductDetailDescription = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].p`
  color: ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].colors.textSecondary};
  margin-bottom: 30px;
  line-height: 1.8;
`;
const ProductDetailActions = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  margin-top: 20px;
`;
const ErrorMessage = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  color: #e74c3c;
  background-color: #fdf2f2;
  padding: 10px 15px;
  border-left: 4px solid #e74c3c;
  margin-bottom: 20px;
  font-family: ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].fonts.secondary};
  font-size: 14px;
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetailStyles.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const ProductDetail = ({ product, onBack })=>{
    _s();
    const { loading, error, addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"])();
    if (!product) return null;
    const handleAddToCart = ()=>{
        addToCart(product);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductDetailOverlay"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductDetailContainer"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CloseButton"], {
                    onClick: onBack,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fas fa-times"
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductDetailContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductDetailImage"], {
                            imageClass: product.imageClass
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductDetailInfo"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductDetailTitle"], {
                                    children: product.name
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductDetailPrice"], {
                                    children: [
                                        "₹",
                                        product.price.toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductDetailDescription"], {
                                    children: product.description
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                error.cart && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorMessage"], {
                                    children: error.cart
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                                    lineNumber: 47,
                                    columnNumber: 28
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetailStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductDetailActions"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn primary",
                                        onClick: handleAddToCart,
                                        disabled: loading.cart,
                                        children: loading.cart ? 'Adding...' : 'Add to Cart'
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ProductDetail, "6rwllG4NbqX4Fi7W2BbZdY5EQVs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"]
    ];
});
_c = ProductDetail;
const __TURBOPACK__default__export__ = ProductDetail;
var _c;
__turbopack_context__.k.register(_c, "ProductDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/src/styles/NewHomepageStyles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConsultationSection",
    ()=>ConsultationSection,
    "ErrorContainer",
    ()=>ErrorContainer,
    "FeaturedSection",
    ()=>FeaturedSection,
    "HomepageContainer",
    ()=>HomepageContainer,
    "HomepageHeader",
    ()=>HomepageHeader,
    "LoadingSpinner",
    ()=>LoadingSpinner,
    "MainHero",
    ()=>MainHero,
    "PortfolioCard",
    ()=>PortfolioCard,
    "PortfolioGrid",
    ()=>PortfolioGrid,
    "PortfolioSection",
    ()=>PortfolioSection,
    "ProductCard",
    ()=>ProductCard,
    "ProductImage",
    ()=>ProductImage,
    "ProductInfo",
    ()=>ProductInfo,
    "ProductPrice",
    ()=>ProductPrice,
    "ProductsGrid",
    ()=>ProductsGrid,
    "SectionFooter",
    ()=>SectionFooter,
    "SectionHeader",
    ()=>SectionHeader,
    "ServiceCard",
    ()=>ServiceCard,
    "ServiceIcon",
    ()=>ServiceIcon,
    "ServicesGrid",
    ()=>ServicesGrid,
    "ServicesSection",
    ()=>ServicesSection,
    "TestimonialCard",
    ()=>TestimonialCard,
    "TestimonialsGrid",
    ()=>TestimonialsGrid,
    "TestimonialsSection",
    ()=>TestimonialsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
;
const HomepageContainer = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fafafa;
`;
const HomepageHeader = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].nav`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;
  font-family: Montserrat, Arial, sans-serif;

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .nav-logo {
    display: flex;
    align-items: center;
  }

  .logo-image {
    height: 60px;
    max-height: 60px;
    object-fit: contain;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .nav-menu {
    display: flex;
    gap: 25px;
  }

  .nav-link {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.3s ease;
    position: relative;
  }

  .nav-link.active, .nav-link:hover {
    color: #c19a6b;
  }

  .nav-link:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #c19a6b;
    transition: width 0.3s ease;
  }

  .nav-link:hover:after {
    width: 100%;
  }

  .nav-icons {
    display: flex;
    gap: 15px;
  }

  .nav-icon {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #333;
    transition: color 0.3s ease;
    position: relative;
  }

  .nav-icon:hover {
    color: #c19a6b;
  }

  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #c19a6b;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-greeting {
    color: #333;
    font-family: Montserrat, Arial, sans-serif;
    font-size: 14px;
    margin: 0 10px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .nav-menu {
      display: none;
    }
  }
`;
const MainHero = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].section`
  margin-top: 0;
`;
const SectionHeader = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  text-align: center;
  margin-bottom: 60px;
  
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 2px;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    background-color: #c19a6b;
    margin: 15px auto;
  }
`;
const SectionFooter = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  text-align: center;
  margin-top: 60px;
`;
const PortfolioSection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].section`
  padding: 100px 0;
  background-color: #f8f8f8;

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 2px;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    background-color: #c19a6b;
    margin: 15px auto;
  }
`;
const PortfolioGrid = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
`;
const PortfolioCard = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  position: relative;
  height: 400px;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
  }

  .project-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease;
  }

  .project-image.modern {
    background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  }

  .project-image.classic {
    background-image: url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  }

  .project-image.coastal {
    background-image: url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .project-overlay {
    opacity: 1;
  }

  .project-content {
    text-align: center;
    color: white;
    width: 100%;
  }

  .project-content h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: white;
    font-weight: 400;
  }

  .project-content p {
    font-size: 0.9rem;
    margin-bottom: 20px;
    color: #ddd;
    line-height: 1.5;
  }

  .btn {
    width: auto;
    padding: 10px 20px;
    font-size: 14px;
    letter-spacing: 1px;
  }
`;
const FeaturedSection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].section`
  padding: 100px 0;
  background-color: white;

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 2px;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    background-color: #c19a6b;
    margin: 15px auto;
  }
`;
const ProductsGrid = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
`;
const ProductCard = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  background-color: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  text-align: center;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;
const ProductImage = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  height: 250px;
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  ${(props)=>props.imageClass === 'modern' && `
    background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${(props)=>props.imageClass === 'classic' && `
    background-image: url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${(props)=>props.imageClass === 'coastal' && `
    background-image: url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${(props)=>props.imageClass === 'office' && `
    background-image: url('https://images.unsplash.com/photo-1442323822296-a34ce0d5fbc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${(props)=>props.imageClass === 'hotel' && `
    background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${(props)=>props.imageClass === 'restaurant' && `
    background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  &:hover {
    .add-to-cart-overlay {
      opacity: 1;
      transform: translateY(-50%);
    }
  }
`;
const ProductInfo = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  padding: 25px;
  text-align: center;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #222;
    font-weight: 400;
  }

  p {
    color: #666;
    margin-bottom: 10px;
    font-family: Montserrat, Arial, sans-serif;
    font-size: 14px;
    letter-spacing: 1px;
  }
`;
const ProductPrice = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  font-size: 1.3rem;
  font-weight: 600;
  color: #c19a6b;
  margin: 10px 0;
`;
const ServicesSection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].section`
  padding: 100px 0;
  background-color: white;

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 2px;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    background-color: #c19a6b;
    margin: 15px auto;
  }
`;
const ServicesGrid = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;
const ServiceCard = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  text-align: center;
  padding: 40px 20px;
  background-color: #fafafa;
  border-radius: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    background-color: white;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: #222;
    font-weight: 400;
    letter-spacing: 1px;
  }

  p {
    color: #666;
    line-height: 1.6;
    font-family: Montserrat, Arial, sans-serif;
    font-size: 14px;
  }
`;
const ServiceIcon = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  font-size: 2.5rem;
  color: #c19a6b;
  margin-bottom: 20px;
`;
const TestimonialsSection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].section`
  padding: 100px 0;
  background-color: #f8f8f8;

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 2px;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    background-color: #c19a6b;
    margin: 15px auto;
  }
`;
const TestimonialsGrid = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;
const TestimonialCard = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  background-color: white;
  padding: 40px 30px;
  border-radius: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  border: 1px solid #f0f0f0;

  .rating {
    color: #c19a6b;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .testimonial-text {
    font-style: italic;
    color: #555;
    margin-bottom: 20px;
    line-height: 1.8;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.1rem;
  }

  .customer-name {
    font-weight: 500;
    color: #222;
    font-family: Montserrat, Arial, sans-serif;
    font-size: 14px;
    letter-spacing: 1px;
  }
`;
const ConsultationSection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].section`
  padding: 100px 0;
  background: linear-gradient(135deg, #222 0%, #333 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(193, 154, 107, 0.1) 0, transparent 70%);
    z-index: 0;
  }

  .section-content {
    position: relative;
    z-index: 1;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: white;
    font-family: 'Playfair Display', serif;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 30px;
    color: #ddd;
    font-family: Montserrat, Arial, sans-serif;
    line-height: 1.7;
  }

  .btn {
    position: relative;
    overflow: hidden;
    z-index: 1;
    background-color: #c19a6b;
    color: white;
    padding: 20px 50px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.4s ease;
    box-shadow: 0 4px 15px #c19a6b66;
    display: inline-block;
    margin: 0 auto;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transform: translateX(-100%);
      transition: 0.6s;
      z-index: -1;
    }

    &:hover {
      background-color: #a8825f;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px #c19a6b99;
      
      &::before {
        transform: translateX(100%);
      }
    }
  }
`;
const LoadingSpinner = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  
  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 5px solid rgba(193, 154, 107, 0.2);
    border-top: 5px solid #c19a6b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const ErrorContainer = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #721c24;
  }

  .btn {
    padding: 12px 24px;
  }
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$Slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/components/Slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/components/ProductDetail.tsx [app-client] (ecmascript)");
// Import elegant homepage styles
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/styles/NewHomepageStyles.ts [app-client] (ecmascript)");
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
const NewHomepage = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const navigate = (path)=>{
        router.push(path);
    };
    const { user, products, cartItems, loading, error, fetchProducts, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"])();
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [orderCompleted, setOrderCompleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cartCount = cartItems.reduce((total, item)=>total + item.quantity, 0);
    // Portfolio projects for homepage
    const portfolioProjects = [
        {
            id: 1,
            title: "Modern Minimalist",
            description: "Clean lines and contemporary aesthetics",
            imageClass: "modern"
        },
        {
            id: 2,
            title: "Classic Elegance",
            description: "Timeless designs with refined details",
            imageClass: "classic"
        },
        {
            id: 3,
            title: "Coastal Retreat",
            description: "Light, airy spaces with natural elements",
            imageClass: "coastal"
        }
    ];
    // Testimonials for homepage
    const testimonials = [
        {
            id: 1,
            text: "Sarah transformed our outdated home into a modern masterpiece. Her attention to detail and creative vision exceeded all our expectations. The process was seamless from start to finish!",
            author: "Michael & Jennifer Roberts",
            rating: 5
        },
        {
            id: 2,
            text: "Working with Elegant Spaces was a game-changer for our restaurant. The design elevated our brand and created an atmosphere that our customers love. Revenue has increased by 30% since the redesign!",
            author: "David Chen, Bistro 45 Owner",
            rating: 5
        },
        {
            id: 3,
            text: "The team at Elegant Spaces understood our vision perfectly. They created a home office that inspires productivity while maintaining the warmth of our family space. Truly exceptional work!",
            author: "Priya Sharma, Architect",
            rating: 5
        }
    ];
    // Services for homepage
    const services = [
        {
            id: 1,
            icon: "fas fa-pencil-ruler",
            title: "DESIGN CONSULTATION",
            description: "Comprehensive design planning and concept development"
        },
        {
            id: 2,
            icon: "fas fa-couch",
            title: "FURNITURE DESIGN",
            description: "Custom furniture pieces crafted to your specifications"
        },
        {
            id: 3,
            icon: "fas fa-home",
            title: "SPACE PLANNING",
            description: "Optimizing layouts for flow and functionality"
        },
        {
            id: 4,
            icon: "fas fa-paint-roller",
            title: "COLOR CONSULTING",
            description: "Expert color selection for mood and ambiance"
        },
        {
            id: 5,
            icon: "fas fa-lightbulb",
            title: "LIGHTING DESIGN",
            description: "Strategic lighting solutions for every space"
        },
        {
            id: 6,
            icon: "fas fa-project-diagram",
            title: "PROJECT MANAGEMENT",
            description: "End-to-end oversight from concept to completion"
        }
    ];
    const openProductDetail = (product)=>{
        setSelectedProduct(product);
    };
    const closeProductDetail = ()=>{
        setSelectedProduct(null);
    };
    const handleCheckout = (orderData)=>{
        // Simulate order processing
        console.log('Order placed:', orderData);
        // Save order to history
        const orderWithDate = {
            ...orderData,
            date: new Date().toISOString()
        };
        const savedOrders = localStorage.getItem('orderHistory');
        const orderHistory = savedOrders ? JSON.parse(savedOrders) : [];
        orderHistory.push(orderWithDate);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
        // Show order confirmation
        setOrderCompleted(true);
        // Reset order completion status after 3 seconds
        setTimeout(()=>{
            setOrderCompleted(false);
        }, 3000);
    };
    const handleLogout = ()=>{
        logout();
        navigate('/');
    };
    if (loading.products) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HomepageContainer"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingSpinner"], {}, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 182,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
            lineNumber: 181,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (error.products) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorContainer"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: error.products
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                    lineNumber: 190,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "btn primary",
                    onClick: ()=>window.location.reload(),
                    children: "Retry"
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
            lineNumber: 189,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HomepageContainer"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                activePage: "home"
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MainHero"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$Slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PortfolioSection"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-title",
                            children: "DESIGN PORTFOLIO"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PortfolioGrid"], {
                        children: portfolioProjects.map((project)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PortfolioCard"], {
                                className: `portfolio-${project.imageClass}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `project-image ${project.imageClass}`
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "project-overlay",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "project-content",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: project.title
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: project.description
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "btn primary",
                                                    onClick: ()=>navigate('/portfolio'),
                                                    children: "View Project"
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, project.id, true, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionFooter"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn primary",
                            onClick: ()=>navigate('/portfolio'),
                            children: "View More Projects"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeaturedSection"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-title",
                            children: "FEATURED COLLECTION"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductsGrid"], {
                        children: products.slice(0, 6).map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductImage"], {
                                        className: `product-image ${product.imageClass}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "add-to-cart-overlay",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "btn primary",
                                                onClick: ()=>navigate('/cart'),
                                                children: "Add to Cart"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                lineNumber: 246,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 245,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductInfo"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: product.name
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                lineNumber: 255,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: product.description
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                lineNumber: 256,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductPrice"], {
                                                children: [
                                                    "₹",
                                                    product.price.toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                lineNumber: 257,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "product-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn primary",
                                                        onClick: ()=>openProductDetail(product),
                                                        children: "View Details"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn secondary",
                                                        onClick: ()=>navigate('/cart'),
                                                        children: "Add to Cart"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 265,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                lineNumber: 258,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                        lineNumber: 254,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, product.id, true, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionFooter"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn primary",
                            onClick: ()=>navigate('/shop'),
                            children: "Explore Collection"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ServicesSection"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-title",
                            children: "OUR SERVICES"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 286,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ServicesGrid"], {
                        children: services.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ServiceCard"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ServiceIcon"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: service.icon
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 292,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: service.title
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: service.description
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, service.id, true, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                lineNumber: 290,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TestimonialsSection"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-header",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "section-title",
                            children: "CLIENT TESTIMONIALS"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 304,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TestimonialsGrid"], {
                        children: testimonials.map((testimonial)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TestimonialCard"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rating",
                                        children: '★'.repeat(testimonial.rating)
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                        lineNumber: 309,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "testimonial-text",
                                        children: [
                                            '"',
                                            testimonial.text,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "customer-name",
                                        children: testimonial.author
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                        lineNumber: 315,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, testimonial.id, true, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                lineNumber: 308,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$NewHomepageStyles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConsultationSection"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "section-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Ready to transform your space?"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 326,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Schedule a complimentary 30-minute consultation to discuss your project vision."
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn primary",
                            onClick: ()=>navigate('/contact'),
                            children: "Schedule Now"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 328,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                    lineNumber: 325,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 324,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "footer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "footer-grid",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "footer-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: "Colour My Space"
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 339,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Creating extraordinary interiors that blend timeless elegance with contemporary functionality. Award-winning design services for residential and commercial spaces."
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 340,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "social-icons",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fab fa-instagram"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 29
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fab fa-pinterest"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 29
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fab fa-houzz"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 29
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fab fa-linkedin-in"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 348,
                                                        columnNumber: 29
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "footer-subsection",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    children: "AWARDS & RECOGNITION"
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "Featured in Architectural Digest, Elle Decor, and House Beautiful"
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 351,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "footer-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            children: "Quick Links"
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 357,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/');
                                                        },
                                                        children: "Home"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/portfolio');
                                                        },
                                                        children: "Portfolio"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/services');
                                                        },
                                                        children: "Services"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/shop');
                                                        },
                                                        children: "Shop"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 362,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/about');
                                                        },
                                                        children: "About"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 363,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/contact');
                                                        },
                                                        children: "Contact"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 358,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                    lineNumber: 356,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "footer-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            children: "Services"
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 368,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/services#design');
                                                        },
                                                        children: "Residential Design"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/services#commercial');
                                                        },
                                                        children: "Commercial Design"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/services#planning');
                                                        },
                                                        children: "Space Planning"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/services#color');
                                                        },
                                                        children: "Color Consulting"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 373,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 373,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/services#furniture');
                                                        },
                                                        children: "Furniture Design"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 369,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                    lineNumber: 367,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "footer-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            children: "Shop"
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 378,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/shop');
                                                        },
                                                        children: "All Products"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/shop');
                                                        },
                                                        children: "New Arrivals"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/shop');
                                                        },
                                                        children: "Best Sellers"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/shop');
                                                        },
                                                        children: "Sale Items"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 383,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            navigate('/orders');
                                                        },
                                                        children: "Order History"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 30
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 26
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                    lineNumber: 377,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 337,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "footer-bottom",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "© 2023 Colour My Space Interior Design. All rights reserved."
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                    lineNumber: 336,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            selectedProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$ProductDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                product: selectedProduct,
                onBack: closeProductDetail,
                onAddToCart: handleCheckout
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 396,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            orderCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "order-confirmation",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "confirmation-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fas fa-check-circle"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 407,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            children: "Order Placed Successfully!"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 408,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Thank you for your purchase. We'll send you a confirmation email shortly."
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                    lineNumber: 406,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
                lineNumber: 405,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/NewHomepage.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(NewHomepage, "AfvN4qqzL6PaoAZuK4VzElilgQ0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"]
    ];
});
_c = NewHomepage;
const __TURBOPACK__default__export__ = NewHomepage;
var _c;
__turbopack_context__.k.register(_c, "NewHomepage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=sk_codebase_newprojs_qwenproj_src_f543412f._.js.map