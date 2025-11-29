'use client';

import React, { createContext, useContext } from 'react';
import { useCartStore } from '@/store/cartStore'; // Assuming you have this Zustand store

// Create context
export const CartContext = createContext<{
  items: any[];
  loading: boolean;
  error: string | null;
  cartCount: number;
  cartTotal: number;
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
  const { items, addItem, updateItem, removeItem, clearCart, getTotalItems, getTotalPrice } = useCartStore();
  
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