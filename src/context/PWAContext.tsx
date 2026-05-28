'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAContextValue {
  isInstallable: boolean;
  isInstalled: boolean;
  installApp: () => Promise<{ outcome: 'accepted' | 'dismissed' } | null>;
  dismissInstall: () => void;
  dismissedUntil: number | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DISMISS_KEY = 'cms-pwa-dismissed';
const DISMISS_COOLDOWN = 30 * 24 * 60 * 60 * 1000; // 30 days

function getDismissedUntil(): number | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(DISMISS_KEY);
  if (!stored) return null;
  const ts = parseInt(stored, 10);
  if (isNaN(ts)) return null;
  if (Date.now() - ts >= DISMISS_COOLDOWN) {
    localStorage.removeItem(DISMISS_KEY);
    return null;
  }
  return ts + DISMISS_COOLDOWN;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const PWAContext = createContext<PWAContextValue | undefined>(undefined);

interface PWAProviderProps {
  children: React.ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissedUntil, setDismissedUntil] = useState<number | null>(null);

  // Check standalone mode on mount
  useEffect(() => {
    setDismissedUntil(getDismissedUntil());

    if (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
  }, []);

  // Register service worker
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        // SW registered — Chrome will now fire beforeinstallprompt
      })
      .catch(() => {
        // SW registration failed — install prompt won't fire, that's OK
      });
  }, []);

  // Listen for install prompt
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = useCallback(async () => {
    if (!deferredPrompt) return null;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
    }

    return { outcome: choice.outcome };
  }, [deferredPrompt]);

  const dismissInstall = useCallback(() => {
    const now = Date.now();
    localStorage.setItem(DISMISS_KEY, now.toString());
    setDismissedUntil(now + DISMISS_COOLDOWN);
  }, []);

  const isDismissed = dismissedUntil !== null && dismissedUntil > Date.now();
  const isInstallable = deferredPrompt !== null && !isInstalled && !isDismissed;

  const value = useMemo<PWAContextValue>(
    () => ({ isInstallable, isInstalled, installApp, dismissInstall, dismissedUntil }),
    [isInstallable, isInstalled, installApp, dismissInstall, dismissedUntil],
  );

  return <PWAContext.Provider value={value}>{children}</PWAContext.Provider>;
}

export function usePWA(): PWAContextValue {
  const context = useContext(PWAContext);
  if (context === undefined) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
}

export default PWAContext;
