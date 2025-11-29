'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { 
  FooterContainer, 
  FooterContent, 
  FooterGrid, 
  FooterColumn, 
  FooterLogo, 
  FooterDescription, 
  SocialIcons, 
  FooterSubsection, 
  FooterHeading, 
  FooterList, 
  FooterListItem, 
  FooterBottom 
} from '../styles/FooterStyles';

const Footer = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterColumn>
            <FooterLogo>Colour My Space</FooterLogo>
            <FooterDescription>
              Creating extraordinary interiors that blend timeless elegance with contemporary functionality. 
              Award-winning design services for residential and commercial spaces.
            </FooterDescription>
            <SocialIcons>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>
                <i className="fab fa-houzz"></i>
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </SocialIcons>
            <FooterSubsection>
              <h4>Awards & Recognition</h4>
              <p>Featured in Architectural Digest, Elle Decor, and House Beautiful</p>
            </FooterSubsection>
          </FooterColumn>
          
          <FooterColumn>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterList>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}>Portfolio</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>Services</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop'); }}>Shop</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact</a>
              </FooterListItem>
            </FooterList>
          </FooterColumn>
          
          <FooterColumn>
            <FooterHeading>Services</FooterHeading>
            <FooterList>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/services#residential'); }}>Residential Design</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/services#commercial'); }}>Commercial Design</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/services#space-planning'); }}>Space Planning</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/services#color-consulting'); }}>Color Consulting</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/services#furniture-design'); }}>Furniture Design</a>
              </FooterListItem>
            </FooterList>
          </FooterColumn>
          
          <FooterColumn>
            <FooterHeading>Shop</FooterHeading>
            <FooterList>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop'); }}>All Products</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop'); }}>New Arrivals</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop'); }}>Best Sellers</a>
              </FooterListItem>
              <FooterListItem>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop'); }}>Sale Items</a>
              </FooterListItem>
              {user && (
                <FooterListItem>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('/orders'); }}>Order History</a>
                </FooterListItem>
              )}
            </FooterList>
          </FooterColumn>
        </FooterGrid>
        
        <FooterBottom>
          <p>&copy; 2023 Colour My Space Interior Design. All rights reserved.</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;