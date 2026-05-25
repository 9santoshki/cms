'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface VariantOptionType {
  id: number;
  name: string;
  display_name: string;
  is_active: boolean;
  display_order: number;
}

interface VariantOption {
  id: number;
  option_type_id: number;
  value: string;
  display_value: string;
  price_modifier: number;
  is_active: boolean;
  display_order: number;
}

interface ProductVariant {
  id: number;
  product_id: number;
  sku?: string;
  price: number;
  sale_price?: number;
  stock_quantity: number;
  is_active: boolean;
  variant_name?: string;
  options?: VariantOption[];
}

interface SupplierSummary {
  id: number;
  company_name: string;
}

interface Props {
  productId: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
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

export default function ProductVariantManager({ productId }: Props) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [optionTypes, setOptionTypes] = useState<VariantOptionType[]>([]);
  const [allOptions, setAllOptions] = useState<VariantOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Add form
  const [showAddForm, setShowAddForm] = useState(false);
  const [addSelections, setAddSelections] = useState<Record<number, number>>({});
  const [addPrice, setAddPrice] = useState('');
  const [addSalePrice, setAddSalePrice] = useState('');
  const [addSku, setAddSku] = useState('');
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Inline edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editSku, setEditSku] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editSalePrice, setEditSalePrice] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Supplier assignment — a variant can have multiple suppliers
  const [suppliers, setSuppliers] = useState<SupplierSummary[]>([]);
  const [variantSupplierMap, setVariantSupplierMap] = useState<Record<number, Array<{ supplier_id: number; company_name: string; stock_quantity: number }>>>({});
  const [assignSelections, setAssignSelections] = useState<Record<number, number>>({});
  const [assigningId, setAssigningId] = useState<number | null>(null);
  // key = `${variantId}-${supplierId}` to track individual chip removal
  const [unassigningKey, setUnassigningKey] = useState<string | null>(null);

  // Full initial load — fetches reference data (option types, options, suppliers) + product-specific data.
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [varRes, typesRes, optsRes, suppRes, assignRes] = await Promise.all([
        fetch(`/api/admin/product-variants?product_id=${productId}`),
        fetch('/api/admin/variant-option-types'),
        fetch('/api/admin/variant-options'),
        fetch('/api/admin/suppliers'),
        fetch(`/api/admin/supplier-variants?product_id=${productId}`),
      ]);
      const [varData, typesData, optsData, suppData, assignData] = await Promise.all([
        varRes.json(),
        typesRes.json(),
        optsRes.json(),
        suppRes.json(),
        assignRes.json(),
      ]);

      if (varData.success) setVariants(varData.data);
      if (typesData.success)
        setOptionTypes(
          (typesData.data as VariantOptionType[])
            .filter((t) => t.is_active)
            .sort((a, b) => a.display_order - b.display_order)
        );
      if (optsData.success)
        setAllOptions(
          (optsData.data as VariantOption[]).filter((o) => o.is_active)
        );
      if (suppData.success)
        setSuppliers(
          (suppData.data as Array<{ id: number; company_name: string; is_active: boolean }>)
            .filter((s) => s.is_active)
            .map((s) => ({ id: s.id, company_name: s.company_name }))
        );
      if (assignData.success)
        setVariantSupplierMap(assignData.data as Record<number, Array<{ supplier_id: number; company_name: string; stock_quantity: number }>>);
    } catch {
      setError('Failed to load variant data');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  // Lightweight post-mutation refresh — only re-fetches the two product-specific endpoints
  // (variants and supplier assignments). Reference data doesn't change during mutations.
  const loadVariantsOnly = useCallback(async () => {
    try {
      const [varRes, assignRes] = await Promise.all([
        fetch(`/api/admin/product-variants?product_id=${productId}`),
        fetch(`/api/admin/supplier-variants?product_id=${productId}`),
      ]);
      const [varData, assignData] = await Promise.all([varRes.json(), assignRes.json()]);
      if (varData.success) setVariants(varData.data);
      if (assignData.success)
        setVariantSupplierMap(assignData.data as Record<number, Array<{ supplier_id: number; company_name: string; stock_quantity: number }>>);
    } catch {
      setError('Failed to refresh variants');
    }
  }, [productId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const optionsForType = (typeId: number) =>
    allOptions
      .filter((o) => o.option_type_id === typeId)
      .sort((a, b) => a.display_order - b.display_order);

  const flash = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // ── Add variant ──────────────────────────────────────────────
  const handleAdd = async () => {
    setAddError(null);

    const selectedOptionIds = Object.values(addSelections);
    // Allow partial dimensions - user can select any combination of options
    // At least one option is required to define the variant
    if (selectedOptionIds.length === 0) {
      setAddError('Please select at least one option to define the variant.');
      return;
    }
    if (!addPrice || parseFloat(addPrice) <= 0) {
      setAddError('Price is required.');
      return;
    }

    setAdding(true);
    try {
      const res = await fetch('/api/admin/product-variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: parseInt(productId, 10),
          price: parseFloat(addPrice),
          sale_price: addSalePrice ? parseFloat(addSalePrice) : null,
          sku: addSku || null,
          stock_quantity: 0,
          option_ids: selectedOptionIds,
        }),
      });
      const data = await res.json();
      if (data.success) {
        flash('Variant added successfully!');
        setShowAddForm(false);
        setAddSelections({});
        setAddPrice('');
        setAddSalePrice('');
        setAddSku('');
        loadVariantsOnly();
      } else {
        setAddError(data.error || 'Failed to add variant');
      }
    } catch {
      setAddError('Network error. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  // ── Start editing a variant ───────────────────────────────────
  const startEdit = (v: ProductVariant) => {
    setEditingId(v.id);
    setEditSku(v.sku || '');
    setEditPrice(v.price.toString());
    setEditSalePrice(v.sale_price?.toString() || '');
  };

  const cancelEdit = () => setEditingId(null);

  // ── Save edit ─────────────────────────────────────────────────
  const handleSaveEdit = async (id: number) => {
    setSavingEdit(true);
    try {
      const res = await fetch('/api/admin/product-variants', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          sku: editSku || null,
          price: parseFloat(editPrice),
          sale_price: editSalePrice ? parseFloat(editSalePrice) : null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        flash('Variant updated!');
        setEditingId(null);
        loadVariantsOnly();
      } else {
        setError(data.error || 'Failed to update variant');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSavingEdit(false);
    }
  };

  // ── Toggle active ─────────────────────────────────────────────
  const handleToggleActive = async (v: ProductVariant) => {
    try {
      const res = await fetch('/api/admin/product-variants', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: v.id, is_active: !v.is_active }),
      });
      const data = await res.json();
      if (data.success) {
        setVariants((prev) => prev.map((x) => (x.id === v.id ? { ...x, is_active: !v.is_active } : x)));
      } else {
        setError(data.error || 'Failed to toggle variant status');
      }
    } catch {
      setError('Network error. Please try again.');
    }
  };

  // ── Delete ────────────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    if (!confirm('Delete this variant? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/product-variants?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        flash('Variant deleted.');
        loadVariantsOnly();
      } else {
        setError(data.error || 'Failed to delete variant');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // ── Assign supplier to variant ────────────────────────────────
  const handleAssignSupplier = async (variantId: number) => {
    const supplierId = assignSelections[variantId];
    if (!supplierId) return;
    setAssigningId(variantId);
    try {
      const res = await fetch('/api/admin/supplier-variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplier_id: supplierId, variant_id: variantId }),
      });
      const data = await res.json();
      if (data.success) {
        const supplier = suppliers.find((s) => s.id === supplierId);
        setVariantSupplierMap((prev) => ({
          ...prev,
          [variantId]: [...(prev[variantId] ?? []), { supplier_id: supplierId, company_name: supplier?.company_name ?? '', stock_quantity: 0 }],
        }));
        setAssignSelections((prev) => { const next = { ...prev }; delete next[variantId]; return next; });
        flash('Supplier assigned!');
      } else {
        setError(data.error || 'Failed to assign supplier');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setAssigningId(null);
    }
  };

  // ── Unassign a specific supplier from a variant ───────────────
  const handleUnassignSupplier = async (variantId: number, supplierId: number) => {
    if (!confirm('Remove this supplier? They will no longer be able to manage stock for this variant.')) return;
    const key = `${variantId}-${supplierId}`;
    setUnassigningKey(key);
    try {
      const res = await fetch(
        `/api/admin/supplier-variants?supplier_id=${supplierId}&variant_id=${variantId}`,
        { method: 'DELETE' }
      );
      const data = await res.json();
      if (data.success) {
        setVariantSupplierMap((prev) => {
          const filtered = (prev[variantId] ?? []).filter((s) => s.supplier_id !== supplierId);
          const next = { ...prev };
          if (filtered.length === 0) delete next[variantId];
          else next[variantId] = filtered;
          return next;
        });
        flash('Supplier removed.');
      } else {
        setError(data.error || 'Failed to remove supplier');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setUnassigningKey(null);
    }
  };

  // ─────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <i className="fas fa-layer-group" style={{ fontSize: '20px', color: '#c19a6b' }}></i>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>
            Product Variants
          </h3>
          <span style={{
            background: 'rgba(193, 154, 107, 0.12)',
            color: '#c19a6b',
            borderRadius: '20px',
            padding: '2px 10px',
            fontSize: '12px',
            fontWeight: '600',
          }}>
            {variants.length}
          </span>
        </div>
        <button
          onClick={() => { setShowAddForm((v) => !v); setAddError(null); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: showAddForm ? '#f3ede7' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
            color: showAddForm ? '#c19a6b' : 'white',
            border: showAddForm ? '1px solid #e8d5c4' : 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <i className={showAddForm ? 'fas fa-times' : 'fas fa-plus'}></i>
          {showAddForm ? 'Cancel' : 'Add Variant'}
        </button>
      </div>

      {/* Flash messages */}
      {successMessage && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.08)',
          border: '1px solid rgba(34, 197, 94, 0.25)',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <i className="fas fa-check-circle" style={{ color: '#16a34a' }}></i>
          <span style={{ color: '#16a34a', fontSize: '13px', fontWeight: '600' }}>{successMessage}</span>
        </div>
      )}
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <i className="fas fa-exclamation-circle" style={{ color: '#ef4444' }}></i>
          <span style={{ color: '#ef4444', fontSize: '13px', fontWeight: '600' }}>{error}</span>
        </div>
      )}

      {/* ── Add Variant Form ── */}
      {showAddForm && (
        <div style={{
          background: 'rgba(193, 154, 107, 0.04)',
          border: '1px dashed #d4b896',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px',
        }}>
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '16px', margin: '0 0 16px' }}>
            Select any combination of options to define this variant. At least one option is required.
          </p>

          {/* Option selectors */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(optionTypes.length, 3)}, 1fr)`,
            gap: '12px',
            marginBottom: '16px',
          }}>
            {optionTypes.map((type) => (
              <div key={type.id}>
                <label style={labelStyle}>{type.display_name}</label>
                <select
                  value={addSelections[type.id] || ''}
                  onChange={(e) =>
                    setAddSelections((prev) => ({
                      ...prev,
                      [type.id]: parseInt(e.target.value, 10),
                    }))
                  }
                  style={inputStyle}
                >
                  <option value="">Select {type.display_name} (optional)</option>
                  {optionsForType(type.id).map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.display_value}
                      {opt.price_modifier > 0 ? ` (+₹${opt.price_modifier})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Pricing + meta */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Price (₹) *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 1200"
                value={addPrice}
                onChange={(e) => setAddPrice(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Sale Price (₹)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Optional"
                value={addSalePrice}
                onChange={(e) => setAddSalePrice(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>SKU</label>
              <input
                type="text"
                placeholder="e.g. CMS-THK-24-BLK"
                value={addSku}
                onChange={(e) => setAddSku(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fas fa-info-circle"></i>
            Stock starts at 0. Assigned suppliers update inventory from their dashboard.
          </p>

          {addError && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '12px' }}>
              <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i>
              {addError}
            </p>
          )}

          <button
            onClick={handleAdd}
            disabled={adding}
            style={{
              padding: '8px 24px',
              background: adding ? '#aaa' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: adding ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {adding ? (
              <>
                <SpinnerIcon />
                Creating...
              </>
            ) : (
              <>
                <i className="fas fa-plus"></i>
                Create Variant
              </>
            )}
          </button>
        </div>
      )}

      {/* ── Variants table ── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#aaa' }}>
          <SpinnerIcon size={32} />
          <p style={{ marginTop: '12px', fontSize: '13px' }}>Loading variants...</p>
        </div>
      ) : variants.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          border: '1px dashed #e8d5c4',
          borderRadius: '10px',
          color: '#aaa',
        }}>
          <i className="fas fa-layer-group" style={{ fontSize: '40px', marginBottom: '12px', display: 'block' }}></i>
          <p style={{ fontSize: '14px', margin: 0 }}>No variants yet. Click <strong>Add Variant</strong> to create the first one.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'rgba(193, 154, 107, 0.06)', borderBottom: '2px solid #e8d5c4' }}>
                {['Options', 'SKU', 'Price (₹)', 'Sale Price (₹)', 'Stock (supplier)', 'Supplier', 'Active', 'Actions'].map((h) => (
                  <th key={h} style={{
                    padding: '10px 12px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#555',
                    whiteSpace: 'nowrap',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((v, idx) => (
                <React.Fragment key={v.id}>
                  {/* Normal row */}
                  <tr style={{
                    borderBottom: editingId === v.id ? 'none' : '1px solid #f0ebe5',
                    background: idx % 2 === 0 ? 'white' : 'rgba(193, 154, 107, 0.02)',
                    opacity: v.is_active ? 1 : 0.55,
                  }}>
                    {/* Options */}
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {v.options && v.options.length > 0
                          ? v.options.map((opt) => (
                              <span key={opt.id} style={{
                                background: 'rgba(193, 154, 107, 0.12)',
                                color: '#8a6540',
                                borderRadius: '4px',
                                padding: '2px 7px',
                                fontSize: '11px',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                              }}>
                                {opt.display_value}
                              </span>
                            ))
                          : <span style={{ color: '#aaa' }}>—</span>}
                      </div>
                    </td>
                    {/* SKU */}
                    <td style={{ padding: '10px 12px', color: v.sku ? '#444' : '#bbb', fontFamily: 'monospace' }}>
                      {v.sku || '—'}
                    </td>
                    {/* Price */}
                    <td style={{ padding: '10px 12px', fontWeight: '600', color: '#333' }}>
                      ₹{Number(v.price).toLocaleString()}
                    </td>
                    {/* Sale Price */}
                    <td style={{ padding: '10px 12px', color: v.sale_price ? '#e74c3c' : '#bbb' }}>
                      {v.sale_price ? `₹${Number(v.sale_price).toLocaleString()}` : '—'}
                    </td>
                    {/* Stock */}
                    <td style={{ padding: '10px 12px' }}>
                      <StockBadge qty={v.stock_quantity} />
                    </td>
                    {/* Supplier — multiple suppliers per variant supported */}
                    <td style={{ padding: '10px 12px', minWidth: '180px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {/* Chips for each assigned supplier */}
                        {(variantSupplierMap[v.id] ?? []).map((s) => {
                          const key = `${v.id}-${s.supplier_id}`;
                          return (
                            <div key={s.supplier_id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{
                                background: 'rgba(99,102,241,0.1)',
                                color: '#4f46e5',
                                borderRadius: '6px',
                                padding: '2px 8px',
                                fontSize: '11px',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                flex: 1,
                              }}>
                                {s.company_name}
                                <span style={{ marginLeft: '5px', color: s.stock_quantity === 0 ? '#ef4444' : '#22c55e', fontWeight: '700' }}>
                                  ({s.stock_quantity})
                                </span>
                              </span>
                              <button
                                onClick={() => handleUnassignSupplier(v.id, s.supplier_id)}
                                disabled={unassigningKey === key}
                                title="Remove supplier"
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  border: '1px solid #fecaca',
                                  borderRadius: '4px',
                                  background: 'rgba(239,68,68,0.07)',
                                  color: '#ef4444',
                                  cursor: unassigningKey === key ? 'wait' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '10px',
                                  flexShrink: 0,
                                }}
                              >
                                {unassigningKey === key ? <SpinnerIcon size={10} /> : <i className="fas fa-times" />}
                              </button>
                            </div>
                          );
                        })}
                        {/* Assign row — hidden if all suppliers already assigned */}
                        {(() => {
                          const assignedIds = new Set((variantSupplierMap[v.id] ?? []).map((s) => s.supplier_id));
                          const available = suppliers.filter((s) => !assignedIds.has(s.id));
                          if (available.length === 0) return null;
                          return (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <select
                                value={assignSelections[v.id] || ''}
                                onChange={(e) =>
                                  setAssignSelections((prev) => ({
                                    ...prev,
                                    [v.id]: parseInt(e.target.value, 10),
                                  }))
                                }
                                style={{
                                  ...inputStyle,
                                  padding: '4px 6px',
                                  fontSize: '11px',
                                  flex: 1,
                                  minWidth: 0,
                                }}
                              >
                                <option value="">Add supplier…</option>
                                {available.map((s) => (
                                  <option key={s.id} value={s.id}>{s.company_name}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleAssignSupplier(v.id)}
                                disabled={!assignSelections[v.id] || assigningId === v.id}
                                title="Assign supplier"
                                style={{
                                  width: '26px',
                                  height: '26px',
                                  border: 'none',
                                  borderRadius: '6px',
                                  background: (!assignSelections[v.id] || assigningId === v.id)
                                    ? '#d1d5db'
                                    : 'linear-gradient(135deg, #c19a6b, #a67c52)',
                                  color: 'white',
                                  cursor: (!assignSelections[v.id] || assigningId === v.id) ? 'not-allowed' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '11px',
                                  flexShrink: 0,
                                }}
                              >
                                {assigningId === v.id ? <SpinnerIcon size={10} /> : <i className="fas fa-check" />}
                              </button>
                            </div>
                          );
                        })()}
                      </div>
                    </td>
                    {/* Active toggle */}
                    <td style={{ padding: '10px 12px' }}>
                      <button
                        onClick={() => handleToggleActive(v)}
                        title={v.is_active ? 'Click to deactivate' : 'Click to activate'}
                        style={{
                          width: '36px',
                          height: '20px',
                          borderRadius: '10px',
                          border: 'none',
                          cursor: 'pointer',
                          background: v.is_active ? '#22c55e' : '#d1d5db',
                          position: 'relative',
                          transition: 'background 0.2s ease',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          top: '2px',
                          left: v.is_active ? '18px' : '2px',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: 'white',
                          transition: 'left 0.2s ease',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }} />
                      </button>
                    </td>
                    {/* Actions */}
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <ActionBtn
                          icon="fa-edit"
                          title="Edit"
                          color="#c19a6b"
                          onClick={() => editingId === v.id ? cancelEdit() : startEdit(v)}
                          active={editingId === v.id}
                        />
                        <ActionBtn
                          icon="fa-trash"
                          title="Delete"
                          color="#ef4444"
                          onClick={() => handleDelete(v.id)}
                          loading={deletingId === v.id}
                        />
                      </div>
                    </td>
                  </tr>

                  {/* Inline edit row */}
                  {editingId === v.id && (
                    <tr style={{ borderBottom: '1px solid #f0ebe5', background: 'rgba(193, 154, 107, 0.04)' }}>
                      <td colSpan={8} style={{ padding: '12px 12px 16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                          <div>
                            <label style={labelStyle}>Price (₹) *</label>
                            <input type="number" min="0" step="0.01" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>Sale Price (₹)</label>
                            <input type="number" min="0" step="0.01" placeholder="Optional" value={editSalePrice} onChange={(e) => setEditSalePrice(e.target.value)} style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>SKU</label>
                            <input type="text" value={editSku} onChange={(e) => setEditSku(e.target.value)} style={inputStyle} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleSaveEdit(v.id)}
                            disabled={savingEdit}
                            style={{
                              padding: '6px 20px',
                              background: savingEdit ? '#aaa' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: savingEdit ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            {savingEdit ? <SpinnerIcon /> : <i className="fas fa-save"></i>}
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            style={{
                              padding: '6px 16px',
                              background: 'transparent',
                              color: '#888',
                              border: '1px solid #ddd',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                            }}
                          >
                            Cancel
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
      )}
    </div>
  );
}

// ── Small helpers ──────────────────────────────────────────────

function StockBadge({ qty }: { qty: number }) {
  const color = qty === 0 ? '#ef4444' : qty < 5 ? '#f59e0b' : '#22c55e';
  const bg = qty === 0 ? 'rgba(239,68,68,0.1)' : qty < 5 ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)';
  return (
    <span style={{
      background: bg,
      color,
      borderRadius: '6px',
      padding: '2px 8px',
      fontSize: '12px',
      fontWeight: '700',
    }}>
      {qty === 0 ? 'Out' : qty}
    </span>
  );
}

function ActionBtn({
  icon, title, color, onClick, active = false, loading = false,
}: {
  icon: string; title: string; color: string;
  onClick: () => void; active?: boolean; loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      title={title}
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '6px',
        border: `1px solid ${active ? color : '#e8d5c4'}`,
        background: active ? color : 'white',
        color: active ? 'white' : color,
        cursor: loading ? 'wait' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        transition: 'all 0.15s ease',
      }}
    >
      {loading ? <SpinnerIcon size={12} /> : <i className={`fas ${icon}`}></i>}
    </button>
  );
}

function SpinnerIcon({ size = 14 }: { size?: number }) {
  return (
    <span style={{
      display: 'inline-block',
      width: size,
      height: size,
      border: `2px solid rgba(255,255,255,0.4)`,
      borderTop: '2px solid currentColor',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
      flexShrink: 0,
    }}>
      <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
    </span>
  );
}
