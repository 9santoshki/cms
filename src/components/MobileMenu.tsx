'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  activePage?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  activePage = ''
}) => {
  const { user, logout, signInWithGoogle } = useAuth();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onNavigate('/');
    onClose();
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <div
      className="mobile-menu"
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
        padding: '20px 0',
        zIndex: 999,
        gap: '0'
      }}
    >
      <div
        className="mobile-menu-item"
        style={{
          padding: '15px 40px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          color: '#333'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        onClick={() => { onNavigate('/'); onClose(); }}
      >
        Home
      </div>
      <div
        className="mobile-menu-item"
        style={{
          padding: '15px 40px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          color: '#333'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        onClick={() => { onNavigate('/shop'); onClose(); }}
      >
        Shop
      </div>
      <div
        className="mobile-menu-item"
        style={{
          padding: '15px 40px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          color: '#333'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        onClick={() => { onNavigate('/portfolio'); onClose(); }}
      >
        Portfolio
      </div>
      <div
        className="mobile-menu-item"
        style={{
          padding: '15px 40px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          color: '#333'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        onClick={() => { onNavigate('/services'); onClose(); }}
      >
        Services
      </div>
      <div
        className="mobile-menu-item"
        style={{
          padding: '15px 40px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          color: '#333'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        onClick={() => { onNavigate('/booking'); onClose(); }}
      >
        Book Consultation
      </div>
      {(user && (user.role === 'admin' || user.role === 'moderator')) && (
        <div
          className="mobile-menu-item"
          style={{
            padding: '15px 40px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            color: '#333'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
          onClick={() => { onNavigate('/dashboard'); onClose(); }}
        >
          Dashboard
        </div>
      )}
      <div
        className="mobile-menu-item"
        style={{
          padding: '15px 40px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          color: '#333'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        onClick={() => { onNavigate('/about'); onClose(); }}
      >
        About
      </div>
      <div
        className="mobile-menu-item"
        style={{
          padding: '15px 40px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          color: '#333'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        onClick={() => { onNavigate('/contact'); onClose(); }}
      >
        Contact
      </div>
      {!user && (
        <div
          className="mobile-menu-item"
          style={{
            padding: '15px 40px',
            backgroundColor: '#fef3c7', // amber-100 equivalent
            color: '#92400e', // amber-700 equivalent
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fde68a'} // amber-200
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fef3c7'}
          onClick={handleSignIn}
        >
          <i className="fas fa-user" style={{ marginRight: '10px' }}></i>
          Sign In
        </div>
      )}
      {user && (
        <div>
          <div
            className="mobile-menu-item"
            style={{
              padding: '15px 40px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              color: '#333'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
            onClick={() => { onNavigate('/account'); onClose(); }}
          >
            <i className="fas fa-user-circle" style={{ marginRight: '10px' }}></i>
            Account
          </div>
          <div
            className="mobile-menu-item"
            style={{
              padding: '15px 40px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              color: '#333'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt" style={{ marginRight: '10px' }}></i>
            Logout
          </div>
          {(user.role === 'admin' || user.role === 'moderator') && (
            <div
              className="mobile-menu-item"
              style={{
                padding: '15px 40px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                color: '#333'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              onClick={() => { onNavigate('/dashboard'); onClose(); }}
            >
              <i className="fas fa-tachometer-alt" style={{ marginRight: '10px' }}></i>
              Dashboard
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;