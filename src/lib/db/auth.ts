/**
 * Authentication and session management module
 * - Google OAuth user creation and profile management
 * - JWT token generation and verification
 * - Database-backed persistent sessions with expiration
 * - Session validation with real-time role fetching from database
 */
import { query } from './connection';
import { cookies, headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const SESSION_COOKIE_NAME = 'cms-session';
const SESSION_DURATION_DAYS = 30; // 30 days for persistent login

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'moderator' | 'admin';
  created_at?: string;
  updated_at?: string;
}

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  sessionId?: string; // Database session ID
}

export interface DBSession {
  id: string;
  user_id: string;
  session_token: string;
  refresh_token?: string;
  user_agent?: string;
  ip_address?: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
  last_activity: string;
}

// Create or update user from Google OAuth
export const upsertUserFromGoogle = async (googleUser: {
  id: string;
  email: string;
  name: string;
  picture?: string;
}): Promise<UserProfile> => {
  // Check if user exists
  const existingUser = await query(
    'SELECT * FROM users WHERE email = $1',
    [googleUser.email]
  );

  let userId: string;

  if (existingUser.rows.length > 0) {
    // Update existing user
    userId = existingUser.rows[0].id;
    await query(
      `UPDATE users
       SET name = $1, avatar = $2, google_id = $3, updated_at = NOW()
       WHERE id = $4`,
      [googleUser.name, googleUser.picture, googleUser.id, userId]
    );
  } else {
    // Create new user
    const newUser = await query(
      `INSERT INTO users (email, name, avatar, google_id, role)
       VALUES ($1, $2, $3, $4, 'customer')
       RETURNING id`,
      [googleUser.email, googleUser.name, googleUser.picture, googleUser.id]
    );
    userId = newUser.rows[0].id;
  }

  // Get the complete user profile
  const userProfile = await getUserProfile(userId);
  if (!userProfile) {
    throw new Error('Failed to create or fetch user profile');
  }

  return userProfile;
};

// Get user profile by ID
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const result = await query(
    'SELECT id, email, name, avatar, role, created_at, updated_at FROM users WHERE id = $1',
    [userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

// Get user profile by email
export const getUserByEmail = async (email: string): Promise<UserProfile | null> => {
  const result = await query(
    'SELECT id, email, name, avatar, role, created_at, updated_at FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

// Create session token
export const createSessionToken = (user: UserProfile): string => {
  const sessionData: SessionData = {
    userId: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    role: user.role,
  };

  return jwt.sign(sessionData, JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Verifies JWT session token
 * - Validates token format and signature
 * - Returns decoded session data or null if invalid
 */
export const verifySessionToken = (token: string): SessionData | null => {
  try {
    if (!token || token.trim() === '' || token.length < 10) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as SessionData;
    return decoded;
  } catch (error) {
    if (token && token.length > 10) {
      console.error('Invalid token:', error);
    }
    return null;
  }
};

// Set session cookie
export const setSessionCookie = async (token: string) => {
  const cookieStore = await cookies();

  // Get domain from APP_URL for proper cookie domain setting
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const domain = appUrl ? new URL(appUrl).hostname : undefined;

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // true for uat and production
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    ...(domain && { domain }),
  });
};

// Get session from cookie
export const getSessionFromCookie = async (): Promise<SessionData | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return null;
  }

  return verifySessionToken(sessionCookie.value);
};

// Clear session cookie
export const clearSessionCookie = async () => {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });
};

// Update user role (admin only)
export const updateUserRole = async (
  userId: string,
  newRole: 'customer' | 'moderator' | 'admin'
): Promise<void> => {
  await query(
    'UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2',
    [newRole, userId]
  );
};

// Get all user profiles (admin only)
export const getAllUserProfiles = async (): Promise<UserProfile[]> => {
  const result = await query(
    'SELECT id, email, name, avatar, role, created_at, updated_at FROM users ORDER BY created_at DESC'
  );

  return result.rows;
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: { name?: string; avatar?: string }
): Promise<UserProfile | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (updates.name !== undefined) {
    fields.push(`name = $${paramCount++}`);
    values.push(updates.name);
  }

  if (updates.avatar !== undefined) {
    fields.push(`avatar = $${paramCount++}`);
    values.push(updates.avatar);
  }

  if (fields.length === 0) {
    return getUserProfile(userId);
  }

  fields.push(`updated_at = NOW()`);
  values.push(userId);

  await query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount}`,
    values
  );

  return getUserProfile(userId);
};

// ============================================================================
// SESSION MANAGEMENT (Database-backed persistent sessions)
// ============================================================================

// Generate secure random token
const generateSecureToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Get request metadata (user agent, IP)
const getRequestMetadata = async () => {
  try {
    const headersList = await headers();
    const userAgent = (await headersList).get('user-agent') || undefined;
    const forwardedFor = (await headersList).get('x-forwarded-for');
    const realIp = (await headersList).get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0] || realIp || undefined;

    return { userAgent, ipAddress };
  } catch (error) {
    return { userAgent: undefined, ipAddress: undefined };
  }
};

// Create a new session in the database
export const createSession = async (
  user: UserProfile,
  rememberMe: boolean = true
): Promise<{ sessionToken: string; refreshToken: string; dbSession: DBSession }> => {
  const sessionToken = generateSecureToken();
  const refreshToken = generateSecureToken();
  const { userAgent, ipAddress } = await getRequestMetadata();

  // Calculate expiration based on remember me option
  const durationDays = rememberMe ? SESSION_DURATION_DAYS : 1; // 30 days or 1 day
  const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);

  const result = await query(
    `INSERT INTO sessions (user_id, session_token, refresh_token, user_agent, ip_address, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [user.id, sessionToken, refreshToken, userAgent, ipAddress, expiresAt]
  );

  return {
    sessionToken,
    refreshToken,
    dbSession: result.rows[0]
  };
};

// Get session from database by token
export const getSessionFromDB = async (sessionToken: string): Promise<DBSession | null> => {
  const result = await query(
    `SELECT * FROM sessions
     WHERE session_token = $1
     AND expires_at > NOW()`,
    [sessionToken]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

// Update session activity timestamp
export const updateSessionActivity = async (sessionId: string): Promise<void> => {
  await query(
    'UPDATE sessions SET last_activity = NOW() WHERE id = $1',
    [sessionId]
  );
};

// Delete a specific session
export const deleteSession = async (sessionToken: string): Promise<void> => {
  await query(
    'DELETE FROM sessions WHERE session_token = $1',
    [sessionToken]
  );
};

// Delete all sessions for a user
export const deleteUserSessions = async (userId: string): Promise<void> => {
  await query(
    'DELETE FROM sessions WHERE user_id = $1',
    [userId]
  );
};

// Delete a specific session by ID
export const deleteSessionById = async (sessionId: string): Promise<void> => {
  await query(
    'DELETE FROM sessions WHERE id = $1',
    [sessionId]
  );
};

// Clean up expired sessions
export const cleanupExpiredSessions = async (): Promise<number> => {
  const result = await query('SELECT cleanup_expired_sessions()');
  return result.rows[0].cleanup_expired_sessions;
};

// Get all active sessions for a user
export const getUserSessions = async (userId: string): Promise<DBSession[]> => {
  const result = await query(
    `SELECT * FROM sessions
     WHERE user_id = $1
     AND expires_at > NOW()
     ORDER BY last_activity DESC`,
    [userId]
  );

  return result.rows;
};

// Enhanced session token creation with database session ID
export const createSessionTokenWithDB = (user: UserProfile, sessionId: string): string => {
  const sessionData: SessionData = {
    userId: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    role: user.role,
    sessionId: sessionId, // Include DB session ID in JWT
  };

  return jwt.sign(sessionData, JWT_SECRET, { expiresIn: `${SESSION_DURATION_DAYS}d` });
};

/**
 * Validates session token against JWT and database
 * - Verifies JWT signature and expiration
 * - Checks database session validity and updates last activity
 * - Fetches current user role from database (ensures role changes take effect immediately)
 */
export const validateSession = async (token: string): Promise<SessionData | null> => {
  const jwtData = verifySessionToken(token);
  if (!jwtData) {
    return null;
  }

  if (jwtData.sessionId) {
    const dbSession = await query(
      'SELECT * FROM sessions WHERE id = $1 AND expires_at > NOW()',
      [jwtData.sessionId]
    );

    if (dbSession.rows.length === 0) {
      return null;
    }

    await updateSessionActivity(jwtData.sessionId);
  }

  const userProfile = await getUserProfile(jwtData.userId);
  if (userProfile) {
    return {
      userId: jwtData.userId,
      email: userProfile.email,
      name: userProfile.name,
      avatar: userProfile.avatar,
      role: userProfile.role,
      sessionId: jwtData.sessionId
    };
  }

  return jwtData;
};

/**
 * Gets and validates session from cookie
 * - Reads session cookie from request
 * - Validates against database with real-time role fetching
 */
export const getSessionFromCookieWithDB = async (): Promise<SessionData | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return null;
  }

  return validateSession(sessionCookie.value);
};

// Enhanced set session cookie with longer duration
export const setSessionCookieWithDB = async (token: string, rememberMe: boolean = true) => {
  const cookieStore = await cookies();
  const maxAge = rememberMe
    ? 60 * 60 * 24 * SESSION_DURATION_DAYS  // 30 days
    : 60 * 60 * 24; // 1 day

  // Do NOT set domain - let browser use current domain automatically
  // This avoids cookie deletion issues and subdomain problems
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // true for uat and production
    sameSite: 'lax',
    maxAge: maxAge,
    path: '/',
  });
};

// Enhanced logout that clears both cookie and database session
export const logoutSession = async (): Promise<void> => {
  const session = await getSessionFromCookieWithDB();

  // Clear cookie
  await clearSessionCookie();

  // Delete from database if session ID exists
  if (session?.sessionId) {
    await deleteSessionById(session.sessionId);
  }
};
