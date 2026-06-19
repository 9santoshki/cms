'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { LoadingSpinner, EmptyState, STATUS_COLORS } from '@/components/DashboardShared';

function num(v: any): number | null {
  const n = parseFloat(v);
  return isNaN(n) ? null : n;
}

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

      {filteredOrders.length === 0 ? <EmptyState icon="fa-shopping-bag" title="No Orders" /> : (<>

        {/* Desktop table */}
        <div className="orders-table-wrap" style={{ background: 'white', borderRadius: 8, border: '1px solid #e8d5c4', overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8f4f0', borderBottom: '1px solid #e8d5c4' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Order #</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600 }}>Items</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>Revenue</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>Input Cost</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>Profit</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => {
                const revenue = num(order.total_amount);
                const costPrice = num(order.cost_price);
                const cashExpense = num(order.cash_expense);
                const hasCost = costPrice !== null || cashExpense !== null;
                const inputCost = (costPrice ?? 0) + (cashExpense ?? 0);
                const profit = hasCost && revenue !== null ? revenue - inputCost : null;
                return (
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
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#c19a6b' }}>
                      {revenue !== null ? `₹${revenue.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#555' }}>
                      {hasCost ? `₹${inputCost.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600,
                      color: profit === null ? '#aaa' : profit >= 0 ? '#16a34a' : '#dc2626' }}>
                      {profit === null ? '—' : `₹${profit.toLocaleString('en-IN')}`}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}><i className="fas fa-chevron-right" style={{ color: '#ccc' }}></i></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="orders-cards">
          {filteredOrders.map(order => {
            const revenue = num(order.total_amount);
            const costPrice = num(order.cost_price);
            const cashExpense = num(order.cash_expense);
            const hasCost = costPrice !== null || cashExpense !== null;
            const inputCost = (costPrice ?? 0) + (cashExpense ?? 0);
            const profit = hasCost && revenue !== null ? revenue - inputCost : null;
            return (
              <div key={order.id} onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                style={{ background: 'white', borderRadius: 8, border: '1px solid #e8d5c4', padding: '12px 14px', marginBottom: 8, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>#{order.id}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                    background: STATUS_COLORS[order.status]?.bg || '#6b728015', color: STATUS_COLORS[order.status]?.color || '#6b7280' }}>
                    {order.status || 'pending'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 2 }}>{order.user_email || 'N/A'}</div>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>
                  {new Date(order.created_at).toLocaleDateString()} · {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
                  <div style={{ background: '#f8f4f0', borderRadius: 6, padding: '6px 8px' }}>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 2 }}>Revenue</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#c19a6b' }}>
                      {revenue !== null ? `₹${revenue.toLocaleString('en-IN')}` : '—'}
                    </div>
                  </div>
                  <div style={{ background: '#f8f4f0', borderRadius: 6, padding: '6px 8px' }}>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 2 }}>Input Cost</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>
                      {hasCost ? `₹${inputCost.toLocaleString('en-IN')}` : '—'}
                    </div>
                  </div>
                  <div style={{ background: '#f8f4f0', borderRadius: 6, padding: '6px 8px' }}>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 2 }}>Profit</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: profit === null ? '#aaa' : profit >= 0 ? '#16a34a' : '#dc2626' }}>
                      {profit === null ? '—' : `₹${profit.toLocaleString('en-IN')}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </>)}

      <style jsx>{`
        .orders-table-wrap { display: block; }
        .orders-cards { display: none; }

        @media (max-width: 768px) {
          .orders-table-wrap { display: none; }
          .orders-cards { display: block; }
          .orders-filter-bar { padding: 8px 12px !important; }
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
          .orders-count { text-align: center; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default DashboardOrdersPage;
