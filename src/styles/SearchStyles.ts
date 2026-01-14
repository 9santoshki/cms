import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

export const SearchHeaderSection = styled.div`
  padding: 10px 0 20px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);

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

  .search-query {
    color: #666;
    font-size: 1rem;
    margin-top: 10px;

    span {
      color: #c19a6b;
      font-weight: 500;
    }
  }
`;

export const SearchContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 60px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  flex: 1;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 0 20px 40px;
  }
`;

export const FiltersSection = styled.aside`
  @media (max-width: 992px) {
    order: -1;
  }
`;

export const FiltersCard = styled.div`
  background: white;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
  position: sticky;
  top: 120px;

  h3 {
    font-size: 1.2rem;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #f0f0f0;
  }

  @media (max-width: 992px) {
    position: static;
  }
`;

export const FilterGroup = styled.div`
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #333;
    margin-bottom: 12px;
  }
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CategoryItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: ${props => props.$active ? 'rgba(193, 154, 107, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.$active ? '#c19a6b' : '#e8e8e8'};
  color: ${props => props.$active ? '#c19a6b' : '#555'};
  font-size: 13px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #c19a6b;
    color: #c19a6b;
    background: rgba(193, 154, 107, 0.05);
  }

  .count {
    font-size: 11px;
    color: #999;
  }
`;

export const PriceRange = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  input {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid #e8e8e8;
    font-size: 13px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    transition: all 0.3s ease;
    width: 100%;

    &:focus {
      outline: none;
      border-color: #c19a6b;
    }

    &::placeholder {
      color: #aaa;
    }
  }

  span {
    color: #999;
    font-size: 12px;
  }
`;

export const ApplyButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #c19a6b;
  color: white;
  border: none;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  &:hover {
    background: #a8825f;
  }
`;

export const ClearButton = styled.button`
  width: 100%;
  padding: 10px;
  background: transparent;
  color: #999;
  border: 1px solid #e8e8e8;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  &:hover {
    border-color: #c19a6b;
    color: #c19a6b;
  }
`;

export const ResultsSection = styled.main``;

export const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;

  .results-count {
    color: #666;
    font-size: 14px;

    span {
      font-weight: 600;
      color: #222;
    }
  }

  .sort-by {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    select {
      padding: 8px 30px 8px 12px;
      border: 1px solid #e8e8e8;
      font-size: 13px;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      cursor: pointer;
      background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E") no-repeat right 10px center;
      appearance: none;

      &:focus {
        outline: none;
        border-color: #c19a6b;
      }
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductCard = styled.div`
  background: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }
`;

export const ProductImage = styled.div<{ $imageUrl?: string }>`
  height: 220px;
  background-color: #f5f5f5;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  .product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e8d5c4;
    color: #c19a6b;
    font-size: 40px;
  }

  .category-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    background: white;
    padding: 5px 12px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #666;
    z-index: 1;
  }
`;

export const ProductInfo = styled.div`
  padding: 20px;

  h3 {
    font-size: 1.1rem;
    color: #222;
    font-weight: 500;
    margin-bottom: 8px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .description {
    font-size: 13px;
    color: #888;
    line-height: 1.5;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price {
      font-size: 1.25rem;
      color: #c19a6b;
      font-weight: 600;
      font-family: var(--font-playfair), 'Playfair Display', serif;
    }

    .view-btn {
      padding: 8px 16px;
      background: transparent;
      border: 1px solid #c19a6b;
      color: #c19a6b;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #c19a6b;
        color: white;
      }
    }
  }
`;

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;

  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(193, 154, 107, 0.2);
    border-top: 3px solid #c19a6b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  p {
    color: #666;
    font-size: 14px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  background: white;
  border: 1px solid #f0f0f0;

  .icon {
    font-size: 60px;
    color: #e8d5c4;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.5rem;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    margin-bottom: 10px;
  }

  p {
    color: #888;
    font-size: 14px;
    max-width: 400px;
    line-height: 1.6;
  }

  .browse-btn {
    margin-top: 25px;
    padding: 12px 30px;
    background: #c19a6b;
    color: white;
    border: none;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #a8825f;
    }
  }
`;

export const SearchInputWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto 30px;
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 14px 20px;
    border: 2px solid #e8e8e8;
    font-size: 15px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #c19a6b;
    }

    &::placeholder {
      color: #aaa;
    }
  }

  button {
    padding: 14px 25px;
    background: #c19a6b;
    color: white;
    border: none;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #a8825f;
    }

    i {
      font-size: 16px;
    }
  }
`;

export const MobileFilterToggle = styled.button`
  display: none;
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid #e8e8e8;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  margin-bottom: 20px;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  i {
    margin-right: 8px;
    color: #c19a6b;
  }

  @media (max-width: 992px) {
    display: block;
  }
`;

export const MobileFiltersOverlay = styled.div<{ $isOpen?: boolean }>`
  display: none;

  @media (max-width: 992px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
`;

export const MobileFiltersPanel = styled.div<{ $isOpen?: boolean }>`
  display: none;

  @media (max-width: 992px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    background: white;
    z-index: 1001;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
    overflow-y: auto;
    padding: 20px;

    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      font-size: 20px;
      color: #666;
      cursor: pointer;
    }
  }
`;
