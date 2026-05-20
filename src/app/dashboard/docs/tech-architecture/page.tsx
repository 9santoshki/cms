'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';

/* ─── Section registry ─── */
const SECTIONS = [
  { id: 'overview',    icon: 'fas fa-globe',          title: 'System Overview' },
  { id: 'stack',       icon: 'fas fa-layer-group',    title: 'Tech Stack' },
  { id: 'structure',   icon: 'fas fa-folder-tree',    title: 'Directory Structure' },
  { id: 'database',    icon: 'fas fa-database',       title: 'Database Schema' },
  { id: 'auth',        icon: 'fas fa-shield-alt',     title: 'Authentication' },
  { id: 'images',      icon: 'fas fa-cloud',          title: 'Image Storage (R2)' },
  { id: 'payments',    icon: 'fas fa-credit-card',    title: 'Payment Flow' },
  { id: 'api',         icon: 'fas fa-code',           title: 'API Conventions' },
  { id: 'deployment',  icon: 'fas fa-server',         title: 'Deployment' },
  { id: 'security',    icon: 'fas fa-lock',           title: 'Security' },
];

/* ─── Style helpers ─── */
const card: React.CSSProperties = {
  background: 'white',
  borderRadius: 12,
  border: '1px solid #e8d5c4',
  boxShadow: '0 4px 12px rgba(193,154,107,0.08)',
  padding: '28px 32px',
  marginBottom: 24,
};

const h2Style: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: '#333',
  margin: '0 0 16px',
  fontFamily: 'var(--font-playfair), "Playfair Display", serif',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
};

const h3Style: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: '#555',
  margin: '24px 0 10px',
};

const pStyle: React.CSSProperties = {
  fontSize: 14,
  color: '#555',
  lineHeight: 1.8,
  margin: '0 0 12px',
};

const codeBlock: React.CSSProperties = {
  background: '#1e1e2e',
  color: '#cdd6f4',
  borderRadius: 8,
  padding: '16px 20px',
  fontSize: 12,
  lineHeight: 1.7,
  fontFamily: 'monospace',
  overflowX: 'auto',
  marginBottom: 16,
};

const inlineCode: React.CSSProperties = {
  background: '#f5f0eb',
  padding: '1px 6px',
  borderRadius: 4,
  fontSize: '0.9em',
  fontFamily: 'monospace',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 13,
  marginBottom: 16,
};

const thStyle: React.CSSProperties = {
  padding: '8px 12px',
  textAlign: 'left',
  fontWeight: 700,
  color: '#555',
  borderBottom: '1px solid #e8d5c4',
  background: '#f8f4f0',
};

const tdStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderBottom: '1px solid #f0ebe5',
  color: '#444',
  verticalAlign: 'top',
};

const tipBox = (color: string, bg: string, border: string): React.CSSProperties => ({
  background: bg,
  border: `1px solid ${border}`,
  borderRadius: 8,
  padding: '12px 16px',
  marginBottom: 14,
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
});

function Tip({ type = 'info', children }: { type?: 'info' | 'warn' | 'success' | 'danger'; children: React.ReactNode }) {
  const map = {
    info:    { icon: 'fas fa-info-circle',         color: '#1e40af', bg: 'rgba(219,234,254,0.4)', border: 'rgba(147,197,253,0.5)' },
    warn:    { icon: 'fas fa-exclamation-triangle', color: '#92400e', bg: 'rgba(254,243,199,0.5)', border: 'rgba(253,230,138,0.6)' },
    success: { icon: 'fas fa-check-circle',        color: '#166534', bg: 'rgba(220,252,231,0.4)', border: 'rgba(134,239,172,0.5)' },
    danger:  { icon: 'fas fa-times-circle',        color: '#991b1b', bg: 'rgba(254,226,226,0.4)', border: 'rgba(252,165,165,0.5)' },
  };
  const s = map[type];
  return (
    <div style={tipBox(s.color, s.bg, s.border)}>
      <i className={s.icon} style={{ color: s.color, marginTop: 1, flexShrink: 0 }}></i>
      <div style={{ fontSize: 13, color: '#444', lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <pre style={codeBlock}>{children}</pre>;
}

/* ═══════════════════════════════════════════════════════════
   SECTIONS
═══════════════════════════════════════════════════════════ */

function SectionOverview() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-globe" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        System Overview
      </h2>
      <p style={pStyle}>
        <strong>Colour My Space (CMS)</strong> is an interior design e-commerce platform built as a
        full-stack Next.js 16 application. It serves both a customer-facing storefront and an admin
        dashboard from a single codebase deployed on a self-hosted Ubuntu server behind Cloudflare.
      </p>

      {/* Architecture diagram */}
      <Code>{`┌─────────────────────────────────────────────────────────────────────┐
│                         Colour My Space                             │
│                      System Architecture                            │
└─────────────────────────────────────────────────────────────────────┘

 Customer / Admin Browser
          │
          │  HTTPS (TLS via Cloudflare)
          ▼
 ┌─────────────────┐
 │   Cloudflare    │  CDN, WAF, DDoS protection, IP allowlist (port 80/443)
 │   (Edge Layer)  │
 └────────┬────────┘
          │
          │  Cloudflare → Ubuntu VPS
          ▼
 ┌─────────────────────────────────────────────────────────┐
 │               Ubuntu 22.04 VPS                          │
 │                                                         │
 │  ┌──────────────────────────────────────────────────┐  │
 │  │              Nginx (Reverse Proxy)               │  │
 │  │   port 80/443 → localhost:3000 (Next.js)         │  │
 │  └──────────────────────────────────────────────────┘  │
 │                        │                               │
 │                        ▼                               │
 │  ┌──────────────────────────────────────────────────┐  │
 │  │       Next.js 16 App (Node.js / PM2)            │  │
 │  │                                                  │  │
 │  │  ┌─────────────────┐  ┌──────────────────────┐  │  │
 │  │  │  App Router     │  │   API Routes          │  │  │
 │  │  │  (pages/layout) │  │  /api/**              │  │  │
 │  │  └─────────────────┘  └──────────────────────┘  │  │
 │  │            │                    │                │  │
 │  │            └──────────┬─────────┘                │  │
 │  │                       │                          │  │
 │  │                       ▼                          │  │
 │  │  ┌──────────────────────────────────────────┐   │  │
 │  │  │         PostgreSQL (localhost)            │   │  │
 │  │  │  Port 5432 — bound to 127.0.0.1 only     │   │  │
 │  │  └──────────────────────────────────────────┘   │  │
 │  │                                                  │  │
 │  └──────────────────────────────────────────────────┘  │
 └─────────────────────────────────────────────────────────┘
          │
          │  HTTPS (S3-compatible API)
          ▼
 ┌─────────────────┐         ┌──────────────────────┐
 │  Cloudflare R2  │         │   Razorpay           │
 │  Private Bucket │         │   Payment Gateway     │
 │  (image store)  │         │   (checkout/refunds)  │
 └─────────────────┘         └──────────────────────┘`}</Code>

      <h3 style={h3Style}>Live Environments</h3>
      <table style={tableStyle}>
        <thead>
          <tr><th style={thStyle}>Environment</th><th style={thStyle}>URL</th><th style={thStyle}>Branch</th><th style={thStyle}>Deploy Script</th></tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>UAT / Staging</strong></td>
            <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>https://uat.colourmyspace.com</td>
            <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>master</td>
            <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>./scripts/uatdeploy.sh</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, background: '#faf7f4' }}><strong>Production</strong></td>
            <td style={{ ...tdStyle, background: '#faf7f4', fontFamily: 'monospace', fontSize: 12 }}>https://colourmyspace.com</td>
            <td style={{ ...tdStyle, background: '#faf7f4', fontFamily: 'monospace', fontSize: 12 }}>production</td>
            <td style={{ ...tdStyle, background: '#faf7f4', fontFamily: 'monospace', fontSize: 12 }}>./scripts/proddeploy.sh</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function SectionStack() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-layer-group" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Tech Stack
      </h2>

      {[
        {
          category: 'Framework & Runtime',
          items: [
            { name: 'Next.js 16', role: 'Full-stack framework (App Router)', why: 'Server-side rendering, file-based routing, built-in API routes, TypeScript support.' },
            { name: 'React 19', role: 'UI library', why: 'Latest stable with improved concurrent features.' },
            { name: 'TypeScript', role: 'Type safety', why: 'Enforced across the entire codebase — components, API routes, DB layer, and types/' },
            { name: 'Node.js', role: 'Runtime', why: 'Via Next.js; managed by PM2 in production.' },
          ],
        },
        {
          category: 'Database',
          items: [
            { name: 'PostgreSQL 15', role: 'Primary database', why: 'ACID-compliant relational DB. All queries use parameterized statements.' },
            { name: 'pg (node-postgres)', role: 'Database driver', why: 'Connection pool via pg.Pool. No ORM — raw SQL for full control.' },
          ],
        },
        {
          category: 'Authentication',
          items: [
            { name: 'Google OAuth 2.0', role: 'Identity provider', why: 'Users sign in with Google. No passwords stored.' },
            { name: 'JWT (jsonwebtoken)', role: 'Session token', why: 'Signed with HS256, stored in httpOnly cookie. 30-day expiry.' },
            { name: 'Database sessions', role: 'Server-side validation', why: 'Sessions table allows real-time revocation and role change propagation.' },
          ],
        },
        {
          category: 'State Management',
          items: [
            { name: 'Zustand', role: 'Cart state', why: 'Lightweight global store for cart items. Persisted to localStorage.' },
            { name: 'React Context', role: 'Auth, UI, Products', why: 'AuthContext, ProductContext, UIContext for cross-component state.' },
          ],
        },
        {
          category: 'Styling',
          items: [
            { name: 'styled-components', role: 'CSS-in-JS', why: 'Component-scoped styles. Used in some components.' },
            { name: 'Inline styles', role: 'Dashboard pages', why: 'Dashboard pages use React inline styles for simplicity and zero class conflicts.' },
            { name: 'FontAwesome Free', role: 'Icons', why: 'Loaded via npm package, used across the dashboard.' },
            { name: 'Montserrat / Playfair', role: 'Typography', why: 'Google Fonts via next/font. Montserrat (UI) + Playfair Display (headings).' },
          ],
        },
        {
          category: 'Infrastructure & Services',
          items: [
            { name: 'Cloudflare R2', role: 'Image storage', why: 'Private S3-compatible bucket. Images served via /api/images/[key] proxy.' },
            { name: 'Razorpay', role: 'Payment processing', why: 'Indian payment gateway. Order captured server-side after client-side checkout.' },
            { name: 'Nginx', role: 'Reverse proxy', why: 'Forwards port 80/443 to Next.js on port 3000. Handles SSL termination.' },
            { name: 'PM2', role: 'Process manager', why: 'Keeps the Next.js process running, auto-restarts on crash, log management.' },
            { name: 'UFW', role: 'Firewall', why: 'Only allows Cloudflare IPs on port 80/443; SSH on custom port; all else blocked.' },
            { name: 'fail2ban', role: 'Brute-force protection', why: 'Bans IPs with repeated failed SSH login attempts.' },
          ],
        },
      ].map(group => (
        <div key={group.category}>
          <h3 style={h3Style}>{group.category}</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Technology</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {group.items.map((item, i) => (
                <tr key={item.name}>
                  <td style={{ ...tdStyle, fontWeight: 600, background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{item.name}</td>
                  <td style={{ ...tdStyle, color: '#c19a6b', fontWeight: 500, background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{item.role}</td>
                  <td style={{ ...tdStyle, background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{item.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function SectionStructure() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-folder-tree" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Directory Structure
      </h2>
      <p style={pStyle}>
        The project follows Next.js 16 App Router conventions. All source code lives under <code style={inlineCode}>src/</code>.
      </p>
      <Code>{`cms/
├── src/
│   ├── app/                          # Next.js App Router root
│   │   ├── layout.tsx                # Root HTML layout (fonts, metadata)
│   │   ├── page.tsx                  # Storefront home page
│   │   │
│   │   ├── api/                      # REST API routes (server-only)
│   │   │   ├── auth/
│   │   │   │   ├── google/route.ts   # Initiate Google OAuth
│   │   │   │   ├── callback/route.ts # OAuth callback handler
│   │   │   │   ├── logout/route.ts   # Clear session cookie
│   │   │   │   └── me/route.ts       # Current user info
│   │   │   ├── products/
│   │   │   │   ├── route.ts          # GET (list) / POST (create)
│   │   │   │   ├── [id]/route.ts     # GET / PATCH / DELETE by ID
│   │   │   │   └── images/
│   │   │   │       └── upload/route.ts  # Upload image to R2
│   │   │   ├── orders/
│   │   │   │   ├── route.ts          # List orders
│   │   │   │   └── [id]/route.ts     # Order detail / status update
│   │   │   ├── admin/
│   │   │   │   ├── users/route.ts        # List users
│   │   │   │   ├── update-role/route.ts  # Change user role
│   │   │   │   ├── suppliers/route.ts    # Supplier CRUD
│   │   │   │   ├── product-variants/route.ts
│   │   │   │   ├── variant-option-types/route.ts
│   │   │   │   └── variant-options/route.ts
│   │   │   ├── cart/route.ts         # Cart sync (DB-backed)
│   │   │   ├── images/[key]/route.ts # R2 image proxy (private bucket)
│   │   │   ├── dashboard/stats/route.ts  # Overview stats
│   │   │   ├── payments/
│   │   │   │   ├── create-order/route.ts  # Create Razorpay order
│   │   │   │   └── verify/route.ts        # Verify payment signature
│   │   │   ├── appointments/route.ts
│   │   │   ├── reviews/route.ts
│   │   │   └── settings/route.ts
│   │   │
│   │   ├── dashboard/                # Admin dashboard pages
│   │   │   ├── layout.tsx            # Server-side auth guard
│   │   │   ├── page.tsx              # Overview
│   │   │   ├── products/page.tsx
│   │   │   ├── products/[id]/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── orders/[id]/page.tsx
│   │   │   ├── appointments/page.tsx
│   │   │   ├── reviews/page.tsx
│   │   │   ├── suppliers/page.tsx
│   │   │   ├── suppliers/[id]/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   ├── users/[id]/page.tsx
│   │   │   ├── variants/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── docs/
│   │   │       ├── admin-manual/page.tsx      ← this guide
│   │   │       └── tech-architecture/page.tsx ← this page
│   │   │
│   │   ├── auth/page.tsx             # Sign in / sign up page
│   │   ├── shop/page.tsx             # Product catalogue
│   │   ├── products/[slug]/page.tsx  # Product detail
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── orders/[id]/page.tsx
│   │   ├── account/page.tsx
│   │   └── appointments/page.tsx
│   │
│   ├── components/                   # Shared React components
│   │   ├── DashboardLayout.tsx       # Admin dashboard wrapper + sidebar
│   │   ├── Header.tsx                # Storefront navigation
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Cart.tsx
│   │   └── [others]
│   │
│   ├── context/                      # React Contexts
│   │   ├── AuthContext.tsx           # User session state
│   │   ├── CartContext.tsx           # Cart open/close UI state
│   │   ├── ProductContext.tsx        # Product catalogue state
│   │   └── UIContext.tsx
│   │
│   ├── store/
│   │   └── cartStore.ts              # Zustand cart store
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   ├── connection.ts         # pg.Pool singleton
│   │   │   ├── auth.ts               # Session/user DB functions
│   │   │   ├── products.ts           # Product CRUD queries
│   │   │   ├── orders.ts
│   │   │   ├── cart.ts
│   │   │   └── [others]
│   │   ├── api.ts                    # Client-side API fetch helpers
│   │   ├── cloudflare.ts             # R2 upload / delete helpers
│   │   └── razorpay.ts               # Razorpay SDK helpers
│   │
│   ├── types/
│   │   ├── index.ts                  # Core domain types
│   │   └── api.ts                    # API request/response types
│   │
│   └── middleware.ts                 # Route protection (Edge)
│
├── scripts/
│   ├── initDatabase.sql              # One-time schema creation
│   ├── migrations/                   # Incremental schema changes
│   ├── uatdeploy.sh
│   ├── proddeploy.sh
│   └── deploy-env.sh
│
├── docs/                             # Markdown documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATA_FLOW.md
│   └── [others]
│
├── public/                           # Static assets
├── .env.local                        # Local env (not committed)
├── .env.uat                          # UAT env (not committed)
├── next.config.js
├── tsconfig.json
└── package.json`}</Code>
    </div>
  );
}

function SectionDatabase() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-database" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Database Schema
      </h2>
      <p style={pStyle}>
        PostgreSQL 15, bound to <code style={inlineCode}>127.0.0.1:5432</code> only.
        All tables use <code style={inlineCode}>SERIAL</code> integer primary keys.
        All queries use parameterized statements (<code style={inlineCode}>$1, $2, …</code>).
      </p>

      <Tip type="warn">
        <strong>Never run <code>npm run init-db</code> on a live environment.</strong> The schema init script
        drops and recreates tables. Use migration scripts in <code>scripts/migrations/</code> for all changes
        after initial setup.
      </Tip>

      {[
        {
          table: 'users',
          desc: 'All registered accounts (Google OAuth only)',
          columns: [
            ['id', 'SERIAL PK', 'Auto-increment integer'],
            ['email', 'TEXT UNIQUE', 'Google email address'],
            ['name', 'TEXT', 'Display name from Google profile'],
            ['avatar', 'TEXT', 'Google profile picture URL'],
            ['google_id', 'TEXT UNIQUE', 'Google subject ID'],
            ['role', "TEXT DEFAULT 'customer'", "customer | moderator | admin | supplier"],
            ['created_at / updated_at', 'TIMESTAMPTZ', 'Automatic timestamps'],
          ],
        },
        {
          table: 'sessions',
          desc: 'Database-backed JWT sessions (enable real-time role revocation)',
          columns: [
            ['id', 'SERIAL PK', ''],
            ['user_id', 'INTEGER FK → users', ''],
            ['session_token', 'TEXT UNIQUE', 'JWT token string'],
            ['expires_at', 'TIMESTAMPTZ', '30 days from creation'],
            ['last_activity', 'TIMESTAMPTZ', 'Updated on every authenticated request'],
          ],
        },
        {
          table: 'products',
          desc: 'Product catalogue',
          columns: [
            ['id', 'SERIAL PK', ''],
            ['name', 'TEXT', ''],
            ['description', 'TEXT', ''],
            ['price', 'DECIMAL(10,2)', 'Base price in INR'],
            ['sale_price', 'DECIMAL(10,2) NULL', 'Discounted price; NULL = not on sale'],
            ['category', 'TEXT NULL', 'Free-form category label'],
            ['slug', 'TEXT UNIQUE', 'URL-safe identifier auto-generated from name'],
            ['stock_quantity', 'INTEGER DEFAULT 0', 'Units in stock (if no variants)'],
            ['supplier_id', 'INTEGER FK → suppliers NULL', ''],
            ['created_at / updated_at', 'TIMESTAMPTZ', ''],
          ],
        },
        {
          table: 'product_images',
          desc: 'Images stored in Cloudflare R2',
          columns: [
            ['id', 'SERIAL PK', ''],
            ['product_id', 'INTEGER FK → products', ''],
            ['cloudflare_image_id', 'TEXT', 'R2 object key'],
            ['url', 'TEXT', 'Proxy URL: /api/images/[key]'],
            ['is_primary', 'BOOLEAN DEFAULT false', 'Only one primary per product'],
            ['display_order', 'INTEGER DEFAULT 0', 'Gallery sort order'],
          ],
        },
        {
          table: 'orders / order_items',
          desc: 'Customer purchase records',
          columns: [
            ['orders.id', 'SERIAL PK', ''],
            ['orders.user_id', 'INTEGER FK → users', ''],
            ['orders.total_amount', 'DECIMAL(10,2)', 'Final total including shipping+tax'],
            ['orders.status', 'TEXT', 'pending | processing | shipped | completed | cancelled'],
            ['orders.payment_id', 'TEXT', 'Razorpay payment_id for reference'],
            ['orders.shipping_address', 'JSONB', 'Full address snapshot at time of order'],
            ['order_items.product_id', 'INTEGER FK → products', ''],
            ['order_items.variant_id', 'INTEGER FK NULL', 'Null if no variant selected'],
            ['order_items.quantity / price', 'INTEGER / DECIMAL', 'Snapshot at purchase time'],
          ],
        },
        {
          table: 'variant_option_types',
          desc: 'Global option dimensions (e.g. Thickness, Size)',
          columns: [
            ['id', 'SERIAL PK', ''],
            ['name', 'TEXT UNIQUE', 'Internal slug: paper_thickness'],
            ['display_name', 'TEXT', 'Label shown in UI: Paper Thickness'],
            ['description', 'TEXT NULL', 'Optional hint for admins'],
            ['display_order', 'INTEGER', 'Sidebar sort order'],
            ['is_active', 'BOOLEAN DEFAULT true', ''],
          ],
        },
        {
          table: 'variant_options',
          desc: 'Values within each option type (e.g. Thin, Medium, Thick)',
          columns: [
            ['id', 'SERIAL PK', ''],
            ['option_type_id', 'INTEGER FK → variant_option_types', ''],
            ['value', 'TEXT', 'Internal slug: thin'],
            ['display_value', 'TEXT', 'Customer label: Thin (Standard)'],
            ['price_modifier', 'DECIMAL(10,2) DEFAULT 0', '₹ added to base price'],
            ['display_order', 'INTEGER', ''],
            ['is_active', 'BOOLEAN DEFAULT true', ''],
          ],
        },
        {
          table: 'product_variants',
          desc: 'Specific SKUs combining multiple option values',
          columns: [
            ['id', 'SERIAL PK', ''],
            ['product_id', 'INTEGER FK → products', ''],
            ['sku', 'TEXT NULL', 'Optional custom SKU'],
            ['price / sale_price', 'DECIMAL(10,2)', 'Overrides base product price'],
            ['stock_quantity', 'INTEGER DEFAULT 0', ''],
            ['is_active', 'BOOLEAN DEFAULT true', ''],
          ],
        },
      ].map(t => (
        <div key={t.table}>
          <h3 style={h3Style}><code style={inlineCode}>{t.table}</code> — {t.desc}</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Column</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {t.columns.map(([col, type, notes], i) => (
                <tr key={col}>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12, background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{col}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 11, color: '#c19a6b', background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{type}</td>
                  <td style={{ ...tdStyle, background: i % 2 === 0 ? 'white' : '#faf7f4', fontSize: 12 }}>{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function SectionAuth() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-shield-alt" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Authentication Flow
      </h2>
      <p style={pStyle}>
        Authentication is handled via <strong>Google OAuth 2.0</strong> combined with
        <strong> JWT cookies</strong> and <strong>database-backed session validation</strong>.
        No passwords are stored.
      </p>

      <Code>{`Sign-in Flow:
──────────────────────────────────────────────────────────────

1. User clicks "Sign in with Google"
   → Browser → GET /api/auth/google
   → Redirects to Google OAuth consent screen

2. Google redirects back:
   → GET /api/auth/callback?code=...&state=...
   → Server exchanges code for Google tokens
   → Fetches Google profile (email, name, avatar, sub)
   → Upserts user in users table (creates if new, updates if exists)
   → Auto-promotes to admin if email ∈ ADMIN_EMAILS env var
   → Creates JWT: { userId, email, role, iat, exp }
   → Inserts row into sessions table (session_token = JWT)
   → Sets httpOnly cookie cms-session=<JWT>; Max-Age=30d
   → Redirects to original page or /

Per-request Validation (API routes / pages):
──────────────────────────────────────────────────────────────

getSessionFromCookieWithDB():
  1. Read cms-session cookie
  2. jwt.verify() → decode payload { userId, role }
  3. SELECT * FROM sessions WHERE session_token = <jwt>
     AND expires_at > NOW()
  4. SELECT role FROM users WHERE id = <userId>   ← real-time role
  5. Return { userId, role } from DB (ignores JWT role claim)
  6. Update sessions.last_activity

Role change propagation:
  When admin changes a user's role via /api/admin/update-role,
  the users.role column is updated immediately. On the user's
  very next API request, step 4 above reads the new role.
  The old JWT becomes effectively stale — no need to re-login.

Sign-out:
──────────────────────────────────────────────────────────────
  DELETE FROM sessions WHERE session_token = <jwt>
  Clear cookie cms-session (Max-Age=0)`}</Code>

      <h3 style={h3Style}>Middleware (Edge)</h3>
      <p style={pStyle}>
        <code style={inlineCode}>src/middleware.ts</code> runs on the Edge before every request.
        It checks for the <code style={inlineCode}>cms-session</code> cookie on protected routes
        (<code style={inlineCode}>/account</code>, <code style={inlineCode}>/cart</code>,
        <code style={inlineCode}>/checkout</code>, <code style={inlineCode}>/orders</code>)
        and redirects unauthenticated users to <code style={inlineCode}>/auth</code>.
        The dashboard has an additional server-component guard in
        <code style={inlineCode}> src/app/dashboard/layout.tsx</code> that validates the admin/moderator role.
      </p>

      <Tip type="info">
        The JWT cookie is <strong>httpOnly</strong> (not readable by JavaScript), <strong>Secure</strong>
        in production (HTTPS only), and <strong>SameSite=Lax</strong> to prevent CSRF on cross-site requests.
      </Tip>
    </div>
  );
}

function SectionImages() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-cloud" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Image Storage (Cloudflare R2)
      </h2>
      <p style={pStyle}>
        Product images are stored in a <strong>private Cloudflare R2 bucket</strong>.
        The bucket has no public access. All images are served through a signed proxy endpoint.
      </p>

      <Code>{`Upload Flow:
──────────────────────────────────────────────────────────────
Admin uploads image via dashboard
  → POST /api/products/images/upload   (multipart/form-data)
  → Server validates admin role
  → Generates unique R2 key:  products/<productId>/<uuid>.<ext>
  → Calls lib/cloudflare.ts → R2.putObject(key, buffer, mime)
  → Inserts into product_images:
      { product_id, cloudflare_image_id: key,
        url: '/api/images/' + key, is_primary, display_order }
  → Returns { url: '/api/images/...' }

Serve Flow (customer browser):
──────────────────────────────────────────────────────────────
Browser requests:  GET /api/images/products/42/abc.jpg
  → /api/images/[key]/route.ts
  → R2.getObject(key)        ← private bucket fetch
  → Returns binary stream with correct Content-Type header
  → Optionally: cache-control headers for CDN caching

Delete Flow:
──────────────────────────────────────────────────────────────
Admin deletes image via dashboard
  → DELETE /api/products/images/upload?id=<imageId>
  → Server fetches cloudflare_image_id from product_images
  → R2.deleteObject(key)
  → DELETE FROM product_images WHERE id = <imageId>`}</Code>

      <h3 style={h3Style}>Environment Variables Required</h3>
      <table style={tableStyle}>
        <thead>
          <tr><th style={thStyle}>Variable</th><th style={thStyle}>Description</th></tr>
        </thead>
        <tbody>
          {[
            ['CLOUDFLARE_ACCOUNT_ID', 'Your Cloudflare account ID'],
            ['CLOUDFLARE_R2_ACCESS_KEY_ID', 'R2 API token access key'],
            ['CLOUDFLARE_R2_SECRET_ACCESS_KEY', 'R2 API token secret'],
            ['CLOUDFLARE_R2_BUCKET_NAME', 'Name of the private R2 bucket'],
            ['CLOUDFLARE_R2_ENDPOINT', 'https://<accountId>.r2.cloudflarestorage.com'],
          ].map(([v, d], i) => (
            <tr key={v}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12, background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{v}</td>
              <td style={{ ...tdStyle, background: i % 2 === 0 ? 'white' : '#faf7f4', fontSize: 12 }}>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Tip type="danger">
        <strong>Never use public R2 bucket URLs</strong> (<code>pub-*.r2.dev</code>) directly. The bucket must
        remain private. All access goes through the server proxy which validates the request.
      </Tip>
    </div>
  );
}

function SectionPayments() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-credit-card" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Payment Flow (Razorpay)
      </h2>
      <p style={pStyle}>
        Razorpay is the payment gateway for all customer purchases. The flow follows the
        standard Razorpay order-then-pay-then-verify pattern.
      </p>

      <Code>{`Checkout Flow:
──────────────────────────────────────────────────────────────

1. Customer clicks "Place Order" on checkout page
   → POST /api/payments/create-order
      { amount, currency: 'INR', items: [...] }
   → Server calls Razorpay API: razorpay.orders.create()
   → Creates order record in DB with status: 'pending'
   → Returns { razorpayOrderId, amount, currency }

2. Browser opens Razorpay checkout modal
   → Customer enters card / UPI / netbanking details
   → Razorpay processes payment

3a. On payment SUCCESS:
    → Razorpay SDK calls the handler callback with:
       { razorpay_order_id, razorpay_payment_id, razorpay_signature }
    → Client sends these to: POST /api/payments/verify
    → Server validates HMAC signature:
        expectedSig = HMAC-SHA256(
          razorpay_order_id + '|' + razorpay_payment_id,
          RAZORPAY_KEY_SECRET
        )
    → If valid: UPDATE orders SET status='processing',
        payment_id=razorpay_payment_id WHERE id=<orderId>
    → Returns { success: true, orderId }
    → Browser redirects to /orders/<orderId>

3b. On payment FAILURE:
    → Razorpay modal shows error to customer
    → Order remains 'pending' in DB
    → Admin can cancel pending orders manually

Environment Variables Required:
  NEXT_PUBLIC_RAZORPAY_KEY_ID   ← Public key (client-side Razorpay modal)
  RAZORPAY_KEY_SECRET           ← Secret (server-side only, never exposed)`}</Code>

      <Tip type="warn">
        The <code style={inlineCode}>RAZORPAY_KEY_SECRET</code> must <strong>never</strong> be prefixed with
        <code style={inlineCode}> NEXT_PUBLIC_</code>. Doing so would expose it to the browser and allow
        fraudulent signature verification. Always verify signatures server-side.
      </Tip>
    </div>
  );
}

function SectionAPI() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-code" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        API Conventions
      </h2>

      <h3 style={h3Style}>Response Format</h3>
      <p style={pStyle}>All API routes return JSON in a consistent envelope:</p>
      <Code>{`// Success
{ "success": true,  "data": <payload>,  "message": "Optional message" }

// Error
{ "success": false, "error": "Human-readable error description" }

// HTTP status codes used:
200 OK          — Successful GET / PATCH
201 Created     — Successful POST (resource created)
400 Bad Request — Validation error (missing required fields, invalid data)
401 Unauthorized — No valid session cookie
403 Forbidden    — Valid session but insufficient role
404 Not Found    — Resource not found
500 Internal     — Unexpected server error (check PM2 logs)`}</Code>

      <h3 style={h3Style}>Authentication in API Routes</h3>
      <Code>{`// Pattern used in every protected API route:
import { getSessionFromCookieWithDB } from '@/lib/db/auth';

export async function POST(request: Request) {
  const session = await getSessionFromCookieWithDB();
  if (!session) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  if (session.role !== 'admin') {
    return Response.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  // ... route logic
}`}</Code>

      <h3 style={h3Style}>Database Query Pattern</h3>
      <Code>{`// All queries use parameterized statements — NEVER string interpolation
import { pool } from '@/lib/db/connection';

// ✅ Correct — parameterized
const result = await pool.query(
  'SELECT * FROM products WHERE id = $1 AND category = $2',
  [productId, category]
);

// ❌ NEVER do this — SQL injection risk
const result = await pool.query(
  \`SELECT * FROM products WHERE id = \${productId}\`
);`}</Code>

      <h3 style={h3Style}>Key API Endpoints</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Method</th>
            <th style={thStyle}>Path</th>
            <th style={thStyle}>Auth Required</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['GET',    '/api/products',                  'Public',     'List all products with images'],
            ['POST',   '/api/products',                  'Admin',      'Create a new product'],
            ['GET',    '/api/products/[id]',             'Public',     'Single product with images + variants'],
            ['PATCH',  '/api/products/[id]',             'Admin',      'Update product fields'],
            ['DELETE', '/api/products/[id]',             'Admin',      'Delete product + R2 images'],
            ['POST',   '/api/products/images/upload',    'Admin',      'Upload image to R2'],
            ['GET',    '/api/images/[key]',              'Public',     'Proxy private R2 image'],
            ['GET',    '/api/orders',                    'Admin/Mod',  'List all orders'],
            ['PATCH',  '/api/orders/[id]',               'Admin/Mod',  'Update order status'],
            ['POST',   '/api/payments/create-order',     'Customer+',  'Create Razorpay order'],
            ['POST',   '/api/payments/verify',           'Customer+',  'Verify payment signature'],
            ['GET',    '/api/admin/users',               'Admin',      'List all users'],
            ['POST',   '/api/admin/update-role',         'Admin',      'Change a user\'s role'],
            ['GET',    '/api/auth/me',                   'Any',        'Current user session info'],
            ['GET',    '/api/dashboard/stats',           'Admin/Mod',  'Overview stat counts'],
          ].map(([m, p, a, d], i) => (
            <tr key={p}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 700, color: m === 'GET' ? '#166534' : m === 'POST' ? '#1e40af' : m === 'DELETE' ? '#991b1b' : '#92400e', background: i % 2 === 0 ? 'white' : '#faf7f4', fontSize: 12 }}>{m}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 11, background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{p}</td>
              <td style={{ ...tdStyle, fontSize: 12, color: '#c19a6b', background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{a}</td>
              <td style={{ ...tdStyle, fontSize: 12, background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionDeployment() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-server" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Deployment
      </h2>
      <p style={pStyle}>
        The app runs on a single Ubuntu 22.04 VPS managed via <strong>PM2</strong> and proxied through
        <strong> Nginx</strong>. Two separate Next.js instances serve UAT and Production.
      </p>

      <h3 style={h3Style}>Deploy to UAT</h3>
      <Code>{`# From local machine (must have SSH access):
./scripts/uatdeploy.sh

# What it does:
# 1. git pull origin master  (on server)
# 2. npm install --production
# 3. npm run build
# 4. pm2 restart cms-uat`}</Code>

      <h3 style={h3Style}>Deploy to Production</h3>
      <Code>{`./scripts/proddeploy.sh

# What it does:
# 1. git pull origin production  (on server)
# 2. npm install --production
# 3. npm run build
# 4. pm2 restart cms-prod`}</Code>

      <Tip type="warn">
        <strong>Never run <code>npm run init-db</code> during a deployment.</strong> This is a one-time
        setup command that drops and recreates all tables. Use <code>scripts/migrations/</code> for any
        schema changes after initial setup.
      </Tip>

      <h3 style={h3Style}>PM2 Process Management</h3>
      <Code>{`# Check running processes
pm2 list

# View logs (live)
pm2 logs cms-prod
pm2 logs cms-uat

# Restart a process
pm2 restart cms-prod

# Save process list (survives server reboots)
pm2 save`}</Code>

      <h3 style={h3Style}>Nginx Configuration</h3>
      <Code>{`# /etc/nginx/sites-available/colourmyspace
server {
    listen 80;
    server_name colourmyspace.com www.colourmyspace.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# UAT instance runs on port 3001
server {
    listen 80;
    server_name uat.colourmyspace.com;
    location / {
        proxy_pass http://localhost:3001;
    }
}`}</Code>

      <h3 style={h3Style}>Environment Variables</h3>
      <p style={pStyle}>
        Environment files are <strong>not committed to git</strong>. They must be deployed separately:
      </p>
      <Code>{`./scripts/deploy-env.sh    # Copies .env.uat to UAT server

# Production .env.local must be manually maintained on the server
# Required variables:
DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
JWT_SECRET                            (openssl rand -base64 64)
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXT_PUBLIC_RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
ADMIN_EMAILS                           (comma-separated)
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_R2_ACCESS_KEY_ID
CLOUDFLARE_R2_SECRET_ACCESS_KEY
CLOUDFLARE_R2_BUCKET_NAME
CLOUDFLARE_R2_ENDPOINT`}</Code>
    </div>
  );
}

function SectionSecurity() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-lock" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Security
      </h2>
      <Tip type="danger">
        The application was compromised <strong>twice in January 2026</strong> via an exposed PostgreSQL port.
        All items below are <strong>mandatory</strong> requirements, not optional hardening.
      </Tip>

      <h3 style={h3Style}>Server Hardening Checklist</h3>
      <table style={tableStyle}>
        <thead>
          <tr><th style={thStyle}>Requirement</th><th style={thStyle}>Status check</th><th style={thStyle}>How to verify</th></tr>
        </thead>
        <tbody>
          {[
            ['PostgreSQL bound to localhost only', 'Critical', "grep listen_addresses /etc/postgresql/*/main/postgresql.conf\n→ Must show '127.0.0.1'"],
            ['UFW firewall enabled', 'Critical', 'ufw status → must show active, only Cloudflare IPs on 80/443'],
            ['SSH on non-default port', 'Critical', 'grep Port /etc/ssh/sshd_config'],
            ['fail2ban installed & running', 'Critical', 'systemctl status fail2ban'],
            ['Strong JWT_SECRET (≥64 chars)', 'Critical', 'Check .env.local: openssl rand -base64 64'],
            ['Strong DB password (≥32 chars)', 'Critical', 'openssl rand -base64 32'],
            ['All DB queries parameterized', 'Critical', 'grep -r "\\$1" src/lib/db/ — every query must use $1,$2,...'],
            ['Cloudflare R2 bucket is private', 'Critical', 'No public access; all images via /api/images/[key] proxy'],
            ['RAZORPAY_KEY_SECRET not NEXT_PUBLIC_', 'Critical', 'grep RAZORPAY .env.local — secret must NOT have NEXT_PUBLIC_ prefix'],
            ['Nginx X-Frame-Options header', 'Recommended', "grep X-Frame-Options /etc/nginx/sites-available/*"],
          ].map(([req, status, check], i) => (
            <tr key={req}>
              <td style={{ ...tdStyle, fontWeight: 600, fontSize: 13, background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{req}</td>
              <td style={{ ...tdStyle, background: i % 2 === 0 ? 'white' : '#faf7f4' }}>
                <span style={{
                  padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  color: status === 'Critical' ? '#991b1b' : '#92400e',
                  background: status === 'Critical' ? 'rgba(254,226,226,0.7)' : 'rgba(254,243,199,0.7)',
                }}>{status}</span>
              </td>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 11, color: '#555', whiteSpace: 'pre', background: i % 2 === 0 ? 'white' : '#faf7f4' }}>{check}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={h3Style}>Application Security Practices</h3>
      {[
        { title: 'SQL Injection Prevention', body: 'Every database query uses pg parameterized statements ($1, $2, …). No string interpolation in SQL is allowed anywhere in the codebase.' },
        { title: 'Session Security', body: 'JWT stored in httpOnly + Secure + SameSite=Lax cookie. Cannot be read by JavaScript. Sessions are database-backed allowing immediate revocation on logout or role change.' },
        { title: 'Role Verification', body: 'Every protected API route calls getSessionFromCookieWithDB() which reads the current role from the database on every request. Stale JWT role claims are always overridden by the DB value.' },
        { title: 'Payment Signature Verification', body: 'Razorpay payment verification uses HMAC-SHA256 on the server side. The client cannot forge a successful payment without the secret key.' },
        { title: 'Image Access Control', body: 'R2 bucket is private. The proxy at /api/images/[key] serves images without authentication (images are not sensitive) but prevents direct bucket access and public URL enumeration.' },
        { title: 'Dependency Security', body: 'Run npm audit regularly. Update dependencies when security advisories are published. Lock versions with package-lock.json.' },
      ].map(item => (
        <div key={item.title} style={{ marginBottom: 14, padding: '12px 16px', background: '#faf7f4', borderRadius: 8, borderLeft: '3px solid #c19a6b' }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#333', marginBottom: 4 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: '#555', lineHeight: 1.65 }}>{item.body}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */

const SECTION_COMPONENTS: Record<string, React.FC> = {
  'overview':   SectionOverview,
  'stack':      SectionStack,
  'structure':  SectionStructure,
  'database':   SectionDatabase,
  'auth':       SectionAuth,
  'images':     SectionImages,
  'payments':   SectionPayments,
  'api':        SectionAPI,
  'deployment': SectionDeployment,
  'security':   SectionSecurity,
};

export default function TechArchitecturePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState('overview');

  React.useEffect(() => {
    if (!user) { router.push('/auth?redirect=/dashboard/docs/tech-architecture'); return; }
    if (user.role !== 'admin') { router.push('/dashboard'); return; }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '3px solid #f0f0f0', borderTop: '3px solid #c19a6b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
          <p style={{ marginTop: 16, color: '#666', fontSize: 14 }}>Loading…</p>
        </div>
      </div>
    );
  }

  const ActiveSection = SECTION_COMPONENTS[active] ?? SectionOverview;

  return (
    <DashboardLayout
      title="Tech Architecture"
      description="Internal technical reference for the Colour My Space platform — admin only"
    >
      <div style={{ display: 'flex', gap: 24 }}>

        {/* TOC sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{
            background: 'white',
            borderRadius: 12,
            border: '1px solid #e8d5c4',
            boxShadow: '0 4px 12px rgba(193,154,107,0.08)',
            padding: '12px 8px',
            position: 'sticky',
            top: 104,
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: '#aaa',
              textTransform: 'uppercase', letterSpacing: '1px',
              padding: '0 8px 10px',
              borderBottom: '1px solid #f0ebe5',
              marginBottom: 8,
            }}>
              Contents
            </div>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  width: '100%', padding: '9px 10px',
                  background: active === s.id ? 'linear-gradient(135deg, rgba(193,154,107,0.12), rgba(193,154,107,0.06))' : 'transparent',
                  border: active === s.id ? '1px solid rgba(193,154,107,0.25)' : '1px solid transparent',
                  borderRadius: 7, cursor: 'pointer',
                  color: active === s.id ? '#c19a6b' : '#666',
                  fontSize: 12, fontWeight: active === s.id ? 700 : 500,
                  textAlign: 'left', marginBottom: 2,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { if (active !== s.id) e.currentTarget.style.background = 'rgba(193,154,107,0.04)'; }}
                onMouseLeave={e => { if (active !== s.id) e.currentTarget.style.background = 'transparent'; }}
              >
                <i className={s.icon} style={{ width: 16, textAlign: 'center', fontSize: 12 }}></i>
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <ActiveSection />

          {/* Prev / Next navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {(() => {
              const idx = SECTIONS.findIndex(s => s.id === active);
              const prev = SECTIONS[idx - 1];
              const next = SECTIONS[idx + 1];
              return (
                <>
                  <div>
                    {prev && (
                      <button
                        onClick={() => setActive(prev.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '10px 18px', background: 'white',
                          border: '1px solid #e8d5c4', borderRadius: 8,
                          color: '#c19a6b', fontSize: 13, fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <i className="fas fa-arrow-left"></i> {prev.title}
                      </button>
                    )}
                  </div>
                  <div>
                    {next && (
                      <button
                        onClick={() => setActive(next.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '10px 18px',
                          background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                          border: 'none', borderRadius: 8,
                          color: 'white', fontSize: 13, fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {next.title} <i className="fas fa-arrow-right"></i>
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
