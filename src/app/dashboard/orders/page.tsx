'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

const DashboardOrdersPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard/orders');
      return;
    }

    if (user.role !== 'admin' && user.role !== 'moderator') {
      router.push('/dashboard');
      return;
    }

    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (data.success) {
        setOrders(Array.isArray(data.data) ? data.data : []);
      } else {
        setOrders([]);
      }
    } catch (err: unknown) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

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
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading orders...</p>
        </div>
      </div>
    );
  }

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .orders-filter-bar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .orders-filter-bar button {
            width: 100% !important;
          }
          .order-card-content {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .order-card-right {
            text-align: left !important;
          }
        }
      `}</style>
      <DashboardLayout
      title="Order Management"
      description="View and manage customer orders, track shipping, and update order status."
    >
      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4'
      }}>
        <div className="orders-filter-bar" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#666'
          }}>
            Filter by Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              border: '1px solid #e8d5c4',
              borderRadius: '6px',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div style={{ flex: 1 }}></div>
          <button
            onClick={fetchOrders}
            style={{
              padding: '6px 16px',
              background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <i className="fas fa-sync-alt"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
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
          <p style={{ marginTop: '12px', color: '#666', fontSize: '13px' }}>Loading orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '32px 16px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <i className="fas fa-shopping-bag" style={{ fontSize: '40px', color: '#e8d5c4', marginBottom: '12px' }}></i>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>
            No Orders Found
          </h3>
          <p style={{ color: '#666', fontSize: '13px' }}>
            {statusFilter === 'all' ? 'No orders have been placed yet.' : `No ${statusFilter} orders found.`}
          </p>
        </div>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          {filteredOrders.map((order: any, index: number) => (
            <div
              key={order.id}
              style={{
                padding: '12px 16px',
                borderBottom: index < filteredOrders.length - 1 ? '1px solid #f0f0f0' : 'none',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(193, 154, 107, 0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
              onClick={() => router.push(`/dashboard/orders/${order.id}`)}
            >
              <div className="order-card-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                    Order #{order.id}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
                    Customer: {order.user_email || 'N/A'}
                  </p>
                  <p style={{ fontSize: '12px', color: '#666' }}>
                    Date: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-card-right" style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    background: order.status === 'delivered' ? 'rgba(34, 197, 94, 0.1)' :
                               order.status === 'shipped' ? 'rgba(59, 130, 246, 0.1)' :
                               order.status === 'processing' ? 'rgba(245, 158, 11, 0.1)' :
                               order.status === 'cancelled' ? 'rgba(239, 68, 68, 0.1)' :
                               'rgba(156, 163, 175, 0.1)',
                    color: order.status === 'delivered' ? '#16a34a' :
                           order.status === 'shipped' ? '#3b82f6' :
                           order.status === 'processing' ? '#f59e0b' :
                           order.status === 'cancelled' ? '#ef4444' :
                           '#6b7280',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    {order.status || 'Pending'}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#c19a6b' }}>
                    ₹{order.total?.toLocaleString() || '0'}
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

export default DashboardOrdersPage;
