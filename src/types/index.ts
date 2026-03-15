// Define TypeScript interfaces for our application

export type UserRole = 'customer' | 'moderator' | 'admin';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'completed'
  | 'cancelled';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  image_url?: string;
  images?: string[];
  primary_image?: string;
  category?: string;
  slug?: string;
  stock_quantity?: number;
  /** CSS class name used for background-image styling */
  imageClass?: string;
  /** Physical dimensions (e.g. "80cm x 70cm x 45cm") */
  dimensions?: string;
  material?: string;
  weight?: string;
  color?: string;
  warranty?: string;
  assembly_required?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id: number;
  user_id: number;
  product_id: number;
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
  id?: number;
  user_id?: number;
  product_id: number;
  quantity: number;
  name?: string;
  description?: string;
  image_url?: string;
  imageClass?: string;
  price: number;
  /** Original pre-discount price for display purposes */
  originalPrice?: number;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  items: CartItem[];
  status: OrderStatus;
  customer: OrderCustomer;
  created_at?: string;
  updated_at?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  tracking_number?: string;
  tracking_carrier?: string;
  tracking_url?: string;
}

export interface Appointment {
  id: number;
  user_id: number;
  appointment_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
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
