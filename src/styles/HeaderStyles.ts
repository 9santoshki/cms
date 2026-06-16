// Header styles
import styled from 'styled-components';

// Shared header styles
export const SharedHeader = styled.header`
  background-color: rgba(255, 255, 255, 0.95);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 12px 0;
  font-family: 'Playfair Display', serif;
  transition: all 0.4s ease;
  border-bottom: 1px solid rgba(193, 154, 107, 0.1);
  width: 100%;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);

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
  min-width: 44px;
  min-height: 44px;
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
    padding: 8px;
    min-width: 44px;
    min-height: 44px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 8px;
    min-width: 44px;
    min-height: 44px;
  }

  @media (max-width: 360px) {
    font-size: 15px;
    padding: 6px;
    min-width: 44px;
    min-height: 44px;
  }
`;

export const MobileMenuToggle = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  flex-shrink: 0;
  min-width: 44px;
  min-height: 44px;
  border-radius: 4px;
  transition: background 0.2s ease;
  touch-action: manipulation;

  @media (max-width: 1200px) {
    display: flex;
  }

  &:hover {
    background: rgba(193, 154, 107, 0.1);
  }

  &:active {
    background: rgba(193, 154, 107, 0.2);
  }

  span {
    width: 22px;
    height: 2.5px;
    background-color: #333;
    margin: 3px 0;
    transition: all 0.3s ease;
    border-radius: 2px;

    @media (max-width: 480px) {
      width: 20px;
      height: 2px;
      margin: 2.5px 0;
    }
  }
`;