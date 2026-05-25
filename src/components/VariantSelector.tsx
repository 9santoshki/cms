'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import type { VariantOptionType, VariantOption, ProductVariant } from '@/types';

interface VariantSelectorProps {
  productId: number;
  onVariantChange: (variant: ProductVariant | null, selectionLabel?: string) => void;
  onStockChange?: (anyInStock: boolean) => void;
}

// Styled components
const VariantSection = styled.div`
  margin: 0.5rem 0;
`;

const VariantLabel = styled.div`
  font-size: 0.8rem;
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.375rem;
`;

const OptionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const OptionButton = styled.button<{ $selected: boolean; $disabled?: boolean }>`
  padding: 0.4rem 0.875rem;
  border: 2px solid ${props => props.$selected ? '#d97706' : '#d1d5db'};
  background-color: ${props => props.$selected ? '#fffbeb' : '#f9fafb'};
  color: ${props => props.$disabled ? '#9ca3af' : props.$selected ? '#92400e' : '#374151'};
  font-size: 0.8rem;
  font-weight: ${props => props.$selected ? '600' : '500'};
  border-radius: 8px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  opacity: ${props => props.$disabled ? '0.5' : '1'};

  &:hover:not(:disabled) {
    border-color: #f59e0b;
    background-color: #fffbeb;
  }
`;

const SelectedVariantInfo = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VariantPrice = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #166534;
`;

const VariantStock = styled.div`
  font-size: 0.75rem;
  color: #4ade80;
`;

const OutOfStockWarning = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.875rem;
`;

const LoadingState = styled.div`
  padding: 1rem;
  color: #6b7280;
  text-align: center;
`;

const PartialSelectionHint = styled.div`
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: #6b7280;
  padding: 0.5rem 0.75rem;
  background: #fffbeb;
  border-radius: 6px;
  border: 1px solid #fcd34d;
`;

const VariantSelector: React.FC<VariantSelectorProps> = ({ productId, onVariantChange, onStockChange }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [hasVariants, setHasVariants] = useState(false);
  const [optionTypes, setOptionTypes] = useState<VariantOptionType[]>([]);
  const [optionsByType, setOptionsByType] = useState<Record<string, VariantOption[]>>({});
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  // Fetch variants on mount
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/variants`);
        const data = await response.json();

        if (data.success) {
          const variantList: ProductVariant[] = data.data.variants || [];
          setHasVariants(data.data.hasVariants);
          setOptionTypes(data.data.optionTypes || []);
          setOptionsByType(data.data.optionsByType || {});
          setVariants(variantList);
          onStockChange?.(variantList.some(v => v.stock_quantity > 0));
        }
      } catch (err) {
        console.error('Error fetching variants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [productId]);

  // Find matching variant - requires exact match of all selected options
  const selectedVariant = useMemo(() => {
    if (!hasVariants || variants.length === 0) return null;

    const selectedOptionIds = Object.values(selectedOptions).filter(id => id !== undefined);
    if (selectedOptionIds.length === 0) return null;

    return variants.find(variant => {
      if (!variant.options) return false;
      const variantOptionIds = variant.options.map(o => o.id);
      return variantOptionIds.length === selectedOptionIds.length &&
             selectedOptionIds.every(id => variantOptionIds.includes(id));
    }) ?? null;
  }, [hasVariants, variants, selectedOptions]);

  // Build selection label
  const selectionLabel = useMemo(() => {
    if (optionTypes.length === 0) return '';
    return optionTypes
      .map(type => {
        const optionId = selectedOptions[type.name];
        if (optionId === undefined) return '';
        const option = optionsByType[type.name]?.find(o => o.id === optionId);
        return option?.display_value ?? '';
      })
      .filter(Boolean)
      .join(' / ');
  }, [optionTypes, optionsByType, selectedOptions]);

  // Notify parent of selection changes
  useEffect(() => {
    onVariantChange(selectedVariant, selectionLabel || undefined);
  }, [selectedVariant, selectionLabel, onVariantChange]);

  // Handle option selection
  const handleOptionSelect = (typeName: string, optionId: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [typeName]: optionId
    }));
  };

  // UX rule: users must be able to change any option at any time without being locked
  // into invalid combinations. Only disable OTHER type options that can't combine.
  const isOptionAvailable = (typeName: string, optionId: number): boolean => {
    if (!hasVariants || variants.length === 0) return true;

    const testSelection = { ...selectedOptions };
    testSelection[typeName] = optionId;

    const testOptionIds = Object.entries(testSelection)
      .filter(([name, id]) => selectedOptions[name] !== undefined || name === typeName)
      .map(([_, id]) => id)
      .filter(id => id !== undefined);

    if (testOptionIds.length === 1) {
      return variants.some(variant =>
        variant.options?.some(o => o.id === optionId)
      );
    }

    return variants.some(variant => {
      if (!variant.options) return false;
      const variantOptionIds = variant.options.map(o => o.id);
      return testOptionIds.every(id => variantOptionIds.includes(id));
    });
  };

  const selectedCount = Object.values(selectedOptions).filter(id => id !== undefined).length;
  const isCompleteSelection = selectedCount === optionTypes.length;

  if (loading) {
    return <LoadingState>{t('loadingOptions')}</LoadingState>;
  }

  if (optionTypes.length === 0) {
    return null;
  }

  return (
    <div>
      {hasVariants && selectedCount === 0 && (
        <div style={{
          fontSize: '0.8rem',
          color: '#6b7280',
          marginBottom: '0.75rem',
          padding: '0.5rem 0.75rem',
          background: '#f9fafb',
          borderRadius: '6px'
        }}>
          {t('selectOptions')}
        </div>
      )}

      {optionTypes.map(type => (
        <VariantSection key={type.id}>
          <VariantLabel>
            {type.display_name}
            {selectedOptions[type.name] && (
              <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
                (Selected: {optionsByType[type.name]?.find(o => o.id === selectedOptions[type.name])?.display_value})
              </span>
            )}
          </VariantLabel>
          <OptionGrid>
            {optionsByType[type.name]?.map(option => (
              <OptionButton
                key={option.id}
                $selected={selectedOptions[type.name] === option.id}
                $disabled={!isOptionAvailable(type.name, option.id) && selectedOptions[type.name] !== option.id}
                onClick={() => handleOptionSelect(type.name, option.id)}
                disabled={!isOptionAvailable(type.name, option.id) && selectedOptions[type.name] !== option.id}
              >
                {option.display_value}
                {option.price_modifier && option.price_modifier > 0 && (
                  <span style={{ marginLeft: '0.5rem', color: '#dc2626' }}>
                    +₹{option.price_modifier}
                  </span>
                )}
              </OptionButton>
            ))}
          </OptionGrid>
        </VariantSection>
      ))}

      {selectedVariant && (
        <SelectedVariantInfo>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#166534', marginBottom: '0.25rem' }}>
              Selected: {selectedVariant.variant_name || selectionLabel}
            </div>
            <VariantStock>
              {selectedVariant.stock_quantity > 0 ? '✓ In Stock' : '⚠ Out of Stock'}
            </VariantStock>
          </div>
          <VariantPrice>
            ₹{(selectedVariant.sale_price || selectedVariant.price).toLocaleString()}
            {selectedVariant.sale_price && (
              <span style={{
                marginLeft: '0.5rem',
                fontSize: '0.875rem',
                color: '#9ca3af',
                textDecoration: 'line-through'
              }}>
                ₹{selectedVariant.price.toLocaleString()}
              </span>
            )}
          </VariantPrice>
        </SelectedVariantInfo>
      )}

      {hasVariants && !selectedVariant && selectedCount > 0 && !isCompleteSelection && (
        <PartialSelectionHint>
          <i className="fas fa-info-circle" style={{ marginRight: '0.5rem', color: '#f59e0b' }}></i>
          Please select all options to check availability
        </PartialSelectionHint>
      )}

      {hasVariants && !selectedVariant && isCompleteSelection && (
        <OutOfStockWarning>
          {t('thisCombinationNotAvailable')}
        </OutOfStockWarning>
      )}

      {!hasVariants && selectionLabel && (
        <SelectedVariantInfo>
          <div style={{ fontSize: '0.875rem', color: '#166534' }}>
            ✓ Selected: {selectionLabel}
          </div>
        </SelectedVariantInfo>
      )}
    </div>
  );
};

export default VariantSelector;