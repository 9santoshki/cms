import styled from 'styled-components';

export const OrdersContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #faf9f7 0%, #f5f3f0 100%);
`;

export const OrdersHeaderSection = styled.section`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 60px 20px;
  text-align: center;

  h1 {
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 500;
    color: #fff;
    margin: 0 0 10px 0;
    letter-spacing: 1px;
  }

  p {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    h1 {
      font-size: 1.8rem;
    }
  }
`;

export const OrdersContent = styled.div`
  flex: 1;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px 60px;

  @media (max-width: 768px) {
    padding: 20px 15px 40px;
  }
`;

export const EmptyOrdersSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

export const EmptyOrdersContent = styled.div`
  text-align: center;
  padding: 60px 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  max-width: 400px;

  .empty-icon {
    font-size: 4rem;
    color: #e8d5c4;
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

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.primary {
      background: linear-gradient(135deg, #c19a6b 0%, #a67c52 100%);
      color: #fff;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(193, 154, 107, 0.3);
      }
    }
  }
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const OrderCard = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 28px;
  background: linear-gradient(135deg, #faf9f7 0%, #f5f3f0 100%);
  border-bottom: 1px solid #f0ebe5;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
    padding: 20px;
  }
`;

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .order-number {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #c19a6b;
  }

  .order-date {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.85rem;
    color: #888;
  }
`;

export const OrderTotal = styled.div`
  text-align: right;

  .label {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #888;
    margin-bottom: 4px;
  }

  .amount {
    font-family: var(--font-playfair), 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  @media (max-width: 600px) {
    text-align: left;

    .amount {
      font-size: 1.3rem;
    }
  }
`;

export const OrderStatus = styled.span<{ $status?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 20px;
  margin-top: 8px;

  ${({ $status }) => {
    switch ($status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return `
          background: #d1fae5;
          color: #065f46;
        `;
      case 'processing':
      case 'shipped':
        return `
          background: #dbeafe;
          color: #1e40af;
        `;
      case 'pending':
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      case 'cancelled':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #374151;
        `;
    }
  }}

  i {
    font-size: 0.65rem;
  }
`;

export const OrderItems = styled.div`
  padding: 0;
`;

export const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  border-bottom: 1px solid #f5f3f0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    padding: 16px 20px;
    gap: 12px;
  }
`;

export const ItemImage = styled.div<{ $imageUrl?: string }>`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  flex-shrink: 0;
  background: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl}) center/cover no-repeat` : 'linear-gradient(135deg, #f5f3f0 0%, #ebe7e2 100%)'
  };
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 1.2rem;
    color: #ccc;
  }

  @media (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

export const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;

  h4 {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: #1a1a1a;
    margin: 0 0 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .quantity {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 0.8rem;
    color: #888;
  }
`;

export const ItemPrice = styled.div`
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: right;
  flex-shrink: 0;
`;

export const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 28px;
  background: #faf9f7;
  border-top: 1px solid #f0ebe5;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
    padding: 16px 20px;
  }
`;

export const ShippingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #666;

  i {
    color: #c19a6b;
  }
`;

export const ViewDetailsButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #c19a6b;
  background: transparent;
  border: 1px solid #e8d5c4;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c19a6b;
    color: #fff;
    border-color: #c19a6b;
  }

  i {
    font-size: 0.7rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
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

export const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #991b1b;
  padding: 16px 24px;
  border-radius: 10px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 0.9rem;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;

  i {
    font-size: 1.1rem;
  }
`;
