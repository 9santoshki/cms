'use client';

import React from 'react';
import { AuthProvider } from './AuthContext';
import { ProductProvider } from './ProductContext';
import { UIProvider } from './UIContext';
import { CategoriesProvider } from './CategoriesContext';

// Main provider that composes all individual context providers
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UIProvider>
      <AuthProvider>
        <ProductProvider>
          <CategoriesProvider>
            {children}
          </CategoriesProvider>
        </ProductProvider>
      </AuthProvider>
    </UIProvider>
  );
};