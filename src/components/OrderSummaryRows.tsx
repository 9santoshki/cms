import React from 'react';
import { CONVENIENCE_FEE_RATE } from '@/utils/cartUtils';

interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  taxRate: number;
  /** Portion of `tax` that's added on top of subtotal+shipping (shipping's GST, since the flat rate is exclusive-of-tax) rather than already included in them. */
  additiveTax?: number;
  /** Online-payment convenience fee (0 for UPI QR / when not applicable) — added on top of the total, not baked into item prices like tax. */
  convenienceFee?: number;
  /** When provided (checkout, once a method is selectable), makes it explicit that the fee doesn't apply to UPI QR rather than just omitting the row. Omit on pages with no payment method chosen yet (e.g. the cart page). */
  paymentMethod?: 'razorpay' | 'upi_qr';
}

export const OrderSummaryRows: React.FC<Props> = ({ subtotal, shipping, tax, taxRate, additiveTax = 0, convenienceFee = 0, paymentMethod }) => {
  // "Total" is before any payment-method fee; the fee (1% of this Total, for
  // Razorpay — 0 for UPI QR) is applied on top of it to arrive at "Grand
  // Total". On the cart page (no paymentMethod chosen yet), there's no fee
  // to show, so Total doubles as the final row.
  const total = subtotal + shipping + additiveTax;
  const grandTotal = total + convenienceFee;
  // Product prices are tax-inclusive, so Subtotal is displayed ex-tax
  // (backed out for display only — the raw `subtotal` above already has it).
  const factor = tax > 0 && taxRate > 0 ? 100 / (100 + taxRate) : 1;
  const subtotalDisplay = subtotal * factor;

  return (
    <>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{Math.round(subtotalDisplay).toLocaleString()}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'FREE' : `₹${Math.round(shipping).toLocaleString()}`}</span>
      </div>
      {tax > 0 && (
        <div className="summary-row">
          <span>Tax</span>
          <span>₹{Math.round(tax).toLocaleString()}</span>
        </div>
      )}
      <div className={paymentMethod ? 'summary-row' : 'summary-row total'}>
        <span>Total</span>
        <span>₹{Math.round(total).toLocaleString()}</span>
      </div>
      {paymentMethod && (
        <>
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
            <span>Grand Total</span>
            <span>₹{Math.round(grandTotal).toLocaleString()}</span>
          </div>
        </>
      )}
    </>
  );
};
