import React from 'react';

interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  taxRate: number;
}

export const OrderSummaryRows: React.FC<Props> = ({ subtotal, shipping, tax, taxRate }) => {
  const total = subtotal + shipping;
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
          <span>Tax ({taxRate}%)</span>
          <span>₹{Math.round(tax).toLocaleString()}</span>
        </div>
      )}
      <div className="summary-row total">
        <span>Total</span>
        <span>₹{Math.round(total).toLocaleString()}</span>
      </div>
    </>
  );
};
