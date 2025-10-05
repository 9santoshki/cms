import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../App.css'; // Import the main CSS file
import { formatDate } from '../utils/formatUtils';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user, cartItems, orders, loading, error, fetchOrders } = useAppContext();
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatDateLocal = (dateString) => {
    return formatDate(dateString);
  };

  if (loading.orders) {
    return (
      <div className="order-history-page">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <h2>Colour My Space</h2>
            </div>
            <div className="nav-menu">
              <a href="/" className="nav-link">Home</a>
              <a href="/shop" className="nav-link">Shop</a>
              <a href="#portfolio" className="nav-link">Portfolio</a>
              <a href="#services" className="nav-link">Services</a>
              {user && (
                <a href="/orders" className="nav-link">Orders</a>
              )}
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
            <div className="nav-icons">
              <button className="nav-icon">
                <i className="fas fa-search"></i>
              </button>
              {user ? (
                <>
                  <button className="nav-icon" onClick={() => navigate('/auth')}>
                    <i className="fas fa-sign-out-alt"></i>
                </button>
                  <span className="user-greeting">Hi, {user.name}</span>
                </>
              ) : (
                <button className="nav-icon" onClick={() => navigate('/auth')}>
                  <i className="fas fa-user"></i>
                </button>
              )}
              <button className="nav-icon" onClick={() => navigate('/cart')}>
                <i className="fas fa-shopping-cart"></i>
                {cartItems.length > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
            </div>
            {/* Mobile menu toggle */}
            <div className="nav-toggle">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>
        <div className="order-history-container">
          <div className="order-history-header">
            <h2>Order History</h2>
            <p>Loading your orders...</p>
          </div>
          
          <div className="order-history-content">
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>Colour My Space</h2>
          </div>
          <div className="nav-menu">
            <a href="/" className="nav-link">Home</a>
            <a href="/shop" className="nav-link">Shop</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#services" className="nav-link">Services</a>
            {user && (
              <a href="/orders" className="nav-link">Orders</a>
            )}
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-icons">
            <button className="nav-icon">
              <i className="fas fa-search"></i>
            </button>
            {user ? (
              <>
                <button className="nav-icon" onClick={() => navigate('/auth')}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
                <span className="user-greeting">Hi, {user.name}</span>
              </>
            ) : (
              <button className="nav-icon" onClick={() => navigate('/auth')}>
                <i className="fas fa-user"></i>
              </button>
            )}
            <button className="nav-icon" onClick={() => navigate('/cart')}>
              <i className="fas fa-shopping-cart"></i>
              {cartItems.length > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
          {/* Mobile menu toggle */}
          <div className="nav-toggle">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      <div className="order-history-container">
        <div className="order-history-header">
          <h2>Order History</h2>
          <p>Your past purchases</p>
        </div>
        
        {error.orders && <div className="error-message">{error.orders}</div>}
        
        <div className="order-history-content">
          {orders.length === 0 ? (
            <div className="empty-orders">
              <i className="fas fa-shopping-bag"></i>
              <h3>No orders yet</h3>
              <p>You haven't placed any orders yet.</p>
              <button className="btn primary" onClick={() => navigate('/shop')}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {[...orders].reverse().map((order, index) => (
                <div className="order-card" key={order.id || index}>
                  <div className="order-header">
                    <div className="order-id">
                      <span>Order #{order.id || index + 1}</span>
                      <span className="order-date">{formatDateLocal(order.created_at || order.date)}</span>
                    </div>
                    <div className="order-total">
                      ₹{(order.total_amount || order.total).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="order-items">
                    {order.items && order.items.map((item, itemIndex) => (
                      <div className="order-item" key={item.id || itemIndex}>
                        <div className="item-name">{item.name || item.product_name}</div>
                        <div className="item-quantity">Qty: {item.quantity}</div>
                        <div className="item-price">₹{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  
                  {order.customer && (
                    <div className="order-customer">
                      <div className="customer-info">
                        <strong>Customer:</strong> {order.customer.name}
                      </div>
                      <div className="customer-info">
                        <strong>Email:</strong> {order.customer.email}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;