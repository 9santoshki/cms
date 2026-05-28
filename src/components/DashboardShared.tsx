/**
 * Shared components for dashboard pages
 */
import React from 'react';

export function LoadingSpinner() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f4f0' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #f0f0f0', borderTop: '3px solid #c19a6b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
        <p style={{ marginTop: 12, color: '#666', fontSize: 13 }}>Loading...</p>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title }: { icon: string; title: string }) {
  return (
    <div style={{ background: 'white', borderRadius: 8, padding: '32px 16px', textAlign: 'center', border: '1px solid #e8d5c4' }}>
      <i className={`fas ${icon}`} style={{ fontSize: 32, color: '#d1d5db', marginBottom: 8 }} />
      <p style={{ fontSize: 13, color: '#666' }}>{title}</p>
    </div>
  );
}

export function ToggleSwitch({ checked, onChange, title }: { checked: boolean; onChange: () => void; title?: string }) {
  return (
    <button onClick={onChange} title={title}
      style={{ width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: checked ? '#3b82f6' : '#d1d5db', position: 'relative', transition: 'background 0.2s' }}>
      <span style={{ position: 'absolute', top: 3, left: checked ? 22 : 3, width: 18, height: 18,
        borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  );
}

// Status color mappings for badges
export const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  // Order/Appointment statuses
  delivered: { bg: '#16a34a15', color: '#16a34a' },
  completed: { bg: '#16a34a15', color: '#16a34a' },
  shipped: { bg: '#3b82f615', color: '#3b82f6' },
  confirmed: { bg: '#3b82f615', color: '#3b82f6' },
  processing: { bg: '#f59e0b15', color: '#f59e0b' },
  pending: { bg: '#f59e0b15', color: '#f59e0b' },
  cancelled: { bg: '#ef444415', color: '#ef4444' },
  // Review statuses
  approved: { bg: '#16a34a15', color: '#16a34a' },
  rejected: { bg: '#ef444415', color: '#ef4444' },
  // Supplier/Category status
  active: { bg: '#16a34a15', color: '#16a34a' },
  inactive: { bg: '#6b728015', color: '#6b7280' },
};

export function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.pending;
  return (
    <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
      background: colors.bg, color: colors.color }}>
      {status}
    </span>
  );
}