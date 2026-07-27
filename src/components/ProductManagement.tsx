'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { AdminCard, AdminButton } from '../styles/AdminStyles';

const ProductManagement = () => {
  const { products, fetchProducts } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
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
      setEditingProduct(null);
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
      price: product.price || '',
      category: product.category || '',
      imageClass: product.imageClass || 'modern'
    });
    setIsAdding(false);
  };

  const handleDelete = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would call an API to delete the product
    }
  };

  return (
    <div className="admin-product-management">
      <div className="admin-header">
        <h2>Product Management</h2>
        <div className="admin-actions">
          <AdminButton onClick={() => setIsAdding(!isAdding)}>
            <i className="fas fa-plus"></i> {isAdding ? 'Cancel' : 'Add Product'}
          </AdminButton>
        </div>
      </div>

      {isAdding && (
        <AdminCard>
          <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageClass">Image Style</label>
                <select
                  id="imageClass"
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
            </div>
            <div className="form-actions">
              <AdminButton type="submit">
                <i className="fas fa-save"></i> {editingProduct ? 'Update' : 'Save'} Product
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      )}

      <AdminCard>
        <h3>All Products</h3>
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category || 'N/A'}</td>
                  <td>
                    <button 
                      className="btn secondary" 
                      onClick={() => handleEdit(product)}
                      style={{marginRight: '10px'}}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn primary" 
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
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

export default ProductManagement;