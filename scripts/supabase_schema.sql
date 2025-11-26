/*
    Ultimate Consolidated Supabase Schema for E-commerce System
    Includes all tables, configurations, sample data, and admin features
    Properly configured for Supabase compatibility with correct password hashes
    Includes automatic user sync from Supabase Auth to application users table
*/

-- Enable realtime
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create users table with all necessary columns
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    encrypted_password VARCHAR(255),
    google_id VARCHAR(255) UNIQUE, -- Support Google authentication
    avatar TEXT, -- User profile images
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

-- Create products table with tax and discount fields
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    originalPrice DECIMAL(10,2), -- For discount calculations
    discount INTEGER, -- Discount percentage
    tax_rate DECIMAL(5,2) DEFAULT 0.00, -- Tax rate for the product
    tax_type VARCHAR(20) DEFAULT 'percentage' CHECK (tax_type IN ('percentage', 'fixed')), -- Tax type
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, image_url)  -- Add unique constraint for upsert operations
);

-- Create cart_items table with tax tracking
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    tax_amount DECIMAL(10,2) DEFAULT 0.00, -- Track tax for this item
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table 
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0.00, -- Track tax for ordered item
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shipping configuration table
CREATE TABLE IF NOT EXISTS shipping_config (
    id SERIAL PRIMARY KEY,
    min_order_amount DECIMAL(10,2) DEFAULT 50000.00,
    flat_rate DECIMAL(10,2) DEFAULT 1500.00,
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tax configuration table
CREATE TABLE IF NOT EXISTS tax_config (
    id SERIAL PRIMARY KEY,
    rate DECIMAL(5,2) DEFAULT 0.00,
    type VARCHAR(20) DEFAULT 'percentage' CHECK (type IN ('percentage', 'fixed')),
    enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_tax_rate ON products(tax_rate);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_shipping_config_enabled ON shipping_config(enabled);
CREATE INDEX IF NOT EXISTS idx_tax_config_enabled ON tax_config(enabled);

-- Set name field as NOT NULL for proper UX
ALTER TABLE users ALTER COLUMN name SET NOT NULL;

-- Create trigger function for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Conditionally create triggers if they don't exist
DO $$ 
BEGIN
    -- Create update_users_updated_at trigger if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_users_updated_at'
    ) THEN
        CREATE TRIGGER update_users_updated_at
            BEFORE UPDATE ON users
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create update_products_updated_at trigger if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_products_updated_at'
    ) THEN
        CREATE TRIGGER update_products_updated_at
            BEFORE UPDATE ON products
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create update_cart_items_updated_at trigger if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_cart_items_updated_at'
    ) THEN
        CREATE TRIGGER update_cart_items_updated_at
            BEFORE UPDATE ON cart_items
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create update_orders_updated_at trigger if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_orders_updated_at'
    ) THEN
        CREATE TRIGGER update_orders_updated_at
            BEFORE UPDATE ON orders
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create update_order_items_updated_at trigger if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_order_items_updated_at'
    ) THEN
        CREATE TRIGGER update_order_items_updated_at
            BEFORE UPDATE ON order_items
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create update_shipping_config_updated_at trigger if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_shipping_config_updated_at'
    ) THEN
        CREATE TRIGGER update_shipping_config_updated_at
            BEFORE UPDATE ON shipping_config
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create update_tax_config_updated_at trigger if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_tax_config_updated_at'
    ) THEN
        CREATE TRIGGER update_tax_config_updated_at
            BEFORE UPDATE ON tax_config
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Insert or update sample users with correct bcrypt password hashes
INSERT INTO users (email, name, encrypted_password, role) 
VALUES 
    ('k.santosh13@gmail.com', 'System Administrator', '$2b$10$HNcMjEnKr33tlIhwVn.1YuIBE7EZx8eSdUIjDuaLX5P8SP/lFVMWS', 'admin'),  -- admin123
    ('admin@example.com', 'System Administrator', '$2b$10$HNcMjEnKr33tlIhwVn.1YuIBE7EZx8eSdUIjDuaLX5P8SP/lFVMWS', 'admin'),  -- admin123
    ('moderator@example.com', 'Moderator User', '$2b$10$Gh/4whNYRr41VTkap.49xeThCWNZa4egZF6RM6V4TwBV8xGV/MMQu', 'moderator'),  -- moderator123
    ('john@example.com', 'John Doe', '$2b$10$NvPc9oHHBZa2jDLoIevehe0nkd1Qyn/3n94wLk8UxNpCqHmz8aUvi', 'user'),  -- password
    ('jane@example.com', 'Jane Smith', '$2b$10$NvPc9oHHBZa2jDLoIevehe0nkd1Qyn/3n94wLk8UxNpCqHmz8aUvi', 'user'),  -- password
    ('sam@example.com', 'Sam Wilson', '$2b$10$NvPc9oHHBZa2jDLoIevehe0nkd1Qyn/3n94wLk8UxNpCqHmz8aUvi', 'user')  -- password
ON CONFLICT (email) 
DO UPDATE SET 
    name = EXCLUDED.name,
    encrypted_password = EXCLUDED.encrypted_password,
    role = EXCLUDED.role;

-- Insert default configuration if tables are empty
INSERT INTO shipping_config (min_order_amount, flat_rate, enabled)
SELECT 50000.00, 1500.00, TRUE
WHERE NOT EXISTS (SELECT 1 FROM shipping_config LIMIT 1);

INSERT INTO tax_config (rate, type, enabled)
SELECT 0.00, 'percentage', FALSE
WHERE NOT EXISTS (SELECT 1 FROM tax_config LIMIT 1);

-- Add sample products with tax information
INSERT INTO products (name, slug, description, price, image_url, category, originalPrice, discount, tax_rate, tax_type) 
VALUES
    ('Modern Velvet Sofa', 'modern-velvet-sofa', 'Luxurious velvet sofa with wooden legs, perfect for contemporary living rooms.', 2499.99, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', 'Living Room', 2999.99, 17, 18.00, 'percentage'),
    ('Classic Oak Dining Table', 'classic-oak-dining-table', 'Handcrafted oak dining table with a timeless design and durable finish.', 1899.99, 'https://images.unsplash.com/photo-1567538096630-8a4be3904c9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', 'Dining Room', 2199.99, 14, 12.00, 'percentage'),
    ('Coastal Bed Frame', 'coastal-bed-frame', 'Light, airy bed frame in a coastal-inspired design with natural wood finish.', 1299.99, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', 'Bedroom', 1599.99, 19, 15.00, 'percentage'),
    ('Industrial Desk', 'industrial-desk', 'Sturdy industrial-style desk with metal frame and reclaimed wood top.', 899.99, 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', 'Office', 1099.99, 18, 10.00, 'percentage'),
    ('Scandinavian Armchair', 'scandinavian-armchair', 'Comfortable and stylish armchair with clean lines and minimalist design.', 799.99, 'https://images.unsplash.com/photo-1524758631624-e68479b2bfb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', 'Living Room', 949.99, 16, 8.00, 'percentage'),
    ('Glass Coffee Table', 'glass-coffee-table', 'Elegant glass coffee table with chrome legs for a modern touch.', 549.99, 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', 'Living Room', 649.99, 15, 5.00, 'percentage')
ON CONFLICT (slug) 
DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    category = EXCLUDED.category,
    originalPrice = EXCLUDED.originalPrice,
    discount = EXCLUDED.discount,
    tax_rate = EXCLUDED.tax_rate,
    tax_type = EXCLUDED.tax_type;

-- Insert sample product images (only if they don't already exist)
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) 
SELECT 
    p.id,
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    true,
    0
FROM products p
WHERE p.slug = 'modern-velvet-sofa'
    AND NOT EXISTS (
        SELECT 1 FROM product_images pi 
        WHERE pi.product_id = p.id 
        AND pi.image_url LIKE '%1555041469%'
    );

INSERT INTO product_images (product_id, image_url, is_primary, sort_order) 
SELECT 
    p.id,
    'https://images.unsplash.com/photo-1524758631624-e68479b2bfb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    true,
    0
FROM products p
WHERE p.slug = 'scandinavian-armchair'
    AND NOT EXISTS (
        SELECT 1 FROM product_images pi 
        WHERE pi.product_id = p.id 
        AND pi.image_url LIKE '%1524758631624%'
    );

-- Insert sample cart items with proper tax calculations
INSERT INTO cart_items (user_id, product_id, quantity, tax_amount) 
SELECT 
    u.id,
    p.id,
    1,
    CASE 
        WHEN p.tax_type = 'percentage' THEN (p.price * 1) * (p.tax_rate / 100)
        WHEN p.tax_type = 'fixed' THEN p.tax_rate
        ELSE 0
    END AS calculated_tax
FROM users u, products p
WHERE u.email = 'john@example.com' AND p.slug = 'modern-velvet-sofa'
    AND NOT EXISTS (
        SELECT 1 FROM cart_items ci 
        WHERE ci.user_id = u.id AND ci.product_id = p.id
    )
ON CONFLICT (user_id, product_id) 
DO UPDATE SET 
    quantity = cart_items.quantity + 1,
    tax_amount = cart_items.tax_amount + CASE 
        WHEN (SELECT tax_type FROM products WHERE id = cart_items.product_id) = 'percentage' 
            THEN (SELECT price FROM products WHERE id = cart_items.product_id) * ((SELECT tax_rate FROM products WHERE id = cart_items.product_id) / 100)
        WHEN (SELECT tax_type FROM products WHERE id = cart_items.product_id) = 'fixed' 
            THEN (SELECT tax_rate FROM products WHERE id = cart_items.product_id)
        ELSE 0
    END;

INSERT INTO cart_items (user_id, product_id, quantity, tax_amount) 
SELECT 
    u.id,
    p.id,
    2,
    CASE 
        WHEN p.tax_type = 'percentage' THEN (p.price * 2) * (p.tax_rate / 100)
        WHEN p.tax_type = 'fixed' THEN p.tax_rate * 2
        ELSE 0
    END AS calculated_tax
FROM users u, products p
WHERE u.email = 'john@example.com' AND p.slug = 'coastal-bed-frame'
    AND NOT EXISTS (
        SELECT 1 FROM cart_items ci 
        WHERE ci.user_id = u.id AND ci.product_id = p.id
    )
ON CONFLICT (user_id, product_id) 
DO UPDATE SET 
    quantity = cart_items.quantity + 2,
    tax_amount = cart_items.tax_amount + CASE 
        WHEN (SELECT tax_type FROM products WHERE id = cart_items.product_id) = 'percentage' 
            THEN (SELECT price FROM products WHERE id = cart_items.product_id) * ((SELECT tax_rate FROM products WHERE id = cart_items.product_id) / 100)
        WHEN (SELECT tax_type FROM products WHERE id = cart_items.product_id) = 'fixed' 
            THEN (SELECT tax_rate FROM products WHERE id = cart_items.product_id)
        ELSE 0
    END;

-- Insert sample order only if it doesn't exist
DO $$
DECLARE
    user_id_var BIGINT;
    order_count INTEGER;
BEGIN
    SELECT id INTO user_id_var FROM users WHERE email = 'john@example.com' LIMIT 1;
    
    IF user_id_var IS NOT NULL THEN
        -- Count existing orders for this user
        SELECT COUNT(*) INTO order_count FROM orders WHERE user_id = user_id_var;
        
        -- Insert only if no orders exist for this user
        IF order_count = 0 THEN
            INSERT INTO orders (user_id, total_amount, status) 
            VALUES (user_id_var, 4079.97, 'completed');
        END IF;
    END IF;
END $$;

/*
    RLS Policies (for security) - Enable Row Level Security on tables
*/
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_config ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access only to configurations
DO $$
BEGIN
    -- Create shipping config policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'shipping_config' AND policyname = 'Allow admin access to shipping config'
    ) THEN
        CREATE POLICY "Allow admin access to shipping config" ON shipping_config
            FOR ALL TO authenticated
            USING (
                EXISTS (
                    SELECT 1 FROM users
                    WHERE users.id = auth.uid() -- Use auth.uid() to get authenticated user ID
                    AND users.role = 'admin'
                )
            );
    END IF;

    -- Create tax config policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'tax_config' AND policyname = 'Allow admin access to tax config'
    ) THEN
        CREATE POLICY "Allow admin access to tax config" ON tax_config
            FOR ALL TO authenticated
            USING (
                EXISTS (
                    SELECT 1 FROM users
                    WHERE users.id = auth.uid() -- Use auth.uid() to get authenticated user ID
                    AND users.role = 'admin'
                )
            );
    END IF;

    -- Create cart items access policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'cart_items' AND policyname = 'Allow users to access their own carts'
    ) THEN
        CREATE POLICY "Allow users to access their own carts" ON cart_items
            FOR ALL TO authenticated
            USING (
                user_id = auth.uid() -- Only allow access to user's own cart items
            )
            WITH CHECK (
                user_id = auth.uid() -- Only allow modification of user's own cart items
            );
    END IF;

    -- Create orders access policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'orders' AND policyname = 'Allow users to access their own orders'
    ) THEN
        CREATE POLICY "Allow users to access their own orders" ON orders
            FOR ALL TO authenticated
            USING (
                user_id = auth.uid() -- Only allow access to user's own orders
            );
    END IF;

    -- Create order items access policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'order_items' AND policyname = 'Allow users to access order items from their orders'
    ) THEN
        CREATE POLICY "Allow users to access order items from their orders" ON order_items
            FOR ALL TO authenticated
            USING (
                EXISTS (
                    SELECT 1 FROM orders
                    WHERE orders.id = order_items.order_id
                    AND orders.user_id = auth.uid() -- Only allow access to user's order items
                )
            );
    END IF;
END $$;

-- Create a function to automatically sync Supabase Auth users to our app's users table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert new user into our app's users table
  INSERT INTO public.users (email, name, google_id, avatar, role, created_at, updated_at)
  VALUES (
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'preferred_username', NEW.email),
    NEW.id,  -- Use the Supabase auth user ID as google_id
    NEW.raw_user_meta_data->>'avatar_url',
    'user',  -- Default role
    NOW(),
    NOW()
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically sync new auth users to our app's users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create additional policies that work with JWT authentication
DO $$
BEGIN
    -- Create policy to allow public read access to products for browsing
    DROP POLICY IF EXISTS "Allow public read access to products" ON products;
    CREATE POLICY "Allow public read access to products" ON products
        FOR SELECT TO authenticated, anon
        USING (true);

    -- Create policy to allow public read access to product images
    DROP POLICY IF EXISTS "Allow public read access to product images" ON product_images;
    CREATE POLICY "Allow public read access to product images" ON product_images
        FOR SELECT TO authenticated, anon
        USING (true);

    -- Create policy to allow public SELECT for authentication purposes
    DROP POLICY IF EXISTS "Allow public read access for authentication" ON users;
    CREATE POLICY "Allow public read access for authentication" ON users
        FOR SELECT TO authenticated, anon
        USING (true);

    -- Create policy to allow public INSERT for user registration
    DROP POLICY IF EXISTS "Allow public insert for registration" ON users;
    CREATE POLICY "Allow public insert for registration" ON users
        FOR INSERT TO authenticated, anon
        WITH CHECK (true);
END $$;

/*
    Helpful Views for Admin Dashboard
*/
-- Create view to show combined shipping and tax settings
CREATE OR REPLACE VIEW shipping_tax_settings_view AS
SELECT 
    s.id as shipping_id,
    s.min_order_amount,
    s.flat_rate,
    s.enabled AS shipping_enabled,
    s.created_at as shipping_created,
    t.rate as tax_rate,
    t.type as tax_type,
    t.enabled AS tax_enabled,
    t.created_at as tax_created
FROM shipping_config s
FULL OUTER JOIN tax_config t ON s.id = t.id
ORDER BY s.id;

-- Create view to show tax breakdown by product
CREATE OR REPLACE VIEW product_tax_breakdown_view AS
SELECT 
    p.id,
    p.name,
    p.price,
    p.originalPrice,
    p.discount,
    p.tax_rate,
    p.tax_type,
    CASE 
        WHEN p.tax_type = 'percentage' THEN p.price * (p.tax_rate / 100)
        WHEN p.tax_type = 'fixed' THEN p.tax_rate
        ELSE 0
    END AS calculated_tax,
    CASE 
        WHEN p.originalPrice IS NOT NULL THEN p.originalPrice - p.price
        ELSE 0 
    END AS discount_amount
FROM products p
WHERE p.tax_rate IS NOT NULL AND p.tax_rate > 0
ORDER BY p.name;

/*
    Functions for Admin Panel Calculations
*/
-- Function to calculate total tax for a cart
CREATE OR REPLACE FUNCTION calculate_cart_total_tax(
    cart_user_id BIGINT
) RETURNS DECIMAL(10,2) AS $$
DECLARE
    total_tax DECIMAL(10,2) := 0;
BEGIN
    SELECT COALESCE(SUM(
        CASE 
            WHEN p.tax_type = 'percentage' THEN 
                (ci.quantity * p.price) * (p.tax_rate / 100)
            WHEN p.tax_type = 'fixed' THEN 
                ci.quantity * p.tax_rate
            ELSE 0
        END
    ), 0)
    INTO total_tax
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = cart_user_id
        AND p.tax_rate IS NOT NULL
        AND p.tax_rate > 0;

    RETURN total_tax;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate shipping cost for a cart
CREATE OR REPLACE FUNCTION calculate_cart_shipping_cost(
    cart_user_id BIGINT
) RETURNS DECIMAL(10,2) AS $$
DECLARE
    cart_subtotal DECIMAL(10,2);
    shipping_config_rec RECORD;
BEGIN
    -- Get cart subtotal
    SELECT COALESCE(SUM(ci.quantity * p.price), 0)
    INTO cart_subtotal
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = cart_user_id;

    -- Get active shipping configuration
    SELECT * INTO shipping_config_rec
    FROM shipping_config
    WHERE enabled = TRUE
    ORDER BY created_at DESC
    LIMIT 1;

    -- Calculate shipping cost
    IF cart_subtotal >= shipping_config_rec.min_order_amount THEN
        RETURN 0; -- Free shipping
    ELSE
        RETURN shipping_config_rec.flat_rate;
    END IF;
END;
$$ LANGUAGE plpgsql;

/*
    End of Ultimate Consolidated Supabase Schema
    This file includes all necessary tables, data, views, functions, and policies
    for managing shipping costs, tax, and all e-commerce features from the admin panel.
    Password hashes are properly configured for secure authentication.
*/