'use client';

import React, { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cartStore';

interface MiniCartPopupProps {
  open: boolean;
  onClose: () => void;
  onGoToCart: () => void;
}

const MiniCartPopup: React.FC<MiniCartPopupProps> = ({ open, onClose, onGoToCart }) => {
  // Subscribe to items with a selector — re-renders only when items change
  const items = useCartStore(state => state.items);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  if (!open || items.length === 0) return null;

  // Merge any duplicate rows (same product + variant) before rendering
  const merged = items.reduce<typeof items>((acc, item) => {
    const vid = item.variant_id ?? null;
    const existing = acc.find(
      i => i.product_id === item.product_id && (i.variant_id ?? null) === vid
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const totalQty = merged.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = merged.reduce((s, i) => s + i.price * i.quantity, 0);
  const ordered = [...merged].reverse(); // most-recently added first

  return (
    <>
      {/* Full-screen backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
      />

      <div
        ref={popupRef}
        key={totalQty} // remount (and replay animation) whenever quantity changes
        style={{
          position: 'fixed',
          top: '70px',
          right: '12px',
          width: 'min(340px, calc(100vw - 24px))',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 90px)',
          animation: 'miniCartIn 0.2s ease-out',
        }}
      >
        <style>{`
          @keyframes miniCartIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.98); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '11px 14px',
          background: 'linear-gradient(135deg, #2c2c2c, #1a1a1a)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-check-circle" style={{ color: '#c19a6b', fontSize: '14px' }} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Added to Cart</span>
            <span style={{
              background: '#c19a6b',
              borderRadius: '10px',
              padding: '1px 8px',
              fontSize: '11px',
              fontWeight: 700,
            }}>
              {totalQty}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer', fontSize: '15px',
              padding: '2px 4px', lineHeight: 1,
            }}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Scrollable items — all items, no limit */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {ordered.map((item) => (
            <div
              key={`${item.product_id}-${item.variant_id ?? 'none'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderBottom: '1px solid #f5f5f5',
              }}
            >
              {/* Thumbnail */}
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '6px',
                overflow: 'hidden',
                flexShrink: 0,
                background: '#f5f0eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name || ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <i className="fas fa-couch" style={{ color: '#c19a6b', fontSize: '17px' }} />
                )}
              </div>

              {/* Name + variant + qty */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#222',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {item.name || `Product #${item.product_id}`}
                </div>
                {item.variant_name && (
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '1px' }}>
                    {item.variant_name}
                  </div>
                )}
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  <span style={{ fontWeight: 700, color: '#444', fontSize: '12px' }}>
                    ×{item.quantity}
                  </span>
                  {' '}at ₹{item.price.toLocaleString('en-IN')} each
                </div>
              </div>

              {/* Line total */}
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#c19a6b',
                flexShrink: 0,
              }}>
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '11px 14px',
          borderTop: '1px solid #eee',
          flexShrink: 0,
          background: '#fafafa',
          borderRadius: '0 0 12px 12px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '9px',
          }}>
            <span style={{ fontSize: '12px', color: '#666' }}>
              {totalQty} item{totalQty !== 1 ? 's' : ''}
            </span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#222' }}>
              ₹{totalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={onGoToCart}
              style={{
                flex: 1,
                padding: '9px 10px',
                background: '#c19a6b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#a8825f')}
              onMouseLeave={e => (e.currentTarget.style.background = '#c19a6b')}
            >
              <i className="fas fa-shopping-cart" style={{ marginRight: '5px' }} />
              Go to Cart
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '9px 10px',
                background: 'white',
                color: '#555',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#c19a6b'; e.currentTarget.style.color = '#c19a6b'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniCartPopup;
