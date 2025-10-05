import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import { GlobalStyles } from './styles/components';
import './App.css'; // Import the main CSS file
import HomePage from './components/HomePage';
import StyledPortfolioPage from './components/StyledPortfolioPage';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import CategoriesPage from './components/CategoriesPage';
import CategoryPage from './components/CategoryPage';
import OrderHistory from './components/OrderHistory';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

const App: React.FC = () => {
  const {
    user,
    products,
    cartItems,
    loading,
    error,
    fetchProducts,
    logout,
    setUser
  } = useAppContext();
  
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  // Load products on initial render - using useCallback to prevent infinite loop
  const loadProducts = useCallback(() => {
    // Only fetch products if we don't already have them
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
  };

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
    <GlobalStyles>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<StyledPortfolioPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </GlobalStyles>
  );
}

export default App;