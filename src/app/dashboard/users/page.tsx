'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { getAllUserProfiles, updateUserRole } from '@/lib/supabase/auth';

const DashboardUsersPage = () => {
  const router = useRouter();
  const { user, loading } = useAppContext();
  const [users, setUsers] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading.user && !user) {
      router.push('/auth?redirect=/dashboard/users');
    } else if (user && user.role === 'admin') {
      loadUsers();
    } else {
      router.push('/dashboard'); // Redirect if not authorized
    }
  }, [user, loading]);

  const loadUsers = async () => {
    setLoadingState(true);
    setError(null);
    
    try {
      // In a real implementation, this would call getAllUserProfiles()
      // For now, we'll use mock data
      const mockUsers = [
        {
          id: '1',
          role: 'customer',
          created_at: '2023-11-01T10:00:00.000Z',
          updated_at: '2023-11-01T10:00:00.000Z',
          user_info: { name: 'John Doe', email: 'john@example.com' }
        },
        {
          id: '2',
          role: 'moderator',
          created_at: '2023-11-02T11:00:00.000Z',
          updated_at: '2023-11-15T14:30:00.000Z',
          user_info: { name: 'Jane Smith', email: 'jane@example.com' }
        },
        {
          id: '3',
          role: 'admin',
          created_at: '2023-11-03T12:00:00.000Z',
          updated_at: '2023-11-20T09:15:00.000Z',
          user_info: { name: 'Robert Johnson', email: 'robert@example.com' }
        },
        {
          id: '4',
          role: 'customer',
          created_at: '2023-11-04T13:00:00.000Z',
          updated_at: '2023-11-04T13:00:00.000Z',
          user_info: { name: 'Emily Davis', email: 'emily@example.com' }
        }
      ];
      
      setUsers(mockUsers);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to load users');
    } finally {
      setLoadingState(false);
    }
  };

  const updateUserRoleLocally = async (userId: string, newRole: string) => {
    try {
      // In a real implementation, this would call updateUserRole(userId, newRole)
      console.log(`Updating user ${userId} to ${newRole}`);
      
      // Update local state
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update user role');
    }
  };

  // Apply role filter
  const filteredUsers = roleFilter === 'all' 
    ? users 
    : users.filter(u => u.role === roleFilter);

  if (loading.user || loadingState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
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
            You don't have permission to access user management.
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
                <h1 className="text-xl font-bold text-gray-900">User Management</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Dashboard
                </button>
                <span className="border-b-2 border-amber-500 text-amber-600 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Users
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-8">
            <h2 className="text-base text-amber-600 font-semibold tracking-wide uppercase">User Management</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Manage User Roles
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Filter Controls */}
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <div>
              <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Role
              </label>
              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customer</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <button
              onClick={loadUsers}
              className="mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Refresh
            </button>
          </div>

          {loadingState ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">👥</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">
                {roleFilter === 'all' 
                  ? "No users to display." 
                  : `No ${roleFilter} users found.`}
              </p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredUsers.map((userItem) => (
                  <li key={userItem.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-amber-600 truncate">
                          {userItem.user_info?.name || 'Unknown User'}
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            userItem.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            userItem.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                            userItem.role === 'customer' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {userItem.role.charAt(0).toUpperCase() + userItem.role.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="mr-6 text-sm text-gray-500">
                            Email: <span className="text-gray-900">{userItem.user_info?.email || 'N/A'}</span>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Joined: {new Date(userItem.created_at).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          Last updated: {new Date(userItem.updated_at).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <div className="mr-4">
                          <label htmlFor={`role-select-${userItem.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Change Role
                          </label>
                          <select
                            id={`role-select-${userItem.id}`}
                            value={userItem.role}
                            onChange={(e) => updateUserRoleLocally(userItem.id, e.target.value)}
                            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                          >
                            <option value="customer">Customer</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                        <button
                          onClick={() => router.push(`/dashboard/users/${userItem.id}`)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardUsersPage;