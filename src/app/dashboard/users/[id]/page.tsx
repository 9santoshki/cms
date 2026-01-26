'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

const UserDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user: currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth?redirect=/dashboard/users');
      return;
    }

    if (currentUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchUserDetails();
  }, [currentUser, params.id]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);

      const [usersResponse, ordersResponse, appointmentsResponse] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/orders'),
        fetch('/api/appointments')
      ]);

      const usersResult = await usersResponse.json();
      const ordersResult = await ordersResponse.json();
      const appointmentsResult = await appointmentsResponse.json();

      if (usersResult.success && usersResult.data) {
        const user = usersResult.data.find((u: any) => String(u.id) === String(params.id));
        setUserDetails(user);

        if (ordersResult.success && ordersResult.data) {
          const userOrders = ordersResult.data.filter((o: any) => String(o.user_id) === String(params.id));
          setOrders(userOrders);
        }

        if (appointmentsResult.success && appointmentsResult.data) {
          const userAppointments = appointmentsResult.data.filter((a: any) => String(a.user_id) === String(params.id));
          setAppointments(userAppointments);
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !userDetails) {
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
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title={`User: ${userDetails.name}`}
      description={`Detailed information and activity for ${userDetails.email}`}
    >
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <button
          onClick={() => router.push('/dashboard/users')}
          style={{
            padding: '10px 20px',
            background: 'white',
            border: '1px solid #e8d5c4',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            color: '#c19a6b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-arrow-left"></i>
          Back to Users
        </button>
      </div>

      {/* User Profile Card */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4'
      }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '24px', marginBottom: '24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: '600',
            flexShrink: 0
          }}>
            {userDetails.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', margin: 0 }}>
                {userDetails.name}
              </h2>
              <div style={{
                display: 'inline-block',
                padding: '6px 12px',
                background: userDetails.role === 'admin' ? 'rgba(139, 92, 246, 0.1)' :
                           userDetails.role === 'moderator' ? 'rgba(59, 130, 246, 0.1)' :
                           'rgba(34, 197, 94, 0.1)',
                color: userDetails.role === 'admin' ? '#8b5cf6' :
                       userDetails.role === 'moderator' ? '#3b82f6' :
                       '#22c55e',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {userDetails.role}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', marginBottom: '8px' }}>
              <i className="fas fa-envelope" style={{ fontSize: '14px' }}></i>
              <span style={{ fontSize: '15px' }}>{userDetails.email}</span>
            </div>
            <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#999' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fas fa-calendar-plus"></i>
                <span>Joined {new Date(userDetails.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fas fa-clock"></i>
                <span>Last updated {new Date(userDetails.updated_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          paddingTop: '24px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <div style={{
            padding: '16px',
            background: 'rgba(193, 154, 107, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(193, 154, 107, 0.1)'
          }}>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Total Orders</div>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#c19a6b' }}>{orders.length}</div>
          </div>
          <div style={{
            padding: '16px',
            background: 'rgba(59, 130, 246, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Appointments</div>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#3b82f6' }}>{appointments.length}</div>
          </div>
          <div style={{
            padding: '16px',
            background: 'rgba(34, 197, 94, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(34, 197, 94, 0.1)'
          }}>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Total Spent</div>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#22c55e' }}>
              ₹{orders.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fas fa-shopping-bag" style={{ color: '#c19a6b' }}></i>
          Orders ({orders.length})
        </h3>
        {orders.length === 0 ? (
          <p style={{ color: '#999', fontSize: '14px', textAlign: 'center', padding: '32px' }}>
            No orders yet
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#999' }}>Order ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#999' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#999' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#999' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#333' }}>#{order.id}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#666' }}>
                      {new Date(order.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        background: order.status === 'completed' ? 'rgba(34, 197, 94, 0.1)' :
                                   order.status === 'pending' ? 'rgba(251, 191, 36, 0.1)' :
                                   'rgba(239, 68, 68, 0.1)',
                        color: order.status === 'completed' ? '#22c55e' :
                               order.status === 'pending' ? '#fbbf24' :
                               '#ef4444',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: '#333', textAlign: 'right' }}>
                      ₹{parseFloat(order.total_amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Appointments Section */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fas fa-calendar-check" style={{ color: '#c19a6b' }}></i>
          Appointments ({appointments.length})
        </h3>
        {appointments.length === 0 ? (
          <p style={{ color: '#999', fontSize: '14px', textAlign: 'center', padding: '32px' }}>
            No appointments yet
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                style={{
                  padding: '16px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  background: 'rgba(193, 154, 107, 0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                      {appointment.service_type || 'Consultation'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#666' }}>
                      <i className="fas fa-calendar" style={{ marginRight: '6px' }}></i>
                      {new Date(appointment.appointment_date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    background: appointment.status === 'confirmed' ? 'rgba(34, 197, 94, 0.1)' :
                               appointment.status === 'pending' ? 'rgba(251, 191, 36, 0.1)' :
                               'rgba(239, 68, 68, 0.1)',
                    color: appointment.status === 'confirmed' ? '#22c55e' :
                           appointment.status === 'pending' ? '#fbbf24' :
                           '#ef4444',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {appointment.status}
                  </span>
                </div>
                {appointment.notes && (
                  <div style={{ fontSize: '13px', color: '#999', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
                    {appointment.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDetailsPage;
