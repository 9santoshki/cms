'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import LoginModal from './LoginModal';
import { NavIcon, CartCount } from '../styles/HeaderStyles';

interface UserMenuProps {
  onNavigate: (path: string) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onNavigate }) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { items, cartCount } = useCart(); // Get both items and cartCount
  
  // Debug logging
  console.log('UserMenu - Current user:', user);
  console.log('UserMenu - Cart count:', cartCount);
  console.log('UserMenu - User exists:', !!user);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    // Clear pending cart action if user closes modal without logging in
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pendingCartAction');
    }
  };

  const handleLogout = () => {
    logout();
    onNavigate('/');
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderUserAccountIcon = () => {
    if (user) {
      console.log('UserMenu render: user is logged in', user);
      
      // Logged-in user - show dropdown menu
      return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <NavIcon
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            title={user.name || 'Account'}
          >
            {user.avatar ? (
              // Show avatar image if available
              <img
                src={user.avatar}
                alt="Profile"
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              // Fallback to user icon if no avatar
              <i className="fas fa-user"></i>
            )}
          </NavIcon>

          {/* Dropdown menu - properly positioned below the nav icon */}
          <div
            className="dropdown-menu"
            style={{
              display: isDropdownOpen ? 'block' : 'none',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)', // Center the dropdown under the icon
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 1000,
              minWidth: '200px',
              textAlign: 'left'
            }}
          >
            <div className="dropdown-header" style={{
              padding: '12px 16px',
              borderBottom: '1px solid #eee',
              fontWeight: 'bold'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '12px'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}>
                    <i className="fas fa-user" style={{ color: '#999' }}></i>
                  </div>
                )}
                <div>
                  <div className="user-name" style={{ fontWeight: '600' }}>{user.name}</div>
                  <div className="user-email" style={{ fontSize: '14px', color: '#666' }}>{user.email}</div>
                </div>
              </div>
            </div>
            <div className="dropdown-body" style={{ padding: '8px 0' }}>
              <div
                className="dropdown-item"
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                onClick={() => {
                  onNavigate('/account');
                  setIsDropdownOpen(false);
                }}
              >
                <i className="fas fa-user-circle" style={{ marginRight: '10px' }}></i>
                Account Settings
              </div>
              {(user.role === 'admin' || user.role === 'moderator') && (
                <div
                  className="dropdown-item"
                  style={{
                    padding: '10px 20px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                  onClick={() => {
                    onNavigate('/dashboard');
                    setIsDropdownOpen(false);
                  }}
                >
                  <i className="fas fa-tachometer-alt" style={{ marginRight: '10px' }}></i>
                  Dashboard
                </div>
              )}
              <div
                className="dropdown-item"
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                onClick={() => {
                  handleLogout();
                  setIsDropdownOpen(false);
                }}
              >
                <i className="fas fa-sign-out-alt" style={{ marginRight: '10px' }}></i>
                Logout
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Not logged in - show sign-in option that opens the LoginModal
    return (
      <NavIcon 
        onClick={() => setIsAuthModalOpen(true)} 
        aria-label="Sign in to your account"
      >
        <i className="fas fa-user"></i>
      </NavIcon>
    );
  };

  return (
    <>
      {/* Cart Icon - Only visible for logged-in users */}
      {user && (
        <div style={{ position: 'relative' }}>
          <NavIcon onClick={() => onNavigate('/cart')}>
            <i className="fas fa-shopping-cart"></i>
          </NavIcon>
          {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
        </div>
      )}
      {user && console.log("Cart icon rendered - user is logged in")}
      {!user && console.log("Cart icon not rendered - user is not logged in")}

      {/* User Account - Different display based on login state */}
      {renderUserAccountIcon()}

      {/* Authentication Modal - Positioned relative to the account icon */}
      {isAuthModalOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',  // Position below the header
          right: '20px',  // Position on the right side of the screen
          zIndex: 10000
        }}>
          <LoginModal isOpen={isAuthModalOpen} onClose={closeAuthModal} 
            onClick={() => console.log("LoginModal clicked - attempting sign in")} />
        </div>
      )}
    </>
  );
};

export default UserMenu;