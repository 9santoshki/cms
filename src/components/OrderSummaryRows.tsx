import React from 'react';
import { CONVENIENCE_FEE_RATE } from '@/utils/cartUtils';

interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  taxRate: number;
  /** Online-payment convenience fee (0 for UPI QR / when not applicable) — added on top of the total, not baked into item prices like tax. */
  convenienceFee?: number;
  /** When provided (checkout, once a method is selectable), makes it explicit that the fee doesn't apply to UPI QR rather than just omitting the row. Omit on pages with no payment method chosen yet (e.g. the cart page). */
  paymentMethod?: 'razorpay' | 'upi_qr';
}

export const OrderSummaryRows: React.FC<Props> = ({ subtotal, shipping, tax, taxRate, convenienceFee = 0, paymentMethod }) => {
  const total = subtotal + shipping + convenienceFee;
  // When tax is back-computed, display ex-tax amounts so summary rows are not inclusive of tax
  const factor = tax > 0 && taxRate > 0 ? 100 / (100 + taxRate) : 1;
  const subtotalDisplay = subtotal * factor;
  const shippingDisplay = shipping * factor;

  return (
    <>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{Math.round(subtotalDisplay).toLocaleString()}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'FREE' : `₹${Math.round(shippingDisplay).toLocaleString()}`}</span>
      </div>
      {tax > 0 && (
        <div className="summary-row">
          <span>Tax</span>
          <span>₹{Math.round(tax).toLocaleString()}</span>
        </div>
      )}
      {convenienceFee > 0 ? (
        <div className="summary-row">
          <span>Convenience Fee ({CONVENIENCE_FEE_RATE}%)</span>
          <span>₹{Math.round(convenienceFee).toLocaleString()}</span>
        </div>
      ) : paymentMethod === 'upi_qr' && (
        <div className="summary-row">
          <span>Convenience Fee</span>
          <span style={{ color: '#16a34a' }}>Not applicable for UPI</span>
        </div>
      )}
      <div className="summary-row total">
        <span>Total</span>
        <span>₹{Math.round(total).toLocaleString()}</span>
      </div>
    </>
  );
};
