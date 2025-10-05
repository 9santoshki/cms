import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../App.css'; // Import the main CSS file
import { formatCurrency } from '../utils/formatUtils';


const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, user, loading, error, setError, createOrder, clearCart } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error.orders) setError('orders', '');
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validation
      if (!formData.name || !formData.email || !formData.phone || 
          !formData.address || !formData.city || !formData.zipCode) {
        throw new Error('Please fill in all required fields');
      }
      
      // Create order data
      const orderData = { 
        customer: formData,
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price.toString()
        })),
        total_amount: total.toString()
      };
      
      // Place order via context
      await createOrder(orderData);
      
      // Show order confirmation
      setOrderCompleted(true);
      
      // Reset order completion status after 3 seconds and redirect to home
      setTimeout(() => {
        setOrderCompleted(false);
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error('Checkout error:', err);
      // Error is handled by the context
    }
  };

  if (orderCompleted) {
    return (
      <div className="order-confirmation-page">
        <Header />
        <div className="confirmation-content">
          <i className="fas fa-check-circle"></i>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. We'll send you a confirmation email shortly.</p>
          <p>Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <Header />
        <div className="checkout-header">
          <h1>Checkout</h1>
        </div>
        <div className="empty-cart">
          <i className="fas fa-shopping-cart"></i>
          <h2>Your cart is empty</h2>
          <p>You need to add items to your cart before checking out.</p>
          <button className="btn primary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>
      
      {error.orders && <div className="error-message">{error.orders}</div>}
      
      <div className="checkout-container">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleChange}
                  />
                  <span className="payment-label">
                    <i className="fas fa-credit-card"></i>
                    Credit Card
                  </span>
                </label>
                
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                  />
                  <span className="payment-label">
                    <i className="fab fa-paypal"></i>
                    PayPal
                  </span>
                </label>
                
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <span className="payment-label">
                    <i className="fas fa-money-bill-wave"></i>
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn primary checkout-button"
              disabled={loading.orders}
            >
              {loading.orders ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        <div className="checkout-summary-section">
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map(item => (
                <div className="summary-item" key={item.id}>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;