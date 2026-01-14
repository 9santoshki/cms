import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

export const CheckoutHeader = styled.div`
  padding: 10px 0 20px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin-top: 0;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #222;
    font-weight: 400;
    letter-spacing: 2px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }

  h1::after {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 15px auto 0;
    opacity: 0.7;
  }

  p {
    color: #666;
    font-size: 0.95rem;
    margin-top: 10px;
  }
`;

export const CheckoutContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 100px 40px 40px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 0 20px 40px;
  }
`;

export const ShippingSection = styled.div`
  background: white;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${props => props.$fullWidth ? 'span 2' : 'span 1'};

  @media (max-width: 640px) {
    grid-column: span 1;
  }

  label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #333;
    margin-bottom: 8px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }

  input {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #e0e0e0;
    font-size: 15px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    transition: all 0.3s ease;
    background: #fafafa;

    &:focus {
      outline: none;
      border-color: #c19a6b;
      background: white;
      box-shadow: 0 0 0 3px rgba(193, 154, 107, 0.1);
    }

    &:read-only {
      background: #f5f5f5;
      cursor: not-allowed;
    }
  }
`;

export const OrderSummarySection = styled.div`
  position: sticky;
  top: 100px;

  @media (max-width: 992px) {
    position: static;
  }
`;

export const OrderSummaryCard = styled.div`
  background: white;
  padding: 25px;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    padding-bottom: 12px;
    border-bottom: 2px solid #f0f0f0;
  }
`;

export const OrderItemsList = styled.div`
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 15px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c19a6b;
    border-radius: 3px;
  }
`;

export const OrderItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemImage = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;

  h3 {
    font-size: 13px;
    font-weight: 600;
    color: #222;
    margin: 0 0 6px 0;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price-qty {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;

    .qty {
      color: #666;
    }

    .price {
      color: #c19a6b;
      font-weight: 600;
    }
  }
`;

export const OrderSummaryDetails = styled.div`
  padding: 12px 0;
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
  margin: 12px 0;

  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    font-size: 14px;

    span:first-child {
      color: #666;
    }

    span:last-child {
      font-weight: 500;
      color: #222;
    }

    &.total {
      font-size: 17px;
      font-weight: 600;
      padding-top: 10px;
      border-top: 2px solid #f0f0f0;
      margin-top: 5px;

      span:first-child {
        color: #222;
      }

      span:last-child {
        color: #c19a6b;
      }
    }
  }
`;

export const PayButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #c19a6b;
  color: white;
  border: none;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  position: relative;
  overflow: hidden;

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

  &:hover:not(:disabled) {
    background: #a8825f;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(193, 154, 107, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 10px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #fee;
  border: 2px solid #fcc;
  color: #c33;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

export const SecurityNote = styled.p`
  margin-top: 12px;
  font-size: 10px;
  color: #999;
  text-align: center;
  line-height: 1.4;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  i {
    margin-right: 5px;
    color: #c19a6b;
  }
`;

export const LoadingScreen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);

  .loading-content {
    text-align: center;

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(193, 154, 107, 0.2);
      border-top: 4px solid #c19a6b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    p {
      color: #666;
      font-size: 16px;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
