'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import Header from './Header';
import Footer from './Footer';
import { calculateCartTotal, calculateShippingCost } from '../utils/cartUtils';
import {
  CartContainer,
  CartHeaderSection,
  EmptyCartSection,
  EmptyCartContent,
  CartItemsSection,
  CartItemsHeader,
  CartItemsList,
  CartItem,
  ItemProduct,
  ItemImage,
  ItemDetails,
  ItemPrice,
  ItemQuantity,
  ItemTotal,
  ItemActions,
  CartSummarySection,
  CartSummary,
  SummaryDetails,
  SummaryActions
} from '../styles/ElegantCartStyles';

const EnhancedCartPage = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };
  
  const { cartItems, loading, error, updateCartItem, removeFromCart } = useAppContext();

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      // If quantity is less than 1, remove the item
      removeFromCart(productId);
      return;
    }
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
      <CartContainer>
        <Header activePage="cart" />
        <CartHeaderSection>
          <h1>Shopping Cart</h1>
        </CartHeaderSection>
        <EmptyCartSection>
          <EmptyCartContent>
            <i className="fas fa-shopping-cart empty-cart-icon"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <button className="btn primary" onClick={continueShopping}>
              Continue Shopping
            </button>
          </EmptyCartContent>
        </EmptyCartSection>
        <Footer />
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Header activePage="cart" />
      <CartHeaderSection>
        <h1>Shopping Cart</h1>
      </CartHeaderSection>
      
      {error.cart && <div className="error-message">{error.cart}</div>}
      
      <CartItemsSection>
        <CartItemsHeader>
          <div className="header-item">Product</div>
          <div className="header-price">Price</div>
          <div className="header-quantity">Quantity</div>
          <div className="header-total">Total</div>
          <div className="header-actions"></div>
        </CartItemsHeader>
        
        <CartItemsList>
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <ItemProduct>
                <ItemImage imageClass={item.imageClass || 'modern'}></ItemImage>
                <ItemDetails>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </ItemDetails>
              </ItemProduct>
              
              <ItemPrice>
                ₹{typeof item.price === 'number' 
                  ? item.price.toLocaleString() 
                  : parseFloat(item.price || '0').toLocaleString()}
              </ItemPrice>
              
              <ItemQuantity>
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={loading.cart || item.quantity <= 1}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={loading.cart}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </ItemQuantity>
              
              <ItemTotal>
                ₹{typeof item.price === 'number' 
                  ? (item.price * item.quantity).toLocaleString() 
                  : (parseFloat(item.price || '0') * item.quantity).toLocaleString()}
              </ItemTotal>
              
              <ItemActions>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  disabled={loading.cart}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </ItemActions>
            </CartItem>
          ))}
        </CartItemsList>
      </CartItemsSection>
      
      <CartSummarySection>
        <CartSummary>
          <h2>Order Summary</h2>
          
          <SummaryDetails>
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
          </SummaryDetails>
          
          <SummaryActions>
            <button className="btn secondary" onClick={continueShopping}>
              <i className="fas fa-arrow-left"></i> Continue Shopping
            </button>
            <button 
              className="btn primary" 
              onClick={handleCheckout}
              disabled={loading.cart || cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </SummaryActions>
        </CartSummary>
      </CartSummarySection>
      
      <Footer />
    </CartContainer>
  );
};

export default EnhancedCartPage;