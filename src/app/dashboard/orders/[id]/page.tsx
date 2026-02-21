'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: string | number;
  image_url?: string;
}

interface Order {
  id: number;
  user_id: number;
  user_email?: string;
  user_name?: string;
  total_amount: string | number;
  status: string;
  payment_status?: string;
  payment_id?: string;
  shipping_address?: any;
  created_at: string;
  updated_at?: string;
  items?: OrderItem[];
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');

  useEffect(() => {
    params.then((p) => setOrderId(p.id));
  }, [params]);

  useEffect(() => {
    if (!orderId) return;
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();

      if (data.success) {
        setOrder(data.data);
      } else {
        setError(data.error || 'Failed to load order details');
      }
    } catch (err: any) {
      console.error('Error fetching order:', err);
      setError(err.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    if (!orderId || !order) return;

    // If changing to shipped, show tracking form
    if (newStatus === 'shipped' && !selectedStatus) {
      setSelectedStatus(newStatus);
      return;
    }

    try {
      setUpdating(true);

      const payload: any = { status: newStatus };

      // Include tracking details if status is shipped
      if (newStatus === 'shipped') {
        if (trackingNumber) payload.trackingNumber = trackingNumber;
        if (carrier) payload.carrier = carrier;
        if (trackingUrl) payload.trackingUrl = trackingUrl;
      }

      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setOrder({ ...order, status: newStatus });
        alert(data.message || 'Order status updated successfully');
        // Reset tracking form
        setSelectedStatus(null);
        setTrackingNumber('');
        setCarrier('');
        setTrackingUrl('');
      } else {
        alert(data.error || 'Failed to update order status');
      }
    } catch (err: any) {
      console.error('Error updating order:', err);
      alert(err.message || 'Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const parseShippingAddress = (address: any) => {
    if (!address) return null;
    if (typeof address === 'string') {
      try {
        return JSON.parse(address);
      } catch {
        return null;
      }
    }
    return address;
  };

  if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Access Denied</h1>
        <p>You must be an admin or moderator to view this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Error</h1>
        <p>{error || 'Order not found'}</p>
        <button onClick={() => router.push('/dashboard/orders')} className="btn primary">
          Back to Orders
        </button>
      </div>
    );
  }

  const shippingAddress = parseShippingAddress(order.shipping_address);
  const totalAmount = typeof order.total_amount === 'string'
    ? parseFloat(order.total_amount)
    : order.total_amount;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button
            onClick={() => router.push('/dashboard/orders')}
            style={{
              background: 'none',
              border: 'none',
              color: '#c19a6b',
              cursor: 'pointer',
              fontSize: '14px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <i className="fas fa-arrow-left"></i> Back to Orders
          </button>
          <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#333', margin: '0' }}>
            Order #{order.id}
          </h1>
        </div>
        <div>
          <span style={{
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'uppercase',
            backgroundColor: order.status === 'completed' ? '#d1fae5' :
                           order.status === 'pending' ? '#fef3c7' :
                           order.status === 'cancelled' ? '#fee2e2' : '#e5e7eb',
            color: order.status === 'completed' ? '#065f46' :
                   order.status === 'pending' ? '#92400e' :
                   order.status === 'cancelled' ? '#991b1b' : '#374151'
          }}>
            {order.status}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Left Column - Order Items */}
        <div>
          {/* Order Items */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e5e7eb',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>
              Order Items
            </h2>
            {order.items && order.items.length > 0 ? (
              <div>
                {order.items.map((item, index) => (
                  <div
                    key={item.id || index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '15px 0',
                      borderBottom: index < order.items!.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}
                  >
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.product_name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#333', marginBottom: '5px' }}>
                        {item.product_name}
                      </h4>
                      <p style={{ fontSize: '14px', color: '#666' }}>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#c19a6b' }}>
                        ₹{(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toLocaleString()}
                      </p>
                      <p style={{ fontSize: '14px', color: '#666' }}>
                        Total: ₹{((typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div style={{
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '2px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                    Grand Total
                  </span>
                  <span style={{ fontSize: '24px', fontWeight: '600', color: '#c19a6b' }}>
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <p style={{ color: '#666' }}>No items found</p>
            )}
          </div>

          {/* Shipping Address */}
          {shippingAddress && (
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                Shipping Address
              </h2>
              <div style={{ color: '#666', lineHeight: '1.8' }}>
                {shippingAddress.name && (
                  <p style={{ fontWeight: '500', color: '#333', marginBottom: '5px' }}>
                    {shippingAddress.name}
                  </p>
                )}
                {shippingAddress.address && <p>{shippingAddress.address}</p>}
                <p>
                  {shippingAddress.city && shippingAddress.city}
                  {shippingAddress.state && `, ${shippingAddress.state}`}
                  {shippingAddress.zipCode && ` - ${shippingAddress.zipCode}`}
                </p>
                {shippingAddress.country && <p>{shippingAddress.country}</p>}
                {shippingAddress.phone && (
                  <p style={{ marginTop: '10px' }}>
                    <strong>Phone:</strong> {shippingAddress.phone}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Order Info & Actions */}
        <div>
          {/* Order Information */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e5e7eb',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
              Order Information
            </h2>
            <div style={{ color: '#666', lineHeight: '1.8' }}>
              <p><strong style={{ color: '#333' }}>Order ID:</strong> #{order.id}</p>
              <p><strong style={{ color: '#333' }}>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong style={{ color: '#333' }}>Customer:</strong> {order.user_name || order.user_email || 'N/A'}</p>
              <p><strong style={{ color: '#333' }}>Email:</strong> {order.user_email || 'N/A'}</p>
              {order.payment_id && (
                <p><strong style={{ color: '#333' }}>Payment ID:</strong> {order.payment_id}</p>
              )}
              {order.payment_status && (
                <p><strong style={{ color: '#333' }}>Payment:</strong> {order.payment_status}</p>
              )}
            </div>
          </div>

          {/* Update Status */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
              Update Status
            </h2>

            {/* Tracking Details Form (shown when shipped is selected) */}
            {selectedStatus === 'shipped' && (
              <div style={{
                marginBottom: '20px',
                padding: '20px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  📦 Shipment Details
                </h3>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '5px' }}>
                    Tracking Number *
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g., TRACK123456789"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '5px' }}>
                    Carrier *
                  </label>
                  <select
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select carrier...</option>
                    <option value="BlueDart">BlueDart</option>
                    <option value="DTDC">DTDC</option>
                    <option value="FedEx">FedEx</option>
                    <option value="Delhivery">Delhivery</option>
                    <option value="India Post">India Post</option>
                    <option value="Ecom Express">Ecom Express</option>
                    <option value="Ekart">Ekart</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '5px' }}>
                    Tracking URL (optional)
                  </label>
                  <input
                    type="url"
                    value={trackingUrl}
                    onChange={(e) => setTrackingUrl(e.target.value)}
                    placeholder="https://www.carrier.com/track/..."
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => updateOrderStatus('shipped')}
                    disabled={updating || !trackingNumber || !carrier}
                    className="btn primary"
                    style={{ flex: 1 }}
                  >
                    {updating ? 'Updating...' : '✉️ Mark as Shipped & Send Email'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedStatus(null);
                      setTrackingNumber('');
                      setCarrier('');
                      setTrackingUrl('');
                    }}
                    className="btn secondary"
                    style={{ flex: 0 }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Status Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['pending', 'processing', 'shipped', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateOrderStatus(status)}
                  disabled={updating || order.status === status || selectedStatus === 'shipped'}
                  className={order.status === status ? 'btn primary' : 'btn secondary'}
                  style={{
                    width: '100%',
                    textTransform: 'capitalize',
                    opacity: order.status === status ? 0.7 : 1,
                    cursor: order.status === status ? 'not-allowed' : 'pointer'
                  }}
                >
                  {order.status === status && '✓ '}
                  {status}
                  {status === 'shipped' && ' 📦'}
                  {status === 'completed' && ' ✅'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
