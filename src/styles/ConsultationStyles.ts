import styled from 'styled-components';

// Main consultation container
export const ConsultationContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

// Hero section
export const ConsultationHero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('/api/images/product_images%2F1767928644452-6a7vh9bf8fn-consultation-hero.jpg');
  background-size: cover;
  background-position: center;
  height: 45vh;
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
    background: radial-gradient(circle at center, rgba(193, 154, 107, 0.15) 0%, transparent 70%);
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 900px;
    padding: 0 20px;
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
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    height: 35vh;

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

// Benefits section
export const BenefitsSection = styled.section`
  padding: 60px 0;
  background: white;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 50px;
    color: #222;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
    letter-spacing: 2px;

    &::after {
      content: '';
      display: block;
      width: 120px;
      height: 3px;
      background: linear-gradient(to right, transparent, #c19a6b, transparent);
      margin: 15px auto;
      opacity: 0.7;
    }
  }
`;

export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
`;

export const BenefitCard = styled.div`
  text-align: center;
  padding: 30px 20px;

  .icon {
    font-size: 3rem;
    color: #c19a6b;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: #222;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  p {
    color: #666;
    line-height: 1.7;
    font-size: 15px;
  }
`;

// Booking section
export const BookingSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 40px;
  }
`;

export const BookingCard = styled.div`
  background: white;
  border-radius: 0;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const BookingHeader = styled.div`
  background: linear-gradient(135deg, #c19a6b, #a8825f);
  color: white;
  padding: 40px;
  text-align: center;

  h2 {
    font-size: 2.2rem;
    margin-bottom: 10px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  p {
    font-size: 1rem;
    opacity: 0.9;
  }
`;

export const BookingForm = styled.form`
  padding: 50px 40px;

  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 30px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #333;
    margin-bottom: 12px;
  }

  input[type="date"],
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  textarea {
    width: 100%;
    padding: 14px;
    border: 2px solid #e0e0e0;
    font-size: 16px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #c19a6b;
      box-shadow: 0 0 0 3px rgba(193, 154, 107, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 12px;
`;

export const TimeSlotButton = styled.button<{ $selected?: boolean }>`
  padding: 12px;
  border: 2px solid ${props => props.$selected ? '#c19a6b' : '#e0e0e0'};
  background: ${props => props.$selected ? '#c19a6b' : 'white'};
  color: ${props => props.$selected ? 'white' : '#333'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  &:hover {
    border-color: #c19a6b;
    background: ${props => props.$selected ? '#a8825f' : 'rgba(193, 154, 107, 0.1)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 40px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 16px 30px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  ${props => props.$variant === 'primary' ? `
    background: #c19a6b;
    color: white;

    &:hover:not(:disabled) {
      background: #a8825f;
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(193, 154, 107, 0.3);
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }
  ` : `
    background: #f0f0f0;
    color: #333;

    &:hover {
      background: #e0e0e0;
    }
  `}
`;

export const SuccessMessage = styled.div`
  text-align: center;
  padding: 60px 40px;

  .icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #4ade80, #22c55e);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px;
    color: white;
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 15px;
    color: #222;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 30px;
  }
`;

export const ErrorAlert = styled.div`
  padding: 16px 20px;
  background: #fee;
  border: 2px solid #fcc;
  color: #c33;
  margin-bottom: 25px;
  font-size: 15px;
  font-weight: 500;
`;

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

// Trust section
export const TrustSection = styled.section`
  padding: 60px 0;
  background: white;
  text-align: center;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #222;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
`;

export const TrustStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-top: 40px;
`;

export const TrustStat = styled.div`
  .number {
    font-size: 3rem;
    font-weight: 700;
    color: #c19a6b;
    margin-bottom: 10px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  .label {
    font-size: 1rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;
