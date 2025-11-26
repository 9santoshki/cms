'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  imageClass?: string;
}

interface Review {
  id: number;
  user_name: string;
  product_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface Order {
  id: number;
  customer_name: string;
  total: number;
  status: string;
  created_at: string;
  item_count: number;
}

interface Payment {
  id: number;
  transaction_id: string;
  order_id: number;
  amount: number;
  status: string;
  created_at: string;
  user_name: string;
}

// Define types for moderator permissions
interface Permissions {
  can_edit_products: boolean;
  can_edit_reviews: boolean;
  can_edit_orders: boolean;
  can_edit_payments: boolean;
}

// Extend the User type from context if needed
interface ExtendedUser {
  id: string | number;
  name: string;
  email: string;
  role: string;
  permissions?: Permissions;
  created_at?: string;
  updated_at?: string;
  avatar?: string;
  googleId?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  orders?: any[];
}

const ModeratorDashboard = () => {
  const { user: currentUser, token, loading } = useAppContext();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [showCreateModeratorForm, setShowCreateModeratorForm] = useState(false);
  const [newModeratorData, setNewModeratorData] = useState({
    name: '',
    email: '',
    password: '',
    permissions: {
      can_edit_products: false,
      can_edit_reviews: true,
      can_edit_orders: true,
      can_edit_payments: false,
    }
  });

  useEffect(() => {
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'moderator')) {
      window.location.href = '/auth';
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'moderator')) {
      fetchData();
    }
  }, [activeTab, currentUser]);

  const fetchData = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      switch(activeTab) {
        case 'products':
          if (currentUser?.permissions?.can_edit_products) {
            const res = await fetch('/api/products', { headers });
            const data = await res.json();
            if (data.success) setProducts(data.data);
          }
          break;
        case 'reviews':
          if (currentUser?.permissions?.can_edit_reviews) {
            const res = await fetch('/api/reviews', { headers });
            const data = await res.json();
            if (data.success) setReviews(data.data);
          }
          break;
        case 'orders':
          if (currentUser?.permissions?.can_edit_orders) {
            const res = await fetch('/api/orders', { headers });
            const data = await res.json();
            if (data.success) setOrders(data.data);
          }
          break;
        case 'payments':
          if (currentUser?.permissions?.can_edit_payments) {
            const res = await fetch('/api/payments', { headers });
            const data = await res.json();
            if (data.success) setPayments(data.data);
          }
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (item: any, type?: string) => {
    // item may already include a `type` property (e.g. { ...product, type: 'product' })
    setSelectedItem(item);
    setEditData({ ...item });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      let endpoint, method;
      switch(selectedItem.type) {
        case 'product':
          endpoint = `/api/products/${selectedItem.id}`;
          method = 'PUT';
          break;
        case 'review':
          endpoint = `/api/reviews/${selectedItem.id}`;
          method = 'PUT';
          break;
        case 'order':
          endpoint = `/api/orders/${selectedItem.id}`;
          method = 'PUT';
          break;
        case 'payment':
          endpoint = `/api/payments/${selectedItem.id}`;
          method = 'PUT';
          break;
        default:
          return;
      }

      const response = await fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify(editData)
      });

      const result = await response.json();
      if (result.success) {
        setIsEditing(false);
        setSelectedItem(null);
        fetchData(); // Refresh the data
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleNewModeratorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setNewModeratorData((prev: any) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [name]: checked
        }
      }));
    } else {
      setNewModeratorData((prev: any) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCreateModerator = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/admin/create-moderator', {
        method: 'POST',
        headers,
        body: JSON.stringify(newModeratorData)
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Moderator created successfully!');
        setNewModeratorData({
          name: '',
          email: '',
          password: '',
          permissions: {
            can_edit_products: false,
            can_edit_reviews: true,
            can_edit_orders: true,
            can_edit_payments: false,
          }
        });
        setShowCreateModeratorForm(false);
      } else {
        alert(result.error || 'Error creating moderator');
      }
    } catch (error) {
      console.error('Error creating moderator:', error);
      alert('Error creating moderator');
    }
  };

  if (loading.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const user = currentUser as ExtendedUser | null;

  if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
          <button
            className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg"
            onClick={() => window.location.href = '/auth'}
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="moderator" />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Moderator Dashboard</h1>
          <p className="text-gray-600">Manage products, reviews, orders, and payments</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {user.role === 'admin' && (
            <div className="mb-6">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showCreateModeratorForm
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
                onClick={() => setShowCreateModeratorForm(!showCreateModeratorForm)}
              >
                {showCreateModeratorForm ? 'Hide Create Moderator' : 'Create New Moderator'}
              </button>
            </div>
          )}

          {showCreateModeratorForm && user.role === 'admin' && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Create New Moderator</h2>
              <form onSubmit={handleCreateModerator}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newModeratorData.name}
                      onChange={handleNewModeratorChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newModeratorData.email}
                      onChange={handleNewModeratorChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={newModeratorData.password}
                      onChange={handleNewModeratorChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="can_edit_products"
                        checked={newModeratorData.permissions.can_edit_products}
                        onChange={handleNewModeratorChange}
                        className="mr-2"
                      />
                      Can Edit Products
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="can_edit_reviews"
                        checked={newModeratorData.permissions.can_edit_reviews}
                        onChange={handleNewModeratorChange}
                        className="mr-2"
                      />
                      Can Edit Reviews
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="can_edit_orders"
                        checked={newModeratorData.permissions.can_edit_orders}
                        onChange={handleNewModeratorChange}
                        className="mr-2"
                      />
                      Can Edit Orders
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="can_edit_payments"
                        checked={newModeratorData.permissions.can_edit_payments}
                        onChange={handleNewModeratorChange}
                        className="mr-2"
                      />
                      Can Edit Payments
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create Moderator
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModeratorForm(false)}
                  className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mb-6 border-b pb-4">
            {user.permissions?.can_edit_products && (
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'products'
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
            )}
            {user.permissions?.can_edit_reviews && (
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'reviews'
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            )}
            {user.permissions?.can_edit_orders && (
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
            )}
            {user.permissions?.can_edit_payments && (
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'payments'
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('payments')}
              >
                Payments
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Edit {selectedItem?.type || 'Item'}</h2>
              {selectedItem && Object.keys(editData).map(key => (
                !['id', 'created_at', 'type'].includes(key) && (
                  <div key={key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                    <input
                      type="text"
                      name={key}
                      value={editData[key]}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                )
              ))}
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {activeTab === 'products' && user.permissions?.can_edit_products && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map(product => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEdit({ ...product, type: 'product' })}
                              className="text-amber-600 hover:text-amber-900 mr-3"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && user.permissions?.can_edit_reviews && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reviews.map(review => (
                        <tr key={review.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{review.user_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.product_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.rating}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{review.comment}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEdit({ ...review, type: 'review' })}
                              className="text-amber-600 hover:text-amber-900 mr-3"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'orders' && user.permissions?.can_edit_orders && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customer_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.total}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEdit({ ...order, type: 'order' })}
                              className="text-amber-600 hover:text-amber-900 mr-3"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'payments' && user.permissions?.can_edit_payments && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map(payment => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.transaction_id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.order_id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{payment.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEdit({ ...payment, type: 'payment' })}
                              className="text-amber-600 hover:text-amber-900 mr-3"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ModeratorDashboard;