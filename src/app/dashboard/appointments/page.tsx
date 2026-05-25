'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

const DashboardAppointmentsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard/appointments');
      return;
    }

    if (user.role !== 'admin' && user.role !== 'moderator') {
      router.push('/dashboard');
      return;
    }

    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/appointments');
      const data = await response.json();
      if (data.success) {
        setAppointments(Array.isArray(data.data) ? data.data : []);
      } else {
        setAppointments([]);
      }
    } catch (err: unknown) {
      console.error('Error fetching appointments:', err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setAppointments(prev =>
          prev.map(app =>
            app.id === appointmentId ? { ...app, status: newStatus } : app
          )
        );
      }
    } catch (err: unknown) {
      console.error('Error updating appointment status:', err);
    }
  };

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
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading appointments...</p>
        </div>
      </div>
    );
  }

  const filteredAppointments = statusFilter === 'all'
    ? appointments
    : appointments.filter(app => app.status === statusFilter);

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .appointments-filter-bar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .appointments-filter-bar button {
            width: 100% !important;
          }
          .appointment-card-content {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .appointment-card-right {
            text-align: left !important;
          }
          .appointment-controls {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .appointment-controls select,
          .appointment-controls button {
            width: 100% !important;
          }
        }
      `}</style>
      <DashboardLayout
      title="Appointment Management"
      description="View and manage customer consultations, update appointment status, and track schedules."
    >
      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4'
      }}>
        <div className="appointments-filter-bar" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#666'
          }}>
            Filter by Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              border: '1px solid #e8d5c4',
              borderRadius: '6px',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div style={{ flex: 1 }}></div>
          <button
            onClick={fetchAppointments}
            style={{
              padding: '6px 16px',
              background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <i className="fas fa-sync-alt"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Appointments List */}
      {loading ? (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            border: '3px solid #f0f0f0',
            borderTop: '3px solid #c19a6b',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '12px', color: '#666', fontSize: '13px' }}>Loading appointments...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '32px 16px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <i className="fas fa-calendar-check" style={{ fontSize: '40px', color: '#e8d5c4', marginBottom: '12px' }}></i>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
            No Appointments Found
          </h3>
          <p style={{ color: '#666', fontSize: '13px' }}>
            {statusFilter === 'all' ? 'No appointments scheduled yet.' : `No ${statusFilter} appointments found.`}
          </p>
        </div>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          {filteredAppointments.map((appointment: any, index: number) => (
            <div
              key={appointment.id}
              style={{
                padding: '12px 16px',
                borderBottom: index < filteredAppointments.length - 1 ? '1px solid #f0f0f0' : 'none',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(193, 154, 107, 0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div className="appointment-card-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                    Consultation #{appointment.id}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <i className="fas fa-user" style={{ fontSize: '10px', color: '#999' }}></i>
                    <p style={{ fontSize: '12px', color: '#666' }}>
                      {appointment.user_name || appointment.guest_name || 'N/A'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <i className="fas fa-envelope" style={{ fontSize: '10px', color: '#999' }}></i>
                    <p style={{ fontSize: '12px', color: '#666' }}>
                      {appointment.user_email || appointment.guest_email || 'N/A'}
                    </p>
                  </div>
                  {(appointment.user_phone || appointment.guest_phone) && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <i className="fas fa-phone" style={{ fontSize: '10px', color: '#999' }}></i>
                      <p style={{ fontSize: '12px', color: '#666' }}>
                        {appointment.user_phone || appointment.guest_phone}
                      </p>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <i className="fas fa-calendar" style={{ fontSize: '10px', color: '#999' }}></i>
                    <p style={{ fontSize: '12px', color: '#666' }}>
                      Preferred: {formatDate(appointment.appointment_date)}
                    </p>
                  </div>
                  {appointment.service_type && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="fas fa-clock" style={{ fontSize: '10px', color: '#999' }}></i>
                      <p style={{ fontSize: '12px', color: '#666' }}>
                        {appointment.service_type}
                      </p>
                    </div>
                  )}
                </div>
                <div className="appointment-card-right" style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    background: appointment.status === 'completed' ? 'rgba(34, 197, 94, 0.1)' :
                               appointment.status === 'confirmed' ? 'rgba(59, 130, 246, 0.1)' :
                               appointment.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' :
                               appointment.status === 'cancelled' ? 'rgba(239, 68, 68, 0.1)' :
                               'rgba(156, 163, 175, 0.1)',
                    color: appointment.status === 'completed' ? '#16a34a' :
                           appointment.status === 'confirmed' ? '#3b82f6' :
                           appointment.status === 'pending' ? '#f59e0b' :
                           appointment.status === 'cancelled' ? '#ef4444' :
                           '#6b7280',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {appointment.status || 'Pending'}
                  </div>
                </div>
              </div>

              {appointment.notes && (
                <div style={{
                  padding: '8px 10px',
                  background: 'rgba(193, 154, 107, 0.03)',
                  borderRadius: '6px',
                  marginBottom: '8px',
                  borderLeft: '2px solid #c19a6b'
                }}>
                  <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                    <strong style={{ color: '#c19a6b' }}>Notes:</strong> {appointment.notes}
                  </p>
                </div>
              )}

              {/* Status update controls */}
              <div className="appointment-controls" style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
                <select
                  value={appointment.status}
                  onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                  style={{
                    padding: '6px 10px',
                    border: '1px solid #e8d5c4',
                    borderRadius: '6px',
                    fontSize: '12px',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'white'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => router.push(`/dashboard/appointments/${appointment.id}`)}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #e8d5c4',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    background: 'white',
                    color: '#c19a6b',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#c19a6b';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#c19a6b';
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
    </>
  );
};

export default DashboardAppointmentsPage;
