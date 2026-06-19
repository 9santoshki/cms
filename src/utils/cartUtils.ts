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

// Get shipping cost based on subtotal and configured rates
export const calculateShippingCost = (
  subtotal: number,
  flatRate = 1500,
  minOrderAmount = 50000
): number => {
  return subtotal >= minOrderAmount ? 0 : flatRate;
};

// Back-compute tax from a tax-inclusive total (listing prices already include tax)
export const backComputeTaxAmount = (
  inclusiveTotal: number,
  taxRate = 0,
  taxEnabled = false
): number => {
  if (!taxEnabled || taxRate <= 0) return 0;
  return inclusiveTotal * taxRate / (100 + taxRate);
};

// Get tax amount based on subtotal and configured tax settings
export const calculateTaxAmount = (
  subtotal: number,
  taxRate = 0,
  taxEnabled = false
): number => {
  return taxEnabled ? subtotal * (taxRate / 100) : 0;
};

// Get cart total including shipping and tax (uses hardcoded defaults — prefer hook-based approach in UI)
export const calculateTotalWithShippingAndTax = (cartItems: CartItem[]): number => {
  const subtotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingCost(subtotal);
  const tax = calculateTaxAmount(subtotal + shipping);
  return subtotal + shipping + tax;
};
