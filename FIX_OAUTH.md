# Fix Google OAuth Sign-In Issue

## Error
```
Error: "invalid_client" - "Unauthorized"
Failed to exchange code for tokens: 401
```

## Root Cause
The Google OAuth Client ID/Secret pair is invalid or the redirect URI is not configured correctly in Google Cloud Console.

## Solution

### Option 1: Fix Existing OAuth Client (Recommended)

1. **Go to Google Cloud Console:**
   - Open: https://console.cloud.google.com/apis/credentials
   - Select your project (or create one if you don't have one)

2. **Find your OAuth 2.0 Client ID:**
   - Look for: `774770475031-c7nqt1nrj05ntj4h9h1a2co56o5peb2o`
   - Click the pencil icon (Edit) next to it

3. **Add Redirect URI:**
   - Under "Authorized redirect URIs", click "+ ADD URI"
   - Add exactly: `http://localhost:3000/auth/callback`
   - Click "SAVE"

4. **Wait 5 minutes** for Google to propagate the changes

5. **Test sign-in** - Try logging in again

---

### Option 2: Create New OAuth Client (If Option 1 Fails)

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com/apis/credentials
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"

2. **Configure OAuth consent screen** (if not already done):
   - Click "CONFIGURE CONSENT SCREEN"
   - User Type: External
   - App name: "Colour My Space"
   - User support email: your-email@gmail.com
   - Developer contact: your-email@gmail.com
   - Click "SAVE AND CONTINUE"
   - Scopes: Add email, profile, openid
   - Click "SAVE AND CONTINUE"
   - Test users: Add your email
   - Click "SAVE AND CONTINUE"

3. **Create OAuth Client:**
   - Application type: **Web application**
   - Name: "CMS Local Development"
   - Authorized JavaScript origins:
     - `http://localhost:3000`
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/callback`
   - Click "CREATE"

4. **Copy Credentials:**
   - You'll see a popup with:
     - Client ID: `xxx...xxx.apps.googleusercontent.com`
     - Client Secret: `GOCSPX-xxx...xxx`
   - Click "DOWNLOAD JSON" (optional, for backup)
   - Click "OK"

5. **Update .env.local:**
   ```bash
   # Replace these lines in .env.local:
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-new-client-id>
   GOOGLE_CLIENT_SECRET=<your-new-client-secret>
   ```

6. **Restart dev server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

7. **Test sign-in** - Try logging in again

---

### Option 3: Quick Test with New Credentials

If you want to test quickly, here's a step-by-step:

1. **Open terminal:**
   ```bash
   cd /Users/sk/personal/proj/cms
   ```

2. **Edit .env.local:**
   ```bash
   nano .env.local
   ```

3. **Update these lines** (you need to create new OAuth credentials first):
   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-new-client-id-here
   GOOGLE_CLIENT_SECRET=your-new-client-secret-here
   ```

4. **Save and exit** (Ctrl+X, then Y, then Enter)

5. **Restart server:**
   ```bash
   # Kill current server
   kill $(lsof -ti:3000)

   # Start fresh
   npm run dev
   ```

---

## Avatar Not Loading Issue

**Possible causes:**
1. **User not signed in** - Can't load avatar if authentication fails
2. **Avatar URL from Google** - Check if Google profile picture URL is accessible
3. **CORS issues** - Google images might be blocked

**Once sign-in is fixed, avatar should work automatically.**

If avatar still doesn't load after fixing OAuth:

1. **Check avatar URL in database:**
   ```bash
   PGPASSWORD=sk psql -h localhost -U sk -d cmsdb -c "SELECT id, email, avatar FROM users;"
   ```

2. **Avatar should be a Google URL:**
   - Format: `https://lh3.googleusercontent.com/...`
   - If NULL, it means Google didn't provide an avatar

3. **Test avatar loading in browser:**
   - Copy the avatar URL from database
   - Paste in browser address bar
   - If it loads, the URL is valid

---

## Testing

After fixing OAuth credentials:

1. **Clear browser cookies:**
   - Open DevTools (F12)
   - Application → Cookies → http://localhost:3000
   - Right-click → Clear all cookies

2. **Clear browser cache:**
   - Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

3. **Try sign-in:**
   - Click "Sign in with Google"
   - Select your Google account
   - Grant permissions
   - Should redirect back to homepage signed in

4. **Check avatar:**
   - Avatar should appear in header
   - If not, check browser console (F12) for errors

---

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Redirect URI in Google Console doesn't match
- Must be exactly: `http://localhost:3000/auth/callback`
- Case-sensitive, no trailing slash

### Error: "invalid_client"
- Client ID or Secret is wrong
- Create new OAuth client with correct credentials

### Error: "access_denied"
- User denied permissions
- Try again and click "Allow"

### Sign-in succeeds but redirects to error page
- Check server logs: `tail -50 /tmp/nextjs-dev.log`
- Check database connection
- Check JWT_SECRET in .env.local

---

## Current Configuration

**App URL:** http://localhost:3000
**Client ID:** 774770475031-c7nqt1nrj05ntj4h9h1a2co56o5peb2o
**Required Redirect URI:** http://localhost:3000/auth/callback

**Next Steps:**
1. Go to Google Cloud Console
2. Add the redirect URI
3. Wait 5 minutes
4. Try sign-in again

---

## Contact

If you're still having issues:
- Check server logs: `tail -100 /tmp/nextjs-dev.log | grep -i error`
- Check browser console: F12 → Console tab
- Check database: `PGPASSWORD=sk psql -h localhost -U sk -d cmsdb -c "SELECT * FROM users;"`
