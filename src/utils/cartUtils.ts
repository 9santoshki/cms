// Utility functions for cart operations
import { CartItem } from '@/types';

// Calculate the total price of items in the cart (current discounted price)
export const calculateCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Calculate the original total price of items in the cart (before discount)
export const calculateOriginalCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    // Use explicit originalPrice if available; otherwise estimate 25% markup
    const originalPrice = item.originalPrice != null && item.originalPrice > item.price
      ? item.originalPrice
      : item.price * 1.25;
    return total + originalPrice * item.quantity;
  }, 0);
};

// Calculate the total savings from discounts in the cart
export const calculateDiscountSavings = (cartItems: CartItem[]): number => {
  return cartItems.reduce((savings, item) => {
    const originalPrice = item.originalPrice != null && item.originalPrice > item.price
      ? item.originalPrice
      : item.price * 1.25;
    return savings + (originalPrice - item.price) * item.quantity;
  }, 0);
};

// Get shipping cost based on subtotal
export const calculateShippingCost = (subtotal: number): number => {
  // Free shipping for orders over ₹50,000
  return subtotal > 50000 ? 0 : 1500;
};

// Get tax amount based on subtotal (placeholder)
export const calculateTaxAmount = (_subtotal: number): number => {
  return 0;
};

// Get cart total including shipping and tax
export const calculateTotalWithShippingAndTax = (cartItems: CartItem[]): number => {
  const subtotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingCost(subtotal);
  const tax = calculateTaxAmount(subtotal + shipping);
  return subtotal + shipping + tax;
};
