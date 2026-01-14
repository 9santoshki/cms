// Layout for dashboard that applies role-based access control
import { redirect } from 'next/navigation';
import { getSessionFromCookieWithDB, getUserProfile } from '@/lib/db/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use database-backed session validation
  const session = await getSessionFromCookieWithDB();

  if (!session) {
    // Redirect to home if not authenticated
    redirect('/?error=unauthorized');
  }

  // Get user profile to check role
  const profile = await getUserProfile(session.userId);

  if (!profile || (profile.role !== 'admin' && profile.role !== 'moderator')) {
    // Redirect to home if user doesn't have admin or moderator role
    redirect('/?error=forbidden');
  }

  // Pass user and role to child components
  return (
    <div>
      {children}
    </div>
  );
}
