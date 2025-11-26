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
"[project]/src/lib/slug.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// utils/slug.ts
__turbopack_context__.s([
    "generateUniqueSlug",
    ()=>generateUniqueSlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
const generateUniqueSlug = async (name, excludeId)=>{
    // Basic slugification: convert to lowercase, replace spaces with hyphens, remove special characters
    let baseSlug = name.toLowerCase().replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    // Ensure minimum length and handle empty slug
    if (baseSlug.length < 3) {
        baseSlug = `product-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    }
    // Check if the slug already exists in the database
    let slug = baseSlug;
    let counter = 1;
    let isUnique = false;
    while(!isUnique){
        try {
            const query = excludeId ? 'SELECT id FROM products WHERE slug = $1 AND id != $2' : 'SELECT id FROM products WHERE slug = $1';
            const params = excludeId ? [
                slug,
                excludeId
            ] : [
                slug
            ];
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(query, params);
            if (result.rows.length === 0) {
                // Slug is unique
                isUnique = true;
            } else {
                // Slug exists, add counter and try again
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
        } catch (error) {
            console.error('Error checking slug uniqueness:', error);
            // If there's an error, fallback to a unique slug using timestamp
            slug = `${baseSlug}-${Date.now()}`;
            isUnique = true;
        }
    }
    return slug;
};
}),
"[project]/src/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/slug.ts [app-route] (ecmascript)");
;
;
;
async function OPTIONS(request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({}, {
        headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
        }
    });
}
async function GET(request) {
    try {
        // Extract search, filter, and pagination parameters from query
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';
        const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')) : null;
        const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')) : null;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const offset = (page - 1) * limit;
        // Build the query with filtering conditions
        let query = `
      SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.price, 
        p.category, 
        p.images, 
        p.stock_quantity,
        p.created_at,
        p.updated_at,
        p.slug
      FROM products p
      WHERE 1=1
    `;
        const queryParams = [];
        if (search) {
            queryParams.push(`%${search}%`, `%${search}%`);
            query += ` AND (p.name ILIKE $${queryParams.length - 1} OR p.description ILIKE $${queryParams.length})`;
        }
        if (category) {
            queryParams.push(category);
            query += ` AND p.category = $${queryParams.length}`;
        }
        if (minPrice !== null && !isNaN(minPrice)) {
            queryParams.push(minPrice);
            query += ` AND p.price >= $${queryParams.length}`;
        }
        if (maxPrice !== null && !isNaN(maxPrice)) {
            queryParams.push(maxPrice);
            query += ` AND p.price <= $${queryParams.length}`;
        }
        // Add pagination
        queryParams.push(limit, offset);
        query += ` ORDER BY p.created_at DESC LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`;
        // Get products with their associated images
        const productsResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(query, queryParams);
        // For each product, try to fetch its associated images
        // Handle case where product_images table might not exist yet
        const productsWithImages = await Promise.all(productsResult.rows.map(async (product)=>{
            try {
                const imagesResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT image_url, is_primary, sort_order FROM product_images WHERE product_id = $1 ORDER BY sort_order', [
                    product.id
                ]);
                return {
                    ...product,
                    images: imagesResult.rows.map((img)=>img.image_url),
                    primary_image: imagesResult.rows.find((img)=>img.is_primary)?.image_url || product.image_url
                };
            } catch (imageError) {
                // If product_images table doesn't exist, return product with just the original image_url
                console.warn(`Could not fetch images for product ${product.id}:`, imageError.message || imageError);
                return {
                    ...product,
                    images: Array.isArray(product.images) ? product.images : product.image_url ? [
                        product.image_url
                    ] : [],
                    primary_image: product.image_url
                };
            }
        }));
        // Get total count for pagination
        let countQuery = `SELECT COUNT(*) FROM products p WHERE 1=1`;
        const countParams = [];
        if (search) {
            countParams.push(`%${search}%`, `%${search}%`);
            countQuery += ` AND (p.name ILIKE $${countParams.length - 1} OR p.description ILIKE $${countParams.length})`;
        }
        if (category) {
            countParams.push(category);
            countQuery += ` AND p.category = $${countParams.length}`;
        }
        if (minPrice !== null && !isNaN(minPrice)) {
            countParams.push(minPrice);
            countQuery += ` AND p.price >= $${countParams.length}`;
        }
        if (maxPrice !== null && !isNaN(maxPrice)) {
            countParams.push(maxPrice);
            countQuery += ` AND p.price <= $${countParams.length}`;
        }
        const countResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(countQuery, countParams);
        const total = parseInt(countResult.rows[0].count);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                products: productsWithImages,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                    hasMore: page < Math.ceil(total / limit)
                },
                filters: {
                    search,
                    category,
                    minPrice,
                    maxPrice
                }
            }
        }, {
            headers: {
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
                "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500,
            headers: {
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
                "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
            }
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, price, image_url, image_urls, category } = body;
        if (!name || !description || !price || price <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Name, description, and price are required'
            }, {
                status: 400,
                headers: {
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
                    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
                }
            });
        }
        // Generate a unique slug for the product
        const slug = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateUniqueSlug"])(name);
        // Create the product first
        const productResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('INSERT INTO products (name, description, price, image_url, category, slug) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            name,
            description,
            price,
            image_url,
            category,
            slug
        ]);
        const product = productResult.rows[0];
        // If multiple images are provided, add them to the product_images table
        if (Array.isArray(image_urls) && image_urls.length > 0) {
            try {
                for(let i = 0; i < image_urls.length; i++){
                    const isPrimary = i === 0; // Make the first image primary by default
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES ($1, $2, $3, $4)', [
                        product.id,
                        image_urls[i],
                        isPrimary,
                        i
                    ]);
                }
            } catch (insertError) {
                console.warn(`Could not insert images for product ${product.id}:`, insertError.message || insertError);
            }
        } else if (image_url) {
            // If only a single image is provided, add it as a primary image
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES ($1, $2, $3, $4)', [
                    product.id,
                    image_url,
                    true,
                    0
                ]);
            } catch (insertError) {
                console.warn(`Could not insert image for product ${product.id}:`, insertError.message || insertError);
            }
        }
        // Fetch the product with its images to return
        // Handle case where product_images table might not exist yet
        let productWithImages;
        try {
            const imagesResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT image_url, is_primary, sort_order FROM product_images WHERE product_id = $1 ORDER BY sort_order', [
                product.id
            ]);
            productWithImages = {
                ...product,
                images: imagesResult.rows.map((img)=>img.image_url),
                primary_image: imagesResult.rows.find((img)=>img.is_primary)?.image_url || product.image_url
            };
        } catch (imageError) {
            // If product_images table doesn't exist, return product with just the original image_url
            console.warn(`Could not fetch images for product ${product.id}:`, imageError.message || imageError);
            productWithImages = {
                ...product,
                images: product.image_url ? [
                    product.image_url
                ] : [],
                primary_image: product.image_url
            };
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: productWithImages
        }, {
            status: 201,
            headers: {
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
                "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
            }
        });
    } catch (error) {
        console.error('Error creating product:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500,
            headers: {
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
                "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9de00a68._.js.map