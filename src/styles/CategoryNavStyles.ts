import styled from 'styled-components';

// Category Navigation Bar (below main header)
export const CategoryNavBar = styled.nav`
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
  position: -webkit-sticky;
  position: sticky;
  top: 75px;
  z-index: 999;
  width: 100%;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);

  @media (max-width: 900px) {
    display: none;
  }

  @media (max-width: 768px) {
    top: 65px;
  }
`;

export const CategoryNavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 0;

  @media (max-width: 992px) {
    padding: 0 15px;
  }
`;

// All Products link (first item)
export const AllProductsLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  background: #c19a6b;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;

  i {
    font-size: 14px;
  }

  &:hover {
    background: #a8825f;
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 12px;
  }
`;

// Category item wrapper
export const CategoryItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// Category button (trigger for dropdown)
export const CategoryButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 14px;
  background: transparent;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(193, 154, 107, 0.15);
  }

  ${props => props.$active && `
    background: rgba(193, 154, 107, 0.2);
  `}

  i.fa-chevron-down {
    font-size: 10px;
    transition: transform 0.2s ease;
  }

  &:hover i.fa-chevron-down {
    transform: rotate(180deg);
  }

  @media (max-width: 768px) {
    padding: 10px 10px;
    font-size: 11px;
  }
`;

// Dropdown panel
export const CategoryDropdown = styled.div<{ $visible?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 220px;
  background: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-radius: 0 0 8px 8px;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transform: translateY(${props => props.$visible ? 0 : '-5px'});
  -webkit-transform: translateY(${props => props.$visible ? 0 : '-5px'});
  transition: opacity 0.1s ease, visibility 0.1s ease, transform 0.1s ease;
  -webkit-transition: opacity 0.1s ease, visibility 0.1s ease, -webkit-transform 0.1s ease;
  z-index: 1000;
  padding: 8px 0;
  will-change: opacity, transform;

  /* Invisible bridge to prevent gap between button and dropdown - larger area */
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -10px;
    right: -10px;
    height: 25px;
    background: transparent;
    z-index: -1;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    left: 0;
    right: 0;
    min-width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 0;
    transform: translateY(${props => props.$visible ? 0 : '100%'});
    -webkit-transform: translateY(${props => props.$visible ? 0 : '100%'});

    &::before {
      display: none;
    }
  }
`;

// Dropdown header
export const DropdownHeader = styled.div`
  padding: 10px 16px;
  background: linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%);
  border-bottom: 1px solid #e8d5c4;

  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #c19a6b;
    margin: 0;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }

  p {
    font-size: 11px;
    color: #666;
    margin: 2px 0 0 0;
  }
`;

// Subcategory link
export const SubcategoryLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  color: #333;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(193, 154, 107, 0.08);
    color: #c19a6b;
    padding-left: 20px;
  }

  i {
    font-size: 12px;
    color: #c19a6b;
    width: 16px;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`;

// View all link in dropdown
export const ViewAllLink = styled.a`
  display: block;
  padding: 10px 16px;
  margin-top: 8px;
  border-top: 1px solid #f0f0f0;
  color: #c19a6b;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(193, 154, 107, 0.1);
  }

  i {
    margin-left: 4px;
  }
`;

// Services dropdown (special styling)
export const ServicesDropdown = styled(CategoryDropdown)`
  min-width: 180px;
`;

// Divider in dropdown
export const DropdownDivider = styled.div`
  height: 1px;
  background: #f0f0f0;
  margin: 8px 0;
`;