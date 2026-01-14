'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { useProduct } from '@/context/ProductContext';

const DashboardProductsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { products, fetchProducts, loading, error: contextError } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard/products');
      return;
    }

    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchProducts();
  }, [user]);

  useEffect(() => {
    if (products && products.length > 0) {
      let filtered = products;

      // Apply category filter
      if (categoryFilter !== 'all') {
        filtered = filtered.filter((product: any) =>
          product.category?.toLowerCase() === categoryFilter.toLowerCase()
        );
      }

      // Apply search filter
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
  }, [products, categoryFilter, searchTerm]);

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
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4'
      }}>
        <div className="products-action-bar" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr auto',
          gap: '16px',
          alignItems: 'end'
        }}>
          {/* Search */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#666',
              marginBottom: '8px',
              letterSpacing: '0.3px'
            }}>
              Search Products
            </label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-search" style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                fontSize: '14px'
              }}></i>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  border: '1px solid #e8d5c4',
                  borderRadius: '8px',
                  fontSize: '14px',
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
              fontSize: '13px',
              fontWeight: '600',
              color: '#666',
              marginBottom: '8px',
              letterSpacing: '0.3px'
            }}>
              Filter by Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
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
              onFocus={(e) => {
                e.target.style.borderColor = '#c19a6b';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8d5c4';
              }}
            >
              <option value="all">All Categories</option>
              <option value="Living Room">Living Room</option>
              <option value="Dining Room">Dining Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Office">Office</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={() => router.push('/dashboard/products/new')}
            style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(193, 154, 107, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(193, 154, 107, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(193, 154, 107, 0.2)';
            }}
          >
            <i className="fas fa-plus"></i>
            Add Product
          </button>
        </div>
      </div>

      {/* Products List */}
      {contextError ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
          border: '1px solid #fecaca',
          backgroundColor: '#fee2e2'
        }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: '48px', color: '#dc2626', marginBottom: '16px' }}></i>
          <p style={{ color: '#991b1b', fontSize: '16px', fontWeight: '600' }}>{contextError}</p>
        </div>
      ) : loading ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '64px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #f0f0f0',
            borderTop: '3px solid #c19a6b',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '64px 32px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <i className="fas fa-box-open" style={{ fontSize: '64px', color: '#e8d5c4', marginBottom: '16px' }}></i>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
            No Products Found
          </h3>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
            {categoryFilter === 'all' && !searchTerm
              ? "Get started by adding your first product."
              : "Try adjusting your filters or search term."}
          </p>
          {categoryFilter === 'all' && !searchTerm && (
            <button
              onClick={() => router.push('/dashboard/products/new')}
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {filteredProducts.map((product: any) => (
            <div
              key={product.id}
              onClick={() => router.push(`/dashboard/products/${product.id}`)}
              style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                border: '1px solid #e8d5c4',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(193, 154, 107, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(193, 154, 107, 0.08)';
              }}
            >
              {/* Product Image */}
              <div style={{
                width: '100%',
                height: '200px',
                background: product.image_url
                  ? `url(${product.image_url}) center/cover no-repeat`
                  : 'linear-gradient(135deg, #f8f4f0, #efe9e3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {!product.image_url && (
                  <i className="fas fa-image" style={{ fontSize: '48px', color: '#e8d5c4' }}></i>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '8px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333',
                    margin: 0,
                    flex: 1
                  }}>
                    {product.name}
                  </h3>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    background: 'rgba(193, 154, 107, 0.1)',
                    color: '#c19a6b',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px'
                  }}>
                    {product.category || 'Uncategorized'}
                  </span>
                </div>

                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  margin: '8px 0',
                  lineHeight: '1.5',
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
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <div>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#c19a6b'
                    }}>
                      ₹{product.price?.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/products/${product.id}`);
                      }}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
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
