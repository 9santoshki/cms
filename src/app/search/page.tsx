"use client";

import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProductBrowser, Category } from '@/components/ProductBrowser';
import { apiClient } from '@/lib/api';
import { Product } from '@/types';
import {
  SearchContainer,
  SearchBarRow,
  SearchBarLabel,
  SearchContent,
} from '@/styles/SearchStyles';

// ── Inner component (needs useSearchParams → must be inside Suspense) ──────────

const SearchPageInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read query and brand synchronously from URL — available on first render
  const urlQuery = searchParams.get('q') || '';
  const urlBrand = searchParams.get('brand') || 'All';

  const [query, setQuery] = useState(urlQuery);
  const [searchInput, setSearchInput] = useState(urlQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real categories (same source as the shop page)
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

  // Server does text search only; all other filtering is client-side in ProductBrowser
  const performSearch = useCallback(async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.searchProducts({ q, limit: 100 });
      setProducts(result?.success && result.data?.products ? result.data.products : []);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred during search. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    performSearch(urlQuery);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput);
    router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    performSearch(searchInput);
  };

  // Only show category filters for categories that appear in the search results.
  const applicableCategories = useMemo(() => {
    if (products.length === 0) return categories;
    const productCategories = new Set(products.map(p => p.category));
    return categories.filter(c => productCategories.has(c.name));
  }, [products, categories]);

  const initialFilters = urlBrand !== 'All' ? { brand: urlBrand } : undefined;

  const emptyMessage = query
    ? `We couldn't find any products matching "${query}". Try different keywords or browse our categories.`
    : urlBrand !== 'All'
      ? `No products found for brand "${urlBrand}".`
      : 'Enter a search term above to find products.';

  return (
    <SearchContainer>
      <Header activePage="search" />

      <SearchBarRow>
        <SearchBarLabel>
          {urlBrand !== 'All' ? `Brand: ${urlBrand}` : 'Search'}
          {query && <span className="sub"> · "{query}"</span>}
          {!query && urlBrand !== 'All' && <span className="sub"> · all products</span>}
        </SearchBarLabel>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </SearchBarRow>

      <SearchContent>
        <ProductBrowser
          products={products}
          categories={applicableCategories}
          loading={loading}
          error={error}
          initialFilters={initialFilters}
          emptyMessage={emptyMessage}
          onRetry={() => performSearch(query)}
          showAllCategoriesInitially
        />
      </SearchContent>

      <Footer />
    </SearchContainer>
  );
};

// ── Page export (Suspense boundary required for useSearchParams) ───────────────

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        Loading...
      </div>
    }>
      <SearchPageInner />
    </Suspense>
  );
}
