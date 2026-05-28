'use client';

import React from 'react';

/**
 * Shared Button component.
 *
 * Replaces the countless inline-styled buttons across the codebase
 * with a consistent design system backed by the theme tokens.
 */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#c19a6b',
    color: '#fff',
    border: 'none',
  },
  secondary: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: '1px solid #ddd',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#c19a6b',
    border: '2px solid #c19a6b',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#333',
    border: 'none',
  },
  danger: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '8px 16px', fontSize: '12px', minHeight: '44px' },
  md: { padding: '12px 24px', fontSize: '14px', minHeight: '44px' },
  lg: { padding: '16px 32px', fontSize: '16px', minHeight: '48px' },
};

const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '4px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  lineHeight: 1,
  fontFamily: 'inherit',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...(fullWidth ? { width: '100%' } : {}),
        ...(isDisabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}),
        ...style,
      }}
      {...props}
    >
      {loading && <LoadingDot />}
      {children}
    </button>
  );
};

/** Tiny animated dot used as a loading indicator inside buttons. */
const LoadingDot: React.FC = () => (
  <span
    style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      animation: 'btn-spin 0.6s linear infinite',
    }}
  />
);
