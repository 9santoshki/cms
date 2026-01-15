'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppContext } from '@/context/AppContext';

const CheckoutSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAppContext();

  useEffect(() => {
    if (!orderId) {
      router.push('/cart');
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would fetch order details from the API
        // For now, we'll create mock order data based on the orderId
        const mockOrder = {
          id: orderId,
          total_amount: 0, // This would come from the API
          status: 'paid',
          created_at: new Date().toISOString(),
          shipping_address: {
            name: user?.name || 'Customer',
            address: 'Sample Address',
            city: 'Sample City',
            state: 'Sample State',
            zipCode: '123456',
            country: 'India'
          },
          items: [] // This would come from the API
        };
        
        setOrder(mockOrder);
      } catch (err: any) {
        setError('Failed to fetch order details');
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router, user]);

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleViewOrder = () => {
    router.push(`/order/${order.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activePage="checkout" />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activePage="checkout" />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleContinueShopping}
              className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="checkout" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
              <p className="text-gray-600">Your order has been placed successfully</p>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Details</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600"><span className="font-medium">Order ID:</span> #{order.id}</p>
                    <p className="text-gray-600"><span className="font-medium">Date:</span> {new Date(order.created_at).toLocaleDateString('en-IN')}</p>
                    <p className="text-gray-600"><span className="font-medium">Status:</span> 
                      <span className="inline-flex items-center ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Address</h3>
                  <div className="text-gray-600">
                    <p>{order.shipping_address.name}</p>
                    <p>{order.shipping_address.address}</p>
                    <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zipCode}</p>
                    <p>{order.shipping_address.country}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                              ₹{typeof item.price === 'number' ? item.price.toLocaleString() : parseFloat(item.price || '0').toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                              ₹{typeof item.price === 'number' 
                                ? (item.price * item.quantity).toLocaleString() 
                                : (parseFloat(item.price || '0') * item.quantity).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                            No items to display
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <th scope="row" colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                          Total
                        </th>
                        <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                          ₹{order.total_amount?.toLocaleString() || '0'}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleContinueShopping}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleViewOrder}
                className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                View Order Details
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>An order confirmation email has been sent to {user?.email}</p>
          <p className="mt-2">Need help? Contact us at support@colormyspace.com</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const CheckoutSuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Header activePage="checkout" />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
};

export default CheckoutSuccessPage;