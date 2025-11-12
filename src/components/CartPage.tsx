'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import Header from './Header';
import Footer from './Footer';
import '../App.css'; // Import the main CSS file
import { calculateCartTotal, calculateShippingCost } from '../utils/cartUtils';


const CartPage = () => {
  const router = useRouter();

const navigate = (path: string) => {
  router.push(path);
};
  const { cartItems, loading, error, updateCartItem, removeFromCart } = useAppContext();

  const updateQuantity = (productId: number, newQuantity: number) => {
    updateCartItem(productId, newQuantity);
  };

  const subtotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingCost(subtotal);
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  };

  const continueShopping = () => {
    navigate('/shop');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
        </div>
        <div className="empty-cart">
          <i className="fas fa-shopping-cart"></i>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button className="btn primary" onClick={continueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
      </div>
      
      {error.cart && <div className="error-message">{error.cart}</div>}
      
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-items-header">
            <div className="header-item">Product</div>
            <div className="header-price">Price</div>
            <div className="header-quantity">Quantity</div>
            <div className="header-total">Total</div>
            <div className="header-actions"></div>
          </div>
          
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="item-product">
                <div className={`item-image ${item.imageClass || 'modern'}`}></div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
              
              <div className="item-price">
                ₹{typeof item.price === 'number' ? item.price.toLocaleString() : parseFloat(item.price || '0').toLocaleString()}
              </div>
              
              <div className="item-quantity">
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={loading.cart || item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={loading.cart}
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                ₹{typeof item.price === 'number' 
                  ? (item.price * item.quantity).toLocaleString() 
                  : (parseFloat(item.price || '0') * item.quantity).toLocaleString()}
              </div>
              
              <div className="item-actions">
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  disabled={loading.cart}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="summary-box">
            <h3>Order Summary</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="summary-actions">
              <button className="btn secondary" onClick={continueShopping}>
                Continue Shopping
              </button>
              <button className="btn primary" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;