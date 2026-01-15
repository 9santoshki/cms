'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle } = useAuth();
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
          <h2 className="text-lg font-semibold text-center mb-1" style={{ color: '#333333' }}>
            Welcome
          </h2>
          <p className="text-xs text-center" style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1', color: '#333333' }}>
            Sign in to access your account
          </p>
        </div>

        {/* Body */}
        <div className="p-5 pt-4" style={{ backgroundColor: '#fffaf5', textAlign: 'center' }}>

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
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="18" 
  height="18" 
  viewBox="0 0 48 48"
>
  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.61 0 6.51 5.38 2.56 13.19l7.98 6.19C12.43 12.03 17.74 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.1 24.5c0-1.57-.15-3.09-.43-4.5H24v9h12.65c-.55 2.94-2.22 5.44-4.72 7.11l7.23 5.65C43.81 37.41 46.1 31.36 46.1 24.5z"/>
  <path fill="#FBBC05" d="M10.54 28.19c-.48-1.45-.74-2.99-.74-4.59s.26-3.14.74-4.59L2.56 12.81A23.85 23.85 0 000 23.6c0 3.9.93 7.59 2.56 10.79l7.98-6.2z"/>
  <path fill="#34A853" d="M24 48c6.47 0 11.96-2.13 15.94-5.78l-7.23-5.65c-2.03 1.37-4.63 2.18-7.71 2.18-6.26 0-11.57-3.53-14.46-8.7l-7.98 6.2C6.51 42.62 14.61 48 24 48z"/>
</svg>
            {/* <span>Sign in with Google</span> */}
          </button>

          <div className="mt-3 text-center">
            <p className="text-xs" style={{ color: '#333333' }}>
              By signing in, you agree to our{' '}
              <span className="font-medium" style={{ color: '#c19a6b' }}>Terms</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
