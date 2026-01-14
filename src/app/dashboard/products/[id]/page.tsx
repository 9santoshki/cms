'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import ProductImageManager from '@/components/ProductImageManager';

interface ProductImage {
  id: string;
  url: string;
  cloudflare_image_id: string;
  is_primary: boolean;
  display_order: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  sale_price?: number;
  category?: string;
  stock_quantity?: number;
  images: ProductImage[];
  primary_image?: string;
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
    original_price: '',
    sale_price: '',
    category: '',
    stock_quantity: '',
  });

  useEffect(() => {
    params.then((p) => setProductId(p.id));
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard/products');
      return;
    }

    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    if (productId) {
      loadProduct();
    }
  }, [user, productId]);

  const loadProduct = async () => {
    if (!productId) return;

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
          original_price: data.data.original_price?.toString() || '',
          sale_price: data.data.sale_price?.toString() || '',
          category: data.data.category || '',
          stock_quantity: data.data.stock_quantity?.toString() || '0',
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          original_price: formData.original_price ? parseFloat(formData.original_price) : null,
          sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
          category: formData.category,
          stock_quantity: parseInt(formData.stock_quantity) || 0,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Product updated successfully!');
        loadProduct();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(data.error || 'Failed to update product');
      }
    } catch (err: any) {
      console.error('Error updating product:', err);
      setError(err.message || 'Failed to update product');
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
        title={`Edit Product${product ? `: ${product.name}` : ''}`}
        description="Update product details, manage images, and configure settings."
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

        <button
          onClick={handleDelete}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'transparent',
            color: '#ef4444',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#ef4444';
          }}
        >
          <i className="fas fa-trash"></i>
          Delete Product
        </button>
      </div>

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
                gridTemplateColumns: '1fr 1fr 1fr',
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
                    Current Price (₹) *
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
                  <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>The primary price used</p>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '8px'
                  }}>
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    name="original_price"
                    value={formData.original_price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="Full retail price"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #e8d5c4',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Shown as strikethrough price</p>
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
                  <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Displayed price (falls back to Current Price)</p>
                </div>
              </div>
              {formData.original_price && formData.sale_price && parseFloat(formData.original_price) > parseFloat(formData.sale_price) && (
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
                    Discount: {Math.round(((parseFloat(formData.original_price) - parseFloat(formData.sale_price)) / parseFloat(formData.original_price)) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Stock and Category */}
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
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleInputChange}
                  min="0"
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

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#666',
                  marginBottom: '8px'
                }}>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #e8d5c4',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'white'
                  }}
                >
                  <option value="">Select category</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Dining Room">Dining Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Office">Office</option>
                </select>
              </div>
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
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    Save Changes
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
    </DashboardLayout>
    </>
  );
}
