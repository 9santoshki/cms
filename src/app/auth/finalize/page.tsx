'use client';

import { useEffect } from 'react';

export default function AuthFinalizePage() {
  useEffect(() => {
    const finalizeAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const tempToken = urlParams.get('token');

        if (!tempToken) {
          setTimeout(() => window.location.href = '/', 2000);
          return;
        }

        const response = await fetch('/api/auth/finalize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ tempToken }),
        });

        const data = await response.json();

        if (response.ok) {
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          console.error('Login failed:', data);
          setTimeout(() => window.location.href = '/', 2000);
        }
      } catch (error) {
        console.error('Error in finalize:', error);
        setTimeout(() => window.location.href = '/', 2000);
      }
    };

    finalizeAuth();
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif',
      background: '#f5f5f5'
    }}>
      <div style={{
        padding: '3rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
        minWidth: '400px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 2rem'
        }}></div>
        <h2 style={{ marginBottom: '1rem', color: '#333', fontSize: '24px' }}>
          Finalizing Login...
        </h2>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Please wait while we complete your login
        </p>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
