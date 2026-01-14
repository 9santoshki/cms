import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
  color: #fff;
  margin-top: auto;
  font-family: 'Montserrat', sans-serif;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px 30px;

  @media (max-width: 768px) {
    padding: 50px 20px 25px;
  }
`;

export const FooterMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
    text-align: center;
    align-items: center;
  }
`;

export const FooterBrand = styled.div`
  max-width: 320px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const FooterLogo = styled.h3`
  font-family: var(--font-playfair), 'Playfair Display', serif;
  font-size: 24px;
  margin-bottom: 15px;
  color: #fff;
  letter-spacing: 0.5px;
`;

export const FooterTagline = styled.p`
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #c19a6b;
      color: #fff;
      transform: translateY(-2px);
    }
  }
`;

export const FooterNav = styled.nav`
  display: flex;
  gap: 50px;

  @media (max-width: 768px) {
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
      color: #c19a6b;
    }
  }
`;

export const FooterCTA = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    margin-bottom: 12px;
  }

  button {
    background: linear-gradient(135deg, #c19a6b, #a8825f);
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(193, 154, 107, 0.3);
    }
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  p {
    color: rgba(255, 255, 255, 0.4);
    font-size: 13px;
    margin: 0;
  }

  .footer-links {
    display: flex;
    gap: 25px;

    a {
      color: rgba(255, 255, 255, 0.4);
      text-decoration: none;
      font-size: 13px;
      transition: color 0.3s ease;

      &:hover {
        color: #c19a6b;
      }
    }
  }
`;

// Keep these for backward compatibility but they won't be used
export const FooterGrid = styled.div``;
export const FooterColumn = styled.div``;
export const FooterDescription = styled.p``;
export const FooterSubsection = styled.div``;
export const FooterHeading = styled.h4``;
export const FooterList = styled.ul``;
export const FooterListItem = styled.li``;
export const NewsletterSection = styled.div``;
