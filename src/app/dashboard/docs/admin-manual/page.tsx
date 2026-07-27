'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';

/* ─── Section registry ─── */
const SECTIONS = [
  { id: 'overview',      icon: 'fas fa-tachometer-alt',  title: 'Dashboard Overview' },
  { id: 'add-product',   icon: 'fas fa-plus-circle',     title: 'Adding a Product' },
  { id: 'images',        icon: 'fas fa-images',          title: 'Product Images' },
  { id: 'variants',      icon: 'fas fa-tags',            title: 'Variants & Options' },
  { id: 'orders',        icon: 'fas fa-shopping-bag',    title: 'Managing Orders' },
  { id: 'users',         icon: 'fas fa-users',           title: 'User Management' },
  { id: 'suppliers',     icon: 'fas fa-truck',           title: 'Suppliers' },
  { id: 'inventory',     icon: 'fas fa-warehouse',       title: 'Inventory Alerts' },
  { id: 'reviews',       icon: 'fas fa-star',            title: 'Reviews' },
  { id: 'appointments',  icon: 'fas fa-calendar-check',  title: 'Appointments' },
  { id: 'settings',      icon: 'fas fa-cog',             title: 'Settings' },
];

/* ─── Shared style helpers ─── */
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

const stepBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
  color: 'white',
  fontSize: 13,
  fontWeight: 700,
  flexShrink: 0,
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

const fieldRow: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '160px 1fr',
  gap: '8px 16px',
  marginBottom: 8,
  alignItems: 'start',
};

const fieldLabel: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 13,
  color: '#333',
  paddingTop: 1,
};

const fieldDesc: React.CSSProperties = {
  fontSize: 13,
  color: '#666',
  lineHeight: 1.6,
};

const badge = (color: string, bg: string): React.CSSProperties => ({
  display: 'inline-block',
  padding: '2px 10px',
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 700,
  color,
  background: bg,
  letterSpacing: '0.3px',
});

/* ─── Step component ─── */
function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
      <div style={{ ...stepBadge, marginTop: 2 }}>{n}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#333', marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Tip component ─── */
function Tip({ type = 'info', children }: { type?: 'info' | 'warn' | 'success'; children: React.ReactNode }) {
  const map = {
    info:    { icon: 'fas fa-info-circle',       color: '#1e40af', bg: 'rgba(219,234,254,0.4)', border: 'rgba(147,197,253,0.5)' },
    warn:    { icon: 'fas fa-exclamation-triangle', color: '#92400e', bg: 'rgba(254,243,199,0.5)', border: 'rgba(253,230,138,0.6)' },
    success: { icon: 'fas fa-check-circle',      color: '#166534', bg: 'rgba(220,252,231,0.4)', border: 'rgba(134,239,172,0.5)' },
  };
  const s = map[type];
  return (
    <div style={tipBox(s.color, s.bg, s.border)}>
      <i className={s.icon} style={{ color: s.color, marginTop: 1, flexShrink: 0 }}></i>
      <div style={{ fontSize: 13, color: '#444', lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

/* ─── Field description row ─── */
function Field({ label, children, req }: { label: string; children: React.ReactNode; req?: boolean }) {
  return (
    <div style={fieldRow}>
      <div style={fieldLabel}>
        {label}{req && <span style={{ color: '#c19a6b', marginLeft: 3 }}>*</span>}
      </div>
      <div style={fieldDesc}>{children}</div>
    </div>
  );
}

/* ─── Status badge ─── */
function Status({ label, color, bg }: { label: string; color: string; bg: string }) {
  return <span style={badge(color, bg)}>{label}</span>;
}

/* ═══════════════════════════════════════════════════════════
   SECTION CONTENT
═══════════════════════════════════════════════════════════ */

function SectionOverview() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-tachometer-alt" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Dashboard Overview
      </h2>
      <p style={pStyle}>
        The admin dashboard is your central control panel for the Colour My Space platform.
        It is accessible only to users with the <strong>admin</strong> or <strong>moderator</strong> role.
      </p>

      <h3 style={h3Style}>Stats Cards</h3>
      <p style={pStyle}>The overview page displays real-time metrics pulled from the database:</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { icon: 'fas fa-box', label: 'Total Products', desc: 'All active products in the catalogue. Admin only.', color: '#c19a6b' },
          { icon: 'fas fa-shopping-bag', label: 'Total Orders', desc: 'Cumulative orders placed across all customers.', color: '#a67c52' },
          { icon: 'fas fa-users', label: 'Total Users', desc: 'All registered accounts. Admin only.', color: '#8b7355' },
          { icon: 'fas fa-calendar-check', label: 'Pending Appointments', desc: 'Consultation bookings awaiting action.', color: '#c19a6b' },
        ].map(s => (
          <div key={s.label} style={{
            border: '1px solid #e8d5c4', borderRadius: 10, padding: '14px 18px',
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <i className={s.icon} style={{ color: s.color, fontSize: 20, marginTop: 2 }}></i>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#333', marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={h3Style}>Quick Actions</h3>
      <p style={pStyle}>
        Below the stats, quick-action buttons provide one-click navigation to the most frequent tasks:
        <strong> Add New Product</strong>, <strong>View All Orders</strong>, <strong>View Appointments</strong>,
        and <strong>Manage Users</strong>. Some actions are admin-only.
      </p>

      <h3 style={h3Style}>Sidebar Navigation</h3>
      <p style={pStyle}>The left sidebar is always visible and role-aware:</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f8f4f0' }}>
            {['Page', 'Path', 'Who can access'].map(h => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: '#555', borderBottom: '1px solid #e8d5c4' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['Overview',          '/dashboard',                       'Admin, Moderator'],
            ['Products',          '/dashboard/products',              'Admin, Moderator¹'],
            ['Orders',            '/dashboard/orders',                'Admin, Moderator'],
            ['Appointments',      '/dashboard/appointments',          'Admin, Moderator'],
            ['Reviews',           '/dashboard/reviews',               'Admin, Moderator'],
            ['Inventory Alerts',  '/dashboard/inventory',             'Admin, Moderator'],
            ['Suppliers',         '/dashboard/suppliers',             'Admin only'],
            ['Users',             '/dashboard/users',                 'Admin only'],
            ['Variant Dictionary','/dashboard/variants',              'Admin only'],
            ['Settings',          '/dashboard/settings',              'Admin only'],
            ['Admin Manual',      '/dashboard/docs/admin-manual',     'Admin only'],
            ['Tech Architecture', '/dashboard/docs/tech-architecture','Admin only'],
          ].map(([page, path, who], i) => (
            <tr key={path} style={{ background: i % 2 === 0 ? 'white' : '#faf7f4' }}>
              <td style={{ padding: '8px 12px', fontWeight: 600, color: '#333' }}>{page}</td>
              <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: '#888' }}>{path}</td>
              <td style={{ padding: '8px 12px', color: who.includes('only') ? '#c19a6b' : '#555', fontWeight: who.includes('only') ? 600 : 400 }}>{who}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
        ¹ Moderators can view all products (including drafts) but cannot create, edit, or delete them.
      </p>
    </div>
  );
}

function SectionAddProduct() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-plus-circle" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Adding a Product
      </h2>
      <p style={pStyle}>
        Products are the heart of the store. Follow these steps to add a new product to the catalogue.
      </p>

      <Tip type="warn">
        Only <strong>admins</strong> can create, edit, or delete products. Moderators can view all products
        (including drafts) but cannot make changes.
      </Tip>

      <Step n={1} title="Navigate to Products">
        Click <strong>Products</strong> in the left sidebar or go to <code style={{ background: '#f5f0eb', padding: '1px 6px', borderRadius: 4 }}>/dashboard/products</code>.
        You will see the full product list with search and filter tools.
      </Step>

      <Step n={2} title="Click Add Product">
        Press the <strong style={{ color: '#c19a6b' }}>+ Add Product</strong> button (top-right of the products page).
        A creation form will open inline or navigate to a new page.
      </Step>

      <Step n={3} title="Fill in the product details">
        <div style={{ marginTop: 10 }}>
          <Field label="Product Name" req>
            The full display name shown to customers on the product page and listings.
            Keep it descriptive, e.g. <em>"Canvas Print – Abstract Bloom"</em>.
          </Field>
          <Field label="Description" req>
            Rich text description of the product. Include material details, use cases, care instructions, and any
            other information a customer needs before purchasing.
          </Field>
          <Field label="Base Price (₹)" req>
            The standard selling price in Indian Rupees (no decimals needed). This is the price before any
            variant price modifiers are applied.
          </Field>
          <Field label="Sale Price (₹)">
            Optional. When set, this is shown as the discounted price with the original price struck through.
            Must be lower than the base price or leave blank.
          </Field>
          <Field label="Category">
            Freeform category tag (e.g. <em>Canvas, Frames, Wallpaper, Accessories</em>). Used for filtering on
            the storefront. Keep category names consistent to avoid duplicates.
          </Field>
          <Field label="Stock Quantity">
            The default stock count. If the product has variants, stock is tracked per variant SKU.
            Set this to the total available units if no variants are used.
          </Field>
          <Field label="Status">
            Controls visibility. <strong>draft</strong> (default) — product is saved but hidden from the
            storefront; only admins and moderators can see it. <strong>published</strong> — visible to all
            customers. <strong>archived</strong> — retired product, hidden from storefront but preserved in
            order history.
          </Field>
        </div>
      </Step>

      <Step n={4} title="Save the product (draft)">
        Click <strong>Save Product</strong>. The system generates a unique URL slug from the product name automatically.
        New products are saved as <strong>draft</strong> by default — they are not visible to customers yet.
        You will be redirected to the product edit page to continue.
      </Step>

      <Step n={5} title="Upload product images">
        See the <strong>Product Images</strong> section for the full image upload workflow.
      </Step>

      <Step n={6} title="Assign variants and suppliers (optional)">
        If the product comes in different sizes or configurations, see <strong>Variants & Options</strong>.
        Assign suppliers to individual variants from the <strong>Suppliers</strong> section so inventory
        can be tracked per-supplier.
      </Step>

      <Step n={7} title="Publish the product">
        Once the product is ready — images uploaded, variants configured, suppliers assigned — set
        <strong> Status → published</strong> and save. The product will immediately appear on the storefront.
      </Step>

      <Tip type="info">
        Products remain in <strong>draft</strong> until you explicitly publish them. This lets you prepare
        products in advance without customers seeing incomplete listings.
        Use <strong>archived</strong> to retire products without losing order history.
      </Tip>

      <h3 style={h3Style}>Editing an Existing Product</h3>
      <p style={pStyle}>
        From the Products list, click the <strong>Edit</strong> (pencil) icon on any product row.
        All fields — including name, price, category, description, images, and variants — can be updated at any time.
        Changes are saved immediately on form submit; there is no draft/publish toggle.
      </p>

      <h3 style={h3Style}>Deleting a Product</h3>
      <p style={pStyle}>
        Click the <strong>Delete</strong> (trash) icon in the product list. You will be asked to confirm.
        Deletion is permanent and also removes all linked images from Cloudflare R2 storage and all
        variant records. <strong>Orders that reference a deleted product are not affected</strong> — the
        order item data is preserved.
      </p>

      <Tip type="warn">
        Do <strong>not</strong> delete products that have recent orders — it can break order detail views.
        Instead, set stock to 0 to hide them from the catalogue.
      </Tip>
    </div>
  );
}

function SectionImages() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-images" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Product Images
      </h2>
      <p style={pStyle}>
        All product images are stored in a <strong>private Cloudflare R2 bucket</strong> and served through
        a secure proxy endpoint at <code style={{ background: '#f5f0eb', padding: '1px 6px', borderRadius: 4 }}>/api/images/[key]</code>.
        Direct R2 public URLs are never used.
      </p>

      <Tip type="warn">
        Never copy-paste <code>pub-*.r2.dev</code> URLs into the database. Always upload through the dashboard
        image uploader so the correct proxy URL is stored.
      </Tip>

      <h3 style={h3Style}>Uploading Images</h3>
      <Step n={1} title="Open the product edit page">
        Navigate to <strong>Products → Edit</strong> on the product you want to update.
      </Step>
      <Step n={2} title="Scroll to the Images section">
        The image management panel appears below the main product fields. Click <strong>Upload Images</strong>.
      </Step>
      <Step n={3} title="Select files">
        Choose one or more image files (JPG, PNG, WebP). Multiple files can be selected at once.
        Recommended resolution: <strong>1200 × 1200 px minimum</strong>, square aspect ratio preferred.
      </Step>
      <Step n={4} title="Wait for upload">
        Each file is sent to the proxy upload endpoint (<code style={{ background: '#f5f0eb', padding: '1px 6px', borderRadius: 4 }}>/api/products/images/upload</code>),
        which stores it in R2 and saves metadata to the <code style={{ background: '#f5f0eb', padding: '1px 6px', borderRadius: 4 }}>product_images</code> table.
        A progress indicator appears during upload.
      </Step>

      <h3 style={h3Style}>Setting the Primary Image</h3>
      <p style={pStyle}>
        The primary image is the one shown in product cards, search results, and cart thumbnails.
        Click the <strong>star icon</strong> on any image thumbnail to make it primary. Only one image
        can be primary at a time; selecting a new primary automatically unsets the old one.
      </p>

      <h3 style={h3Style}>Reordering Images</h3>
      <p style={pStyle}>
        The order of non-primary images determines the gallery carousel sequence on the product page.
        Use the <strong>display_order</strong> field (when editing an image) to set the sort position.
        Lower numbers appear first (0 = first).
      </p>

      <h3 style={h3Style}>Deleting Images</h3>
      <p style={pStyle}>
        Click the <strong>delete (×)</strong> button on a thumbnail. This removes the record from the database
        and the file from Cloudflare R2 storage. The action is immediate and irreversible.
        Ensure at least one image remains as the primary before deleting others.
      </p>

      <Tip type="info">
        <strong>File size tip:</strong> Compress images to under 2 MB before uploading. Use tools like
        Squoosh or TinyPNG. Large files slow down the product page for customers on mobile connections.
      </Tip>
    </div>
  );
}

function SectionVariants() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-tags" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Variants & Options
      </h2>
      <p style={pStyle}>
        Variants let a single product be sold in multiple configurations — different sizes, thickness,
        paper type, or colour — each with its own price and stock level. The system uses a two-layer model:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div style={{ border: '1px solid #e8d5c4', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#333', marginBottom: 6 }}>
            <i className="fas fa-layer-group" style={{ color: '#c19a6b', marginRight: 8 }}></i>Option Types
          </div>
          <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
            The dimension of choice — e.g. <em>Thickness</em>, <em>Size</em>, <em>Finish</em>.
            Managed globally in <strong>Variant Dictionary</strong>. Shared across all products.
          </div>
        </div>
        <div style={{ border: '1px solid #e8d5c4', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#333', marginBottom: 6 }}>
            <i className="fas fa-list" style={{ color: '#a67c52', marginRight: 8 }}></i>Option Values
          </div>
          <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
            Specific choices within a type — e.g. <em>Thin</em>, <em>Medium</em>, <em>Thick</em> under Thickness.
            Each value can carry a price modifier (₹ added to base price).
          </div>
        </div>
      </div>

      <h3 style={h3Style}>Step 1 — Define Option Types (Variant Dictionary)</h3>
      <p style={pStyle}>
        Before assigning variants to products, the option types must exist globally.
        Go to <strong>Variant Dictionary</strong> in the sidebar:
      </p>
      <Step n={1} title="Click Add Option Type">
        Enter an <strong>internal name</strong> (lowercase, underscores — e.g. <code style={{ background: '#f5f0eb', padding: '1px 6px', borderRadius: 4 }}>paper_thickness</code>),
        a <strong>display label</strong> seen by admins (e.g. <em>Paper Thickness</em>),
        and an optional description.
      </Step>
      <Step n={2} title="Add values to each type">
        Expand the type row, then click <strong>Add Value</strong>. Provide:
        the <strong>display label</strong> (shown to customers), <strong>internal value</strong> (slug), and
        an optional <strong>price modifier</strong> in ₹ (added on top of the base price when this option is selected).
      </Step>
      <Step n={3} title="Activate / deactivate">
        Use the toggle switch to activate or deactivate any type or individual value.
        Inactive options are hidden from product pages.
      </Step>

      <h3 style={h3Style}>Step 2 — Create Product Variants</h3>
      <p style={pStyle}>
        On a specific product&apos;s edit page, scroll to the <strong>Variants</strong> panel:
      </p>
      <Step n={1} title="Click Add Variant">
        A form appears with dropdowns for each active option type (e.g. Size, Thickness).
        Select the combination that defines this variant.
      </Step>
      <Step n={2} title="Set variant price & stock">
        Optionally override the base price for this specific combination. Set the stock quantity
        independently per variant. Optionally enter a custom SKU for inventory tracking.
      </Step>
      <Step n={3} title="Save the variant">
        The variant appears in the product&apos;s variant list. Customers will see dropdowns on the
        product page to select their preferred options.
      </Step>

      <Tip type="info">
        If a product has no variants, customers purchase the product at the base price with no option
        selectors shown. Variants are completely optional.
      </Tip>

      <Tip type="warn">
        Deleting an option value from the Variant Dictionary that is already used by a product variant
        will affect that product. Always check product usage before deleting a variant option.
      </Tip>
    </div>
  );
}

function SectionOrders() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-shopping-bag" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Managing Orders
      </h2>
      <p style={pStyle}>
        Orders are created automatically when a customer completes checkout via Razorpay.
        Both admins and moderators can view and update order statuses.
      </p>

      <h3 style={h3Style}>Order Statuses</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'pending',    color: '#92400e', bg: 'rgba(254,243,199,0.7)',  desc: '— Payment received, awaiting processing' },
          { label: 'processing', color: '#1e40af', bg: 'rgba(219,234,254,0.7)', desc: '— Order confirmed, being prepared' },
          { label: 'shipped',    color: '#5b21b6', bg: 'rgba(237,233,254,0.7)', desc: '— Dispatched to customer' },
          { label: 'completed',  color: '#166534', bg: 'rgba(220,252,231,0.7)', desc: '— Delivered and closed; stock already deducted' },
          { label: 'cancelled',  color: '#991b1b', bg: 'rgba(254,226,226,0.7)', desc: '— Cancelled by admin or customer before shipment' },
          { label: 'returned',   color: '#6b21a8', bg: 'rgba(243,232,255,0.7)', desc: '— Item returned by customer after delivery' },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Status label={s.label} color={s.color} bg={s.bg} />
            <span style={{ fontSize: 12, color: '#666' }}>{s.desc}</span>
          </div>
        ))}
      </div>

      <h3 style={h3Style}>Viewing Orders</h3>
      <p style={pStyle}>
        Navigate to <strong>Orders</strong>. The list shows all orders sorted by date (newest first).
        Use the search bar to find an order by ID, customer name, or email. Click any row to open
        the order detail page.
      </p>

      <h3 style={h3Style}>Updating an Order Status</h3>
      <Step n={1} title="Open the order detail page">
        Click the order in the Orders list. You will see a full breakdown: customer info, items ordered,
        variant selections, pricing, shipping address, and Razorpay payment ID.
      </Step>
      <Step n={2} title="Select a new status">
        Use the <strong>Status</strong> dropdown on the order detail page.
        Select the appropriate status from the list.
      </Step>
      <Step n={3} title="Save the update">
        Click <strong>Update Status</strong>. The change is immediate. Customers do not currently
        receive automated email notifications on status change — contact them manually if needed.
      </Step>

      <Tip type="info">
        The <strong>Razorpay Payment ID</strong> on each order can be used to look up the transaction
        in your Razorpay dashboard at <code style={{ background: '#f5f0eb', padding: '1px 6px', borderRadius: 4 }}>dashboard.razorpay.com</code> for
        payment verification or refund processing.
      </Tip>

      <Tip type="info">
        <strong>Inventory deduction</strong> happens automatically when a payment is verified — not when
        the order status changes. The system deducts stock from the supplier with the most available units
        first, across all suppliers assigned to a variant. If an item goes out of stock as a result, it
        will appear on the <strong>Inventory Alerts</strong> page.
      </Tip>
    </div>
  );
}

function SectionUsers() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-users" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        User Management
      </h2>
      <p style={pStyle}>
        All users who have signed in via Google OAuth are listed here. Admins can view profiles
        and change user roles. Moderators cannot access this page.
      </p>

      <h3 style={h3Style}>User Roles</h3>
      <div style={{ marginBottom: 20 }}>
        {[
          { role: 'customer',  color: '#555',    bg: '#f0f0f0',               desc: 'Default role. Can browse, purchase, book appointments, and leave reviews.' },
          { role: 'moderator', color: '#1e40af', bg: 'rgba(219,234,254,0.7)', desc: 'Can access the dashboard, manage orders, reviews, and appointments. Cannot manage products, users, or settings.' },
          { role: 'admin',     color: '#92400e', bg: 'rgba(254,243,199,0.7)', desc: 'Full access to all dashboard features including products, users, suppliers, variants, and settings.' },
          { role: 'supplier',  color: '#166534', bg: 'rgba(220,252,231,0.7)', desc: 'Reserved for supplier accounts. Limited access to supplier-relevant data.' },
        ].map(r => (
          <div key={r.role} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
            <Status label={r.role} color={r.color} bg={r.bg} />
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6, flex: 1, paddingTop: 1 }}>{r.desc}</div>
          </div>
        ))}
      </div>

      <h3 style={h3Style}>Changing a User&apos;s Role</h3>
      <Step n={1} title="Find the user">
        Use the search box on the Users page to locate the user by name or email.
      </Step>
      <Step n={2} title="Open the user detail page">
        Click the user row to open their profile. You will see their registration date, last active session,
        and current role.
      </Step>
      <Step n={3} title="Select the new role">
        Use the <strong>Role</strong> dropdown and click <strong>Save Role</strong>.
        The change takes effect <em>immediately</em> on the user&apos;s next API request
        because sessions are validated against the database on every request.
      </Step>

      <Tip type="warn">
        <strong>Be cautious when granting the admin role.</strong> Admins can manage all users,
        including other admins. There is no confirmation step after role assignment.
      </Tip>

      <Tip type="info">
        <strong>Auto-admin:</strong> Email addresses listed in the <code style={{ background: '#f5f0eb', padding: '1px 6px', borderRadius: 4 }}>ADMIN_EMAILS</code> environment
        variable are automatically promoted to admin on their first Google sign-in.
        This is configured on the server — contact your system administrator to update this list.
      </Tip>
    </div>
  );
}

function SectionSuppliers() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-truck" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Suppliers
      </h2>
      <p style={pStyle}>
        Suppliers are businesses or individuals who stock and fulfil product variants.
        The system tracks inventory per supplier — each supplier manages their own stock levels
        through a dedicated <strong>Supplier Portal</strong>, while admins coordinate assignments and
        restock requests from the dashboard.
      </p>

      <Tip type="info">
        Suppliers have their own login and portal at <code style={{ background: '#f5f0eb', padding: '1px 6px', borderRadius: 4 }}>/supplier</code>.
        They can only see and update stock for variants assigned to them. They cannot access any admin pages.
      </Tip>

      <h3 style={h3Style}>Onboarding a New Supplier (3 Steps)</h3>

      <Step n={1} title="Create the supplier's user account">
        The supplier must sign in once with their Google account at <strong>colourmyspace.com</strong>.
        Then go to <strong>Users</strong> in the sidebar, find their account, and change their role
        to <strong>supplier</strong>. They will immediately be restricted to the /supplier portal only.
      </Step>

      <Step n={2} title="Create their supplier profile">
        Navigate to <strong>Suppliers → Add Supplier</strong>. Fill in:
        <div style={{ marginTop: 10 }}>
          <Field label="Company Name" req>The supplier&apos;s business name (shown in emails and internal reports).</Field>
          <Field label="User Account" req>Link to the supplier&apos;s user account created in step 1.</Field>
          <Field label="Phone">Contact phone number. Optional but recommended for urgent restocking.</Field>
          <Field label="Address">Warehouse or office address. Optional.</Field>
          <Field label="GST ID">GST registration number for invoicing purposes. Optional.</Field>
          <Field label="Notes">Internal notes about this supplier — lead times, payment terms, etc.</Field>
        </div>
      </Step>

      <Step n={3} title="Assign product variants">
        Once the supplier profile exists, go to any <strong>product edit page</strong> and scroll to the
        <strong> Variants</strong> panel. For each variant you want this supplier to fulfil, click
        <strong> Assign Supplier</strong> and select the supplier. You can optionally add a note.
        <br /><br />
        The supplier receives an <strong>automatic email notification</strong> when a variant is assigned,
        with the product name, variant details, and SKU. They can then set their initial stock quantity
        in their supplier portal.
      </Step>

      <Tip type="success">
        A single variant can be shared across multiple suppliers. The system sums all supplier stock levels
        to compute the variant&apos;s total stock shown to customers. During checkout, stock is deducted from
        the supplier with the most units first.
      </Tip>

      <h3 style={h3Style}>Supplier Portal (/supplier)</h3>
      <p style={pStyle}>
        Suppliers log in and land at <code style={{ background: '#f5f0eb', padding: '1px 6px', borderRadius: 4 }}>/supplier</code> instead of
        the admin dashboard. From there they can:
      </p>
      <div style={{ marginBottom: 16 }}>
        {[
          { icon: 'fas fa-boxes', text: 'View all product variants assigned to them' },
          { icon: 'fas fa-edit', text: 'Update their own stock quantity for each variant' },
          { icon: 'fas fa-exclamation-triangle', text: 'See out-of-stock alerts highlighted in red at the top of the page' },
          { icon: 'fas fa-history', text: 'View their own inventory update history' },
        ].map(item => (
          <div key={item.icon} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
            <i className={item.icon} style={{ color: '#c19a6b', fontSize: 14, marginTop: 2, width: 18, flexShrink: 0 }}></i>
            <span style={{ fontSize: 13, color: '#555' }}>{item.text}</span>
          </div>
        ))}
      </div>

      <h3 style={h3Style}>Supplier Detail Page (Admin)</h3>
      <p style={pStyle}>
        Clicking a supplier in the admin Suppliers list shows their detail page:
        contact information, all assigned variants with current stock, and a notes field for internal use.
        Admins can also remove variant assignments from this page.
      </p>

      <Tip type="warn">
        If you need to remove a supplier, first reassign all their variants to another supplier so stock
        continuity is maintained. Removing an assignment does not restore stock to the variant total
        automatically.
      </Tip>
    </div>
  );
}

function SectionInventory() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-warehouse" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Inventory Alerts
      </h2>
      <p style={pStyle}>
        The Inventory Alerts page (<code style={{ background: '#f5f0eb', padding: '1px 6px', borderRadius: 4 }}>/dashboard/inventory</code>) gives
        admins and moderators a centralised view of stock health — out-of-stock variants, low-stock variants,
        and variants with no supplier assigned. From here you can notify suppliers with a single click.
      </p>

      <h3 style={h3Style}>The Three Tabs</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { icon: 'fas fa-times-circle', color: '#ef4444', bg: 'rgba(239,68,68,0.06)', label: 'Out of Stock', desc: 'All active variants where total stock = 0. Customers cannot purchase these.' },
          { icon: 'fas fa-exclamation-circle', color: '#f59e0b', bg: 'rgba(245,158,11,0.06)', label: 'Low Stock', desc: 'Variants with stock ≤ threshold (default 10). Variants still purchasable but need restocking soon.' },
          { icon: 'fas fa-unlink', color: '#6b7280', bg: 'rgba(107,114,128,0.06)', label: 'No Supplier', desc: 'Out-of-stock variants that have no supplier assigned. Cannot be restocked without assigning one first.' },
        ].map(t => (
          <div key={t.label} style={{ border: `1px solid ${t.color}40`, borderRadius: 10, padding: '14px 16px', background: t.bg }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <i className={t.icon} style={{ color: t.color, fontSize: 16 }}></i>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#333' }}>{t.label}</span>
            </div>
            <div style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>{t.desc}</div>
          </div>
        ))}
      </div>

      <h3 style={h3Style}>Reading the Table</h3>
      <p style={pStyle}>
        Each row shows a variant with its <strong>product name</strong>, <strong>SKU</strong>,
        <strong> total stock</strong>, and a breakdown of each assigned supplier&apos;s individual stock.
        The <strong>Last Updated</strong> column shows when stock was last changed — useful for spotting
        stale records.
      </p>
      <p style={pStyle}>
        Variants from <strong>draft</strong> products are included and labelled with a grey DRAFT badge,
        so you can identify inventory issues before a product goes live.
      </p>

      <h3 style={h3Style}>Notifying a Supplier to Restock</h3>
      <Step n={1} title="Click the Notify button">
        On any row that has at least one supplier assigned, click <strong>🚨 Notify</strong> (out-of-stock)
        or <strong>⚠ Notify</strong> (low-stock). A modal opens.
      </Step>
      <Step n={2} title="Select which supplier(s) to notify">
        If the variant has multiple suppliers, choose to notify <em>all of them</em> or select a specific one
        from the dropdown. By default, all active suppliers are notified.
      </Step>
      <Step n={3} title="Add an optional note">
        Type a message to include in the email — e.g. <em>"We need at least 20 units by Friday."</em>
        Leave blank for a generic restock request.
      </Step>
      <Step n={4} title="Send">
        Click <strong>Send Notification</strong>. Each supplier receives a branded email with the product
        name, variant details, current stock level, and your note. The notification is recorded in the
        inventory audit log for traceability.
      </Step>

      <Tip type="success">
        Notification emails are sent immediately and non-blocking — a partial failure (one supplier&apos;s
        email bounces) will not prevent the others from being sent. The result banner shows exactly which
        suppliers were reached and which failed.
      </Tip>

      <h3 style={h3Style}>No Supplier Assigned — What to Do</h3>
      <p style={pStyle}>
        If a variant has no supplier, you cannot notify anyone. The <strong>Assign Supplier</strong> button
        links you directly to the Suppliers page. Follow the <strong>Onboarding</strong> flow in the
        Suppliers section to set one up, then return here to send a restock request.
      </p>

      <h3 style={h3Style}>Supplier&apos;s View</h3>
      <p style={pStyle}>
        When a supplier logs into their portal, any variant they manage with zero stock is highlighted
        in red with an <strong>OUT OF STOCK</strong> badge at the top of their list. Their update button
        turns red and reads <strong>⚡ Restock Now</strong> as a visual prompt to act immediately.
      </p>

      <Tip type="info">
        The summary stat cards at the top of the page are clickable — clicking a card switches to that tab.
        Use the search box to filter by product name, variant, SKU, or supplier company name.
      </Tip>
    </div>
  );
}

function SectionReviews() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-star" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Reviews Moderation
      </h2>
      <p style={pStyle}>
        Customer reviews go through a moderation queue before appearing publicly on product pages.
        Both admins and moderators can manage reviews.
      </p>

      <h3 style={h3Style}>Review Statuses</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Status label="pending" color="#92400e" bg="rgba(254,243,199,0.7)" /><span style={{ fontSize: 12, color: '#666' }}>Awaiting admin review</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Status label="approved" color="#166534" bg="rgba(220,252,231,0.7)" /><span style={{ fontSize: 12, color: '#666' }}>Visible publicly on product page</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Status label="rejected" color="#991b1b" bg="rgba(254,226,226,0.7)" /><span style={{ fontSize: 12, color: '#666' }}>Hidden from customers</span></div>
      </div>

      <h3 style={h3Style}>Moderating Reviews</h3>
      <Step n={1} title="Navigate to Reviews">
        The Reviews page defaults to showing <strong>pending</strong> reviews.
        Use the filter tabs to switch between pending / approved / rejected.
      </Step>
      <Step n={2} title="Read the review content">
        Each review card shows the customer&apos;s name, star rating (1–5), and their written comment,
        along with the product name and submission date.
      </Step>
      <Step n={3} title="Approve or Reject">
        Click <strong>Approve</strong> to make the review visible on the product page,
        or <strong>Reject</strong> to hide it. You can reverse this decision at any time by
        going to the approved/rejected tab and changing the status.
      </Step>

      <Tip type="info">
        Reviews affect the average star rating shown on product pages. Make sure to action
        pending reviews regularly to keep product ratings current and accurate.
      </Tip>
    </div>
  );
}

function SectionAppointments() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-calendar-check" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Appointments
      </h2>
      <p style={pStyle}>
        Customers can book interior design consultation appointments through the storefront.
        Admins and moderators can view and manage all bookings.
      </p>

      <h3 style={h3Style}>Appointment Statuses</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Status label="scheduled" color="#1e40af" bg="rgba(219,234,254,0.7)" /><span style={{ fontSize: 12, color: '#666' }}>Booking confirmed, upcoming</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Status label="completed" color="#166534" bg="rgba(220,252,231,0.7)" /><span style={{ fontSize: 12, color: '#666' }}>Consultation took place</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Status label="cancelled" color="#991b1b" bg="rgba(254,226,226,0.7)" /><span style={{ fontSize: 12, color: '#666' }}>Cancelled by customer or admin</span></div>
      </div>

      <h3 style={h3Style}>Managing Appointments</h3>
      <p style={pStyle}>
        The Appointments list shows all bookings with the customer&apos;s name, email, phone, selected date,
        service type, and current status. Use the status filter to view upcoming vs. completed bookings.
      </p>
      <p style={pStyle}>
        Click any appointment to open its detail view and update the status. Guest bookings (customers
        who did not create an account) include their name and contact info directly on the appointment record.
      </p>

      <Tip type="info">
        The <strong>Pending Appointments</strong> counter on the Overview page counts all appointments
        with status <em>scheduled</em>. Check this regularly to ensure upcoming consultations are
        prepared for.
      </Tip>
    </div>
  );
}

function SectionSettings() {
  return (
    <div style={card}>
      <h2 style={h2Style}>
        <i className="fas fa-cog" style={{ color: '#c19a6b', fontSize: 20 }}></i>
        Settings
      </h2>
      <p style={pStyle}>
        The Settings page controls store-wide configuration options. Only admins can access this page.
      </p>

      <h3 style={h3Style}>Shipping Settings</h3>
      <Field label="Shipping Fee (₹)">
        The flat shipping rate charged on all orders. Set to <strong>0</strong> for free shipping.
        This is applied automatically at checkout.
      </Field>
      <Field label="Free Shipping Threshold (₹)">
        Orders above this value qualify for free shipping (overriding the flat fee).
        Set to <strong>0</strong> to disable threshold-based free shipping.
      </Field>

      <h3 style={h3Style}>Tax Settings</h3>
      <Field label="GST Rate (%)">
        The tax rate applied to all orders, shown as a line item in the checkout summary.
        Enter as a percentage (e.g. <strong>18</strong> for 18% GST). Set to 0 to disable tax display.
      </Field>

      <h3 style={h3Style}>Saving Changes</h3>
      <p style={pStyle}>
        After updating any setting, click <strong>Save Settings</strong>. Changes take effect
        immediately on the next customer checkout — no server restart required.
      </p>

      <Tip type="warn">
        Changing the shipping fee or GST rate does <strong>not</strong> retroactively update
        existing orders. Only new orders created after the change will use the new values.
      </Tip>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */

const SECTION_COMPONENTS: Record<string, React.FC> = {
  'overview':     SectionOverview,
  'add-product':  SectionAddProduct,
  'images':       SectionImages,
  'variants':     SectionVariants,
  'orders':       SectionOrders,
  'users':        SectionUsers,
  'suppliers':    SectionSuppliers,
  'inventory':    SectionInventory,
  'reviews':      SectionReviews,
  'appointments': SectionAppointments,
  'settings':     SectionSettings,
};

export default function AdminManualPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState('overview');

  React.useEffect(() => {
    if (!user) { router.push('/auth?redirect=/dashboard/docs/admin-manual'); return; }
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
      title="Admin User Manual"
      description="Complete guide to managing the Colour My Space platform"
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

          {/* Navigation between sections */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 8,
          }}>
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
