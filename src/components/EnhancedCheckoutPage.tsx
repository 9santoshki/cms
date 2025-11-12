'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import Header from './Header';
import '../App.css'; // Import the main CSS file
import { calculateCartTotal, calculateShippingCost } from '../utils/cartUtils';

const CheckoutPage = () => {
  const router = useRouter();
  
  const navigate = (path: string) => {
    router.push(path);
  };
  
  const { cartItems, loading, error, setError, createOrder } = useAppContext();
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { user } = useAppContext();

  // Pre-populate form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear general error when user starts typing
    if (error.orders) setError('orders', '');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors['name'] = 'Full name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors['email'] = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors['email'] = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors['phone'] = 'Phone number is required';
      isValid = false;
    }
    
    if (!formData.address.trim()) {
      newErrors['address'] = 'Address is required';
      isValid = false;
    }
    
    if (!formData.city.trim()) {
      newErrors['city'] = 'City is required';
      isValid = false;
    }
    
    if (!formData.zipCode.trim()) {
      newErrors['zipCode'] = 'ZIP code is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const subtotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingCost(subtotal);
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Create order data
      const orderData = { 
        customer: formData,
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: typeof item.price === 'number' ? item.price.toString() : item.price,
          name: item.name
        })),
        total_amount: total.toString(),
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      // Place order via context
      await createOrder(orderData);
      
      // Show order confirmation
      setOrderCompleted(true);
      
      // Redirect to home after delay
      setTimeout(() => {
        setOrderCompleted(false);
        navigate('/');
      }, 5000);
    } catch (err) {
      console.error('Checkout error:', err);
      setError('orders', 'Failed to place order. Please try again.');
    }
  };

  if (orderCompleted) {
    return (
      <div className="order-confirmation-page">
        <Header />
        <div className="confirmation-content">
          <i className="fas fa-check-circle confirmation-icon"></i>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase. We've sent a confirmation email to {formData.email}.</p>
          <p>Your order number is #{Math.floor(Math.random() * 10000000)}</p>
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
        <div className="checkout-progress">
          <div className="progress-step active">
            <span className="step-number">1</span>
            <span className="step-label">Cart</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step active">
            <span className="step-number">2</span>
            <span className="step-label">Information</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-number">3</span>
            <span className="step-label">Payment</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-number">4</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>
      </div>
      
      {error.orders && <div className="error-message">{error.orders}</div>}
      
      <div className="checkout-container">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2>Shipping Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors['name'] ? 'error' : ''}
                    required
                  />
                  {errors['name'] && <span className="error-text">{errors['name']}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors['email'] ? 'error' : ''}
                    required
                  />
                  {errors['email'] && <span className="error-text">{errors['email']}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors['phone'] ? 'error' : ''}
                    required
                  />
                  {errors['phone'] && <span className="error-text">{errors['phone']}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={errors['zipCode'] ? 'error' : ''}
                    required
                  />
                  {errors['zipCode'] && <span className="error-text">{errors['zipCode']}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors['address'] ? 'error' : ''}
                  required
                  rows={2}
                ></textarea>
                {errors['address'] && <span className="error-text">{errors['address']}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors['city'] ? 'error' : ''}
                  required
                />
                {errors['city'] && <span className="error-text">{errors['city']}</span>}
              </div>
            </div>
            
            <div className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                {[
                  { id: 'credit-card', label: 'Credit Card', icon: 'fas fa-credit-card' },
                  { id: 'paypal', label: 'PayPal', icon: 'fab fa-paypal' },
                  { id: 'cod', label: 'Cash on Delivery', icon: 'fas fa-money-bill-wave' }
                ].map(method => (
                  <label key={method.id} className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleChange}
                    />
                    <div className="payment-option-content">
                      <div className="payment-icon">
                        <i className={method.icon}></i>
                      </div>
                      <div className="payment-info">
                        <span className="payment-title">{method.label}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn primary checkout-button"
              disabled={loading.orders}
            >
              {loading.orders ? 'Processing Order...' : `Complete Order - ₹${total.toLocaleString()}`}
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
                    ₹{typeof item.price === 'number' 
                      ? (item.price * item.quantity).toLocaleString() 
                      : (parseFloat(item.price || '0') * item.quantity).toLocaleString()}
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