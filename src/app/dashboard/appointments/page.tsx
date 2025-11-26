'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const DashboardAppointmentsPage = () => {
  const router = useRouter();
  const { user, loading } = useAppContext();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading.user && !user) {
      router.push('/auth?redirect=/dashboard/appointments');
    } else if (user && (user.role === 'admin' || user.role === 'moderator')) {
      loadAppointments();
    } else {
      router.push('/dashboard'); // Redirect if not authorized
    }
  }, [user, loading]);

  const loadAppointments = async () => {
    setLoadingState(true);
    setError(null);
    
    try {
      // In a real application, this would fetch appointments from the API
      // For now, we'll use mock data
      const mockAppointments = [
        {
          id: '1',
          user_id: '123',
          appointment_date: '2023-12-15T10:00:00.000Z',
          status: 'confirmed',
          notes: 'Initial consultation for living room',
          user: { name: 'John Doe', email: 'john@example.com' },
          created_at: '2023-12-01T09:00:00.000Z'
        },
        {
          id: '2',
          user_id: '124',
          appointment_date: '2023-12-16T14:30:00.000Z',
          status: 'pending',
          notes: 'Follow-up meeting',
          user: { name: 'Jane Smith', email: 'jane@example.com' },
          created_at: '2023-12-02T11:15:00.000Z'
        },
        {
          id: '3',
          user_id: '125',
          appointment_date: '2023-12-17T16:00:00.000Z',
          status: 'completed',
          notes: 'Final design review',
          user: { name: 'Robert Johnson', email: 'robert@example.com' },
          created_at: '2023-12-03T13:30:00.000Z'
        }
      ];
      
      setAppointments(mockAppointments);
    } catch (err: any) {
      console.error('Error fetching appointments:', err);
      setError(err.message || 'Failed to load appointments');
    } finally {
      setLoadingState(false);
    }
  };

  // Apply status filter
  const filteredAppointments = statusFilter === 'all' 
    ? appointments 
    : appointments.filter(app => app.status === statusFilter);

  // Function to update appointment status
  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      // In a real application, this would call an API to update the appointment status
      console.log(`Updating appointment ${appointmentId} to status ${newStatus}`);
      
      // Update local state
      setAppointments(prev => 
        prev.map(app => 
          app.id === appointmentId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
      setError('Failed to update appointment status');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading.user || loadingState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-5xl text-red-500 mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access appointment management.
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
                <h1 className="text-xl font-bold text-gray-900">Appointment Management</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Dashboard
                </button>
                <span className="border-b-2 border-amber-500 text-amber-600 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Appointments
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
            <h2 className="text-base text-amber-600 font-semibold tracking-wide uppercase">Appointment Management</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Manage Customer Consultations
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
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <button
              onClick={loadAppointments}
              className="mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Refresh
            </button>
          </div>

          {loadingState ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📅</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600">
                {statusFilter === 'all' 
                  ? "No appointments to display." 
                  : `No ${statusFilter} appointments found.`}
              </p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <li key={appointment.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-amber-600 truncate">
                          Appointment #{appointment.id}
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'completed' ? 'bg-indigo-100 text-indigo-800' :
                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="mr-6 text-sm text-gray-500">
                            Customer: <span className="text-gray-900">{appointment.user?.name || 'N/A'}</span>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {formatDate(appointment.appointment_date)}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          {appointment.user?.email || 'N/A'}
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-2 text-sm text-gray-500">
                          <p>Notes: {appointment.notes}</p>
                        </div>
                      )}
                      
                      {/* Status update controls for admin/moderator */}
                      {user.role === 'admin' || user.role === 'moderator' ? (
                        <div className="mt-4 flex items-center">
                          <select
                            value={appointment.status}
                            onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => router.push(`/dashboard/appointments/${appointment.id}`)}
                            className="ml-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                          >
                            View Details
                          </button>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <button
                            onClick={() => router.push(`/dashboard/appointments/${appointment.id}`)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                          >
                            View Details
                          </button>
                        </div>
                      )}
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

export default DashboardAppointmentsPage;