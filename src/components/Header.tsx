import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Logo from './Logo';
import { 
  StyledHeader, 
  HeaderContainer, 
  HeaderLogo, 
  HeaderSearch, 
  SearchForm, 
  SearchInput, 
  SearchButton, 
  HeaderActions, 
  UserMenu, 
  CartIcon, 
  CartCount, 
  CartText, 
  HeaderNavigation, 
  MainNav, 
  StyledNavLink 
} from './HeaderStyles';

interface HeaderProps {
  showSearch?: boolean;
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showSearch = true, showNavigation = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cartItems, logout } = useAppContext();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop page with search query
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    } else if (location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  const viewCart = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <StyledHeader>
      <HeaderContainer>
        {/* Logo */}
        <HeaderLogo>
          <Logo />
        </HeaderLogo>
        {/* Added to force rebuild */}

        {/* Search Bar */}
        {showSearch && (
          <HeaderSearch>
            <SearchForm onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search furniture and home decor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchButton type="submit">
                <i className="fas fa-search"></i>
              </SearchButton>
            </SearchForm>
          </HeaderSearch>
        )}

        {/* User Actions */}
        <HeaderActions>
          <UserMenu>
            {user ? (
              <>
                <span>Hello, {user.name}</span>
                <button onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              <button onClick={() => navigate('/auth')}>
                Sign In
              </button>
            )}
          </UserMenu>

          <CartIcon onClick={viewCart}>
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
            <CartText>Cart</CartText>
          </CartIcon>
        </HeaderActions>
      </HeaderContainer>

      {/* Navigation */}
      {showNavigation && (
        <HeaderNavigation>
          <MainNav>
            <StyledNavLink 
              href="/" 
              isActive={location.pathname === '/'} 
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
            >
              Home
            </StyledNavLink>
            <StyledNavLink 
              href="/shop" 
              isActive={location.pathname === '/shop'} 
              onClick={(e) => { e.preventDefault(); navigate('/shop'); }}
            >
              Shop
            </StyledNavLink>
            <StyledNavLink 
              href="/categories" 
              isActive={location.pathname === '/categories'} 
              onClick={(e) => { e.preventDefault(); navigate('/categories'); }}
            >
              Categories
            </StyledNavLink>
            {user && (
              <StyledNavLink 
                href="/orders" 
                isActive={location.pathname === '/orders'} 
                onClick={(e) => { e.preventDefault(); navigate('/orders'); }}
              >
                Orders
              </StyledNavLink>
            )}
            <StyledNavLink 
              href="#about"
              onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              About
            </StyledNavLink>
            <StyledNavLink 
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Contact
            </StyledNavLink>
          </MainNav>
        </HeaderNavigation>
      )}
    </StyledHeader>
  );
};

export default Header;