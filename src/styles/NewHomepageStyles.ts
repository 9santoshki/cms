import styled from 'styled-components';

// Main homepage container
export const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
  font-family: 'Playfair Display', serif;
`;

// Header section
export const HomepageHeader = styled.nav`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 15px 0;
  font-family: Montserrat, Arial, sans-serif;

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .nav-logo {
    display: flex;
    align-items: center;
  }

  .logo-image {
    height: 60px;
    max-height: 60px;
    object-fit: contain;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .nav-menu {
    display: flex;
    gap: 25px;
  }

  .nav-link {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.3s ease;
    position: relative;
  }

  .nav-link.active, .nav-link:hover {
    color: #c19a6b;
  }

  .nav-link:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #c19a6b;
    transition: width 0.3s ease;
  }

  .nav-link:hover:after {
    width: 100%;
  }

  .nav-icons {
    display: flex;
    gap: 15px;
  }

  .nav-icon {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #333;
    transition: color 0.3s ease;
    position: relative;
  }

  .nav-icon:hover {
    color: #c19a6b;
  }

  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #c19a6b;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-greeting {
    color: #333;
    font-family: Montserrat, Arial, sans-serif;
    font-size: 14px;
    margin: 0 10px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .nav-menu {
      display: none;
    }
  }
`;

// Hero section
export const MainHero = styled.section`
  margin-top: 0;
`;

// Section header with title and footer
export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  
  .section-title {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto 30px;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.7;
    letter-spacing: 0.5px;
  }
`;

export const SectionFooter = styled.div`
  text-align: center;
  margin-top: 60px;
`;

// Portfolio section
export const PortfolioSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #f9f9f9 0%, #f0f0f0 100%);

  .section-header {
    text-align: center;
    margin-bottom: 100px;
  }

  .section-title {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto 30px;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.7;
    letter-spacing: 0.5px;
  }
`;

export const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  justify-content: center;
  max-width: 1300px;
  margin: 0 auto 80px;
  padding: 0 20px;
`;

export const PortfolioCard = styled.div`
  position: relative;
  height: 450px;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  background: #fff;

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.3);
  }

  .project-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease;
    position: absolute;
    top: 0;
    left: 0;
  }

  .project-image.modern {
    background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  }

  .project-image.classic {
    background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  }

  .project-image.coastal {
    background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 30px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover .project-overlay {
    opacity: 1;
  }

  .project-content {
    text-align: left;
    color: white;
    width: 100%;
  }

  .project-content h3 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: white;
    font-weight: 400;
    font-family: 'Playfair Display', serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .project-content p {
    font-size: 1rem;
    margin-bottom: 25px;
    color: #ddd;
    line-height: 1.6;
    font-family: 'Montserrat', sans-serif;
  }

  .btn {
    background: transparent;
    border: 2px solid #c19a6b;
    color: #fff;
    padding: 12px 25px;
    font-size: 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    width: auto;
  }

  .btn:hover {
    background: #c19a6b;
    color: #222;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(193, 154, 107, 0.4);
  }
`;

// Featured section
export const FeaturedSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);

  .section-header {
    text-align: center;
    margin-bottom: 100px;
  }

  .section-title {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto 30px;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.7;
    letter-spacing: 0.5px;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 50px;
  justify-content: center;
  max-width: 1300px;
  margin: 0 auto 80px;
  padding: 0 20px;
`;

export const ProductCard = styled.div`
  background-color: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-align: center;
  border: none;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(193,154,107,0.03) 0%, rgba(193,154,107,0.08) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
`;

export const ProductImage = styled.div<{ imageClass: string }>`
  height: 280px;
  background-color: #f8f8f8;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease;

  ${props => props.imageClass === 'modern' && `
    background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${props => props.imageClass === 'classic' && `
    background-image: url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${props => props.imageClass === 'coastal' && `
    background-image: url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${props => props.imageClass === 'office' && `
    background-image: url('https://images.unsplash.com/photo-1442323822296-a34ce0d5fbc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${props => props.imageClass === 'hotel' && `
    background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  ${props => props.imageClass === 'restaurant' && `
    background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}
  
  &:hover {
    transform: scale(1.03);
  }
`;

export const ProductInfo = styled.div`
  padding: 35px 25px;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #222;
    font-weight: 400;
    font-family: 'Playfair Display', serif;
    text-transform: capitalize;
  }

  p {
    color: #666;
    margin-bottom: 20px;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    letter-spacing: 0.5px;
    line-height: 1.6;
  }
  
  .product-actions {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
`;

export const ProductPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: #c19a6b;
  margin: 15px 0;
  font-family: 'Playfair Display', serif;
`;

// Services section
export const ServicesSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);

  .section-header {
    text-align: center;
    margin-bottom: 100px;
  }

  .section-title {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto 30px;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.7;
    letter-spacing: 0.5px;
  }
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const ServiceCard = styled.div`
  text-align: center;
  padding: 50px 30px;
  background-color: white;
  border-radius: 0;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none;
  position: relative;
  overflow: hidden;
  z-index: 1;

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
    transform: translateY(-10px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: 'Playfair Display', serif;
    position: relative;
    z-index: 3;
  }

  p {
    color: #666;
    line-height: 1.7;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    position: relative;
    z-index: 3;
  }
`;

export const ServiceIcon = styled.div`
  font-size: 3.5rem;
  color: #c19a6b;
  margin-bottom: 25px;
  transition: transform 0.4s ease;
  position: relative;
  z-index: 3;
  
  ${ServiceCard}:hover & {
    transform: translateY(-5px);
  }
`;

// Testimonials section
export const TestimonialsSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #f0f0f0 0%, #f8f8f8 100%);

  .section-header {
    text-align: center;
    margin-bottom: 100px;
  }

  .section-title {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  .section-title:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto 30px;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.7;
    letter-spacing: 0.5px;
  }
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 50px;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const TestimonialCard = styled.div`
  background-color: white;
  padding: 60px 40px 40px;
  border-radius: 0;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: none;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 5rem;
    color: rgba(193, 154, 107, 0.2);
    font-family: 'Playfair Display', serif;
    line-height: 1;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
  }

  .rating {
    color: #c19a6b;
    font-size: 1.8rem;
    margin-bottom: 30px;
    letter-spacing: 3px;
  }

  .testimonial-text {
    font-style: italic;
    color: #555;
    margin-bottom: 30px;
    line-height: 1.8;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.2rem;
    position: relative;
    z-index: 2;
  }

  .customer-name {
    font-weight: 500;
    color: #222;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;

// Consultation section
export const ConsultationSection = styled.section`
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

  .section-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }

  h2 {
    font-size: 3rem;
    margin-bottom: 30px;
    color: white;
    font-family: 'Playfair Display', serif;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 50px;
    color: #ddd;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.8;
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
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.6s;
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

// Loading and error states
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

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #721c24;
  }

  .btn {
    padding: 12px 24px;
  }
`;