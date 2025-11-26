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
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabaseConnection.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatResult",
    ()=>formatResult,
    "handleDeleteQuery",
    ()=>handleDeleteQuery,
    "handleInsertQuery",
    ()=>handleInsertQuery,
    "handleSelectQuery",
    ()=>handleSelectQuery,
    "handleUpdateQuery",
    ()=>handleUpdateQuery,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
// In a Next.js app, environment variables are available via process.env
// For direct Node.js execution, we load .env manually
if ("TURBOPACK compile-time truthy", 1) {
    // Server-side
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
// Supabase client configuration
const supabaseUrl = ("TURBOPACK compile-time value", "https://fykdwqlayqcxycrvbhew.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey) : "TURBOPACK unreachable";
function formatResult(result) {
    if (result.error) {
        return {
            rows: [],
            rowCount: 0,
            error: result.error
        };
    }
    const rows = Array.isArray(result.data) ? result.data : result.data ? [
        result.data
    ] : [];
    return {
        rows: rows,
        rowCount: rows.length,
        error: null
    };
}
// Function to extract table name from SQL
function getTableNameFromSQL(sql) {
    const selectMatch = sql.match(/select\s+(.*?)\s+from\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
    const insertMatch = sql.match(/insert\s+into\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
    const updateMatch = sql.match(/update\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
    const deleteMatch = sql.match(/delete\s+from\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
    if (selectMatch) return selectMatch[2];
    if (insertMatch) return insertMatch[1];
    if (updateMatch) return updateMatch[1];
    if (deleteMatch) return deleteMatch[1];
    return null;
}
// Function to extract columns from SELECT statement
function getColumnsFromSelect(sql) {
    const selectMatch = sql.match(/select\s+(.*?)\s+from/i);
    return selectMatch ? selectMatch[1].trim() : '*';
}
async function handleSelectQuery(sql, params) {
    if (!supabase) {
        return {
            data: [],
            error: 'Supabase client not initialized'
        };
    }
    const tableName = getTableNameFromSQL(sql);
    const columns = getColumnsFromSelect(sql);
    if (!tableName) {
        return {
            data: [],
            error: 'Could not parse table name from SQL'
        };
    }
    try {
        // Handle specific tables with special configurations
        if (tableName === 'shipping_config' || tableName === 'tax_config') {
            try {
                // Attempt to get configuration
                const result = await supabase.from(tableName).select(columns === '*' ? '*' : columns).order('created_at', {
                    ascending: false
                }).limit(1);
                if (result.error) {
                    // If the table doesn't exist, return default configuration
                    if (result.error.code === '42P01' || result.error.message?.includes('does not exist')) {
                        if (tableName === 'shipping_config') {
                            return {
                                data: [
                                    {
                                        id: 1,
                                        min_order_amount: 50000,
                                        flat_rate: 1500,
                                        enabled: true,
                                        created_at: new Date().toISOString()
                                    }
                                ],
                                error: null
                            };
                        } else if (tableName === 'tax_config') {
                            return {
                                data: [
                                    {
                                        id: 1,
                                        rate: 0,
                                        type: 'percentage',
                                        enabled: false,
                                        created_at: new Date().toISOString()
                                    }
                                ],
                                error: null
                            };
                        }
                    }
                    // Return empty array if table doesn't exist but don't throw error
                    return {
                        data: [],
                        error: null
                    };
                }
                return result;
            } catch (configError) {
                console.error(`Configuration table ${tableName} error:`, configError);
                // Return default configuration
                if (tableName === 'shipping_config') {
                    return {
                        data: [
                            {
                                id: 1,
                                min_order_amount: 50000,
                                flat_rate: 1500,
                                enabled: true,
                                created_at: new Date().toISOString()
                            }
                        ],
                        error: null
                    };
                } else if (tableName === 'tax_config') {
                    return {
                        data: [
                            {
                                id: 1,
                                rate: 0,
                                type: 'percentage',
                                enabled: false,
                                created_at: new Date().toISOString()
                            }
                        ],
                        error: null
                    };
                }
            }
        }
        // Handle regular table queries
        const hasWhere = sql.toLowerCase().includes('where');
        let queryBuilder = supabase.from(tableName).select(columns === '*' ? '*' : columns);
        if (hasWhere) {
            // Extract WHERE clause - this is a simplified approach
            const whereRegex = /where\s+(.*?)(?:\s+order\s+by|\s+limit|\s+group\s+by|$)/i;
            const whereMatch = sql.match(whereRegex);
            if (whereMatch && whereMatch[1]) {
                const whereClause = whereMatch[1].trim();
                // Handle different WHERE patterns with parameters
                if (whereClause.includes('email = $1 OR google_id = $2') && params && params.length >= 2) {
                    queryBuilder = queryBuilder.or(`email.eq.${params[0]},google_id.eq.${params[1]}`);
                } else if (whereClause.includes('email = $1') && params && params.length >= 1) {
                    queryBuilder = queryBuilder.eq('email', params[0]);
                } else if (whereClause.includes('product_id = $1') && params && params.length >= 1) {
                    queryBuilder = queryBuilder.eq('product_id', params[0]);
                } else if (whereClause.includes('user_id = $1') && params && params.length >= 1) {
                    queryBuilder = queryBuilder.eq('user_id', params[0]);
                } else if (whereClause.includes('user_id = $1 AND product_id = $2') && params && params.length >= 2) {
                    queryBuilder = queryBuilder.eq('user_id', params[0]).eq('product_id', params[1]);
                } else if (whereClause.includes('id = $1') && params && params.length >= 1) {
                    queryBuilder = queryBuilder.eq('id', params[0]);
                } else if (whereClause.includes('slug = $1') && params && params.length >= 1) {
                    queryBuilder = queryBuilder.eq('slug', params[0]);
                } else if (whereClause.includes('CAST(google_id AS TEXT) = $1') && params && params.length >= 1) {
                    queryBuilder = queryBuilder.eq('google_id', params[0]);
                } else {
                    // Basic single condition handling
                    const conditionRegex = /([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\$(\d+)/;
                    const conditionMatch = whereClause.match(conditionRegex);
                    if (conditionMatch && params && params.length >= parseInt(conditionMatch[2])) {
                        const columnName = conditionMatch[1];
                        const paramIndex = parseInt(conditionMatch[2]) - 1;
                        queryBuilder = queryBuilder.eq(columnName, params[paramIndex]);
                    }
                }
            }
        }
        const result = await queryBuilder;
        return result;
    } catch (error) {
        console.error(`Error executing SELECT query on table ${tableName}:`, error);
        // For table not found or other errors, return empty result instead of throwing
        return {
            data: [],
            error: null
        };
    }
}
async function handleInsertQuery(sql, params) {
    if (!supabase) {
        return {
            data: null,
            error: 'Supabase client not initialized'
        };
    }
    const tableName = getTableNameFromSQL(sql);
    if (!tableName) {
        return {
            data: null,
            error: 'Could not parse table name from SQL'
        };
    }
    try {
        // Parse columns from INSERT statement
        const insertMatch = sql.match(/insert\s+into\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(\s*([^)]+)\s*\)/i);
        if (!insertMatch) {
            return {
                data: null,
                error: 'Could not parse INSERT statement'
            };
        }
        const columnsStr = insertMatch[1];
        const columns = columnsStr.replace(/\s/g, '').split(',');
        if (!params || params.length === 0) {
            return {
                data: null,
                error: 'INSERT query has no parameters'
            };
        }
        // Special handling for configuration tables
        if (tableName === 'shipping_config' || tableName === 'tax_config') {
            try {
                // Create or update configuration data
                const insertData = {};
                for(let i = 0; i < columns.length && i < params.length; i++){
                    insertData[columns[i]] = params[i];
                }
                // Use upsert to handle potential conflicts
                const result = await supabase.from(tableName).upsert(insertData, {
                    onConflict: 'id'
                }).select();
                return result;
            } catch (configError) {
                console.error(`Configuration table ${tableName} insert error:`, configError);
                return {
                    data: null,
                    error: configError
                };
            }
        }
        // For regular tables, create the data object
        const insertData = {};
        for(let i = 0; i < columns.length && i < params.length; i++){
            insertData[columns[i]] = params[i];
        }
        const result = await supabase.from(tableName).insert(insertData).select();
        return result;
    } catch (error) {
        console.error(`Error executing INSERT query on table ${tableName}:`, error);
        return {
            data: null,
            error
        };
    }
}
async function handleUpdateQuery(sql, params) {
    if (!supabase) {
        return {
            data: null,
            error: 'Supabase client not initialized'
        };
    }
    const tableName = getTableNameFromSQL(sql);
    if (!tableName) {
        return {
            data: null,
            error: 'Could not parse table name from SQL'
        };
    }
    try {
        // Extract SET clause and WHERE clause
        const updateMatch = sql.match(/update\s+[a-zA-Z_][a-zA-Z0-9_]*\s+set\s+(.*?)\s+where\s+(.*?)(?:\s+returning\s+.*)?$/i);
        if (!updateMatch) {
            return {
                data: null,
                error: 'Could not parse UPDATE statement'
            };
        }
        const setClause = updateMatch[1];
        const whereClause = updateMatch[2];
        if (!params || params.length === 0) {
            return {
                data: null,
                error: 'UPDATE query has no parameters'
            };
        }
        // Parse SET clause: col1=$1, col2=$2, etc.
        const setData = {};
        const setParts = setClause.split(',').map((p)=>p.trim());
        for(let i = 0; i < setParts.length && i < params.length; i++){
            const [col] = setParts[i].split('='); // Only get column name from "col=$1"
            setData[col.trim()] = params[i];
        }
        // Parse WHERE clause: col=$n, etc.
        const whereConditions = {};
        // Simple pattern matching for WHERE clause
        const conditionRegex = /([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\$(\d+)/g;
        let match;
        const paramMappings = {};
        while((match = conditionRegex.exec(whereClause)) !== null){
            const colName = match[1];
            const paramIndex = parseInt(match[2]) - 1; // Convert $1 to index 0, etc.
            paramMappings[colName] = paramIndex;
            if (paramIndex < params.length) {
                whereConditions[colName] = params[paramIndex];
            }
        }
        // Special handling for configuration tables
        if (tableName === 'shipping_config' || tableName === 'tax_config') {
            try {
                // For configuration tables, often we want to upsert or update the single record
                const result = await supabase.from(tableName).upsert(setData, {
                    onConflict: 'id'
                }).select();
                return result;
            } catch (configError) {
                console.error(`Configuration table ${tableName} update error:`, configError);
                return {
                    data: null,
                    error: configError
                };
            }
        }
        // For regular tables, perform the update
        const result = await supabase.from(tableName).update(setData).match(whereConditions).select();
        return result;
    } catch (error) {
        console.error(`Error executing UPDATE query on table ${tableName}:`, error);
        return {
            data: null,
            error
        };
    }
}
async function handleDeleteQuery(sql, params) {
    if (!supabase) {
        return {
            data: null,
            error: 'Supabase client not initialized'
        };
    }
    const tableName = getTableNameFromSQL(sql);
    if (!tableName) {
        return {
            data: null,
            error: 'Could not parse table name from SQL'
        };
    }
    try {
        // Extract WHERE clause
        const deleteMatch = sql.match(/delete\s+from\s+[a-zA-Z_][a-zA-Z0-9_]*\s+where\s+(.*)/i);
        if (!deleteMatch) {
            return {
                data: null,
                error: 'Could not parse DELETE statement'
            };
        }
        const whereClause = deleteMatch[1];
        if (!params || params.length === 0) {
            return {
                data: null,
                error: 'DELETE query has no parameters'
            };
        }
        // Special handling for configuration tables
        if (tableName === 'shipping_config' || tableName === 'tax_config') {
            console.warn(`DELETE operation attempted on configuration table ${tableName}. Configuration records should be updated instead.`);
            // For configuration tables, we may not want to allow deletes, only updates
            return {
                data: null,
                error: {
                    message: `Delete operations not allowed on ${tableName}. Update the configuration instead.`
                }
            };
        }
        // Parse WHERE clause: col=$n, etc.
        const whereConditions = {};
        const conditionRegex = /([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\$(\d+)/g;
        let match;
        while((match = conditionRegex.exec(whereClause)) !== null){
            const colName = match[1];
            const paramIndex = parseInt(match[2]) - 1; // Convert $1 to index 0, etc.
            if (paramIndex < params.length) {
                whereConditions[colName] = params[paramIndex];
            }
        }
        const result = await supabase.from(tableName).delete().match(whereConditions);
        return result;
    } catch (error) {
        console.error(`Error executing DELETE query on table ${tableName}:`, error);
        return {
            data: null,
            error
        };
    }
}
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateShippingCost",
    ()=>calculateShippingCost,
    "calculateTaxAmount",
    ()=>calculateTaxAmount,
    "connectDB",
    ()=>connectDB,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getShippingConfig",
    ()=>getShippingConfig,
    "getTaxConfig",
    ()=>getTaxConfig,
    "updateShippingConfig",
    ()=>updateShippingConfig,
    "updateTaxConfig",
    ()=>updateTaxConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseConnection.ts [app-route] (ecmascript)");
;
// Export a default object with an interface similar to the previous Pool
const db = {
    // For query function, we'll need to map SQL to database functions
    query: async (sql, params)=>{
        try {
            // Basic SQL parsing to determine the type of operation
            const sqlLower = sql.toLowerCase().trim();
            if (sqlLower.startsWith('select')) {
                try {
                    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleSelectQuery"])(sql, params);
                    // Format result to match expected interface
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatResult"])(result);
                } catch (parseError) {
                    // If parsing fails, return empty result
                    return {
                        rows: [],
                        rowCount: 0,
                        error: parseError
                    };
                }
            } else if (sqlLower.startsWith('insert')) {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleInsertQuery"])(sql, params);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatResult"])(result);
            } else if (sqlLower.startsWith('update')) {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleUpdateQuery"])(sql, params);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatResult"])(result);
            } else if (sqlLower.startsWith('delete')) {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleDeleteQuery"])(sql, params);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatResult"])(result);
            } else {
                // For other SQL operations, we may need to use database-specific functions
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
    connect: async ()=>{
        // Return an object that mimics a database client for transaction support
        const queryMethod = async (sql, params)=>{
            return await db.query(sql, params);
        };
        return {
            query: queryMethod,
            release: ()=>{
            // No actual connection to release
            }
        };
    },
    end: async ()=>{
        // Database client doesn't require explicit connection ending
        console.log('Database connection closed');
    }
};
const __TURBOPACK__default__export__ = db;
const connectDB = async ()=>{
    try {
        // Perform a simple query to test the connection
        const result = await db.query('SELECT 1 as test');
        if (result.error && result.error.code !== 'PGRST205') {
            console.error('Database connection error:', result.error);
            throw result.error;
        }
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};
const getShippingConfig = async ()=>{
    try {
        const result = await db.query('SELECT * FROM shipping_config ORDER BY created_at DESC LIMIT 1');
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            // Return default shipping configuration if none exists
            return {
                id: 1,
                min_order_amount: 50000,
                flat_rate: 1500,
                enabled: true,
                created_at: new Date().toISOString()
            };
        }
    } catch (error) {
        console.error('Error fetching shipping configuration:', error);
        // Return default configuration
        return {
            id: 1,
            min_order_amount: 50000,
            flat_rate: 1500,
            enabled: true,
            created_at: new Date().toISOString()
        };
    }
};
const updateShippingConfig = async (config)=>{
    try {
        const result = await db.query('INSERT INTO shipping_config (min_order_amount, flat_rate, enabled) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET min_order_amount = $1, flat_rate = $2, enabled = $3 RETURNING *', [
            config.min_order_amount,
            config.flat_rate,
            config.enabled
        ]);
        return result;
    } catch (error) {
        console.error('Error updating shipping configuration:', error);
        throw error;
    }
};
const getTaxConfig = async ()=>{
    try {
        const result = await db.query('SELECT * FROM tax_config ORDER BY created_at DESC LIMIT 1');
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            // Return default tax configuration if none exists
            return {
                id: 1,
                rate: 0.0,
                type: 'percentage',
                // 'percentage' or 'fixed'
                enabled: false,
                created_at: new Date().toISOString()
            };
        }
    } catch (error) {
        console.error('Error fetching tax configuration:', error);
        // Return default configuration
        return {
            id: 1,
            rate: 0.0,
            type: 'percentage',
            enabled: false,
            created_at: new Date().toISOString()
        };
    }
};
const updateTaxConfig = async (config)=>{
    try {
        const result = await db.query('INSERT INTO tax_config (rate, type, enabled) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET rate = $1, type = $2, enabled = $3 RETURNING *', [
            config.rate,
            config.type,
            config.enabled
        ]);
        return result;
    } catch (error) {
        console.error('Error updating tax configuration:', error);
        throw error;
    }
};
const calculateShippingCost = async (subtotal)=>{
    try {
        const config = await getShippingConfig();
        if (!config.enabled) {
            return 0; // Free shipping if disabled
        }
        if (subtotal >= config.min_order_amount) {
            return 0; // Free shipping for orders above threshold
        }
        return config.flat_rate;
    } catch (error) {
        console.error('Error calculating shipping cost:', error);
        // Fallback: return default shipping cost
        return 1500;
    }
};
const calculateTaxAmount = async (amount)=>{
    try {
        const config = await getTaxConfig();
        if (!config.enabled) {
            return 0; // No tax if disabled
        }
        if (config.type === 'fixed') {
            return config.rate; // Fixed tax amount
        } else {
            return amount * (config.rate / 100); // Percentage tax
        }
    } catch (error) {
        console.error('Error calculating tax amount:', error);
        // Fallback: return no tax
        return 0;
    }
};
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>handler,
    "authOptions",
    ()=>authOptions,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/google.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)"); // Your database connection
;
;
;
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // You should add this to your environment variables
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn ({ user, account, profile }) {
            try {
                console.log('NextAuth signIn callback invoked for user:', user?.email || profile?.email || profile?.sub);
                // First, try to find user by email (most reliable)
                const existingUserByEmail = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id, email, name, role, google_id FROM users WHERE email = $1', [
                    user.email || ''
                ]);
                let existingUser;
                if (existingUserByEmail.rows.length > 0) {
                    existingUser = existingUserByEmail.rows[0];
                    user.id = existingUser.id;
                    // If user exists but doesn't have google_id set, update it
                    if (!existingUser.google_id && profile?.sub) {
                        try {
                            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(`UPDATE users SET google_id = $1, avatar = $2 WHERE email = $3`, [
                                profile.sub,
                                user.image,
                                user.email
                            ]);
                            console.log('Updated existing user with Google ID:', user.email);
                        } catch (updateError) {
                            console.warn('Could not update user with Google ID (column might not exist):', updateError);
                        // Continue - the column might not exist yet
                        }
                    }
                } else {
                    // User doesn't exist by email, try by google_id if available
                    if (profile?.sub) {
                        const existingUserByGoogle = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id, email, name, role FROM users WHERE google_id = $1', [
                            profile?.sub || ''
                        ]);
                        if (existingUserByGoogle.rows.length > 0) {
                            existingUser = existingUserByGoogle.rows[0];
                            user.id = existingUser.id;
                            // Update email if it changed
                            if (user.email && user.email !== existingUser.email) {
                                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('UPDATE users SET email = $1 WHERE id = $2', [
                                    user.email,
                                    existingUser.id
                                ]);
                            }
                        }
                    }
                }
                if (!existingUser) {
                    // User doesn't exist at all, create new user
                    try {
                        const insertResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(`INSERT INTO users (name, email, google_id, avatar, role, encrypted_password)
               VALUES ($1, $2, $3, $4, $5, $6)
               RETURNING id, email, name, role`, [
                            user.name || user.email?.split('@')[0] || 'Google User',
                            user.email || '',
                            profile?.sub || '',
                            user.image || null,
                            'user',
                            // Default role for Google auth users
                            null // No password for Google users
                        ]);
                        // Update user object with database user info
                        user.id = insertResult.rows[0].id;
                        console.log('Created new Google user:', user.email, 'with ID:', user.id);
                    } catch (insertError) {
                        if (insertError.message && insertError.message.includes('column "google_id" of relation "users" does not exist')) {
                            console.warn('google_id column does not exist, falling back to basic user creation');
                            // Fallback: create user without google_id
                            const insertResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(`INSERT INTO users (name, email, avatar, role, encrypted_password)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING id, email, name, role`, [
                                user.name || user.email?.split('@')[0] || 'Google User',
                                user.email || '',
                                user.image || null,
                                'user',
                                null
                            ]);
                            user.id = insertResult.rows[0].id;
                        } else {
                            throw insertError;
                        }
                    }
                } else {
                    // User exists, update their info if needed
                    try {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(`UPDATE users 
               SET name = COALESCE($1, name), avatar = COALESCE($2, avatar)
               WHERE id = $3`, [
                            user.name,
                            user.image,
                            user.id
                        ]);
                    } catch (updateError) {
                        console.warn('Could not update user info (google_id column might not exist):', updateError);
                    // Continue without updating
                    }
                }
                console.log('signIn callback completed for', user?.email, 'with ID:', user.id);
                return true; // Allow sign in
            } catch (error) {
                // Log the error but allow sign in to proceed to avoid blocking users when DB is down
                console.error('Error in signIn callback (allowing sign in):', error);
                return true; // Allow sign in even on DB errors
            }
        },
        async jwt ({ token, account, profile, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.sub = profile?.sub;
                token.email = profile?.email || user?.email;
            }
            // Always ensure we have the correct database user ID in the token
            // This is critical for Google users - we need the database ID, not the Google ID
            if (user?.id) {
                // User object from signIn callback has the database ID
                token.id = user.id;
                console.log('JWT callback: Set token.id from user.id:', token.id);
            } else if (token.sub || token.email) {
                // No user object (e.g., on token refresh), look up the database user ID
                try {
                    // First try to find by email (most reliable)
                    if (token.email) {
                        const userByEmail = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM users WHERE email = $1', [
                            token.email
                        ]);
                        if (userByEmail.rows.length > 0) {
                            token.id = userByEmail.rows[0].id;
                            console.log('JWT callback: Found user by email, set token.id:', token.id);
                        }
                    }
                    // If not found by email, try google_id
                    if (!token.id && token.sub) {
                        const userQuery = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM users WHERE google_id = $1', [
                            token.sub
                        ]);
                        if (userQuery.rows.length > 0) {
                            token.id = userQuery.rows[0].id;
                            console.log('JWT callback: Found user by google_id, set token.id:', token.id);
                        }
                    }
                    // If still no token.id, we have a problem
                    if (!token.id) {
                        console.error('JWT callback: Could not find database user ID for token:', {
                            sub: token.sub,
                            email: token.email
                        });
                    }
                } catch (error) {
                    console.error('Error looking up user ID in jwt callback:', error);
                // Don't update token.id if lookup fails, let the API handle the error
                }
            }
            // Log the token for debugging
            if ("TURBOPACK compile-time truthy", 1) {
                console.log('JWT token prepared:', {
                    id: token.id,
                    email: token.email,
                    hasSub: !!token.sub,
                    sub: token.sub
                });
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user && token) {
                // Add custom properties to session
                session.user.id = token.id;
                // @ts-ignore
                session.accessToken = token.accessToken;
            }
            return session;
        }
    },
    // Add debug to see what's happening during auth
    debug: ("TURBOPACK compile-time value", "development") === 'development'
};
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(authOptions);
const __TURBOPACK__default__export__ = handler;
;
}),
"[project]/src/app/api/auth/[...nextauth]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>handler,
    "POST",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
;
;
// Export the handlers for Next.js
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__efb556ca._.js.map