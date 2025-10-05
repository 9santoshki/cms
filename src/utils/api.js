const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Include credentials for CORS
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Create a more descriptive error message
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      if (errorData.message) {
        errorMessage = errorData.message;
        
        // If it's a validation error, include details
        if (errorData.message === 'Validation Error' && errorData.errors) {
          const fieldErrors = errorData.errors.map(err => `${err.field}: ${err.message}`).join(', ');
          errorMessage = `Validation Error: ${fieldErrors}`;
        }
      }
      
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${error.message}`);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getProfile: (token) => apiRequest('/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Products API functions
export const productsAPI = {
  getAll: () => apiRequest('/products'),
  
  getById: (id) => apiRequest(`/products/${id}`),
  
  create: (productData, token) => apiRequest('/products', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  }),
};

// Cart API functions
export const cartAPI = {
  getItems: (token) => apiRequest('/cart', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  
  addItem: (productId, quantity, token) => apiRequest('/cart/add', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  }),
  
  updateItem: (productId, quantity, token) => apiRequest('/cart/update', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  }),
  
  removeItem: (productId, token) => apiRequest(`/cart/remove/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  
  clear: (token) => apiRequest('/cart/clear', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Orders API functions
export const ordersAPI = {
  create: (orderData, token) => apiRequest('/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  }),
  
  getAll: (token) => apiRequest('/orders', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  
  getById: (id, token) => apiRequest(`/orders/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

export default apiRequest;