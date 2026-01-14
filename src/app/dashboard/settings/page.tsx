'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

const DashboardSettingsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [settings, setSettings] = useState<any>({
    shipping: {
      min_order_amount: 50000,
      flat_rate: 1500,
      enabled: true
    },
    tax: {
      rate: 0,
      type: 'percentage',
      enabled: false
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard/settings');
      return;
    }

    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // In a real application, fetch from API
      const mockSettings = {
        shipping: {
          min_order_amount: 50000,
          flat_rate: 1500,
          enabled: true
        },
        tax: {
          rate: 0,
          type: 'percentage',
          enabled: false
        }
      };
      setSettings(mockSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setSuccessMessage(null);

    try {
      // In a real application, save to API
      console.log('Saving settings:', settings);
      setSuccessMessage('Settings saved successfully!');

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!user || loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #f0f0f0',
            borderTop: '3px solid #c19a6b',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .settings-grid {
            grid-template-columns: 1fr !important;
          }
          .settings-action-buttons {
            flex-direction: column !important;
          }
          .settings-action-buttons button {
            width: 100% !important;
          }
        }
      `}</style>
      <DashboardLayout
      title="System Settings"
      description="Configure platform settings, shipping options, tax rates, and other system-wide preferences."
    >
      {successMessage && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <i className="fas fa-check-circle" style={{ fontSize: '20px', color: '#16a34a' }}></i>
          <p style={{ color: '#16a34a', fontSize: '14px', fontWeight: '600', margin: 0 }}>
            {successMessage}
          </p>
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSaveSettings(); }}>
        {/* Shipping Configuration */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <i className="fas fa-shipping-fast" style={{ fontSize: '20px', color: '#c19a6b' }}></i>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>
              Shipping Configuration
            </h3>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333'
            }}>
              <input
                type="checkbox"
                checked={settings.shipping.enabled}
                onChange={(e) => handleInputChange('shipping', 'enabled', e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                  accentColor: '#c19a6b'
                }}
              />
              Enable Shipping
            </label>
          </div>

          <div className="settings-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '8px'
              }}>
                Minimum Order Amount (₹)
              </label>
              <input
                type="number"
                value={settings.shipping.min_order_amount}
                onChange={(e) => handleInputChange('shipping', 'min_order_amount', parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #e8d5c4',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '8px'
              }}>
                Flat Shipping Rate (₹)
              </label>
              <input
                type="number"
                value={settings.shipping.flat_rate}
                onChange={(e) => handleInputChange('shipping', 'flat_rate', parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #e8d5c4',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Tax Configuration */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <i className="fas fa-receipt" style={{ fontSize: '20px', color: '#c19a6b' }}></i>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>
              Tax Configuration
            </h3>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333'
            }}>
              <input
                type="checkbox"
                checked={settings.tax.enabled}
                onChange={(e) => handleInputChange('tax', 'enabled', e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                  accentColor: '#c19a6b'
                }}
              />
              Enable Tax Calculation
            </label>
          </div>

          {settings.tax.enabled && (
            <div className="settings-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#666',
                  marginBottom: '8px'
                }}>
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={settings.tax.rate}
                  onChange={(e) => handleInputChange('tax', 'rate', parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #e8d5c4',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#666',
                  marginBottom: '8px'
                }}>
                  Tax Type
                </label>
                <select
                  value={settings.tax.type}
                  onChange={(e) => handleInputChange('tax', 'type', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #e8d5c4',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'white'
                  }}
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Site Configuration */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <i className="fas fa-cog" style={{ fontSize: '20px', color: '#c19a6b' }}></i>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>
              Site Information
            </h3>
          </div>

          <div style={{ padding: '16px', background: 'rgba(193, 154, 107, 0.05)', borderRadius: '8px' }}>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              Additional site configuration options will be available here. This includes site name, logo, contact information, and other general settings.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="settings-action-buttons" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="button"
            onClick={loadSettings}
            style={{
              padding: '10px 24px',
              border: '1px solid #e8d5c4',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              background: 'white',
              color: '#666',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(193, 154, 107, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '10px 24px',
              background: saving ? '#999' : 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(193, 154, 107, 0.2)'
            }}
          >
            {saving ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}></div>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </DashboardLayout>
    </>
  );
};

export default DashboardSettingsPage;
