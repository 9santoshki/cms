-- Migration: Add guest appointment support
-- Allows consultation requests without requiring user login

-- Add guest columns to appointments table
ALTER TABLE appointments
ADD COLUMN IF NOT EXISTS guest_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS guest_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS guest_phone VARCHAR(50);

-- Make user_id optional (nullable) for guest appointments
ALTER TABLE appointments
ALTER COLUMN user_id DROP NOT NULL;

-- Update status check constraint to include 'pending' and 'confirmed'
ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_status_check;
ALTER TABLE appointments ADD CONSTRAINT appointments_status_check
CHECK (status IN ('pending', 'scheduled', 'confirmed', 'completed', 'cancelled'));

-- Update existing 'scheduled' appointments to 'pending' if desired
-- UPDATE appointments SET status = 'pending' WHERE status = 'scheduled';

-- Create index on guest email for faster lookups
CREATE INDEX IF NOT EXISTS idx_appointments_guest_email ON appointments(guest_email);
