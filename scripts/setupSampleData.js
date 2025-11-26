const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client - try both with and without NEXT_PUBLIC_ prefix
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration in environment variables');
  console.error('Please ensure SUPABASE_URL and SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are set in your .env.local file');
  console.log('Current values found:');
  console.log('  NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET');
  console.log('  SUPABASE_URL:', process.env.SUPABASE_URL ? 'SET' : 'NOT SET');
  console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (first 10 chars)' : 'NOT SET');
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY (first 10 chars):', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10) + '...');
  }
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to setup sample data using Supabase client
async function setupSampleData() {
  try {
    console.log('Connecting to Supabase...');

    // Check if products table exists by trying to select from it
    const { data: testResult, error: testError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (testError && testError.code === '42P01') { // Table does not exist error code
      console.error('Products table does not exist in your Supabase project.');
      console.error('You need to create the database tables using Supabase migrations first.');
      console.error('Please run the SQL migrations in supabase_migrations.sql manually in your Supabase dashboard.');
      process.exit(1);
    }

    // Check if products table is empty
    const { count, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error checking product count:', countError);
      throw countError;
    }

    if (count > 0) {
      console.log(`Database already has ${count} products. Skipping sample data creation.`);
      return { success: true, message: `Database already has ${count} products. No changes made.` };
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
    const { data, error } = await supabase
      .from('products')
      .insert(sampleProducts);

    if (error) {
      console.error('Error inserting sample products:', error);
      throw error;
    }

    console.log(`Successfully inserted ${sampleProducts.length} sample products into Supabase`);
    return { success: true, message: `Successfully inserted ${sampleProducts.length} sample products` };
  } catch (error) {
    console.error('Error setting up sample data:', error);
    throw error;
  }
}

// Execute the function
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
      console.error('Sample data setup failed:', error.message);
      process.exit(1);
    });
}

module.exports = { setupSampleData };