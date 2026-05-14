'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styled from 'styled-components';

// Styled components for supplier dashboard
const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const DashboardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const DashboardHeader = styled.div`
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const DashboardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const DashboardSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`;

const SupplierInfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 8px;
`;

const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const VariantsTable = styled.table`
  width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 1rem;
  background-color: #f3f4f6;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-align: left;
  text-transform: uppercase;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
`;

const StockBadge = styled.span<{ $stock: number }>`
  display: inline-flex;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${props => props.$stock > 10 ? '#dcfce7' : props.$stock > 0 ? '#fef3c7' : '#fee2e2'};
  color: ${props => props.$stock > 10 ? '#166534' : props.$stock > 0 ? '#92400e' : '#991b1b'};
`;

const UpdateButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ModalButton = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${props => props.$primary ? '#3b82f6' : '#f3f4f6'};
  color: ${props => props.$primary ? 'white' : '#1f2937'};
  border: none;

  &:hover {
    background-color: ${props => props.$primary ? '#2563eb' : '#e5e7eb'};
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #6b7280;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #dc2626;
`;

const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

interface AssignedVariant {
  id: number;
  variant_id: number;
  variant: {
    id: number;
    product_id: number;
    sku?: string;
    price: number;
    sale_price?: number;
    stock_quantity: number;
    variant_name: string;
    product_name: string;
  };
}

interface SupplierProfile {
  id: number;
  company_name: string;
  phone?: string;
  address?: string;
  gst_id?: string;
}

const SupplierDashboardPage = () => {
  const { user, loading } = useAppContext();
  const router = useRouter();

  const [supplier, setSupplier] = useState<SupplierProfile | null>(null);
  const [variants, setVariants] = useState<AssignedVariant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<AssignedVariant | null>(null);
  const [newQuantity, setNewQuantity] = useState('');
  const [updateNotes, setUpdateNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  // Check authentication
  useEffect(() => {
    if (!loading.user && !user) {
      router.push('/auth?redirect=/supplier');
    }
    if (!loading.user && user && user.role !== 'supplier') {
      router.push('/');
    }
  }, [user, loading.user, router]);

  // Fetch supplier data
  useEffect(() => {
    const fetchSupplierData = async () => {
      if (!user || user.role !== 'supplier') return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/supplier/variants');
        const data = await response.json();

        if (data.success) {
          setSupplier(data.data.supplier);
          setVariants(data.data.variants);
        } else {
          setError(data.error || 'Failed to fetch data');
        }
      } catch (err: unknown) {
        console.error('Error fetching supplier data:', err);
        setError('Failed to load supplier data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupplierData();
  }, [user]);

  const handleUpdateClick = (variant: AssignedVariant) => {
    setSelectedVariant(variant);
    setNewQuantity(variant.variant.stock_quantity.toString());
    setUpdateNotes('');
    setShowModal(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedVariant) return;

    const quantity = parseInt(newQuantity, 10);
    if (isNaN(quantity) || quantity < 0) {
      alert('Please enter a valid quantity (0 or positive integer)');
      return;
    }

    setUpdating(true);

    try {
      const response = await fetch('/api/supplier/variants', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variant_id: selectedVariant.variant_id,
          new_quantity: quantity,
          notes: updateNotes
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setVariants(prev =>
          prev.map(v =>
            v.variant_id === selectedVariant.variant_id
              ? { ...v, variant: { ...v.variant, stock_quantity: quantity } }
              : v
          )
        );
        setShowModal(false);
        setSelectedVariant(null);
      } else {
        alert(data.error || 'Failed to update inventory');
      }
    } catch (err: unknown) {
      console.error('Error updating inventory:', err);
      alert('Failed to update inventory');
    } finally {
      setUpdating(false);
    }
  };

  if (loading.user) {
    return (
      <DashboardContainer>
        <Header activePage="supplier" />
        <LoadingState>
          <Spinner />
          <p>Loading...</p>
        </LoadingState>
      </DashboardContainer>
    );
  }

  if (!user || user.role !== 'supplier') {
    return null;
  }

  if (isLoading) {
    return (
      <DashboardContainer>
        <Header activePage="supplier" />
        <DashboardContent>
          <LoadingState>
            <Spinner />
            <p>Loading supplier data...</p>
          </LoadingState>
        </DashboardContent>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <Header activePage="supplier" />
        <DashboardContent>
          <ErrorState>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px', marginTop: '1rem' }}
            >
              Retry
            </button>
          </ErrorState>
        </DashboardContent>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header activePage="supplier" />

      <DashboardContent>
        {/* Header */}
        <DashboardHeader>
          <DashboardTitle>Supplier Dashboard</DashboardTitle>
          <DashboardSubtitle>
            Manage inventory for your assigned product variants
          </DashboardSubtitle>
        </DashboardHeader>

        {/* Supplier Info */}
        {supplier && (
          <SupplierInfoCard>
            <SectionTitle>Company Information</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Company Name</InfoLabel>
                <InfoValue>{supplier.company_name}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{user?.email}</InfoValue>
              </InfoItem>
              {supplier.phone && (
                <InfoItem>
                  <InfoLabel>Phone</InfoLabel>
                  <InfoValue>{supplier.phone}</InfoValue>
                </InfoItem>
              )}
              {supplier.gst_id && (
                <InfoItem>
                  <InfoLabel>GST ID</InfoLabel>
                  <InfoValue>{supplier.gst_id}</InfoValue>
                </InfoItem>
              )}
              {supplier.address && (
                <InfoItem>
                  <InfoLabel>Address</InfoLabel>
                  <InfoValue>{supplier.address}</InfoValue>
                </InfoItem>
              )}
            </InfoGrid>
          </SupplierInfoCard>
        )}

        {/* Assigned Variants */}
        <div>
          <SectionTitle>Assigned Variants ({variants.length})</SectionTitle>

          {variants.length === 0 ? (
            <SupplierInfoCard>
              <p style={{ color: '#6b7280', textAlign: 'center' }}>
                No variants assigned yet. Contact the admin to get product assignments.
              </p>
            </SupplierInfoCard>
          ) : (
            <VariantsTable>
              <thead>
                <tr>
                  <TableHeader>Product</TableHeader>
                  <TableHeader>Variant</TableHeader>
                  <TableHeader>SKU</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>Stock</TableHeader>
                  <TableHeader>Action</TableHeader>
                </tr>
              </thead>
              <tbody>
                {variants.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.variant.product_name}</TableCell>
                    <TableCell>{item.variant.variant_name}</TableCell>
                    <TableCell>{item.variant.sku || '-'}</TableCell>
                    <TableCell>₹{item.variant.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <StockBadge $stock={item.variant.stock_quantity}>
                        {item.variant.stock_quantity} units
                      </StockBadge>
                    </TableCell>
                    <TableCell>
                      <UpdateButton onClick={() => handleUpdateClick(item)}>
                        Update Stock
                      </UpdateButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </VariantsTable>
          )}
        </div>
      </DashboardContent>

      {/* Update Modal */}
      {showModal && selectedVariant && (
        <ModalOverlay onClick={() => !updating && setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Update Stock Quantity</ModalTitle>
            <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
              {selectedVariant.variant.product_name} - {selectedVariant.variant.variant_name}
            </p>
            <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
              Current stock: {selectedVariant.variant.stock_quantity} units
            </p>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
              New Stock Quantity
            </label>
            <ModalInput
              type="number"
              min="0"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              disabled={updating}
            />
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
              Notes (optional)
            </label>
            <ModalTextarea
              placeholder="e.g., Restocked from warehouse..."
              value={updateNotes}
              onChange={(e) => setUpdateNotes(e.target.value)}
              disabled={updating}
            />
            <ModalButtons>
              <ModalButton onClick={() => setShowModal(false)} disabled={updating}>
                Cancel
              </ModalButton>
              <ModalButton $primary onClick={handleUpdateSubmit} disabled={updating}>
                {updating ? 'Updating...' : 'Update'}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}

      <Footer />
    </DashboardContainer>
  );
};

export default SupplierDashboardPage;