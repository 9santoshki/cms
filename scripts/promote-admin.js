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

async function promoteToAdmin() {
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

    // Get admin emails from environment
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

    if (adminEmails.length === 0) {
      console.log('⚠️  No ADMIN_EMAILS configured in environment file');
      return;
    }

    console.log(`\nConfigured admin emails: ${adminEmails.join(', ')}`);
    console.log('\nPromoting users to admin role...\n');

    for (const email of adminEmails) {
      const result = await client.query(
        'UPDATE users SET role = $1 WHERE email = $2 RETURNING email, role',
        ['admin', email]
      );

      if (result.rows.length > 0) {
        console.log(`✅ ${email} → admin`);
      } else {
        console.log(`⚠️  ${email} → Not found in database (user must sign in first)`);
      }
    }

    // Show all admins
    console.log('\nCurrent admin users:');
    const admins = await client.query(
      "SELECT email, name, role, created_at FROM users WHERE role = 'admin' ORDER BY created_at"
    );

    if (admins.rows.length > 0) {
      admins.rows.forEach(admin => {
        console.log(`  - ${admin.email} (${admin.name}) - Created: ${admin.created_at.toISOString().split('T')[0]}`);
      });
    } else {
      console.log('  No admin users found');
    }

    console.log('\n✅ Admin promotion complete!');
  } catch (error) {
    console.error('❌ Error promoting admins:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

promoteToAdmin();
