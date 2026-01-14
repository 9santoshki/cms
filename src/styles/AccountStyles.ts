import styled from 'styled-components';

export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
`;

export const AccountHeader = styled.div`
  padding: 10px 0 15px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin-top: 0;

  h1 {
    font-size: 2rem;
    margin-bottom: 8px;
    color: #222;
    font-weight: 400;
    letter-spacing: 2px;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    text-transform: uppercase;
  }

  h1::after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: linear-gradient(to right, transparent, #c19a6b, transparent);
    margin: 10px auto 0;
    opacity: 0.7;
  }

  p {
    color: #666;
    font-size: 0.9rem;
    margin-top: 8px;
  }
`;

export const AccountContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 30px 30px;
  width: 100%;

  @media (max-width: 992px) {
    padding: 0 20px 30px;
  }
`;

export const ProfileCard = styled.div`
  background: white;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f0f0f0;
  background: linear-gradient(135deg, #e8d5c4 0%, #f5e6d8 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  span {
    font-size: 2.2rem;
    color: #c19a6b;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;

  h2 {
    font-size: 1.6rem;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    margin-bottom: 6px;
  }

  .email {
    color: #666;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;

    @media (max-width: 768px) {
      justify-content: center;
    }

    i {
      color: #c19a6b;
    }
  }
`;

export const ProfileStats = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const StatItem = styled.div`
  background: #fafafa;
  padding: 10px 16px;
  border-radius: 0;
  min-width: 110px;

  .label {
    font-size: 10px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .value {
    font-size: 14px;
    color: #222;
    font-weight: 600;
  }

  &.role .value {
    color: #c19a6b;
    text-transform: capitalize;
  }
`;

export const ProfileActions = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const EditButton = styled.button`
  padding: 12px 24px;
  background: #c19a6b;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #a8825f;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(193, 154, 107, 0.3);
  }

  i {
    font-size: 14px;
  }
`;

export const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

export const DetailGroup = styled.div`
  .label {
    font-size: 11px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
    font-weight: 600;
  }

  .value {
    font-size: 14px;
    color: #222;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const EditFormCard = styled.div`
  background: white;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  margin-bottom: 20px;

  h2 {
    font-size: 1.4rem;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    margin-bottom: 6px;
  }

  p {
    color: #666;
    font-size: 0.85rem;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${props => props.$fullWidth ? 'span 2' : 'span 1'};

  @media (max-width: 640px) {
    grid-column: span 1;
  }

  label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #333;
    margin-bottom: 8px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  }

  input {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #e0e0e0;
    font-size: 15px;
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    transition: all 0.3s ease;
    background: #fafafa;

    &:focus {
      outline: none;
      border-color: #c19a6b;
      background: white;
      box-shadow: 0 0 0 3px rgba(193, 154, 107, 0.1);
    }

    &:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  .hint {
    font-size: 11px;
    color: #999;
    margin-top: 5px;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  background: transparent;
  color: #666;
  border: 2px solid #e0e0e0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;

  &:hover {
    border-color: #c19a6b;
    color: #c19a6b;
    background: rgba(193, 154, 107, 0.05);
  }
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  background: #c19a6b;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #a8825f;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(193, 154, 107, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const DashboardCard = styled.div`
  background: white;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const DashboardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }

  h2 {
    font-size: 1.4rem;
    color: #222;
    font-weight: 400;
    font-family: var(--font-playfair), 'Playfair Display', serif;
    margin-bottom: 6px;
  }

  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

export const DashboardButton = styled.a`
  padding: 12px 24px;
  background: #c19a6b;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;

  &:hover {
    background: #a8825f;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(193, 154, 107, 0.3);
  }

  &.disabled {
    background: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    pointer-events: none;
  }

  i {
    font-size: 14px;
  }
`;

export const MessageBox = styled.div<{ $type: 'success' | 'error' }>`
  padding: 12px 18px;
  margin-bottom: 18px;
  background: ${props => props.$type === 'success' ? '#f0fdf4' : '#fef2f2'};
  border: 2px solid ${props => props.$type === 'success' ? '#bbf7d0' : '#fecaca'};
  color: ${props => props.$type === 'success' ? '#166534' : '#991b1b'};
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    font-size: 14px;
  }
`;

export const LoadingScreen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);

  .loading-content {
    text-align: center;

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(193, 154, 107, 0.2);
      border-top: 4px solid #c19a6b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    p {
      color: #666;
      font-size: 16px;
      font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const SignInPrompt = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);

  .prompt-content {
    text-align: center;
    max-width: 500px;
    padding: 60px 40px;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid #f0f0f0;

    .icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 25px;
      background: linear-gradient(135deg, #e8d5c4 0%, #f5e6d8 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 35px;
        color: #c19a6b;
      }
    }

    h2 {
      font-size: 2rem;
      color: #222;
      font-weight: 400;
      font-family: var(--font-playfair), 'Playfair Display', serif;
      margin-bottom: 15px;
    }

    p {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 30px;
    }

    a {
      display: inline-block;
      padding: 14px 30px;
      background: #c19a6b;
      color: white;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s ease;

      &:hover {
        background: #a8825f;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(193, 154, 107, 0.3);
      }
    }
  }
`;
