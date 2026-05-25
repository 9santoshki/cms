import styled from 'styled-components';

// Main shop container with elegant gradient
export const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

// Shop hero section
export const ShopHero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1556228453-efd17c9d9b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  margin-top: 80px;
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

    h1 {
      font-size: 3.5rem;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 3px;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      font-family: var(--font-playfair), 'Playfair Display', serif;
    }

    p {
      font-size: 1.4rem;
      max-width: 700px;
      margin: 0 auto;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      line-height: 1.7;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
  }
`;

// Main content area
export const MainContent = styled.div`
  display: flex;
  flex: 1;
  padding: 0;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
`;

// Product filters section - Amazon-style compact sidebar
export const ProductFilters = styled.div`
  width: 220px;
  min-width: 220px;
  padding: 12px 0 12px 12px;
  background-color: #fff;
  border-right: 1px solid #e5e5e5;
  height: calc(100vh - 140px);
  overflow-y: auto;
  position: sticky;
  top: 140px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

// Mobile filter toggle button (to be used in shop page)
export const MobileFilterToggle = styled.button`
  display: none;
  width: 100%;
  padding: 10px 12px;
  background: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  margin-bottom: 12px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  text-align: center;
  touch-action: manipulation;

  i {
    margin-right: 6px;
    color: #c19a6b;
  }

  @media (max-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// Products section
export const ProductsSection = styled.div`
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;

  @media (max-width: 992px) {
    padding: 10px 12px;
  }
`;

// Filter section - collapsible like Amazon
export const FilterSection = styled.div<{ $collapsed?: boolean }>`
  margin-bottom: 0;
  padding: 0;
  border-bottom: 1px solid #e5e5e5;
`;

// Filter header - compact with toggle icon
export const FilterHeader = styled.div<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  background: ${props => props.$collapsed ? '#fff' : '#fafafa'};
  transition: background 0.15s ease;

  &:hover {
    background: #f5f5f5;
  }

  h3 {
    font-size: 13px;
    color: #111;
    font-weight: 600;
    margin: 0;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    text-transform: none;
    letter-spacing: 0;
  }

  .toggle-icon {
    font-size: 10px;
    color: #666;
    transition: transform 0.2s ease;
    transform: ${props => props.$collapsed ? 'rotate(-90deg)' : 'rotate(0deg)'};
  }
`;

// Filter content - compact checkbox-like options
export const FilterContent = styled.div<{ $collapsed?: boolean }>`
  display: ${props => props.$collapsed ? 'none' : 'flex'};
  flex-direction: column;
  gap: 0;
  padding: 4px 0 8px 0;
`;

// Filter option - Amazon-style checkbox/link
export const FilterOption = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  color: ${props => props.$active ? '#111' : '#555'};
  border: none;
  text-align: left;
  cursor: pointer;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: all 0.15s ease;
  width: 100%;
  position: relative;

  &:hover {
    color: #c45a00;
    background: #f7f7f7;
  }

  &::before {
    content: '';
    width: 14px;
    height: 14px;
    border: 1px solid ${props => props.$active ? '#c45a00' : '#888'};
    background: ${props => props.$active ? '#fff' : 'transparent'};
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    transition: all 0.15s ease;
  }

  ${props => props.$active && `
    &::after {
      content: '✓';
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 10px;
      color: #c45a00;
      font-weight: bold;
    }
  `}
`;

// Department/Category header for filters
export const FilterDepartmentHeader = styled.div`
  padding: 12px 12px 8px 12px;
  font-size: 14px;
  font-weight: 700;
  color: #111;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #c19a6b;
    font-size: 16px;
  }
`;

// Clear filters button
export const ClearFiltersButton = styled.button`
  display: block;
  width: calc(100% - 24px);
  margin: 12px 12px 16px 12px;
  padding: 8px 12px;
  background: transparent;
  color: #007185;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f7f7f7;
    border-color: #007185;
    color: #c45a00;
  }
`;

// Active filters summary
export const ActiveFiltersSummary = styled.div`
  padding: 8px 12px;
  background: #fff3cd;
  border-bottom: 1px solid #e5e5e5;
  font-size: 11px;
  color: #856404;

  span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-right: 8px;

    strong {
      color: #111;
    }
  }
`;

// Products grid
export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 35px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

// Product card
export const ProductCard = styled.div`
  background-color: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-align: center;
  border: none;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;

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
`;

// Product image - Square design
export const ProductImage = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageClass', 'imageUrl'].includes(prop),
})<{ imageClass?: string; imageUrl?: string }>`
  height: 180px; /* Reduced from 250px to make card more compact */
  background-color: #f8f8f8;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease;

  /* Handle specific imageClass values */
  ${props => props.imageClass === 'modern' && `
    background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}

  ${props => props.imageClass === 'classic' && `
    background-image: url('https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}

  ${props => props.imageClass === 'coastal' && `
    background-image: url('https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}

  ${props => props.imageClass === 'office' && `
    background-image: url('https://images.unsplash.com/photo-1442323822296-a34ce0d5fbc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}

  ${props => props.imageClass === 'hotel' && `
    background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}

  ${props => props.imageClass === 'restaurant' && `
    background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80');
  `}

  /* Handle imageUrl if provided */
  ${props => props.imageUrl ? `background-image: url('${props.imageUrl}');` : ''}

  &:hover {
    transform: scale(1.03);
  }

  .add-to-cart-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    flex-direction: column;
    gap: 15px;
  }

  &:hover .add-to-cart-overlay {
    opacity: 1;
  }
`;

// Product info
export const ProductInfo = styled.div`
  padding: 18px 15px 15px; /* Reduced padding */
  text-align: center;

  h3 {
    font-size: 1.2rem; /* Smaller font */
    margin-bottom: 6px; /* Less margin */
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: capitalize;
    min-height: 2.5em; /* Ensure consistent height for varying text lengths */
  }

  p {
    color: #666;
    margin-bottom: 8px; /* Less margin */
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 12px; /* Smaller font */
    line-height: 1.4; /* Tighter line height */
    min-height: 2.5em; /* Ensure consistent height for varying text lengths */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .product-actions {
    display: flex;
    flex-direction: column;
    gap: 8px; /* Less gap */
    margin-top: 12px; /* Less top margin */
  }
`;

// Product price container
export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 6px 0;
`;

// Product price
export const ProductPrice = styled.div`
  font-size: 1.4rem; /* Smaller font */
  font-weight: 600;
  color: #c19a6b;
  font-family: var(--font-playfair), 'Playfair Display', serif;
`;

// Original price (strikethrough)
export const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

// Discount badge
export const DiscountBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e74c3c;
  color: white;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
`;

// Pagination
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 50px;
`;

// Page button
export const PageButton = styled.button<{ $active?: boolean }>`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$active ? '#c19a6b' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#666'};
  border: 2px solid ${props => props.$active ? '#c19a6b' : '#ddd'};
  font-size: 1.1rem;
  font-weight: ${props => props.$active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  &:hover {
    background: ${props => props.$active ? '#a8825f' : '#f5f5f5'};
    color: ${props => props.$active ? '#fff' : '#c19a6b'};
    border-color: #c19a6b;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f5f5f5;
    color: #999;
    border-color: #ddd;
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

// Error container
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