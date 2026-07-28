import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SavedAddressesSection from '@/components/SavedAddressesSection';
import { apiClient } from '@/lib/api';
import type { SavedAddress } from '@/types';

jest.mock('@/lib/api', () => ({
  apiClient: {
    getAddresses: jest.fn(),
    updateAddress: jest.fn(),
    deleteAddress: jest.fn(),
  },
}));

const mockGetAddresses = apiClient.getAddresses as jest.Mock;
const mockUpdateAddress = apiClient.updateAddress as jest.Mock;
const mockDeleteAddress = apiClient.deleteAddress as jest.Mock;

const shippingAddr: SavedAddress = {
  id: 1,
  user_id: 2,
  type: 'shipping',
  name: 'Santosh',
  phone: '9999999999',
  address: '123 MG Road',
  city: 'Bengaluru',
  state: 'Karnataka',
  zipCode: '560001',
  country: 'India',
  last_used_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe('SavedAddressesSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
  });

  it('renders nothing while loading and nothing when the address book is empty', async () => {
    mockGetAddresses.mockResolvedValue({ success: true, data: [] });
    const { container } = render(<SavedAddressesSection />);
    await waitFor(() => expect(mockGetAddresses).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it('lists saved addresses with their type and formatted address', async () => {
    mockGetAddresses.mockResolvedValue({ success: true, data: [shippingAddr] });
    render(<SavedAddressesSection />);

    expect(await screen.findByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText(/123 MG Road, Bengaluru, Karnataka, 560001, India/)).toBeInTheDocument();
  });

  it('editing a saved address calls updateAddress and reflects the result, without touching order history', async () => {
    mockGetAddresses.mockResolvedValue({ success: true, data: [shippingAddr] });
    mockUpdateAddress.mockResolvedValue({
      success: true,
      data: { ...shippingAddr, city: 'Bengaluru Urban' },
    });

    render(<SavedAddressesSection />);
    fireEvent.click(await screen.findByRole('button', { name: /edit/i }));

    const cityInput = screen.getByLabelText(/city/i);
    fireEvent.change(cityInput, { target: { value: 'Bengaluru Urban' } });
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(mockUpdateAddress).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ city: 'Bengaluru Urban' })
      );
    });
    expect(await screen.findByText(/Bengaluru Urban/)).toBeInTheDocument();
    // Only the address-book row was touched — no order-related API call exists in this component at all.
    expect(mockDeleteAddress).not.toHaveBeenCalled();
  });

  it('deleting a saved address asks for confirmation and removes it from the list on success', async () => {
    mockGetAddresses.mockResolvedValue({ success: true, data: [shippingAddr] });
    mockDeleteAddress.mockResolvedValue({ success: true, message: 'Address deleted' });

    render(<SavedAddressesSection />);
    fireEvent.click(await screen.findByRole('button', { name: /delete/i }));

    expect(window.confirm).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockDeleteAddress).toHaveBeenCalledWith(1);
    });
    await waitFor(() => {
      expect(screen.queryByText('Shipping')).not.toBeInTheDocument();
    });
  });

  it('does not delete when the user cancels the confirmation', async () => {
    window.confirm = jest.fn(() => false);
    mockGetAddresses.mockResolvedValue({ success: true, data: [shippingAddr] });

    render(<SavedAddressesSection />);
    fireEvent.click(await screen.findByRole('button', { name: /delete/i }));

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDeleteAddress).not.toHaveBeenCalled();
    expect(screen.getByText('Shipping')).toBeInTheDocument();
  });
});
