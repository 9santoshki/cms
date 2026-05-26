'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCategories } from '@/context/CategoriesContext';

const CATEGORY_ICONS: Record<string, string> = {
  'Living Room': 'fa-couch',
  'Dining Room': 'fa-utensils',
  'Bedroom': 'fa-bed',
  'Office': 'fa-desktop',
  'Home Office': 'fa-desktop',
  'Lighting': 'fa-lightbulb',
  'Decor': 'fa-palette',
  'Outdoor': 'fa-tree',
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSearch,
}) => {
  const { user, logout, signInWithGoogle } = useAuth();
  const { categories } = useCategories();

  // Close on escape key and lock body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    logout();
    onNavigate('/');
    onClose();
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: unknown) {
      console.error('Sign in failed:', err);
    }
  };

  const handleNav = (path: string) => {
    onNavigate(path);
    onClose();
  };

  const handleSearch = () => {
    onClose();
    if (onOpenSearch) onOpenSearch();
  };

  const menuItemStyle: React.CSSProperties = {
    padding: '14px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    color: '#333',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid #f5f5f5',
    minHeight: '48px', // Better touch target (44px minimum + padding)
    touchAction: 'manipulation', // Remove tap delay on mobile
  };

  const categoryHeaderStyle: React.CSSProperties = {
    padding: '14px 20px 10px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#c19a6b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    background: '#f8f8f8',
    marginTop: '8px',
  };

  const iconStyle: React.CSSProperties = {
    width: '24px',
    textAlign: 'center',
    color: '#c19a6b',
    fontSize: '16px',
  };

  // Dynamic shop categories from DB (via CategoriesContext — same data as desktop nav)
  const shopCategories = [
    { path: '/shop', icon: 'fa-th-large', label: 'All Products' },
    ...categories.map(cat => ({
      path: `/shop?category=${encodeURIComponent(cat.name)}`,
      icon: CATEGORY_ICONS[cat.name] || 'fa-folder',
      label: cat.name,
    })),
  ];

  const services = [
    { path: '/portfolio', icon: 'fa-images', label: 'Portfolio' },
    { path: '/services', icon: 'fa-pencil-ruler', label: 'Design Services' },
    { path: '/booking', icon: 'fa-calendar-check', label: 'Book Consultation' },
    { path: '/about', icon: 'fa-info-circle', label: 'About Us' },
    { path: '/contact', icon: 'fa-envelope', label: 'Contact' },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
        }}
      />

      {/* Menu panel */}
      <div
        className="mobile-menu"
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '85vw',
          maxWidth: '320px',
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: '4px 0 20px rgba(0,0,0,0.25)',
          zIndex: 1001,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
          color: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <span style={{ fontWeight: '600', fontSize: '16px' }}>Menu</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Search */}
        <div
          style={{
            ...menuItemStyle,
            backgroundColor: '#f8f8f8',
          }}
          onClick={handleSearch}
        >
          <i className="fas fa-search" style={iconStyle}></i>
          Search Products
        </div>

        {/* Shop Categories */}
        <div style={categoryHeaderStyle}>
          <i className="fas fa-shopping-bag" style={{ marginRight: '8px' }}></i>
          Shop Categories
        </div>
        {shopCategories.map((item) => (
          <div
            key={item.path}
            style={menuItemStyle}
            onClick={() => handleNav(item.path)}
          >
            <i className={`fas ${item.icon}`} style={iconStyle}></i>
            {item.label}
          </div>
        ))}

        {/* Services */}
        <div style={{ ...categoryHeaderStyle, marginTop: '8px' }}>
          <i className="fas fa-concierge-bell" style={{ marginRight: '8px' }}></i>
          Services & Info
        </div>
        {services.map((item) => (
          <div
            key={item.path}
            style={menuItemStyle}
            onClick={() => handleNav(item.path)}
          >
            <i className={`fas ${item.icon}`} style={iconStyle}></i>
            {item.label}
          </div>
        ))}

        {/* Dashboard links for admin/moderator */}
        {user && (user.role === 'admin' || user.role === 'moderator') && (
          <div style={menuItemStyle} onClick={() => handleNav('/dashboard')}>
            <i className="fas fa-tachometer-alt" style={iconStyle}></i>
            Dashboard
          </div>
        )}
        {user && user.role === 'supplier' && (
          <div style={menuItemStyle} onClick={() => handleNav('/supplier')}>
            <i className="fas fa-truck" style={iconStyle}></i>
            My Dashboard
          </div>
        )}

        {/* Auth section */}
        <div style={{ ...categoryHeaderStyle, marginTop: '8px' }}>
          <i className="fas fa-user" style={{ marginRight: '8px' }}></i>
          Account
        </div>
        {!user && (
          <div
            style={{
              ...menuItemStyle,
              backgroundColor: '#fef3c7',
              color: '#92400e',
              fontWeight: '500',
            }}
            onClick={handleSignIn}
          >
            <i className="fas fa-sign-in-alt" style={iconStyle}></i>
            Sign In
          </div>
        )}
        {user && (
          <>
            <div style={menuItemStyle} onClick={() => handleNav('/account')}>
              <i className="fas fa-user-circle" style={iconStyle}></i>
              My Account
            </div>
            <div style={menuItemStyle} onClick={() => handleNav('/orders')}>
              <i className="fas fa-shopping-bag" style={iconStyle}></i>
              My Orders
            </div>
            <div style={menuItemStyle} onClick={handleLogout}>
              <i className="fas fa-sign-out-alt" style={iconStyle}></i>
              Logout
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MobileMenu;