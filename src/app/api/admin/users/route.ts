import { NextRequest } from 'next/server';
import { getAllUserProfiles } from '@/lib/db/auth';
import { ok } from '@/lib/api-response';
import { withAuth } from '@/lib/middleware-helpers';

export const GET = withAuth(async (_request, _context, _session) => {
  const users = await getAllUserProfiles();
  return ok(users);
}, { requiredRole: 'admin' });
