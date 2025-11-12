import styled from 'styled-components';

// Main admin container
export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Montserrat', Arial, sans-serif;
`;

// Admin header
export const AdminHeader = styled.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0;
  margin-bottom: 0;

  .admin-header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  h1 {
    color: #222;
    margin: 0;
    font-size: 1.8rem;
  }

  .admin-header-actions {
    display: flex;
    gap: 15px;
  }

  .admin-header-actions .btn {
    margin: 0;
  }
`;

// Admin sidebar
export const AdminSidebar = styled.aside`
  width: 250px;
  background-color: white;
  height: calc(100vh - 80px);
  position: fixed;
  top: 80px;
  left: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  z-index: 999;
  overflow-y: auto;

  .admin-nav {
    padding: 20px 0;
  }

  .admin-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .admin-nav li {
    margin: 0;
  }

  .admin-nav-link {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    text-decoration: none;
    color: #333;
    font-size: 16px;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f8f8f8;
      color: #c19a6b;
    }

    &.active {
      background-color: #c19a6b;
      color: white;
      border-left: 4px solid #a8825f;

      i {
        color: white;
      }
    }

    i {
      margin-right: 15px;
      width: 20px;
      text-align: center;
    }
  }
`;

// Admin content area
export const AdminContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 30px 20px;
  margin-top: 80px;

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .admin-header h2 {
    margin: 0;
    color: #222;
  }

  .admin-actions {
    display: flex;
    gap: 10px;
  }
`;

// Admin card
export const AdminCard = styled.div`
  background-color: white;
  border-radius: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 25px;
  margin-bottom: 20px;
  border: 1px solid #f0f0f0;

  h3 {
    margin-top: 0;
    color: #222;
    font-size: 1.2rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

// Admin button
export const AdminButton = styled.button`
  display: inline-block;
  padding: 12px 24px;
  background-color: #c19a6b;
  color: white;
  border: none;
  border-radius: 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background-color: #a8825f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(193, 154, 107, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  i {
    margin-right: 8px;
  }
`;

// Dashboard styles
export const AdminDashboard = styled.div`
  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-icon {
    font-size: 2rem;
    color: #c19a6b;
    margin-bottom: 15px;
  }

  .stat-content {
    h3 {
      font-size: 1.8rem;
      margin: 0 0 5px 0;
      color: #222;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }

  .dashboard-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }

  .quick-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 768px) {
    .dashboard-content {
      grid-template-columns: 1fr;
    }
  }
`;

// Product management styles
export const ProductManagement = styled.div`
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .product-card {
    border: 1px solid #ddd;
    border-radius: 0;
    padding: 15px;
  }
`;