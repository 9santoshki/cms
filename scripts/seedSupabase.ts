// Load environment variables first before importing supabase connection
require('dotenv').config({ path: '../.env.local' });

import { supabase } from '../src/lib/supabaseConnection';

// Sample user data
const sampleUsers = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  },
  {
    email: "user1@example.com", 
    password: "password",
    role: "user"
  },
  {
    email: "user2@example.com",
    password: "password",
    role: "user"
  }
];

// Sample products data
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

// Additional product images
const additionalImages = [
  // Images for Modern Velvet Sofa
  {
    productId: 1,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e68479b2bfb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ]
  },
  // Images for Classic Oak Dining Table
  {
    productId: 2,
    images: [
      "https://images.unsplash.com/photo-1567538096630-8a4be3904c9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

async function seedDatabase() {
  console.log('Starting to seed Supabase database...');

  try {
    // Insert products first
    console.log('Inserting products...');
    if (!supabase) {
      console.error('Supabase client is not initialized');
      return;
    }
    for (const product of sampleProducts) {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();

      if (error) {
        console.error('Error inserting product:', error);
        // Check if table exists - if not, we may need to create it
        if (error.code === '42P01') {
          console.log('Table "products" does not exist. You need to create the table first in your Supabase dashboard.');
        }
      } else {
        console.log(`Inserted product: ${data[0].name}`);
      }
    }

    // Insert additional product images
    console.log('Inserting product images...');
    for (const productImages of additionalImages) {
      for (let i = 0; i < productImages.images.length; i++) {
        const isPrimary = i === 0;
        if (!supabase) {
          console.error('Supabase client is not initialized');
          return;
        }
        const { data, error } = await supabase
          .from('product_images')
          .insert([{
            product_id: productImages.productId,
            image_url: productImages.images[i],
            is_primary: isPrimary,
            sort_order: i
          }])
          .select();

        if (error) {
          console.error('Error inserting product image:', error);
        } else {
          console.log(`Inserted image for product ${productImages.productId}`);
        }
      }
    }

    // For users, we'll use Supabase Auth instead of direct table insertion
    console.log('Note: For security, users should be created through Supabase Auth, not direct table insertion.');
    console.log('Sample users would be:', sampleUsers);

    // Create some sample cart items (these would need an existing user in Supabase Auth)
    console.log('Inserting sample cart items...');
    const cartItems = [
      { user_id: 1, product_id: 1, quantity: 1 },
      { user_id: 1, product_id: 3, quantity: 2 },
      { user_id: 2, product_id: 2, quantity: 1 }
    ];

    for (const item of cartItems) {
      if (!supabase) {
        console.error('Supabase client is not initialized');
        return;
      }
      const { data, error } = await supabase
        .from('cart_items')
        .insert([item])
        .select();

      if (error) {
        console.error('Error inserting cart item:', error);
        if (error.code === '42P01') {
          console.log('Table "cart_items" does not exist. You need to create the table first in your Supabase dashboard.');
        }
      } else {
        console.log(`Inserted cart item for user ${item.user_id}`);
      }
    }

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

// Load environment variables
require('dotenv').config({ path: '../../.env.local' });

seedDatabase();