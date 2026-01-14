'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useCartStore } from '@/store/cartStore';
import { apiClient } from '@/lib/api';
import { calculateCartTotal, calculateShippingCost } from '@/utils/cartUtils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutContent,
  ShippingSection,
  FormGrid,
  FormField,
  OrderSummarySection,
  OrderSummaryCard,
  OrderItemsList,
  OrderItem,
  ItemImage,
  ItemDetails,
  OrderSummaryDetails,
  PayButton,
  ErrorMessage,
  SecurityNote,
  LoadingScreen
} from '@/styles/CheckoutStyles';

const CheckoutPage = () => {
  const router = useRouter();
  const { user } = useAppContext();
  const cartItems = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const subtotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingCost(subtotal);
  const total = subtotal + shipping;

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/checkout');
    }
  }, [user, router]);

  // Update shipping address when user data becomes available
  useEffect(() => {
    if (user) {
      setShippingAddress(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  // Handle input changes for shipping address
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Verify cart is not empty
      if (cartItems.length === 0) {
        throw new Error('Cannot checkout with an empty cart');
      }

      // Create checkout session with Razorpay
      const response = await apiClient.createCheckoutSession({
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: typeof item.price === 'number' ? item.price : parseFloat(item.price || '0'), // Ensure price is a number
          name: item.name
        })),
        shipping_address: shippingAddress
      });

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create checkout session');
      }

      // Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Should be in environment variables
        amount: response.data.amount, // Amount in paise
        currency: response.data.currency,
        name: 'Colour My Space',
        description: 'Furniture Purchase',
        order_id: response.data.razorpay_order_id,
        handler: async (response: any) => {
          try {
            // Verify payment with our backend after successful payment
            const verifyResponse = await apiClient.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (!verifyResponse.success || !verifyResponse.data) {
              throw new Error(verifyResponse.error || 'Payment verification failed');
            }

            if (verifyResponse.success && verifyResponse.data) {
              // Payment successful - clear cart and redirect to success page
              import('@/store/cartStore').then((module) => {
                module.useCartStore.getState().clearCart();
              });
              router.push(`/checkout/success?orderId=${verifyResponse.data.order_id}`);
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch (verifyError) {
            console.error('Payment verification error:', verifyError);
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email,
          contact: shippingAddress.phone
        },
        theme: {
          color: '#F59E0B' // Amber color to match our theme
        }
      };

      // Load Razorpay checkout
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        // @ts-ignore - Razorpay checkout is added to window by the script
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      script.onerror = () => {
        setError('Failed to load payment gateway. Please try again.');
        setLoading(false);
      };
      document.body.appendChild(script);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An error occurred during checkout');
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <LoadingScreen>
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Redirecting to login...</p>
        </div>
      </LoadingScreen>
    );
  }

  return (
    <CheckoutContainer>
      <Header activePage="checkout" />

      <CheckoutHeader>
        <h1>Checkout</h1>
        <p>Complete your order securely</p>
      </CheckoutHeader>

      <CheckoutContent>
        {/* Shipping Information */}
        <ShippingSection>
          <h2>Shipping Information</h2>

          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormField>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={shippingAddress.name}
                  onChange={handleInputChange}
                  required
                />
              </FormField>

              <FormField>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={shippingAddress.email}
                  onChange={handleInputChange}
                  required
                  readOnly={!!user?.email}
                />
              </FormField>

              <FormField>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={shippingAddress.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormField>

              <FormField $fullWidth>
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  required
                />
              </FormField>

              <FormField>
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  required
                />
              </FormField>

              <FormField>
                <label htmlFor="state">State / Province *</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  required
                />
              </FormField>

              <FormField>
                <label htmlFor="zipCode">ZIP / Postal Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </FormField>

              <FormField>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </FormField>
            </FormGrid>

            {error && <ErrorMessage>{error}</ErrorMessage>}
          </form>
        </ShippingSection>

        {/* Order Summary */}
        <OrderSummarySection>
          <OrderSummaryCard>
            <h2>Order Summary</h2>

            <OrderItemsList>
              {cartItems.map((item, index) => {
                const uniqueKey = item.product_id ? `prod-${item.product_id}` :
                                 item.id ? `item-${item.id}-${index}` :
                                 `idx-${index}`;

                // Check if image_url is valid (not a placeholder URL)
                const hasValidImage = item.image_url &&
                                     !item.image_url.includes('r2-placeholder.com');

                return (
                  <OrderItem key={uniqueKey}>
                    <ItemImage>
                      {hasValidImage ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            // If image fails to load, show placeholder
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.nextSibling) {
                              (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#e8d5c4',
                        display: hasValidImage ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        color: '#c19a6b'
                      }}>
                        <i className="fas fa-image"></i>
                      </div>
                    </ItemImage>

                    <ItemDetails>
                      <h3>{item.name}</h3>
                      <div className="price-qty">
                        <span className="qty">Qty: {item.quantity}</span>
                        <span className="price">
                          ₹{(typeof item.price === 'number' ? item.price : parseFloat(item.price || '0')).toLocaleString()}
                        </span>
                      </div>
                    </ItemDetails>
                  </OrderItem>
                );
              })}
            </OrderItemsList>

            <OrderSummaryDetails>
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
            </OrderSummaryDetails>

            <PayButton
              type="submit"
              disabled={loading || cartItems.length === 0}
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                `Pay ₹${total.toLocaleString()}`
              )}
            </PayButton>

            <SecurityNote>
              <i className="fas fa-lock"></i>
              Secure payment powered by Razorpay. Your information is encrypted and safe.
            </SecurityNote>
          </OrderSummaryCard>
        </OrderSummarySection>
      </CheckoutContent>

      <Footer />
    </CheckoutContainer>
  );
};

export default CheckoutPage;