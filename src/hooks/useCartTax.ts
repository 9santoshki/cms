'use client';

import { useEffect, useState } from 'react';
import { backComputeTaxAmount } from '@/utils/cartUtils';
import type { CartItem } from '@/types';

interface TaxSettings {
  rate: number;
  enabled: boolean;
}

/**
 * The cart's real tax, resolved server-side per item from its HSN code
 * (falling back to the site-wide rate for items with no HSN mapping) —
 * replaces applying one flat rate to the whole order. Starts from the old
 * flat-rate estimate so there's no flash of ₹0 while the request is in
 * flight, then swaps in the accurate figure once it resolves.
 */
export function useCartTax(cartItems: CartItem[], subtotal: number, shipping: number, taxSettings: TaxSettings) {
  const fallback = {
    tax: backComputeTaxAmount(subtotal + shipping, taxSettings.rate, taxSettings.enabled),
    taxRate: taxSettings.rate,
  };
  const [result, setResult] = useState(fallback);

  useEffect(() => {
    if (!taxSettings.enabled || cartItems.length === 0) {
      setResult({ tax: 0, taxRate: taxSettings.rate });
      return;
    }

    let cancelled = false;
    const lines = [
      ...cartItems.map(item => ({ price: item.price, quantity: item.quantity, variant_id: item.variant_id ?? null })),
      ...(shipping > 0 ? [{ price: shipping, quantity: 1, variant_id: null }] : []),
    ];

    fetch('/api/cart/tax', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: lines }),
    })
      .then(res => res.json())
      .then(json => {
        if (!cancelled && json.success) {
          setResult({ tax: json.data.tax, taxRate: json.data.taxRate });
        }
      })
      .catch(() => {}); // keep the flat-rate fallback already shown

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, shipping, taxSettings.rate, taxSettings.enabled]);

  return result;
}
