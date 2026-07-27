'use client';

import React, { useState } from 'react';

interface ProfileFormProps {
  profileData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profileData, onChange, onSave, onCancel, loading }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">Edit Profile Information</h2>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={onChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={onChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition bg-gray-50 text-sm"
              readOnly
              disabled
            />
            <p className="mt-0.5 text-xs text-gray-500">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={onChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={profileData.gender}
              onChange={onChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={profileData.date_of_birth}
              onChange={onChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={onChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={profileData.city}
              onChange={onChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              name="state"
              value={profileData.state}
              onChange={onChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={profileData.country}
              onChange={onChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              type="text"
              name="postal_code"
              value={profileData.postal_code}
              onChange={onChange}
              className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors font-medium text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded hover:from-amber-600 hover:to-amber-700 disabled:opacity-70 transition-all duration-300 font-medium text-xs"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              'Save Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;