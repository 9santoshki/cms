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
"[project]/src/lib/slug.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// utils/slug.ts
__turbopack_context__.s([
    "generateUniqueSlug",
    ()=>generateUniqueSlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
// Initialize Supabase client
const supabaseUrl = ("TURBOPACK compile-time value", "https://fykdwqlayqcxycrvbhew.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
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
            let { data, error } = excludeId ? await supabase.from('products').select('id').eq('slug', slug).neq('id', excludeId) : await supabase.from('products').select('id').eq('slug', slug);
            if (error) {
                console.error('Error checking slug uniqueness:', error);
                // If there's an error, fallback to a unique slug using timestamp
                slug = `${baseSlug}-${Date.now()}`;
                isUnique = true;
            } else if (data && data.length === 0) {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slug$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/slug.ts [app-route] (ecmascript)");
;
;
;
// Initialize Supabase client
const supabaseUrl = ("TURBOPACK compile-time value", "https://fykdwqlayqcxycrvbhew.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
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
        // Build the query using Supabase client
        let query = supabase.from('products').select(`
        id,
        name,
        description,
        price,
        category,
        images,
        stock_quantity,
        created_at,
        updated_at,
        slug
      `).range(offset, offset + limit - 1);
        if (search) {
            query = query.or(`name.ilike.${`%${search}%`},description.ilike.${`%${search}%`}`);
        }
        if (category) {
            query = query.eq('category', category);
        }
        if (minPrice !== null && !isNaN(minPrice)) {
            query = query.gte('price', minPrice);
        }
        if (maxPrice !== null && !isNaN(maxPrice)) {
            query = query.lte('price', maxPrice);
        }
        query = query.order('created_at', {
            ascending: false
        });
        // Execute the main query
        const { data: productsResult, error: productsError } = await query;
        if (productsError) {
            console.error('Error fetching products:', productsError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Failed to fetch products'
            }, {
                status: 500
            });
        }
        // For each product, try to fetch its associated images
        const productsWithImages = await Promise.all(productsResult.map(async (product)=>{
            try {
                const { data: imagesResult, error: imageError } = await supabase.from('product_images').select('image_url, is_primary, sort_order').eq('product_id', product.id).order('sort_order');
                if (imageError) {
                    throw imageError;
                }
                return {
                    ...product,
                    images: imagesResult.map((img)=>img.image_url),
                    primary_image: imagesResult.find((img)=>img.is_primary)?.image_url || product.image_url
                };
            } catch (imageError) {
                // If product_images table doesn't exist or has an error, return product with just the images field
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
        let countQuery = supabase.from('products').select('id', {
            count: 'exact',
            head: true
        });
        if (search) {
            countQuery = countQuery.or(`name.ilike.${`%${search}%`},description.ilike.${`%${search}%`}`);
        }
        if (category) {
            countQuery = countQuery.eq('category', category);
        }
        if (minPrice !== null && !isNaN(minPrice)) {
            countQuery = countQuery.gte('price', minPrice);
        }
        if (maxPrice !== null && !isNaN(maxPrice)) {
            countQuery = countQuery.lte('price', maxPrice);
        }
        const { count, error: countError } = await countQuery;
        if (countError) {
            console.error('Error counting products:', countError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Failed to count products'
            }, {
                status: 500
            });
        }
        const total = count || 0;
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
        const { data: product, error: productError } = await supabase.from('products').insert([
            {
                name,
                description,
                price,
                image_url,
                category,
                slug
            }
        ]).select().single();
        if (productError) {
            console.error('Error creating product:', productError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: productError.message
            }, {
                status: 500
            });
        }
        // If multiple images are provided, add them to the product_images table
        if (Array.isArray(image_urls) && image_urls.length > 0) {
            try {
                const imagesToInsert = image_urls.map((img_url, index)=>({
                        product_id: product.id,
                        image_url: img_url,
                        is_primary: index === 0,
                        // Make the first image primary by default
                        sort_order: index
                    }));
                const { error: imagesError } = await supabase.from('product_images').insert(imagesToInsert);
                if (imagesError) {
                    throw imagesError;
                }
            } catch (insertError) {
                console.warn(`Could not insert images for product ${product.id}:`, insertError.message || insertError);
            }
        } else if (image_url) {
            // If only a single image is provided, add it as a primary image
            try {
                const { error: imageError } = await supabase.from('product_images').insert([
                    {
                        product_id: product.id,
                        image_url,
                        is_primary: true,
                        sort_order: 0
                    }
                ]);
                if (imageError) {
                    throw imageError;
                }
            } catch (insertError) {
                console.warn(`Could not insert image for product ${product.id}:`, insertError.message || insertError);
            }
        }
        // Fetch the product with its images to return
        // Handle case where product_images table might not exist yet
        let productWithImages;
        try {
            const { data: imagesResult, error: imageError } = await supabase.from('product_images').select('image_url, is_primary, sort_order').eq('product_id', product.id).order('sort_order');
            if (imageError) {
                throw imageError;
            }
            productWithImages = {
                ...product,
                images: imagesResult.map((img)=>img.image_url),
                primary_image: imagesResult.find((img)=>img.is_primary)?.image_url || product.image_url
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

//# sourceMappingURL=%5Broot-of-the-server%5D__c85f4bea._.js.map