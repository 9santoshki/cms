import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: CartItem) => Promise<void>;
  updateItem: (productId: number, quantity: number, variantId?: number | null) => Promise<void>;
  removeItem: (productId: number, variantId?: number | null) => Promise<void>;
  clearCart: () => Promise<void>;
  syncWithServer: () => Promise<void>;
  loadServerCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

async function syncCartItemWithServer(productId: number, quantity: number, variantId?: number | null) {
  try {
    const response = await fetch(`/api/cart`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, variant_id: variantId, quantity }),
    });

    // 401 = unauthenticated guest — silently skip; other errors are worth logging
    if (!response.ok && response.status !== 401) {
      const result = await response.text().then(t => { try { return JSON.parse(t); } catch { return t; } });
      console.error(`[CartStore] Server sync failed (${response.status}):`, result);
    }
  } catch (err: unknown) {
    console.error('[CartStore] Failed to sync cart with server:', err);
  }
}

// Helper to find item index by product_id and variant_id.
// Normalises both sides to null so that undefined (locally-added) and null
// (server-returned) are treated as the same "no variant" sentinel.
function findItemIndex(items: CartItem[], productId: number, variantId?: number | null): number {
  const vid = variantId ?? null;
  return items.findIndex(
    (item) => item.product_id === productId && (item.variant_id ?? null) === vid
  );
}

// Increment the matching cart item's quantity, or append it if not present.
function upsertItem(state: { items: CartItem[] }, item: CartItem): { items: CartItem[] } {
  const idx = findItemIndex(state.items, item.product_id, item.variant_id);
  if (idx >= 0) {
    const updated = [...state.items];
    updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + item.quantity };
    return { items: updated };
  }
  return { items: [...state.items, item] };
}

export const useCartStore = create<CartState>()(
  persist(
    subscribeWithSelector((set, get) => ({
      items: [],
      isLoading: false,

      addItem: async (item) => {
        if (item.variant_id) {
          // Variant item: validate stock with server before updating local state.
          // 401 = guest user; allow optimistic update without server sync.
          const response = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              product_id: item.product_id,
              variant_id: item.variant_id,
              quantity: item.quantity,
            }),
          });

          if (response.status === 401) {
            // Guest: optimistic local update, no server sync yet
            set((state) => upsertItem(state, item));
            return;
          }

          if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || 'Failed to add item to cart');
          }

          // Server approved: update local state
          set((state) => upsertItem(state, item));
        } else {
          // No variant: optimistic local update, then sync to server.
          set((state) => upsertItem(state, item));

          const response = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              product_id: item.product_id,
              variant_id: item.variant_id,
              quantity: item.quantity,
            }),
          });

          if (response.ok || response.status === 401) return; // 401 = guest, optimistic is fine

          const result = await response.json();
          // Revert local state on unexpected error
          set((state) => ({
            items: state.items.filter(
              (i) => !(i.product_id === item.product_id && (i.variant_id ?? null) === (item.variant_id ?? null))
            ),
          }));
          throw new Error(result.error || 'Failed to add item to cart');
        }
      },

      updateItem: async (productId, quantity, variantId = null) => {
        const vid = variantId ?? null;
        const currentItems = get().items;
        const itemIdx = findItemIndex(currentItems, productId, variantId);
        const previousQuantity = itemIdx >= 0 ? currentItems[itemIdx].quantity : 0;
        const applyQty = (items: CartItem[]) =>
          items.map((item, i) => (i === itemIdx ? { ...item, quantity } : item));

        // For quantity increases with variants, validate stock with server first.
        if (quantity > previousQuantity && vid) {
          const response = await fetch('/api/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: productId, variant_id: vid, quantity }),
          });

          if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || 'Failed to update quantity');
          }

          // Server approved - update local state
          set({ items: applyQty(currentItems) });
        } else {
          // Quantity decrease or no variant - optimistic update (safe, no stock limit)
          set({ items: applyQty(currentItems) });
          await syncCartItemWithServer(productId, quantity, variantId);
        }
      },

      removeItem: async (productId, variantId = null) => {
        const vid = variantId ?? null;
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product_id === productId && (item.variant_id ?? null) === vid)
          ),
        }));

        await syncCartItemWithServer(productId, 0, variantId);
      },

      clearCart: async () => {
        set({ items: [] });

        try {
          await fetch('/api/cart', { method: 'DELETE' });
        } catch (err: unknown) {
          console.error('Failed to clear server cart:', err);
        }
      },

      loadServerCart: async () => {
        try {
          set({ isLoading: true });

          const response = await fetch('/api/cart', {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' },
          });

          // 401 means unauthenticated — leave local guest cart items intact
          if (response.status === 401) {
            set({ isLoading: false });
            return;
          }

          const data = await response.json();

          if (data.success && data.data) {
            // Merge any duplicate rows (same product_id + variant_id) that may
            // exist from before the NULL-safe upsert fix was applied.
            const merged = (data.data as CartItem[]).reduce<CartItem[]>((acc, item) => {
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
            set({ items: merged, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (err: unknown) {
          console.error('[CartStore] Failed to load server cart:', err);
          set({ isLoading: false });
        }
      },

      syncWithServer: async () => {
        try {
          const items = get().items;

          await Promise.allSettled(
            items.map(async (item) => {
              const res = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  product_id: item.product_id,
                  variant_id: item.variant_id,
                  quantity: item.quantity,
                }),
              });
              if (!res.ok && res.status !== 401) {
                console.error('[CartStore] Sync failed for item', item.product_id, res.status);
              }
            })
          );
        } catch (err: unknown) {
          console.error('Failed to sync cart with server:', err);
        }
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    })),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
