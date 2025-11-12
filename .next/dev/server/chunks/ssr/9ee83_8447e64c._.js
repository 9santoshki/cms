module.exports = [
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript, Next.js server utility)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript)"));}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/instrumentation/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRevalidateReason",
    ()=>getRevalidateReason
]);
function getRevalidateReason(params) {
    if (params.isOnDemandRevalidate) {
        return 'on-demand';
    }
    if (params.isStaticGeneration) {
        return 'stale';
    }
    return undefined;
} //# sourceMappingURL=utils.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/interop-default.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Interop between "export default" and "module.exports".
 */ __turbopack_context__.s([
    "interopDefault",
    ()=>interopDefault
]);
function interopDefault(mod) {
    return mod.default || mod;
} //# sourceMappingURL=interop-default.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/strip-flight-headers.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stripFlightHeaders",
    ()=>stripFlightHeaders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/client/components/app-router-headers.js [app-rsc] (ecmascript)");
;
function stripFlightHeaders(headers) {
    for (const header of __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FLIGHT_HEADERS"]){
        delete headers[header];
    }
} //# sourceMappingURL=strip-flight-headers.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeadersAdapter",
    ()=>HeadersAdapter,
    "ReadonlyHeadersError",
    ()=>ReadonlyHeadersError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [app-rsc] (ecmascript)");
;
class ReadonlyHeadersError extends Error {
    constructor(){
        super('Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers');
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === 'symbol') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === 'undefined') return;
                // If the original casing exists, return the value.
                return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === 'symbol') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === 'symbol') return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === 'undefined') return false;
                // If the original casing exists, return true.
                return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === 'symbol') return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === 'undefined') return true;
                // If the original casing exists, delete the property.
                return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'append':
                    case 'delete':
                    case 'set':
                        return ReadonlyHeadersError.callable;
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(', ');
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === 'string') {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== 'undefined') return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== 'undefined';
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/cookie/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/cookie") + "/";
    var e = {};
    (()=>{
        var r = e;
        /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ r.parse = parse;
        r.serialize = serialize;
        var i = decodeURIComponent;
        var t = encodeURIComponent;
        var a = /; */;
        var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse(e, r) {
            if (typeof e !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var t = {};
            var n = r || {};
            var o = e.split(a);
            var s = n.decode || i;
            for(var p = 0; p < o.length; p++){
                var f = o[p];
                var u = f.indexOf("=");
                if (u < 0) {
                    continue;
                }
                var v = f.substr(0, u).trim();
                var c = f.substr(++u, f.length).trim();
                if ('"' == c[0]) {
                    c = c.slice(1, -1);
                }
                if (undefined == t[v]) {
                    t[v] = tryDecode(c, s);
                }
            }
            return t;
        }
        function serialize(e, r, i) {
            var a = i || {};
            var o = a.encode || t;
            if (typeof o !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!n.test(e)) {
                throw new TypeError("argument name is invalid");
            }
            var s = o(r);
            if (s && !n.test(s)) {
                throw new TypeError("argument val is invalid");
            }
            var p = e + "=" + s;
            if (null != a.maxAge) {
                var f = a.maxAge - 0;
                if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                }
                p += "; Max-Age=" + Math.floor(f);
            }
            if (a.domain) {
                if (!n.test(a.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                p += "; Domain=" + a.domain;
            }
            if (a.path) {
                if (!n.test(a.path)) {
                    throw new TypeError("option path is invalid");
                }
                p += "; Path=" + a.path;
            }
            if (a.expires) {
                if (typeof a.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                }
                p += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly) {
                p += "; HttpOnly";
            }
            if (a.secure) {
                p += "; Secure";
            }
            if (a.sameSite) {
                var u = typeof a.sameSite === "string" ? a.sameSite.toLowerCase() : a.sameSite;
                switch(u){
                    case true:
                        p += "; SameSite=Strict";
                        break;
                    case "lax":
                        p += "; SameSite=Lax";
                        break;
                    case "strict":
                        p += "; SameSite=Strict";
                        break;
                    case "none":
                        p += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return p;
        }
        function tryDecode(e, r) {
            try {
                return r(e);
            } catch (r) {
                return e;
            }
        }
    })();
    module.exports = e;
})();
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/api-utils/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "COOKIE_NAME_PRERENDER_BYPASS",
    ()=>COOKIE_NAME_PRERENDER_BYPASS,
    "COOKIE_NAME_PRERENDER_DATA",
    ()=>COOKIE_NAME_PRERENDER_DATA,
    "RESPONSE_LIMIT_DEFAULT",
    ()=>RESPONSE_LIMIT_DEFAULT,
    "SYMBOL_CLEARED_COOKIES",
    ()=>SYMBOL_CLEARED_COOKIES,
    "SYMBOL_PREVIEW_DATA",
    ()=>SYMBOL_PREVIEW_DATA,
    "checkIsOnDemandRevalidate",
    ()=>checkIsOnDemandRevalidate,
    "clearPreviewData",
    ()=>clearPreviewData,
    "redirect",
    ()=>redirect,
    "sendError",
    ()=>sendError,
    "sendStatusCode",
    ()=>sendStatusCode,
    "setLazyProp",
    ()=>setLazyProp,
    "wrapApiHandler",
    ()=>wrapApiHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/trace/constants.js [app-rsc] (ecmascript)");
;
;
;
;
function wrapApiHandler(page, handler) {
    return (...args)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTracer"])().setRootSpanAttribute('next.route', page);
        // Call API route method
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTracer"])().trace(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeSpan"].runHandler, {
            spanName: `executing api route (pages) ${page}`
        }, ()=>handler(...args));
    };
}
function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === 'string') {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== 'number' || typeof url !== 'string') {
        throw Object.defineProperty(new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`), "__NEXT_ERROR_CODE", {
            value: "E389",
            enumerable: false,
            configurable: true
        });
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(req.headers);
    const previewModeId = headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRERENDER_REVALIDATE_HEADER"]);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER"]);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = 4 * 1024 * 1024;
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/cookie/index.js [app-rsc] (ecmascript)");
    const previous = res.getHeader('Set-Cookie');
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === 'string' ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
class ApiError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
} //# sourceMappingURL=index.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/api-utils/get-cookie-parser.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Parse cookies from the `headers` of request
 * @param req request object
 */ __turbopack_context__.s([
    "getCookieParser",
    ()=>getCookieParser
]);
function getCookieParser(headers) {
    return function parseCookie() {
        const { cookie } = headers;
        if (!cookie) {
            return {};
        }
        const { parse: parseCookieFn } = __turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/cookie/index.js [app-rsc] (ecmascript)");
        return parseCookieFn(Array.isArray(cookie) ? cookie.join('; ') : cookie);
    };
} //# sourceMappingURL=get-cookie-parser.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/base-http/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseNextRequest",
    ()=>BaseNextRequest,
    "BaseNextResponse",
    ()=>BaseNextResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/client/components/redirect-status-code.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$get$2d$cookie$2d$parser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/api-utils/get-cookie-parser.js [app-rsc] (ecmascript)");
;
;
class BaseNextRequest {
    constructor(method, url, body){
        this.method = method;
        this.url = url;
        this.body = body;
    }
    // Utils implemented using the abstract methods above
    get cookies() {
        if (this._cookies) return this._cookies;
        return this._cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$get$2d$cookie$2d$parser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCookieParser"])(this.headers)();
    }
}
class BaseNextResponse {
    constructor(destination){
        this.destination = destination;
    }
    // Utils implemented using the abstract methods above
    redirect(destination, statusCode) {
        this.setHeader('Location', destination);
        this.statusCode = statusCode;
        // Since IE11 doesn't support the 308 header add backwards
        // compatibility using refresh header
        if (statusCode === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RedirectStatusCode"].PermanentRedirect) {
            this.setHeader('Refresh', `0;url=${destination}`);
        }
        return this;
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/base-http/node.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NodeNextRequest",
    ()=>NodeNextRequest,
    "NodeNextResponse",
    ()=>NodeNextResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/api-utils/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/request-meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/base-http/index.js [app-rsc] (ecmascript)");
;
;
;
let prop;
class NodeNextRequest extends __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseNextRequest"] {
    static #_ = prop = _NEXT_REQUEST_META = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_REQUEST_META"];
    constructor(_req){
        var _this__req;
        super(_req.method.toUpperCase(), _req.url, _req), this._req = _req, this.headers = this._req.headers, this.fetchMetrics = (_this__req = this._req) == null ? void 0 : _this__req.fetchMetrics, this[_NEXT_REQUEST_META] = this._req[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_REQUEST_META"]] || {}, this.streaming = false;
    }
    get originalRequest() {
        // Need to mimic these changes to the original req object for places where we use it:
        // render.tsx, api/ssg requests
        this._req[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_REQUEST_META"]] = this[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_REQUEST_META"]];
        this._req.url = this.url;
        this._req.cookies = this.cookies;
        return this._req;
    }
    set originalRequest(value) {
        this._req = value;
    }
    /**
   * Returns the request body as a Web Readable Stream. The body here can only
   * be read once as the body will start flowing as soon as the data handler
   * is attached.
   *
   * @internal
   */ stream() {
        if (this.streaming) {
            throw Object.defineProperty(new Error('Invariant: NodeNextRequest.stream() can only be called once'), "__NEXT_ERROR_CODE", {
                value: "E467",
                enumerable: false,
                configurable: true
            });
        }
        this.streaming = true;
        return new ReadableStream({
            start: (controller)=>{
                this._req.on('data', (chunk)=>{
                    controller.enqueue(new Uint8Array(chunk));
                });
                this._req.on('end', ()=>{
                    controller.close();
                });
                this._req.on('error', (err)=>{
                    controller.error(err);
                });
            }
        });
    }
}
class NodeNextResponse extends __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseNextResponse"] {
    get originalResponse() {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYMBOL_CLEARED_COOKIES"] in this) {
            this._res[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYMBOL_CLEARED_COOKIES"]] = this[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYMBOL_CLEARED_COOKIES"]];
        }
        return this._res;
    }
    constructor(_res){
        super(_res), this._res = _res, this.textBody = undefined;
    }
    get sent() {
        return this._res.finished || this._res.headersSent;
    }
    get statusCode() {
        return this._res.statusCode;
    }
    set statusCode(value) {
        this._res.statusCode = value;
    }
    get statusMessage() {
        return this._res.statusMessage;
    }
    set statusMessage(value) {
        this._res.statusMessage = value;
    }
    setHeader(name, value) {
        this._res.setHeader(name, value);
        return this;
    }
    removeHeader(name) {
        this._res.removeHeader(name);
        return this;
    }
    getHeaderValues(name) {
        const values = this._res.getHeader(name);
        if (values === undefined) return undefined;
        return (Array.isArray(values) ? values : [
            values
        ]).map((value)=>value.toString());
    }
    hasHeader(name) {
        return this._res.hasHeader(name);
    }
    getHeader(name) {
        const values = this.getHeaderValues(name);
        return Array.isArray(values) ? values.join(',') : undefined;
    }
    getHeaders() {
        return this._res.getHeaders();
    }
    appendHeader(name, value) {
        const currentValues = this.getHeaderValues(name) ?? [];
        if (!currentValues.includes(value)) {
            this._res.setHeader(name, [
                ...currentValues,
                value
            ]);
        }
        return this;
    }
    body(value) {
        this.textBody = value;
        return this;
    }
    send() {
        this._res.end(this.textBody);
    }
    onClose(callback) {
        this.originalResponse.on('close', callback);
    }
}
var _NEXT_REQUEST_META; //# sourceMappingURL=node.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/experimental/ppr.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If set to `incremental`, only those leaf pages that export
 * `experimental_ppr = true` will have partial prerendering enabled. If any
 * page exports this value as `false` or does not export it at all will not
 * have partial prerendering enabled. If set to a boolean, the options for
 * `experimental_ppr` will be ignored.
 */ /**
 * Returns true if partial prerendering is enabled for the application. It does
 * not tell you if a given route has PPR enabled, as that requires analysis of
 * the route's configuration.
 *
 * @see {@link checkIsRoutePPREnabled} - for checking if a specific route has PPR enabled.
 */ __turbopack_context__.s([
    "checkIsAppPPREnabled",
    ()=>checkIsAppPPREnabled,
    "checkIsRoutePPREnabled",
    ()=>checkIsRoutePPREnabled
]);
function checkIsAppPPREnabled(config) {
    // If the config is undefined, partial prerendering is disabled.
    if (typeof config === 'undefined') return false;
    // If the config is a boolean, use it directly.
    if (typeof config === 'boolean') return config;
    // If the config is a string, it must be 'incremental' to enable partial
    // prerendering.
    if (config === 'incremental') return true;
    return false;
}
function checkIsRoutePPREnabled(config) {
    // If the config is undefined, partial prerendering is disabled.
    if (typeof config === 'undefined') return false;
    // If the config is a boolean, use it directly.
    if (typeof config === 'boolean') return config;
    return false;
} //# sourceMappingURL=ppr.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/zod/index.cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    var e = {
        629: function(e, t, s) {
            var r = this && this.__createBinding || (Object.create ? function(e, t, s, r) {
                if (r === undefined) r = s;
                var a = Object.getOwnPropertyDescriptor(t, s);
                if (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) {
                    a = {
                        enumerable: true,
                        get: function() {
                            return t[s];
                        }
                    };
                }
                Object.defineProperty(e, r, a);
            } : function(e, t, s, r) {
                if (r === undefined) r = s;
                e[r] = t[s];
            });
            var a = this && this.__setModuleDefault || (Object.create ? function(e, t) {
                Object.defineProperty(e, "default", {
                    enumerable: true,
                    value: t
                });
            } : function(e, t) {
                e["default"] = t;
            });
            var n = this && this.__importStar || function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (e != null) {
                    for(var s in e)if (s !== "default" && Object.prototype.hasOwnProperty.call(e, s)) r(t, e, s);
                }
                a(t, e);
                return t;
            };
            var i = this && this.__exportStar || function(e, t) {
                for(var s in e)if (s !== "default" && !Object.prototype.hasOwnProperty.call(t, s)) r(t, e, s);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.z = void 0;
            const o = n(s(923));
            t.z = o;
            i(s(923), t);
            t["default"] = o;
        },
        348: (e, t, s)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ZodError = t.quotelessJson = t.ZodIssueCode = void 0;
            const r = s(709);
            t.ZodIssueCode = r.util.arrayToEnum([
                "invalid_type",
                "invalid_literal",
                "custom",
                "invalid_union",
                "invalid_union_discriminator",
                "invalid_enum_value",
                "unrecognized_keys",
                "invalid_arguments",
                "invalid_return_type",
                "invalid_date",
                "invalid_string",
                "too_small",
                "too_big",
                "invalid_intersection_types",
                "not_multiple_of",
                "not_finite"
            ]);
            const quotelessJson = (e)=>{
                const t = JSON.stringify(e, null, 2);
                return t.replace(/"([^"]+)":/g, "$1:");
            };
            t.quotelessJson = quotelessJson;
            class ZodError extends Error {
                get errors() {
                    return this.issues;
                }
                constructor(e){
                    super();
                    this.issues = [];
                    this.addIssue = (e)=>{
                        this.issues = [
                            ...this.issues,
                            e
                        ];
                    };
                    this.addIssues = (e = [])=>{
                        this.issues = [
                            ...this.issues,
                            ...e
                        ];
                    };
                    const t = new.target.prototype;
                    if (Object.setPrototypeOf) {
                        Object.setPrototypeOf(this, t);
                    } else {
                        this.__proto__ = t;
                    }
                    this.name = "ZodError";
                    this.issues = e;
                }
                format(e) {
                    const t = e || function(e) {
                        return e.message;
                    };
                    const s = {
                        _errors: []
                    };
                    const processError = (e)=>{
                        for (const r of e.issues){
                            if (r.code === "invalid_union") {
                                r.unionErrors.map(processError);
                            } else if (r.code === "invalid_return_type") {
                                processError(r.returnTypeError);
                            } else if (r.code === "invalid_arguments") {
                                processError(r.argumentsError);
                            } else if (r.path.length === 0) {
                                s._errors.push(t(r));
                            } else {
                                let e = s;
                                let a = 0;
                                while(a < r.path.length){
                                    const s = r.path[a];
                                    const n = a === r.path.length - 1;
                                    if (!n) {
                                        e[s] = e[s] || {
                                            _errors: []
                                        };
                                    } else {
                                        e[s] = e[s] || {
                                            _errors: []
                                        };
                                        e[s]._errors.push(t(r));
                                    }
                                    e = e[s];
                                    a++;
                                }
                            }
                        }
                    };
                    processError(this);
                    return s;
                }
                static assert(e) {
                    if (!(e instanceof ZodError)) {
                        throw new Error(`Not a ZodError: ${e}`);
                    }
                }
                toString() {
                    return this.message;
                }
                get message() {
                    return JSON.stringify(this.issues, r.util.jsonStringifyReplacer, 2);
                }
                get isEmpty() {
                    return this.issues.length === 0;
                }
                flatten(e = (e)=>e.message) {
                    const t = {};
                    const s = [];
                    for (const r of this.issues){
                        if (r.path.length > 0) {
                            const s = r.path[0];
                            t[s] = t[s] || [];
                            t[s].push(e(r));
                        } else {
                            s.push(e(r));
                        }
                    }
                    return {
                        formErrors: s,
                        fieldErrors: t
                    };
                }
                get formErrors() {
                    return this.flatten();
                }
            }
            t.ZodError = ZodError;
            ZodError.create = (e)=>{
                const t = new ZodError(e);
                return t;
            };
        },
        61: function(e, t, s) {
            var r = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.defaultErrorMap = void 0;
            t.setErrorMap = setErrorMap;
            t.getErrorMap = getErrorMap;
            const a = r(s(871));
            t.defaultErrorMap = a.default;
            let n = a.default;
            function setErrorMap(e) {
                n = e;
            }
            function getErrorMap() {
                return n;
            }
        },
        923: function(e, t, s) {
            var r = this && this.__createBinding || (Object.create ? function(e, t, s, r) {
                if (r === undefined) r = s;
                var a = Object.getOwnPropertyDescriptor(t, s);
                if (!a || ("get" in a ? !t.__esModule : a.writable || a.configurable)) {
                    a = {
                        enumerable: true,
                        get: function() {
                            return t[s];
                        }
                    };
                }
                Object.defineProperty(e, r, a);
            } : function(e, t, s, r) {
                if (r === undefined) r = s;
                e[r] = t[s];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var s in e)if (s !== "default" && !Object.prototype.hasOwnProperty.call(t, s)) r(t, e, s);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(s(61), t);
            a(s(818), t);
            a(s(515), t);
            a(s(709), t);
            a(s(155), t);
            a(s(348), t);
        },
        538: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.errorUtil = void 0;
            var s;
            (function(e) {
                e.errToObj = (e)=>typeof e === "string" ? {
                        message: e
                    } : e || {};
                e.toString = (e)=>typeof e === "string" ? e : e?.message;
            })(s || (t.errorUtil = s = {}));
        },
        818: function(e, t, s) {
            var r = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.isAsync = t.isValid = t.isDirty = t.isAborted = t.OK = t.DIRTY = t.INVALID = t.ParseStatus = t.EMPTY_PATH = t.makeIssue = void 0;
            t.addIssueToContext = addIssueToContext;
            const a = s(61);
            const n = r(s(871));
            const makeIssue = (e)=>{
                const { data: t, path: s, errorMaps: r, issueData: a } = e;
                const n = [
                    ...s,
                    ...a.path || []
                ];
                const i = {
                    ...a,
                    path: n
                };
                if (a.message !== undefined) {
                    return {
                        ...a,
                        path: n,
                        message: a.message
                    };
                }
                let o = "";
                const d = r.filter((e)=>!!e).slice().reverse();
                for (const e of d){
                    o = e(i, {
                        data: t,
                        defaultError: o
                    }).message;
                }
                return {
                    ...a,
                    path: n,
                    message: o
                };
            };
            t.makeIssue = makeIssue;
            t.EMPTY_PATH = [];
            function addIssueToContext(e, s) {
                const r = (0, a.getErrorMap)();
                const i = (0, t.makeIssue)({
                    issueData: s,
                    data: e.data,
                    path: e.path,
                    errorMaps: [
                        e.common.contextualErrorMap,
                        e.schemaErrorMap,
                        r,
                        r === n.default ? undefined : n.default
                    ].filter((e)=>!!e)
                });
                e.common.issues.push(i);
            }
            class ParseStatus {
                constructor(){
                    this.value = "valid";
                }
                dirty() {
                    if (this.value === "valid") this.value = "dirty";
                }
                abort() {
                    if (this.value !== "aborted") this.value = "aborted";
                }
                static mergeArray(e, s) {
                    const r = [];
                    for (const a of s){
                        if (a.status === "aborted") return t.INVALID;
                        if (a.status === "dirty") e.dirty();
                        r.push(a.value);
                    }
                    return {
                        status: e.value,
                        value: r
                    };
                }
                static async mergeObjectAsync(e, t) {
                    const s = [];
                    for (const e of t){
                        const t = await e.key;
                        const r = await e.value;
                        s.push({
                            key: t,
                            value: r
                        });
                    }
                    return ParseStatus.mergeObjectSync(e, s);
                }
                static mergeObjectSync(e, s) {
                    const r = {};
                    for (const a of s){
                        const { key: s, value: n } = a;
                        if (s.status === "aborted") return t.INVALID;
                        if (n.status === "aborted") return t.INVALID;
                        if (s.status === "dirty") e.dirty();
                        if (n.status === "dirty") e.dirty();
                        if (s.value !== "__proto__" && (typeof n.value !== "undefined" || a.alwaysSet)) {
                            r[s.value] = n.value;
                        }
                    }
                    return {
                        status: e.value,
                        value: r
                    };
                }
            }
            t.ParseStatus = ParseStatus;
            t.INVALID = Object.freeze({
                status: "aborted"
            });
            const DIRTY = (e)=>({
                    status: "dirty",
                    value: e
                });
            t.DIRTY = DIRTY;
            const OK = (e)=>({
                    status: "valid",
                    value: e
                });
            t.OK = OK;
            const isAborted = (e)=>e.status === "aborted";
            t.isAborted = isAborted;
            const isDirty = (e)=>e.status === "dirty";
            t.isDirty = isDirty;
            const isValid = (e)=>e.status === "valid";
            t.isValid = isValid;
            const isAsync = (e)=>typeof Promise !== "undefined" && e instanceof Promise;
            t.isAsync = isAsync;
        },
        515: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
        },
        709: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.getParsedType = t.ZodParsedType = t.objectUtil = t.util = void 0;
            var s;
            (function(e) {
                e.assertEqual = (e)=>{};
                function assertIs(e) {}
                e.assertIs = assertIs;
                function assertNever(e) {
                    throw new Error;
                }
                e.assertNever = assertNever;
                e.arrayToEnum = (e)=>{
                    const t = {};
                    for (const s of e){
                        t[s] = s;
                    }
                    return t;
                };
                e.getValidEnumValues = (t)=>{
                    const s = e.objectKeys(t).filter((e)=>typeof t[t[e]] !== "number");
                    const r = {};
                    for (const e of s){
                        r[e] = t[e];
                    }
                    return e.objectValues(r);
                };
                e.objectValues = (t)=>e.objectKeys(t).map(function(e) {
                        return t[e];
                    });
                e.objectKeys = typeof Object.keys === "function" ? (e)=>Object.keys(e) : (e)=>{
                    const t = [];
                    for(const s in e){
                        if (Object.prototype.hasOwnProperty.call(e, s)) {
                            t.push(s);
                        }
                    }
                    return t;
                };
                e.find = (e, t)=>{
                    for (const s of e){
                        if (t(s)) return s;
                    }
                    return undefined;
                };
                e.isInteger = typeof Number.isInteger === "function" ? (e)=>Number.isInteger(e) : (e)=>typeof e === "number" && Number.isFinite(e) && Math.floor(e) === e;
                function joinValues(e, t = " | ") {
                    return e.map((e)=>typeof e === "string" ? `'${e}'` : e).join(t);
                }
                e.joinValues = joinValues;
                e.jsonStringifyReplacer = (e, t)=>{
                    if (typeof t === "bigint") {
                        return t.toString();
                    }
                    return t;
                };
            })(s || (t.util = s = {}));
            var r;
            (function(e) {
                e.mergeShapes = (e, t)=>({
                        ...e,
                        ...t
                    });
            })(r || (t.objectUtil = r = {}));
            t.ZodParsedType = s.arrayToEnum([
                "string",
                "nan",
                "number",
                "integer",
                "float",
                "boolean",
                "date",
                "bigint",
                "symbol",
                "function",
                "undefined",
                "null",
                "array",
                "object",
                "unknown",
                "promise",
                "void",
                "never",
                "map",
                "set"
            ]);
            const getParsedType = (e)=>{
                const s = typeof e;
                switch(s){
                    case "undefined":
                        return t.ZodParsedType.undefined;
                    case "string":
                        return t.ZodParsedType.string;
                    case "number":
                        return Number.isNaN(e) ? t.ZodParsedType.nan : t.ZodParsedType.number;
                    case "boolean":
                        return t.ZodParsedType.boolean;
                    case "function":
                        return t.ZodParsedType.function;
                    case "bigint":
                        return t.ZodParsedType.bigint;
                    case "symbol":
                        return t.ZodParsedType.symbol;
                    case "object":
                        if (Array.isArray(e)) {
                            return t.ZodParsedType.array;
                        }
                        if (e === null) {
                            return t.ZodParsedType.null;
                        }
                        if (e.then && typeof e.then === "function" && e.catch && typeof e.catch === "function") {
                            return t.ZodParsedType.promise;
                        }
                        if (typeof Map !== "undefined" && e instanceof Map) {
                            return t.ZodParsedType.map;
                        }
                        if (typeof Set !== "undefined" && e instanceof Set) {
                            return t.ZodParsedType.set;
                        }
                        if (typeof Date !== "undefined" && e instanceof Date) {
                            return t.ZodParsedType.date;
                        }
                        return t.ZodParsedType.object;
                    default:
                        return t.ZodParsedType.unknown;
                }
            };
            t.getParsedType = getParsedType;
        },
        871: (e, t, s)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            const r = s(348);
            const a = s(709);
            const errorMap = (e, t)=>{
                let s;
                switch(e.code){
                    case r.ZodIssueCode.invalid_type:
                        if (e.received === a.ZodParsedType.undefined) {
                            s = "Required";
                        } else {
                            s = `Expected ${e.expected}, received ${e.received}`;
                        }
                        break;
                    case r.ZodIssueCode.invalid_literal:
                        s = `Invalid literal value, expected ${JSON.stringify(e.expected, a.util.jsonStringifyReplacer)}`;
                        break;
                    case r.ZodIssueCode.unrecognized_keys:
                        s = `Unrecognized key(s) in object: ${a.util.joinValues(e.keys, ", ")}`;
                        break;
                    case r.ZodIssueCode.invalid_union:
                        s = `Invalid input`;
                        break;
                    case r.ZodIssueCode.invalid_union_discriminator:
                        s = `Invalid discriminator value. Expected ${a.util.joinValues(e.options)}`;
                        break;
                    case r.ZodIssueCode.invalid_enum_value:
                        s = `Invalid enum value. Expected ${a.util.joinValues(e.options)}, received '${e.received}'`;
                        break;
                    case r.ZodIssueCode.invalid_arguments:
                        s = `Invalid function arguments`;
                        break;
                    case r.ZodIssueCode.invalid_return_type:
                        s = `Invalid function return type`;
                        break;
                    case r.ZodIssueCode.invalid_date:
                        s = `Invalid date`;
                        break;
                    case r.ZodIssueCode.invalid_string:
                        if (typeof e.validation === "object") {
                            if ("includes" in e.validation) {
                                s = `Invalid input: must include "${e.validation.includes}"`;
                                if (typeof e.validation.position === "number") {
                                    s = `${s} at one or more positions greater than or equal to ${e.validation.position}`;
                                }
                            } else if ("startsWith" in e.validation) {
                                s = `Invalid input: must start with "${e.validation.startsWith}"`;
                            } else if ("endsWith" in e.validation) {
                                s = `Invalid input: must end with "${e.validation.endsWith}"`;
                            } else {
                                a.util.assertNever(e.validation);
                            }
                        } else if (e.validation !== "regex") {
                            s = `Invalid ${e.validation}`;
                        } else {
                            s = "Invalid";
                        }
                        break;
                    case r.ZodIssueCode.too_small:
                        if (e.type === "array") s = `Array must contain ${e.exact ? "exactly" : e.inclusive ? `at least` : `more than`} ${e.minimum} element(s)`;
                        else if (e.type === "string") s = `String must contain ${e.exact ? "exactly" : e.inclusive ? `at least` : `over`} ${e.minimum} character(s)`;
                        else if (e.type === "number") s = `Number must be ${e.exact ? `exactly equal to ` : e.inclusive ? `greater than or equal to ` : `greater than `}${e.minimum}`;
                        else if (e.type === "bigint") s = `Number must be ${e.exact ? `exactly equal to ` : e.inclusive ? `greater than or equal to ` : `greater than `}${e.minimum}`;
                        else if (e.type === "date") s = `Date must be ${e.exact ? `exactly equal to ` : e.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(e.minimum))}`;
                        else s = "Invalid input";
                        break;
                    case r.ZodIssueCode.too_big:
                        if (e.type === "array") s = `Array must contain ${e.exact ? `exactly` : e.inclusive ? `at most` : `less than`} ${e.maximum} element(s)`;
                        else if (e.type === "string") s = `String must contain ${e.exact ? `exactly` : e.inclusive ? `at most` : `under`} ${e.maximum} character(s)`;
                        else if (e.type === "number") s = `Number must be ${e.exact ? `exactly` : e.inclusive ? `less than or equal to` : `less than`} ${e.maximum}`;
                        else if (e.type === "bigint") s = `BigInt must be ${e.exact ? `exactly` : e.inclusive ? `less than or equal to` : `less than`} ${e.maximum}`;
                        else if (e.type === "date") s = `Date must be ${e.exact ? `exactly` : e.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(e.maximum))}`;
                        else s = "Invalid input";
                        break;
                    case r.ZodIssueCode.custom:
                        s = `Invalid input`;
                        break;
                    case r.ZodIssueCode.invalid_intersection_types:
                        s = `Intersection results could not be merged`;
                        break;
                    case r.ZodIssueCode.not_multiple_of:
                        s = `Number must be a multiple of ${e.multipleOf}`;
                        break;
                    case r.ZodIssueCode.not_finite:
                        s = "Number must be finite";
                        break;
                    default:
                        s = t.defaultError;
                        a.util.assertNever(e);
                }
                return {
                    message: s
                };
            };
            t["default"] = errorMap;
        },
        155: (e, t, s)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.discriminatedUnion = t.date = t.boolean = t.bigint = t.array = t.any = t.coerce = t.ZodFirstPartyTypeKind = t.late = t.ZodSchema = t.Schema = t.ZodReadonly = t.ZodPipeline = t.ZodBranded = t.BRAND = t.ZodNaN = t.ZodCatch = t.ZodDefault = t.ZodNullable = t.ZodOptional = t.ZodTransformer = t.ZodEffects = t.ZodPromise = t.ZodNativeEnum = t.ZodEnum = t.ZodLiteral = t.ZodLazy = t.ZodFunction = t.ZodSet = t.ZodMap = t.ZodRecord = t.ZodTuple = t.ZodIntersection = t.ZodDiscriminatedUnion = t.ZodUnion = t.ZodObject = t.ZodArray = t.ZodVoid = t.ZodNever = t.ZodUnknown = t.ZodAny = t.ZodNull = t.ZodUndefined = t.ZodSymbol = t.ZodDate = t.ZodBoolean = t.ZodBigInt = t.ZodNumber = t.ZodString = t.ZodType = void 0;
            t.NEVER = t["void"] = t.unknown = t.union = t.undefined = t.tuple = t.transformer = t.symbol = t.string = t.strictObject = t.set = t.record = t.promise = t.preprocess = t.pipeline = t.ostring = t.optional = t.onumber = t.oboolean = t.object = t.number = t.nullable = t["null"] = t.never = t.nativeEnum = t.nan = t.map = t.literal = t.lazy = t.intersection = t["instanceof"] = t["function"] = t["enum"] = t.effect = void 0;
            t.datetimeRegex = datetimeRegex;
            t.custom = custom;
            const r = s(348);
            const a = s(61);
            const n = s(538);
            const i = s(818);
            const o = s(709);
            class ParseInputLazyPath {
                constructor(e, t, s, r){
                    this._cachedPath = [];
                    this.parent = e;
                    this.data = t;
                    this._path = s;
                    this._key = r;
                }
                get path() {
                    if (!this._cachedPath.length) {
                        if (Array.isArray(this._key)) {
                            this._cachedPath.push(...this._path, ...this._key);
                        } else {
                            this._cachedPath.push(...this._path, this._key);
                        }
                    }
                    return this._cachedPath;
                }
            }
            const handleResult = (e, t)=>{
                if ((0, i.isValid)(t)) {
                    return {
                        success: true,
                        data: t.value
                    };
                } else {
                    if (!e.common.issues.length) {
                        throw new Error("Validation failed but no issues detected.");
                    }
                    return {
                        success: false,
                        get error () {
                            if (this._error) return this._error;
                            const t = new r.ZodError(e.common.issues);
                            this._error = t;
                            return this._error;
                        }
                    };
                }
            };
            function processCreateParams(e) {
                if (!e) return {};
                const { errorMap: t, invalid_type_error: s, required_error: r, description: a } = e;
                if (t && (s || r)) {
                    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
                }
                if (t) return {
                    errorMap: t,
                    description: a
                };
                const customMap = (t, a)=>{
                    const { message: n } = e;
                    if (t.code === "invalid_enum_value") {
                        return {
                            message: n ?? a.defaultError
                        };
                    }
                    if (typeof a.data === "undefined") {
                        return {
                            message: n ?? r ?? a.defaultError
                        };
                    }
                    if (t.code !== "invalid_type") return {
                        message: a.defaultError
                    };
                    return {
                        message: n ?? s ?? a.defaultError
                    };
                };
                return {
                    errorMap: customMap,
                    description: a
                };
            }
            class ZodType {
                get description() {
                    return this._def.description;
                }
                _getType(e) {
                    return (0, o.getParsedType)(e.data);
                }
                _getOrReturnCtx(e, t) {
                    return t || {
                        common: e.parent.common,
                        data: e.data,
                        parsedType: (0, o.getParsedType)(e.data),
                        schemaErrorMap: this._def.errorMap,
                        path: e.path,
                        parent: e.parent
                    };
                }
                _processInputParams(e) {
                    return {
                        status: new i.ParseStatus,
                        ctx: {
                            common: e.parent.common,
                            data: e.data,
                            parsedType: (0, o.getParsedType)(e.data),
                            schemaErrorMap: this._def.errorMap,
                            path: e.path,
                            parent: e.parent
                        }
                    };
                }
                _parseSync(e) {
                    const t = this._parse(e);
                    if ((0, i.isAsync)(t)) {
                        throw new Error("Synchronous parse encountered promise.");
                    }
                    return t;
                }
                _parseAsync(e) {
                    const t = this._parse(e);
                    return Promise.resolve(t);
                }
                parse(e, t) {
                    const s = this.safeParse(e, t);
                    if (s.success) return s.data;
                    throw s.error;
                }
                safeParse(e, t) {
                    const s = {
                        common: {
                            issues: [],
                            async: t?.async ?? false,
                            contextualErrorMap: t?.errorMap
                        },
                        path: t?.path || [],
                        schemaErrorMap: this._def.errorMap,
                        parent: null,
                        data: e,
                        parsedType: (0, o.getParsedType)(e)
                    };
                    const r = this._parseSync({
                        data: e,
                        path: s.path,
                        parent: s
                    });
                    return handleResult(s, r);
                }
                "~validate"(e) {
                    const t = {
                        common: {
                            issues: [],
                            async: !!this["~standard"].async
                        },
                        path: [],
                        schemaErrorMap: this._def.errorMap,
                        parent: null,
                        data: e,
                        parsedType: (0, o.getParsedType)(e)
                    };
                    if (!this["~standard"].async) {
                        try {
                            const s = this._parseSync({
                                data: e,
                                path: [],
                                parent: t
                            });
                            return (0, i.isValid)(s) ? {
                                value: s.value
                            } : {
                                issues: t.common.issues
                            };
                        } catch (e) {
                            if (e?.message?.toLowerCase()?.includes("encountered")) {
                                this["~standard"].async = true;
                            }
                            t.common = {
                                issues: [],
                                async: true
                            };
                        }
                    }
                    return this._parseAsync({
                        data: e,
                        path: [],
                        parent: t
                    }).then((e)=>(0, i.isValid)(e) ? {
                            value: e.value
                        } : {
                            issues: t.common.issues
                        });
                }
                async parseAsync(e, t) {
                    const s = await this.safeParseAsync(e, t);
                    if (s.success) return s.data;
                    throw s.error;
                }
                async safeParseAsync(e, t) {
                    const s = {
                        common: {
                            issues: [],
                            contextualErrorMap: t?.errorMap,
                            async: true
                        },
                        path: t?.path || [],
                        schemaErrorMap: this._def.errorMap,
                        parent: null,
                        data: e,
                        parsedType: (0, o.getParsedType)(e)
                    };
                    const r = this._parse({
                        data: e,
                        path: s.path,
                        parent: s
                    });
                    const a = await ((0, i.isAsync)(r) ? r : Promise.resolve(r));
                    return handleResult(s, a);
                }
                refine(e, t) {
                    const getIssueProperties = (e)=>{
                        if (typeof t === "string" || typeof t === "undefined") {
                            return {
                                message: t
                            };
                        } else if (typeof t === "function") {
                            return t(e);
                        } else {
                            return t;
                        }
                    };
                    return this._refinement((t, s)=>{
                        const a = e(t);
                        const setError = ()=>s.addIssue({
                                code: r.ZodIssueCode.custom,
                                ...getIssueProperties(t)
                            });
                        if (typeof Promise !== "undefined" && a instanceof Promise) {
                            return a.then((e)=>{
                                if (!e) {
                                    setError();
                                    return false;
                                } else {
                                    return true;
                                }
                            });
                        }
                        if (!a) {
                            setError();
                            return false;
                        } else {
                            return true;
                        }
                    });
                }
                refinement(e, t) {
                    return this._refinement((s, r)=>{
                        if (!e(s)) {
                            r.addIssue(typeof t === "function" ? t(s, r) : t);
                            return false;
                        } else {
                            return true;
                        }
                    });
                }
                _refinement(e) {
                    return new ZodEffects({
                        schema: this,
                        typeName: k.ZodEffects,
                        effect: {
                            type: "refinement",
                            refinement: e
                        }
                    });
                }
                superRefine(e) {
                    return this._refinement(e);
                }
                constructor(e){
                    this.spa = this.safeParseAsync;
                    this._def = e;
                    this.parse = this.parse.bind(this);
                    this.safeParse = this.safeParse.bind(this);
                    this.parseAsync = this.parseAsync.bind(this);
                    this.safeParseAsync = this.safeParseAsync.bind(this);
                    this.spa = this.spa.bind(this);
                    this.refine = this.refine.bind(this);
                    this.refinement = this.refinement.bind(this);
                    this.superRefine = this.superRefine.bind(this);
                    this.optional = this.optional.bind(this);
                    this.nullable = this.nullable.bind(this);
                    this.nullish = this.nullish.bind(this);
                    this.array = this.array.bind(this);
                    this.promise = this.promise.bind(this);
                    this.or = this.or.bind(this);
                    this.and = this.and.bind(this);
                    this.transform = this.transform.bind(this);
                    this.brand = this.brand.bind(this);
                    this.default = this.default.bind(this);
                    this.catch = this.catch.bind(this);
                    this.describe = this.describe.bind(this);
                    this.pipe = this.pipe.bind(this);
                    this.readonly = this.readonly.bind(this);
                    this.isNullable = this.isNullable.bind(this);
                    this.isOptional = this.isOptional.bind(this);
                    this["~standard"] = {
                        version: 1,
                        vendor: "zod",
                        validate: (e)=>this["~validate"](e)
                    };
                }
                optional() {
                    return ZodOptional.create(this, this._def);
                }
                nullable() {
                    return ZodNullable.create(this, this._def);
                }
                nullish() {
                    return this.nullable().optional();
                }
                array() {
                    return ZodArray.create(this);
                }
                promise() {
                    return ZodPromise.create(this, this._def);
                }
                or(e) {
                    return ZodUnion.create([
                        this,
                        e
                    ], this._def);
                }
                and(e) {
                    return ZodIntersection.create(this, e, this._def);
                }
                transform(e) {
                    return new ZodEffects({
                        ...processCreateParams(this._def),
                        schema: this,
                        typeName: k.ZodEffects,
                        effect: {
                            type: "transform",
                            transform: e
                        }
                    });
                }
                default(e) {
                    const t = typeof e === "function" ? e : ()=>e;
                    return new ZodDefault({
                        ...processCreateParams(this._def),
                        innerType: this,
                        defaultValue: t,
                        typeName: k.ZodDefault
                    });
                }
                brand() {
                    return new ZodBranded({
                        typeName: k.ZodBranded,
                        type: this,
                        ...processCreateParams(this._def)
                    });
                }
                catch(e) {
                    const t = typeof e === "function" ? e : ()=>e;
                    return new ZodCatch({
                        ...processCreateParams(this._def),
                        innerType: this,
                        catchValue: t,
                        typeName: k.ZodCatch
                    });
                }
                describe(e) {
                    const t = this.constructor;
                    return new t({
                        ...this._def,
                        description: e
                    });
                }
                pipe(e) {
                    return ZodPipeline.create(this, e);
                }
                readonly() {
                    return ZodReadonly.create(this);
                }
                isOptional() {
                    return this.safeParse(undefined).success;
                }
                isNullable() {
                    return this.safeParse(null).success;
                }
            }
            t.ZodType = ZodType;
            t.Schema = ZodType;
            t.ZodSchema = ZodType;
            const d = /^c[^\s-]{8,}$/i;
            const u = /^[0-9a-z]+$/;
            const c = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
            const l = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
            const p = /^[a-z0-9_-]{21}$/i;
            const f = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
            const h = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
            const m = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
            const y = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
            let Z;
            const _ = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
            const g = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
            const v = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
            const I = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
            const T = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
            const b = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
            const x = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
            const C = new RegExp(`^${x}$`);
            function timeRegexSource(e) {
                let t = `[0-5]\\d`;
                if (e.precision) {
                    t = `${t}\\.\\d{${e.precision}}`;
                } else if (e.precision == null) {
                    t = `${t}(\\.\\d+)?`;
                }
                const s = e.precision ? "+" : "?";
                return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${s}`;
            }
            function timeRegex(e) {
                return new RegExp(`^${timeRegexSource(e)}$`);
            }
            function datetimeRegex(e) {
                let t = `${x}T${timeRegexSource(e)}`;
                const s = [];
                s.push(e.local ? `Z?` : `Z`);
                if (e.offset) s.push(`([+-]\\d{2}:?\\d{2})`);
                t = `${t}(${s.join("|")})`;
                return new RegExp(`^${t}$`);
            }
            function isValidIP(e, t) {
                if ((t === "v4" || !t) && _.test(e)) {
                    return true;
                }
                if ((t === "v6" || !t) && v.test(e)) {
                    return true;
                }
                return false;
            }
            function isValidJWT(e, t) {
                if (!f.test(e)) return false;
                try {
                    const [s] = e.split(".");
                    if (!s) return false;
                    const r = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(s.length + (4 - s.length % 4) % 4, "=");
                    const a = JSON.parse(atob(r));
                    if (typeof a !== "object" || a === null) return false;
                    if ("typ" in a && a?.typ !== "JWT") return false;
                    if (!a.alg) return false;
                    if (t && a.alg !== t) return false;
                    return true;
                } catch  {
                    return false;
                }
            }
            function isValidCidr(e, t) {
                if ((t === "v4" || !t) && g.test(e)) {
                    return true;
                }
                if ((t === "v6" || !t) && I.test(e)) {
                    return true;
                }
                return false;
            }
            class ZodString extends ZodType {
                _parse(e) {
                    if (this._def.coerce) {
                        e.data = String(e.data);
                    }
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.string) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.string,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    const s = new i.ParseStatus;
                    let a = undefined;
                    for (const t of this._def.checks){
                        if (t.kind === "min") {
                            if (e.data.length < t.value) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.too_small,
                                    minimum: t.value,
                                    type: "string",
                                    inclusive: true,
                                    exact: false,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "max") {
                            if (e.data.length > t.value) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.too_big,
                                    maximum: t.value,
                                    type: "string",
                                    inclusive: true,
                                    exact: false,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "length") {
                            const n = e.data.length > t.value;
                            const o = e.data.length < t.value;
                            if (n || o) {
                                a = this._getOrReturnCtx(e, a);
                                if (n) {
                                    (0, i.addIssueToContext)(a, {
                                        code: r.ZodIssueCode.too_big,
                                        maximum: t.value,
                                        type: "string",
                                        inclusive: true,
                                        exact: true,
                                        message: t.message
                                    });
                                } else if (o) {
                                    (0, i.addIssueToContext)(a, {
                                        code: r.ZodIssueCode.too_small,
                                        minimum: t.value,
                                        type: "string",
                                        inclusive: true,
                                        exact: true,
                                        message: t.message
                                    });
                                }
                                s.dirty();
                            }
                        } else if (t.kind === "email") {
                            if (!m.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "email",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "emoji") {
                            if (!Z) {
                                Z = new RegExp(y, "u");
                            }
                            if (!Z.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "emoji",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "uuid") {
                            if (!l.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "uuid",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "nanoid") {
                            if (!p.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "nanoid",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "cuid") {
                            if (!d.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "cuid",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "cuid2") {
                            if (!u.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "cuid2",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "ulid") {
                            if (!c.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "ulid",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "url") {
                            try {
                                new URL(e.data);
                            } catch  {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "url",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "regex") {
                            t.regex.lastIndex = 0;
                            const n = t.regex.test(e.data);
                            if (!n) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "regex",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "trim") {
                            e.data = e.data.trim();
                        } else if (t.kind === "includes") {
                            if (!e.data.includes(t.value, t.position)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.invalid_string,
                                    validation: {
                                        includes: t.value,
                                        position: t.position
                                    },
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "toLowerCase") {
                            e.data = e.data.toLowerCase();
                        } else if (t.kind === "toUpperCase") {
                            e.data = e.data.toUpperCase();
                        } else if (t.kind === "startsWith") {
                            if (!e.data.startsWith(t.value)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.invalid_string,
                                    validation: {
                                        startsWith: t.value
                                    },
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "endsWith") {
                            if (!e.data.endsWith(t.value)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.invalid_string,
                                    validation: {
                                        endsWith: t.value
                                    },
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "datetime") {
                            const n = datetimeRegex(t);
                            if (!n.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.invalid_string,
                                    validation: "datetime",
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "date") {
                            const n = C;
                            if (!n.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.invalid_string,
                                    validation: "date",
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "time") {
                            const n = timeRegex(t);
                            if (!n.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.invalid_string,
                                    validation: "time",
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "duration") {
                            if (!h.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "duration",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "ip") {
                            if (!isValidIP(e.data, t.version)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "ip",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "jwt") {
                            if (!isValidJWT(e.data, t.alg)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "jwt",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "cidr") {
                            if (!isValidCidr(e.data, t.version)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "cidr",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "base64") {
                            if (!T.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "base64",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "base64url") {
                            if (!b.test(e.data)) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    validation: "base64url",
                                    code: r.ZodIssueCode.invalid_string,
                                    message: t.message
                                });
                                s.dirty();
                            }
                        } else {
                            o.util.assertNever(t);
                        }
                    }
                    return {
                        status: s.value,
                        value: e.data
                    };
                }
                _regex(e, t, s) {
                    return this.refinement((t)=>e.test(t), {
                        validation: t,
                        code: r.ZodIssueCode.invalid_string,
                        ...n.errorUtil.errToObj(s)
                    });
                }
                _addCheck(e) {
                    return new ZodString({
                        ...this._def,
                        checks: [
                            ...this._def.checks,
                            e
                        ]
                    });
                }
                email(e) {
                    return this._addCheck({
                        kind: "email",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                url(e) {
                    return this._addCheck({
                        kind: "url",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                emoji(e) {
                    return this._addCheck({
                        kind: "emoji",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                uuid(e) {
                    return this._addCheck({
                        kind: "uuid",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                nanoid(e) {
                    return this._addCheck({
                        kind: "nanoid",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                cuid(e) {
                    return this._addCheck({
                        kind: "cuid",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                cuid2(e) {
                    return this._addCheck({
                        kind: "cuid2",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                ulid(e) {
                    return this._addCheck({
                        kind: "ulid",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                base64(e) {
                    return this._addCheck({
                        kind: "base64",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                base64url(e) {
                    return this._addCheck({
                        kind: "base64url",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                jwt(e) {
                    return this._addCheck({
                        kind: "jwt",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                ip(e) {
                    return this._addCheck({
                        kind: "ip",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                cidr(e) {
                    return this._addCheck({
                        kind: "cidr",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                datetime(e) {
                    if (typeof e === "string") {
                        return this._addCheck({
                            kind: "datetime",
                            precision: null,
                            offset: false,
                            local: false,
                            message: e
                        });
                    }
                    return this._addCheck({
                        kind: "datetime",
                        precision: typeof e?.precision === "undefined" ? null : e?.precision,
                        offset: e?.offset ?? false,
                        local: e?.local ?? false,
                        ...n.errorUtil.errToObj(e?.message)
                    });
                }
                date(e) {
                    return this._addCheck({
                        kind: "date",
                        message: e
                    });
                }
                time(e) {
                    if (typeof e === "string") {
                        return this._addCheck({
                            kind: "time",
                            precision: null,
                            message: e
                        });
                    }
                    return this._addCheck({
                        kind: "time",
                        precision: typeof e?.precision === "undefined" ? null : e?.precision,
                        ...n.errorUtil.errToObj(e?.message)
                    });
                }
                duration(e) {
                    return this._addCheck({
                        kind: "duration",
                        ...n.errorUtil.errToObj(e)
                    });
                }
                regex(e, t) {
                    return this._addCheck({
                        kind: "regex",
                        regex: e,
                        ...n.errorUtil.errToObj(t)
                    });
                }
                includes(e, t) {
                    return this._addCheck({
                        kind: "includes",
                        value: e,
                        position: t?.position,
                        ...n.errorUtil.errToObj(t?.message)
                    });
                }
                startsWith(e, t) {
                    return this._addCheck({
                        kind: "startsWith",
                        value: e,
                        ...n.errorUtil.errToObj(t)
                    });
                }
                endsWith(e, t) {
                    return this._addCheck({
                        kind: "endsWith",
                        value: e,
                        ...n.errorUtil.errToObj(t)
                    });
                }
                min(e, t) {
                    return this._addCheck({
                        kind: "min",
                        value: e,
                        ...n.errorUtil.errToObj(t)
                    });
                }
                max(e, t) {
                    return this._addCheck({
                        kind: "max",
                        value: e,
                        ...n.errorUtil.errToObj(t)
                    });
                }
                length(e, t) {
                    return this._addCheck({
                        kind: "length",
                        value: e,
                        ...n.errorUtil.errToObj(t)
                    });
                }
                nonempty(e) {
                    return this.min(1, n.errorUtil.errToObj(e));
                }
                trim() {
                    return new ZodString({
                        ...this._def,
                        checks: [
                            ...this._def.checks,
                            {
                                kind: "trim"
                            }
                        ]
                    });
                }
                toLowerCase() {
                    return new ZodString({
                        ...this._def,
                        checks: [
                            ...this._def.checks,
                            {
                                kind: "toLowerCase"
                            }
                        ]
                    });
                }
                toUpperCase() {
                    return new ZodString({
                        ...this._def,
                        checks: [
                            ...this._def.checks,
                            {
                                kind: "toUpperCase"
                            }
                        ]
                    });
                }
                get isDatetime() {
                    return !!this._def.checks.find((e)=>e.kind === "datetime");
                }
                get isDate() {
                    return !!this._def.checks.find((e)=>e.kind === "date");
                }
                get isTime() {
                    return !!this._def.checks.find((e)=>e.kind === "time");
                }
                get isDuration() {
                    return !!this._def.checks.find((e)=>e.kind === "duration");
                }
                get isEmail() {
                    return !!this._def.checks.find((e)=>e.kind === "email");
                }
                get isURL() {
                    return !!this._def.checks.find((e)=>e.kind === "url");
                }
                get isEmoji() {
                    return !!this._def.checks.find((e)=>e.kind === "emoji");
                }
                get isUUID() {
                    return !!this._def.checks.find((e)=>e.kind === "uuid");
                }
                get isNANOID() {
                    return !!this._def.checks.find((e)=>e.kind === "nanoid");
                }
                get isCUID() {
                    return !!this._def.checks.find((e)=>e.kind === "cuid");
                }
                get isCUID2() {
                    return !!this._def.checks.find((e)=>e.kind === "cuid2");
                }
                get isULID() {
                    return !!this._def.checks.find((e)=>e.kind === "ulid");
                }
                get isIP() {
                    return !!this._def.checks.find((e)=>e.kind === "ip");
                }
                get isCIDR() {
                    return !!this._def.checks.find((e)=>e.kind === "cidr");
                }
                get isBase64() {
                    return !!this._def.checks.find((e)=>e.kind === "base64");
                }
                get isBase64url() {
                    return !!this._def.checks.find((e)=>e.kind === "base64url");
                }
                get minLength() {
                    let e = null;
                    for (const t of this._def.checks){
                        if (t.kind === "min") {
                            if (e === null || t.value > e) e = t.value;
                        }
                    }
                    return e;
                }
                get maxLength() {
                    let e = null;
                    for (const t of this._def.checks){
                        if (t.kind === "max") {
                            if (e === null || t.value < e) e = t.value;
                        }
                    }
                    return e;
                }
            }
            t.ZodString = ZodString;
            ZodString.create = (e)=>new ZodString({
                    checks: [],
                    typeName: k.ZodString,
                    coerce: e?.coerce ?? false,
                    ...processCreateParams(e)
                });
            function floatSafeRemainder(e, t) {
                const s = (e.toString().split(".")[1] || "").length;
                const r = (t.toString().split(".")[1] || "").length;
                const a = s > r ? s : r;
                const n = Number.parseInt(e.toFixed(a).replace(".", ""));
                const i = Number.parseInt(t.toFixed(a).replace(".", ""));
                return n % i / 10 ** a;
            }
            class ZodNumber extends ZodType {
                constructor(){
                    super(...arguments);
                    this.min = this.gte;
                    this.max = this.lte;
                    this.step = this.multipleOf;
                }
                _parse(e) {
                    if (this._def.coerce) {
                        e.data = Number(e.data);
                    }
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.number) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.number,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    let s = undefined;
                    const a = new i.ParseStatus;
                    for (const t of this._def.checks){
                        if (t.kind === "int") {
                            if (!o.util.isInteger(e.data)) {
                                s = this._getOrReturnCtx(e, s);
                                (0, i.addIssueToContext)(s, {
                                    code: r.ZodIssueCode.invalid_type,
                                    expected: "integer",
                                    received: "float",
                                    message: t.message
                                });
                                a.dirty();
                            }
                        } else if (t.kind === "min") {
                            const n = t.inclusive ? e.data < t.value : e.data <= t.value;
                            if (n) {
                                s = this._getOrReturnCtx(e, s);
                                (0, i.addIssueToContext)(s, {
                                    code: r.ZodIssueCode.too_small,
                                    minimum: t.value,
                                    type: "number",
                                    inclusive: t.inclusive,
                                    exact: false,
                                    message: t.message
                                });
                                a.dirty();
                            }
                        } else if (t.kind === "max") {
                            const n = t.inclusive ? e.data > t.value : e.data >= t.value;
                            if (n) {
                                s = this._getOrReturnCtx(e, s);
                                (0, i.addIssueToContext)(s, {
                                    code: r.ZodIssueCode.too_big,
                                    maximum: t.value,
                                    type: "number",
                                    inclusive: t.inclusive,
                                    exact: false,
                                    message: t.message
                                });
                                a.dirty();
                            }
                        } else if (t.kind === "multipleOf") {
                            if (floatSafeRemainder(e.data, t.value) !== 0) {
                                s = this._getOrReturnCtx(e, s);
                                (0, i.addIssueToContext)(s, {
                                    code: r.ZodIssueCode.not_multiple_of,
                                    multipleOf: t.value,
                                    message: t.message
                                });
                                a.dirty();
                            }
                        } else if (t.kind === "finite") {
                            if (!Number.isFinite(e.data)) {
                                s = this._getOrReturnCtx(e, s);
                                (0, i.addIssueToContext)(s, {
                                    code: r.ZodIssueCode.not_finite,
                                    message: t.message
                                });
                                a.dirty();
                            }
                        } else {
                            o.util.assertNever(t);
                        }
                    }
                    return {
                        status: a.value,
                        value: e.data
                    };
                }
                gte(e, t) {
                    return this.setLimit("min", e, true, n.errorUtil.toString(t));
                }
                gt(e, t) {
                    return this.setLimit("min", e, false, n.errorUtil.toString(t));
                }
                lte(e, t) {
                    return this.setLimit("max", e, true, n.errorUtil.toString(t));
                }
                lt(e, t) {
                    return this.setLimit("max", e, false, n.errorUtil.toString(t));
                }
                setLimit(e, t, s, r) {
                    return new ZodNumber({
                        ...this._def,
                        checks: [
                            ...this._def.checks,
                            {
                                kind: e,
                                value: t,
                                inclusive: s,
                                message: n.errorUtil.toString(r)
                            }
                        ]
                    });
                }
                _addCheck(e) {
                    return new ZodNumber({
                        ...this._def,
                        checks: [
                            ...this._def.checks,
                            e
                        ]
                    });
                }
                int(e) {
                    return this._addCheck({
                        kind: "int",
                        message: n.errorUtil.toString(e)
                    });
                }
                positive(e) {
                    return this._addCheck({
                        kind: "min",
                        value: 0,
                        inclusive: false,
                        message: n.errorUtil.toString(e)
                    });
                }
                negative(e) {
                    return this._addCheck({
                        kind: "max",
                        value: 0,
                        inclusive: false,
                        message: n.errorUtil.toString(e)
                    });
                }
                nonpositive(e) {
                    return this._addCheck({
                        kind: "max",
                        value: 0,
                        inclusive: true,
                        message: n.errorUtil.toString(e)
                    });
                }
                nonnegative(e) {
                    return this._addCheck({
                        kind: "min",
                        value: 0,
                        inclusive: true,
                        message: n.errorUtil.toString(e)
                    });
                }
                multipleOf(e, t) {
                    return this._addCheck({
                        kind: "multipleOf",
                        value: e,
                        message: n.errorUtil.toString(t)
                    });
                }
                finite(e) {
                    return this._addCheck({
                        kind: "finite",
                        message: n.errorUtil.toString(e)
                    });
                }
                safe(e) {
                    return this._addCheck({
                        kind: "min",
                        inclusive: true,
                        value: Number.MIN_SAFE_INTEGER,
                        message: n.errorUtil.toString(e)
                    })._addCheck({
                        kind: "max",
                        inclusive: true,
                        value: Number.MAX_SAFE_INTEGER,
                        message: n.errorUtil.toString(e)
                    });
                }
                get minValue() {
                    let e = null;
                    for (const t of this._def.checks){
                        if (t.kind === "min") {
                            if (e === null || t.value > e) e = t.value;
                        }
                    }
                    return e;
                }
                get maxValue() {
                    let e = null;
                    for (const t of this._def.checks){
                        if (t.kind === "max") {
                            if (e === null || t.value < e) e = t.value;
                        }
                    }
                    return e;
                }
                get isInt() {
                    return !!this._def.checks.find((e)=>e.kind === "int" || e.kind === "multipleOf" && o.util.isInteger(e.value));
                }
                get isFinite() {
                    let e = null;
                    let t = null;
                    for (const s of this._def.checks){
                        if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf") {
                            return true;
                        } else if (s.kind === "min") {
                            if (t === null || s.value > t) t = s.value;
                        } else if (s.kind === "max") {
                            if (e === null || s.value < e) e = s.value;
                        }
                    }
                    return Number.isFinite(t) && Number.isFinite(e);
                }
            }
            t.ZodNumber = ZodNumber;
            ZodNumber.create = (e)=>new ZodNumber({
                    checks: [],
                    typeName: k.ZodNumber,
                    coerce: e?.coerce || false,
                    ...processCreateParams(e)
                });
            class ZodBigInt extends ZodType {
                constructor(){
                    super(...arguments);
                    this.min = this.gte;
                    this.max = this.lte;
                }
                _parse(e) {
                    if (this._def.coerce) {
                        try {
                            e.data = BigInt(e.data);
                        } catch  {
                            return this._getInvalidInput(e);
                        }
                    }
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.bigint) {
                        return this._getInvalidInput(e);
                    }
                    let s = undefined;
                    const a = new i.ParseStatus;
                    for (const t of this._def.checks){
                        if (t.kind === "min") {
                            const n = t.inclusive ? e.data < t.value : e.data <= t.value;
                            if (n) {
                                s = this._getOrReturnCtx(e, s);
                                (0, i.addIssueToContext)(s, {
                                    code: r.ZodIssueCode.too_small,
                                    type: "bigint",
                                    minimum: t.value,
                                    inclusive: t.inclusive,
                                    message: t.message
                                });
                                a.dirty();
                            }
                        } else if (t.kind === "max") {
                            const n = t.inclusive ? e.data > t.value : e.data >= t.value;
                            if (n) {
                                s = this._getOrReturnCtx(e, s);
                                (0, i.addIssueToContext)(s, {
                                    code: r.ZodIssueCode.too_big,
                                    type: "bigint",
                                    maximum: t.value,
                                    inclusive: t.inclusive,
                                    message: t.message
                                });
                                a.dirty();
                            }
                        } else if (t.kind === "multipleOf") {
                            if (e.data % t.value !== BigInt(0)) {
                                s = this._getOrReturnCtx(e, s);
                                (0, i.addIssueToContext)(s, {
                                    code: r.ZodIssueCode.not_multiple_of,
                                    multipleOf: t.value,
                                    message: t.message
                                });
                                a.dirty();
                            }
                        } else {
                            o.util.assertNever(t);
                        }
                    }
                    return {
                        status: a.value,
                        value: e.data
                    };
                }
                _getInvalidInput(e) {
                    const t = this._getOrReturnCtx(e);
                    (0, i.addIssueToContext)(t, {
                        code: r.ZodIssueCode.invalid_type,
                        expected: o.ZodParsedType.bigint,
                        received: t.parsedType
                    });
                    return i.INVALID;
                }
                gte(e, t) {
                    return this.setLimit("min", e, true, n.errorUtil.toString(t));
                }
                gt(e, t) {
                    return this.setLimit("min", e, false, n.errorUtil.toString(t));
                }
                lte(e, t) {
                    return this.setLimit("max", e, true, n.errorUtil.toString(t));
                }
                lt(e, t) {
                    return this.setLimit("max", e, false, n.errorUtil.toString(t));
                }
                setLimit(e, t, s, r) {
                    return new ZodBigInt({
                        ...this._def,
                        checks: [
                            ...this._def.checks,
                            {
                                kind: e,
                                value: t,
                                inclusive: s,
                                message: n.errorUtil.toString(r)
                            }
                        ]
                    });
                }
                _addCheck(e) {
                    return new ZodBigInt({
                        ...this._def,
                        checks: [
                            ...this._def.checks,
                            e
                        ]
                    });
                }
                positive(e) {
                    return this._addCheck({
                        kind: "min",
                        value: BigInt(0),
                        inclusive: false,
                        message: n.errorUtil.toString(e)
                    });
                }
                negative(e) {
                    return this._addCheck({
                        kind: "max",
                        value: BigInt(0),
                        inclusive: false,
                        message: n.errorUtil.toString(e)
                    });
                }
                nonpositive(e) {
                    return this._addCheck({
                        kind: "max",
                        value: BigInt(0),
                        inclusive: true,
                        message: n.errorUtil.toString(e)
                    });
                }
                nonnegative(e) {
                    return this._addCheck({
                        kind: "min",
                        value: BigInt(0),
                        inclusive: true,
                        message: n.errorUtil.toString(e)
                    });
                }
                multipleOf(e, t) {
                    return this._addCheck({
                        kind: "multipleOf",
                        value: e,
                        message: n.errorUtil.toString(t)
                    });
                }
                get minValue() {
                    let e = null;
                    for (const t of this._def.checks){
                        if (t.kind === "min") {
                            if (e === null || t.value > e) e = t.value;
                        }
                    }
                    return e;
                }
                get maxValue() {
                    let e = null;
                    for (const t of this._def.checks){
                        if (t.kind === "max") {
                            if (e === null || t.value < e) e = t.value;
                        }
                    }
                    return e;
                }
            }
            t.ZodBigInt = ZodBigInt;
            ZodBigInt.create = (e)=>new ZodBigInt({
                    checks: [],
                    typeName: k.ZodBigInt,
                    coerce: e?.coerce ?? false,
                    ...processCreateParams(e)
                });
            class ZodBoolean extends ZodType {
                _parse(e) {
                    if (this._def.coerce) {
                        e.data = Boolean(e.data);
                    }
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.boolean) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.boolean,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    return (0, i.OK)(e.data);
                }
            }
            t.ZodBoolean = ZodBoolean;
            ZodBoolean.create = (e)=>new ZodBoolean({
                    typeName: k.ZodBoolean,
                    coerce: e?.coerce || false,
                    ...processCreateParams(e)
                });
            class ZodDate extends ZodType {
                _parse(e) {
                    if (this._def.coerce) {
                        e.data = new Date(e.data);
                    }
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.date) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.date,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    if (Number.isNaN(e.data.getTime())) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_date
                        });
                        return i.INVALID;
                    }
                    const s = new i.ParseStatus;
                    let a = undefined;
                    for (const t of this._def.checks){
                        if (t.kind === "min") {
                            if (e.data.getTime() < t.value) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.too_small,
                                    message: t.message,
                                    inclusive: true,
                                    exact: false,
                                    minimum: t.value,
                                    type: "date"
                                });
                                s.dirty();
                            }
                        } else if (t.kind === "max") {
                            if (e.data.getTime() > t.value) {
                                a = this._getOrReturnCtx(e, a);
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.too_big,
                                    message: t.message,
                                    inclusive: true,
                                    exact: false,
                                    maximum: t.value,
                                    type: "date"
                                });
                                s.dirty();
                            }
                        } else {
                            o.util.assertNever(t);
                        }
                    }
                    return {
                        status: s.value,
                        value: new Date(e.data.getTime())
                    };
                }
                _addCheck(e) {
                    return new ZodDate({
                        ...this._def,
                        checks: [
                            ...this._def.checks,
                            e
                        ]
                    });
                }
                min(e, t) {
                    return this._addCheck({
                        kind: "min",
                        value: e.getTime(),
                        message: n.errorUtil.toString(t)
                    });
                }
                max(e, t) {
                    return this._addCheck({
                        kind: "max",
                        value: e.getTime(),
                        message: n.errorUtil.toString(t)
                    });
                }
                get minDate() {
                    let e = null;
                    for (const t of this._def.checks){
                        if (t.kind === "min") {
                            if (e === null || t.value > e) e = t.value;
                        }
                    }
                    return e != null ? new Date(e) : null;
                }
                get maxDate() {
                    let e = null;
                    for (const t of this._def.checks){
                        if (t.kind === "max") {
                            if (e === null || t.value < e) e = t.value;
                        }
                    }
                    return e != null ? new Date(e) : null;
                }
            }
            t.ZodDate = ZodDate;
            ZodDate.create = (e)=>new ZodDate({
                    checks: [],
                    coerce: e?.coerce || false,
                    typeName: k.ZodDate,
                    ...processCreateParams(e)
                });
            class ZodSymbol extends ZodType {
                _parse(e) {
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.symbol) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.symbol,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    return (0, i.OK)(e.data);
                }
            }
            t.ZodSymbol = ZodSymbol;
            ZodSymbol.create = (e)=>new ZodSymbol({
                    typeName: k.ZodSymbol,
                    ...processCreateParams(e)
                });
            class ZodUndefined extends ZodType {
                _parse(e) {
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.undefined) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.undefined,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    return (0, i.OK)(e.data);
                }
            }
            t.ZodUndefined = ZodUndefined;
            ZodUndefined.create = (e)=>new ZodUndefined({
                    typeName: k.ZodUndefined,
                    ...processCreateParams(e)
                });
            class ZodNull extends ZodType {
                _parse(e) {
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.null) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.null,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    return (0, i.OK)(e.data);
                }
            }
            t.ZodNull = ZodNull;
            ZodNull.create = (e)=>new ZodNull({
                    typeName: k.ZodNull,
                    ...processCreateParams(e)
                });
            class ZodAny extends ZodType {
                constructor(){
                    super(...arguments);
                    this._any = true;
                }
                _parse(e) {
                    return (0, i.OK)(e.data);
                }
            }
            t.ZodAny = ZodAny;
            ZodAny.create = (e)=>new ZodAny({
                    typeName: k.ZodAny,
                    ...processCreateParams(e)
                });
            class ZodUnknown extends ZodType {
                constructor(){
                    super(...arguments);
                    this._unknown = true;
                }
                _parse(e) {
                    return (0, i.OK)(e.data);
                }
            }
            t.ZodUnknown = ZodUnknown;
            ZodUnknown.create = (e)=>new ZodUnknown({
                    typeName: k.ZodUnknown,
                    ...processCreateParams(e)
                });
            class ZodNever extends ZodType {
                _parse(e) {
                    const t = this._getOrReturnCtx(e);
                    (0, i.addIssueToContext)(t, {
                        code: r.ZodIssueCode.invalid_type,
                        expected: o.ZodParsedType.never,
                        received: t.parsedType
                    });
                    return i.INVALID;
                }
            }
            t.ZodNever = ZodNever;
            ZodNever.create = (e)=>new ZodNever({
                    typeName: k.ZodNever,
                    ...processCreateParams(e)
                });
            class ZodVoid extends ZodType {
                _parse(e) {
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.undefined) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.void,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    return (0, i.OK)(e.data);
                }
            }
            t.ZodVoid = ZodVoid;
            ZodVoid.create = (e)=>new ZodVoid({
                    typeName: k.ZodVoid,
                    ...processCreateParams(e)
                });
            class ZodArray extends ZodType {
                _parse(e) {
                    const { ctx: t, status: s } = this._processInputParams(e);
                    const a = this._def;
                    if (t.parsedType !== o.ZodParsedType.array) {
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.array,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    if (a.exactLength !== null) {
                        const e = t.data.length > a.exactLength.value;
                        const n = t.data.length < a.exactLength.value;
                        if (e || n) {
                            (0, i.addIssueToContext)(t, {
                                code: e ? r.ZodIssueCode.too_big : r.ZodIssueCode.too_small,
                                minimum: n ? a.exactLength.value : undefined,
                                maximum: e ? a.exactLength.value : undefined,
                                type: "array",
                                inclusive: true,
                                exact: true,
                                message: a.exactLength.message
                            });
                            s.dirty();
                        }
                    }
                    if (a.minLength !== null) {
                        if (t.data.length < a.minLength.value) {
                            (0, i.addIssueToContext)(t, {
                                code: r.ZodIssueCode.too_small,
                                minimum: a.minLength.value,
                                type: "array",
                                inclusive: true,
                                exact: false,
                                message: a.minLength.message
                            });
                            s.dirty();
                        }
                    }
                    if (a.maxLength !== null) {
                        if (t.data.length > a.maxLength.value) {
                            (0, i.addIssueToContext)(t, {
                                code: r.ZodIssueCode.too_big,
                                maximum: a.maxLength.value,
                                type: "array",
                                inclusive: true,
                                exact: false,
                                message: a.maxLength.message
                            });
                            s.dirty();
                        }
                    }
                    if (t.common.async) {
                        return Promise.all([
                            ...t.data
                        ].map((e, s)=>a.type._parseAsync(new ParseInputLazyPath(t, e, t.path, s)))).then((e)=>i.ParseStatus.mergeArray(s, e));
                    }
                    const n = [
                        ...t.data
                    ].map((e, s)=>a.type._parseSync(new ParseInputLazyPath(t, e, t.path, s)));
                    return i.ParseStatus.mergeArray(s, n);
                }
                get element() {
                    return this._def.type;
                }
                min(e, t) {
                    return new ZodArray({
                        ...this._def,
                        minLength: {
                            value: e,
                            message: n.errorUtil.toString(t)
                        }
                    });
                }
                max(e, t) {
                    return new ZodArray({
                        ...this._def,
                        maxLength: {
                            value: e,
                            message: n.errorUtil.toString(t)
                        }
                    });
                }
                length(e, t) {
                    return new ZodArray({
                        ...this._def,
                        exactLength: {
                            value: e,
                            message: n.errorUtil.toString(t)
                        }
                    });
                }
                nonempty(e) {
                    return this.min(1, e);
                }
            }
            t.ZodArray = ZodArray;
            ZodArray.create = (e, t)=>new ZodArray({
                    type: e,
                    minLength: null,
                    maxLength: null,
                    exactLength: null,
                    typeName: k.ZodArray,
                    ...processCreateParams(t)
                });
            function deepPartialify(e) {
                if (e instanceof ZodObject) {
                    const t = {};
                    for(const s in e.shape){
                        const r = e.shape[s];
                        t[s] = ZodOptional.create(deepPartialify(r));
                    }
                    return new ZodObject({
                        ...e._def,
                        shape: ()=>t
                    });
                } else if (e instanceof ZodArray) {
                    return new ZodArray({
                        ...e._def,
                        type: deepPartialify(e.element)
                    });
                } else if (e instanceof ZodOptional) {
                    return ZodOptional.create(deepPartialify(e.unwrap()));
                } else if (e instanceof ZodNullable) {
                    return ZodNullable.create(deepPartialify(e.unwrap()));
                } else if (e instanceof ZodTuple) {
                    return ZodTuple.create(e.items.map((e)=>deepPartialify(e)));
                } else {
                    return e;
                }
            }
            class ZodObject extends ZodType {
                constructor(){
                    super(...arguments);
                    this._cached = null;
                    this.nonstrict = this.passthrough;
                    this.augment = this.extend;
                }
                _getCached() {
                    if (this._cached !== null) return this._cached;
                    const e = this._def.shape();
                    const t = o.util.objectKeys(e);
                    this._cached = {
                        shape: e,
                        keys: t
                    };
                    return this._cached;
                }
                _parse(e) {
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.object) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.object,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    const { status: s, ctx: a } = this._processInputParams(e);
                    const { shape: n, keys: d } = this._getCached();
                    const u = [];
                    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
                        for(const e in a.data){
                            if (!d.includes(e)) {
                                u.push(e);
                            }
                        }
                    }
                    const c = [];
                    for (const e of d){
                        const t = n[e];
                        const s = a.data[e];
                        c.push({
                            key: {
                                status: "valid",
                                value: e
                            },
                            value: t._parse(new ParseInputLazyPath(a, s, a.path, e)),
                            alwaysSet: e in a.data
                        });
                    }
                    if (this._def.catchall instanceof ZodNever) {
                        const e = this._def.unknownKeys;
                        if (e === "passthrough") {
                            for (const e of u){
                                c.push({
                                    key: {
                                        status: "valid",
                                        value: e
                                    },
                                    value: {
                                        status: "valid",
                                        value: a.data[e]
                                    }
                                });
                            }
                        } else if (e === "strict") {
                            if (u.length > 0) {
                                (0, i.addIssueToContext)(a, {
                                    code: r.ZodIssueCode.unrecognized_keys,
                                    keys: u
                                });
                                s.dirty();
                            }
                        } else if (e === "strip") {} else {
                            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
                        }
                    } else {
                        const e = this._def.catchall;
                        for (const t of u){
                            const s = a.data[t];
                            c.push({
                                key: {
                                    status: "valid",
                                    value: t
                                },
                                value: e._parse(new ParseInputLazyPath(a, s, a.path, t)),
                                alwaysSet: t in a.data
                            });
                        }
                    }
                    if (a.common.async) {
                        return Promise.resolve().then(async ()=>{
                            const e = [];
                            for (const t of c){
                                const s = await t.key;
                                const r = await t.value;
                                e.push({
                                    key: s,
                                    value: r,
                                    alwaysSet: t.alwaysSet
                                });
                            }
                            return e;
                        }).then((e)=>i.ParseStatus.mergeObjectSync(s, e));
                    } else {
                        return i.ParseStatus.mergeObjectSync(s, c);
                    }
                }
                get shape() {
                    return this._def.shape();
                }
                strict(e) {
                    n.errorUtil.errToObj;
                    return new ZodObject({
                        ...this._def,
                        unknownKeys: "strict",
                        ...e !== undefined ? {
                            errorMap: (t, s)=>{
                                const r = this._def.errorMap?.(t, s).message ?? s.defaultError;
                                if (t.code === "unrecognized_keys") return {
                                    message: n.errorUtil.errToObj(e).message ?? r
                                };
                                return {
                                    message: r
                                };
                            }
                        } : {}
                    });
                }
                strip() {
                    return new ZodObject({
                        ...this._def,
                        unknownKeys: "strip"
                    });
                }
                passthrough() {
                    return new ZodObject({
                        ...this._def,
                        unknownKeys: "passthrough"
                    });
                }
                extend(e) {
                    return new ZodObject({
                        ...this._def,
                        shape: ()=>({
                                ...this._def.shape(),
                                ...e
                            })
                    });
                }
                merge(e) {
                    const t = new ZodObject({
                        unknownKeys: e._def.unknownKeys,
                        catchall: e._def.catchall,
                        shape: ()=>({
                                ...this._def.shape(),
                                ...e._def.shape()
                            }),
                        typeName: k.ZodObject
                    });
                    return t;
                }
                setKey(e, t) {
                    return this.augment({
                        [e]: t
                    });
                }
                catchall(e) {
                    return new ZodObject({
                        ...this._def,
                        catchall: e
                    });
                }
                pick(e) {
                    const t = {};
                    for (const s of o.util.objectKeys(e)){
                        if (e[s] && this.shape[s]) {
                            t[s] = this.shape[s];
                        }
                    }
                    return new ZodObject({
                        ...this._def,
                        shape: ()=>t
                    });
                }
                omit(e) {
                    const t = {};
                    for (const s of o.util.objectKeys(this.shape)){
                        if (!e[s]) {
                            t[s] = this.shape[s];
                        }
                    }
                    return new ZodObject({
                        ...this._def,
                        shape: ()=>t
                    });
                }
                deepPartial() {
                    return deepPartialify(this);
                }
                partial(e) {
                    const t = {};
                    for (const s of o.util.objectKeys(this.shape)){
                        const r = this.shape[s];
                        if (e && !e[s]) {
                            t[s] = r;
                        } else {
                            t[s] = r.optional();
                        }
                    }
                    return new ZodObject({
                        ...this._def,
                        shape: ()=>t
                    });
                }
                required(e) {
                    const t = {};
                    for (const s of o.util.objectKeys(this.shape)){
                        if (e && !e[s]) {
                            t[s] = this.shape[s];
                        } else {
                            const e = this.shape[s];
                            let r = e;
                            while(r instanceof ZodOptional){
                                r = r._def.innerType;
                            }
                            t[s] = r;
                        }
                    }
                    return new ZodObject({
                        ...this._def,
                        shape: ()=>t
                    });
                }
                keyof() {
                    return createZodEnum(o.util.objectKeys(this.shape));
                }
            }
            t.ZodObject = ZodObject;
            ZodObject.create = (e, t)=>new ZodObject({
                    shape: ()=>e,
                    unknownKeys: "strip",
                    catchall: ZodNever.create(),
                    typeName: k.ZodObject,
                    ...processCreateParams(t)
                });
            ZodObject.strictCreate = (e, t)=>new ZodObject({
                    shape: ()=>e,
                    unknownKeys: "strict",
                    catchall: ZodNever.create(),
                    typeName: k.ZodObject,
                    ...processCreateParams(t)
                });
            ZodObject.lazycreate = (e, t)=>new ZodObject({
                    shape: e,
                    unknownKeys: "strip",
                    catchall: ZodNever.create(),
                    typeName: k.ZodObject,
                    ...processCreateParams(t)
                });
            class ZodUnion extends ZodType {
                _parse(e) {
                    const { ctx: t } = this._processInputParams(e);
                    const s = this._def.options;
                    function handleResults(e) {
                        for (const t of e){
                            if (t.result.status === "valid") {
                                return t.result;
                            }
                        }
                        for (const s of e){
                            if (s.result.status === "dirty") {
                                t.common.issues.push(...s.ctx.common.issues);
                                return s.result;
                            }
                        }
                        const s = e.map((e)=>new r.ZodError(e.ctx.common.issues));
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_union,
                            unionErrors: s
                        });
                        return i.INVALID;
                    }
                    if (t.common.async) {
                        return Promise.all(s.map(async (e)=>{
                            const s = {
                                ...t,
                                common: {
                                    ...t.common,
                                    issues: []
                                },
                                parent: null
                            };
                            return {
                                result: await e._parseAsync({
                                    data: t.data,
                                    path: t.path,
                                    parent: s
                                }),
                                ctx: s
                            };
                        })).then(handleResults);
                    } else {
                        let e = undefined;
                        const a = [];
                        for (const r of s){
                            const s = {
                                ...t,
                                common: {
                                    ...t.common,
                                    issues: []
                                },
                                parent: null
                            };
                            const n = r._parseSync({
                                data: t.data,
                                path: t.path,
                                parent: s
                            });
                            if (n.status === "valid") {
                                return n;
                            } else if (n.status === "dirty" && !e) {
                                e = {
                                    result: n,
                                    ctx: s
                                };
                            }
                            if (s.common.issues.length) {
                                a.push(s.common.issues);
                            }
                        }
                        if (e) {
                            t.common.issues.push(...e.ctx.common.issues);
                            return e.result;
                        }
                        const n = a.map((e)=>new r.ZodError(e));
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_union,
                            unionErrors: n
                        });
                        return i.INVALID;
                    }
                }
                get options() {
                    return this._def.options;
                }
            }
            t.ZodUnion = ZodUnion;
            ZodUnion.create = (e, t)=>new ZodUnion({
                    options: e,
                    typeName: k.ZodUnion,
                    ...processCreateParams(t)
                });
            const getDiscriminator = (e)=>{
                if (e instanceof ZodLazy) {
                    return getDiscriminator(e.schema);
                } else if (e instanceof ZodEffects) {
                    return getDiscriminator(e.innerType());
                } else if (e instanceof ZodLiteral) {
                    return [
                        e.value
                    ];
                } else if (e instanceof ZodEnum) {
                    return e.options;
                } else if (e instanceof ZodNativeEnum) {
                    return o.util.objectValues(e.enum);
                } else if (e instanceof ZodDefault) {
                    return getDiscriminator(e._def.innerType);
                } else if (e instanceof ZodUndefined) {
                    return [
                        undefined
                    ];
                } else if (e instanceof ZodNull) {
                    return [
                        null
                    ];
                } else if (e instanceof ZodOptional) {
                    return [
                        undefined,
                        ...getDiscriminator(e.unwrap())
                    ];
                } else if (e instanceof ZodNullable) {
                    return [
                        null,
                        ...getDiscriminator(e.unwrap())
                    ];
                } else if (e instanceof ZodBranded) {
                    return getDiscriminator(e.unwrap());
                } else if (e instanceof ZodReadonly) {
                    return getDiscriminator(e.unwrap());
                } else if (e instanceof ZodCatch) {
                    return getDiscriminator(e._def.innerType);
                } else {
                    return [];
                }
            };
            class ZodDiscriminatedUnion extends ZodType {
                _parse(e) {
                    const { ctx: t } = this._processInputParams(e);
                    if (t.parsedType !== o.ZodParsedType.object) {
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.object,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    const s = this.discriminator;
                    const a = t.data[s];
                    const n = this.optionsMap.get(a);
                    if (!n) {
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_union_discriminator,
                            options: Array.from(this.optionsMap.keys()),
                            path: [
                                s
                            ]
                        });
                        return i.INVALID;
                    }
                    if (t.common.async) {
                        return n._parseAsync({
                            data: t.data,
                            path: t.path,
                            parent: t
                        });
                    } else {
                        return n._parseSync({
                            data: t.data,
                            path: t.path,
                            parent: t
                        });
                    }
                }
                get discriminator() {
                    return this._def.discriminator;
                }
                get options() {
                    return this._def.options;
                }
                get optionsMap() {
                    return this._def.optionsMap;
                }
                static create(e, t, s) {
                    const r = new Map;
                    for (const s of t){
                        const t = getDiscriminator(s.shape[e]);
                        if (!t.length) {
                            throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
                        }
                        for (const a of t){
                            if (r.has(a)) {
                                throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);
                            }
                            r.set(a, s);
                        }
                    }
                    return new ZodDiscriminatedUnion({
                        typeName: k.ZodDiscriminatedUnion,
                        discriminator: e,
                        options: t,
                        optionsMap: r,
                        ...processCreateParams(s)
                    });
                }
            }
            t.ZodDiscriminatedUnion = ZodDiscriminatedUnion;
            function mergeValues(e, t) {
                const s = (0, o.getParsedType)(e);
                const r = (0, o.getParsedType)(t);
                if (e === t) {
                    return {
                        valid: true,
                        data: e
                    };
                } else if (s === o.ZodParsedType.object && r === o.ZodParsedType.object) {
                    const s = o.util.objectKeys(t);
                    const r = o.util.objectKeys(e).filter((e)=>s.indexOf(e) !== -1);
                    const a = {
                        ...e,
                        ...t
                    };
                    for (const s of r){
                        const r = mergeValues(e[s], t[s]);
                        if (!r.valid) {
                            return {
                                valid: false
                            };
                        }
                        a[s] = r.data;
                    }
                    return {
                        valid: true,
                        data: a
                    };
                } else if (s === o.ZodParsedType.array && r === o.ZodParsedType.array) {
                    if (e.length !== t.length) {
                        return {
                            valid: false
                        };
                    }
                    const s = [];
                    for(let r = 0; r < e.length; r++){
                        const a = e[r];
                        const n = t[r];
                        const i = mergeValues(a, n);
                        if (!i.valid) {
                            return {
                                valid: false
                            };
                        }
                        s.push(i.data);
                    }
                    return {
                        valid: true,
                        data: s
                    };
                } else if (s === o.ZodParsedType.date && r === o.ZodParsedType.date && +e === +t) {
                    return {
                        valid: true,
                        data: e
                    };
                } else {
                    return {
                        valid: false
                    };
                }
            }
            class ZodIntersection extends ZodType {
                _parse(e) {
                    const { status: t, ctx: s } = this._processInputParams(e);
                    const handleParsed = (e, a)=>{
                        if ((0, i.isAborted)(e) || (0, i.isAborted)(a)) {
                            return i.INVALID;
                        }
                        const n = mergeValues(e.value, a.value);
                        if (!n.valid) {
                            (0, i.addIssueToContext)(s, {
                                code: r.ZodIssueCode.invalid_intersection_types
                            });
                            return i.INVALID;
                        }
                        if ((0, i.isDirty)(e) || (0, i.isDirty)(a)) {
                            t.dirty();
                        }
                        return {
                            status: t.value,
                            value: n.data
                        };
                    };
                    if (s.common.async) {
                        return Promise.all([
                            this._def.left._parseAsync({
                                data: s.data,
                                path: s.path,
                                parent: s
                            }),
                            this._def.right._parseAsync({
                                data: s.data,
                                path: s.path,
                                parent: s
                            })
                        ]).then(([e, t])=>handleParsed(e, t));
                    } else {
                        return handleParsed(this._def.left._parseSync({
                            data: s.data,
                            path: s.path,
                            parent: s
                        }), this._def.right._parseSync({
                            data: s.data,
                            path: s.path,
                            parent: s
                        }));
                    }
                }
            }
            t.ZodIntersection = ZodIntersection;
            ZodIntersection.create = (e, t, s)=>new ZodIntersection({
                    left: e,
                    right: t,
                    typeName: k.ZodIntersection,
                    ...processCreateParams(s)
                });
            class ZodTuple extends ZodType {
                _parse(e) {
                    const { status: t, ctx: s } = this._processInputParams(e);
                    if (s.parsedType !== o.ZodParsedType.array) {
                        (0, i.addIssueToContext)(s, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.array,
                            received: s.parsedType
                        });
                        return i.INVALID;
                    }
                    if (s.data.length < this._def.items.length) {
                        (0, i.addIssueToContext)(s, {
                            code: r.ZodIssueCode.too_small,
                            minimum: this._def.items.length,
                            inclusive: true,
                            exact: false,
                            type: "array"
                        });
                        return i.INVALID;
                    }
                    const a = this._def.rest;
                    if (!a && s.data.length > this._def.items.length) {
                        (0, i.addIssueToContext)(s, {
                            code: r.ZodIssueCode.too_big,
                            maximum: this._def.items.length,
                            inclusive: true,
                            exact: false,
                            type: "array"
                        });
                        t.dirty();
                    }
                    const n = [
                        ...s.data
                    ].map((e, t)=>{
                        const r = this._def.items[t] || this._def.rest;
                        if (!r) return null;
                        return r._parse(new ParseInputLazyPath(s, e, s.path, t));
                    }).filter((e)=>!!e);
                    if (s.common.async) {
                        return Promise.all(n).then((e)=>i.ParseStatus.mergeArray(t, e));
                    } else {
                        return i.ParseStatus.mergeArray(t, n);
                    }
                }
                get items() {
                    return this._def.items;
                }
                rest(e) {
                    return new ZodTuple({
                        ...this._def,
                        rest: e
                    });
                }
            }
            t.ZodTuple = ZodTuple;
            ZodTuple.create = (e, t)=>{
                if (!Array.isArray(e)) {
                    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
                }
                return new ZodTuple({
                    items: e,
                    typeName: k.ZodTuple,
                    rest: null,
                    ...processCreateParams(t)
                });
            };
            class ZodRecord extends ZodType {
                get keySchema() {
                    return this._def.keyType;
                }
                get valueSchema() {
                    return this._def.valueType;
                }
                _parse(e) {
                    const { status: t, ctx: s } = this._processInputParams(e);
                    if (s.parsedType !== o.ZodParsedType.object) {
                        (0, i.addIssueToContext)(s, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.object,
                            received: s.parsedType
                        });
                        return i.INVALID;
                    }
                    const a = [];
                    const n = this._def.keyType;
                    const d = this._def.valueType;
                    for(const e in s.data){
                        a.push({
                            key: n._parse(new ParseInputLazyPath(s, e, s.path, e)),
                            value: d._parse(new ParseInputLazyPath(s, s.data[e], s.path, e)),
                            alwaysSet: e in s.data
                        });
                    }
                    if (s.common.async) {
                        return i.ParseStatus.mergeObjectAsync(t, a);
                    } else {
                        return i.ParseStatus.mergeObjectSync(t, a);
                    }
                }
                get element() {
                    return this._def.valueType;
                }
                static create(e, t, s) {
                    if (t instanceof ZodType) {
                        return new ZodRecord({
                            keyType: e,
                            valueType: t,
                            typeName: k.ZodRecord,
                            ...processCreateParams(s)
                        });
                    }
                    return new ZodRecord({
                        keyType: ZodString.create(),
                        valueType: e,
                        typeName: k.ZodRecord,
                        ...processCreateParams(t)
                    });
                }
            }
            t.ZodRecord = ZodRecord;
            class ZodMap extends ZodType {
                get keySchema() {
                    return this._def.keyType;
                }
                get valueSchema() {
                    return this._def.valueType;
                }
                _parse(e) {
                    const { status: t, ctx: s } = this._processInputParams(e);
                    if (s.parsedType !== o.ZodParsedType.map) {
                        (0, i.addIssueToContext)(s, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.map,
                            received: s.parsedType
                        });
                        return i.INVALID;
                    }
                    const a = this._def.keyType;
                    const n = this._def.valueType;
                    const d = [
                        ...s.data.entries()
                    ].map(([e, t], r)=>({
                            key: a._parse(new ParseInputLazyPath(s, e, s.path, [
                                r,
                                "key"
                            ])),
                            value: n._parse(new ParseInputLazyPath(s, t, s.path, [
                                r,
                                "value"
                            ]))
                        }));
                    if (s.common.async) {
                        const e = new Map;
                        return Promise.resolve().then(async ()=>{
                            for (const s of d){
                                const r = await s.key;
                                const a = await s.value;
                                if (r.status === "aborted" || a.status === "aborted") {
                                    return i.INVALID;
                                }
                                if (r.status === "dirty" || a.status === "dirty") {
                                    t.dirty();
                                }
                                e.set(r.value, a.value);
                            }
                            return {
                                status: t.value,
                                value: e
                            };
                        });
                    } else {
                        const e = new Map;
                        for (const s of d){
                            const r = s.key;
                            const a = s.value;
                            if (r.status === "aborted" || a.status === "aborted") {
                                return i.INVALID;
                            }
                            if (r.status === "dirty" || a.status === "dirty") {
                                t.dirty();
                            }
                            e.set(r.value, a.value);
                        }
                        return {
                            status: t.value,
                            value: e
                        };
                    }
                }
            }
            t.ZodMap = ZodMap;
            ZodMap.create = (e, t, s)=>new ZodMap({
                    valueType: t,
                    keyType: e,
                    typeName: k.ZodMap,
                    ...processCreateParams(s)
                });
            class ZodSet extends ZodType {
                _parse(e) {
                    const { status: t, ctx: s } = this._processInputParams(e);
                    if (s.parsedType !== o.ZodParsedType.set) {
                        (0, i.addIssueToContext)(s, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.set,
                            received: s.parsedType
                        });
                        return i.INVALID;
                    }
                    const a = this._def;
                    if (a.minSize !== null) {
                        if (s.data.size < a.minSize.value) {
                            (0, i.addIssueToContext)(s, {
                                code: r.ZodIssueCode.too_small,
                                minimum: a.minSize.value,
                                type: "set",
                                inclusive: true,
                                exact: false,
                                message: a.minSize.message
                            });
                            t.dirty();
                        }
                    }
                    if (a.maxSize !== null) {
                        if (s.data.size > a.maxSize.value) {
                            (0, i.addIssueToContext)(s, {
                                code: r.ZodIssueCode.too_big,
                                maximum: a.maxSize.value,
                                type: "set",
                                inclusive: true,
                                exact: false,
                                message: a.maxSize.message
                            });
                            t.dirty();
                        }
                    }
                    const n = this._def.valueType;
                    function finalizeSet(e) {
                        const s = new Set;
                        for (const r of e){
                            if (r.status === "aborted") return i.INVALID;
                            if (r.status === "dirty") t.dirty();
                            s.add(r.value);
                        }
                        return {
                            status: t.value,
                            value: s
                        };
                    }
                    const d = [
                        ...s.data.values()
                    ].map((e, t)=>n._parse(new ParseInputLazyPath(s, e, s.path, t)));
                    if (s.common.async) {
                        return Promise.all(d).then((e)=>finalizeSet(e));
                    } else {
                        return finalizeSet(d);
                    }
                }
                min(e, t) {
                    return new ZodSet({
                        ...this._def,
                        minSize: {
                            value: e,
                            message: n.errorUtil.toString(t)
                        }
                    });
                }
                max(e, t) {
                    return new ZodSet({
                        ...this._def,
                        maxSize: {
                            value: e,
                            message: n.errorUtil.toString(t)
                        }
                    });
                }
                size(e, t) {
                    return this.min(e, t).max(e, t);
                }
                nonempty(e) {
                    return this.min(1, e);
                }
            }
            t.ZodSet = ZodSet;
            ZodSet.create = (e, t)=>new ZodSet({
                    valueType: e,
                    minSize: null,
                    maxSize: null,
                    typeName: k.ZodSet,
                    ...processCreateParams(t)
                });
            class ZodFunction extends ZodType {
                constructor(){
                    super(...arguments);
                    this.validate = this.implement;
                }
                _parse(e) {
                    const { ctx: t } = this._processInputParams(e);
                    if (t.parsedType !== o.ZodParsedType.function) {
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.function,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    function makeArgsIssue(e, s) {
                        return (0, i.makeIssue)({
                            data: e,
                            path: t.path,
                            errorMaps: [
                                t.common.contextualErrorMap,
                                t.schemaErrorMap,
                                (0, a.getErrorMap)(),
                                a.defaultErrorMap
                            ].filter((e)=>!!e),
                            issueData: {
                                code: r.ZodIssueCode.invalid_arguments,
                                argumentsError: s
                            }
                        });
                    }
                    function makeReturnsIssue(e, s) {
                        return (0, i.makeIssue)({
                            data: e,
                            path: t.path,
                            errorMaps: [
                                t.common.contextualErrorMap,
                                t.schemaErrorMap,
                                (0, a.getErrorMap)(),
                                a.defaultErrorMap
                            ].filter((e)=>!!e),
                            issueData: {
                                code: r.ZodIssueCode.invalid_return_type,
                                returnTypeError: s
                            }
                        });
                    }
                    const s = {
                        errorMap: t.common.contextualErrorMap
                    };
                    const n = t.data;
                    if (this._def.returns instanceof ZodPromise) {
                        const e = this;
                        return (0, i.OK)(async function(...t) {
                            const a = new r.ZodError([]);
                            const i = await e._def.args.parseAsync(t, s).catch((e)=>{
                                a.addIssue(makeArgsIssue(t, e));
                                throw a;
                            });
                            const o = await Reflect.apply(n, this, i);
                            const d = await e._def.returns._def.type.parseAsync(o, s).catch((e)=>{
                                a.addIssue(makeReturnsIssue(o, e));
                                throw a;
                            });
                            return d;
                        });
                    } else {
                        const e = this;
                        return (0, i.OK)(function(...t) {
                            const a = e._def.args.safeParse(t, s);
                            if (!a.success) {
                                throw new r.ZodError([
                                    makeArgsIssue(t, a.error)
                                ]);
                            }
                            const i = Reflect.apply(n, this, a.data);
                            const o = e._def.returns.safeParse(i, s);
                            if (!o.success) {
                                throw new r.ZodError([
                                    makeReturnsIssue(i, o.error)
                                ]);
                            }
                            return o.data;
                        });
                    }
                }
                parameters() {
                    return this._def.args;
                }
                returnType() {
                    return this._def.returns;
                }
                args(...e) {
                    return new ZodFunction({
                        ...this._def,
                        args: ZodTuple.create(e).rest(ZodUnknown.create())
                    });
                }
                returns(e) {
                    return new ZodFunction({
                        ...this._def,
                        returns: e
                    });
                }
                implement(e) {
                    const t = this.parse(e);
                    return t;
                }
                strictImplement(e) {
                    const t = this.parse(e);
                    return t;
                }
                static create(e, t, s) {
                    return new ZodFunction({
                        args: e ? e : ZodTuple.create([]).rest(ZodUnknown.create()),
                        returns: t || ZodUnknown.create(),
                        typeName: k.ZodFunction,
                        ...processCreateParams(s)
                    });
                }
            }
            t.ZodFunction = ZodFunction;
            class ZodLazy extends ZodType {
                get schema() {
                    return this._def.getter();
                }
                _parse(e) {
                    const { ctx: t } = this._processInputParams(e);
                    const s = this._def.getter();
                    return s._parse({
                        data: t.data,
                        path: t.path,
                        parent: t
                    });
                }
            }
            t.ZodLazy = ZodLazy;
            ZodLazy.create = (e, t)=>new ZodLazy({
                    getter: e,
                    typeName: k.ZodLazy,
                    ...processCreateParams(t)
                });
            class ZodLiteral extends ZodType {
                _parse(e) {
                    if (e.data !== this._def.value) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            received: t.data,
                            code: r.ZodIssueCode.invalid_literal,
                            expected: this._def.value
                        });
                        return i.INVALID;
                    }
                    return {
                        status: "valid",
                        value: e.data
                    };
                }
                get value() {
                    return this._def.value;
                }
            }
            t.ZodLiteral = ZodLiteral;
            ZodLiteral.create = (e, t)=>new ZodLiteral({
                    value: e,
                    typeName: k.ZodLiteral,
                    ...processCreateParams(t)
                });
            function createZodEnum(e, t) {
                return new ZodEnum({
                    values: e,
                    typeName: k.ZodEnum,
                    ...processCreateParams(t)
                });
            }
            class ZodEnum extends ZodType {
                _parse(e) {
                    if (typeof e.data !== "string") {
                        const t = this._getOrReturnCtx(e);
                        const s = this._def.values;
                        (0, i.addIssueToContext)(t, {
                            expected: o.util.joinValues(s),
                            received: t.parsedType,
                            code: r.ZodIssueCode.invalid_type
                        });
                        return i.INVALID;
                    }
                    if (!this._cache) {
                        this._cache = new Set(this._def.values);
                    }
                    if (!this._cache.has(e.data)) {
                        const t = this._getOrReturnCtx(e);
                        const s = this._def.values;
                        (0, i.addIssueToContext)(t, {
                            received: t.data,
                            code: r.ZodIssueCode.invalid_enum_value,
                            options: s
                        });
                        return i.INVALID;
                    }
                    return (0, i.OK)(e.data);
                }
                get options() {
                    return this._def.values;
                }
                get enum() {
                    const e = {};
                    for (const t of this._def.values){
                        e[t] = t;
                    }
                    return e;
                }
                get Values() {
                    const e = {};
                    for (const t of this._def.values){
                        e[t] = t;
                    }
                    return e;
                }
                get Enum() {
                    const e = {};
                    for (const t of this._def.values){
                        e[t] = t;
                    }
                    return e;
                }
                extract(e, t = this._def) {
                    return ZodEnum.create(e, {
                        ...this._def,
                        ...t
                    });
                }
                exclude(e, t = this._def) {
                    return ZodEnum.create(this.options.filter((t)=>!e.includes(t)), {
                        ...this._def,
                        ...t
                    });
                }
            }
            t.ZodEnum = ZodEnum;
            ZodEnum.create = createZodEnum;
            class ZodNativeEnum extends ZodType {
                _parse(e) {
                    const t = o.util.getValidEnumValues(this._def.values);
                    const s = this._getOrReturnCtx(e);
                    if (s.parsedType !== o.ZodParsedType.string && s.parsedType !== o.ZodParsedType.number) {
                        const e = o.util.objectValues(t);
                        (0, i.addIssueToContext)(s, {
                            expected: o.util.joinValues(e),
                            received: s.parsedType,
                            code: r.ZodIssueCode.invalid_type
                        });
                        return i.INVALID;
                    }
                    if (!this._cache) {
                        this._cache = new Set(o.util.getValidEnumValues(this._def.values));
                    }
                    if (!this._cache.has(e.data)) {
                        const e = o.util.objectValues(t);
                        (0, i.addIssueToContext)(s, {
                            received: s.data,
                            code: r.ZodIssueCode.invalid_enum_value,
                            options: e
                        });
                        return i.INVALID;
                    }
                    return (0, i.OK)(e.data);
                }
                get enum() {
                    return this._def.values;
                }
            }
            t.ZodNativeEnum = ZodNativeEnum;
            ZodNativeEnum.create = (e, t)=>new ZodNativeEnum({
                    values: e,
                    typeName: k.ZodNativeEnum,
                    ...processCreateParams(t)
                });
            class ZodPromise extends ZodType {
                unwrap() {
                    return this._def.type;
                }
                _parse(e) {
                    const { ctx: t } = this._processInputParams(e);
                    if (t.parsedType !== o.ZodParsedType.promise && t.common.async === false) {
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.promise,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    const s = t.parsedType === o.ZodParsedType.promise ? t.data : Promise.resolve(t.data);
                    return (0, i.OK)(s.then((e)=>this._def.type.parseAsync(e, {
                            path: t.path,
                            errorMap: t.common.contextualErrorMap
                        })));
                }
            }
            t.ZodPromise = ZodPromise;
            ZodPromise.create = (e, t)=>new ZodPromise({
                    type: e,
                    typeName: k.ZodPromise,
                    ...processCreateParams(t)
                });
            class ZodEffects extends ZodType {
                innerType() {
                    return this._def.schema;
                }
                sourceType() {
                    return this._def.schema._def.typeName === k.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
                }
                _parse(e) {
                    const { status: t, ctx: s } = this._processInputParams(e);
                    const r = this._def.effect || null;
                    const a = {
                        addIssue: (e)=>{
                            (0, i.addIssueToContext)(s, e);
                            if (e.fatal) {
                                t.abort();
                            } else {
                                t.dirty();
                            }
                        },
                        get path () {
                            return s.path;
                        }
                    };
                    a.addIssue = a.addIssue.bind(a);
                    if (r.type === "preprocess") {
                        const e = r.transform(s.data, a);
                        if (s.common.async) {
                            return Promise.resolve(e).then(async (e)=>{
                                if (t.value === "aborted") return i.INVALID;
                                const r = await this._def.schema._parseAsync({
                                    data: e,
                                    path: s.path,
                                    parent: s
                                });
                                if (r.status === "aborted") return i.INVALID;
                                if (r.status === "dirty") return (0, i.DIRTY)(r.value);
                                if (t.value === "dirty") return (0, i.DIRTY)(r.value);
                                return r;
                            });
                        } else {
                            if (t.value === "aborted") return i.INVALID;
                            const r = this._def.schema._parseSync({
                                data: e,
                                path: s.path,
                                parent: s
                            });
                            if (r.status === "aborted") return i.INVALID;
                            if (r.status === "dirty") return (0, i.DIRTY)(r.value);
                            if (t.value === "dirty") return (0, i.DIRTY)(r.value);
                            return r;
                        }
                    }
                    if (r.type === "refinement") {
                        const executeRefinement = (e)=>{
                            const t = r.refinement(e, a);
                            if (s.common.async) {
                                return Promise.resolve(t);
                            }
                            if (t instanceof Promise) {
                                throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                            }
                            return e;
                        };
                        if (s.common.async === false) {
                            const e = this._def.schema._parseSync({
                                data: s.data,
                                path: s.path,
                                parent: s
                            });
                            if (e.status === "aborted") return i.INVALID;
                            if (e.status === "dirty") t.dirty();
                            executeRefinement(e.value);
                            return {
                                status: t.value,
                                value: e.value
                            };
                        } else {
                            return this._def.schema._parseAsync({
                                data: s.data,
                                path: s.path,
                                parent: s
                            }).then((e)=>{
                                if (e.status === "aborted") return i.INVALID;
                                if (e.status === "dirty") t.dirty();
                                return executeRefinement(e.value).then(()=>({
                                        status: t.value,
                                        value: e.value
                                    }));
                            });
                        }
                    }
                    if (r.type === "transform") {
                        if (s.common.async === false) {
                            const e = this._def.schema._parseSync({
                                data: s.data,
                                path: s.path,
                                parent: s
                            });
                            if (!(0, i.isValid)(e)) return i.INVALID;
                            const n = r.transform(e.value, a);
                            if (n instanceof Promise) {
                                throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                            }
                            return {
                                status: t.value,
                                value: n
                            };
                        } else {
                            return this._def.schema._parseAsync({
                                data: s.data,
                                path: s.path,
                                parent: s
                            }).then((e)=>{
                                if (!(0, i.isValid)(e)) return i.INVALID;
                                return Promise.resolve(r.transform(e.value, a)).then((e)=>({
                                        status: t.value,
                                        value: e
                                    }));
                            });
                        }
                    }
                    o.util.assertNever(r);
                }
            }
            t.ZodEffects = ZodEffects;
            t.ZodTransformer = ZodEffects;
            ZodEffects.create = (e, t, s)=>new ZodEffects({
                    schema: e,
                    typeName: k.ZodEffects,
                    effect: t,
                    ...processCreateParams(s)
                });
            ZodEffects.createWithPreprocess = (e, t, s)=>new ZodEffects({
                    schema: t,
                    effect: {
                        type: "preprocess",
                        transform: e
                    },
                    typeName: k.ZodEffects,
                    ...processCreateParams(s)
                });
            class ZodOptional extends ZodType {
                _parse(e) {
                    const t = this._getType(e);
                    if (t === o.ZodParsedType.undefined) {
                        return (0, i.OK)(undefined);
                    }
                    return this._def.innerType._parse(e);
                }
                unwrap() {
                    return this._def.innerType;
                }
            }
            t.ZodOptional = ZodOptional;
            ZodOptional.create = (e, t)=>new ZodOptional({
                    innerType: e,
                    typeName: k.ZodOptional,
                    ...processCreateParams(t)
                });
            class ZodNullable extends ZodType {
                _parse(e) {
                    const t = this._getType(e);
                    if (t === o.ZodParsedType.null) {
                        return (0, i.OK)(null);
                    }
                    return this._def.innerType._parse(e);
                }
                unwrap() {
                    return this._def.innerType;
                }
            }
            t.ZodNullable = ZodNullable;
            ZodNullable.create = (e, t)=>new ZodNullable({
                    innerType: e,
                    typeName: k.ZodNullable,
                    ...processCreateParams(t)
                });
            class ZodDefault extends ZodType {
                _parse(e) {
                    const { ctx: t } = this._processInputParams(e);
                    let s = t.data;
                    if (t.parsedType === o.ZodParsedType.undefined) {
                        s = this._def.defaultValue();
                    }
                    return this._def.innerType._parse({
                        data: s,
                        path: t.path,
                        parent: t
                    });
                }
                removeDefault() {
                    return this._def.innerType;
                }
            }
            t.ZodDefault = ZodDefault;
            ZodDefault.create = (e, t)=>new ZodDefault({
                    innerType: e,
                    typeName: k.ZodDefault,
                    defaultValue: typeof t.default === "function" ? t.default : ()=>t.default,
                    ...processCreateParams(t)
                });
            class ZodCatch extends ZodType {
                _parse(e) {
                    const { ctx: t } = this._processInputParams(e);
                    const s = {
                        ...t,
                        common: {
                            ...t.common,
                            issues: []
                        }
                    };
                    const a = this._def.innerType._parse({
                        data: s.data,
                        path: s.path,
                        parent: {
                            ...s
                        }
                    });
                    if ((0, i.isAsync)(a)) {
                        return a.then((e)=>({
                                status: "valid",
                                value: e.status === "valid" ? e.value : this._def.catchValue({
                                    get error () {
                                        return new r.ZodError(s.common.issues);
                                    },
                                    input: s.data
                                })
                            }));
                    } else {
                        return {
                            status: "valid",
                            value: a.status === "valid" ? a.value : this._def.catchValue({
                                get error () {
                                    return new r.ZodError(s.common.issues);
                                },
                                input: s.data
                            })
                        };
                    }
                }
                removeCatch() {
                    return this._def.innerType;
                }
            }
            t.ZodCatch = ZodCatch;
            ZodCatch.create = (e, t)=>new ZodCatch({
                    innerType: e,
                    typeName: k.ZodCatch,
                    catchValue: typeof t.catch === "function" ? t.catch : ()=>t.catch,
                    ...processCreateParams(t)
                });
            class ZodNaN extends ZodType {
                _parse(e) {
                    const t = this._getType(e);
                    if (t !== o.ZodParsedType.nan) {
                        const t = this._getOrReturnCtx(e);
                        (0, i.addIssueToContext)(t, {
                            code: r.ZodIssueCode.invalid_type,
                            expected: o.ZodParsedType.nan,
                            received: t.parsedType
                        });
                        return i.INVALID;
                    }
                    return {
                        status: "valid",
                        value: e.data
                    };
                }
            }
            t.ZodNaN = ZodNaN;
            ZodNaN.create = (e)=>new ZodNaN({
                    typeName: k.ZodNaN,
                    ...processCreateParams(e)
                });
            t.BRAND = Symbol("zod_brand");
            class ZodBranded extends ZodType {
                _parse(e) {
                    const { ctx: t } = this._processInputParams(e);
                    const s = t.data;
                    return this._def.type._parse({
                        data: s,
                        path: t.path,
                        parent: t
                    });
                }
                unwrap() {
                    return this._def.type;
                }
            }
            t.ZodBranded = ZodBranded;
            class ZodPipeline extends ZodType {
                _parse(e) {
                    const { status: t, ctx: s } = this._processInputParams(e);
                    if (s.common.async) {
                        const handleAsync = async ()=>{
                            const e = await this._def.in._parseAsync({
                                data: s.data,
                                path: s.path,
                                parent: s
                            });
                            if (e.status === "aborted") return i.INVALID;
                            if (e.status === "dirty") {
                                t.dirty();
                                return (0, i.DIRTY)(e.value);
                            } else {
                                return this._def.out._parseAsync({
                                    data: e.value,
                                    path: s.path,
                                    parent: s
                                });
                            }
                        };
                        return handleAsync();
                    } else {
                        const e = this._def.in._parseSync({
                            data: s.data,
                            path: s.path,
                            parent: s
                        });
                        if (e.status === "aborted") return i.INVALID;
                        if (e.status === "dirty") {
                            t.dirty();
                            return {
                                status: "dirty",
                                value: e.value
                            };
                        } else {
                            return this._def.out._parseSync({
                                data: e.value,
                                path: s.path,
                                parent: s
                            });
                        }
                    }
                }
                static create(e, t) {
                    return new ZodPipeline({
                        in: e,
                        out: t,
                        typeName: k.ZodPipeline
                    });
                }
            }
            t.ZodPipeline = ZodPipeline;
            class ZodReadonly extends ZodType {
                _parse(e) {
                    const t = this._def.innerType._parse(e);
                    const freeze = (e)=>{
                        if ((0, i.isValid)(e)) {
                            e.value = Object.freeze(e.value);
                        }
                        return e;
                    };
                    return (0, i.isAsync)(t) ? t.then((e)=>freeze(e)) : freeze(t);
                }
                unwrap() {
                    return this._def.innerType;
                }
            }
            t.ZodReadonly = ZodReadonly;
            ZodReadonly.create = (e, t)=>new ZodReadonly({
                    innerType: e,
                    typeName: k.ZodReadonly,
                    ...processCreateParams(t)
                });
            function cleanParams(e, t) {
                const s = typeof e === "function" ? e(t) : typeof e === "string" ? {
                    message: e
                } : e;
                const r = typeof s === "string" ? {
                    message: s
                } : s;
                return r;
            }
            function custom(e, t = {}, s) {
                if (e) return ZodAny.create().superRefine((r, a)=>{
                    const n = e(r);
                    if (n instanceof Promise) {
                        return n.then((e)=>{
                            if (!e) {
                                const e = cleanParams(t, r);
                                const n = e.fatal ?? s ?? true;
                                a.addIssue({
                                    code: "custom",
                                    ...e,
                                    fatal: n
                                });
                            }
                        });
                    }
                    if (!n) {
                        const e = cleanParams(t, r);
                        const n = e.fatal ?? s ?? true;
                        a.addIssue({
                            code: "custom",
                            ...e,
                            fatal: n
                        });
                    }
                    return;
                });
                return ZodAny.create();
            }
            t.late = {
                object: ZodObject.lazycreate
            };
            var k;
            (function(e) {
                e["ZodString"] = "ZodString";
                e["ZodNumber"] = "ZodNumber";
                e["ZodNaN"] = "ZodNaN";
                e["ZodBigInt"] = "ZodBigInt";
                e["ZodBoolean"] = "ZodBoolean";
                e["ZodDate"] = "ZodDate";
                e["ZodSymbol"] = "ZodSymbol";
                e["ZodUndefined"] = "ZodUndefined";
                e["ZodNull"] = "ZodNull";
                e["ZodAny"] = "ZodAny";
                e["ZodUnknown"] = "ZodUnknown";
                e["ZodNever"] = "ZodNever";
                e["ZodVoid"] = "ZodVoid";
                e["ZodArray"] = "ZodArray";
                e["ZodObject"] = "ZodObject";
                e["ZodUnion"] = "ZodUnion";
                e["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
                e["ZodIntersection"] = "ZodIntersection";
                e["ZodTuple"] = "ZodTuple";
                e["ZodRecord"] = "ZodRecord";
                e["ZodMap"] = "ZodMap";
                e["ZodSet"] = "ZodSet";
                e["ZodFunction"] = "ZodFunction";
                e["ZodLazy"] = "ZodLazy";
                e["ZodLiteral"] = "ZodLiteral";
                e["ZodEnum"] = "ZodEnum";
                e["ZodEffects"] = "ZodEffects";
                e["ZodNativeEnum"] = "ZodNativeEnum";
                e["ZodOptional"] = "ZodOptional";
                e["ZodNullable"] = "ZodNullable";
                e["ZodDefault"] = "ZodDefault";
                e["ZodCatch"] = "ZodCatch";
                e["ZodPromise"] = "ZodPromise";
                e["ZodBranded"] = "ZodBranded";
                e["ZodPipeline"] = "ZodPipeline";
                e["ZodReadonly"] = "ZodReadonly";
            })(k || (t.ZodFirstPartyTypeKind = k = {}));
            class Class {
                constructor(...e){}
            }
            const instanceOfType = (e, t = {
                message: `Input not instance of ${e.name}`
            })=>custom((t)=>t instanceof e, t);
            t["instanceof"] = instanceOfType;
            const P = ZodString.create;
            t.string = P;
            const w = ZodNumber.create;
            t.number = w;
            const N = ZodNaN.create;
            t.nan = N;
            const O = ZodBigInt.create;
            t.bigint = O;
            const A = ZodBoolean.create;
            t.boolean = A;
            const S = ZodDate.create;
            t.date = S;
            const j = ZodSymbol.create;
            t.symbol = j;
            const E = ZodUndefined.create;
            t.undefined = E;
            const D = ZodNull.create;
            t["null"] = D;
            const L = ZodAny.create;
            t.any = L;
            const U = ZodUnknown.create;
            t.unknown = U;
            const R = ZodNever.create;
            t.never = R;
            const V = ZodVoid.create;
            t["void"] = V;
            const M = ZodArray.create;
            t.array = M;
            const $ = ZodObject.create;
            t.object = $;
            const z = ZodObject.strictCreate;
            t.strictObject = z;
            const F = ZodUnion.create;
            t.union = F;
            const B = ZodDiscriminatedUnion.create;
            t.discriminatedUnion = B;
            const K = ZodIntersection.create;
            t.intersection = K;
            const q = ZodTuple.create;
            t.tuple = q;
            const W = ZodRecord.create;
            t.record = W;
            const Y = ZodMap.create;
            t.map = Y;
            const J = ZodSet.create;
            t.set = J;
            const H = ZodFunction.create;
            t["function"] = H;
            const G = ZodLazy.create;
            t.lazy = G;
            const X = ZodLiteral.create;
            t.literal = X;
            const Q = ZodEnum.create;
            t["enum"] = Q;
            const ee = ZodNativeEnum.create;
            t.nativeEnum = ee;
            const te = ZodPromise.create;
            t.promise = te;
            const se = ZodEffects.create;
            t.effect = se;
            t.transformer = se;
            const re = ZodOptional.create;
            t.optional = re;
            const ae = ZodNullable.create;
            t.nullable = ae;
            const ne = ZodEffects.createWithPreprocess;
            t.preprocess = ne;
            const ie = ZodPipeline.create;
            t.pipeline = ie;
            const ostring = ()=>P().optional();
            t.ostring = ostring;
            const onumber = ()=>w().optional();
            t.onumber = onumber;
            const oboolean = ()=>A().optional();
            t.oboolean = oboolean;
            t.coerce = {
                string: (e)=>ZodString.create({
                        ...e,
                        coerce: true
                    }),
                number: (e)=>ZodNumber.create({
                        ...e,
                        coerce: true
                    }),
                boolean: (e)=>ZodBoolean.create({
                        ...e,
                        coerce: true
                    }),
                bigint: (e)=>ZodBigInt.create({
                        ...e,
                        coerce: true
                    }),
                date: (e)=>ZodDate.create({
                        ...e,
                        coerce: true
                    })
            };
            t.NEVER = i.INVALID;
        }
    };
    var t = {};
    function __nccwpck_require__(s) {
        var r = t[s];
        if (r !== undefined) {
            return r.exports;
        }
        var a = t[s] = {
            exports: {}
        };
        var n = true;
        try {
            e[s].call(a.exports, a, a.exports, __nccwpck_require__);
            n = false;
        } finally{
            if (n) delete t[s];
        }
        return a.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/zod") + "/";
    var s = __nccwpck_require__(629);
    module.exports = s;
})();
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/zod-validation-error/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    var r = {
        452: (r, e, o)=>{
            var t = Object.create;
            var s = Object.defineProperty;
            var n = Object.getOwnPropertyDescriptor;
            var i = Object.getOwnPropertyNames;
            var a = Object.getPrototypeOf;
            var u = Object.prototype.hasOwnProperty;
            var __export = (r, e)=>{
                for(var o in e)s(r, o, {
                    get: e[o],
                    enumerable: true
                });
            };
            var __copyProps = (r, e, o, t)=>{
                if (e && typeof e === "object" || typeof e === "function") {
                    for (let a of i(e))if (!u.call(r, a) && a !== o) s(r, a, {
                        get: ()=>e[a],
                        enumerable: !(t = n(e, a)) || t.enumerable
                    });
                }
                return r;
            };
            var __toESM = (r, e, o)=>(o = r != null ? t(a(r)) : {}, __copyProps(e || !r || !r.__esModule ? s(o, "default", {
                    value: r,
                    enumerable: true
                }) : o, r));
            var __toCommonJS = (r)=>__copyProps(s({}, "__esModule", {
                    value: true
                }), r);
            var d = {};
            __export(d, {
                ValidationError: ()=>c,
                createMessageBuilder: ()=>createMessageBuilder,
                errorMap: ()=>errorMap,
                fromError: ()=>fromError,
                fromZodError: ()=>fromZodError,
                fromZodIssue: ()=>fromZodIssue,
                isValidationError: ()=>isValidationError,
                isValidationErrorLike: ()=>isValidationErrorLike,
                isZodErrorLike: ()=>isZodErrorLike,
                toValidationError: ()=>toValidationError
            });
            r.exports = __toCommonJS(d);
            function isZodErrorLike(r) {
                return r instanceof Error && r.name === "ZodError" && "issues" in r && Array.isArray(r.issues);
            }
            var c = class extends Error {
                name;
                details;
                constructor(r, e){
                    super(r, e);
                    this.name = "ZodValidationError";
                    this.details = getIssuesFromErrorOptions(e);
                }
                toString() {
                    return this.message;
                }
            };
            function getIssuesFromErrorOptions(r) {
                if (r) {
                    const e = r.cause;
                    if (isZodErrorLike(e)) {
                        return e.issues;
                    }
                }
                return [];
            }
            function isValidationError(r) {
                return r instanceof c;
            }
            function isValidationErrorLike(r) {
                return r instanceof Error && r.name === "ZodValidationError";
            }
            var f = __toESM(o(788));
            var p = __toESM(o(788));
            function isNonEmptyArray(r) {
                return r.length !== 0;
            }
            var l = /[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*/u;
            function joinPath(r) {
                if (r.length === 1) {
                    return r[0].toString();
                }
                return r.reduce((r, e)=>{
                    if (typeof e === "number") {
                        return r + "[" + e.toString() + "]";
                    }
                    if (e.includes('"')) {
                        return r + '["' + escapeQuotes(e) + '"]';
                    }
                    if (!l.test(e)) {
                        return r + '["' + e + '"]';
                    }
                    const o = r.length === 0 ? "" : ".";
                    return r + o + e;
                }, "");
            }
            function escapeQuotes(r) {
                return r.replace(/"/g, '\\"');
            }
            var m = "; ";
            var g = 99;
            var E = "Validation error";
            var _ = ": ";
            var v = ", or ";
            function createMessageBuilder(r = {}) {
                const { issueSeparator: e = m, unionSeparator: o = v, prefixSeparator: t = _, prefix: s = E, includePath: n = true, maxIssuesInMessage: i = g } = r;
                return (r)=>{
                    const a = r.slice(0, i).map((r)=>getMessageFromZodIssue({
                            issue: r,
                            issueSeparator: e,
                            unionSeparator: o,
                            includePath: n
                        })).join(e);
                    return prefixMessage(a, s, t);
                };
            }
            function getMessageFromZodIssue(r) {
                const { issue: e, issueSeparator: o, unionSeparator: t, includePath: s } = r;
                if (e.code === p.ZodIssueCode.invalid_union) {
                    return e.unionErrors.reduce((r, e)=>{
                        const n = e.issues.map((r)=>getMessageFromZodIssue({
                                issue: r,
                                issueSeparator: o,
                                unionSeparator: t,
                                includePath: s
                            })).join(o);
                        if (!r.includes(n)) {
                            r.push(n);
                        }
                        return r;
                    }, []).join(t);
                }
                if (e.code === p.ZodIssueCode.invalid_arguments) {
                    return [
                        e.message,
                        ...e.argumentsError.issues.map((r)=>getMessageFromZodIssue({
                                issue: r,
                                issueSeparator: o,
                                unionSeparator: t,
                                includePath: s
                            }))
                    ].join(o);
                }
                if (e.code === p.ZodIssueCode.invalid_return_type) {
                    return [
                        e.message,
                        ...e.returnTypeError.issues.map((r)=>getMessageFromZodIssue({
                                issue: r,
                                issueSeparator: o,
                                unionSeparator: t,
                                includePath: s
                            }))
                    ].join(o);
                }
                if (s && isNonEmptyArray(e.path)) {
                    if (e.path.length === 1) {
                        const r = e.path[0];
                        if (typeof r === "number") {
                            return `${e.message} at index ${r}`;
                        }
                    }
                    return `${e.message} at "${joinPath(e.path)}"`;
                }
                return e.message;
            }
            function prefixMessage(r, e, o) {
                if (e !== null) {
                    if (r.length > 0) {
                        return [
                            e,
                            r
                        ].join(o);
                    }
                    return e;
                }
                if (r.length > 0) {
                    return r;
                }
                return E;
            }
            function fromZodIssue(r, e = {}) {
                const o = createMessageBuilderFromOptions(e);
                const t = o([
                    r
                ]);
                return new c(t, {
                    cause: new f.ZodError([
                        r
                    ])
                });
            }
            function createMessageBuilderFromOptions(r) {
                if ("messageBuilder" in r) {
                    return r.messageBuilder;
                }
                return createMessageBuilder(r);
            }
            var errorMap = (r, e)=>{
                const o = fromZodIssue({
                    ...r,
                    message: r.message ?? e.defaultError
                });
                return {
                    message: o.message
                };
            };
            function fromZodError(r, e = {}) {
                if (!isZodErrorLike(r)) {
                    throw new TypeError(`Invalid zodError param; expected instance of ZodError. Did you mean to use the "${fromError.name}" method instead?`);
                }
                return fromZodErrorWithoutRuntimeCheck(r, e);
            }
            function fromZodErrorWithoutRuntimeCheck(r, e = {}) {
                const o = r.errors;
                let t;
                if (isNonEmptyArray(o)) {
                    const r = createMessageBuilderFromOptions2(e);
                    t = r(o);
                } else {
                    t = r.message;
                }
                return new c(t, {
                    cause: r
                });
            }
            function createMessageBuilderFromOptions2(r) {
                if ("messageBuilder" in r) {
                    return r.messageBuilder;
                }
                return createMessageBuilder(r);
            }
            var toValidationError = (r = {})=>(e)=>{
                    if (isZodErrorLike(e)) {
                        return fromZodErrorWithoutRuntimeCheck(e, r);
                    }
                    if (e instanceof Error) {
                        return new c(e.message, {
                            cause: e
                        });
                    }
                    return new c("Unknown error");
                };
            function fromError(r, e = {}) {
                return toValidationError(e)(r);
            }
            0 && 0;
        },
        788: (r)=>{
            r.exports = __turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/zod/index.cjs [app-rsc] (ecmascript)");
        }
    };
    var e = {};
    function __nccwpck_require__(o) {
        var t = e[o];
        if (t !== undefined) {
            return t.exports;
        }
        var s = e[o] = {
            exports: {}
        };
        var n = true;
        try {
            r[o](s, s.exports, __nccwpck_require__);
            n = false;
        } finally{
            if (n) delete e[o];
        }
        return s.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/zod-validation-error") + "/";
    var o = __nccwpck_require__(452);
    module.exports = o;
})();
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/zod.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatZodError",
    ()=>formatZodError,
    "normalizeZodErrors",
    ()=>normalizeZodErrors,
    "reportZodError",
    ()=>reportZodError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/zod/index.cjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2d$validation$2d$error$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/zod-validation-error/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$output$2f$log$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/build/output/log.js [app-rsc] (ecmascript)");
;
;
;
function processZodErrorMessage(issue) {
    let message = issue.message;
    let path;
    if (issue.path.length > 0) {
        if (issue.path.length === 1) {
            const identifier = issue.path[0];
            if (typeof identifier === 'number') {
                // The first identifier inside path is a number
                path = `index ${identifier}`;
            } else {
                path = `"${identifier}"`;
            }
        } else {
            // joined path to be shown in the error message
            path = `"${issue.path.reduce((acc, cur)=>{
                if (typeof cur === 'number') {
                    // array index
                    return `${acc}[${cur}]`;
                }
                if (cur.includes('"')) {
                    // escape quotes
                    return `${acc}["${cur.replaceAll('"', '\\"')}"]`;
                }
                // dot notation
                const separator = acc.length === 0 ? '' : '.';
                return acc + separator + cur;
            }, '')}"`;
        }
    } else {
        path = '';
    }
    if (issue.code === 'invalid_type' && issue.received === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ZodParsedType"].undefined) {
        // Missing key in object.
        return `${path} is missing, expected ${issue.expected}`;
    }
    if (issue.code === 'invalid_enum_value') {
        // Remove "Invalid enum value" prefix from zod default error message
        return `Expected ${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["util"].joinValues(issue.options)}, received '${issue.received}' at ${path}`;
    }
    return message + (path ? ` at ${path}` : '');
}
function normalizeZodErrors(error) {
    return error.issues.flatMap((issue)=>{
        const issues = [
            {
                issue,
                message: processZodErrorMessage(issue)
            }
        ];
        if ('unionErrors' in issue) {
            for (const unionError of issue.unionErrors){
                issues.push(...normalizeZodErrors(unionError));
            }
        }
        return issues;
    });
}
function formatZodError(prefix, error) {
    return Object.defineProperty(new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2d$validation$2d$error$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fromZodError"])(error, {
        prefix: prefix
    }).toString()), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
}
function reportZodError(prefix, error) {
    __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$output$2f$log$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["error"](formatZodError(prefix, error).message);
} //# sourceMappingURL=zod.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/build/segment-config/app/app-segment-config.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppSegmentConfigSchemaKeys",
    ()=>AppSegmentConfigSchemaKeys,
    "parseAppSegmentConfig",
    ()=>parseAppSegmentConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/zod/index.cjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$zod$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/zod.js [app-rsc] (ecmascript)");
;
;
const CookieSchema = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string(),
    value: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string(),
    httpOnly: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].boolean().optional(),
    path: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional()
}).strict();
const RuntimeSampleSchema = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    cookies: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(CookieSchema).optional(),
    headers: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].tuple([
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string()
    ])).optional(),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string())
    ])).optional(),
    searchParams: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string()),
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].undefined()
    ])).optional()
}).strict();
const StaticPrefetchSchema = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    mode: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].literal('static'),
    from: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string()).optional(),
    expectUnableToVerify: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].boolean().optional()
}).strict();
const RuntimePrefetchSchema = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    mode: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].literal('runtime'),
    samples: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(RuntimeSampleSchema).min(1),
    from: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string()).optional(),
    expectUnableToVerify: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].boolean().optional()
}).strict();
const PrefetchSchema = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].discriminatedUnion('mode', [
    StaticPrefetchSchema,
    RuntimePrefetchSchema
]);
/**
 * The schema for configuration for a page.
 */ const AppSegmentConfigSchema = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    /**
   * The number of seconds to revalidate the page or false to disable revalidation.
   */ revalidate: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].number().int().nonnegative(),
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].literal(false)
    ]).optional(),
    /**
   * Whether the page supports dynamic parameters.
   */ dynamicParams: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].boolean().optional(),
    /**
   * The dynamic behavior of the page.
   */ dynamic: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].enum([
        'auto',
        'error',
        'force-static',
        'force-dynamic'
    ]).optional(),
    /**
   * The caching behavior of the page.
   */ fetchCache: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].enum([
        'auto',
        'default-cache',
        'only-cache',
        'force-cache',
        'force-no-store',
        'default-no-store',
        'only-no-store'
    ]).optional(),
    /**
   * How this segment should be prefetched.
   * (only applicable when `clientSegmentCache` is enabled)
   */ unstable_prefetch: PrefetchSchema.optional(),
    /**
   * The preferred region for the page.
   */ preferredRegion: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string())
    ]).optional(),
    /**
   * The runtime to use for the page.
   */ runtime: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].enum([
        'edge',
        'nodejs'
    ]).optional(),
    /**
   * The maximum duration for the page in seconds.
   */ maxDuration: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$zod$2f$index$2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].number().int().nonnegative().optional()
});
function parseAppSegmentConfig(data, route) {
    const parsed = AppSegmentConfigSchema.safeParse(data, {
        errorMap: (issue, ctx)=>{
            if (issue.path.length === 1) {
                switch(issue.path[0]){
                    case 'revalidate':
                        {
                            return {
                                message: `Invalid revalidate value ${JSON.stringify(ctx.data)} on "${route}", must be a non-negative number or false`
                            };
                        }
                    case 'unstable_prefetch':
                        {
                            return {
                                // @TODO replace this link with a link to the docs when they are written
                                message: `Invalid unstable_prefetch value ${JSON.stringify(ctx.data)} on "${route}", must be an object with a mode of "static" or "runtime". Read more at https://nextjs.org/docs/messages/invalid-prefetch-configuration`
                            };
                        }
                    default:
                }
            }
            return {
                message: ctx.defaultError
            };
        }
    });
    if (!parsed.success) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$zod$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatZodError"])(`Invalid segment configuration options detected for "${route}". Read more at https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config`, parsed.error);
    }
    return parsed.data;
}
const AppSegmentConfigSchemaKeys = AppSegmentConfigSchema.keyof().options; //# sourceMappingURL=app-segment-config.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/route-modules/checks.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAppPageRouteModule",
    ()=>isAppPageRouteModule,
    "isAppRouteRouteModule",
    ()=>isAppRouteRouteModule,
    "isPagesAPIRouteModule",
    ()=>isPagesAPIRouteModule,
    "isPagesRouteModule",
    ()=>isPagesRouteModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript)");
;
function isAppRouteRouteModule(routeModule) {
    return routeModule.definition.kind === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RouteKind"].APP_ROUTE;
}
function isAppPageRouteModule(routeModule) {
    return routeModule.definition.kind === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RouteKind"].APP_PAGE;
}
function isPagesRouteModule(routeModule) {
    return routeModule.definition.kind === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RouteKind"].PAGES;
}
function isPagesAPIRouteModule(routeModule) {
    return routeModule.definition.kind === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API;
} //# sourceMappingURL=checks.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * For a given page path, this function ensures that there is a leading slash.
 * If there is not a leading slash, one is added, otherwise it is noop.
 */ __turbopack_context__.s([
    "ensureLeadingSlash",
    ()=>ensureLeadingSlash
]);
function ensureLeadingSlash(path) {
    return path.startsWith('/') ? path : `/${path}`;
} //# sourceMappingURL=ensure-leading-slash.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeAppPath",
    ()=>normalizeAppPath,
    "normalizeRscURL",
    ()=>normalizeRscURL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$page$2d$path$2f$ensure$2d$leading$2d$slash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/segment.js [app-rsc] (ecmascript)");
;
;
function normalizeAppPath(route) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$page$2d$path$2f$ensure$2d$leading$2d$slash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureLeadingSlash"])(route.split('/').reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isGroupSegment"])(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === '@') {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === 'page' || segment === 'route') && index === segments.length - 1) {
            return pathname;
        }
        return `${pathname}/${segment}`;
    }, ''));
}
function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, '$1');
} //# sourceMappingURL=app-paths.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/interception-routes.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INTERCEPTION_ROUTE_MARKERS",
    ()=>INTERCEPTION_ROUTE_MARKERS,
    "extractInterceptionRouteInformation",
    ()=>extractInterceptionRouteInformation,
    "isInterceptionRouteAppPath",
    ()=>isInterceptionRouteAppPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [app-rsc] (ecmascript)");
;
const INTERCEPTION_ROUTE_MARKERS = [
    '(..)(..)',
    '(.)',
    '(..)',
    '(...)'
];
function isInterceptionRouteAppPath(path) {
    // TODO-APP: add more serious validation
    return path.split('/').find((segment)=>INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m))) !== undefined;
}
function extractInterceptionRouteInformation(path) {
    let interceptingRoute;
    let marker;
    let interceptedRoute;
    for (const segment of path.split('/')){
        marker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
        if (marker) {
            ;
            [interceptingRoute, interceptedRoute] = path.split(marker, 2);
            break;
        }
    }
    if (!interceptingRoute || !marker || !interceptedRoute) {
        throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
            value: "E269",
            enumerable: false,
            configurable: true
        });
    }
    interceptingRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAppPath"])(interceptingRoute) // normalize the path, e.g. /(blog)/feed -> /feed
    ;
    switch(marker){
        case '(.)':
            // (.) indicates that we should match with sibling routes, so we just need to append the intercepted route to the intercepting route
            if (interceptingRoute === '/') {
                interceptedRoute = `/${interceptedRoute}`;
            } else {
                interceptedRoute = interceptingRoute + '/' + interceptedRoute;
            }
            break;
        case '(..)':
            // (..) indicates that we should match at one level up, so we need to remove the last segment of the intercepting route
            if (interceptingRoute === '/') {
                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
                    value: "E207",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = interceptingRoute.split('/').slice(0, -1).concat(interceptedRoute).join('/');
            break;
        case '(...)':
            // (...) will match the route segment in the root directory, so we need to use the root directory to prepend the intercepted route
            interceptedRoute = '/' + interceptedRoute;
            break;
        case '(..)(..)':
            // (..)(..) indicates that we should match at two levels up, so we need to remove the last two segments of the intercepting route
            const splitInterceptingRoute = interceptingRoute.split('/');
            if (splitInterceptingRoute.length <= 2) {
                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
                    value: "E486",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join('/');
            break;
        default:
            throw Object.defineProperty(new Error('Invariant: unexpected marker'), "__NEXT_ERROR_CODE", {
                value: "E112",
                enumerable: false,
                configurable: true
            });
    }
    return {
        interceptingRoute,
        interceptedRoute
    };
} //# sourceMappingURL=interception-routes.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/get-segment-param.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getParamProperties",
    ()=>getParamProperties,
    "getSegmentParam",
    ()=>getSegmentParam,
    "isCatchAll",
    ()=>isCatchAll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/interception-routes.js [app-rsc] (ecmascript)");
;
function getSegmentParam(segment) {
    const interceptionMarker = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["INTERCEPTION_ROUTE_MARKERS"].find((marker)=>segment.startsWith(marker));
    // if an interception marker is part of the path segment, we need to jump ahead
    // to the relevant portion for param parsing
    if (interceptionMarker) {
        segment = segment.slice(interceptionMarker.length);
    }
    if (segment.startsWith('[[...') && segment.endsWith(']]')) {
        return {
            // TODO-APP: Optional catchall does not currently work with parallel routes,
            // so for now aren't handling a potential interception marker.
            type: 'optional-catchall',
            param: segment.slice(5, -2)
        };
    }
    if (segment.startsWith('[...') && segment.endsWith(']')) {
        return {
            type: interceptionMarker ? 'catchall-intercepted' : 'catchall',
            param: segment.slice(4, -1)
        };
    }
    if (segment.startsWith('[') && segment.endsWith(']')) {
        return {
            type: interceptionMarker ? 'dynamic-intercepted' : 'dynamic',
            param: segment.slice(1, -1)
        };
    }
    return null;
}
function isCatchAll(type) {
    return type === 'catchall' || type === 'catchall-intercepted' || type === 'optional-catchall';
}
function getParamProperties(paramType) {
    let repeat = false;
    let optional = false;
    switch(paramType){
        case 'catchall':
        case 'catchall-intercepted':
            repeat = true;
            break;
        case 'optional-catchall':
            repeat = true;
            optional = true;
            break;
        case 'dynamic':
        case 'dynamic-intercepted':
            break;
        default:
            paramType;
    }
    return {
        repeat,
        optional
    };
} //# sourceMappingURL=get-segment-param.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/build/static-paths/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Encodes a parameter value using the provided encoder.
 *
 * @param value - The value to encode.
 * @param encoder - The encoder to use.
 * @returns The encoded value.
 */ __turbopack_context__.s([
    "createFallbackRouteParam",
    ()=>createFallbackRouteParam,
    "encodeParam",
    ()=>encodeParam,
    "normalizePathname",
    ()=>normalizePathname
]);
function encodeParam(value, encoder) {
    let replaceValue;
    if (Array.isArray(value)) {
        replaceValue = value.map(encoder).join('/');
    } else {
        replaceValue = encoder(value);
    }
    return replaceValue;
}
function normalizePathname(pathname) {
    return pathname.replace(/\\/g, '/').replace(/(?!^)\/$/, '');
}
function createFallbackRouteParam(paramName, paramType, isParallelRouteParam) {
    return {
        paramName,
        paramType,
        isParallelRouteParam
    };
} //# sourceMappingURL=utils.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/build/segment-config/app/app-segments.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "collectFallbackRouteParams",
    ()=>collectFallbackRouteParams,
    "collectSegments",
    ()=>collectSegments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$segment$2d$config$2f$app$2f$app$2d$segment$2d$config$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/build/segment-config/app/app-segment-config.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$checks$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/route-modules/checks.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$client$2d$and$2d$server$2d$references$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/client-and-server-references.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/get-segment-param.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$app$2d$dir$2d$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/app-dir-module.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/segment.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$static$2d$paths$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/build/static-paths/utils.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * Parses the app config and attaches it to the segment.
 */ function attach(segment, userland, route) {
    // If the userland is not an object, then we can't do anything with it.
    if (typeof userland !== 'object' || userland === null) {
        return;
    }
    // Try to parse the application configuration.
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$segment$2d$config$2f$app$2f$app$2d$segment$2d$config$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseAppSegmentConfig"])(userland, route);
    // If there was any keys on the config, then attach it to the segment.
    if (Object.keys(config).length > 0) {
        segment.config = config;
    }
    if ('generateStaticParams' in userland && typeof userland.generateStaticParams === 'function') {
        var _segment_config;
        segment.generateStaticParams = userland.generateStaticParams;
        // Validate that `generateStaticParams` makes sense in this context.
        if (((_segment_config = segment.config) == null ? void 0 : _segment_config.runtime) === 'edge') {
            throw Object.defineProperty(new Error('Edge runtime is not supported with `generateStaticParams`.'), "__NEXT_ERROR_CODE", {
                value: "E502",
                enumerable: false,
                configurable: true
            });
        }
    }
}
/**
 * Walks the loader tree and collects the generate parameters for each segment.
 *
 * @param routeModule the app page route module
 * @returns the segments for the app page route module
 */ async function collectAppPageSegments(routeModule) {
    // We keep track of unique segments, since with parallel routes, it's possible
    // to see the same segment multiple times.
    const uniqueSegments = new Map();
    const queue = [
        [
            routeModule.userland.loaderTree,
            [],
            false
        ]
    ];
    while(queue.length > 0){
        const [loaderTree, currentSegments, isParallelRouteSegment] = queue.shift();
        const [name, parallelRoutes] = loaderTree;
        // Process current node
        const { mod: userland, filePath } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$app$2d$dir$2d$module$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLayoutOrPageModule"])(loaderTree);
        const isClientComponent = userland && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$client$2d$and$2d$server$2d$references$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isClientReference"])(userland);
        const { param: paramName, type: paramType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSegmentParam"])(name) ?? {};
        const segment = {
            name,
            paramName,
            paramType,
            filePath,
            config: undefined,
            isDynamicSegment: !!paramName,
            generateStaticParams: undefined,
            isParallelRouteSegment
        };
        // Only server components can have app segment configurations
        if (!isClientComponent) {
            attach(segment, userland, routeModule.definition.pathname);
        }
        // Create a unique key for the segment
        const segmentKey = getSegmentKey(segment);
        if (!uniqueSegments.has(segmentKey)) {
            uniqueSegments.set(segmentKey, segment);
        }
        const updatedSegments = [
            ...currentSegments,
            segment
        ];
        // If this is a page segment, we've reached a leaf node
        if (name === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PAGE_SEGMENT_KEY"]) {
            // Add all segments in the current path, preferring non-parallel segments
            updatedSegments.forEach((seg)=>{
                const key = getSegmentKey(seg);
                if (!uniqueSegments.has(key)) {
                    uniqueSegments.set(key, seg);
                }
            });
        }
        // Add all parallel routes to the queue
        for(const parallelRouteKey in parallelRoutes){
            const parallelRoute = parallelRoutes[parallelRouteKey];
            queue.push([
                parallelRoute,
                updatedSegments,
                // A parallel route segment is one that descends from a segment that is
                // not children or descends from a parallel route segment.
                isParallelRouteSegment || parallelRouteKey !== 'children'
            ]);
        }
    }
    return Array.from(uniqueSegments.values());
}
function getSegmentKey(segment) {
    return `${segment.name}-${segment.filePath ?? ''}-${segment.paramName ?? ''}-${segment.isParallelRouteSegment ? 'pr' : 'np'}`;
}
/**
 * Collects the segments for a given app route module.
 *
 * @param routeModule the app route module
 * @returns the segments for the app route module
 */ function collectAppRouteSegments(routeModule) {
    // Get the pathname parts, slice off the first element (which is empty).
    const parts = routeModule.definition.pathname.split('/').slice(1);
    if (parts.length === 0) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"]('Expected at least one segment'), "__NEXT_ERROR_CODE", {
            value: "E580",
            enumerable: false,
            configurable: true
        });
    }
    // Generate all the segments.
    const segments = parts.map((name)=>{
        const { param: paramName, type: paramType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSegmentParam"])(name) ?? {};
        return {
            name,
            paramName,
            paramType,
            filePath: undefined,
            isDynamicSegment: !!paramName,
            config: undefined,
            generateStaticParams: undefined,
            isParallelRouteSegment: undefined
        };
    });
    // We know we have at least one, we verified this above. We should get the
    // last segment which represents the root route module.
    const segment = segments[segments.length - 1];
    segment.filePath = routeModule.definition.filename;
    // Extract the segment config from the userland module.
    attach(segment, routeModule.userland, routeModule.definition.pathname);
    return segments;
}
function collectSegments(routeModule) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$checks$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAppRouteRouteModule"])(routeModule)) {
        return collectAppRouteSegments(routeModule);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$checks$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAppPageRouteModule"])(routeModule)) {
        return collectAppPageSegments(routeModule);
    }
    throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"]('Expected a route module to be one of app route or page'), "__NEXT_ERROR_CODE", {
        value: "E568",
        enumerable: false,
        configurable: true
    });
}
function collectFallbackRouteParams(routeModule) {
    const uniqueSegments = new Map();
    const queue = [
        [
            routeModule.userland.loaderTree,
            false
        ]
    ];
    while(queue.length > 0){
        const [loaderTree, isParallelRouteSegment] = queue.shift();
        const [name, parallelRoutes] = loaderTree;
        // Handle this segment (if it's a dynamic segment param).
        const segmentParam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSegmentParam"])(name);
        if (segmentParam) {
            const key = `${name}-${segmentParam.param}-${isParallelRouteSegment ? 'pr' : 'np'}`;
            if (!uniqueSegments.has(key)) {
                uniqueSegments.set(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$static$2d$paths$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createFallbackRouteParam"])(segmentParam.param, segmentParam.type, isParallelRouteSegment));
            }
        }
        // Add all of this segment's parallel routes to the queue.
        for(const parallelRouteKey in parallelRoutes){
            const parallelRoute = parallelRoutes[parallelRouteKey];
            queue.push([
                parallelRoute,
                // A parallel route segment is one that descends from a segment that is
                // not children or descends from a parallel route segment.
                isParallelRouteSegment || parallelRouteKey !== 'children'
            ]);
        }
    }
    return Array.from(uniqueSegments.values());
} //# sourceMappingURL=app-segments.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Web vitals provided to _app.reportWebVitals by Core Web Vitals plugin developed by Google Chrome team.
 * https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting
 */ __turbopack_context__.s([
    "DecodeError",
    ()=>DecodeError,
    "MiddlewareNotFoundError",
    ()=>MiddlewareNotFoundError,
    "MissingStaticPage",
    ()=>MissingStaticPage,
    "NormalizeError",
    ()=>NormalizeError,
    "PageNotFoundError",
    ()=>PageNotFoundError,
    "SP",
    ()=>SP,
    "ST",
    ()=>ST,
    "WEB_VITALS",
    ()=>WEB_VITALS,
    "execOnce",
    ()=>execOnce,
    "getDisplayName",
    ()=>getDisplayName,
    "getLocationOrigin",
    ()=>getLocationOrigin,
    "getURL",
    ()=>getURL,
    "isAbsoluteUrl",
    ()=>isAbsoluteUrl,
    "isResSent",
    ()=>isResSent,
    "loadGetInitialProps",
    ()=>loadGetInitialProps,
    "normalizeRepeatedSlashes",
    ()=>normalizeRepeatedSlashes,
    "stringifyError",
    ()=>stringifyError
]);
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/path-to-regexp/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/path-to-regexp") + "/";
    var e = {};
    (()=>{
        var n = e;
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.pathToRegexp = n.tokensToRegexp = n.regexpToFunction = n.match = n.tokensToFunction = n.compile = n.parse = void 0;
        function lexer(e) {
            var n = [];
            var r = 0;
            while(r < e.length){
                var t = e[r];
                if (t === "*" || t === "+" || t === "?") {
                    n.push({
                        type: "MODIFIER",
                        index: r,
                        value: e[r++]
                    });
                    continue;
                }
                if (t === "\\") {
                    n.push({
                        type: "ESCAPED_CHAR",
                        index: r++,
                        value: e[r++]
                    });
                    continue;
                }
                if (t === "{") {
                    n.push({
                        type: "OPEN",
                        index: r,
                        value: e[r++]
                    });
                    continue;
                }
                if (t === "}") {
                    n.push({
                        type: "CLOSE",
                        index: r,
                        value: e[r++]
                    });
                    continue;
                }
                if (t === ":") {
                    var a = "";
                    var i = r + 1;
                    while(i < e.length){
                        var o = e.charCodeAt(i);
                        if (o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122 || o === 95) {
                            a += e[i++];
                            continue;
                        }
                        break;
                    }
                    if (!a) throw new TypeError("Missing parameter name at ".concat(r));
                    n.push({
                        type: "NAME",
                        index: r,
                        value: a
                    });
                    r = i;
                    continue;
                }
                if (t === "(") {
                    var c = 1;
                    var f = "";
                    var i = r + 1;
                    if (e[i] === "?") {
                        throw new TypeError('Pattern cannot start with "?" at '.concat(i));
                    }
                    while(i < e.length){
                        if (e[i] === "\\") {
                            f += e[i++] + e[i++];
                            continue;
                        }
                        if (e[i] === ")") {
                            c--;
                            if (c === 0) {
                                i++;
                                break;
                            }
                        } else if (e[i] === "(") {
                            c++;
                            if (e[i + 1] !== "?") {
                                throw new TypeError("Capturing groups are not allowed at ".concat(i));
                            }
                        }
                        f += e[i++];
                    }
                    if (c) throw new TypeError("Unbalanced pattern at ".concat(r));
                    if (!f) throw new TypeError("Missing pattern at ".concat(r));
                    n.push({
                        type: "PATTERN",
                        index: r,
                        value: f
                    });
                    r = i;
                    continue;
                }
                n.push({
                    type: "CHAR",
                    index: r,
                    value: e[r++]
                });
            }
            n.push({
                type: "END",
                index: r,
                value: ""
            });
            return n;
        }
        function parse(e, n) {
            if (n === void 0) {
                n = {};
            }
            var r = lexer(e);
            var t = n.prefixes, a = t === void 0 ? "./" : t, i = n.delimiter, o = i === void 0 ? "/#?" : i;
            var c = [];
            var f = 0;
            var u = 0;
            var p = "";
            var tryConsume = function(e) {
                if (u < r.length && r[u].type === e) return r[u++].value;
            };
            var mustConsume = function(e) {
                var n = tryConsume(e);
                if (n !== undefined) return n;
                var t = r[u], a = t.type, i = t.index;
                throw new TypeError("Unexpected ".concat(a, " at ").concat(i, ", expected ").concat(e));
            };
            var consumeText = function() {
                var e = "";
                var n;
                while(n = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")){
                    e += n;
                }
                return e;
            };
            var isSafe = function(e) {
                for(var n = 0, r = o; n < r.length; n++){
                    var t = r[n];
                    if (e.indexOf(t) > -1) return true;
                }
                return false;
            };
            var safePattern = function(e) {
                var n = c[c.length - 1];
                var r = e || (n && typeof n === "string" ? n : "");
                if (n && !r) {
                    throw new TypeError('Must have text between two parameters, missing text after "'.concat(n.name, '"'));
                }
                if (!r || isSafe(r)) return "[^".concat(escapeString(o), "]+?");
                return "(?:(?!".concat(escapeString(r), ")[^").concat(escapeString(o), "])+?");
            };
            while(u < r.length){
                var v = tryConsume("CHAR");
                var s = tryConsume("NAME");
                var d = tryConsume("PATTERN");
                if (s || d) {
                    var g = v || "";
                    if (a.indexOf(g) === -1) {
                        p += g;
                        g = "";
                    }
                    if (p) {
                        c.push(p);
                        p = "";
                    }
                    c.push({
                        name: s || f++,
                        prefix: g,
                        suffix: "",
                        pattern: d || safePattern(g),
                        modifier: tryConsume("MODIFIER") || ""
                    });
                    continue;
                }
                var x = v || tryConsume("ESCAPED_CHAR");
                if (x) {
                    p += x;
                    continue;
                }
                if (p) {
                    c.push(p);
                    p = "";
                }
                var h = tryConsume("OPEN");
                if (h) {
                    var g = consumeText();
                    var l = tryConsume("NAME") || "";
                    var m = tryConsume("PATTERN") || "";
                    var T = consumeText();
                    mustConsume("CLOSE");
                    c.push({
                        name: l || (m ? f++ : ""),
                        pattern: l && !m ? safePattern(g) : m,
                        prefix: g,
                        suffix: T,
                        modifier: tryConsume("MODIFIER") || ""
                    });
                    continue;
                }
                mustConsume("END");
            }
            return c;
        }
        n.parse = parse;
        function compile(e, n) {
            return tokensToFunction(parse(e, n), n);
        }
        n.compile = compile;
        function tokensToFunction(e, n) {
            if (n === void 0) {
                n = {};
            }
            var r = flags(n);
            var t = n.encode, a = t === void 0 ? function(e) {
                return e;
            } : t, i = n.validate, o = i === void 0 ? true : i;
            var c = e.map(function(e) {
                if (typeof e === "object") {
                    return new RegExp("^(?:".concat(e.pattern, ")$"), r);
                }
            });
            return function(n) {
                var r = "";
                for(var t = 0; t < e.length; t++){
                    var i = e[t];
                    if (typeof i === "string") {
                        r += i;
                        continue;
                    }
                    var f = n ? n[i.name] : undefined;
                    var u = i.modifier === "?" || i.modifier === "*";
                    var p = i.modifier === "*" || i.modifier === "+";
                    if (Array.isArray(f)) {
                        if (!p) {
                            throw new TypeError('Expected "'.concat(i.name, '" to not repeat, but got an array'));
                        }
                        if (f.length === 0) {
                            if (u) continue;
                            throw new TypeError('Expected "'.concat(i.name, '" to not be empty'));
                        }
                        for(var v = 0; v < f.length; v++){
                            var s = a(f[v], i);
                            if (o && !c[t].test(s)) {
                                throw new TypeError('Expected all "'.concat(i.name, '" to match "').concat(i.pattern, '", but got "').concat(s, '"'));
                            }
                            r += i.prefix + s + i.suffix;
                        }
                        continue;
                    }
                    if (typeof f === "string" || typeof f === "number") {
                        var s = a(String(f), i);
                        if (o && !c[t].test(s)) {
                            throw new TypeError('Expected "'.concat(i.name, '" to match "').concat(i.pattern, '", but got "').concat(s, '"'));
                        }
                        r += i.prefix + s + i.suffix;
                        continue;
                    }
                    if (u) continue;
                    var d = p ? "an array" : "a string";
                    throw new TypeError('Expected "'.concat(i.name, '" to be ').concat(d));
                }
                return r;
            };
        }
        n.tokensToFunction = tokensToFunction;
        function match(e, n) {
            var r = [];
            var t = pathToRegexp(e, r, n);
            return regexpToFunction(t, r, n);
        }
        n.match = match;
        function regexpToFunction(e, n, r) {
            if (r === void 0) {
                r = {};
            }
            var t = r.decode, a = t === void 0 ? function(e) {
                return e;
            } : t;
            return function(r) {
                var t = e.exec(r);
                if (!t) return false;
                var i = t[0], o = t.index;
                var c = Object.create(null);
                var _loop_1 = function(e) {
                    if (t[e] === undefined) return "continue";
                    var r = n[e - 1];
                    if (r.modifier === "*" || r.modifier === "+") {
                        c[r.name] = t[e].split(r.prefix + r.suffix).map(function(e) {
                            return a(e, r);
                        });
                    } else {
                        c[r.name] = a(t[e], r);
                    }
                };
                for(var f = 1; f < t.length; f++){
                    _loop_1(f);
                }
                return {
                    path: i,
                    index: o,
                    params: c
                };
            };
        }
        n.regexpToFunction = regexpToFunction;
        function escapeString(e) {
            return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
        }
        function flags(e) {
            return e && e.sensitive ? "" : "i";
        }
        function regexpToRegexp(e, n) {
            if (!n) return e;
            var r = /\((?:\?<(.*?)>)?(?!\?)/g;
            var t = 0;
            var a = r.exec(e.source);
            while(a){
                n.push({
                    name: a[1] || t++,
                    prefix: "",
                    suffix: "",
                    modifier: "",
                    pattern: ""
                });
                a = r.exec(e.source);
            }
            return e;
        }
        function arrayToRegexp(e, n, r) {
            var t = e.map(function(e) {
                return pathToRegexp(e, n, r).source;
            });
            return new RegExp("(?:".concat(t.join("|"), ")"), flags(r));
        }
        function stringToRegexp(e, n, r) {
            return tokensToRegexp(parse(e, r), n, r);
        }
        function tokensToRegexp(e, n, r) {
            if (r === void 0) {
                r = {};
            }
            var t = r.strict, a = t === void 0 ? false : t, i = r.start, o = i === void 0 ? true : i, c = r.end, f = c === void 0 ? true : c, u = r.encode, p = u === void 0 ? function(e) {
                return e;
            } : u, v = r.delimiter, s = v === void 0 ? "/#?" : v, d = r.endsWith, g = d === void 0 ? "" : d;
            var x = "[".concat(escapeString(g), "]|$");
            var h = "[".concat(escapeString(s), "]");
            var l = o ? "^" : "";
            for(var m = 0, T = e; m < T.length; m++){
                var E = T[m];
                if (typeof E === "string") {
                    l += escapeString(p(E));
                } else {
                    var w = escapeString(p(E.prefix));
                    var y = escapeString(p(E.suffix));
                    if (E.pattern) {
                        if (n) n.push(E);
                        if (w || y) {
                            if (E.modifier === "+" || E.modifier === "*") {
                                var R = E.modifier === "*" ? "?" : "";
                                l += "(?:".concat(w, "((?:").concat(E.pattern, ")(?:").concat(y).concat(w, "(?:").concat(E.pattern, "))*)").concat(y, ")").concat(R);
                            } else {
                                l += "(?:".concat(w, "(").concat(E.pattern, ")").concat(y, ")").concat(E.modifier);
                            }
                        } else {
                            if (E.modifier === "+" || E.modifier === "*") {
                                throw new TypeError('Can not repeat "'.concat(E.name, '" without a prefix and suffix'));
                            }
                            l += "(".concat(E.pattern, ")").concat(E.modifier);
                        }
                    } else {
                        l += "(?:".concat(w).concat(y, ")").concat(E.modifier);
                    }
                }
            }
            if (f) {
                if (!a) l += "".concat(h, "?");
                l += !r.endsWith ? "$" : "(?=".concat(x, ")");
            } else {
                var A = e[e.length - 1];
                var _ = typeof A === "string" ? h.indexOf(A[A.length - 1]) > -1 : A === undefined;
                if (!a) {
                    l += "(?:".concat(h, "(?=").concat(x, "))?");
                }
                if (!_) {
                    l += "(?=".concat(h, "|").concat(x, ")");
                }
            }
            return new RegExp(l, flags(r));
        }
        n.tokensToRegexp = tokensToRegexp;
        function pathToRegexp(e, n, r) {
            if (e instanceof RegExp) return regexpToRegexp(e, n);
            if (Array.isArray(e)) return arrayToRegexp(e, n, r);
            return stringToRegexp(e, n, r);
        }
        n.pathToRegexp = pathToRegexp;
    })();
    module.exports = e;
})();
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/route-pattern-normalizer.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Route pattern normalization utilities for path-to-regexp compatibility.
 *
 * path-to-regexp 6.3.0+ introduced stricter validation that rejects certain
 * patterns commonly used in Next.js interception routes. This module provides
 * normalization functions to make Next.js route patterns compatible with the
 * updated library while preserving all functionality.
 */ /**
 * Internal separator used to normalize adjacent parameter patterns.
 * This unique marker is inserted between adjacent parameters and stripped out
 * during parameter extraction to avoid conflicts with real URL content.
 */ __turbopack_context__.s([
    "PARAM_SEPARATOR",
    ()=>PARAM_SEPARATOR,
    "hasAdjacentParameterIssues",
    ()=>hasAdjacentParameterIssues,
    "normalizeAdjacentParameters",
    ()=>normalizeAdjacentParameters,
    "normalizeTokensForRegexp",
    ()=>normalizeTokensForRegexp,
    "stripNormalizedSeparators",
    ()=>stripNormalizedSeparators,
    "stripParameterSeparators",
    ()=>stripParameterSeparators
]);
const PARAM_SEPARATOR = '_NEXTSEP_';
function hasAdjacentParameterIssues(route) {
    if (typeof route !== 'string') return false;
    // Check for interception route markers followed immediately by parameters
    // Pattern: /(.):param, /(..):param, /(...):param, /(.)(.):param etc.
    // These patterns cause "Must have text between two parameters" errors
    if (/\/\(\.{1,3}\):[^/\s]+/.test(route)) {
        return true;
    }
    // Check for basic adjacent parameters without separators
    // Pattern: :param1:param2 (but not :param* or other URL patterns)
    if (/:[a-zA-Z_][a-zA-Z0-9_]*:[a-zA-Z_][a-zA-Z0-9_]*/.test(route)) {
        return true;
    }
    return false;
}
function normalizeAdjacentParameters(route) {
    let normalized = route;
    // Handle interception route patterns: (.):param -> (.)_NEXTSEP_:param
    normalized = normalized.replace(/(\([^)]*\)):([^/\s]+)/g, `$1${PARAM_SEPARATOR}:$2`);
    // Handle other adjacent parameter patterns: :param1:param2 -> :param1_NEXTSEP_:param2
    normalized = normalized.replace(/:([^:/\s)]+)(?=:)/g, `:$1${PARAM_SEPARATOR}`);
    return normalized;
}
function normalizeTokensForRegexp(tokens) {
    return tokens.map((token)=>{
        // Token union type: Token = string | TokenObject
        // Literal path segments are strings, parameters/wildcards are objects
        if (typeof token === 'object' && token !== null && // Not all token objects have 'modifier' property (e.g., simple text tokens)
        'modifier' in token && // Only repeating modifiers (* or +) cause the validation error
        // Other modifiers like '?' (optional) are fine
        (token.modifier === '*' || token.modifier === '+') && // Token objects can have different shapes depending on route pattern
        'prefix' in token && 'suffix' in token && // Both prefix and suffix must be empty strings
        // This is what causes the validation error in path-to-regexp
        token.prefix === '' && token.suffix === '') {
            // Add minimal prefix to satisfy path-to-regexp validation
            // We use '/' as it's the most common path delimiter and won't break route matching
            // The prefix gets used in regex generation but doesn't affect parameter extraction
            return {
                ...token,
                prefix: '/'
            };
        }
        return token;
    });
}
function stripNormalizedSeparators(pathname) {
    // Remove separator after interception route markers
    // Pattern: (.)_NEXTSEP_ -> (.), (..)_NEXTSEP_ -> (..), etc.
    // The separator appears after the closing paren of interception markers
    return pathname.replace(new RegExp(`\\)${PARAM_SEPARATOR}`, 'g'), ')');
}
function stripParameterSeparators(params) {
    const cleaned = {};
    for (const [key, value] of Object.entries(params)){
        if (typeof value === 'string') {
            // Remove the separator if it appears at the start of parameter values
            cleaned[key] = value.replace(new RegExp(`^${PARAM_SEPARATOR}`), '');
        } else if (Array.isArray(value)) {
            // Handle array parameters (from repeated route segments)
            cleaned[key] = value.map((item)=>typeof item === 'string' ? item.replace(new RegExp(`^${PARAM_SEPARATOR}`), '') : item);
        } else {
            cleaned[key] = value;
        }
    }
    return cleaned;
} //# sourceMappingURL=route-pattern-normalizer.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/route-match-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Client-safe utilities for route matching that don't import server-side
 * utilities to avoid bundling issues with Turbopack
 */ __turbopack_context__.s([
    "safeCompile",
    ()=>safeCompile,
    "safePathToRegexp",
    ()=>safePathToRegexp,
    "safeRegexpToFunction",
    ()=>safeRegexpToFunction,
    "safeRouteMatcher",
    ()=>safeRouteMatcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$to$2d$regexp$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/path-to-regexp/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/route-pattern-normalizer.js [app-rsc] (ecmascript)");
;
;
function safePathToRegexp(route, keys, options) {
    if (typeof route !== 'string') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$to$2d$regexp$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pathToRegexp"])(route, keys, options);
    }
    // Check if normalization is needed and cache the result
    const needsNormalization = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasAdjacentParameterIssues"])(route);
    const routeToUse = needsNormalization ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAdjacentParameters"])(route) : route;
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$to$2d$regexp$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pathToRegexp"])(routeToUse, keys, options);
    } catch (error) {
        // Only try normalization if we haven't already normalized
        if (!needsNormalization) {
            try {
                const normalizedRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAdjacentParameters"])(route);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$to$2d$regexp$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pathToRegexp"])(normalizedRoute, keys, options);
            } catch (retryError) {
                // If that doesn't work, fall back to original error
                throw error;
            }
        }
        throw error;
    }
}
function safeCompile(route, options) {
    // Check if normalization is needed and cache the result
    const needsNormalization = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasAdjacentParameterIssues"])(route);
    const routeToUse = needsNormalization ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAdjacentParameters"])(route) : route;
    try {
        const compiler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$to$2d$regexp$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["compile"])(routeToUse, options);
        // If we normalized the route, wrap the compiler to strip separators from output
        // The normalization inserts _NEXTSEP_ as a literal string in the pattern to satisfy
        // path-to-regexp validation, but we don't want it in the final compiled URL
        if (needsNormalization) {
            return (params)=>{
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripNormalizedSeparators"])(compiler(params));
            };
        }
        return compiler;
    } catch (error) {
        // Only try normalization if we haven't already normalized
        if (!needsNormalization) {
            try {
                const normalizedRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAdjacentParameters"])(route);
                const compiler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$to$2d$regexp$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["compile"])(normalizedRoute, options);
                // Wrap the compiler to strip separators from output
                return (params)=>{
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripNormalizedSeparators"])(compiler(params));
                };
            } catch (retryError) {
                // If that doesn't work, fall back to original error
                throw error;
            }
        }
        throw error;
    }
}
function safeRegexpToFunction(regexp, keys) {
    const originalMatcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$to$2d$regexp$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["regexpToFunction"])(regexp, keys || []);
    return (pathname)=>{
        const result = originalMatcher(pathname);
        if (!result) return false;
        // Clean parameters before returning
        return {
            ...result,
            params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripParameterSeparators"])(result.params)
        };
    };
}
function safeRouteMatcher(matcherFn) {
    return (pathname)=>{
        const result = matcherFn(pathname);
        if (!result) return false;
        // Clean parameters before returning
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$route$2d$pattern$2d$normalizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripParameterSeparators"])(result);
    };
} //# sourceMappingURL=route-match-utils.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/route-matcher.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRouteMatcher",
    ()=>getRouteMatcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$route$2d$match$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/route-match-utils.js [app-rsc] (ecmascript)");
;
;
function getRouteMatcher({ re, groups }) {
    const rawMatcher = (pathname)=>{
        const routeMatch = re.exec(pathname);
        if (!routeMatch) return false;
        const decode = (param)=>{
            try {
                return decodeURIComponent(param);
            } catch  {
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DecodeError"]('failed to decode param'), "__NEXT_ERROR_CODE", {
                    value: "E528",
                    enumerable: false,
                    configurable: true
                });
            }
        };
        const params = {};
        for (const [key, group] of Object.entries(groups)){
            const match = routeMatch[group.pos];
            if (match !== undefined) {
                if (group.repeat) {
                    params[key] = match.split('/').map((entry)=>decode(entry));
                } else {
                    params[key] = decode(match);
                }
            }
        }
        return params;
    };
    // Wrap with safe matcher to handle parameter cleaning
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$route$2d$match$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeRouteMatcher"])(rawMatcher);
} //# sourceMappingURL=route-matcher.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/escape-regexp.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// regexp is based on https://github.com/sindresorhus/escape-string-regexp
__turbopack_context__.s([
    "escapeStringRegexp",
    ()=>escapeStringRegexp
]);
const reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
const reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;
function escapeStringRegexp(str) {
    // see also: https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/escapeRegExp.js#L23
    if (reHasRegExp.test(str)) {
        return str.replace(reReplaceRegExp, '\\$&');
    }
    return str;
} //# sourceMappingURL=escape-regexp.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/parse-loader-tree.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseLoaderTree",
    ()=>parseLoaderTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/segment.js [app-rsc] (ecmascript)");
;
function parseLoaderTree(tree) {
    const [segment, parallelRoutes, modules] = tree;
    const { layout, template } = modules;
    let { page } = modules;
    // a __DEFAULT__ segment means that this route didn't match any of the
    // segments in the route, so we should use the default page
    page = segment === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_KEY"] ? modules.defaultPage : page;
    const conventionPath = layout?.[1] || template?.[1] || page?.[1];
    return {
        page,
        segment,
        modules,
        /* it can be either layout / template / page */ conventionPath,
        parallelRoutes
    };
} //# sourceMappingURL=parse-loader-tree.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/get-dynamic-param.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PARAMETER_PATTERN",
    ()=>PARAMETER_PATTERN,
    "getDynamicParam",
    ()=>getDynamicParam,
    "interpolateParallelRouteParams",
    ()=>interpolateParallelRouteParams,
    "parseMatchedParameter",
    ()=>parseMatchedParameter,
    "parseParameter",
    ()=>parseParameter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$loader$2d$tree$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/parse-loader-tree.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/get-segment-param.js [app-rsc] (ecmascript)");
;
;
;
/**
 * Gets the value of a param from the params object. This correctly handles the
 * case where the param is a fallback route param and encodes the resulting
 * value.
 *
 * @param interpolatedParams - The params object.
 * @param segmentKey - The key of the segment.
 * @param fallbackRouteParams - The fallback route params.
 * @returns The value of the param.
 */ function getParamValue(interpolatedParams, segmentKey, fallbackRouteParams) {
    let value = interpolatedParams[segmentKey];
    if (fallbackRouteParams?.has(segmentKey)) {
        // We know that the fallback route params has the segment key because we
        // checked that above.
        const [searchValue] = fallbackRouteParams.get(segmentKey);
        value = searchValue;
    } else if (Array.isArray(value)) {
        value = value.map((i)=>encodeURIComponent(i));
    } else if (typeof value === 'string') {
        value = encodeURIComponent(value);
    }
    return value;
}
function interpolateParallelRouteParams(loaderTree, params, pagePath, fallbackRouteParams) {
    const interpolated = structuredClone(params);
    // Stack-based traversal with depth tracking
    const stack = [
        {
            tree: loaderTree,
            depth: 0
        }
    ];
    // Derive value from pagePath based on depth and parameter type
    const pathSegments = pagePath.split('/').slice(1) // Remove first empty string
    ;
    while(stack.length > 0){
        const { tree, depth } = stack.pop();
        const { segment, parallelRoutes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$loader$2d$tree$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseLoaderTree"])(tree);
        // Check if current segment contains a parameter
        const segmentParam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSegmentParam"])(segment);
        if (segmentParam && !interpolated.hasOwnProperty(segmentParam.param) && // If the param is in the fallback route params, we don't need to
        // interpolate it because it's already marked as being unknown.
        !fallbackRouteParams?.has(segmentParam.param)) {
            switch(segmentParam.type){
                case 'catchall':
                case 'optional-catchall':
                case 'catchall-intercepted':
                    // For catchall parameters, take all remaining segments from this depth
                    const remainingSegments = pathSegments.slice(depth);
                    // Process each segment to handle any dynamic params
                    const processedSegments = remainingSegments.flatMap((pathSegment)=>{
                        const param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSegmentParam"])(pathSegment);
                        // If the segment matches a param, return the param value otherwise,
                        // it's a static segment, so just return that. We don't use the
                        // `getParamValue` function here because we don't want the values to
                        // be encoded, that's handled on get by the `getDynamicParam`
                        // function.
                        return param ? interpolated[param.param] : pathSegment;
                    }).filter((s)=>s !== undefined);
                    if (processedSegments.length > 0) {
                        interpolated[segmentParam.param] = processedSegments;
                    }
                    break;
                case 'dynamic':
                case 'dynamic-intercepted':
                    // For regular dynamic parameters, take the segment at this depth
                    if (depth < pathSegments.length) {
                        const pathSegment = pathSegments[depth];
                        const param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$segment$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSegmentParam"])(pathSegment);
                        interpolated[segmentParam.param] = param ? interpolated[param.param] : pathSegment;
                    }
                    break;
                default:
                    segmentParam.type;
            }
        }
        // Calculate next depth - increment if this is not a route group and not empty
        let nextDepth = depth;
        const isRouteGroup = segment.startsWith('(') && segment.endsWith(')');
        if (!isRouteGroup && segment !== '') {
            nextDepth++;
        }
        // Add all parallel routes to the stack for processing
        for (const route of Object.values(parallelRoutes)){
            stack.push({
                tree: route,
                depth: nextDepth
            });
        }
    }
    return interpolated;
}
function getDynamicParam(interpolatedParams, segmentKey, dynamicParamType, fallbackRouteParams) {
    let value = getParamValue(interpolatedParams, segmentKey, fallbackRouteParams);
    // handle the case where an optional catchall does not have a value,
    // e.g. `/dashboard/[[...slug]]` when requesting `/dashboard`
    if (!value || value.length === 0) {
        if (dynamicParamType === 'oc') {
            return {
                param: segmentKey,
                value: null,
                type: dynamicParamType,
                treeSegment: [
                    segmentKey,
                    '',
                    dynamicParamType
                ]
            };
        }
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`Missing value for segment key: "${segmentKey}" with dynamic param type: ${dynamicParamType}`), "__NEXT_ERROR_CODE", {
            value: "E864",
            enumerable: false,
            configurable: true
        });
    }
    return {
        param: segmentKey,
        // The value that is passed to user code.
        value,
        // The value that is rendered in the router tree.
        treeSegment: [
            segmentKey,
            Array.isArray(value) ? value.join('/') : value,
            dynamicParamType
        ],
        type: dynamicParamType
    };
}
const PARAMETER_PATTERN = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
function parseParameter(param) {
    const match = param.match(PARAMETER_PATTERN);
    if (!match) {
        return parseMatchedParameter(param);
    }
    return parseMatchedParameter(match[2]);
}
function parseMatchedParameter(param) {
    const optional = param.startsWith('[') && param.endsWith(']');
    if (optional) {
        param = param.slice(1, -1);
    }
    const repeat = param.startsWith('...');
    if (repeat) {
        param = param.slice(3);
    }
    return {
        key: param,
        repeat,
        optional
    };
} //# sourceMappingURL=get-dynamic-param.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/route-regex.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getNamedMiddlewareRegex",
    ()=>getNamedMiddlewareRegex,
    "getNamedRouteRegex",
    ()=>getNamedRouteRegex,
    "getRouteRegex",
    ()=>getRouteRegex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/interception-routes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$escape$2d$regexp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/escape-regexp.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$dynamic$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/get-dynamic-param.js [app-rsc] (ecmascript)");
;
;
;
;
;
function getParametrizedRoute(route, includeSuffix, includePrefix) {
    const groups = {};
    let groupIndex = 1;
    const segments = [];
    for (const segment of (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(route).slice(1).split('/')){
        const markerMatch = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["INTERCEPTION_ROUTE_MARKERS"].find((m)=>segment.startsWith(m));
        const paramMatches = segment.match(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$dynamic$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PARAMETER_PATTERN"]) // Check for parameters
        ;
        if (markerMatch && paramMatches && paramMatches[2]) {
            const { key, optional, repeat } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$dynamic$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseMatchedParameter"])(paramMatches[2]);
            groups[key] = {
                pos: groupIndex++,
                repeat,
                optional
            };
            segments.push(`/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$escape$2d$regexp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["escapeStringRegexp"])(markerMatch)}([^/]+?)`);
        } else if (paramMatches && paramMatches[2]) {
            const { key, repeat, optional } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$dynamic$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseMatchedParameter"])(paramMatches[2]);
            groups[key] = {
                pos: groupIndex++,
                repeat,
                optional
            };
            if (includePrefix && paramMatches[1]) {
                segments.push(`/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$escape$2d$regexp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["escapeStringRegexp"])(paramMatches[1])}`);
            }
            let s = repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
            // Remove the leading slash if includePrefix already added it.
            if (includePrefix && paramMatches[1]) {
                s = s.substring(1);
            }
            segments.push(s);
        } else {
            segments.push(`/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$escape$2d$regexp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["escapeStringRegexp"])(segment)}`);
        }
        // If there's a suffix, add it to the segments if it's enabled.
        if (includeSuffix && paramMatches && paramMatches[3]) {
            segments.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$escape$2d$regexp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["escapeStringRegexp"])(paramMatches[3]));
        }
    }
    return {
        parameterizedRoute: segments.join(''),
        groups
    };
}
function getRouteRegex(normalizedRoute, { includeSuffix = false, includePrefix = false, excludeOptionalTrailingSlash = false } = {}) {
    const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute, includeSuffix, includePrefix);
    let re = parameterizedRoute;
    if (!excludeOptionalTrailingSlash) {
        re += '(?:/)?';
    }
    return {
        re: new RegExp(`^${re}$`),
        groups: groups
    };
}
/**
 * Builds a function to generate a minimal routeKey using only a-z and minimal
 * number of characters.
 */ function buildGetSafeRouteKey() {
    let i = 0;
    return ()=>{
        let routeKey = '';
        let j = ++i;
        while(j > 0){
            routeKey += String.fromCharCode(97 + (j - 1) % 26);
            j = Math.floor((j - 1) / 26);
        }
        return routeKey;
    };
}
function getSafeKeyFromSegment({ interceptionMarker, getSafeRouteKey, segment, routeKeys, keyPrefix, backreferenceDuplicateKeys }) {
    const { key, optional, repeat } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$dynamic$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseMatchedParameter"])(segment);
    // replace any non-word characters since they can break
    // the named regex
    let cleanedKey = key.replace(/\W/g, '');
    if (keyPrefix) {
        cleanedKey = `${keyPrefix}${cleanedKey}`;
    }
    let invalidKey = false;
    // check if the key is still invalid and fallback to using a known
    // safe key
    if (cleanedKey.length === 0 || cleanedKey.length > 30) {
        invalidKey = true;
    }
    if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
        invalidKey = true;
    }
    if (invalidKey) {
        cleanedKey = getSafeRouteKey();
    }
    const duplicateKey = cleanedKey in routeKeys;
    if (keyPrefix) {
        routeKeys[cleanedKey] = `${keyPrefix}${key}`;
    } else {
        routeKeys[cleanedKey] = key;
    }
    // if the segment has an interception marker, make sure that's part of the regex pattern
    // this is to ensure that the route with the interception marker doesn't incorrectly match
    // the non-intercepted route (ie /app/(.)[username] should not match /app/[username])
    const interceptionPrefix = interceptionMarker ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$escape$2d$regexp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["escapeStringRegexp"])(interceptionMarker) : '';
    let pattern;
    if (duplicateKey && backreferenceDuplicateKeys) {
        // Use a backreference to the key to ensure that the key is the same value
        // in each of the placeholders.
        pattern = `\\k<${cleanedKey}>`;
    } else if (repeat) {
        pattern = `(?<${cleanedKey}>.+?)`;
    } else {
        pattern = `(?<${cleanedKey}>[^/]+?)`;
    }
    return {
        key,
        pattern: optional ? `(?:/${interceptionPrefix}${pattern})?` : `/${interceptionPrefix}${pattern}`,
        cleanedKey: cleanedKey,
        optional,
        repeat
    };
}
function getNamedParametrizedRoute(route, prefixRouteKeys, includeSuffix, includePrefix, backreferenceDuplicateKeys, reference = {
    names: {},
    intercepted: {}
}) {
    const getSafeRouteKey = buildGetSafeRouteKey();
    const routeKeys = {};
    const segments = [];
    const inverseParts = [];
    // Ensure we don't mutate the original reference object.
    reference = structuredClone(reference);
    for (const segment of (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(route).slice(1).split('/')){
        const hasInterceptionMarker = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["INTERCEPTION_ROUTE_MARKERS"].some((m)=>segment.startsWith(m));
        const paramMatches = segment.match(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$dynamic$2d$param$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PARAMETER_PATTERN"]) // Check for parameters
        ;
        const interceptionMarker = hasInterceptionMarker ? paramMatches?.[1] : undefined;
        let keyPrefix;
        if (interceptionMarker && paramMatches?.[2]) {
            keyPrefix = prefixRouteKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_INTERCEPTION_MARKER_PREFIX"] : undefined;
            reference.intercepted[paramMatches[2]] = interceptionMarker;
        } else if (paramMatches?.[2] && reference.intercepted[paramMatches[2]]) {
            keyPrefix = prefixRouteKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_INTERCEPTION_MARKER_PREFIX"] : undefined;
        } else {
            keyPrefix = prefixRouteKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_QUERY_PARAM_PREFIX"] : undefined;
        }
        if (interceptionMarker && paramMatches && paramMatches[2]) {
            // If there's an interception marker, add it to the segments.
            const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
                getSafeRouteKey,
                interceptionMarker,
                segment: paramMatches[2],
                routeKeys,
                keyPrefix,
                backreferenceDuplicateKeys
            });
            segments.push(pattern);
            inverseParts.push(`/${paramMatches[1]}:${reference.names[key] ?? cleanedKey}${repeat ? optional ? '*' : '+' : ''}`);
            reference.names[key] ??= cleanedKey;
        } else if (paramMatches && paramMatches[2]) {
            // If there's a prefix, add it to the segments if it's enabled.
            if (includePrefix && paramMatches[1]) {
                segments.push(`/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$escape$2d$regexp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["escapeStringRegexp"])(paramMatches[1])}`);
                inverseParts.push(`/${paramMatches[1]}`);
            }
            const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
                getSafeRouteKey,
                segment: paramMatches[2],
                routeKeys,
                keyPrefix,
                backreferenceDuplicateKeys
            });
            // Remove the leading slash if includePrefix already added it.
            let s = pattern;
            if (includePrefix && paramMatches[1]) {
                s = s.substring(1);
            }
            segments.push(s);
            inverseParts.push(`/:${reference.names[key] ?? cleanedKey}${repeat ? optional ? '*' : '+' : ''}`);
            reference.names[key] ??= cleanedKey;
        } else {
            segments.push(`/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$escape$2d$regexp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["escapeStringRegexp"])(segment)}`);
            inverseParts.push(`/${segment}`);
        }
        // If there's a suffix, add it to the segments if it's enabled.
        if (includeSuffix && paramMatches && paramMatches[3]) {
            segments.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$escape$2d$regexp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["escapeStringRegexp"])(paramMatches[3]));
            inverseParts.push(paramMatches[3]);
        }
    }
    return {
        namedParameterizedRoute: segments.join(''),
        routeKeys,
        pathToRegexpPattern: inverseParts.join(''),
        reference
    };
}
function getNamedRouteRegex(normalizedRoute, options) {
    const result = getNamedParametrizedRoute(normalizedRoute, options.prefixRouteKeys, options.includeSuffix ?? false, options.includePrefix ?? false, options.backreferenceDuplicateKeys ?? false, options.reference);
    let namedRegex = result.namedParameterizedRoute;
    if (!options.excludeOptionalTrailingSlash) {
        namedRegex += '(?:/)?';
    }
    return {
        ...getRouteRegex(normalizedRoute, options),
        namedRegex: `^${namedRegex}$`,
        routeKeys: result.routeKeys,
        pathToRegexpPattern: result.pathToRegexpPattern,
        reference: result.reference
    };
}
function getNamedMiddlewareRegex(normalizedRoute, options) {
    const { parameterizedRoute } = getParametrizedRoute(normalizedRoute, false, false);
    const { catchAll = true } = options;
    if (parameterizedRoute === '/') {
        let catchAllRegex = catchAll ? '.*' : '';
        return {
            namedRegex: `^/${catchAllRegex}$`
        };
    }
    const { namedParameterizedRoute } = getNamedParametrizedRoute(normalizedRoute, false, false, false, false, undefined);
    let catchAllGroupedRegex = catchAll ? '(?:(/.*)?)' : '';
    return {
        namedRegex: `^${namedParameterizedRoute}${catchAllGroupedRegex}$`
    };
} //# sourceMappingURL=route-regex.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/get-short-dynamic-param-type.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dynamicParamTypes",
    ()=>dynamicParamTypes
]);
const dynamicParamTypes = {
    catchall: 'c',
    'catchall-intercepted': 'ci',
    'optional-catchall': 'oc',
    dynamic: 'd',
    'dynamic-intercepted': 'di'
}; //# sourceMappingURL=get-short-dynamic-param-type.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/request/fallback-params.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOpaqueFallbackRouteParams",
    ()=>createOpaqueFallbackRouteParams,
    "getFallbackRouteParams",
    ()=>getFallbackRouteParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$segment$2d$config$2f$app$2f$app$2d$segments$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/build/segment-config/app/app-segments.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$route$2d$matcher$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/route-matcher.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$route$2d$regex$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/route-regex.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$get$2d$short$2d$dynamic$2d$param$2d$type$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/get-short-dynamic-param-type.js [app-rsc] (ecmascript)");
;
;
;
;
;
function getParamKeys(page) {
    const pattern = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$route$2d$regex$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRouteRegex"])(page);
    const matcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$route$2d$matcher$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRouteMatcher"])(pattern);
    // Get the default list of allowed params.
    return Object.keys(matcher(page));
}
function createOpaqueFallbackRouteParams(fallbackRouteParams) {
    // If there are no fallback route params, we can return early.
    if (fallbackRouteParams.length === 0) return null;
    // As we're creating unique keys for each of the dynamic route params, we only
    // need to generate a unique ID once per request because each of the keys will
    // be also be unique.
    const uniqueID = Math.random().toString(16).slice(2);
    const keys = new Map();
    // Generate a unique key for the fallback route param, if this key is found
    // in the static output, it represents a bug in cache components.
    for (const { paramName, paramType } of fallbackRouteParams){
        keys.set(paramName, [
            `%%drp:${paramName}:${uniqueID}%%`,
            __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$get$2d$short$2d$dynamic$2d$param$2d$type$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dynamicParamTypes"][paramType]
        ]);
    }
    return keys;
}
function getFallbackRouteParams(page, routeModule) {
    // First, get the fallback route params based on the provided page.
    const unknownParamKeys = new Set(getParamKeys(page));
    // Needed when processing fallback route params for catchall routes in
    // parallel segments, derive from pathname. This is similar to
    // getDynamicParam's pagePath parsing logic.
    const pathSegments = page.split('/').filter(Boolean);
    const collected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$segment$2d$config$2f$app$2f$app$2d$segments$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collectFallbackRouteParams"])(routeModule);
    // Then, we have to get the fallback route params from the segments that are
    // associated with parallel route segments.
    const fallbackRouteParams = [];
    for (const fallbackRouteParam of collected){
        if (fallbackRouteParam.isParallelRouteParam) {
            // Try to see if we can resolve this parameter from the page that was
            // passed in.
            if (unknownParamKeys.has(fallbackRouteParam.paramName)) {
                continue;
            }
            if (fallbackRouteParam.paramType === 'optional-catchall' || fallbackRouteParam.paramType === 'catchall') {
                // If there are any fallback route segments then we can't use the
                // pathname to derive the value because it's not complete. We can
                // make this assumption because the routes are always resolved left
                // to right and the catchall is always the last segment, so any
                // route parameters that are unknown will always contribute to the
                // pathname and therefore the catchall param too.
                if (collected.some((param)=>!param.isParallelRouteParam && unknownParamKeys.has(param.paramName))) {
                    fallbackRouteParams.push(fallbackRouteParam);
                    continue;
                }
                if (pathSegments.length === 0 && fallbackRouteParam.paramType !== 'optional-catchall') {
                    // We shouldn't be able to match a catchall segment without any path
                    // segments if it's not an optional catchall.
                    throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`Unexpected empty path segments match for a pathname "${page}" with param "${fallbackRouteParam.paramName}" of type "${fallbackRouteParam.paramType}"`), "__NEXT_ERROR_CODE", {
                        value: "E792",
                        enumerable: false,
                        configurable: true
                    });
                }
            // The path segments are not empty, and the segments didn't contain any
            // unknown params, so we know that this particular fallback route param
            // route param is not actually unknown, and is known. We can skip adding
            // it to the fallback route params.
            } else {
                // This is some other type of route param that shouldn't get resolved
                // statically.
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`Unexpected match for a pathname "${page}" with a param "${fallbackRouteParam.paramName}" of type "${fallbackRouteParam.paramType}"`), "__NEXT_ERROR_CODE", {
                    value: "E791",
                    enumerable: false,
                    configurable: true
                });
            }
        } else if (unknownParamKeys.has(fallbackRouteParam.paramName)) {
            // As this is a non-parallel route segment, and it exists in the unknown
            // param keys, we know it's a fallback route param.
            fallbackRouteParams.push(fallbackRouteParam);
        }
    }
    return createOpaqueFallbackRouteParams(fallbackRouteParams);
} //# sourceMappingURL=fallback-params.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/encryption-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arrayBufferToString",
    ()=>arrayBufferToString,
    "decrypt",
    ()=>decrypt,
    "encrypt",
    ()=>encrypt,
    "getActionEncryptionKey",
    ()=>getActionEncryptionKey,
    "getClientReferenceManifestForRsc",
    ()=>getClientReferenceManifestForRsc,
    "getServerModuleMap",
    ()=>getServerModuleMap,
    "setReferenceManifestsSingleton",
    ()=>setReferenceManifestsSingleton,
    "stringToUint8Array",
    ()=>stringToUint8Array
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
;
;
;
let __next_loaded_action_key;
function arrayBufferToString(buffer) {
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    // @anonrig: V8 has a limit of 65535 arguments in a function.
    // For len < 65535, this is faster.
    // https://github.com/vercel/next.js/pull/56377#pullrequestreview-1656181623
    if (len < 65535) {
        return String.fromCharCode.apply(null, bytes);
    }
    let binary = '';
    for(let i = 0; i < len; i++){
        binary += String.fromCharCode(bytes[i]);
    }
    return binary;
}
function stringToUint8Array(binary) {
    const len = binary.length;
    const arr = new Uint8Array(len);
    for(let i = 0; i < len; i++){
        arr[i] = binary.charCodeAt(i);
    }
    return arr;
}
function encrypt(key, iv, data) {
    return crypto.subtle.encrypt({
        name: 'AES-GCM',
        iv
    }, key, data);
}
function decrypt(key, iv, data) {
    return crypto.subtle.decrypt({
        name: 'AES-GCM',
        iv
    }, key, data);
}
// This is a global singleton that is used to encode/decode the action bound args from
// the closure. This can't be using a AsyncLocalStorage as it might happen on the module
// level. Since the client reference manifest won't be mutated, let's use a global singleton
// to keep it.
const SERVER_ACTION_MANIFESTS_SINGLETON = Symbol.for('next.server.action-manifests');
function setReferenceManifestsSingleton({ page, clientReferenceManifest, serverActionsManifest, serverModuleMap }) {
    var _globalThis_SERVER_ACTION_MANIFESTS_SINGLETON;
    // @ts-expect-error
    const clientReferenceManifestsPerPage = (_globalThis_SERVER_ACTION_MANIFESTS_SINGLETON = globalThis[SERVER_ACTION_MANIFESTS_SINGLETON]) == null ? void 0 : _globalThis_SERVER_ACTION_MANIFESTS_SINGLETON.clientReferenceManifestsPerPage;
    // @ts-expect-error
    globalThis[SERVER_ACTION_MANIFESTS_SINGLETON] = {
        clientReferenceManifestsPerPage: {
            ...clientReferenceManifestsPerPage,
            [(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAppPath"])(page)]: clientReferenceManifest
        },
        serverActionsManifest,
        serverModuleMap
    };
}
function getServerModuleMap() {
    const serverActionsManifestSingleton = globalThis[SERVER_ACTION_MANIFESTS_SINGLETON];
    if (!serverActionsManifestSingleton) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"]('Missing manifest for Server Actions.'), "__NEXT_ERROR_CODE", {
            value: "E606",
            enumerable: false,
            configurable: true
        });
    }
    return serverActionsManifestSingleton.serverModuleMap;
}
function getClientReferenceManifestForRsc() {
    const serverActionsManifestSingleton = globalThis[SERVER_ACTION_MANIFESTS_SINGLETON];
    if (!serverActionsManifestSingleton) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"]('Missing manifest for Server Actions.'), "__NEXT_ERROR_CODE", {
            value: "E606",
            enumerable: false,
            configurable: true
        });
    }
    const { clientReferenceManifestsPerPage } = serverActionsManifestSingleton;
    const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
    if (!workStore) {
        // If there's no work store defined, we can assume that a client reference
        // manifest is needed during module evaluation, e.g. to create a server
        // action using a higher-order function. This might also use client
        // components which need to be serialized by Flight, and therefore client
        // references need to be resolvable. To make this work, we're returning a
        // merged manifest across all pages. This is fine as long as the module IDs
        // are not page specific, which they are not for Webpack. TODO: Fix this in
        // Turbopack.
        return mergeClientReferenceManifests(clientReferenceManifestsPerPage);
    }
    const clientReferenceManifest = clientReferenceManifestsPerPage[workStore.route];
    if (!clientReferenceManifest) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`Missing Client Reference Manifest for ${workStore.route}.`), "__NEXT_ERROR_CODE", {
            value: "E570",
            enumerable: false,
            configurable: true
        });
    }
    return clientReferenceManifest;
}
async function getActionEncryptionKey() {
    if (__next_loaded_action_key) {
        return __next_loaded_action_key;
    }
    const serverActionsManifestSingleton = globalThis[SERVER_ACTION_MANIFESTS_SINGLETON];
    if (!serverActionsManifestSingleton) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"]('Missing manifest for Server Actions.'), "__NEXT_ERROR_CODE", {
            value: "E606",
            enumerable: false,
            configurable: true
        });
    }
    const rawKey = process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY || serverActionsManifestSingleton.serverActionsManifest.encryptionKey;
    if (rawKey === undefined) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"]('Missing encryption key for Server Actions'), "__NEXT_ERROR_CODE", {
            value: "E571",
            enumerable: false,
            configurable: true
        });
    }
    __next_loaded_action_key = await crypto.subtle.importKey('raw', stringToUint8Array(atob(rawKey)), 'AES-GCM', true, [
        'encrypt',
        'decrypt'
    ]);
    return __next_loaded_action_key;
}
function mergeClientReferenceManifests(clientReferenceManifestsPerPage) {
    const clientReferenceManifests = Object.values(clientReferenceManifestsPerPage);
    const mergedClientReferenceManifest = {
        clientModules: {},
        edgeRscModuleMapping: {},
        rscModuleMapping: {}
    };
    for (const clientReferenceManifest of clientReferenceManifests){
        mergedClientReferenceManifest.clientModules = {
            ...mergedClientReferenceManifest.clientModules,
            ...clientReferenceManifest.clientModules
        };
        mergedClientReferenceManifest.edgeRscModuleMapping = {
            ...mergedClientReferenceManifest.edgeRscModuleMapping,
            ...clientReferenceManifest.edgeRscModuleMapping
        };
        mergedClientReferenceManifest.rscModuleMapping = {
            ...mergedClientReferenceManifest.rscModuleMapping,
            ...clientReferenceManifest.rscModuleMapping
        };
    }
    return mergedClientReferenceManifest;
} //# sourceMappingURL=encryption-utils.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/html-bots.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This regex contains the bots that we need to do a blocking render for and can't safely stream the response
// due to how they parse the DOM. For example, they might explicitly check for metadata in the `head` tag, so we can't stream metadata tags after the `head` was sent.
// Note: The pattern [\w-]+-Google captures all Google crawlers with "-Google" suffix (e.g., Mediapartners-Google, AdsBot-Google, Storebot-Google)
// as well as crawlers starting with "Google-" (e.g., Google-PageRenderer, Google-InspectionTool)
__turbopack_context__.s([
    "HTML_LIMITED_BOT_UA_RE",
    ()=>HTML_LIMITED_BOT_UA_RE
]);
const HTML_LIMITED_BOT_UA_RE = /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight/i; //# sourceMappingURL=html-bots.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/is-bot.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HTML_LIMITED_BOT_UA_RE_STRING",
    ()=>HTML_LIMITED_BOT_UA_RE_STRING,
    "getBotType",
    ()=>getBotType,
    "isBot",
    ()=>isBot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$html$2d$bots$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/html-bots.js [app-rsc] (ecmascript)");
;
// Bot crawler that will spin up a headless browser and execute JS.
// Only the main Googlebot search crawler executes JavaScript, not other Google crawlers.
// x-ref: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
// This regex specifically matches "Googlebot" but NOT "Mediapartners-Google", "AdsBot-Google", etc.
const HEADLESS_BROWSER_BOT_UA_RE = /Googlebot(?!-)|Googlebot$/i;
const HTML_LIMITED_BOT_UA_RE_STRING = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$html$2d$bots$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HTML_LIMITED_BOT_UA_RE"].source;
;
function isDomBotUA(userAgent) {
    return HEADLESS_BROWSER_BOT_UA_RE.test(userAgent);
}
function isHtmlLimitedBotUA(userAgent) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$html$2d$bots$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HTML_LIMITED_BOT_UA_RE"].test(userAgent);
}
function isBot(userAgent) {
    return isDomBotUA(userAgent) || isHtmlLimitedBotUA(userAgent);
}
function getBotType(userAgent) {
    if (isDomBotUA(userAgent)) {
        return 'dom';
    }
    if (isHtmlLimitedBotUA(userAgent)) {
        return 'html';
    }
    return undefined;
} //# sourceMappingURL=is-bot.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/streaming-metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHtmlBotRequest",
    ()=>isHtmlBotRequest,
    "shouldServeStreamingMetadata",
    ()=>shouldServeStreamingMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/is-bot.js [app-rsc] (ecmascript) <locals>");
;
function shouldServeStreamingMetadata(userAgent, htmlLimitedBots) {
    const blockingMetadataUARegex = new RegExp(htmlLimitedBots || __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HTML_LIMITED_BOT_UA_RE_STRING"], 'i');
    // Only block metadata for HTML-limited bots
    if (userAgent && blockingMetadataUARegex.test(userAgent)) {
        return false;
    }
    return true;
}
function isHtmlBotRequest(req) {
    const ua = req.headers['user-agent'] || '';
    const botType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getBotType"])(ua);
    return botType === 'html';
} //# sourceMappingURL=streaming-metadata.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/action-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServerModuleMap",
    ()=>createServerModuleMap,
    "selectWorkerForForwarding",
    ()=>selectWorkerForForwarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$path$2d$prefix$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
;
;
;
;
function createServerModuleMap({ serverActionsManifest }) {
    return new Proxy({}, {
        get: (_, id)=>{
            var _serverActionsManifest__id, _serverActionsManifest_;
            const workers = (_serverActionsManifest_ = serverActionsManifest[("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'node']) == null ? void 0 : (_serverActionsManifest__id = _serverActionsManifest_[id]) == null ? void 0 : _serverActionsManifest__id.workers;
            if (!workers) {
                return undefined;
            }
            const workStore = __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js$2c$__cjs$29$__["workAsyncStorage"].getStore();
            let workerEntry;
            if (workStore) {
                workerEntry = workers[normalizeWorkerPageName(workStore.page)];
            } else {
                // If there's no work store defined, we can assume that a server
                // module map is needed during module evaluation, e.g. to create a
                // server action using a higher-order function. Therefore it should be
                // safe to return any entry from the manifest that matches the action
                // ID. They all refer to the same module ID, which must also exist in
                // the current page bundle. TODO: This is currently not guaranteed in
                // Turbopack, and needs to be fixed.
                workerEntry = Object.values(workers).at(0);
            }
            if (!workerEntry) {
                return undefined;
            }
            const { moduleId, async } = workerEntry;
            return {
                id: moduleId,
                name: id,
                chunks: [],
                async
            };
        }
    });
}
function selectWorkerForForwarding(actionId, pageName, serverActionsManifest) {
    var _serverActionsManifest__actionId;
    const workers = (_serverActionsManifest__actionId = serverActionsManifest[("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'node'][actionId]) == null ? void 0 : _serverActionsManifest__actionId.workers;
    const workerName = normalizeWorkerPageName(pageName);
    // no workers, nothing to forward to
    if (!workers) return;
    // if there is a worker for this page, no need to forward it.
    if (workers[workerName]) {
        return;
    }
    // otherwise, grab the first worker that has a handler for this action id
    return denormalizeWorkerPageName(Object.keys(workers)[0]);
}
/**
 * The flight entry loader keys actions by bundlePath.
 * bundlePath corresponds with the relative path (including 'app') to the page entrypoint.
 */ function normalizeWorkerPageName(pageName) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pathHasPrefix"])(pageName, 'app')) {
        return pageName;
    }
    return 'app' + pageName;
}
/**
 * Converts a bundlePath (relative path to the entrypoint) to a routable page name
 */ function denormalizeWorkerPageName(bundlePath) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAppPath"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$path$2d$prefix$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removePathPrefix"])(bundlePath, 'app'));
} //# sourceMappingURL=action-utils.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/server-action-request-meta.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getIsPossibleServerAction",
    ()=>getIsPossibleServerAction,
    "getServerActionRequestMetadata",
    ()=>getServerActionRequestMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/client/components/app-router-headers.js [app-rsc] (ecmascript)");
;
function getServerActionRequestMetadata(req) {
    let actionId;
    let contentType;
    if (req.headers instanceof Headers) {
        actionId = req.headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ACTION_HEADER"]) ?? null;
        contentType = req.headers.get('content-type');
    } else {
        actionId = req.headers[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ACTION_HEADER"]] ?? null;
        contentType = req.headers['content-type'] ?? null;
    }
    const isURLEncodedAction = Boolean(req.method === 'POST' && contentType === 'application/x-www-form-urlencoded');
    const isMultipartAction = Boolean(req.method === 'POST' && (contentType == null ? void 0 : contentType.startsWith('multipart/form-data')));
    const isFetchAction = Boolean(actionId !== undefined && typeof actionId === 'string' && req.method === 'POST');
    const isPossibleServerAction = Boolean(isFetchAction || isURLEncodedAction || isMultipartAction);
    return {
        actionId,
        isURLEncodedAction,
        isMultipartAction,
        isFetchAction,
        isPossibleServerAction
    };
}
function getIsPossibleServerAction(req) {
    return getServerActionRequestMetadata(req).isPossibleServerAction;
} //# sourceMappingURL=server-action-request-meta.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/fallback.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Describes the different fallback modes that a given page can have.
 */ __turbopack_context__.s([
    "FallbackMode",
    ()=>FallbackMode,
    "fallbackModeToFallbackField",
    ()=>fallbackModeToFallbackField,
    "parseFallbackField",
    ()=>parseFallbackField,
    "parseStaticPathsResult",
    ()=>parseStaticPathsResult
]);
var FallbackMode = /*#__PURE__*/ function(FallbackMode) {
    /**
   * A BLOCKING_STATIC_RENDER fallback will block the request until the page is
   * generated. No fallback page will be rendered, and users will have to wait
   * to render the page.
   */ FallbackMode["BLOCKING_STATIC_RENDER"] = "BLOCKING_STATIC_RENDER";
    /**
   * When set to PRERENDER, a fallback page will be sent to users in place of
   * forcing them to wait for the page to be generated. This allows the user to
   * see a rendered page earlier.
   */ FallbackMode["PRERENDER"] = "PRERENDER";
    /**
   * When set to NOT_FOUND, pages that are not already prerendered will result
   * in a not found response.
   */ FallbackMode["NOT_FOUND"] = "NOT_FOUND";
    return FallbackMode;
}({});
function parseFallbackField(fallbackField) {
    if (typeof fallbackField === 'string') {
        return "PRERENDER";
    } else if (fallbackField === null) {
        return "BLOCKING_STATIC_RENDER";
    } else if (fallbackField === false) {
        return "NOT_FOUND";
    } else if (fallbackField === undefined) {
        return undefined;
    } else {
        throw Object.defineProperty(new Error(`Invalid fallback option: ${fallbackField}. Fallback option must be a string, null, undefined, or false.`), "__NEXT_ERROR_CODE", {
            value: "E285",
            enumerable: false,
            configurable: true
        });
    }
}
function fallbackModeToFallbackField(fallback, page) {
    switch(fallback){
        case "BLOCKING_STATIC_RENDER":
            return null;
        case "NOT_FOUND":
            return false;
        case "PRERENDER":
            if (!page) {
                throw Object.defineProperty(new Error(`Invariant: expected a page to be provided when fallback mode is "${fallback}"`), "__NEXT_ERROR_CODE", {
                    value: "E422",
                    enumerable: false,
                    configurable: true
                });
            }
            return page;
        default:
            throw Object.defineProperty(new Error(`Invalid fallback mode: ${fallback}`), "__NEXT_ERROR_CODE", {
                value: "E254",
                enumerable: false,
                configurable: true
            });
    }
}
function parseStaticPathsResult(result) {
    if (result === true) {
        return "PRERENDER";
    } else if (result === 'blocking') {
        return "BLOCKING_STATIC_RENDER";
    } else {
        return "NOT_FOUND";
    }
} //# sourceMappingURL=fallback.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/etag.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * FNV-1a Hash implementation
 * @author Travis Webb (tjwebb) <me@traviswebb.com>
 *
 * Ported from https://github.com/tjwebb/fnv-plus/blob/master/index.js
 *
 * Simplified, optimized and add modified for 52 bit, which provides a larger hash space
 * and still making use of Javascript's 53-bit integer space.
 */ __turbopack_context__.s([
    "fnv1a52",
    ()=>fnv1a52,
    "generateETag",
    ()=>generateETag
]);
const fnv1a52 = (str)=>{
    const len = str.length;
    let i = 0, t0 = 0, v0 = 0x2325, t1 = 0, v1 = 0x8422, t2 = 0, v2 = 0x9ce4, t3 = 0, v3 = 0xcbf2;
    while(i < len){
        v0 ^= str.charCodeAt(i++);
        t0 = v0 * 435;
        t1 = v1 * 435;
        t2 = v2 * 435;
        t3 = v3 * 435;
        t2 += v0 << 8;
        t3 += v1 << 8;
        t1 += t0 >>> 16;
        v0 = t0 & 65535;
        t2 += t1 >>> 16;
        v1 = t1 & 65535;
        v3 = t3 + (t2 >>> 16) & 65535;
        v2 = t2 & 65535;
    }
    return (v3 & 15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0 ^ v3 >> 4);
};
const generateETag = (payload, weak = false)=>{
    const prefix = weak ? 'W/"' : '"';
    return prefix + fnv1a52(payload).toString(36) + payload.length.toString(36) + '"';
}; //# sourceMappingURL=etag.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/fresh/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

(()=>{
    "use strict";
    var e = {
        695: (e)=>{
            /*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 */ var r = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
            e.exports = fresh;
            function fresh(e, a) {
                var t = e["if-modified-since"];
                var s = e["if-none-match"];
                if (!t && !s) {
                    return false;
                }
                var i = e["cache-control"];
                if (i && r.test(i)) {
                    return false;
                }
                if (s && s !== "*") {
                    var f = a["etag"];
                    if (!f) {
                        return false;
                    }
                    var n = true;
                    var u = parseTokenList(s);
                    for(var _ = 0; _ < u.length; _++){
                        var o = u[_];
                        if (o === f || o === "W/" + f || "W/" + o === f) {
                            n = false;
                            break;
                        }
                    }
                    if (n) {
                        return false;
                    }
                }
                if (t) {
                    var p = a["last-modified"];
                    var v = !p || !(parseHttpDate(p) <= parseHttpDate(t));
                    if (v) {
                        return false;
                    }
                }
                return true;
            }
            function parseHttpDate(e) {
                var r = e && Date.parse(e);
                return typeof r === "number" ? r : NaN;
            }
            function parseTokenList(e) {
                var r = 0;
                var a = [];
                var t = 0;
                for(var s = 0, i = e.length; s < i; s++){
                    switch(e.charCodeAt(s)){
                        case 32:
                            if (t === r) {
                                t = r = s + 1;
                            }
                            break;
                        case 44:
                            a.push(e.substring(t, r));
                            t = r = s + 1;
                            break;
                        default:
                            r = s + 1;
                            break;
                    }
                }
                a.push(e.substring(t, r));
                return a;
            }
        }
    };
    var r = {};
    function __nccwpck_require__(a) {
        var t = r[a];
        if (t !== undefined) {
            return t.exports;
        }
        var s = r[a] = {
            exports: {}
        };
        var i = true;
        try {
            e[a](s, s.exports, __nccwpck_require__);
            i = false;
        } finally{
            if (i) delete r[a];
        }
        return s.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/fresh") + "/";
    var a = __nccwpck_require__(695);
    module.exports = a;
})();
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/cache-control.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCacheControlHeader",
    ()=>getCacheControlHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/constants.js [app-rsc] (ecmascript)");
;
function getCacheControlHeader({ revalidate, expire }) {
    const swrHeader = typeof revalidate === 'number' && expire !== undefined && revalidate < expire ? `, stale-while-revalidate=${expire - revalidate}` : '';
    if (revalidate === 0) {
        return 'private, no-cache, no-store, max-age=0, must-revalidate';
    } else if (typeof revalidate === 'number') {
        return `s-maxage=${revalidate}${swrHeader}`;
    }
    return `s-maxage=${__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CACHE_ONE_YEAR"]}${swrHeader}`;
} //# sourceMappingURL=cache-control.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/send-payload.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendEtagResponse",
    ()=>sendEtagResponse,
    "sendRenderResult",
    ()=>sendRenderResult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$etag$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/etag.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$fresh$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/compiled/fresh/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$control$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/cache-control.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/constants.js [app-rsc] (ecmascript)");
;
;
;
;
;
function sendEtagResponse(req, res, etag) {
    if (etag) {
        /**
     * The server generating a 304 response MUST generate any of the
     * following header fields that would have been sent in a 200 (OK)
     * response to the same request: Cache-Control, Content-Location, Date,
     * ETag, Expires, and Vary. https://tools.ietf.org/html/rfc7232#section-4.1
     */ res.setHeader('ETag', etag);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$fresh$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(req.headers, {
        etag
    })) {
        res.statusCode = 304;
        res.end();
        return true;
    }
    return false;
}
async function sendRenderResult({ req, res, result, generateEtags, poweredByHeader, cacheControl }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isResSent"])(res)) {
        return;
    }
    if (poweredByHeader && result.contentType === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HTML_CONTENT_TYPE_HEADER"]) {
        res.setHeader('X-Powered-By', 'Next.js');
    }
    // If cache control is already set on the response we don't
    // override it to allow users to customize it via next.config
    if (cacheControl && !res.getHeader('Cache-Control')) {
        res.setHeader('Cache-Control', (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$control$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCacheControlHeader"])(cacheControl));
    }
    const payload = result.isDynamic ? null : result.toUnchunkedString();
    if (generateEtags && payload !== null) {
        const etag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$etag$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateETag"])(payload);
        if (sendEtagResponse(req, res, etag)) {
            return;
        }
    }
    if (!res.getHeader('Content-Type') && result.contentType) {
        res.setHeader('Content-Type', result.contentType);
    }
    if (payload) {
        res.setHeader('Content-Length', Buffer.byteLength(payload));
    }
    if (req.method === 'HEAD') {
        res.end(null);
        return;
    }
    if (payload !== null) {
        res.end(payload);
        return;
    }
    // Pipe the render result to the response after we get a writer for it.
    await result.pipeToNodeResponse(res);
} //# sourceMappingURL=send-payload.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript)"));
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility) <locals>", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript) <locals>"));}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript)"));}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript)"));
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript)"));
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript)"));
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/tslib/tslib.es6.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol */ __turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    function next() {
        while(env.stack.length){
            var rec = env.stack.pop();
            try {
                var result = rec.dispose && rec.dispose.call(rec.value);
                if (rec.async) return Promise.resolve(result).then(next, function(e) {
                    fail(e);
                    return next();
                });
            } catch (e) {
                fail(e);
            }
        }
        if (env.hasError) throw env.error;
    }
    return next();
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources
};
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>memoize
]);
function memoize(fn) {
    var cache = Object.create(null);
    return function(arg) {
        if (cache[arg] === undefined) cache[arg] = fn(arg);
        return cache[arg];
    };
}
;
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>isPropValid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f40$emotion$2f$memoize$2f$dist$2f$emotion$2d$memoize$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js [app-rsc] (ecmascript)");
;
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23
var isPropValid = /* #__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f40$emotion$2f$memoize$2f$dist$2f$emotion$2d$memoize$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
});
;
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/shallowequal/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

//
module.exports = function shallowEqual(objA, objB, compare, compareContext) {
    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
    if (ret !== void 0) {
        return !!ret;
    }
    if (objA === objB) {
        return true;
    }
    if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
        return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    // Test for A's keys different from B.
    for(var idx = 0; idx < keysA.length; idx++){
        var key = keysA[idx];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        var valueA = objA[key];
        var valueB = objB[key];
        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
        if (ret === false || ret === void 0 && valueA !== valueB) {
            return false;
        }
    }
    return true;
};
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Enum.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHARSET",
    ()=>CHARSET,
    "COMMENT",
    ()=>COMMENT,
    "COUNTER_STYLE",
    ()=>COUNTER_STYLE,
    "DECLARATION",
    ()=>DECLARATION,
    "DOCUMENT",
    ()=>DOCUMENT,
    "FONT_FACE",
    ()=>FONT_FACE,
    "FONT_FEATURE_VALUES",
    ()=>FONT_FEATURE_VALUES,
    "IMPORT",
    ()=>IMPORT,
    "KEYFRAMES",
    ()=>KEYFRAMES,
    "LAYER",
    ()=>LAYER,
    "MEDIA",
    ()=>MEDIA,
    "MOZ",
    ()=>MOZ,
    "MS",
    ()=>MS,
    "NAMESPACE",
    ()=>NAMESPACE,
    "PAGE",
    ()=>PAGE,
    "RULESET",
    ()=>RULESET,
    "SCOPE",
    ()=>SCOPE,
    "SUPPORTS",
    ()=>SUPPORTS,
    "VIEWPORT",
    ()=>VIEWPORT,
    "WEBKIT",
    ()=>WEBKIT
]);
var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';
var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';
var PAGE = '@page';
var MEDIA = '@media';
var IMPORT = '@import';
var CHARSET = '@charset';
var VIEWPORT = '@viewport';
var SUPPORTS = '@supports';
var DOCUMENT = '@document';
var NAMESPACE = '@namespace';
var KEYFRAMES = '@keyframes';
var FONT_FACE = '@font-face';
var COUNTER_STYLE = '@counter-style';
var FONT_FEATURE_VALUES = '@font-feature-values';
var LAYER = '@layer';
var SCOPE = '@scope';
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Utility.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @param {number}
 * @return {number}
 */ __turbopack_context__.s([
    "abs",
    ()=>abs,
    "append",
    ()=>append,
    "assign",
    ()=>assign,
    "charat",
    ()=>charat,
    "combine",
    ()=>combine,
    "filter",
    ()=>filter,
    "from",
    ()=>from,
    "hash",
    ()=>hash,
    "indexof",
    ()=>indexof,
    "match",
    ()=>match,
    "replace",
    ()=>replace,
    "sizeof",
    ()=>sizeof,
    "strlen",
    ()=>strlen,
    "substr",
    ()=>substr,
    "trim",
    ()=>trim
]);
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length) {
    return charat(value, 0) ^ 45 ? (((length << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
    return value.trim();
}
function match(value, pattern) {
    return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
    return value.replace(pattern, replacement);
}
function indexof(value, search, position) {
    return value.indexOf(search, position);
}
function charat(value, index) {
    return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
    return value.slice(begin, end);
}
function strlen(value) {
    return value.length;
}
function sizeof(value) {
    return value.length;
}
function append(value, array) {
    return array.push(value), value;
}
function combine(array, callback) {
    return array.map(callback).join('');
}
function filter(array, pattern) {
    return array.filter(function(value) {
        return !match(value, pattern);
    });
}
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Tokenizer.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alloc",
    ()=>alloc,
    "caret",
    ()=>caret,
    "char",
    ()=>char,
    "character",
    ()=>character,
    "characters",
    ()=>characters,
    "column",
    ()=>column,
    "commenter",
    ()=>commenter,
    "copy",
    ()=>copy,
    "dealloc",
    ()=>dealloc,
    "delimit",
    ()=>delimit,
    "delimiter",
    ()=>delimiter,
    "escaping",
    ()=>escaping,
    "identifier",
    ()=>identifier,
    "length",
    ()=>length,
    "lift",
    ()=>lift,
    "line",
    ()=>line,
    "next",
    ()=>next,
    "node",
    ()=>node,
    "peek",
    ()=>peek,
    "position",
    ()=>position,
    "prev",
    ()=>prev,
    "slice",
    ()=>slice,
    "token",
    ()=>token,
    "tokenize",
    ()=>tokenize,
    "tokenizer",
    ()=>tokenizer,
    "whitespace",
    ()=>whitespace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Utility.js [app-rsc] (ecmascript)");
;
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = '';
function node(value, root, parent, type, props, children, length, siblings) {
    return {
        value: value,
        root: root,
        parent: parent,
        type: type,
        props: props,
        children: children,
        line: line,
        column: column,
        length: length,
        return: '',
        siblings: siblings
    };
}
function copy(root, props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["assign"])(node('', null, null, '', null, null, 0, root.siblings), root, {
        length: -root.length
    }, props);
}
function lift(root) {
    while(root.root)root = copy(root.root, {
        children: [
            root
        ]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["append"])(root, root.siblings);
}
function char() {
    return character;
}
function prev() {
    character = position > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(characters, --position) : 0;
    if (column--, character === 10) column = 1, line--;
    return character;
}
function next() {
    character = position < length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(characters, position++) : 0;
    if (column++, character === 10) column = 1, line++;
    return character;
}
function peek() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(characters, position);
}
function caret() {
    return position;
}
function slice(begin, end) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["substr"])(characters, begin, end);
}
function token(type) {
    switch(type){
        // \0 \t \n \r \s whitespace token
        case 0:
        case 9:
        case 10:
        case 13:
        case 32:
            return 5;
        // ! + , / > @ ~ isolate token
        case 33:
        case 43:
        case 44:
        case 47:
        case 62:
        case 64:
        case 126:
        // ; { } breakpoint token
        case 59:
        case 123:
        case 125:
            return 4;
        // : accompanied token
        case 58:
            return 3;
        // " ' ( [ opening delimit token
        case 34:
        case 39:
        case 40:
        case 91:
            return 2;
        // ) ] closing delimit token
        case 41:
        case 93:
            return 1;
    }
    return 0;
}
function alloc(value) {
    return line = column = 1, length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(characters = value), position = 0, [];
}
function dealloc(value) {
    return characters = '', value;
}
function delimit(type) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trim"])(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function tokenize(value) {
    return dealloc(tokenizer(alloc(value)));
}
function whitespace(type) {
    while(character = peek())if (character < 33) next();
    else break;
    return token(type) > 2 || token(character) > 3 ? '' : ' ';
}
function tokenizer(children) {
    while(next())switch(token(character)){
        case 0:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["append"])(identifier(position - 1), children);
            break;
        case 2:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["append"])(delimit(character), children);
            break;
        default:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["append"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["from"])(character), children);
    }
    return children;
}
function escaping(index, count) {
    while(--count && next())// not 0-9 A-F a-f
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
    return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
    while(next())switch(character){
        // ] ) " '
        case type:
            return position;
        // " '
        case 34:
        case 39:
            if (type !== 34 && type !== 39) delimiter(character);
            break;
        // (
        case 40:
            if (type === 41) delimiter(type);
            break;
        // \
        case 92:
            next();
            break;
    }
    return position;
}
function commenter(type, index) {
    while(next())// //
    if (type + character === 47 + 10) break;
    else if (type + character === 42 + 42 && peek() === 47) break;
    return '/*' + slice(index, position - 1) + '*' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["from"])(type === 47 ? type : next());
}
function identifier(index) {
    while(!token(peek()))next();
    return slice(index, position);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Serializer.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serialize",
    ()=>serialize,
    "stringify",
    ()=>stringify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Enum.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Utility.js [app-rsc] (ecmascript)");
;
;
function serialize(children, callback) {
    var output = '';
    for(var i = 0; i < children.length; i++)output += callback(children[i], i, children, callback) || '';
    return output;
}
function stringify(element, index, children, callback) {
    switch(element.type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LAYER"]:
            if (element.children.length) break;
        case __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IMPORT"]:
        case __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DECLARATION"]:
            return element.return = element.return || element.value;
        case __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["COMMENT"]:
            return '';
        case __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["KEYFRAMES"]:
            return element.return = element.value + '{' + serialize(element.children, callback) + '}';
        case __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RULESET"]:
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(element.value = element.props.join(','))) return '';
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : '';
}
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Prefixer.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prefix",
    ()=>prefix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Enum.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Utility.js [app-rsc] (ecmascript)");
;
;
function prefix(value, length, children) {
    switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hash"])(value, length)){
        // color-adjust
        case 5103:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + 'print-' + value + value;
        // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
        case 5737:
        case 4201:
        case 3177:
        case 3433:
        case 1641:
        case 4457:
        case 2921:
        // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
        case 5572:
        case 6356:
        case 5844:
        case 3191:
        case 6645:
        case 3005:
        // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
        case 6391:
        case 5879:
        case 5623:
        case 6135:
        case 4599:
        case 4855:
        // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
        case 4215:
        case 6389:
        case 5109:
        case 5365:
        case 5621:
        case 3829:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + value;
        // tab-size
        case 4789:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MOZ"] + value + value;
        // appearance, user-select, transform, hyphens, text-size-adjust
        case 5349:
        case 4246:
        case 4810:
        case 6968:
        case 2756:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MOZ"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + value + value;
        // writing-mode
        case 5936:
            switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(value, length + 11)){
                // vertical-l(r)
                case 114:
                    return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
                // vertical-r(l)
                case 108:
                    return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
                // horizontal(-)tb
                case 45:
                    return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
            }
        // flex, flex-direction, scroll-snap-type, writing-mode
        case 6828:
        case 4268:
        case 2903:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + value + value;
        // order
        case 6165:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + 'flex-' + value + value;
        // align-items
        case 5187:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /(\w+).+(:[^]+)/, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + 'box-$1$2' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + 'flex-$1$2') + value;
        // align-self
        case 5443:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + 'flex-item-' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /flex-|-self/g, '') + (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["match"])(value, /flex-|baseline/) ? __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + 'grid-row-' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /flex-|-self/g, '') : '') + value;
        // align-content
        case 4675:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + 'flex-line-pack' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /align-content|flex-|-self/g, '') + value;
        // flex-shrink
        case 5548:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, 'shrink', 'negative') + value;
        // flex-basis
        case 5292:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, 'basis', 'preferred-size') + value;
        // flex-grow
        case 6060:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + 'box-' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, '-grow', '') + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, 'grow', 'positive') + value;
        // transition
        case 4554:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /([^-])(transform)/g, '$1' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + '$2') + value;
        // cursor
        case 6187:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /(zoom-|grab)/, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + '$1'), /(image-set)/, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + '$1'), value, '') + value;
        // background, background-image
        case 5495:
        case 3959:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /(image-set\([^]*)/, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + '$1' + '$`$1');
        // justify-content
        case 4968:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /(.+:)(flex-)?(.*)/, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + 'box-pack:$3' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + value + value;
        // justify-self
        case 4200:
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["match"])(value, /flex-|baseline/)) return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + 'grid-column-align' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["substr"])(value, length) + value;
            break;
        // grid-template-(columns|rows)
        case 2592:
        case 3360:
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, 'template-', '') + value;
        // grid-(row|column)-start
        case 4384:
        case 3616:
            if (children && children.some(function(element, index) {
                return length = index, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["match"])(element.props, /grid-\w+-end/);
            })) {
                return ~(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["indexof"])(value + (children = children[length].value), 'span', 0) ? value : __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, '-start', '') + value + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + 'grid-row-span:' + (~(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["indexof"])(children, 'span', 0) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["match"])(children, /\d+/) : +(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["match"])(children, /\d+/) - +(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["match"])(value, /\d+/)) + ';';
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, '-start', '') + value;
        // grid-(row|column)-end
        case 4896:
        case 4128:
            return children && children.some(function(element) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["match"])(element.props, /grid-\w+-start/);
            }) ? value : __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, '-end', '-span'), 'span ', '') + value;
        // (margin|padding)-inline-(start|end)
        case 4095:
        case 3583:
        case 4068:
        case 2532:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /(.+)-inline(.+)/, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + '$1$2') + value;
        // (min|max)?(width|height|inline-size|block-size)
        case 8116:
        case 7059:
        case 5753:
        case 5535:
        case 5445:
        case 5701:
        case 4933:
        case 4677:
        case 5533:
        case 5789:
        case 5021:
        case 4765:
            // stretch, max-content, min-content, fill-available
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(value) - 1 - length > 6) switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(value, length + 1)){
                // (m)ax-content, (m)in-content
                case 109:
                    // -
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(value, length + 4) !== 45) break;
                // (f)ill-available, (f)it-content
                case 102:
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /(.+:)(.+)-([^]+)/, '$1' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + '$2-$3' + '$1' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MOZ"] + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
                // (s)tretch
                case 115:
                    return ~(0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["indexof"])(value, 'stretch', 0) ? prefix((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, 'stretch', 'fill-available'), length, children) + value : value;
            }
            break;
        // grid-(column|row)
        case 5152:
        case 5920:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_, a, b, c, d, e, f) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + a + ':' + b + f + (c ? __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + a + '-span:' + (d ? e : +e - +b) + f : '') + value;
            });
        // position: sticky
        case 4949:
            // stick(y)?
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(value, length + 6) === 121) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, ':', ':' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"]) + value;
            break;
        // display: (flex|inline-flex|grid|inline-grid)
        case 6444:
            switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(value, 14) === 45 ? 18 : 11)){
                // (inline-)?fle(x)
                case 120:
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + '$2$3' + '$1' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + '$2box$3') + value;
                // (inline-)?gri(d)
                case 100:
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, ':', ':' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"]) + value;
            }
            break;
        // scroll-margin, scroll-margin-(top|right|bottom|left)
        case 5719:
        case 2647:
        case 2135:
        case 3927:
        case 2391:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, 'scroll-', 'scroll-snap-') + value;
    }
    return value;
}
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Middleware.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "middleware",
    ()=>middleware,
    "namespace",
    ()=>namespace,
    "prefixer",
    ()=>prefixer,
    "rulesheet",
    ()=>rulesheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Enum.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Utility.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Tokenizer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Serializer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Serializer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Prefixer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Prefixer.js [app-rsc] (ecmascript)");
;
;
;
;
;
function middleware(collection) {
    var length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sizeof"])(collection);
    return function(element, index, children, callback) {
        var output = '';
        for(var i = 0; i < length; i++)output += collection[i](element, index, children, callback) || '';
        return output;
    };
}
function rulesheet(callback) {
    return function(element) {
        if (!element.root) {
            if (element = element.return) callback(element);
        }
    };
}
function prefixer(element, index, children, callback) {
    if (element.length > -1) {
        if (!element.return) switch(element.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DECLARATION"]:
                element.return = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Prefixer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prefix"])(element.value, element.length, children);
                return;
            case __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["KEYFRAMES"]:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Serializer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serialize"])([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copy"])(element, {
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(element.value, '@', '@' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"])
                    })
                ], callback);
            case __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RULESET"]:
                if (element.length) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["combine"])(children = element.props, function(value) {
                    switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["match"])(value, callback = /(::plac\w+|:read-\w+)/)){
                        // :read-(only|write)
                        case ':read-only':
                        case ':read-write':
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lift"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copy"])(element, {
                                props: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /:(read-\w+)/, ':' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MOZ"] + '$1')
                                ]
                            }));
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lift"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copy"])(element, {
                                props: [
                                    value
                                ]
                            }));
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["assign"])(element, {
                                props: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["filter"])(children, callback)
                            });
                            break;
                        // :placeholder
                        case '::placeholder':
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lift"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copy"])(element, {
                                props: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /:(plac\w+)/, ':' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WEBKIT"] + 'input-$1')
                                ]
                            }));
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lift"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copy"])(element, {
                                props: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /:(plac\w+)/, ':' + __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MOZ"] + '$1')
                                ]
                            }));
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lift"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copy"])(element, {
                                props: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(value, /:(plac\w+)/, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MS"] + 'input-$1')
                                ]
                            }));
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lift"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["copy"])(element, {
                                props: [
                                    value
                                ]
                            }));
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["assign"])(element, {
                                props: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["filter"])(children, callback)
                            });
                            break;
                    }
                    return '';
                });
        }
    }
}
function namespace(element) {
    switch(element.type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RULESET"]:
            element.props = element.props.map(function(value) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["combine"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tokenize"])(value), function(value, index, children) {
                    switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(value, 0)){
                        // \f
                        case 12:
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["substr"])(value, 1, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(value));
                        // \0 ( + > ~
                        case 0:
                        case 40:
                        case 43:
                        case 62:
                        case 126:
                            return value;
                        // :
                        case 58:
                            if (children[++index] === 'global') children[index] = '', children[++index] = '\f' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["substr"])(children[index], index = 1, -1);
                        // \s
                        case 32:
                            return index === 1 ? '' : value;
                        default:
                            switch(index){
                                case 0:
                                    element = value;
                                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sizeof"])(children) > 1 ? '' : value;
                                case index = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sizeof"])(children) - 1:
                                case 2:
                                    return index === 2 ? value + element + element : value + element;
                                default:
                                    return value;
                            }
                    }
                });
            });
    }
}
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Parser.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "comment",
    ()=>comment,
    "compile",
    ()=>compile,
    "declaration",
    ()=>declaration,
    "parse",
    ()=>parse,
    "ruleset",
    ()=>ruleset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Enum.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Utility.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Tokenizer.js [app-rsc] (ecmascript)");
;
;
;
function compile(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dealloc"])(parse('', null, null, null, [
        ''
    ], value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["alloc"])(value), 0, [
        0
    ], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
    var index = 0;
    var offset = 0;
    var length = pseudo;
    var atrule = 0;
    var property = 0;
    var previous = 0;
    var variable = 1;
    var scanning = 1;
    var ampersand = 1;
    var character = 0;
    var type = '';
    var props = rules;
    var children = rulesets;
    var reference = rule;
    var characters = type;
    while(scanning)switch(previous = character, character = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["next"])()){
        // (
        case 40:
            if (previous != 108 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(characters, length - 1) == 58) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["indexof"])(characters += (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["delimit"])(character), '&', '&\f'), '&\f', (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abs"])(index ? points[index - 1] : 0)) != -1) ampersand = -1;
                break;
            }
        // " ' [
        case 34:
        case 39:
        case 91:
            characters += (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["delimit"])(character);
            break;
        // \t \n \r \s
        case 9:
        case 10:
        case 13:
        case 32:
            characters += (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["whitespace"])(previous);
            break;
        // \
        case 92:
            characters += (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["escaping"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["caret"])() - 1, 7);
            continue;
        // /
        case 47:
            switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["peek"])()){
                case 42:
                case 47:
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["append"])(comment((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["commenter"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["next"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["caret"])()), root, parent, declarations), declarations);
                    break;
                default:
                    characters += '/';
            }
            break;
        // {
        case 123 * variable:
            points[index++] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(characters) * ampersand;
        // } ; \0
        case 125 * variable:
        case 59:
        case 0:
            switch(character){
                // \0 }
                case 0:
                case 125:
                    scanning = 0;
                // ;
                case 59 + offset:
                    if (ampersand == -1) characters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(characters, /\f/g, '');
                    if (property > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(characters) - length) (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["append"])(property > 32 ? declaration(characters + ';', rule, parent, length - 1, declarations) : declaration((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(characters, ' ', '') + ';', rule, parent, length - 2, declarations), declarations);
                    break;
                // @ ;
                case 59:
                    characters += ';';
                // { rule/at-rule
                default:
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["append"])(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length, rulesets), rulesets);
                    if (character === 123) if (offset === 0) parse(characters, root, reference, reference, props, rulesets, length, points, children);
                    else switch(atrule === 99 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["charat"])(characters, 3) === 110 ? 100 : atrule){
                        // d l m s
                        case 100:
                        case 108:
                        case 109:
                        case 115:
                            parse(value, reference, reference, rule && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["append"])(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length, children), children), rules, children, length, points, rule ? props : children);
                            break;
                        default:
                            parse(characters, reference, reference, reference, [
                                ''
                            ], children, 0, points, children);
                    }
            }
            index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
            break;
        // :
        case 58:
            length = 1 + (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(characters), property = previous;
        default:
            if (variable < 1) {
                if (character == 123) --variable;
                else if (character == 125 && variable++ == 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prev"])() == 125) continue;
            }
            switch(characters += (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["from"])(character), character * variable){
                // &
                case 38:
                    ampersand = offset > 0 ? 1 : (characters += '\f', -1);
                    break;
                // ,
                case 44:
                    points[index++] = ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(characters) - 1) * ampersand, ampersand = 1;
                    break;
                // @
                case 64:
                    // -
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["peek"])() === 45) characters += (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["delimit"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["next"])());
                    atrule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["peek"])(), offset = length = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(type = characters += (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["identifier"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["caret"])())), character++;
                    break;
                // -
                case 45:
                    if (previous === 45 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strlen"])(characters) == 2) variable = 0;
            }
    }
    return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length, siblings) {
    var post = offset - 1;
    var rule = offset === 0 ? rules : [
        ''
    ];
    var size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sizeof"])(rule);
    for(var i = 0, j = 0, k = 0; i < index; ++i)for(var x = 0, y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["substr"])(value, post + 1, post = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["abs"])(j = points[i])), z = value; x < size; ++x)if (z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trim"])(j > 0 ? rule[x] + ' ' + y : (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["replace"])(y, /&\f/g, rule[x]))) props[k++] = z;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["node"])(value, root, parent, offset === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RULESET"] : type, props, children, length, siblings);
}
function comment(value, root, parent, siblings) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["node"])(value, root, parent, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["COMMENT"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["from"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["char"])()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["substr"])(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length, siblings) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Tokenizer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["node"])(value, root, parent, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DECLARATION"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["substr"])(value, 0, length), (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Utility$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["substr"])(value, length + 1, -1), length, siblings);
}
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/@emotion/unitless/dist/emotion-unitless.esm.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>unitlessKeys
]);
var unitlessKeys = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
};
;
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/styled-components/dist/styled-components.esm.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ServerStyleSheet",
    ()=>gt,
    "StyleSheetConsumer",
    ()=>Be,
    "StyleSheetContext",
    ()=>$e,
    "StyleSheetManager",
    ()=>Ye,
    "ThemeConsumer",
    ()=>tt,
    "ThemeContext",
    ()=>et,
    "ThemeProvider",
    ()=>ot,
    "__PRIVATE__",
    ()=>St,
    "createGlobalStyle",
    ()=>ft,
    "css",
    ()=>lt,
    "default",
    ()=>dt,
    "isStyledComponent",
    ()=>se,
    "keyframes",
    ()=>mt,
    "styled",
    ()=>dt,
    "useTheme",
    ()=>nt,
    "version",
    ()=>v,
    "withTheme",
    ()=>yt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/tslib/tslib.es6.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f40$emotion$2f$is$2d$prop$2d$valid$2f$dist$2f$emotion$2d$is$2d$prop$2d$valid$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$shallowequal$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/shallowequal/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Enum.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Middleware$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Middleware.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Serializer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Serializer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Parser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/stylis/src/Parser.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f40$emotion$2f$unitless$2f$dist$2f$emotion$2d$unitless$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/@emotion/unitless/dist/emotion-unitless.esm.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
var f = "undefined" != typeof process && void 0 !== process.env && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", m = "active", y = "data-styled-version", v = "6.1.19", g = "/*!sc*/\n", S = "undefined" != ("TURBOPACK compile-time value", "undefined") && "undefined" != typeof document, w = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== process.env && void 0 !== process.env.REACT_APP_SC_DISABLE_SPEEDY && "" !== process.env.REACT_APP_SC_DISABLE_SPEEDY ? "false" !== process.env.REACT_APP_SC_DISABLE_SPEEDY && process.env.REACT_APP_SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== process.env && void 0 !== process.env.SC_DISABLE_SPEEDY && "" !== process.env.SC_DISABLE_SPEEDY ? "false" !== process.env.SC_DISABLE_SPEEDY && process.env.SC_DISABLE_SPEEDY : "production" !== ("TURBOPACK compile-time value", "development")), b = {}, E = /invalid hook call/i, N = new Set, P = function(t, n) {
    if ("TURBOPACK compile-time truthy", 1) {
        var o = n ? ' with the id of "'.concat(n, '"') : "", s = "The component ".concat(t).concat(o, " has been created dynamically.\n") + "You may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.\nSee https://styled-components.com/docs/basics#define-styled-components-outside-of-the-render-method for more info.\n", i = console.error;
        try {
            var a = !0;
            console.error = function(t) {
                for(var n = [], o = 1; o < arguments.length; o++)n[o - 1] = arguments[o];
                E.test(t) ? (a = !1, N.delete(s)) : i.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__spreadArray"])([
                    t
                ], n, !1));
            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])(), a && !N.has(s) && (console.warn(s), N.add(s));
        } catch (e) {
            E.test(e.message) && N.delete(s);
        } finally{
            console.error = i;
        }
    }
}, _ = Object.freeze([]), C = Object.freeze({});
function I(e, t, n) {
    return void 0 === n && (n = C), e.theme !== n.theme && e.theme || t || n.theme;
}
var A = new Set([
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "track",
    "u",
    "ul",
    "use",
    "var",
    "video",
    "wbr",
    "circle",
    "clipPath",
    "defs",
    "ellipse",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "text",
    "tspan"
]), O = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, D = /(^-|-$)/g;
function R(e) {
    return e.replace(O, "-").replace(D, "");
}
var T = /(a)(d)/gi, k = 52, j = function(e) {
    return String.fromCharCode(e + (e > 25 ? 39 : 97));
};
function x(e) {
    var t, n = "";
    for(t = Math.abs(e); t > k; t = t / k | 0)n = j(t % k) + n;
    return (j(t % k) + n).replace(T, "$1-$2");
}
var V, F = 5381, z = function(e, t) {
    for(var n = t.length; n;)e = 33 * e ^ t.charCodeAt(--n);
    return e;
}, M = function(e) {
    return z(F, e);
};
function $(e) {
    return x(M(e) >>> 0);
}
function B(e) {
    return "production" !== ("TURBOPACK compile-time value", "development") && "string" == typeof e && e || e.displayName || e.name || "Component";
}
function G(e) {
    return "string" == typeof e && ("production" === ("TURBOPACK compile-time value", "development") || e.charAt(0) === e.charAt(0).toLowerCase());
}
var L = "function" == typeof Symbol && Symbol.for, Y = L ? Symbol.for("react.memo") : 60115, q = L ? Symbol.for("react.forward_ref") : 60112, W = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0
}, H = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
}, U = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
}, J = ((V = {})[q] = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
}, V[Y] = U, V);
function X(e) {
    return ("type" in (t = e) && t.type.$$typeof) === Y ? U : "$$typeof" in e ? J[e.$$typeof] : W;
    //TURBOPACK unreachable
    ;
    var t;
}
var Z = Object.defineProperty, K = Object.getOwnPropertyNames, Q = Object.getOwnPropertySymbols, ee = Object.getOwnPropertyDescriptor, te = Object.getPrototypeOf, ne = Object.prototype;
function oe(e, t, n) {
    if ("string" != typeof t) {
        if (ne) {
            var o = te(t);
            o && o !== ne && oe(e, o, n);
        }
        var r = K(t);
        Q && (r = r.concat(Q(t)));
        for(var s = X(e), i = X(t), a = 0; a < r.length; ++a){
            var c = r[a];
            if (!(c in H || n && n[c] || i && c in i || s && c in s)) {
                var l = ee(t, c);
                try {
                    Z(e, c, l);
                } catch (e) {}
            }
        }
    }
    return e;
}
function re(e) {
    return "function" == typeof e;
}
function se(e) {
    return "object" == typeof e && "styledComponentId" in e;
}
function ie(e, t) {
    return e && t ? "".concat(e, " ").concat(t) : e || t || "";
}
function ae(e, t) {
    if (0 === e.length) return "";
    for(var n = e[0], o = 1; o < e.length; o++)n += t ? t + e[o] : e[o];
    return n;
}
function ce(e) {
    return null !== e && "object" == typeof e && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function le(e, t, n) {
    if (void 0 === n && (n = !1), !n && !ce(e) && !Array.isArray(e)) return t;
    if (Array.isArray(t)) for(var o = 0; o < t.length; o++)e[o] = le(e[o], t[o]);
    else if (ce(t)) for(var o in t)e[o] = le(e[o], t[o]);
    return e;
}
function ue(e, t) {
    Object.defineProperty(e, "toString", {
        value: t
    });
}
var pe = ("TURBOPACK compile-time truthy", 1) ? {
    1: "Cannot create styled-component for component: %s.\n\n",
    2: "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",
    3: "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",
    4: "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",
    5: "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",
    6: "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",
    7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',
    8: 'ThemeProvider: Please make your "theme" prop an object.\n\n',
    9: "Missing document `<head>`\n\n",
    10: "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",
    11: "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",
    12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",
    13: "%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",
    14: 'ThemeProvider: "theme" prop is required.\n\n',
    15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",
    16: "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",
    17: "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n",
    18: "ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`"
} : "TURBOPACK unreachable";
function de() {
    for(var e = [], t = 0; t < arguments.length; t++)e[t] = arguments[t];
    for(var n = e[0], o = [], r = 1, s = e.length; r < s; r += 1)o.push(e[r]);
    return o.forEach(function(e) {
        n = n.replace(/%[a-z]/, e);
    }), n;
}
function he(t) {
    for(var n = [], o = 1; o < arguments.length; o++)n[o - 1] = arguments[o];
    return ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : new Error(de.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__spreadArray"])([
        pe[t]
    ], n, !1)).trim());
}
var fe = function() {
    function e(e) {
        this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e;
    }
    return e.prototype.indexOfGroup = function(e) {
        for(var t = 0, n = 0; n < e; n++)t += this.groupSizes[n];
        return t;
    }, e.prototype.insertRules = function(e, t) {
        if (e >= this.groupSizes.length) {
            for(var n = this.groupSizes, o = n.length, r = o; e >= r;)if ((r <<= 1) < 0) throw he(16, "".concat(e));
            this.groupSizes = new Uint32Array(r), this.groupSizes.set(n), this.length = r;
            for(var s = o; s < r; s++)this.groupSizes[s] = 0;
        }
        for(var i = this.indexOfGroup(e + 1), a = (s = 0, t.length); s < a; s++)this.tag.insertRule(i, t[s]) && (this.groupSizes[e]++, i++);
    }, e.prototype.clearGroup = function(e) {
        if (e < this.length) {
            var t = this.groupSizes[e], n = this.indexOfGroup(e), o = n + t;
            this.groupSizes[e] = 0;
            for(var r = n; r < o; r++)this.tag.deleteRule(n);
        }
    }, e.prototype.getGroup = function(e) {
        var t = "";
        if (e >= this.length || 0 === this.groupSizes[e]) return t;
        for(var n = this.groupSizes[e], o = this.indexOfGroup(e), r = o + n, s = o; s < r; s++)t += "".concat(this.tag.getRule(s)).concat(g);
        return t;
    }, e;
}(), me = 1 << 30, ye = new Map, ve = new Map, ge = 1, Se = function(e) {
    if (ye.has(e)) return ye.get(e);
    for(; ve.has(ge);)ge++;
    var t = ge++;
    if ("production" !== ("TURBOPACK compile-time value", "development") && ((0 | t) < 0 || t > me)) throw he(16, "".concat(t));
    return ye.set(e, t), ve.set(t, e), t;
}, we = function(e, t) {
    ge = t + 1, ye.set(e, t), ve.set(t, e);
}, be = "style[".concat(f, "][").concat(y, '="').concat(v, '"]'), Ee = new RegExp("^".concat(f, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), Ne = function(e, t, n) {
    for(var o, r = n.split(","), s = 0, i = r.length; s < i; s++)(o = r[s]) && e.registerName(t, o);
}, Pe = function(e, t) {
    for(var n, o = (null !== (n = t.textContent) && void 0 !== n ? n : "").split(g), r = [], s = 0, i = o.length; s < i; s++){
        var a = o[s].trim();
        if (a) {
            var c = a.match(Ee);
            if (c) {
                var l = 0 | parseInt(c[1], 10), u = c[2];
                0 !== l && (we(u, l), Ne(e, u, c[3]), e.getTag().insertRules(l, r)), r.length = 0;
            } else r.push(a);
        }
    }
}, _e = function(e) {
    for(var t = document.querySelectorAll(be), n = 0, o = t.length; n < o; n++){
        var r = t[n];
        r && r.getAttribute(f) !== m && (Pe(e, r), r.parentNode && r.parentNode.removeChild(r));
    }
};
function Ce() {
    return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
}
var Ie = function(e) {
    var t = document.head, n = e || t, o = document.createElement("style"), r = function(e) {
        var t = Array.from(e.querySelectorAll("style[".concat(f, "]")));
        return t[t.length - 1];
    }(n), s = void 0 !== r ? r.nextSibling : null;
    o.setAttribute(f, m), o.setAttribute(y, v);
    var i = Ce();
    return i && o.setAttribute("nonce", i), n.insertBefore(o, s), o;
}, Ae = function() {
    function e(e) {
        this.element = Ie(e), this.element.appendChild(document.createTextNode("")), this.sheet = function(e) {
            if (e.sheet) return e.sheet;
            for(var t = document.styleSheets, n = 0, o = t.length; n < o; n++){
                var r = t[n];
                if (r.ownerNode === e) return r;
            }
            throw he(17);
        }(this.element), this.length = 0;
    }
    return e.prototype.insertRule = function(e, t) {
        try {
            return this.sheet.insertRule(t, e), this.length++, !0;
        } catch (e) {
            return !1;
        }
    }, e.prototype.deleteRule = function(e) {
        this.sheet.deleteRule(e), this.length--;
    }, e.prototype.getRule = function(e) {
        var t = this.sheet.cssRules[e];
        return t && t.cssText ? t.cssText : "";
    }, e;
}(), Oe = function() {
    function e(e) {
        this.element = Ie(e), this.nodes = this.element.childNodes, this.length = 0;
    }
    return e.prototype.insertRule = function(e, t) {
        if (e <= this.length && e >= 0) {
            var n = document.createTextNode(t);
            return this.element.insertBefore(n, this.nodes[e] || null), this.length++, !0;
        }
        return !1;
    }, e.prototype.deleteRule = function(e) {
        this.element.removeChild(this.nodes[e]), this.length--;
    }, e.prototype.getRule = function(e) {
        return e < this.length ? this.nodes[e].textContent : "";
    }, e;
}(), De = function() {
    function e(e) {
        this.rules = [], this.length = 0;
    }
    return e.prototype.insertRule = function(e, t) {
        return e <= this.length && (this.rules.splice(e, 0, t), this.length++, !0);
    }, e.prototype.deleteRule = function(e) {
        this.rules.splice(e, 1), this.length--;
    }, e.prototype.getRule = function(e) {
        return e < this.length ? this.rules[e] : "";
    }, e;
}(), Re = S, Te = {
    isServer: !S,
    useCSSOMInjection: !w
}, ke = function() {
    function e(e, n, o) {
        void 0 === e && (e = C), void 0 === n && (n = {});
        var r = this;
        this.options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])({}, Te), e), this.gs = n, this.names = new Map(o), this.server = !!e.isServer, !this.server && S && Re && (Re = !1, _e(this)), ue(this, function() {
            return function(e) {
                for(var t = e.getTag(), n = t.length, o = "", r = function(n) {
                    var r = function(e) {
                        return ve.get(e);
                    }(n);
                    if (void 0 === r) return "continue";
                    var s = e.names.get(r), i = t.getGroup(n);
                    if (void 0 === s || !s.size || 0 === i.length) return "continue";
                    var a = "".concat(f, ".g").concat(n, '[id="').concat(r, '"]'), c = "";
                    void 0 !== s && s.forEach(function(e) {
                        e.length > 0 && (c += "".concat(e, ","));
                    }), o += "".concat(i).concat(a, '{content:"').concat(c, '"}').concat(g);
                }, s = 0; s < n; s++)r(s);
                return o;
            }(r);
        });
    }
    return e.registerId = function(e) {
        return Se(e);
    }, e.prototype.rehydrate = function() {
        !this.server && S && _e(this);
    }, e.prototype.reconstructWithOptions = function(n, o) {
        return void 0 === o && (o = !0), new e((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])({}, this.options), n), this.gs, o && this.names || void 0);
    }, e.prototype.allocateGSInstance = function(e) {
        return this.gs[e] = (this.gs[e] || 0) + 1;
    }, e.prototype.getTag = function() {
        return this.tag || (this.tag = (e = function(e) {
            var t = e.useCSSOMInjection, n = e.target;
            return e.isServer ? new De(n) : t ? new Ae(n) : new Oe(n);
        }(this.options), new fe(e)));
        //TURBOPACK unreachable
        ;
        var e;
    }, e.prototype.hasNameForId = function(e, t) {
        return this.names.has(e) && this.names.get(e).has(t);
    }, e.prototype.registerName = function(e, t) {
        if (Se(e), this.names.has(e)) this.names.get(e).add(t);
        else {
            var n = new Set;
            n.add(t), this.names.set(e, n);
        }
    }, e.prototype.insertRules = function(e, t, n) {
        this.registerName(e, t), this.getTag().insertRules(Se(e), n);
    }, e.prototype.clearNames = function(e) {
        this.names.has(e) && this.names.get(e).clear();
    }, e.prototype.clearRules = function(e) {
        this.getTag().clearGroup(Se(e)), this.clearNames(e);
    }, e.prototype.clearTag = function() {
        this.tag = void 0;
    }, e;
}(), je = /&/g, xe = /^\s*\/\/.*$/gm;
function Ve(e, t) {
    return e.map(function(e) {
        return "rule" === e.type && (e.value = "".concat(t, " ").concat(e.value), e.value = e.value.replaceAll(",", ",".concat(t, " ")), e.props = e.props.map(function(e) {
            return "".concat(t, " ").concat(e);
        })), Array.isArray(e.children) && "@keyframes" !== e.type && (e.children = Ve(e.children, t)), e;
    });
}
function Fe(e) {
    var t, n, o, r = void 0 === e ? C : e, s = r.options, i = void 0 === s ? C : s, a = r.plugins, c = void 0 === a ? _ : a, l = function(e, o, r) {
        return r.startsWith(n) && r.endsWith(n) && r.replaceAll(n, "").length > 0 ? ".".concat(t) : e;
    }, u = c.slice();
    u.push(function(e) {
        e.type === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Enum$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RULESET"] && e.value.includes("&") && (e.props[0] = e.props[0].replace(je, n).replace(o, l));
    }), i.prefix && u.push(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Middleware$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prefixer"]), u.push(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Serializer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringify"]);
    var p = function(e, r, s, a) {
        void 0 === r && (r = ""), void 0 === s && (s = ""), void 0 === a && (a = "&"), t = a, n = r, o = new RegExp("\\".concat(n, "\\b"), "g");
        var c = e.replace(xe, ""), l = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Parser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["compile"](s || r ? "".concat(s, " ").concat(r, " { ").concat(c, " }") : c);
        i.namespace && (l = Ve(l, i.namespace));
        var p = [];
        return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Serializer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serialize"](l, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Middleware$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["middleware"](u.concat(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$stylis$2f$src$2f$Middleware$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rulesheet"](function(e) {
            return p.push(e);
        })))), p;
    };
    return p.hash = c.length ? c.reduce(function(e, t) {
        return t.name || he(15), z(e, t.name);
    }, F).toString() : "", p;
}
var ze = new ke, Me = Fe(), $e = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createContext({
    shouldForwardProp: void 0,
    styleSheet: ze,
    stylis: Me
}), Be = $e.Consumer, Ge = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createContext(void 0);
function Le() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useContext"])($e);
}
function Ye(e) {
    var t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(e.stylisPlugins), n = t[0], r = t[1], c = Le().styleSheet, l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(function() {
        var t = c;
        return e.sheet ? t = e.sheet : e.target && (t = t.reconstructWithOptions({
            target: e.target
        }, !1)), e.disableCSSOMInjection && (t = t.reconstructWithOptions({
            useCSSOMInjection: !1
        })), t;
    }, [
        e.disableCSSOMInjection,
        e.sheet,
        e.target,
        c
    ]), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(function() {
        return Fe({
            options: {
                namespace: e.namespace,
                prefix: e.enableVendorPrefixes
            },
            plugins: n
        });
    }, [
        e.enableVendorPrefixes,
        e.namespace,
        n
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(function() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$shallowequal$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(n, e.stylisPlugins) || r(e.stylisPlugins);
    }, [
        e.stylisPlugins
    ]);
    var d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(function() {
        return {
            shouldForwardProp: e.shouldForwardProp,
            styleSheet: l,
            stylis: u
        };
    }, [
        e.shouldForwardProp,
        l,
        u
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement($e.Provider, {
        value: d
    }, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement(Ge.Provider, {
        value: u
    }, e.children));
}
var qe = function() {
    function e(e, t) {
        var n = this;
        this.inject = function(e, t) {
            void 0 === t && (t = Me);
            var o = n.name + t.hash;
            e.hasNameForId(n.id, o) || e.insertRules(n.id, o, t(n.rules, o, "@keyframes"));
        }, this.name = e, this.id = "sc-keyframes-".concat(e), this.rules = t, ue(this, function() {
            throw he(12, String(n.name));
        });
    }
    return e.prototype.getName = function(e) {
        return void 0 === e && (e = Me), this.name + e.hash;
    }, e;
}(), We = function(e) {
    return e >= "A" && e <= "Z";
};
function He(e) {
    for(var t = "", n = 0; n < e.length; n++){
        var o = e[n];
        if (1 === n && "-" === o && "-" === e[0]) return e;
        We(o) ? t += "-" + o.toLowerCase() : t += o;
    }
    return t.startsWith("ms-") ? "-" + t : t;
}
var Ue = function(e) {
    return null == e || !1 === e || "" === e;
}, Je = function(t) {
    var n, o, r = [];
    for(var s in t){
        var i = t[s];
        t.hasOwnProperty(s) && !Ue(i) && (Array.isArray(i) && i.isCss || re(i) ? r.push("".concat(He(s), ":"), i, ";") : ce(i) ? r.push.apply(r, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__spreadArray"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__spreadArray"])([
            "".concat(s, " {")
        ], Je(i), !1), [
            "}"
        ], !1)) : r.push("".concat(He(s), ": ").concat((n = s, null == (o = i) || "boolean" == typeof o || "" === o ? "" : "number" != typeof o || 0 === o || n in __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f40$emotion$2f$unitless$2f$dist$2f$emotion$2d$unitless$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"] || n.startsWith("--") ? String(o).trim() : "".concat(o, "px")), ";")));
    }
    return r;
};
function Xe(e, t, n, o) {
    if (Ue(e)) return [];
    if (se(e)) return [
        ".".concat(e.styledComponentId)
    ];
    if (re(e)) {
        if (!re(s = e) || s.prototype && s.prototype.isReactComponent || !t) return [
            e
        ];
        var r = e(t);
        return "production" === ("TURBOPACK compile-time value", "development") || "object" != typeof r || Array.isArray(r) || r instanceof qe || ce(r) || null === r || console.error("".concat(B(e), " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")), Xe(r, t, n, o);
    }
    var s;
    return e instanceof qe ? n ? (e.inject(n, o), [
        e.getName(o)
    ]) : [
        e
    ] : ce(e) ? Je(e) : Array.isArray(e) ? Array.prototype.concat.apply(_, e.map(function(e) {
        return Xe(e, t, n, o);
    })) : [
        e.toString()
    ];
}
function Ze(e) {
    for(var t = 0; t < e.length; t += 1){
        var n = e[t];
        if (re(n) && !se(n)) return !1;
    }
    return !0;
}
var Ke = M(v), Qe = function() {
    function e(e, t, n) {
        this.rules = e, this.staticRulesId = "", this.isStatic = "production" === ("TURBOPACK compile-time value", "development") && (void 0 === n || n.isStatic) && Ze(e), this.componentId = t, this.baseHash = z(Ke, t), this.baseStyle = n, ke.registerId(t);
    }
    return e.prototype.generateAndInjectStyles = function(e, t, n) {
        var o = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e, t, n) : "";
        if (this.isStatic && !n.hash) if (this.staticRulesId && t.hasNameForId(this.componentId, this.staticRulesId)) o = ie(o, this.staticRulesId);
        else {
            var r = ae(Xe(this.rules, e, t, n)), s = x(z(this.baseHash, r) >>> 0);
            if (!t.hasNameForId(this.componentId, s)) {
                var i = n(r, ".".concat(s), void 0, this.componentId);
                t.insertRules(this.componentId, s, i);
            }
            o = ie(o, s), this.staticRulesId = s;
        }
        else {
            for(var a = z(this.baseHash, n.hash), c = "", l = 0; l < this.rules.length; l++){
                var u = this.rules[l];
                if ("string" == typeof u) c += u, "production" !== ("TURBOPACK compile-time value", "development") && (a = z(a, u));
                else if (u) {
                    var p = ae(Xe(u, e, t, n));
                    a = z(a, p + l), c += p;
                }
            }
            if (c) {
                var d = x(a >>> 0);
                t.hasNameForId(this.componentId, d) || t.insertRules(this.componentId, d, n(c, ".".concat(d), void 0, this.componentId)), o = ie(o, d);
            }
        }
        return o;
    }, e;
}(), et = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createContext(void 0), tt = et.Consumer;
function nt() {
    var e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useContext"])(et);
    if (!e) throw he(18);
    return e;
}
function ot(e) {
    var n = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].useContext(et), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(function() {
        return function(e, n) {
            if (!e) throw he(14);
            if (re(e)) {
                var o = e(n);
                if ("production" !== ("TURBOPACK compile-time value", "development") && (null === o || Array.isArray(o) || "object" != typeof o)) throw he(7);
                return o;
            }
            if (Array.isArray(e) || "object" != typeof e) throw he(8);
            return n ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])({}, n), e) : e;
        }(e.theme, n);
    }, [
        e.theme,
        n
    ]);
    return e.children ? __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement(et.Provider, {
        value: r
    }, e.children) : null;
}
var rt = {}, st = new Set;
function it(e, r, s) {
    var i = se(e), a = e, c = !G(e), p = r.attrs, d = void 0 === p ? _ : p, h = r.componentId, f = void 0 === h ? function(e, t) {
        var n = "string" != typeof e ? "sc" : R(e);
        rt[n] = (rt[n] || 0) + 1;
        var o = "".concat(n, "-").concat($(v + n + rt[n]));
        return t ? "".concat(t, "-").concat(o) : o;
    }(r.displayName, r.parentComponentId) : h, m = r.displayName, y = void 0 === m ? function(e) {
        return G(e) ? "styled.".concat(e) : "Styled(".concat(B(e), ")");
    }(e) : m, g = r.displayName && r.componentId ? "".concat(R(r.displayName), "-").concat(r.componentId) : r.componentId || f, S = i && a.attrs ? a.attrs.concat(d).filter(Boolean) : d, w = r.shouldForwardProp;
    if (i && a.shouldForwardProp) {
        var b = a.shouldForwardProp;
        if (r.shouldForwardProp) {
            var E = r.shouldForwardProp;
            w = function(e, t) {
                return b(e, t) && E(e, t);
            };
        } else w = b;
    }
    var N = new Qe(s, g, i ? a.componentStyle : void 0);
    function O(e, r) {
        return function(e, r, s) {
            var i = e.attrs, a = e.componentStyle, c = e.defaultProps, p = e.foldedComponentIds, d = e.styledComponentId, h = e.target, f = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].useContext(et), m = Le(), y = e.shouldForwardProp || m.shouldForwardProp;
            "production" !== ("TURBOPACK compile-time value", "development") && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useDebugValue"])(d);
            var v = I(r, f, c) || C, g = function(e, n, o) {
                for(var r, s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])({}, n), {
                    className: void 0,
                    theme: o
                }), i = 0; i < e.length; i += 1){
                    var a = re(r = e[i]) ? r(s) : r;
                    for(var c in a)s[c] = "className" === c ? ie(s[c], a[c]) : "style" === c ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])({}, s[c]), a[c]) : a[c];
                }
                return n.className && (s.className = ie(s.className, n.className)), s;
            }(i, r, v), S = g.as || h, w = {};
            for(var b in g)void 0 === g[b] || "$" === b[0] || "as" === b || "theme" === b && g.theme === v || ("forwardedAs" === b ? w.as = g.forwardedAs : y && !y(b, S) || (w[b] = g[b], y || "development" !== ("TURBOPACK compile-time value", "development") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f40$emotion$2f$is$2d$prop$2d$valid$2f$dist$2f$emotion$2d$is$2d$prop$2d$valid$2e$esm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(b) || st.has(b) || !A.has(S) || (st.add(b), console.warn('styled-components: it looks like an unknown prop "'.concat(b, '" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));
            var E = function(e, t) {
                var n = Le(), o = e.generateAndInjectStyles(t, n.styleSheet, n.stylis);
                return "production" !== ("TURBOPACK compile-time value", "development") && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useDebugValue"])(o), o;
            }(a, g);
            "production" !== ("TURBOPACK compile-time value", "development") && e.warnTooManyClasses && e.warnTooManyClasses(E);
            var N = ie(p, d);
            return E && (N += " " + E), g.className && (N += " " + g.className), w[G(S) && !A.has(S) ? "class" : "className"] = N, s && (w.ref = s), (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(S, w);
        }(D, e, r);
    }
    O.displayName = y;
    var D = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].forwardRef(O);
    return D.attrs = S, D.componentStyle = N, D.displayName = y, D.shouldForwardProp = w, D.foldedComponentIds = i ? ie(a.foldedComponentIds, a.styledComponentId) : "", D.styledComponentId = g, D.target = i ? a.target : e, Object.defineProperty(D, "defaultProps", {
        get: function() {
            return this._foldedDefaultProps;
        },
        set: function(e) {
            this._foldedDefaultProps = i ? function(e) {
                for(var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n];
                for(var o = 0, r = t; o < r.length; o++)le(e, r[o], !0);
                return e;
            }({}, a.defaultProps, e) : e;
        }
    }), "production" !== ("TURBOPACK compile-time value", "development") && (P(y, g), D.warnTooManyClasses = function(e, t) {
        var n = {}, o = !1;
        return function(r) {
            if (!o && (n[r] = !0, Object.keys(n).length >= 200)) {
                var s = t ? ' with the id of "'.concat(t, '"') : "";
                console.warn("Over ".concat(200, " classes were generated for component ").concat(e).concat(s, ".\n") + "Consider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"), o = !0, n = {};
            }
        };
    }(y, g)), ue(D, function() {
        return ".".concat(D.styledComponentId);
    }), c && oe(D, e, {
        attrs: !0,
        componentStyle: !0,
        displayName: !0,
        foldedComponentIds: !0,
        shouldForwardProp: !0,
        styledComponentId: !0,
        target: !0
    }), D;
}
function at(e, t) {
    for(var n = [
        e[0]
    ], o = 0, r = t.length; o < r; o += 1)n.push(t[o], e[o + 1]);
    return n;
}
var ct = function(e) {
    return Object.assign(e, {
        isCss: !0
    });
};
function lt(t) {
    for(var n = [], o = 1; o < arguments.length; o++)n[o - 1] = arguments[o];
    if (re(t) || ce(t)) return ct(Xe(at(_, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__spreadArray"])([
        t
    ], n, !0))));
    var r = t;
    return 0 === n.length && 1 === r.length && "string" == typeof r[0] ? Xe(r) : ct(Xe(at(r, n)));
}
function ut(n, o, r) {
    if (void 0 === r && (r = C), !o) throw he(1, o);
    var s = function(t) {
        for(var s = [], i = 1; i < arguments.length; i++)s[i - 1] = arguments[i];
        return n(o, r, lt.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__spreadArray"])([
            t
        ], s, !1)));
    };
    return s.attrs = function(e) {
        return ut(n, o, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])({}, r), {
            attrs: Array.prototype.concat(r.attrs, e).filter(Boolean)
        }));
    }, s.withConfig = function(e) {
        return ut(n, o, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])({}, r), e));
    }, s;
}
var pt = function(e) {
    return ut(it, e);
}, dt = pt;
A.forEach(function(e) {
    dt[e] = pt(e);
});
var ht = function() {
    function e(e, t) {
        this.rules = e, this.componentId = t, this.isStatic = Ze(e), ke.registerId(this.componentId + 1);
    }
    return e.prototype.createStyles = function(e, t, n, o) {
        var r = o(ae(Xe(this.rules, t, n, o)), ""), s = this.componentId + e;
        n.insertRules(s, s, r);
    }, e.prototype.removeStyles = function(e, t) {
        t.clearRules(this.componentId + e);
    }, e.prototype.renderStyles = function(e, t, n, o) {
        e > 2 && ke.registerId(this.componentId + e), this.removeStyles(e, n), this.createStyles(e, t, n, o);
    }, e;
}();
function ft(n) {
    for(var r = [], s = 1; s < arguments.length; s++)r[s - 1] = arguments[s];
    var i = lt.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__spreadArray"])([
        n
    ], r, !1)), a = "sc-global-".concat($(JSON.stringify(i))), c = new ht(i, a);
    "production" !== ("TURBOPACK compile-time value", "development") && P(a);
    var l = function(e) {
        var n = Le(), r = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].useContext(et), s = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].useRef(n.styleSheet.allocateGSInstance(a)).current;
        return "production" !== ("TURBOPACK compile-time value", "development") && __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].Children.count(e.children) && console.warn("The global style component ".concat(a, " was given child JSX. createGlobalStyle does not render children.")), "production" !== ("TURBOPACK compile-time value", "development") && i.some(function(e) {
            return "string" == typeof e && -1 !== e.indexOf("@import");
        }) && console.warn("Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app."), n.styleSheet.server && function(e, n, o, r, s) {
            if (c.isStatic) c.renderStyles(e, b, o, s);
            else {
                var i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])({}, n), {
                    theme: I(n, r, l.defaultProps)
                });
                c.renderStyles(e, i, o, s);
            }
        }(s, e, n.styleSheet, r, n.stylis), null;
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].memo(l);
}
function mt(t) {
    for(var n = [], o = 1; o < arguments.length; o++)n[o - 1] = arguments[o];
    "production" !== ("TURBOPACK compile-time value", "development") && "undefined" != typeof navigator && "ReactNative" === navigator.product && console.warn("`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.");
    var r = ae(lt.apply(void 0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__spreadArray"])([
        t
    ], n, !1))), s = $(r);
    return new qe(s, r);
}
function yt(e) {
    var n = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].forwardRef(function(n, r) {
        var s = I(n, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].useContext(et), e.defaultProps);
        return "production" !== ("TURBOPACK compile-time value", "development") && void 0 === s && console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class "'.concat(B(e), '"')), __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement(e, (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])({}, n, {
            theme: s,
            ref: r
        }));
    });
    return n.displayName = "WithTheme(".concat(B(e), ")"), oe(n, e);
}
var vt = /^\s*<\/[a-z]/i, gt = function() {
    function e() {
        var e = this;
        this._emitSheetCSS = function() {
            var t = e.instance.toString();
            if (!t) return "";
            var n = Ce(), o = ae([
                n && 'nonce="'.concat(n, '"'),
                "".concat(f, '="true"'),
                "".concat(y, '="').concat(v, '"')
            ].filter(Boolean), " ");
            return "<style ".concat(o, ">").concat(t, "</style>");
        }, this.getStyleTags = function() {
            if (e.sealed) throw he(2);
            return e._emitSheetCSS();
        }, this.getStyleElement = function() {
            var n;
            if (e.sealed) throw he(2);
            var r = e.instance.toString();
            if (!r) return [];
            var s = ((n = {})[f] = "", n[y] = v, n.dangerouslySetInnerHTML = {
                __html: r
            }, n), i = Ce();
            return i && (s.nonce = i), [
                __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement("style", (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__assign"])({}, s, {
                    key: "sc-0-0"
                }))
            ];
        }, this.seal = function() {
            e.sealed = !0;
        }, this.instance = new ke({
            isServer: !0
        }), this.sealed = !1;
    }
    return e.prototype.collectStyles = function(e) {
        if (this.sealed) throw he(2);
        return __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createElement(Ye, {
            sheet: this.instance
        }, e);
    }, e.prototype.interleaveWithNodeStream = function(e) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (this.sealed) throw he(2);
        this.seal();
        var t = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Transform, n = e, o = this.instance, r = this._emitSheetCSS, s = new t({
            transform: function(e, t, n) {
                var s = e.toString(), i = r();
                if (o.clearTag(), vt.test(s)) {
                    var a = s.indexOf(">") + 1, c = s.slice(0, a), l = s.slice(a);
                    this.push(c + i + l);
                } else this.push(i + s);
                n();
            }
        });
        return n.on("error", function(e) {
            s.emit("error", e);
        }), n.pipe(s);
    }, e;
}(), St = {
    StyleSheet: ke,
    mainSheet: ze
};
"production" !== ("TURBOPACK compile-time value", "development") && "undefined" != typeof navigator && "ReactNative" === navigator.product && console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native");
var wt = "__sc-".concat(f, "__");
"production" !== ("TURBOPACK compile-time value", "development") && "test" !== ("TURBOPACK compile-time value", "development") && "undefined" != ("TURBOPACK compile-time value", "undefined") && (window[wt] || (window[wt] = 0), 1 === window[wt] && console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."), window[wt] += 1);
;
 //# sourceMappingURL=styled-components.esm.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/build/templates/app-page.js?page=/portfolio/page { GLOBAL_ERROR_MODULE => \"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_0 => \"[project]/sk/codebase/newprojs/qwenproj/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_1 => \"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_2 => \"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_3 => \"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_4 => \"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_5 => \"[project]/sk/codebase/newprojs/qwenproj/src/app/portfolio/page.tsx [app-rsc] (ecmascript, Next.js Server Component)\" } [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__next_app__",
    ()=>__next_app__,
    "handler",
    ()=>handler,
    "routeModule",
    ()=>routeModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$module$2e$compiled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$instrumentation$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/instrumentation/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/request-meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/trace/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$interop$2d$default$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/interop-default.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$strip$2d$flight$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/strip-flight-headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/base-http/node.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$experimental$2f$ppr$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/experimental/ppr.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$fallback$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/request/fallback-params.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$encryption$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/encryption-utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$streaming$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/streaming-metadata.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$action$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/action-utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$server$2d$action$2d$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/lib/server-action-request-meta.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/client/components/app-router-headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/is-bot.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/response-cache/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/response-cache/types.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/fallback.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/render-result.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$stream$2d$utils$2f$encoded$2d$tags$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/stream-utils/encoded-tags.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/send-payload.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/client/components/redirect-status-code.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/lib/scheduler.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/shared/lib/router/utils/interception-routes.js [app-rsc] (ecmascript)");
const __TURBOPACK__layout__$23$0__ = ()=>__turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)");
const __TURBOPACK__not$2d$found__$23$1__ = ()=>__turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript, Next.js Server Component)");
const __TURBOPACK__forbidden__$23$2__ = ()=>__turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript, Next.js Server Component)");
const __TURBOPACK__unauthorized__$23$3__ = ()=>__turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript, Next.js Server Component)");
const __TURBOPACK__global$2d$error__$23$4__ = ()=>__turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)");
const __TURBOPACK__page__$23$5__ = ()=>__turbopack_context__.r("[project]/sk/codebase/newprojs/qwenproj/src/app/portfolio/page.tsx [app-rsc] (ecmascript, Next.js Server Component)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = [
    "",
    {
        "children": [
            "portfolio",
            {
                "children": [
                    "__PAGE__",
                    {},
                    {
                        metadata: {},
                        "page": [
                            __TURBOPACK__page__$23$5__,
                            "[project]/sk/codebase/newprojs/qwenproj/src/app/portfolio/page.tsx"
                        ]
                    }
                ]
            },
            {
                metadata: {}
            }
        ]
    },
    {
        "layout": [
            __TURBOPACK__layout__$23$0__,
            "[project]/sk/codebase/newprojs/qwenproj/src/app/layout.tsx"
        ],
        "not-found": [
            __TURBOPACK__not$2d$found__$23$1__,
            "[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/not-found.js"
        ],
        "forbidden": [
            __TURBOPACK__forbidden__$23$2__,
            "[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/forbidden.js"
        ],
        "unauthorized": [
            __TURBOPACK__unauthorized__$23$3__,
            "[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/unauthorized.js"
        ],
        "global-error": [
            __TURBOPACK__global$2d$error__$23$4__,
            "[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js"
        ]
    }
];
;
;
const __next_app_require__ = __turbopack_context__.r.bind(__turbopack_context__);
const __next_app_load_chunk__ = __turbopack_context__.l.bind(__turbopack_context__);
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};
;
;
;
;
;
;
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$module$2e$compiled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppPageRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RouteKind"].APP_PAGE,
        page: "/portfolio/page",
        pathname: "/portfolio",
        // The following aren't used in production.
        bundlePath: '',
        filename: '',
        appPaths: []
    },
    userland: {
        loaderTree: tree
    },
    distDir: ("TURBOPACK compile-time value", ".next/dev") || '',
    relativeProjectDir: ("TURBOPACK compile-time value", "") || ''
});
async function handler(req, res, ctx) {
    var _this;
    if (routeModule.isDev) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addRequestMeta"])(req, 'devRequestTimingInternalsEnd', process.hrtime.bigint());
    }
    let srcPage = "/portfolio/page";
    // turbopack doesn't normalize `/index` in the page name
    // so we need to to process dynamic routes properly
    // TODO: fix turbopack providing differing value from webpack
    if ("TURBOPACK compile-time truthy", 1) {
        srcPage = srcPage.replace(/\/index$/, '') || '/';
    } else if (srcPage === '/index') {
        // we always normalize /index specifically
        srcPage = '/';
    }
    const multiZoneDraftMode = ("TURBOPACK compile-time value", false);
    const isMinimalMode = Boolean(("TURBOPACK compile-time value", false) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'minimalMode'));
    const prepareResult = await routeModule.prepare(req, res, {
        srcPage,
        multiZoneDraftMode
    });
    if (!prepareResult) {
        res.statusCode = 400;
        res.end('Bad Request');
        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());
        return null;
    }
    const { buildId, query, params, pageIsDynamic, buildManifest, nextFontManifest, reactLoadableManifest, serverActionsManifest, clientReferenceManifest, subresourceIntegrityManifest, prerenderManifest, isDraftMode, resolvedPathname, revalidateOnlyGenerated, routerServerContext, nextConfig, parsedUrl, interceptionRoutePatterns } = prepareResult;
    const normalizedSrcPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAppPath"])(srcPage);
    let { isOnDemandRevalidate } = prepareResult;
    // We use the resolvedPathname instead of the parsedUrl.pathname because it
    // is not rewritten as resolvedPathname is. This will ensure that the correct
    // prerender info is used instead of using the original pathname as the
    // source. If however PPR is enabled and cacheComponents is disabled, we
    // treat the pathname as dynamic. Currently, there's a bug in the PPR
    // implementation that incorrectly leaves %%drp placeholders in the output of
    // parallel routes. This is addressed with cacheComponents.
    const prerenderInfo = nextConfig.experimental.ppr && !nextConfig.cacheComponents && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$interception$2d$routes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isInterceptionRouteAppPath"])(resolvedPathname) ? null : routeModule.match(resolvedPathname, prerenderManifest);
    const isPrerendered = !!prerenderManifest.routes[resolvedPathname];
    const userAgent = req.headers['user-agent'] || '';
    const botType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getBotType"])(userAgent);
    const isHtmlBot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$streaming$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isHtmlBotRequest"])(req);
    /**
   * If true, this indicates that the request being made is for an app
   * prefetch request.
   */ const isPrefetchRSCRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'isPrefetchRSCRequest') ?? req.headers[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_ROUTER_PREFETCH_HEADER"]] === '1' // exclude runtime prefetches, which use '2'
    ;
    // NOTE: Don't delete headers[RSC] yet, it still needs to be used in renderToHTML later
    const isRSCRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'isRSCRequest') ?? Boolean(req.headers[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RSC_HEADER"]]);
    const isPossibleServerAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$server$2d$action$2d$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getIsPossibleServerAction"])(req);
    /**
   * If the route being rendered is an app page, and the ppr feature has been
   * enabled, then the given route _could_ support PPR.
   */ const couldSupportPPR = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$experimental$2f$ppr$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkIsAppPPREnabled"])(nextConfig.experimental.ppr);
    // When enabled, this will allow the use of the `?__nextppronly` query to
    // enable debugging of the static shell.
    const hasDebugStaticShellQuery = ("TURBOPACK compile-time value", false) === '1' && typeof query.__nextppronly !== 'undefined' && couldSupportPPR;
    // When enabled, this will allow the use of the `?__nextppronly` query
    // to enable debugging of the fallback shell.
    const hasDebugFallbackShellQuery = hasDebugStaticShellQuery && query.__nextppronly === 'fallback';
    // This page supports PPR if it is marked as being `PARTIALLY_STATIC` in the
    // prerender manifest and this is an app page.
    const isRoutePPREnabled = couldSupportPPR && (((_this = prerenderManifest.routes[normalizedSrcPage] ?? prerenderManifest.dynamicRoutes[normalizedSrcPage]) == null ? void 0 : _this.renderingMode) === 'PARTIALLY_STATIC' || // Ideally we'd want to check the appConfig to see if this page has PPR
    // enabled or not, but that would require plumbing the appConfig through
    // to the server during development. We assume that the page supports it
    // but only during development.
    hasDebugStaticShellQuery && (routeModule.isDev === true || (routerServerContext == null ? void 0 : routerServerContext.experimentalTestProxy) === true));
    const isDebugStaticShell = hasDebugStaticShellQuery && isRoutePPREnabled;
    // We should enable debugging dynamic accesses when the static shell
    // debugging has been enabled and we're also in development mode.
    const isDebugDynamicAccesses = isDebugStaticShell && routeModule.isDev === true;
    const isDebugFallbackShell = hasDebugFallbackShellQuery && isRoutePPREnabled;
    // If we're in minimal mode, then try to get the postponed information from
    // the request metadata. If available, use it for resuming the postponed
    // render.
    const minimalPostponed = isRoutePPREnabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'postponed') : undefined;
    // If PPR is enabled, and this is a RSC request (but not a prefetch), then
    // we can use this fact to only generate the flight data for the request
    // because we can't cache the HTML (as it's also dynamic).
    const isDynamicRSCRequest = isRoutePPREnabled && isRSCRequest && !isPrefetchRSCRequest;
    // Need to read this before it's stripped by stripFlightHeaders. We don't
    // need to transfer it to the request meta because it's only read
    // within this function; the static segment data should have already been
    // generated, so we will always either return a static response or a 404.
    const segmentPrefetchHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'segmentPrefetchRSCRequest');
    // TODO: investigate existing bug with shouldServeStreamingMetadata always
    // being true for a revalidate due to modifying the base-server this.renderOpts
    // when fixing this to correct logic it causes hydration issue since we set
    // serveStreamingMetadata to true during export
    const serveStreamingMetadata = isHtmlBot && isRoutePPREnabled ? false : !userAgent ? true : (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$streaming$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["shouldServeStreamingMetadata"])(userAgent, nextConfig.htmlLimitedBots);
    const isSSG = Boolean((prerenderInfo || isPrerendered || prerenderManifest.routes[normalizedSrcPage]) && // If this is a html bot request and PPR is enabled, then we don't want
    // to serve a static response.
    !(isHtmlBot && isRoutePPREnabled));
    // When a page supports cacheComponents, we can support RDC for Navigations
    const supportsRDCForNavigations = isRoutePPREnabled && nextConfig.cacheComponents === true;
    // In development, we always want to generate dynamic HTML.
    const supportsDynamicResponse = // a data request, in which case we only produce static HTML.
    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports
    // dynamic HTML.
    !isSSG || // If this request has provided postponed data, it supports dynamic
    // HTML.
    typeof minimalPostponed === 'string' || // If this handler supports onCacheEntryV2, then we can only support
    // dynamic responses if it's a dynamic RSC request and not in minimal mode. If it
    // doesn't support it we must fallback to the default behavior.
    (supportsRDCForNavigations && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'onCacheEntryV2') ? // RSC request, we'll pass the minimal postponed data to the render
    // which will trigger the `supportsDynamicResponse` to be true.
    isDynamicRSCRequest && !isMinimalMode : isDynamicRSCRequest);
    // When html bots request PPR page, perform the full dynamic rendering.
    const shouldWaitOnAllReady = isHtmlBot && isRoutePPREnabled;
    let ssgCacheKey = null;
    if (!isDraftMode && isSSG && !supportsDynamicResponse && !isPossibleServerAction && !minimalPostponed && !isDynamicRSCRequest) {
        ssgCacheKey = resolvedPathname;
    }
    // the staticPathKey differs from ssgCacheKey since
    // ssgCacheKey is null in dev since we're always in "dynamic"
    // mode in dev to bypass the cache, but we still need to honor
    // dynamicParams = false in dev mode
    let staticPathKey = ssgCacheKey;
    if (!staticPathKey && routeModule.isDev) {
        staticPathKey = resolvedPathname;
    }
    // If this is a request for an app path that should be statically generated
    // and we aren't in the edge runtime, strip the flight headers so it will
    // generate the static response.
    if (!routeModule.isDev && !isDraftMode && isSSG && isRSCRequest && !isDynamicRSCRequest) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$strip$2d$flight$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripFlightHeaders"])(req.headers);
    }
    const ComponentMod = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__,
        tree,
        GlobalError: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29$__["default"],
        handler,
        routeModule,
        __next_app__
    };
    // Before rendering (which initializes component tree modules), we have to
    // set the reference manifests to our global store so Server Action's
    // encryption util can access to them at the top level of the page module.
    if (serverActionsManifest && clientReferenceManifest) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$encryption$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setReferenceManifestsSingleton"])({
            page: srcPage,
            clientReferenceManifest,
            serverActionsManifest,
            serverModuleMap: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$action$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerModuleMap"])({
                serverActionsManifest
            })
        });
    }
    const method = req.method || 'GET';
    const tracer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTracer"])();
    const activeSpan = tracer.getActiveScopeSpan();
    const render404 = async ()=>{
        // TODO: should route-module itself handle rendering the 404
        if (routerServerContext == null ? void 0 : routerServerContext.render404) {
            await routerServerContext.render404(req, res, parsedUrl, false);
        } else {
            res.end('This page could not be found');
        }
        return null;
    };
    try {
        const varyHeader = routeModule.getVaryHeader(resolvedPathname, interceptionRoutePatterns);
        res.setHeader('Vary', varyHeader);
        const invokeRouteModule = async (span, context)=>{
            const nextReq = new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeNextRequest"](req);
            const nextRes = new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$base$2d$http$2f$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NodeNextResponse"](res);
            return routeModule.render(nextReq, nextRes, context).finally(()=>{
                if (!span) return;
                span.setAttributes({
                    'http.status_code': res.statusCode,
                    'next.rsc': false
                });
                const rootSpanAttributes = tracer.getRootSpanAttributes();
                // We were unable to get attributes, probably OTEL is not enabled
                if (!rootSpanAttributes) {
                    return;
                }
                if (rootSpanAttributes.get('next.span_type') !== __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseServerSpan"].handleRequest) {
                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                    return;
                }
                const route = rootSpanAttributes.get('next.route');
                if (route) {
                    const name = `${method} ${route}`;
                    span.setAttributes({
                        'next.route': route,
                        'http.route': route,
                        'next.span_name': name
                    });
                    span.updateName(name);
                } else {
                    span.updateName(`${method} ${srcPage}`);
                }
            });
        };
        const incrementalCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'incrementalCache');
        const doRender = async ({ span, postponed, fallbackRouteParams, forceStaticRender })=>{
            const context = {
                query,
                params,
                page: normalizedSrcPage,
                sharedContext: {
                    buildId
                },
                serverComponentsHmrCache: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'serverComponentsHmrCache'),
                fallbackRouteParams,
                renderOpts: {
                    App: ()=>null,
                    Document: ()=>null,
                    pageConfig: {},
                    ComponentMod,
                    Component: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$interop$2d$default$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["interopDefault"])(ComponentMod),
                    params,
                    routeModule,
                    page: srcPage,
                    postponed,
                    shouldWaitOnAllReady,
                    serveStreamingMetadata,
                    supportsDynamicResponse: typeof postponed === 'string' || supportsDynamicResponse,
                    buildManifest,
                    nextFontManifest,
                    reactLoadableManifest,
                    subresourceIntegrityManifest,
                    serverActionsManifest,
                    clientReferenceManifest,
                    setCacheStatus: routerServerContext == null ? void 0 : routerServerContext.setCacheStatus,
                    setIsrStatus: routerServerContext == null ? void 0 : routerServerContext.setIsrStatus,
                    setReactDebugChannel: routerServerContext == null ? void 0 : routerServerContext.setReactDebugChannel,
                    dir: ("TURBOPACK compile-time truthy", 1) ? require('path').join(/* turbopackIgnore: true */ process.cwd(), routeModule.relativeProjectDir) : "TURBOPACK unreachable",
                    isDraftMode,
                    botType,
                    isOnDemandRevalidate,
                    isPossibleServerAction,
                    assetPrefix: nextConfig.assetPrefix,
                    nextConfigOutput: nextConfig.output,
                    crossOrigin: nextConfig.crossOrigin,
                    trailingSlash: nextConfig.trailingSlash,
                    images: nextConfig.images,
                    previewProps: prerenderManifest.preview,
                    deploymentId: nextConfig.deploymentId,
                    enableTainting: nextConfig.experimental.taint,
                    htmlLimitedBots: nextConfig.htmlLimitedBots,
                    reactMaxHeadersLength: nextConfig.reactMaxHeadersLength,
                    multiZoneDraftMode,
                    incrementalCache,
                    cacheLifeProfiles: nextConfig.cacheLife,
                    basePath: nextConfig.basePath,
                    serverActions: nextConfig.experimental.serverActions,
                    ...isDebugStaticShell || isDebugDynamicAccesses || isDebugFallbackShell ? {
                        nextExport: true,
                        supportsDynamicResponse: false,
                        isStaticGeneration: true,
                        isDebugDynamicAccesses: isDebugDynamicAccesses
                    } : {},
                    cacheComponents: Boolean(nextConfig.cacheComponents),
                    experimental: {
                        isRoutePPREnabled,
                        expireTime: nextConfig.expireTime,
                        staleTimes: nextConfig.experimental.staleTimes,
                        clientSegmentCache: Boolean(nextConfig.experimental.clientSegmentCache),
                        dynamicOnHover: Boolean(nextConfig.experimental.dynamicOnHover),
                        inlineCss: Boolean(nextConfig.experimental.inlineCss),
                        authInterrupts: Boolean(nextConfig.experimental.authInterrupts),
                        clientTraceMetadata: nextConfig.experimental.clientTraceMetadata || [],
                        clientParamParsingOrigins: nextConfig.experimental.clientParamParsingOrigins
                    },
                    waitUntil: ctx.waitUntil,
                    onClose: (cb)=>{
                        res.on('close', cb);
                    },
                    onAfterTaskError: ()=>{},
                    onInstrumentationRequestError: (error, _request, errorContext)=>routeModule.onRequestError(req, error, errorContext, routerServerContext),
                    err: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'invokeError'),
                    dev: routeModule.isDev
                }
            };
            if (isDebugStaticShell || isDebugDynamicAccesses) {
                context.renderOpts.nextExport = true;
                context.renderOpts.supportsDynamicResponse = false;
                context.renderOpts.isDebugDynamicAccesses = isDebugDynamicAccesses;
            }
            // When we're revalidating in the background, we should not allow dynamic
            // responses.
            if (forceStaticRender) {
                context.renderOpts.supportsDynamicResponse = false;
            }
            const result = await invokeRouteModule(span, context);
            const { metadata } = result;
            const { cacheControl, headers = {}, fetchTags: cacheTags, fetchMetrics } = metadata;
            if (cacheTags) {
                headers[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"]] = cacheTags;
            }
            // Pull any fetch metrics from the render onto the request.
            ;
            req.fetchMetrics = fetchMetrics;
            // we don't throw static to dynamic errors in dev as isSSG
            // is a best guess in dev since we don't have the prerender pass
            // to know whether the path is actually static or not
            if (isSSG && (cacheControl == null ? void 0 : cacheControl.revalidate) === 0 && !routeModule.isDev && !isRoutePPREnabled) {
                const staticBailoutInfo = metadata.staticBailoutInfo;
                const err = Object.defineProperty(new Error(`Page changed from static to dynamic at runtime ${resolvedPathname}${(staticBailoutInfo == null ? void 0 : staticBailoutInfo.description) ? `, reason: ${staticBailoutInfo.description}` : ``}` + `\nsee more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`), "__NEXT_ERROR_CODE", {
                    value: "E132",
                    enumerable: false,
                    configurable: true
                });
                if (staticBailoutInfo == null ? void 0 : staticBailoutInfo.stack) {
                    const stack = staticBailoutInfo.stack;
                    err.stack = err.message + stack.substring(stack.indexOf('\n'));
                }
                throw err;
            }
            return {
                value: {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].APP_PAGE,
                    html: result,
                    headers,
                    rscData: metadata.flightData,
                    postponed: metadata.postponed,
                    status: metadata.statusCode,
                    segmentData: metadata.segmentData
                },
                cacheControl
            };
        };
        const responseGenerator = async ({ hasResolved, previousCacheEntry: previousIncrementalCacheEntry, isRevalidating, span, forceStaticRender = false })=>{
            const isProduction = routeModule.isDev === false;
            const didRespond = hasResolved || res.writableEnded;
            // skip on-demand revalidate if cache is not present and
            // revalidate-if-generated is set
            if (isOnDemandRevalidate && revalidateOnlyGenerated && !previousIncrementalCacheEntry && !isMinimalMode) {
                if (routerServerContext == null ? void 0 : routerServerContext.render404) {
                    await routerServerContext.render404(req, res);
                } else {
                    res.statusCode = 404;
                    res.end('This page could not be found');
                }
                return null;
            }
            let fallbackMode;
            if (prerenderInfo) {
                fallbackMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseFallbackField"])(prerenderInfo.fallback);
            }
            // When serving a HTML bot request, we want to serve a blocking render and
            // not the prerendered page. This ensures that the correct content is served
            // to the bot in the head.
            if (fallbackMode === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].PRERENDER && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$is$2d$bot$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isBot"])(userAgent)) {
                if (!isRoutePPREnabled || isHtmlBot) {
                    fallbackMode = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].BLOCKING_STATIC_RENDER;
                }
            }
            if ((previousIncrementalCacheEntry == null ? void 0 : previousIncrementalCacheEntry.isStale) === -1) {
                isOnDemandRevalidate = true;
            }
            // TODO: adapt for PPR
            // only allow on-demand revalidate for fallback: true/blocking
            // or for prerendered fallback: false paths
            if (isOnDemandRevalidate && (fallbackMode !== __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].NOT_FOUND || previousIncrementalCacheEntry)) {
                fallbackMode = __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].BLOCKING_STATIC_RENDER;
            }
            if (!isMinimalMode && fallbackMode !== __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].BLOCKING_STATIC_RENDER && staticPathKey && !didRespond && !isDraftMode && pageIsDynamic && (isProduction || !isPrerendered)) {
                // if the page has dynamicParams: false and this pathname wasn't
                // prerendered trigger the no fallback handling
                if (// getStaticPaths.
                (isProduction || prerenderInfo) && // When fallback isn't present, abort this render so we 404
                fallbackMode === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackMode"].NOT_FOUND) {
                    if (nextConfig.experimental.adapterPath) {
                        return await render404();
                    }
                    throw new __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js$2c$__cjs$29$__["NoFallbackError"]();
                }
                // When cacheComponents is enabled, we can use the fallback
                // response if the request is not a dynamic RSC request because the
                // RSC data when this feature flag is enabled does not contain any
                // param references. Without this feature flag enabled, the RSC data
                // contains param references, and therefore we can't use the fallback.
                if (isRoutePPREnabled && (nextConfig.cacheComponents ? !isDynamicRSCRequest : !isRSCRequest)) {
                    const cacheKey = isProduction && typeof (prerenderInfo == null ? void 0 : prerenderInfo.fallback) === 'string' ? prerenderInfo.fallback : normalizedSrcPage;
                    const fallbackRouteParams = // can use the manifest fallback route params.
                    isProduction && (prerenderInfo == null ? void 0 : prerenderInfo.fallbackRouteParams) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$fallback$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createOpaqueFallbackRouteParams"])(prerenderInfo.fallbackRouteParams) : isDebugFallbackShell ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$fallback$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFallbackRouteParams"])(normalizedSrcPage, routeModule) : null;
                    // We use the response cache here to handle the revalidation and
                    // management of the fallback shell.
                    const fallbackResponse = await routeModule.handleResponse({
                        cacheKey,
                        req,
                        nextConfig,
                        routeKind: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RouteKind"].APP_PAGE,
                        isFallback: true,
                        prerenderManifest,
                        isRoutePPREnabled,
                        responseGenerator: async ()=>doRender({
                                span,
                                // We pass `undefined` as rendering a fallback isn't resumed
                                // here.
                                postponed: undefined,
                                fallbackRouteParams,
                                forceStaticRender: false
                            }),
                        waitUntil: ctx.waitUntil,
                        isMinimalMode
                    });
                    // If the fallback response was set to null, then we should return null.
                    if (fallbackResponse === null) return null;
                    // Otherwise, if we did get a fallback response, we should return it.
                    if (fallbackResponse) {
                        // Remove the cache control from the response to prevent it from being
                        // used in the surrounding cache.
                        delete fallbackResponse.cacheControl;
                        return fallbackResponse;
                    }
                }
            }
            // Only requests that aren't revalidating can be resumed. If we have the
            // minimal postponed data, then we should resume the render with it.
            let postponed = !isOnDemandRevalidate && !isRevalidating && minimalPostponed ? minimalPostponed : undefined;
            // If this is a dynamic RSC request, we should use the postponed data from
            // the static render (if available). This ensures that we can utilize the
            // resume data cache (RDC) from the static render to ensure that the data
            // is consistent between the static and dynamic renders.
            if (supportsRDCForNavigations && ("TURBOPACK compile-time value", "nodejs") !== 'edge' && !isMinimalMode && incrementalCache && isDynamicRSCRequest && // We don't typically trigger an on-demand revalidation for dynamic RSC
            // requests, as we're typically revalidating the page in the background
            // instead. However, if the cache entry is stale, we should trigger a
            // background revalidation on dynamic RSC requests. This prevents us
            // from entering an infinite loop of revalidations.
            !forceStaticRender) {
                const incrementalCacheEntry = await incrementalCache.get(resolvedPathname, {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IncrementalCacheKind"].APP_PAGE,
                    isRoutePPREnabled: true,
                    isFallback: false
                });
                // If the cache entry is found, we should use the postponed data from
                // the cache.
                if (incrementalCacheEntry && incrementalCacheEntry.value && incrementalCacheEntry.value.kind === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].APP_PAGE) {
                    // CRITICAL: we're assigning the postponed data from the cache entry
                    // here as we're using the RDC to resume the render.
                    postponed = incrementalCacheEntry.value.postponed;
                    // If the cache entry is stale, we should trigger a background
                    // revalidation so that subsequent requests will get a fresh response.
                    if (incrementalCacheEntry && // We want to trigger this flow if the cache entry is stale and if
                    // the requested revalidation flow is either foreground or
                    // background.
                    (incrementalCacheEntry.isStale === -1 || incrementalCacheEntry.isStale === true)) {
                        // We want to schedule this on the next tick to ensure that the
                        // render is not blocked on it.
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["scheduleOnNextTick"])(async ()=>{
                            const responseCache = routeModule.getResponseCache(req);
                            try {
                                await responseCache.revalidate(resolvedPathname, incrementalCache, isRoutePPREnabled, false, (c)=>responseGenerator({
                                        ...c,
                                        // CRITICAL: we need to set this to true as we're
                                        // revalidating in the background and typically this dynamic
                                        // RSC request is not treated as static.
                                        forceStaticRender: true
                                    }), // previous cache entry here (which is stale) will switch on
                                // isOnDemandRevalidate and break the prerendering.
                                null, hasResolved, ctx.waitUntil);
                            } catch (err) {
                                console.error('Error revalidating the page in the background', err);
                            }
                        });
                    }
                }
            }
            // When we're in minimal mode, if we're trying to debug the static shell,
            // we should just return nothing instead of resuming the dynamic render.
            if ((isDebugStaticShell || isDebugDynamicAccesses) && typeof postponed !== 'undefined') {
                return {
                    cacheControl: {
                        revalidate: 1,
                        expire: undefined
                    },
                    value: {
                        kind: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].PAGES,
                        html: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].EMPTY,
                        pageData: {},
                        headers: undefined,
                        status: undefined
                    }
                };
            }
            const fallbackRouteParams = // can use the manifest fallback route params if we need to render the
            // fallback shell.
            isProduction && (prerenderInfo == null ? void 0 : prerenderInfo.fallbackRouteParams) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'renderFallbackShell') ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$fallback$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createOpaqueFallbackRouteParams"])(prerenderInfo.fallbackRouteParams) : isDebugFallbackShell ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$fallback$2d$params$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFallbackRouteParams"])(normalizedSrcPage, routeModule) : null;
            // Perform the render.
            return doRender({
                span,
                postponed,
                fallbackRouteParams,
                forceStaticRender
            });
        };
        const handleResponse = async (span)=>{
            var _cacheEntry_value, _cachedData_headers;
            const cacheEntry = await routeModule.handleResponse({
                cacheKey: ssgCacheKey,
                responseGenerator: (c)=>responseGenerator({
                        span,
                        ...c
                    }),
                routeKind: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RouteKind"].APP_PAGE,
                isOnDemandRevalidate,
                isRoutePPREnabled,
                req,
                nextConfig,
                prerenderManifest,
                waitUntil: ctx.waitUntil,
                isMinimalMode
            });
            if (isDraftMode) {
                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
            }
            // In dev, we should not cache pages for any reason.
            if (routeModule.isDev) {
                res.setHeader('Cache-Control', 'no-store, must-revalidate');
            }
            if (!cacheEntry) {
                if (ssgCacheKey) {
                    // A cache entry might not be generated if a response is written
                    // in `getInitialProps` or `getServerSideProps`, but those shouldn't
                    // have a cache key. If we do have a cache key but we don't end up
                    // with a cache entry, then either Next.js or the application has a
                    // bug that needs fixing.
                    throw Object.defineProperty(new Error('invariant: cache entry required but not generated'), "__NEXT_ERROR_CODE", {
                        value: "E62",
                        enumerable: false,
                        configurable: true
                    });
                }
                return null;
            }
            if (((_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].APP_PAGE) {
                var _cacheEntry_value1;
                throw Object.defineProperty(new Error(`Invariant app-page handler received invalid cache entry ${(_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), "__NEXT_ERROR_CODE", {
                    value: "E707",
                    enumerable: false,
                    configurable: true
                });
            }
            const didPostpone = typeof cacheEntry.value.postponed === 'string';
            if (isSSG && // We don't want to send a cache header for requests that contain dynamic
            // data. If this is a Dynamic RSC request or wasn't a Prefetch RSC
            // request, then we should set the cache header.
            !isDynamicRSCRequest && (!didPostpone || isPrefetchRSCRequest)) {
                if (!isMinimalMode) {
                    // set x-nextjs-cache header to match the header
                    // we set for the image-optimizer
                    res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');
                }
                // Set a header used by the client router to signal the response is static
                // and should respect the `static` cache staleTime value.
                res.setHeader(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_IS_PRERENDER_HEADER"], '1');
            }
            const { value: cachedData } = cacheEntry;
            // Coerce the cache control parameter from the render.
            let cacheControl;
            // If this is a resume request in minimal mode it is streamed with dynamic
            // content and should not be cached.
            if (minimalPostponed) {
                cacheControl = {
                    revalidate: 0,
                    expire: undefined
                };
            } else if (isDynamicRSCRequest) {
                cacheControl = {
                    revalidate: 0,
                    expire: undefined
                };
            } else if (!routeModule.isDev) {
                // If this is a preview mode request, we shouldn't cache it
                if (isDraftMode) {
                    cacheControl = {
                        revalidate: 0,
                        expire: undefined
                    };
                } else if (!isSSG) {
                    if (!res.getHeader('Cache-Control')) {
                        cacheControl = {
                            revalidate: 0,
                            expire: undefined
                        };
                    }
                } else if (cacheEntry.cacheControl) {
                    // If the cache entry has a cache control with a revalidate value that's
                    // a number, use it.
                    if (typeof cacheEntry.cacheControl.revalidate === 'number') {
                        var _cacheEntry_cacheControl;
                        if (cacheEntry.cacheControl.revalidate < 1) {
                            throw Object.defineProperty(new Error(`Invalid revalidate configuration provided: ${cacheEntry.cacheControl.revalidate} < 1`), "__NEXT_ERROR_CODE", {
                                value: "E22",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        cacheControl = {
                            revalidate: cacheEntry.cacheControl.revalidate,
                            expire: ((_cacheEntry_cacheControl = cacheEntry.cacheControl) == null ? void 0 : _cacheEntry_cacheControl.expire) ?? nextConfig.expireTime
                        };
                    } else {
                        cacheControl = {
                            revalidate: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CACHE_ONE_YEAR"],
                            expire: undefined
                        };
                    }
                }
            }
            cacheEntry.cacheControl = cacheControl;
            if (typeof segmentPrefetchHeader === 'string' && (cachedData == null ? void 0 : cachedData.kind) === __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].APP_PAGE && cachedData.segmentData) {
                var _cachedData_headers1;
                // This is a prefetch request issued by the client Segment Cache. These
                // should never reach the application layer (lambda). We should either
                // respond from the cache (HIT) or respond with 204 No Content (MISS).
                // Set a header to indicate that PPR is enabled for this route. This
                // lets the client distinguish between a regular cache miss and a cache
                // miss due to PPR being disabled. In other contexts this header is used
                // to indicate that the response contains dynamic data, but here we're
                // only using it to indicate that the feature is enabled — the segment
                // response itself contains whether the data is dynamic.
                res.setHeader(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_DID_POSTPONE_HEADER"], '2');
                // Add the cache tags header to the response if it exists and we're in
                // minimal mode while rendering a static page.
                const tags = (_cachedData_headers1 = cachedData.headers) == null ? void 0 : _cachedData_headers1[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"]];
                if (isMinimalMode && isSSG && tags && typeof tags === 'string') {
                    res.setHeader(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"], tags);
                }
                const matchedSegment = cachedData.segmentData.get(segmentPrefetchHeader);
                if (matchedSegment !== undefined) {
                    // Cache hit
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                        req,
                        res,
                        generateEtags: nextConfig.generateEtags,
                        poweredByHeader: nextConfig.poweredByHeader,
                        result: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].fromStatic(matchedSegment, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RSC_CONTENT_TYPE_HEADER"]),
                        cacheControl: cacheEntry.cacheControl
                    });
                }
                // Cache miss. Either a cache entry for this route has not been generated
                // (which technically should not be possible when PPR is enabled, because
                // at a minimum there should always be a fallback entry) or there's no
                // match for the requested segment. Respond with a 204 No Content. We
                // don't bother to respond with 404, because these requests are only
                // issued as part of a prefetch.
                res.statusCode = 204;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                    req,
                    res,
                    generateEtags: nextConfig.generateEtags,
                    poweredByHeader: nextConfig.poweredByHeader,
                    result: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].EMPTY,
                    cacheControl: cacheEntry.cacheControl
                });
            }
            // If there's a callback for `onCacheEntry`, call it with the cache entry
            // and the revalidate options. If we support RDC for Navigations, we
            // prefer the `onCacheEntryV2` callback. Once RDC for Navigations is the
            // default, we can remove the fallback to `onCacheEntry` as
            // `onCacheEntryV2` is now fully supported.
            const onCacheEntry = supportsRDCForNavigations ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'onCacheEntryV2') ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'onCacheEntry') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'onCacheEntry');
            if (onCacheEntry) {
                const finished = await onCacheEntry(cacheEntry, {
                    url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2d$meta$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestMeta"])(req, 'initURL') ?? req.url
                });
                if (finished) return null;
            }
            if (cachedData.headers) {
                const headers = {
                    ...cachedData.headers
                };
                if (!isMinimalMode || !isSSG) {
                    delete headers[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"]];
                }
                for (let [key, value] of Object.entries(headers)){
                    if (typeof value === 'undefined') continue;
                    if (Array.isArray(value)) {
                        for (const v of value){
                            res.appendHeader(key, v);
                        }
                    } else if (typeof value === 'number') {
                        value = value.toString();
                        res.appendHeader(key, value);
                    } else {
                        res.appendHeader(key, value);
                    }
                }
            }
            // Add the cache tags header to the response if it exists and we're in
            // minimal mode while rendering a static page.
            const tags = (_cachedData_headers = cachedData.headers) == null ? void 0 : _cachedData_headers[__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"]];
            if (isMinimalMode && isSSG && tags && typeof tags === 'string') {
                res.setHeader(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_CACHE_TAGS_HEADER"], tags);
            }
            // If the request is a data request, then we shouldn't set the status code
            // from the response because it should always be 200. This should be gated
            // behind the experimental PPR flag.
            if (cachedData.status && (!isRSCRequest || !isRoutePPREnabled)) {
                res.statusCode = cachedData.status;
            }
            // Redirect information is encoded in RSC payload, so we don't need to use redirect status codes
            if (!isMinimalMode && cachedData.status && __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RedirectStatusCode"][cachedData.status] && isRSCRequest) {
                res.statusCode = 200;
            }
            // Mark that the request did postpone.
            if (didPostpone && !isDynamicRSCRequest) {
                res.setHeader(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NEXT_DID_POSTPONE_HEADER"], '1');
            }
            // we don't go through this block when preview mode is true
            // as preview mode is a dynamic request (bypasses cache) and doesn't
            // generate both HTML and payloads in the same request so continue to just
            // return the generated payload
            if (isRSCRequest && !isDraftMode) {
                // If this is a dynamic RSC request, then stream the response.
                if (typeof cachedData.rscData === 'undefined') {
                    // If the response is not an RSC response, then we can't serve it.
                    if (cachedData.html.contentType !== __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RSC_CONTENT_TYPE_HEADER"]) {
                        if (nextConfig.cacheComponents) {
                            res.statusCode = 404;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                                req,
                                res,
                                generateEtags: nextConfig.generateEtags,
                                poweredByHeader: nextConfig.poweredByHeader,
                                result: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].EMPTY,
                                cacheControl: cacheEntry.cacheControl
                            });
                        } else {
                            // Otherwise this case is not expected.
                            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InvariantError"](`Expected RSC response, got ${cachedData.html.contentType}`), "__NEXT_ERROR_CODE", {
                                value: "E789",
                                enumerable: false,
                                configurable: true
                            });
                        }
                    }
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                        req,
                        res,
                        generateEtags: nextConfig.generateEtags,
                        poweredByHeader: nextConfig.poweredByHeader,
                        result: cachedData.html,
                        cacheControl: cacheEntry.cacheControl
                    });
                }
                // As this isn't a prefetch request, we should serve the static flight
                // data.
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                    req,
                    res,
                    generateEtags: nextConfig.generateEtags,
                    poweredByHeader: nextConfig.poweredByHeader,
                    result: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$render$2d$result$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].fromStatic(cachedData.rscData, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RSC_CONTENT_TYPE_HEADER"]),
                    cacheControl: cacheEntry.cacheControl
                });
            }
            // This is a request for HTML data.
            const body = cachedData.html;
            // If there's no postponed state, we should just serve the HTML. This
            // should also be the case for a resume request because it's completed
            // as a server render (rather than a static render).
            if (!didPostpone || isMinimalMode || isRSCRequest) {
                // If we're in test mode, we should add a sentinel chunk to the response
                // that's between the static and dynamic parts so we can compare the
                // chunks and add assertions.
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                    req,
                    res,
                    generateEtags: nextConfig.generateEtags,
                    poweredByHeader: nextConfig.poweredByHeader,
                    result: body,
                    cacheControl: cacheEntry.cacheControl
                });
            }
            // If we're debugging the static shell or the dynamic API accesses, we
            // should just serve the HTML without resuming the render. The returned
            // HTML will be the static shell so all the Dynamic API's will be used
            // during static generation.
            if (isDebugStaticShell || isDebugDynamicAccesses) {
                // Since we're not resuming the render, we need to at least add the
                // closing body and html tags to create valid HTML.
                body.push(new ReadableStream({
                    start (controller) {
                        controller.enqueue(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$stream$2d$utils$2f$encoded$2d$tags$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ENCODED_TAGS"].CLOSED.BODY_AND_HTML);
                        controller.close();
                    }
                }));
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                    req,
                    res,
                    generateEtags: nextConfig.generateEtags,
                    poweredByHeader: nextConfig.poweredByHeader,
                    result: body,
                    cacheControl: {
                        revalidate: 0,
                        expire: undefined
                    }
                });
            }
            // If we're in test mode, we should add a sentinel chunk to the response
            // that's between the static and dynamic parts so we can compare the
            // chunks and add assertions.
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // This request has postponed, so let's create a new transformer that the
            // dynamic data can pipe to that will attach the dynamic data to the end
            // of the response.
            const transformer = new TransformStream();
            body.push(transformer.readable);
            // Perform the render again, but this time, provide the postponed state.
            // We don't await because we want the result to start streaming now, and
            // we've already chained the transformer's readable to the render result.
            doRender({
                span,
                postponed: cachedData.postponed,
                // This is a resume render, not a fallback render, so we don't need to
                // set this.
                fallbackRouteParams: null,
                forceStaticRender: false
            }).then(async (result)=>{
                var _result_value;
                if (!result) {
                    throw Object.defineProperty(new Error('Invariant: expected a result to be returned'), "__NEXT_ERROR_CODE", {
                        value: "E463",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (((_result_value = result.value) == null ? void 0 : _result_value.kind) !== __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$response$2d$cache$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CachedRouteKind"].APP_PAGE) {
                    var _result_value1;
                    throw Object.defineProperty(new Error(`Invariant: expected a page response, got ${(_result_value1 = result.value) == null ? void 0 : _result_value1.kind}`), "__NEXT_ERROR_CODE", {
                        value: "E305",
                        enumerable: false,
                        configurable: true
                    });
                }
                // Pipe the resume result to the transformer.
                await result.value.html.pipeTo(transformer.writable);
            }).catch((err)=>{
                // An error occurred during piping or preparing the render, abort
                // the transformers writer so we can terminate the stream.
                transformer.writable.abort(err).catch((e)=>{
                    console.error("couldn't abort transformer", e);
                });
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$send$2d$payload$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendRenderResult"])({
                req,
                res,
                generateEtags: nextConfig.generateEtags,
                poweredByHeader: nextConfig.poweredByHeader,
                result: body,
                // We don't want to cache the response if it has postponed data because
                // the response being sent to the client it's dynamic parts are streamed
                // to the client on the same request.
                cacheControl: {
                    revalidate: 0,
                    expire: undefined
                }
            });
        };
        // TODO: activeSpan code path is for when wrapped by
        // next-server can be removed when this is no longer used
        if (activeSpan) {
            await handleResponse(activeSpan);
        } else {
            return await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseServerSpan"].handleRequest, {
                    spanName: `${method} ${srcPage}`,
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SpanKind"].SERVER,
                    attributes: {
                        'http.method': method,
                        'http.target': req.url
                    }
                }, handleResponse));
        }
    } catch (err) {
        if (!(err instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js__$5b$external$5d$__$28$next$2f$dist$2f$shared$2f$lib$2f$no$2d$fallback$2d$error$2e$external$2e$js$2c$__cjs$29$__["NoFallbackError"])) {
            await routeModule.onRequestError(req, err, {
                routerKind: 'App Router',
                routePath: srcPage,
                routeType: 'render',
                revalidateReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$instrumentation$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRevalidateReason"])({
                    isStaticGeneration: isSSG,
                    isOnDemandRevalidate
                })
            }, routerServerContext);
        }
        // rethrow so that we can handle serving error page
        throw err;
    }
}
// TODO: omit this from production builds, only test builds should include it
/**
 * Creates a readable stream that emits a PPR boundary sentinel.
 *
 * @returns A readable stream that emits a PPR boundary sentinel.
 */ function createPPRBoundarySentinel() {
    return new ReadableStream({
        start (controller) {
            controller.enqueue(new TextEncoder().encode('<!-- PPR_BOUNDARY_SENTINEL -->'));
            controller.close();
        }
    });
} //# sourceMappingURL=app-page.js.map
}),
"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/build/templates/app-page.js?page=/portfolio/page { GLOBAL_ERROR_MODULE => \"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_0 => \"[project]/sk/codebase/newprojs/qwenproj/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_1 => \"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_2 => \"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_3 => \"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_4 => \"[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)\", MODULE_5 => \"[project]/sk/codebase/newprojs/qwenproj/src/app/portfolio/page.tsx [app-rsc] (ecmascript, Next.js Server Component)\" } [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientPageRoot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["ClientPageRoot"],
    "ClientSegmentRoot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["ClientSegmentRoot"],
    "Fragment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["Fragment"],
    "GlobalError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29$__["default"],
    "HTTPAccessFallbackBoundary",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["HTTPAccessFallbackBoundary"],
    "LayoutRouter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["LayoutRouter"],
    "Postpone",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["Postpone"],
    "RenderFromTemplateContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RenderFromTemplateContext"],
    "RootLayoutBoundary",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["RootLayoutBoundary"],
    "SegmentViewNode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["SegmentViewNode"],
    "SegmentViewStateNode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["SegmentViewStateNode"],
    "__next_app__",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$portfolio$2f$page__$7b$__GLOBAL_ERROR_MODULE__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_0__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$not$2d$found$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$forbidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$unauthorized$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$app$2f$portfolio$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__next_app__"],
    "actionAsyncStorage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["actionAsyncStorage"],
    "captureOwnerStack",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["captureOwnerStack"],
    "collectSegmentData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["collectSegmentData"],
    "createElement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createElement"],
    "createMetadataComponents",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createMetadataComponents"],
    "createPrerenderParamsForClientSegment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createPrerenderParamsForClientSegment"],
    "createPrerenderSearchParamsForClientPage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createPrerenderSearchParamsForClientPage"],
    "createServerParamsForServerSegment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createServerParamsForServerSegment"],
    "createServerSearchParamsForServerPage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createServerSearchParamsForServerPage"],
    "createTemporaryReferenceSet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["createTemporaryReferenceSet"],
    "decodeAction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["decodeAction"],
    "decodeFormState",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["decodeFormState"],
    "decodeReply",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["decodeReply"],
    "handler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$portfolio$2f$page__$7b$__GLOBAL_ERROR_MODULE__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_0__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$not$2d$found$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$forbidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$unauthorized$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$app$2f$portfolio$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["handler"],
    "patchFetch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["patchFetch"],
    "preconnect",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["preconnect"],
    "preloadFont",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["preloadFont"],
    "preloadStyle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["preloadStyle"],
    "prerender",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["prerender"],
    "renderToReadableStream",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["renderToReadableStream"],
    "routeModule",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$portfolio$2f$page__$7b$__GLOBAL_ERROR_MODULE__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_0__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$not$2d$found$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$forbidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$unauthorized$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$app$2f$portfolio$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["routeModule"],
    "serverHooks",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["serverHooks"],
    "taintObjectReference",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["taintObjectReference"],
    "workAsyncStorage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["workAsyncStorage"],
    "workUnitAsyncStorage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__["workUnitAsyncStorage"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$portfolio$2f$page__$7b$__GLOBAL_ERROR_MODULE__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_0__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$not$2d$found$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$forbidden$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$unauthorized$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$src$2f$app$2f$portfolio$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/build/templates/app-page.js?page=/portfolio/page { GLOBAL_ERROR_MODULE => "[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)", MODULE_0 => "[project]/sk/codebase/newprojs/qwenproj/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", MODULE_1 => "[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript, Next.js Server Component)", MODULE_2 => "[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/forbidden.js [app-rsc] (ecmascript, Next.js Server Component)", MODULE_3 => "[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/unauthorized.js [app-rsc] (ecmascript, Next.js Server Component)", MODULE_4 => "[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)", MODULE_5 => "[project]/sk/codebase/newprojs/qwenproj/src/app/portfolio/page.tsx [app-rsc] (ecmascript, Next.js Server Component)" } [app-rsc] (ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$builtin$2f$global$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__Server__Component$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/client/components/builtin/global-error.js [app-rsc] (ecmascript, Next.js Server Component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sk$2f$codebase$2f$newprojs$2f$qwenproj$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__utility$29$__ = __turbopack_context__.i("[project]/sk/codebase/newprojs/qwenproj/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript, Next.js server utility)");
}),
];

//# sourceMappingURL=9ee83_8447e64c._.js.map