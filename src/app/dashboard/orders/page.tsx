'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { LoadingSpinner, EmptyState, STATUS_COLORS } from '@/components/DashboardShared';

const DashboardOrdersPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!user) { router.push('/auth?redirect=/dashboard/orders'); return; }
    if (user.role !== 'admin' && user.role !== 'moderator') { router.push('/dashboard'); return; }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data.success && Array.isArray(data.data) ? data.data : []);
    } catch (err) { setOrders([]); }
    finally { setLoading(false); }
  };

  if (!user || loading) return <LoadingSpinner />;

  const filteredOrders = statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter);

  return (
    <DashboardLayout title="Orders" description="View and manage customer orders.">
      {/* Filter bar */}
      <div className="orders-filter-bar" style={{ background: 'white', borderRadius: 8, padding: '10px 16px', marginBottom: 12, border: '1px solid #e8d5c4', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: '6px 10px', border: '1px solid #e8d5c4', borderRadius: 6, fontSize: 12, minHeight: '44px' }}>
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <span className="orders-count" style={{ fontSize: 12, color: '#666' }}>{filteredOrders.length} orders</span>
        <button onClick={fetchOrders} className="orders-refresh-btn" style={{ marginLeft: 'auto', padding: '6px 12px', background: '#c19a6b', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer', minHeight: '44px' }}>
          <i className="fas fa-sync-alt"></i> Refresh
        </button>
      </div>

      {/* Table */}
      {filteredOrders.length === 0 ? <EmptyState icon="fa-shopping-bag" title="No Orders" /> : (
        <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e8d5c4', overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8f4f0', borderBottom: '1px solid #e8d5c4' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Order #</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600 }}>Items</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>Total</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                  style={{ cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(193,154,107,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>#{order.id}</td>
                  <td style={{ padding: '10px 12px', color: '#666' }}>{order.user_email || 'N/A'}</td>
                  <td style={{ padding: '10px 12px', color: '#888', fontSize: 12 }}>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>{order.items?.length || 0}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
                      background: STATUS_COLORS[order.status]?.bg || '#6b728015', color: STATUS_COLORS[order.status]?.color || '#6b7280' }}>
                      {order.status || 'pending'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#c19a6b' }}>₹{order.total?.toLocaleString()}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}><i className="fas fa-chevron-right" style={{ color: '#ccc' }}></i></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          .orders-filter-bar {
            padding: 8px 12px !important;
          }
        }
        @media (max-width: 480px) {
          .orders-filter-bar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .orders-refresh-btn {
            margin-left: 0 !important;
            width: 100% !important;
          }
          .orders-count {
            text-align: center;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default DashboardOrdersPage;