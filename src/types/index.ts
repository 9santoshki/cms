// Define TypeScript interfaces for our application

export type UserRole = 'customer' | 'moderator' | 'admin' | 'supplier';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'completed'
  | 'cancelled';

// ============================================================================
// Variant Types (product variations: thickness, size, color)
// ============================================================================

/** Option type category (e.g., thickness, size, color) */
export interface VariantOptionType {
  id: number;
  name: string;           // 'thickness', 'size', 'color'
  display_name: string;   // 'Thickness', 'Size', 'Color'
  description?: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

/** Specific option value for an option type (e.g., 'thin' for thickness) */
export interface VariantOption {
  id: number;
  option_type_id: number;
  value: string;          // 'thin', '12x18', 'black'
  display_value: string;  // 'Thin (Standard Paper)', '12×18 inches', 'Black'
  price_modifier?: number; // Additional cost for this option
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

/** Product variant SKU with specific option combinations */
export interface ProductVariant {
  id: number;
  product_id: number;
  sku?: string;
  price: number;
  sale_price?: number;
  stock_quantity: number;
  is_active: boolean;
  /** The options that define this variant (populated on fetch) */
  options?: VariantOption[];
  /** Human-readable variant description (e.g., 'Thick / 24×36 inches / Black') */
  variant_name?: string;
  created_at?: string;
  updated_at?: string;
}

/** Link between variant and its selected options */
export interface ProductVariantValue {
  id: number;
  variant_id: number;
  option_id: number;
}

// ============================================================================
// Core Types
// ============================================================================

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

// ============================================================================
// Supplier Types (inventory management partners)
// ============================================================================

/** Supplier profile with business details */
export interface Supplier {
  id: number;
  user_id: number;
  company_name: string;
  contact_person?: string;
  phone?: string;
  address?: string;
  gst_id?: string;
  is_active: boolean;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  /** User details joined from users table */
  user?: User;
}

/** Assignment of variant to supplier for inventory management */
export interface SupplierVariant {
  id: number;
  supplier_id: number;
  variant_id: number;
  assigned_at: string;
  assigned_by?: number;
  notes?: string;
  /** Variant details joined from product_variants */
  variant?: ProductVariant;
}

/** Audit log entry for inventory changes */
export interface InventoryLog {
  id: number;
  variant_id: number;
  previous_quantity: number;
  new_quantity: number;
  change_quantity: number;
  changed_by?: number;
  change_type: 'supplier_update' | 'admin_update' | 'order' | 'return';
  notes?: string;
  created_at: string;
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
  /** Selected variant ID (if product has variants) */
  variant_id?: number;
  quantity: number;
  name?: string;
  description?: string;
  image_url?: string;
  imageClass?: string;
  price: number;
  /** Original pre-discount price for display purposes */
  originalPrice?: number;
  /** Human-readable variant description (e.g., 'Thick / 24×36 / Black') */
  variant_name?: string;
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
