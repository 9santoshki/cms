// utils/slug.ts
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Generate a unique slug from a product name
 *
 * @param {string} name - Product name to convert to a slug
 * @param {number} [excludeId] - Product ID to exclude if updating existing product
 * @returns {Promise<string>} - Unique slug for the product
 */
export const generateUniqueSlug = async (name: string, excludeId?: string): Promise<string> => {
  // Basic slugification: convert to lowercase, replace spaces with hyphens, remove special characters
  let baseSlug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

  // Ensure minimum length and handle empty slug
  if (baseSlug.length < 3) {
    baseSlug = `product-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  }

  // Check if the slug already exists in the database
  let slug = baseSlug;
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    try {
      let { data, error } = excludeId
        ? await supabase
            .from('products')
            .select('id')
            .eq('slug', slug)
            .neq('id', excludeId)
        : await supabase
            .from('products')
            .select('id')
            .eq('slug', slug);

      if (error) {
        console.error('Error checking slug uniqueness:', error);
        // If there's an error, fallback to a unique slug using timestamp
        slug = `${baseSlug}-${Date.now()}`;
        isUnique = true;
      } else if (data && data.length === 0) {
        // Slug is unique
        isUnique = true;
      } else {
        // Slug exists, add counter and try again
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    } catch (error) {
      console.error('Error checking slug uniqueness:', error);
      // If there's an error, fallback to a unique slug using timestamp
      slug = `${baseSlug}-${Date.now()}`;
      isUnique = true;
    }
  }

  return slug;
};