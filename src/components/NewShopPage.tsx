'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import Header from './Header';
import Footer from './Footer';
import ProductDetail from './ProductDetail'; // Assuming this component exists

// Import elegant shop page styles
import {
  ShopContainer,
  ShopHero,
  MainContent,
  ProductsSection,
  ProductFilters,
  FilterSection,
  FilterHeader,
  FilterContent,
  FilterOption,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductPrice,
  Pagination,
  PageButton,
  LoadingSpinner,
  ErrorContainer
} from '../styles/NewShopStyles';

const NewShopPage = () => {
  const router = useRouter();

  const {
    products,
    loading,
    error,
    fetchProducts,
    addToCartWithAuth,
    cartItems
  } = useAppContext();

  const [selectedProduct, setSelectedProduct] = useState(null);
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
    if (!loading.products) {
      fetchProducts();
    }
  }, []); // Empty dependency array to run once on mount

  // Filter and sort products based on selected filters
  const filteredProducts = products
    .filter(product => {
      if (filters.category !== 'All') {
        return product.category === filters.category;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (filters.sortBy === 'price-low') {
        return a.price - b.price;
      } else if (filters.sortBy === 'price-high') {
        return b.price - a.price;
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const openProductDetail = (product: any) => {
    setSelectedProduct(product);
  };

  const handleFilterChange = (filterType: string, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value || ''
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };



  const handleAddToCart = (product: any) => {
    // Using context's addToCartWithAuth function which checks authentication
    const result = addToCartWithAuth(product, 1);
    if (!result.success && result.requiresLogin) {
      // Store the pending cart action in localStorage
      localStorage.setItem('pendingCartAction', JSON.stringify({
        product: result.product,
        quantity: result.quantity
      }));
      // Trigger a global event or callback to show login modal
      window.dispatchEvent(new CustomEvent('showLoginModal', { detail: { product, quantity: result.quantity } }));
    } else if (result.success && !result.requiresLogin && result.action) {
      // User is authenticated, proceed with adding to cart
      result.action();
    }
  };

  if (loading.products) {
    return (
      <ShopContainer>
        <LoadingSpinner />
      </ShopContainer>
    );
  }

  if (error.products) {
    return (
      <ErrorContainer>
        <p>{error.products}</p>
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
                    <ProductImage imageClass={product.imageClass} imageUrl={product.image_url}>
                    </ProductImage>
                    <ProductInfo style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', margin: '8px 0 4px 0' }}>{product.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#666', margin: '4px 0' }}>{product.description}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', margin: '8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', color: '#e74c3c', fontSize: '1.1rem', marginRight: '6px' }}>
                              ₹{product.price?.toLocaleString()}
                            </span>
                            <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.85rem' }}>
                              ₹{product.price ? (product.price * 1.2).toLocaleString() : product.price?.toLocaleString()}
                            </span>
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