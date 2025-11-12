'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';

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

  const navigate = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };
  
  const { user, cartItems, logout } = useAppContext();
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
            />
          </a>
        </HeaderLogo>
        
        <HeaderMenu style={{ display: isMobileMenuOpen ? 'flex' : 'flex' }}>
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
          {user && (
            <HeaderLink 
              href="#" 
              $active={activePage === 'orders'}
              onClick={(e) => { e.preventDefault(); navigate('/orders'); }}
            >
              Orders
            </HeaderLink>
          )}
          {user && user.role === 'admin' && (
            <HeaderLink 
              href="#" 
              $active={activePage === 'admin'}
              onClick={(e) => { e.preventDefault(); navigate('/admin'); }}
            >
              Admin
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
        
        <HeaderIcons>
          <NavIcon>
            <i className="fas fa-search"></i>
          </NavIcon>
          {user ? (
            <>
              <NavIcon onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
              </NavIcon>
              <UserGreeting>Hi, {user.name}</UserGreeting>
            </>
          ) : (
            <NavIcon onClick={() => navigate('/auth')}>
              <i className="fas fa-user"></i>
            </NavIcon>
          )}
          <div style={{ position: 'relative' }}>
            <NavIcon onClick={() => navigate('/cart')}>
              <i className="fas fa-shopping-cart"></i>
            </NavIcon>
            {cartItems.length > 0 && <CartCount>{cartCount}</CartCount>}
          </div>
          
          <MobileMenuToggle onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuToggle>
        </HeaderIcons>
      </HeaderContainer>
    </SharedHeader>
  );
};

export default Header;