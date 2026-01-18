module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},30056,e=>e.a(async(t,r)=>{try{let t=await e.y("pg");e.n(t),r()}catch(e){r(e)}},!0),94634,e=>e.a(async(t,r)=>{try{var o=e.i(30056),n=t([o]);[o]=n.then?(await n)():n;let a=new o.Pool({host:process.env.DB_HOST||"localhost",port:parseInt(process.env.DB_PORT||"5432"),database:process.env.DB_NAME||"cmsdb",user:process.env.DB_USER||"sk",password:process.env.DB_PASSWORD||"sk",max:20,idleTimeoutMillis:3e4,connectionTimeoutMillis:2e3});a.on("error",e=>{console.error("Unexpected error on idle client",e),process.exit(-1)});let s=async(e,t)=>{try{return await a.query(e,t)}catch(e){throw console.error("Database query error:",e),e}},i=async()=>await a.connect();e.s(["getClient",0,i,"query",0,s]),r()}catch(e){r(e)}},!1),33181,e=>e.a(async(t,r)=>{try{var o=e.i(89171),n=e.i(94634),a=t([n]);async function s(e){try{let t="http://localhost:3000",r=e.nextUrl.searchParams.get("token");if(console.log("🔄 Set-session route called with token:",r?"present":"missing"),!r)return console.error("❌ No temp token provided"),o.NextResponse.redirect(new URL("/?error=no_token",t));let a=await (0,n.query)("SELECT session_token FROM temp_auth_tokens WHERE temp_token = $1 AND expires_at > NOW()",[r]);if(console.log("🔍 Temp token lookup result:",a.rows.length,"rows"),0===a.rows.length)return console.error("❌ Invalid or expired temp token"),o.NextResponse.redirect(new URL("/?error=invalid_token",t));let s=a.rows[0].session_token;console.log("✅ Found session token, length:",s.length),await (0,n.query)("DELETE FROM temp_auth_tokens WHERE temp_token = $1",[r]),console.log("🗑️ Deleted temp token");let i=[`cms-session=${s}`,"Max-Age=2592000","Path=/","SameSite=Lax","Secure","HttpOnly"].filter(Boolean).join("; ");console.log("✅✅✅ Setting cookie with raw header!"),console.log("Cookie string length:",i.length);let l=`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Login Successful</title>
          <style>
            body {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%);
            }
            .loader {
              text-align: center;
            }
            .spinner {
              border: 3px solid #f3f3f3;
              border-top: 3px solid #c19a6b;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto 20px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            h2 { color: #333; margin: 0 0 10px; }
            p { color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="loader">
            <div class="spinner"></div>
            <h2>Login successful!</h2>
            <p>Setting up your session...</p>
          </div>
          <script>
            console.log('🔄 Setting session cookie via JavaScript...');

            // Set cookie via JavaScript (not HttpOnly, but it will work!)
            var expires = new Date();
            expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
            var isProduction = true;
            var cookieStr = "cms-session=${s.replace(/"/g,'\\"')}; expires=" + expires.toUTCString() + "; path=/; SameSite=Lax" + (isProduction ? "; Secure" : "");
            document.cookie = cookieStr;

            console.log('✅ Cookie set!');
            console.log('Cookie string:', cookieStr);
            console.log('Cookie value:', document.cookie);

            // Wait a moment for cookie to be fully set before redirecting
            setTimeout(function() {
              console.log('🔄 Redirecting to homepage...');
              // Use replace to force a full page reload and ensure session loads
              window.location.replace('/?login=success');
            }, 500);
          </script>
        </body>
      </html>
    `,c=new o.NextResponse(l,{status:200,headers:{"Content-Type":"text/html","Set-Cookie":i}});return console.log("🔄 Returning HTML page with cookie header..."),c}catch(e){return console.error("❌ Error in set-session:",e),o.NextResponse.redirect(new URL("/?error=auth_failed","http://localhost:3000"))}}[n]=a.then?(await a)():a,e.s(["GET",()=>s]),r()}catch(e){r(e)}},!1),42613,e=>e.a(async(t,r)=>{try{var o=e.i(47909),n=e.i(74017),a=e.i(96250),s=e.i(59756),i=e.i(61916),l=e.i(14444),c=e.i(37092),d=e.i(69741),p=e.i(16795),u=e.i(87718),h=e.i(95169),g=e.i(47587),x=e.i(66012),m=e.i(70101),v=e.i(26937),f=e.i(10372),R=e.i(93695);e.i(52474);var y=e.i(220),w=e.i(33181),k=t([w]);[w]=k.then?(await k)():k;let C=new o.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/auth/set-session/route",pathname:"/auth/set-session",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/auth/set-session/route.ts",nextConfigOutput:"",userland:w}),{workAsyncStorage:b,workUnitAsyncStorage:T,serverHooks:_}=C;function E(){return(0,a.patchFetch)({workAsyncStorage:b,workUnitAsyncStorage:T})}async function S(e,t,r){C.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let o="/auth/set-session/route";o=o.replace(/\/index$/,"")||"/";let a=await C.prepare(e,t,{srcPage:o,multiZoneDraftMode:!1});if(!a)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:w,params:k,nextConfig:E,parsedUrl:S,isDraftMode:b,prerenderManifest:T,routerServerContext:_,isOnDemandRevalidate:A,revalidateOnlyGenerated:N,resolvedPathname:P,clientReferenceManifest:O,serverActionsManifest:q}=a,D=(0,d.normalizeAppPath)(o),U=!!(T.dynamicRoutes[D]||T.routes[P]),M=async()=>((null==_?void 0:_.render404)?await _.render404(e,t,S,!1):t.end("This page could not be found"),null);if(U&&!b){let e=!!T.routes[P],t=T.dynamicRoutes[D];if(t&&!1===t.fallback&&!e){if(E.experimental.adapterPath)return await M();throw new R.NoFallbackError}}let H=null;!U||C.isDev||b||(H=P,H="/index"===H?"/":H);let j=!0===C.isDev||!U,I=U&&!j;q&&O&&(0,l.setReferenceManifestsSingleton)({page:o,clientReferenceManifest:O,serverActionsManifest:q,serverModuleMap:(0,c.createServerModuleMap)({serverActionsManifest:q})});let L=e.method||"GET",$=(0,i.getTracer)(),B=$.getActiveScopeSpan(),F={params:k,prerenderManifest:T,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts},cacheComponents:!!E.cacheComponents,supportsDynamicResponse:j,incrementalCache:(0,s.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:E.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,o)=>C.onRequestError(e,t,o,_)},sharedContext:{buildId:w}},K=new p.NodeNextRequest(e),W=new p.NodeNextResponse(t),G=u.NextRequestAdapter.fromNodeNextRequest(K,(0,u.signalFromNodeResponse)(t));try{let a=async e=>C.handle(G,F).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=$.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==h.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route");if(n){let t=`${L} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t)}else e.updateName(`${L} ${o}`)}),l=!!(0,s.getRequestMeta)(e,"minimalMode"),c=async s=>{var i,c;let d=async({previousCacheEntry:n})=>{try{if(!l&&A&&N&&!n)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let o=await a(s);e.fetchMetrics=F.renderOpts.fetchMetrics;let i=F.renderOpts.pendingWaitUntil;i&&r.waitUntil&&(r.waitUntil(i),i=void 0);let c=F.renderOpts.collectedTags;if(!U)return await (0,x.sendResponse)(K,W,o,F.renderOpts.pendingWaitUntil),null;{let e=await o.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(o.headers);c&&(t[f.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==F.renderOpts.collectedRevalidate&&!(F.renderOpts.collectedRevalidate>=f.INFINITE_CACHE)&&F.renderOpts.collectedRevalidate,n=void 0===F.renderOpts.collectedExpire||F.renderOpts.collectedExpire>=f.INFINITE_CACHE?void 0:F.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:o.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){throw(null==n?void 0:n.isStale)&&await C.onRequestError(e,t,{routerKind:"App Router",routePath:o,routeType:"route",revalidateReason:(0,g.getRevalidateReason)({isStaticGeneration:I,isOnDemandRevalidate:A})},_),t}},p=await C.handleResponse({req:e,nextConfig:E,cacheKey:H,routeKind:n.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:T,isRoutePPREnabled:!1,isOnDemandRevalidate:A,revalidateOnlyGenerated:N,responseGenerator:d,waitUntil:r.waitUntil,isMinimalMode:l});if(!U)return null;if((null==p||null==(i=p.value)?void 0:i.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(c=p.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",A?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),b&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let u=(0,m.fromNodeOutgoingHttpHeaders)(p.value.headers);return l&&U||u.delete(f.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||u.get("Cache-Control")||u.set("Cache-Control",(0,v.getCacheControlHeader)(p.cacheControl)),await (0,x.sendResponse)(K,W,new Response(p.value.body,{headers:u,status:p.value.status||200})),null};B?await c(B):await $.withPropagatedContext(e.headers,()=>$.trace(h.BaseServerSpan.handleRequest,{spanName:`${L} ${o}`,kind:i.SpanKind.SERVER,attributes:{"http.method":L,"http.target":e.url}},c))}catch(t){if(t instanceof R.NoFallbackError||await C.onRequestError(e,t,{routerKind:"App Router",routePath:D,routeType:"route",revalidateReason:(0,g.getRevalidateReason)({isStaticGeneration:I,isOnDemandRevalidate:A})}),U)throw t;return await (0,x.sendResponse)(K,W,new Response(null,{status:500})),null}}e.s(["handler",()=>S,"patchFetch",()=>E,"routeModule",()=>C,"serverHooks",()=>_,"workAsyncStorage",()=>b,"workUnitAsyncStorage",()=>T]),r()}catch(e){r(e)}},!1)];

//# sourceMappingURL=%5Broot-of-the-server%5D__27e77c9d._.js.map