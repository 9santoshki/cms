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

// Function to list users
async function listUsers() {
  try {
    console.log('Connecting to Supabase to list users...');

    // Fetch all users
    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    if (!users || users.length === 0) {
      console.log('No users found in the database.');
      return { success: true, message: 'No users found', users: [] };
    }

    console.log(`Found ${users.length} users in the database:`);
    users.forEach(user => {
      console.log(`  - ID: ${user.id}, Email: ${user.email}, Role: ${user.role}`);
    });
    
    return { success: true, message: `Found ${users.length} users`, users };
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  }
}

// Execute the function
if (require.main === module) {
  listUsers()
    .then(result => {
      if (result.success) {
        console.log('User listing completed successfully');
        process.exit(0);
      } else {
        console.error('User listing failed:', result.message);
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('User listing failed:', error.message);
      process.exit(1);
    });
}

module.exports = { listUsers };