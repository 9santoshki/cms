import styled from 'styled-components';

export const SuccessContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #faf9f7 0%, #f5f3f0 100%);
`;

export const SuccessContent = styled.div`
  flex: 1;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px 60px;

  @media (max-width: 768px) {
    padding: 20px 15px 40px;
  }
`;

export const SuccessCard = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
`;

export const SuccessHeader = styled.div`
  text-align: center;
  padding: 48px 40px 32px;
  background: linear-gradient(135deg, #faf9f7 0%, #f5f3f0 100%);
  border-bottom: 1px solid #f0ebe5;

  @media (max-width: 768px) {
    padding: 32px 20px 24px;
  }
`;

export const SuccessIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 0.5s ease-out;

  @keyframes scaleIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  i {
    font-size: 2.5rem;
    color: #28a745;
  }

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;

    i {
      font-size: 2rem;
    }
  }
`;

export const SuccessTitle = styled.h1`
  font-family: var(--font-playfair), 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SuccessSubtitle = styled.p`
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

export const OrderDetailsSection = styled.div`
  padding: 32px 40px;
  border-bottom: 1px solid #f0ebe5;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const OrderDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const DetailBox = styled.div`
  h3 {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #c19a6b;
    margin: 0 0 12px 0;
  }

  .detail-item {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.95rem;
    color: #666;
    margin: 8px 0;
    line-height: 1.6;

    strong {
      color: #1a1a1a;
      font-weight: 500;
    }
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-radius: 20px;
    background: #d1fae5;
    color: #065f46;
    margin-left: 8px;

    i {
      font-size: 0.7rem;
    }
  }
`;

export const OrderItemsSection = styled.div`
  padding: 0;
`;

export const SectionTitle = styled.h3`
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #c19a6b;
  margin: 0 0 16px 0;
  padding: 0 40px;
  padding-top: 24px;

  @media (max-width: 768px) {
    padding: 0 20px;
    padding-top: 20px;
  }
`;

export const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 40px;
  border-bottom: 1px solid #f5f3f0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 16px 20px;
    gap: 12px;
  }
`;

export const ItemImage = styled.div<{ $imageUrl?: string }>`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  flex-shrink: 0;
  background: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl}) center/cover no-repeat` : 'linear-gradient(135deg, #f5f3f0 0%, #ebe7e2 100%)'
  };
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 1.5rem;
    color: #ccc;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;

  h4 {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #1a1a1a;
    margin: 0 0 6px 0;
  }

  .quantity {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.85rem;
    color: #888;
  }
`;

export const ItemPrice = styled.div`
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: right;
  flex-shrink: 0;
`;

export const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px;
  background: linear-gradient(135deg, #faf9f7 0%, #f5f3f0 100%);
  border-top: 2px solid #c19a6b;

  .label {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #1a1a1a;
  }

  .amount {
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 600;
    color: #c19a6b;
  }

  @media (max-width: 768px) {
    padding: 20px;

    .amount {
      font-size: 1.5rem;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  padding: 32px 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 24px 20px;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
    background: linear-gradient(135deg, #c19a6b 0%, #a67c52 100%);
    color: #fff;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(193, 154, 107, 0.3);
    }
  `
      : `
    background: #f5f3f0;
    color: #1a1a1a;

    &:hover {
      background: #ebe7e2;
    }
  `}

  i {
    font-size: 0.85rem;
  }
`;

export const InfoMessage = styled.div`
  margin-top: 32px;
  text-align: center;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);

  p {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.9rem;
    color: #666;
    margin: 8px 0;
    line-height: 1.6;

    strong {
      color: #1a1a1a;
    }

    a {
      color: #c19a6b;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #f0ebe5;
    border-top-color: #c19a6b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  p {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.95rem;
    color: #888;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorContainer = styled.div`
  padding: 60px 40px;
  text-align: center;

  .error-icon {
    font-size: 4rem;
    color: #dc3545;
    margin-bottom: 24px;
  }

  h2 {
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: #1a1a1a;
    margin: 0 0 12px 0;
  }

  p {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.95rem;
    color: #666;
    margin: 0 0 24px 0;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;
