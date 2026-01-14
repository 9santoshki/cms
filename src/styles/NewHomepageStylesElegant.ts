import styled from 'styled-components';

// Main homepage container with elegant gradient
export const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  position: relative;
  overflow-x: hidden;
`;

// Main hero section with elegant overlay
export const MainHero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927658910-uprpaph78yh-hero-modern-office.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  position: relative;
  margin-top: 0px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(193, 154, 107, 0.15) 0%, rgba(168, 130, 95, 0.1) 100%);
    z-index: 0;
  }
  
  > div {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    padding: 0 20px;
  }

  h1 {
    font-size: 4.8rem;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-weight: 300;
    line-height: 1.1;
    margin-top: -40px;
  }
  
  p {
    font-size: 1.4rem;
    margin-bottom: 40px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  
  .btn {
    padding: 16px 45px;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.4s ease;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-weight: 600;
    
    &.primary {
      background: #c19a6b;
      color: white;
      border-color: #c19a6b;
      
      &:hover {
        background: transparent;
        color: white;
        border-color: white;
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      }
    }
    
    &.secondary {
      background: transparent;
      color: white;
      border-color: white;
      
      &:hover {
        background: #c19a6b;
        color: white;
        border-color: #c19a6b;
        transform: translateY(-3px);
      }
    }
  }
`;

// Section header
export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 0 20px;
  
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #2c2c2c;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-weight: 400;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    color: #666;
    max-width: 800px;
    margin: 0 auto;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    line-height: 1.8;
  }
`;

// Featured section
export const FeaturedSection = styled.section`
  padding: 30px 40px 40px;
  background: #fafafa;
  position: relative;

  @media (max-width: 768px) {
    padding: 30px 20px 40px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c19a6b, transparent);
  }
  
  .section-footer {
    text-align: center;
    margin-top: 30px;
    
    .btn {
      padding: 16px 45px;
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border: 2px solid #c19a6b;
      background: transparent;
      color: #c19a6b;
      cursor: pointer;
      transition: all 0.4s ease;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      font-weight: 600;
      
      &:hover {
        background: #c19a6b;
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(193, 154, 107, 0.3);
      }
    }
  }
`;

// Products grid
export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Product card
export const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.4s ease;
  height: 100%;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
`;

// Product image container
export const ProductImage = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageClass', 'imageUrl'].includes(prop),
})<{ imageClass?: string; imageUrl?: string }>`
  height: 250px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;  /* Changed from #f0f0f0 to allow background image to show */
  
  /* Handle specific imageClass values */
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
  
  /* Handle imageUrl if provided */
  ${props => props.imageUrl ? `background-image: url('${props.imageUrl}');` : ''}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
  }
  
  .add-to-cart-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 2;
    
    .btn {
      padding: 12px 25px;
      font-size: 0.9rem;
    }
  }
  
  &:hover .add-to-cart-overlay {
    opacity: 1;
  }
`;

// Product info
export const ProductInfo = styled.div`
  padding: 25px;
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #2c2c2c;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-weight: 400;
  }
  
  p {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .product-actions {
    display: flex;
    gap: 10px;
    
    .btn {
      flex: 1;
      padding: 10px;
      font-size: 0.85rem;
    }
  }
`;

// Product price
export const ProductPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #c19a6b;
  margin-bottom: 15px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

// Portfolio section
export const PortfolioSection = styled.section`
  padding: 30px 0 40px;
  background: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c19a6b, transparent);
  }
  
  .section-footer {
    text-align: center;
    margin-top: 30px;
    
    .btn {
      padding: 16px 45px;
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border: 2px solid #c19a6b;
      background: transparent;
      color: #c19a6b;
      cursor: pointer;
      transition: all 0.4s ease;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      font-weight: 600;
      
      &:hover {
        background: #c19a6b;
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(193, 154, 107, 0.3);
      }
    }
  }
`;

// Portfolio grid
export const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Define the custom props type
interface PortfolioCardProps {
  className?: string;
  imageClass?: string;
}

// Portfolio card
export const PortfolioCard = styled.div.withConfig({
  shouldForwardProp: (prop) => !['className', 'imageClass'].includes(prop),
})<PortfolioCardProps>`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 250px;
  background-size: cover;
  background-position: center;
  z-index: 1;
  transition: opacity 0.4s ease;
  
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
    transition: opacity 0.4s ease;
  }
  
  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    z-index: 2;
    opacity: 1;
    transition: opacity 0.4s ease;
    background: linear-gradient(135deg, rgba(193, 154, 107, 0.4) 0%, rgba(168, 130, 95, 0.5) 100%);
  }
  
  &:hover .project-overlay {
    opacity: 1;
  }
  
  .project-content {
    text-align: center;
    color: black;  /* Changed from white to black for better readability on lighter backgrounds */
    max-width: 80%;
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: 8px;
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-weight: 400;
      letter-spacing: 1px;
    }
    
    p {
      font-size: 1rem;
      margin-bottom: 15px;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      line-height: 1.6;
    }
  }
`;

// Services section
export const ServicesSection = styled.section`
  padding: 30px 0 40px;
  background: linear-gradient(to bottom, #ffffff 0%, #fafafa 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c19a6b, transparent);
  }
`;

// Services grid
export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Service card
export const ServiceCard = styled.div`
  text-align: center;
  padding: 30px 20px 25px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  border: none;
  position: relative;
  z-index: 1;
  min-height: 250px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(193,154,107,0.02) 0%, rgba(193,154,107,0.04) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
    
    &::before {
      opacity: 1;
    }
  }
  
  h3 {
    color: #2c2c2c;
    font-size: 1.3rem;
    margin-bottom: 10px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-weight: 400;
    line-height: 1.3;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0;
    line-height: 1.5;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
`;

// Service icon
export const ServiceIcon = styled.div`
  font-size: 2.5rem;
  color: #c19a6b;
  transition: transform 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: rgba(193, 154, 107, 0.1);
  border-radius: 50%;
  margin: 0 auto 15px;
  
  ${ServiceCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: rgba(193, 154, 107, 0.15);
  }
`;

// Testimonials section
export const TestimonialsSection = styled.section`
  padding: 30px 0 40px;
  background: #ffffff;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c19a6b, transparent);
  }
`;

// Testimonials grid
export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 35px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Testimonial card
export const TestimonialCard = styled.div`
  background: white;
  padding: 45px 35px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: none;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
  
  .rating {
    font-size: 1.3rem;
    color: #ffc107;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .testimonial-text {
    font-style: italic;
    color: #555;
    margin-bottom: 25px;
    line-height: 1.8;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 1.05rem;
    position: relative;
    padding: 0 15px;
    
    &::before {
      content: open-quote;
      font-size: 3.5rem;
      color: rgba(193, 154, 107, 0.15);
      position: absolute;
      top: -20px;
      left: -10px;
      font-family: serif;
      line-height: 1;
    }
  }
  
  .customer-name {
    text-align: right;
    font-weight: 600;
    color: #222;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 1.1rem;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      right: 0;
      bottom: -10px;
      width: 50px;
      height: 2px;
      background: #c19a6b;
    }
  }
`;

// Consultation section
export const ConsultationSection = styled.section`
  padding: 30px 0;
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
  text-align: center;
  color: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #c19a6b, transparent);
  }
  
  h2 {
    font-size: 2.8rem;
    margin-bottom: 20px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-weight: 300;
    letter-spacing: 1px;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 40px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-weight: 300;
    line-height: 1.8;
    opacity: 0.9;
  }
  
  .btn {
    padding: 16px 45px;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 2px solid #c19a6b;
    background: transparent;
    color: #fff;
    cursor: pointer;
    transition: all 0.4s ease;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-weight: 500;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: 0.5s;
    }
    
    &:hover {
      background: #c19a6b;
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(193, 154, 107, 0.3);
      
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