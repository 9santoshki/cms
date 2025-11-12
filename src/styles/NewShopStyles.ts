import styled from 'styled-components';

// Main shop container with elegant gradient
export const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
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
  padding: 20px 0 40px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

// Product filters section
export const ProductFilters = styled.div`
  width: 300px;
  padding: 0 30px 0 60px;
  background-color: transparent;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

// Filter section
export const FilterSection = styled.div`
  margin-bottom: 50px;
  padding: 25px 0;
  border-bottom: 1px solid rgba(193, 154, 107, 0.1);
`;

// Filter header
export const FilterHeader = styled.div`
  margin-bottom: 20px;
  
  h3 {
    font-size: 1.3rem;
    color: #c19a6b;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
`;

// Filter content
export const FilterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Filter option
export const FilterOption = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'rgba(193, 154, 107, 0.1)' : 'transparent'};
  color: ${props => props.$active ? '#c19a6b' : '#666'};
  border: 1px solid ${props => props.$active ? '#c19a6b' : 'rgba(200, 200, 200, 0.5)'};
  padding: 12px 15px;
  text-align: left;
  cursor: pointer;
  border-radius: 0;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-transform: capitalize;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background: #c19a6b;
    transition: width 0.3s ease;
  }
  
  &:hover {
    background: rgba(193, 154, 107, 0.08);
    color: #c19a6b;
    border-color: #c19a6b;
    
    &::after {
      width: 100%;
    }
  }
`;

// Products section
export const ProductsSection = styled.div`
  flex: 1;
  padding: 0 30px;
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
  height: 250px;
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
  padding: 25px 20px 20px;
  text-align: center;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 10px;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: capitalize;
  }

  p {
    color: #666;
    margin-bottom: 12px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-size: 14px;
    line-height: 1.6;
  }
  
  .product-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
  }
`;

// Product price
export const ProductPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: #c19a6b;
  margin: 10px 0;
  font-family: var(--font-playfair), 'Playfair Display', serif;
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