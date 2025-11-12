'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import '../App.css'; // Import the main CSS file

interface AuthFormProps {
  onClose?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose: _onClose = () => {} }) => {
  const { error, loading, setError, login, register } = useAppContext();
  const router = useRouter();

const navigate = (path: string) => {
  router.push(path);
};
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      if (isLogin) {
        // Login validation
        if (!formData.email || !formData.password) {
          throw new Error('Please fill in all fields');
        }
        
        await login({
          email: formData.email,
          password: formData.password
        });
        
        navigate('/'); // Navigate to home page after login
      } else {
        // Registration validation
        if (!formData.name || !formData.email || !formData.password) {
          throw new Error('Please fill in all fields');
        }
        
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        // Password strength validation
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          throw new Error('Password must contain at least one lowercase letter, one uppercase letter, and one digit');
        }
        
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        
        navigate('/'); // Navigate to home page after registration
      }
    } catch (err) {
      console.error('Auth error:', err);
      // Error is handled by the context
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to continue' : 'Join us today'}</p>
        </div>
        
        {error.auth && <div className="error-message">{error.auth}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {!isLogin && (
              <div className="password-hint">
                Password must be at least 6 characters and contain uppercase, lowercase, and digit
              </div>
            )}
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn primary auth-button"
            disabled={loading.auth}
          >
            {loading.auth ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        
        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => {
              setIsLogin(!isLogin);
              setError('auth', '');
            }}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;