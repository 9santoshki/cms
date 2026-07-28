import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import { UIProvider } from '@/context/UIContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider, useProduct } from '@/context/ProductContext';
import { useCartStore } from '@/store/cartStore';

// Mirrors the AppContext test fix: useAppContext() (the legacy combined
// facade) doesn't expose per-domain loading/error for cart or orders — cart
// state lives in the Zustand store (useCartStore, no loading flag around
// individual add/update/remove — those are optimistic, fire-and-forget from
// the UI's perspective) and order-creation loading lives on ProductContext's
// own `loading` (a single shared flag, not `.orders`-namespaced). These
// tests now exercise those real, current state owners directly.

jest.mock('@/lib/api', () => ({
  apiClient: {
    createOrder: jest.fn(() => Promise.resolve({ success: true, data: { id: 1 } })),
  },
}));

jest.mock('@/lib/auth/client', () => ({
  signInWithGoogle: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve({ success: true })),
  getCurrentUser: jest.fn(() => Promise.resolve(null)),
  onAuthStateChange: jest.fn(() => ({ unsubscribe: jest.fn() })),
}));

jest.setTimeout(15000);

const Providers = ({ children }: { children: React.ReactNode }) => (
  <UIProvider>
    <AuthProvider>
      <ProductProvider>{children}</ProductProvider>
    </AuthProvider>
  </UIProvider>
);

describe('Cart operations (Zustand store)', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    useCartStore.setState({ items: [], isLoading: false });
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ success: true }) })
    ) as unknown as typeof fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  test('addItem optimistically updates local state and syncs to the server', async () => {
    await act(async () => {
      await useCartStore.getState().addItem({
        product_id: 1,
        quantity: 1,
        name: 'Test Product',
        price: 100,
      });
    });

    expect(useCartStore.getState().items).toEqual([
      expect.objectContaining({ product_id: 1, quantity: 1, name: 'Test Product' }),
    ]);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/cart',
      expect.objectContaining({ method: 'POST' })
    );
  });
});

describe('Order operations (ProductContext)', () => {
  const OrderTestComponent = () => {
    const { loading, error, createOrder } = useProduct();

    const handleCreateOrder = async () => {
      try {
        await createOrder({ items: [{ id: 1, quantity: 1 }] } as never);
      } catch {
        // Error is surfaced via context state, not re-thrown to the caller here
      }
    };

    return (
      <div>
        <button onClick={handleCreateOrder} disabled={loading}>
          {loading ? 'Processing...' : 'Create Order'}
        </button>
        <div data-testid="orders-loading">{loading ? 'Orders Loading' : 'Orders Ready'}</div>
        <div data-testid="orders-error">{error || 'No Orders Error'}</div>
      </div>
    );
  };

  test('createOrder drives ProductContext.loading through a full cycle', async () => {
    const { getByText, getByTestId } = render(
      <Providers>
        <OrderTestComponent />
      </Providers>
    );

    expect(getByTestId('orders-loading')).toHaveTextContent('Orders Ready');

    fireEvent.click(getByText('Create Order'));

    expect(getByTestId('orders-loading')).toHaveTextContent('Orders Loading');
    expect(getByText('Processing...')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByTestId('orders-loading')).toHaveTextContent('Orders Ready');
    });

    expect(getByTestId('orders-error')).toHaveTextContent('No Orders Error');
  });
});
