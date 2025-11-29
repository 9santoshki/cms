import { useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Product } from '@/types';
import { useAuthModal } from './useAuthModal';

/**
 * Hook to handle add to cart with authentication check
 * and consistent modal behavior
 */
export const useAddToCart = () => {
  const { addToCartWithAuth } = useAppContext();
  const { openAuthModal } = useAuthModal();

  const handleAddToCart = useCallback((product: Product, quantity = 1) => {
    console.log('handleAddToCart called for product:', product.name);
    
    const result = addToCartWithAuth(product, quantity);
    console.log('addToCartWithAuth result:', result);
    
    if (!result.success && result.requiresLogin) {
      console.log('User not authenticated, showing login modal');
      
      // Store pending cart action
      const pendingAction = {
        product: result.product,
        quantity: result.quantity,
        action: 'addToCart'
      };
      localStorage.setItem('pendingCartAction', JSON.stringify(pendingAction));
      
      // Show the login modal
      openAuthModal();
      
      return {
        success: false,
        requiresLogin: true,
        message: 'Please sign in to add items to your cart'
      };
    } else if (result.success && result.action) {
      console.log('User authenticated, executing addToCart action');
      result.action();
      
      return {
        success: true,
        message: 'Item added to cart successfully'
      };
    }
    
    return {
      success: false,
      message: 'Unexpected error occurred'
    };
  }, [addToCartWithAuth, openAuthModal]);

  return {
    handleAddToCart
  };
};

/**
 * Process pending cart action after successful authentication
 * This should be called in auth callback or wherever auth state changes
 */
export const processPendingCartAction = async () => {
  const pendingAction = localStorage.getItem('pendingCartAction');
  
  if (!pendingAction) {
    return false;
  }
  
  try {
    const { product, quantity } = JSON.parse(pendingAction);
    if (product && quantity) {
      // Dispatch a custom event for AppContext to handle
      // Or directly call the addToCart function if available in context
      console.log('Processing pending cart action:', product.name, quantity);
      
      // Clear the pending action
      localStorage.removeItem('pendingCartAction');
      
      // Trigger a global event for the cart to handle this
      window.dispatchEvent(new CustomEvent('processPendingCartAction', { 
        detail: { product, quantity } 
      }));
      
      return true;
    }
  } catch (error) {
    console.error('Error processing pending cart action:', error);
  }
  
  // Clean up on error
  localStorage.removeItem('pendingCartAction');
  return false;
};