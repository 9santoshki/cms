'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const DashboardSettingsPage = () => {
  const router = useRouter();
  const { user, loading } = useAppContext();
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
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading.user && !user) {
      router.push('/auth?redirect=/dashboard/settings');
    } else if (user && user.role === 'admin') {
      loadSettings();
    } else {
      router.push('/dashboard'); // Redirect if not authorized
    }
  }, [user, loading]);

  const loadSettings = async () => {
    setLoadingState(true);
    setError(null);
    
    try {
      // Simulate loading settings from API
      // In a real application, this would fetch from the database
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
    } catch (err: any) {
      console.error('Error loading settings:', err);
      setError(err.message || 'Failed to load settings');
    } finally {
      setLoadingState(false);
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
    setError(null);
    setSuccessMessage(null);
    
    try {
      // Simulate saving settings to API
      // In a real application, this would save to the database
      console.log('Saving settings:', settings);
      setSuccessMessage('Settings saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Error saving settings:', err);
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading.user || loadingState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-5xl text-red-500 mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access system settings.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">System Settings</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Dashboard
                </button>
                <span className="border-b-2 border-amber-500 text-amber-600 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Settings
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="text-sm text-gray-700">
                  Welcome, <span className="font-medium capitalize">{user.role}</span> {user.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-8">
            <h2 className="text-base text-amber-600 font-semibold tracking-wide uppercase">System Settings</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Configure Platform Settings
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSaveSettings(); }}>
            {/* Shipping Configuration */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Shipping Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="shipping-enabled"
                    name="shipping-enabled"
                    type="checkbox"
                    checked={settings.shipping.enabled}
                    onChange={(e) => handleInputChange('shipping', 'enabled', e.target.checked)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="shipping-enabled" className="ml-2 block text-sm text-gray-900">
                    Enable Shipping
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="min-order-amount" className="block text-sm font-medium text-gray-700">
                      Minimum Order Amount (₹)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="min-order-amount"
                        value={settings.shipping.min_order_amount}
                        onChange={(e) => handleInputChange('shipping', 'min_order_amount', parseFloat(e.target.value))}
                        className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="flat-rate" className="block text-sm font-medium text-gray-700">
                      Flat Shipping Rate (₹)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="flat-rate"
                        value={settings.shipping.flat_rate}
                        onChange={(e) => handleInputChange('shipping', 'flat_rate', parseFloat(e.target.value))}
                        className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Configuration */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Tax Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="tax-enabled"
                    name="tax-enabled"
                    type="checkbox"
                    checked={settings.tax.enabled}
                    onChange={(e) => handleInputChange('tax', 'enabled', e.target.checked)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="tax-enabled" className="ml-2 block text-sm text-gray-900">
                    Enable Tax Calculation
                  </label>
                </div>

                {settings.tax.enabled && (
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="tax-rate" className="block text-sm font-medium text-gray-700">
                        Tax Rate (%)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          id="tax-rate"
                          value={settings.tax.rate}
                          onChange={(e) => handleInputChange('tax', 'rate', parseFloat(e.target.value))}
                          className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="tax-type" className="block text-sm font-medium text-gray-700">
                        Tax Type
                      </label>
                      <div className="mt-1">
                        <select
                          id="tax-type"
                          value={settings.tax.type}
                          onChange={(e) => handleInputChange('tax', 'type', e.target.value)}
                          className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="percentage">Percentage</option>
                          <option value="fixed">Fixed Amount</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save Settings'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettingsPage;