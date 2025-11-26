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
    "runAuthenticatedQuery",
    ()=>runAuthenticatedQuery,
    "runAuthenticatedSqlQuery",
    ()=>runAuthenticatedSqlQuery,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
// Initialize Supabase clients
const supabaseUrl = ("TURBOPACK compile-time value", "https://fykdwqlayqcxycrvbhew.supabase.co") || process.env.SUPABASE_URL;
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo") || process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey) : "TURBOPACK unreachable";
const supabaseWithServiceRole = supabaseServiceRoleKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceRoleKey) : null;
async function runAuthenticatedQuery(userId, queryFn) {
    if (!supabaseWithServiceRole) {
        console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set');
        return {
            rows: [],
            rowCount: 0,
            error: new Error('Missing SUPABASE_SERVICE_ROLE_KEY in environment variables')
        };
    }
    try {
        // Run the query using the service role client to bypass RLS temporarily
        const result = await queryFn(supabaseWithServiceRole);
        return {
            rows: Array.isArray(result.data) ? result.data : result.data ? [
                result.data
            ] : [],
            rowCount: result.data ? Array.isArray(result.data) ? result.data.length : 1 : 0,
            error: result.error || null
        };
    } catch (error) {
        return {
            rows: [],
            rowCount: 0,
            error: error
        };
    }
}
async function runAuthenticatedSqlQuery(sql, params) {
    if (!supabaseWithServiceRole) {
        console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set');
        return {
            rows: [],
            rowCount: 0,
            error: new Error('Missing SUPABASE_SERVICE_ROLE_KEY in environment variables')
        };
    }
    try {
        // Parse the SQL to determine table and operation
        const sqlLower = sql.toLowerCase().trim();
        if (sqlLower.startsWith('select')) {
            // Parse SELECT query using regex
            const selectMatch = sql.match(/select\s+(.*?)\s+from\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*/i);
            if (!selectMatch) {
                throw new Error('Could not parse SELECT query');
            }
            const columns = selectMatch[1].trim();
            const tableName = selectMatch[2].trim();
            // Handle WHERE clause
            let queryBuilder = supabaseWithServiceRole.from(tableName).select(columns === '*' ? '*' : columns);
            if (sqlLower.includes('where')) {
                const whereRegex = /where\s+(.*?)(?:\s+order\s+by|\s+limit|\s+group\s+by|$)/i;
                const whereMatch = sql.match(whereRegex);
                if (whereMatch && whereMatch[1]) {
                    const whereClause = whereMatch[1].trim();
                    // Handle different where patterns
                    if (whereClause.includes('user_id = $1') && params && params.length >= 1) {
                        queryBuilder = queryBuilder.eq('user_id', params[0]);
                    } else if (whereClause.includes('user_id = $1 AND product_id = $2') && params && params.length >= 2) {
                        queryBuilder = queryBuilder.eq('user_id', params[0]).eq('product_id', params[1]);
                    } else if (whereClause.includes('product_id = $1') && params && params.length >= 1) {
                        queryBuilder = queryBuilder.eq('product_id', params[0]);
                    }
                }
            }
            const response = await queryBuilder;
            if (response.error) {
                return {
                    rows: [],
                    rowCount: 0,
                    error: response.error
                };
            }
            return {
                rows: Array.isArray(response.data) ? response.data : response.data ? [
                    response.data
                ] : [],
                rowCount: response.data ? Array.isArray(response.data) ? response.data.length : 1 : 0,
                error: null
            };
        } else if (sqlLower.startsWith('insert')) {
            // Parse INSERT statement
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
            const response = await supabaseWithServiceRole.from(tableName).insert(insertData).select();
            if (response.error) {
                return {
                    rows: [],
                    rowCount: 0,
                    error: response.error
                };
            }
            return {
                rows: Array.isArray(response.data) ? response.data : response.data ? [
                    response.data
                ] : [],
                rowCount: response.data ? Array.isArray(response.data) ? response.data.length : 1 : 0,
                error: null
            };
        } else if (sqlLower.startsWith('update')) {
            // Parse UPDATE statement
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
                const [key, valuePlaceholder] = part.split('=').map((p)=>p.trim());
                // Assuming the valuePlaceholder is like $1, $2, etc.
                const paramNum = parseInt(valuePlaceholder.substring(1)) - 1; // Convert $2 to index 1
                whereConditions[key] = params[paramNum];
            });
            const response = await supabaseWithServiceRole.from(tableName).update(setData).match(whereConditions).select();
            if (response.error) {
                return {
                    rows: [],
                    rowCount: 0,
                    error: response.error
                };
            }
            return {
                rows: Array.isArray(response.data) ? response.data : response.data ? [
                    response.data
                ] : [],
                rowCount: response.data ? Array.isArray(response.data) ? response.data.length : 1 : 0,
                error: null
            };
        } else if (sqlLower.startsWith('delete')) {
            // Parse DELETE statement
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
            const response = await supabaseWithServiceRole.from(tableName).delete().match(whereConditions);
            if (response.error) {
                return {
                    rows: [],
                    rowCount: 0,
                    error: response.error
                };
            }
            return {
                rows: response.data ? [
                    response.data
                ] : [],
                rowCount: response.data ? 1 : 0,
                error: null
            };
        } else {
            throw new Error(`Unsupported SQL operation: ${sql.substring(0, 20)}...`);
        }
    } catch (error) {
        return {
            rows: [],
            rowCount: 0,
            error: error
        };
    }
}
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
                // Parse SELECT query
                const selectMatch = sql.match(/select\s+(.*?)\s+from\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*/i);
                if (!selectMatch) {
                    throw new Error('Could not parse SELECT query');
                }
                const columns = selectMatch[1].trim();
                const tableName = selectMatch[2].trim();
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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/app/api/cart/[productId]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
;
;
;
// Initialize Supabase client for email/password auth
const supabaseUrl = ("TURBOPACK compile-time value", "https://fykdwqlayqcxycrvbhew.supabase.co") || process.env.SUPABASE_URL;
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo") || process.env.SUPABASE_ANON_KEY;
let supabase = null;
if ("TURBOPACK compile-time truthy", 1) {
    supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}
// Helper function to get user by token
async function getUserIdFromRequest(request) {
    // First try: NextAuth JWT token (Google auth)
    try {
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getToken"])({
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        });
        if (token && (token.sub || token.id)) {
            return await getUserIdFromNextAuthToken(token);
        }
    } catch (e) {
        console.log('NextAuth token not found or invalid, trying Bearer token...');
    }
    // Second try: Custom Bearer token (email/password auth)
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return await getUserIdFromBearerToken(authHeader);
    }
    return {
        userId: null,
        authType: null
    };
}
// Helper for NextAuth tokens
async function getUserIdFromNextAuthToken(token) {
    let userIdValue = token.id || token.sub;
    if (typeof userIdValue === 'number') {
        userIdValue = userIdValue.toString();
    } else if (typeof userIdValue !== 'string') {
        throw new Error('Invalid userId type from token');
    }
    let userIdNum = parseInt(userIdValue, 10);
    // Check if out of range (Google IDs are too large for PostgreSQL INT4)
    if (isNaN(userIdNum) || userIdNum <= 0 || userIdNum > 2147483647 || userIdNum < -2147483648) {
        // Try to find user by email first
        if (token.email) {
            const userByEmail = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM users WHERE email = $1', [
                token.email
            ]);
            if (userByEmail.rows.length > 0) {
                userIdNum = userByEmail.rows[0].id;
                return {
                    userId: userIdNum,
                    authType: 'google'
                };
            }
        }
        // Try google_id column
        if (userIdValue) {
            try {
                const userLookup = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM users WHERE google_id = $1', [
                    userIdValue
                ]);
                if (userLookup.rows.length > 0) {
                    userIdNum = userLookup.rows[0].id;
                    return {
                        userId: userIdNum,
                        authType: 'google'
                    };
                }
            } catch (e) {
            // google_id column might not exist
            }
        }
        throw new Error('User not found');
    }
    return {
        userId: userIdNum,
        authType: 'google'
    };
}
// Helper for Bearer tokens (email/password auth)
async function getUserIdFromBearerToken(authHeader) {
    const token = authHeader.replace('Bearer ', '');
    // Extract user ID from our mock token format: 'mock-jwt-token-for-user-{userId}'
    const userTokenPattern = /mock-jwt-token-for-user-(\d+)/;
    const match = token.match(userTokenPattern);
    if (match && match[1]) {
        const userId = parseInt(match[1], 10);
        if (!isNaN(userId) && userId > 0) {
            // Verify that this user actually exists in the database
            const { rows } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM users WHERE id = $1', [
                userId
            ]);
            if (rows.length > 0) {
                return {
                    userId: rows[0].id,
                    authType: 'email'
                };
            }
        }
    }
    // Fallback: If we can't extract user from token, try to find a default user
    const { rows } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query("SELECT id FROM users WHERE email = $1 LIMIT 1", [
        'john@example.com'
    ]);
    if (rows.length > 0) {
        return {
            userId: rows[0].id,
            authType: 'email'
        };
    }
    throw new Error('User not found for Bearer token');
}
async function DELETE(request, context) {
    // Wait for params to be resolved in Next.js 13+ App Router
    const params = await context.params;
    const { productId } = params; // This is the product ID, not cart item ID
    try {
        // Support both NextAuth and Bearer token authentication
        const { userId, authType } = await getUserIdFromRequest(request);
        // If user is authenticated, delete from database
        if (userId && authType) {
            // Validate the parsed userId
            if (userId <= 0) {
                console.error('Invalid userId from token');
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Invalid user authentication'
                }, {
                    status: 401
                });
            }
            if (!productId) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Product ID is required'
                }, {
                    status: 400
                });
            }
            const productIdNum = parseInt(productId);
            if (isNaN(productIdNum) || productIdNum <= 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Invalid product ID'
                }, {
                    status: 400
                });
            }
            // First, check if the cart item exists
            const checkResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM cart_items WHERE user_id = $1 AND product_id = $2', [
                userId,
                productIdNum
            ]);
            if (checkResult.rows.length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Cart item not found'
                }, {
                    status: 404
                });
            }
            try {
                const deleteQuery = `
          DELETE FROM cart_items
          WHERE user_id = $1 AND product_id = $2
        `;
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(deleteQuery, [
                    userId,
                    productIdNum
                ]);
                if (result.error) {
                    throw result.error;
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    message: 'Item removed from cart'
                }, {
                    status: 200
                });
            } catch (error) {
                console.error('Error removing item from cart:', error);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Internal server error'
                }, {
                    status: 500
                });
            }
        } else {
            // For unauthenticated users (local cart only), just return success
            // The frontend will handle local cart item removal
            if (!productId) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Product ID is required'
                }, {
                    status: 400
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: 'Item removed from cart'
            }, {
                status: 200
            });
        }
    } catch (error) {
        console.error('Token verification error:', error);
        // Still allow the operation for unauthenticated users
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Item removed from cart'
        }, {
            status: 200
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f52ca158._.js.map