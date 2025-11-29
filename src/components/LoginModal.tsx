'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle, signInWithFacebook } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Close on ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      style={{ backdropFilter: 'blur(2px)' }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-60 overflow-hidden relative" 
        style={{
          fontFamily: 'Playfair Display, serif',
          border: '1px solid #c19a6b',
          boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
          backgroundColor: '#ffffff',  // Fully opaque white background
          minWidth: '240px',

        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className=" top-3  text-gray-800 hover:text-gray-900 focus:outline-none z-10 transition-colors duration-200"
          
          style={{ 
            width: '20px', 
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(248, 244, 240, 0.7)',
            borderRadius: '50%',
            padding: '2px',
            align: 'right',
            position: 'absolute',
            right: '10px',
          }}

        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div
          className="p-5 border-b"
          style={{
            background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)',
            // borderBottom: '1px solid #c19a6b'
          }}
        >
          <h2 className="text-lg font-semibold text-center mb-1" style={{ color: '#333333' }} align="center">
            Welcome
          </h2>
          <p className="text-xs text-gray-600 text-center" style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1' }} align="center">
            Sign in to access your account
          </p>
        </div>

        {/* Body */}
        <div className="p-5 pt-4" style={{ backgroundColor: '#fffaf5' }} align="center">

          {/* --- Google Sign In --- */}
          <button
            onClick={async () => {
              try {
                await signInWithGoogle();
              } catch (err) {
                console.error('Google sign-in error:', err);
              }
            }}
            className="w-full flex items-center justify-center px-3 py-2 rounded-md text-xs font-medium 
                       text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 hover:border-amber-500
                       transition-all duration-200 shadow-sm hover:shadow-md"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              transition: 'all 0.3s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              minHeight: '42px',
              minWidth: '42px',
              paddingRight: '12px',
              paddingLeft: '12px'
            }}
          >
            <svg className="w-10 h-6 mr-10" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.92A10 10 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {/* <span>Sign in with Google</span> */}
          </button>

 
          {/* --- Facebook Sign In --- */}
          <button
            onClick={async () => {
              try {
                await signInWithFacebook();
              } catch (err) {
                console.error('Facebook sign-in error:', err);
              }
            }}
            className="w-full flex items-center justify-center px-3 py-2 rounded-md text-xs font-medium 
                       text-white bg-[#1877F2] hover:bg-[#166FE0] transition-all duration-200 mt-3 shadow-sm hover:shadow-md"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              transition: 'all 0.3s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              minHeight: '42px',
              minWidth: '42px',
                            paddingRight: '12px',
              paddingLeft: '12px'

            }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" style={{ flexShrink: 0 }}>
              <path fill="#FFFFFF" d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.25V12h2.2l-.35 3h-1.85v7A10 10 0 0 0 22 12" />
            </svg>
            {/* <span>Sign in with Facebook</span> */}
          </button>

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <span className="text-amber-700 font-medium">Terms</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
