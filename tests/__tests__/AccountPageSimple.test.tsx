
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AppContext } from '@/context/AppContext';
import AccountPage from '@/app/account/page';
import { SessionProvider } from 'next-auth/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  created_at: new Date().toISOString(),
};

describe('AccountPageSimple', () => {
  it('displays user profile when authenticated', async () => {
    const providerProps = {
      user: mockUser,
      token: 'test-token',
      loading: { user: false },
      fetchUserProfile: jest.fn(),
      setError: jest.fn(),
      setLoading: jest.fn(),
      session: { data: { user: mockUser }, status: 'authenticated' },
      cartItems: [],
    };

    render(
      <SessionProvider session={providerProps.session}>
        <AppContext.Provider value={providerProps}>
          <AccountPage />
        </AppContext.Provider>
      </SessionProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /profile settings/i })).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    });
  });
});
