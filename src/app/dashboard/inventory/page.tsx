'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { timeAgo } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SupplierInfo {
  supplier_id: number;
  company_name: string;
  email: string;
  phone: string | null;
  is_active: boolean;
  supplier_stock: number;
  min_stock_threshold: number;
}

interface InventoryVariant {
  variant_id: number;
  product_id: number;
  product_name: string;
  product_status: string;
  variant_name: string;
  sku: string | null;
  price: number;
  stock_quantity: number;
  last_stock_update: string | null;
  suppliers: SupplierInfo[];
}

interface Summary {
  outOfStockCount: number;
  noSupplierCount: number;
  lowStockCount: number;
  threshold: number;
}

type Tab = 'out-of-stock' | 'low-stock' | 'no-supplier' | 'all';

// ─── Component ────────────────────────────────────────────────────────────────

const InventoryPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [outOfStock, setOutOfStock]   = useState<InventoryVariant[]>([]);
  const [lowStock, setLowStock]       = useState<InventoryVariant[]>([]);
  const [allVariants, setAllVariants] = useState<InventoryVariant[]>([]);
  const [allLoaded, setAllLoaded]     = useState(false);
  const [allLoading, setAllLoading]   = useState(false);
  const [summary, setSummary]         = useState<Summary | null>(null);
  const [loading, setLoading]         = useState(true);
  const [activeTab, setActiveTab]     = useState<Tab>('out-of-stock');
  const [search, setSearch]           = useState('');

  // Notify modal state
  const [notifyVariant, setNotifyVariant]   = useState<InventoryVariant | null>(null);
  const [notifySupplier, setNotifySupplier] = useState<SupplierInfo | null>(null); // null = all
  const [adminNote, setAdminNote]           = useState('');
  const [notifying, setNotifying]           = useState(false);
  const [notifyResult, setNotifyResult]     = useState<string | null>(null);

  // Edit-stock modal state
  interface EditTarget { variant: InventoryVariant; supplier: SupplierInfo }
  const [editTarget, setEditTarget]   = useState<EditTarget | null>(null);
  const [editQty, setEditQty]         = useState('');
  const [editNote, setEditNote]       = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editResult, setEditResult]   = useState<string | null>(null);

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) { router.push('/auth?redirect=/dashboard/inventory'); return; }
    if (user.role !== 'admin' && user.role !== 'moderator') { router.push('/dashboard'); return; }
  }, [user, router]);

  // ── Fetch data ──────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch('/api/admin/inventory/out-of-stock');
      const json = await res.json();
      if (json.success) {
        setOutOfStock(json.data.outOfStock);
        setLowStock(json.data.lowStock);
        setSummary(json.data.summary);
      }
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Fetch all variants (lazy — only when "All Stock" tab is first opened) ───
  const fetchAllVariants = useCallback(async () => {
    if (allLoaded) return;
    setAllLoading(true);
    try {
      const res  = await fetch('/api/admin/inventory/all');
      const json = await res.json();
      if (json.success) {
        setAllVariants(json.data.variants);
        setAllLoaded(true);
      }
    } catch (err) {
      console.error('Failed to fetch all variants:', err);
    } finally {
      setAllLoading(false);
    }
  }, [allLoaded]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSearch('');
    if (tab === 'all') fetchAllVariants();
  };

  // After an edit-stock save, also refresh the all-variants list if it was loaded
  const refreshAfterEdit = useCallback(() => {
    fetchData();
    if (allLoaded) {
      setAllLoaded(false); // force re-fetch next render cycle
      setTimeout(() => fetchAllVariants(), 0);
    }
  }, [fetchData, allLoaded, fetchAllVariants]);

  // ── Computed lists ──────────────────────────────────────────────────────────
  const noSupplierList = outOfStock.filter(v => v.suppliers.length === 0);

  const activeList: InventoryVariant[] =
    activeTab === 'out-of-stock' ? outOfStock
    : activeTab === 'low-stock'  ? lowStock
    : activeTab === 'all'        ? allVariants
    : noSupplierList;

  const filtered = activeList.filter(v => {
    const q = search.toLowerCase();
    return (
      v.product_name.toLowerCase().includes(q) ||
      (v.variant_name || '').toLowerCase().includes(q) ||
      (v.sku || '').toLowerCase().includes(q) ||
      v.suppliers.some(s => s.company_name.toLowerCase().includes(q))
    );
  });

  // ── Edit-stock action ────────────────────────────────────────────────────────

  const openEditStock = (variant: InventoryVariant, supplier: SupplierInfo) => {
    setEditTarget({ variant, supplier });
    setEditQty(String(supplier.supplier_stock));
    setEditNote('');
    setEditResult(null);
  };

  const handleEditStock = async () => {
    if (!editTarget) return;
    const qty = Number(editQty);
    if (!Number.isInteger(qty) || qty < 0) {
      setEditResult('Please enter a valid non-negative whole number.');
      return;
    }
    setEditLoading(true);
    setEditResult(null);
    try {
      const res  = await fetch('/api/admin/inventory/supplier-stock', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          variant_id:   editTarget.variant.variant_id,
          supplier_id:  editTarget.supplier.supplier_id,
          new_quantity: qty,
          notes:        editNote.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setEditResult(`✓ ${json.data.message}`);
        setTimeout(() => {
          setEditTarget(null);
          refreshAfterEdit();
        }, 1200);
      } else {
        setEditResult(json.error ?? 'Failed to update stock.');
      }
    } catch {
      setEditResult('Network error — please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  // ── Notify action ────────────────────────────────────────────────────────────
  const openNotify = (variant: InventoryVariant, supplier: SupplierInfo | null = null) => {
    setNotifyVariant(variant);
    setNotifySupplier(supplier);
    setAdminNote('');
    setNotifyResult(null);
  };

  const handleNotify = async () => {
    if (!notifyVariant) return;
    setNotifying(true);
    setNotifyResult(null);
    try {
      const res  = await fetch('/api/admin/inventory/notify-supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variant_id:   notifyVariant.variant_id,
          supplier_id:  notifySupplier?.supplier_id ?? undefined,
          admin_note:   adminNote || undefined,
        }),
      });
      const json = await res.json();
      setNotifyResult(json.data?.message ?? json.error ?? 'Done');
      if (json.success) {
        // Brief success pause, then close + refresh
        setTimeout(() => {
          setNotifyVariant(null);
          fetchData();
        }, 1800);
      }
    } catch {
      setNotifyResult('Failed to send — check email configuration.');
    } finally {
      setNotifying(false);
    }
  };

  // ── Styles ───────────────────────────────────────────────────────────────────
  const card = {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(193,154,107,0.08)',
    border: '1px solid #e8d5c4',
  } as const;

  const btn = (color: string, bg: string) => ({
    padding: '7px 14px',
    background: bg,
    color,
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600' as const,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  });

  if (!user || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#f8f4f0,#efe9e3)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '3px solid #f0f0f0', borderTop: '3px solid #c19a6b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
          <p style={{ marginTop: 16, color: '#666' }}>Loading inventory…</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout title="Inventory Alerts" description="Monitor out-of-stock and low-stock variants, and notify suppliers.">

      {/* ── Summary stat cards ── */}
      {summary && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Out of Stock',      value: summary.outOfStockCount,  color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   tab: 'out-of-stock' as Tab },
            { label: 'No Supplier',       value: summary.noSupplierCount,  color: '#6b7280', bg: 'rgba(107,114,128,0.08)', tab: 'no-supplier'  as Tab },
            { label: `Low Stock (≤${summary.threshold})`, value: summary.lowStockCount, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', tab: 'low-stock' as Tab },
          ].map(s => (
            <button
              key={s.tab}
              onClick={() => handleTabChange(s.tab)}
              style={{
                ...card,
                padding: '20px',
                textAlign: 'left',
                cursor: 'pointer',
                outline: activeTab === s.tab ? `2px solid ${s.color}` : '2px solid transparent',
                transition: 'outline 0.15s',
                background: s.bg,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{s.label}</div>
            </button>
          ))}
        </div>
      )}

      {/* ── Main table card ── */}
      <div style={card}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {([
              { t: 'out-of-stock' as Tab, label: 'Out of Stock', count: outOfStock.length },
              { t: 'low-stock'    as Tab, label: 'Low Stock',    count: lowStock.length },
              { t: 'no-supplier'  as Tab, label: 'No Supplier',  count: noSupplierList.length },
              { t: 'all'          as Tab, label: 'All Stock',    count: allLoaded ? allVariants.length : null },
            ]).map(({ t, label, count }) => (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: t === 'all' ? '2px solid #c19a6b' : 'none',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeTab === t ? '#c19a6b' : t === 'all' ? 'white' : '#f5f0eb',
                  color:      activeTab === t ? 'white'   : t === 'all' ? '#c19a6b' : '#666',
                }}
              >
                {label}
                {count !== null && (
                  <span style={{
                    marginLeft: 6, padding: '2px 7px',
                    borderRadius: 10, fontSize: 11,
                    background: activeTab === t ? 'rgba(255,255,255,0.25)' : '#e8d5c4',
                    color: activeTab === t ? 'white' : '#c19a6b',
                  }}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search product, variant, SKU, supplier…"
            style={{ padding: '9px 14px', border: '1px solid #e8d5c4', borderRadius: 8, fontSize: 13, minWidth: 260 }}
          />
        </div>

        {/* Table */}
        {activeTab === 'all' && allLoading ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: '#888' }}>
            <div style={{ width: 36, height: 36, border: '3px solid #f0f0f0', borderTop: '3px solid #c19a6b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
            <p style={{ margin: 0, fontSize: 14 }}>Loading all variants…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: '#888' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>
              {activeTab === 'out-of-stock' ? '✅' : activeTab === 'low-stock' ? '📦' : activeTab === 'all' ? '📦' : '🔗'}
            </div>
            <p style={{ margin: 0, fontSize: 15, color: '#555' }}>
              {search ? 'No items match your search.'
                : activeTab === 'out-of-stock' ? 'All items are in stock!'
                : activeTab === 'low-stock'    ? 'No items in low-stock range.'
                : activeTab === 'all'          ? 'No active variants found.'
                : 'Every out-of-stock variant has a supplier assigned.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0ebe5' }}>
                  {['Product / Variant', 'SKU', 'Stock', 'Supplier(s)', 'Last Updated', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#999', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => {
                  const isZero = v.stock_quantity <= 0;
                  return (
                    <tr key={v.variant_id} style={{ borderBottom: '1px solid #f9f6f3' }}>

                      {/* Product / Variant */}
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{v.product_name}</div>
                        {v.variant_name && (
                          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{v.variant_name}</div>
                        )}
                        {v.product_status === 'draft' && (
                          <span style={{ display: 'inline-block', marginTop: 4, padding: '2px 8px', background: '#f3f4f6', color: '#6b7280', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                            DRAFT
                          </span>
                        )}
                      </td>

                      {/* SKU */}
                      <td style={{ padding: '14px 12px', color: '#666', fontFamily: 'monospace', fontSize: 12 }}>
                        {v.sku || <span style={{ color: '#ccc' }}>—</span>}
                      </td>

                      {/* Stock badge */}
                      <td style={{ padding: '14px 12px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: 20,
                          fontWeight: 700,
                          fontSize: 13,
                          background: isZero ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                          color:      isZero ? '#ef4444'             : '#d97706',
                        }}>
                          {isZero ? '0 — OUT' : v.stock_quantity}
                        </span>
                      </td>

                      {/* Suppliers */}
                      <td style={{ padding: '14px 12px', maxWidth: 220 }}>
                        {v.suppliers.length === 0 ? (
                          <span style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(107,114,128,0.1)', color: '#6b7280', fontSize: 12, fontWeight: 600 }}>
                            ⚠ None assigned
                          </span>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {v.suppliers.map(s => (
                              <div key={s.supplier_id} style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                <span style={{ fontWeight: 500, color: '#333' }}>{s.company_name}</span>
                                <span style={{ fontSize: 11, color: s.supplier_stock > 0 ? '#22c55e' : '#ef4444' }}>
                                  ({s.supplier_stock} units)
                                </span>
                                {!s.is_active && (
                                  <span style={{ fontSize: 11, color: '#9ca3af', fontStyle: 'italic' }}>inactive</span>
                                )}
                                <button
                                  onClick={() => openEditStock(v, s)}
                                  title="Edit stock"
                                  style={{
                                    padding: '2px 6px',
                                    fontSize: 11,
                                    background: 'rgba(193,154,107,0.12)',
                                    color: '#c19a6b',
                                    border: '1px solid rgba(193,154,107,0.3)',
                                    borderRadius: 4,
                                    cursor: 'pointer',
                                    lineHeight: 1.4,
                                  }}
                                >
                                  ✏ Edit
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Last updated */}
                      <td style={{ padding: '14px 12px', color: '#888', fontSize: 12, whiteSpace: 'nowrap' }}>
                        {timeAgo(v.last_stock_update)}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {v.suppliers.length === 0 ? (
                            <button
                              onClick={() => router.push('/dashboard/suppliers')}
                              style={btn('white', '#6b7280')}
                            >
                              Assign Supplier
                            </button>
                          ) : (
                            <button
                              onClick={() => openNotify(v)}
                              style={btn('white', isZero ? '#ef4444' : '#f59e0b')}
                            >
                              {isZero ? '🚨 Notify' : '⚠ Notify'}
                            </button>
                          )}
                          <button
                            onClick={() => router.push(`/dashboard/products/${v.product_id}`)}
                            style={btn('#c19a6b', 'rgba(193,154,107,0.1)')}
                          >
                            View Product
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Edit Supplier Stock Modal ── */}
      {editTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 32, maxWidth: 480, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>
              ✏ Edit Stock
            </h2>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
              Override this supplier&apos;s stock count. The variant total will update automatically.
            </p>

            {/* Item + supplier summary */}
            <div style={{ background: '#faf9f7', border: '1px solid #e8d5c4', borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{editTarget.variant.product_name}</div>
              {editTarget.variant.variant_name && (
                <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{editTarget.variant.variant_name}</div>
              )}
              <div style={{ marginTop: 10, display: 'flex', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Supplier</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{editTarget.supplier.company_name}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Current Stock</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: editTarget.supplier.supplier_stock > 0 ? '#22c55e' : '#ef4444' }}>
                    {editTarget.supplier.supplier_stock} units
                  </div>
                </div>
              </div>
            </div>

            {/* New quantity input */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8 }}>
                New stock quantity
              </label>
              <input
                type="number"
                min={0}
                step={1}
                value={editQty}
                onChange={e => setEditQty(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleEditStock()}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8d5c4', borderRadius: 8, fontSize: 15, fontWeight: 600, boxSizing: 'border-box' }}
                autoFocus
              />
            </div>

            {/* Notes */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8 }}>
                Reason / notes <span style={{ fontWeight: 400 }}>(optional)</span>
              </label>
              <textarea
                value={editNote}
                onChange={e => setEditNote(e.target.value)}
                placeholder="e.g. Correcting supplier data entry error."
                rows={2}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8d5c4', borderRadius: 8, fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            {/* Result banner */}
            {editResult && (() => {
              const isError = !editResult.startsWith('✓');
              return (
                <div style={{
                  padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13,
                  background: isError ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
                  color:      isError ? '#dc2626'              : '#15803d',
                }}>
                  {editResult}
                </div>
              );
            })()}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setEditTarget(null)}
                disabled={editLoading}
                style={{ padding: '12px 24px', background: 'white', border: '1px solid #e8d5c4', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#666' }}
              >
                Cancel
              </button>
              <button
                onClick={handleEditStock}
                disabled={editLoading}
                style={{
                  padding: '12px 24px',
                  background: editLoading ? '#e8d5c4' : 'linear-gradient(135deg,#c19a6b,#a67c52)',
                  color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
                  cursor: editLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {editLoading ? 'Saving…' : 'Save Stock'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Notify Supplier Modal ── */}
      {notifyVariant && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 32, maxWidth: 520, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>
              {notifyVariant.stock_quantity <= 0 ? '🚨 Send Restock Request' : '⚠ Send Low-Stock Alert'}
            </h2>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
              An email will be sent to the supplier(s) asking them to update their stock.
            </p>

            {/* Item summary */}
            <div style={{ background: '#faf9f7', border: '1px solid #e8d5c4', borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{notifyVariant.product_name}</div>
              {notifyVariant.variant_name && <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{notifyVariant.variant_name}</div>}
              {notifyVariant.sku && <div style={{ fontSize: 12, color: '#aaa', marginTop: 2, fontFamily: 'monospace' }}>SKU: {notifyVariant.sku}</div>}
              <div style={{ marginTop: 8, fontSize: 13, color: notifyVariant.stock_quantity <= 0 ? '#ef4444' : '#d97706', fontWeight: 600 }}>
                Current stock: {notifyVariant.stock_quantity <= 0 ? 'OUT OF STOCK' : `${notifyVariant.stock_quantity} units`}
              </div>
            </div>

            {/* Supplier selector (only if multiple) */}
            {notifyVariant.suppliers.length > 1 && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8 }}>
                  Notify
                </label>
                <select
                  value={notifySupplier?.supplier_id ?? ''}
                  onChange={e => {
                    const id = e.target.value;
                    setNotifySupplier(id ? notifyVariant.suppliers.find(s => s.supplier_id === Number(id)) ?? null : null);
                  }}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8d5c4', borderRadius: 8, fontSize: 14 }}
                >
                  <option value="">All {notifyVariant.suppliers.length} suppliers</option>
                  {notifyVariant.suppliers.map(s => (
                    <option key={s.supplier_id} value={s.supplier_id}>
                      {s.company_name} ({s.supplier_stock} units) — {s.email}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Admin note */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8 }}>
                Additional note to supplier <span style={{ fontWeight: 400 }}>(optional)</span>
              </label>
              <textarea
                value={adminNote}
                onChange={e => setAdminNote(e.target.value)}
                placeholder="e.g. We need at least 20 units by end of week."
                rows={3}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8d5c4', borderRadius: 8, fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            {/* Result banner */}
            {notifyResult && (() => {
              const isError = notifyResult.toLowerCase().includes('fail') || notifyResult.toLowerCase().includes('error');
              return (
                <div style={{
                  padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13,
                  background: isError ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
                  color:      isError ? '#dc2626'              : '#15803d',
                }}>
                  {notifyResult}
                </div>
              );
            })()}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setNotifyVariant(null)}
                disabled={notifying}
                style={{ padding: '12px 24px', background: 'white', border: '1px solid #e8d5c4', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#666' }}
              >
                Cancel
              </button>
              <button
                onClick={handleNotify}
                disabled={notifying}
                style={{
                  padding: '12px 24px',
                  background: notifying ? '#e8d5c4' : 'linear-gradient(135deg,#c19a6b,#a67c52)',
                  color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
                  cursor: notifying ? 'not-allowed' : 'pointer',
                }}
              >
                {notifying ? 'Sending…' : 'Send Notification'}
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default InventoryPage;
