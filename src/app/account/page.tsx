'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  AccountContainer,
  AccountHeader,
  AccountContent,
  ProfileCard,
  ProfileHeader,
  AvatarWrapper,
  Avatar,
  ProfileInfo,
  ProfileStats,
  StatItem,
  ProfileActions,
  EditButton,
  ProfileDetails,
  DetailGroup,
  EditFormCard,
  FormGrid,
  FormField,
  FormActions,
  CancelButton,
  SaveButton,
  DashboardCard,
  DashboardContent,
  DashboardButton,
  MessageBox,
  LoadingScreen,
  SignInPrompt
} from '@/styles/AccountStyles';

const AccountPage = () => {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <LoadingScreen>
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading your account...</p>
        </div>
      </LoadingScreen>
    );
  }

  if (!user) {
    return (
      <SignInPrompt>
        <div className="prompt-content">
          <div className="icon">
            <i className="fas fa-user"></i>
          </div>
          <h2>Account Access Required</h2>
          <p>
            Please sign in to access your personalized account dashboard.
          </p>
          <a href="/auth?redirect=/account">
            Sign In to Account
          </a>
        </div>
      </SignInPrompt>
    );
  }

  return (
    <AccountContainer>
      <Header activePage="account" />

      <AccountHeader>
        <h1>Account Settings</h1>
        <p>Manage your profile and preferences</p>
      </AccountHeader>

      <AccountContent>
        {message && (
          <MessageBox $type={message.type}>
            <i className={`fas fa-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
            {message.text}
          </MessageBox>
        )}

        {/* Profile Card */}
        {!isEditing && (
          <ProfileCard>
            <ProfileHeader>
              <AvatarWrapper>
                <Avatar>
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.textContent = user.name?.charAt(0)?.toUpperCase() || 'U';
                        fallback.style.fontSize = '2.2rem';
                        fallback.style.color = '#c19a6b';
                        fallback.style.fontWeight = '400';
                        fallback.style.fontFamily = 'var(--font-playfair), "Playfair Display", serif';
                        e.currentTarget.parentElement?.appendChild(fallback);
                      }}
                    />
                  ) : (
                    <span>{user.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                  )}
                </Avatar>
              </AvatarWrapper>

              <ProfileInfo>
                <h2>{user.name}</h2>
                <div className="email">
                  <i className="fas fa-envelope"></i>
                  {user.email}
                </div>
                <ProfileStats>
                  <StatItem>
                    <div className="label">Member Since</div>
                    <div className="value">
                      {user.created_at ? new Date(user.created_at).getFullYear() : 'N/A'}
                    </div>
                  </StatItem>
                  <StatItem>
                    <div className="label">Status</div>
                    <div className="value">Active</div>
                  </StatItem>
                  <StatItem className="role">
                    <div className="label">Role</div>
                    <div className="value">{user.role}</div>
                  </StatItem>
                </ProfileStats>
              </ProfileInfo>

              <ProfileActions>
                <EditButton onClick={() => setIsEditing(true)}>
                  <i className="fas fa-edit"></i>
                  Edit Profile
                </EditButton>
              </ProfileActions>
            </ProfileHeader>

            <ProfileDetails>
              <DetailGroup>
                <div className="label">Full Name</div>
                <div className="value">{user.name}</div>
              </DetailGroup>
              <DetailGroup>
                <div className="label">Email Address</div>
                <div className="value">{user.email}</div>
              </DetailGroup>
              <DetailGroup>
                <div className="label">Phone Number</div>
                <div className="value">{user.phone || 'Not provided'}</div>
              </DetailGroup>
              <DetailGroup>
                <div className="label">Account Type</div>
                <div className="value" style={{ textTransform: 'capitalize' }}>{user.role}</div>
              </DetailGroup>
              <DetailGroup>
                <div className="label">Account Status</div>
                <div className="value" style={{ color: '#22c55e' }}>Active</div>
              </DetailGroup>
            </ProfileDetails>
          </ProfileCard>
        )}

        {/* Edit Form */}
        {isEditing && (
          <EditFormCard>
            <h2>Edit Profile</h2>
            <p>Update your personal information</p>

            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormField>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormField>

                <FormField>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                  <div className="hint">Email cannot be changed</div>
                </FormField>

                <FormField>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </FormField>
              </FormGrid>

              <FormActions>
                <CancelButton
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ name: user.name, email: user.email, phone: user.phone || '' });
                  }}
                >
                  Cancel
                </CancelButton>
                <SaveButton type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <span className="spinner"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </SaveButton>
              </FormActions>
            </form>
          </EditFormCard>
        )}

        {/* Dashboard Access */}
        <DashboardCard>
          <DashboardContent>
            <div>
              <h2>Dashboard Access</h2>
              <p>
                {user.role === 'admin' || user.role === 'moderator'
                  ? 'You have management access to the platform.'
                  : 'You currently have customer access to the platform.'}
              </p>
            </div>

            {user.role === 'admin' || user.role === 'moderator' ? (
              <DashboardButton href="/dashboard">
                Access Dashboard
                <i className="fas fa-arrow-right"></i>
              </DashboardButton>
            ) : (
              <DashboardButton className="disabled">
                Request Access
              </DashboardButton>
            )}
          </DashboardContent>
        </DashboardCard>
      </AccountContent>

      <Footer />
    </AccountContainer>
  );
};

export default AccountPage;
