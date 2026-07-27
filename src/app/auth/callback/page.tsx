'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');

      if (error) {
        if (error === 'access_denied') {
          setErrorMessage('Sign-in was cancelled');
          setTimeout(() => {
            router.replace('/auth');
          }, 1500);
        } else {
          console.error('OAuth error:', error, errorDescription);
          setErrorMessage('Authentication failed. Please try again.');
          setTimeout(() => {
            router.replace('/auth?error=oauth_failed');
          }, 2000);
        }
        return;
      }

      if (code) {
        window.location.href = `/api/auth/google/callback?code=${code}`;
      } else {
        router.replace('/');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {errorMessage ? (
          <>
            <div className="w-12 h-12 mx-auto mb-4 text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">{errorMessage}</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Completing authentication...</p>
            <p className="text-sm text-gray-500 mt-2">You will be redirected shortly</p>
          </>
        )}
      </div>
    </div>
  );
}