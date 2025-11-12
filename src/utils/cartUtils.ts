// Utility functions for cart operations
import { CartItem } from '@/types';

// Calculate the total price of items in the cart
export const calculateCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    const price = typeof item.price === 'number' 
      ? item.price 
      : parseFloat(item.price || '0');
    return total + (price * item.quantity);
  }, 0);
};

// Get shipping cost based on subtotal
export const calculateShippingCost = (subtotal: number): number => {
  // Free shipping for orders over ₹50,000
  return subtotal > 50000 ? 0 : 1500;
};

// Get cart total including shipping
export const calculateTotalWithShipping = (cartItems: CartItem[]): number => {
  const subtotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingCost(subtotal);
  return subtotal + shipping;
};