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
    price: 89999,
    category: 'Furniture',
    stock: 12,
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    is_featured: true
  },
  {
    name: 'Marble Top Dining Table',
    slug: 'marble-top-dining-table',
    description: 'Elegant 6-seater dining table with genuine Italian marble top and solid wood base.',
    price: 124999,
    category: 'Furniture',
    stock: 8,
    image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
    is_featured: true
  },
  {
    name: 'Designer Table Lamp',
    slug: 'designer-table-lamp',
    description: 'Minimalist ceramic table lamp with adjustable brightness. Adds warmth to any room.',
    price: 4999,
    category: 'Lighting',
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
    is_featured: false
  },
  {
    name: 'Handwoven Persian Rug',
    slug: 'handwoven-persian-rug',
    description: 'Authentic handwoven Persian rug, 8x10 feet. Rich colors and intricate patterns.',
    price: 149999,
    category: 'Decor',
    stock: 5,
    image_url: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800',
    is_featured: true
  },
  {
    name: 'Mid-Century Bookshelf',
    slug: 'mid-century-bookshelf',
    description: 'Solid teak wood bookshelf with 5 shelves. Classic mid-century modern design.',
    price: 34999,
    category: 'Furniture',
    stock: 15,
    image_url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800',
    is_featured: false
  },
  {
    name: 'Abstract Wall Art Set',
    slug: 'abstract-wall-art-set',
    description: 'Set of 3 framed abstract canvas prints. Modern geometric designs.',
    price: 12999,
    category: 'Decor',
    stock: 30,
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800',
    is_featured: false
  },
  {
    name: 'Luxury King Size Bed',
    slug: 'luxury-king-size-bed',
    description: 'Upholstered king size bed with storage drawers. Premium fabric and solid construction.',
    price: 79999,
    category: 'Furniture',
    stock: 10,
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    is_featured: true
  },
  {
    name: 'Brass Floor Lamp',
    slug: 'brass-floor-lamp',
    description: 'Adjustable brass floor lamp with fabric shade. Perfect reading companion.',
    price: 8999,
    category: 'Lighting',
    stock: 20,
    image_url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
    is_featured: false
  },
  {
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    description: 'Premium ergonomic office chair with lumbar support and adjustable armrests.',
    price: 24999,
    category: 'Furniture',
    stock: 18,
    image_url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
    is_featured: false
  },
  {
    name: 'Crystal Chandelier',
    slug: 'crystal-chandelier',
    description: '9-light crystal chandelier with chrome finish. Stunning focal point for any room.',
    price: 54999,
    category: 'Lighting',
    stock: 6,
    image_url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
    is_featured: true
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
        `INSERT INTO products (name, slug, description, price, category, stock, image_url, is_featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id, name, price`,
        [
          product.name,
          product.slug,
          product.description,
          product.price,
          product.category,
          product.stock,
          product.image_url,
          product.is_featured
        ]
      );

      const { id, name, price } = result.rows[0];
      const priceFormatted = (price / 100).toFixed(2);
      const featured = product.is_featured ? '⭐' : '  ';
      console.log(`${featured} ${id}. ${name} - ₹${priceFormatted}`);
    }

    // Show summary
    const summary = await client.query(`
      SELECT
        category,
        COUNT(*) as count,
        MIN(price/100) as min_price,
        MAX(price/100) as max_price,
        SUM(stock) as total_stock
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

    const featuredCount = await client.query("SELECT COUNT(*) FROM products WHERE is_featured = true");
    console.log(`\n⭐ Featured products: ${featuredCount.rows[0].count}`);

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
