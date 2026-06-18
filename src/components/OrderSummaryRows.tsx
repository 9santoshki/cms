import React from 'react';

interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  taxRate: number;
}

export const OrderSummaryRows: React.FC<Props> = ({ subtotal, shipping, tax, taxRate }) => (
  <>
    <div className="summary-row">
      <span>Subtotal</span>
      <span>₹{subtotal.toLocaleString()}</span>
    </div>
    <div className="summary-row">
      <span>Shipping</span>
      <span>{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}</span>
    </div>
    {tax > 0 && (
      <div className="summary-row">
        <span>Tax ({taxRate}%)</span>
        <span>₹{tax.toLocaleString()}</span>
      </div>
    )}
    <div className="summary-row total">
      <span>Total</span>
      <span>₹{(subtotal + shipping + tax).toLocaleString()}</span>
    </div>
  </>
);
