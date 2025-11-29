'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { HeaderMenu, HeaderLink } from '../styles/HeaderStyles';

interface NavLinksProps {
  activePage?: string;
  onNavigate: (path: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ activePage = '', onNavigate }) => {
  const { user } = useAuth();

  return (
    <HeaderMenu>
      <HeaderLink
        href="#"
        $active={activePage === 'home'}
        onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
      >
        Home
      </HeaderLink>
      <HeaderLink
        href="#"
        $active={activePage === 'shop'}
        onClick={(e) => { e.preventDefault(); onNavigate('/shop'); }}
      >
        Shop
      </HeaderLink>
      <HeaderLink
        href="#"
        $active={activePage === 'portfolio'}
        onClick={(e) => { e.preventDefault(); onNavigate('/portfolio'); }}
      >
        Portfolio
      </HeaderLink>
      <HeaderLink
        href="#"
        $active={activePage === 'services'}
        onClick={(e) => { e.preventDefault(); onNavigate('/services'); }}
      >
        Services
      </HeaderLink>
      <HeaderLink
        href="#"
        $active={activePage === 'booking'}
        onClick={(e) => { e.preventDefault(); onNavigate('/booking'); }}
      >
        Book Consultation
      </HeaderLink>

      {(user && (user.role === 'admin' || user.role === 'moderator')) && (
        <HeaderLink
          href="#"
          $active={activePage === 'dashboard'}
          onClick={(e) => { e.preventDefault(); onNavigate('/dashboard'); }}
        >
          Dashboard
        </HeaderLink>
      )}
      <HeaderLink
        href="#"
        $active={activePage === 'about'}
        onClick={(e) => { e.preventDefault(); onNavigate('/about'); }}
      >
        About
      </HeaderLink>
      <HeaderLink
        href="#"
        $active={activePage === 'contact'}
        onClick={(e) => { e.preventDefault(); onNavigate('/contact'); }}
      >
        Contact
      </HeaderLink>
    </HeaderMenu>
  );
};

export default NavLinks;