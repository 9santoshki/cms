// Modular Context System
// This file now serves as an index for the modular context system.
// The original monolithic AppContext has been split into smaller, focused contexts:
//
// - AuthContext: Handles authentication state (user, token, login, logout)
// - CartStore (Zustand): Manages shopping cart functionality
// - ProductContext: Handles products, orders, and appointments
// - UIContext: Manages UI state (loading, errors)
//
// To use these contexts in your components, import the specific context you need:
//
// import { useAuth } from '@/context/AuthContext';
// import { useCartStore } from '@/store/cartStore';
// import { useProduct } from '@/context/ProductContext';
// import { useUI } from '@/context/UIContext';

export { useAuth } from './AuthContext';
export { useProduct } from './ProductContext';
export { useUI } from './UIContext';
export { AppProvider } from './AppProvider';
export { useAppContext } from './CombinedAppContext';