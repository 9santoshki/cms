import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AccountPage from '@/app/account/page';
import { AuthContext, AuthContextValue } from '@/context/AuthContext';
import { User } from '@/types';

// This test predates several architecture changes and no longer matched the
// real app: it drove a raw `AppContext` (removed when auth/product/UI state
// was split into separate contexts — see AppContext.test.tsx), wrapped
// everything in next-auth's SessionProvider (this app has never used
// next-auth for real auth — it's a custom Google OAuth + JWT-cookie system,
// see AuthContext.tsx), expected a router.push() redirect for signed-out
// users (the real page renders an inline sign-in prompt instead — no
// redirect), and expected "Profile Settings" / form inputs to be visible by
// default (the real page shows a read-only profile card by default; inputs
// only appear after clicking "Edit Profile"). Rewritten against the actual
// component below.

// Header/Footer pull in CategoryNav (fetches '/api/admin/categories' on
// mount — no fetch polyfill in this jsdom setup) and LanguageContext, none
// of which AccountPage's own logic depends on. Stubbed out the same way
// ProductCardWithVariant is stubbed in ProductBrowserFilterSync.test.tsx.
jest.mock('@/components/Header', () => () => <div data-testid="header" />);
jest.mock('@/components/Footer', () => () => <div data-testid="footer" />);
// Fetches the address book on mount (its own concern, covered separately) —
// not relevant to what these tests exercise, and jsdom here has no fetch
// polyfill to satisfy that call.
jest.mock('@/components/SavedAddressesSection', () => () => <div data-testid="saved-addresses" />);

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'customer',
  created_at: new Date().toISOString(),
};

const mockAdmin: User = {
  ...mockUser,
  id: 2,
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
};

function renderWithAuth(value: Partial<AuthContextValue>) {
  const fullValue: AuthContextValue = {
    user: null,
    token: null,
    loading: false,
    error: null,
    setUser: jest.fn(),
    setToken: jest.fn(),
    setLoading: jest.fn(),
    setError: jest.fn(),
    signInWithGoogle: jest.fn(),
    logout: jest.fn(),
    ...value,
  };

  return render(
    <AuthContext.Provider value={fullValue}>
      <AccountPage />
    </AuthContext.Provider>
  );
}

describe('AccountPage', () => {
  it('shows a loading state while the session check is in progress', () => {
    renderWithAuth({ loading: true, user: null });
    expect(screen.getByText('Loading your account...')).toBeInTheDocument();
  });

  it('shows an inline sign-in prompt (no redirect) when not authenticated', () => {
    renderWithAuth({ loading: false, user: null });

    expect(screen.getByText('Account Access Required')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /sign in to account/i });
    expect(link).toHaveAttribute('href', '/auth?redirect=/account');
  });

  it('displays the read-only profile card when authenticated', async () => {
    renderWithAuth({ loading: false, user: mockUser });

    expect(screen.getByRole('heading', { name: /account settings/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Test User' })).toBeInTheDocument();
    // Shown twice (header + detail list) in the read-only view
    expect(screen.getAllByText('test@example.com').length).toBeGreaterThan(0);
    // Not in edit mode by default — no form inputs yet
    expect(screen.queryByLabelText(/full name/i)).not.toBeInTheDocument();
  });

  it('shows editable form fields pre-filled with the current user after clicking Edit Profile', async () => {
    renderWithAuth({ loading: false, user: mockUser });

    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));

    expect(await screen.findByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('shows admin-specific dashboard access when authenticated as admin', async () => {
    renderWithAuth({ loading: false, user: mockAdmin });

    expect(screen.getByRole('heading', { name: 'Admin User' })).toBeInTheDocument();
    expect(screen.getByText('You have management access to the platform.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /access dashboard/i })).toHaveAttribute('href', '/dashboard');
  });
});
