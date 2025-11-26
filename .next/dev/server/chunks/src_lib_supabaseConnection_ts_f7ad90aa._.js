module.exports = [
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
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
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
async function handleSelectQuery(sql, params) {
    // Extract table name from SQL query
    const selectMatch = sql.match(/select\s+(.*?)\s+from\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
    if (!selectMatch) {
        throw new Error('Could not parse SELECT query');
    }
    const columns = selectMatch[1].trim();
    const tableName = selectMatch[2].trim();
    try {
        // Check if supabase client is properly initialized
        if (!supabase) {
            console.error('Supabase client not initialized');
            return {
                data: [],
                error: {
                    message: 'Supabase client not initialized'
                }
            };
        }
        // For the products table, we need to handle the query properly
        // Supabase doesn't handle parameter placeholders ($1, $2) like Postgres does
        // So we need to handle where clauses differently
        const hasWhere = sql.toLowerCase().includes('where');
        if (hasWhere) {
            // Extract WHERE clause - this is a simplified approach
            const whereRegex = /where\s+(.*?)(?:\s+order\s+by|\s+limit|\s+group\s+by|$)/i;
            const whereMatch = sql.match(whereRegex);
            if (whereMatch && whereMatch[1]) {
                const whereClause = whereMatch[1].trim();
                // Handle simple WHERE clause patterns with parameters
                // For 'WHERE email = $1 OR google_id = $2' type queries
                if (params && params.length > 0) {
                    console.log(`Processing WHERE clause: "${whereClause}" with params:`, params);
                    // Handle common patterns
                    if (whereClause.includes('email = $1 OR google_id = $2') && params.length >= 2) {
                        const { data, error } = await supabase.from(tableName).select(columns === '*' ? '*' : columns).or(`email.eq.${params[0]},google_id.eq.${params[1]}`);
                        if (error) {
                            console.error(`Error executing SELECT query with email/google_id filter on table ${tableName}:`, error);
                            return {
                                data: [],
                                error
                            };
                        }
                        return {
                            data,
                            error
                        };
                    } else if (whereClause.includes('email = $1') && params.length >= 1) {
                        const { data, error } = await supabase.from(tableName).select(columns === '*' ? '*' : columns).filter('email', 'eq', params[0]);
                        if (error) {
                            console.error(`Error executing SELECT query with email filter on table ${tableName}:`, error);
                            return {
                                data: [],
                                error
                            };
                        }
                        return {
                            data,
                            error
                        };
                    } else if (whereClause.includes('product_id = $1') && params.length >= 1) {
                        // Special handling for product_images table WHERE product_id = $1
                        const { data, error } = await supabase.from(tableName).select(columns === '*' ? '*' : columns).filter('product_id', 'eq', params[0]);
                        if (error) {
                            console.error(`Error executing SELECT query with product_id filter on table ${tableName}:`, error);
                            return {
                                data: [],
                                error
                            };
                        }
                        return {
                            data,
                            error
                        };
                    } else if (whereClause.toLowerCase().includes('user_id = $1 and product_id = $2') && params.length >= 2) {
                        console.log(`Matching "user_id = $1 AND product_id = $2" pattern with user_id=${params[0]}, product_id=${params[1]}`);
                        const { data, error } = await supabase.from(tableName).select(columns === '*' ? '*' : columns).filter('user_id', 'eq', params[0]).filter('product_id', 'eq', params[1]);
                        if (error) {
                            console.error(`Error executing SELECT query with user_id and product_id filter on table ${tableName}:`, error);
                            return {
                                data: [],
                                error
                            };
                        }
                        console.log(`Query result for user_id=${params[0]}, product_id=${params[1]}:`, data);
                        return {
                            data,
                            error
                        };
                    } else if (whereClause.toLowerCase().includes('user_id = $1') && params.length >= 1) {
                        console.log(`Matching "user_id = $1" pattern with user_id value:`, params[0]);
                        const { data, error } = await supabase.from(tableName).select(columns === '*' ? '*' : columns).filter('user_id', 'eq', params[0]);
                        if (error) {
                            console.error(`Error executing SELECT query with user_id filter on table ${tableName}:`, error);
                            return {
                                data: [],
                                error
                            };
                        }
                        console.log(`Query result for user_id=${params[0]}:`, data);
                        return {
                            data,
                            error
                        };
                    } else if (whereClause.toLowerCase().includes('id = $1') && params.length >= 1) {
                        console.log(`Matching "id = $1" pattern with id value:`, params[0]);
                        const { data, error } = await supabase.from(tableName).select(columns === '*' ? '*' : columns).filter('id', 'eq', params[0]);
                        if (error) {
                            console.error(`Error executing SELECT query with id filter on table ${tableName}:`, error);
                            return {
                                data: [],
                                error
                            };
                        }
                        console.log(`Query result for id=${params[0]}:`, data);
                        return {
                            data,
                            error
                        };
                    } else if (whereClause.toLowerCase().includes('slug = $1') && params.length >= 1) {
                        console.log(`Matching "slug = $1" pattern with slug value:`, params[0]);
                        const { data, error } = await supabase.from(tableName).select(columns === '*' ? '*' : columns).filter('slug', 'eq', params[0]);
                        if (error) {
                            console.error(`Error executing SELECT query with slug filter on table ${tableName}:`, error);
                            return {
                                data: [],
                                error
                            };
                        }
                        console.log(`Query result for slug=${params[0]}:`, data);
                        return {
                            data,
                            error
                        };
                    } else if (whereClause.includes('CAST(google_id AS TEXT) = $1') && params.length >= 1) {
                        console.log(`Matching "CAST(google_id AS TEXT) = $1" pattern with google_id value:`, params[0]);
                        const { data, error } = await supabase.from(tableName).select(columns === '*' ? '*' : columns).filter('google_id', 'eq', params[0]);
                        if (error) {
                            console.error(`Error executing SELECT query with google_id filter on table ${tableName}:`, error);
                            return {
                                data: [],
                                error
                            };
                        }
                        console.log(`Query result for google_id=${params[0]}:`, data);
                        return {
                            data,
                            error
                        };
                    } else {
                        console.warn(`WHERE clause "${whereClause}" not supported in this compatibility layer`);
                    // Execute the basic query without WHERE filters if we can't parse them
                    }
                }
            }
        }
        // If no where clause or where clause couldn't be parsed, execute basic select
        if (columns === '*') {
            const { data, error } = await supabase.from(tableName).select();
            if (error) {
                console.error(`Error executing SELECT * query on table ${tableName}:`, error);
                // Return empty data instead of throwing to match expected interface
                return {
                    data: [],
                    error
                };
            }
            return {
                data,
                error
            };
        } else {
            // Handle specific columns
            const columnList = columns.split(',').map((col)=>col.trim());
            const { data, error } = await supabase.from(tableName).select(columnList.join(','));
            if (error) {
                console.error(`Error executing SELECT query on table ${tableName}:`, error);
                return {
                    data: [],
                    error
                };
            }
            return {
                data,
                error
            };
        }
    } catch (error) {
        console.error(`Error executing SELECT query on table ${tableName}:`, error);
        // Return empty data to prevent crash
        return {
            data: [],
            error: error
        };
    }
}
async function handleInsertQuery(sql, params) {
    // Parse table name, columns and values from SQL, allowing for optional ON CONFLICT and RETURNING clauses
    const insertRegex = /insert\s+into\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(\s*([^)]+)\s*\)\s+values\s*\(\s*([^)]+)\s*\)(?:\s+on\s+conflict\s+\(([^)]+)\)\s+do\s+update\s+set\s+([^']+))?(?:\s+returning\s+.*)?/i;
    const insertMatch = sql.match(insertRegex);
    if (!insertMatch) {
        throw new Error('Could not parse INSERT query');
    }
    const tableName = insertMatch[1];
    const columns = insertMatch[2].replace(/\s/g, '').split(','); // Remove spaces and split by comma
    try {
        if (!params || params.length === 0) {
            console.warn('INSERT query has no parameters - returning empty result');
            return {
                data: null,
                error: null
            };
        }
        // Check if supabase client is properly initialized
        if (!supabase) {
            console.error('Supabase client not initialized');
            return {
                data: null,
                error: {
                    message: 'Supabase client not initialized'
                }
            };
        }
        // Check if this is an upsert query (has ON CONFLICT clause)
        const hasConflict = sql.toLowerCase().includes('on conflict');
        // Create an object mapping columns to parameter values
        const insertData = {};
        for(let i = 0; i < columns.length && i < params.length; i++){
            // Remove spaces and quotes from column names
            const columnName = columns[i].trim();
            insertData[columnName] = params[i];
        }
        let result;
        if (hasConflict) {
            // For upsert operations, use Supabase's upsert method
            // Extract conflict columns - for our specific case user_id, product_id
            const conflictMatch = sql.match(/on conflict \(([^)]+)\)/i);
            if (conflictMatch) {
                // Use upsert to handle conflict
                const { data, error } = await supabase.from(tableName).upsert(insertData, {
                    onConflict: conflictMatch[1].replace(/\s/g, '')
                }).select();
                result = {
                    data,
                    error
                };
            } else {
                // If no conflict columns specified, fall back to regular insert
                const { data, error } = await supabase.from(tableName).insert(insertData).select();
                result = {
                    data,
                    error
                };
            }
        } else {
            // Use .select() to emulate RETURNING *
            const { data, error } = await supabase.from(tableName).insert(insertData).select();
            result = {
                data,
                error
            };
        }
        if (result.error) {
            console.error(`Error executing INSERT query on table ${tableName}:`, result.error);
            return result;
        }
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
    // Simple regex to extract table name, SET clause, and WHERE clause, allowing for an optional RETURNING clause
    const updateMatch = sql.match(/update\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+set\s+(.*?)\s+where\s+(.*?)(?:\s+returning\s+.*)?$/i);
    if (!updateMatch) {
        throw new Error('Could not parse UPDATE query');
    }
    const tableName = updateMatch[1];
    const setClause = updateMatch[2];
    const whereClause = updateMatch[3];
    try {
        if (!params || params.length === 0) {
            console.warn('UPDATE query has no parameters - returning empty result');
            return {
                data: null,
                error: null
            };
        }
        // Check if supabase client is properly initialized
        if (!supabase) {
            console.error('Supabase client not initialized');
            return {
                data: null,
                error: {
                    message: 'Supabase client not initialized'
                }
            };
        }
        // Create an object for the SET clause
        const updateData = {};
        const setParts = setClause.split(',');
        let currentParamIndex = 0; // Track the current parameter index
        setParts.forEach((part)=>{
            const [key, value] = part.split('=').map((p)=>p.trim());
            // Assuming the value is a placeholder like $1, $2, etc.
            // We need to use the actual parameter value, not the placeholder string
            updateData[key] = params[currentParamIndex];
            currentParamIndex++;
        });
        // Create a filter for the WHERE clause
        const filter = {};
        const whereParts = whereClause.split('AND').map((p)=>p.trim());
        whereParts.forEach((part)=>{
            const [key, value] = part.split('=').map((p)=>p.trim());
            // Assuming the value is a placeholder like $1, $2, etc.
            // We need to use the actual parameter value, not the placeholder string
            filter[key] = params[currentParamIndex];
            currentParamIndex++;
        });
        console.log('handleUpdateQuery: tableName', tableName);
        console.log('handleUpdateQuery: updateData', updateData);
        console.log('handleUpdateQuery: filter', filter);
        // Use .select() to emulate RETURNING *
        const { data, error } = await supabase.from(tableName).update(updateData).match(filter).select();
        console.log('handleUpdateQuery: Supabase response data', data);
        console.log('handleUpdateQuery: Supabase response error', error);
        if (error) {
            console.error(`Error executing UPDATE query on table ${tableName}:`, error);
            return {
                data: null,
                error
            };
        }
        return {
            data,
            error
        };
    } catch (error) {
        console.error(`Error executing UPDATE query on table ${tableName}:`, error);
        return {
            data: null,
            error
        };
    }
}
async function handleDeleteQuery(sql, params) {
    // Simple regex to extract table name and WHERE clause
    const deleteMatch = sql.match(/delete\s+from\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+where\s+(.*)/i);
    if (!deleteMatch) {
        throw new Error('Could not parse DELETE query');
    }
    const tableName = deleteMatch[1];
    const whereClause = deleteMatch[2];
    try {
        if (!params || params.length === 0) {
            console.warn('DELETE query has no parameters - returning empty result');
            return {
                data: null,
                error: null
            };
        }
        // Check if supabase client is properly initialized
        if (!supabase) {
            console.error('Supabase client not initialized');
            return {
                data: null,
                error: {
                    message: 'Supabase client not initialized'
                }
            };
        }
        // Create a filter for the WHERE clause
        const filter = {};
        const whereParts = whereClause.split('AND').map((p)=>p.trim());
        let currentParamIndex = 0; // Track the current parameter index
        whereParts.forEach((part)=>{
            const [key, value] = part.split('=').map((p)=>p.trim());
            // Assuming the value is a placeholder like $1, $2, etc.
            // We need to use the actual parameter value, not the placeholder string
            filter[key] = params[currentParamIndex];
            currentParamIndex++;
        });
        console.log('handleDeleteQuery: tableName', tableName);
        console.log('handleDeleteQuery: filter', filter);
        const { data, error } = await supabase.from(tableName).delete().match(filter);
        console.log('handleDeleteQuery: Supabase response data', data);
        console.log('handleDeleteQuery: Supabase response error', error);
        if (error) {
            console.error(`Error executing DELETE query on table ${tableName}:`, error);
            return {
                data: null,
                error
            };
        }
        return {
            data,
            error
        };
    } catch (error) {
        console.error(`Error executing DELETE query on table ${tableName}:`, error);
        return {
            data: null,
            error
        };
    }
}
}),
];

//# sourceMappingURL=src_lib_supabaseConnection_ts_f7ad90aa._.js.map