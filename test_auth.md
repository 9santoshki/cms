# Authentication Testing for CMS Application

## Overview
The application uses Supabase for authentication with Google OAuth. The main authentication flow involves:

1. Initiating Google OAuth via Supabase client-side
2. Redirecting to Google for authentication
3. Returning to the application with authentication tokens
4. Managing session state in the application context

## Manual Testing
To test the LoginModal functionality:

1. Start the development server: `npm run dev`
2. Navigate to the application in your browser
3. Click the user icon in the header when not signed in
4. The LoginModal should appear with a "Continue with Google" button
5. Clicking the button should initiate Google OAuth flow

## API Endpoints for Testing

### Get User Profile
This endpoint requires authentication cookies:

```bash
curl -X GET http://localhost:3000/api/profile \
  -H "Cookie: sb-access-token=YOUR_ACCESS_TOKEN; sb-refresh-token=YOUR_REFRESH_TOKEN"
```

### Update User Profile
This endpoint requires authentication cookies:

```bash
curl -X PUT http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=YOUR_ACCESS_TOKEN; sb-refresh-token=YOUR_REFRESH_TOKEN" \
  -d '{
    "name": "Updated Name",
    "avatar": "https://example.com/avatar.jpg"
  }'
```

## Supabase Direct Authentication Testing

You can also authenticate directly with Supabase without using the Google OAuth flow:

### Sign In with Email/Password
```bash
curl -X POST https://fykdwqlayqcxycrvbhew.supabase.co/auth/v1/token?grant_type=password \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo" \
  -d '{
    "email": "user@example.com",
    "password": "your_password"
  }'
```

### Sign Up with Email/Password
```bash
curl -X POST https://fykdwqlayqcxycrvbhew.supabase.co/auth/v1/signup \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo" \
  -d '{
    "email": "newuser@example.com",
    "password": "secure_password"
  }'
```

### Get User Info with Access Token
```bash
curl -X GET https://fykdwqlayqcxycrvbhew.supabase.co/auth/v1/user \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a2R3cWxheXFjeHljcnZiaGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzIxMTMsImV4cCI6MjA3ODY0ODExM30.MT3Ph18Rz6pWy6vL-oitq5buSwJ_Jk1imhlCekho8xo"
```

## Notes
- The actual login flow (Google OAuth) happens client-side, so curl cannot directly test the OAuth flow
- The LoginModal component calls `signInWithGoogle()` which initiates the OAuth flow via Supabase
- To fully test the login functionality, you need to interact with the UI in a browser
- The authentication state is managed in the AppContext and persisted using Supabase's session management