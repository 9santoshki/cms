// API utility functions for making requests to our Next.js API routes
import { CartItem, Order } from '@/types';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = typeof window !== 'undefined' ? '' : process.env.API_BASE_URL || '';
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined' && token) {
      localStorage.setItem('token', token);
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/api${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
      ...options.headers,
    };

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(`API request error to ${url}:`, error);
      return {
        success: false,
        error: 'Network error or server unavailable'
      };
    }
  }

  // Authentication
  async login(credentials: { email: string; password: string }) {
    return this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: { name: string; email: string; password: string }) {
    return this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Products
  async getProducts() {
    return this.request<{ id: number; name: string; description: string; price: number; image_url?: string; category?: string; }[]>('/products');
  }

  async getProduct(id: number) {
    return this.request<{ id: number; name: string; description: string; price: number; image_url?: string; category?: string; }>(`/products/${id}`);
  }

  // Cart
  async getCartItems() {
    return this.request<CartItem[]>('/cart');
  }

  async addToCart(product_id: number, quantity: number = 1) {
    return this.request<CartItem>('/cart', {
      method: 'POST',
      body: JSON.stringify({ product_id, quantity }),
    });
  }

  async updateCartItem(product_id: number, quantity: number) {
    return this.request<CartItem>('/cart', {
      method: 'PUT',
      body: JSON.stringify({ product_id, quantity }),
    });
  }

  async removeFromCart(product_id: number) {
    return this.request<{ message: string }>(`/cart/${product_id}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request<{ message: string }>('/cart', {
      method: 'DELETE',
    });
  }

  // Orders
  async getOrders() {
    return this.request<Order[]>('/orders');
  }

  async createOrder(orderData: any) {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }
}

export const apiClient = new ApiClient();

// Export types
export type { ApiResponse };