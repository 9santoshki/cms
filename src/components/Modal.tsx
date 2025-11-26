'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title = '', 
  size = 'md' 
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'max-w-sm w-full',
    md: 'max-w-md w-full', 
    lg: 'max-w-lg w-full',
    xl: 'max-w-xl w-full'
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative bg-white rounded-2xl shadow-2xl ${sizeClasses[size]} overflow-hidden`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-amber-100 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              </div>
            )}
            
            <button
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors duration-200 z-10 shadow-md"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;