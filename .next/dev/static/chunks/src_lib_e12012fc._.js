(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/supabaseConnection.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
// In a Next.js app, environment variables are available via process.env
// For direct Node.js execution, we load .env manually
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
// Supabase client configuration
const supabaseUrl = ("TURBOPACK compile-time value", "https://fykdwqlayqcxycrvbhew.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey) : "TURBOPACK unreachable";
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/db.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseConnection.ts [app-client] (ecmascript)");
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
                    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleSelectQuery"])(sql, params);
                    // Format result to match expected interface
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatResult"])(result);
                } catch (parseError) {
                    // If parsing fails, return empty result
                    return {
                        rows: [],
                        rowCount: 0,
                        error: parseError
                    };
                }
            } else if (sqlLower.startsWith('insert')) {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleInsertQuery"])(sql, params);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatResult"])(result);
            } else if (sqlLower.startsWith('update')) {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleUpdateQuery"])(sql, params);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatResult"])(result);
            } else if (sqlLower.startsWith('delete')) {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleDeleteQuery"])(sql, params);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatResult"])(result);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_lib_e12012fc._.js.map