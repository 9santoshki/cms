'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, description }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) {
    return null;
  }

  const isAdmin = user.role === 'admin';
  const isModerator = user.role === 'moderator';
  const canModerate = isAdmin || isModerator;

  const menuItems = [
    { icon: 'fas fa-tachometer-alt', label: 'Overview', href: '/dashboard' },
    { icon: 'fas fa-box', label: 'Products', href: '/dashboard/products', show: isAdmin },
    { icon: 'fas fa-shopping-bag', label: 'Orders', href: '/dashboard/orders', show: true },
    { icon: 'fas fa-calendar-check', label: 'Appointments', href: '/dashboard/appointments', show: true },
    { icon: 'fas fa-star', label: 'Reviews', href: '/dashboard/reviews', show: canModerate },
    { icon: 'fas fa-users', label: 'Users', href: '/dashboard/users', show: isAdmin },
    { icon: 'fas fa-cog', label: 'Settings', href: '/dashboard/settings', show: isAdmin },
  ].filter(item => item.show !== false);

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .dashboard-header-title {
            display: none !important;
          }
          .dashboard-header-divider {
            display: none !important;
          }
          .dashboard-sidebar {
            position: fixed !important;
            top: 72px !important;
            left: ${mobileMenuOpen ? '0' : '-100%'} !important;
            width: 280px !important;
            height: calc(100vh - 72px) !important;
            z-index: 999 !important;
            transition: left 0.3s ease !important;
            overflow-y: auto !important;
            background: white !important;
            padding: 16px !important;
          }
          .dashboard-content-wrapper {
            flex-direction: column !important;
            padding: 16px 12px !important;
          }
          .dashboard-content {
            width: 100% !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
          .user-info-text {
            display: none !important;
          }
          .dashboard-title {
            font-size: 24px !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-button {
            display: none !important;
          }
          .mobile-overlay {
            display: none !important;
          }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)',
        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderBottom: '1px solid #e8d5c4',
          boxShadow: '0 2px 8px rgba(193, 154, 107, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 16px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Mobile Menu Button */}
              <button
                className="mobile-menu-button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#c19a6b',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
              </button>

              <Link href="/" style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#c19a6b',
                textDecoration: 'none',
                fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                letterSpacing: '0.5px'
              }}>
                ← Colour My Space
              </Link>
              <div className="dashboard-header-divider" style={{
                width: '1px',
                height: '32px',
                background: '#e8d5c4'
              }}></div>
              <h1 className="dashboard-header-title" style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#333',
                margin: 0,
                letterSpacing: '0.5px'
              }}>
                Admin Dashboard
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                background: 'linear-gradient(135deg, #f8f4f0, #efe9e3)',
                borderRadius: '8px'
              }}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '2px solid #c19a6b'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="user-info-text">
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{user.name}</div>
                  <div style={{
                    fontSize: '11px',
                    color: '#c19a6b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600'
                  }}>
                    {user.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 998
            }}
          />
        )}

        <div className="dashboard-content-wrapper" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '32px 24px',
          display: 'flex',
          gap: '32px'
        }}>
          {/* Sidebar */}
          <div className="dashboard-sidebar" style={{
            width: '260px',
            flexShrink: 0
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
              border: '1px solid #e8d5c4',
              position: 'sticky',
              top: '104px'
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#999',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '12px',
                padding: '0 12px'
              }}>
                Navigation
              </div>
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      marginBottom: '4px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: isActive ? '#c19a6b' : '#666',
                      background: isActive ? 'linear-gradient(135deg, rgba(193, 154, 107, 0.1), rgba(193, 154, 107, 0.05))' : 'transparent',
                      fontWeight: isActive ? '600' : '500',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                      border: isActive ? '1px solid rgba(193, 154, 107, 0.2)' : '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(193, 154, 107, 0.05)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    <i className={item.icon} style={{
                      width: '20px',
                      textAlign: 'center',
                      fontSize: '16px'
                    }}></i>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="dashboard-content" style={{ flex: 1, minWidth: 0 }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 className="dashboard-title" style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#333',
                margin: '0 0 8px 0',
                fontFamily: 'var(--font-playfair), "Playfair Display", serif'
              }}>
                {title}
              </h2>
              {description && (
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  {description}
                </p>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
