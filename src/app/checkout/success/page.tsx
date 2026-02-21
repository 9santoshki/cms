'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppContext } from '@/context/AppContext';
import { formatDate } from '@/utils/formatUtils';
import {
  SuccessContainer,
  SuccessContent,
  SuccessCard,
  SuccessHeader,
  SuccessIconWrapper,
  SuccessTitle,
  SuccessSubtitle,
  OrderDetailsSection,
  OrderDetailsGrid,
  DetailBox,
  OrderItemsSection,
  SectionTitle,
  OrderItem,
  ItemImage,
  ItemDetails,
  ItemPrice,
  OrderTotal,
  ActionButtons,
  Button,
  InfoMessage,
  LoadingContainer,
  ErrorContainer
} from '@/styles/CheckoutSuccessStyles';

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

        // Fetch real order data from API
        const response = await fetch(`/api/order/${orderId}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to fetch order details');
        }

        setOrder(result.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch order details');
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  const handleContinueShopping = () => {
    router.push('/shop');
  };

  const handleViewOrders = () => {
    router.push('/orders');
  };

  if (loading) {
    return (
      <SuccessContainer>
        <Header activePage="checkout" />
        <SuccessContent>
          <SuccessCard>
            <LoadingContainer>
              <div className="spinner" />
              <p>Loading order details...</p>
            </LoadingContainer>
          </SuccessCard>
        </SuccessContent>
        <Footer />
      </SuccessContainer>
    );
  }

  if (error || !order) {
    return (
      <SuccessContainer>
        <Header activePage="checkout" />
        <SuccessContent>
          <SuccessCard>
            <ErrorContainer>
              <i className="fas fa-exclamation-circle error-icon" />
              <h2>Unable to Load Order</h2>
              <p>{error || 'Order not found. Please check your order history.'}</p>
              <Button $variant="primary" onClick={() => router.push('/orders')}>
                <i className="fas fa-list" />
                View Order History
              </Button>
            </ErrorContainer>
          </SuccessCard>
        </SuccessContent>
        <Footer />
      </SuccessContainer>
    );
  }

  // Parse shipping address
  let shippingAddress = null;
  if (order.shipping_address) {
    try {
      shippingAddress = typeof order.shipping_address === 'string'
        ? JSON.parse(order.shipping_address)
        : order.shipping_address;
    } catch (e) {
      console.error('Error parsing shipping address:', e);
    }
  }

  return (
    <SuccessContainer>
      <Header activePage="checkout" />

      <SuccessContent>
        <SuccessCard>
          <SuccessHeader>
            <SuccessIconWrapper>
              <i className="fas fa-check-circle" />
            </SuccessIconWrapper>
            <SuccessTitle>Thank You for Your Order!</SuccessTitle>
            <SuccessSubtitle>Your order has been successfully placed and confirmed</SuccessSubtitle>
          </SuccessHeader>

          <OrderDetailsSection>
            <OrderDetailsGrid>
              <DetailBox>
                <h3>Order Information</h3>
                <div className="detail-item">
                  <strong>Order ID:</strong> #{order.id}
                </div>
                <div className="detail-item">
                  <strong>Date:</strong> {formatDate(order.created_at)}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong>
                  <span className="status-badge">
                    <i className="fas fa-check-circle" />
                    {order.payment_status || 'Paid'}
                  </span>
                </div>
              </DetailBox>

              {shippingAddress && (
                <DetailBox>
                  <h3>Delivery Address</h3>
                  {shippingAddress.name && <div className="detail-item"><strong>{shippingAddress.name}</strong></div>}
                  {shippingAddress.address && <div className="detail-item">{shippingAddress.address}</div>}
                  <div className="detail-item">
                    {shippingAddress.city && `${shippingAddress.city}`}
                    {shippingAddress.state && `, ${shippingAddress.state}`}
                    {shippingAddress.zipCode && ` - ${shippingAddress.zipCode}`}
                  </div>
                  {shippingAddress.country && <div className="detail-item">{shippingAddress.country}</div>}
                  {shippingAddress.phone && <div className="detail-item"><strong>Phone:</strong> {shippingAddress.phone}</div>}
                </DetailBox>
              )}
            </OrderDetailsGrid>
          </OrderDetailsSection>

          <OrderItemsSection>
            <SectionTitle>Order Items</SectionTitle>
            {order.items && order.items.length > 0 ? (
              order.items.map((item: any, index: number) => {
                const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price || '0');
                const itemTotal = itemPrice * (item.quantity || 1);

                return (
                  <OrderItem key={index}>
                    <ItemImage $imageUrl={item.image_url}>
                      {!item.image_url && <i className="fas fa-image" />}
                    </ItemImage>
                    <ItemDetails>
                      <h4>{item.name || item.product_name || 'Product'}</h4>
                      <span className="quantity">
                        Qty: {item.quantity || 1} × ₹{itemPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </ItemDetails>
                    <ItemPrice>₹{itemTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</ItemPrice>
                  </OrderItem>
                );
              })
            ) : (
              <OrderItem>
                <ItemDetails>
                  <h4>No items found</h4>
                </ItemDetails>
              </OrderItem>
            )}
          </OrderItemsSection>

          <OrderTotal>
            <div className="label">Grand Total</div>
            <div className="amount">
              ₹{typeof order.total_amount === 'number'
                ? order.total_amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })
                : parseFloat(order.total_amount || '0').toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </div>
          </OrderTotal>

          <ActionButtons>
            <Button $variant="secondary" onClick={handleContinueShopping}>
              <i className="fas fa-shopping-bag" />
              Continue Shopping
            </Button>
            <Button $variant="primary" onClick={handleViewOrders}>
              <i className="fas fa-receipt" />
              View All Orders
            </Button>
          </ActionButtons>
        </SuccessCard>

        <InfoMessage>
          <p>
            <strong>Order confirmation has been sent to:</strong> {user?.email || 'your email'}
          </p>
          <p>
            We'll notify you when your order is ready for delivery. Need help? Contact us at{' '}
            <a href="tel:+919513351833">+91 95133 51833</a> or{' '}
            <a href="mailto:rajnishkumarranjan@gmail.com">rajnishkumarranjan@gmail.com</a>
          </p>
        </InfoMessage>
      </SuccessContent>

      <Footer />
    </SuccessContainer>
  );
};

const CheckoutSuccessPage = () => {
  return (
    <Suspense fallback={
      <SuccessContainer>
        <Header activePage="checkout" />
        <SuccessContent>
          <SuccessCard>
            <LoadingContainer>
              <div className="spinner" />
              <p>Loading...</p>
            </LoadingContainer>
          </SuccessCard>
        </SuccessContent>
        <Footer />
      </SuccessContainer>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
};

export default CheckoutSuccessPage;