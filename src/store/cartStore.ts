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
    if (!isAuth) return;

    if (quantity <= 0) {
      // Remove from server
      await fetch(`/api/cart`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity: 0 }),
      });
    } else {
      // Update on server
      await fetch(`/api/cart`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity }),
      });
    }
  } catch (error) {
    console.error('Failed to sync cart with server:', error);
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
      },

      removeItem: async (productId) => {
        // Remove from local state first
        set((state) => ({
          items: state.items.filter(item => item.product_id !== productId)
        }));

        // Sync with server
        await syncCartItemWithServer(productId, 0);
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
          const response = await fetch('/api/cart');
          const data = await response.json();

          if (data.success && data.data) {
            // Merge server cart with local cart
            const serverItems = data.data;
            const localItems = get().items;

            // Create a map of server items by product_id
            const serverItemsMap = new Map(
              serverItems.map((item: CartItem) => [item.product_id, item])
            );

            // Merge: server items take priority, but keep local items not in server
            const mergedItems: CartItem[] = [];

            // Add all server items
            serverItems.forEach((serverItem: CartItem) => {
              const localItem = localItems.find(
                item => item.product_id === serverItem.product_id
              );

              // If item exists locally, take the higher quantity
              if (localItem && localItem.quantity > serverItem.quantity) {
                mergedItems.push({
                  ...serverItem,
                  quantity: localItem.quantity
                });

                // Sync the higher quantity back to server
                syncCartItemWithServer(serverItem.product_id, localItem.quantity);
              } else {
                mergedItems.push(serverItem);
              }
            });

            // Add local items that aren't on server
            for (const localItem of localItems) {
              if (!serverItemsMap.has(localItem.product_id)) {
                mergedItems.push(localItem);

                // Sync new local item to server
                fetch('/api/cart', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    product_id: localItem.product_id,
                    quantity: localItem.quantity,
                  }),
                }).catch(err => console.error('Failed to sync local item:', err));
              }
            }

            set({ items: mergedItems, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Failed to load server cart:', error);
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
    }
  )
);