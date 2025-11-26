'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useCartStore } from '@/store/cartStore';
import { apiClient } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CheckoutPage = () => {
  const router = useRouter();
  const { user } = useAppContext();
  const [cartItems] = useCartStore(state => [state.items, state.getTotalPrice()]);
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
        shipping_address
      });

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create checkout session');
      }

      const checkoutResult = response;

      // Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Should be in environment variables
        amount: result.data.amount, // Amount in paise
        currency: result.data.currency,
        name: 'Colour My Space',
        description: 'Furniture Purchase',
        order_id: result.data.razorpay_order_id,
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

            const verifyResult = verifyResponse;

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="checkout" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={shippingAddress.name}
                        onChange={handleInputChange}
                        required
                        className="py-2 px-3 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={shippingAddress.email}
                        onChange={handleInputChange}
                        required
                        className="py-2 px-3 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                        readOnly={!!user?.email} // Make email field read-only if user is logged in with email
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={handleInputChange}
                        required
                        className="py-2 px-3 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={shippingAddress.address}
                        onChange={handleInputChange}
                        required
                        className="py-2 px-3 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        required
                        className="py-2 px-3 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={shippingAddress.state}
                        onChange={handleInputChange}
                        required
                        className="py-2 px-3 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={handleInputChange}
                        required
                        className="py-2 px-3 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="country"
                        id="country"
                        value={shippingAddress.country}
                        onChange={handleInputChange}
                        required
                        className="py-2 px-3 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 border-gray-300 rounded-md"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || cartItems.length === 0}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay ₹${useCartStore.getState().getTotalPrice().toLocaleString()}`
                    )}
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">₹{(typeof item.price === 'number' ? item.price : parseFloat(item.price || '0')).toLocaleString()}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty: {item.quantity}</p>

                          <p className="font-medium text-gray-900">
                            ₹{typeof item.price === 'number'
                              ? (item.price * item.quantity).toLocaleString()
                              : (parseFloat(item.price || '0') * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹{useCartStore.getState().getTotalPrice().toLocaleString()}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Shipping</p>
                  <p>Calculated at checkout</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>₹{useCartStore.getState().getTotalPrice().toLocaleString()}</p>
                </div>
              </div>

              <p className="mt-6 text-xs text-gray-500">
                After clicking "Pay Now", you will be redirected to Razorpay to complete your purchase securely.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;