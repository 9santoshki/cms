'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProduct } from '../context/ProductContext';
import { useCategories } from '../context/CategoriesContext';
import Header from './Header';
import Footer from './Footer';
import ProductCardWithVariant from './ProductCardWithVariant';
import { getDisplayPrice } from '../lib/utils';

// Import elegant shop page styles
import {
  ShopContainer,
  MainContent,
  ProductsSection,
  ProductFilters,
  FilterSection,
  FilterHeader,
  FilterContent,
  FilterOption,
  FilterDepartmentHeader,
  ClearFiltersButton,
  ActiveFiltersSummary,
  Pagination,
  PageButton,
  LoadingSpinner,
  ErrorContainer,
  MobileFilterToggle,
} from '../styles/NewShopStyles';

// Category icons
const CATEGORY_ICONS: Record<string, string> = {
  'Living Room': 'fa-couch',
  'Dining Room': 'fa-utensils',
  'Bedroom': 'fa-bed',
  'Office': 'fa-desktop',
  'Home Office': 'fa-desktop',
  'Lighting': 'fa-lightbulb',
  'Decor': 'fa-palette',
  'Outdoor': 'fa-tree',
};

interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  is_active: boolean;
  children?: Category[];
}

const NewShopPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    products,
    loading: productLoading,
    error: productError,
    fetchProducts
  } = useProduct();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [filters, setFilters] = useState({
    category: 'All',
    subcategory: 'All',
    brand: 'All',
    priceRange: 'All',
    sortBy: 'name'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Collapsible filter sections state
  const [collapsedSections, setCollapsedSections] = useState({
    category: false,
    subcategory: false,
    brand: false,
    price: false
  });

  // Mobile filter panel state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Show more categories state
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Number of categories to show initially (excluding 'All')
  const INITIAL_CATEGORY_COUNT = 3;

  // Toggle section collapse
  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data.filter((c: Category) => c.parent_id === null && c.is_active));
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Read ALL filter state from URL params — restores state on back navigation
  useEffect(() => {
    setFilters({
      category:   searchParams.get('category')   || 'All',
      subcategory: searchParams.get('subcategory') || 'All',
      brand:      searchParams.get('brand')       || 'All',
      priceRange: searchParams.get('priceRange')  || 'All',
      sortBy:     searchParams.get('sortBy')      || 'name',
    });
    setCurrentPage(searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1);
    setShowAllCategories(false);
  }, [searchParams]);

  // Helper: push current filter state into URL so back button restores it
  const syncToUrl = (next: typeof filters, page = 1) => {
    const params = new URLSearchParams();
    if (next.category   !== 'All')  params.set('category',   next.category);
    if (next.subcategory !== 'All') params.set('subcategory', next.subcategory);
    if (next.brand      !== 'All')  params.set('brand',       next.brand);
    if (next.priceRange !== 'All')  params.set('priceRange',  next.priceRange);
    if (next.sortBy     !== 'name') params.set('sortBy',      next.sortBy);
    if (page > 1)                   params.set('page',        String(page));
    router.replace(`/shop${params.toString() ? '?' + params.toString() : ''}`, { scroll: false });
  };

  // Fetch products when component mounts
  useEffect(() => {
    if (!productLoading) {
      fetchProducts();
    }
  }, []);

  // Memoize counts by category (O(products) once per render, not per call)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const product of products) {
      const cat = product.category;
      if (!cat) continue;
      counts[cat] = (counts[cat] || 0) + 1;
    }
    // "All" = sum of listed category counts only (keeps All consistent with what's shown)
    const listed = new Set(categories.map(c => c.name));
    counts['All'] = Object.entries(counts)
      .filter(([cat]) => listed.has(cat))
      .reduce((sum, [, n]) => sum + n, 0);
    return counts;
  }, [products, categories]);

  // Memoize subcategory counts (computed when category is selected)
  const subcategoryCounts = useMemo(() => {
    if (!filters.category || filters.category === 'All') return {};
    const counts: Record<string, number> = {};
    for (const product of products) {
      if (product.category === filters.category) {
        const subcat = product.subcategory;
        if (!subcat) continue;
        counts[subcat] = (counts[subcat] || 0) + 1;
      }
    }
    // "All" = sum of listed subcategory counts only
    const cat = categories.find(c => c.name === filters.category);
    const listed = new Set((cat?.children ?? []).map(c => c.name));
    counts['All'] = Object.entries(counts)
      .filter(([subcat]) => listed.has(subcat))
      .reduce((sum, [, n]) => sum + n, 0);
    return counts;
  }, [products, filters.category, categories]);

  // Memoize brand counts — scoped to active category + subcategory
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const listedCategories = new Set(categories.map(c => c.name));
    const activeCat = categories.find(c => c.name === filters.category);
    const listedSubcats = activeCat ? new Set((activeCat.children ?? []).map(c => c.name)) : null;

    for (const product of products) {
      if (!product.brand) continue;
      if (filters.category === 'All') {
        if (!listedCategories.has(product.category ?? '')) continue;
      } else {
        if (product.category !== filters.category) continue;
        if (filters.subcategory !== 'All') {
          if (product.subcategory !== filters.subcategory) continue;
        } else if (listedSubcats) {
          if (!product.subcategory || !listedSubcats.has(product.subcategory)) continue;
        }
      }
      counts[product.brand] = (counts[product.brand] || 0) + 1;
    }
    return counts;
  }, [products, filters.category, filters.subcategory, categories]);

  // Memoize price range counts — scoped to active category + subcategory,
  // using the same "listed only" logic as categoryCounts / subcategoryCounts
  // so the "All" row always matches the adjacent filter section's "All" count.
  const priceRangeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 0, 'Under ₹5,000': 0, '₹5,000 - ₹15,000': 0, 'Over ₹15,000': 0 };
    const listedCategories = new Set(categories.map(c => c.name));
    const activeCat = categories.find(c => c.name === filters.category);
    const listedSubcats = activeCat ? new Set((activeCat.children ?? []).map(c => c.name)) : null;

    for (const product of products) {
      if (filters.category === 'All') {
        // Mirror categoryCounts: only products in listed categories
        if (!listedCategories.has(product.category ?? '')) continue;
      } else {
        if (product.category !== filters.category) continue;
        if (filters.subcategory !== 'All') {
          if (product.subcategory !== filters.subcategory) continue;
        } else if (listedSubcats) {
          // Mirror subcategoryCounts: only products with listed subcategories
          if (!product.subcategory || !listedSubcats.has(product.subcategory)) continue;
        }
      }
      if (filters.brand !== 'All' && product.brand !== filters.brand) continue;
      const price = getDisplayPrice(product);
      if (price < 5000) counts['Under ₹5,000']++;
      else if (price <= 15000) counts['₹5,000 - ₹15,000']++;
      else counts['Over ₹15,000']++;
      counts['All']++;
    }
    return counts;
  }, [products, filters.category, filters.subcategory, filters.brand, categories]);

  // Get product count by category (uses memoized counts)
  const getCategoryCount = (category: string): number => {
    return categoryCounts[category] || 0;
  };

  // Get product count by subcategory (uses memoized counts)
  const getSubcategoryCount = (subcategory: string): number => {
    return subcategoryCounts[subcategory] || 0;
  };

  // Get product count by price range (uses memoized counts)
  const getPriceRangeCount = (range: string): number => {
    return priceRangeCounts[range] || 0;
  };

  // Filter and sort products based on selected filters
  const filteredProducts = products
    .filter(product => {
      // Category filter
      if (filters.category !== 'All') {
        if (product.category !== filters.category) {
          return false;
        }
        // Subcategory filter (only when category is selected)
        if (filters.subcategory !== 'All' && product.subcategory !== filters.subcategory) {
          return false;
        }
      }

      // Brand filter
      if (filters.brand !== 'All' && product.brand !== filters.brand) {
        return false;
      }

      // Price range filter
      if (filters.priceRange !== 'All') {
        const displayPrice = getDisplayPrice(product);

        if (filters.priceRange === 'Under ₹5,000') {
          if (displayPrice >= 5000) return false;
        } else if (filters.priceRange === '₹5,000 - ₹15,000') {
          if (displayPrice < 5000 || displayPrice > 15000) return false;
        } else if (filters.priceRange === 'Over ₹15,000') {
          if (displayPrice <= 15000) return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (filters.sortBy === 'price-low') {
        return getDisplayPrice(a) - getDisplayPrice(b);
      } else if (filters.sortBy === 'price-high') {
        return getDisplayPrice(b) - getDisplayPrice(a);
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get visible categories based on showAllCategories state (using dynamic categories from state)
  const visibleCategories = showAllCategories
    ? ['All', ...categories.map(c => c.name)]
    : ['All', ...categories.slice(0, INITIAL_CATEGORY_COUNT).map(c => c.name)];

  // Get subcategories for selected category from database categories
  const getSubcategoriesForCategory = (categoryName: string): string[] => {
    if (categoryName === 'All') return [];
    const cat = categories.find(c => c.name === categoryName);
    if (!cat || !cat.children) return [];
    return ['All', ...cat.children.map(c => c.name)];
  };

  const handleFilterChange = (filterType: string, value: string | undefined) => {
    const next = filterType === 'category'
      ? { ...filters, category: value || 'All', subcategory: 'All', brand: 'All' }
      : { ...filters, [filterType]: value || '' };
    setFilters(next);
    setCurrentPage(1);
    syncToUrl(next, 1);
  };

  // Clear all filters
  const clearFilters = () => {
    const reset = { category: 'All', subcategory: 'All', brand: 'All', priceRange: 'All', sortBy: 'name' };
    setFilters(reset);
    setCurrentPage(1);
    syncToUrl(reset, 1);
  };

  // Check if any filters are active
  const hasActiveFilters = filters.category !== 'All' ||
                           filters.subcategory !== 'All' ||
                           filters.brand !== 'All' ||
                           filters.priceRange !== 'All';

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
        <button className="btn primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </ErrorContainer>
    );
  }

  return (
    <ShopContainer>
      {/* Navigation Bar */}
      <Header activePage="shop" />

      {/* Main Content */}
      <MainContent style={{ marginTop: '0' }}>
        {/* Mobile Filters Overlay */}
        {mobileFiltersOpen && (
          <div
            onClick={() => setMobileFiltersOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
            }}
          />
        )}

        {/* Mobile Filters Panel */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '280px',
            background: 'white',
            zIndex: 1001,
            transform: mobileFiltersOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Mobile Filter Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
            color: 'white',
          }}>
            <span style={{ fontWeight: '600', fontSize: '16px' }}>Filters</span>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Active Filters Summary in Mobile */}
          {hasActiveFilters && (
            <div style={{
              padding: '12px 16px',
              background: '#fff3cd',
              borderBottom: '1px solid #e5e5e5',
            }}>
              <div style={{ fontSize: '12px', color: '#856404', marginBottom: '8px' }}>
                Active filters:
              </div>
              {filters.category !== 'All' && (
                <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                  <strong>Category:</strong> {filters.category}
                </div>
              )}
              {filters.subcategory !== 'All' && (
                <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                  <strong>Subcategory:</strong> {filters.subcategory}
                </div>
              )}
              {filters.brand !== 'All' && (
                <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                  <strong>Brand:</strong> {filters.brand}
                </div>
              )}
              {filters.priceRange !== 'All' && (
                <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                  <strong>Price:</strong> {filters.priceRange}
                </div>
              )}
              <button
                onClick={() => { clearFilters(); setMobileFiltersOpen(false); }}
                style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  background: '#c19a6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Clear All
              </button>
            </div>
          )}

          {/* Mobile Category Filter */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#c19a6b', marginBottom: '10px' }}>
              Department
            </h4>
            {['All', ...categories.map(c => c.name)]
              .filter(category => category === 'All' || getCategoryCount(category) > 0)
              .slice(0, showAllCategories ? undefined : INITIAL_CATEGORY_COUNT + 1)
              .map(category => (
              <div
                key={category}
                onClick={() => { handleFilterChange('category', category); }}
                style={{
                  padding: '10px 8px',
                  fontSize: '14px',
                  color: filters.category === category ? '#c19a6b' : '#333',
                  fontWeight: filters.category === category ? '600' : '400',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {category !== 'All' && CATEGORY_ICONS[category] && (
                  <i className={`fas ${CATEGORY_ICONS[category]}`} style={{ fontSize: '12px' }}></i>
                )}
                <span style={{ flex: 1 }}>{category}</span>
                <span style={{ color: '#888', fontSize: '12px' }}>{getCategoryCount(category)}</span>
              </div>
            ))}
            {categories.length > INITIAL_CATEGORY_COUNT + 1 && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                style={{
                  padding: '8px',
                  background: 'transparent',
                  border: 'none',
                  color: '#007185',
                  fontSize: '12px',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                {showAllCategories ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Mobile Subcategory Filter */}
          {filters.category !== 'All' && getSubcategoriesForCategory(filters.category).length > 0 && (
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#c19a6b', marginBottom: '10px' }}>
                {filters.category}
              </h4>
              {getSubcategoriesForCategory(filters.category)
                .filter(subcategory => subcategory === 'All' || getSubcategoryCount(subcategory) > 0)
                .map(subcategory => (
                <div
                  key={subcategory}
                  onClick={() => { handleFilterChange('subcategory', subcategory); }}
                  style={{
                    padding: '10px 8px',
                    fontSize: '14px',
                    color: filters.subcategory === subcategory ? '#c19a6b' : '#333',
                    fontWeight: filters.subcategory === subcategory ? '600' : '400',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ flex: 1 }}>{subcategory}</span>
                  <span style={{ color: '#888', fontSize: '12px' }}>{getSubcategoryCount(subcategory)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Brand Filter */}
          {Object.keys(brandCounts).length > 0 && (
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#c19a6b', marginBottom: '10px' }}>
                Brand
              </h4>
              {['All', ...Object.keys(brandCounts)].map(brand => (
                <div
                  key={brand}
                  onClick={() => { handleFilterChange('brand', brand); }}
                  style={{
                    padding: '10px 8px',
                    fontSize: '14px',
                    color: filters.brand === brand ? '#c19a6b' : '#333',
                    fontWeight: filters.brand === brand ? '600' : '400',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ flex: 1 }}>{brand === 'All' ? 'All Brands' : brand}</span>
                  {brand !== 'All' && <span style={{ color: '#888', fontSize: '12px' }}>{brandCounts[brand]}</span>}
                </div>
              ))}
            </div>
          )}

          {/* Mobile Price Filter */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#c19a6b', marginBottom: '10px' }}>
              Price Range
            </h4>
            {[
              { value: 'All', label: 'All Prices' },
              { value: 'Under ₹5,000', label: 'Under ₹5,000' },
              { value: '₹5,000 - ₹15,000', label: '₹5,000 - ₹15,000' },
              { value: 'Over ₹15,000', label: 'Over ₹15,000' }
            ].filter(({ value }) => value === 'All' || getPriceRangeCount(value) > 0)
            .map(({ value, label }) => (
              <div
                key={value}
                onClick={() => { handleFilterChange('priceRange', value); }}
                style={{
                  padding: '10px 8px',
                  fontSize: '14px',
                  color: filters.priceRange === value ? '#c19a6b' : '#333',
                  fontWeight: filters.priceRange === value ? '600' : '400',
                  cursor: 'pointer',
                }}
              >
                <span style={{ flex: 1 }}>{label}</span>
                <span style={{ color: '#888', fontSize: '12px' }}>{getPriceRangeCount(value)}</span>
              </div>
            ))}
          </div>

          {/* Apply Button */}
          <div style={{ padding: '16px' }}>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#c19a6b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>

        <ProductFilters>
          {/* Department Header */}
          <FilterDepartmentHeader>
            <i className="fas fa-filter"></i>
            Filters
          </FilterDepartmentHeader>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <ActiveFiltersSummary>
              {filters.category !== 'All' && (
                <span><strong>Category:</strong> {filters.category}</span>
              )}
              {filters.subcategory !== 'All' && (
                <span><strong>Subcategory:</strong> {filters.subcategory}</span>
              )}
              {filters.brand !== 'All' && (
                <span><strong>Brand:</strong> {filters.brand}</span>
              )}
              {filters.priceRange !== 'All' && (
                <span><strong>Price:</strong> {filters.priceRange}</span>
              )}
            </ActiveFiltersSummary>
          )}

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <ClearFiltersButton onClick={clearFilters}>
              Clear All Filters
            </ClearFiltersButton>
          )}

          {/* Category Filter */}
          <FilterSection $collapsed={collapsedSections.category}>
            <FilterHeader
              $collapsed={collapsedSections.category}
              onClick={() => toggleSection('category')}
            >
              <h3>Department</h3>
              <i className="fas fa-chevron-down toggle-icon"></i>
            </FilterHeader>
            <FilterContent $collapsed={collapsedSections.category}>
              {visibleCategories
                .filter(category => category === 'All' || getCategoryCount(category) > 0)
                .map(category => (
                <FilterOption
                  key={category}
                  $active={filters.category === category}
                  onClick={() => handleFilterChange('category', category)}
                >
                  {category !== 'All' && category && CATEGORY_ICONS[category] && (
                    <i className={`fas ${CATEGORY_ICONS[category]}`} style={{ fontSize: '11px', color: '#888' }}></i>
                  )}
                  <span style={{ flex: 1 }}>{category}</span>
                  <span style={{ color: '#888', fontSize: '11px' }}>{getCategoryCount(category)}</span>
                </FilterOption>
              ))}
              {/* Show more/less button */}
              {categories.length > INITIAL_CATEGORY_COUNT + 1 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 12px',
                    background: 'transparent',
                    border: 'none',
                    color: '#007185',
                    fontSize: '12px',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <i className={`fas fa-chevron-${showAllCategories ? 'up' : 'down'}`} style={{ fontSize: '10px' }}></i>
                  {showAllCategories ? 'See less' : 'See more'}
                </button>
              )}
            </FilterContent>
          </FilterSection>

          {/* Subcategory Filter - only shows when a category is selected */}
          {filters.category !== 'All' && getSubcategoriesForCategory(filters.category).length > 0 && (
            <FilterSection $collapsed={collapsedSections.subcategory}>
              <FilterHeader
                $collapsed={collapsedSections.subcategory}
                onClick={() => toggleSection('subcategory')}
              >
                <h3>{filters.category}</h3>
                <i className="fas fa-chevron-down toggle-icon"></i>
              </FilterHeader>
              <FilterContent $collapsed={collapsedSections.subcategory}>
                {getSubcategoriesForCategory(filters.category)
                  .filter(subcategory => subcategory === 'All' || getSubcategoryCount(subcategory) > 0)
                  .map(subcategory => (
                  <FilterOption
                    key={subcategory}
                    $active={filters.subcategory === subcategory}
                    onClick={() => handleFilterChange('subcategory', subcategory)}
                  >
                    <span style={{ flex: 1 }}>{subcategory}</span>
                    <span style={{ color: '#888', fontSize: '11px' }}>{getSubcategoryCount(subcategory)}</span>
                  </FilterOption>
                ))}
              </FilterContent>
            </FilterSection>
          )}

          {/* Brand Filter — only shows when there are brands */}
          {Object.keys(brandCounts).length > 0 && (
            <FilterSection $collapsed={collapsedSections.brand}>
              <FilterHeader
                $collapsed={collapsedSections.brand}
                onClick={() => toggleSection('brand')}
              >
                <h3>Brand</h3>
                <i className="fas fa-chevron-down toggle-icon"></i>
              </FilterHeader>
              <FilterContent $collapsed={collapsedSections.brand}>
                <FilterOption
                  $active={filters.brand === 'All'}
                  onClick={() => handleFilterChange('brand', 'All')}
                >
                  <span style={{ flex: 1 }}>All Brands</span>
                </FilterOption>
                {Object.entries(brandCounts).map(([brand, count]) => (
                  <FilterOption
                    key={brand}
                    $active={filters.brand === brand}
                    onClick={() => handleFilterChange('brand', brand)}
                  >
                    <span style={{ flex: 1 }}>{brand}</span>
                    <span style={{ color: '#888', fontSize: '11px' }}>{count}</span>
                  </FilterOption>
                ))}
              </FilterContent>
            </FilterSection>
          )}

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
              {[
                { value: 'All', label: 'All Prices' },
                { value: 'Under ₹5,000', label: 'Under ₹5,000' },
                { value: '₹5,000 - ₹15,000', label: '₹5,000 - ₹15,000' },
                { value: 'Over ₹15,000', label: 'Over ₹15,000' }
              ].filter(({ value }) => value === 'All' || getPriceRangeCount(value) > 0)
              .map(({ value, label }) => (
                <FilterOption
                  key={value}
                  $active={filters.priceRange === value}
                  onClick={() => handleFilterChange('priceRange', value)}
                >
                  <span style={{ flex: 1 }}>{label}</span>
                  <span style={{ color: '#888', fontSize: '11px' }}>{getPriceRangeCount(value)}</span>
                </FilterOption>
              ))}
            </FilterContent>
          </FilterSection>
        </ProductFilters>

        {/* Products Grid */}
        <ProductsSection>
          {/* Mobile Filter Toggle — inside ProductsSection so it stacks above the grid on mobile */}
          <MobileFilterToggle onClick={() => setMobileFiltersOpen(true)}>
            <i className="fas fa-filter"></i>
            Filters {hasActiveFilters && `(${filters.category !== 'All' ? filters.category : ''}${filters.subcategory !== 'All' ? ' › ' + filters.subcategory : ''})`}
          </MobileFilterToggle>

          {/* Results Header with Sort */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 0 12px 0',
            borderBottom: '1px solid #e5e5e5',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '14px', color: '#555' }}>
              <strong style={{ color: '#111' }}>{filteredProducts.length}</strong> results
              {filters.category !== 'All' && ` in ${filters.category}`}
              {filters.subcategory !== 'All' && ` › ${filters.subcategory}`}
            </span>
            {/* Sort Dropdown - Right Side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#555' }}>Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                style={{
                  padding: '6px 10px',
                  fontSize: '13px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  background: '#fff',
                  cursor: 'pointer',
                  color: '#111',
                  outline: 'none'
                }}
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '12px',
            padding: '0'
          }}>
            {currentItems && currentItems.length > 0 ? (
              currentItems.map(product => (
                <ProductCardWithVariant
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                <h3>No products available</h3>
                <p>Check back later for new products.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => { const p = Math.max(currentPage - 1, 1); setCurrentPage(p); syncToUrl(filters, p); }}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>

              {[...Array(totalPages)].map((_, i) => (
                <PageButton
                  key={i}
                  $active={currentPage === i + 1}
                  onClick={() => { setCurrentPage(i + 1); syncToUrl(filters, i + 1); }}
                >
                  {i + 1}
                </PageButton>
              ))}

              <PageButton
                onClick={() => { const p = Math.min(currentPage + 1, totalPages); setCurrentPage(p); syncToUrl(filters, p); }}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          )}
        </ProductsSection>
      </MainContent>

      <Footer />
    </ShopContainer>
  );
};

export default NewShopPage;