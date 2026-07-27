import { useMemo } from 'react';
import { useAuth, type AuthContextValue } from './AuthContext';
import { useProduct } from './ProductContext';
import { useCartStore } from '@/store/cartStore';
import { useUI } from './UIContext';
import type { User, Product, Order, Appointment, CartItem } from '@/types';

// ---------------------------------------------------------------------------
// Local aliases for UIContext state shapes
// ---------------------------------------------------------------------------
interface UILoadingState {
  products: boolean;
  cart: boolean;
  orders: boolean;
  appointments: boolean;
  auth: boolean;
  user: boolean;
}

interface UIErrorState {
  products: string | null;
  cart: string | null;
  orders: string | null;
  appointments: string | null;
  auth: string | null;
  user: string | null;
}

// ---------------------------------------------------------------------------
// Typed combined context interface
// ---------------------------------------------------------------------------
export interface CombinedAppContextValue {
  // Auth
  user: User | null;
  token: string | null;
  /** UIContext loading state — use `.user`, `.products`, `.orders`, etc. */
  loading: UILoadingState;
  /** Auth-specific boolean loading flag (for auth/login checks) */
  authLoading: boolean;
  error: string | null;
  setUser: AuthContextValue['setUser'];
  setToken: AuthContextValue['setToken'];
  setLoading: AuthContextValue['setLoading'];
  setError: AuthContextValue['setError'];
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;

  // Products / orders / appointments
  products: Product[];
  orders: Order[];
  appointments: Appointment[];
  fetchProducts: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchAppointments: () => Promise<void>;
  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  createAppointment: (appointmentData: Partial<Appointment>) => Promise<Appointment>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: number) => Promise<boolean>;
  createProduct: (productData: Partial<Product>) => Promise<Product>;

  // Cart (from Zustand)
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addItem: (item: CartItem) => void;
  updateItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  addToCartWithAuth: (product: Product, quantity: number) => { success: boolean; requiresLogin: boolean; product?: Product; quantity?: number };

  // UI state
  uiLoading: UILoadingState;
  uiError: UIErrorState;
  setUILoading: (type: keyof UILoadingState, value: boolean) => void;
  setUIError: (type: keyof UIErrorState, value: string | null) => void;
}

export function useAppContext(): CombinedAppContextValue {
  const auth = useAuth();
  const product = useProduct();
  const ui = useUI();

  const cartItems = useCartStore((state) => state.items);
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const cartTotal = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const addItem = useCartStore((state) => state.addItem);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const addToCartWithAuth = useMemo(
    () => (p: Product, quantity: number) => {
      if (!auth.user) {
        return { success: false, requiresLogin: true, product: p, quantity };
      }

      addItem({
        id: Date.now(),
        product_id: p.id,
        quantity,
        name: p.name,
        price: p.price,
        image_url: p.image_url,
      });

      return { success: true, requiresLogin: false };
    },
    [auth.user, addItem]
  );

  return useMemo<CombinedAppContextValue>(
    () => ({
      // Auth
      user: auth.user,
      token: auth.token,
      loading: ui.loading,
      authLoading: auth.loading,
      error: auth.error,
      setUser: auth.setUser,
      setToken: auth.setToken,
      setLoading: auth.setLoading,
      setError: auth.setError,
      logout: auth.logout,
      signInWithGoogle: auth.signInWithGoogle,

      // Product
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

      // Cart
      cartItems,
      cartCount,
      cartTotal,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      addToCartWithAuth,

      // UI
      uiLoading: ui.loading,
      uiError: ui.error,
      setUILoading: ui.setLoading,
      setUIError: ui.setError,
    }),
    [
      auth, product,
      cartItems, cartCount, cartTotal,
      addItem, updateItem, removeItem, clearCart, addToCartWithAuth,
      ui,
    ]
  );
}
