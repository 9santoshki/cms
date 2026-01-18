module.exports = [
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/lib/db/connection.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/db/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/connection.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const SESSION_COOKIE_NAME = 'cms-session';
const SESSION_DURATION_DAYS = 30; // 30 days for persistent login
const upsertUserFromGoogle = async (googleUser)=>{
    // Check if user exists
    const existingUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('SELECT * FROM users WHERE email = $1', [
        googleUser.email
    ]);
    let userId;
    if (existingUser.rows.length > 0) {
        // Update existing user
        userId = existingUser.rows[0].id;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(`UPDATE users
       SET name = $1, avatar = $2, google_id = $3, updated_at = NOW()
       WHERE id = $4`, [
            googleUser.name,
            googleUser.picture,
            googleUser.id,
            userId
        ]);
    } else {
        // Create new user
        const newUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO users (email, name, avatar, google_id, role)
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
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('SELECT id, email, name, avatar, role, created_at, updated_at FROM users WHERE id = $1', [
        userId
    ]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
const getUserByEmail = async (email)=>{
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('SELECT id, email, name, avatar, role, created_at, updated_at FROM users WHERE email = $1', [
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].sign(sessionData, JWT_SECRET, {
        expiresIn: '7d'
    });
};
const verifySessionToken = (token)=>{
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};
const setSessionCookie = async (token)=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
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
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie) {
        return null;
    }
    return verifySessionToken(sessionCookie.value);
};
const clearSessionCookie = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(SESSION_COOKIE_NAME);
};
const updateUserRole = async (userId, newRole)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2', [
        newRole,
        userId
    ]);
};
const getAllUserProfiles = async ()=>{
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('SELECT id, email, name, avatar, role, created_at, updated_at FROM users ORDER BY created_at DESC');
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(`UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount}`, values);
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
        const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
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
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO sessions (user_id, session_token, refresh_token, user_agent, ip_address, expires_at)
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
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(`SELECT * FROM sessions
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('UPDATE sessions SET last_activity = NOW() WHERE id = $1', [
        sessionId
    ]);
};
const deleteSession = async (sessionToken)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('DELETE FROM sessions WHERE session_token = $1', [
        sessionToken
    ]);
};
const deleteUserSessions = async (userId)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('DELETE FROM sessions WHERE user_id = $1', [
        userId
    ]);
};
const deleteSessionById = async (sessionId)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('DELETE FROM sessions WHERE id = $1', [
        sessionId
    ]);
};
const cleanupExpiredSessions = async ()=>{
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('SELECT cleanup_expired_sessions()');
    return result.rows[0].cleanup_expired_sessions;
};
const getUserSessions = async (userId)=>{
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(`SELECT * FROM sessions
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].sign(sessionData, JWT_SECRET, {
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
        const dbSession = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$connection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])('SELECT * FROM sessions WHERE id = $1 AND expires_at > NOW()', [
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
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie) {
        return null;
    }
    // Validate against database as well
    return validateSession(sessionCookie.value);
};
const setSessionCookieWithDB = async (token, rememberMe = true)=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
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
"[project]/src/app/dashboard/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// Layout for dashboard that applies role-based access control
__turbopack_context__.s([
    "default",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/auth.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function DashboardLayout({ children }) {
    // Use database-backed session validation
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSessionFromCookieWithDB"])();
    if (!session) {
        // Redirect to home if not authenticated
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/?error=unauthorized');
    }
    // Get user profile to check role
    const profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserProfile"])(session.userId);
    if (!profile || profile.role !== 'admin' && profile.role !== 'moderator') {
        // Redirect to home if user doesn't have admin or moderator role
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/?error=forbidden');
    }
    // Pass user and role to child components
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/layout.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b759e5bc._.js.map