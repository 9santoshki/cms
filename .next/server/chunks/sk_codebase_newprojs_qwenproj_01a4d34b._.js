module.exports=[87989,e=>e.a(async(t,r)=>{try{var s=e.i(38256),a=e.i(37316),n=e.i(61346),o=t([n]);async function i(e){let t=e.headers.get("authorization");if(!t||!t.startsWith("Bearer "))return s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401});let r=t.substring(7);try{let e=await (0,a.verifyToken)(r);if(!e)return s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401});let t=e.userId;try{let e=`
        SELECT 
          ci.id,
          ci.product_id,
          ci.quantity,
          ci.user_id,
          p.name,
          p.description,
          p.price,
          p.image_url,
          p.category
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = $1
      `,r=(await n.default.query(e,[t])).rows.map(e=>({id:e.id,product_id:e.product_id,quantity:e.quantity,user_id:e.user_id,name:e.name,description:e.description,price:e.price,image_url:e.image_url,category:e.category}));return s.NextResponse.json({success:!0,data:r})}catch(e){return console.error("Error fetching cart items:",e),s.NextResponse.json({success:!1,error:"Internal server error"},{status:500})}}catch(e){return console.error("Token verification error:",e),s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401})}}async function u(e){let t=e.headers.get("authorization");if(!t||!t.startsWith("Bearer "))return s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401});let r=t.substring(7);try{let t=await (0,a.verifyToken)(r);if(!t)return s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401});let o=t.userId,{product_id:i,quantity:u=1}=await e.json();if(!i||u<=0)return s.NextResponse.json({success:!1,error:"Product ID and quantity are required"},{status:400});try{let e,t=await n.default.query("SELECT id, price FROM products WHERE id = $1",[i]);if(0===t.rows.length)return s.NextResponse.json({success:!1,error:"Product not found"},{status:404});let r=`
        SELECT id, quantity 
        FROM cart_items 
        WHERE user_id = $1 AND product_id = $2
      `,a=await n.default.query(r,[o,i]);if(a.rows.length>0){let t=a.rows[0].quantity+u,r=`
          UPDATE cart_items 
          SET quantity = $1 
          WHERE user_id = $2 AND product_id = $3 
          RETURNING *
        `;e=(await n.default.query(r,[t,o,i])).rows[0]}else{let t=`
          INSERT INTO cart_items (user_id, product_id, quantity) 
          VALUES ($1, $2, $3) 
          RETURNING *
        `;e=(await n.default.query(t,[o,i,u])).rows[0]}let c=`
        SELECT 
          ci.id,
          ci.product_id,
          ci.quantity,
          ci.user_id,
          p.name,
          p.description,
          p.price,
          p.image_url,
          p.category
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.id = $1
      `,d=await n.default.query(c,[e.id]);return s.NextResponse.json({success:!0,data:d.rows[0]},{status:200})}catch(e){return console.error("Error adding item to cart:",e),s.NextResponse.json({success:!1,error:"Internal server error"},{status:500})}}catch(e){return console.error("Token verification error:",e),s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401})}}async function c(e){let t=e.headers.get("authorization");if(!t||!t.startsWith("Bearer "))return s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401});let r=t.substring(7);try{let t=await (0,a.verifyToken)(r);if(!t)return s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401});let o=t.userId,{product_id:i,quantity:u}=await e.json();if(!i||u<0)return s.NextResponse.json({success:!1,error:"Product ID and quantity are required"},{status:400});try{if(0===u){let e=`
          DELETE FROM cart_items 
          WHERE user_id = $1 AND product_id = $2 
          RETURNING *
        `,t=await n.default.query(e,[o,i]);if(0===t.rows.length)return s.NextResponse.json({success:!1,error:"Cart item not found"},{status:404});return s.NextResponse.json({success:!0,message:"Item removed from cart"},{status:200})}{let e=`
          UPDATE cart_items 
          SET quantity = $1 
          WHERE user_id = $2 AND product_id = $3 
          RETURNING *
        `,t=await n.default.query(e,[u,o,i]);if(0===t.rows.length)return s.NextResponse.json({success:!1,error:"Cart item not found"},{status:404});let r=`
          SELECT 
            ci.id,
            ci.product_id,
            ci.quantity,
            ci.user_id,
            p.name,
            p.description,
            p.price,
            p.image_url,
            p.category
          FROM cart_items ci
          JOIN products p ON ci.product_id = p.id
          WHERE ci.id = $1
        `,a=await n.default.query(r,[t.rows[0].id]);return s.NextResponse.json({success:!0,data:a.rows[0]},{status:200})}}catch(e){return console.error("Error updating cart item:",e),s.NextResponse.json({success:!1,error:"Internal server error"},{status:500})}}catch(e){return console.error("Token verification error:",e),s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401})}}async function d(e){let t=e.headers.get("authorization");if(!t||!t.startsWith("Bearer "))return s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401});let r=t.substring(7);try{let e=await (0,a.verifyToken)(r);if(!e)return s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401});let t=e.userId;try{return await n.default.query("DELETE FROM cart_items WHERE user_id = $1",[t]),s.NextResponse.json({success:!0,message:"Cart cleared"},{status:200})}catch(e){return console.error("Error clearing cart:",e),s.NextResponse.json({success:!1,error:"Internal server error"},{status:500})}}catch(e){return console.error("Token verification error:",e),s.NextResponse.json({success:!1,error:"Unauthorized"},{status:401})}}[n]=o.then?(await o)():o,e.s(["DELETE",()=>d,"GET",()=>i,"POST",()=>u,"PUT",()=>c]),r()}catch(e){r(e)}},!1),96602,e=>e.a(async(t,r)=>{try{var s=e.i(11350),a=e.i(31857),n=e.i(81800),o=e.i(11209),i=e.i(25366),u=e.i(6809),c=e.i(32754),d=e.i(7876),l=e.i(36251),p=e.i(1901),R=e.i(52885),h=e.i(67698),E=e.i(5331),f=e.i(48286),y=e.i(63373),N=e.i(56110),w=e.i(93695);e.i(16857);var g=e.i(69557),m=e.i(87989),v=t([m]);[m]=v.then?(await v)():v;let T=new s.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/cart/route",pathname:"/api/cart",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/sk/codebase/newprojs/qwenproj/src/app/api/cart/route.ts",nextConfigOutput:"",userland:m}),{workAsyncStorage:C,workUnitAsyncStorage:q,serverHooks:j}=T;function _(){return(0,n.patchFetch)({workAsyncStorage:C,workUnitAsyncStorage:q})}async function x(e,t,r){T.isDev&&(0,o.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let s="/api/cart/route";s=s.replace(/\/index$/,"")||"/";let n=await T.prepare(e,t,{srcPage:s,multiZoneDraftMode:!1});if(!n)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:m,params:v,nextConfig:_,parsedUrl:x,isDraftMode:C,prerenderManifest:q,routerServerContext:j,isOnDemandRevalidate:A,revalidateOnlyGenerated:O,resolvedPathname:U,clientReferenceManifest:I,serverActionsManifest:P}=n,S=(0,d.normalizeAppPath)(s),$=!!(q.dynamicRoutes[S]||q.routes[U]),b=async()=>((null==j?void 0:j.render404)?await j.render404(e,t,x,!1):t.end("This page could not be found"),null);if($&&!C){let e=!!q.routes[U],t=q.dynamicRoutes[S];if(t&&!1===t.fallback&&!e){if(_.experimental.adapterPath)return await b();throw new w.NoFallbackError}}let H=null;!$||T.isDev||C||(H=U,H="/index"===H?"/":H);let D=!0===T.isDev||!$,M=$&&!D;P&&I&&(0,u.setReferenceManifestsSingleton)({page:s,clientReferenceManifest:I,serverActionsManifest:P,serverModuleMap:(0,c.createServerModuleMap)({serverActionsManifest:P})});let k=e.method||"GET",z=(0,i.getTracer)(),F=z.getActiveScopeSpan(),W={params:v,prerenderManifest:q,renderOpts:{experimental:{authInterrupts:!!_.experimental.authInterrupts},cacheComponents:!!_.cacheComponents,supportsDynamicResponse:D,incrementalCache:(0,o.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:_.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,s)=>T.onRequestError(e,t,s,j)},sharedContext:{buildId:m}},L=new l.NodeNextRequest(e),B=new l.NodeNextResponse(t),G=p.NextRequestAdapter.fromNodeNextRequest(L,(0,p.signalFromNodeResponse)(t));try{let n=async e=>T.handle(G,W).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=z.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==R.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${k} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${k} ${s}`)}),u=!!(0,o.getRequestMeta)(e,"minimalMode"),c=async o=>{var i,c;let d=async({previousCacheEntry:a})=>{try{if(!u&&A&&O&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await n(o);e.fetchMetrics=W.renderOpts.fetchMetrics;let i=W.renderOpts.pendingWaitUntil;i&&r.waitUntil&&(r.waitUntil(i),i=void 0);let c=W.renderOpts.collectedTags;if(!$)return await (0,E.sendResponse)(L,B,s,W.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,f.toNodeOutgoingHttpHeaders)(s.headers);c&&(t[N.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==W.renderOpts.collectedRevalidate&&!(W.renderOpts.collectedRevalidate>=N.INFINITE_CACHE)&&W.renderOpts.collectedRevalidate,a=void 0===W.renderOpts.collectedExpire||W.renderOpts.collectedExpire>=N.INFINITE_CACHE?void 0:W.renderOpts.collectedExpire;return{value:{kind:g.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==a?void 0:a.isStale)&&await T.onRequestError(e,t,{routerKind:"App Router",routePath:s,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:A})},j),t}},l=await T.handleResponse({req:e,nextConfig:_,cacheKey:H,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:q,isRoutePPREnabled:!1,isOnDemandRevalidate:A,revalidateOnlyGenerated:O,responseGenerator:d,waitUntil:r.waitUntil,isMinimalMode:u});if(!$)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==g.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(c=l.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});u||t.setHeader("x-nextjs-cache",A?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),C&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,f.fromNodeOutgoingHttpHeaders)(l.value.headers);return u&&$||p.delete(N.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,y.getCacheControlHeader)(l.cacheControl)),await (0,E.sendResponse)(L,B,new Response(l.value.body,{headers:p,status:l.value.status||200})),null};F?await c(F):await z.withPropagatedContext(e.headers,()=>z.trace(R.BaseServerSpan.handleRequest,{spanName:`${k} ${s}`,kind:i.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},c))}catch(t){if(t instanceof w.NoFallbackError||await T.onRequestError(e,t,{routerKind:"App Router",routePath:S,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:A})}),$)throw t;return await (0,E.sendResponse)(L,B,new Response(null,{status:500})),null}}e.s(["handler",()=>x,"patchFetch",()=>_,"routeModule",()=>T,"serverHooks",()=>j,"workAsyncStorage",()=>C,"workUnitAsyncStorage",()=>q]),r()}catch(e){r(e)}},!1)];

//# sourceMappingURL=sk_codebase_newprojs_qwenproj_01a4d34b._.js.map