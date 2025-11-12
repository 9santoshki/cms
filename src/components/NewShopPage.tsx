'use client';

import React, { useState, useEffect } from 'react';
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

  const {
    products,
    loading,
    error,
    fetchProducts, 
    addToCart
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
    if (products.length === 0 && !loading.products) {
      fetchProducts();
    }
  }, [fetchProducts, products.length, loading.products]);

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

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleFilterChange = (filterType: string, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value || ''
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  

  const handleAddToCart = (product: any) => {
    // Using context's addToCart function which takes a product and optional quantity
    // The context will handle creating the proper cart item structure
    addToCart(product, 1);
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
      {/* Navigation Bar */}
      <Header activePage="shop" />

      {/* Shop Hero Section */}
      <ShopHero>
        <div className="hero-content">
          <h1>Elegant Collection</h1>
          <p>Discover our curated collection of premium interior design pieces and decor items</p>
        </div>
      </ShopHero>

      {/* Main Content */}
      <MainContent>
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
          
          <ProductsGrid>
            {currentItems.map(product => (
              <ProductCard key={product.id}>
                <ProductImage imageClass={product.imageClass} imageUrl={product.image_url}>
                </ProductImage>
                <ProductInfo>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <ProductPrice>₹{product.price.toLocaleString()}</ProductPrice>
                  <div className="product-actions">
                    <button 
                      className="btn primary" 
                      onClick={() => openProductDetail(product)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn secondary" 
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>

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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onBack={closeProductDetail} 
        />
      )}
    </ShopContainer>
  );
};

export default NewShopPage;