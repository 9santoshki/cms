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
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/lib/db/connection.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getClient",
    ()=>getClient,
    "query",
    ()=>query
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// Create a connection pool
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'cmsdb',
    user: process.env.DB_USER || 'sk',
    password: process.env.DB_PASSWORD || 'sk',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});
pool.on('error', (err)=>{
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
const query = async (text, params)=>{
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};
const getClient = async ()=>{
    const client = await pool.connect();
    return client;
};
const __TURBOPACK__default__export__ = pool;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/db/productImages.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "addProductImage",
    ()=>addProductImage,
    "deleteAllProductImages",
    ()=>deleteAllProductImages,
    "deleteProductImage",
    ()=>deleteProductImage,
    "getPrimaryImage",
    ()=>getPrimaryImage,
    "getProductImages",
    ()=>getProductImages,
    "setPrimaryImage",
    ()=>setPrimaryImage,
    "updateImageOrder",
    ()=>updateImageOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/connection.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function getProductImages(productId) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT * FROM product_images WHERE product_id = $1 ORDER BY display_order ASC, created_at ASC', [
        productId
    ]);
    return result.rows;
}
async function addProductImage(productId, cloudflareImageId, filename, isPrimary = false, displayOrder) {
    // If this is being set as primary, unset any existing primary images
    if (isPrimary) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('UPDATE product_images SET is_primary = false WHERE product_id = $1', [
            productId
        ]);
    }
    // Get the next display order if not provided
    if (displayOrder === undefined) {
        const orderResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT COALESCE(MAX(display_order), -1) + 1 as next_order FROM product_images WHERE product_id = $1', [
            productId
        ]);
        displayOrder = orderResult.rows[0].next_order;
    }
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO product_images (product_id, cloudflare_image_id, filename, is_primary, display_order)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`, [
        productId,
        cloudflareImageId,
        filename,
        isPrimary,
        displayOrder
    ]);
    return result.rows[0];
}
async function deleteProductImage(imageId) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('DELETE FROM product_images WHERE id = $1', [
        imageId
    ]);
    return result.rowCount ? result.rowCount > 0 : false;
}
async function deleteAllProductImages(productId) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('DELETE FROM product_images WHERE product_id = $1', [
        productId
    ]);
    return result.rowCount ? result.rowCount > 0 : false;
}
async function setPrimaryImage(productId, imageId) {
    // Start a transaction
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('BEGIN');
    try {
        // Unset all primary images for this product
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('UPDATE product_images SET is_primary = false WHERE product_id = $1', [
            productId
        ]);
        // Set the specified image as primary
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('UPDATE product_images SET is_primary = true WHERE id = $1 AND product_id = $2', [
            imageId,
            productId
        ]);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('COMMIT');
        return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('ROLLBACK');
        throw error;
    }
}
async function updateImageOrder(imageId, newOrder) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('UPDATE product_images SET display_order = $1 WHERE id = $2', [
        newOrder,
        imageId
    ]);
    return result.rowCount ? result.rowCount > 0 : false;
}
async function getPrimaryImage(productId) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT * FROM product_images WHERE product_id = $1 AND is_primary = true', [
        productId
    ]);
    return result.rows[0] || null;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@aws-sdk/client-s3", () => require("@aws-sdk/client-s3"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[project]/src/lib/cloudflare.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Cloudflare R2 utility functions
 * Handles image uploads to Cloudflare R2 (S3-compatible storage)
 */ __turbopack_context__.s([
    "deleteImageFromCloudflare",
    ()=>deleteImageFromCloudflare,
    "getCloudflareImageUrl",
    ()=>getCloudflareImageUrl,
    "imageExists",
    ()=>imageExists,
    "uploadImageToCloudflare",
    ()=>uploadImageToCloudflare,
    "uploadMultipleImages",
    ()=>uploadMultipleImages
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$lib$2d$storage$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aws-sdk/lib-storage/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$lib$2d$storage$2f$dist$2d$es$2f$Upload$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@aws-sdk/lib-storage/dist-es/Upload.js [app-route] (ecmascript)");
;
;
/**
 * Get S3 client configured for Cloudflare R2
 */ function getR2Client() {
    const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    if (!accessKeyId || !secretAccessKey) {
        throw new Error('R2 credentials not configured. Please check CLOUDFLARE_R2_ACCESS_KEY_ID and CLOUDFLARE_R2_SECRET_ACCESS_KEY in .env.local');
    }
    // Use provided endpoint or construct from account ID
    const r2Endpoint = endpoint || `https://${accountId}.r2.cloudflarestorage.com`;
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__["S3Client"]({
        region: 'auto',
        endpoint: r2Endpoint,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });
}
/**
 * Generate a unique key for the file in R2
 */ function generateFileKey(filename) {
    const folder = process.env.CLOUDFLARE_PRODUCT_IMAGE_FOLDER || 'product_images';
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `${folder}/${timestamp}-${randomString}-${sanitizedFilename}`;
}
async function uploadImageToCloudflare(imageFile, filename) {
    const bucket = process.env.CLOUDFLARE_BUCKET;
    if (!bucket) {
        throw new Error('R2 bucket not configured. Please check CLOUDFLARE_BUCKET in .env.local');
    }
    const client = getR2Client();
    const key = generateFileKey(filename);
    try {
        let fileBuffer;
        let contentType = 'image/jpeg';
        // Convert File to Buffer if needed
        if (imageFile instanceof File) {
            contentType = imageFile.type || 'image/jpeg';
            const arrayBuffer = await imageFile.arrayBuffer();
            fileBuffer = Buffer.from(arrayBuffer);
        } else {
            fileBuffer = imageFile;
            // Try to detect content type from filename
            if (filename.endsWith('.png')) contentType = 'image/png';
            else if (filename.endsWith('.gif')) contentType = 'image/gif';
            else if (filename.endsWith('.webp')) contentType = 'image/webp';
            else if (filename.endsWith('.svg')) contentType = 'image/svg+xml';
        }
        // Upload to R2 using S3 SDK
        const upload = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$lib$2d$storage$2f$dist$2d$es$2f$Upload$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Upload"]({
            client,
            params: {
                Bucket: bucket,
                Key: key,
                Body: fileBuffer,
                ContentType: contentType
            }
        });
        await upload.done();
        const url = getCloudflareImageUrl(key);
        return {
            success: true,
            result: {
                id: key,
                // Use R2 key as ID
                filename,
                uploaded: new Date().toISOString(),
                url,
                key
            }
        };
    } catch (error) {
        console.error('Error uploading to R2:', error);
        throw error;
    }
}
async function deleteImageFromCloudflare(imageKey) {
    const bucket = process.env.CLOUDFLARE_BUCKET;
    if (!bucket) {
        throw new Error('R2 bucket not configured');
    }
    const client = getR2Client();
    try {
        const command = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__["DeleteObjectCommand"]({
            Bucket: bucket,
            Key: imageKey
        });
        await client.send(command);
        return true;
    } catch (error) {
        console.error('Error deleting from R2:', error);
        return false;
    }
}
function getCloudflareImageUrl(imageKey) {
    const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
    const bucket = process.env.CLOUDFLARE_BUCKET;
    // If public URL is configured, use it
    if (publicUrl && publicUrl !== 'https://pub-your-id.r2.dev') {
        return `${publicUrl}/${imageKey}`;
    }
    // Otherwise, return a placeholder (user needs to configure public access)
    // In production, you should either:
    // 1. Enable public access on the bucket and set CLOUDFLARE_R2_PUBLIC_URL
    // 2. Use signed URLs
    // 3. Use a custom domain
    return `https://r2-placeholder.com/${bucket}/${imageKey}`;
}
async function imageExists(imageKey) {
    const bucket = process.env.CLOUDFLARE_BUCKET;
    if (!bucket) {
        return false;
    }
    const client = getR2Client();
    try {
        const command = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__["HeadObjectCommand"]({
            Bucket: bucket,
            Key: imageKey
        });
        await client.send(command);
        return true;
    } catch (error) {
        return false;
    }
}
async function uploadMultipleImages(images) {
    const results = await Promise.allSettled(images.map(({ file, filename })=>uploadImageToCloudflare(file, filename)));
    return results.map((result, index)=>{
        if (result.status === 'fulfilled' && result.value.success) {
            return {
                success: true,
                imageId: result.value.result?.id,
                filename: images[index].filename,
                url: result.value.result?.url
            };
        } else {
            return {
                success: false,
                filename: images[index].filename,
                error: result.status === 'rejected' ? result.reason?.message : 'Upload failed'
            };
        }
    });
}
}),
"[project]/src/lib/db/products.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "createProduct",
    ()=>createProduct,
    "deleteProduct",
    ()=>deleteProduct,
    "getProductById",
    ()=>getProductById,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductBySlugWithImages",
    ()=>getProductBySlugWithImages,
    "getProductWithImages",
    ()=>getProductWithImages,
    "getProducts",
    ()=>getProducts,
    "getProductsWithImages",
    ()=>getProductsWithImages,
    "searchProducts",
    ()=>searchProducts,
    "updateProduct",
    ()=>updateProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/connection.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$productImages$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/productImages.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cloudflare.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$productImages$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$productImages$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function getProducts(filters) {
    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const offset = (page - 1) * limit;
    let whereConditions = [];
    let params = [];
    let paramCount = 1;
    if (filters.search) {
        whereConditions.push(`(name ILIKE $${paramCount} OR description ILIKE $${paramCount})`);
        params.push(`%${filters.search}%`);
        paramCount++;
    }
    if (filters.category) {
        whereConditions.push(`category = $${paramCount}`);
        params.push(filters.category);
        paramCount++;
    }
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
        whereConditions.push(`price >= $${paramCount}`);
        params.push(filters.minPrice);
        paramCount++;
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
        whereConditions.push(`price <= $${paramCount}`);
        params.push(filters.maxPrice);
        paramCount++;
    }
    const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';
    // Get products
    const productsQuery = `
    SELECT * FROM products
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${paramCount} OFFSET $${paramCount + 1}
  `;
    params.push(limit, offset);
    const productsResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(productsQuery, params);
    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM products ${whereClause}`;
    const countResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(countQuery, params.slice(0, paramCount - 1));
    const total = parseInt(countResult.rows[0].count);
    return {
        products: productsResult.rows,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
            hasMore: page < Math.ceil(total / limit)
        }
    };
}
async function getProductById(id) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT * FROM products WHERE id = $1', [
        id
    ]);
    return result.rows[0] || null;
}
async function getProductBySlug(slug) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT * FROM products WHERE slug = $1', [
        slug
    ]);
    return result.rows[0] || null;
}
async function createProduct(product) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO products (name, description, price, original_price, sale_price, image_url, category, slug, stock_quantity)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`, [
        product.name,
        product.description,
        product.price,
        product.original_price || null,
        product.sale_price || product.price,
        product.image_url,
        product.category,
        product.slug,
        product.stock_quantity || 0
    ]);
    return result.rows[0];
}
async function updateProduct(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;
    Object.entries(updates).forEach(([key, value])=>{
        if (value !== undefined) {
            fields.push(`${key} = $${paramCount++}`);
            values.push(value);
        }
    });
    if (fields.length === 0) {
        return getProductById(id);
    }
    values.push(id);
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`UPDATE products SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`, values);
    return result.rows[0] || null;
}
async function deleteProduct(id) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('DELETE FROM products WHERE id = $1', [
        id
    ]);
    return result.rowCount ? result.rowCount > 0 : false;
}
async function searchProducts(searchTerm, limit = 10) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT * FROM products
     WHERE name ILIKE $1 OR description ILIKE $1
     ORDER BY created_at DESC
     LIMIT $2`, [
        `%${searchTerm}%`,
        limit
    ]);
    return result.rows;
}
async function getProductWithImages(id) {
    const product = await getProductById(id);
    if (!product) return null;
    const images = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$productImages$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProductImages"])(id);
    const imagesWithUrls = images.map((img)=>({
            id: img.id,
            url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCloudflareImageUrl"])(img.cloudflare_image_id),
            cloudflare_image_id: img.cloudflare_image_id,
            is_primary: img.is_primary,
            display_order: img.display_order
        }));
    const primaryImage = imagesWithUrls.find((img)=>img.is_primary);
    return {
        ...product,
        images: imagesWithUrls,
        primary_image: primaryImage?.url || product.image_url
    };
}
async function getProductBySlugWithImages(slug) {
    const product = await getProductBySlug(slug);
    if (!product) return null;
    const images = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$productImages$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProductImages"])(product.id);
    const imagesWithUrls = images.map((img)=>({
            id: img.id,
            url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCloudflareImageUrl"])(img.cloudflare_image_id),
            cloudflare_image_id: img.cloudflare_image_id,
            is_primary: img.is_primary,
            display_order: img.display_order
        }));
    const primaryImage = imagesWithUrls.find((img)=>img.is_primary);
    return {
        ...product,
        images: imagesWithUrls,
        primary_image: primaryImage?.url || product.image_url
    };
}
async function getProductsWithImages(filters) {
    const result = await getProducts(filters);
    // Fetch images for all products
    const productsWithImages = await Promise.all(result.products.map(async (product)=>{
        const images = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$productImages$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProductImages"])(product.id);
        const imagesWithUrls = images.map((img)=>({
                id: img.id,
                url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCloudflareImageUrl"])(img.cloudflare_image_id),
                cloudflare_image_id: img.cloudflare_image_id,
                is_primary: img.is_primary,
                display_order: img.display_order
            }));
        const primaryImage = imagesWithUrls.find((img)=>img.is_primary);
        return {
            ...product,
            images: imagesWithUrls,
            primary_image: primaryImage?.url || product.image_url
        };
    }));
    return {
        products: productsWithImages,
        pagination: result.pagination
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/products.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || searchParams.get('q') || '';
        const category = searchParams.get('category') || '';
        const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')) : undefined;
        const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')) : undefined;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProductsWithImages"])({
            search,
            category,
            minPrice,
            maxPrice,
            page,
            limit
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                products: result.products,
                pagination: result.pagination
            }
        }, {
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
                'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
            }
        });
    } catch (error) {
        console.error('Error in products GET API:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
                'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
            }
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, price, original_price, sale_price, image_url, category, stock_quantity } = body;
        if (!name || !description || !price || price <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Name, description, and price are required'
            }, {
                status: 400,
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
                    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
                }
            });
        }
        // Generate a unique slug for the product
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
        const product = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createProduct"])({
            name,
            description,
            price,
            original_price,
            sale_price,
            image_url,
            category,
            stock_quantity,
            slug
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                ...product,
                images: [],
                primary_image: product.image_url,
                message: 'Product created. Upload images using /api/products/images/upload'
            }
        }, {
            status: 201,
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
                'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
            }
        });
    } catch (error) {
        console.error('Error creating product:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message || 'Internal server error'
        }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
                'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
            }
        });
    }
}
async function OPTIONS(request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({}, {
        headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
        }
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4c3e3a29._.js.map