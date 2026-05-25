"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCardWithVariant from '@/components/ProductCardWithVariant';
import { MobileFilterPanel, MobileFilterSection } from '@/components/MobileFilterPanel';
import { apiClient } from '@/lib/api';
import { parsePrice, PRICE_RANGES, SHOP_CATEGORIES } from '@/lib/utils';
import { Product } from '@/types';
import {
  SearchContainer,
  SearchHeaderSection,
  SearchContent,
  SearchInputWrapper,
  ResultsSection,
  ResultsHeader,
  LoadingState,
  EmptyState,
} from '@/styles/SearchStyles';
import {
  ProductFilters,
  FilterSection,
  FilterHeader,
  FilterContent,
  FilterOption,
  FilterDepartmentHeader,
  ClearFiltersButton,
  ActiveFiltersSummary,
  MobileFilterToggle,
} from '@/styles/NewShopStyles';

const SearchPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Collapsible filter sections state
  const [collapsedSections, setCollapsedSections] = useState({
    category: false,
    price: false,
  });

  // Toggle section collapse
  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Perform search
  const performSearch = useCallback(async (searchQuery: string, category?: string, priceRange?: string) => {
    setLoading(true);
    setError(null);

    try {
      const params: Record<string, string | number> = {};
      if (searchQuery) params.q = searchQuery;
      if (category) params.category = category;

      // Handle price range
      if (priceRange === 'under5000') {
        params.maxPrice = 5000;
      } else if (priceRange === '5000-15000') {
        params.minPrice = 5000;
        params.maxPrice = 15000;
      } else if (priceRange === 'over15000') {
        params.minPrice = 15000;
      }

      params.limit = 50;

      const result = await apiClient.searchProducts(params);

      if (result && result.success && result.data?.products) {
        let products = result.data.products;

        // Sort products
        if (sortBy === 'price-low') {
          products = [...products].sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortBy === 'price-high') {
          products = [...products].sort((a, b) => (b.price || 0) - (a.price || 0));
        } else if (sortBy === 'name') {
          products = [...products].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        }

        setSearchResults(products);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred during search. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  // Initial load - read query from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q') || '';
      const cat = params.get('category') || '';

      setQuery(q);
      setSearchInput(q);
      setSelectedCategory(cat);

      performSearch(q, cat, selectedPriceRange);
    }
  }, []);

  // Re-search when sort changes
  useEffect(() => {
    if (!loading && searchResults.length > 0) {
      performSearch(query, selectedCategory, selectedPriceRange);
    }
  }, [sortBy]);

  // Handle search form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput);

    // Update URL
    const params = new URLSearchParams();
    if (searchInput) params.set('q', searchInput);
    if (selectedCategory) params.set('category', selectedCategory);
    router.push(`/search?${params.toString()}`);

    performSearch(searchInput, selectedCategory, selectedPriceRange);
  };

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    performSearch(query, categoryId, selectedPriceRange);
  };

  // Handle price range change
  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(range);
    performSearch(query, selectedCategory, range);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedPriceRange('all');
    performSearch(query, '', 'all');
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCategory !== '' || selectedPriceRange !== 'all';

  // Memoize category counts - compute once when searchResults changes
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { '': searchResults.length };
    for (const p of searchResults) {
      if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [searchResults]);

  // Memoize price range counts - compute once when searchResults changes
  const priceRangeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: searchResults.length };
    for (const p of searchResults) {
      const price = parsePrice(p.price);
      if (price < 5000) counts.under5000 = (counts.under5000 || 0) + 1;
      if (price >= 5000 && price <= 15000) counts['5000-15000'] = (counts['5000-15000'] || 0) + 1;
      if (price > 15000) counts.over15000 = (counts.over15000 || 0) + 1;
    }
    return counts;
  }, [searchResults]);

  // O(1) lookup functions
  const getCategoryCount = (categoryId: string) => categoryCounts[categoryId] || 0;
  const getPriceRangeCount = (range: string) => priceRangeCounts[range] || 0;

  return (
    <SearchContainer>
      <Header activePage="search" />

      <SearchHeaderSection>
        <h1>Search</h1>
        {query && (
          <p className="search-query">
            Results for <span>"{query}"</span>
          </p>
        )}
      </SearchHeaderSection>

      <SearchInputWrapper>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </SearchInputWrapper>

      <SearchContent>
        <MobileFilterToggle onClick={() => setMobileFiltersOpen(true)}>
          <i className="fas fa-filter"></i>
          Filters {hasActiveFilters && ' (active)'}
        </MobileFilterToggle>

        <MobileFilterPanel
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          activeFilterSummary={
            <>
              {selectedCategory && (
                <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                  <strong>Category:</strong> {selectedCategory}
                </div>
              )}
              {selectedPriceRange !== 'all' && (
                <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                  <strong>Price:</strong> {PRICE_RANGES.find(r => r.value === selectedPriceRange)?.label}
                </div>
              )}
            </>
          }
        >
          <MobileFilterSection
            title="Category"
            options={SHOP_CATEGORIES.map(c => ({ value: c.id, label: c.name }))}
            selectedValue={selectedCategory}
            onSelect={(val) => { handleCategoryChange(val); setMobileFiltersOpen(false); }}
          />
          <MobileFilterSection
            title="Price Range"
            options={PRICE_RANGES.map(r => ({ value: r.value, label: r.label }))}
            selectedValue={selectedPriceRange}
            onSelect={(val) => { handlePriceRangeChange(val); setMobileFiltersOpen(false); }}
          />
        </MobileFilterPanel>

        {/* Desktop Filters - Shop-style */}
        <ProductFilters>
          {/* Department Header */}
          <FilterDepartmentHeader>
            <i className="fas fa-filter"></i>
            Filters
          </FilterDepartmentHeader>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <ActiveFiltersSummary>
              {selectedCategory && (
                <span><strong>Category:</strong> {selectedCategory}</span>
              )}
              {selectedPriceRange !== 'all' && (
                <span><strong>Price:</strong> {PRICE_RANGES.find(r => r.value === selectedPriceRange)?.label}</span>
              )}
            </ActiveFiltersSummary>
          )}

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <ClearFiltersButton onClick={handleClearFilters}>
              Clear All Filters
            </ClearFiltersButton>
          )}

          {/* Category Filter */}
          <FilterSection $collapsed={collapsedSections.category}>
            <FilterHeader
              $collapsed={collapsedSections.category}
              onClick={() => toggleSection('category')}
            >
              <h3>Category</h3>
              <i className="fas fa-chevron-down toggle-icon"></i>
            </FilterHeader>
            <FilterContent $collapsed={collapsedSections.category}>
              {SHOP_CATEGORIES.map(cat => (
                <FilterOption
                  key={cat.id}
                  $active={selectedCategory === cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span style={{ flex: 1 }}>{cat.name}</span>
                  <span style={{ color: '#888', fontSize: '11px' }}>{getCategoryCount(cat.id)}</span>
                </FilterOption>
              ))}
            </FilterContent>
          </FilterSection>

          {/* Price Range Filter */}
          <FilterSection $collapsed={collapsedSections.price}>
            <FilterHeader
              $collapsed={collapsedSections.price}
              onClick={() => toggleSection('price')}
            >
              <h3>Price</h3>
              <i className="fas fa-chevron-down toggle-icon"></i>
            </FilterHeader>
            <FilterContent $collapsed={collapsedSections.price}>
              {PRICE_RANGES.map(range => (
                <FilterOption
                  key={range.value}
                  $active={selectedPriceRange === range.value}
                  onClick={() => handlePriceRangeChange(range.value)}
                >
                  <span style={{ flex: 1 }}>{range.label}</span>
                  <span style={{ color: '#888', fontSize: '11px' }}>{getPriceRangeCount(range.value)}</span>
                </FilterOption>
              ))}
            </FilterContent>
          </FilterSection>
        </ProductFilters>

        {/* Results */}
        <ResultsSection>
          {loading ? (
            <LoadingState>
              <div className="spinner"></div>
              <p>Searching products...</p>
            </LoadingState>
          ) : error ? (
            <EmptyState>
              <div className="icon">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button className="browse-btn" onClick={() => performSearch(query, selectedCategory, selectedPriceRange)}>
                Try Again
              </button>
            </EmptyState>
          ) : searchResults.length > 0 ? (
            <>
              <ResultsHeader>
                <div className="results-count">
                  Showing <span>{searchResults.length}</span> products
                </div>
                <div className="sort-by">
                  <label>Sort by:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </ResultsHeader>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '12px',
                padding: '0'
              }}>
                {searchResults.map((product) => (
                  <ProductCardWithVariant
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState>
              <div className="icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>No products found</h3>
              <p>
                {query
                  ? `We couldn't find any products matching "${query}". Try different keywords or browse our categories.`
                  : 'Enter a search term or select a category to find products.'}
              </p>
              <button className="browse-btn" onClick={() => router.push('/shop')}>
                Browse All Products
              </button>
            </EmptyState>
          )}
        </ResultsSection>
      </SearchContent>

      <Footer />
    </SearchContainer>
  );
};

export default SearchPage;