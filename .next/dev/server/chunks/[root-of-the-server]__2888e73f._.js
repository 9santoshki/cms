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
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
// Initialize Supabase clients
const supabaseUrl = ("TURBOPACK compile-time value", "https://fykdwqlayqcxycrvbhew.supabase.co") || process.env.SUPABASE_URL;
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo") || process.env.SUPABASE_ANON_KEY;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey) : "TURBOPACK unreachable";
// Create a wrapper that provides both direct query method and Supabase methods
const db = {
    // Direct query method that translates SQL to Supabase calls
    query: async (sql, params)=>{
        if (!supabase) {
            return {
                rows: [],
                rowCount: 0,
                error: new Error('Supabase client not initialized')
            };
        }
        try {
            // Parse SQL to determine operation type
            const sqlLower = sql.toLowerCase().trim();
            if (sqlLower.startsWith('select')) {
                // Parse SELECT query - more flexible to handle WHERE clauses and other parts
                let columns, tableName;
                const selectMatch = sql.match(/select\s+(.*?)\s+from\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
                if (!selectMatch) {
                    throw new Error('Could not parse SELECT query');
                }
                columns = selectMatch[1].trim();
                tableName = selectMatch[2].trim();
                // Check if there's a WHERE clause
                const hasWhere = sqlLower.includes('where');
                let queryBuilder = supabase.from(tableName).select(columns === '*' ? '*' : columns);
                if (hasWhere) {
                    // Extract WHERE clause parts
                    const whereRegex = /where\s+(.*?)(?:\s+order\s+by|\s+limit|\s+group\s+by|$)/i;
                    const whereMatch = sql.match(whereRegex);
                    if (whereMatch && whereMatch[1]) {
                        const whereClause = whereMatch[1].trim();
                        // Handle different WHERE patterns with parameters
                        if (whereClause.includes('email = $1') && params && params.length >= 1) {
                            queryBuilder = queryBuilder.eq('email', params[0]);
                        } else if (whereClause.includes('user_id = $1') && params && params.length >= 1) {
                            queryBuilder = queryBuilder.eq('user_id', params[0]);
                        } else if (whereClause.includes('id = $1') && params && params.length >= 1) {
                            queryBuilder = queryBuilder.eq('id', params[0]);
                        } else if (whereClause.includes('product_id = $1') && params && params.length >= 1) {
                            queryBuilder = queryBuilder.eq('product_id', params[0]);
                        } else if (whereClause.includes('user_id = $1 AND product_id = $2') && params && params.length >= 2) {
                            queryBuilder = queryBuilder.eq('user_id', params[0]).eq('product_id', params[1]);
                        } else if (whereClause.includes('slug = $1') && params && params.length >= 1) {
                            queryBuilder = queryBuilder.eq('slug', params[0]);
                        } else {
                            // Generic handling for other patterns - need to extract column name and parameter
                            const genericPattern = /([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\$(\d+)/;
                            const match = whereClause.match(genericPattern);
                            if (match && params && params.length >= parseInt(match[2])) {
                                const col = match[1];
                                const paramIdx = parseInt(match[2]) - 1;
                                queryBuilder = queryBuilder.eq(col, params[paramIdx]);
                            }
                        }
                    }
                }
                const { data, error } = await queryBuilder;
                if (error) {
                    return {
                        rows: [],
                        rowCount: 0,
                        error
                    };
                }
                return {
                    rows: Array.isArray(data) ? data : data ? [
                        data
                    ] : [],
                    rowCount: data ? Array.isArray(data) ? data.length : 1 : 0,
                    error: null
                };
            } else if (sqlLower.startsWith('insert')) {
                // Parse INSERT query
                const insertMatch = sql.match(/insert\s+into\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(\s*([^)]+)\s*\)\s+values\s*\(\s*([^)]+)\s*\)/i);
                if (!insertMatch) {
                    throw new Error('Could not parse INSERT query');
                }
                const tableName = insertMatch[1];
                const columnsStr = insertMatch[2];
                const columns = columnsStr.replace(/\s/g, '').split(','); // Remove spaces and split by comma
                if (!params || params.length === 0) {
                    throw new Error('INSERT query has no parameters');
                }
                // Create an object mapping columns to parameter values
                const insertData = {};
                for(let i = 0; i < columns.length && i < params.length; i++){
                    insertData[columns[i]] = params[i];
                }
                const { data, error } = await supabase.from(tableName).insert(insertData).select();
                return {
                    rows: Array.isArray(data) ? data : data ? [
                        data
                    ] : [],
                    rowCount: data ? Array.isArray(data) ? data.length : 1 : 0,
                    error
                };
            } else if (sqlLower.startsWith('update')) {
                // Parse UPDATE query
                const updateMatch = sql.match(/update\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+set\s+(.*?)\s+where\s+(.*)/i);
                if (!updateMatch) {
                    throw new Error('Could not parse UPDATE query');
                }
                const tableName = updateMatch[1];
                const setClause = updateMatch[2];
                const whereClause = updateMatch[3];
                // Parse SET clause: col1=$1, col2=$2, etc.
                const setData = {};
                const setParts = setClause.split(',').map((p)=>p.trim());
                let paramIndex = 0;
                setParts.forEach((part)=>{
                    const [key, value] = part.split('=').map((p)=>p.trim());
                    // Map $1, $2 etc to actual parameter values
                    setData[key] = params[paramIndex];
                    paramIndex++;
                });
                // Parse WHERE clause: col=$n, etc.
                const whereConditions = {};
                const whereParts = whereClause.split('AND').map((p)=>p.trim());
                whereParts.forEach((part)=>{
                    const [key, value] = part.split('=').map((p)=>p.trim());
                    // Map $1, $2 etc to actual parameter values
                    const paramNum = parseInt(value.substring(1)) - 1; // Convert $2 to index 1
                    whereConditions[key] = params[paramNum];
                });
                const { data, error } = await supabase.from(tableName).update(setData).match(whereConditions).select();
                return {
                    rows: Array.isArray(data) ? data : data ? [
                        data
                    ] : [],
                    rowCount: data ? Array.isArray(data) ? data.length : 1 : 0,
                    error
                };
            } else if (sqlLower.startsWith('delete')) {
                // Parse DELETE query
                const deleteMatch = sql.match(/delete\s+from\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+where\s+(.*)/i);
                if (!deleteMatch) {
                    throw new Error('Could not parse DELETE query');
                }
                const tableName = deleteMatch[1];
                const whereClause = deleteMatch[2];
                // Parse WHERE clause
                const whereConditions = {};
                const whereParts = whereClause.split('AND').map((p)=>p.trim());
                let paramIndex = 0;
                whereParts.forEach((part)=>{
                    const [key, valuePlaceholder] = part.split('=').map((p)=>p.trim());
                    // Assuming the valuePlaceholder is like $1, $2, etc.
                    whereConditions[key] = params[paramIndex];
                    paramIndex++;
                });
                const { data, error } = await supabase.from(tableName).delete().match(whereConditions);
                return {
                    rows: data ? [
                        data
                    ] : [],
                    rowCount: data ? 1 : 0,
                    error
                };
            } else {
                throw new Error(`Unsupported SQL operation: ${sql.substring(0, 20)}...`);
            }
        } catch (error) {
            return {
                rows: [],
                rowCount: 0,
                error
            };
        }
    },
    // Supabase methods
    from: (table)=>{
        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }
        return supabase.from(table);
    },
    select: (columns)=>{
        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }
        return supabase.from('users').select(columns); // Default to 'users', caller should use from() first
    },
    insert: (data)=>{
        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }
        return supabase.from('users').insert(data); // Default to 'users', caller should use from() first
    },
    update: (data)=>{
        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }
        return supabase.from('users').update(data); // Default to 'users', caller should use from() first
    },
    delete: ()=>{
        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }
        return supabase.from('users').delete(); // Default to 'users', caller should use from() first
    }
};
const __TURBOPACK__default__export__ = db;
;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/app/api/cart/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
;
;
// Verify JWT token and return user ID
async function getUserIdFromRequest(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.replace('Bearer ', '');
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not set in environment variables');
    }
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, jwtSecret);
        return decoded.id;
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}
async function GET(request) {
    try {
        const userId = await getUserIdFromRequest(request);
        if (userId) {
            // Authenticated user - get database cart
            const cartItemsResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(`SELECT ci.id, ci.product_id, ci.quantity, 
                p.name, p.price, p.image_url
         FROM cart_items ci
         JOIN products p ON ci.product_id = p.id
         WHERE ci.user_id = $1`, [
                userId
            ]);
            if (cartItemsResult.error) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Failed to fetch cart items'
                }, {
                    status: 500
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: cartItemsResult.rows
            }, {
                status: 200
            });
        } else {
            // Unauthenticated user - return empty cart
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: []
            }, {
                status: 200
            });
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const userId = await getUserIdFromRequest(request);
        if (!userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Authentication required'
            }, {
                status: 401
            });
        }
        const { product_id, quantity = 1 } = await request.json();
        if (!product_id || typeof product_id !== 'number' || product_id <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Valid product ID is required'
            }, {
                status: 400
            });
        }
        if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Valid positive quantity is required'
            }, {
                status: 400
            });
        }
        // First check if the cart item already exists
        const existingItemResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id, quantity FROM cart_items WHERE user_id = $1 AND product_id = $2', [
            userId,
            product_id
        ]);
        let result;
        if (existingItemResult.rows.length > 0) {
            // Item exists, update the quantity by adding to existing quantity
            const newQuantity = existingItemResult.rows[0].quantity + quantity;
            const updateResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING id, product_id, quantity', [
                newQuantity,
                userId,
                product_id
            ]);
            if (updateResult.error) {
                console.error('Error updating cart item:', updateResult.error);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Failed to update cart item'
                }, {
                    status: 500
                });
            }
            if (updateResult.rows.length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Failed to update cart item'
                }, {
                    status: 500
                });
            }
            result = updateResult.rows[0];
        } else {
            // Item doesn't exist, insert new cart item
            const insertResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id, product_id, quantity', [
                userId,
                product_id,
                quantity
            ]);
            if (insertResult.error) {
                // Check if it's a duplicate key error (race condition - another request inserted it)
                if (insertResult.error.code === '23505' || insertResult.error.message?.toLowerCase().includes('duplicate') || insertResult.error.message?.toLowerCase().includes('unique')) {
                    // Race condition: item was inserted by another request, update instead
                    const updateResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING id, product_id, quantity', [
                        quantity,
                        userId,
                        product_id
                    ]);
                    if (updateResult.error || updateResult.rows.length === 0) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: false,
                            error: 'Failed to add item to cart'
                        }, {
                            status: 500
                        });
                    }
                    result = updateResult.rows[0];
                } else {
                    console.error('Error inserting cart item:', insertResult.error);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: false,
                        error: 'Failed to add item to cart'
                    }, {
                        status: 500
                    });
                }
            } else if (insertResult.rows.length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Failed to add item to cart'
                }, {
                    status: 500
                });
            } else {
                result = insertResult.rows[0];
            }
        }
        // Get product details to return with the cart item
        const productResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT name, price, image_url FROM products WHERE id = $1', [
            product_id
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                ...result,
                name: productResult.rows[0]?.name || 'Unknown Product',
                price: productResult.rows[0]?.price || 0,
                image_url: productResult.rows[0]?.image_url || null
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const userId = await getUserIdFromRequest(request);
        if (!userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Authentication required'
            }, {
                status: 401
            });
        }
        const { product_id, quantity } = await request.json();
        if (!product_id || typeof product_id !== 'number' || product_id <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Valid product ID is required'
            }, {
                status: 400
            });
        }
        if (typeof quantity !== 'number' || isNaN(quantity)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Valid quantity is required'
            }, {
                status: 400
            });
        }
        if (quantity <= 0) {
            // If quantity is 0 or negative, remove item from cart
            const deleteResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [
                userId,
                product_id
            ]);
            if (deleteResult.error) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Failed to remove item from cart'
                }, {
                    status: 500
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: 'Item removed from cart'
            }, {
                status: 200
            });
        } else {
            // Update quantity
            const updateResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3', [
                quantity,
                userId,
                product_id
            ]);
            if (updateResult.error) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Failed to update cart item'
                }, {
                    status: 500
                });
            }
            // Get the updated cart item
            const updatedCartItemResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id, product_id, quantity FROM cart_items WHERE user_id = $1 AND product_id = $2', [
                userId,
                product_id
            ]);
            // Get product details to return with updated cart item
            const productResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT name, price, image_url FROM products WHERE id = $1', [
                product_id
            ]);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: {
                    ...updatedCartItemResult.rows[0],
                    name: productResult.rows[0]?.name || 'Unknown Product',
                    price: productResult.rows[0]?.price || 0,
                    image_url: productResult.rows[0]?.image_url || null
                }
            }, {
                status: 200
            });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const userId = await getUserIdFromRequest(request);
        if (userId) {
            // Authenticated user - clear database cart
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('DELETE FROM cart_items WHERE user_id = $1', [
                userId
            ]);
        }
        // For unauthenticated users, just return success for client-side handling
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Cart cleared'
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2888e73f._.js.map