'use client';

import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';

export default function AdminLogin() {
  const { user, loading } = useAppContext();
  const router = useRouter();
  const [redirect, setRedirect] = useState<string>('/admin');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Get redirect URL from the browser URL after component mounts
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectParam = urlParams.get('redirect');
      setRedirect(redirectParam || '/admin');
    }
  }, []);

  useEffect(() => {
    // If user is already logged in as admin/moderator, redirect to admin page
    if (!loading.user && user && (user.role === 'admin' || user.role === 'moderator')) {
      router.push(redirect);
    }
    // If user is logged in but not admin/moderator, redirect to home
    else if (!loading.user && user && user.role !== 'admin' && user.role !== 'moderator') {
      router.push('/');
    }
  }, [user, loading.user, redirect, router]);

  // Show a loading state during hydration to prevent mismatches
  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to access admin features
            </p>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking user status
  if (loading.user || (user && (user.role === 'admin' || user.role === 'moderator'))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth form for login/registration
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Access
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access admin features
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}