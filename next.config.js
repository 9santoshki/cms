/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  /**
   * Global CORS + no-cache headers for all /api/* routes.
   *
   * The no-cache headers matter as much as CORS here: Cloudflare caches API
   * responses aggressively in production unless told not to (see
   * docs/CLOUDFLARE.md — this already caused the /api/auth/session stale-user
   * bug, fixed by adding these same headers to that one route). Applying it
   * globally instead of per-route prevents every other API route — e.g. an
   * admin re-fetching order details right after a POST that changes them —
   * from silently serving a stale, pre-mutation response from the edge.
   */
  async headers() {
    const allowOrigin = process.env.NEXT_PUBLIC_APP_URL || '*';
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: allowOrigin },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, private, max-age=0' },
          { key: 'CDN-Cache-Control', value: 'no-store' },
          { key: 'Cloudflare-CDN-Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
