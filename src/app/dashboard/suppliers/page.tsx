'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { LoadingSpinner, EmptyState } from '@/components/DashboardShared';

interface Supplier {
  id: number;
  user_id: number;
  company_name: string;
  contact_person: string | null;
  phone: string | null;
  address: string | null;
  gst_id: string | null;
  is_active: boolean;
  notes: string | null;
  user_name: string;
  user_email: string;
}

interface User { id: number; name: string; email: string; role: string; }

const SuppliersPage = () => {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({
    user_id: '', company_name: '', contact_person: '', phone: '', address: '', gst_id: '', notes: '', is_active: true
  });

  useEffect(() => {
    if (!currentUser) { router.push('/auth?redirect=/dashboard/suppliers'); return; }
    if (currentUser.role !== 'admin') { router.push('/dashboard'); return; }
    fetchData();
  }, [currentUser]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sRes, uRes] = await Promise.all([fetch('/api/admin/suppliers'), fetch('/api/admin/users')]);
      const sData = await sRes.json(), uData = await uRes.json();
      setSuppliers(sData.success ? sData.data || [] : []);
      setUsers(uData.success ? uData.data || [] : []);
    } catch { }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/suppliers', {
        method: editingSupplier ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSupplier ? { ...formData, id: editingSupplier.id } : formData)
      });
      const result = await res.json();
      if (result.success) { setShowModal(false); setEditingSupplier(null); resetForm(); fetchData(); }
      else alert(result.error);
    } catch { alert('Failed to save'); }
  };

  const handleEdit = (s: Supplier) => {
    setEditingSupplier(s);
    setFormData({ user_id: String(s.user_id), company_name: s.company_name, contact_person: s.contact_person || '', phone: s.phone || '', address: s.address || '', gst_id: s.gst_id || '', notes: s.notes || '', is_active: s.is_active });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this supplier?')) return;
    try {
      const res = await fetch(`/api/admin/suppliers?id=${id}`, { method: 'DELETE' });
      if ((await res.json()).success) fetchData();
    } catch { }
  };

  const resetForm = () => setFormData({ user_id: '', company_name: '', contact_person: '', phone: '', address: '', gst_id: '', notes: '', is_active: true });

  if (!currentUser || loading) return <LoadingSpinner />;

  return (
    <DashboardLayout title="Suppliers" description="Manage supplier profiles and inventory.">
      {/* Header */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <button onClick={() => setShowModal(true)} style={{ padding: '8px 16px', background: '#c19a6b', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          <i className="fas fa-plus"></i> Add Supplier
        </button>
        <button onClick={fetchData} style={{ padding: '8px 12px', background: 'white', border: '1px solid #e8d5c4', borderRadius: 6, fontSize: 12, cursor: 'pointer', color: '#c19a6b' }}>
          <i className="fas fa-sync-alt"></i>
        </button>
        <span style={{ fontSize: 12, color: '#666', marginLeft: 8 }}>{suppliers.length} suppliers</span>
      </div>

      {/* Table */}
      {suppliers.length === 0 ? <EmptyState icon="fa-truck" title="No Suppliers" /> : (
        <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e8d5c4', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8f4f0', borderBottom: '1px solid #e8d5c4' }}>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>Company</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>User</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>Contact</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>GST</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 600 }}>{s.company_name}</td>
                  <td style={{ padding: '8px 10px', fontSize: 12 }}>
                    <div>{s.user_name}</div>
                    <div style={{ color: '#888' }}>{s.user_email}</div>
                  </td>
                  <td style={{ padding: '8px 10px', fontSize: 12 }}>
                    {s.phone || <span style={{ color: '#aaa' }}>—</span>}
                  </td>
                  <td style={{ padding: '8px 10px', fontSize: 12 }}>{s.gst_id || <span style={{ color: '#aaa' }}>—</span>}</td>
                  <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                    <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                      background: s.is_active ? '#16a34a15' : '#6b728015', color: s.is_active ? '#16a34a' : '#6b7280' }}>
                      {s.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                      <button onClick={() => router.push(`/dashboard/suppliers/${s.id}`)} title="Manage variants"
                        style={{ padding: '4px 10px', borderRadius: 4, fontSize: 11, cursor: 'pointer', border: 'none', background: '#c19a6b', color: 'white' }}>
                        <i className="fas fa-boxes"></i>
                      </button>
                      <button onClick={() => handleEdit(s)} title="Edit"
                        style={{ padding: '4px 8px', borderRadius: 4, fontSize: 11, cursor: 'pointer', border: '1px solid #e8d5c4', background: 'white', color: '#c19a6b' }}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(s.id)} title="Delete"
                        style={{ padding: '4px 8px', borderRadius: 4, fontSize: 11, cursor: 'pointer', border: '1px solid #fee2e2', background: 'white', color: '#ef4444' }}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 24, maxWidth: 500, width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: 12 }}>
                {!editingSupplier && (
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4 }}>User Account *</label>
                    <select value={formData.user_id} onChange={e => setFormData({ ...formData, user_id: e.target.value })} required
                      style={{ width: '100%', padding: 8, border: '1px solid #e8d5c4', borderRadius: 6, fontSize: 13 }}>
                      <option value="">Select user...</option>
                      {users.filter(u => u.role === 'supplier' || u.role === 'customer').map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4 }}>Company Name *</label>
                  <input type="text" value={formData.company_name} onChange={e => setFormData({ ...formData, company_name: e.target.value })} required
                    style={{ width: '100%', padding: 8, border: '1px solid #e8d5c4', borderRadius: 6, fontSize: 13 }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4 }}>Contact Person</label>
                    <input type="text" value={formData.contact_person} onChange={e => setFormData({ ...formData, contact_person: e.target.value })}
                      style={{ width: '100%', padding: 8, border: '1px solid #e8d5c4', borderRadius: 6, fontSize: 13 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4 }}>Phone</label>
                    <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: 8, border: '1px solid #e8d5c4', borderRadius: 6, fontSize: 13 }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4 }}>GST ID</label>
                  <input type="text" value={formData.gst_id} onChange={e => setFormData({ ...formData, gst_id: e.target.value })}
                    style={{ width: '100%', padding: 8, border: '1px solid #e8d5c4', borderRadius: 6, fontSize: 13 }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4 }}>Address</label>
                  <textarea value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} rows={2}
                    style={{ width: '100%', padding: 8, border: '1px solid #e8d5c4', borderRadius: 6, fontSize: 13, resize: 'vertical' }} />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} style={{ width: 16, height: 16 }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Active</span>
                </label>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'end' }}>
                <button type="button" onClick={() => { setShowModal(false); setEditingSupplier(null); resetForm(); }}
                  style={{ padding: '8px 16px', background: 'white', border: '1px solid #e8d5c4', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 16px', background: '#c19a6b', color: 'white', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  {editingSupplier ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SuppliersPage;