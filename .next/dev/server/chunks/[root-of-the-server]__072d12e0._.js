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
async function GET(request) {
    try {
        // Support both NextAuth and Bearer token authentication
        const { userId, authType } = await getUserIdFromRequest(request);
        if (userId && authType) {
            console.log(`Fetching cart for ${authType} user: ${userId}`);
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
            // First, get cart items for this user
            const cartItemsResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(`SELECT id, product_id, quantity FROM cart_items WHERE user_id = $1`, [
                userId
            ]);
            if (cartItemsResult.error) {
                throw cartItemsResult.error;
            }
            // If there are cart items, get the product details for each
            if (cartItemsResult.rows.length > 0) {
                // Create a list of promises to fetch product details
                const productPromises = cartItemsResult.rows.map(async (cartItem)=>{
                    // Get product details (excluding originalPrice and discount since they may not exist in the database)
                    const productResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(`SELECT id, name, price, image_url FROM products WHERE id = $1`, [
                        cartItem.product_id
                    ]);
                    // Add default values for missing fields
                    const productRow = {
                        ...productResult.rows[0],
                        originalPrice: null,
                        discount: 0
                    };
                    if (productResult.rows.length > 0) {
                        return {
                            ...cartItem,
                            name: productRow.name,
                            price: productRow.price,
                            image_url: productRow.image_url,
                            originalPrice: productRow.originalPrice,
                            discount: productRow.discount
                        };
                    } else {
                        // Product might have been deleted, return cart item with minimal info
                        return {
                            ...cartItem,
                            name: 'Product not found',
                            price: 0,
                            image_url: null
                        };
                    }
                });
                const cartItemsWithDetails = await Promise.all(productPromises);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    data: cartItemsWithDetails
                });
            } else {
                // No cart items
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    data: []
                });
            }
        } else {
            // Unauthenticated user - return empty cart or handle client-side cart
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: []
            });
        }
    } catch (error) {
        console.error('Error fetching cart items:', error);
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
        // Support both NextAuth and Bearer token authentication
        const { userId, authType } = await getUserIdFromRequest(request);
        const body = await request.json();
        const { product_id, quantity = 1 } = body;
        // Validate that product_id is a valid number
        if (!product_id || typeof product_id !== 'number' || isNaN(product_id) || product_id <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Valid product ID is required'
            }, {
                status: 400
            });
        }
        if (quantity <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Quantity must be greater than 0'
            }, {
                status: 400
            });
        }
        // Check if product exists (excluding originalPrice and discount since they may not exist in the database)
        const productResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id, name, price, image_url FROM products WHERE id = $1', [
            product_id
        ]);
        // Add default values for missing fields
        productResult.rows = productResult.rows.map((row)=>({
                ...row,
                originalPrice: null,
                discount: 0
            }));
        if (productResult.rows.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Product not found'
            }, {
                status: 404
            });
        }
        const product = productResult.rows[0];
        if (userId && authType) {
            console.log(`Adding to cart for ${authType} user: ${userId}`);
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
            console.log('Adding to cart for user:', userId, 'product:', product_id);
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
                        const newQuantity = 1 + quantity; // existing was 1, add the requested quantity
                        const updateResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING id, product_id, quantity', [
                            newQuantity,
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
            // Check if result exists before accessing its properties
            if (!result) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Cart operation failed'
                }, {
                    status: 500
                });
            }
            // Return the updated cart item with product details
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: {
                    id: result.id,
                    product_id: result.product_id,
                    name: product.name,
                    price: product.price,
                    quantity: result.quantity,
                    image_url: product.image_url
                }
            }, {
                status: 200
            });
        } else {
            // Unauthenticated user - return cart item for client-side cart
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: {
                    id: 0,
                    // Will be assigned when user logs in
                    product_id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    image_url: product.image_url,
                    user_id: null // Indicates guest cart
                }
            }, {
                status: 200
            });
        }
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
        // Support both NextAuth and Bearer token authentication
        const { userId, authType } = await getUserIdFromRequest(request);
        const body = await request.json();
        const { product_id, quantity } = body;
        // Validate that product_id is a valid number
        if (!product_id || typeof product_id !== 'number' || isNaN(product_id) || product_id <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Valid product ID is required'
            }, {
                status: 400
            });
        }
        if (typeof quantity !== 'number' || isNaN(quantity) || quantity < 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Valid quantity is required'
            }, {
                status: 400
            });
        }
        if (!userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Authentication required'
            }, {
                status: 401
            });
        }
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
        if (quantity === 0) {
            // Remove item when quantity is 0
            // First, check if the cart item exists
            const existingItemResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM cart_items WHERE user_id = $1 AND product_id = $2', [
                userId,
                product_id
            ]);
            if (existingItemResult.rows.length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Cart item not found'
                }, {
                    status: 404
                });
            }
            const deleteResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [
                userId,
                product_id
            ]);
            if (deleteResult.error) {
                throw deleteResult.error;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: 'Item removed from cart'
            }, {
                status: 200
            });
        } else {
            // Update quantity
            // First, check if the cart item exists
            const existingItemResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM cart_items WHERE user_id = $1 AND product_id = $2', [
                userId,
                product_id
            ]);
            if (existingItemResult.rows.length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Cart item not found'
                }, {
                    status: 404
                });
            }
            const updateResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3', [
                quantity,
                userId,
                product_id
            ]);
            if (updateResult.error) {
                throw updateResult.error;
            }
            // Get the updated cart item
            const updatedCartItemResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id, product_id, quantity FROM cart_items WHERE user_id = $1 AND product_id = $2', [
                userId,
                product_id
            ]);
            // Get product details to return with updated cart item (excluding originalPrice and discount since they may not exist in the database)
            const productResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id, name, price, image_url FROM products WHERE id = $1', [
                product_id
            ]);
            // Add default values for missing fields
            const productRow = {
                ...productResult.rows[0],
                originalPrice: null,
                discount: 0
            };
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                data: {
                    id: updatedCartItemResult.rows[0].id,
                    product_id: updatedCartItemResult.rows[0].product_id,
                    quantity: updatedCartItemResult.rows[0].quantity,
                    name: productResult.rows[0]?.name || 'Unknown Product',
                    price: productResult.rows[0]?.price,
                    image_url: productResult.rows[0]?.image_url
                }
            }, {
                status: 200
            });
        }
    } catch (error) {
        console.error('Error updating cart item:', error);
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
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getToken"])({
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        });
        if (token && (token.sub || token.id)) {
            // Authenticated user - clear database cart
            let userIdValue = token.id || token.sub;
            // Handle different possible types for userIdValue
            if (typeof userIdValue === 'number') {
                userIdValue = userIdValue.toString();
            } else if (typeof userIdValue === 'string') {
            // Already a string, continue
            } else {
                console.error('Invalid userId type from token:', typeof userIdValue, 'Full token:', token);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Invalid user authentication'
                }, {
                    status: 401
                });
            }
            // Parse as integer but check for out of range for PostgreSQL INT4 (integer)
            let userIdNum = parseInt(userIdValue, 10);
            // Check if the number is valid and in range for PostgreSQL INT4 (integer)
            if (isNaN(userIdNum) || userIdNum <= 0 || userIdNum > 2147483647 || userIdNum < -2147483648) {
                console.error('Invalid userId or out of range from token:', userIdValue, 'Full token:', token);
                // For very large IDs (like Google IDs), try to look up the database user ID
                // Google IDs are typically too large for PostgreSQL INT4, but are stored in google_id column
                try {
                    // Try to find user by email first (most reliable for Google users)
                    if (token.email) {
                        const userByEmail = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM users WHERE email = $1', [
                            token.email
                        ]);
                        if (userByEmail.rows.length > 0) {
                            userIdNum = userByEmail.rows[0].id;
                            console.log('Found user by email:', token.email, '-> ID:', userIdNum);
                        }
                    }
                    // If not found by email, try google_id
                    if (!userIdNum || userIdNum <= 0) {
                        try {
                            const userLookup = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM users WHERE google_id = $1', [
                                userIdValue
                            ]);
                            if (userLookup.rows.length > 0) {
                                userIdNum = userLookup.rows[0].id;
                                console.log('Mapped Google ID to database user ID:', userIdValue, '->', userIdNum);
                            } else {
                                // This is not a known Google ID, return error
                                console.error('No matching user found for Google ID:', userIdValue);
                                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                    success: false,
                                    error: 'Invalid user authentication - user ID out of range'
                                }, {
                                    status: 401
                                });
                            }
                        } catch (lookupError) {
                            console.error('Error looking up user by Google ID:', lookupError);
                            // If column doesn't exist, try to create it or use alternative
                            if (lookupError.message && lookupError.message.includes('column "google_id" does not exist')) {
                                console.warn('google_id column does not exist, attempting alternative lookup...');
                                // For now, return error - the schema needs to be updated
                                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                    success: false,
                                    error: 'Database schema needs update. Please run: ALTER TABLE users ADD COLUMN google_id VARCHAR(255) UNIQUE;'
                                }, {
                                    status: 500
                                });
                            }
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: false,
                                error: 'Invalid user authentication - user ID out of range'
                            }, {
                                status: 401
                            });
                        }
                    }
                } catch (lookupError) {
                    console.error('Error looking up user:', lookupError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: false,
                        error: 'Invalid user authentication - user ID out of range'
                    }, {
                        status: 401
                    });
                }
            }
            const userId = userIdNum;
            // Validate the parsed userId
            if (userId <= 0) {
                console.error('Invalid userId parsed from token:', userIdValue, 'Full token:', token);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Invalid user authentication'
                }, {
                    status: 401
                });
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('DELETE FROM cart_items WHERE user_id = $1', [
                userId
            ]);
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
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__072d12e0._.js.map