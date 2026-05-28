'use client';

import React from 'react';

/**
 * Shared StatusBadge component.
 * Replaces duplicated status color mappings across dashboard tables.
 */

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  // Order statuses
  pending: { bg: '#fff3cd', text: '#856404' },
  processing: { bg: '#cce5ff', text: '#004085' },
  shipped: { bg: '#d4edda', text: '#155724' },
  completed: { bg: '#d4edda', text: '#155724' },
  cancelled: { bg: '#f8d7da', text: '#721c24' },
  returned: { bg: '#e2e3e5', text: '#383d41' },
  // Product statuses
  draft: { bg: '#e2e3e5', text: '#383d41' },
  published: { bg: '#d4edda', text: '#155724' },
  archived: { bg: '#f8d7da', text: '#721c24' },
  // Review statuses
  approved: { bg: '#d4edda', text: '#155724' },
  rejected: { bg: '#f8d7da', text: '#721c24' },
  // Appointment statuses
  scheduled: { bg: '#cce5ff', text: '#004085' },
  confirmed: { bg: '#d4edda', text: '#155724' },
  // Payment
  captured: { bg: '#d4edda', text: '#155724' },
  failed: { bg: '#f8d7da', text: '#721c24' },
  paid: { bg: '#d4edda', text: '#155724' },
};

interface StatusBadgeProps {
  status: string;
  /** Optional custom color map to merge with defaults. */
  colorMap?: Record<string, { bg: string; text: string }>;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, colorMap }) => {
  const colors = { ...STATUS_COLORS, ...colorMap };
  const color = colors[status.toLowerCase()] || { bg: '#e2e3e5', text: '#383d41' };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600,
        backgroundColor: color.bg,
        color: color.text,
        textTransform: 'capitalize',
        lineHeight: 1.4,
      }}
    >
      {status}
    </span>
  );
};
