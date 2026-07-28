'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useCartStore } from '@/store/cartStore';
import { apiClient } from '@/lib/api';
import type { SavedAddress } from '@/types';
import { calculateCartTotal, calculateShippingCost, calculateConvenienceFee, CONVENIENCE_FEE_RATE } from '@/utils/cartUtils';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useCartTax } from '@/hooks/useCartTax';
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
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'upi_qr'>('razorpay');
  const [upiQr, setUpiQr] = useState<{ qr_data_url: string; vpa: string; payee_name: string } | null>(null);
  const [upiQrLoading, setUpiQrLoading] = useState(false);
  const [upiQrError, setUpiQrError] = useState<string | null>(null);
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
  const [savedShippingAddr, setSavedShippingAddr] = useState<SavedAddress | null>(null);
  const [savedBillingAddr, setSavedBillingAddr] = useState<SavedAddress | null>(null);
  // 'saved' = use the profile card, 'new' = show the editable form
  const [shippingMode, setShippingMode] = useState<'saved' | 'new'>('new');
  const [billingMode, setBillingMode] = useState<'saved' | 'new'>('new');
  const siteSettings = useSiteSettings();

  const subtotal = calculateCartTotal(cartItems);
  const shipping = calculateShippingCost(subtotal, siteSettings.shipping.flat_rate, siteSettings.shipping.min_order_amount);
  const { tax, taxRate, additiveTax } = useCartTax(cartItems, subtotal, shipping, siteSettings.tax);
  const total = subtotal + shipping + additiveTax; // payable before any payment-method fee; also the UPI QR amount, since UPI is free
  const convenienceFee = calculateConvenienceFee(total, paymentMethod);
  const payableTotal = total + convenienceFee; // what's actually charged for the selected payment method

  // Fetch the UPI QR code whenever "Scan & Pay" is selected — the QR encodes
  // the live cart total so the customer's UPI app pre-fills the amount.
  useEffect(() => {
    if (paymentMethod !== 'upi_qr' || total <= 0) return;
    let cancelled = false;
    setUpiQrLoading(true);
    setUpiQrError(null);
    apiClient.generateUpiQr(total).then(res => {
      if (cancelled) return;
      if (res.success && res.data) {
        setUpiQr(res.data);
      } else {
        setUpiQrError(res.error || 'Could not load the payment QR code');
      }
    }).catch(() => {
      if (!cancelled) setUpiQrError('Could not load the payment QR code');
    }).finally(() => {
      if (!cancelled) setUpiQrLoading(false);
    });
    return () => { cancelled = true; };
  }, [paymentMethod, total]);

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/checkout');
    }
  }, [user, router]);

  // Pre-fill contact fields and GSTIN from profile when user is available
  useEffect(() => {
    if (user) {
      const u = user as any;
      setShippingAddress(prev => ({
        ...prev,
        name: u.name || prev.name,
        email: u.email || prev.email,
        phone: u.phone || prev.phone,
      }));
      if (u.gstin) setGstin(u.gstin);
    }
  }, [user]);

  // Auto-populate the most recently used shipping/billing address from the
  // user's address book (every distinct address they've checked out with —
  // see src/lib/db/addresses.ts), not just whatever was saved last. The
  // list is already ordered most-recently-used first, so [0] is "last used".
  useEffect(() => {
    if (!user) return;
    apiClient.getAddresses('shipping').then(res => {
      if (res.success && res.data && res.data.length > 0) {
        const addr = res.data[0];
        setSavedShippingAddr(addr);
        setShippingMode('saved');
        // Pre-fill the (always-editable) form so the saved address is shown
        // in full and can be tweaked for this order without retyping it.
        setShippingAddress(prev => ({
          ...prev,
          name: addr.name || prev.name,
          phone: addr.phone || '',
          address: addr.address,
          city: addr.city || '',
          state: addr.state || '',
          zipCode: addr.zipCode || '',
          country: addr.country || 'India',
        }));
      }
    }).catch(() => {});
    apiClient.getAddresses('billing').then(res => {
      if (res.success && res.data && res.data.length > 0) {
        const addr = res.data[0];
        setSavedBillingAddr(addr);
        setBillingMode('saved');
        setBillingSameAsShipping(false);
        setBillingAddress({
          name: addr.name || '',
          address: addr.address,
          city: addr.city || '',
          state: addr.state || '',
          zipCode: addr.zipCode || '',
          country: addr.country || 'India',
        });
      }
    }).catch(() => {});
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
      // Remove any stale/failed script tag before retrying
      document.querySelector('script[src*="checkout.razorpay.com"]')?.remove();
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

      // shippingAddress/billingAddress are always kept in sync with the
      // selected option — pre-filled from the address book when 'saved' is
      // picked, blank when 'new' is — and are directly editable either way,
      // so they're already the effective address to submit.
      const effectiveShipping = shippingAddress;
      const effectiveBilling = billingSameAsShipping ? effectiveShipping : billingAddress;

      // Persist GSTIN to profile (fire-and-forget). Addresses are no longer
      // patched here — checkout/create records the shipping/billing address
      // actually used into the user's address book once the order is
      // confirmed, which is more reliable than this fire-and-forget call
      // (it's tied to the real committed order, not a separate request that
      // could silently fail) and is what checkout auto-populates from.
      if (gstin !== (u.gstin || '')) {
        apiClient.patchProfile({ gstin }).catch(() => {});
      }

      const cartItemsPayload = cartItems.map(item => ({
        product_id: item.product_id,
        variant_id: item.variant_id,       // required for stock check
        variant_name: item.variant_name,   // stored on order_items
        quantity: item.quantity,
        price: typeof item.price === 'number' ? item.price : parseFloat(item.price || '0'),
        name: item.name,
      }));

      // UPI QR path: the order is placed immediately as "awaiting verification" —
      // no gateway involved, so just create the order and send the customer to
      // the success page (which shows the pending-verification state).
      if (paymentMethod === 'upi_qr') {
        const upiResponse = await apiClient.createCheckoutSession({
          items: cartItemsPayload,
          shipping_address: effectiveShipping,
          billing_address: effectiveBilling,
          payment_method: 'upi_qr',
        });

        if (!upiResponse.success || !upiResponse.data) {
          throw new Error(upiResponse.error || 'Failed to place order');
        }

        import('@/store/cartStore').then((module) => {
          module.useCartStore.getState().clearCart();
        });
        router.push(`/checkout/success?orderId=${upiResponse.data.order_id}`);
        return;
      }

      // Create order on backend and load Razorpay script in parallel
      const [response] = await Promise.all([
        apiClient.createCheckoutSession({
          items: cartItemsPayload,
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
            {/* Saved shipping address picker — selecting it pre-fills the
                form below, which stays fully editable either way, so the
                saved address is shown in full and can be corrected for this
                order without retyping it or leaving the address book itself
                untouched. */}
            {savedShippingAddr?.address && (
              <div style={{ marginBottom: '16px' }}>
                <label style={addrCardStyle(shippingMode === 'saved')} onClick={() => {
                  setShippingMode('saved');
                  setShippingAddress(prev => ({
                    ...prev,
                    name: savedShippingAddr.name || prev.name,
                    phone: savedShippingAddr.phone || '',
                    address: savedShippingAddr.address,
                    city: savedShippingAddr.city || '',
                    state: savedShippingAddr.state || '',
                    zipCode: savedShippingAddr.zipCode || '',
                    country: savedShippingAddr.country || 'India',
                  }));
                }}>
                  <input type="radio" readOnly checked={shippingMode === 'saved'} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#333', marginBottom: '2px' }}>{(user as any).name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {savedShippingAddr.address}, {savedShippingAddr.city}{savedShippingAddr.state ? `, ${savedShippingAddr.state}` : ''} — {savedShippingAddr.zipCode}
                    </div>
                  </div>
                </label>
                <label style={addrCardStyle(shippingMode === 'new')} onClick={() => {
                  setShippingMode('new');
                  setShippingAddress(prev => ({ ...prev, phone: '', address: '', city: '', state: '', zipCode: '', country: 'India' }));
                }}>
                  <input type="radio" readOnly checked={shippingMode === 'new'} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#555' }}>Use a different address</span>
                </label>
              </div>
            )}

            {/* Shipping address form — always shown and editable, whether
                pre-filled from a saved address or started blank */}
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
                {/* Saved billing address picker — selecting it pre-fills the
                    form below, which stays fully editable either way */}
                {savedBillingAddr?.address && (
                  <div style={{ marginBottom: '12px' }}>
                    <label style={addrCardStyle(billingMode === 'saved')} onClick={() => {
                      setBillingMode('saved');
                      setBillingAddress({
                        name: savedBillingAddr.name || '',
                        address: savedBillingAddr.address,
                        city: savedBillingAddr.city || '',
                        state: savedBillingAddr.state || '',
                        zipCode: savedBillingAddr.zipCode || '',
                        country: savedBillingAddr.country || 'India',
                      });
                    }}>
                      <input type="radio" readOnly checked={billingMode === 'saved'} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: '#333', marginBottom: '2px' }}>{savedBillingAddr.name || (user as any).name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {savedBillingAddr.address}, {savedBillingAddr.city}{savedBillingAddr.state ? `, ${savedBillingAddr.state}` : ''} — {savedBillingAddr.zipCode}
                        </div>
                      </div>
                    </label>
                    <label style={addrCardStyle(billingMode === 'new')} onClick={() => {
                      setBillingMode('new');
                      setBillingAddress({ name: '', address: '', city: '', state: '', zipCode: '', country: 'India' });
                    }}>
                      <input type="radio" readOnly checked={billingMode === 'new'} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: '#555' }}>Use a different billing address</span>
                    </label>
                  </div>
                )}

                {/* Billing form — always shown and editable, whether
                    pre-filled from a saved address or started blank */}
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
              <OrderSummaryRows subtotal={subtotal} shipping={shipping} tax={tax} taxRate={taxRate} additiveTax={additiveTax} convenienceFee={convenienceFee} paymentMethod={paymentMethod} />
            </OrderSummaryDetails>

            {siteSettings.upi.enabled && (
              <div style={{ margin: '16px 0' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                  Payment Method
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: `1.5px solid ${paymentMethod === 'razorpay' ? '#c19a6b' : '#e8d5c4'}`, borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', background: paymentMethod === 'razorpay' ? 'rgba(193,154,107,0.06)' : 'white' }}>
                  <input type="radio" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                  <span style={{ fontSize: '13px', color: '#333' }}>
                    Card / Netbanking / UPI (via Razorpay) <span style={{ color: '#888' }}>(+{CONVENIENCE_FEE_RATE}% convenience fee)</span>
                  </span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: `1.5px solid ${paymentMethod === 'upi_qr' ? '#c19a6b' : '#e8d5c4'}`, borderRadius: '8px', cursor: 'pointer', background: paymentMethod === 'upi_qr' ? 'rgba(193,154,107,0.06)' : 'white' }}>
                  <input type="radio" checked={paymentMethod === 'upi_qr'} onChange={() => setPaymentMethod('upi_qr')} />
                  <span style={{ fontSize: '13px', color: '#333' }}>
                    Scan &amp; Pay (UPI QR code) <span style={{ color: '#16a34a' }}>(no extra fee)</span>
                  </span>
                </label>
              </div>
            )}

            {paymentMethod === 'upi_qr' && (
              <div style={{ textAlign: 'center', padding: '16px', border: '1px solid #e8d5c4', borderRadius: '8px', marginBottom: '16px', background: '#faf8f6' }}>
                {upiQrLoading && <p style={{ fontSize: '13px', color: '#666' }}>Loading payment QR code…</p>}
                {upiQrError && <p style={{ fontSize: '13px', color: '#dc2626' }}>{upiQrError}</p>}
                {upiQr && !upiQrLoading && (
                  <>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '10px' }}>
                      Scan with any UPI app to pay ₹{total.toLocaleString()}
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={upiQr.qr_data_url} alt="UPI payment QR code" style={{ width: 200, height: 200, margin: '0 auto', display: 'block' }} />
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                      UPI ID: <strong>{upiQr.vpa}</strong>
                    </p>
                    <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                      After paying, click the button below. We&apos;ll confirm your payment and start
                      processing your order — you&apos;ll get an email once it&apos;s verified.
                    </p>
                  </>
                )}
              </div>
            )}

            <PayButton
              type="submit"
              disabled={loading || cartItems.length === 0 || (paymentMethod === 'upi_qr' && (upiQrLoading || !upiQr))}
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : paymentMethod === 'upi_qr' ? (
                `I've Paid — Place Order (₹${total.toLocaleString()})`
              ) : (
                `Pay ₹${payableTotal.toLocaleString()}`
              )}
            </PayButton>

            <SecurityNote>
              <i className="fas fa-lock"></i>
              {paymentMethod === 'upi_qr'
                ? 'Your order is placed once you confirm — payment is verified manually.'
                : 'Secure payment powered by Razorpay. Your information is encrypted and safe.'}
            </SecurityNote>
          </OrderSummaryCard>
        </OrderSummarySection>
      </CheckoutContent>

      <Footer />
    </CheckoutContainer>
  );
};

export default CheckoutPage;