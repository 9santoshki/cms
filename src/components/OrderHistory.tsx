'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import Header from './Header';
import Footer from './Footer';
import { formatDate } from '../utils/formatUtils';
import {
  OrdersContainer,
  OrdersHeaderSection,
  OrdersContent,
  EmptyOrdersSection,
  EmptyOrdersContent,
  OrdersList,
  OrderCard,
  OrderHeader,
  OrderInfo,
  OrderTotal,
  OrderStatus,
  OrderItems,
  OrderItem,
  ItemImage,
  ItemDetails,
  ItemPrice,
  OrderFooter,
  ShippingInfo,
  LoadingContainer,
  ErrorMessage
} from '../styles/OrderHistoryStyles';

const OrderHistory = () => {
  const router = useRouter();
  const { orders, loading, error, fetchOrders } = useAppContext();

  const navigate = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatDateLocal = (dateString?: string) => {
    if (!dateString) return '';
    return formatDate(dateString);
  };

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'fas fa-check-circle';
      case 'processing':
      case 'shipped':
        return 'fas fa-shipping-fast';
      case 'pending':
        return 'fas fa-clock';
      case 'cancelled':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-receipt';
    }
  };

  if (loading?.orders) {
    return (
      <OrdersContainer>
        <Header activePage="orders" />
        <OrdersHeaderSection>
          <h1>Order History</h1>
          <p>Your past purchases</p>
        </OrdersHeaderSection>
        <OrdersContent>
          <LoadingContainer>
            <div className="spinner" />
            <p>Loading your orders...</p>
          </LoadingContainer>
        </OrdersContent>
        <Footer />
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <Header activePage="orders" />
      <OrdersHeaderSection>
        <h1>Order History</h1>
        <p>Your past purchases</p>
      </OrdersHeaderSection>

      <OrdersContent>
        {error?.orders && (
          <ErrorMessage>
            <i className="fas fa-exclamation-circle" />
            {error.orders}
          </ErrorMessage>
        )}

        {orders.length === 0 ? (
          <EmptyOrdersSection>
            <EmptyOrdersContent>
              <i className="fas fa-shopping-bag empty-icon" />
              <h2>No orders yet</h2>
              <p>You haven't placed any orders yet. Start exploring our collection and find something you'll love.</p>
              <button className="btn primary" onClick={() => navigate('/shop')}>
                <i className="fas fa-store" />
                Start Shopping
              </button>
            </EmptyOrdersContent>
          </EmptyOrdersSection>
        ) : (
          <OrdersList>
            {[...orders].reverse().map((order, index) => {
              const orderId = order.id || index + 1;
              const orderDate = formatDateLocal(order.created_at || order.date);
              const totalAmount = order.total_amount ?? order.total ?? 0;
              const status = order.status || 'pending';
              const items = order.items || [];
              const shippingAddress = order.customer?.city
                ? `${order.customer.city}${order.customer.zipCode ? ', ' + order.customer.zipCode : ''}`
                : null;

              return (
                <OrderCard key={orderId}>
                  <OrderHeader>
                    <OrderInfo>
                      <span className="order-number">Order #{orderId}</span>
                      <span className="order-date">{orderDate}</span>
                      <OrderStatus $status={status}>
                        <i className={getStatusIcon(status)} />
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </OrderStatus>
                    </OrderInfo>
                    <OrderTotal>
                      <div className="label">Total</div>
                      <div className="amount">
                        ₹{typeof totalAmount === 'number'
                          ? totalAmount.toLocaleString()
                          : parseFloat(totalAmount || '0').toLocaleString()}
                      </div>
                    </OrderTotal>
                  </OrderHeader>

                  <OrderItems>
                    {items.map((item: any, itemIndex: number) => {
                      const itemPrice = typeof item.price === 'number'
                        ? item.price
                        : parseFloat(item.price || '0');
                      const itemTotal = itemPrice * (item.quantity || 1);

                      return (
                        <OrderItem key={item.id || itemIndex}>
                          <ItemImage $imageUrl={item.image_url}>
                            {!item.image_url && <i className="fas fa-image" />}
                          </ItemImage>
                          <ItemDetails>
                            <h4>{item.name || item.product_name}</h4>
                            <span className="quantity">Qty: {item.quantity}</span>
                          </ItemDetails>
                          <ItemPrice>₹{itemTotal.toLocaleString()}</ItemPrice>
                        </OrderItem>
                      );
                    })}
                  </OrderItems>

                  {shippingAddress && (
                    <OrderFooter>
                      <ShippingInfo>
                        <i className="fas fa-map-marker-alt" />
                        Shipped to: {shippingAddress}
                      </ShippingInfo>
                    </OrderFooter>
                  )}
                </OrderCard>
              );
            })}
          </OrdersList>
        )}
      </OrdersContent>

      <Footer />
    </OrdersContainer>
  );
};

export default OrderHistory;
