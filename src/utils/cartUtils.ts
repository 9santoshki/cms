// Utility functions for cart operations
import { CartItem } from '@/types';

// Calculate the total price of items in the cart (current discounted price)
export const calculateCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    const price = typeof item.price === 'number'
      ? item.price
      : parseFloat(item.price || '0');
    return total + (price * item.quantity);
  }, 0);
};

// Calculate the original total price of items in the cart (before discount)
export const calculateOriginalCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    // If item has originalPrice and it's higher than current price, use it
    // otherwise, we'll estimate original price as 25% higher than current price for demo purposes
    let originalPrice = typeof item.originalPrice === 'number' ? item.originalPrice : null;

    // If originalPrice is null or the same as the current price, estimate it as 25% higher
    if (originalPrice === null || originalPrice <= (typeof item.price === 'number' ? item.price : parseFloat(item.price || '0'))) {
      const currentPrice = typeof item.price === 'number'
        ? item.price
        : parseFloat(item.price || '0');
      // Estimate original price as current price / 0.8 (assuming 20% discount by default for demo purposes)
      // But cap it to avoid infinite increases
      originalPrice = currentPrice * 1.25; // 25% markup as default for demo
    }

    return total + (originalPrice * item.quantity);
  }, 0);
};

// Calculate the total savings from discounts in the cart
export const calculateDiscountSavings = (cartItems: CartItem[]): number => {
  return cartItems.reduce((savings, item) => {
    const currentPrice = typeof item.price === 'number'
      ? item.price
      : parseFloat(item.price || '0');

    // If item has originalPrice and it's higher than current price, use it
    // otherwise, estimate based on current price
    let originalPrice = typeof item.originalPrice === 'number' ? item.originalPrice : null;

    // If originalPrice is null or the same as current price, estimate it as 25% higher
    if (originalPrice === null || originalPrice <= currentPrice) {
      originalPrice = currentPrice * 1.25; // 25% markup as default for demo
    }

    const priceDifference = originalPrice - currentPrice;
    return savings + (priceDifference * item.quantity);
  }, 0);
};

// Get shipping cost based on subtotal (placeholder - this will be replaced by the dynamic version)
export const calculateShippingCost = (subtotal: number): number => {
  // For now, using a placeholder value until we can properly import the dynamic version
  // Free shipping for orders over ₹50,000
  return subtotal > 50000 ? 0 : 1500;
};

// Get tax amount based on subtotal (placeholder - this will be replaced by the dynamic version)
export const calculateTaxAmount = (subtotal: number): number => {
  // Placeholder - no tax by default
  return 0;
};

// Get cart total including shipping and tax
export const calculateTotalWithShippingAndTax = (cartItems: CartItem[]): number => {
  const subtotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingCost(subtotal);
  const tax = calculateTaxAmount(subtotal + shipping);
  return subtotal + shipping + tax;
};