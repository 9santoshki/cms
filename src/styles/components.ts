import styled from 'styled-components';
import { theme } from './theme';

// Container for main page sections
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.container};
`;

// Button component with different variants
export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'small' | 'small-secondary' }>`
  display: inline-block;
  padding: ${props => props.variant === 'small' || props.variant === 'small-secondary' ? '10px 20px' : '14px 28px'};
  border: ${props => props.variant === 'secondary' ? `2px solid ${theme.colors.white}` : 'none'};
  border-radius: ${theme.borderRadius.none};
  font-size: ${props => props.variant === 'small' || props.variant === 'small-secondary' ? '14px' : '16px'};
  font-weight: 500;
  font-family: ${theme.fonts.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.light};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  background-color: ${props => {
    if (props.variant === 'primary') return theme.colors.primary;
    if (props.variant === 'secondary') return 'rgba(255, 255, 255, 0.15)';
    if (props.variant === 'small-secondary') return 'rgba(255, 255, 255, 0.15)';
    return theme.colors.primary;
  }};
  color: ${props => {
    if (props.variant === 'primary') return theme.colors.white;
    return theme.colors.white;
  }};
  backdrop-filter: ${props => (props.variant === 'secondary' || props.variant === 'small-secondary') ? 'blur(5px)' : 'none'};

  &:hover {
    background-color: ${props => {
      if (props.variant === 'primary') return theme.colors.primaryDark;
      if (props.variant === 'secondary' || props.variant === 'small-secondary') return 'rgba(255, 255, 255, 0.1)';
      return theme.colors.primaryDark;
    }};
    transform: ${props => props.variant?.includes('small') ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.variant === 'primary' ? `0 4px 10px ${theme.colors.primary}50` : theme.shadows.light};
  }
`;

// Navigation bar component
export const Navbar = styled.nav`
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.light};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${theme.zIndex.sticky};
  font-family: ${theme.fonts.secondary};
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.small} 5%;
  max-width: 100%;
`;

export const NavLogo = styled.div`
  > h2 {
    color: ${theme.colors.text};
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 1px;
  }
`;

export const NavMenu = styled.ul<{ $isActive?: boolean }>`
  display: ${props => props.$isActive ? 'flex' : 'none'};
  gap: 30px;
  list-style: none;
  position: ${props => props.$isActive ? 'fixed' : 'static'};
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: white;
  flex-direction: column;
  padding: 20px;
  z-index: 999;
  overflow-y: auto;

  @media (min-width: 768px) {
    position: static;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    background-color: transparent;
    padding: 0;
    overflow-y: visible;
  }
`;

export const NavLink = styled.a<{ $isActive?: boolean }>`
  text-decoration: none;
  color: ${theme.colors.text};
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;
  position: relative;
  padding: 20px 0;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: 0;
  }

  &:hover {
    color: ${theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const NavIcons = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const NavIcon = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${theme.colors.text};
  transition: color 0.3s ease;
  position: relative;
  margin: 0 5px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserGreeting = styled.span`
  color: ${theme.colors.text};
  font-family: ${theme.fonts.secondary};
  font-size: 14px;
  margin: 0 10px;
  font-weight: 500;
`;

export const NavToggle = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
  }
`;

export const Bar = styled.span<{ $isActive?: boolean }>`
  width: 25px;
  height: 3px;
  background-color: ${theme.colors.text};
  margin: 3px 0;
  transition: 0.3s;

  ${props => props.$isActive && `
    &:nth-child(2) {
      opacity: 0;
    }
    
    &:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    
    &:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  `}
`;

// Section components
export const Section = styled.section<{ variant?: 'featured' | 'transform' | 'services' | 'testimonials' | 'consultation' }>`
  padding: ${props => props.variant === 'consultation' ? '100px 0' : props.variant === 'transform' ? '100px 0' : '100px 0'};
  background-color: ${props => {
    if (props.variant === 'featured') return theme.colors.white;
    if (props.variant === 'transform') return '#f8f8f8';
    if (props.variant === 'services') return theme.colors.white;
    if (props.variant === 'testimonials') return '#f8f8f8';
    if (props.variant === 'consultation') return '#222';
    return theme.colors.white;
  }};
  color: ${props => props.variant === 'consultation' ? theme.colors.white : theme.colors.text};

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: ${theme.spacing.xl};
    color: ${props => props.variant === 'consultation' ? theme.colors.white : theme.colors.textDark};
    position: relative;
    font-weight: 400;
    letter-spacing: 2px;

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 2px;
      background-color: ${theme.colors.primary};
      margin: 15px auto;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .section-title {
      font-size: 2rem;
    }
  }
`;

// Product components
export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

export const ProductCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.none};
  overflow: hidden;
  box-shadow: ${theme.shadows.card};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid ${theme.colors.border};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.hover};
  }
`;

export const ProductImage = styled.div<{ imageClass?: string }>`
  height: 300px;
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center;
  
  ${props => props.imageClass === 'modern' && `
    background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${props => props.imageClass === 'classic' && `
    background-image: url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${props => props.imageClass === 'coastal' && `
    background-image: url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
`;

export const ProductInfo = styled.div`
  padding: 25px;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: ${theme.colors.textDark};
    font-weight: 400;
  }

  p {
    color: ${theme.colors.textSecondary};
    margin-bottom: 10px;
    font-family: ${theme.fonts.secondary};
    font-size: 14px;
    letter-spacing: 1px;
  }
`;

export const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin: 10px 0;
`;

// Footer component
export const Footer = styled.footer`
  background-color: #111;
  color: ${theme.colors.white};
  padding: 70px 0 0;
  font-family: ${theme.fonts.secondary};

  .footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    margin-bottom: 50px;
  }

  .footer-col h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: ${theme.colors.primary};
    font-weight: 400;
    letter-spacing: 1px;
  }

  .footer-col h4 {
    font-size: 1.1rem;
    margin-bottom: 20px;
    color: ${theme.colors.white};
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .footer-col p {
    color: #bbb;
    margin-bottom: 20px;
    line-height: 1.8;
    font-size: 14px;
  }

  .social-icons {
    display: flex;
    gap: 15px;
    margin-top: 20px;

    a {
      display: inline-block;
      width: 40px;
      height: 40px;
      background-color: #222;
      border: 1px solid #444;
      border-radius: ${theme.borderRadius.none};
      text-align: center;
      line-height: 40px;
      color: ${theme.colors.white};
      transition: all 0.3s ease;

      &:hover {
        background-color: ${theme.colors.primary};
        transform: translateY(-3px);
        border-color: ${theme.colors.primary};
      }
    }
  }

  .footer-col ul {
    list-style: none;

    li {
      margin-bottom: 12px;

      a {
        color: #bbb;
        text-decoration: none;
        transition: color 0.3s ease;
        font-size: 14px;

        &:hover {
          color: ${theme.colors.primary};
        }
      }
    }
  }

  .footer-bottom {
    text-align: center;
    padding: 20px 0;
    border-top: 1px solid #333;
    color: #777;
    font-size: 14px;
  }
`;

// Loading and error components
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;

  .loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid ${theme.colors.primary};
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  padding: 20px;
`;

// Global styles
export const GlobalStyles = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fonts.primary};
    line-height: 1.6;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
  }
`;