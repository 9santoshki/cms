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

const printOrderInvoice = (order: any) => {
  const win = window.open('', '_blank', 'width=820,height=700');
  if (!win) return;
  const items: any[] = order.items || [];
  const total = typeof order.total_amount === 'number'
    ? order.total_amount
    : parseFloat(order.total_amount || '0');
  const fmt = (n: number) => n.toLocaleString('en-IN', { minimumFractionDigits: 2 });
  const addr = order.customer;
  const itemsHtml = items.map((item: any) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price || '0');
    const qty = item.quantity || 1;
    return `<tr>
      <td>${item.name || item.product_name || 'Product'}</td>
      <td style="text-align:center">${qty}</td>
      <td style="text-align:right">₹${fmt(price)}</td>
      <td style="text-align:right">₹${fmt(price * qty)}</td>
    </tr>`;
  }).join('');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Order #${order.id}</title><style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Arial,sans-serif;padding:32px;color:#333;max-width:760px;margin:0 auto}
    .hdr{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #c19a6b;padding-bottom:14px;margin-bottom:18px}
    .brand{font-size:22px;font-weight:700;color:#c19a6b}.sub{font-size:11px;color:#999;margin-top:3px}
    .ord-no{font-size:17px;font-weight:600;color:#333;text-align:right}.ord-date{font-size:12px;color:#777;text-align:right;margin-top:3px}
    .badge{display:inline-block;padding:2px 10px;border-radius:20px;font-size:10px;font-weight:700;text-transform:uppercase;background:#fef3c7;color:#92400e;margin-top:5px}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:18px}
    .sec-title{font-size:10px;font-weight:700;text-transform:uppercase;color:#aaa;letter-spacing:.06em;margin-bottom:7px}
    .kv{font-size:12px;color:#555;margin-bottom:4px}.kv b{color:#333;margin-right:6px}
    table{width:100%;border-collapse:collapse;margin-bottom:4px}
    th{background:#f8f4f0;padding:7px 10px;text-align:left;font-size:11px;color:#777;border-bottom:1px solid #e8e8e8}
    th:nth-child(2){text-align:center}th:nth-child(3),th:nth-child(4){text-align:right}
    td{padding:7px 10px;font-size:12px;border-bottom:1px solid #f0f0f0}
    .tot td{font-weight:700;font-size:14px;border-top:2px solid #c19a6b;background:#f8f4f0}
    .tot td:last-child{color:#c19a6b}
    .footer{margin-top:24px;padding-top:12px;border-top:1px solid #eee;text-align:center;font-size:10px;color:#bbb}
    @media print{body{padding:16px}}
  </style></head><body>
    <div class="hdr">
      <div><div class="brand">Colour My Space</div><div class="sub">Interior Design &amp; Decor</div></div>
      <div><div class="ord-no">Order #${order.id}</div><div class="ord-date">${new Date(order.created_at || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div><div><span class="badge">${order.status || 'pending'}</span></div></div>
    </div>
    <div class="grid">
      <div>
        <div class="sec-title">Order Details</div>
        <div class="kv"><b>Order #</b>${order.id}</div>
        <div class="kv"><b>Status</b>${order.status || 'pending'}</div>
        ${order.payment_id ? `<div class="kv"><b>Payment ID</b><span style="font-size:10px">${order.payment_id}</span></div>` : ''}
      </div>
      ${addr && addr.city ? `<div>
        <div class="sec-title">Shipping Address</div>
        ${addr.name ? `<div class="kv"><b>${addr.name}</b></div>` : ''}
        ${addr.address ? `<div class="kv" style="color:#666">${addr.address}</div>` : ''}
        <div class="kv" style="color:#666">${addr.city}${addr.state ? ', ' + addr.state : ''}${addr.zipCode ? ' — ' + addr.zipCode : ''}</div>
        ${addr.phone ? `<div class="kv" style="color:#666">📞 ${addr.phone}</div>` : ''}
      </div>` : '<div></div>'}
    </div>
    <div class="sec-title">Items</div>
    <table><thead><tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
    <tbody>${itemsHtml}<tr class="tot"><td colspan="3" style="text-align:right">Grand Total</td><td style="text-align:right">₹${fmt(total)}</td></tr></tbody>
    </table>
    <div class="footer">Thank you for shopping with Colour My Space &nbsp;·&nbsp; colourmyspace.com</div>
    <script>window.onload=function(){window.print();}<\/script>
  </body></html>`);
  win.document.close();
};

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
        {error && (
          <ErrorMessage>
            <i className="fas fa-exclamation-circle" />
            {error}
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
              const orderDate = formatDateLocal(order.created_at);
              const totalAmount = order.total_amount ?? 0;
              const status = order.status || 'pending';
              const items = order.items || [];

              // Extract shipping address from order customer
              let shippingAddress = null;
              if (order.customer?.city) {
                shippingAddress = `${order.customer.city}${order.customer.zipCode ? ' - ' + order.customer.zipCode : ''}`;
              }

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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <OrderTotal>
                        <div className="label">Total</div>
                        <div className="amount">
                          ₹{typeof totalAmount === 'number'
                            ? totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })
                            : parseFloat(totalAmount || '0').toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </div>
                      </OrderTotal>
                      <button
                        onClick={() => printOrderInvoice(order)}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', background: '#f8f4f0', border: '1px solid #e8d5c4', borderRadius: '6px', fontSize: '11px', fontWeight: '500', color: '#c19a6b', cursor: 'pointer', whiteSpace: 'nowrap' }}
                      >
                        <i className="fas fa-download" style={{ fontSize: '10px' }} /> Download PDF
                      </button>
                    </div>
                  </OrderHeader>

                  <OrderItems>
                    {items.length > 0 ? items.map((item: any, itemIndex: number) => {
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
                            <h4>{item.name || item.product_name || 'Product'}</h4>
                            <span className="quantity">Qty: {item.quantity || 1} × ₹{itemPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                          </ItemDetails>
                          <ItemPrice>₹{itemTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</ItemPrice>
                        </OrderItem>
                      );
                    }) : (
                      <OrderItem>
                        <ItemDetails>
                          <h4>No items found</h4>
                        </ItemDetails>
                      </OrderItem>
                    )}
                  </OrderItems>

                  {shippingAddress && (
                    <OrderFooter>
                      <ShippingInfo>
                        <i className="fas fa-map-marker-alt" />
                        Delivery to: {shippingAddress}
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
