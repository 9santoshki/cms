'use client';

import React from 'react';
import { AuthProvider } from './AuthContext';
import { ProductProvider } from './ProductContext';
import { UIProvider } from './UIContext';

// Main provider that composes all individual context providers
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UIProvider>
      <AuthProvider>
        <ProductProvider>
          {children}
        </ProductProvider>
      </AuthProvider>
    </UIProvider>
  );
};