/**
 * Centralized authentication helpers for consistent auth checks
 * and modal management across the application
 */

/**
 * Check if user is currently authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const userData = localStorage.getItem('user');
  return !!userData;
};

/**
 * Show login modal using a global event
 */
export const showLoginModal = (): void => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('showLoginModal'));
};

/**
 * Close login modal using a global event
 */
export const closeLoginModal = (): void => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('closeLoginModal'));
};

/**
 * Store a pending action to be executed after authentication
 */
export const storePendingAction = (actionType: string, data: any): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('pendingAuthAction', JSON.stringify({
    type: actionType,
    data,
    timestamp: Date.now()
  }));
};

/**
 * Clear pending action
 */
export const clearPendingAction = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('pendingAuthAction');
};

/**
 * Get pending action
 */
export const getPendingAction = (): { type: string; data: any } | null => {
  if (typeof window === 'undefined') return null;
  const action = localStorage.getItem('pendingAuthAction');
  if (!action) return null;
  
  try {
    const parsed = JSON.parse(action);
    // Check if action is recent (within 5 minutes)
    if (Date.now() - parsed.timestamp > 5 * 60 * 1000) {
      clearPendingAction();
      return null;
    }
    return { type: parsed.type, data: parsed.data };
  } catch (e) {
    clearPendingAction();
    return null;
  }
};

/**
 * Store pending cart action
 */
export const storePendingCartAction = (product: any, quantity: number): void => {
  storePendingAction('addToCart', { product, quantity });
};

/**
 * Clear pending cart action
 */
export const clearPendingCartAction = (): void => {
  localStorage.removeItem('pendingCartAction');
};

/**
 * Store pending cart action (legacy key for compatibility)
 * Note: Using multiple keys to ensure backward compatibility
 */
export const storeLegacyPendingCartAction = (product: any, quantity: number): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('pendingCartAction', JSON.stringify({
    product,
    quantity,
    timestamp: Date.now()
  }));
};

/**
 * Get pending cart action (legacy)
 */
export const getLegacyPendingCartAction = (): any => {
  if (typeof window === 'undefined') return null;
  const action = localStorage.getItem('pendingCartAction');
  if (!action) return null;
  
  try {
    const parsed = JSON.parse(action);
    // Check if action is recent (within 5 minutes)
    if (Date.now() - parsed.timestamp > 5 * 60 * 1000) {
      clearPendingCartAction();
      return null;
    }
    return parsed;
  } catch (e) {
    clearPendingCartAction();
    return null;
  }
};