'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProduct } from '../context/ProductContext';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';

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
  ProductCard,
  ProductImage,
  ProductInfo,
  DiscountBadge,
  Pagination,
  PageButton,
  LoadingSpinner,
  ErrorContainer
} from '../styles/NewShopStyles';

// Helper function to safely parse price (handles string or number)
const parsePrice = (price: any): number => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') return parseFloat(price) || 0;
  return 0;
};

// Helper function to calculate discount percentage
const getDiscountPercentage = (originalPrice: number, salePrice: number): number => {
  if (!originalPrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// Helper to check if product has discount
const hasDiscount = (product: any): boolean => {
  const original = parsePrice(product.original_price);
  const sale = parsePrice(product.sale_price) || parsePrice(product.price);
  return original > 0 && original > sale;
};

// Helper to get display price
const getDisplayPrice = (product: any): number => {
  return parsePrice(product.sale_price) || parsePrice(product.price);
};

const NewShopPage = () => {
  const router = useRouter();

  const {
    products,
    loading: productLoading,
    error: productError,
    fetchProducts
  } = useProduct();

  const cartItems = useCartStore(state => state.items);
  const addToCart = useCartStore(state => state.addItem);

  const { user } = useAuth();

  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'All',
    sortBy: 'name'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Show 8 products per page

  // Fetch products when component mounts
  useEffect(() => {
    // Fetch products to ensure we have current data
    // Only fetch if not already loading to avoid conflicts
    if (!productLoading) {
      fetchProducts();
    }
  }, []); // Empty dependency array to run once on mount

  // Filter and sort products based on selected filters
  const filteredProducts = products
    .filter(product => {
      // Category filter
      if (filters.category !== 'All') {
        if (product.category !== filters.category) {
          return false;
        }
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

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const handleFilterChange = (filterType: string, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value || ''
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };



  const handleAddToCart = (product: any) => {
    // Check if user is authenticated
    if (!user) {
      // Store the pending cart action in localStorage
      localStorage.setItem('pendingCartAction', JSON.stringify({
        product: product,
        quantity: 1
      }));
      // Trigger a global event or callback to show login modal
      window.dispatchEvent(new CustomEvent('showLoginModal', { detail: { product, quantity: 1 } }));
    } else {
      // User is authenticated, add directly to cart
      addToCart({
        id: Date.now(), // temporary ID for cart item
        product_id: product.id,
        quantity: 1,
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.primary_image || product.image_url
      });
    }
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
        <button className="btn primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </ErrorContainer>
    );
  }

  return (
    <ShopContainer>
      {/* Navigation Bar with Search Overlay */}
      <Header activePage="shop" />

      {/* Main Content with reduced margins */}
      <MainContent style={{ marginTop: '0' }}>
        <ProductFilters>
          {/* Category Filter */}
          <FilterSection>
            <FilterHeader>
              <h3>CATEGORIES</h3>
            </FilterHeader>
            <FilterContent>
              {categories.map(category => (
                <FilterOption
                  key={category}
                  $active={filters.category === category}
                  onClick={() => handleFilterChange('category', category)}
                >
                  {category}
                </FilterOption>
              ))}
            </FilterContent>
          </FilterSection>

          {/* Price Range Filter */}
          <FilterSection>
            <FilterHeader>
              <h3>PRICE RANGE</h3>
            </FilterHeader>
            <FilterContent>
              <FilterOption
                  $active={filters.priceRange === 'All'}
                  onClick={() => handleFilterChange('priceRange', 'All')}
                >
                  All Prices
                </FilterOption>
                <FilterOption
                  $active={filters.priceRange === 'Under ₹5,000'}
                  onClick={() => handleFilterChange('priceRange', 'Under ₹5,000')}
                >
                  Under ₹5,000
                </FilterOption>
                <FilterOption
                  $active={filters.priceRange === '₹5,000 - ₹15,000'}
                  onClick={() => handleFilterChange('priceRange', '₹5,000 - ₹15,000')}
                >
                  ₹5,000 - ₹15,000
                </FilterOption>
                <FilterOption
                  $active={filters.priceRange === 'Over ₹15,000'}
                  onClick={() => handleFilterChange('priceRange', 'Over ₹15,000')}
                >
                  Over ₹15,000
                </FilterOption>
            </FilterContent>
          </FilterSection>

          {/* Sort Options */}
          <FilterSection>
            <FilterHeader>
              <h3>SORT BY</h3>
            </FilterHeader>
            <FilterContent>
              <FilterOption
                  $active={filters.sortBy === 'name'}
                  onClick={() => handleFilterChange('sortBy', 'name')}
                >
                  Name A-Z
                </FilterOption>
                <FilterOption
                  $active={filters.sortBy === 'price-low'}
                  onClick={() => handleFilterChange('sortBy', 'price-low')}
                >
                  Price: Low to High
                </FilterOption>
                <FilterOption
                  $active={filters.sortBy === 'price-high'}
                  onClick={() => handleFilterChange('sortBy', 'price-high')}
                >
                  Price: High to Low
                </FilterOption>
            </FilterContent>
          </FilterSection>
        </ProductFilters>

        {/* Products Grid */}
        <ProductsSection>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '20px', 
            padding: '20px' 
          }}>
            {currentItems && currentItems.length > 0 ? (
              currentItems.map(product => (
                <div 
                  key={product.id} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%', 
                    minWidth: '250px',
                    maxWidth: '300px',
                    margin: '0 auto'
                  }}
                >
                  <ProductCard
                    onClick={() => router.push(`/products/${product.slug || product.id}`)}
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
                  >
                    {hasDiscount(product) && (
                      <DiscountBadge>
                        {getDiscountPercentage(parsePrice(product.original_price), getDisplayPrice(product))}% OFF
                      </DiscountBadge>
                    )}
                    <ProductImage imageClass={product.imageClass} imageUrl={product.primary_image || product.image_url}>
                    </ProductImage>
                    <ProductInfo style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', margin: '8px 0 4px 0' }}>{product.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#666', margin: '4px 0' }}>{product.description}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', margin: '8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                            <span style={{ fontWeight: 'bold', color: '#c19a6b', fontSize: '1.1rem' }}>
                              ₹{getDisplayPrice(product).toLocaleString()}
                            </span>
                            {hasDiscount(product) && (
                              <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.85rem' }}>
                                ₹{parsePrice(product.original_price).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                              className="btn secondary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', minWidth: '40px', position: 'relative', zIndex: 1 }}
                              aria-label="Add to cart"
                            >
                              <i className="fas fa-shopping-cart"></i>
                            </button>
                            {(() => {
                              const cartItem = cartItems.find(item => item.product_id === product.id);
                              return cartItem ? (
                                <span style={{
                                  position: 'absolute',
                                  top: '-10px',
                                  right: '-10px',
                                  backgroundColor: '#e74c3c',
                                  color: 'white',
                                  borderRadius: '50%',
                                  width: '20px',
                                  height: '20px',
                                  fontSize: '0.7rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 'bold',
                                  border: '2px solid white',
                                  zIndex: 2,
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}>
                                  {cartItem.quantity}
                                </span>
                              ) : null;
                            })()}
                          </div>
                        </div>
                      </div>
                    </ProductInfo>
                  </ProductCard>
                </div>
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
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>

              {[...Array(totalPages)].map((_, i) => (
                <PageButton
                $active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PageButton>
              ))}

              <PageButton
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          )}
        </ProductsSection>
      </MainContent>

      <Footer />

      {/* Product Detail Modal - Not used, now navigates to individual product page */}
    </ShopContainer>
  );
};

export default NewShopPage;