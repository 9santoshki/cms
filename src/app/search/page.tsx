"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { apiClient } from '@/lib/api';
import { Product } from '@/types';
import {
  SearchContainer,
  SearchHeaderSection,
  SearchContent,
  FiltersSection,
  FiltersCard,
  FilterGroup,
  CategoryList,
  CategoryItem,
  PriceRange,
  ApplyButton,
  ClearButton,
  ResultsSection,
  ResultsHeader,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  LoadingState,
  EmptyState,
  SearchInputWrapper,
  MobileFilterToggle,
  MobileFiltersOverlay,
  MobileFiltersPanel
} from '@/styles/SearchStyles';

const CATEGORIES = [
  { id: '', name: 'All Categories' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'decor', name: 'Home Decor' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'textiles', name: 'Textiles' },
  { id: 'outdoor', name: 'Outdoor' },
  { id: 'accessories', name: 'Accessories' }
];

const SearchPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Perform search
  const performSearch = useCallback(async (searchQuery: string, category?: string, min?: string, max?: string) => {
    setLoading(true);
    setError(null);

    try {
      const params: any = {};
      if (searchQuery) params.q = searchQuery;
      if (category) params.category = category;
      if (min) params.minPrice = parseFloat(min);
      if (max) params.maxPrice = parseFloat(max);
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

      performSearch(q, cat, minPrice, maxPrice);
    }
  }, []);

  // Re-search when sort changes
  useEffect(() => {
    if (!loading && searchResults.length > 0) {
      performSearch(query, selectedCategory, minPrice, maxPrice);
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

    performSearch(searchInput, selectedCategory, minPrice, maxPrice);
  };

  // Handle filter apply
  const handleApplyFilters = () => {
    setMobileFiltersOpen(false);
    performSearch(query, selectedCategory, minPrice, maxPrice);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    performSearch(query, '', '', '');
  };

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Navigate to product
  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.slug || product.id}`);
  };

  // Get image URL - prioritize Cloudflare R2 URLs
  const getImageUrl = (product: Product & { images?: any[] }) => {
    // First check primary_image (should have Cloudflare URL)
    if (product.primary_image && product.primary_image.startsWith('http')) {
      return product.primary_image;
    }

    // Check images array for Cloudflare URLs
    if (product.images && product.images.length > 0) {
      const primaryImg = product.images.find((img: any) => img.is_primary);
      if (primaryImg?.url && primaryImg.url.startsWith('http')) {
        return primaryImg.url;
      }
      // Use first image if no primary
      const firstImg = product.images[0];
      if (firstImg?.url && firstImg.url.startsWith('http')) {
        return firstImg.url;
      }
    }

    // Check image_url if it's a valid URL
    if (product.image_url && product.image_url.startsWith('http')) {
      return product.image_url;
    }

    // Return null to show placeholder
    return null;
  };

  // Render filters
  const renderFilters = () => (
    <>
      <FilterGroup>
        <h4>Category</h4>
        <CategoryList>
          {CATEGORIES.map(cat => (
            <CategoryItem
              key={cat.id}
              $active={selectedCategory === cat.id}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.name}
            </CategoryItem>
          ))}
        </CategoryList>
      </FilterGroup>

      <FilterGroup>
        <h4>Price Range</h4>
        <PriceRange>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </PriceRange>
      </FilterGroup>

      <ApplyButton onClick={handleApplyFilters}>
        Apply Filters
      </ApplyButton>

      {(selectedCategory || minPrice || maxPrice) && (
        <ClearButton onClick={handleClearFilters}>
          Clear All Filters
        </ClearButton>
      )}
    </>
  );

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
        <form onSubmit={handleSearch} style={{ display: 'flex', flex: 1, gap: '10px' }}>
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
        {/* Mobile Filter Toggle */}
        <MobileFilterToggle onClick={() => setMobileFiltersOpen(true)}>
          <i className="fas fa-filter"></i>
          Filters
        </MobileFilterToggle>

        {/* Mobile Filters Overlay */}
        <MobileFiltersOverlay
          $isOpen={mobileFiltersOpen}
          onClick={() => setMobileFiltersOpen(false)}
        />

        {/* Mobile Filters Panel */}
        <MobileFiltersPanel $isOpen={mobileFiltersOpen}>
          <button className="close-btn" onClick={() => setMobileFiltersOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
          <h3 style={{ marginBottom: '20px', fontFamily: 'var(--font-playfair)' }}>Filters</h3>
          {renderFilters()}
        </MobileFiltersPanel>

        {/* Desktop Filters */}
        <FiltersSection>
          <FiltersCard>
            <h3>Filters</h3>
            {renderFilters()}
          </FiltersCard>
        </FiltersSection>

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
              <button className="browse-btn" onClick={() => performSearch(query, selectedCategory, minPrice, maxPrice)}>
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

              <ProductsGrid>
                {searchResults.map((product) => {
                  const imageUrl = getImageUrl(product);
                  return (
                    <ProductCard key={product.id} onClick={() => handleProductClick(product)}>
                      <ProductImage>
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="product-img"
                            onError={(e) => {
                              // On error, hide image and show placeholder
                              e.currentTarget.style.display = 'none';
                              const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                              if (placeholder) placeholder.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="placeholder" style={{ display: imageUrl ? 'none' : 'flex' }}>
                          <i className="fas fa-image"></i>
                        </div>
                        {product.category && (
                          <div className="category-badge">{product.category}</div>
                        )}
                      </ProductImage>
                      <ProductInfo>
                        <h3>{product.name}</h3>
                        {product.description && (
                          <p className="description">{product.description}</p>
                        )}
                        <div className="price-row">
                          <span className="price">
                            ₹{(typeof product.price === 'number' ? product.price : parseFloat(product.price || '0')).toLocaleString()}
                          </span>
                          <button className="view-btn">View</button>
                        </div>
                      </ProductInfo>
                    </ProductCard>
                  );
                })}
              </ProductsGrid>
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
