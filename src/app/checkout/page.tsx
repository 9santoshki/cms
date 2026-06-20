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
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  // Saved addresses from profile (immutable snapshots)
  const [savedShippingAddr, setSavedShippingAddr] = useState<any>(null);
  const [savedBillingAddr, setSavedBillingAddr] = useState<any>(null);
  // 'saved' = use the profile card, 'new' = show the editable form
  const [shippingMode, setShippingMode] = useState<'saved' | 'new'>('new');
  const [billingMode, setBillingMode] = useState<'saved' | 'new'>('new');
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

  // Load saved addresses and GSTIN from profile when user is available
  useEffect(() => {
    if (user) {
      const u = user as any;
      // Always pre-fill contact fields in the form
      setShippingAddress(prev => ({
        ...prev,
        name: u.name || prev.name,
        email: u.email || prev.email,
        phone: u.phone || prev.phone,
      }));
      if (u.gstin) setGstin(u.gstin);
      // Snapshot saved addresses; switch to 'saved' mode when available
      if (u.shipping_address?.address) {
        setSavedShippingAddr(u.shipping_address);
        setShippingMode('saved');
      }
      if (u.billing_address?.address) {
        setSavedBillingAddr(u.billing_address);
        setBillingMode('saved');
        setBillingSameAsShipping(false);
      }
    }
  }, [user]);

  // Handle input changes for shipping address
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  // Handle input changes for billing address
  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({ ...prev, [name]: value }));
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

      const u = user as any;

      // Resolve effective addresses
      const contactFields = { name: shippingAddress.name, email: shippingAddress.email, phone: shippingAddress.phone };
      const effectiveShipping = shippingMode === 'saved' && savedShippingAddr
        ? { ...savedShippingAddr, ...contactFields }
        : shippingAddress;
      const effectiveBilling = billingSameAsShipping
        ? effectiveShipping
        : billingMode === 'saved' && savedBillingAddr
          ? { ...savedBillingAddr, name: savedBillingAddr.name || shippingAddress.name }
          : billingAddress;

      // Persist addresses and GSTIN to profile (fire-and-forget)
      if (gstin !== (u.gstin || '')) {
        apiClient.patchProfile({ gstin }).catch(() => {});
      }
      const addrToSave = { address: effectiveShipping.address, city: effectiveShipping.city, state: effectiveShipping.state, zipCode: effectiveShipping.zipCode, country: effectiveShipping.country };
      apiClient.patchProfile({
        shipping_address: addrToSave,
        billing_address: billingSameAsShipping ? null : { name: effectiveBilling.name, address: effectiveBilling.address, city: effectiveBilling.city, state: effectiveBilling.state, zipCode: effectiveBilling.zipCode, country: effectiveBilling.country },
      }).catch(() => {});

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
          shipping_address: effectiveShipping,
          billing_address: effectiveBilling,
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

  const addrCardStyle = (selected: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 12px',
    border: `1.5px solid ${selected ? '#c19a6b' : '#e8d5c4'}`,
    borderRadius: '8px', marginBottom: '8px', cursor: 'pointer',
    background: selected ? 'rgba(193,154,107,0.06)' : 'white',
    transition: 'border-color 0.15s',
  });

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
            {/* Saved shipping address picker */}
            {savedShippingAddr?.address && (
              <div style={{ marginBottom: '16px' }}>
                <label style={addrCardStyle(shippingMode === 'saved')} onClick={() => setShippingMode('saved')}>
                  <input type="radio" readOnly checked={shippingMode === 'saved'} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#333', marginBottom: '2px' }}>{(user as any).name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {savedShippingAddr.address}, {savedShippingAddr.city}{savedShippingAddr.state ? `, ${savedShippingAddr.state}` : ''} — {savedShippingAddr.zipCode}
                    </div>
                  </div>
                </label>
                <label style={addrCardStyle(shippingMode === 'new')} onClick={() => setShippingMode('new')}>
                  <input type="radio" readOnly checked={shippingMode === 'new'} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#555' }}>Use a different address</span>
                </label>
              </div>
            )}

            {/* Shipping address form — always shown when no saved address, or when 'new' is selected */}
            {(shippingMode === 'new' || !savedShippingAddr?.address) && <FormGrid>
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
            </FormGrid>}

            {/* Billing Address */}
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#333', marginBottom: '12px' }}>Billing Address</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#555', cursor: 'pointer', marginBottom: '12px' }}>
                <input
                  type="checkbox"
                  checked={billingSameAsShipping}
                  onChange={e => setBillingSameAsShipping(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                Same as shipping address
              </label>

              {!billingSameAsShipping && (<>
                {/* Saved billing address picker */}
                {savedBillingAddr?.address && (
                  <div style={{ marginBottom: '12px' }}>
                    <label style={addrCardStyle(billingMode === 'saved')} onClick={() => setBillingMode('saved')}>
                      <input type="radio" readOnly checked={billingMode === 'saved'} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: '#333', marginBottom: '2px' }}>{savedBillingAddr.name || (user as any).name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {savedBillingAddr.address}, {savedBillingAddr.city}{savedBillingAddr.state ? `, ${savedBillingAddr.state}` : ''} — {savedBillingAddr.zipCode}
                        </div>
                      </div>
                    </label>
                    <label style={addrCardStyle(billingMode === 'new')} onClick={() => setBillingMode('new')}>
                      <input type="radio" readOnly checked={billingMode === 'new'} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: '#555' }}>Use a different billing address</span>
                    </label>
                  </div>
                )}

                {/* Billing form — shown when no saved billing or 'new' is selected */}
                {(billingMode === 'new' || !savedBillingAddr?.address) && (
                  <FormGrid>
                    <FormField $fullWidth>
                      <label htmlFor="billing_name">Full Name *</label>
                      <input type="text" name="name" id="billing_name" value={billingAddress.name} onChange={handleBillingInputChange} required />
                    </FormField>
                    <FormField $fullWidth>
                      <label htmlFor="billing_address">Street Address *</label>
                      <input type="text" name="address" id="billing_address" value={billingAddress.address} onChange={handleBillingInputChange} required />
                    </FormField>
                    <FormField>
                      <label htmlFor="billing_city">City *</label>
                      <input type="text" name="city" id="billing_city" value={billingAddress.city} onChange={handleBillingInputChange} required />
                    </FormField>
                    <FormField>
                      <label htmlFor="billing_state">State *</label>
                      <input type="text" name="state" id="billing_state" value={billingAddress.state} onChange={handleBillingInputChange} required />
                    </FormField>
                    <FormField>
                      <label htmlFor="billing_zipCode">PIN Code *</label>
                      <input type="text" name="zipCode" id="billing_zipCode" value={billingAddress.zipCode} onChange={handleBillingInputChange} required />
                    </FormField>
                    <FormField>
                      <label htmlFor="billing_country">Country</label>
                      <input type="text" name="country" id="billing_country" value={billingAddress.country} onChange={handleBillingInputChange} required readOnly />
                    </FormField>
                  </FormGrid>
                )}
              </>)}
            </div>

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