'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { usePWA } from '@/context/PWAContext';

// ─── Engagement thresholds ────────────────────────────────────────────────────
const MIN_TIME_MS = 30_000; // 30 seconds
const MIN_PAGE_VIEWS = 3;
const AUTO_HIDE_MS = 15_000; // 15 seconds

// ─── Styles ───────────────────────────────────────────────────────────────────

const bannerContainerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 999,
  background: 'white',
  borderTop: '2px solid #c19a6b',
  boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)',
  padding: '14px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
  transition: 'transform 0.35s ease',
};

const iconStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 8,
  background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: 18,
  flexShrink: 0,
};

const textStyle: React.CSSProperties = {
  flex: 1,
  fontSize: 13,
  color: '#333',
  fontWeight: 500,
  lineHeight: 1.4,
};

const installBtnStyle: React.CSSProperties = {
  padding: '10px 18px',
  background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  minHeight: '44px',
  flexShrink: 0,
};

const closeBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#999',
  fontSize: 18,
  cursor: 'pointer',
  padding: 8,
  minWidth: '44px',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

// ─── Component ────────────────────────────────────────────────────────────────

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, installApp, dismissInstall } = usePWA();
  const pathname = usePathname();

  const [shouldShow, setShouldShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // controls slide animation
  const [installing, setInstalling] = useState(false);

  const startTimeRef = useRef(Date.now());
  const pageViewsRef = useRef(0);
  const autoHideRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Track page views
  useEffect(() => {
    pageViewsRef.current += 1;
  }, [pathname]);

  // Check engagement periodically
  useEffect(() => {
    if (!isInstallable || isInstalled || shouldShow) return;

    const check = () => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed >= MIN_TIME_MS && pageViewsRef.current >= MIN_PAGE_VIEWS) {
        setShouldShow(true);
        // Slide in after a short delay to allow render
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsVisible(true));
        });

        // Auto-hide after timeout
        autoHideRef.current = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => dismissInstall(), 400); // wait for slide-out
        }, AUTO_HIDE_MS);
      }
    };

    const interval = setInterval(check, 2000);
    // Also check immediately
    check();

    return () => {
      clearInterval(interval);
      if (autoHideRef.current) clearTimeout(autoHideRef.current);
    };
  }, [isInstallable, isInstalled, shouldShow, dismissInstall]);

  // Don't render if already installed or not installable
  if (isInstalled || !shouldShow) return null;

  const handleInstall = async () => {
    setInstalling(true);
    if (autoHideRef.current) clearTimeout(autoHideRef.current);

    const result = await installApp();
    if (result?.outcome === 'accepted') {
      // Installed — hide banner
      setIsVisible(false);
    }
    setInstalling(false);
  };

  const handleDismiss = () => {
    if (autoHideRef.current) clearTimeout(autoHideRef.current);
    setIsVisible(false);
    setTimeout(() => dismissInstall(), 400);
  };

  return (
    <div
      role="complementary"
      aria-label="Install app"
      style={{
        ...bannerContainerStyle,
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      <div style={iconStyle}>
        <i className="fas fa-home"></i>
      </div>
      <div style={textStyle}>
        Add <strong>Colour My Space</strong> to your home screen for quick access
      </div>
      <button
        onClick={handleInstall}
        disabled={installing}
        style={{
          ...installBtnStyle,
          opacity: installing ? 0.7 : 1,
          cursor: installing ? 'wait' : 'pointer',
        }}
      >
        {installing ? 'Installing…' : 'Install'}
      </button>
      <button onClick={handleDismiss} style={closeBtnStyle} aria-label="Dismiss">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default PWAInstallBanner;
