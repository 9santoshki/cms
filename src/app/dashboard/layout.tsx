// Layout for dashboard that applies role-based access control
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    // Redirect to login if not authenticated
    redirect('/auth?redirect=/dashboard');
  }

  // Get user profile to check role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile || (profile.role !== 'admin' && profile.role !== 'moderator')) {
    // Redirect to home if user doesn't have admin or moderator role
    redirect('/');
  }

  // Pass user and role to child components
  return (
    <div>
      {children}
    </div>
  );
}