import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountPage from '@/app/account/page';
import { AuthContext, AuthContextValue } from '@/context/AuthContext';
import { User } from '@/types';

// See AccountPage.test.tsx for why this needed rewriting (stale AppContext +
// next-auth references from a pre-refactor version of the app).

jest.mock('@/components/Header', () => () => <div data-testid="header" />);
jest.mock('@/components/Footer', () => () => <div data-testid="footer" />);
jest.mock('@/components/SavedAddressesSection', () => () => <div data-testid="saved-addresses" />);

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'customer',
  created_at: new Date().toISOString(),
};

describe('AccountPageSimple', () => {
  it('displays user profile when authenticated', () => {
    const fullValue: AuthContextValue = {
      user: mockUser,
      token: 'test-token',
      loading: false,
      error: null,
      setUser: jest.fn(),
      setToken: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      signInWithGoogle: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={fullValue}>
        <AccountPage />
      </AuthContext.Provider>
    );

    expect(screen.getByRole('heading', { name: /account settings/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Test User' })).toBeInTheDocument();
    expect(screen.getAllByText('test@example.com').length).toBeGreaterThan(0);
  });
});
