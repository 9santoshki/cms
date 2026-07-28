import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrderSummaryRows } from '@/components/OrderSummaryRows';

describe('OrderSummaryRows', () => {
  it('adds the convenience fee on top of subtotal + shipping in the displayed Total', () => {
    render(<OrderSummaryRows subtotal={1000} shipping={100} tax={0} taxRate={0} convenienceFee={11} paymentMethod="razorpay" />);

    // 1000 + 100 + 11 = 1111
    expect(screen.getByText('Total').nextSibling).toHaveTextContent('₹1,111');
    expect(screen.getByText(/Convenience Fee/)).toBeInTheDocument();
    expect(screen.getByText('₹11')).toBeInTheDocument();
  });

  it('states explicitly that the fee does not apply when UPI is selected, instead of just hiding the row', () => {
    render(<OrderSummaryRows subtotal={1000} shipping={100} tax={0} taxRate={0} convenienceFee={0} paymentMethod="upi_qr" />);

    expect(screen.getByText('Convenience Fee')).toBeInTheDocument();
    expect(screen.getByText('Not applicable for UPI')).toBeInTheDocument();
    // No fee added on top when UPI is selected
    expect(screen.getByText('Total').nextSibling).toHaveTextContent('₹1,100');
  });

  it('omits the fee row entirely when no payment method context is given (e.g. the cart page, before checkout)', () => {
    render(<OrderSummaryRows subtotal={1000} shipping={100} tax={0} taxRate={0} />);

    expect(screen.queryByText(/Convenience Fee/)).not.toBeInTheDocument();
    expect(screen.getByText('Total').nextSibling).toHaveTextContent('₹1,100');
  });
});
