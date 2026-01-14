// Define TypeScript interfaces for our application
export interface User {
  id: string; // UUID
  name: string;
  email: string;
  phone?: string; // Phone number
  avatar?: string; // Google profile picture URL
  role: 'customer' | 'moderator' | 'admin';
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  sale_price?: number;
  image_url?: string;
  images?: string[];
  primary_image?: string;
  category?: string;
  slug?: string;
  stock_quantity?: number;
  [key: string]: any;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  user_name?: string;
  user_email?: string;
  user_avatar?: string;
  product_name?: string;
}

export interface CartItem {
  id: number;
  user_id?: number;
  product_id: number;
  quantity: number;
  name?: string;
  description?: string;
  image_url?: string;
  imageClass?: string;
  price: number | string;
  [key: string]: any;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  items: CartItem[];
  status: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  created_at?: string;
  [key: string]: any;
}

export interface Appointment {
  id: string;
  user_id: string;
  appointment_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoadingState {
  products: boolean;
  cart: boolean;
  orders: boolean;
  auth: boolean;
  user: boolean;
}

export interface ErrorState {
  products: string | null;
  cart: string | null;
  orders: string | null;
  auth: string | null;
  user: string | null;
}

export interface State {
  user: User | null;
  token: string | null;
  products: Product[];
  cartItems: CartItem[];
  orders: Order[];
  showAuthModal?: boolean;
  loading: LoadingState;
  error: ErrorState;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}