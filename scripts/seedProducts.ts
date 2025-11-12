import db from '../src/lib/db';

// Seed products data
const seedProducts = async () => {
  try {
    console.log('Seeding products...');
    
    // Clear existing products
    await db.query('DELETE FROM products;');
    
    // Insert sample products
    const sampleProducts = [
      {
        name: "Modern Velvet Sofa",
        description: "Luxurious velvet sofa with wooden legs, perfect for contemporary living rooms.",
        price: 2499.99,
        image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Living Room"
      },
      {
        name: "Classic Oak Dining Table",
        description: "Handcrafted oak dining table with a timeless design and durable finish.",
        price: 1899.99,
        image_url: "https://images.unsplash.com/photo-1567538096630-8a4be3904c9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Dining Room"
      },
      {
        name: "Coastal Bed Frame",
        description: "Light, airy bed frame in a coastal-inspired design with natural wood finish.",
        price: 1299.99,
        image_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Bedroom"
      },
      {
        name: "Industrial Desk",
        description: "Sturdy industrial-style desk with metal frame and reclaimed wood top.",
        price: 899.99,
        image_url: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Office"
      },
      {
        name: "Scandinavian Armchair",
        description: "Comfortable and stylish armchair with clean lines and minimalist design.",
        price: 799.99,
        image_url: "https://images.unsplash.com/photo-1524758631624-e68479b2bfb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Living Room"
      },
      {
        name: "Glass Coffee Table",
        description: "Elegant glass coffee table with chrome legs for a modern touch.",
        price: 549.99,
        image_url: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Living Room"
      }
    ];
    
    for (const product of sampleProducts) {
      await db.query(`
        INSERT INTO products (name, description, price, image_url, category)
        VALUES ($1, $2, $3, $4, $5)
      `, [
        product.name,
        product.description,
        product.price,
        product.image_url,
        product.category
      ]);
    }
    
    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    // Close the database connection pool
    await db.end();
  }
};

seedProducts();