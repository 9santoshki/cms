'use client';

/**
 * ProductBrowser — shared filter sidebar + product grid used by both
 * the Shop page and the Search page.
 *
 * Parents supply:
 *   - products     : already-fetched list (filtered by text search on search page,
 *                    or the full catalogue on the shop page)
 *   - categories   : from /api/admin/categories (with children)
 *
 * ProductBrowser owns all client-side filter / sort / pagination state.
 * Parents can optionally read/write that state via initialFilters + onFiltersChange
 * (used by the shop page for URL sync).
 */

import React, { useState, useMemo } from 'react';
import ProductCardWithVariant from './ProductCardWithVariant';
import { getDisplayPrice } from '@/lib/utils';
import {
  ProductFilters,
  ProductsSection,
  FilterSection,
  FilterHeader,
  FilterContent,
  FilterOption,
  FilterDepartmentHeader,
  ClearFiltersButton,
  ActiveFiltersSummary,
  Pagination,
  PageButton,
  MobileFilterToggle,
} from '@/styles/NewShopStyles';
import { Product } from '@/types';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Category {
  id: number;
  name: string;
  slug?: string;
  parent_id: number | null;
  is_active: boolean;
  children?: Category[];
}

export interface BrowserFilters {
  category: string;
  subcategory: string;
  brand: string;
  priceRange: string;
  sortBy: string;
}

export const DEFAULT_FILTERS: BrowserFilters = {
  category: 'All',
  subcategory: 'All',
  brand: 'All',
  priceRange: 'All',
  sortBy: 'name',
};

// ── Constants ─────────────────────────────────────────────────────────────────

const PRICE_OPTIONS = [
  { value: 'All', label: 'All Prices' },
  { value: 'Under ₹5,000', label: 'Under ₹5,000' },
  { value: '₹5,000 - ₹15,000', label: '₹5,000 - ₹15,000' },
  { value: 'Over ₹15,000', label: 'Over ₹15,000' },
];

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

const ITEMS_PER_PAGE = 12;
const INITIAL_CATEGORY_COUNT = 3;

// ── Props ─────────────────────────────────────────────────────────────────────

interface ProductBrowserProps {
  products: Product[];
  categories: Category[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  onRetry?: () => void;
  /** Restore filter state (e.g. from URL params) */
  initialFilters?: Partial<BrowserFilters>;
  /** Called whenever filter/sort state changes — useful for URL sync */
  onFiltersChange?: (filters: BrowserFilters) => void;
  /** Start with all categories expanded (no "See more" truncation) */
  showAllCategoriesInitially?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const ProductBrowser: React.FC<ProductBrowserProps> = ({
  products,
  categories,
  loading,
  error,
  emptyMessage = 'No products available.',
  onRetry,
  initialFilters,
  onFiltersChange,
  showAllCategoriesInitially = false,
}) => {
  const [filters, setFilters] = useState<BrowserFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(showAllCategoriesInitially);
  const [collapsedSections, setCollapsedSections] = useState({
    category: false,
    subcategory: false,
    brand: false,
    price: false,
  });

  const toggleSection = (key: keyof typeof collapsedSections) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const updateFilters = (next: BrowserFilters) => {
    setFilters(next);
    setCurrentPage(1);
    onFiltersChange?.(next);
  };

  const handleFilterChange = (key: keyof BrowserFilters, value: string) => {
    const next =
      key === 'category'
        ? { ...filters, category: value, subcategory: 'All', brand: 'All' }
        : { ...filters, [key]: value };
    updateFilters(next);
  };

  const clearFilters = () => updateFilters({ ...DEFAULT_FILTERS });

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.subcategory !== 'All' ||
    filters.brand !== 'All' ||
    filters.priceRange !== 'All';

  // ── Counts (same logic as NewShopPage) ────────────────────────────────────

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
    }
    const listed = new Set(categories.map(c => c.name));
    counts['All'] = Object.entries(counts)
      .filter(([cat]) => listed.has(cat))
      .reduce((sum, [, n]) => sum + n, 0);
    return counts;
  }, [products, categories]);

  const subcategoryCounts = useMemo(() => {
    if (filters.category === 'All') return {} as Record<string, number>;
    const counts: Record<string, number> = {};
    for (const p of products) {
      if (p.category === filters.category && p.subcategory) {
        counts[p.subcategory] = (counts[p.subcategory] || 0) + 1;
      }
    }
    const cat = categories.find(c => c.name === filters.category);
    const listed = new Set((cat?.children ?? []).map(c => c.name));
    counts['All'] = Object.entries(counts)
      .filter(([sub]) => listed.has(sub))
      .reduce((sum, [, n]) => sum + n, 0);
    return counts;
  }, [products, filters.category, categories]);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const listedCats = new Set(categories.map(c => c.name));
    const activeCat = categories.find(c => c.name === filters.category);
    const listedSubs = activeCat ? new Set((activeCat.children ?? []).map(c => c.name)) : null;

    for (const p of products) {
      if (!p.brand) continue;
      if (filters.category === 'All') {
        if (!listedCats.has(p.category ?? '')) continue;
      } else {
        if (p.category !== filters.category) continue;
        if (filters.subcategory !== 'All') {
          if (p.subcategory !== filters.subcategory) continue;
        } else if (listedSubs) {
          if (!p.subcategory || !listedSubs.has(p.subcategory)) continue;
        }
      }
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    }
    return counts;
  }, [products, filters.category, filters.subcategory, categories]);

  const priceRangeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 0, 'Under ₹5,000': 0, '₹5,000 - ₹15,000': 0, 'Over ₹15,000': 0 };
    const listedCats = new Set(categories.map(c => c.name));
    const activeCat = categories.find(c => c.name === filters.category);
    const listedSubs = activeCat ? new Set((activeCat.children ?? []).map(c => c.name)) : null;

    for (const p of products) {
      if (filters.category === 'All') {
        if (!listedCats.has(p.category ?? '')) continue;
      } else {
        if (p.category !== filters.category) continue;
        if (filters.subcategory !== 'All') {
          if (p.subcategory !== filters.subcategory) continue;
        } else if (listedSubs) {
          if (!p.subcategory || !listedSubs.has(p.subcategory)) continue;
        }
      }
      if (filters.brand !== 'All' && p.brand !== filters.brand) continue;
      const price = getDisplayPrice(p);
      if (price < 5000) counts['Under ₹5,000']++;
      else if (price <= 15000) counts['₹5,000 - ₹15,000']++;
      else counts['Over ₹15,000']++;
      counts['All']++;
    }
    return counts;
  }, [products, filters.category, filters.subcategory, filters.brand, categories]);

  // ── Filtered + sorted products ─────────────────────────────────────────────

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (p.status && p.status !== 'published') return false;
        if (filters.category !== 'All') {
          if (p.category !== filters.category) return false;
          if (filters.subcategory !== 'All' && p.subcategory !== filters.subcategory) return false;
        }
        if (filters.brand !== 'All' && p.brand !== filters.brand) return false;
        if (filters.priceRange !== 'All') {
          const price = getDisplayPrice(p);
          if (filters.priceRange === 'Under ₹5,000' && price >= 5000) return false;
          if (filters.priceRange === '₹5,000 - ₹15,000' && (price < 5000 || price > 15000)) return false;
          if (filters.priceRange === 'Over ₹15,000' && price <= 15000) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return getDisplayPrice(a) - getDisplayPrice(b);
        if (filters.sortBy === 'price-high') return getDisplayPrice(b) - getDisplayPrice(a);
        return (a.name || '').localeCompare(b.name || '');
      });
  }, [products, filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getSubcategoriesForCategory = (name: string): string[] => {
    if (name === 'All') return [];
    const cat = categories.find(c => c.name === name);
    if (!cat?.children?.length) return [];
    return ['All', ...cat.children.filter(c => c.is_active).map(c => c.name)];
  };

  const visibleCategories = showAllCategories
    ? ['All', ...categories.map(c => c.name)]
    : ['All', ...categories.slice(0, INITIAL_CATEGORY_COUNT).map(c => c.name)];

  // On pages that show all categories initially (e.g. search), bypass the
  // zero-count filter so every active category is always visible as a filter option.
  const categoryVisible = (cat: string) =>
    cat === 'All' || showAllCategoriesInitially || (categoryCounts[cat] || 0) > 0;

  // ── Loading / error states ─────────────────────────────────────────────────

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '24px', color: '#c19a6b' }}></i>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: '#ef4444', marginBottom: '12px' }}>{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{ padding: '8px 16px', background: '#c19a6b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%', minWidth: 0 }}>
      {/* ── Mobile overlay ────────────────────────────────────────────────── */}
      {mobileFiltersOpen && (
        <div
          onClick={() => setMobileFiltersOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000 }}
        />
      )}

      {/* ── Mobile slide-in panel ─────────────────────────────────────────── */}
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
        }}
      >
        {/* Mobile header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)', color: 'white' }}>
          <span style={{ fontWeight: 600, fontSize: '16px' }}>Filters</span>
          <button onClick={() => setMobileFiltersOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', padding: '4px' }}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Active filters summary */}
        {hasActiveFilters && (
          <div style={{ padding: '12px 16px', background: '#fff3cd', borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ fontSize: '12px', color: '#856404', marginBottom: '8px' }}>Active filters:</div>
            {filters.category !== 'All' && <div style={{ fontSize: '12px', marginBottom: '4px' }}><strong>Category:</strong> {filters.category}</div>}
            {filters.subcategory !== 'All' && <div style={{ fontSize: '12px', marginBottom: '4px' }}><strong>Subcategory:</strong> {filters.subcategory}</div>}
            {filters.brand !== 'All' && <div style={{ fontSize: '12px', marginBottom: '4px' }}><strong>Brand:</strong> {filters.brand}</div>}
            {filters.priceRange !== 'All' && <div style={{ fontSize: '12px', marginBottom: '4px' }}><strong>Price:</strong> {filters.priceRange}</div>}
            <button onClick={() => { clearFilters(); setMobileFiltersOpen(false); }} style={{ marginTop: '8px', padding: '8px 12px', background: '#c19a6b', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', width: '100%' }}>
              Clear All
            </button>
          </div>
        )}

        {/* Mobile Category */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#c19a6b', marginBottom: '10px' }}>Department</h4>
          {['All', ...categories.map(c => c.name)]
            .filter(categoryVisible)
            .slice(0, showAllCategories ? undefined : INITIAL_CATEGORY_COUNT + 1)
            .map(cat => (
              <div key={cat} onClick={() => handleFilterChange('category', cat)} style={{ padding: '10px 8px', fontSize: '14px', color: filters.category === cat ? '#c19a6b' : '#333', fontWeight: filters.category === cat ? 600 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {cat !== 'All' && CATEGORY_ICONS[cat] && <i className={`fas ${CATEGORY_ICONS[cat]}`} style={{ fontSize: '12px' }}></i>}
                <span style={{ flex: 1 }}>{cat}</span>
                <span style={{ color: '#888', fontSize: '12px' }}>{categoryCounts[cat] || 0}</span>
              </div>
            ))}
          {categories.length > INITIAL_CATEGORY_COUNT && (
            <button onClick={() => setShowAllCategories(v => !v)} style={{ padding: '8px', background: 'transparent', border: 'none', color: '#007185', fontSize: '12px', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
              {showAllCategories ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Mobile Subcategory */}
        {filters.category !== 'All' && getSubcategoriesForCategory(filters.category).length > 0 && (
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#c19a6b', marginBottom: '10px' }}>{filters.category}</h4>
            {getSubcategoriesForCategory(filters.category)
              .filter(sub => sub === 'All' || (subcategoryCounts[sub] || 0) > 0)
              .map(sub => (
                <div key={sub} onClick={() => handleFilterChange('subcategory', sub)} style={{ padding: '10px 8px', fontSize: '14px', color: filters.subcategory === sub ? '#c19a6b' : '#333', fontWeight: filters.subcategory === sub ? 600 : 400, cursor: 'pointer' }}>
                  <span style={{ flex: 1 }}>{sub}</span>
                  <span style={{ color: '#888', fontSize: '12px' }}>{subcategoryCounts[sub] || 0}</span>
                </div>
              ))}
          </div>
        )}

        {/* Mobile Brand */}
        {Object.keys(brandCounts).length > 0 && (
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#c19a6b', marginBottom: '10px' }}>Brand</h4>
            {['All', ...Object.keys(brandCounts).sort()].map(brand => (
              <div key={brand} onClick={() => handleFilterChange('brand', brand)} style={{ padding: '10px 8px', fontSize: '14px', color: filters.brand === brand ? '#c19a6b' : '#333', fontWeight: filters.brand === brand ? 600 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <span style={{ flex: 1 }}>{brand === 'All' ? 'All Brands' : brand}</span>
                {brand !== 'All' && <span style={{ color: '#888', fontSize: '12px' }}>{brandCounts[brand]}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Mobile Price */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#c19a6b', marginBottom: '10px' }}>Price Range</h4>
          {PRICE_OPTIONS.filter(({ value }) => value === 'All' || (priceRangeCounts[value] || 0) > 0).map(({ value, label }) => (
            <div key={value} onClick={() => handleFilterChange('priceRange', value)} style={{ padding: '10px 8px', fontSize: '14px', color: filters.priceRange === value ? '#c19a6b' : '#333', fontWeight: filters.priceRange === value ? 600 : 400, cursor: 'pointer' }}>
              <span style={{ flex: 1 }}>{label}</span>
              <span style={{ color: '#888', fontSize: '12px' }}>{priceRangeCounts[value] || 0}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '16px' }}>
          <button onClick={() => setMobileFiltersOpen(false)} style={{ width: '100%', padding: '12px', background: '#c19a6b', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            Apply Filters
          </button>
        </div>
      </div>

      {/* ── Desktop sidebar ───────────────────────────────────────────────── */}
      <ProductFilters>
        <FilterDepartmentHeader>
          <i className="fas fa-filter"></i>
          Filters
        </FilterDepartmentHeader>

        {hasActiveFilters && (
          <ActiveFiltersSummary>
            {filters.category !== 'All' && <span><strong>Category:</strong> {filters.category}</span>}
            {filters.subcategory !== 'All' && <span><strong>Subcategory:</strong> {filters.subcategory}</span>}
            {filters.brand !== 'All' && <span><strong>Brand:</strong> {filters.brand}</span>}
            {filters.priceRange !== 'All' && <span><strong>Price:</strong> {filters.priceRange}</span>}
          </ActiveFiltersSummary>
        )}

        {hasActiveFilters && <ClearFiltersButton onClick={clearFilters}>Clear All Filters</ClearFiltersButton>}

        {/* Category */}
        <FilterSection $collapsed={collapsedSections.category}>
          <FilterHeader $collapsed={collapsedSections.category} onClick={() => toggleSection('category')}>
            <h3>Department</h3>
            <i className="fas fa-chevron-down toggle-icon"></i>
          </FilterHeader>
          <FilterContent $collapsed={collapsedSections.category}>
            {visibleCategories.filter(categoryVisible).map(cat => (
              <FilterOption key={cat} $active={filters.category === cat} onClick={() => handleFilterChange('category', cat)}>
                {cat !== 'All' && CATEGORY_ICONS[cat] && (
                  <i className={`fas ${CATEGORY_ICONS[cat]}`} style={{ fontSize: '11px', color: '#888' }}></i>
                )}
                <span style={{ flex: 1 }}>{cat}</span>
                <span style={{ color: '#888', fontSize: '11px' }}>{categoryCounts[cat] || 0}</span>
              </FilterOption>
            ))}
            {categories.length > INITIAL_CATEGORY_COUNT && (
              <button onClick={() => setShowAllCategories(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', background: 'transparent', border: 'none', color: '#007185', fontSize: '12px', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                <i className={`fas fa-chevron-${showAllCategories ? 'up' : 'down'}`} style={{ fontSize: '10px' }}></i>
                {showAllCategories ? 'See less' : 'See more'}
              </button>
            )}
          </FilterContent>
        </FilterSection>

        {/* Subcategory */}
        {filters.category !== 'All' && getSubcategoriesForCategory(filters.category).length > 0 && (
          <FilterSection $collapsed={collapsedSections.subcategory}>
            <FilterHeader $collapsed={collapsedSections.subcategory} onClick={() => toggleSection('subcategory')}>
              <h3>{filters.category}</h3>
              <i className="fas fa-chevron-down toggle-icon"></i>
            </FilterHeader>
            <FilterContent $collapsed={collapsedSections.subcategory}>
              {getSubcategoriesForCategory(filters.category)
                .filter(sub => sub === 'All' || (subcategoryCounts[sub] || 0) > 0)
                .map(sub => (
                  <FilterOption key={sub} $active={filters.subcategory === sub} onClick={() => handleFilterChange('subcategory', sub)}>
                    <span style={{ flex: 1 }}>{sub}</span>
                    <span style={{ color: '#888', fontSize: '11px' }}>{subcategoryCounts[sub] || 0}</span>
                  </FilterOption>
                ))}
            </FilterContent>
          </FilterSection>
        )}

        {/* Brand */}
        {Object.keys(brandCounts).length > 0 && (
          <FilterSection $collapsed={collapsedSections.brand}>
            <FilterHeader $collapsed={collapsedSections.brand} onClick={() => toggleSection('brand')}>
              <h3>Brand</h3>
              <i className="fas fa-chevron-down toggle-icon"></i>
            </FilterHeader>
            <FilterContent $collapsed={collapsedSections.brand}>
              <FilterOption $active={filters.brand === 'All'} onClick={() => handleFilterChange('brand', 'All')}>
                <span style={{ flex: 1 }}>All Brands</span>
              </FilterOption>
              {Object.entries(brandCounts).sort(([a], [b]) => a.localeCompare(b)).map(([brand, count]) => (
                <FilterOption key={brand} $active={filters.brand === brand} onClick={() => handleFilterChange('brand', brand)}>
                  <span style={{ flex: 1 }}>{brand}</span>
                  <span style={{ color: '#888', fontSize: '11px' }}>{count}</span>
                </FilterOption>
              ))}
            </FilterContent>
          </FilterSection>
        )}

        {/* Price */}
        <FilterSection $collapsed={collapsedSections.price}>
          <FilterHeader $collapsed={collapsedSections.price} onClick={() => toggleSection('price')}>
            <h3>Price</h3>
            <i className="fas fa-chevron-down toggle-icon"></i>
          </FilterHeader>
          <FilterContent $collapsed={collapsedSections.price}>
            {PRICE_OPTIONS.filter(({ value }) => value === 'All' || (priceRangeCounts[value] || 0) > 0).map(({ value, label }) => (
              <FilterOption key={value} $active={filters.priceRange === value} onClick={() => handleFilterChange('priceRange', value)}>
                <span style={{ flex: 1 }}>{label}</span>
                <span style={{ color: '#888', fontSize: '11px' }}>{priceRangeCounts[value] || 0}</span>
              </FilterOption>
            ))}
          </FilterContent>
        </FilterSection>
      </ProductFilters>

      {/* ── Products section ──────────────────────────────────────────────── */}
      <ProductsSection>
        <MobileFilterToggle onClick={() => setMobileFiltersOpen(true)}>
          <i className="fas fa-filter"></i>
          Filters{hasActiveFilters ? ` (${filters.category !== 'All' ? filters.category : ''}${filters.subcategory !== 'All' ? ' › ' + filters.subcategory : ''})` : ''}
        </MobileFilterToggle>

        {/* Results header + sort */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 12px 0', borderBottom: '1px solid #e5e5e5', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', color: '#555' }}>
            <strong style={{ color: '#111' }}>{filteredProducts.length}</strong> results
            {filters.category !== 'All' && ` in ${filters.category}`}
            {filters.subcategory !== 'All' && ` › ${filters.subcategory}`}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#555' }}>Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={e => handleFilterChange('sortBy', e.target.value)}
              style={{ padding: '6px 10px', fontSize: '13px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff', cursor: 'pointer', color: '#111', outline: 'none' }}
            >
              <option value="name">Name A–Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {currentItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
            {currentItems.map(product => (
              <ProductCardWithVariant key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <i className="fas fa-search" style={{ fontSize: '40px', color: '#e8d5c4', marginBottom: '16px', display: 'block' }}></i>
            <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '8px' }}>No products found</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>{emptyMessage}</p>
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ padding: '10px 20px', background: '#c19a6b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PageButton onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</PageButton>
            {[...Array(totalPages)].map((_, i) => (
              <PageButton key={i} $active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>{i + 1}</PageButton>
            ))}
            <PageButton onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</PageButton>
          </Pagination>
        )}
      </ProductsSection>
    </div>
  );
};

export default ProductBrowser;
