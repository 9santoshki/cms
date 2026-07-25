'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import type { HsnGstRate } from '@/lib/gst-constants';
import { VALID_GST_RATES } from '@/lib/gst-constants';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #e8d5c4',
  borderRadius: '8px',
  fontSize: '13px',
  outline: 'none',
  background: 'white',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: '#666',
  marginBottom: '4px',
};

const cardStyle: React.CSSProperties = {
  background: 'white',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '12px',
  boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
  border: '1px solid #e8d5c4',
};

const btnPrimary: React.CSSProperties = {
  padding: '8px 16px',
  background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
};

const btnSecondary: React.CSSProperties = {
  padding: '8px 14px',
  background: 'white',
  color: '#666',
  border: '1px solid #e8d5c4',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
};

const btnDanger: React.CSSProperties = {
  padding: '6px 10px',
  background: 'white',
  color: '#dc2626',
  border: '1px solid #fca5a5',
  borderRadius: '6px',
  fontSize: '12px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
};

// Static — defined once at module scope, not rebuilt on every GstBadge render
const GST_BADGE_COLORS: Record<number, { bg: string; color: string }> = {
  0:    { bg: '#f0f9ff', color: '#0369a1' },
  0.25: { bg: '#fefce8', color: '#854d0e' },
  3:    { bg: '#f0fdf4', color: '#15803d' },
  5:    { bg: '#fef3c7', color: '#92400e' },
  12:   { bg: '#fff7ed', color: '#c2410c' },
  18:   { bg: '#fdf4ff', color: '#7e22ce' },
  28:   { bg: '#fef2f2', color: '#991b1b' },
};

function GstBadge({ rate }: { rate: number }) {
  const c = GST_BADGE_COLORS[rate] ?? { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: '700',
      background: c.bg,
      color: c.color,
      whiteSpace: 'nowrap',
    }}>
      {rate}%
    </span>
  );
}

export default function HsnGstPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [rows, setRows] = useState<HsnGstRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  // Search / filter
  const [search, setSearch] = useState('');
  const [filterRate, setFilterRate] = useState<string>('');

  // Add form
  const [showAdd, setShowAdd] = useState(false);
  const [addCode, setAddCode] = useState('');
  const [addRate, setAddRate] = useState<string>('18');
  const [addDesc, setAddDesc] = useState('');
  const [adding, setAdding] = useState(false);

  // Edit state
  const [editId, setEditId] = useState<number | null>(null);
  const [editCode, setEditCode] = useState('');
  const [editRate, setEditRate] = useState<string>('18');
  const [editDesc, setEditDesc] = useState('');
  const [editActive, setEditActive] = useState(true);
  const [saving, setSaving] = useState(false);

  // Delete confirm
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  function showFlash(msg: string, type: 'ok' | 'err') {
    setFlash({ msg, type });
    setTimeout(() => setFlash(null), 3500);
  }

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (filterRate) params.set('rate', filterRate);
      const res = await fetch(`/api/admin/hsn-gst?${params}`);
      const json = await res.json();
      if (json.success) setRows(json.data);
      else showFlash(json.error || 'Failed to load', 'err');
    } catch {
      showFlash('Network error', 'err');
    } finally {
      setLoading(false);
    }
  }

  // Guard so the debounce effect skips the initial mount (auth effect handles
  // the first fetch, preventing a double request on page load).
  const filterEffectMounted = useRef(false);

  // Auth check + initial data load
  useEffect(() => {
    if (!user) { router.push('/auth?redirect=/dashboard/settings/hsn-gst'); return; }
    if (user.role !== 'admin') { router.push('/dashboard'); return; }
    load();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-fetch when filters change (debounced), skipping the initial render
  useEffect(() => {
    if (!filterEffectMounted.current) { filterEffectMounted.current = true; return; }
    if (!user || user.role !== 'admin') return;
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [search, filterRate]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await fetch('/api/admin/hsn-gst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hsn_code: addCode, gst_rate: parseFloat(addRate), description: addDesc }),
      });
      const json = await res.json();
      if (json.success) {
        setRows(prev => [...prev, json.data].sort((a, b) => a.hsn_code.localeCompare(b.hsn_code)));
        setShowAdd(false);
        setAddCode(''); setAddDesc(''); setAddRate('18');
        showFlash('HSN code added', 'ok');
      } else {
        showFlash(json.error || 'Failed to add', 'err');
      }
    } catch {
      showFlash('Network error', 'err');
    } finally {
      setAdding(false);
    }
  }

  function startEdit(row: HsnGstRate) {
    setEditId(row.id);
    setEditCode(row.hsn_code);
    setEditRate(String(row.gst_rate));
    setEditDesc(row.description || '');
    setEditActive(row.is_active);
  }

  function cancelEdit() {
    setEditId(null);
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/hsn-gst/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hsn_code: editCode,
          gst_rate: parseFloat(editRate),
          description: editDesc,
          is_active: editActive,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setRows(prev =>
          prev.map(r => r.id === editId ? json.data : r)
            .sort((a, b) => a.hsn_code.localeCompare(b.hsn_code))
        );
        setEditId(null);
        showFlash('Saved', 'ok');
      } else {
        showFlash(json.error || 'Failed to save', 'err');
      }
    } catch {
      showFlash('Network error', 'err');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/hsn-gst/${deleteId}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setRows(prev => prev.filter(r => r.id !== deleteId));
        setDeleteId(null);
        showFlash('Deleted', 'ok');
      } else {
        showFlash(json.error || 'Failed to delete', 'err');
      }
    } catch {
      showFlash('Network error', 'err');
    } finally {
      setDeleting(false);
    }
  }

  async function toggleActive(row: HsnGstRate) {
    try {
      const res = await fetch(`/api/admin/hsn-gst/${row.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !row.is_active }),
      });
      const json = await res.json();
      if (json.success) {
        setRows(prev => prev.map(r => r.id === row.id ? json.data : r));
      } else {
        showFlash(json.error || 'Failed', 'err');
      }
    } catch {
      showFlash('Network error', 'err');
    }
  }

  if (!user || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid #f0f0f0', borderTop: '3px solid #c19a6b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .hsn-table { width: 100%; border-collapse: collapse; }
        .hsn-table th { background: #fdf8f4; border-bottom: 2px solid #e8d5c4; padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: .05em; white-space: nowrap; }
        .hsn-table td { border-bottom: 1px solid #f0e8e0; padding: 11px 12px; font-size: 13px; vertical-align: middle; }
        .hsn-table tbody tr:hover { background: #fdf8f4; }
        .hsn-code-mono { font-family: monospace; font-size: 13px; font-weight: 600; color: #333; letter-spacing: .04em; }

        /* Mobile: hide table, show cards */
        @media (max-width: 640px) {
          .hsn-desktop-table { display: none !important; }
          .hsn-mobile-cards { display: block !important; }
          .hsn-toolbar { flex-direction: column !important; align-items: stretch !important; }
          .hsn-toolbar-search { width: 100% !important; }
          .hsn-add-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) {
          .hsn-mobile-cards { display: none !important; }
        }
      `}</style>

      <DashboardLayout
        title="HSN–GST Rate Mapping"
        description="Map Harmonized System of Nomenclature (HSN) codes to Indian GST rates for invoicing."
      >
        {/* Flash */}
        {flash && (
          <div style={{
            background: flash.type === 'ok' ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)',
            border: `1px solid ${flash.type === 'ok' ? 'rgba(34,197,94,.3)' : 'rgba(239,68,68,.3)'}`,
            borderRadius: '8px', padding: '11px 16px', marginBottom: '12px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <i className={`fas ${flash.type === 'ok' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}
              style={{ color: flash.type === 'ok' ? '#16a34a' : '#dc2626', fontSize: '15px' }} />
            <span style={{ color: flash.type === 'ok' ? '#16a34a' : '#dc2626', fontSize: '13px', fontWeight: '600' }}>
              {flash.msg}
            </span>
          </div>
        )}

        {/* Toolbar */}
        <div className="hsn-toolbar" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <div className="hsn-toolbar-search" style={{ flex: 1, minWidth: '180px', position: 'relative' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#bbb', fontSize: '13px' }} />
            <input
              type="text"
              placeholder="Search HSN code or description…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '32px' }}
            />
          </div>

          <select
            value={filterRate}
            onChange={e => setFilterRate(e.target.value)}
            style={{ ...inputStyle, width: 'auto', minWidth: '130px', cursor: 'pointer' }}
          >
            <option value="">All GST Rates</option>
            {VALID_GST_RATES.map(r => (
              <option key={r} value={r}>{r}%</option>
            ))}
          </select>

          <button
            style={btnPrimary}
            onClick={() => { setShowAdd(v => !v); setEditId(null); }}
          >
            <i className={`fas ${showAdd ? 'fa-times' : 'fa-plus'}`} />
            {showAdd ? 'Cancel' : 'Add HSN Code'}
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <i className="fas fa-plus-circle" style={{ color: '#c19a6b', fontSize: '15px' }} />
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: 0 }}>Add New HSN Code</h3>
            </div>
            <form onSubmit={handleAdd}>
              <div className="hsn-add-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={labelStyle}>HSN Code <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. 57050090"
                    value={addCode}
                    onChange={e => setAddCode(e.target.value)}
                    maxLength={8}
                    required
                    style={inputStyle}
                  />
                  <p style={{ fontSize: '11px', color: '#aaa', margin: '3px 0 0' }}>4–8 digit numeric code</p>
                </div>
                <div>
                  <label style={labelStyle}>GST Rate <span style={{ color: '#dc2626' }}>*</span></label>
                  <select
                    value={addRate}
                    onChange={e => setAddRate(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    required
                  >
                    {VALID_GST_RATES.map(r => (
                      <option key={r} value={r}>{r}%</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Carpets and other textile floor coverings"
                    value={addDesc}
                    onChange={e => setAddDesc(e.target.value)}
                    maxLength={500}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" disabled={adding} style={{ ...btnPrimary, opacity: adding ? .7 : 1 }}>
                  {adding ? <><i className="fas fa-spinner fa-spin" /> Saving…</> : <><i className="fas fa-save" /> Save</>}
                </button>
                <button type="button" style={btnSecondary} onClick={() => setShowAdd(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Delete confirm */}
        {deleteId && (
          <div style={{ ...cardStyle, border: '1px solid #fca5a5', background: '#fff5f5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-exclamation-triangle" style={{ color: '#dc2626', fontSize: '16px' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#333', margin: '0 0 2px' }}>Delete this HSN code?</p>
                <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>This cannot be undone.</p>
              </div>
              <button style={btnSecondary} onClick={() => setDeleteId(null)}>Cancel</button>
              <button
                disabled={deleting}
                onClick={handleDelete}
                style={{ ...btnPrimary, background: '#dc2626', opacity: deleting ? .7 : 1 }}
              >
                {deleting ? <><i className="fas fa-spinner fa-spin" /> Deleting…</> : <><i className="fas fa-trash" /> Delete</>}
              </button>
            </div>
          </div>
        )}

        {/* Main table */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-list" style={{ color: '#c19a6b', fontSize: '14px' }} />
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: 0 }}>
                HSN Codes
              </h3>
              <span style={{ fontSize: '12px', color: '#aaa', background: '#f3f4f6', borderRadius: '999px', padding: '1px 8px' }}>
                {rows.length}
              </span>
            </div>
            <button style={{ ...btnSecondary, fontSize: '12px', padding: '5px 10px' }} onClick={load}>
              <i className="fas fa-sync-alt" /> Refresh
            </button>
          </div>

          {rows.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#bbb' }}>
              <i className="fas fa-tags" style={{ fontSize: '32px', marginBottom: '10px', display: 'block' }} />
              <p style={{ fontSize: '14px', margin: 0 }}>
                {search || filterRate ? 'No results found' : 'No HSN codes added yet'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hsn-desktop-table" style={{ overflowX: 'auto' }}>
                <table className="hsn-table">
                  <thead>
                    <tr>
                      <th>HSN Code</th>
                      <th>Description</th>
                      <th style={{ textAlign: 'center' }}>GST Rate</th>
                      <th style={{ textAlign: 'center' }}>CGST/SGST</th>
                      <th style={{ textAlign: 'center' }}>IGST</th>
                      <th style={{ textAlign: 'center' }}>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(row => (
                      <React.Fragment key={row.id}>
                        {editId === row.id ? (
                          <tr style={{ background: '#fdf8f4' }}>
                            <td colSpan={7} style={{ padding: '12px' }}>
                              <form onSubmit={handleSaveEdit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '120px 130px 1fr auto auto', gap: '10px', alignItems: 'end' }}>
                                  <div>
                                    <label style={labelStyle}>HSN Code</label>
                                    <input value={editCode} onChange={e => setEditCode(e.target.value)} maxLength={8} required style={inputStyle} />
                                  </div>
                                  <div>
                                    <label style={labelStyle}>GST Rate</label>
                                    <select value={editRate} onChange={e => setEditRate(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                      {VALID_GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                                    </select>
                                  </div>
                                  <div>
                                    <label style={labelStyle}>Description</label>
                                    <input value={editDesc} onChange={e => setEditDesc(e.target.value)} maxLength={500} style={inputStyle} />
                                  </div>
                                  <div>
                                    <label style={labelStyle}>Active</label>
                                    <input
                                      type="checkbox"
                                      checked={editActive}
                                      onChange={e => setEditActive(e.target.checked)}
                                      style={{ width: '18px', height: '18px', accentColor: '#c19a6b', cursor: 'pointer', marginTop: '6px' }}
                                    />
                                  </div>
                                  <div style={{ display: 'flex', gap: '6px' }}>
                                    <button type="submit" disabled={saving} style={{ ...btnPrimary, opacity: saving ? .7 : 1 }}>
                                      {saving ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-check" />}
                                    </button>
                                    <button type="button" style={btnSecondary} onClick={cancelEdit}>
                                      <i className="fas fa-times" />
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td><span className="hsn-code-mono">{row.hsn_code}</span></td>
                            <td style={{ color: row.description ? '#444' : '#bbb', maxWidth: '260px' }}>
                              {row.description || <em>—</em>}
                            </td>
                            <td style={{ textAlign: 'center' }}><GstBadge rate={row.gst_rate} /></td>
                            <td style={{ textAlign: 'center', color: '#666', fontSize: '12px' }}>
                              {row.gst_rate > 0 ? `${row.gst_rate / 2}% + ${row.gst_rate / 2}%` : '—'}
                            </td>
                            <td style={{ textAlign: 'center', color: '#666', fontSize: '12px' }}>
                              {row.gst_rate > 0 ? `${row.gst_rate}%` : '—'}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button
                                title={row.is_active ? 'Click to deactivate' : 'Click to activate'}
                                onClick={() => toggleActive(row)}
                                style={{
                                  background: row.is_active ? 'rgba(34,197,94,.1)' : 'rgba(156,163,175,.1)',
                                  color: row.is_active ? '#16a34a' : '#9ca3af',
                                  border: `1px solid ${row.is_active ? 'rgba(34,197,94,.3)' : 'rgba(156,163,175,.3)'}`,
                                  borderRadius: '999px', padding: '2px 10px', fontSize: '11px', fontWeight: '700',
                                  cursor: 'pointer', whiteSpace: 'nowrap',
                                }}
                              >
                                {row.is_active ? 'Active' : 'Inactive'}
                              </button>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                <button style={btnSecondary} onClick={() => startEdit(row)} title="Edit">
                                  <i className="fas fa-pencil-alt" style={{ fontSize: '12px' }} />
                                </button>
                                <button style={btnDanger} onClick={() => setDeleteId(row.id)} title="Delete">
                                  <i className="fas fa-trash" style={{ fontSize: '12px' }} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="hsn-mobile-cards">
                {rows.map(row => (
                  <div key={row.id} style={{
                    border: '1px solid #e8d5c4',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '8px',
                    background: editId === row.id ? '#fdf8f4' : 'white',
                  }}>
                    {editId === row.id ? (
                      <form onSubmit={handleSaveEdit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                          <div>
                            <label style={labelStyle}>HSN Code</label>
                            <input value={editCode} onChange={e => setEditCode(e.target.value)} maxLength={8} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>GST Rate</label>
                            <select value={editRate} onChange={e => setEditRate(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                              {VALID_GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                            </select>
                          </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                          <label style={labelStyle}>Description</label>
                          <input value={editDesc} onChange={e => setEditDesc(e.target.value)} maxLength={500} style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                          <input
                            type="checkbox" checked={editActive}
                            onChange={e => setEditActive(e.target.checked)}
                            style={{ width: '16px', height: '16px', accentColor: '#c19a6b', cursor: 'pointer' }}
                          />
                          <label style={{ fontSize: '13px', color: '#555', cursor: 'pointer' }}>Active</label>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button type="submit" disabled={saving} style={{ ...btnPrimary, flex: 1, justifyContent: 'center', opacity: saving ? .7 : 1 }}>
                            {saving ? <><i className="fas fa-spinner fa-spin" /> Saving…</> : <><i className="fas fa-check" /> Save</>}
                          </button>
                          <button type="button" style={btnSecondary} onClick={cancelEdit}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                          <span className="hsn-code-mono" style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '700', color: '#333' }}>
                            {row.hsn_code}
                          </span>
                          <GstBadge rate={row.gst_rate} />
                        </div>
                        {row.description && (
                          <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px', lineHeight: 1.4 }}>{row.description}</p>
                        )}
                        <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#888', marginBottom: '10px', flexWrap: 'wrap' }}>
                          {row.gst_rate > 0 && (
                            <>
                              <span>CGST {row.gst_rate / 2}% + SGST {row.gst_rate / 2}%</span>
                              <span>·</span>
                              <span>IGST {row.gst_rate}%</span>
                            </>
                          )}
                          <button
                            onClick={() => toggleActive(row)}
                            style={{
                              background: row.is_active ? 'rgba(34,197,94,.1)' : 'rgba(156,163,175,.1)',
                              color: row.is_active ? '#16a34a' : '#9ca3af',
                              border: `1px solid ${row.is_active ? 'rgba(34,197,94,.3)' : 'rgba(156,163,175,.3)'}`,
                              borderRadius: '999px', padding: '1px 8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer',
                            }}
                          >
                            {row.is_active ? 'Active' : 'Inactive'}
                          </button>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={{ ...btnSecondary, flex: 1, justifyContent: 'center' }} onClick={() => startEdit(row)}>
                            <i className="fas fa-pencil-alt" /> Edit
                          </button>
                          <button style={{ ...btnDanger, flex: 1, justifyContent: 'center', border: '1px solid #fca5a5' }} onClick={() => setDeleteId(row.id)}>
                            <i className="fas fa-trash" /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info panel */}
        <div style={{ ...cardStyle, background: '#fdf8f4' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <i className="fas fa-info-circle" style={{ color: '#c19a6b', fontSize: '15px', marginTop: '2px' }} />
            <div>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#333', margin: '0 0 6px' }}>About HSN Codes &amp; GST Rates</p>
              <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.6, margin: '0 0 6px' }}>
                HSN codes are assigned per product variant and appear on GST invoices.
                Intra-state sales split the rate equally into CGST + SGST; inter-state sales use a single IGST at the full rate.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {VALID_GST_RATES.map(r => (
                  <span key={r} style={{ fontSize: '11px', background: 'white', border: '1px solid #e8d5c4', borderRadius: '4px', padding: '2px 8px', color: '#555' }}>
                    {r}%
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
