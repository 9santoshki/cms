import { useAuth } from './AuthContext';
import { useProduct } from './ProductContext';
import { useCart } from './CartContext';
import { useUI } from './UIContext';

// Define the types based on UIContext interface
interface LoadingState {
  products: boolean;
  cart: boolean;
  orders: boolean;
  appointments: boolean;
  auth: boolean;
  user: boolean;
}

interface ErrorState {
  products: string | null;
  cart: string | null;
  orders: string | null;
  appointments: string | null;
  auth: string | null;
  user: string | null;
}

// Define the combined context interface
interface CombinedAppContext {
  // Auth context
  user: any;
  token: string | null;
  loading: any;
  error: string | null;
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: any) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;

  // Product context
  products: any[];
  orders: any[];
  appointments: any[];
  fetchProducts: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchAppointments: () => Promise<void>;
  createOrder: (orderData: any) => Promise<any>;
  createAppointment: (appointmentData: any) => Promise<any>;
  updateProduct: (id: number, data: any) => Promise<any>;
  deleteProduct: (id: number) => Promise<any>;
  createProduct: (productData: any) => Promise<any>;

  // Cart context
  cartItems: any[];
  cartCount: number;
  cartTotal: number;
  addItem: (item: any) => void;
  updateItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  addToCartWithAuth: (product: any, quantity: number) => any;

  // UI context (adapting to match the actual UIContext interface)
  uiLoading: LoadingState;
  uiError: ErrorState;
  setUILoading: (type: keyof LoadingState, value: boolean) => void;
  setUIError: (type: keyof ErrorState, value: string | null) => void;
}

export const useAppContext = (): CombinedAppContext => {
  const auth = useAuth();
  const product = useProduct();
  const cart = useCart();
  const ui = useUI();

  // Create a function to add to cart with authentication check
  const addToCartWithAuth = (product: any, quantity: number) => {
    if (!auth.user) {
      // Not authenticated
      return {
        success: false,
        requiresLogin: true,
        product,
        quantity
      };
    }

    // User is authenticated, add to cart
    cart.addItem({
      id: Date.now(), // temporary ID for cart item
      product_id: product.id,
      quantity: quantity,
      name: product.name,
      price: product.price,
      image_url: product.image_url
    });

    return {
      success: true,
      requiresLogin: false
    };
  };

  return {
    // Auth context
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
    error: auth.error,
    setUser: auth.setUser,
    setToken: auth.setToken,
    setLoading: auth.setLoading,
    setError: auth.setError,
    logout: auth.logout,
    signInWithGoogle: auth.signInWithGoogle,

    // Product context
    products: product.products,
    orders: product.orders,
    appointments: product.appointments,
    fetchProducts: product.fetchProducts,
    fetchOrders: product.fetchOrders,
    fetchAppointments: product.fetchAppointments,
    createOrder: product.createOrder,
    createAppointment: product.createAppointment,
    updateProduct: product.updateProduct,
    deleteProduct: product.deleteProduct,
    createProduct: product.createProduct,

    // Cart context
    cartItems: cart.items,
    cartCount: cart.cartCount,
    cartTotal: cart.cartTotal,
    addItem: cart.addItem,
    updateItem: cart.updateItem,
    removeItem: cart.removeItem,
    clearCart: cart.clearCart,
    addToCartWithAuth,

    // UI context (adapting to match the actual UIContext interface)
    uiLoading: ui.loading,
    uiError: ui.error,
    setUILoading: ui.setLoading,
    setUIError: ui.setError
  };
};