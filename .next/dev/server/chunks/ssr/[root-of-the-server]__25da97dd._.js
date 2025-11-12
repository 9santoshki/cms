module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[project]/sk/codebase/newprojs/qwenproj/src/styles/HeaderStyles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
const SharedHeader = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].nav`
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;
  font-family: 'Playfair Display', serif;
  transition: all 0.4s ease;
  border-bottom: 1px solid rgba(193, 154, 107, 0.1);
`;
const HeaderContainer = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  gap: 20px;
`;
const HeaderLogo = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  a {
    text-decoration: none;
  }

  .logo-image {
    height: 65px;
    max-height: 65px;
    object-fit: contain;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }
`;
const HeaderMenu = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  gap: 35px;
  flex: 1;
  justify-content: center;

  @media (max-width: 992px) {
    gap: 25px;
  }

  @media (max-width: 768px) {
    gap: 15px;
    display: none;
  }
`;
const HeaderLink = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].a`
  text-decoration: none;
  color: ${(props)=>props.$active ? '#c19a6b' : '#333'};
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  transition: all 0.3s ease;
  position: relative;
  padding: 10px 0;
  display: inline-block;
  font-family: 'Montserrat', sans-serif;

  &:hover {
    color: #c19a6b;
  }

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, #c19a6b, transparent);
    transition: width 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    width: ${(props)=>props.$active ? '100%' : '0'};
    height: 2px;
    bottom: 0;
    right: 0;
    background: linear-gradient(to left, #c19a6b, transparent);
    transition: width 0.4s ease;
  }

  &:hover::before {
    width: 100%;
  }

  &::after {
    ${(props)=>props.$active && `
      width: 100%;
    `}
  }

  &:hover {
    transform: translateY(-2px);
  }
`;
const HeaderIcons = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;
const CartCount = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].span`
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, #c19a6b, #a8825f);
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(193, 154, 107, 0.3);
`;
const UserGreeting = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].span`
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  margin: 0 10px;
  font-weight: 500;
  text-align: right;
`;
const NavIcon = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  transition: all 0.3s ease;
  position: relative;
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    color: #c19a6b;
    background-color: rgba(193, 154, 107, 0.08);
    transform: translateY(-2px);
  }
`;
const MobileMenuToggle = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].button`
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;
  }
`;
}),
"[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx [app-ssr] (ecmascript)");
// Import header styles
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/styles/HeaderStyles.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const Header = ({ activePage = '' })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const navigate = (path)=>{
        router.push(path);
        setIsMobileMenuOpen(false); // Close mobile menu after navigation
    };
    const { user, cartItems, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppContext"])();
    const cartCount = cartItems.reduce((total, item)=>total + item.quantity, 0);
    const handleLogout = ()=>{
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };
    const toggleMobileMenu = ()=>{
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SharedHeader"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderContainer"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderLogo"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#",
                        onClick: (e)=>{
                            e.preventDefault();
                            navigate('/');
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/logo.svg",
                            alt: "Colour My Space Logo",
                            className: "logo-image"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderMenu"], {
                    style: {
                        display: isMobileMenuOpen ? 'flex' : 'flex'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'home',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/');
                            },
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'shop',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/shop');
                            },
                            children: "Shop"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'portfolio',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/portfolio');
                            },
                            children: "Portfolio"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'services',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/services');
                            },
                            children: "Services"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'orders',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/orders');
                            },
                            children: "Orders"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        user && user.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'admin',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/admin');
                            },
                            children: "Admin"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'about',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/about');
                            },
                            children: "About"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderLink"], {
                            href: "#",
                            $active: activePage === 'contact',
                            onClick: (e)=>{
                                e.preventDefault();
                                navigate('/contact');
                            },
                            children: "Contact"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderIcons"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NavIcon"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-search"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NavIcon"], {
                                    onClick: handleLogout,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-sign-out-alt"
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserGreeting"], {
                                    children: [
                                        "Hi, ",
                                        user.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NavIcon"], {
                            onClick: ()=>navigate('/auth'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-user"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                lineNumber: 137,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NavIcon"], {
                                    onClick: ()=>navigate('/cart'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-shopping-cart"
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                cartItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartCount"], {
                                    children: cartCount
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 144,
                                    columnNumber: 38
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$HeaderStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileMenuToggle"], {
                            onClick: toggleMobileMenu,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Header;
}),
"[project]/sk/codebase/newprojs/qwenproj/src/styles/FooterStyles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
const FooterContainer = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer`
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
  color: #fff;
  padding: 80px 0 0;
  margin-top: auto;
  font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    padding: 60px 0 0;
  }
`;
const FooterContent = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 40px;
  
  @media (max-width: 768px) {
    padding: 0 20px 30px;
  }
`;
const FooterGrid = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  margin-bottom: 60px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;
const FooterColumn = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  &:nth-child(1) {
    grid-column: span 1;
    
    @media (max-width: 992px) {
      grid-column: span 2;
    }
  }
`;
const FooterLogo = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].h3`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  margin-bottom: 20px;
  color: #fff;
  letter-spacing: 1px;
`;
const FooterDescription = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].p`
  color: #ccc;
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 15px;
`;
const SocialIcons = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #c19a6b;
      transform: translateY(-3px);
    }
  }
`;
const FooterSubsection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  h4 {
    font-size: 16px;
    margin-bottom: 15px;
    color: #c19a6b;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  
  p {
    color: #aaa;
    font-size: 14px;
    line-height: 1.6;
  }
`;
const FooterHeading = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].h4`
  font-size: 18px;
  margin-bottom: 25px;
  color: #fff;
  position: relative;
  padding-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(to right, #c19a6b, transparent);
  }
`;
const FooterList = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const FooterListItem = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].li`
  margin-bottom: 15px;
  
  a {
    color: #ccc;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    padding-left: 15px;
    font-size: 15px;
    
    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: #c19a6b;
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    &:hover {
      color: #c19a6b;
      padding-left: 20px;
      
      &::before {
        opacity: 1;
        left: 5px;
      }
    }
  }
`;
const FooterBottom = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 25px 0;
  text-align: center;
  margin-top: 40px;
  
  p {
    color: #aaa;
    font-size: 14px;
    margin: 0;
  }
`;
const NewsletterSection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  margin-bottom: 30px;
  
  h4 {
    margin-bottom: 15px;
  }
  
  .newsletter-form {
    display: flex;
    gap: 10px;
    
    input {
      flex: 1;
      padding: 12px 15px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
    }
    
    button {
      background: #c19a6b;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &:hover {
        background: #a8825f;
      }
    }
  }
`;
}),
"[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/styles/FooterStyles.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const Footer = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppContext"])();
    const navigate = (path)=>{
        router.push(path);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterContainer"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterContent"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterGrid"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterColumn"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterLogo"], {
                                    children: "Colour My Space"
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterDescription"], {
                                    children: "Creating extraordinary interiors that blend timeless elegance with contemporary functionality. Award-winning design services for residential and commercial spaces."
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SocialIcons"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            onClick: (e)=>{
                                                e.preventDefault();
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fab fa-instagram"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 41,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            onClick: (e)=>{
                                                e.preventDefault();
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fab fa-pinterest"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 44,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            onClick: (e)=>{
                                                e.preventDefault();
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fab fa-houzz"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 47,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            onClick: (e)=>{
                                                e.preventDefault();
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fab fa-linkedin-in"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 50,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterSubsection"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            children: "Awards & Recognition"
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Featured in Architectural Digest, Elle Decor, and House Beautiful"
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterColumn"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterHeading"], {
                                    children: "Quick Links"
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterList"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/');
                                                },
                                                children: "Home"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 63,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/portfolio');
                                                },
                                                children: "Portfolio"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 66,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services');
                                                },
                                                children: "Services"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 69,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 68,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/shop');
                                                },
                                                children: "Shop"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 72,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/about');
                                                },
                                                children: "About"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 75,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/contact');
                                                },
                                                children: "Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 78,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterColumn"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterHeading"], {
                                    children: "Services"
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterList"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services#residential');
                                                },
                                                children: "Residential Design"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 87,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services#commercial');
                                                },
                                                children: "Commercial Design"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 90,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services#space-planning');
                                                },
                                                children: "Space Planning"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 93,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services#color-consulting');
                                                },
                                                children: "Color Consulting"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 96,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/services#furniture-design');
                                                },
                                                children: "Furniture Design"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterColumn"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterHeading"], {
                                    children: "Shop"
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterList"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/shop');
                                                },
                                                children: "All Products"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/shop');
                                                },
                                                children: "New Arrivals"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 111,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/shop');
                                                },
                                                children: "Best Sellers"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 114,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/shop');
                                                },
                                                children: "Sale Items"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 117,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterListItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    navigate('/orders');
                                                },
                                                children: "Order History"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$FooterStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FooterBottom"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "© 2023 Colour My Space Interior Design. All rights reserved."
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Footer;
}),
"[project]/sk/codebase/newprojs/qwenproj/src/utils/cartUtils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Utility functions for cart operations
__turbopack_context__.s([
    "calculateCartTotal",
    ()=>calculateCartTotal,
    "calculateShippingCost",
    ()=>calculateShippingCost,
    "calculateTotalWithShipping",
    ()=>calculateTotalWithShipping
]);
const calculateCartTotal = (cartItems)=>{
    return cartItems.reduce((total, item)=>{
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price || '0');
        return total + price * item.quantity;
    }, 0);
};
const calculateShippingCost = (subtotal)=>{
    // Free shipping for orders over ₹50,000
    return subtotal > 50000 ? 0 : 1500;
};
const calculateTotalWithShipping = (cartItems)=>{
    const subtotal = calculateCartTotal(cartItems);
    const shipping = calculateShippingCost(subtotal);
    return subtotal + shipping;
};
}),
"[project]/sk/codebase/newprojs/qwenproj/src/styles/ElegantCartStyles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartContainer",
    ()=>CartContainer,
    "CartHeader",
    ()=>CartHeader,
    "CartHeaderSection",
    ()=>CartHeaderSection,
    "CartItem",
    ()=>CartItem,
    "CartItemsHeader",
    ()=>CartItemsHeader,
    "CartItemsList",
    ()=>CartItemsList,
    "CartItemsSection",
    ()=>CartItemsSection,
    "CartSummary",
    ()=>CartSummary,
    "CartSummarySection",
    ()=>CartSummarySection,
    "EmptyCartContent",
    ()=>EmptyCartContent,
    "EmptyCartSection",
    ()=>EmptyCartSection,
    "ItemActions",
    ()=>ItemActions,
    "ItemDetails",
    ()=>ItemDetails,
    "ItemImage",
    ()=>ItemImage,
    "ItemPrice",
    ()=>ItemPrice,
    "ItemProduct",
    ()=>ItemProduct,
    "ItemQuantity",
    ()=>ItemQuantity,
    "ItemTotal",
    ()=>ItemTotal,
    "SummaryActions",
    ()=>SummaryActions,
    "SummaryDetails",
    ()=>SummaryDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
;
const CartContainer = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;
const CartHeader = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  background-color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;
  border-bottom: 1px solid rgba(193, 154, 107, 0.1);

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .nav-logo {
    display: flex;
    align-items: center;
  }

  .logo-image {
    height: 65px;
    max-height: 65px;
    object-fit: contain;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }

  .nav-menu {
    display: flex;
    gap: 35px;
  }

  .nav-link {
    text-decoration: none;
    color: #333;
    font-weight: 400;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: color 0.3s ease;
    position: relative;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;

    &.active, &:hover {
      color: #c19a6b;
    }

    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background: linear-gradient(to right, #c19a6b, transparent);
      transition: width 0.4s ease;
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      right: 0;
      background: linear-gradient(to left, #c19a6b, transparent);
      transition: width 0.4s ease;
    }

    &:hover::before {
      width: 100%;
    }

    &:hover::after {
      width: 100%;
    }

    &.active::before, &.active::after {
      width: 100%;
    }
  }

  .nav-icons {
    display: flex;
    gap: 20px;
  }

  .nav-icon {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #333;
    transition: all 0.3s ease;
    position: relative;
    padding: 8px;
    border-radius: 4px;
    
    &:hover {
      color: #c19a6b;
      background-color: rgba(193, 154, 107, 0.08);
      transform: translateY(-2px);
    }
  }

  .cart-count {
    position: absolute;
    top: -10px;
    right: -10px;
    background: linear-gradient(135deg, #c19a6b, #a8825f);
    color: white;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(193, 154, 107, 0.3);
  }

  .user-greeting {
    color: #333;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 15px;
    margin: 0 10px;
    font-weight: 500;
    text-align: right;
  }

  @media (max-width: 768px) {
    .nav-menu {
      display: none;
    }
  }
`;
const CartHeaderSection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  padding: 60px 0 40px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 15px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  h1::after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
`;
const EmptyCartSection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 40px 20px;
`;
const EmptyCartContent = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  text-align: center;
  max-width: 600px;
  padding: 60px 40px;
  background: white;
  border-radius: 0;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  border: none;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(193,154,107,0.03) 0%, rgba(193,154,107,0.08) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .empty-cart-icon {
    font-size: 6rem;
    color: #c19a6b;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  p {
    color: #666;
    margin-bottom: 30px;
    font-size: 1.2rem;
    line-height: 1.7;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
`;
const CartItemsSection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 80px;
  flex: 1;
`;
const CartItemsHeader = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  padding: 20px 0;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
  font-weight: 600;
  color: #555;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    display: none;
  }
`;
const CartItemsList = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const CartItem = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  align-items: center;
  padding: 30px;
  background: white;
  border-radius: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 15px;
    
    .header-item, .header-price, .header-quantity, .header-total {
      display: none;
    }
  }
`;
const ItemProduct = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;
const ItemImage = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  width: 120px;
  height: 120px;
  background-color: #f8f8f8;
  background-size: cover;
  background-position: center;
  border-radius: 0;
  position: relative;
  
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
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;
const ItemDetails = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  h3 {
    font-size: 1.4rem;
    margin-bottom: 8px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.2rem;
    }
    
    p {
      font-size: 0.8rem;
    }
  }
`;
const ItemPrice = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  text-align: center;
  font-weight: 600;
  color: #c19a6b;
  font-size: 1.2rem;
  font-family: var(--font-playfair), 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`;
const ItemQuantity = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .quantity-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    border-radius: 0;
    
    &:hover {
      background: #c19a6b;
      color: white;
      border-color: #c19a6b;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .quantity {
    font-weight: 600;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;
const ItemTotal = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  text-align: center;
  font-weight: 600;
  color: #c19a6b;
  font-size: 1.2rem;
  font-family: var(--font-playfair), 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`;
const ItemActions = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  justify-content: center;

  .remove-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #c19a6b;
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-top: 10px;
  }
`;
const CartSummarySection = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  max-width: 1400px;
  margin: 80px auto 0;
  padding: 0 40px 80px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 992px) {
    justify-content: center;
    padding: 0 20px 80px;
  }
`;
const CartSummary = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 0;
  padding: 40px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(193,154,107,0.03) 0%, rgba(193,154,107,0.08) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    position: relative;
    padding-bottom: 15px;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: #c19a6b;
  }
`;
const SummaryDetails = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  margin-bottom: 30px;
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    
    span:first-child {
      color: #666;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
    
    span:last-child {
      font-weight: 500;
      color: #222;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
    
    &.total {
      font-weight: 600;
      font-size: 1.2rem;
      border-top: 2px solid #eee;
      margin-top: 10px;
      padding-top: 15px;
      
      span:first-child {
        color: #222;
      }
      
      span:last-child {
        color: #c19a6b;
      }
    }
  }
`;
const SummaryActions = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  .btn {
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 0;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: 0.8s;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      
      &::before {
        left: 100%;
      }
    }
  }
  
  .btn.primary {
    background: #c19a6b;
    color: white;
    
    &:hover {
      background: #a8825f;
    }
  }
  
  .btn.secondary {
    background: transparent;
    color: #c19a6b;
    border: 2px solid #c19a6b;
    
    &:hover {
      background: #c19a6b;
      color: white;
    }
  }
`;
}),
"[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/components/Header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/components/Footer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$utils$2f$cartUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/utils/cartUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/styles/ElegantCartStyles.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const EnhancedCartPage = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const navigate = (path)=>{
        router.push(path);
    };
    const { cartItems, loading, error, updateCartItem, removeFromCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppContext"])();
    const updateQuantity = (productId, newQuantity)=>{
        if (newQuantity < 1) {
            // If quantity is less than 1, remove the item
            removeFromCart(productId);
            return;
        }
        updateCartItem(productId, newQuantity);
    };
    const subtotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$utils$2f$cartUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateCartTotal"])(cartItems);
    const shipping = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$utils$2f$cartUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateShippingCost"])(subtotal);
    const total = subtotal + shipping;
    const handleCheckout = ()=>{
        if (cartItems.length > 0) {
            navigate('/checkout');
        }
    };
    const continueShopping = ()=>{
        navigate('/shop');
    };
    if (cartItems.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartContainer"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    activePage: "cart"
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartHeaderSection"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Shopping Cart"
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyCartSection"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyCartContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fas fa-shopping-cart empty-cart-icon"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Your cart is empty"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Looks like you haven't added any items to your cart yet."
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn primary",
                                onClick: continueShopping,
                                children: "Continue Shopping"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartContainer"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                activePage: "cart"
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartHeaderSection"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "Shopping Cart"
                }, void 0, false, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            error.cart && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "error-message",
                children: error.cart
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                lineNumber: 92,
                columnNumber: 22
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartItemsSection"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartItemsHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "header-item",
                                children: "Product"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "header-price",
                                children: "Price"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "header-quantity",
                                children: "Quantity"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "header-total",
                                children: "Total"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "header-actions"
                            }, void 0, false, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartItemsList"], {
                        children: cartItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartItem"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemProduct"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemImage"], {
                                                imageClass: item.imageClass || 'modern'
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                                lineNumber: 107,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemDetails"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: item.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemPrice"], {
                                        children: [
                                            "₹",
                                            typeof item.price === 'number' ? item.price.toLocaleString() : parseFloat(item.price || '0').toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemQuantity"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "quantity-btn",
                                                onClick: ()=>updateQuantity(item.id, item.quantity - 1),
                                                disabled: loading.cart || item.quantity <= 1,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-minus"
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "quantity",
                                                children: item.quantity
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "quantity-btn",
                                                onClick: ()=>updateQuantity(item.id, item.quantity + 1),
                                                disabled: loading.cart,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-plus"
                                                }, void 0, false, {
                                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemTotal"], {
                                        children: [
                                            "₹",
                                            typeof item.price === 'number' ? (item.price * item.quantity).toLocaleString() : (parseFloat(item.price || '0') * item.quantity).toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemActions"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "remove-btn",
                                            onClick: ()=>removeFromCart(item.id),
                                            disabled: loading.cart,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "fas fa-trash-alt"
                                            }, void 0, false, {
                                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                                lineNumber: 150,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, item.id, true, {
                                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartSummarySection"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartSummary"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Order Summary"
                        }, void 0, false, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SummaryDetails"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "summary-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Subtotal"
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "₹",
                                                subtotal.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "summary-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Shipping"
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "summary-row total",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Total"
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "₹",
                                                total.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$styles$2f$ElegantCartStyles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SummaryActions"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn secondary",
                                    onClick: continueShopping,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fas fa-arrow-left"
                                        }, void 0, false, {
                                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                            lineNumber: 181,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Continue Shopping"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn primary",
                                    onClick: handleCheckout,
                                    disabled: loading.cart || cartItems.length === 0,
                                    children: "Proceed to Checkout"
                                }, void 0, false, {
                                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/sk/codebase/newprojs/qwenproj/src/components/EnhancedCartPage.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = EnhancedCartPage;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__25da97dd._.js.map