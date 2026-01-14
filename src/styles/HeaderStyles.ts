// Header styles
import styled from 'styled-components';

// Shared header styles
export const SharedHeader = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;
  font-family: 'Playfair Display', serif;
  transition: all 0.4s ease;
  border-bottom: 1px solid rgba(193, 154, 107, 0.1);
  width: 100%;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 992px) {
    padding: 0 20px;
    gap: 12px;
  }

  @media (max-width: 768px) {
    padding: 0 10px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    padding: 0 8px;
    gap: 6px;
  }
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: fit-content;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    opacity: 1 !important;
    color: inherit !important;
    -webkit-tap-highlight-color: transparent;

    &:hover,
    &:active,
    &:focus,
    &:visited {
      opacity: 1 !important;
      color: inherit !important;
      filter: none !important;
    }
  }

  .logo-image {
    height: 55px;
    max-height: 55px;
    object-fit: contain;
    transition: transform 0.3s ease;
    opacity: 1 !important;
    filter: none !important;

    &:hover,
    &:active,
    &:focus {
      transform: scale(1.02);
      opacity: 1 !important;
      filter: none !important;
    }

    @media (max-width: 768px) {
      height: 45px;
      max-height: 45px;
    }

    @media (max-width: 480px) {
      height: 38px;
      max-height: 38px;
    }
  }
`;

export const HeaderMenu = styled.div`
  display: flex;
  gap: 35px;
  flex: 1;
  justify-content: center;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1200px) {
    gap: 25px;
  }

  @media (max-width: 1024px) {
    gap: 15px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const HeaderLink = styled.a<{ $active?: boolean }>`
  text-decoration: none;
  color: ${props => props.$active ? '#c19a6b' : '#333'};
  font-weight: 400;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  transition: all 0.3s ease;
  position: relative;
  padding: 10px 0;
  display: inline-block;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    font-size: 12px;
    letter-spacing: 1px;
  }

  @media (max-width: 1024px) {
    font-size: 11px;
    letter-spacing: 0.5px;
    padding: 8px 0;
  }

  &:hover {
    color: #c19a6b;
  }

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, #c19a6b, transparent);
    transition: width 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    bottom: 0;
    right: 0;
    background: linear-gradient(to left, #c19a6b, transparent);
    transition: width 0.4s ease;
  }

  &:hover::before {
    width: 100%;
  }

  &::after {
    ${props => props.$active && `
      width: 100%;
    `}
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

export const HeaderIcons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-shrink: 0;
  min-width: fit-content;

  @media (max-width: 992px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }

  @media (max-width: 360px) {
    gap: 2px;
  }
`;

export const CartCount = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, #c19a6b, #a8825f);
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(193, 154, 107, 0.3);

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
    font-size: 10px;
    top: -8px;
    right: -8px;
  }

  @media (max-width: 360px) {
    width: 16px;
    height: 16px;
    font-size: 9px;
    top: -6px;
    right: -6px;
  }
`;

export const UserGreeting = styled.span`
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  margin: 0 10px;
  font-weight: 500;
  text-align: right;
`;

export const NavIcon = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  transition: all 0.3s ease;
  position: relative;
  padding: 8px;
  border-radius: 4px;
  flex-shrink: 0;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #c19a6b;
    background-color: rgba(193, 154, 107, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 5px;
    min-width: 32px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 4px;
    min-width: 28px;
  }

  @media (max-width: 360px) {
    font-size: 15px;
    padding: 3px;
    min-width: 26px;
  }
`;

export const MobileMenuToggle = styled.button`
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: flex;
  }

  @media (max-width: 480px) {
    padding: 3px;
  }

  span {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;

    @media (max-width: 480px) {
      width: 20px;
      height: 2.5px;
      margin: 2.5px 0;
    }

    @media (max-width: 360px) {
      width: 18px;
      height: 2px;
      margin: 2px 0;
    }
  }
`;