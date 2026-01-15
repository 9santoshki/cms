'use client';

import { useAppContext } from '@/context/AppContext';
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm'

function AuthContent() {
  const { user, loading } = useAppContext();
  const router = useRouter();
  const [redirect, setRedirect] = useState<string>('/');

  useEffect(() => {
    // Read search params from window on client side to avoid useSearchParams SSR warning
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setRedirect(params.get('redirect') || '/');
    }
  }, []);

  useEffect(() => {
    if (!loading.user && user) {
      // If user is already logged in, redirect to the target page or home
      const targetPath = redirect && redirect !== '/' ? decodeURIComponent(redirect) : '/';
      router.push(targetPath);
    }
  }, [user, loading.user, redirect, router]);

  // Show loading or redirecting message while checking user status
  if (!loading.user && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <AuthForm />;
}

export default function Auth() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}