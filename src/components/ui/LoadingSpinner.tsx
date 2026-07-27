'use client';

import React from 'react';

/**
 * Shared LoadingSpinner component.
 * Replaces the various ad-hoc spinner implementations across the codebase.
 */

type SpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  /** Optional text shown below the spinner. */
  message?: string;
  /** Min height for the wrapper (default: '200px'). */
  minHeight?: string;
}

const sizeMap: Record<SpinnerSize, number> = { sm: 24, md: 40, lg: 64 };

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
  minHeight = '200px',
}) => {
  const px = sizeMap[size];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight,
        gap: '16px',
      }}
    >
      <div
        style={{
          width: px,
          height: px,
          border: `${Math.max(3, px / 10)}px solid #f0f0f0`,
          borderTopColor: '#c19a6b',
          borderRadius: '50%',
          animation: 'cms-spin 0.7s linear infinite',
        }}
      />
      {message && (
        <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{message}</p>
      )}
    </div>
  );
};

/**
 * Inline tiny spinner for use inside buttons or inline contexts.
 */
export const InlineSpinner: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <span
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      border: '2px solid rgba(0,0,0,0.15)',
      borderTopColor: 'currentColor',
      borderRadius: '50%',
      animation: 'cms-spin 0.5s linear infinite',
      verticalAlign: 'middle',
    }}
  />
);
