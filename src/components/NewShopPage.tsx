'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProduct } from '../context/ProductContext';
import Header from './Header';
import Footer from './Footer';
import { ProductBrowser, BrowserFilters, DEFAULT_FILTERS, Category } from './ProductBrowser';
import { ShopContainer, MainContent, LoadingSpinner, ErrorContainer } from '../styles/NewShopStyles';

const NewShopPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { products, loading: productLoading, error: productError, fetchProducts } = useProduct();
  const [categories, setCategories] = useState<Category[]>([]);

  // Restore filter state from URL on mount / navigation
  const initialFilters: Partial<BrowserFilters> = {
    category:   searchParams.get('category')   || 'All',
    subcategory: searchParams.get('subcategory') || 'All',
    brand:      searchParams.get('brand')       || 'All',
    priceRange: searchParams.get('priceRange')  || 'All',
    sortBy:     searchParams.get('sortBy')      || 'name',
  };

  // Fetch categories from the same API as ProductBrowser's search-page path
  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data.filter((c: Category) => c.parent_id === null && c.is_active));
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Fetch products on mount
  useEffect(() => {
    if (!productLoading) fetchProducts();
  }, []);

  // Sync filter state to URL so the back button restores it
  const handleFiltersChange = (filters: BrowserFilters) => {
    const params = new URLSearchParams();
    if (filters.category   !== 'All') params.set('category',   filters.category);
    if (filters.subcategory !== 'All') params.set('subcategory', filters.subcategory);
    if (filters.brand      !== 'All') params.set('brand',       filters.brand);
    if (filters.priceRange !== 'All') params.set('priceRange',  filters.priceRange);
    if (filters.sortBy     !== 'name') params.set('sortBy',     filters.sortBy);
    router.replace(`/shop${params.toString() ? '?' + params.toString() : ''}`, { scroll: false });
  };

  if (productLoading) {
    return (
      <ShopContainer>
        <LoadingSpinner />
      </ShopContainer>
    );
  }

  if (productError) {
    return (
      <ErrorContainer>
        <p>{productError}</p>
        <button className="btn primary" onClick={() => window.location.reload()}>Retry</button>
      </ErrorContainer>
    );
  }

  return (
    <ShopContainer>
      <Header activePage="shop" />
      <MainContent style={{ marginTop: '0' }}>
        <ProductBrowser
          products={products}
          categories={categories}
          initialFilters={initialFilters}
          onFiltersChange={handleFiltersChange}
        />
      </MainContent>
      <Footer />
    </ShopContainer>
  );
};

export default NewShopPage;
