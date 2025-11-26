'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const DashboardProductsPage = () => {
  const router = useRouter();
  const { user, loading, fetchProducts, products } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading.user && !user) {
      router.push('/auth?redirect=/dashboard/products');
    } else if (user && user.role === 'admin') {
      loadProducts();
    } else {
      router.push('/dashboard'); // Redirect if not authorized
    }
  }, [user, loading]);

  const loadProducts = async () => {
    setLoadingState(true);
    setError(null);
    
    try {
      await fetchProducts();
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    // Apply category filter
    if (products && products.length > 0) {
      let filtered = products;
      if (categoryFilter !== 'all') {
        filtered = products.filter((product: any) => product.category?.toLowerCase() === categoryFilter.toLowerCase());
      }
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [products, categoryFilter]);

  if (loading.user || loadingState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-5xl text-red-500 mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access product management.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Product Management</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Dashboard
                </button>
                <span className="border-b-2 border-amber-500 text-amber-600 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Products
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="text-sm text-gray-700">
                  Welcome, <span className="font-medium capitalize">{user.role}</span> {user.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-8">
            <h2 className="text-base text-amber-600 font-semibold tracking-wide uppercase">Product Management</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Manage Your Product Catalog
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Filter Controls and Actions */}
          <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Category
                </label>
                <select
                  id="categoryFilter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Dining Room">Dining Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              
              <button
                onClick={loadProducts}
                className="mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Refresh
              </button>
            </div>
            
            <button
              onClick={() => router.push('/dashboard/products/new')}
              className="mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Add New Product
            </button>
          </div>

          {loadingState ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📦</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">
                {categoryFilter === 'all' 
                  ? "No products to display. Add your first product." 
                  : `No ${categoryFilter} products found.`}
              </p>
              <button
                onClick={() => router.push('/dashboard/products/new')}
                className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                Add Product
              </button>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <li key={product.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-amber-600 truncate">
                          {product.name}
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {product.category || 'Uncategorized'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="mr-6 text-sm text-gray-500">
                            Price: <span className="text-gray-900 font-medium">₹{product.price?.toLocaleString()}</span>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {new Date(product.created_at || product.created_at).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span className="text-gray-900">Stock: {product.stock_quantity || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <button
                          onClick={() => router.push(`/dashboard/products/${product.id}`)}
                          className="mr-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete product "${product.name}"?`)) {
                              // In a real application, this would delete the product
                              console.log(`Deleting product ${product.id}`);
                            }
                          }}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardProductsPage;