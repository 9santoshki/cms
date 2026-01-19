const { Client } = require('pg');
const fs = require('fs');

// Load environment variables - priority: .env.uat > .env.production > .env.local
let envFile = '.env.local';
if (fs.existsSync('.env.uat')) {
  envFile = '.env.uat';
} else if (fs.existsSync('.env.production')) {
  envFile = '.env.production';
}
require('dotenv').config({ path: envFile });
console.log(`Loading environment from: ${envFile}`);

const sampleProducts = [
  {
    name: 'Modern Velvet Sofa',
    slug: 'modern-velvet-sofa',
    description: 'Luxurious 3-seater velvet sofa with brass legs. Perfect for contemporary living spaces.',
    price: 899.99,
    category: 'Furniture',
    stock_quantity: 12,
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
  },
  {
    name: 'Marble Top Dining Table',
    slug: 'marble-top-dining-table',
    description: 'Elegant 6-seater dining table with genuine Italian marble top and solid wood base.',
    price: 1249.99,
    category: 'Furniture',
    stock_quantity: 8,
    image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800'
  },
  {
    name: 'Designer Table Lamp',
    slug: 'designer-table-lamp',
    description: 'Minimalist ceramic table lamp with adjustable brightness. Adds warmth to any room.',
    price: 49.99,
    category: 'Lighting',
    stock_quantity: 25,
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800'
  },
  {
    name: 'Handwoven Persian Rug',
    slug: 'handwoven-persian-rug',
    description: 'Authentic handwoven Persian rug, 8x10 feet. Rich colors and intricate patterns.',
    price: 1499.99,
    category: 'Decor',
    stock_quantity: 5,
    image_url: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800'
  },
  {
    name: 'Mid-Century Bookshelf',
    slug: 'mid-century-bookshelf',
    description: 'Solid teak wood bookshelf with 5 shelves. Classic mid-century modern design.',
    price: 349.99,
    category: 'Furniture',
    stock_quantity: 15,
    image_url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800'
  },
  {
    name: 'Abstract Wall Art Set',
    slug: 'abstract-wall-art-set',
    description: 'Set of 3 framed abstract canvas prints. Modern geometric designs.',
    price: 129.99,
    category: 'Decor',
    stock_quantity: 30,
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800'
  },
  {
    name: 'Luxury King Size Bed',
    slug: 'luxury-king-size-bed',
    description: 'Upholstered king size bed with storage drawers. Premium fabric and solid construction.',
    price: 799.99,
    category: 'Furniture',
    stock_quantity: 10,
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'
  },
  {
    name: 'Brass Floor Lamp',
    slug: 'brass-floor-lamp',
    description: 'Adjustable brass floor lamp with fabric shade. Perfect reading companion.',
    price: 89.99,
    category: 'Lighting',
    stock_quantity: 20,
    image_url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800'
  },
  {
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    description: 'Premium ergonomic office chair with lumbar support and adjustable armrests.',
    price: 249.99,
    category: 'Furniture',
    stock_quantity: 18,
    image_url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800'
  },
  {
    name: 'Crystal Chandelier',
    slug: 'crystal-chandelier',
    description: '9-light crystal chandelier with chrome finish. Stunning focal point for any room.',
    price: 549.99,
    category: 'Lighting',
    stock_quantity: 6,
    image_url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800'
  }
];

async function seedData() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'cmsdb',
    user: process.env.DB_USER || 'sk',
    password: process.env.DB_PASSWORD || 'sk',
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Check if products already exist
    const existingProducts = await client.query('SELECT COUNT(*) FROM products');
    const count = parseInt(existingProducts.rows[0].count);

    if (count > 0) {
      console.log(`\n⚠️  Database already has ${count} products`);
      console.log('Run this script only on empty database to avoid duplicates');
      console.log('\nTo clear existing products:');
      console.log('  DELETE FROM products;');
      process.exit(0);
    }

    console.log('\n📦 Adding sample products...\n');

    for (const product of sampleProducts) {
      const result = await client.query(
        `INSERT INTO products (name, slug, description, price, category, stock_quantity, image_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, name, price`,
        [
          product.name,
          product.slug,
          product.description,
          product.price,
          product.category,
          product.stock_quantity,
          product.image_url
        ]
      );

      const { id, name, price } = result.rows[0];
      console.log(`  ${id}. ${name} - ₹${price}`);
    }

    // Show summary
    const summary = await client.query(`
      SELECT
        category,
        COUNT(*) as count,
        MIN(price) as min_price,
        MAX(price) as max_price,
        SUM(stock_quantity) as total_stock
      FROM products
      GROUP BY category
      ORDER BY category
    `);

    console.log('\n📊 Summary by Category:\n');
    summary.rows.forEach(row => {
      console.log(`  ${row.category}:`);
      console.log(`    - Products: ${row.count}`);
      console.log(`    - Price range: ₹${row.min_price} - ₹${row.max_price}`);
      console.log(`    - Total stock: ${row.total_stock}`);
    });

    console.log('\n✅ Sample data seeded successfully!');
    console.log('\n🌐 Visit your site to see the products');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seedData();
