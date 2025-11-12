import styled from 'styled-components';

// Main checkout container with elegant gradient
export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

// Checkout header with elegant styling
export const CheckoutHeader = styled.div`
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

// Checkout header with elegant styling
export const CheckoutHeaderSection = styled.div`
  padding: 60px 0 40px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 15px;
    color: #222;
    position: relative;
    font-weight: 400;
    letter-spacing: 3px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }
  
  h1::after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 25px auto;
    opacity: 0.7;
  }
`;

// Checkout container
export const CheckoutContainerMain = styled.div`
  display: flex;
  gap: 50px;
  max-width: 1400px;
  margin: 0 auto 80px;
  padding: 0 40px;
  flex: 1;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

// Checkout form section
export const CheckoutFormSection = styled.div`
  flex: 2;
  background: white;
  border-radius: 0;
  padding: 50px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
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
    &::before {
      opacity: 1;
    }
  }

  .form-section {
    margin-bottom: 50px;
    
    h2 {
      font-size: 1.8rem;
      margin-bottom: 30px;
      color: #222;
      font-weight: 400;
      font-family: var(--font-playfair), 'Playfair Display', serif;
      position: relative;
      padding-bottom: 15px;
    }
    
    h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 2px;
      background: #c19a6b;
    }
  }

  .form-group {
    margin-bottom: 25px;

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 500;
      color: #333;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      font-size: 16px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    input,
    textarea {
      width: 100%;
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 0;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      font-size: 16px;
      transition: all 0.3s ease;
      background: #fff;

      &:focus {
        outline: none;
        border-color: #c19a6b;
        box-shadow: 0 0 0 2px rgba(193, 154, 107, 0.2);
      }
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }
`;

// Payment options
export const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const PaymentOption = styled.label<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 2px solid ${props => props.selected ? '#c19a6b' : '#ddd'};
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.selected ? 'rgba(193, 154, 107, 0.05)' : '#fff'};

  &:hover {
    border-color: #c19a6b;
    background: ${props => props.selected ? 'rgba(193, 154, 107, 0.05)' : 'rgba(193, 154, 107, 0.02)'};
  }
  
  ${props => props.selected && `
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(193, 154, 107, 0.2);
  `}
`;

export const PaymentInput = styled.input`
  margin-right: 15px;
  width: 18px;
  height: 18px;
`;

export const PaymentOptionContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const PaymentIcon = styled.div`
  font-size: 2rem;
  margin-right: 20px;
  color: #c19a6b;
  
  &.paypal-icon {
    color: #003087;
  }
`;

export const PaymentInfo = styled.div`
  flex: 1;
  
  .payment-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #222;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
  
  .payment-desc {
    font-size: 0.9rem;
    color: #666;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
`;

// Checkout summary section
export const CheckoutSummarySection = styled.div`
  flex: 1;
  background: white;
  border-radius: 0;
  padding: 40px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  position: sticky;
  top: 100px;
  align-self: flex-start;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    position: relative;
    padding-bottom: 15px;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: #c19a6b;
  }
`;

// Summary items
export const SummaryItems = styled.div`
  margin-bottom: 30px;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  
  .item-details {
    flex: 1;
    
    h3 {
      font-size: 1rem;
      margin-bottom: 5px;
      color: #222;
      font-weight: 500;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
    
    p {
      font-size: 0.9rem;
      color: #666;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
  }
  
  .item-price {
    font-weight: 600;
    color: #c19a6b;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
`;

// Summary totals
export const SummaryTotals = styled.div`
  .total-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    
    span:first-child {
      color: #666;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
    
    span:last-child {
      font-weight: 500;
      color: #222;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
    
    &.grand-total {
      font-weight: 600;
      font-size: 1.2rem;
      border-top: 2px solid #eee;
      margin-top: 10px;
      padding-top: 15px;
      
      span:first-child {
        color: #222;
      }
      
      span:last-child {
        color: #c19a6b;
      }
    }
  }
`;

// Checkout button
export const CheckoutButton = styled.button`
  width: 100%;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(193, 154, 107, 0.4);
  position: relative;
  overflow: hidden;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  margin-top: 30px;

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
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(193, 154, 107, 0.6);
    
    &::before {
      left: 100%;
    }
  }
  
  background-color: #c19a6b;
  color: white;
  
  &:hover {
    background-color: #a8825f;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 10px rgba(193, 154, 107, 0.2);
  }
`;

// Confirmation content
export const ConfirmationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px 20px;
  text-align: center;

  i {
    font-size: 5rem;
    color: #c19a6b;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  p {
    color: #666;
    margin-bottom: 10px;
    font-size: 1.2rem;
    line-height: 1.7;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
`;