'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { SharedHeader, HeaderContainer, HeaderLogo, HeaderIcons, CartCount, NavIcon, MobileMenuToggle } from '../styles/HeaderStyles';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import CategoryNav from './CategoryNav';

interface SharedHeaderProps {
  activePage?: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

const Header: React.FC<SharedHeaderProps> = ({ activePage = '' }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Check if we should show category nav (not on dashboard pages)
  const showCategoryNav = !activePage.includes('dashboard') &&
                          !activePage.includes('account') &&
                          activePage !== 'checkout';

  return (
    <>
      {/* Main Header */}
      <SharedHeader>
        <HeaderContainer>
          <HeaderLogo>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              <img
                src="/logo.svg"
                alt="Colour My Space Logo"
                className="logo-image"
              />
            </a>
          </HeaderLogo>

          {/* Search, Cart, User Icons */}
          <HeaderIcons>
            {/* Language Selector — hidden on mobile (accessible via hamburger menu) */}
            <div ref={langDropdownRef} style={{ position: 'relative', flexShrink: 0 }} className="lang-selector">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: '#333',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '4px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <span style={{ fontSize: '16px' }}>
                  {languages.find(l => l.code === language)?.flag}
                </span>
                <span style={{ fontWeight: '500' }}>
                  {languages.find(l => l.code === language)?.code.toUpperCase()}
                </span>
                <i className="fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
              </button>

              {/* Language Dropdown */}
              {isLangDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 1000,
                  minWidth: '160px',
                  padding: '8px 0',
                }}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: language === lang.code ? '#f5f5f5' : 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '14px',
                        color: '#333',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                      onMouseLeave={(e) => e.currentTarget.style.background = language === lang.code ? '#f5f5f5' : 'none'}
                    >
                      <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                      <span style={{ fontWeight: language === lang.code ? '600' : '400' }}>
                        {lang.name}
                      </span>
                    </button>
                  ))}
                  {/* Helper note */}
                  <div style={{
                    padding: '8px 16px',
                    fontSize: '11px',
                    color: '#888',
                    borderTop: '1px solid #eee',
                    marginTop: '4px',
                  }}>
                    Browser will translate automatically
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={toggleSearch}
              className="search-btn"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#333',
                padding: '8px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="fas fa-search"></i>
            </button>

            <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <UserMenu onNavigate={navigate} />
            </div>

            <MobileMenuToggle onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </MobileMenuToggle>
          </HeaderIcons>

          <style jsx>{`
            @media (max-width: 1200px) {
              .lang-selector {
                display: none;
              }
              .search-btn {
                display: none;
              }
              .desktop-only {
                display: none;
              }
            }
          `}</style>
        </HeaderContainer>
      </SharedHeader>

      {/* Category Navigation Bar (below main header) */}
      {showCategoryNav && <CategoryNav activeCategory={activePage} />}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Search Bar */}
      <SearchBar isOpen={isSearchOpen} onToggle={toggleSearch} />
    </>
  );
};

export default Header;