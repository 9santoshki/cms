'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import Header from './Header';

// Import admin styles
import {
  AdminContainer,
  AdminHeader,
  AdminSidebar,
  AdminContent,
  AdminCard,
  AdminButton
} from '../styles/AdminStyles';

const AdminDashboard = () => {
  const router = useRouter();

const navigate = (path: string) => {
  router.push(path);
};
  const { user, logout } = useAppContext();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check if user has admin privileges
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Check if user has admin role
    if (!user.role || user.role !== 'admin') {
      navigate('/');
      alert('Access denied: Admin privileges required');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const adminNavigation = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'products', label: 'Products', icon: 'fas fa-box' },
    { id: 'orders', label: 'Orders', icon: 'fas fa-shopping-cart' },
    { id: 'users', label: 'Users', icon: 'fas fa-users' },
    { id: 'content', label: 'Content', icon: 'fas fa-edit' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentManagement />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <Header activePage="admin" />
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-header-actions">
            <button className="btn secondary" onClick={() => navigate('/')}>Visit Site</button>
            <button className="btn primary" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </AdminHeader>

      <div className="admin-layout">
        <AdminSidebar>
          <nav className="admin-nav">
            <ul>
              {adminNavigation.map((item) => (
                <li key={item.id}>
                  <button 
                    className={`admin-nav-link ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <i className={item.icon}></i>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </AdminSidebar>

        <AdminContent>
          {renderContent()}
        </AdminContent>
      </div>
    </AdminContainer>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  return (
    <div className="admin-dashboard">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-stats">
        <AdminCard>
          <div className="stat-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <h3>128</h3>
            <p>Total Orders</p>
          </div>
        </AdminCard>
        
        <AdminCard>
          <div className="stat-icon">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-content">
            <h3>42</h3>
            <p>Products</p>
          </div>
        </AdminCard>
        
        <AdminCard>
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>89</h3>
            <p>Customers</p>
          </div>
        </AdminCard>
        
        <AdminCard>
          <div className="stat-icon">
            <i className="fas fa-receipt"></i>
          </div>
          <div className="stat-content">
            <h3>₹42,350</h3>
            <p>Total Revenue</p>
          </div>
        </AdminCard>
      </div>
      
      <div className="dashboard-content">
        <AdminCard>
          <h3>Recent Orders</h3>
          <p>Latest orders from your store</p>
        </AdminCard>
        
        <AdminCard>
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <AdminButton onClick={() => window.location.hash = '#add-product'}>
              <i className="fas fa-plus"></i> Add Product
            </AdminButton>
            <AdminButton onClick={() => window.location.hash = '#manage-content'}>
              <i className="fas fa-edit"></i> Manage Content
            </AdminButton>
            <AdminButton onClick={() => window.location.hash = '#view-orders'}>
              <i className="fas fa-list"></i> View Orders
            </AdminButton>
          </div>
        </AdminCard>
      </div>
    </div>
  );
};

// Product Management Component
const ProductManagement = () => {
  const { products, fetchProducts, loading, error } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageClass: 'modern'
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      console.log('Updating product:', { ...editingProduct, ...formData });
      setEditingProduct(null);
    } else {
      // Add new product
      console.log('Adding new product:', formData);
    }
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      imageClass: 'modern'
    });
    setIsAdding(false);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      category: product.category || '',
      imageClass: product.imageClass || 'modern'
    });
    setIsAdding(true);
  };

  const handleDelete = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product:', productId);
      // In a real app, this would call an API to delete the product
    }
  };

  if (loading.products) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error.products) {
    return (
      <div className="admin-error">
        <p>Error loading products: {error.products}</p>
        <button className="btn primary" onClick={fetchProducts}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-products">
      <div className="admin-header">
        <h2>Product Management</h2>
        <div className="admin-actions">
          <AdminButton onClick={() => setIsAdding(true)}>
            <i className="fas fa-plus"></i> Add Product
          </AdminButton>
        </div>
      </div>
      
      {/* Add/Edit Product Form */}
      {isAdding && (
        <AdminCard>
          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="productDescription">Description</label>
              <textarea
                id="productDescription"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                required
                rows={4}
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="productPrice">Price (₹)</label>
              <input
                type="number"
                id="productPrice"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                required
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="productCategory">Category</label>
              <input
                type="text"
                id="productCategory"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Enter category"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="productImageClass">Image Class</label>
              <select
                id="productImageClass"
                name="imageClass"
                value={formData.imageClass}
                onChange={handleInputChange}
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="coastal">Coastal</option>
                <option value="office">Office</option>
                <option value="hotel">Hotel</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
            
            <div className="form-actions">
              <AdminButton type="button" onClick={() => setIsAdding(false)}>
                Cancel
              </AdminButton>
              <AdminButton type="submit">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      )}
      
      {/* Products Table */}
      <AdminCard>
        <h3>Existing Products</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price.toLocaleString()}</td>
                  <td>{product.category || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="btn secondary" 
                        onClick={() => handleEdit(product)}
                        style={{marginRight: '10px'}}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button 
                        className="btn danger" 
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
};

// Order Management Component
const OrderManagement = () => {
  return (
    <div className="admin-orders">
      <div className="admin-header">
        <h2>Order Management</h2>
        <div className="admin-actions">
          <AdminButton>
            <i className="fas fa-sync"></i> Refresh
          </AdminButton>
        </div>
      </div>
      
      <AdminCard>
        <h3>Manage Orders</h3>
        <p>View and manage customer orders here.</p>
      </AdminCard>
    </div>
  );
};

// User Management Component
const UserManagement = () => {
  return (
    <div className="admin-users">
      <div className="admin-header">
        <h2>User Management</h2>
        <div className="admin-actions">
          <AdminButton>
            <i className="fas fa-plus"></i> Add User
          </AdminButton>
        </div>
      </div>
      
      <AdminCard>
        <h3>Manage Users</h3>
        <p>View and manage user accounts here.</p>
      </AdminCard>
    </div>
  );
};

// Content Management Component
const ContentManagement = () => {
  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>Content Management</h2>
        <div className="admin-actions">
          <AdminButton>
            <i className="fas fa-plus"></i> Add Content
          </AdminButton>
        </div>
      </div>
      
      <AdminCard>
        <h3>Edit Content</h3>
        <p>Modify site content, images, and text here.</p>
      </AdminCard>
    </div>
  );
};

// Settings Content Component
const SettingsContent = () => {
  return (
    <div className="admin-settings">
      <div className="admin-header">
        <h2>Settings</h2>
        <div className="admin-actions">
          <AdminButton>
            <i className="fas fa-save"></i> Save
          </AdminButton>
        </div>
      </div>
      
      <AdminCard>
        <h3>Site Settings</h3>
        <p>Configure site-wide settings and preferences.</p>
      </AdminCard>
    </div>
  );
};

export default AdminDashboard;