import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { UIProvider } from '@/context/UIContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ProductProvider, useProduct } from '@/context/ProductContext';

// The app was refactored from one monolithic AppContext into separate
// AuthContext / ProductContext / UIContext (+ the Zustand cart store), with
// useAppContext() (CombinedAppContext) as a read-mostly facade over them for
// legacy callers. That facade does NOT re-expose ProductContext's own
// loading/error state (it only forwards UIContext's — which nothing in
// ProductContext actually writes to), and there's no email/password login
// anymore (Google OAuth only). This test now exercises the real, current
// state owners directly instead of the pre-refactor shape.

jest.mock('@/lib/api', () => ({
  apiClient: {
    getProducts: jest.fn(() => Promise.resolve({ success: true, data: [] })),
  },
}));

jest.mock('@/lib/auth/client', () => ({
  signInWithGoogle: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve({ success: true })),
  getCurrentUser: jest.fn(() => Promise.resolve(null)),
  onAuthStateChange: jest.fn(() => ({ unsubscribe: jest.fn() })),
}));

import { signInWithGoogle as mockGoogleSignIn } from '@/lib/auth/client';

jest.setTimeout(15000);

// Same provider composition as AppProvider, minus CategoriesProvider — that
// context fetches '/api/admin/categories' on mount and isn't relevant to
// either test below; jsdom here has no global `fetch` polyfill, so pulling
// it in would fail these tests on something unrelated to what they cover.
const Providers = ({ children }: { children: React.ReactNode }) => (
  <UIProvider>
    <AuthProvider>
      <ProductProvider>{children}</ProductProvider>
    </AuthProvider>
  </UIProvider>
);

describe('AppContext (post-refactor: Auth/Product/UI contexts)', () => {
  test('ProductContext.loading/error go through a fetch cycle correctly', async () => {
    const ProductsTestComponent = () => {
      const { loading, error, fetchProducts } = useProduct();

      React.useEffect(() => {
        fetchProducts();
      }, [fetchProducts]);

      return (
        <div>
          <div data-testid="loading-products">{loading ? 'Loading' : 'Loaded'}</div>
          <div data-testid="error-products">{error || 'No Error'}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Providers>
        <ProductsTestComponent />
      </Providers>
    );

    expect(getByTestId('loading-products')).toHaveTextContent('Loading');

    await waitFor(() => {
      expect(getByTestId('loading-products')).toHaveTextContent('Loaded');
    });

    expect(getByTestId('error-products')).toHaveTextContent('No Error');
  });

  test('AuthContext.loading goes through a Google sign-in cycle correctly', async () => {
    const LoginTestComponent = () => {
      const { loading, error, signInWithGoogle } = useAuth();

      React.useEffect(() => {
        signInWithGoogle().catch(() => {
          // Error is surfaced via context state, not re-thrown to the caller here
        });
      }, [signInWithGoogle]);

      return (
        <div>
          <div data-testid="loading-auth">{loading ? 'Loading' : 'Loaded'}</div>
          <div data-testid="error-auth">{error || 'No Error'}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Providers>
        <LoginTestComponent />
      </Providers>
    );

    await waitFor(() => {
      expect(getByTestId('loading-auth')).toHaveTextContent('Loaded');
    });

    expect(getByTestId('error-auth')).toHaveTextContent('No Error');
    expect(mockGoogleSignIn).toHaveBeenCalledTimes(1);
  });
});
