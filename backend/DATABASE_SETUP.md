# Database Setup Instructions

Since we're having permission issues with automated setup, please follow these manual steps to set up your database:

## Option 1: Automated setup script (Recommended)

I've created a script that will set up the database and user for you. Run it with:

```bash
cd /home/santoshk/sk/codebase/newprojs/qwenproj/backend
bash database/setup_user_db.sh
```

This script will:
1. Create a PostgreSQL user named 'sk' with password 'sk'
2. Create the 'cms_ecomm' database owned by the 'sk' user
3. Grant all privileges on the database to the 'sk' user
4. Create all the required tables using the schema file

Note: You'll need to enter your sudo password when prompted.

## Option 2: PostgreSQL Authentication Configuration

If you're having authentication issues, you may need to configure PostgreSQL to accept password authentication for your user.

Run the helper script to get instructions:
```bash
cd /home/santoshk/sk/codebase/newprojs/qwenproj/backend
bash database/pg_config_help.sh
```

This will show you how to modify the `pg_hba.conf` file to allow your 'sk' user to connect with password authentication.

## Option 3: Manual setup using PostgreSQL command line

1. Switch to the postgres user:
   ```bash
   sudo -u postgres psql
   ```

2. In the PostgreSQL prompt, run these commands:
   ```sql
   CREATE USER sk WITH PASSWORD 'sk';
   CREATE DATABASE cms_ecomm OWNER sk;
   GRANT ALL PRIVILEGES ON DATABASE cms_ecomm TO sk;
   \c cms_ecomm;
   ```

3. Then create the tables by running:
   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE products (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       price DECIMAL(10, 2) NOT NULL,
       image_url VARCHAR(500),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE cart_items (
       id SERIAL PRIMARY KEY,
       user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
       product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
       quantity INTEGER NOT NULL DEFAULT 1,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       UNIQUE(user_id, product_id)
   );

   CREATE TABLE orders (
       id SERIAL PRIMARY KEY,
       user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
       total_amount DECIMAL(10, 2) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE order_items (
       id SERIAL PRIMARY KEY,
       order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
       product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
       quantity INTEGER NOT NULL,
       price DECIMAL(10, 2) NOT NULL
   );
   ```

4. Insert sample products:
   ```sql
   INSERT INTO products (name, description, price, image_url) VALUES
   ('Luxury Throw Pillow', 'Premium linen pillow with geometric design. Perfect for adding a touch of elegance to any living space. Made with high-quality materials for long-lasting comfort and style.', 2499.00, 'modern'),
   ('Designer Table Lamp', 'Handcrafted ceramic base with fabric shade. This elegant lamp adds warmth and sophistication to any room. Features energy-efficient LED lighting and a durable construction.', 7999.00, 'classic'),
   ('Wall Art Set', 'Set of 3 abstract canvas prints. These stunning pieces create a focal point in any room. Each canvas is professionally stretched and ready to hang, making decoration effortless.', 12999.00, 'coastal');
   ```

5. Exit PostgreSQL:
   ```sql
   \q
   ```

## Option 4: Using the provided SQL script

You can also use the provided SQL script to set up the database:

1. Run the script with:
   ```bash
   sudo -u postgres psql -f /home/santoshk/sk/codebase/newprojs/qwenproj/backend/database/create_cms_ecomm.sql
   ```

## After database setup

Once the database is set up, you can start the backend server:
```bash
cd /home/santoshk/sk/codebase/newprojs/qwenproj/backend
npm run dev
```