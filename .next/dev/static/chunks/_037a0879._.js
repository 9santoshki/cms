(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
    });
});
}),
"[project]/src/lib/db.ts [app-client] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_3c8c76a5._.js",
  "static/chunks/src_lib_e12012fc._.js",
  "static/chunks/src_lib_db_ts_8e60e6d2._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/db.ts [app-client] (ecmascript)");
    });
});
}),
]);