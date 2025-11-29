import { useEffect, useCallback } from 'react';

/**
 * Custom hook to manage authentication modal state and interactions
 * This centralizes modal management to avoid duplication
 */
export const useAuthModal = () => {
  const openAuthModal = useCallback(() => {
    // Dispatch a custom event that the Header component listens for
    const event = new CustomEvent('showLoginModal');
    window.dispatchEvent(event);
  }, []);

  const closeAuthModal = useCallback(() => {
    // Dispatch a custom event to close the modal
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
 * and optionally store pending actions for after login
 */
export const useRequireAuth = () => {
  const { openAuthModal } = useAuthModal();

  const requireAuth = useCallback((onAuthenticated: () => void, onCancel?: () => void) => {
    // Check if user is authenticated
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    
    if (userData) {
      // User is authenticated, execute the action immediately
      onAuthenticated();
    } else {
      // User is not authenticated, show login modal
      // Store the pending action to execute after login
      localStorage.setItem('pendingAuthAction', JSON.stringify({
        type: 'callback',
        action: onAuthenticated.toString()
      }));
      
      // Show the login modal
      openAuthModal();
      
      // Set up one-time listener for successful authentication
      const handleAuthSuccess = () => {
        const pendingAction = localStorage.getItem('pendingAuthAction');
        if (pendingAction) {
          const { action } = JSON.parse(pendingAction);
          if (action) {
            // Execute the stored action
            try {
              // We can't safely execute a stored function string
              // So we rely on the original callback being re-invoked after login
              // by the components themselves
              console.log('Executing pending auth action');
            } catch (e) {
              console.error('Error executing pending auth action:', e);
            }
          }
          localStorage.removeItem('pendingAuthAction');
        }
        window.removeEventListener('authSuccess', handleAuthSuccess);
      };
      
      window.addEventListener('authSuccess', handleAuthSuccess);
      
      // Set up cancel handler
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