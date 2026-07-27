'use client';

import React from 'react';
import Link from 'next/link';

interface SidebarNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'profile', label: 'Profile Information', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'orders', label: 'Order History', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'security', label: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-300 ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 font-medium shadow-inner'
                : 'hover:bg-gray-50 hover:text-amber-600'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <h3 className="font-bold text-amber-800">Account Status</h3>
          </div>
          <p className="mt-2 text-sm text-amber-700 font-medium">Active</p>
          <p className="mt-1 text-xs text-amber-600">Premium Member</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;