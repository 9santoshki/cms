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
  is_active: boolean;
}

const DashboardProductsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [contextError, setContextError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    setContextError(null);
    try {
      const res = await fetch('/api/admin/products?limit=500');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data.products ?? []);
      } else {
        setContextError(data.error || 'Failed to load products');
      }
    } catch (err) {
      setContextError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard/products');
      return;
    }

    if (user.role !== 'admin' && user.role !== 'moderator') {
      router.push('/dashboard');
      return;
    }

    fetchProducts();
    fetchCategories();
  }, [user]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) {
        // Only parent categories for the filter
        setCategories(data.data.filter((c: Category) => c.parent_id === null && c.is_active));
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      let filtered = products;

      if (statusFilter !== 'all') {
        filtered = filtered.filter((product: any) =>
          (product.status || 'draft') === statusFilter
        );
      }

      if (categoryFilter !== 'all') {
        filtered = filtered.filter((product: any) =>
          product.category?.toLowerCase() === categoryFilter.toLowerCase()
        );
      }

      if (searchTerm) {
        filtered = filtered.filter((product: any) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [products, categoryFilter, statusFilter, searchTerm]);

  if (!user || loading) {
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
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .products-action-bar {
            grid-template-columns: 1fr !important;
          }
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <DashboardLayout
        title="Product Management"
        description="Manage your product catalog, add new items, and update existing products."
      >
      {/* Actions Bar */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4'
      }}>
        <div className="products-action-bar" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr auto',
          gap: '12px',
          alignItems: 'end'
        }}>
          {/* Search */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#666',
              marginBottom: '4px',
              letterSpacing: '0.3px'
            }}>
              Search Products
            </label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-search" style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                fontSize: '12px'
              }}></i>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 32px',
                  border: '1px solid #e8d5c4',
                  borderRadius: '6px',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#c19a6b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(193, 154, 107, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e8d5c4';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#666',
              marginBottom: '4px',
              letterSpacing: '0.3px'
            }}>
              Filter by Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e8d5c4',
                borderRadius: '6px',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#c19a6b';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8d5c4';
              }}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Add Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => router.push('/dashboard/products/bulk-upload')}
            style={{
              padding: '8px 16px',
              background: 'white',
              color: '#c19a6b',
              border: '1px solid #e8d5c4',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c19a6b';
              e.currentTarget.style.background = 'rgba(193,154,107,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e8d5c4';
              e.currentTarget.style.background = 'white';
            }}
          >
            <i className="fas fa-file-csv"></i>
            Bulk Upload
          </button>
          <button
            onClick={() => router.push('/dashboard/products/new')}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(193, 154, 107, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 3px 8px rgba(193, 154, 107, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(193, 154, 107, 0.2)';
            }}
          >
            <i className="fas fa-plus"></i>
            Add Product
          </button>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      {products && products.length > 0 && (() => {
        const counts: Record<string, number> = { all: products.length };
        products.forEach((p: any) => {
          const s = p.status || 'draft';
          counts[s] = (counts[s] || 0) + 1;
        });
        const tabs = [
          { key: 'all',           label: 'All' },
          { key: 'pending_review',label: 'In Review', color: '#d97706', bg: '#fef3c7' },
          { key: 'draft',         label: 'Draft',     color: '#6b7280', bg: '#f3f4f6' },
          { key: 'published',     label: 'Published', color: '#16a34a', bg: '#dcfce7' },
          { key: 'rejected',      label: 'Rejected',  color: '#dc2626', bg: '#fee2e2' },
          { key: 'archived',      label: 'Archived',  color: '#9ca3af', bg: '#f3f4f6' },
        ].filter(t => t.key === 'all' || counts[t.key]);
        return (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {tabs.map(tab => {
              const active = statusFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  style={{
                    padding: '5px 12px', borderRadius: 20, fontSize: '12px', fontWeight: 600,
                    cursor: 'pointer', border: 'none',
                    background: active ? (tab.bg || 'linear-gradient(135deg,#c19a6b,#a67c52)') : '#f3f4f6',
                    color: active ? (tab.color || '#7c5c32') : '#6b7280',
                    boxShadow: active ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {tab.label}
                  {counts[tab.key] !== undefined && (
                    <span style={{ marginLeft: '5px', opacity: 0.75 }}>({counts[tab.key]})</span>
                  )}
                </button>
              );
            })}
          </div>
        );
      })()}

      {/* Products List */}
      {contextError ? (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '16px',
          textAlign: 'center',
          border: '1px solid #fecaca',
          backgroundColor: '#fee2e2'
        }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: '32px', color: '#dc2626', marginBottom: '8px' }}></i>
          <p style={{ color: '#991b1b', fontSize: '14px', fontWeight: '600' }}>{contextError}</p>
        </div>
      ) : loading ? (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            border: '3px solid #f0f0f0',
            borderTop: '3px solid #c19a6b',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '12px', color: '#666', fontSize: '13px' }}>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '32px 16px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <i className="fas fa-box-open" style={{ fontSize: '40px', color: '#e8d5c4', marginBottom: '12px' }}></i>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
            No Products Found
          </h3>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '12px' }}>
            {categoryFilter === 'all' && !searchTerm
              ? "Get started by adding your first product."
              : "Try adjusting your filters or search term."}
          </p>
          {categoryFilter === 'all' && !searchTerm && (
            <button
              onClick={() => router.push('/dashboard/products/new')}
              style={{
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
                gap: '6px'
              }}
            >
              <i className="fas fa-plus"></i>
              Add Your First Product
            </button>
          )}
        </div>
      ) : (
        <div className="products-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px'
        }}>
          {filteredProducts.map((product: any) => (
            <div
              key={product.id}
              onClick={() => router.push(`/dashboard/products/${product.id}`)}
              style={{
                background: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
                border: '1px solid #e8d5c4',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(193, 154, 107, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(193, 154, 107, 0.08)';
              }}
            >
              {/* Product Image */}
              <div style={{
                width: '100%',
                height: '140px',
                background: 'linear-gradient(135deg, #f8f4f0, #efe9e3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}>
                {(product.primary_image || product.image_url) ? (
                  <img
                    src={product.primary_image || product.image_url}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <i className="fas fa-image" style={{ fontSize: '32px', color: '#e8d5c4' }}></i>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: '12px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '4px'
                }}>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333',
                    margin: 0,
                    flex: 1
                  }}>
                    {product.name}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      background: 'rgba(193, 154, 107, 0.1)',
                      color: '#c19a6b',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px'
                    }}>
                      {product.category || 'Uncategorized'}
                    </span>
                    {(() => {
                      const s = product.status || 'draft';
                      const cfg: Record<string, { bg: string; color: string; label: string }> = {
                        draft:          { bg: '#f3f4f6', color: '#6b7280', label: 'Draft' },
                        pending_review: { bg: '#fef3c7', color: '#d97706', label: 'In Review' },
                        published:      { bg: '#dcfce7', color: '#16a34a', label: 'Published' },
                        rejected:       { bg: '#fee2e2', color: '#dc2626', label: 'Rejected' },
                        archived:       { bg: '#f3f4f6', color: '#9ca3af', label: 'Archived' },
                      };
                      const c = cfg[s] || cfg.draft;
                      return (
                        <span style={{ padding: '2px 8px', background: c.bg, color: c.color, borderRadius: '4px', fontSize: '10px', fontWeight: '600' }}>
                          {c.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <p style={{
                  fontSize: '12px',
                  color: '#666',
                  margin: '4px 0',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {product.description || 'No description available'}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '8px',
                  paddingTop: '8px',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <div>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#c19a6b'
                    }}>
                      ₹{product.price?.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/products/${product.id}`);
                      }}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        border: '1px solid #e8d5c4',
                        background: 'white',
                        color: '#c19a6b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#c19a6b';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#c19a6b';
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
    </>
  );
};

export default DashboardProductsPage;
