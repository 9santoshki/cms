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
  console.log('🔍 UserMenu - Current user:', user);
  console.log('🔍 UserMenu - User avatar:', user?.avatar);
  console.log('🔍 UserMenu - Has avatar:', !!user?.avatar);
  console.log('🔍 UserMenu - Cart count:', cartCount);
  console.log('🔍 UserMenu - User exists:', !!user);
  
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

  // Listen for showLoginModal event (triggered when user tries to add to cart without logging in)
  useEffect(() => {
    const handleShowLoginModal = () => {
      console.log('🔑 Login required: User tried to add item to cart');
      setIsAuthModalOpen(true);
    };

    window.addEventListener('showLoginModal', handleShowLoginModal);
    return () => {
      window.removeEventListener('showLoginModal', handleShowLoginModal);
    };
  }, []);

  // Process pending cart action after successful login
  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      const pendingAction = localStorage.getItem('pendingCartAction');
      if (pendingAction) {
        try {
          const { product, quantity } = JSON.parse(pendingAction);
          console.log('🛒 Processing pending cart action after login:', product.name);

          // Add the item to cart
          import('@/store/cartStore').then((module) => {
            module.useCartStore.getState().addItem({
              id: Date.now(),
              product_id: product.id,
              quantity: quantity || 1,
              name: product.name,
              price: product.price,
              image_url: product.primary_image || product.image_url,
            });
            console.log('✅ Item added to cart after login');
          });

          // Clear the pending action
          localStorage.removeItem('pendingCartAction');
        } catch (error) {
          console.error('Error processing pending cart action:', error);
        }
      }
    }
  }, [user]);
const renderUserAccountIcon = () => {
  if (user) {
    return (
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flexShrink: 0 }} ref={dropdownRef}>
        <NavIcon onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0 }}>
          {user.avatar ? (
            <img
              src={user.avatar}
              style={{
                width: '24px',
                height: '24px',
                display: 'block',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
              className="user-avatar-icon"
              alt="avatar"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => {
                console.error('Avatar failed to load:', user.avatar);
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <i className="fas fa-user"></i>
          )}
        </NavIcon>

        {/* Dropdown - positioned absolutely, won't affect header height */}
        {isDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              width: '280px',
              backgroundColor: 'white',
              border: '1px solid #e8d5c4',
              boxShadow: '0 10px 30px rgba(193, 154, 107, 0.15)',
              zIndex: 9999,
              overflow: 'hidden',
              animation: 'slideDown 0.2s ease-out'
            }}
          >
            <style jsx>{`
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>

            {/* User Header */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '20px',
                background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)',
                borderBottom: '1px solid #e8d5c4'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '2px solid white',
                      objectFit: 'cover',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      console.error('Dropdown avatar failed to load:', user.avatar);
                      const parent = e.currentTarget.parentElement;
                      e.currentTarget.style.display = 'none';
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.style.cssText = 'width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg, #e8d5c4, #c19a6b);color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:400;box-shadow:0 2px 8px rgba(0,0,0,0.1);font-family:var(--font-playfair),"Playfair Display",serif';
                        fallback.textContent = user.name?.charAt(0)?.toUpperCase() || 'U';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e8d5c4, #c19a6b)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '400',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    fontFamily: 'var(--font-playfair), "Playfair Display", serif'
                  }}>
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontWeight: '600',
                    color: '#222',
                    fontSize: '15px',
                    marginBottom: '3px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                  }}>
                    {user.name}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#666',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                  }}>
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Role Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px 14px',
                fontSize: '10px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: user.role === 'admin' ? '#991b1b' : user.role === 'moderator' ? '#92400e' : '#065f46',
                background: user.role === 'admin' ? '#fee2e2' : user.role === 'moderator' ? '#fef3c7' : '#d1fae5',
                border: `1px solid ${user.role === 'admin' ? '#fecaca' : user.role === 'moderator' ? '#fde68a' : '#a7f3d0'}`,
                fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                alignSelf: 'flex-start'
              }}>
                {user.role}
              </div>
            </div>

            {/* Menu Items */}
            <div style={{ padding: '8px 0' }}>
              <button
                onClick={() => { onNavigate("/account"); setIsDropdownOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 20px',
                  fontSize: '14px',
                  color: '#333',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(193, 154, 107, 0.08)';
                  e.currentTarget.style.color = '#c19a6b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#333';
                }}
              >
                <i className="fas fa-user-circle" style={{ width: '18px', textAlign: 'center', color: '#c19a6b' }}></i>
                <span>Account Settings</span>
              </button>

              <button
                onClick={() => { onNavigate("/orders"); setIsDropdownOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 20px',
                  fontSize: '14px',
                  color: '#333',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(193, 154, 107, 0.08)';
                  e.currentTarget.style.color = '#c19a6b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#333';
                }}
              >
                <i className="fas fa-history" style={{ width: '18px', textAlign: 'center', color: '#c19a6b' }}></i>
                <span>Order History</span>
              </button>

              {(user.role === "admin" || user.role === "moderator") && (
                <>
                  <div style={{ height: '1px', background: '#f0f0f0', margin: '8px 20px' }}></div>
                  <button
                    onClick={() => { onNavigate("/dashboard"); setIsDropdownOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      padding: '12px 20px',
                      fontSize: '14px',
                      color: '#333',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(193, 154, 107, 0.08)';
                      e.currentTarget.style.color = '#c19a6b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#333';
                    }}
                  >
                    <i className="fas fa-tachometer-alt" style={{ width: '18px', textAlign: 'center', color: '#c19a6b' }}></i>
                    <span>Admin Dashboard</span>
                  </button>
                </>
              )}

              <div style={{ height: '1px', background: '#f0f0f0', margin: '8px 20px' }}></div>

              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 20px',
                  fontSize: '14px',
                  color: '#dc2626',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(220, 38, 38, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <i className="fas fa-sign-out-alt" style={{ width: '18px', textAlign: 'center', color: '#dc2626' }}></i>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // NOT LOGGED IN
  return (
    <NavIcon onClick={() => setIsAuthModalOpen(true)}>
      <i className="fas fa-user text-xl"></i>
    </NavIcon>
  );
};

  return (
    <>
      <style jsx>{`
        .user-avatar-icon {
          width: 24px;
          height: 24px;
          display: block;
        }

        @media (max-width: 480px) {
          .user-avatar-icon {
            width: 20px !important;
            height: 20px !important;
          }
        }

        @media (max-width: 360px) {
          .user-avatar-icon {
            width: 18px !important;
            height: 18px !important;
          }
        }
      `}</style>

      {/* Cart Icon - Only visible for logged-in users */}
      {user && (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <NavIcon onClick={() => onNavigate('/cart')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0 }}>
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
          <LoginModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
        </div>
      )}
    </>
  );
};

export default UserMenu;