'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';

import Modal from './Modal';
import AuthForm from './AuthForm';

// Import header styles
import {
  SharedHeader,
  HeaderContainer,
  HeaderLogo,
  HeaderMenu,
  HeaderLink,
  HeaderIcons,
  CartCount,
  UserGreeting,
  NavIcon,
  MobileMenuToggle
} from '../styles/HeaderStyles';

interface SharedHeaderProps {
  activePage?: string;
}

const Header: React.FC<SharedHeaderProps> = ({ activePage = '' }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchQuery, setSearchQuery] = useState('');



  const navigate = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const { user, cartItems, logout, setUser, setToken, loading } = useAppContext();
  const userLoading = loading?.user || false;

  // DEBUG: Log user state
  console.log('🔍 Header - user state:', user);
  console.log('🔍 Header - user truthy?', !!user);
  console.log('🔍 Header - user details:', {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    role: user?.role
  });

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  // Trigger Google sign-in by opening auth modal which contains the GoogleLogin button
  const handleGoogleSignIn = () => {
    // Open the auth modal which contains the GoogleLogin button
    setIsAuthModalOpen(true);
  };

  // Effect to listen for showLoginModal event from other components
  useEffect(() => {
    const handleShowLoginModal = () => {
      setIsAuthModalOpen(true);
    };

    window.addEventListener('showLoginModal', handleShowLoginModal);

    // Clean up the event listener
    return () => {
      window.removeEventListener('showLoginModal', handleShowLoginModal);
    };
  }, []);

  // Handler to close auth modal and clear any pending cart action
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    // Clear pending cart action if user closes modal without logging in
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pendingCartAction');
    }
  };

  return (
    <SharedHeader>
      <HeaderContainer>
        <HeaderLogo>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img
              src="/logo.svg"
              alt="Colour My Space Logo"
              className="logo-image"
              style={{ height: '40px', width: 'auto', maxHeight: '40px' }}
            />
          </a>
        </HeaderLogo>

        <>
          {/* Desktop Menu - Hidden on mobile via CSS */}
          <HeaderMenu>
            <HeaderLink
              href="#"
              $active={activePage === 'home'}
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
            >
              Home
            </HeaderLink>
            <HeaderLink
              href="#"
              $active={activePage === 'shop'}
              onClick={(e) => { e.preventDefault(); navigate('/shop'); }}
            >
              Shop
            </HeaderLink>
            <HeaderLink
              href="#"
              $active={activePage === 'portfolio'}
              onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}
            >
              Portfolio
            </HeaderLink>
            <HeaderLink
              href="#"
              $active={activePage === 'services'}
              onClick={(e) => { e.preventDefault(); navigate('/services'); }}
            >
              Services
            </HeaderLink>
            <HeaderLink
              href="#"
              $active={activePage === 'booking'}
              onClick={(e) => { e.preventDefault(); navigate('/booking'); }}
            >
              Book Consultation
            </HeaderLink>

            {(user && (user.role === 'admin' || user.role === 'moderator')) && (
              <HeaderLink
                href="#"
                $active={activePage === 'dashboard'}
                onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}
              >
                Dashboard
              </HeaderLink>
            )}
            <HeaderLink
              href="#"
              $active={activePage === 'about'}
              onClick={(e) => { e.preventDefault(); navigate('/about'); }}
            >
              About
            </HeaderLink>
            <HeaderLink
              href="#"
              $active={activePage === 'contact'}
              onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
            >
              Contact
            </HeaderLink>
          </HeaderMenu>

          {/* Mobile Menu - Only shown when mobile menu is open (renders a separate container) */}
          {isMobileMenuOpen && (
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
                gap: '0',
                maxHeight: '70vh',
                overflowY: 'auto'
              }}
            >
              <HeaderLink
                href="#"
                $active={activePage === 'home'}
                onClick={(e) => { e.preventDefault(); navigate('/'); setIsMobileMenuOpen(false); }}
                style={{ padding: '15px 40px', display: 'block' }}
              >
                Home
              </HeaderLink>
              <HeaderLink
                href="#"
                $active={activePage === 'shop'}
                onClick={(e) => { e.preventDefault(); navigate('/shop'); setIsMobileMenuOpen(false); }}
                style={{ padding: '15px 40px', display: 'block' }}
              >
                Shop
              </HeaderLink>
              <HeaderLink
                href="#"
                $active={activePage === 'portfolio'}
                onClick={(e) => { e.preventDefault(); navigate('/portfolio'); setIsMobileMenuOpen(false); }}
                style={{ padding: '15px 40px', display: 'block' }}
              >
                Portfolio
              </HeaderLink>
              <HeaderLink
                href="#"
                $active={activePage === 'services'}
                onClick={(e) => { e.preventDefault(); navigate('/services'); setIsMobileMenuOpen(false); }}
                style={{ padding: '15px 40px', display: 'block' }}
              >
                Services
              </HeaderLink>
              <HeaderLink
                href="#"
                $active={activePage === 'booking'}
                onClick={(e) => { e.preventDefault(); navigate('/booking'); setIsMobileMenuOpen(false); }}
                style={{ padding: '15px 40px', display: 'block' }}
              >
                Book Consultation
              </HeaderLink>

              {user && user.role === 'admin' && (
                <HeaderLink
                  href="#"
                  $active={activePage === 'admin'}
                  onClick={(e) => { e.preventDefault(); navigate('/admin'); setIsMobileMenuOpen(false); }}
                  style={{ padding: '15px 40px', display: 'block' }}
                >
                  Admin
                </HeaderLink>
              )}
              <HeaderLink
                href="#"
                $active={activePage === 'about'}
                onClick={(e) => { e.preventDefault(); navigate('/about'); setIsMobileMenuOpen(false); }}
                style={{ padding: '15px 40px', display: 'block' }}
              >
                About
              </HeaderLink>
              <HeaderLink
                href="#"
                $active={activePage === 'contact'}
                onClick={(e) => { e.preventDefault(); navigate('/contact'); setIsMobileMenuOpen(false); }}
                style={{ padding: '15px 40px', display: 'block' }}
              >
                Contact
              </HeaderLink>
            </div>
          )}
        </>

        <HeaderIcons>
          <NavIcon onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <i className="fas fa-search"></i>
          </NavIcon>
          {user ? (
            <div 
              className="relative"
              onMouseEnter={() => {
                if (dropdownTimeout) clearTimeout(dropdownTimeout);
                setIsDropdownOpen(true);
              }}
              onMouseLeave={() => {
                // Set a timeout to close the dropdown, allowing time to move to it
                const timeout = setTimeout(() => {
                  setIsDropdownOpen(false);
                }, 200); // 200ms delay to allow moving to dropdown
                setDropdownTimeout(timeout);
              }}
              style={{ display: 'inline-block', position: 'relative' }}
            >
              <NavIcon 
                onClick={() => setIsAccountModalOpen(true)}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Account"
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
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 1000,
                  minWidth: '160px',
                  padding: '5px 0',
                  marginTop: '5px'
                }}
              >
                <div 
                  className="dropdown-item"
                  style={{
                    padding: '10px 15px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                  onClick={() => {
                    navigate('/account');
                    setIsDropdownOpen(false);
                  }}
                >
                  View Account
                </div>
                {(user.role === 'admin' || user.role === 'moderator') && (
                  <div 
                    className="dropdown-item"
                    style={{
                      padding: '10px 15px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                    onClick={() => {
                      navigate('/moderator');
                      setIsDropdownOpen(false);
                    }}
                  >
                    Moderator
                  </div>
                )}
                <div 
                  className="dropdown-item"
                  style={{
                    padding: '10px 15px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => {
                    handleLogout();
                    setIsDropdownOpen(false);
                  }}
                >
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <NavIcon onClick={handleGoogleSignIn}>
              <i className="fas fa-user"></i>
            </NavIcon>
          )}
          {user && (
            <div style={{ position: 'relative' }}>
              <NavIcon onClick={() => navigate('/cart')}>
                <i className="fas fa-shopping-cart"></i>
              </NavIcon>
              {cartItems.length > 0 && <CartCount>{cartCount}</CartCount>}
            </div>
          )}

          <MobileMenuToggle onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuToggle>
        </HeaderIcons>
      </HeaderContainer>

      {/* Search Below Header */}
      {isSearchOpen && (
        <div
          style={{
            backgroundColor: '#f9fafb',
            padding: '15px 20px',
            borderBottom: '1px solid #e5e7eb',
            zIndex: 999
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              display: 'flex'
            }}
          >
            <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, category..."
                style={{
                  flex: 1,
                  padding: '12px 15px',
                  fontSize: '16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px 0 0 4px',
                  outline: 'none'
                }}
                autoFocus
              />
              <button
                type="submit"
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0 4px 4px 0',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                <i className="fas fa-search"></i>
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                style={{
                  marginLeft: '10px',
                  padding: '12px 15px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Authentication Modal */}
      <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        <AuthForm onClose={closeAuthModal} />
      </Modal>
      
      {/* Account Modal - For logged-in users */}
      {user && (
        <Modal isOpen={isAccountModalOpen} onClose={() => setIsAccountModalOpen(false)}>
          <div className="p-6 bg-white rounded-2xl shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Account Information</h2>
            
            <div className="mb-6 space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-amber-700 font-semibold">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Role:</span> <span className="capitalize">{user.role}</span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Member since:</span> {user.created_at ? new Date(user.created_at).getFullYear() : "N/A"}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium flex-1"
                onClick={() => {
                  navigate("/account");
                  setIsAccountModalOpen(false);
                }}
              >
                View Profile
              </button>
              <button
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg font-medium flex-1"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </Modal>
      )}
    </SharedHeader>
  );
};

export default Header;
