'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DashboardPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    pendingAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard');
      return;
    }

    if (user.role !== 'admin' && user.role !== 'moderator') {
      router.push('/?error=forbidden');
      return;
    }

    // Fetch dashboard stats
    fetchStats();
  }, [user, router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats', {
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        console.error('Failed to fetch stats:', data.error);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)',
        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
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
          <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === 'admin';

  const menuItems = [
    { icon: 'fas fa-tachometer-alt', label: 'Overview', href: '/dashboard', active: true },
    { icon: 'fas fa-box', label: 'Products', href: '/dashboard/products', show: isAdmin },
    { icon: 'fas fa-shopping-bag', label: 'Orders', href: '/dashboard/orders', show: true },
    { icon: 'fas fa-calendar-check', label: 'Appointments', href: '/dashboard/appointments', show: true },
    { icon: 'fas fa-users', label: 'Users', href: '/dashboard/users', show: isAdmin },
    { icon: 'fas fa-cog', label: 'Settings', href: '/dashboard/settings', show: isAdmin },
  ].filter(item => item.show !== false);

  const statCards = [
    { icon: 'fas fa-box', label: 'Total Products', value: stats.totalProducts, color: '#c19a6b', show: isAdmin },
    { icon: 'fas fa-shopping-bag', label: 'Total Orders', value: stats.totalOrders, color: '#8b7355', show: true },
    { icon: 'fas fa-users', label: 'Total Users', value: stats.totalUsers, color: '#a67c52', show: isAdmin },
    { icon: 'fas fa-calendar-check', label: 'Pending Appointments', value: stats.pendingAppointments, color: '#d4a574', show: true },
  ].filter(item => item.show !== false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f4f0 0%, #efe9e3 100%)',
      fontFamily: 'var(--font-montserrat), Montserrat, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e8d5c4',
        boxShadow: '0 2px 8px rgba(193, 154, 107, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#c19a6b',
              textDecoration: 'none',
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              letterSpacing: '0.5px'
            }}>
              ← Colour My Space
            </Link>
            <div style={{
              width: '1px',
              height: '32px',
              background: '#e8d5c4'
            }}></div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '500',
              color: '#333',
              margin: 0,
              letterSpacing: '0.5px'
            }}>
              Admin Dashboard
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #f8f4f0, #efe9e3)',
              borderRadius: '8px'
            }}>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2px solid #c19a6b'
                  }}
                />
              ) : (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c19a6b, #a67c52)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{user.name}</div>
                <div style={{
                  fontSize: '11px',
                  color: '#c19a6b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '600'
                }}>
                  {user.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'flex',
        gap: '32px'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '260px',
          flexShrink: 0
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
            border: '1px solid #e8d5c4'
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '12px',
              padding: '0 12px'
            }}>
              Navigation
            </div>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  marginBottom: '4px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: item.active ? '#c19a6b' : '#666',
                  background: item.active ? 'linear-gradient(135deg, rgba(193, 154, 107, 0.1), rgba(193, 154, 107, 0.05))' : 'transparent',
                  fontWeight: item.active ? '600' : '500',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  border: item.active ? '1px solid rgba(193, 154, 107, 0.2)' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.background = 'rgba(193, 154, 107, 0.05)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <i className={item.icon} style={{
                  width: '20px',
                  textAlign: 'center',
                  fontSize: '16px'
                }}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#333',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-playfair), "Playfair Display", serif'
            }}>
              Dashboard Overview
            </h2>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              Welcome back, {user.name}. Here's what's happening with your platform.
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {statCards.map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
                  border: '1px solid #e8d5c4',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(193, 154, 107, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(193, 154, 107, 0.08)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px'
                  }}>
                    <i className={stat.icon}></i>
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#333', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', color: '#666', fontWeight: '500' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(193, 154, 107, 0.08)',
            border: '1px solid #e8d5c4'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#333',
              margin: '0 0 20px 0',
              fontFamily: 'var(--font-playfair), "Playfair Display", serif'
            }}>
              Quick Actions
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              {isAdmin && (
                <Link
                  href="/dashboard/products"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(193, 154, 107, 0.08), rgba(193, 154, 107, 0.03))',
                    border: '1px solid rgba(193, 154, 107, 0.2)',
                    textDecoration: 'none',
                    color: '#333',
                    fontWeight: '500',
                    fontSize: '14px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(193, 154, 107, 0.15), rgba(193, 154, 107, 0.08))';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(193, 154, 107, 0.08), rgba(193, 154, 107, 0.03))';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="fas fa-plus" style={{ color: '#c19a6b' }}></i>
                  <span>Add New Product</span>
                </Link>
              )}
              <Link
                href="/dashboard/orders"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(193, 154, 107, 0.08), rgba(193, 154, 107, 0.03))',
                  border: '1px solid rgba(193, 154, 107, 0.2)',
                  textDecoration: 'none',
                  color: '#333',
                  fontWeight: '500',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(193, 154, 107, 0.15), rgba(193, 154, 107, 0.08))';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(193, 154, 107, 0.08), rgba(193, 154, 107, 0.03))';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="fas fa-list" style={{ color: '#c19a6b' }}></i>
                <span>View All Orders</span>
              </Link>
              <Link
                href="/dashboard/appointments"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(193, 154, 107, 0.08), rgba(193, 154, 107, 0.03))',
                  border: '1px solid rgba(193, 154, 107, 0.2)',
                  textDecoration: 'none',
                  color: '#333',
                  fontWeight: '500',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(193, 154, 107, 0.15), rgba(193, 154, 107, 0.08))';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(193, 154, 107, 0.08), rgba(193, 154, 107, 0.03))';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="fas fa-calendar" style={{ color: '#c19a6b' }}></i>
                <span>View Appointments</span>
              </Link>
              {isAdmin && (
                <Link
                  href="/dashboard/users"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(193, 154, 107, 0.08), rgba(193, 154, 107, 0.03))',
                    border: '1px solid rgba(193, 154, 107, 0.2)',
                    textDecoration: 'none',
                    color: '#333',
                    fontWeight: '500',
                    fontSize: '14px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(193, 154, 107, 0.15), rgba(193, 154, 107, 0.08))';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(193, 154, 107, 0.08), rgba(193, 154, 107, 0.03))';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="fas fa-users" style={{ color: '#c19a6b' }}></i>
                  <span>Manage Users</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
