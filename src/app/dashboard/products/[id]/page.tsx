'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import ProductImageManager from '@/components/ProductImageManager';
import ProductVariantManager from '@/components/ProductVariantManager';
import { RichTextEditor } from '@/components/RichTextEditor';

interface ProductImage {
  id: string;
  url: string;
  cloudflare_image_id: string;
  is_primary: boolean;
  display_order: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  is_active: boolean;
  children?: Category[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  category?: string;
  subcategory?: string;
  stock_quantity?: number;
  images: ProductImage[];
  primary_image?: string;
  status?: 'draft' | 'pending_review' | 'published' | 'rejected' | 'archived';
  reviewer_comment?: string;
  brand?: string;
  delivery_time?: string;
  highlights?: string;
  description_html?: string;
  faqs_html?: string;
  warranty_policy?: string;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sale_price: '',
    category: '',
    subcategory: '',
    brand: '',
    delivery_time: '',
  });
  const [richFields, setRichFields] = useState({
    highlights: '',
    description_html: '',
    faqs_html: '',
    warranty_policy: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Maker-checker workflow state
  const [workflowLoading, setWorkflowLoading] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectComment, setRejectComment] = useState('');

  useEffect(() => {
    params.then((p) => setProductId(p.id));
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard/products');
      return;
    }

    if (user.role !== 'admin' && user.role !== 'moderator') {
      router.push('/dashboard');
      return;
    }

    loadCategories();

    if (productId) {
      loadProduct();
    }
  }, [user, productId]);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadProduct = async () => {
    if (!productId) return;

    // If productId is "new", we're creating a new product, not loading one
    if (productId === 'new') {
      setLoadingProduct(false);
      return;
    }

    try {
      setLoadingProduct(true);
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();

      if (data.success) {
        setProduct(data.data);
        setFormData({
          name: data.data.name,
          description: data.data.description,
          price: data.data.price.toString(),
          sale_price: data.data.sale_price?.toString() || '',
          category: data.data.category || '',
          subcategory: data.data.subcategory || '',
          brand: data.data.brand || '',
          delivery_time: data.data.delivery_time || '',
        });
        setRichFields({
          highlights: data.data.highlights || '',
          description_html: data.data.description_html || '',
          faqs_html: data.data.faqs_html || '',
          warranty_policy: data.data.warranty_policy || '',
        });
      } else {
        setError(data.error || 'Failed to load product');
      }
    } catch (err: any) {
      console.error('Error loading product:', err);
      setError(err.message || 'Failed to load product');
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Clear subcategory when category changes
    if (name === 'category') {
      setFormData({
        ...formData,
        category: value,
        subcategory: '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const isNewProduct = productId === 'new';
      const url = isNewProduct ? '/api/products' : `/api/products/${productId}`;
      const method = isNewProduct ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
          category: formData.category,
          subcategory: formData.subcategory,
          brand: formData.brand || null,
          delivery_time: formData.delivery_time || null,
          highlights: richFields.highlights || null,
          description_html: richFields.description_html || null,
          faqs_html: richFields.faqs_html || null,
          warranty_policy: richFields.warranty_policy || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (isNewProduct) {
          // Redirect to the edit page with the new product ID
          setSuccessMessage('Product created successfully! Redirecting...');
          setTimeout(() => {
            router.push(`/dashboard/products/${data.data.id}`);
          }, 1000);
        } else {
          setSuccessMessage('Product updated successfully!');
          loadProduct();
          setTimeout(() => setSuccessMessage(null), 3000);
        }
      } else {
        setError(data.error || `Failed to ${isNewProduct ? 'create' : 'update'} product`);
      }
    } catch (err: any) {
      console.error('Error saving product:', err);
      setError(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!productId) return;

    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Product deleted successfully');
        setTimeout(() => {
          router.push('/dashboard/products');
        }, 1000);
      } else {
        setError(data.error || 'Failed to delete product');
      }
    } catch (err: any) {
      console.error('Error deleting product:', err);
      setError(err.message || 'Failed to delete product');
    }
  };

  const handleWorkflow = async (action: 'submit' | 'approve' | 'reject' | 'unpublish', comment?: string) => {
    if (!productId || productId === 'new') return;
    setWorkflowLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await fetch(`/api/products/${productId}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: comment || '' }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(data.message);
        setRejectModalOpen(false);
        setRejectComment('');
        loadProduct();
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setError(data.error || 'Action failed');
      }
    } catch (err: any) {
      setError(err.message || 'Action failed');
    } finally {
      setWorkflowLoading(false);
    }
  };

  if (!user || loadingProduct) {
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
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <DashboardLayout title="Error" description="Failed to load product">
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '64px 32px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: '64px', color: '#ef4444', marginBottom: '16px' }}></i>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
            Error Loading Product
          </h3>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
            {error}
          </p>
          <button
            onClick={() => router.push('/dashboard/products')}
            style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Products
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .product-form-grid {
            grid-template-columns: 1fr !important;
          }
          .action-bar {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .action-bar button {
            width: 100% !important;
          }
        }
      `}</style>
      <DashboardLayout
        title={productId === 'new' ? 'Create New Product' : `Edit Product${product ? `: ${product.name}` : ''}`}
        description={productId === 'new' ? 'Add a new product to your catalog' : 'Update product details, manage images, and configure settings.'}
      >
      {/* Action Bar */}
      <div className="action-bar" style={{
        background: 'white',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => router.push('/dashboard/products')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'transparent',
            color: '#666',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(193, 154, 107, 0.05)';
            e.currentTarget.style.color = '#c19a6b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#666';
          }}
        >
          <i className="fas fa-arrow-left"></i>
          Back to Products
        </button>

        {productId !== 'new' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Status pill */}
            {product && (() => {
              const s = product.status || 'draft';
              const cfg: Record<string, { bg: string; color: string; label: string }> = {
                draft:          { bg: '#f3f4f6', color: '#6b7280',  label: 'Draft' },
                pending_review: { bg: '#fef3c7', color: '#d97706',  label: '⏳ In Review' },
                published:      { bg: '#dcfce7', color: '#16a34a',  label: '✓ Published' },
                rejected:       { bg: '#fee2e2', color: '#dc2626',  label: '✕ Rejected' },
                archived:       { bg: '#f3f4f6', color: '#9ca3af',  label: 'Archived' },
              };
              const c = cfg[s] || cfg.draft;
              return (
                <span style={{ padding: '4px 12px', background: c.bg, color: c.color, borderRadius: 20, fontSize: '12px', fontWeight: 700 }}>
                  {c.label}
                </span>
              );
            })()}

            {/* Maker: Submit for Review (draft or rejected) */}
            {product && (product.status === 'draft' || product.status === 'rejected') && (
              <button
                onClick={() => handleWorkflow('submit')}
                disabled={workflowLoading}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'linear-gradient(135deg, #d97706, #b45309)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                <i className="fas fa-paper-plane"></i>
                Submit for Review
              </button>
            )}

            {/* Admin: Approve / Reject (pending_review) */}
            {product && product.status === 'pending_review' && user?.role === 'admin' && (
              <>
                <button
                  onClick={() => handleWorkflow('approve')}
                  disabled={workflowLoading}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                >
                  <i className="fas fa-check"></i>
                  Approve & Publish
                </button>
                <button
                  onClick={() => setRejectModalOpen(true)}
                  disabled={workflowLoading}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'transparent', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                >
                  <i className="fas fa-times"></i>
                  Reject
                </button>
              </>
            )}

            {/* Admin: Unpublish (published → draft) */}
            {product && product.status === 'published' && user?.role === 'admin' && (
              <button
                onClick={() => handleWorkflow('unpublish')}
                disabled={workflowLoading}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'transparent', color: '#d97706', border: '1px solid #fcd34d', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                <i className="fas fa-eye-slash"></i>
                Unpublish
              </button>
            )}

            {/* Admin: Delete */}
            {user?.role === 'admin' && (
              <button
                onClick={handleDelete}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'transparent', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ef4444'; }}
              >
                <i className="fas fa-trash"></i>
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {/* Reject modal */}
      {rejectModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Reject Product</h3>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>Provide feedback to the maker explaining what needs to be fixed.</p>
            <textarea
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              placeholder="e.g. Images are missing, description needs more detail..."
              rows={4}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', resize: 'vertical', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'flex-end' }}>
              <button onClick={() => { setRejectModalOpen(false); setRejectComment(''); }} style={{ padding: '8px 16px', background: 'transparent', color: '#6b7280', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button
                onClick={() => handleWorkflow('reject', rejectComment)}
                disabled={!rejectComment.trim() || workflowLoading}
                style={{ padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', opacity: !rejectComment.trim() ? 0.5 : 1 }}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {successMessage && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <i className="fas fa-check-circle" style={{ fontSize: '20px', color: '#16a34a' }}></i>
          <p style={{ color: '#16a34a', fontSize: '14px', fontWeight: '600', margin: 0 }}>
            {successMessage}
          </p>
        </div>
      )}

      {error && product && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: '20px', color: '#ef4444' }}></i>
          <p style={{ color: '#ef4444', fontSize: '14px', fontWeight: '600', margin: 0 }}>
            {error}
          </p>
        </div>
      )}

      {/* Reviewer comment banner — shown to maker when rejected or approved with notes */}
      {product?.reviewer_comment && (
        <div style={{
          background: product.status === 'rejected' ? 'rgba(239,68,68,0.06)' : 'rgba(34,197,94,0.06)',
          border: `1px solid ${product.status === 'rejected' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}>
          <i className={`fas ${product.status === 'rejected' ? 'fa-comment-slash' : 'fa-comment-check'}`}
             style={{ fontSize: '16px', color: product.status === 'rejected' ? '#dc2626' : '#16a34a', marginTop: '2px' }} />
          <div>
            <p style={{ fontSize: '12px', fontWeight: '700', color: product.status === 'rejected' ? '#dc2626' : '#16a34a', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {product.status === 'rejected' ? 'Reviewer Feedback' : 'Reviewer Note'}
            </p>
            <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.5 }}>{product.reviewer_comment}</p>
          </div>
        </div>
      )}

      {/* Product Details Form */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <i className="fas fa-edit" style={{ fontSize: '20px', color: '#c19a6b' }}></i>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>
            Product Details
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Product Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '8px'
              }}>
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #e8d5c4',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '8px'
              }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #e8d5c4',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Pricing Section */}
            <div style={{
              background: 'rgba(193, 154, 107, 0.05)',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #e8d5c4'
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-tags" style={{ color: '#c19a6b' }}></i>
                Pricing
              </h4>
              <div className="product-form-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '8px'
                  }}>
                    Regular Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #e8d5c4',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Base price (shown as strikethrough when on sale)</p>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '8px'
                  }}>
                    Sale Price (₹)
                  </label>
                  <input
                    type="number"
                    name="sale_price"
                    value={formData.sale_price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="Discounted price"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #e8d5c4',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Discounted price (shown if less than regular price)</p>
                </div>
              </div>
              {formData.price && formData.sale_price && parseFloat(formData.price) > parseFloat(formData.sale_price) && (
                <div style={{
                  marginTop: '12px',
                  padding: '8px 12px',
                  background: 'rgba(231, 76, 60, 0.1)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <i className="fas fa-percent" style={{ color: '#e74c3c' }}></i>
                  <span style={{ fontSize: '13px', color: '#e74c3c', fontWeight: '600' }}>
                    Discount: {Math.round(((parseFloat(formData.price) - parseFloat(formData.sale_price)) / parseFloat(formData.price)) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Category & Subcategory */}
            <div style={{
              background: 'rgba(193, 154, 107, 0.05)',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #e8d5c4'
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-folder" style={{ color: '#c19a6b' }}></i>
                Category
              </h4>
              <div className="product-form-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '8px'
                  }}>
                    Parent Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={loadingCategories}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #e8d5c4',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: loadingCategories ? 'wait' : 'pointer',
                      background: 'white'
                    }}
                  >
                    <option value="">
                      {loadingCategories ? 'Loading...' : 'Select category'}
                    </option>
                    {categories.filter(c => c.parent_id === null && c.is_active).map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '8px'
                  }}>
                    Subcategory
                  </label>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    disabled={!formData.category || loadingCategories}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #e8d5c4',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: !formData.category || loadingCategories ? 'not-allowed' : 'pointer',
                      background: 'white',
                      opacity: !formData.category ? 0.6 : 1
                    }}
                  >
                    <option value="">
                      {!formData.category ? 'Select category first' : 'Select subcategory (optional)'}
                    </option>
                    {(() => {
                      const selectedParent = categories.find(c => c.name === formData.category && c.parent_id === null);
                      if (!selectedParent) return null;
                      return (selectedParent.children || [])
                        .filter(sub => sub.is_active)
                        .map(sub => (
                          <option key={sub.id} value={sub.name}>{sub.name}</option>
                        ));
                    })()}
                  </select>
                </div>
              </div>
            </div>

            {/* Brand & Delivery */}
            <div style={{
              background: 'rgba(193, 154, 107, 0.05)',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #e8d5c4'
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-tag" style={{ color: '#c19a6b' }}></i>
                Brand &amp; Delivery
              </h4>
              <div className="product-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="e.g. Nilkamal, Godrej"
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #e8d5c4', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>Delivery Time</label>
                  <input
                    type="text"
                    name="delivery_time"
                    value={formData.delivery_time}
                    onChange={handleInputChange}
                    placeholder="e.g. 5–7 business days"
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #e8d5c4', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* Rich Text: Highlights */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                Product Highlights <span style={{ fontWeight: 400, color: '#999' }}>(rich text)</span>
              </label>
              <RichTextEditor
                value={richFields.highlights}
                onChange={(html) => setRichFields(f => ({ ...f, highlights: html }))}
                placeholder="Add key highlights as a bullet list…"
                minHeight={120}
              />
            </div>

            {/* Rich Text: Description (HTML) */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                Rich Description <span style={{ fontWeight: 400, color: '#999' }}>(rich text — shown on product page)</span>
              </label>
              <RichTextEditor
                value={richFields.description_html}
                onChange={(html) => setRichFields(f => ({ ...f, description_html: html }))}
                placeholder="Detailed product description with formatting…"
                minHeight={160}
              />
            </div>

            {/* Rich Text: FAQs */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                FAQs <span style={{ fontWeight: 400, color: '#999' }}>(rich text)</span>
              </label>
              <RichTextEditor
                value={richFields.faqs_html}
                onChange={(html) => setRichFields(f => ({ ...f, faqs_html: html }))}
                placeholder="Q: How do I assemble? &#10;A: …"
                minHeight={140}
              />
            </div>

            {/* Rich Text: Warranty, Return & Exchange Policy */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                Warranty, Return &amp; Exchange Policy <span style={{ fontWeight: 400, color: '#999' }}>(rich text)</span>
              </label>
              <RichTextEditor
                value={richFields.warranty_policy}
                onChange={(html) => setRichFields(f => ({ ...f, warranty_policy: html }))}
                placeholder="e.g. 2-year warranty. Returns accepted within 7 days…"
                minHeight={140}
              />
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px' }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: '10px 32px',
                  background: saving ? '#999' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(193, 154, 107, 0.2)'
                }}
              >
                {saving ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #ffffff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }}></div>
                    {productId === 'new' ? 'Creating...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <i className={productId === 'new' ? 'fas fa-plus' : 'fas fa-save'}></i>
                    {productId === 'new' ? 'Create Product' : 'Save Changes'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Product Images */}
      {product && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <ProductImageManager
            productId={product.id}
            images={product.images}
            onImagesChange={loadProduct}
          />
        </div>
      )}

      {/* Product Variants */}
      {product && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <ProductVariantManager productId={product.id} />
        </div>
      )}
    </DashboardLayout>
    </>
  );
}
