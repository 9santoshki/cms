// API utility functions for making requests to our Next.js API routes
import type { CartItem, Order, Appointment, Product } from '@/types';

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

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...(options.headers as Record<string, string>),
    };

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include',
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      return data as ApiResponse<T>;
    } catch (err: unknown) {
      console.error(`API request error to ${url}:`, err);
      return {
        success: false,
        error: 'Network error or server unavailable',
      };
    }
  }

  // Products
  async getProducts() {
    return this.request<Product[]>('/products');
  }

  async getProduct(id: number) {
    return this.request<Product>(`/products/${id}`);
  }

  async getProductBySlug(slug: string) {
    return this.request<Product>(`/products/${slug}`);
  }

  async createProduct(productData: {
    name: string;
    description: string;
    price: number;
    image_url?: string;
    image_urls?: string[];
    category?: string;
  }) {
    return this.request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(
    id: number,
    productData: {
      name: string;
      description: string;
      price: number;
      image_url?: string;
      image_urls?: string[];
      category?: string;
    }
  ) {
    return this.request<Product>(`/products/${id}`, {
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
      products: Product[];
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

  async addToCart(product_id: number, quantity = 1) {
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

  async createOrder(orderData: Partial<Order>) {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Checkout
  async createCheckoutSession(cartData: {
    items: Array<{ product_id?: number; quantity: number; price: number; name?: string }>;
    shipping_address: unknown;
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
    return this.request<{ order_id: string }>('/checkout/verify', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
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
      appointments: Appointment[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
        hasMore: boolean;
      };
    }>(endpoint);
  }

  async createAppointment(appointmentData: { appointment_date: string; notes?: string }) {
    return this.request<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async getAppointment(id: string) {
    return this.request<Appointment>(`/appointments/${id}`);
  }

  async updateAppointment(id: string, updateData: { status?: string; notes?: string }) {
    return this.request<Appointment>(`/appointments/${id}`, {
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

export type { ApiResponse };
