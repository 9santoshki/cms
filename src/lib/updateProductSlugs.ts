import { createClient } from '@supabase/supabase-js';
import { generateUniqueSlug } from './slug';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function updateProductSlugs() {
  try {
    // Get all existing products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name');

    if (productsError) {
      console.error('Error fetching products:', productsError);
      return;
    }

    if (products && products.length > 0) {
      console.log(`Updating ${products.length} products with slugs...`);

      for (const product of products) {
        // Use the existing generateUniqueSlug function which now uses Supabase
        const uniqueSlug = await generateUniqueSlug(product.name, product.id.toString());

        // Update the product with the new slug
        const { error: updateError } = await supabase
          .from('products')
          .update({ slug: uniqueSlug })
          .eq('id', product.id);

        if (updateError) {
          console.error(`Error updating product ${product.id} slug:`, updateError);
        } else {
          console.log(`Updated product ${product.id} with slug: ${uniqueSlug}`);
        }
      }

      console.log('All products updated with slugs');
    } else {
      console.log('No products found to update');
    }
  } catch (error) {
    console.error('Error updating product slugs:', error);
  }
}