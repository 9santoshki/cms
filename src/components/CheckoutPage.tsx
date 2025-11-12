'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import Header from './Header';
import Footer from './Footer';
import { calculateCartTotal, calculateShippingCost } from '../utils/cartUtils';
import {
  CheckoutContainer,
  CheckoutHeaderSection,
  CheckoutContainerMain,
  CheckoutFormSection,
  CheckoutSummarySection,
  ConfirmationContent,
  SummaryItem,
  SummaryItems,
  SummaryTotals,
  CheckoutButton,
  PaymentOptions,
  PaymentOption,
  PaymentInput,
  PaymentIcon,
  PaymentInfo,
  PaymentOptionContent
} from '../styles/ElegantCheckoutStyles';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error.orders) setError('orders', '');
  };

  const subtotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingCost(subtotal);
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validation
      if (!formData.name || !formData.email || !formData.phone || 
          !formData.address || !formData.city || !formData.zipCode) {
        setError('orders', 'Please fill in all required fields');
        return;
      }
      
      // Additional validation for email format and phone number
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('orders', 'Please enter a valid email address');
        return;
      }
      
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        setError('orders', 'Please enter a valid phone number (10-15 digits)');
        return;
      }
      
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
        status: 'pending'
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
      <CheckoutContainer>
        <Header activePage="checkout" />
        <ConfirmationContent>
          <i className="fas fa-check-circle"></i>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. We'll send you a confirmation email shortly.</p>
          <p>Redirecting to home page...</p>
        </ConfirmationContent>
        <Footer />
      </CheckoutContainer>
    );
  }

  if (cartItems.length === 0) {
    return (
      <CheckoutContainer>
        <Header activePage="checkout" />
        <CheckoutHeaderSection>
          <h1>Checkout</h1>
        </CheckoutHeaderSection>
        <div className="empty-cart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '40px', textAlign: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', padding: '60px 40px', background: 'white', borderRadius: '0', boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.1)', border: 'none', position: 'relative', zIndex: 1 }}>
            <i className="fas fa-shopping-cart empty-cart-icon" style={{ fontSize: '6rem', color: '#c19a6b', marginBottom: '30px' }}></i>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#222', fontWeight: '400', fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>Your cart is empty</h2>
            <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.2rem', lineHeight: '1.7', fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>You need to add items to your cart before checking out.</p>
            <button 
              className="btn primary" 
              onClick={() => navigate('/shop')}
              style={{ padding: '16px 35px', fontSize: '16px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'var(--font-montserrat), Montserrat, sans-serif', position: 'relative', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', borderRadius: '0', background: '#c19a6b', color: 'white' }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <Header activePage="checkout" />
      <CheckoutHeaderSection>
        <h1>Checkout</h1>
      </CheckoutHeaderSection>
      
      {error.orders && <div className="error-message">{error.orders}</div>}
      
      <CheckoutContainerMain>
        <CheckoutFormSection>
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
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
                  <label htmlFor="email">Email Address *</label>
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
                  <label htmlFor="phone">Phone Number *</label>
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
                <label htmlFor="address">Street Address *</label>
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
                  <label htmlFor="city">City *</label>
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
                  <label htmlFor="zipCode">ZIP Code *</label>
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
              <PaymentOptions>
                <PaymentOption 
                  selected={formData.paymentMethod === 'credit-card'}
                >
                  <PaymentInput
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleChange}
                  />
                  <PaymentOptionContent>
                    <PaymentIcon className="payment-icon">
                      <i className="fas fa-credit-card"></i>
                    </PaymentIcon>
                    <PaymentInfo>
                      <span className="payment-title">Credit Card</span>
                      <span className="payment-desc">Secure payment with your credit card</span>
                    </PaymentInfo>
                  </PaymentOptionContent>
                </PaymentOption>
                
                <PaymentOption 
                  selected={formData.paymentMethod === 'paypal'}
                >
                  <PaymentInput
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                  />
                  <PaymentOptionContent>
                    <PaymentIcon className="payment-icon paypal-icon">
                      <i className="fab fa-paypal"></i>
                    </PaymentIcon>
                    <PaymentInfo>
                      <span className="payment-title">PayPal</span>
                      <span className="payment-desc">Pay securely with your PayPal account</span>
                    </PaymentInfo>
                  </PaymentOptionContent>
                </PaymentOption>
                
                <PaymentOption 
                  selected={formData.paymentMethod === 'cod'}
                >
                  <PaymentInput
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <PaymentOptionContent>
                    <PaymentIcon className="payment-icon">
                      <i className="fas fa-money-bill-wave"></i>
                    </PaymentIcon>
                    <PaymentInfo>
                      <span className="payment-title">Cash on Delivery</span>
                      <span className="payment-desc">Pay when your order is delivered</span>
                    </PaymentInfo>
                  </PaymentOptionContent>
                </PaymentOption>
              </PaymentOptions>
            </div>
            
            <CheckoutButton 
              type="submit" 
              disabled={loading.orders}
            >
              {loading.orders ? 'Processing...' : `Place Order - ₹${total.toLocaleString()}`}
            </CheckoutButton>
          </form>
        </CheckoutFormSection>
        
        <CheckoutSummarySection>
          <h2>Order Summary</h2>
          <SummaryItems>
            {cartItems.map(item => (
              <SummaryItem key={item.id}>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="item-price">
                  ₹{typeof item.price === 'number' 
                    ? (item.price * item.quantity).toLocaleString() 
                    : (parseFloat(item.price || '0') * item.quantity).toLocaleString()}
                </div>
              </SummaryItem>
            ))}
          </SummaryItems>
          
          <SummaryTotals>
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
          </SummaryTotals>
        </CheckoutSummarySection>
      </CheckoutContainerMain>
      
      <Footer />
    </CheckoutContainer>
  );
};

export default CheckoutPage;