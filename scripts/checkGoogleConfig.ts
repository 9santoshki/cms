import fs from 'fs';
import path from 'path';

// Load environment variables
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_GOOGLE_CLIENT_ID=')) {
      const clientId = line.split('=')[1].trim();
      console.log('Google Client ID in .env.local:', clientId);
      
      // Validate format
      if (!clientId || clientId === '') {
        console.error('❌ NEXT_PUBLIC_GOOGLE_CLIENT_ID is empty in .env.local');
      } else if (!clientId.endsWith('.apps.googleusercontent.com')) {
        console.warn('⚠️  Google Client ID should typically end with .apps.googleusercontent.com');
      } else {
        console.log('✅ Google Client ID format appears correct');
      }
    }
  });
} else {
  console.error('❌ .env.local file not found');
}

// Check for the presence of required Google configuration
const requiredConfig = [
  'NEXT_PUBLIC_GOOGLE_CLIENT_ID'
];

// You can run this script to verify your Google configuration
console.log('\nTo fix the Google authentication issue, please:');
console.log('1. Go to https://console.cloud.google.com/');
console.log('2. Navigate to APIs & Credentials > Credentials');
console.log('3. Find your OAuth 2.0 client ID (should match the one in .env.local)');
console.log('4. Make sure the application type is "Web application"');
console.log('5. Add these authorized JavaScript origins:');
console.log('   - http://localhost:3000');
console.log('   - http://127.0.0.1:3000');
console.log('6. Add redirect URI:');
console.log('   - http://localhost:3000/api/auth/google');
console.log('7. Save the changes and restart your application');