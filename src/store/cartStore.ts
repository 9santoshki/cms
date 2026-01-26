import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: CartItem) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncWithServer: () => Promise<void>;
  loadServerCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Helper to check if user is authenticated
async function isUserAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/session');
    const data = await response.json();
    return data.authenticated === true;
  } catch (error) {
    return false;
  }
}

// Sync cart item with server
async function syncCartItemWithServer(productId: number, quantity: number) {
  try {
    const isAuth = await isUserAuthenticated();
    if (!isAuth) {
      console.log('[CartStore] Not authenticated, skipping sync');
      return;
    }

    console.log(`[CartStore] Syncing to server: product ${productId}, quantity ${quantity}`);

    const response = await fetch(`/api/cart`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity }),
    });

    const result = await response.json();
    console.log('[CartStore] Server sync response:', result);

    if (!response.ok) {
      console.error('[CartStore] Server sync failed:', result);
    }
  } catch (error) {
    console.error('[CartStore] Failed to sync cart with server:', error);
  }
}

export const useCartStore = create<CartState>()(
  persist(
    subscribeWithSelector((set, get) => ({
      items: [],
      isLoading: false,

      addItem: async (item) => {
        // Add to local state first for immediate UI update
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            cartItem => cartItem.product_id === item.product_id
          );

          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + item.quantity
            };
            return { items: updatedItems };
          } else {
            return { items: [...state.items, item] };
          }
        });

        // Sync with server
        try {
          const isAuth = await isUserAuthenticated();

          if (isAuth) {
            const response = await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                product_id: item.product_id,
                quantity: item.quantity,
              }),
            });

            const result = await response.json();

            if (!response.ok) {
              console.error('Failed to save cart item to server:', result);
            }
          }
        } catch (error) {
          console.error('Failed to sync cart with server:', error);
        }
      },

      updateItem: async (productId, quantity) => {
        console.log(`[CartStore] updateItem called: product ${productId}, quantity ${quantity}`);

        // Update local state first
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter(item => item.product_id !== productId) };
          }

          const updatedItems = state.items.map(item =>
            item.product_id === productId ? { ...item, quantity } : item
          );

          return { items: updatedItems };
        });

        // Sync with server
        await syncCartItemWithServer(productId, quantity);
        console.log(`[CartStore] updateItem completed for product ${productId}`);
      },

      removeItem: async (productId) => {
        console.log(`[CartStore] removeItem called: product ${productId}`);

        // Remove from local state first
        set((state) => ({
          items: state.items.filter(item => item.product_id !== productId)
        }));

        // Sync with server
        await syncCartItemWithServer(productId, 0);
        console.log(`[CartStore] removeItem completed for product ${productId}`);
      },

      clearCart: async () => {
        set({ items: [] });

        // Clear server cart
        try {
          const isAuth = await isUserAuthenticated();
          if (isAuth) {
            await fetch('/api/cart', { method: 'DELETE' });
          }
        } catch (error) {
          console.error('Failed to clear server cart:', error);
        }
      },

      // Load cart from server (called on login)
      loadServerCart: async () => {
        try {
          set({ isLoading: true });

          const response = await fetch('/api/cart', {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
            },
          });
          const data = await response.json();

          console.log('[CartStore] Loaded from server:', data);

          if (data.success && data.data) {
            // Server is source of truth - replace local cart entirely
            set({ items: data.data, isLoading: false });
            console.log('[CartStore] Set cart items:', data.data.length);
          } else {
            set({ items: [], isLoading: false });
            console.log('[CartStore] No cart data from server');
          }
        } catch (error) {
          console.error('[CartStore] Failed to load server cart:', error);
          set({ isLoading: false });
        }
      },

      // Force sync current cart to server
      syncWithServer: async () => {
        try {
          const isAuth = await isUserAuthenticated();
          if (!isAuth) return;

          const items = get().items;

          // Sync each item to server
          for (const item of items) {
            await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                product_id: item.product_id,
                quantity: item.quantity,
              }),
            });
          }
        } catch (error) {
          console.error('Failed to sync cart with server:', error);
        }
      },

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => total + (item.price as number * item.quantity), 0);
      }
    })),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log('[CartStore] Hydrated from localStorage:', state.items.length, 'items');
        } else {
          console.log('[CartStore] No data to hydrate');
        }
      },
    }
  )
);