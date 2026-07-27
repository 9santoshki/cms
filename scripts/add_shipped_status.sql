-- Add 'shipped' status to orders table
-- This migration adds the 'shipped' status to the existing CHECK constraint

BEGIN;

-- Drop the existing constraint
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Add new constraint with 'shipped' status included
ALTER TABLE orders ADD CONSTRAINT orders_status_check
    CHECK (status IN ('pending', 'processing', 'shipped', 'completed', 'cancelled'));

-- Verify the constraint was added
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'orders'::regclass AND conname = 'orders_status_check';

COMMIT;

-- Success message
SELECT 'Migration complete: shipped status added to orders table' as status;
