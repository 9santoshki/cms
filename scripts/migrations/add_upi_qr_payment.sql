-- Migration: Add UPI "Scan and Pay" QR payment option
-- Adds:
--   1. orders.payment_method — distinguishes Razorpay orders from manually-verified UPI QR orders
--   2. site_settings UPI columns — the merchant VPA/payee name shown on the checkout QR code,
--      editable from the admin Settings page (like shipping/tax config).
--
-- payment_status keeps using its existing free-text VARCHAR(50) column (no CHECK constraint) —
-- the new 'awaiting_verification' value needs no schema change.

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS payment_method VARCHAR(20) NOT NULL DEFAULT 'razorpay';

ALTER TABLE orders
  DROP CONSTRAINT IF EXISTS orders_payment_method_check;

ALTER TABLE orders
  ADD CONSTRAINT orders_payment_method_check CHECK (payment_method IN ('razorpay', 'upi_qr'));

ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS upi_enabled BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS upi_vpa VARCHAR(150),
  ADD COLUMN IF NOT EXISTS upi_payee_name VARCHAR(150);

-- Seed with the merchant's actual UPI details so "Scan and Pay" works immediately.
-- Admins can change/rotate these later from Dashboard → Settings without a deploy.
UPDATE site_settings
SET upi_enabled = true,
    upi_vpa = 'neerajadesignstudioprivatelimited.9513351833.ibz@icici',
    upi_payee_name = 'NEERAJA DESIGN STUDIO PRIVATE LIMITED'
WHERE id = 1 AND upi_vpa IS NULL;
