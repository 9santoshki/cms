'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

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
  created_at: string;
  updated_at: string;
  user_name: string;
  user_email: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const SuppliersPage = () => {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({
    user_id: '',
    company_name: '',
    contact_person: '',
    phone: '',
    address: '',
    gst_id: '',
    notes: '',
    is_active: true
  });

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth?redirect=/dashboard/suppliers');
      return;
    }

    if (currentUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchData();
  }, [currentUser]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [suppliersRes, usersRes] = await Promise.all([
        fetch('/api/admin/suppliers'),
        fetch('/api/admin/users')
      ]);

      const suppliersResult = await suppliersRes.json();
      const usersResult = await usersRes.json();

      if (suppliersResult.success) {
        setSuppliers(suppliersResult.data || []);
      }

      if (usersResult.success) {
        // Filter only users with supplier role or potential suppliers
        setUsers(usersResult.data || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = '/api/admin/suppliers';
      const method = editingSupplier ? 'PUT' : 'POST';
      const body = editingSupplier
        ? { ...formData, id: editingSupplier.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (result.success) {
        setShowModal(false);
        setEditingSupplier(null);
        setFormData({
          user_id: '',
          company_name: '',
          contact_person: '',
          phone: '',
          address: '',
          gst_id: '',
          notes: '',
          is_active: true
        });
        fetchData();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Error saving supplier:', err);
      alert('Failed to save supplier');
    }
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      user_id: String(supplier.user_id),
      company_name: supplier.company_name,
      contact_person: supplier.contact_person || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
      gst_id: supplier.gst_id || '',
      notes: supplier.notes || '',
      is_active: supplier.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (supplierId: number) => {
    if (!confirm('Are you sure you want to delete this supplier?')) return;

    try {
      const response = await fetch(`/api/admin/suppliers?id=${supplierId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        fetchData();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Error deleting supplier:', err);
      alert('Failed to delete supplier');
    }
  };

  if (!currentUser || loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #f0f0f0',
            borderTop: '3px solid #c19a6b',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <style jsx>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <p style={{ marginTop: '16px', color: '#666' }}>Loading suppliers...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .suppliers-grid { grid-template-columns: 1fr !important; }
          .modal-content { width: 95% !important; padding: 16px !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <DashboardLayout
        title="Supplier Management"
        description="Manage supplier profiles and assign product variants to suppliers."
      >
        {/* Header Actions */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-plus"></i>
            Add Supplier
          </button>
          <button
            onClick={fetchData}
            style={{
              padding: '12px 24px',
              background: 'white',
              border: '1px solid #e8d5c4',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#c19a6b'
            }}
          >
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>

        {/* Suppliers List */}
        {suppliers.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '64px 32px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
            border: '1px solid #e8d5c4'
          }}>
            <i className="fas fa-truck" style={{ fontSize: '64px', color: '#e8d5c4', marginBottom: '16px' }}></i>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              No Suppliers Yet
            </h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
              Add suppliers to enable decentralized inventory management.
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Add First Supplier
            </button>
          </div>
        ) : (
          <div className="suppliers-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '16px'
          }}>
            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                  border: '1px solid #e8d5c4',
                  transition: 'transform 0.2s ease'
                }}
              >
                {/* Supplier Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        background: supplier.is_active
                          ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                          : 'linear-gradient(135deg, #9ca3af, #6b7280)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}>
                        <i className="fas fa-building"></i>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                          {supplier.company_name}
                        </h3>
                        <div style={{
                          padding: '4px 8px',
                          background: supplier.is_active ? 'rgba(34, 197, 94, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                          color: supplier.is_active ? '#22c55e' : '#6b7280',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600',
                          display: 'inline-block'
                        }}>
                          {supplier.is_active ? 'ACTIVE' : 'INACTIVE'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supplier Info */}
                <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <i className="fas fa-user" style={{ color: '#999', width: '16px' }}></i>
                    <span style={{ color: '#666' }}>{supplier.user_name || 'Unknown'}</span>
                    <span style={{ color: '#999' }}>({supplier.user_email})</span>
                  </div>
                  {supplier.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <i className="fas fa-phone" style={{ color: '#999', width: '16px' }}></i>
                      <span style={{ color: '#666' }}>{supplier.phone}</span>
                    </div>
                  )}
                  {supplier.gst_id && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <i className="fas fa-file-alt" style={{ color: '#999', width: '16px' }}></i>
                      <span style={{ color: '#666' }}>GST: {supplier.gst_id}</span>
                    </div>
                  )}
                  {supplier.address && (
                    <div style={{ display: 'flex', alignItems: 'start', gap: '8px', fontSize: '13px' }}>
                      <i className="fas fa-map-marker-alt" style={{ color: '#999', width: '16px', marginTop: '2px' }}></i>
                      <span style={{ color: '#666' }}>{supplier.address}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  paddingTop: '16px',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <button
                    onClick={() => router.push(`/dashboard/suppliers/${supplier.id}`)}
                    style={{
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    <i className="fas fa-boxes"></i> Manage Variants
                  </button>
                  <button
                    onClick={() => handleEdit(supplier)}
                    style={{
                      padding: '10px 16px',
                      background: 'white',
                      border: '1px solid #e8d5c4',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      color: '#c19a6b'
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(supplier.id)}
                    style={{
                      padding: '10px 16px',
                      background: 'white',
                      border: '1px solid #fee2e2',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      color: '#ef4444'
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div className="modal-content" style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>
                {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="form-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  {/* User Selection */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                      Link to User Account *
                    </label>
                    <select
                      value={formData.user_id}
                      onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                      required
                      disabled={editingSupplier}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e8d5c4',
                        borderRadius: '8px',
                        fontSize: '14px',
                        background: 'white'
                      }}
                    >
                      <option value="">Select a user...</option>
                      {users
                        .filter(u => u.role === 'supplier' || u.role === 'customer')
                        .map(u => (
                          <option key={u.id} value={u.id}>
                            {u.name} ({u.email}) - {u.role}
                          </option>
                        ))}
                    </select>
                    {editingSupplier && (
                      <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                        User cannot be changed after creation
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      required
                      placeholder="e.g., Premium Prints Co."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e8d5c4',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={formData.contact_person}
                      onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                      placeholder="e.g., John Doe"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e8d5c4',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                      Phone
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g., +91 98765 43210"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e8d5c4',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  {/* GST ID */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                      GST ID
                    </label>
                    <input
                      type="text"
                      value={formData.gst_id}
                      onChange={(e) => setFormData({ ...formData, gst_id: e.target.value })}
                      placeholder="e.g., 29ABCDE1234F1Z5"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e8d5c4',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  {/* Address */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g., Industrial Area, Bengaluru"
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e8d5c4',
                        borderRadius: '8px',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Notes */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Admin notes about this supplier..."
                      rows={2}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e8d5c4',
                        borderRadius: '8px',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Active Status */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                        Active (can access supplier portal)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'end' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingSupplier(null);
                      setFormData({
                        user_id: '',
                        company_name: '',
                        contact_person: '',
                        phone: '',
                        address: '',
                        gst_id: '',
                        notes: '',
                        is_active: true
                      });
                    }}
                    style={{
                      padding: '12px 24px',
                      background: 'white',
                      border: '1px solid #e8d5c4',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      color: '#666'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {editingSupplier ? 'Update Supplier' : 'Create Supplier'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default SuppliersPage;