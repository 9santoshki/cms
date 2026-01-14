'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Review } from '@/types';

export default function ReviewsModerationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard/reviews');
      return;
    }

    if (user.role !== 'admin' && user.role !== 'moderator') {
      router.push('/dashboard');
      return;
    }

    fetchReviews();
  }, [user, statusFilter]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const statusParam = statusFilter !== 'all' ? `&status=${statusFilter}` : '';
      const response = await fetch(`/api/reviews?${statusParam}`);
      const data = await response.json();

      if (data.success) {
        setReviews(data.data || []);
      } else {
        setError(data.error || 'Failed to load reviews');
      }
    } catch (err: any) {
      console.error('Error loading reviews:', err);
      setError(err.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (reviewId: string, newStatus: 'approved' | 'rejected') => {
    setActionLoading(reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setReviews(reviews.map(r =>
          r.id === reviewId ? { ...r, status: newStatus } : r
        ));
      } else {
        setError(data.error || 'Failed to update review');
      }
    } catch (err: any) {
      console.error('Error updating review:', err);
      setError(err.message || 'Failed to update review');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    setActionLoading(reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setReviews(reviews.filter(r => r.id !== reviewId));
      } else {
        setError(data.error || 'Failed to delete review');
      }
    } catch (err: any) {
      console.error('Error deleting review:', err);
      setError(err.message || 'Failed to delete review');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'approved':
        return { background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: '1px solid rgba(34, 197, 94, 0.3)' };
      case 'rejected':
        return { background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.3)' };
      default:
        return { background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', border: '1px solid rgba(245, 158, 11, 0.3)' };
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            style={{ width: '16px', height: '16px', fill: star <= rating ? '#f59e0b' : '#d1d5db' }}
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        ))}
      </div>
    );
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
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Reviews Moderation"
      description="Approve, reject, or delete user reviews for products"
    >
      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Filter by status:</span>
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: statusFilter === status ? '2px solid #c19a6b' : '1px solid #e8d5c4',
              background: statusFilter === status ? 'rgba(193, 154, 107, 0.1)' : 'white',
              color: statusFilter === status ? '#c19a6b' : '#666',
              fontSize: '14px',
              fontWeight: statusFilter === status ? '600' : '500',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {status}
          </button>
        ))}
        <button
          onClick={fetchReviews}
          style={{
            marginLeft: 'auto',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #e8d5c4',
            background: 'white',
            color: '#666',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-sync-alt"></i>
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
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
          <button
            onClick={() => setError(null)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* Reviews List */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4',
        overflow: 'hidden'
      }}>
        {reviews.length === 0 ? (
          <div style={{ padding: '64px 32px', textAlign: 'center' }}>
            <i className="fas fa-comments" style={{ fontSize: '48px', color: '#d1d5db', marginBottom: '16px' }}></i>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
              No Reviews Found
            </h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              {statusFilter !== 'all'
                ? `No ${statusFilter} reviews at the moment.`
                : 'No reviews have been submitted yet.'}
            </p>
          </div>
        ) : (
          <div>
            {reviews.map((review, index) => (
              <div
                key={review.id}
                style={{
                  padding: '20px 24px',
                  borderBottom: index < reviews.length - 1 ? '1px solid #f0f0f0' : 'none',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start'
                }}
              >
                {/* Review Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                      {review.user_name || 'Anonymous'}
                    </span>
                    <span style={{ fontSize: '12px', color: '#999' }}>
                      on
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#c19a6b' }}>
                      {review.product_name || 'Unknown Product'}
                    </span>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '50px',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        ...getStatusBadgeStyle(review.status)
                      }}
                    >
                      {review.status}
                    </span>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    {renderStars(review.rating)}
                  </div>

                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 8px 0' }}>
                    {review.comment}
                  </p>

                  <span style={{ fontSize: '12px', color: '#999' }}>
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {review.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(review.id, 'approved')}
                      disabled={actionLoading === review.id}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        background: 'rgba(34, 197, 94, 0.1)',
                        color: '#16a34a',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: actionLoading === review.id ? 'not-allowed' : 'pointer',
                        opacity: actionLoading === review.id ? 0.6 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <i className="fas fa-check"></i>
                      Approve
                    </button>
                  )}

                  {review.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(review.id, 'rejected')}
                      disabled={actionLoading === review.id}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#dc2626',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: actionLoading === review.id ? 'not-allowed' : 'pointer',
                        opacity: actionLoading === review.id ? 0.6 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <i className="fas fa-times"></i>
                      Reject
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={actionLoading === review.id}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e8d5c4',
                      background: 'white',
                      color: '#666',
                      fontSize: '13px',
                      cursor: actionLoading === review.id ? 'not-allowed' : 'pointer',
                      opacity: actionLoading === review.id ? 0.6 : 1
                    }}
                    title="Delete review"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
