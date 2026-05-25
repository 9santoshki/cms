import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: white;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

export const CheckoutHeader = styled.div`
  padding: 5px 0 10px;
  text-align: center;
  background: white;
  margin-top: 0;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 5px;
    color: #222;
    font-weight: 600;
    letter-spacing: 1px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    text-transform: uppercase;
  }

  h1::after {
    content: '';
    display: block;
    width: 50px;
    height: 1px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 5px auto 0;
    opacity: 0.7;
  }

  p {
    color: #666;
    font-size: 0.8rem;
    margin-top: 5px;
  }
`;

export const CheckoutContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 20px;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 15px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 0 15px 20px;
  }
`;

export const ShippingSection = styled.div`
  background: white;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
  border-radius: 6px;

  h2 {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: #222;
    font-weight: 600;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

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
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #333;
    margin-bottom: 4px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }

  input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #e0e0e0;
    font-size: 0.85rem;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    transition: all 0.3s ease;
    background: #fafafa;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #c19a6b;
      background: white;
      box-shadow: 0 0 0 2px rgba(193, 154, 107, 0.1);
    }

    &:read-only {
      background: #f5f5f5;
      cursor: not-allowed;
    }
  }
`;

export const OrderSummarySection = styled.div`
  position: sticky;
  top: 80px;

  @media (max-width: 992px) {
    position: static;
  }
`;

export const OrderSummaryCard = styled.div`
  background: white;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
  border-radius: 6px;

  h2 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: #222;
    font-weight: 600;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const OrderItemsList = styled.div`
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c19a6b;
    border-radius: 2px;
  }
`;

export const OrderItem = styled.div`
  display: flex;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemImage = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;

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
    font-size: 11px;
    font-weight: 600;
    color: #222;
    margin: 0 0 3px 0;
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
    font-size: 10px;

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
  padding: 8px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin: 8px 0;

  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    font-size: 12px;

    span:first-child {
      color: #666;
    }

    span:last-child {
      font-weight: 500;
      color: #222;
    }

    &.total {
      font-size: 14px;
      font-weight: 600;
      padding-top: 6px;
      border-top: 1px solid #f0f0f0;
      margin-top: 4px;

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
  padding: 10px;
  background: #c19a6b;
  color: white;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  border-radius: 4px;

  &:hover:not(:disabled) {
    background: #a8825f;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(193, 154, 107, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 10px;
  padding: 8px;
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  border-radius: 4px;
`;

export const SecurityNote = styled.p`
  margin-top: 8px;
  font-size: 0.65rem;
  color: #999;
  text-align: center;
  line-height: 1.3;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  i {
    margin-right: 4px;
    color: #c19a6b;
  }
`;

export const LoadingScreen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;

  .loading-content {
    text-align: center;

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(193, 154, 107, 0.2);
      border-top: 3px solid #c19a6b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 10px;
    }

    p {
      color: #666;
      font-size: 0.85rem;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
