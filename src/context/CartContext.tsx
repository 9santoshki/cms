/**
 * Cart context provider
 * - Wraps Zustand cart store with React Context API
 * - Provides cart items, counts, totals, and mutation functions
 * - Syncs with server-side cart for authenticated users
 */
'use client';

import React, { createContext, useContext } from 'react';
import { useCartStore } from '@/store/cartStore';

// Create context
export const CartContext = createContext<{
  items: any[];
  loading: boolean;
  error: string | null;
  cartCount: number;
  cartTotal: number;
  addItem: (item: any) => void;
  updateItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
} | undefined>(undefined);

// Define cart item type
interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  name?: string;
  price?: number;
  image_url?: string;
}

// Provider component
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Use Zustand selectors for reactive updates
  const items = useCartStore(state => state.items);
  const addItem = useCartStore(state => state.addItem);
  const updateItem = useCartStore(state => state.updateItem);
  const removeItem = useCartStore(state => state.removeItem);
  const clearCart = useCartStore(state => state.clearCart);
  const getTotalItems = useCartStore(state => state.getTotalItems);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);

  return (
    <CartContext.Provider
      value={{
        items,
        loading: false,
        error: null,
        cartCount: getTotalItems(),
        cartTotal: getTotalPrice(),
        addItem,
        updateItem,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};