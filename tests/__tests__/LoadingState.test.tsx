import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { AppProvider, useAppContext } from '@/context/AppContext';

// Mock the apiClient module
jest.mock('@/lib/api', () => ({
  apiClient: {
    getProducts: jest.fn(() => Promise.resolve({ success: true, data: [{ id: 1, name: 'Test Product', price: 100 }] })),
    login: jest.fn(() => Promise.resolve({ success: true, data: { user: { id: 1, name: 'test' }, token: 'fake-token' } })),
    getCartItems: jest.fn(() => Promise.resolve({ success: true, data: [] })),
    addToCart: jest.fn(() => Promise.resolve({ success: true, data: { id: 1, quantity: 1 } })),
    getOrders: jest.fn(() => Promise.resolve({ success: true, data: [] })),
    createOrder: jest.fn(() => Promise.resolve({ success: true, data: { id: 1 } })),
    updateCartItem: jest.fn(() => Promise.resolve({ success: true, data: { id: 1, quantity: 2 } })),
    removeFromCart: jest.fn(() => Promise.resolve({ success: true })),
    clearCart: jest.fn(() => Promise.resolve({ success: true })),
    register: jest.fn(() => Promise.resolve({ success: true, data: { user: { id: 1, name: 'test' }, token: 'fake-token' } })),
  }
}));

// Increase test timeout
jest.setTimeout(30000); // Max timeout

// Test component for cart operations
const CartTestComponent = () => {
  const { loading, error, addToCart, products } = useAppContext();
  
  const handleAddToCart = async () => {
    if (products.length > 0) {
      await addToCart(products[0], 1);
    }
  };

  return (
    <div>
      <button onClick={handleAddToCart} disabled={loading.cart}>
        {loading.cart ? 'Adding...' : 'Add to Cart'}
      </button>
      <div data-testid="cart-loading">{loading.cart ? 'Cart Loading' : 'Cart Ready'}</div>
      <div data-testid="cart-error">{error.cart || 'No Cart Error'}</div>
    </div>
  );
};

describe('Cart Operations', () => {
  test('should handle adding to cart with max timeout', async () => {
    const { getByText, getByTestId } = render(
      <AppProvider>
        <CartTestComponent />
      </AppProvider>
    );

    // Initially cart should be ready
    expect(getByTestId('cart-loading')).toHaveTextContent('Cart Ready');
    
    // Click the add to cart button
    fireEvent.click(getByText('Add to Cart'));
    
    // Check that loading state is activated
    expect(getByTestId('cart-loading')).toHaveTextContent('Cart Loading');
    expect(getByText('Adding...')).toBeInTheDocument();
    
    // Wait for the operation to complete (with max timeout)
    await waitFor(() => {
      expect(getByTestId('cart-loading')).toHaveTextContent('Cart Ready');
    }, {
      timeout: 15000 // Max timeout for cart operation
    });
    
    // Verify no error occurred
    expect(getByTestId('cart-error')).toHaveTextContent('No Cart Error');
  });
});

// Test component for order operations
const OrderTestComponent = () => {
  const { loading, error, createOrder } = useAppContext();
  
  const handleCreateOrder = async () => {
    try {
      await createOrder({ items: [{ id: 1, quantity: 1 }] });
    } catch (err) {
      // Error is handled by context
    }
  };

  return (
    <div>
      <button onClick={handleCreateOrder} disabled={loading.orders}>
        {loading.orders ? 'Processing...' : 'Create Order'}
      </button>
      <div data-testid="orders-loading">{loading.orders ? 'Orders Loading' : 'Orders Ready'}</div>
      <div data-testid="orders-error">{error.orders || 'No Orders Error'}</div>
    </div>
  );
};

describe('Order Operations', () => {
  test('should handle order creation with max timeout', async () => {
    const { getByText, getByTestId } = render(
      <AppProvider>
        <OrderTestComponent />
      </AppProvider>
    );

    // Initially orders should be ready
    expect(getByTestId('orders-loading')).toHaveTextContent('Orders Ready');
    
    // Click the create order button
    fireEvent.click(getByText('Create Order'));
    
    // Check that loading state is activated
    expect(getByTestId('orders-loading')).toHaveTextContent('Orders Loading');
    expect(getByText('Processing...')).toBeInTheDocument();
    
    // Wait for the operation to complete (with max timeout)
    await waitFor(() => {
      expect(getByTestId('orders-loading')).toHaveTextContent('Orders Ready');
    }, {
      timeout: 20000 // Max timeout for order operation
    });
    
    // Verify no error occurred
    expect(getByTestId('orders-error')).toHaveTextContent('No Orders Error');
  });
});