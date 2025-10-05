import styled from 'styled-components';
import { theme } from './theme';

// Styled container for portfolio page sections
export const PortfolioPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: 80px; /* Account for fixed navbar */
`;

export const PortfolioHero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-top: 80px;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  
  p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    font-family: ${theme.fonts.secondary};
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export const PortfolioFilter = styled.section`
  padding: 40px 0;
  background-color: ${theme.colors.white};
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 800px;
  padding: 0 20px;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  padding: 14px 30px;
  background-color: ${props => props.active ? theme.colors.primary : 'transparent'};
  border: 2px solid ${theme.colors.primary};
  color: ${props => props.active ? theme.colors.white : theme.colors.primary};
  cursor: pointer;
  font-family: ${theme.fonts.secondary};
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  min-width: 150px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.primary};
    z-index: -1;
    transform: ${props => props.active ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${theme.colors.white};
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

export const PortfolioGrid = styled.section`
  padding: 60px 0;
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const ProjectCard = styled.div`
  position: relative;
  height: 300px;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

export const ProjectImage = styled.div<{ imageClass: string }>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  
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
`;

export const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

export const ProjectInfo = styled.div`
  color: white;
  width: 100%;
`;

export const ProjectCategory = styled.span`
  display: inline-block;
  padding: 5px 10px;
  background-color: ${theme.colors.primary};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

export const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: white;
  font-weight: 400;
`;

export const ProjectDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.5;
  display: none; /* Hidden by default, visible on hover */
  
  ${ProjectCard}:hover & {
    display: block;
  }
`;

export const ProjectButton = styled.button`
  width: calc(100% - 20px);
  padding: 16px;
  font-size: 15px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 500;
  font-family: ${theme.fonts.secondary};
  margin: 10px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%);
    transition: 0.6s;
    z-index: -1;
  }
  
  &:hover {
    background-color: ${theme.colors.primaryDark};
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    
    &::before {
      transform: translateX(100%);
    }
  }
`;

export const PortfolioCTA = styled.section`
  padding: 80px 0;
  background-color: #222;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(193, 154, 107, 0.1) 0, transparent 70%);
    z-index: 0;
  }
  
  .container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: white;
  }
  
  p {
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto 30px;
    color: #ddd;
    font-family: ${theme.fonts.secondary};
  }
  
  button {
    position: relative;
    overflow: hidden;
    z-index: 1;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    padding: 20px 50px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.4s ease;
    box-shadow: 0 4px 15px ${theme.colors.primary}66;
    display: inline-block;
    margin: 0 auto;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transform: translateX(-100%);
      transition: 0.6s;
      z-index: -1;
    }
    
    &:hover {
      background-color: ${theme.colors.primaryDark};
      transform: translateY(-3px);
      box-shadow: 0 8px 20px ${theme.colors.primary}99;
      
      &::before {
        transform: translateX(100%);
      }
    }
  }
`;