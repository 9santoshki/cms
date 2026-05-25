import styled from 'styled-components';

// Main contact container with elegant gradient
export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

// Header section with elegant styling
export const ContactHeader = styled.header`
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
export const ContactHero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
              url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin: 40px 0 0 0;
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
    font-size: 2rem;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 0.9rem;
    margin: 0;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    height: 25vh;

    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;

// Contact content with elegant styling
export const ContactContent = styled.section`
  padding: 40px 0;
  background-color: white;

  .content-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }
`;

// Contact grid layout with elegant spacing
export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Contact information section with elegant styling
export const ContactInfo = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    color: #222;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-align: center;
  }

  h2::after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 8px auto;
  }

  > p {
    color: #555;
    margin-bottom: 20px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.9rem;
    line-height: 1.5;
    text-align: center;
  }

  .contact-details {
    margin-bottom: 20px;
  }

  .contact-item {
    display: flex;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .contact-icon {
    font-size: 1.3rem;
    color: #c19a6b;
    margin-right: 12px;
    min-width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .contact-text h3 {
    font-size: 1rem;
    margin-bottom: 4px;
    color: #222;
    font-weight: 500;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  .contact-text p {
    color: #666;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 0;
  }

  .social-links h3 {
    font-size: 1rem;
    margin-bottom: 12px;
    color: #222;
    font-weight: 500;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  .social-icons {
    display: flex;
    gap: 10px;
    margin-top: 8px;

    .social-icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border: 1px solid #ddd;
      border-radius: 0;
      text-align: center;
      line-height: 32px;
      color: #666;
      transition: all 0.3s ease;
      text-decoration: none;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(120deg, transparent, rgba(193, 154, 107, 0.3), transparent);
        transform: translateX(-100%);
        transition: 0.6s;
      }

      &:hover {
        background: #c19a6b;
        color: white;
        transform: translateY(-3px);
        border-color: #c19a6b;

        &::before {
          transform: translateX(100%);
        }
      }
    }
  }
`;

// Contact form section with elegant styling
export const ContactFormWrapper = styled.div`
  .form-header {
    margin-bottom: 16px;
    text-align: center;
  }

  .form-header h2 {
    font-size: 1.5rem;
    margin-bottom: 8px;
    color: #222;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  .form-header h2::after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 8px auto;
  }

  .form-header p {
    color: #555;
    margin-bottom: 16px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

export const ContactForm = styled.form`
  .btn {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 2px 10px rgba(193, 154, 107, 0.4);
    position: relative;
    overflow: hidden;
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
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(193, 154, 107, 0.6);

      &::before {
        left: 100%;
      }
    }
  }

  .btn.primary {
    background-color: #c19a6b;
    color: white;
  }

  .btn.primary:hover {
    background-color: #a8825f;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 6px rgba(193, 154, 107, 0.2);
  }
`;

export const ContactFormItem = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #333;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 13px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 0;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 14px;
    transition: all 0.3s ease;
    background: #fff;

    &:focus {
      outline: none;
      border-color: #c19a6b;
      box-shadow: 0 0 0 2px rgba(193, 154, 107, 0.2);
    }
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const Alert = styled.div<{ type: 'success' | 'error' }>`
  padding: 12px;
  border-radius: 0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 13px;
  border: 1px solid;
  border-left: 3px solid;

  i {
    margin-right: 10px;
    font-size: 1rem;
  }

  ${props => props.type === 'success' && `
    background-color: #e8f5e9;
    color: #2e7d32;
    border-color: #a5d6a7;
  `}

  ${props => props.type === 'error' && `
    background-color: #ffebee;
    color: #c62828;
    border-color: #ef9a9a;
  `}
`;

// Map section with elegant styling
export const MapSection = styled.div`
  margin: 40px auto;
  text-align: center;
  max-width: 900px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    color: #222;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }

  h2:after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 8px auto;
  }
`;

export const MapPlaceholder = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  border-radius: 0;
  box-shadow: 0 6px 20px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px -8px rgba(0, 0, 0, 0.15);
  }

  .map-content {
    text-align: center;
    padding: 20px;
  }

  .map-content i {
    font-size: 2.5rem;
    color: #c19a6b;
    margin-bottom: 12px;
  }

  .map-content h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  .map-content p {
    color: #666;
    margin-bottom: 16px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 14px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 600;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    border-radius: 0;

    &.secondary {
      background-color: transparent;
      color: #c19a6b;
      border: 2px solid #c19a6b;

      &:hover {
        background-color: #c19a6b;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 3px 10px rgba(193, 154, 107, 0.4);
      }
    }
  }
`;

// FAQ section with elegant styling
export const FAQSection = styled.div`
  margin: 40px auto;
  text-align: center;
  max-width: 900px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    color: #222;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }

  h2:after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 8px auto;
  }
`;

export const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

export const FAQItem = styled.div`
  text-align: center;
  background-color: white;
  padding: 20px;
  box-shadow: 0 6px 20px -10px rgba(0, 0, 0, 0.1);
  border: none;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

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
    transform: translateY(-6px);
    box-shadow: 0 12px 30px -8px rgba(0, 0, 0, 0.15);

    &::before {
      opacity: 1;
    }
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 10px;
    color: #222;
    font-weight: 500;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  p {
    color: #666;
    line-height: 1.5;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 13px;
    margin: 0;
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