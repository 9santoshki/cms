import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetailPageClient from '@/app/products/[slug]/ProductDetailPageClient';
import { apiClient } from '@/lib/api';
import { Product } from '@/types';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';

// This test targeted @/app/products/[id]/ProductDetailPageClient with a
// { id } param and plain-text assertions against the rendered product. The
// route has since moved to @/app/products/[slug] (param is now `slug`, and
// the component resolves it via getProduct() when numeric or
// getProductBySlug() otherwise), the loading/error copy changed ("Loading
// product details...", an "Item Not Available" card instead of an
// "Error: ..." string), and product rendering was delegated to
// ProductDetailDisplay — a large component with its own data fetching
// (variants, cart, auth) that isn't what this test is about. Rewritten
// against the real component, with ProductDetailDisplay/Header/Footer
// stubbed the same way other tests in this suite stub heavy child
// components to keep the test focused on this component's own fetch/
// loading/error state machine.

jest.mock('@/lib/api', () => ({
  apiClient: {
    getProduct: jest.fn(),
    getProductBySlug: jest.fn(),
  },
}));

jest.mock('@/lib/auth/client', () => ({
  signInWithGoogle: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve({ success: true })),
  getCurrentUser: jest.fn(() => Promise.resolve(null)),
  onAuthStateChange: jest.fn(() => ({ unsubscribe: jest.fn() })),
}));

jest.mock('@/components/Header', () => () => <div data-testid="header" />);
jest.mock('@/components/Footer', () => () => <div data-testid="footer" />);
jest.mock('@/components/ProductDetailDisplay', () => ({ product }: { product: { name: string } }) => (
  <div data-testid="product-detail">{product.name}</div>
));

const mockProduct: Product = {
  id: 1,
  name: 'Classic Oak Dining Table',
  description: 'Handcrafted oak dining table with a timeless design and durable finish.',
  price: 1899.99,
  image_url: 'https://images.unsplash.com/photo-1567538096630',
  category: 'Dining Room',
};

const Providers = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>
    <AuthProvider>
      <ProductProvider>{children}</ProductProvider>
    </AuthProvider>
  </LanguageProvider>
);

describe('ProductDetailPageClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render product details after a successful API call', async () => {
    (apiClient.getProduct as jest.Mock).mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    render(
      <Providers>
        <ProductDetailPageClient params={{ slug: '1' }} />
      </Providers>
    );

    expect(screen.getByText('Loading product details...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Classic Oak Dining Table')).toBeInTheDocument();
    });

    // Numeric slug -> resolved via getProduct(id), not getProductBySlug
    expect(apiClient.getProduct).toHaveBeenCalledWith(1);
  });

  it('should show the "Item Not Available" card if the API call fails', async () => {
    (apiClient.getProduct as jest.Mock).mockResolvedValue({
      success: false,
      error: 'Product not found',
    });

    render(
      <Providers>
        <ProductDetailPageClient params={{ slug: '1' }} />
      </Providers>
    );

    expect(screen.getByText('Loading product details...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Item Not Available')).toBeInTheDocument();
    });
    expect(screen.getByText('Product not found')).toBeInTheDocument();
    expect(screen.queryByText('Classic Oak Dining Table')).not.toBeInTheDocument();
  });

  it('should show the "Item Not Available" card if the API response is missing the "data" property', async () => {
    (apiClient.getProduct as jest.Mock).mockResolvedValue({
      success: true,
      // "data" property is missing
    });

    render(
      <Providers>
        <ProductDetailPageClient params={{ slug: '1' }} />
      </Providers>
    );

    expect(screen.getByText('Loading product details...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Item Not Available')).toBeInTheDocument();
    });
    // Falls back to the default message since the API didn't return one
    expect(screen.getByText('Product not found')).toBeInTheDocument();
    expect(screen.queryByText('Classic Oak Dining Table')).not.toBeInTheDocument();
  });

  it('resolves a non-numeric slug via getProductBySlug instead of getProduct', async () => {
    (apiClient.getProductBySlug as jest.Mock).mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    render(
      <Providers>
        <ProductDetailPageClient params={{ slug: 'classic-oak-dining-table' }} />
      </Providers>
    );

    await waitFor(() => {
      expect(screen.getByText('Classic Oak Dining Table')).toBeInTheDocument();
    });

    expect(apiClient.getProductBySlug).toHaveBeenCalledWith('classic-oak-dining-table');
    expect(apiClient.getProduct).not.toHaveBeenCalled();
  });
});
