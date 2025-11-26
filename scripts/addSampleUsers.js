const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
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

// Function to add sample users
async function addSampleUsers() {
  try {
    console.log('Connecting to Supabase to add sample users...');

    // Hash the passwords
    const adminPassword = 'admin123';
    const userPassword = 'password';
    
    const adminHashedPassword = await bcrypt.hash(adminPassword, 10);
    const userHashedPassword = await bcrypt.hash(userPassword, 10);

    // Check if users already exist
    const { data: existingUsers, error: fetchError } = await supabase
      .from('users')
      .select('email');

    if (fetchError && fetchError.code !== '42P01') { // If error is not "table doesn't exist"
      console.error('Error checking existing users:', fetchError);
      throw fetchError;
    }

    if (existingUsers) {
      const adminExists = existingUsers.some(user => user.email === 'admin@example.com');
      
      if (adminExists) {
        console.log('Admin user already exists in the database. Skipping sample user creation.');
        return { success: true, message: 'Admin user already exists. No changes made.' };
      }
    }

    console.log('No admin user found. Creating sample users...');

    // Sample users data
    const sampleUsers = [
      {
        email: 'admin@example.com',
        encrypted_password: adminHashedPassword,
        role: 'admin'
      },
      {
        email: 'john@example.com',
        encrypted_password: userHashedPassword,
        role: 'user'
      },
      {
        email: 'jane@example.com',
        encrypted_password: userHashedPassword,
        role: 'user'
      }
    ];

    // Insert sample users into the database
    const { data, error } = await supabase
      .from('users')
      .insert(sampleUsers, { ignoreDuplicates: true }); // Use ignoreDuplicates to avoid errors if users exist

    if (error) {
      console.error('Error inserting sample users:', error);
      throw error;
    }

    console.log(`Successfully inserted sample users into Supabase`);
    console.log('Admin credentials:');
    console.log('  Email: admin@example.com');
    console.log('  Password: admin123');
    console.log('Regular user credentials:');
    console.log('  Email: john@example.com');
    console.log('  Password: password');
    console.log('  Email: jane@example.com');
    console.log('  Password: password');
    
    return { success: true, message: `Successfully inserted ${sampleUsers.length} sample users` };
  } catch (error) {
    console.error('Error adding sample users:', error);
    throw error;
  }
}

// Execute the function
if (require.main === module) {
  addSampleUsers()
    .then(result => {
      if (result.success) {
        console.log('Sample users setup completed successfully');
        process.exit(0);
      } else {
        console.error('Sample users setup failed:', result.message);
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Sample users setup failed:', error.message);
      process.exit(1);
    });
}

module.exports = { addSampleUsers };