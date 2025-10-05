const { Client } = require('pg');
require('dotenv').config();

// Connect to default database to create our database
const defaultClient = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres', // Connect to default database
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Connect to our database to create tables
const cmsClient = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'cms_ecomm',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function setupDatabase() {
  try {
    console.log('Setting up cms_ecomm database...');
    
    // Connect to default database
    await defaultClient.connect();
    console.log('Connected to PostgreSQL');
    
    // Create database
    try {
      await defaultClient.query('CREATE DATABASE cms_ecomm');
      console.log('Database cms_ecomm created successfully');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('Database cms_ecomm already exists');
      } else {
        throw err;
      }
    }
    
    await defaultClient.end();
    
    // Connect to our database
    await cmsClient.connect();
    console.log('Connected to cms_ecomm database');
    
    // Create tables
    console.log('Creating tables...');
    const schema = `
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
    `;
    
    await cmsClient.query(schema);
    console.log('Tables created successfully');
    
    // Insert sample products if they don't exist
    console.log('Inserting sample products...');
    const insertProducts = `
      INSERT INTO products (name, description, price, image_url) 
      SELECT 'Luxury Throw Pillow', 'Premium linen pillow with geometric design. Perfect for adding a touch of elegance to any living space. Made with high-quality materials for long-lasting comfort and style.', 2499.00, 'modern'
      WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Luxury Throw Pillow');

      INSERT INTO products (name, description, price, image_url) 
      SELECT 'Designer Table Lamp', 'Handcrafted ceramic base with fabric shade. This elegant lamp adds warmth and sophistication to any room. Features energy-efficient LED lighting and a durable construction.', 7999.00, 'classic'
      WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Designer Table Lamp');

      INSERT INTO products (name, description, price, image_url) 
      SELECT 'Wall Art Set', 'Set of 3 abstract canvas prints. These stunning pieces create a focal point in any room. Each canvas is professionally stretched and ready to hang, making decoration effortless.', 12999.00, 'coastal'
      WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Wall Art Set');
    `;
    
    await cmsClient.query(insertProducts);
    console.log('Sample products inserted successfully');
    
    // List tables
    const tables = await cmsClient.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Database tables:');
    tables.rows.forEach(row => {
      console.log(`- ${row.table_name}`);
    });
    
    await cmsClient.end();
    console.log('Database setup completed successfully!');
    console.log('You can now start the backend server with: npm run dev');
  } catch (err) {
    console.error('Database setup error:', err.message);
    process.exit(1);
  }
}

setupDatabase();