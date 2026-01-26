# Cloudflare Configuration

## Overview

The application is deployed behind Cloudflare CDN for SSL, DDoS protection, and performance. However, Cloudflare's aggressive caching can cause issues with authentication and dynamic API responses.

## Critical Issue: Session API Caching

### Problem
- Cloudflare caches `/api/auth/session` responses by default
- After logout, Cloudflare serves cached `{"user":null}` response
- After login, browser receives stale cached response instead of fresh user data
- Result: User appears logged out even after successful authentication

### Symptoms
- Browser console shows `hasAuthHeader: true` but returns `{"user":null}`
- Server logs show no `/api/auth/session` requests (cached by Cloudflare)
- Login works in Cloudflare Development Mode but fails in production
- Hard refresh (Cmd+Shift+R) temporarily fixes the issue

### Solution: Prevent API Caching

**Code-level fix** (already implemented in `/src/app/api/auth/session/route.ts`):
```typescript
response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private, max-age=0');
response.headers.set('Pragma', 'no-cache');
response.headers.set('Expires', '0');
response.headers.set('CDN-Cache-Control', 'no-store');
response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
```

**Cloudflare Page Rule** (recommended):
1. Go to Cloudflare dashboard → **Rules** → **Page Rules**
2. Click **Create Page Rule**
3. URL: `uat.colourmyspace.com/api/*`
4. Setting: **Cache Level** → **Bypass**
5. Save and deploy

This ensures NO API responses are ever cached by Cloudflare.

## Development Mode vs Production

- **Development Mode:** Disables Cloudflare caching entirely (all requests bypass cache)
- **Production Mode:** Cloudflare caches aggressively unless explicitly prevented

Always test with Development Mode **disabled** to catch caching issues.

## Cache Purging

If stale responses persist after fixes:
1. Cloudflare dashboard → **Caching** → **Configuration**
2. Click **Purge Everything** to clear all cached responses
3. Wait 30 seconds for propagation
4. Test authentication flow

## Best Practices

### API Routes
- Always set `Cache-Control: no-store` on dynamic API responses
- Include `CDN-Cache-Control: no-store` for Cloudflare-specific control
- Use `private` directive for user-specific data

### Static Assets
- Allow Cloudflare to cache images, JS, CSS (served from `/_next/static/`)
- Set long cache times for immutable assets: `Cache-Control: public, max-age=31536000, immutable`

### Authentication Flows
- Never cache `/api/auth/*` endpoints
- Set `no-cache` on session validation endpoints
- Include `Vary: Authorization` header if using Authorization header

## Debugging Cloudflare Issues

### Check if Cloudflare is caching a response:
1. Open DevTools → Network tab
2. Find the request
3. Check Response Headers for:
   - `cf-cache-status: HIT` = Cached by Cloudflare
   - `cf-cache-status: MISS` = Fresh from origin
   - `cf-cache-status: BYPASS` = Not cached (correct for APIs)

### Force bypass cache for testing:
- Enable Development Mode temporarily
- Or add `?nocache=1` query parameter (requires page rule)
- Or use `Shift+Refresh` in browser

## Related Issues

- **Issue #1:** Login fails after logout (Jan 2026)
  - **Cause:** Cloudflare cached `{"user":null}` response
  - **Fix:** Added no-cache headers + Cloudflare page rule
  - **Commit:** `7f301e8` - "Fix: Prevent Cloudflare caching of session API"

- **Cart not clearing:** CartContext not reactive to Zustand changes
  - **Fix:** Use Zustand selectors for reactive updates
  - **Commit:** `1b1a2cd` - "Fix cart reactivity"

## References

- [Cloudflare Cache Documentation](https://developers.cloudflare.com/cache/)
- [Cache-Control Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
