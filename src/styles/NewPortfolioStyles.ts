import styled from 'styled-components';

// Main portfolio container with elegant gradient
export const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

// Header section with elegant styling
export const PortfolioHeader = styled.header`
  background-color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;
  border-bottom: 1px solid rgba(193, 154, 107, 0.1);

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .nav-logo {
    display: flex;
    align-items: center;
  }

  .logo-image {
    height: 65px;
    max-height: 65px;
    object-fit: contain;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }

  .nav-menu {
    display: flex;
    gap: 35px;
  }

  .nav-link {
    text-decoration: none;
    color: #333;
    font-weight: 400;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: color 0.3s ease;
    position: relative;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;

    &.active, &:hover {
      color: #c19a6b;
    }

    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background: linear-gradient(to right, #c19a6b, transparent);
      transition: width 0.4s ease;
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      right: 0;
      background: linear-gradient(to left, #c19a6b, transparent);
      transition: width 0.4s ease;
    }

    &:hover::before {
      width: 100%;
    }

    &:hover::after {
      width: 100%;
    }

    &.active::before, &.active::after {
      width: 100%;
    }
  }

  .nav-icons {
    display: flex;
    gap: 20px;
  }

  .nav-icon {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #333;
    transition: all 0.3s ease;
    position: relative;
    padding: 8px;
    border-radius: 4px;
    
    &:hover {
      color: #c19a6b;
      background-color: rgba(193, 154, 107, 0.08);
      transform: translateY(-2px);
    }
  }

  .cart-count {
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
  }

  .user-greeting {
    color: #333;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 15px;
    margin: 0 10px;
    font-weight: 500;
    text-align: right;
  }

  @media (max-width: 768px) {
    .nav-menu {
      display: none;
    }
  }
`;

// Hero section with elegant overlay
export const PortfolioHero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
              url('https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927658910-uprpaph78yh-hero-modern-office.jpg');
  background-size: cover;
  background-position: center;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin: 40px 0 20px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(193, 154, 107, 0.1) 0%, transparent 70%);
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 900px;
    padding: 0 20px;
    text-align: center;
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 1.2rem;
    margin: 0;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    height: 40vh;
    
    h1 {
      font-size: 2.2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

// Filter section with elegant styling
export const PortfolioFilter = styled.section`
  padding: 20px 0 40px;
  background-color: white;

  .filter-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    justify-content: center;
  }

  .filter-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    max-width: 1000px;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 14px 28px;
  background-color: ${props => props.$active ? '#c19a6b' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#c19a6b'};
  border: 2px solid #c19a6b;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 16px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin: 0 5px;
  border-radius: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%);
    transition: 0.6s;
  }

  &:hover {
    background-color: #c19a6b;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(193, 154, 107, 0.4);
    
    &::before {
      transform: translateX(100%);
    }
  }

  ${props => props.$active && `
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(193, 154, 107, 0.4);
  `}
`;

// Portfolio grid with elegant styling
export const PortfolioGrid = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

  .projects-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 50px;
    justify-content: center;
  }

  .no-projects {
    text-align: center;
    padding: 80px 20px;
    
    h3 {
      font-size: 2rem;
      color: #666;
      margin: 0;
      font-family: var(--font-playfair), 'Playfair Display', serif;
    }
  }
`;

// Project card with elegant styling
export const ProjectCard = styled.div`
  position: relative;
  height: 450px;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 50px -20px rgba(0, 0, 0, 0.3);
  }
`;

export const ProjectImage = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageClass'].includes(prop),
})<{ imageClass: string }>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;

  ${props => props.imageClass === 'modern' && `
    background-image: url('https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927656951-4l8ihxmzbpv-portfolio-modern.jpg');
  `}

  ${props => props.imageClass === 'classic' && `
    background-image: url('https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927752411-djoibj8v0mv-portfolio-classic.jpg');
  `}

  ${props => props.imageClass === 'coastal' && `
    background-image: url('https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927657557-5gupsrfjnxk-portfolio-coastal.jpg');
  `}

  ${props => props.imageClass === 'office' && `
    background-image: url('https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927752946-qy6cbzlqq8-portfolio-office.jpg');
  `}

  ${props => props.imageClass === 'hotel' && `
    background-image: url('https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927658162-r7b41efd26-portfolio-hotel.jpg');
  `}

  ${props => props.imageClass === 'restaurant' && `
    background-image: url('https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927658512-sle3q538dgl-portfolio-restaurant.jpg');
  `}
  
  ${ProjectCard}:hover & {
    transform: scale(1.08);
  }
`;

export const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
  opacity: 0;
  transition: opacity 0.4s ease;
  box-sizing: border-box;
  overflow: hidden;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

export const ProjectInfo = styled.div`
  color: white;
  width: 100%;
  max-width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ProjectCategory = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: linear-gradient(135deg, #c19a6b, #a8825f);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0;
  font-weight: 500;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

export const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: white;
  font-weight: 400;
  font-family: var(--font-playfair), 'Playfair Display', serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.3;
`;

export const ProjectDescription = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
  color: #ddd;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  display: none;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  ${ProjectCard}:hover & {
    display: block;
  }
`;

export const ProjectButton = styled.button`
  width: auto;
  min-width: 180px;
  padding: 12px 30px;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  position: relative;
  overflow: hidden;
  font-size: 14px;
  margin: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%);
    transition: 0.6s;
    z-index: -1;
  }

  &:hover {
    color: #222;
    background-color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    
    &::after {
      transform: translateX(100%);
    }
  }
`;

// Call to action section with elegant styling
export const PortfolioCTA = styled.section`
  padding: 150px 0;
  background: linear-gradient(135deg, #222 0%, #333 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(193, 154, 107, 0.1) 0, transparent 70%);
    z-index: 0;
  }

  .cta-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }

  h2 {
    font-size: 3.5rem;
    margin-bottom: 30px;
    color: white;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  p {
    font-size: 1.4rem;
    margin-bottom: 50px;
    color: #ddd;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    line-height: 1.9;
    letter-spacing: 0.5px;
  }

  .cta-button {
    padding: 22px 60px;
    background-color: #c19a6b;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(193, 154, 107, 0.4);
    display: inline-block;
    margin: 0 auto;
    border-radius: 0;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: 0.8s;
      z-index: -1;
    }

    &:hover {
      background-color: #a8825f;
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(193, 154, 107, 0.6);
      
      &::before {
        left: 100%;
      }
    }
  }
`;

// Loading spinner
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 5px solid rgba(193, 154, 107, 0.2);
    border-top: 5px solid #c19a6b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;