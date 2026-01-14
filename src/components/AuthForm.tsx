'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const AuthForm = () => {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();

      // Load user's cart from server after successful login
      const { useCartStore } = await import('@/store/cartStore');
      await useCartStore.getState().loadServerCart();

      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    } catch (error) {
      console.error('Sign in error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden"
        style={{
          border: '1px solid #c19a6b',
        }}
      >
        {/* Header */}
        <div
          className="p-8 border-b"
          style={{
            background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)',
          }}
        >
          <h1
            className="text-3xl font-semibold text-center mb-2"
            style={{
              color: '#333333',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Welcome Back
          </h1>
          <p
            className="text-sm text-gray-600 text-center"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Sign in to continue to Colour My Space
          </p>
        </div>

        {/* Body */}
        <div className="p-8" style={{ backgroundColor: '#fffaf5' }}>
          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              backgroundColor: 'white',
            }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
