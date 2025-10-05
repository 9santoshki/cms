import styled from 'styled-components';
import { theme } from '../styles/theme';

export const StyledHeader = styled.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  font-family: ${theme.fonts.secondary};
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 5%;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
`;

export const HeaderLogo = styled.div`
  flex: 1;
  min-width: 200px;
`;

export const HeaderSearch = styled.div`
  flex: 2;
  min-width: 300px;
  margin: 0 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    order: 3;
    width: 100%;
    margin: 15px 0 0 0;
    flex: none;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 50px 12px 15px;
  border: 1px solid #ddd;
  border-radius: 0;
  font-size: 14px;
  font-family: ${theme.fonts.secondary};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.text};
  cursor: pointer;
  font-size: 18px;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
  justify-content: flex-end;
  min-width: 200px;
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${theme.fonts.secondary};
  font-size: 14px;
  font-weight: 500;
  
  button {
    background: none;
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    padding: 6px 12px;
    cursor: pointer;
    font-family: ${theme.fonts.secondary};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    &:hover {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
    }
  }
`;

export const CartIcon = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  
  i {
    font-size: 18px;
    color: ${theme.colors.text};
    
    &:hover {
      color: ${theme.colors.primary};
    }
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

export const CartText = styled.span`
  font-family: ${theme.fonts.secondary};
  font-size: 12px;
  display: none;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    display: block;
  }
`;

export const HeaderNavigation = styled.div`
  width: 100%;
  background-color: #f8f8f8;
  margin-top: 10px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 5%;
  }
`;

export const MainNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 10px 0;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 15px;
  }
`;

export const StyledNavLink = styled.a<{ isActive?: boolean }>`
  text-decoration: none;
  color: ${theme.colors.text};
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;
  position: relative;
  padding-bottom: 5px;
  
  ${props => props.isActive && `
    color: ${theme.colors.primary};
  `}
  
  &:hover {
    color: ${theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;