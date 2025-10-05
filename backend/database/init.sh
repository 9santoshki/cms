#!/bin/bash
# Database initialization script

# Create the database
sudo -u postgres psql -c "CREATE DATABASE cms_ecomm;" 2>/dev/null || echo "Database already exists or error occurred"

# Connect to the database and create tables
sudo -u postgres psql -d cms_ecomm -c "
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Insert sample products if they don't exist
INSERT INTO products (name, description, price, image_url) 
SELECT 'Luxury Throw Pillow', 'Premium linen pillow with geometric design. Perfect for adding a touch of elegance to any living space. Made with high-quality materials for long-lasting comfort and style.', 2499.00, 'modern'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Luxury Throw Pillow');

INSERT INTO products (name, description, price, image_url) 
SELECT 'Designer Table Lamp', 'Handcrafted ceramic base with fabric shade. This elegant lamp adds warmth and sophistication to any room. Features energy-efficient LED lighting and a durable construction.', 7999.00, 'classic'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Designer Table Lamp');

INSERT INTO products (name, description, price, image_url) 
SELECT 'Wall Art Set', 'Set of 3 abstract canvas prints. These stunning pieces create a focal point in any room. Each canvas is professionally stretched and ready to hang, making decoration effortless.', 12999.00, 'coastal'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Wall Art Set');
"

echo "Database initialization completed!"