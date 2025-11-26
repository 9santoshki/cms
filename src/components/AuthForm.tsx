'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import { signInWithGoogle } from '../lib/supabase/auth';
import '../App.css';

interface AuthFormProps {
  onClose?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose = () => {} }) => {
  const { error, setError, loading } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams?.get('redirect') || '/';

  // Google Sign In handler - only Google auth according to product.md specification
  const handleGoogleSignIn = async () => {
    try {
      setError('auth', null);
      
      // Sign in with Google via Supabase
      await signInWithGoogle();
      
      // The authentication will be handled by Supabase and NextAuth middleware
      // The AppContext will automatically sync with the session
      onClose();
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError('auth', error.message || 'Google authentication failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container-elegant">
        <button
          onClick={onClose}
          className="close-btn absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="auth-header-elegant text-center mb-8">
          <div className="auth-title">
            <h2 className="auth-main-title text-3xl font-bold text-gray-900 mb-3">
              Sign in to Your Account
            </h2>
            <p className="auth-subtitle text-gray-600">
              Use your Google account to continue
            </p>
          </div>
        </div>

        {error?.auth && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error.auth}</span>
            </div>
          </div>
        )}

        {/* Google Sign In Button - Only authentication method according to product.md */}
        <div className="google-auth-section-elegant mb-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading?.auth}
            className={`w-full flex items-center justify-center px-6 py-4 border-2 rounded-xl transition-colors duration-300 font-medium shadow-sm ${
              loading?.auth
                ? 'bg-gray-200 border-gray-300 cursor-not-allowed'
                : 'bg-white border-gray-300 hover:border-amber-400 text-gray-700'
            }`}
          >
            {loading?.auth ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" className="mr-3">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          By signing in with Google, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default AuthForm;