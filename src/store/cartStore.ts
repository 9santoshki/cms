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

async function isUserAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/session');
    const data = await response.json();
    return data.user !== null && data.user !== undefined;
  } catch {
    return false;
  }
}

async function syncCartItemWithServer(productId: number, quantity: number, variantId?: number | null) {
  try {
    const isAuth = await isUserAuthenticated();
    if (!isAuth) return;

    const response = await fetch(`/api/cart`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, variant_id: variantId, quantity }),
    });

    if (!response.ok) {
      const result = await response.json();
      console.error('[CartStore] Server sync failed:', result);
    }
  } catch (err: unknown) {
    console.error('[CartStore] Failed to sync cart with server:', err);
  }
}

// Helper to find item index by product_id and variant_id
function findItemIndex(items: CartItem[], productId: number, variantId?: number | null): number {
  return items.findIndex(
    (item) => item.product_id === productId &&
              (item.variant_id === variantId || (item.variant_id === undefined && variantId === null))
  );
}

export const useCartStore = create<CartState>()(
  persist(
    subscribeWithSelector((set, get) => ({
      items: [],
      isLoading: false,

      addItem: async (item) => {
        set((state) => {
          // Find existing item by product_id AND variant_id
          const existingItemIndex = findItemIndex(
            state.items,
            item.product_id,
            item.variant_id
          );

          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + item.quantity,
            };
            return { items: updatedItems };
          } else {
            return { items: [...state.items, item] };
          }
        });

        try {
          const isAuth = await isUserAuthenticated();

          if (isAuth) {
            const response = await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                product_id: item.product_id,
                variant_id: item.variant_id,
                quantity: item.quantity,
              }),
            });

            if (!response.ok) {
              const result = await response.json();
              console.error('Failed to save cart item to server:', result);
            }
          }
        } catch (err: unknown) {
          console.error('Failed to sync cart with server:', err);
        }
      },

      updateItem: async (productId, quantity, variantId = null) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => !(item.product_id === productId &&
                           (item.variant_id === variantId || (item.variant_id === undefined && variantId === null)))
              ),
            };
          }

          const updatedItems = state.items.map((item) =>
            item.product_id === productId &&
            (item.variant_id === variantId || (item.variant_id === undefined && variantId === null))
              ? { ...item, quantity }
              : item
          );

          return { items: updatedItems };
        });

        await syncCartItemWithServer(productId, quantity, variantId);
      },

      removeItem: async (productId, variantId = null) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product_id === productId &&
                       (item.variant_id === variantId || (item.variant_id === undefined && variantId === null)))
          ),
        }));

        await syncCartItemWithServer(productId, 0, variantId);
      },

      clearCart: async () => {
        set({ items: [] });

        try {
          const isAuth = await isUserAuthenticated();
          if (isAuth) {
            await fetch('/api/cart', { method: 'DELETE' });
          }
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
          const data = await response.json();

          if (data.success && data.data) {
            set({ items: data.data as CartItem[], isLoading: false });
          } else {
            set({ items: [], isLoading: false });
          }
        } catch (err: unknown) {
          console.error('[CartStore] Failed to load server cart:', err);
          set({ isLoading: false });
        }
      },

      syncWithServer: async () => {
        try {
          const isAuth = await isUserAuthenticated();
          if (!isAuth) return;

          const items = get().items;

          for (const item of items) {
            await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                product_id: item.product_id,
                variant_id: item.variant_id,
                quantity: item.quantity,
              }),
            });
          }
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
