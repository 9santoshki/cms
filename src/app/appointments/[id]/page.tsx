'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter, useParams } from 'next/navigation';

const AppointmentDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAppContext();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/appointments');
      return;
    }
    
    fetchAppointment();
  }, [user, router, params.id]);

  // Fetch appointment from API
  const fetchAppointment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/appointments/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming JWT token
        }
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch appointment');
      }

      setAppointment(result.data);
      setNotes(result.data.notes || '');
    } catch (err: any) {
      console.error('Fetch appointment error:', err);
      setError(err.message || 'An error occurred while fetching appointment');
    } finally {
      setLoading(false);
    }
  };

  // Update appointment notes
  const updateNotes = async () => {
    try {
      const response = await fetch(`/api/appointments/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ notes })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to update appointment');
      }

      setAppointment({ ...appointment, notes });
      setIsEditing(false);
    } catch (err: any) {
      console.error('Update appointment error:', err);
      setError(err.message || 'Failed to update appointment');
    }
  };

  // Cancel appointment
  const cancelAppointment = async () => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to cancel appointment');
      }

      setAppointment({ ...appointment, status: 'cancelled' });
    } catch (err: any) {
      console.error('Cancel appointment error:', err);
      setError(err.message || 'Failed to cancel appointment');
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

  // Get status class for display
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="booking" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Appointment Details</h1>
          <button
            onClick={() => router.push('/appointments')}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Back to Appointments
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : appointment ? (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Interior Design Consultation</h2>
                <p className="text-gray-600">Appointment ID: {appointment.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(appointment.status)}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {formatDate(appointment.appointment_date)}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-sm text-amber-600 hover:text-amber-700"
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Add any specific requirements or questions for the consultation..."
                    ></textarea>
                    <div className="flex gap-3">
                      <button
                        onClick={updateNotes}
                        disabled={loading}
                        className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setNotes(appointment.notes || '');
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-gray-900 whitespace-pre-line">
                    {appointment.notes || 'No special notes provided.'}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons based on status */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-3">
                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                  <button
                    onClick={cancelAppointment}
                    className="px-6 py-3 bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50"
                  >
                    Cancel Appointment
                  </button>
                )}
                
                {appointment.status === 'pending' && (
                  <button
                    onClick={() => alert('Our team will confirm your appointment shortly.')}
                    className="px-6 py-3 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200"
                  >
                    Request Change
                  </button>
                )}
                
                <button
                  onClick={() => router.push('/booking')}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Book Another Consultation
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📅</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Appointment Not Found</h3>
            <p className="text-gray-600 mb-6">The appointment you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.push('/appointments')}
              className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              View All Appointments
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AppointmentDetailPage;