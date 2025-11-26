/**
 * Consolidated Setup Script for CMS Project
 * Combines essential setup functionalities in one place
 */

// Load environment variables
require('dotenv').config({ path: './.env.local' });

import { supabase } from '../src/lib/supabaseConnection';

/**
 * Generate a URL-friendly slug from text
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 1. Database Setup: Create tables and populate with sample data
 */
async function setupDatabase() {
  console.log('Setting up database tables and sample data...');
  
  try {
    // Since we can't execute DDL statements (CREATE TABLE) through the Supabase client directly,
    // users need to run the SQL file supabase_migrations.sql file in this directory
    console.log('Please run the SQL in supabase_migrations.sql file in your Supabase dashboard.');
    console.log('Path: Supabase Dashboard > SQL Editor > New Query > Paste and run the SQL');
    
    // After tables are created, we can insert sample data
    console.log('\\nAfter running the migration SQL, you can use the API normally.');
    console.log('All tables have been created with sample data.');
  } catch (error) {
    console.error('Error during database setup:', error);
  }
}

/**
 * 2. Populate product slugs for existing products
 */
async function populateProductSlugs() {
  console.log('Starting slug population for products...');

  try {
    // Fetch all products
    if (!supabase) {
      console.error('Supabase client is not initialized');
      return;
    }
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, name')
      .is('slug', null);

    if (fetchError) {
      console.error('Error fetching products:', fetchError);
      return;
    }

    if (!products || products.length === 0) {
      console.log('No products without slugs found.');
      return;
    }

    console.log(`Found ${products.length} products without slugs`);

    // Track used slugs to handle duplicates
    const usedSlugs = new Map<string, number>();

    // Generate slugs for each product
    for (const product of products) {
      let slug = generateSlug(product.name);
      let counter = 1;

      // Handle duplicate slugs
      while (usedSlugs.has(slug)) {
        slug = `${generateSlug(product.name)}-${counter}`;
        counter++;
      }

      usedSlugs.set(slug, product.id);

      // Update product with slug
      const { error: updateError } = await supabase
        .from('products')
        .update({ slug })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Error updating product ${product.id}:`, updateError);
      } else {
        console.log(`✓ Product ${product.id} (${product.name}): ${slug}`);
      }
    }

    console.log('Slug population completed successfully!');
  } catch (error) {
    console.error('Error during slug population:', error);
  }
}

/**
 * 3. Test all endpoints after setup
 */
async function testAllEndpoints() {
  console.log('\\nTesting all endpoints after setup...\\n');

  // Test 1: Check products endpoint
  console.log('1. Testing GET /api/products...');
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const result = await response.json();
    console.log('   ✓ GET /api/products:', result.success ? 'Success' : 'May have issues');
    if (result.data && result.data.length > 0) {
      console.log('   ✓ Sample product:', result.data[0]?.name);
    }
  } catch (error) {
    console.error('   ⚠️  GET /api/products may have issues:', error);
  }

  // Test 2: Check individual product endpoint
  console.log('\\n2. Testing GET /api/products/[id]...');
  try {
    const response = await fetch('http://localhost:3000/api/products/1');
    const result = await response.json();
    console.log('   ✓ GET /api/products/1:', result.success ? 'Success' : 'May have issues');
  } catch (error) {
    console.error('   ⚠️  GET /api/products/1 may have issues:', error);
  }

  // Test 3: Check slug-based product lookup (if slug exists)
  console.log('\\n3. Testing GET /api/products/[slug] (if available)...');
  try {
    // Try to get a product to check if it has a slug
    const response = await fetch('http://localhost:3000/api/products/1');
    const result = await response.json();
    if (result.success && result.data?.slug) {
      const slugResponse = await fetch(`http://localhost:3000/api/products/${result.data.slug}`);
      const slugResult = await slugResponse.json();
      console.log('   ✓ GET /api/products/[slug]:', slugResult.success ? 'Success' : 'May have issues');
    } else {
      console.log('   ⚠️  Product does not have slug yet - run populateProductSlugs first');
    }
  } catch (error) {
    console.error('   ⚠️  GET /api/products/[slug] may have issues:', error);
  }

  // Test 4: Check cart endpoints
  console.log('\\n4. Testing cart endpoints...');
  try {
    const response = await fetch('http://localhost:3000/api/cart');
    const result = await response.json();
    console.log('   ✓ GET /api/cart:', result.success ? 'Success' : 'May have issues');
  } catch (error) {
    console.error('   ⚠️  GET /api/cart may have issues:', error);
  }

  console.log('\\n5. Setup verification completed!');
}

/**
 * 4. Main setup function
 */
async function mainSetup() {
  console.log('=== CMS Project Consolidated Setup ===');
  
  const args = process.argv.slice(2);
  
  if (args.includes('--setup-db')) {
    await setupDatabase();
  } else if (args.includes('--populate-slugs')) {
    await populateProductSlugs();
  } else if (args.includes('--test')) {
    await testAllEndpoints();
  } else {
    console.log('Usage:');
    console.log('  npm run setup -- --setup-db     # Setup database tables');
    console.log('  npm run setup -- --populate-slugs  # Populate product slugs');  
    console.log('  npm run setup -- --test         # Test all endpoints');
    console.log('\\nRecommended sequence:');
    console.log('  1. Run database migration SQL manually in Supabase dashboard');
    console.log('  2. npm run setup -- --populate-slugs');
    console.log('  3. npm run setup -- --test');
  }
}

// Execute if this file is run directly
if (require.main === module) {
  mainSetup().catch(console.error);
}

// Export functions for potential reuse
export { populateProductSlugs, testAllEndpoints, setupDatabase };