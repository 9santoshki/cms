import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

export const SearchHeaderSection = styled.div`
  padding: 14px 16px 6px;
  text-align: center;
  background: #fff;

  h1 {
    font-size: 1.2rem;
    margin-bottom: 0;
    color: #222;
    font-weight: 600;
    letter-spacing: 1px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }

  .search-query {
    color: #666;
    font-size: 13px;
    margin-top: 4px;

    span {
      color: #c19a6b;
      font-weight: 500;
    }
  }

  @media (max-width: 768px) {
    padding: 10px 12px 4px;

    h1 {
      font-size: 1rem;
      letter-spacing: 0.5px;
    }

    .search-query {
      font-size: 12px;
      margin-top: 3px;
    }
  }
`;

// Compact single-row search bar: label + input + button all inline, centered
export const SearchBarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 10px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;

  form {
    display: flex;
    gap: 0;
    width: 360px;
    flex-shrink: 0;
  }

  input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-right: none;
    border-radius: 4px 0 0 4px;
    font-size: 13px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    outline: none;
    &:focus { border-color: #c19a6b; }
    &::placeholder { color: #bbb; }
  }

  button {
    padding: 8px 14px;
    background: #c19a6b;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 13px;
    transition: background 0.2s;
    &:hover { background: #a8825f; }
  }

  @media (max-width: 600px) {
    padding: 8px 12px;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;

    form { width: 100%; }
  }
`;

export const SearchBarLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #222;
  white-space: nowrap;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;

  .sub {
    font-weight: 400;
    color: #c19a6b;
    text-transform: none;
    letter-spacing: 0;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    width: 100%;
  }
`;

export const SearchContent = styled.div`
  display: flex;
  flex: 1;
  padding: 0;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
`;

export const FiltersSection = styled.aside`
  @media (max-width: 992px) {
    display: none;
  }
`;

export const FiltersCard = styled.div`
  background: white;
  padding: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  position: sticky;
  top: 120px;

  h3 {
    font-size: 14px;
    color: #111;
    font-weight: 600;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
  }
`;

export const FilterGroup = styled.div`
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #333;
    margin-bottom: 10px;
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

export const ResultsSection = styled.main`
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;

  @media (max-width: 992px) {
    padding: 10px 12px;
  }
`;

export const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    padding-bottom: 8px;
  }

  .results-count {
    color: #666;
    font-size: 13px;

    @media (max-width: 768px) {
      font-size: 12px;
    }

    span {
      font-weight: 600;
      color: #222;
    }
  }

  .sort-by {
    display: flex;
    align-items: center;
    gap: 8px;

    label {
      font-size: 12px;
      color: #666;

      @media (max-width: 768px) {
        display: none;
      }
    }

    select {
      padding: 6px 24px 6px 10px;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      font-size: 12px;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
      cursor: pointer;
      background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E") no-repeat right 8px center;
      appearance: none;

      &:focus {
        outline: none;
        border-color: #c19a6b;
      }

      @media (max-width: 768px) {
        padding: 5px 20px 5px 8px;
        font-size: 11px;
      }
    }
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

export const ProductCard = styled.div`
  background: white;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    &:hover {
      transform: none;
    }
  }
`;

export const ProductImage = styled.div<{ $imageUrl?: string }>`
  height: 180px;
  background-color: #f5f5f5;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  /* Use imageUrl prop for background-image */
  ${props => props.$imageUrl ? `background-image: url('${props.$imageUrl}');` : ''}

  @media (max-width: 768px) {
    height: 140px;
  }

  @media (max-width: 480px) {
    height: 120px;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e8d5c4;
    color: #c19a6b;
    font-size: 30px;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  .category-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    padding: 4px 8px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #666;
    z-index: 1;

    @media (max-width: 768px) {
      padding: 3px 6px;
      font-size: 9px;
      top: 6px;
      left: 6px;
    }
  }
`;

export const ProductInfo = styled.div`
  padding: 12px;

  @media (max-width: 768px) {
    padding: 10px;
  }

  h3 {
    font-size: 14px;
    color: #222;
    font-weight: 500;
    margin-bottom: 4px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 768px) {
      font-size: 13px;
      margin-bottom: 2px;
    }
  }

  .description {
    display: none; // Hide description on search results for compactness

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
      font-size: 16px;
      color: #c19a6b;
      font-weight: 600;
      font-family: var(--font-playfair), 'Playfair Display', serif;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }

    .view-btn {
      padding: 6px 12px;
      background: transparent;
      border: 1px solid #c19a6b;
      color: #c19a6b;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: all 0.2s ease;

      @media (max-width: 768px) {
        padding: 5px 10px;
        font-size: 9px;
      }

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
  width: 100%;
  padding: 8px 16px 12px;
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 6px 12px 10px;
  }

  form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    width: 100%;
    gap: 8px;
  }

  input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #e8e8e8;
    font-size: 14px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    transition: all 0.3s ease;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #c19a6b;
    }

    &::placeholder {
      color: #aaa;
    }

    @media (max-width: 768px) {
      padding: 10px 12px;
      font-size: 13px;
    }
  }

  button {
    padding: 12px 20px;
    background: #c19a6b;
    color: white;
    border: none;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 4px;

    &:hover {
      background: #a8825f;
    }

    i {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      padding: 10px 16px;
      font-size: 13px;
    }
  }
`;

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
