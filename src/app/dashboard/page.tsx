'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DashboardPage = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    pendingAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/auth?redirect=/dashboard');
      return;
    }

    if (user.role !== 'admin' && user.role !== 'moderator') {
      router.push('/?error=forbidden');
      return;
    }

    fetchStats();
  // router is intentionally excluded — it's stable and including it causes duplicate fetches
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) setStats(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading || !user) {
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

  const statCards = [
    { icon: 'fas fa-box', label: 'Total Products', value: stats.totalProducts, color: '#c19a6b', show: isAdmin },
    { icon: 'fas fa-shopping-bag', label: 'Total Orders', value: stats.totalOrders, color: '#8b7355', show: true },
    { icon: 'fas fa-users', label: 'Total Users', value: stats.totalUsers, color: '#a67c52', show: isAdmin },
    { icon: 'fas fa-calendar-check', label: 'Pending Appointments', value: stats.pendingAppointments, color: '#d4a574', show: true },
  ].filter(item => item.show !== false);

  return (
    <DashboardLayout
      title="Dashboard Overview"
      description={`Welcome back, ${user.name}. Here's what's happening with your platform.`}
    >
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {statCards.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
              border: '1px solid #e8d5c4',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(193, 154, 107, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(193, 154, 107, 0.08)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px'
              }}>
                <i className={stat.icon}></i>
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#333', marginBottom: '2px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(193, 154, 107, 0.08)',
        border: '1px solid #e8d5c4'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#333',
          margin: '0 0 12px 0',
          fontFamily: 'var(--font-playfair), "Playfair Display", serif'
        }}>
          Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '8px'
        }}>
          {isAdmin && (
            <QuickAction href="/dashboard/products" icon="fas fa-plus" label="Add New Product" />
          )}
          <QuickAction href="/dashboard/orders" icon="fas fa-list" label="View All Orders" />
          <QuickAction href="/dashboard/appointments" icon="fas fa-calendar" label="View Appointments" />
          {isAdmin && (
            <QuickAction href="/dashboard/users" icon="fas fa-users" label="Manage Users" />
          )}
          {isAdmin && (
            <QuickAction href="/dashboard/variants" icon="fas fa-tags" label="Variant Dictionary" />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

function QuickAction({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px',
        borderRadius: '6px',
        background: 'linear-gradient(135deg, rgba(193, 154, 107, 0.08), rgba(193, 154, 107, 0.03))',
        border: '1px solid rgba(193, 154, 107, 0.2)',
        textDecoration: 'none',
        color: '#333',
        fontWeight: '500',
        fontSize: '13px',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(193, 154, 107, 0.15), rgba(193, 154, 107, 0.08))';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(193, 154, 107, 0.08), rgba(193, 154, 107, 0.03))';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <i className={icon} style={{ color: '#c19a6b' }}></i>
      <span>{label}</span>
    </Link>
  );
}

export default DashboardPage;
