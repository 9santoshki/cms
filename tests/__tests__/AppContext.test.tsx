import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { AppProvider, useAppContext } from '@/context/AppContext';

// Mock the apiClient module
jest.mock('@/lib/api', () => ({
  apiClient: {
    getProducts: jest.fn(() => Promise.resolve({ success: true, data: [] })),
    login: jest.fn(() => Promise.resolve({ success: true, data: { user: { id: 1, name: 'test' }, token: 'fake-token' } })),
    getCartItems: jest.fn(() => Promise.resolve({ success: true, data: [] })),
    addToCart: jest.fn(() => Promise.resolve({ success: true, data: {} })),
    getOrders: jest.fn(() => Promise.resolve({ success: true, data: [] })),
    createOrder: jest.fn(() => Promise.resolve({ success: true, data: { id: 1 } })),
    updateCartItem: jest.fn(() => Promise.resolve({ success: true, data: {} })),
    removeFromCart: jest.fn(() => Promise.resolve({ success: true })),
    clearCart: jest.fn(() => Promise.resolve({ success: true })),
    register: jest.fn(() => Promise.resolve({ success: true, data: { user: { id: 1, name: 'test' }, token: 'fake-token' } })),
  }
}));

// Increase test timeout to maximum for slow systems
jest.setTimeout(30000); // 30 seconds max timeout

// Component to test the context
const TestComponent = () => {
  const { loading, error, fetchProducts } = useAppContext();
  
  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div data-testid="loading-products">{loading.products ? 'Loading' : 'Loaded'}</div>
      <div data-testid="error-products">{error.products || 'No Error'}</div>
    </div>
  );
};

// Test suite for AppContext
describe('AppContext', () => {
  test('should handle loading state correctly with timeout', async () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Check initial loading state
    expect(getByTestId('loading-products')).toHaveTextContent('Loading');
    
    // Wait for loading to finish (with increased timeout)
    await waitFor(() => {
      expect(getByTestId('loading-products')).toHaveTextContent('Loaded');
    }, { 
      timeout: 10000 // Use max timeout for this test
    });

    // Verify no error occurred
    expect(getByTestId('error-products')).toHaveTextContent('No Error');
  });

  test('should handle login with timeout', async () => {
    const LoginTestComponent = () => {
      const { loading, error, login } = useAppContext();
      
      React.useEffect(() => {
        const performLogin = async () => {
          try {
            await login({ email: 'test@example.com', password: 'password' });
          } catch (err) {
            // Error is handled by context
          }
        };
        performLogin();
      }, [login]);

      return (
        <div>
          <div data-testid="loading-auth">{loading.auth ? 'Loading' : 'Loaded'}</div>
          <div data-testid="error-auth">{error.auth || 'No Error'}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <AppProvider>
        <LoginTestComponent />
      </AppProvider>
    );

    // Check initial loading state
    expect(getByTestId('loading-auth')).toHaveTextContent('Loading');
    
    // Wait for loading to finish (with max timeout)
    await waitFor(() => {
      expect(getByTestId('loading-auth')).toHaveTextContent('Loaded');
    }, { 
      timeout: 15000 // Use max timeout for this test
    });

    // Verify no error occurred
    expect(getByTestId('error-auth')).toHaveTextContent('No Error');
  });
});