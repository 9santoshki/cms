import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductBrowser, Category } from '@/components/ProductBrowser';
import { Product } from '@/types';

// ProductCardWithVariant pulls in next/navigation's useRouter, AuthContext,
// and the zustand cart store — none of which matter for this test (which
// only exercises ProductBrowser's own filter state). Stub it down to just
// the product name so the grid content is trivially assertable.
jest.mock('@/components/ProductCardWithVariant', () => {
  return function MockProductCard({ product }: { product: { name: string } }) {
    return <div data-testid="product-card">{product.name}</div>;
  };
});

const categories: Category[] = [
  { id: 1, name: 'Living Room', parent_id: null, is_active: true, children: [] },
  { id: 2, name: 'Lighting', parent_id: null, is_active: true, children: [] },
];

const products: Product[] = [
  { id: 1, name: 'Sofa', description: '', price: 1000, category: 'Living Room', status: 'published' },
  { id: 2, name: 'Lamp', description: '', price: 500, category: 'Lighting', status: 'published' },
];

describe('ProductBrowser — URL-driven filter sync', () => {
  test('re-applies initialFilters when the prop changes after mount', () => {
    // Mirrors NewShopPage: initialFilters is derived from useSearchParams()
    // and passed down fresh on every render. The regression this guards
    // against: ProductBrowser seeded its filter state from initialFilters
    // via a useState initializer, which only runs once on mount. Clicking a
    // different category in the persistent top nav (CategoryNav) while
    // already on /shop changes the URL and re-renders NewShopPage with a
    // new initialFilters object, but does NOT unmount ProductBrowser — so
    // without a resync effect, the grid silently kept showing the old
    // category forever.
    const { rerender } = render(
      <ProductBrowser products={products} categories={categories} initialFilters={{ category: 'Living Room' }} />
    );

    expect(screen.getByText('Sofa')).toBeInTheDocument();
    expect(screen.queryByText('Lamp')).not.toBeInTheDocument();

    // Simulate the URL changing to a different category while the
    // component stays mounted (exactly what a CategoryNav click does).
    rerender(
      <ProductBrowser products={products} categories={categories} initialFilters={{ category: 'Lighting' }} />
    );

    expect(screen.getByText('Lamp')).toBeInTheDocument();
    expect(screen.queryByText('Sofa')).not.toBeInTheDocument();
  });
});
