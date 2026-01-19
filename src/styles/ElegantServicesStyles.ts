import styled from 'styled-components';

// Main services container with elegant gradient
export const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

// Services header with elegant styling
export const ServicesHeader = styled.nav`
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

// Services hero section with elegant overlay
export const ServicesHero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
              url('/api/images/product_images%2F1767928400633-5ag0gec9a4i-services-hero.jpg');
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

  .container {
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

// Services content with elegant styling
export const ServicesContent = styled.section`
  padding: 40px 0 80px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }
`;

// Services intro with elegant divider
export const ServicesIntro = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  h2:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 15px auto;
    opacity: 0.7;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
    max-width: 800px;
    margin: 0 auto;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
`;

// Services grid with elegant styling
export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  justify-content: center;
  margin-bottom: 60px;
`;

// Service card with elegant styling
export const ServiceCard = styled.div`
  background-color: white;
  border-radius: 0;
  padding: 50px 30px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #c19a6b, #a8825f);
    transform: scaleX(0);
    transition: transform 0.4s ease;
    z-index: 2;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.9rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    position: relative;
    z-index: 3;
  }

  p {
    color: #666;
    line-height: 1.8;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
    position: relative;
    z-index: 3;
  }
`;

// Service icon with elegant styling
export const ServiceIcon = styled.div`
  font-size: 4rem;
  color: #c19a6b;
  margin-bottom: 25px;
  transition: transform 0.4s ease;
  position: relative;
  z-index: 3;
  
  ${ServiceCard}:hover & {
    transform: translateY(-8px);
  }
`;

// Process section with elegant styling
export const ProcessSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 50px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  h2:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 15px auto;
    opacity: 0.7;
  }
`;

// Process steps grid
export const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
  justify-content: center;
`;

// Process step with elegant styling
export const ProcessStep = styled.div`
  position: relative;
  padding: 30px 20px;
  
  .step-number {
    font-size: 2.5rem;
    font-weight: 600;
    color: #c19a6b;
    margin-bottom: 20px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
  
  h3 {
    font-size: 1.7rem;
    margin-bottom: 15px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
  
  p {
    color: #666;
    line-height: 1.7;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
  }
`;

// CTA section with elegant styling
export const ServicesCTA = styled.section`
  padding: 150px 0;
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
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

  .centered-text {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto 50px;
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

  .btn {
    position: relative;
    overflow: hidden;
    z-index: 1;
    background-color: #c19a6b;
    color: white;
    padding: 22px 60px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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