import { useState, useEffect } from 'react';
import type { SiteSettings } from '@/lib/db/settings';

const DEFAULTS: SiteSettings = {
  shipping: { enabled: true, flat_rate: 1500, min_order_amount: 50000 },
  tax: { enabled: false, rate: 0, type: 'percentage' },
};

// Module-level cache: all hook consumers share one fetch result.
let cached: SiteSettings | null = null;
let inflight: Promise<SiteSettings> | null = null;

function fetchSettings(): Promise<SiteSettings> {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetch('/api/admin/settings')
      .then(r => r.json())
      .then(res => { cached = res.success ? res.data : DEFAULTS; return cached!; })
      .catch(() => DEFAULTS)
      .finally(() => { inflight = null; });
  }
  return inflight;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cached ?? DEFAULTS);

  useEffect(() => {
    fetchSettings().then(setSettings);
  }, []);

  return settings;
}
