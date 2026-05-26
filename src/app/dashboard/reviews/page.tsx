'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { LoadingSpinner, EmptyState, STATUS_COLORS } from '@/components/DashboardShared';
import { Review } from '@/types';

export default function ReviewsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    if (!user) { router.push('/auth?redirect=/dashboard/reviews'); return; }
    if (user.role !== 'admin' && user.role !== 'moderator') { router.push('/dashboard'); return; }
    fetchReviews();
  }, [user, statusFilter]); // Added statusFilter dependency to fix stale filter bug

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const statusParam = statusFilter !== 'all' ? `&status=${statusFilter}` : '';
      const res = await fetch(`/api/reviews?${statusParam}`);
      const data = await res.json();
      setReviews(data.success ? data.data || [] : []);
    } catch { setReviews([]); }
    finally { setLoading(false); }
  };

  const handleStatus = async (id: number, status: 'approved' | 'rejected') => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      const data = await res.json();
      if (data.success) setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
    } catch { }
    finally { setActionLoading(null); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this review?')) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setReviews(reviews.filter(r => r.id !== id));
    } catch { }
    finally { setActionLoading(null); }
  };

  if (!user || loading) return <LoadingSpinner />;

  return (
    <DashboardLayout title="Reviews" description="Moderate customer reviews.">
      {/* Filter bar */}
      <div style={{ background: 'white', borderRadius: 8, padding: '10px 16px', marginBottom: 12, border: '1px solid #e8d5c4', display: 'flex', gap: 8, alignItems: 'center' }}>
        {['all', 'pending', 'approved', 'rejected'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} // Removed fetchReviews() - useEffect handles it
            style={{ padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: statusFilter === s ? 600 : 500, cursor: 'pointer',
              border: statusFilter === s ? '1px solid #c19a6b' : '1px solid #e8d5c4',
              background: statusFilter === s ? '#c19a6b15' : 'white', color: statusFilter === s ? '#c19a6b' : '#666', textTransform: 'capitalize' }}>
            {s}
          </button>
        ))}
        <span style={{ fontSize: 12, color: '#666', marginLeft: 8 }}>{reviews.length} reviews</span>
        <button onClick={fetchReviews} style={{ marginLeft: 'auto', padding: '5px 10px', background: '#c19a6b', color: 'white', border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}>
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>

      {/* Table */}
      {reviews.length === 0 ? <EmptyState icon="fa-comments" title="No Reviews" /> : (
        <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e8d5c4', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8f4f0', borderBottom: '1px solid #e8d5c4' }}>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>User</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>Product</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600 }}>Rating</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>Comment</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '8px 10px' }}>
                    <div style={{ fontWeight: 600 }}>{r.user_name || 'Anonymous'}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>{new Date(r.created_at).toLocaleDateString()}</div>
                  </td>
                  <td style={{ padding: '8px 10px', color: '#c19a6b', fontWeight: 500 }}>{r.product_name}</td>
                  <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                    <span style={{ color: '#f59e0b' }}>★</span> {r.rating}
                  </td>
                  <td style={{ padding: '8px 10px', color: '#666', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.comment}</td>
                  <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                    <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
                      background: STATUS_COLORS[r.status]?.bg || '#f59e0b15', color: STATUS_COLORS[r.status]?.color || '#f59e0b' }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                      {r.status !== 'approved' && (
                        <button onClick={() => handleStatus(r.id, 'approved')} disabled={actionLoading === r.id}
                          style={{ padding: '4px 8px', borderRadius: 4, fontSize: 10, cursor: 'pointer', border: '1px solid #16a34a', background: '#16a34a15', color: '#16a34a' }}>
                          ✓ Approve
                        </button>
                      )}
                      {r.status !== 'rejected' && (
                        <button onClick={() => handleStatus(r.id, 'rejected')} disabled={actionLoading === r.id}
                          style={{ padding: '4px 8px', borderRadius: 4, fontSize: 10, cursor: 'pointer', border: '1px solid #ef4444', background: '#ef444415', color: '#ef4444' }}>
                          ✗ Reject
                        </button>
                      )}
                      <button onClick={() => handleDelete(r.id)} disabled={actionLoading === r.id}
                        style={{ padding: '4px 8px', borderRadius: 4, fontSize: 10, cursor: 'pointer', border: '1px solid #e8d5c4', background: 'white', color: '#666' }}>
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
    </DashboardLayout>
  );
}