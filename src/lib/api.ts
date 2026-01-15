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
    // Initialize token from localStorage in the browser
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
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
      // Include credentials for authentication
      credentials: 'include',
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



  // Products
  async getProducts() {
    return this.request<{ id: number; name: string; description: string; price: number; image_url?: string; category?: string; }[]>('/products');
  }

  async getProduct(id: number) {
    return this.request<{ id: number; name: string; description: string; price: number; image_url?: string; category?: string; slug?: string; }>(`/products/${id}`);
  }
  
  async getProductBySlug(slug: string) {
    return this.request<{ id: number; name: string; description: string; price: number; image_url?: string; category?: string; slug?: string; }>(`/products/${slug}`);
  }

  async createProduct(productData: { name: string; description: string; price: number; image_url?: string; image_urls?: string[]; category?: string }) {
    return this.request<{ id: number; name: string; description: string; price: number; image_url?: string; images?: string[]; category?: string }>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: number, productData: { name: string; description: string; price: number; image_url?: string; image_urls?: string[]; category?: string }) {
    return this.request<{ id: number; name: string; description: string; price: number; image_url?: string; images?: string[]; category?: string }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: number) {
    return this.request<void>(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Search
  async searchProducts(params: {
    q?: string;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params.q) searchParams.append('q', params.q);
    if (params.search) searchParams.append('search', params.search);
    if (params.category) searchParams.append('category', params.category);
    if (params.minPrice !== undefined) searchParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) searchParams.append('maxPrice', params.maxPrice.toString());
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/search/products?${queryString}` : '/search/products';

    return this.request<{
      products: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
        hasMore: boolean;
      };
      filters: {
        search: string;
        category: string;
        minPrice: number | null;
        maxPrice: number | null;
      };
    }>(endpoint);
  }

  // Cart
  async getCartItems() {
    return this.request<CartItem[]>('/cart');
  }

  async addToCart(product_id: number, quantity: number = 1) {
    const headers: any = {
      'Content-Type': 'application/json',
    };
    
    // Only add authorization header if token exists
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return this.request<CartItem>('/cart', {
      method: 'POST',
      headers,
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
    // Instead of DELETE, send PUT request with quantity 0 to remove specific item
    return this.request<{ message: string }>('/cart', {
      method: 'PUT',
      body: JSON.stringify({ product_id, quantity: 0 }),
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

  // Checkout
  async createCheckoutSession(cartData: {
    items: any[];
    shipping_address: any;
  }) {
    return this.request<{
      razorpay_order_id: string;
      amount: number;
      currency: string;
      total_amount: number;
    }>('/checkout/create', {
      method: 'POST',
      body: JSON.stringify(cartData),
    });
  }

  async verifyPayment(paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {
    return this.request<{ order_id: string }>(
      '/checkout/verify',
      {
        method: 'POST',
        body: JSON.stringify(paymentData),
      }
    );
  }

  // Appointments
  async getAppointments(filters?: {
    status?: string;
    date?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    
    if (filters?.status) searchParams.append('status', filters.status);
    if (filters?.date) searchParams.append('date', filters.date);
    if (filters?.page) searchParams.append('page', filters.page.toString());
    if (filters?.limit) searchParams.append('limit', filters.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/appointments?${queryString}` : '/appointments';

    return this.request<{
      appointments: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
        hasMore: boolean;
      };
    }>(endpoint);
  }

  async createAppointment(appointmentData: {
    appointment_date: string;
    notes?: string;
  }) {
    return this.request<any>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async getAppointment(id: string) {
    return this.request<any>(`/appointments/${id}`);
  }

  async updateAppointment(id: string, updateData: {
    status?: string;
    notes?: string;
  }) {
    return this.request<any>(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteAppointment(id: string) {
    return this.request<{ message: string }>(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();

// Export types
export type { ApiResponse };