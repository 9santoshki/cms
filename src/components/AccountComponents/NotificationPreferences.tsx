'use client';

import React, { useState } from 'react';

interface NotificationPreferencesProps {
  preferences: any;
  onSave: (preferences: any) => void;
  loading: boolean;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ 
  preferences, 
  onSave,
  loading 
}) => {
  const [localPrefs, setLocalPrefs] = useState(preferences);

  const handleToggle = (field: string) => {
    const newPrefs = {
      ...localPrefs,
      [field]: !localPrefs[field]
    };
    setLocalPrefs(newPrefs);
  };

  const handleSave = () => {
    onSave(localPrefs);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Notification Preferences</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
          <div>
            <h3 className="font-bold text-gray-900">Order Updates</h3>
            <p className="text-sm text-gray-600 mt-1">Receive updates about your orders</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={localPrefs.orderUpdates || false}
              onChange={() => handleToggle('orderUpdates')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
          <div>
            <h3 className="font-bold text-gray-900">Promotional Offers</h3>
            <p className="text-sm text-gray-600 mt-1">Special deals and offers</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={localPrefs.promoOffers || false}
              onChange={() => handleToggle('promoOffers')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
          <div>
            <h3 className="font-bold text-gray-900">Newsletter</h3>
            <p className="text-sm text-gray-600 mt-1">Monthly newsletter with new products</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={localPrefs.newsletter || false}
              onChange={() => handleToggle('newsletter')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 disabled:opacity-70 transition-all duration-300 shadow-lg font-medium"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8h-1.5a6.5 6.5 0 10-13 0v0z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            'Save Preferences'
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;