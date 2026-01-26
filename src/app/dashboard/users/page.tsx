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
    } catch (error) {
      console.error('Error fetching users:', error);
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
    } catch (error) {
      console.error('Error updating user role:', error);
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

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .users-filter-grid {
            grid-template-columns: 1fr !important;
          }
          .users-filter-grid button {
            width: 100% !important;
          }
          .user-card-header {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .user-role-badge {
            text-align: left !important;
          }
          .user-controls {
            flex-direction: column !important;
            align-items: stretch !important;
            margin-left: 0 !important;
          }
          .user-controls button {
            width: 100% !important;
          }
        }
      `}</style>
      <DashboardLayout
      title="User Management"
      description="Manage user accounts, update roles, and monitor user activity across the platform."
    >
      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4'
      }}>
        <div className="users-filter-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr auto',
          gap: '16px',
          alignItems: 'end'
        }}>
          {/* Search */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#666',
              marginBottom: '8px'
            }}>
              Search Users
            </label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-search" style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                fontSize: '14px'
              }}></i>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  border: '1px solid #e8d5c4',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#666',
              marginBottom: '8px'
            }}>
              Filter by Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e8d5c4',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              <option value="all">All Roles</option>
              <option value="customer">Customer</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchUsers}
            style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-sync-alt"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Users List */}
      {loading ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '64px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #f0f0f0',
            borderTop: '3px solid #c19a6b',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '64px 32px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          <i className="fas fa-users" style={{ fontSize: '64px', color: '#e8d5c4', marginBottom: '16px' }}></i>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
            No Users Found
          </h3>
          <p style={{ color: '#666', fontSize: '14px' }}>
            {roleFilter === 'all' && !searchTerm
              ? 'No users registered yet.'
              : 'Try adjusting your filters or search term.'}
          </p>
        </div>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
          border: '1px solid #e8d5c4'
        }}>
          {filteredUsers.map((userItem: any, index: number) => (
            <div
              key={userItem.id}
              style={{
                padding: '20px',
                borderBottom: index < filteredUsers.length - 1 ? '1px solid #f0f0f0' : 'none',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(193, 154, 107, 0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div className="user-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      {userItem.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '2px' }}>
                        {userItem.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-envelope" style={{ fontSize: '11px', color: '#999' }}></i>
                        <p style={{ fontSize: '13px', color: '#666' }}>
                          {userItem.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#999', marginLeft: '52px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-calendar-plus"></i>
                      <span>Joined {new Date(userItem.created_at).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-clock"></i>
                      <span>Updated {new Date(userItem.updated_at).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                <div className="user-role-badge" style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    background: userItem.role === 'admin' ? 'rgba(139, 92, 246, 0.1)' :
                               userItem.role === 'moderator' ? 'rgba(59, 130, 246, 0.1)' :
                               userItem.role === 'customer' ? 'rgba(34, 197, 94, 0.1)' :
                               'rgba(156, 163, 175, 0.1)',
                    color: userItem.role === 'admin' ? '#8b5cf6' :
                           userItem.role === 'moderator' ? '#3b82f6' :
                           userItem.role === 'customer' ? '#22c55e' :
                           '#6b7280',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {userItem.role}
                  </div>
                </div>
              </div>

              {/* Role update controls */}
              <div className="user-controls" style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #f0f0f0',
                marginLeft: '52px'
              }}>
                <label style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#666'
                }}>
                  Change Role:
                </label>
                <select
                  value={userItem.role}
                  onChange={(e) => updateUserRole(userItem.id, e.target.value)}
                  style={{
                    padding: '8px 14px',
                    border: '1px solid #e8d5c4',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'white'
                  }}
                >
                  <option value="customer">Customer</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => router.push(`/dashboard/users/${userItem.id}`)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e8d5c4',
                    borderRadius: '8px',
                    fontSize: '13px',
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

export default DashboardUsersPage;
