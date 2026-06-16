import styled from 'styled-components';

// Main cart container with elegant gradient
export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

// Cart header with elegant styling
export const CartHeader = styled.div`
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

// Cart header with elegant styling - compact
export const CartHeaderSection = styled.div`
  padding: 5px 0 10px;
  text-align: center;
  background: white;
  margin-top: 0;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 5px;
    color: #222;
    position: relative;
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
`;

// Empty cart section
export const EmptyCartSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 40px 20px;
`;

export const EmptyCartContent = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 40px 30px;
  background: white;
  border-radius: 0;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
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

  .empty-cart-icon {
    font-size: 5rem;
    color: #c19a6b;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 15px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  p {
    color: #666;
    margin-bottom: 25px;
    font-size: 1.1rem;
    line-height: 1.6;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }
`;

// Cart content wrapper - two column layout - compact
export const CartContentWrapper = styled.div`
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

// Cart items container
export const CartItemsSection = styled.div`
  flex: 1;
`;

// Cart items header - compact
export const CartItemsHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.75rem;
  background: #f9fafb;

  div {
    &:nth-child(2), &:nth-child(3), &:nth-child(4) {
      text-align: center;
    }
    &:nth-child(5) {
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Cart items list
export const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Cart item - compact
export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  align-items: center;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 8px;

    .header-item, .header-price, .header-quantity, .header-total {
      display: none;
    }
  }
`;

// Item product - compact
export const ItemProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const ItemImage = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$imageClass', '$imageUrl'].includes(prop),
})<{ $imageClass?: string; $imageUrl?: string }>`
  width: 80px;
  height: 80px;
  background-color: #f8f8f8;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  position: relative;

  /* If imageUrl is provided, use it (takes priority) */
  ${props => props.$imageUrl && !props.$imageUrl.includes('r2-placeholder.com') ? `
    background-image: url('${props.$imageUrl}');
  ` : ''}

  /* Otherwise, fall back to imageClass */
  ${props => !props.$imageUrl || props.$imageUrl.includes('r2-placeholder.com') ? `
    ${props.$imageClass === 'modern' ? `
      background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
    ` : ''}

    ${props.$imageClass === 'classic' ? `
      background-image: url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
    ` : ''}

    ${props.$imageClass === 'coastal' ? `
      background-image: url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
    ` : ''}

    ${props.$imageClass === 'office' ? `
      background-image: url('https://images.unsplash.com/photo-1442323822296-a34ce0d5fbc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
    ` : ''}

    ${props.$imageClass === 'hotel' ? `
      background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
    ` : ''}

    ${props.$imageClass === 'restaurant' ? `
      background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
    ` : ''}
  ` : ''}

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const ItemDetails = styled.div`
  h3 {
    font-size: 1rem;
    margin-bottom: 4px;
    color: #222;
    font-weight: 600;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }

  p {
    color: #666;
    font-size: 0.75rem;
    line-height: 1.3;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 0.9rem;
    }

    p {
      font-size: 0.7rem;
    }
  }
`;

// Item price - compact
export const ItemPrice = styled.div`
  text-align: center;
  font-weight: 600;
  color: #c19a6b;
  font-size: 1rem;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    text-align: left;
  }
`;

// Item quantity - compact
export const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .quantity-btn {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 0.7rem;
    transition: all 0.3s ease;
    border-radius: 4px;

    &:hover {
      background: #c19a6b;
      color: white;
      border-color: #c19a6b;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .quantity {
    font-weight: 600;
    font-size: 0.9rem;
    color: #222;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

// Item total - compact
export const ItemTotal = styled.div`
  text-align: center;
  font-weight: 600;
  color: #c19a6b;
  font-size: 1rem;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    text-align: left;
  }
`;

// Item actions - compact
export const ItemActions = styled.div`
  display: flex;
  justify-content: center;

  .remove-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
      color: #c19a6b;
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-top: 5px;
  }
`;

// Cart summary section - compact
export const CartSummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: sticky;
  top: 80px;

  @media (max-width: 992px) {
    position: static;
  }
`;

// Cart summary - compact
export const CartSummary = styled.div`
  width: 100%;
  background: white;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;

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

// Summary items list - compact
export const SummaryItemsList = styled.div`
  margin-bottom: 8px;
`;

export const SummaryItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .item-image {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    max-width: 40px;
    max-height: 40px;
    flex-shrink: 0;
    flex-grow: 0;
    background: #f5f5f5;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    border-radius: 4px;
    margin: 0;
    padding: 0;
  }

  img.item-image {
    display: block;
    border-radius: 4px;
  }

  .item-placeholder {
    background: #e8d5c4;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c19a6b;
    font-size: 14px;
  }

  .item-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0;
    padding: 0;

    h4 {
      font-size: 11px;
      font-weight: 600;
      color: #222;
      margin: 0 0 4px 0;
      padding: 0;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .item-details {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      align-items: center;
      margin: 0;
      padding: 0;

      .price {
        color: #c19a6b;
        font-weight: 600;
      }

      .qty {
        color: #666;
      }
    }
  }
`;

// Summary details - compact
export const SummaryDetails = styled.div`
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

// Summary actions - compact
export const SummaryActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .btn {
    padding: 10px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 4px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  }

  .btn.primary {
    background: #c19a6b;
    color: white;

    &:hover {
      background: #a8825f;
    }
  }

  .btn.secondary {
    background: transparent;
    color: #c19a6b;
    border: 1px solid #c19a6b;

    &:hover {
      background: #c19a6b;
      color: white;
    }
  }
`;