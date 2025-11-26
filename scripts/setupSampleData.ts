import { createClient } from '@supabase/supabase-js';
import { generateUniqueSlug } from '../src/lib/slug';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This script will populate the database with sample data
const setupSampleData = async () => {
  try {
    console.log('Checking if sample data already exists...');

    // Check if products table is empty
    const { count, error: countError } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true });

    if (countError) {
      console.error('Error counting products:', countError);
      return { message: 'Error counting products', success: false, error: countError };
    }

    if (count && count > 0) {
      console.log(`Database already has ${count} products. Skipping sample data creation.`);
      return { message: `Database already has ${count} products. No changes made.`, success: true };
    }

    console.log('No products found. Creating sample data...');

    // Sample products data
    const sampleProducts = [
      {
        name: 'Modern Velvet Sofa',
        description: 'Luxurious velvet sofa with wooden legs, perfect for contemporary living rooms.',
        price: 2499.99,
        image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'Living Room'
      },
      {
        name: 'Classic Oak Dining Table',
        description: 'Handcrafted oak dining table with a timeless design and durable finish.',
        price: 1899.99,
        image_url: 'https://images.unsplash.com/photo-1567538096630-8a4be3904c9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'Dining Room'
      },
      {
        name: 'Coastal Bed Frame',
        description: 'Light, airy bed frame in a coastal-inspired design with natural wood finish.',
        price: 1299.99,
        image_url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'Bedroom'
      },
      {
        name: 'Industrial Desk',
        description: 'Sturdy industrial-style desk with metal frame and reclaimed wood top.',
        price: 899.99,
        image_url: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'Office'
      },
      {
        name: 'Scandinavian Armchair',
        description: 'Comfortable and stylish armchair with clean lines and minimalist design.',
        price: 799.99,
        image_url: 'https://images.unsplash.com/photo-1524758631624-e68479b2bfb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'Living Room'
      },
      {
        name: 'Glass Coffee Table',
        description: 'Elegant glass coffee table with chrome legs for a modern touch.',
        price: 549.99,
        image_url: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'Living Room'
      }
    ];

    // Insert sample products into the database
    for (const product of sampleProducts) {
      // Generate a unique slug for each product
      const slug = await generateUniqueSlug(product.name);
      
      const { error: insertError } = await supabase
        .from('products')
        .insert([
          { 
            name: product.name, 
            description: product.description, 
            price: product.price, 
            image_url: product.image_url, 
            category: product.category,
            slug: slug
          }
        ]);

      if (insertError) {
        console.error('Error inserting product:', insertError);
        throw insertError;
      }
    }

    console.log(`Successfully inserted ${sampleProducts.length} sample products into the database`);
    return { message: `Successfully inserted ${sampleProducts.length} sample products`, success: true };
  } catch (error) {
    console.error('Error setting up sample data:', error);
    return { message: 'Error setting up sample data', success: false, error };
  }
};

// For direct execution
if (require.main === module) {
  setupSampleData()
    .then(result => {
      if (result.success) {
        console.log('Sample data setup completed successfully');
        process.exit(0);
      } else {
        console.error('Sample data setup failed:', result.message);
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Unexpected error during sample data setup:', error);
      process.exit(1);
    });
}

export { setupSampleData };