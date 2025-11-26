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
"[project]/src/app/api/products/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/slug.ts [app-route] (ecmascript)");
;
;
;
async function GET(_request, context) {
    try {
        // Wait for params to be resolved in Next.js 13+ App Router
        const params = await context.params;
        const productIdOrSlug = params.id;
        if (productIdOrSlug === undefined) {
            console.error('Parameter is undefined');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Product parameter is missing'
            }, {
                status: 400
            });
        }
        // Prefer slug lookup for better SEO and UX
        // First try to find by slug (non-numeric string)
        const isNumericId = /^\d+$/.test(productIdOrSlug);
        let productResult;
        if (!isNumericId) {
            // Parameter is a slug (string with non-numeric characters)
            productResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT * FROM products WHERE slug = $1', [
                productIdOrSlug
            ]);
        } else {
            // Parameter is a numeric ID
            const productId = parseInt(productIdOrSlug, 10);
            if (isNaN(productId)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: `Invalid product ID: ${productIdOrSlug}`
                }, {
                    status: 400
                });
            }
            productResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT * FROM products WHERE id = $1', [
                productId
            ]);
        }
        if (productResult.rows.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Product not found'
            }, {
                status: 404
            });
        }
        if (productResult.rows.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Product not found'
            }, {
                status: 404
            });
        }
        const product = productResult.rows[0];
        // Fetch associated images for the product
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
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function PUT(request, { params }) {
    try {
        const { id } = params;
        // Convert the id to integer for database query
        const productId = parseInt(id, 10);
        const body = await request.json();
        const { name, description, price, image_url, image_urls, category } = body;
        if (!name || !description || !price || price <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Name, description, and price are required'
            }, {
                status: 400
            });
        }
        // Start a transaction to ensure data consistency
        const client = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].connect();
        try {
            await client.query('BEGIN');
            // First fetch the existing product
            const existingProductResult = await client.query('SELECT * FROM products WHERE id = $1', [
                productId
            ]);
            if (existingProductResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Product not found'
                }, {
                    status: 404
                });
            }
            const existingProduct = existingProductResult.rows[0];
            // If name has changed, generate a new unique slug
            let updatedFields = 'name = $1, description = $2, price = $3, image_url = $4, category = $5';
            const queryParams = [
                name,
                description,
                price,
                image_url,
                category
            ];
            if (name !== existingProduct.name) {
                // Generate new slug based on the new name
                const newSlug = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateUniqueSlug"])(name, productId);
                updatedFields += ', slug = $6';
                queryParams.push(newSlug);
                queryParams.push(productId); // Id for WHERE clause
            } else {
                queryParams.push(productId); // Id for WHERE clause
            }
            // Update the product
            const productResult = await client.query(`UPDATE products SET ${updatedFields} WHERE id = $${queryParams.length} RETURNING *`, queryParams);
            if (productResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Product not found'
                }, {
                    status: 404
                });
            }
            const product = productResult.rows[0];
            // Delete existing images for this product (handle case where table might not exist)
            try {
                await client.query('DELETE FROM product_images WHERE product_id = $1', [
                    productId
                ]);
            } catch (deleteError) {
                console.warn(`Could not delete images for product ${productId}:`, deleteError.message || deleteError);
            }
            // If multiple images are provided, add them to the product_images table
            if (Array.isArray(image_urls) && image_urls.length > 0) {
                try {
                    for(let i = 0; i < image_urls.length; i++){
                        const isPrimary = i === 0; // Make the first image primary by default
                        await client.query('INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES ($1, $2, $3, $4)', [
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
                    await client.query('INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES ($1, $2, $3, $4)', [
                        product.id,
                        image_url,
                        true,
                        0
                    ]);
                } catch (insertError) {
                    console.warn(`Could not insert image for product ${product.id}:`, insertError.message || insertError);
                }
            }
            await client.query('COMMIT');
            // Fetch the updated product with its images to return
            // Handle case where product_images table might not exist yet
            let productWithImages;
            try {
                const imagesResult = await client.query('SELECT image_url, is_primary, sort_order FROM product_images WHERE product_id = $1 ORDER BY sort_order', [
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
            });
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally{
            client.release();
        }
    } catch (error) {
        console.error('Error updating product:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function DELETE(_request, { params }) {
    try {
        const { id } = params;
        // Convert the id to integer for database query
        const productId = parseInt(id, 10);
        const { rowCount } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('DELETE FROM products WHERE id = $1', [
            productId
        ]);
        if (rowCount === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Product not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__d9a9cd6c._.js.map