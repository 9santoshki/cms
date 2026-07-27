import { useEffect, useCallback } from 'react';

/**
 * Custom hook to manage authentication modal
 */
export const useAuthModal = () => {
  const openAuthModal = useCallback(() => {
    const event = new CustomEvent('showLoginModal');
    window.dispatchEvent(event);
  }, []);

  const closeAuthModal = useCallback(() => {
    const event = new CustomEvent('closeLoginModal');
    window.dispatchEvent(event);
  }, []);

  return {
    openAuthModal,
    closeAuthModal
  };
};

/**
 * Hook to show login modal when authentication is required
 */
export const useRequireAuth = () => {
  const { openAuthModal } = useAuthModal();

  const requireAuth = useCallback((onAuthenticated: () => void, onCancel?: () => void) => {
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    if (userData) {
      onAuthenticated();
    } else {
      localStorage.setItem('pendingAuthAction', JSON.stringify({
        type: 'callback',
        action: onAuthenticated.toString()
      }));

      openAuthModal();

      const handleAuthSuccess = () => {
        const pendingAction = localStorage.getItem('pendingAuthAction');
        if (pendingAction) {
          try {
            localStorage.removeItem('pendingAuthAction');
          } catch (e) {
            console.error('Error executing pending auth action:', e);
          }
        }
        window.removeEventListener('authSuccess', handleAuthSuccess);
      };

      window.addEventListener('authSuccess', handleAuthSuccess);

      const handleModalClose = () => {
        if (onCancel) onCancel();
        localStorage.removeItem('pendingAuthAction');
        window.removeEventListener('loginModalClose', handleModalClose);
      };

      window.addEventListener('loginModalClose', handleModalClose);
    }
  }, [openAuthModal]);

  return {
    requireAuth
  };
};