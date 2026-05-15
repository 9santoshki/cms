'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

interface OptionType {
  id: number;
  name: string;
  display_name: string;
  description?: string;
  display_order: number;
  is_active: boolean;
}

interface VariantOption {
  id: number;
  option_type_id: number;
  value: string;
  display_value: string;
  price_modifier: number;
  display_order: number;
  is_active: boolean;
}

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

export default function VariantDictionaryPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [optionTypes, setOptionTypes] = useState<OptionType[]>([]);
  const [allOptions, setAllOptions] = useState<VariantOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Which type is expanded
  const [expandedTypeId, setExpandedTypeId] = useState<number | null>(null);

  // Global flash
  const [flash, setFlash] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  // ── Add option type form ──
  const [showAddType, setShowAddType] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeDisplay, setNewTypeDisplay] = useState('');
  const [newTypeDesc, setNewTypeDesc] = useState('');
  const [addingType, setAddingType] = useState(false);

  // ── Edit option type inline ──
  const [editTypeId, setEditTypeId] = useState<number | null>(null);
  const [editTypeDisplay, setEditTypeDisplay] = useState('');
  const [editTypeDesc, setEditTypeDesc] = useState('');
  const [savingType, setSavingType] = useState(false);

  // ── Add option (per type) ──
  const [addingOptionTypeId, setAddingOptionTypeId] = useState<number | null>(null);
  const [newOptValue, setNewOptValue] = useState('');
  const [newOptDisplay, setNewOptDisplay] = useState('');
  const [newOptPrice, setNewOptPrice] = useState('0');
  const [newOptOrder, setNewOptOrder] = useState('0');
  const [addingOpt, setAddingOpt] = useState(false);

  // ── Edit option inline ──
  const [editOptId, setEditOptId] = useState<number | null>(null);
  const [editOptDisplay, setEditOptDisplay] = useState('');
  const [editOptPrice, setEditOptPrice] = useState('');
  const [editOptOrder, setEditOptOrder] = useState('');
  const [savingOpt, setSavingOpt] = useState(false);
  const [deletingOptId, setDeletingOptId] = useState<number | null>(null);

  useEffect(() => {
    if (!user) { router.push('/auth?redirect=/dashboard/variants'); return; }
    if (user.role !== 'admin') { router.push('/dashboard'); return; }
    loadAll();
  }, [user]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [typesRes, optsRes] = await Promise.all([
        fetch('/api/admin/variant-option-types'),
        fetch('/api/admin/variant-options'),
      ]);
      const [typesData, optsData] = await Promise.all([typesRes.json(), optsRes.json()]);
      if (typesData.success) setOptionTypes(typesData.data.sort((a: OptionType, b: OptionType) => a.display_order - b.display_order));
      if (optsData.success) setAllOptions(optsData.data);
    } finally {
      setLoading(false);
    }
  };

  const showFlash = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setFlash({ msg, type });
    setTimeout(() => setFlash(null), 3000);
  };

  const optionsFor = (typeId: number) =>
    allOptions.filter(o => o.option_type_id === typeId).sort((a, b) => a.display_order - b.display_order);

  // ─────────────────────────────────────────────────────────────
  // Option Type actions
  // ─────────────────────────────────────────────────────────────

  const handleAddType = async () => {
    if (!newTypeName.trim() || !newTypeDisplay.trim()) {
      showFlash('Name and display name are required.', 'err'); return;
    }
    setAddingType(true);
    try {
      const res = await fetch('/api/admin/variant-option-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTypeName.trim().toLowerCase().replace(/\s+/g, '_'),
          display_name: newTypeDisplay.trim(),
          description: newTypeDesc.trim() || null,
          display_order: optionTypes.length,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFlash(`"${newTypeDisplay}" added!`);
        setNewTypeName(''); setNewTypeDisplay(''); setNewTypeDesc('');
        setShowAddType(false);
        loadAll();
      } else { showFlash(data.error || 'Failed to add type', 'err'); }
    } catch { showFlash('Network error', 'err'); }
    finally { setAddingType(false); }
  };

  const startEditType = (t: OptionType) => {
    setEditTypeId(t.id);
    setEditTypeDisplay(t.display_name);
    setEditTypeDesc(t.description || '');
  };

  const handleSaveType = async (id: number) => {
    setSavingType(true);
    try {
      const res = await fetch('/api/admin/variant-option-types', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, display_name: editTypeDisplay, description: editTypeDesc }),
      });
      const data = await res.json();
      if (data.success) {
        showFlash('Updated!');
        setEditTypeId(null);
        loadAll();
      } else { showFlash(data.error || 'Failed', 'err'); }
    } catch { showFlash('Network error', 'err'); }
    finally { setSavingType(false); }
  };

  const handleToggleType = async (t: OptionType) => {
    await fetch('/api/admin/variant-option-types', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: t.id, is_active: !t.is_active }),
    });
    loadAll();
  };

  // ─────────────────────────────────────────────────────────────
  // Option actions
  // ─────────────────────────────────────────────────────────────

  const handleAddOption = async (typeId: number) => {
    if (!newOptValue.trim() || !newOptDisplay.trim()) {
      showFlash('Value and display label are required.', 'err'); return;
    }
    setAddingOpt(true);
    try {
      const res = await fetch('/api/admin/variant-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          option_type_id: typeId,
          value: newOptValue.trim().toLowerCase().replace(/\s+/g, '_'),
          display_value: newOptDisplay.trim(),
          price_modifier: parseFloat(newOptPrice) || 0,
          display_order: parseInt(newOptOrder, 10) || optionsFor(typeId).length,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFlash(`"${newOptDisplay}" added!`);
        setAddingOptionTypeId(null);
        setNewOptValue(''); setNewOptDisplay(''); setNewOptPrice('0'); setNewOptOrder('0');
        loadAll();
      } else { showFlash(data.error || 'Failed', 'err'); }
    } catch { showFlash('Network error', 'err'); }
    finally { setAddingOpt(false); }
  };

  const startEditOpt = (o: VariantOption) => {
    setEditOptId(o.id);
    setEditOptDisplay(o.display_value);
    setEditOptPrice(o.price_modifier.toString());
    setEditOptOrder(o.display_order.toString());
  };

  const handleSaveOpt = async (id: number) => {
    setSavingOpt(true);
    try {
      const res = await fetch('/api/admin/variant-options', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          display_value: editOptDisplay,
          price_modifier: parseFloat(editOptPrice) || 0,
          display_order: parseInt(editOptOrder, 10) || 0,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFlash('Updated!');
        setEditOptId(null);
        loadAll();
      } else { showFlash(data.error || 'Failed', 'err'); }
    } catch { showFlash('Network error', 'err'); }
    finally { setSavingOpt(false); }
  };

  const handleToggleOpt = async (o: VariantOption) => {
    await fetch('/api/admin/variant-options', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: o.id, is_active: !o.is_active }),
    });
    loadAll();
  };

  const handleDeleteOpt = async (id: number, label: string) => {
    if (!confirm(`Delete option "${label}"? Any variants using it may be affected.`)) return;
    setDeletingOptId(id);
    try {
      const res = await fetch(`/api/admin/variant-options?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { showFlash(`"${label}" deleted.`); loadAll(); }
      else { showFlash(data.error || 'Failed', 'err'); }
    } catch { showFlash('Network error', 'err'); }
    finally { setDeletingOptId(null); }
  };

  // ─────────────────────────────────────────────────────────────

  if (!user || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '3px solid #f0f0f0', borderTop: '3px solid #c19a6b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
          <p style={{ marginTop: 16, color: '#666', fontSize: 14 }}>Loading variant dictionary...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Variant Dictionary"
      description="Manage the global option types (e.g. Thickness, Size) and their values (e.g. Thin, 24×36). These are shared across all products."
    >
      <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>

      {/* Flash */}
      {flash && (
        <div style={{
          background: flash.type === 'ok' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
          border: `1px solid ${flash.type === 'ok' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
          borderRadius: 8, padding: '12px 16px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <i className={flash.type === 'ok' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}
            style={{ color: flash.type === 'ok' ? '#16a34a' : '#ef4444' }}></i>
          <span style={{ fontSize: 13, fontWeight: 600, color: flash.type === 'ok' ? '#16a34a' : '#ef4444' }}>
            {flash.msg}
          </span>
        </div>
      )}

      {/* ── Add Option Type bar ── */}
      <div style={{
        background: 'white', borderRadius: 12, padding: '16px 20px', marginBottom: 20,
        boxShadow: '0 4px 12px rgba(193,154,107,0.08)', border: '1px solid #e8d5c4',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#333' }}>
            {optionTypes.length} option type{optionTypes.length !== 1 ? 's' : ''} defined
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#888' }}>
            Each type appears as a selector on the product page (e.g. Thickness, Size, Color)
          </p>
        </div>
        <button
          onClick={() => { setShowAddType(v => !v); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 18px',
            background: showAddType ? '#f3ede7' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
            color: showAddType ? '#c19a6b' : 'white',
            border: showAddType ? '1px solid #e8d5c4' : 'none',
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <i className={showAddType ? 'fas fa-times' : 'fas fa-plus'}></i>
          {showAddType ? 'Cancel' : 'Add Option Type'}
        </button>
      </div>

      {/* Add type form */}
      {showAddType && (
        <div style={{
          background: 'white', borderRadius: 12, padding: 20, marginBottom: 20,
          border: '1px dashed #d4b896',
          boxShadow: '0 4px 12px rgba(193,154,107,0.06)',
        }}>
          <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#555' }}>
            New Option Type
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Internal Name * <span style={{ fontWeight: 400, color: '#aaa' }}>(slug)</span></label>
              <input
                style={inputStyle} placeholder="e.g. frame_material"
                value={newTypeName}
                onChange={e => setNewTypeName(e.target.value)}
              />
              <p style={{ margin: '3px 0 0', fontSize: 11, color: '#aaa' }}>lowercase, underscores only</p>
            </div>
            <div>
              <label style={labelStyle}>Display Label *</label>
              <input
                style={inputStyle} placeholder="e.g. Frame Material"
                value={newTypeDisplay}
                onChange={e => setNewTypeDisplay(e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <input
                style={inputStyle} placeholder="Optional hint shown to customers"
                value={newTypeDesc}
                onChange={e => setNewTypeDesc(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleAddType} disabled={addingType}
            style={{
              padding: '8px 22px',
              background: addingType ? '#aaa' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white', border: 'none', borderRadius: 8,
              fontSize: 13, fontWeight: 600, cursor: addingType ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            {addingType ? <Spinner /> : <i className="fas fa-plus"></i>}
            Create Option Type
          </button>
        </div>
      )}

      {/* ── Option Types list ── */}
      {optionTypes.length === 0 ? (
        <div style={{
          background: 'white', borderRadius: 12, padding: '48px 24px',
          textAlign: 'center', border: '1px dashed #e8d5c4', color: '#aaa',
        }}>
          <i className="fas fa-tags" style={{ fontSize: 40, marginBottom: 12, display: 'block' }}></i>
          <p style={{ margin: 0, fontSize: 14 }}>No option types yet. Click <strong>Add Option Type</strong> to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {optionTypes.map(type => {
            const opts = optionsFor(type.id);
            const isExpanded = expandedTypeId === type.id;
            const isEditingType = editTypeId === type.id;
            const isAddingOpt = addingOptionTypeId === type.id;

            return (
              <div key={type.id} style={{
                background: 'white', borderRadius: 12,
                boxShadow: '0 4px 12px rgba(193,154,107,0.08)',
                border: isExpanded ? '1px solid #c19a6b' : '1px solid #e8d5c4',
                overflow: 'hidden',
                opacity: type.is_active ? 1 : 0.6,
                transition: 'border-color 0.2s ease',
              }}>
                {/* Type header row */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 20px',
                  cursor: 'pointer',
                  background: isExpanded ? 'rgba(193,154,107,0.04)' : 'white',
                }}
                  onClick={() => {
                    if (isEditingType) return;
                    setExpandedTypeId(isExpanded ? null : type.id);
                    setAddingOptionTypeId(null);
                    setEditOptId(null);
                  }}
                >
                  {/* Chevron */}
                  <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'}`}
                    style={{ fontSize: 12, color: '#c19a6b', width: 14, flexShrink: 0 }}></i>

                  {/* Type info or edit form */}
                  {isEditingType ? (
                    <div style={{ display: 'flex', gap: 10, flex: 1, alignItems: 'flex-end' }}
                      onClick={e => e.stopPropagation()}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Display Label</label>
                        <input style={{ ...inputStyle, padding: '6px 10px' }} value={editTypeDisplay}
                          onChange={e => setEditTypeDisplay(e.target.value)} />
                      </div>
                      <div style={{ flex: 2 }}>
                        <label style={labelStyle}>Description</label>
                        <input style={{ ...inputStyle, padding: '6px 10px' }} value={editTypeDesc}
                          onChange={e => setEditTypeDesc(e.target.value)} placeholder="Optional" />
                      </div>
                      <button onClick={() => handleSaveType(type.id)} disabled={savingType}
                        style={{
                          padding: '6px 16px', background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                          color: 'white', border: 'none', borderRadius: 6, fontSize: 12,
                          fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                          whiteSpace: 'nowrap',
                        }}>
                        {savingType ? <Spinner /> : <i className="fas fa-save"></i>} Save
                      </button>
                      <button onClick={() => setEditTypeId(null)}
                        style={{
                          padding: '6px 12px', background: 'transparent', color: '#888',
                          border: '1px solid #ddd', borderRadius: 6, fontSize: 12,
                          fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                        }}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#333' }}>
                          {type.display_name}
                        </span>
                        <span style={{
                          marginLeft: 10, fontSize: 11, color: '#aaa',
                          fontFamily: 'monospace', background: '#f5f5f5',
                          borderRadius: 4, padding: '1px 6px',
                        }}>
                          {type.name}
                        </span>
                        {type.description && (
                          <span style={{ marginLeft: 10, fontSize: 12, color: '#888' }}>{type.description}</span>
                        )}
                      </div>
                      <span style={{
                        fontSize: 12, color: '#888', marginRight: 4,
                        background: '#f5f5f5', borderRadius: 20, padding: '2px 10px',
                      }}>
                        {opts.length} value{opts.length !== 1 ? 's' : ''}
                      </span>
                    </>
                  )}

                  {/* Actions */}
                  {!isEditingType && (
                    <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                      <SmallBtn icon="fa-edit" title="Edit type name" color="#c19a6b"
                        onClick={() => startEditType(type)} />
                      {/* Active toggle */}
                      <button onClick={() => handleToggleType(type)} title={type.is_active ? 'Deactivate' : 'Activate'}
                        style={{
                          width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                          background: type.is_active ? '#22c55e' : '#d1d5db', position: 'relative',
                          transition: 'background 0.2s', flexShrink: 0,
                        }}>
                        <span style={{
                          position: 'absolute', top: 3,
                          left: type.is_active ? 22 : 3,
                          width: 18, height: 18, borderRadius: '50%', background: 'white',
                          transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Expanded: options list */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid #f0ebe5', padding: '16px 20px' }}>

                    {/* Options table */}
                    {opts.length === 0 ? (
                      <p style={{ color: '#aaa', fontSize: 13, margin: '0 0 16px' }}>
                        No values yet. Add the first one below.
                      </p>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 16 }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #f0ebe5' }}>
                            {['Display Label', 'Internal Value', 'Price Modifier', 'Order', 'Active', ''].map(h => (
                              <th key={h} style={{
                                padding: '6px 10px', textAlign: 'left',
                                fontSize: 11, fontWeight: 700, color: '#aaa',
                                textTransform: 'uppercase', letterSpacing: '0.5px',
                              }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {opts.map(opt => (
                            <React.Fragment key={opt.id}>
                              <tr style={{
                                borderBottom: editOptId === opt.id ? 'none' : '1px solid #faf7f4',
                                opacity: opt.is_active ? 1 : 0.5,
                              }}>
                                <td style={{ padding: '8px 10px', fontWeight: 600, color: '#333' }}>
                                  {editOptId === opt.id ? (
                                    <input style={{ ...inputStyle, padding: '5px 8px' }}
                                      value={editOptDisplay}
                                      onChange={e => setEditOptDisplay(e.target.value)} />
                                  ) : opt.display_value}
                                </td>
                                <td style={{ padding: '8px 10px', fontFamily: 'monospace', color: '#888', fontSize: 12 }}>
                                  {opt.value}
                                </td>
                                <td style={{ padding: '8px 10px' }}>
                                  {editOptId === opt.id ? (
                                    <input type="number" step="0.01"
                                      style={{ ...inputStyle, padding: '5px 8px', width: 90 }}
                                      value={editOptPrice}
                                      onChange={e => setEditOptPrice(e.target.value)} />
                                  ) : (
                                    <span style={{ color: opt.price_modifier > 0 ? '#e74c3c' : '#aaa' }}>
                                      {opt.price_modifier > 0 ? `+₹${opt.price_modifier}` : '—'}
                                    </span>
                                  )}
                                </td>
                                <td style={{ padding: '8px 10px' }}>
                                  {editOptId === opt.id ? (
                                    <input type="number" min="0"
                                      style={{ ...inputStyle, padding: '5px 8px', width: 70 }}
                                      value={editOptOrder}
                                      onChange={e => setEditOptOrder(e.target.value)} />
                                  ) : (
                                    <span style={{ color: '#aaa' }}>{opt.display_order}</span>
                                  )}
                                </td>
                                <td style={{ padding: '8px 10px' }}>
                                  <button onClick={() => handleToggleOpt(opt)}
                                    style={{
                                      width: 36, height: 20, borderRadius: 10, border: 'none',
                                      cursor: 'pointer', background: opt.is_active ? '#22c55e' : '#d1d5db',
                                      position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                                    }}>
                                    <span style={{
                                      position: 'absolute', top: 2,
                                      left: opt.is_active ? 18 : 2,
                                      width: 16, height: 16, borderRadius: '50%', background: 'white',
                                      transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                    }} />
                                  </button>
                                </td>
                                <td style={{ padding: '8px 10px' }}>
                                  <div style={{ display: 'flex', gap: 4 }}>
                                    {editOptId === opt.id ? (
                                      <>
                                        <button onClick={() => handleSaveOpt(opt.id)} disabled={savingOpt}
                                          style={{
                                            padding: '4px 12px', background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                                            color: 'white', border: 'none', borderRadius: 6,
                                            fontSize: 11, fontWeight: 600, cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: 4,
                                          }}>
                                          {savingOpt ? <Spinner size={10} /> : <i className="fas fa-save"></i>} Save
                                        </button>
                                        <button onClick={() => setEditOptId(null)}
                                          style={{
                                            padding: '4px 10px', background: 'transparent', color: '#888',
                                            border: '1px solid #ddd', borderRadius: 6, fontSize: 11,
                                            fontWeight: 600, cursor: 'pointer',
                                          }}>Cancel</button>
                                      </>
                                    ) : (
                                      <>
                                        <SmallBtn icon="fa-edit" title="Edit" color="#c19a6b"
                                          onClick={() => startEditOpt(opt)} />
                                        <SmallBtn icon="fa-trash" title="Delete" color="#ef4444"
                                          onClick={() => handleDeleteOpt(opt.id, opt.display_value)}
                                          loading={deletingOptId === opt.id} />
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {/* Add option row */}
                    {isAddingOpt ? (
                      <div style={{
                        background: 'rgba(193,154,107,0.04)', border: '1px dashed #d4b896',
                        borderRadius: 8, padding: 14,
                      }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
                          <div>
                            <label style={labelStyle}>Display Label *</label>
                            <input style={inputStyle} placeholder={`e.g. ${type.display_name} value`}
                              value={newOptDisplay} onChange={e => setNewOptDisplay(e.target.value)} />
                          </div>
                          <div>
                            <label style={labelStyle}>Internal Value * <span style={{ fontWeight: 400, color: '#aaa' }}>(slug)</span></label>
                            <input style={inputStyle} placeholder="lowercase_slug"
                              value={newOptValue} onChange={e => setNewOptValue(e.target.value)} />
                          </div>
                          <div>
                            <label style={labelStyle}>Price Modifier (₹)</label>
                            <input type="number" step="0.01" style={inputStyle}
                              value={newOptPrice} onChange={e => setNewOptPrice(e.target.value)} />
                          </div>
                          <div>
                            <label style={labelStyle}>Sort Order</label>
                            <input type="number" min="0" style={inputStyle}
                              value={newOptOrder} onChange={e => setNewOptOrder(e.target.value)} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => handleAddOption(type.id)} disabled={addingOpt}
                            style={{
                              padding: '7px 18px',
                              background: addingOpt ? '#aaa' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
                              color: 'white', border: 'none', borderRadius: 7,
                              fontSize: 12, fontWeight: 600, cursor: addingOpt ? 'not-allowed' : 'pointer',
                              display: 'flex', alignItems: 'center', gap: 6,
                            }}>
                            {addingOpt ? <Spinner /> : <i className="fas fa-plus"></i>} Add Value
                          </button>
                          <button onClick={() => { setAddingOptionTypeId(null); setNewOptValue(''); setNewOptDisplay(''); setNewOptPrice('0'); setNewOptOrder('0'); }}
                            style={{
                              padding: '7px 14px', background: 'transparent', color: '#888',
                              border: '1px solid #ddd', borderRadius: 7, fontSize: 12,
                              fontWeight: 600, cursor: 'pointer',
                            }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setAddingOptionTypeId(type.id); setEditOptId(null); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          padding: '7px 16px', background: 'transparent',
                          color: '#c19a6b', border: '1px dashed #c19a6b',
                          borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        }}>
                        <i className="fas fa-plus"></i>
                        Add Value to {type.display_name}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}

function SmallBtn({ icon, title, color, onClick, loading = false }: {
  icon: string; title: string; color: string;
  onClick: () => void; loading?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={loading} title={title} style={{
      width: 28, height: 28, borderRadius: 6, border: `1px solid #e8d5c4`,
      background: 'white', color, cursor: loading ? 'wait' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, transition: 'all 0.15s ease', flexShrink: 0,
    }}>
      {loading ? <Spinner size={10} /> : <i className={`fas ${icon}`}></i>}
    </button>
  );
}

function Spinner({ size = 12 }: { size?: number }) {
  return (
    <span style={{
      display: 'inline-block', width: size, height: size,
      border: '2px solid rgba(255,255,255,0.35)',
      borderTop: '2px solid currentColor',
      borderRadius: '50%', animation: 'spin 0.7s linear infinite', flexShrink: 0,
    }} />
  );
}
