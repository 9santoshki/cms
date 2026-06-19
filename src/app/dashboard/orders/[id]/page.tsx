'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { OrderReceipt } from '@/types';
import { formatOrderNumber } from '@/utils/orderUtils';

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: string | number;
  image_url?: string;
}

interface StatusHistoryEntry {
  id: number;
  from_status: string | null;
  to_status: string;
  changed_by_name: string | null;
  comment: string | null;
  created_at: string;
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
  billing_address?: any;
  cost_price?: string | number | null;
  cash_expense?: string | number | null;
  cost_notes?: string | null;
  created_at: string;
  updated_at?: string;
  items?: OrderItem[];
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  completed: { bg: '#d1fae5', text: '#065f46' },
  pending:   { bg: '#fef3c7', text: '#92400e' },
  cancelled: { bg: '#fee2e2', text: '#991b1b' },
  shipped:   { bg: '#dbeafe', text: '#1e40af' },
};
const DEFAULT_STATUS_COLOR = { bg: '#e5e7eb', text: '#374151' };

const parseOrNull = (s: string) => s !== '' ? parseFloat(s) : null;

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
  const [costPrice, setCostPrice] = useState('');
  const [cashExpense, setCashExpense] = useState('');
  const [costNotes, setCostNotes] = useState('');
  const [savingCost, setSavingCost] = useState(false);
  const [receipts, setReceipts] = useState<OrderReceipt[]>([]);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [statusComment, setStatusComment] = useState('');
  const [statusHistory, setStatusHistory] = useState<StatusHistoryEntry[]>([]);

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
      const [orderRes, receiptsRes] = await Promise.all([
        fetch(`/api/orders/${orderId}`),
        fetch(`/api/orders/${orderId}/receipts`),
      ]);
      const orderData = await orderRes.json();
      const receiptsData = await receiptsRes.json();

      if (orderData.success) {
        const o = orderData.data;
        setOrder(o);
        setCostPrice(o.cost_price != null ? String(+o.cost_price) : '');
        setCashExpense(o.cash_expense != null ? String(+o.cash_expense) : '');
        setCostNotes(o.cost_notes ?? '');
        setStatusHistory(o.statusHistory ?? []);
      } else {
        setError(orderData.error || 'Failed to load order details');
      }

      if (receiptsData.success) {
        setReceipts(receiptsData.data);
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

      const payload: any = { status: newStatus, comment: statusComment || null };

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
        setStatusComment('');
        // Refresh history from server
        fetch(`/api/orders/${orderId}`)
          .then(r => r.json())
          .then(d => { if (d.success) setStatusHistory(d.data.statusHistory ?? []); });
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

  const saveCosts = async () => {
    if (!orderId) return;
    try {
      setSavingCost(true);
      const res = await fetch(`/api/orders/${orderId}/cost`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          costPrice: parseOrNull(costPrice),
          cashExpense: parseOrNull(cashExpense),
          costNotes: costNotes || null,
        }),
      });
      const data = await res.json();
      if (!data.success) alert(data.error || 'Failed to save costs');
    } catch (err: any) {
      alert(err.message || 'Failed to save costs');
    } finally {
      setSavingCost(false);
    }
  };

  const uploadReceipts = async (files: FileList) => {
    if (!orderId || files.length === 0) return;
    try {
      setUploadingReceipt(true);
      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append('images', f));
      const res = await fetch(`/api/orders/${orderId}/receipts`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setReceipts((prev) => [...prev, ...data.data]);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploadingReceipt(false);
    }
  };

  const deleteReceipt = async (receiptId: number) => {
    if (!orderId || !confirm('Delete this receipt?')) return;
    try {
      const res = await fetch(`/api/orders/${orderId}/receipts/${receiptId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setReceipts((prev) => prev.filter((r) => r.id !== receiptId));
      } else {
        alert(data.error || 'Failed to delete receipt');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete receipt');
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
  const billingAddress = parseShippingAddress(order.billing_address);
  const totalAmount = typeof order.total_amount === 'string'
    ? parseFloat(order.total_amount)
    : order.total_amount;

  const costNum = parseOrNull(costPrice);
  const expenseNum = parseOrNull(cashExpense);
  const totalCost = (costNum ?? 0) + (expenseNum ?? 0);
  const margin = costNum !== null || expenseNum !== null ? totalAmount - totalCost : null;

  const sc = STATUS_COLORS[order.status] ?? DEFAULT_STATUS_COLOR;

  return (
    <>
      <style>{`
        .od-page { padding: 10px; max-width: 1100px; margin: 0 auto; }
        .od-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 10px; }
        .od-title { font-size: 18px; font-weight: 600; color: #333; margin: 2px 0 0; }
        .od-back { background: none; border: none; color: #c19a6b; cursor: pointer; font-size: 12px; display: flex; align-items: center; gap: 4px; padding: 0; margin-bottom: 1px; }
        .od-print-btn { display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; background: #f8f4f0; border: 1px solid #e8d5c4; border-radius: 6px; font-size: 12px; font-weight: 500; color: #c19a6b; cursor: pointer; white-space: nowrap; }
        .od-print-btn:hover { background: #f0e8de; }
        .od-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
        .od-card { background: #fff; border-radius: 8px; padding: 10px; border: 1px solid #e5e7eb; margin-bottom: 8px; }
        .od-card:last-child { margin-bottom: 0; }
        .od-card-title { font-size: 11px; font-weight: 600; color: #555; text-transform: uppercase; letter-spacing: .04em; margin: 0 0 8px; }
        .od-item-row { display: flex; align-items: center; gap: 8px; padding: 5px 0; border-bottom: 1px solid #f3f3f3; }
        .od-item-row:last-child { border-bottom: none; }
        .od-item-img { width: 44px; height: 44px; object-fit: cover; border-radius: 5px; border: 1px solid #e5e7eb; flex-shrink: 0; }
        .od-item-name { font-size: 12px; font-weight: 500; color: #333; margin: 0 0 1px; }
        .od-item-meta { font-size: 11px; color: #888; margin: 0; }
        .od-item-price { font-size: 12px; font-weight: 600; color: #c19a6b; white-space: nowrap; }
        .od-item-total { font-size: 11px; color: #999; }
        .od-total-row { display: flex; justify-content: space-between; align-items: center; padding-top: 7px; margin-top: 4px; border-top: 2px solid #e5e7eb; }
        .od-kv { display: flex; gap: 5px; font-size: 12px; color: #666; padding: 2px 0; flex-wrap: wrap; }
        .od-kv b { color: #333; font-weight: 500; white-space: nowrap; }
        .od-status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
        .od-track-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 7px; padding: 10px; margin-bottom: 8px; }
        .od-label { display: block; font-size: 12px; font-weight: 500; color: #333; margin-bottom: 3px; }
        .od-input { width: 100%; padding: 6px 8px; border-radius: 5px; border: 1px solid #d1d5db; font-size: 12px; box-sizing: border-box; }
        .od-field { margin-bottom: 7px; }
        .od-cost-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; }
        .od-margin { padding: 7px 10px; border-radius: 6px; font-size: 12px; margin-bottom: 10px; }
        .od-receipts-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .od-upload-btn { display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 5px; font-size: 12px; font-weight: 500; cursor: pointer; color: #fff; }
        .od-receipt-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .od-addr { font-size: 12px; color: #666; line-height: 1.6; }
        .od-print-header { display: none; }
        .od-history-line { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
        .od-history-line:last-child { border-bottom: none; }
        .od-history-dot { width: 8px; height: 8px; border-radius: 50%; background: #c19a6b; flex-shrink: 0; margin-top: 5px; }
        .od-history-body { flex: 1; min-width: 0; }
        .od-history-status { font-size: 12px; font-weight: 500; color: #333; }
        .od-history-meta { font-size: 11px; color: #888; margin-top: 2px; }
        .od-history-comment { font-size: 11px; color: #555; background: #f9fafb; border-left: 2px solid #e8d5c4; padding: 4px 7px; margin-top: 4px; border-radius: 0 4px 4px 0; }
        @media (min-width: 680px) {
          .od-page { padding: 16px; }
          .od-grid { grid-template-columns: 2fr 1fr; gap: 12px; }
          .od-title { font-size: 20px; }
          .od-card { padding: 14px; margin-bottom: 10px; }
          .od-cost-grid { grid-template-columns: 1fr 1fr auto; align-items: end; }
          .od-item-img { width: 52px; height: 52px; }
        }
        @media (min-width: 1024px) {
          .od-page { padding: 20px; }
        }
        @media print {
          .od-back, .od-print-btn, .od-no-print { display: none !important; }
          .od-print-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #c19a6b; padding-bottom: 12px; margin-bottom: 14px; }
          .od-page { padding: 0; max-width: 100%; }
          .od-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; }
          .od-card { border: 1px solid #ddd; break-inside: avoid; }
          .od-header { margin-bottom: 6px; }
          body { background: white; }
        }
      `}</style>

      <div className="od-page">
        {/* Print-only company header */}
        <div className="od-print-header">
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#c19a6b' }}>Colour My Space</div>
            <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>Interior Design &amp; Decor</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#666' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{formatOrderNumber(order.id)}</div>
            <div style={{ marginTop: '2px' }}>{new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          </div>
        </div>

        {/* Header */}
        <div className="od-header">
          <div>
            <button className="od-back" onClick={() => router.push('/dashboard/orders')}>
              <i className="fas fa-arrow-left" /> Back to Orders
            </button>
            <h1 className="od-title">{formatOrderNumber(order.id)}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <button className="od-print-btn" onClick={() => window.print()}>
              <i className="fas fa-download" /> Download PDF
            </button>
            <span style={{
              padding: '3px 9px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
              backgroundColor: sc.bg, color: sc.text,
            }}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="od-grid">
          {/* Left column */}
          <div>
            {/* Order Items */}
            <div className="od-card">
              <p className="od-card-title">Order Items</p>
              {order.items && order.items.length > 0 ? (
                <>
                  {order.items.map((item, index) => {
                    const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                    return (
                      <div key={item.id || index} className="od-item-row">
                        {item.image_url && (
                          <img src={item.image_url} alt={item.product_name} className="od-item-img" />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p className="od-item-name">{item.product_name}</p>
                          <p className="od-item-meta">Qty: {item.quantity}</p>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div className="od-item-price">₹{price.toLocaleString()}</div>
                          <div className="od-item-total">₹{(price * item.quantity).toLocaleString()}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="od-total-row">
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Grand Total</span>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#c19a6b' }}>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <p style={{ color: '#999', fontSize: '13px' }}>No items found</p>
              )}
            </div>

            {/* Shipping Address */}
            {shippingAddress && (
              <div className="od-card">
                <p className="od-card-title">Shipping Address</p>
                <div className="od-addr">
                  {shippingAddress.name && <div style={{ fontWeight: '500', color: '#333' }}>{shippingAddress.name}</div>}
                  {shippingAddress.address && <div>{shippingAddress.address}</div>}
                  <div>
                    {shippingAddress.city}{shippingAddress.state && `, ${shippingAddress.state}`}
                    {shippingAddress.zipCode && ` — ${shippingAddress.zipCode}`}
                  </div>
                  {shippingAddress.country && <div>{shippingAddress.country}</div>}
                  {shippingAddress.phone && <div style={{ marginTop: '4px' }}>📞 {shippingAddress.phone}</div>}
                </div>
              </div>
            )}

            {/* Billing Address (only shown when different from shipping) */}
            {billingAddress && billingAddress.address && billingAddress.address !== shippingAddress?.address && (
              <div className="od-card">
                <p className="od-card-title">Billing Address</p>
                <div className="od-addr">
                  {billingAddress.name && <div style={{ fontWeight: '500', color: '#333' }}>{billingAddress.name}</div>}
                  {billingAddress.address && <div>{billingAddress.address}</div>}
                  <div>
                    {billingAddress.city}{billingAddress.state && `, ${billingAddress.state}`}
                    {billingAddress.zipCode && ` — ${billingAddress.zipCode}`}
                  </div>
                  {billingAddress.country && <div>{billingAddress.country}</div>}
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div>
            {/* Order Info */}
            <div className="od-card">
              <p className="od-card-title">Order Info</p>
              <div className="od-kv"><b>Date</b>{new Date(order.created_at).toLocaleString()}</div>
              <div className="od-kv"><b>Customer</b>{order.user_name || order.user_email || 'N/A'}</div>
              <div className="od-kv"><b>Email</b><span style={{ wordBreak: 'break-all' }}>{order.user_email || 'N/A'}</span></div>
              {order.payment_id && <div className="od-kv"><b>Payment ID</b><span style={{ wordBreak: 'break-all' }}>{order.payment_id}</span></div>}
              {order.payment_status && <div className="od-kv"><b>Payment</b>{order.payment_status}</div>}
            </div>

            {/* Update Status */}
            <div className="od-card od-no-print">
              <p className="od-card-title">Update Status</p>

              {selectedStatus === 'shipped' && (
                <div className="od-track-box">
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#333', margin: '0 0 8px' }}>📦 Shipment Details</p>
                  <div className="od-field">
                    <label className="od-label">Tracking Number *</label>
                    <input className="od-input" type="text" value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)} placeholder="e.g., TRACK123456789" />
                  </div>
                  <div className="od-field">
                    <label className="od-label">Carrier *</label>
                    <select className="od-input" value={carrier} onChange={(e) => setCarrier(e.target.value)}>
                      <option value="">Select carrier...</option>
                      {['BlueDart','DTDC','FedEx','Delhivery','India Post','Ecom Express','Ekart','Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="od-field">
                    <label className="od-label">Tracking URL (optional)</label>
                    <input className="od-input" type="url" value={trackingUrl}
                      onChange={(e) => setTrackingUrl(e.target.value)} placeholder="https://..." />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => updateOrderStatus('shipped')}
                      disabled={updating || !trackingNumber || !carrier}
                      className="btn primary" style={{ flex: 1, fontSize: '13px' }}>
                      {updating ? 'Updating...' : '✉️ Mark Shipped'}
                    </button>
                    <button onClick={() => { setSelectedStatus(null); setTrackingNumber(''); setCarrier(''); setTrackingUrl(''); }}
                      className="btn secondary" style={{ fontSize: '13px' }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="od-field" style={{ marginBottom: '8px' }}>
                <label className="od-label">Comment (optional)</label>
                <textarea
                  className="od-input"
                  rows={2}
                  value={statusComment}
                  onChange={(e) => setStatusComment(e.target.value)}
                  placeholder="Reason for status change…"
                  style={{ resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <div className="od-status-grid">
                {['pending','processing','shipped','completed','cancelled'].map((s) => (
                  <button key={s}
                    onClick={() => updateOrderStatus(s)}
                    disabled={updating || order.status === s || selectedStatus === 'shipped'}
                    className={order.status === s ? 'btn primary' : 'btn secondary'}
                    style={{
                      textTransform: 'capitalize', fontSize: '11px',
                      padding: '5px 8px',
                      opacity: order.status === s ? 0.7 : 1,
                      cursor: order.status === s ? 'not-allowed' : 'pointer',
                    }}>
                    {order.status === s ? '✓ ' : ''}{s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cost & Receipts */}
        <div className="od-card od-no-print" style={{ marginTop: '8px' }}>
          <p className="od-card-title">Cost & Purchase Receipts</p>

          <div className="od-cost-grid">
            <div>
              <label className="od-label">Cost Price (₹)</label>
              <input className="od-input" type="number" min="0" step="0.01"
                value={costPrice} onChange={(e) => setCostPrice(e.target.value)} placeholder="0.00" />
            </div>
            <div>
              <label className="od-label">Cash Expense (₹)</label>
              <input className="od-input" type="number" min="0" step="0.01"
                value={cashExpense} onChange={(e) => setCashExpense(e.target.value)} placeholder="0.00" />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button onClick={saveCosts} disabled={savingCost} className="btn primary"
                style={{ width: '100%', fontSize: '13px', padding: '9px 14px' }}>
                {savingCost ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label className="od-label">Notes</label>
            <textarea
              className="od-input"
              rows={3}
              value={costNotes}
              onChange={(e) => setCostNotes(e.target.value)}
              placeholder="Supplier details, purchase notes…"
              style={{ resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          {margin !== null && (
            <div className="od-margin" style={{
              backgroundColor: margin >= 0 ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${margin >= 0 ? '#bbf7d0' : '#fecaca'}`,
              color: margin >= 0 ? '#166534' : '#991b1b',
            }}>
              <strong>Margin: ₹{margin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
              {' — '}Revenue ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} − Cost ₹{totalCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          )}

          <div className="od-receipts-header">
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#555' }}>Purchase Receipts</span>
            <label className="od-upload-btn" style={{ backgroundColor: uploadingReceipt ? '#e5e7eb' : '#c19a6b', cursor: uploadingReceipt ? 'not-allowed' : 'pointer' }}>
              {uploadingReceipt ? 'Uploading...' : '+ Upload'}
              <input type="file" accept="image/*" multiple disabled={uploadingReceipt}
                style={{ display: 'none' }}
                onChange={(e) => e.target.files && uploadReceipts(e.target.files)} />
            </label>
          </div>

          {receipts.length === 0 ? (
            <p style={{ color: '#bbb', fontSize: '13px', margin: 0 }}>No receipts yet.</p>
          ) : (
            <div className="od-receipt-grid">
              {receipts.map((receipt) => (
                <div key={receipt.id} style={{ position: 'relative' }}>
                  <a href={receipt.url} target="_blank" rel="noopener noreferrer">
                    <img src={receipt.url} alt={receipt.filename || `Receipt ${receipt.id}`}
                      style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e5e7eb', display: 'block' }} />
                  </a>
                  <button onClick={() => deleteReceipt(receipt.id)} title="Delete"
                    style={{ position: 'absolute', top: '-5px', right: '-5px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Status History */}
        {statusHistory.length > 0 && (
          <div className="od-card" style={{ marginTop: '8px' }}>
            <p className="od-card-title">Status History</p>
            {statusHistory.map((entry) => {
              const sc2 = STATUS_COLORS[entry.to_status] ?? DEFAULT_STATUS_COLOR;
              return (
                <div key={entry.id} className="od-history-line">
                  <div className="od-history-dot" style={{ background: sc2.text }} />
                  <div className="od-history-body">
                    <div className="od-history-status">
                      {entry.from_status ? (
                        <>
                          <span style={{ textTransform: 'capitalize' }}>{entry.from_status}</span>
                          {' → '}
                        </>
                      ) : null}
                      <span style={{ textTransform: 'capitalize', color: sc2.text }}>{entry.to_status}</span>
                    </div>
                    <div className="od-history-meta">
                      {entry.changed_by_name ?? 'System'}
                      {' · '}
                      {new Date(entry.created_at).toLocaleString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </div>
                    {entry.comment && (
                      <div className="od-history-comment">{entry.comment}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
