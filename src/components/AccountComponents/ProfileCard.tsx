'use client';

import React from 'react';

interface ProfileCardProps {
  user: any;
  onEditClick: () => void;
  onViewOrders: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onEditClick, onViewOrders }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-100 shadow-md">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-4xl text-amber-700 font-semibold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            )}
          </div>
          <div className="absolute bottom-2 right-2 bg-amber-500 text-white rounded-full p-1.5 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Dashboard</h1>
          <p className="text-xl text-amber-600 font-medium mb-1">{user.name}</p>
          <p className="text-gray-600 mb-4 flex items-center justify-center md:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {user.email}
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-gray-50 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-600">Member since</p>
              <p className="font-semibold">{user.created_at ? new Date(user.created_at).getFullYear() : 'N/A'}</p>
            </div>

            <div className="bg-gray-50 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-600">Account Status</p>
              <p className="font-semibold text-green-600">Active</p>
            </div>

            <div className="bg-gray-50 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-semibold capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onEditClick}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg font-medium"
          >
            Edit Profile
          </button>

          <button
            className="px-6 py-3 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-medium"
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