
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetailPageClient from '@/app/products/[id]/ProductDetailPageClient';
import { apiClient } from '@/lib/api';
import { Product } from '@/types';
import { AppProvider } from '@/context/AppContext';

// Mock the apiClient
jest.mock('@/lib/api', () => ({
  apiClient: {
    getProduct: jest.fn(),
  },
}));

const mockProduct: Product = {
  id: 1,
  name: 'Classic Oak Dining Table',
  description: 'Handcrafted oak dining table with a timeless design and durable finish.',
  price: 1899.99,
  image_url: 'https://images.unsplash.com/photo-1567538096630-8a4be3904c9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  category: 'Dining Room',
};

describe('ProductDetailPageClient', () => {
  it('should render product details after a successful API call', async () => {
    // Mock the successful API response
    (apiClient.getProduct as jest.Mock).mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    render(
      <AppProvider>
        <ProductDetailPageClient params={{ id: '1' }} />
      </AppProvider>
    );

    // Check for loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the product details to be rendered
    await waitFor(() => {
      expect(screen.getByText('Classic Oak Dining Table')).toBeInTheDocument();
    }, { timeout: 5000 }); // 5-second timeout

    expect(screen.getByText(/Handcrafted oak dining table/)).toBeInTheDocument();
    expect(screen.getByText('$1899.99')).toBeInTheDocument();
  });

  it('should display an error message if the API call fails', async () => {
    // Mock the failed API response
    (apiClient.getProduct as jest.Mock).mockResolvedValue({
      success: false,
      message: 'Product not found',
    });

    render(
      <AppProvider>
        <ProductDetailPageClient params={{ id: '1' }} />
      </AppProvider>
    );

    // Check for loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Error: Product not found')).toBeInTheDocument();
    }, { timeout: 5000 }); // 5-second timeout
  });

  it('should not render product details if the API response is missing the "data" property', async () => {
    // Mock an incomplete API response
    (apiClient.getProduct as jest.Mock).mockResolvedValue({
      success: true,
      // "data" property is missing
    });

    render(
      <AppProvider>
        <ProductDetailPageClient params={{ id: '1' }} />
      </AppProvider>
    );

    // Check for loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // The component should eventually show an error or a "not found" message
    await waitFor(() => {
      expect(screen.getByText('Product not found')).toBeInTheDocument();
    }, { timeout: 5000 }); // 5-second timeout

    // Ensure product details are not rendered
    expect(screen.queryByText('Classic Oak Dining Table')).not.toBeInTheDocument();
  });
});
