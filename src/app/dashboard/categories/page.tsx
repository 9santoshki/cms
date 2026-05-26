'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  display_order: number;
  is_active: boolean;
  description: string | null;
  image: string | null;
  show_on_homepage: boolean;
  show_in_menu: boolean;
  children?: Category[];
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

export default function CategoriesPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Which category is expanded
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Global flash
  const [flash, setFlash] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  // ── Add parent category form ──
  const [showAddParent, setShowAddParent] = useState(false);
  const [newParentName, setNewParentName] = useState('');
  const [newParentSlug, setNewParentSlug] = useState('');
  const [newParentDesc, setNewParentDesc] = useState('');
  const [newParentOrder, setNewParentOrder] = useState('0');
  const [addingParent, setAddingParent] = useState(false);

  // ── Edit category inline ──
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editOrder, setEditOrder] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editShowOnHomepage, setEditShowOnHomepage] = useState(false);
  const [editShowInMenu, setEditShowInMenu] = useState(true);
  const [savingCategory, setSavingCategory] = useState(false);

  // ── Add subcategory (per parent) ──
  const [addingSubParentId, setAddingSubParentId] = useState<number | null>(null);
  const [newSubName, setNewSubName] = useState('');
  const [newSubSlug, setNewSubSlug] = useState('');
  const [newSubOrder, setNewSubOrder] = useState('0');
  const [newSubImage, setNewSubImage] = useState('');
  const [newSubShowOnHomepage, setNewSubShowOnHomepage] = useState(false);
  const [newSubShowInMenu, setNewSubShowInMenu] = useState(true);
  const [addingSub, setAddingSub] = useState(false);

  useEffect(() => {
    if (!user) { router.push('/auth?redirect=/dashboard/categories'); return; }
    if (user.role !== 'admin') { router.push('/dashboard'); return; }
    loadCategories();
  }, [user]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data.sort((a: Category, b: Category) => a.display_order - b.display_order));
      }
    } finally {
      setLoading(false);
    }
  };

  const showFlash = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setFlash({ msg, type });
    setTimeout(() => setFlash(null), 3000);
  };

  const subcategoriesOf = (parentId: number) =>
    (categories.find(c => c.id === parentId)?.children || [])
      .sort((a, b) => a.display_order - b.display_order);

  // ─────────────────────────────────────────────────────────────
  // Parent category actions
  // ─────────────────────────────────────────────────────────────

  const handleAddParent = async () => {
    if (!newParentName.trim()) {
      showFlash('Name is required.', 'err'); return;
    }
    setAddingParent(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newParentName.trim(),
          slug: newParentSlug.trim() || undefined,
          description: newParentDesc.trim() || null,
          display_order: parseInt(newParentOrder, 10) || categories.length,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFlash(`"${newParentName}" added!`);
        setNewParentName(''); setNewParentSlug(''); setNewParentDesc(''); setNewParentOrder('0');
        setShowAddParent(false);
        loadCategories();
      } else { showFlash(data.error || 'Failed to add category', 'err'); }
    } catch { showFlash('Network error', 'err'); }
    finally { setAddingParent(false); }
  };

  const startEdit = (cat: Category) => {
    setEditId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditDesc(cat.description || '');
    setEditOrder(cat.display_order.toString());
    setEditImage(cat.image || '');
    setEditShowOnHomepage(cat.show_on_homepage || false);
    setEditShowInMenu(cat.show_in_menu !== false); // default true if undefined
  };

  const handleSave = async (id: number) => {
    setSavingCategory(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          name: editName,
          slug: editSlug || undefined,
          description: editDesc || null,
          display_order: parseInt(editOrder, 10) || 0,
          image: editImage || null,
          show_on_homepage: editShowOnHomepage,
          show_in_menu: editShowInMenu,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFlash('Updated!');
        setEditId(null);
        loadCategories();
      } else { showFlash(data.error || 'Failed', 'err'); }
    } catch { showFlash('Network error', 'err'); }
    finally { setSavingCategory(false); }
  };

  const handleToggleActive = async (cat: Category) => {
    await fetch('/api/admin/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: cat.id, is_active: !cat.is_active }),
    });
    loadCategories();
  };

  const handleToggleShowInMenu = async (cat: Category) => {
    await fetch('/api/admin/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: cat.id, show_in_menu: !cat.show_in_menu }),
    });
    loadCategories();
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? Any subcategories must be deleted first.`)) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { showFlash(`"${name}" deleted.`); loadCategories(); }
      else { showFlash(data.error || 'Failed', 'err'); }
    } catch { showFlash('Network error', 'err'); }
  };

  // ─────────────────────────────────────────────────────────────
  // Subcategory actions
  // ─────────────────────────────────────────────────────────────

  const handleAddSubcategory = async (parentId: number) => {
    if (!newSubName.trim()) {
      showFlash('Name is required.', 'err'); return;
    }
    setAddingSub(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newSubName.trim(),
          slug: newSubSlug.trim() || undefined,
          parent_id: parentId,
          display_order: parseInt(newSubOrder, 10) || subcategoriesOf(parentId).length,
          image: newSubImage.trim() || null,
          show_on_homepage: newSubShowOnHomepage,
          show_in_menu: newSubShowInMenu,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFlash(`"${newSubName}" added!`);
        setAddingSubParentId(null);
        setNewSubName(''); setNewSubSlug(''); setNewSubOrder('0'); setNewSubImage(''); setNewSubShowOnHomepage(false); setNewSubShowInMenu(true);
        loadCategories();
      } else { showFlash(data.error || 'Failed', 'err'); }
    } catch { showFlash('Network error', 'err'); }
    finally { setAddingSub(false); }
  };

  // ─────────────────────────────────────────────────────────────

  if (!user || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '3px solid #f0f0f0', borderTop: '3px solid #c19a6b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
          <p style={{ marginTop: 16, color: '#666', fontSize: 14 }}>Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Category Management"
      description="Manage product categories and subcategories. Categories appear as filters on the shop page."
    >
      <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @media (max-width: 768px) {
          .categories-header-bar { flex-direction: column !important; align-items: stretch !important; gap: 10px !important; }
          .categories-header-bar button { width: 100%; justify-content: center; }
          .categories-type-grid { grid-template-columns: 1fr !important; }
          .categories-edit-row { flex-direction: column !important; }
          .categories-edit-row button { width: 100%; }
        }
      `}</style>

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

      {/* Legend for toggles */}
      <div style={{ background: 'white', borderRadius: 8, padding: '8px 16px', marginBottom: 12, border: '1px solid #e8d5c4', display: 'flex', gap: 20, alignItems: 'center', fontSize: 11 }}>
        <span style={{ color: '#888', fontWeight: 600 }}>Toggle Legend:</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 16, height: 10, borderRadius: 5, background: '#3b82f6' }}></span>
          <span style={{ color: '#666' }}>Menu (show in nav bar vs "Other")</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 16, height: 10, borderRadius: 5, background: '#22c55e' }}></span>
          <span style={{ color: '#666' }}>Active (category is visible)</span>
        </span>
      </div>

      {/* ── Add Category bar ── */}
      <div className="categories-header-bar" style={{
        background: 'white', borderRadius: 8, padding: '12px 16px', marginBottom: 12,
        boxShadow: '0 2px 8px rgba(193,154,107,0.08)', border: '1px solid #e8d5c4',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: '10px', flexWrap: 'wrap',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#333' }}>
            {categories.length} parent category{categories.length !== 1 ? 's' : ''}
          </p>
          <p style={{ margin: '1px 0 0', fontSize: 11, color: '#888' }}>
            Expand each category to manage its subcategories
          </p>
        </div>
        <button
          onClick={() => { setShowAddParent(v => !v); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 14px',
            background: showAddParent ? '#f3ede7' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
            color: showAddParent ? '#c19a6b' : 'white',
            border: showAddParent ? '1px solid #e8d5c4' : 'none',
            borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <i className={showAddParent ? 'fas fa-times' : 'fas fa-plus'}></i>
          {showAddParent ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {/* Add parent form */}
      {showAddParent && (
        <div style={{
          background: 'white', borderRadius: 8, padding: 16, marginBottom: 12,
          border: '1px dashed #d4b896',
          boxShadow: '0 2px 8px rgba(193,154,107,0.06)',
        }}>
          <h4 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: '#555' }}>
            New Parent Category
          </h4>
          <div className="categories-type-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <label style={labelStyle}>Name *</label>
              <input
                style={inputStyle} placeholder="e.g. Living Room"
                value={newParentName}
                onChange={e => setNewParentName(e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Slug <span style={{ fontWeight: 400, color: '#aaa' }}>(auto if empty)</span></label>
              <input
                style={inputStyle} placeholder="e.g. living-room"
                value={newParentSlug}
                onChange={e => setNewParentSlug(e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <input
                style={inputStyle} placeholder="Optional description shown to customers"
                value={newParentDesc}
                onChange={e => setNewParentDesc(e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Sort Order</label>
              <input type="number" min="0"
                style={inputStyle} placeholder="0"
                value={newParentOrder}
                onChange={e => setNewParentOrder(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleAddParent} disabled={addingParent}
            style={{
              padding: '6px 16px',
              background: addingParent ? '#aaa' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white', border: 'none', borderRadius: 6,
              fontSize: 12, fontWeight: 600, cursor: addingParent ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {addingParent ? <Spinner /> : <i className="fas fa-plus"></i>}
            Create Category
          </button>
        </div>
      )}

      {/* ── Categories list ── */}
      {categories.length === 0 ? (
        <div style={{
          background: 'white', borderRadius: 8, padding: '32px 16px',
          textAlign: 'center', border: '1px dashed #e8d5c4', color: '#aaa',
        }}>
          <i className="fas fa-folder-open" style={{ fontSize: 32, marginBottom: 8, display: 'block' }}></i>
          <p style={{ margin: 0, fontSize: 13 }}>No categories yet. Click <strong>Add Category</strong> to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {categories.map(cat => {
            const subs = subcategoriesOf(cat.id);
            const isExpanded = expandedId === cat.id;
            const isEditing = editId === cat.id;
            const isAddingSub = addingSubParentId === cat.id;

            return (
              <div key={cat.id} style={{
                background: 'white', borderRadius: 8,
                boxShadow: '0 2px 8px rgba(193,154,107,0.08)',
                border: isExpanded ? '1px solid #c19a6b' : '1px solid #e8d5c4',
                overflow: 'hidden',
                opacity: cat.is_active ? 1 : 0.6,
                transition: 'border-color 0.2s ease',
              }}>
                {/* Category header row */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 16px',
                  cursor: 'pointer',
                  background: isExpanded ? 'rgba(193,154,107,0.04)' : 'white',
                }}
                  onClick={() => {
                    if (isEditing) return;
                    setExpandedId(isExpanded ? null : cat.id);
                    setAddingSubParentId(null);
                    setEditId(null);
                  }}
                >
                  {/* Chevron */}
                  <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'}`}
                    style={{ fontSize: 12, color: '#c19a6b', width: 14, flexShrink: 0 }}></i>

                  {/* Category info or edit form */}
                  {isEditing ? (
                    <div className="categories-edit-row" style={{ display: 'flex', gap: 10, flex: 1, alignItems: 'flex-end', flexWrap: 'wrap' }}
                      onClick={e => e.stopPropagation()}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Name</label>
                        <input style={{ ...inputStyle, padding: '6px 10px' }} value={editName}
                          onChange={e => setEditName(e.target.value)} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Slug</label>
                        <input style={{ ...inputStyle, padding: '6px 10px' }} value={editSlug}
                          onChange={e => setEditSlug(e.target.value)} />
                      </div>
                      <div style={{ flex: 2 }}>
                        <label style={labelStyle}>Description</label>
                        <input style={{ ...inputStyle, padding: '6px 10px' }} value={editDesc}
                          onChange={e => setEditDesc(e.target.value)} placeholder="Optional" />
                      </div>
                      <div style={{ width: 80 }}>
                        <label style={labelStyle}>Order</label>
                        <input type="number" min="0" style={{ ...inputStyle, padding: '6px 10px' }} value={editOrder}
                          onChange={e => setEditOrder(e.target.value)} />
                      </div>
                      <button onClick={() => handleSave(cat.id)} disabled={savingCategory}
                        style={{
                          padding: '6px 16px', background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                          color: 'white', border: 'none', borderRadius: 6, fontSize: 12,
                          fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                          whiteSpace: 'nowrap',
                        }}>
                        {savingCategory ? <Spinner /> : <i className="fas fa-save"></i>} Save
                      </button>
                      <button onClick={() => setEditId(null)}
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
                          {cat.name}
                        </span>
                        <span style={{
                          marginLeft: 10, fontSize: 11, color: '#aaa',
                          fontFamily: 'monospace', background: '#f5f5f5',
                          borderRadius: 4, padding: '1px 6px',
                        }}>
                          {cat.slug}
                        </span>
                        <span style={{
                          marginLeft: 8, fontSize: 10, fontWeight: 600,
                          background: cat.show_in_menu ? '#3b82f615' : '#6b728015',
                          color: cat.show_in_menu ? '#3b82f6' : '#6b7280',
                          borderRadius: 4, padding: '2px 6px',
                        }}>
                          {cat.show_in_menu ? 'MENU' : 'OTHER'}
                        </span>
                        {cat.description && (
                          <span style={{ marginLeft: 10, fontSize: 12, color: '#888' }}>{cat.description}</span>
                        )}
                      </div>
                      <span style={{
                        fontSize: 12, color: '#888', marginRight: 4,
                        background: '#f5f5f5', borderRadius: 20, padding: '2px 10px',
                      }}>
                        {subs.length} sub{subs.length !== 1 ? 's' : ''}
                      </span>
                    </>
                  )}

                  {/* Actions */}
                  {!isEditing && (
                    <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                      <SmallBtn icon="fa-edit" title="Edit" color="#c19a6b"
                        onClick={() => startEdit(cat)} />
                      {/* Menu toggle */}
                      <button onClick={() => handleToggleShowInMenu(cat)} title={cat.show_in_menu ? 'Hide from menu' : 'Show in menu'}
                        style={{
                          width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                          background: cat.show_in_menu ? '#3b82f6' : '#d1d5db', position: 'relative',
                          transition: 'background 0.2s', flexShrink: 0,
                        }}>
                        <span style={{
                          position: 'absolute', top: 3,
                          left: cat.show_in_menu ? 22 : 3,
                          width: 18, height: 18, borderRadius: '50%', background: 'white',
                          transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }} />
                      </button>
                      {/* Active toggle */}
                      <button onClick={() => handleToggleActive(cat)} title={cat.is_active ? 'Deactivate' : 'Activate'}
                        style={{
                          width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                          background: cat.is_active ? '#22c55e' : '#d1d5db', position: 'relative',
                          transition: 'background 0.2s', flexShrink: 0,
                        }}>
                        <span style={{
                          position: 'absolute', top: 3,
                          left: cat.is_active ? 22 : 3,
                          width: 18, height: 18, borderRadius: '50%', background: 'white',
                          transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }} />
                      </button>
                      <SmallBtn icon="fa-trash" title="Delete" color="#ef4444"
                        onClick={() => handleDelete(cat.id, cat.name)} />
                    </div>
                  )}
                </div>

                {/* Expanded: subcategories list */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid #f0ebe5', padding: '12px 16px' }}>

                    {/* Subcategories table */}
                    {subs.length === 0 ? (
                      <p style={{ color: '#aaa', fontSize: 13, margin: '0 0 16px' }}>
                        No subcategories yet. Add the first one below.
                      </p>
                    ) : (
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 16 }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #f0ebe5' }}>
                            {['Name', 'Slug', 'Order', 'Menu', 'Homepage', 'Active', ''].map(h => (
                              <th key={h} style={{
                                padding: '6px 10px', textAlign: 'left',
                                fontSize: 11, fontWeight: 700, color: '#aaa',
                                textTransform: 'uppercase', letterSpacing: '0.5px',
                              }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {subs.map(sub => {
                            const isEditingSub = editId === sub.id;
                            return (
                              <tr key={sub.id} style={{
                                borderBottom: isEditingSub ? 'none' : '1px solid #faf7f4',
                                opacity: sub.is_active ? 1 : 0.5,
                              }}>
                                <td style={{ padding: '8px 10px', fontWeight: 600, color: '#333' }}>
                                  {isEditingSub ? (
                                    <input style={{ ...inputStyle, padding: '5px 8px' }}
                                      value={editName}
                                      onChange={e => setEditName(e.target.value)} />
                                  ) : sub.name}
                                </td>
                                <td style={{ padding: '8px 10px', fontFamily: 'monospace', color: '#888', fontSize: 12 }}>
                                  {isEditingSub ? (
                                    <input style={{ ...inputStyle, padding: '5px 8px' }}
                                      value={editSlug}
                                      onChange={e => setEditSlug(e.target.value)} />
                                  ) : sub.slug}
                                </td>
                                <td style={{ padding: '8px 10px' }}>
                                  {isEditingSub ? (
                                    <input type="number" min="0"
                                      style={{ ...inputStyle, padding: '5px 8px', width: 70 }}
                                      value={editOrder}
                                      onChange={e => setEditOrder(e.target.value)} />
                                  ) : (
                                    <span style={{ color: '#aaa' }}>{sub.display_order}</span>
                                  )}
                                </td>
                                <td style={{ padding: '8px 10px' }}>
                                  <button onClick={() => handleToggleShowInMenu(sub)}
                                    style={{
                                      width: 28, height: 16, borderRadius: 8, border: 'none', cursor: 'pointer',
                                      background: sub.show_in_menu ? '#3b82f6' : '#d1d5db', position: 'relative',
                                    }}>
                                    <span style={{
                                      position: 'absolute', top: 2,
                                      left: sub.show_in_menu ? 14 : 2,
                                      width: 12, height: 12, borderRadius: '50%', background: 'white',
                                    }} />
                                  </button>
                                </td>
                                <td style={{ padding: '8px 10px' }}>
                                  {isEditingSub ? (
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                                      <input type="checkbox" checked={editShowOnHomepage}
                                        onChange={e => setEditShowOnHomepage(e.target.checked)}
                                        style={{ width: 14, height: 14 }} />
                                      <span style={{ fontSize: 11, color: '#666' }}>Show</span>
                                    </label>
                                  ) : (
                                    <span style={{
                                      background: sub.show_on_homepage ? '#22c55e20' : '#f5f5f5',
                                      color: sub.show_on_homepage ? '#16a34a' : '#aaa',
                                      padding: '2px 8px', borderRadius: 4, fontSize: 11,
                                    }}>
                                      {sub.show_on_homepage ? '✓' : '—'}
                                    </span>
                                  )}
                                </td>
                                <td style={{ padding: '8px 10px' }}>
                                  <button onClick={() => handleToggleActive(sub)}
                                    style={{
                                      width: 36, height: 20, borderRadius: 10, border: 'none',
                                      cursor: 'pointer', background: sub.is_active ? '#22c55e' : '#d1d5db',
                                      position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                                    }}>
                                    <span style={{
                                      position: 'absolute', top: 2,
                                      left: sub.is_active ? 18 : 2,
                                      width: 16, height: 16, borderRadius: '50%', background: 'white',
                                      transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                    }} />
                                  </button>
                                </td>
                                <td style={{ padding: '8px 10px' }}>
                                  <div style={{ display: 'flex', gap: 4 }}>
                                    {isEditingSub ? (
                                      <>
                                        <button onClick={() => handleSave(sub.id)} disabled={savingCategory}
                                          style={{
                                            padding: '4px 12px', background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                                            color: 'white', border: 'none', borderRadius: 6,
                                            fontSize: 11, fontWeight: 600, cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: 4,
                                          }}>
                                          {savingCategory ? <Spinner size={10} /> : <i className="fas fa-save"></i>} Save
                                        </button>
                                        <button onClick={() => setEditId(null)}
                                          style={{
                                            padding: '4px 10px', background: 'transparent', color: '#888',
                                            border: '1px solid #ddd', borderRadius: 6, fontSize: 11,
                                            fontWeight: 600, cursor: 'pointer',
                                          }}>Cancel</button>
                                      </>
                                    ) : (
                                      <>
                                        <SmallBtn icon="fa-edit" title="Edit" color="#c19a6b"
                                          onClick={() => startEdit(sub)} />
                                        <SmallBtn icon="fa-trash" title="Delete" color="#ef4444"
                                          onClick={() => handleDelete(sub.id, sub.name)} />
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}

                    {/* Add subcategory row */}
                    {isAddingSub ? (
                      <div style={{
                        background: 'rgba(193,154,107,0.04)', border: '1px dashed #d4b896',
                        borderRadius: 8, padding: 14,
                      }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: 10, marginBottom: 10 }}>
                          <div>
                            <label style={labelStyle}>Name *</label>
                            <input style={inputStyle} placeholder={`e.g. Sofas`}
                              value={newSubName} onChange={e => setNewSubName(e.target.value)} />
                          </div>
                          <div>
                            <label style={labelStyle}>Slug <span style={{ fontWeight: 400, color: '#aaa' }}>(auto if empty)</span></label>
                            <input style={inputStyle} placeholder="e.g. sofas"
                              value={newSubSlug} onChange={e => setNewSubSlug(e.target.value)} />
                          </div>
                          <div>
                            <label style={labelStyle}>Sort Order</label>
                            <input type="number" min="0" style={inputStyle}
                              value={newSubOrder} onChange={e => setNewSubOrder(e.target.value)} />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10, marginBottom: 10 }}>
                          <div>
                            <label style={labelStyle}>Image URL <span style={{ fontWeight: 400, color: '#aaa' }}>(for homepage)</span></label>
                            <input style={inputStyle} placeholder="/images/categories/example.jpg"
                              value={newSubImage} onChange={e => setNewSubImage(e.target.value)} />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 20 }}>
                            <input type="checkbox" checked={newSubShowOnHomepage}
                              onChange={e => setNewSubShowOnHomepage(e.target.checked)}
                              style={{ width: 16, height: 16 }} />
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>Homepage</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <input type="checkbox" checked={newSubShowInMenu}
                              onChange={e => setNewSubShowInMenu(e.target.checked)}
                              style={{ width: 16, height: 16 }} />
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>Show in Menu Dropdown</span>
                          </label>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => handleAddSubcategory(cat.id)} disabled={addingSub}
                            style={{
                              padding: '7px 18px',
                              background: addingSub ? '#aaa' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
                              color: 'white', border: 'none', borderRadius: 7,
                              fontSize: 12, fontWeight: 600, cursor: addingSub ? 'not-allowed' : 'pointer',
                              display: 'flex', alignItems: 'center', gap: 6,
                            }}>
                            {addingSub ? <Spinner /> : <i className="fas fa-plus"></i>} Add Subcategory
                          </button>
                          <button onClick={() => { setAddingSubParentId(null); setNewSubName(''); setNewSubSlug(''); setNewSubOrder('0'); setNewSubImage(''); setNewSubShowOnHomepage(false); setNewSubShowInMenu(true); }}
                            style={{
                              padding: '7px 14px', background: 'transparent', color: '#888',
                              border: '1px solid #ddd', borderRadius: 7, fontSize: 12,
                              fontWeight: 600, cursor: 'pointer',
                            }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setAddingSubParentId(cat.id); setEditId(null); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          padding: '7px 16px', background: 'transparent',
                          color: '#c19a6b', border: '1px dashed #c19a6b',
                          borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        }}>
                        <i className="fas fa-plus"></i>
                        Add Subcategory to {cat.name}
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

function SmallBtn({ icon, title, color, onClick }: {
  icon: string; title: string; color: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} title={title} style={{
      width: 28, height: 28, borderRadius: 6, border: `1px solid #e8d5c4`,
      background: 'white', color, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, transition: 'all 0.15s ease', flexShrink: 0,
    }}>
      <i className={`fas ${icon}`}></i>
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