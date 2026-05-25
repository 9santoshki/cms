'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../store/cartStore';
import Header from './Header';
import Footer from './Footer';
import { calculateCartTotal, calculateShippingCost, calculateOriginalCartTotal, calculateDiscountSavings } from '../utils/cartUtils';
import {
  CartContainer,
  CartHeaderSection,
  EmptyCartSection,
  EmptyCartContent,
  CartContentWrapper,
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
  SummaryItemsList,
  SummaryItem,
  SummaryDetails,
  SummaryActions
} from '../styles/ElegantCartStyles';

const EnhancedCartPage = () => {
  const router = useRouter();
  const cartItems = useCartStore(state => state.items);
  const isLoading = useCartStore(state => state.isLoading);
  const loadServerCart = useCartStore(state => state.loadServerCart);
  const updateCartItem = useCartStore(state => state.updateItem);
  const removeFromCart = useCartStore(state => state.removeItem);
  const [stockError, setStockError] = useState<string | null>(null);

  // Sync with server on every cart page visit so stale/deleted products are pruned
  useEffect(() => {
    loadServerCart();
  }, [loadServerCart]);

  const navigate = (path: string) => {
    router.push(path);
  };

  const updateQuantity = async (productId: number, newQuantity: number, variantId?: number | null) => {
    setStockError(null); // Clear previous error
    if (newQuantity < 1) {
      removeFromCart(productId, variantId ?? null);
      return;
    }
    try {
      await updateCartItem(productId, newQuantity, variantId ?? null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update quantity';
      setStockError(message);
      // Auto-clear after 5 seconds
      setTimeout(() => setStockError(null), 5000);
    }
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

  if (isLoading) {
    return (
      <CartContainer>
        <Header activePage="cart" />
        <CartHeaderSection>
          <h1>Shopping Cart</h1>
        </CartHeaderSection>
        <EmptyCartSection>
          <EmptyCartContent>
            <p style={{ color: '#6b7280' }}>Loading your cart…</p>
          </EmptyCartContent>
        </EmptyCartSection>
        <Footer />
      </CartContainer>
    );
  }

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

      <CartContentWrapper>
        <CartItemsSection>
          <CartItemsHeader>
            <div className="header-item">Product</div>
            <div className="header-price">Price</div>
            <div className="header-quantity">Quantity</div>
            <div className="header-total">Total</div>
            <div className="header-actions"></div>
          </CartItemsHeader>

          {/* Stock limit error message */}
          {stockError && (
            <div style={{
              padding: '12px 16px',
              marginBottom: '12px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-exclamation-circle"></i>
              {stockError}
            </div>
          )}

          <CartItemsList>
            {cartItems.map((item, index) => {
              // Use the cart row id as the unique key; fall back to index only if absent
              const uniqueKey = item.id != null
                ? `cart-${item.id}`
                : `idx-${index}`;

              const productId = item.product_id || item.id;

              if (!productId) {
                console.error('Cart item missing product_id and id:', item);
                return null;
              }

              return (
                <CartItem key={uniqueKey}>
                  <ItemProduct>
                    <ItemImage
                      $imageUrl={item.image_url}
                      $imageClass={item.imageClass || 'modern'}
                    />
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
                      onClick={() => updateQuantity(productId, item.quantity - 1, item.variant_id)}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(productId, item.quantity + 1, item.variant_id)}
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
                      onClick={() => removeFromCart(productId, item.variant_id ?? null)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </ItemActions>
                </CartItem>
              );
            })}
          </CartItemsList>
        </CartItemsSection>

        <CartSummarySection>
          <CartSummary>
            <h2>Order Summary</h2>

            <SummaryItemsList>
              {cartItems.map((item, index) => {
                const uniqueKey = item.id != null ? `sum-${item.id}` : `sum-idx-${index}`;

                // Check if image_url is valid (not a placeholder URL)
                const hasValidImage = item.image_url &&
                                     !item.image_url.includes('r2-placeholder.com');

                return (
                  <SummaryItem key={uniqueKey}>
                    {hasValidImage ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="item-image"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.nextSibling) {
                            (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className="item-image item-placeholder"
                      style={{ display: hasValidImage ? 'none' : 'flex' }}
                    >
                      <i className="fas fa-image"></i>
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <div className="item-details">
                        <span className="qty">Qty: {item.quantity}</span>
                        <span className="price">
                          ₹{(typeof item.price === 'number' ? item.price : parseFloat(item.price || '0')).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </SummaryItem>
                );
              })}
            </SummaryItemsList>

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
              <button
                className="btn primary"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                style={{ width: '100%' }}
              >
                Proceed to Checkout
              </button>
            </SummaryActions>
          </CartSummary>

          <div style={{ padding: '0 30px', width: '100%', boxSizing: 'border-box' }}>
            <button className="btn secondary" onClick={continueShopping} style={{ width: '100%', boxSizing: 'border-box' }}>
              <i className="fas fa-arrow-left"></i> Continue Shopping
            </button>
          </div>
        </CartSummarySection>
      </CartContentWrapper>

      <Footer />
    </CartContainer>
  );
};

export default EnhancedCartPage;