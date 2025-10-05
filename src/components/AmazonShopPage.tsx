import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../App.css'; // Import the main CSS file
import { 
  addDemoDataToProducts, 
  filterProducts, 
  sortProducts, 
  paginateProducts, 
  calculateTotalPages, 
  categories as productCategories,
  formatRating
} from '../utils/productUtils';


const AmazonShopPage = () => {
  const navigate = useNavigate();
  const { 
    user, 
    products, 
    cartItems, 
    loading, 
    error, 
    logout, 
    addToCart 
  } = useAppContext();
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(24); // Increased from 12 to 24 products per page
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);

  // Add demo data to products
  const productsWithDemoData = addDemoDataToProducts(products);

  // Filter products based on search query, category, and price range
  const filteredProducts = filterProducts(productsWithDemoData, searchQuery, selectedCategory, priceRange);

  // Sort products
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  // Pagination
  const currentProducts = paginateProducts(sortedProducts, currentPage, productsPerPage);
  const totalPages = calculateTotalPages(sortedProducts, productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const viewCart = () => {
    navigate('/cart');
  };

  // Get min and max prices for price filter
  const minPrice = productsWithDemoData.length > 0 ? Math.min(...productsWithDemoData.map(p => p.price)) : 0;
  const maxPrice = productsWithDemoData.length > 0 ? Math.max(...productsWithDemoData.map(p => p.price)) : 50000;

  if (loading.products) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error.products) {
    return (
      <div className="error-container">
        <p>{error.products}</p>
        <button className="btn primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="amazon-shop">
      {/* Header with Logo */}
      <Header showSearch={false} showNavigation={false} />

      {/* Original Header Content */}
      <header className="shop-header">
        <div className="header-top">
          <div className="logo">
            <h2>ColourMySpace</h2>
          </div>
          
          <div className="search-bar">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search furniture and home decor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          
          <div className="header-actions">
            <div className="user-menu">
              {user ? (
                <>
                  <span>Hello, {user.name}</span>
                  <button onClick={logout}>
                    Sign Out
                  </button>
                </>
              ) : (
                <button onClick={() => navigate('/auth')}>
                  Sign In
                </button>
              )}
            </div>
            
            <div className="cart-icon" onClick={viewCart}>
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartCount}</span>
              <span className="cart-text">Cart</span>
            </div>
          </div>
        </div>
        
        <div className="header-bottom">
          <nav className="main-nav">
            <a href="/" className="nav-link">Home</a>
            <a href="/shop" className="nav-link active">Shop</a>
            <a href="/categories" className="nav-link">Categories</a>
            <a href="/deals" className="nav-link">Deals</a>
            <a href="/orders" className="nav-link">Orders</a>
            <a href="/about" className="nav-link">About</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="shop-main">
        <div className="container">
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/">Home</a> &gt; <span>Shop</span>
          </div>
          
          <div className="shop-layout">
            {/* Sidebar Filters */}
            <aside className="shop-sidebar">
              <div className="filter-section">
                <div className="filter-header">
                  <h3>Filters</h3>
                  <button 
                    className="toggle-filters"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    {showFilters ? 'Hide' : 'Show'} Filters
                  </button>
                </div>
                
                {(showFilters || window.innerWidth > 768) && (
                  <>
                    <div className="filter-group">
                      <h4>Category</h4>
                      <select 
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="category-select"
                      >
                        {productCategories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <h4>Price Range</h4>
                      <div className="price-range">
                        <span>₹{priceRange[0].toLocaleString()}</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="price-slider"
                      />
                      <div className="price-inputs">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                          className="price-input"
                        />
                        <span>to</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || maxPrice])}
                          className="price-input"
                        />
                      </div>
                    </div>
                    
                    <div className="filter-group">
                      <h4>Prime Eligible</h4>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            // In a real app, this would filter for Prime products
                            console.log('Prime filter:', e.target.checked);
                          }}
                        />
                        <span>Prime Shipping</span>
                      </label>
                    </div>
                    
                    <div className="filter-group">
                      <h4>Customer Reviews</h4>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            // In a real app, this would filter for 4+ star products
                            console.log('Rating filter:', e.target.checked);
                          }}
                        />
                        <span>4 Stars & Up</span>
                      </label>
                    </div>
                    
                    <button 
                      className="btn reset-filters"
                      onClick={() => {
                        setSelectedCategory('all');
                        setPriceRange([minPrice, maxPrice]);
                        setSearchQuery('');
                      }}
                    >
                      Reset Filters
                    </button>
                  </>
                )}
              </div>
            </aside>
            
            {/* Main Content Area */}
            <div className="shop-content">
              {/* Filters and Sorting */}
              <div className="shop-filters">
                <div className="filter-section">
                  <label htmlFor="sort">Sort by:</label>
                  <select 
                    id="sort"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="discount">Discount</option>
                  </select>
                </div>
                
                <div className="results-count">
                  {sortedProducts.length} results for "{searchQuery || 'all products'}"
                </div>
              </div>
              
              {/* Products Grid */}
              <div className="products-grid">
                {currentProducts.map(product => (
                  <div className="product-card" key={product.id}>
                    <div className="product-image-container">
                      <div className={`product-image ${product.imageClass}`}></div>
                      {product.prime && (
                        <div className="prime-badge">
                          <span>Prime</span>
                        </div>
                      )}
                      {product.discount > 15 && (
                        <div className="discount-badge">
                          <span>{product.discount}% off</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-title">{product.name}</h3>
                      
                      <div className="product-rating">
                        <div className="stars">
                          {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="rating-value">{formatRating(product.rating)}</span>
                        <span className="review-count">({product.reviewCount})</span>
                      </div>
                      
                      <div className="product-price">
                        <span className="current-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <>
                            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                            <span className="discount">({product.discount}% off)</span>
                          </>
                        )}
                      </div>
                      
                      <p className="product-description">{product.description}</p>
                      
                      {product.freeDelivery && (
                        <div className="delivery-info">
                          <span className="free-delivery">FREE Delivery</span>
                          <span className="delivery-date"> {product.deliveryDate}</span>
                        </div>
                      )}
                      
                      <div className="product-actions">
                        <button 
                          className="btn add-to-cart"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  {/* Show first page, current page, and last page with ellipses */}
                  {currentPage > 3 && (
                    <>
                      <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </button>
                      <span className="pagination-ellipsis">...</span>
                    </>
                  )}
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const start = Math.max(1, currentPage - 2);
                    const pageNum = start + i;
                    if (pageNum <= totalPages) {
                      return (
                        <button
                          key={pageNum}
                          className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}
                  
                  {currentPage < totalPages - 2 && (
                    <>
                      <span className="pagination-ellipsis">...</span>
                      <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  
                  <button 
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="shop-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Get to Know Us</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press Releases</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Connect with Us</h4>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Make Money with Us</h4>
              <ul>
                <li><a href="#">Sell on ColourMySpace</a></li>
                <li><a href="#">Become an Affiliate</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Let Us Help You</h4>
              <ul>
                <li><a href="#">COVID-19 and ColourMySpace</a></li>
                <li><a href="#">Your Account</a></li>
                <li><a href="#">Returns Centre</a></li>
                <li><a href="#">Help</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 ColourMySpace.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AmazonShopPage;