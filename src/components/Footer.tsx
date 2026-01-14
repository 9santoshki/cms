'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  FooterContainer,
  FooterContent,
  FooterMain,
  FooterBrand,
  FooterLogo,
  FooterTagline,
  SocialIcons,
  FooterNav,
  FooterLinks,
  FooterCTA,
  FooterBottom
} from '../styles/FooterStyles';

const Footer = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterMain>
          {/* Brand Section */}
          <FooterBrand>
            <FooterLogo>Colour My Space</FooterLogo>
            <FooterTagline>
              Creating extraordinary interiors with timeless elegance and contemporary functionality.
            </FooterTagline>
            <SocialIcons>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </SocialIcons>
          </FooterBrand>

          {/* Navigation Links */}
          <FooterNav>
            <FooterLinks>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop'); }}>Shop</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}>Portfolio</a>
            </FooterLinks>
            <FooterLinks>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>Services</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact</a>
            </FooterLinks>
          </FooterNav>

          {/* CTA Section */}
          <FooterCTA>
            <p>Ready to transform your space?</p>
            <button onClick={() => navigate('/booking')}>
              Book Consultation
            </button>
          </FooterCTA>
        </FooterMain>

        <FooterBottom>
          <p>&copy; {new Date().getFullYear()} Colour My Space. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); }}>Privacy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); }}>Terms</a>
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
