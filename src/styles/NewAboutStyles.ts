import styled from 'styled-components';

// Main about container with elegant gradient
export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

// Header section with elegant styling
export const AboutHeader = styled.header`
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
export const AboutHero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
              url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
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

// About content with elegant styling
export const AboutContent = styled.section`
  padding: 40px 0 80px;
  background-color: white;

  .content-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }
`;

// About intro section with elegant divider
export const AboutIntro = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  
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
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    margin-bottom: 20px;
  }
`;

// Founder section with elegant layout
export const FounderSection = styled.div`
  margin: 60px 0;
  
  .founder-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 50px;
    align-items: center;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const FounderImage = styled.div`
  text-align: center;
  
  .image-placeholder {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    border: 1px solid #eee;
    border-radius: 0;
    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
    }
  }
`;

export const FounderInfo = styled.div`
  text-align: left;
  
  h3 {
    font-size: 2.2rem;
    margin-bottom: 15px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
  
  h4 {
    font-size: 1.4rem;
    color: #c19a6b;
    margin-bottom: 30px;
    font-weight: 500;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
  
  p {
    color: #555;
    margin-bottom: 25px;
    line-height: 1.9;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
  }
  
  .awards {
    margin-top: 40px;
  }
  
  .awards h5 {
    font-size: 1.5rem;
    margin: 40px 0 20px 0;
    color: #222;
    font-weight: 500;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    position: relative;
    padding-bottom: 10px;
  }
  
  .awards h5::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: #c19a6b;
  }
  
  .awards ul {
    list-style: none;
    padding: 0;
  }
  
  .awards ul li {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    color: #666;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    position: relative;
    padding-left: 25px;
  }
  
  .awards ul li::before {
    content: '•';
    color: #c19a6b;
    position: absolute;
    left: 0;
    font-size: 1.2rem;
  }
`;

// Philosophy section with elegant grid
export const PhilosophySection = styled.div`
  margin: 60px 0;
  text-align: center;
  
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

export const PhilosophyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const PhilosophyCard = styled.div`
  background-color: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none;
  position: relative;
  z-index: 1;
  padding: 50px 35px;
  text-align: center;

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
    transform: translateY(-12px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
  
  .philosophy-icon {
    font-size: 3.5rem;
    color: #c19a6b;
    margin-bottom: 25px;
    transition: transform 0.4s ease;
  }
  
  &:hover .philosophy-icon {
    transform: translateY(-8px);
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
  
  p {
    color: #666;
    line-height: 1.8;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
  }
`;

// Team section with elegant styling
export const TeamSection = styled.div`
  margin: 60px 0;
  text-align: center;
  
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

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const TeamMember = styled.div`
  background-color: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  border: none;
  text-align: center;
  padding: 40px 30px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  }
  
  .member-image {
    margin-bottom: 30px;
    
    .image-placeholder {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      border: 1px solid #eee;
      border-radius: 0;
      box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
    }
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
  
  h4 {
    font-size: 1.2rem;
    color: #c19a6b;
    margin-bottom: 20px;
    font-weight: 500;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
  
  p {
    color: #666;
    line-height: 1.8;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
  }
`;

// Values section with elegant layout
export const ValuesSection = styled.div`
  margin: 60px 0;
  text-align: center;
  
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

export const ValuesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const ValueItem = styled.div`
  text-align: center;
  padding: 50px 35px;
  background-color: white;
  border-radius: 0;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
    transform: translateY(-12px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
  
  p {
    color: #666;
    line-height: 1.8;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 16px;
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