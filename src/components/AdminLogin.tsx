'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import '../App.css'; // Import the main CSS file

const AdminLogin = () => {
  const router = useRouter();

const navigate = (path: string) => {
  router.push(path);
};
  const { user, login, loading, error, setError } = useAppContext();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error.auth) setError('auth', '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Admin login validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }
      
      await login({
        email: formData.email,
        password: formData.password
      });
    } catch (err) {
      console.error('Login error:', err);
      // Error is handled by the context
    }
  };

  // Redirect to admin panel automatically if user becomes an admin
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    } else if (user && user.role !== 'admin') {
      setError('auth', 'Access denied: Admin privileges required');
    }
  }, [user, navigate, setError]);

  // Add a secret mechanism for admin login
  const [secretAccess, setSecretAccess] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  
  const handleSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would verify against a secure key
    // For this demo, we'll use a simple hardcoded key
    if (secretKey === 'admin-secret-key-2023') { // This would be securely stored
      setSecretAccess(true);
    } else {
      alert('Invalid secret key. Access denied.');
    }
  };
  
  if (!secretAccess) {
    return (
      <div className="auth-page">
        <div className="auth-container" style={{ maxWidth: '500px', margin: '80px auto', padding: '30px' }}>
          <div className="auth-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ color: '#222', marginBottom: '10px' }}>Admin Access</h2>
            <p style={{ color: '#666' }}>Enter the secret key to access admin panel</p>
          </div>
          
          <form onSubmit={handleSecretSubmit} className="auth-form">
            <div className="form-group" style={{ marginBottom: '25px' }}>
              <input
                type="text"
                placeholder="Secret Key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '0',
                  fontSize: '16px'
                }}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn primary auth-button"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px'
              }}
            >
              Access Admin Panel
            </button>
          </form>
          
          <div className="auth-toggle" style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>
              <a 
                href="/auth" 
                style={{ 
                  color: '#c19a6b', 
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Back to User Login
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: '500px', margin: '80px auto', padding: '30px' }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#222', marginBottom: '10px' }}>Admin Login</h2>
          <p style={{ color: '#666' }}>Enter your admin credentials</p>
        </div>
        
        {error.auth && <div className="error-message" style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '12px', 
          borderRadius: '0',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>{error.auth}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #ddd',
                borderRadius: '0',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '25px' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid #ddd',
                borderRadius: '0',
                fontSize: '16px'
              }}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn primary auth-button"
            disabled={loading.auth}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px'
            }}
          >
            {loading.auth ? 'Signing In...' : 'Sign In as Admin'}
          </button>
        </form>
        
        <div className="auth-toggle" style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>
            <button 
              onClick={() => setSecretAccess(false)}
              style={{ 
                color: '#c19a6b', 
                textDecoration: 'none',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Back to Secret Key
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;