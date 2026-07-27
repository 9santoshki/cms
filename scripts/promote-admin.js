const { Client } = require('pg');
const fs = require('fs');

let envFile = '.env.local';
if (fs.existsSync('.env.uat')) {
  envFile = '.env.uat';
} else if (fs.existsSync('.env.production')) {
  envFile = '.env.production';
}
require('dotenv').config({ path: envFile });

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

    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

    if (adminEmails.length === 0) {
      console.error('⚠️  No ADMIN_EMAILS configured in environment file');
      return;
    }

    for (const email of adminEmails) {
      const result = await client.query(
        'UPDATE users SET role = $1 WHERE email = $2 RETURNING email, role',
        ['admin', email]
      );

      if (result.rows.length > 0) {
        console.log(`✅ ${email} → admin`);
      } else {
        console.log(`⚠️  ${email} → Not found (user must sign in first)`);
      }
    }

    const admins = await client.query(
      "SELECT email, name, role, created_at FROM users WHERE role = 'admin' ORDER BY created_at"
    );

    console.log('\nCurrent admin users:');
    if (admins.rows.length > 0) {
      admins.rows.forEach(admin => {
        console.log(`  - ${admin.email} (${admin.name}) - Created: ${admin.created_at.toISOString().split('T')[0]}`);
      });
    } else {
      console.log('  No admin users found');
    }

  } catch (error) {
    console.error('❌ Error promoting admins:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

promoteToAdmin();
