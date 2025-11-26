import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    subscribeWithSelector((set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        // Check if item already exists in cart
        const existingItemIndex = state.items.findIndex(cartItem => cartItem.product_id === item.product_id);
        
        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + item.quantity
          };
          return { items: updatedItems };
        } else {
          // Add new item
          return { items: [...state.items, item] };
        }
      }),
      
      updateItem: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          return { items: state.items.filter(item => item.product_id !== productId) };
        }
        
        // Update item quantity
        const updatedItems = state.items.map(item => 
          item.product_id === productId ? { ...item, quantity } : item
        );
        
        return { items: updatedItems };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.product_id !== productId)
      })),
      
      clearCart: () => set({ items: [] }),
      
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
      name: 'cart-storage', // unique name
      partialize: (state) => ({ items: state.items }), // only persist items, not functions
    }
  )
);