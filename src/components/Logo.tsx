import React from 'react';

import logoSvg from '../assets/logo.svg';

const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="logo-container">
      <img 
        src={logoSvg} 
        alt="Colour My Space Logo" 
        className="logo-image" 
        onClick={scrollToTop}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default Logo;