'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

const DashboardUsersPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard/users');
      return;
    }

    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/admin/users');
      const result = await response.json();

      if (result.success && result.data) {
        setUsers(result.data);
      } else {
        console.error('Failed to fetch users:', result.error);
        setUsers([]);
      }
    } catch (err: unknown) {
      console.error('Error fetching users:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch('/api/admin/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole })
      });

      const result = await response.json();

      if (result.success) {
        // Refresh the users list to get updated data
        await fetchUsers();
        alert('User role updated successfully');
      } else {
        alert(`Failed to update role: ${result.error}`);
      }
    } catch (err: unknown) {
      console.error('Error updating user role:', err);
      alert('An error occurred while updating the role');
    }
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
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading users...</p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch = !searchTerm ||
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const roleBadgeStyle = (role: string) => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    background: role === 'admin'     ? 'rgba(139,92,246,0.1)'  :
                role === 'moderator' ? 'rgba(59,130,246,0.1)'  :
                role === 'supplier'  ? 'rgba(245,158,11,0.1)'  :
                role === 'customer'  ? 'rgba(34,197,94,0.1)'   :
                                      'rgba(156,163,175,0.1)',
    color: role === 'admin'     ? '#8b5cf6' :
           role === 'moderator' ? '#3b82f6' :
           role === 'supplier'  ? '#f59e0b' :
           role === 'customer'  ? '#22c55e' :
                                  '#6b7280',
  });

  const th = {
    padding: '8px 10px',
    textAlign: 'left' as const,
    fontSize: '11px',
    fontWeight: '600' as const,
    color: '#999',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    borderBottom: '2px solid #f0ebe5',
    whiteSpace: 'nowrap' as const,
  };

  const td = {
    padding: '8px 10px',
    fontSize: '12px',
    color: '#333',
    verticalAlign: 'middle' as const,
    borderBottom: '1px solid #f9f6f3',
  };

  return (
    <DashboardLayout
      title="User Management"
      description="Manage user accounts, update roles, and monitor user activity."
    >
      <style jsx>{`
        @media (max-width: 768px) {
          .users-toolbar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .users-toolbar button {
            width: 100% !important;
            justify-content: center !important;
          }
          .users-search-wrapper {
            min-width: 100% !important;
          }
        }
      `}</style>
      {/* Toolbar */}
      <div className="users-toolbar" style={{
        background: 'white',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(193,154,107,0.08)',
        border: '1px solid #e8d5c4',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        {/* Search */}
        <div className="users-search-wrapper" style={{ position: 'relative', flex: '1 1 180px', minWidth: '140px' }}>
          <i className="fas fa-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#bbb', fontSize: '12px' }} />
          <input
            type="text"
            placeholder="Search name or email…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '6px 10px 6px 28px', border: '1px solid #e8d5c4', borderRadius: '6px', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Role filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ padding: '6px 10px', border: '1px solid #e8d5c4', borderRadius: '6px', fontSize: '12px', outline: 'none', background: 'white', cursor: 'pointer' }}
        >
          <option value="all">All Roles</option>
          <option value="customer">Customer</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
          <option value="supplier">Supplier</option>
        </select>

        {/* Count */}
        <span style={{ fontSize: '12px', color: '#999', marginLeft: 'auto' }}>
          {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
        </span>

        {/* Refresh */}
        <button
          onClick={fetchUsers}
          style={{ padding: '6px 12px', background: 'linear-gradient(135deg,#c19a6b,#a67c52)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <i className="fas fa-sync-alt" />
          Refresh
        </button>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(193,154,107,0.08)', border: '1px solid #e8d5c4' }}>
        {loading ? (
          <div style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ width: 28, height: 28, border: '3px solid #f0f0f0', borderTop: '3px solid #c19a6b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 8px' }} />
            <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
            <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>Loading users…</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#999', fontSize: '13px' }}>
            {roleFilter === 'all' && !searchTerm ? 'No users registered yet.' : 'No users match your filters.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>User</th>
                  <th style={th}>Email</th>
                  <th style={th}>Role</th>
                  <th style={th}>Joined</th>
                  <th style={th}>Change Role</th>
                  <th style={th}></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u: any) => (
                  <tr key={u.id} style={{ transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(193,154,107,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {/* Avatar + Name */}
                    <td style={td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                          background: 'linear-gradient(135deg,#c19a6b,#a67c52)',
                          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '12px', fontWeight: '700',
                        }}>
                          {u.name?.charAt(0).toUpperCase() ?? '?'}
                        </div>
                        <span style={{ fontWeight: '600', color: '#1a1a1a', whiteSpace: 'nowrap' }}>{u.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td style={{ ...td, color: '#666' }}>{u.email}</td>

                    {/* Role badge */}
                    <td style={td}>
                      <span style={roleBadgeStyle(u.role)}>{u.role}</span>
                    </td>

                    {/* Joined */}
                    <td style={{ ...td, color: '#888', whiteSpace: 'nowrap' }}>
                      {new Date(u.created_at).toLocaleDateString('en-IN')}
                    </td>

                    {/* Role select */}
                    <td style={td}>
                      <select
                        value={u.role}
                        onChange={(e) => updateUserRole(u.id, e.target.value)}
                        style={{ padding: '4px 8px', border: '1px solid #e8d5c4', borderRadius: '4px', fontSize: '11px', outline: 'none', background: 'white', cursor: 'pointer' }}
                      >
                        <option value="customer">Customer</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                        <option value="supplier">Supplier</option>
                      </select>
                    </td>

                    {/* View Details */}
                    <td style={{ ...td, textAlign: 'right' }}>
                      <button
                        onClick={() => router.push(`/dashboard/users/${u.id}`)}
                        style={{ padding: '4px 10px', border: '1px solid #e8d5c4', borderRadius: '4px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', background: 'white', color: '#c19a6b' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#c19a6b'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#c19a6b'; }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardUsersPage;
