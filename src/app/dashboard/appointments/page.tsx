'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { LoadingSpinner, EmptyState, STATUS_COLORS } from '@/components/DashboardShared';

const DashboardAppointmentsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!user) { router.push('/auth?redirect=/dashboard/appointments'); return; }
    if (user.role !== 'admin' && user.role !== 'moderator') { router.push('/dashboard'); return; }
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data.success && Array.isArray(data.data) ? data.data : []);
    } catch { setAppointments([]); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/appointments/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
    } catch { }
  };

  if (!user || loading) return <LoadingSpinner />;

  const filtered = statusFilter === 'all' ? appointments : appointments.filter(a => a.status === statusFilter);

  return (
    <DashboardLayout title="Appointments" description="Manage customer consultations.">
      {/* Filter bar */}
      <div className="appt-filter-bar" style={{ background: 'white', borderRadius: 8, padding: '10px 16px', marginBottom: 12, border: '1px solid #e8d5c4', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: '6px 10px', border: '1px solid #e8d5c4', borderRadius: 6, fontSize: 12, minHeight: '44px' }}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <span className="appt-count" style={{ fontSize: 12, color: '#666' }}>{filtered.length} appointments</span>
        <button onClick={fetchAppointments} className="appt-refresh-btn" style={{ marginLeft: 'auto', padding: '6px 12px', background: '#c19a6b', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer', minHeight: '44px' }}>
          <i className="fas fa-sync-alt"></i> Refresh
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? <EmptyState icon="fa-calendar-check" title="No Appointments" /> : (
        <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e8d5c4', overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8f4f0', borderBottom: '1px solid #e8d5c4' }}>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>Contact</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}>Service</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600 }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '8px 10px' }}>
                    <div style={{ fontWeight: 600 }}>{a.user_name || a.guest_name || 'N/A'}</div>
                    {a.notes && <div style={{ fontSize: 12, color: '#888', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.notes}</div>}
                  </td>
                  <td style={{ padding: '8px 10px', fontSize: 12, color: '#666' }}>
                    <div>{a.user_email || a.guest_email}</div>
                    {a.user_phone && <div style={{ fontSize: 12 }}>{a.user_phone}</div>}
                  </td>
                  <td style={{ padding: '8px 10px', fontSize: 12, color: '#666' }}>
                    {new Date(a.appointment_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ padding: '8px 10px', color: '#888' }}>{a.service_type || 'Consultation'}</td>
                  <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                    <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
                      background: STATUS_COLORS[a.status]?.bg || '#f59e0b15', color: STATUS_COLORS[a.status]?.color || '#f59e0b' }}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                    <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)}
                      style={{ padding: '4px 8px', border: '1px solid #e8d5c4', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          .appt-filter-bar {
            padding: 8px 12px !important;
          }
        }
        @media (max-width: 480px) {
          .appt-filter-bar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .appt-refresh-btn {
            margin-left: 0 !important;
            width: 100% !important;
          }
          .appt-count {
            text-align: center;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default DashboardAppointmentsPage;