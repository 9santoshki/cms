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
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
      navigate(`/auth?redirect=${encodeURIComponent(currentPath)}`);
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
    { id: 'dashboard', label: 'Overview', icon: 'fas fa-tachometer-alt' },
    { id: 'products', label: 'Products', icon: 'fas fa-box' },
    { id: 'orders', label: 'Orders', icon: 'fas fa-shopping-cart' },
    { id: 'users', label: 'Users', icon: 'fas fa-users' },
    { id: 'content', label: 'Content', icon: 'fas fa-edit' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardContent setActiveTab={setActiveTab} />;
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
        return <DashboardContent setActiveTab={setActiveTab} />;
    }
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <Header activePage="admin" />
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
const DashboardContent = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const { products, orders, fetchProducts, fetchOrders, loading, error } = useAppContext();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch products
        await fetchProducts();
        
        // Fetch orders
        await fetchOrders();
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    
    fetchDashboardData();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Calculate stats based on products and orders
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    
    // Note: For customers, we'll need to get unique users from orders
    // For now, we'll use a placeholder count - in a real app you'd fetch actual customer count
    const uniqueCustomers = [...new Set(orders.map(order => order.user_id))].length;
    
    setStats({
      totalProducts,
      totalOrders,
      totalCustomers: uniqueCustomers,
      totalRevenue
    });
    
    // Get recent orders (last 5)
    const sortedOrders = [...orders].sort((a, b) => 
      new Date(b.created_at || '').getTime() - 
      new Date(a.created_at || '').getTime()
    );
    setRecentOrders(sortedOrders.slice(0, 5));
  }, [products, orders]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-stats">
        <AdminCard>
          <div className="stat-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <h3>{loading.orders ? '...' : stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </AdminCard>
        
        <AdminCard>
          <div className="stat-icon">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-content">
            <h3>{loading.products ? '...' : stats.totalProducts}</h3>
            <p>Products</p>
          </div>
        </AdminCard>
        
        <AdminCard>
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalCustomers}</h3>
            <p>Customers</p>
          </div>
        </AdminCard>
        
        <AdminCard>
          <div className="stat-icon">
            <i className="fas fa-receipt"></i>
          </div>
          <div className="stat-content">
            <h3>₹{loading.orders ? '...' : stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </AdminCard>
      </div>
      
      <div className="dashboard-content">
        <AdminCard>
          <h3>Recent Orders</h3>
          {recentOrders.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>User {order.user_id}</td>
                    <td>{new Date(order.created_at || order.createdAt || '').toLocaleDateString()}</td>
                    <td>₹{order.total?.toLocaleString()}</td>
                    <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No recent orders</p>
          )}
        </AdminCard>
        
        <AdminCard>
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <AdminButton onClick={() => setActiveTab('products')}>
              <i className="fas fa-plus"></i> Add Product
            </AdminButton>
            <AdminButton onClick={() => setActiveTab('content')}>
              <i className="fas fa-edit"></i> Manage Content
            </AdminButton>
            <AdminButton onClick={() => setActiveTab('orders')}>
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
  const { products, fetchProducts, loading, error, createProduct, updateProduct } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageClass: 'modern',
    imageFile: null as File | null,
    imageFiles: [] as File[]
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setFormData(prev => ({
        ...prev,
        imageFiles: newFiles
      }));

      // Create preview URLs for the selected images
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);

      // Clean up the preview URLs when component unmounts or when new files are selected
      newPreviews.forEach(previewUrl => {
        return () => URL.revokeObjectURL(previewUrl);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare form data for submission
    const productData: any = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price), // Ensure price is a number
      category: formData.category,
      imageClass: formData.imageClass
    };
    
    // Handle image upload if files are selected
    if (formData.imageFiles && formData.imageFiles.length > 0) {
      try {
        // Process all selected images
        const imageUrls = await Promise.all(
          formData.imageFiles.map(file => {
            return new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.onerror = (e) => reject(e);
              reader.readAsDataURL(file);
            });
          })
        );
        
        // Add the image URLs to the product data
        productData.image_urls = imageUrls;
        // Use the first image as the primary image for backward compatibility
        productData.image_url = imageUrls[0];
      } catch (error) {
        console.error('Error processing image files:', error);
        alert('Error processing image files. Please try again.');
        return;
      }
    } else if (editingProduct) {
      // If editing and no new images were selected, use existing images
      productData.image_url = editingProduct.image_url;
      productData.image_urls = editingProduct.images || [];
    }
    
    try {
      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct.id, productData);
        setEditingProduct(null);
      } else {
        // Add new product
        await createProduct(productData);
      }
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        imageClass: 'modern',
        imageFile: null,
        imageFiles: []
      });
      setImagePreview(null);
      setImagePreviews([]);
      setIsAdding(false);
      
      // Show success message
      alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
      
      // Refresh products list after successful update/add
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert(`Error saving product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      category: product.category || '',
      imageClass: product.imageClass || 'modern',
      imageFile: null,
      imageFiles: []
    });
    // Set image previews to the existing images if available
    if (product.images && product.images.length > 0) {
      setImagePreviews(product.images);
    } else if (product.image_url) {
      setImagePreviews([product.image_url]);
    }
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

            <div className="form-group">
              <label htmlFor="productImage">Product Images</label>
              <input
                type="file"
                id="productImage"
                name="productImage"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              {imagePreviews.length > 0 && (
                <div className="image-previews">
                  <p>Selected Images:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} style={{ border: '1px solid #ddd', padding: '5px', borderRadius: '4px' }}>
                        <img 
                          src={preview} 
                          alt={`Product preview ${index + 1}`} 
                          style={{ maxWidth: '150px', maxHeight: '150px', display: 'block' }} 
                        />
                        <small>Image {index + 1}</small>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {editingProduct && editingProduct.images && editingProduct.images.length > 0 && imagePreviews.length === 0 && (
                <div className="image-previews">
                  <p>Current Images:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                    {editingProduct.images.map((img: string, index: number) => (
                      <div key={index} style={{ border: '1px solid #ddd', padding: '5px', borderRadius: '4px' }}>
                        <img 
                          src={img} 
                          alt={`Current product image ${index + 1}`} 
                          style={{ maxWidth: '150px', maxHeight: '150px', display: 'block' }} 
                        />
                        <small>Image {index + 1}</small>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="form-actions">
              <AdminButton type="button" onClick={() => {
                setIsAdding(false);
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  imageClass: 'modern',
                  imageFile: null,
                  imageFiles: []
                });
                setImagePreview(null);
                setImagePreviews([]);
              }}>
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
  const [contentItems, setContentItems] = useState([
    { id: 1, title: 'Homepage Banner', type: 'banner', content: 'Welcome to Our Store - Amazing Deals Inside!', status: 'active' },
    { id: 2, title: 'About Us Section', type: 'text', content: 'We are dedicated to providing high-quality products...', status: 'active' },
    { id: 3, title: 'Footer Text', type: 'text', content: '© 2025 Our Store. All rights reserved.', status: 'active' },
    { id: 4, title: 'Promotional Email', type: 'email', content: 'Special discount for our valued customers...', status: 'inactive' }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'text',
    content: '',
    status: 'active'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContent) {
      // Update existing content
      setContentItems(prev => prev.map(item => 
        item.id === editingContent.id ? { ...formData, id: editingContent.id } : item
      ));
      setEditingContent(null);
    } else {
      // Add new content
      const newContent = {
        ...formData,
        id: contentItems.length + 1
      };
      setContentItems(prev => [...prev, newContent]);
    }
    
    // Reset form
    setFormData({
      title: '',
      type: 'text',
      content: '',
      status: 'active'
    });
    setIsAdding(false);
  };

  const handleEdit = (item: any) => {
    setEditingContent(item);
    setFormData({
      title: item.title,
      type: item.type,
      content: item.content,
      status: item.status
    });
    setIsAdding(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this content item?')) {
      setContentItems(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h2>Content Management</h2>
        <div className="admin-actions">
          <AdminButton onClick={() => {
            setIsAdding(true);
            setEditingContent(null);
            setFormData({
              title: '',
              type: 'text',
              content: '',
              status: 'active'
            });
          }}>
            <i className="fas fa-plus"></i> Add Content
          </AdminButton>
        </div>
      </div>

      {isAdding && (
        <AdminCard>
          <h3>{editingContent ? 'Edit Content' : 'Add New Content'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="contentTitle">Title</label>
              <input
                type="text"
                id="contentTitle"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter content title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contentType">Type</label>
              <select
                id="contentType"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="text">Text</option>
                <option value="banner">Banner</option>
                <option value="email">Email</option>
                <option value="image">Image</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contentStatus">Status</label>
              <select
                id="contentStatus"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contentBody">Content</label>
              <textarea
                id="contentBody"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Enter content"
                required
                rows={4}
              ></textarea>
            </div>

            <div className="form-actions">
              <AdminButton 
                type="button" 
                onClick={() => {
                  setIsAdding(false);
                  setEditingContent(null);
                }}
              >
                Cancel
              </AdminButton>
              <AdminButton type="submit">
                {editingContent ? 'Update Content' : 'Add Content'}
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard>
        <h3>Content Items</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <span className={`badge ${item.type}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${item.status}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn secondary"
                        onClick={() => handleEdit(item)}
                        style={{marginRight: '10px'}}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        className="btn danger"
                        onClick={() => handleDelete(item.id)}
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