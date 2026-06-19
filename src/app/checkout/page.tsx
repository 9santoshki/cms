'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useCartStore } from '@/store/cartStore';
import { apiClient } from '@/lib/api';
import { calculateCartTotal, calculateShippingCost, backComputeTaxAmount } from '@/utils/cartUtils';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrderSummaryRows } from '@/components/OrderSummaryRows';
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
  const [gstin, setGstin] = useState('');
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
  const siteSettings = useSiteSettings();

  const subtotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingCost(subtotal, siteSettings.shipping.flat_rate, siteSettings.shipping.min_order_amount);
  const tax = backComputeTaxAmount(subtotal + shipping, siteSettings.tax.rate, siteSettings.tax.enabled);
  const total = subtotal + shipping;

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/checkout');
    }
  }, [user, router]);

  // Update shipping address and GSTIN when user data becomes available
  useEffect(() => {
    if (user) {
      setShippingAddress(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
      if (user.gstin) setGstin(user.gstin);
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

  // Load the Razorpay checkout.js script once; resolve immediately if already loaded.
  const loadRazorpayScript = (): Promise<void> =>
    new Promise((resolve, reject) => {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.Razorpay) { resolve(); return; }
      if (document.querySelector('script[src*="checkout.razorpay.com"]')) { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load payment gateway. Please try again.'));
      document.body.appendChild(script);
    });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (cartItems.length === 0) {
        throw new Error('Cannot checkout with an empty cart');
      }

      // Persist GSTIN to profile if it changed (fire-and-forget)
      if (gstin !== (user?.gstin || '')) {
        apiClient.patchProfile({ gstin }).catch(() => {});
      }

      // Create order on backend and load Razorpay script in parallel
      const [response] = await Promise.all([
        apiClient.createCheckoutSession({
          items: cartItems.map(item => ({
            product_id: item.product_id,
            variant_id: item.variant_id,       // required for stock check
            variant_name: item.variant_name,   // stored on order_items
            quantity: item.quantity,
            price: typeof item.price === 'number' ? item.price : parseFloat(item.price || '0'),
            name: item.name,
          })),
          shipping_address: shippingAddress,
        }),
        loadRazorpayScript(),
      ]);

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create checkout session');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: response.data.amount,
        currency: response.data.currency,
        name: 'Colour My Space',
        description: 'Interior Design Products',
        order_id: response.data.razorpay_order_id,
        modal: {
          // Reset loading state if the user closes the modal without paying
          ondismiss: () => setLoading(false),
        },
        handler: async (paymentResponse: any) => {
          try {
            const verifyResponse = await apiClient.verifyPayment({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });

            if (!verifyResponse.success || !verifyResponse.data) {
              throw new Error(verifyResponse.error || 'Payment verification failed');
            }

            // Clear cart and go to success page
            import('@/store/cartStore').then((module) => {
              module.useCartStore.getState().clearCart();
            });
            router.push(`/checkout/success?orderId=${verifyResponse.data.order_id}`);
          } catch (verifyError) {
            console.error('Payment verification error:', verifyError);
            setError('Payment verification failed. Please contact support.');
            setLoading(false);
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: '#c19a6b',
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);

      // Show error if payment fails inside the modal (e.g. card declined)
      rzp.on('payment.failed', (failureResponse: any) => {
        const msg = failureResponse?.error?.description || 'Payment failed. Please try again.';
        setError(msg);
        setLoading(false);
      });

      rzp.open();
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

            <FormField style={{ marginTop: '16px' }}>
              <label htmlFor="gstin">
                GSTIN <span style={{ fontWeight: 400, fontSize: '13px', color: '#999' }}>(optional — for GST invoice)</span>
              </label>
              <input
                type="text"
                id="gstin"
                value={gstin}
                onChange={e => setGstin(e.target.value.toUpperCase())}
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
                style={{ textTransform: 'uppercase' }}
              />
            </FormField>

            {error && <ErrorMessage>{error}</ErrorMessage>}
          </form>
        </ShippingSection>

        {/* Order Summary */}
        <OrderSummarySection>
          <OrderSummaryCard>
            <h2>Order Summary</h2>

            <OrderItemsList>
              {cartItems.map((item, index) => {
                const uniqueKey = item.id != null
                  ? `item-${item.id}`
                  : item.product_id
                  ? `prod-${item.product_id}-${item.variant_id ?? 'nv'}-${index}`
                  : `idx-${index}`;

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
                      {item.variant_name && (
                        <span style={{
                          display: 'inline-block', fontSize: '10px', fontWeight: 500,
                          color: '#7c5c32', background: 'rgba(193,154,107,0.12)',
                          border: '1px solid #e8d5c4', borderRadius: '4px',
                          padding: '1px 6px', marginBottom: '3px'
                        }}>
                          {item.variant_name}
                        </span>
                      )}
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
              <OrderSummaryRows subtotal={subtotal} shipping={shipping} tax={tax} taxRate={siteSettings.tax.rate} />
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