'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
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
  user_name: string;
  user_email: string;
}

interface Variant {
  id: number;
  product_id: number;
  sku: string | null;
  price: number | string;
  sale_price: number | string | null;
  stock_quantity: number;
  is_active: boolean;
  product_name: string;
  variant_name?: string;
  options?: Array<{
    option_type: string;
    value: string;
    display_value: string;
  }>;
}

interface AssignedVariant {
  id: number;
  variant_id: number;
  supplier_id: number;
  assigned_at: string;
  assigned_by: number | null;
  notes: string | null;
  variant: Variant;
}

const SupplierDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user: currentUser } = useAuth();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [assignedVariants, setAssignedVariants] = useState<AssignedVariant[]>([]);
  const [allVariants, setAllVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [assignmentNotes, setAssignmentNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
  }, [currentUser, params.id]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch supplier details
      const suppliersRes = await fetch('/api/admin/suppliers');
      const suppliersResult = await suppliersRes.json();

      if (suppliersResult.success) {
        const found = suppliersResult.data?.find(
          (s: Supplier) => String(s.id) === String(params.id)
        );
        setSupplier(found);
      }

      // Fetch assigned variants
      const assignedRes = await fetch(`/api/admin/supplier-variants?supplier_id=${params.id}`);
      const assignedResult = await assignedRes.json();

      if (assignedResult.success) {
        setAssignedVariants(assignedResult.data || []);
      }

      // Fetch all available variants (for assignment)
      const variantsRes = await fetch('/api/admin/product-variants');
      const variantsResult = await variantsRes.json();

      if (variantsResult.success) {
        setAllVariants(variantsResult.data || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignVariant = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVariantId) {
      alert('Please select a variant to assign');
      return;
    }

    try {
      const response = await fetch('/api/admin/supplier-variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supplier_id: Number(params.id),
          variant_id: Number(selectedVariantId),
          notes: assignmentNotes
        })
      });

      const result = await response.json();

      if (result.success) {
        setShowAssignModal(false);
        setSelectedVariantId('');
        setAssignmentNotes('');
        fetchData();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Error assigning variant:', err);
      alert('Failed to assign variant');
    }
  };

  const handleRemoveAssignment = async (variantId: number) => {
    if (!confirm('Are you sure you want to remove this variant assignment?')) return;

    try {
      const response = await fetch(
        `/api/admin/supplier-variants?supplier_id=${params.id}&variant_id=${variantId}`,
        { method: 'DELETE' }
      );

      const result = await response.json();

      if (result.success) {
        fetchData();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Error removing assignment:', err);
      alert('Failed to remove assignment');
    }
  };

  const getVariantDisplayName = (variant: Variant) => {
    const options =
      variant.options && variant.options.length > 0
        ? variant.options.map(o => o.display_value).join(', ')
        : variant.variant_name || 'Default';
    return `${variant.product_name || 'Unknown Product'} - ${options}`;
  };

  // Filter variants not already assigned
  const availableVariants = allVariants.filter(
    v => !assignedVariants.some(a => a.variant_id === v.id)
  );

  const filteredAvailableVariants = availableVariants.filter(v =>
    getVariantDisplayName(v).toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <p style={{ marginTop: '16px', color: '#666' }}>Loading supplier details...</p>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <DashboardLayout title="Supplier Not Found" description="">
        <div style={{ textAlign: 'center', padding: '64px' }}>
          <h2 style={{ color: '#333' }}>Supplier not found</h2>
          <button
            onClick={() => router.push('/dashboard/suppliers')}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Back to Suppliers
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .variant-grid { grid-template-columns: 1fr !important; }
          .modal-content { width: 95% !important; padding: 16px !important; }
        }
      `}</style>

      <DashboardLayout
        title={supplier.company_name}
        description="Manage variant assignments for this supplier."
      >
        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard/suppliers')}
          style={{
            padding: '10px 20px',
            background: 'white',
            border: '1px solid #e8d5c4',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            color: '#c19a6b',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-arrow-left"></i> Back to Suppliers
        </button>

        {/* Supplier Info Card */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
                {supplier.company_name}
              </h2>
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                  <i className="fas fa-user" style={{ color: '#999', width: '16px' }}></i>
                  <span style={{ color: '#666' }}>{supplier.user_name}</span>
                  <span style={{ color: '#999' }}>({supplier.user_email})</span>
                </div>
                {supplier.contact_person && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <i className="fas fa-id-card" style={{ color: '#999', width: '16px' }}></i>
                    <span style={{ color: '#666' }}>{supplier.contact_person}</span>
                  </div>
                )}
                {supplier.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <i className="fas fa-phone" style={{ color: '#999', width: '16px' }}></i>
                    <span style={{ color: '#666' }}>{supplier.phone}</span>
                  </div>
                )}
                {supplier.gst_id && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <i className="fas fa-file-alt" style={{ color: '#999', width: '16px' }}></i>
                    <span style={{ color: '#666' }}>GST: {supplier.gst_id}</span>
                  </div>
                )}
                {supplier.address && (
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px', fontSize: '14px' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#999', width: '16px', marginTop: '2px' }}></i>
                    <span style={{ color: '#666' }}>{supplier.address}</span>
                  </div>
                )}
                {supplier.notes && (
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px', fontSize: '14px', marginTop: '4px' }}>
                    <i className="fas fa-sticky-note" style={{ color: '#999', width: '16px', marginTop: '2px' }}></i>
                    <span style={{ color: '#666', fontStyle: 'italic' }}>{supplier.notes}</span>
                  </div>
                )}
              </div>
            </div>
            <div style={{
              padding: '8px 16px',
              background: supplier.is_active ? 'rgba(34, 197, 94, 0.1)' : 'rgba(156, 163, 175, 0.1)',
              color: supplier.is_active ? '#22c55e' : '#6b7280',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {supplier.is_active ? 'ACTIVE' : 'INACTIVE'}
            </div>
          </div>
        </div>

        {/* Assigned Variants Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-boxes" style={{ color: '#c19a6b' }}></i>
              Assigned Variants ({assignedVariants.length})
            </h3>
            <button
              onClick={() => setShowAssignModal(true)}
              style={{
                padding: '10px 20px',
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
              <i className="fas fa-plus"></i> Assign Variant
            </button>
          </div>

          {assignedVariants.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <i className="fas fa-box-open" style={{ fontSize: '48px', color: '#e8d5c4', marginBottom: '12px' }}></i>
              <p style={{ color: '#666', fontSize: '14px' }}>
                No variants assigned yet. Assign variants for this supplier to manage.
              </p>
            </div>
          ) : (
            <div className="variant-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '12px'
            }}>
              {assignedVariants.map((assigned) => (
                <div
                  key={assigned.id}
                  style={{
                    padding: '16px',
                    background: assigned.variant?.is_active ? 'rgba(193, 154, 107, 0.05)' : 'rgba(156, 163, 175, 0.05)',
                    borderRadius: '8px',
                    border: `1px solid ${assigned.variant?.is_active ? 'rgba(193, 154, 107, 0.2)' : '#f0f0f0'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                        {getVariantDisplayName(assigned.variant)}
                      </div>
                      {assigned.variant?.sku && (
                        <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
                          SKU: {assigned.variant.sku}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#666' }}>
                        <span>
                          <i className="fas fa-rupee-sign"></i> {assigned.variant?.price != null ? Number(assigned.variant.price).toFixed(2) : '—'}
                        </span>
                        <span>
                          <i className="fas fa-cubes"></i> Stock: {assigned.variant?.stock_quantity || 0}
                        </span>
                      </div>
                      {assigned.notes && (
                        <div style={{ fontSize: '12px', color: '#999', marginTop: '8px', fontStyle: 'italic' }}>
                          Note: {assigned.notes}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveAssignment(assigned.variant_id)}
                      style={{
                        padding: '6px 12px',
                        background: 'white',
                        border: '1px solid #fee2e2',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        color: '#ef4444'
                      }}
                    >
                      <i className="fas fa-times"></i> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assign Variant Modal */}
        {showAssignModal && (
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
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
                Assign Variant to {supplier.company_name}
              </h2>

              <form onSubmit={handleAssignVariant}>
                {/* Search */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                    Search Variants
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by product name or SKU..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e8d5c4',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {/* Variant Selection */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                    Select Variant *
                  </label>
                  <select
                    value={selectedVariantId}
                    onChange={(e) => setSelectedVariantId(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e8d5c4',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    <option value="">Choose a variant...</option>
                    {filteredAvailableVariants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {getVariantDisplayName(variant)}
                        {variant.sku ? ` (${variant.sku})` : ''}
                        {variant.sale_price ? ` - ₹${variant.sale_price}` : ` - ₹${variant.price}`}
                      </option>
                    ))}
                  </select>
                  {filteredAvailableVariants.length === 0 && (
                    <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
                      No available variants to assign
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                    Assignment Notes
                  </label>
                  <textarea
                    value={assignmentNotes}
                    onChange={(e) => setAssignmentNotes(e.target.value)}
                    placeholder="e.g., Primary supplier for this variant"
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

                {/* Info */}
                <div style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <p style={{ fontSize: '12px', color: '#3b82f6' }}>
                    <i className="fas fa-info-circle"></i>
                    Same variant can be assigned to multiple suppliers. Each supplier will see and manage their own inventory view.
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'end' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAssignModal(false);
                      setSelectedVariantId('');
                      setAssignmentNotes('');
                      setSearchTerm('');
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
                    disabled={!selectedVariantId}
                    style={{
                      padding: '12px 24px',
                      background: selectedVariantId
                        ? 'linear-gradient(135deg, #c19a6b, #a67c52)'
                        : '#e8d5c4',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: selectedVariantId ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Assign Variant
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

export default SupplierDetailPage;