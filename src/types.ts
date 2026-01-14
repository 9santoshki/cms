export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  permissions?: {
    can_edit_products?: boolean;
    can_edit_reviews?: boolean;
    can_edit_orders?: boolean;
    can_edit_payments?: boolean;
  };
  created_at?: string;
  updated_at?: string;
  avatar?: string;
  googleId?: string;
  // Add additional profile fields as needed
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  date_of_birth?: string;
  gender?: string;
  orders?: any[]; // Array of order objects
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
  sale_price?: number;
  category?: string;
  image_url?: string;
  imageClass?: string;
  dimensions?: string;
  material?: string;
  weight?: string;
  color?: string;
  warranty?: string;
  assembly_required?: boolean;
  images?: string[];
  primary_image?: string;
  stock_quantity?: number;
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
  // Cart item may reference a full product object or inline fields depending on API
  product?: Product;
  product_id?: number;
  quantity: number;
  // price can sometimes be a string from APIs
  price?: number | string;
  // Optional UI-friendly fields
  name?: string;
  description?: string;
  image_url?: string;
  imageClass?: string;
  // Optional field for tracking original price for discount calculations
  originalPrice?: number;
}

export interface Order {
  id: number;
  user_id: number;
  products: Array<{ product: Product, quantity: number }>;
  total?: number;
  total_amount?: number;
  status: string;
  created_at?: string;
  // some APIs use `date`
  date?: string;
  shipping_address?: string;
  billing_address?: string;
  // Optional arrays used across components
  items?: Array<{ id?: number; name?: string; product_name?: string; quantity: number; price?: number | string }>;
  customer?: { name?: string; email?: string; phone?: string };
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
  loading: LoadingState;
  error: ErrorState;
}