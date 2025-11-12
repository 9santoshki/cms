import styled from 'styled-components';
import { theme } from '../styles/theme';

export const ProductDetailOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ProductDetailContainer = styled.div`
  position: relative;
  background-color: white;
  border-radius: 0;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: ${theme.colors.text};
  cursor: pointer;
  z-index: 10;
  padding: 5px;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const ProductDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
  }
`;

export const ProductDetailImage = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageClass', 'imageUrl'].includes(prop),
})<{ imageClass?: string; imageUrl?: string }>`
  height: 300px;
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    width: 50%;
    height: auto;
  }
  
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
  
  /* Handle imageUrl if provided */
  ${props => props.imageUrl ? `background-image: url('${props.imageUrl}');` : ''}
`;

export const ProductDetailInfo = styled.div`
  padding: 30px;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    width: 50%;
    padding: 40px;
  }
`;

export const ProductDetailTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: ${theme.colors.textDark};
  font-weight: 400;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const ProductDetailPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-bottom: 20px;
`;

export const ProductDetailDescription = styled.p`
  color: ${theme.colors.textSecondary};
  margin-bottom: 30px;
  line-height: 1.8;
`;

export const ProductDetailActions = styled.div`
  margin-top: 20px;
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fdf2f2;
  padding: 10px 15px;
  border-left: 4px solid #e74c3c;
  margin-bottom: 20px;
  font-family: ${theme.fonts.secondary};
  font-size: 14px;
`;