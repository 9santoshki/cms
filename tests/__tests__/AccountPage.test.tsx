
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AppContext } from '@/context/AppContext';
import AccountPage from '@/app/account/page';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.setTimeout(5000); // Max timeout for tests

const mockRouter = {
  push: jest.fn(),
};

(useRouter as jest.Mock).mockReturnValue(mockRouter);

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  created_at: new Date().toISOString(),
};

const mockAdmin = {
  id: '2',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  created_at: new Date().toISOString(),
};

const renderWithContext = (
  ui: React.ReactElement,
  { providerProps, ...renderOptions }: { providerProps: any }
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider session={providerProps.session}>
      <AppContext.Provider value={providerProps}>{children}</AppContext.Provider>
    </SessionProvider>
  );

  const result = render(ui, { wrapper: Wrapper, ...renderOptions });
  
  return {
    ...result,
    rerender: (ui: React.ReactElement, newProviderProps: any) => {
      const NewWrapper = ({ children }: { children: React.ReactNode }) => (
        <SessionProvider session={newProviderProps.providerProps.session}>
          <AppContext.Provider value={newProviderProps.providerProps}>{children}</AppContext.Provider>
        </SessionProvider>
      );
      result.rerender(React.cloneElement(ui, { wrapper: NewWrapper }));
    }
  };
};

describe('AccountPage', () => {
  it('shows loading state when context is loading', () => {
    const providerProps = {
      user: null,
      token: null,
      loading: { user: true },
      fetchUserProfile: jest.fn(),
      setError: jest.fn(),
      setLoading: jest.fn(),
      session: { data: null, status: 'loading' },
      cartItems: [],
    };
    renderWithContext(<AccountPage />, { providerProps });
    expect(screen.getByText('Loading your profile...')).toBeInTheDocument();
  });

  it('redirects to auth page if not authenticated', async () => {
    const providerProps = {
      user: null,
      token: null,
      loading: { user: false },
      fetchUserProfile: jest.fn(),
      setError: jest.fn(),
      setLoading: jest.fn(),
      session: { data: null, status: 'unauthenticated' },
      cartItems: [],
    };
    renderWithContext(<AccountPage />, { providerProps });
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/auth?redirect=%2F');
    });
  });

  it('fetches user profile if authenticated but no user data', async () => {
    const fetchUserProfile = jest.fn();
    const providerProps = {
      user: null,
      token: 'test-token',
      loading: { user: false },
      fetchUserProfile,
      setError: jest.fn(),
      setLoading: jest.fn(),
      session: { data: { user: mockUser }, status: 'authenticated' },
      cartItems: [],
    };
    renderWithContext(<AccountPage />, { providerProps });
    await waitFor(() => {
      expect(fetchUserProfile).toHaveBeenCalled();
    });
  });

  it('displays user profile when authenticated', async () => {
    const fetchUserProfile = jest.fn().mockResolvedValue(mockUser);
    const providerProps = {
      user: mockUser, // Set user directly here
      token: 'test-token',
      loading: { user: false },
      fetchUserProfile,
      setError: jest.fn(),
      setLoading: jest.fn(),
      session: { data: { user: mockUser }, status: 'authenticated' },
      cartItems: [],
    };
    renderWithContext(<AccountPage />, { providerProps });

    expect(await screen.findByRole('heading', { name: /profile settings/i })).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Test User')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('displays admin user profile when authenticated as admin', async () => {
    const fetchUserProfile = jest.fn().mockResolvedValue(mockAdmin);
    const providerProps = {
      user: mockAdmin, // Set user directly here
      token: 'test-token',
      loading: { user: false },
      fetchUserProfile,
      setError: jest.fn(),
      setLoading: jest.fn(),
      session: { data: { user: mockAdmin }, status: 'authenticated' },
      cartItems: [],
    };
    renderWithContext(<AccountPage />, { providerProps });

    expect(await screen.findByRole('heading', { name: /profile settings/i })).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Admin User')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('admin@example.com')).toBeInTheDocument();
    expect(await screen.findByText('admin')).toBeInTheDocument();
  });

  it('handles timeout when fetching user profile', async () => {
    const fetchUserProfile = jest.fn(() => {
      return new Promise(resolve => setTimeout(() => resolve(mockUser), 2000));
    });
    const providerProps = {
      user: null,
      token: 'test-token',
      loading: { user: false },
      fetchUserProfile,
      setError: jest.fn(),
      setLoading: jest.fn(),
      session: { data: { user: mockUser }, status: 'authenticated' },
      cartItems: [],
    };
    renderWithContext(<AccountPage />, { providerProps });

    await waitFor(() => {
      expect(fetchUserProfile).toHaveBeenCalled();
    });

    expect(await screen.findByRole('heading', { name: /profile settings/i })).toBeInTheDocument();
  });
});
