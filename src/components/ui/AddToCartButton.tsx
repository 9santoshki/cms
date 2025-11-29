'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Product } from '@/types';
import { showLoginModal, storeLegacyPendingCartAction } from '@/lib/auth-helpers';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  label?: string;
  showIcon?: boolean;
  disabled?: boolean;
  onSuccess?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity = 1,
  className = '',
  label = 'Add to Cart',
  showIcon = true,
  disabled = false,
  onSuccess,
  size = 'md'
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCartWithAuth, cartItems } = useAppContext();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;

    setIsLoading(true);
    console.log(`AddToCartButton clicked for product: ${product.name}`);

    try {
      const result = addToCartWithAuth(product, quantity);
      
      if (result.success && result.action) {
        console.log('User authenticated, adding to cart');
        result.action().then(() => {
          setIsLoading(false);
          if (onSuccess) onSuccess();
        });
      } else if (!result.success && result.requiresLogin) {
        console.log('User not authenticated, showing login modal');
        
        // Store the pending cart action for after login
        storeLegacyPendingCartAction(product, quantity);
        
        // Show the login modal
        showLoginModal();
        
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsLoading(false);
    }
  };

  // Check if item is already in cart
  const isInCart = cartItems.some(item => item.product_id === product.id);

  // Determine button style based on size
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center
        font-medium rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${isLoading ? 'cursor-wait' : 'cursor-pointer'}
        ${isInCart 
          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300' 
          : 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm hover:shadow-md'
        }
        ${className}
      `}
    >
      {/* Loading spinner */}
      {isLoading && (
        <span className="mr-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      )}
      
      {/* Cart icon */}
      {!isLoading && showIcon && !isInCart && (
        <span className="mr-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </span>
      )}
      
      {/* Checkmark if already in cart */}
      {!isLoading && isInCart && (
        <span className="mr-2">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
      
      {/* Button text */}
      <span>{isInCart ? 'In Cart' : label}</span>
    </button>
  );
};

export default AddToCartButton;