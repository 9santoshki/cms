// Define TypeScript interfaces for our application

export interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  imageClass: string;
  [key: string]: any;
}

export interface CartItem {
  id: number;
  user_id?: number;
  product_id?: number;
  quantity: number;
  price?: number;
  [key: string]: any;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  [key: string]: any;
}

export interface LoadingState {
  products: boolean;
  cart: boolean;
  orders: boolean;
  auth: boolean;
}

export interface ErrorState {
  products: string | null;
  cart: string | null;
  orders: string | null;
  auth: string | null;
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