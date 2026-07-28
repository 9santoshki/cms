'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import type { SavedAddress } from '@/types';
import {
  DashboardCard,
  FormGrid,
  FormField,
  FormActions,
  CancelButton,
  SaveButton,
} from '@/styles/AccountStyles';

const TYPE_LABEL: Record<SavedAddress['type'], string> = {
  shipping: 'Shipping',
  billing: 'Billing',
};

const formatAddress = (a: SavedAddress) =>
  [a.address, a.city, a.state, a.zipCode].filter(Boolean).join(', ') + (a.country ? `, ${a.country}` : '');

/**
 * Lists every address a user has actually checked out with (see
 * src/lib/db/addresses.ts), lets them edit or delete an entry. Editing or
 * deleting here never changes a past order — orders keep their own address
 * snapshot from the time they were placed.
 */
const SavedAddressesSection: React.FC = () => {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ address: '', city: '', state: '', zipCode: '', country: '' });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient.getAddresses().then(res => {
      if (res.success && res.data) setAddresses(res.data);
    }).finally(() => setLoading(false));
  }, []);

  const startEdit = (addr: SavedAddress) => {
    setError(null);
    setEditingId(addr.id);
    setEditForm({
      address: addr.address || '',
      city: addr.city || '',
      state: addr.state || '',
      zipCode: addr.zipCode || '',
      country: addr.country || '',
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id: number) => {
    if (!editForm.address.trim()) {
      setError('Address cannot be empty');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await apiClient.updateAddress(id, editForm);
      if (!res.success || !res.data) throw new Error(res.error || 'Failed to update address');
      setAddresses(prev => prev.map(a => (a.id === id ? res.data! : a)));
      setEditingId(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update address');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this saved address? This will not affect any past orders.')) return;
    setDeletingId(id);
    try {
      const res = await apiClient.deleteAddress(id);
      if (!res.success) throw new Error(res.error || 'Failed to delete address');
      setAddresses(prev => prev.filter(a => a.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete address');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return null;
  if (addresses.length === 0) return null;

  return (
    <DashboardCard style={{ marginTop: '20px' }}>
      <h2 style={{
        fontSize: '1.4rem', color: '#222', fontWeight: 400,
        fontFamily: 'var(--font-playfair), "Playfair Display", serif', marginBottom: '6px',
      }}>
        Saved Addresses
      </h2>
      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
        Every address you've used at checkout. Editing one here won't change any past order.
      </p>

      {error && (
        <div style={{ color: '#991b1b', fontSize: '13px', marginBottom: '16px' }}>{error}</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {addresses.map(addr => (
          <div
            key={addr.id}
            style={{
              border: '1px solid #f0f0f0',
              padding: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            {editingId === addr.id ? (
              <div style={{ width: '100%' }}>
                <FormGrid>
                  <FormField $fullWidth>
                    <label htmlFor={`address-${addr.id}`}>Street Address</label>
                    <input id={`address-${addr.id}`} name="address" value={editForm.address} onChange={handleEditChange} />
                  </FormField>
                  <FormField>
                    <label htmlFor={`city-${addr.id}`}>City</label>
                    <input id={`city-${addr.id}`} name="city" value={editForm.city} onChange={handleEditChange} />
                  </FormField>
                  <FormField>
                    <label htmlFor={`state-${addr.id}`}>State</label>
                    <input id={`state-${addr.id}`} name="state" value={editForm.state} onChange={handleEditChange} />
                  </FormField>
                  <FormField>
                    <label htmlFor={`zip-${addr.id}`}>ZIP / Postal Code</label>
                    <input id={`zip-${addr.id}`} name="zipCode" value={editForm.zipCode} onChange={handleEditChange} />
                  </FormField>
                  <FormField>
                    <label htmlFor={`country-${addr.id}`}>Country</label>
                    <input id={`country-${addr.id}`} name="country" value={editForm.country} onChange={handleEditChange} />
                  </FormField>
                </FormGrid>
                <FormActions>
                  <CancelButton type="button" onClick={() => setEditingId(null)}>Cancel</CancelButton>
                  <SaveButton type="button" disabled={saving} onClick={() => saveEdit(addr.id)}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </SaveButton>
                </FormActions>
              </div>
            ) : (
              <>
                <div style={{ minWidth: '200px', flex: '1 1 260px' }}>
                  <span style={{
                    fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
                    color: '#c19a6b', background: '#faf3ea', padding: '3px 8px', display: 'inline-block', marginBottom: '8px',
                  }}>
                    {TYPE_LABEL[addr.type]}
                  </span>
                  <div style={{ fontSize: '14px', color: '#222' }}>{formatAddress(addr)}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button
                    onClick={() => startEdit(addr)}
                    style={{
                      padding: '8px 14px', fontSize: '13px', fontWeight: 600, background: 'transparent',
                      border: '2px solid #c19a6b', color: '#c19a6b', cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    disabled={deletingId === addr.id}
                    style={{
                      padding: '8px 14px', fontSize: '13px', fontWeight: 600, background: 'transparent',
                      border: '2px solid #e0e0e0', color: '#991b1b', cursor: 'pointer',
                      opacity: deletingId === addr.id ? 0.6 : 1,
                    }}
                  >
                    {deletingId === addr.id ? 'Removing...' : 'Delete'}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default SavedAddressesSection;
