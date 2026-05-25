'use client';

import React from 'react';

interface ProfileCardProps {
  user: any;
  onEditClick: () => void;
  onViewOrders: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onEditClick, onViewOrders }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-100 shadow-sm">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-xl text-amber-700 font-semibold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-lg font-bold text-gray-900 mb-1">Account Dashboard</h1>
          <p className="text-sm text-amber-600 font-medium mb-1">{user.name}</p>
          <p className="text-xs text-gray-600 flex items-center justify-center md:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {user.email}
          </p>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
            <div className="bg-gray-50 rounded px-2 py-1">
              <p className="text-xs text-gray-600">Member since</p>
              <p className="text-xs font-semibold">{user.created_at ? new Date(user.created_at).getFullYear() : 'N/A'}</p>
            </div>

            <div className="bg-gray-50 rounded px-2 py-1">
              <p className="text-xs text-gray-600">Status</p>
              <p className="text-xs font-semibold text-green-600">Active</p>
            </div>

            <div className="bg-gray-50 rounded px-2 py-1">
              <p className="text-xs text-gray-600">Role</p>
              <p className="text-xs font-semibold capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <button
            onClick={onEditClick}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow font-medium text-xs"
          >
            Edit Profile
          </button>

          <button
            className="px-3 py-1.5 border border-amber-600 text-amber-600 rounded hover:bg-amber-50 transition-colors font-medium text-xs"
            onClick={onViewOrders}
          >
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;