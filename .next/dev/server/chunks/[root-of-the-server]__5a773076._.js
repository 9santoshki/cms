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
"[project]/src/lib/db/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "cleanupExpiredSessions",
    ()=>cleanupExpiredSessions,
    "clearSessionCookie",
    ()=>clearSessionCookie,
    "createSession",
    ()=>createSession,
    "createSessionToken",
    ()=>createSessionToken,
    "createSessionTokenWithDB",
    ()=>createSessionTokenWithDB,
    "deleteSession",
    ()=>deleteSession,
    "deleteSessionById",
    ()=>deleteSessionById,
    "deleteUserSessions",
    ()=>deleteUserSessions,
    "getAllUserProfiles",
    ()=>getAllUserProfiles,
    "getSessionFromCookie",
    ()=>getSessionFromCookie,
    "getSessionFromCookieWithDB",
    ()=>getSessionFromCookieWithDB,
    "getSessionFromDB",
    ()=>getSessionFromDB,
    "getUserByEmail",
    ()=>getUserByEmail,
    "getUserProfile",
    ()=>getUserProfile,
    "getUserSessions",
    ()=>getUserSessions,
    "logoutSession",
    ()=>logoutSession,
    "setSessionCookie",
    ()=>setSessionCookie,
    "setSessionCookieWithDB",
    ()=>setSessionCookieWithDB,
    "updateSessionActivity",
    ()=>updateSessionActivity,
    "updateUserProfile",
    ()=>updateUserProfile,
    "updateUserRole",
    ()=>updateUserRole,
    "upsertUserFromGoogle",
    ()=>upsertUserFromGoogle,
    "validateSession",
    ()=>validateSession,
    "verifySessionToken",
    ()=>verifySessionToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/connection.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const SESSION_COOKIE_NAME = 'cms-session';
const SESSION_DURATION_DAYS = 30; // 30 days for persistent login
const upsertUserFromGoogle = async (googleUser)=>{
    // Check if user exists
    const existingUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT * FROM users WHERE email = $1', [
        googleUser.email
    ]);
    let userId;
    if (existingUser.rows.length > 0) {
        // Update existing user
        userId = existingUser.rows[0].id;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`UPDATE users
       SET name = $1, avatar = $2, google_id = $3, updated_at = NOW()
       WHERE id = $4`, [
            googleUser.name,
            googleUser.picture,
            googleUser.id,
            userId
        ]);
    } else {
        // Create new user
        const newUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO users (email, name, avatar, google_id, role)
       VALUES ($1, $2, $3, $4, 'customer')
       RETURNING id`, [
            googleUser.email,
            googleUser.name,
            googleUser.picture,
            googleUser.id
        ]);
        userId = newUser.rows[0].id;
    }
    // Get the complete user profile
    const userProfile = await getUserProfile(userId);
    if (!userProfile) {
        throw new Error('Failed to create or fetch user profile');
    }
    return userProfile;
};
const getUserProfile = async (userId)=>{
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT id, email, name, avatar, role, created_at, updated_at FROM users WHERE id = $1', [
        userId
    ]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
const getUserByEmail = async (email)=>{
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT id, email, name, avatar, role, created_at, updated_at FROM users WHERE email = $1', [
        email
    ]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
const createSessionToken = (user)=>{
    const sessionData = {
        userId: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(sessionData, JWT_SECRET, {
        expiresIn: '7d'
    });
};
const verifySessionToken = (token)=>{
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};
const setSessionCookie = async (token)=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        // 7 days
        path: '/'
    });
};
const getSessionFromCookie = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie) {
        return null;
    }
    return verifySessionToken(sessionCookie.value);
};
const clearSessionCookie = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(SESSION_COOKIE_NAME);
};
const updateUserRole = async (userId, newRole)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2', [
        newRole,
        userId
    ]);
};
const getAllUserProfiles = async ()=>{
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT id, email, name, avatar, role, created_at, updated_at FROM users ORDER BY created_at DESC');
    return result.rows;
};
const updateUserProfile = async (userId, updates)=>{
    const fields = [];
    const values = [];
    let paramCount = 1;
    if (updates.name !== undefined) {
        fields.push(`name = $${paramCount++}`);
        values.push(updates.name);
    }
    if (updates.avatar !== undefined) {
        fields.push(`avatar = $${paramCount++}`);
        values.push(updates.avatar);
    }
    if (fields.length === 0) {
        return getUserProfile(userId);
    }
    fields.push(`updated_at = NOW()`);
    values.push(userId);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount}`, values);
    return getUserProfile(userId);
};
// ============================================================================
// SESSION MANAGEMENT (Database-backed persistent sessions)
// ============================================================================
// Generate secure random token
const generateSecureToken = ()=>{
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString('hex');
};
// Get request metadata (user agent, IP)
const getRequestMetadata = async ()=>{
    try {
        const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])();
        const userAgent = (await headersList).get('user-agent') || undefined;
        const forwardedFor = (await headersList).get('x-forwarded-for');
        const realIp = (await headersList).get('x-real-ip');
        const ipAddress = forwardedFor?.split(',')[0] || realIp || undefined;
        return {
            userAgent,
            ipAddress
        };
    } catch (error) {
        return {
            userAgent: undefined,
            ipAddress: undefined
        };
    }
};
const createSession = async (user, rememberMe = true)=>{
    const sessionToken = generateSecureToken();
    const refreshToken = generateSecureToken();
    const { userAgent, ipAddress } = await getRequestMetadata();
    // Calculate expiration based on remember me option
    const durationDays = rememberMe ? SESSION_DURATION_DAYS : 1; // 30 days or 1 day
    const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO sessions (user_id, session_token, refresh_token, user_agent, ip_address, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`, [
        user.id,
        sessionToken,
        refreshToken,
        userAgent,
        ipAddress,
        expiresAt
    ]);
    return {
        sessionToken,
        refreshToken,
        dbSession: result.rows[0]
    };
};
const getSessionFromDB = async (sessionToken)=>{
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT * FROM sessions
     WHERE session_token = $1
     AND expires_at > NOW()`, [
        sessionToken
    ]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
const updateSessionActivity = async (sessionId)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('UPDATE sessions SET last_activity = NOW() WHERE id = $1', [
        sessionId
    ]);
};
const deleteSession = async (sessionToken)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('DELETE FROM sessions WHERE session_token = $1', [
        sessionToken
    ]);
};
const deleteUserSessions = async (userId)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('DELETE FROM sessions WHERE user_id = $1', [
        userId
    ]);
};
const deleteSessionById = async (sessionId)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('DELETE FROM sessions WHERE id = $1', [
        sessionId
    ]);
};
const cleanupExpiredSessions = async ()=>{
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT cleanup_expired_sessions()');
    return result.rows[0].cleanup_expired_sessions;
};
const getUserSessions = async (userId)=>{
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT * FROM sessions
     WHERE user_id = $1
     AND expires_at > NOW()
     ORDER BY last_activity DESC`, [
        userId
    ]);
    return result.rows;
};
const createSessionTokenWithDB = (user, sessionId)=>{
    const sessionData = {
        userId: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        sessionId: sessionId // Include DB session ID in JWT
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(sessionData, JWT_SECRET, {
        expiresIn: `${SESSION_DURATION_DAYS}d`
    });
};
const validateSession = async (token)=>{
    // First verify JWT
    const jwtData = verifySessionToken(token);
    if (!jwtData) {
        return null;
    }
    // If JWT has session ID, verify against database
    if (jwtData.sessionId) {
        const dbSession = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('SELECT * FROM sessions WHERE id = $1 AND expires_at > NOW()', [
            jwtData.sessionId
        ]);
        if (dbSession.rows.length === 0) {
            // Session was invalidated in database
            return null;
        }
        // Update last activity
        await updateSessionActivity(jwtData.sessionId);
    }
    return jwtData;
};
const getSessionFromCookieWithDB = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie) {
        return null;
    }
    // Validate against database as well
    return validateSession(sessionCookie.value);
};
const setSessionCookieWithDB = async (token, rememberMe = true)=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const maxAge = rememberMe ? 60 * 60 * 24 * SESSION_DURATION_DAYS // 30 days
     : 60 * 60 * 24; // 1 day
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        maxAge: maxAge,
        path: '/'
    });
};
const logoutSession = async ()=>{
    const session = await getSessionFromCookieWithDB();
    // Clear cookie
    await clearSessionCookie();
    // Delete from database if session ID exists
    if (session?.sessionId) {
        await deleteSessionById(session.sessionId);
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/db/cart.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "addCartItem",
    ()=>addCartItem,
    "clearCart",
    ()=>clearCart,
    "getCartItem",
    ()=>getCartItem,
    "getCartItemWithProduct",
    ()=>getCartItemWithProduct,
    "getCartItems",
    ()=>getCartItems,
    "removeCartItem",
    ()=>removeCartItem,
    "updateCartItemQuantity",
    ()=>updateCartItemQuantity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/connection.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function getCartItems(userId) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT
      ci.id,
      ci.user_id,
      ci.product_id,
      ci.quantity,
      p.name,
      p.description,
      p.price,
      p.image_url,
      (
        SELECT pi.cloudflare_image_id
        FROM product_images pi
        WHERE pi.product_id = p.id AND pi.is_primary = true
        LIMIT 1
      ) as primary_image_id
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = $1::uuid
     ORDER BY ci.created_at DESC`, [
        userId
    ]);
    return result.rows;
}
async function getCartItem(userId, productId) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT * FROM cart_items WHERE user_id = $1::uuid AND product_id = $2::uuid`, [
        userId,
        productId
    ]);
    return result.rows[0] || null;
}
async function addCartItem(userId, productId, quantity) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES ($1::uuid, $2::uuid, $3)
     ON CONFLICT (user_id, product_id)
     DO UPDATE SET quantity = cart_items.quantity + $3, updated_at = NOW()
     RETURNING *`, [
        userId,
        productId,
        quantity
    ]);
    return result.rows[0];
}
async function updateCartItemQuantity(userId, productId, quantity) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`UPDATE cart_items
     SET quantity = $3, updated_at = NOW()
     WHERE user_id = $1::uuid AND product_id = $2::uuid
     RETURNING *`, [
        userId,
        productId,
        quantity
    ]);
    return result.rows[0] || null;
}
async function removeCartItem(userId, productId) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`DELETE FROM cart_items WHERE user_id = $1::uuid AND product_id = $2::uuid`, [
        userId,
        productId
    ]);
    return result.rowCount ? result.rowCount > 0 : false;
}
async function clearCart(userId) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`DELETE FROM cart_items WHERE user_id = $1::uuid`, [
        userId
    ]);
    return result.rowCount ? result.rowCount > 0 : false;
}
async function getCartItemWithProduct(userId, productId) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT
      ci.id,
      ci.product_id,
      ci.quantity,
      p.name,
      p.price,
      p.image_url
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = $1::uuid AND ci.product_id = $2::uuid`, [
        userId,
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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

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
"[project]/src/app/api/cart/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cart$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/cart.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cloudflare.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cart$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cart$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
// Verify user session and get user ID
async function getUserIdFromRequest(request) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionFromCookie"])();
        return session?.userId || null;
    } catch (error) {
        console.error('Error getting user session:', error);
        return null;
    }
}
async function GET(request) {
    try {
        console.log('🛒 API /api/cart GET: Fetching cart items...');
        const userId = await getUserIdFromRequest(request);
        console.log('🛒 API /api/cart GET: User ID from request:', userId);
        if (userId) {
            // Authenticated user - get database cart
            console.log('🛒 API /api/cart GET: Fetching cart items from database...');
            const cartItems = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cart$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCartItems"])(userId);
            console.log('🛒 API /api/cart GET: Found', cartItems.length, 'cart items');
            // Format the response to match expected format
            const formattedCartItems = cartItems.map((item)=>{
                // Use Cloudflare image URL if available, otherwise fall back to image_url
                const imageUrl = item.primary_image_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCloudflareImageUrl"])(item.primary_image_id) : item.image_url || null;
                return {
                    id: item.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    name: item.name || 'Unknown Product',
                    description: item.description || '',
                    price: item.price || 0,
                    image_url: imageUrl,
                    originalPrice: null,
                    // Default values for compatibility
                    discount: 0
                };
            });
            console.log('🛒 API /api/cart GET: ✅ Returning', formattedCartItems.length, 'formatted items');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: formattedCartItems
            }, {
                status: 200
            });
        } else {
            // Unauthenticated user - return empty cart
            console.log('🛒 API /api/cart GET: No user ID, returning empty cart');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: []
            }, {
                status: 200
            });
        }
    } catch (error) {
        console.error('❌ API /api/cart GET: Error fetching cart:', error);
        console.error('❌ API /api/cart GET: Error message:', error?.message);
        console.error('❌ API /api/cart GET: Error stack:', error?.stack);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error?.message || 'Internal server error'
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
        if (!product_id) {
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
        // Add item to cart (will update if exists)
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cart$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addCartItem"])(userId, product_id, quantity);
        // Get the updated cart item with product details
        const cartItem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cart$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCartItemWithProduct"])(userId, product_id);
        if (!cartItem) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Failed to add item to cart'
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                id: cartItem.id,
                product_id: cartItem.product_id,
                name: cartItem.name || 'Unknown Product',
                price: cartItem.price || 0,
                quantity: cartItem.quantity,
                image_url: cartItem.image_url || null
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message || 'Internal server error'
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
        if (!product_id) {
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cart$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["removeCartItem"])(userId, product_id);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: 'Item removed from cart'
            }, {
                status: 200
            });
        } else {
            // Update quantity
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cart$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateCartItemQuantity"])(userId, product_id, quantity);
            // Get the updated cart item with product details
            const cartItem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cart$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCartItemWithProduct"])(userId, product_id);
            if (!cartItem) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Failed to update cart item'
                }, {
                    status: 500
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: {
                    id: cartItem.id,
                    product_id: cartItem.product_id,
                    name: cartItem.name || 'Unknown Product',
                    price: cartItem.price || 0,
                    quantity: cartItem.quantity,
                    image_url: cartItem.image_url || null
                }
            }, {
                status: 200
            });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message || 'Internal server error'
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cart$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clearCart"])(userId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: 'Cart cleared'
            }, {
                status: 200
            });
        } else {
            // Unauthenticated user - return success for client-side cart handling
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: 'Cart cleared'
            }, {
                status: 200
            });
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message || 'Internal server error'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5a773076._.js.map