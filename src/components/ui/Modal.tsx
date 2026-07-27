'use client';

import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Shared Modal component.
 *
 * Replaces duplicated overlay patterns in LoginModal, ProductDetail,
 * MobileMenu, MobileFilterPanel, etc.
 *
 * Features: backdrop, close-on-ESC, close-on-outside-click, body scroll lock.
 */

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Optional: renders a semi-transparent backdrop behind the modal. Default true. */
  backdrop?: boolean;
  /** Optional: additional styles for the overlay container. */
  overlayStyle?: React.CSSProperties;
  /** Optional: additional styles for the content box. */
  contentStyle?: React.CSSProperties;
  /** Optional: close on backdrop click. Default true. */
  closeOnBackdropClick?: boolean;
}

const backdropBase: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(2px)',
  zIndex: 1050,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentBase: React.CSSProperties = {
  position: 'relative',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
  maxHeight: '90vh',
  overflow: 'auto',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  backdrop = true,
  overlayStyle,
  contentStyle,
  closeOnBackdropClick = true,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  // Outside click
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!closeOnBackdropClick) return;
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose, closeOnBackdropClick],
  );

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = prev;
    };
  }, [isOpen, handleKeyDown, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        ...backdropBase,
        ...(backdrop ? {} : { backgroundColor: 'transparent', backdropFilter: 'none' }),
        ...overlayStyle,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div ref={contentRef} style={{ ...contentBase, ...contentStyle }}>
        {children}
      </div>
    </div>
  );
};

/**
 * Slide-out drawer variant for mobile panels (menus, filters).
 */
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** 'left' | 'right' | 'bottom'. Default 'left'. */
  side?: 'left' | 'right' | 'bottom';
  width?: string;
  header?: React.ReactNode;
}

const drawerOverlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  side = 'left',
  width = '280px',
  header,
}) => {
  // ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isHorizontal = side === 'left' || side === 'right';
  const transformOff = side === 'left' ? 'translateX(-100%)' : side === 'right' ? 'translateX(100%)' : 'translateY(100%)';

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    ...(side === 'bottom'
      ? { bottom: 0, left: 0, right: 0, maxHeight: '80vh' }
      : { top: 0, [side]: 0, bottom: 0, width }),
    backgroundColor: '#fff',
    zIndex: 1001,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    transform: isOpen ? 'translate(0)' : transformOff,
    transition: 'transform 0.3s ease',
  };

  return (
    <>
      <div style={drawerOverlay} onClick={onClose} />
      <div style={panelStyle} role="dialog" aria-modal="true">
        {header}
        {children}
      </div>
    </>
  );
};
