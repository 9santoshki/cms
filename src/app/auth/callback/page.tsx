'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      // For Supabase OAuth, we don't explicitly need to do anything here
      // because Supabase handles the authentication state automatically
      // The session will be available through the auth state change listener
      
      // Redirect to home or previous page (use router.replace for cleaner navigation)
      // Check if there's a redirect parameter in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const redirectParam = urlParams.get('redirect');
      
      // Wait a moment to ensure the session state is updated
      setTimeout(() => {
        // Use router.replace for better UX (no back button issues)
        if (redirectParam) {
          router.replace(decodeURIComponent(redirectParam));
        } else {
          router.replace('/');
        }
      }, 800); // Reduced delay for faster UX
    };

    // Handle the callback
    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
        <p className="text-sm text-gray-500 mt-2">You will be redirected shortly</p>
      </div>
    </div>
  );
}