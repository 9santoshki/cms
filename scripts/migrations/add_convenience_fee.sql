-- Migration: Add convenience fee tracking to orders
-- Online (gateway) payments carry a 1% convenience fee, added on top of the
-- order total; the "Scan & Pay" UPI QR path is free. Snapshotted per order
-- so historical orders/invoices stay accurate if the rate changes later.

ALTER TABLE orders ADD COLUMN IF NOT EXISTS convenience_fee_amount DECIMAL(10, 2) DEFAULT 0;

COMMENT ON COLUMN orders.convenience_fee_amount IS 'Online-payment convenience fee charged on top of the order total (0 for UPI QR orders)';
