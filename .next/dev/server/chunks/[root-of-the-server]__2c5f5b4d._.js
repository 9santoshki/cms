module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/sk/codebase/newprojs/qwenproj/src/lib/mockData.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock data for testing purposes when database is not available
__turbopack_context__.s([
    "mockCartItems",
    ()=>mockCartItems,
    "mockOrders",
    ()=>mockOrders,
    "mockProducts",
    ()=>mockProducts,
    "mockUser",
    ()=>mockUser
]);
const mockProducts = [
    {
        id: 1,
        name: "Modern Coffee Table",
        description: "Elegant glass and steel coffee table with minimalist design",
        price: 399.99,
        image_url: "modern-coffee-table",
        category: "Furniture"
    },
    {
        id: 2,
        name: "Designer Armchair",
        description: "Comfortable and stylish armchair with premium fabric",
        price: 599.99,
        image_url: "designer-armchair",
        category: "Furniture"
    },
    {
        id: 3,
        name: "Vintage Lamp",
        description: "Beautiful vintage table lamp with brass finish",
        price: 149.99,
        image_url: "vintage-lamp",
        category: "Lighting"
    },
    {
        id: 4,
        name: "Contemporary Sofa",
        description: "Luxurious three-seater sofa with modern design",
        price: 1299.99,
        image_url: "contemporary-sofa",
        category: "Furniture"
    },
    {
        id: 5,
        name: "Decorative Rug",
        description: "Handwoven rug with intricate pattern and soft texture",
        price: 249.99,
        image_url: "decorative-rug",
        category: "Decor"
    },
    {
        id: 6,
        name: "Wall Art Collection",
        description: "Set of three abstract art pieces for modern interiors",
        price: 199.99,
        image_url: "wall-art",
        category: "Decor"
    },
    {
        id: 7,
        name: "Dining Table Set",
        description: "Six-seater dining table with matching chairs",
        price: 1799.99,
        image_url: "dining-table",
        category: "Furniture"
    },
    {
        id: 8,
        name: "Bedroom Dresser",
        description: "Spacious dresser with six drawers and elegant handles",
        price: 799.99,
        image_url: "bedroom-dresser",
        category: "Furniture"
    }
];
const mockCartItems = [
    {
        id: 1,
        product_id: 1,
        name: "Modern Coffee Table",
        price: 399.99,
        quantity: 1,
        image_url: "modern-coffee-table"
    }
];
const mockOrders = [
    {
        id: 1,
        user_id: 1,
        total: 399.99,
        status: "completed",
        created_at: new Date().toISOString(),
        items: [
            {
                id: 1,
                product_id: 1,
                name: "Modern Coffee Table",
                price: 399.99,
                quantity: 1
            }
        ]
    }
];
const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "customer"
};
}),
"[project]/sk/codebase/newprojs/qwenproj/src/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/src/lib/mockData.ts [app-route] (ecmascript)");
;
;
async function GET(_request) {
    try {
        // For development/testing without database
        return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockProducts"]
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, price, image_url, category } = body;
        if (!name || !description || !price || price <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Name, description, and price are required'
            }, {
                status: 400
            });
        }
        // In a real implementation, this would add to the database
        // For now, we'll just return the submitted data
        const newProduct = {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$lib$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mockProducts"].length + 1,
            name,
            description,
            price,
            image_url: image_url || 'default',
            category: category || 'Furniture',
            created_at: new Date().toISOString()
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: newProduct
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Error creating product:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2c5f5b4d._.js.map