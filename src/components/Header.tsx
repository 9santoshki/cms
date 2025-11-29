'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { SharedHeader, HeaderContainer, HeaderLogo, HeaderMenu, HeaderLink, HeaderIcons, CartCount, UserGreeting, NavIcon, MobileMenuToggle } from '../styles/HeaderStyles';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';

interface SharedHeaderProps {
  activePage?: string;
}

const Header: React.FC<SharedHeaderProps> = ({ activePage = '' }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle search
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
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

        {/* Desktop Menu - Hidden on mobile via CSS */}
        <NavLinks activePage={activePage} onNavigate={navigate} />

        <HeaderIcons>
          <button 
            onClick={toggleSearch}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#333' }}
          >
            <i className="fas fa-search"></i>
          </button>

          {/* User Menu - Cart, User Account, and Auth Modal */}
          <UserMenu onNavigate={navigate} />

          {/* Mobile Menu Toggle - Shown on mobile only via CSS */}
          <MobileMenuToggle onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuToggle>
        </HeaderIcons>
      </HeaderContainer>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onNavigate={navigate}
        activePage={activePage}
      />

      {/* Search Bar */}
      <SearchBar isOpen={isSearchOpen} onToggle={toggleSearch} />
    </SharedHeader>
  );
};

export default Header;