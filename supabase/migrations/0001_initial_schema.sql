-- Supabase Schema for E-commerce Platform (Fresh Setup)
-- Based on product.md specifications
-- This version drops all tables and dependencies to ensure clean installation

-- Disable RLS first to prevent issues
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS products DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS consultation_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cart_items DISABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any)
DO $$ 
BEGIN
    -- Drop policies for all tables
    DROP POLICY IF EXISTS "Users can access own orders" ON orders;
    DROP POLICY IF EXISTS "Users can access own cart items" ON cart_items;
    DROP POLICY IF EXISTS "Users can access order items from own orders" ON order_items;
    DROP POLICY IF EXISTS "Users can access own consultation requests" ON consultation_requests;
    DROP POLICY IF EXISTS "Public can read products" ON products;
    DROP POLICY IF EXISTS "Public can read categories" ON categories;
    DROP POLICY IF EXISTS "Service role full access to profiles" ON profiles;
    DROP POLICY IF EXISTS "Users can access own profile" ON profiles;
    DROP POLICY IF EXISTS "Service role full access to orders" ON orders;
    DROP POLICY IF EXISTS "Service role full access to cart_items" ON cart_items;
    DROP POLICY IF EXISTS "Service role full access to order_items" ON order_items;
    DROP POLICY IF EXISTS "Service role full access to consultation_requests" ON consultation_requests;
    DROP POLICY IF EXISTS "Service role full access to products" ON products;
    DROP POLICY IF EXISTS "Service role full access to categories" ON categories;
END $$;

-- Drop existing triggers (if any) - Use CASCADE to handle dependencies
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
DROP TRIGGER IF EXISTS update_consultation_requests_updated_at ON consultation_requests;
DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;

-- Drop existing indexes (if any)
DROP INDEX IF EXISTS idx_profiles_role;
DROP INDEX IF EXISTS idx_orders_user_id;
DROP INDEX IF EXISTS idx_orders_status;
DROP INDEX IF EXISTS idx_orders_created_at;
DROP INDEX IF EXISTS idx_cart_items_user_id;
DROP INDEX IF EXISTS idx_cart_items_product_id;
DROP INDEX IF EXISTS idx_products_category;
DROP INDEX IF EXISTS idx_products_price;
DROP INDEX IF EXISTS idx_consultation_requests_status;
DROP INDEX IF EXISTS idx_consultation_requests_created_at;

-- Drop existing functions (if any) - with CASCADE to remove dependent objects
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
-- Note: Be careful with update_updated_at_column as it might be used by other tables
-- We'll handle it separately if needed, but for our tables we'll recreate our own

-- Drop existing tables (if any)
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS consultation_requests CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Custom Types
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('customer', 'moderator', 'admin');
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
        CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'request_status') THEN
        CREATE TYPE request_status AS ENUM ('new', 'contacted', 'completed');
    END IF;
END $$;

-- Profiles table (linked to Supabase Auth)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    role user_role DEFAULT 'customer',
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    images JSONB, -- Store multiple image URLs
    category TEXT, -- Using text directly as per API implementation
    stock_quantity INTEGER,
    slug TEXT UNIQUE, -- URL-friendly slug for SEO
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add unique constraint to name column for ON CONFLICT to work
ALTER TABLE products ADD CONSTRAINT products_name_key UNIQUE (name);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) NOT NULL,
    total_amount NUMERIC NOT NULL,
    status order_status DEFAULT 'pending',
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation Requests table
CREATE TABLE consultation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    notes TEXT,
    status request_status DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping Cart Items table (for logged-in users)
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id) -- Prevent duplicate items for the same user
);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create a profile for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for the PROFILES table (avoiding circular references)

-- Policy for service role (admin operations) - bypasses RLS completely
CREATE POLICY "Service role full access to profiles" ON profiles
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy for regular users - only access their own profile data
CREATE POLICY "Users can access own profile" ON profiles
  FOR ALL TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid()); -- Users can only update their own data

-- RLS policies for other tables

-- Service role policies (admin access)
CREATE POLICY "Service role full access to orders" ON orders
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to cart_items" ON cart_items
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to order_items" ON order_items
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to consultation_requests" ON consultation_requests
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to products" ON products
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to categories" ON categories
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- User access policies (authenticated users)
-- Orders: users can access their own orders
CREATE POLICY "Users can access own orders" ON orders
  FOR ALL USING (
    user_id = auth.uid()
  );

-- Cart items: users can access their own cart items
CREATE POLICY "Users can access own cart items" ON cart_items
  FOR ALL USING (
    user_id = auth.uid()
  );

-- Order items: users can access items for their own orders
CREATE POLICY "Users can access order items from own orders" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Consultation requests: users can access their own requests
CREATE POLICY "Users can access own consultation requests" ON consultation_requests
  FOR ALL USING (
    email = (auth.jwt() ->> 'email')
  );

-- Public access policies (allow anyone to read these tables)
CREATE POLICY "Public can read products" ON products
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read categories" ON categories
  FOR SELECT TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_consultation_requests_status ON consultation_requests(status);
CREATE INDEX idx_consultation_requests_created_at ON consultation_requests(created_at);

-- Function to update updated_at for tables that have it (for our specific tables)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Triggers to update 'updated_at' for tables that have it
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultation_requests_updated_at
    BEFORE UPDATE ON consultation_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
    BEFORE UPDATE ON cart_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add sample data for initial setup if not exists
INSERT INTO categories (name) VALUES 
  ('Living Room'),
  ('Dining Room'),
  ('Bedroom'),
  ('Office'),
  ('Outdoor')
ON CONFLICT (name) DO NOTHING;

-- Add sample products if not exists
INSERT INTO products (name, description, price, images, category, stock_quantity, slug)
SELECT 
  name,
  description,
  price,
  images,
  category,
  stock_quantity,
  LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]', '-', 'g')) AS slug
FROM (
  VALUES
    ('Modern Velvet Sofa', 'Luxurious velvet sofa with wooden legs, perfect for contemporary living rooms', 249999.00, '["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]'::jsonb, 'Living Room', 10, 'modern-velvet-sofa'),
    ('Oak Dining Table', 'Handcrafted oak dining table with a timeless design and durable finish', 189999.00, '["https://images.unsplash.com/photo-1567538096630-8a4be3904c9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]'::jsonb, 'Dining Room', 5, 'oak-dining-table'),
    ('Coastal Bed Frame', 'Light, airy bed frame in a coastal-inspired design with natural wood finish', 129999.00, '["https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]'::jsonb, 'Bedroom', 8, 'coastal-bed-frame'),
    ('Industrial Desk', 'Sturdy industrial-style desk with metal frame and reclaimed wood top', 89999.00, '["https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]'::jsonb, 'Office', 15, 'industrial-desk'),
    ('Scandinavian Armchair', 'Comfortable and stylish armchair with clean lines and minimalist design', 79999.00, '["https://images.unsplash.com/photo-1524758631624-e68479b2bfb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]'::jsonb, 'Living Room', 12, 'scandinavian-armchair'),
    ('Glass Coffee Table', 'Elegant glass coffee table with chrome legs for a modern touch', 54999.00, '["https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]'::jsonb, 'Living Room', 7, 'glass-coffee-table')
) AS product_data(name, description, price, images, category, stock_quantity, slug)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  category = EXCLUDED.category,
  stock_quantity = EXCLUDED.stock_quantity;