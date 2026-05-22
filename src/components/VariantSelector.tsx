'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import type { VariantOptionType, VariantOption, ProductVariant } from '@/types';

interface VariantSelectorProps {
  productId: number;
  /** Called when the variant selection changes.
   *  `variant` is the matched DB variant (or null if none exist for this product).
   *  `selectionLabel` is the human-readable combination string, e.g. "Thin / 12×18 / Black".
   */
  onVariantChange: (variant: ProductVariant | null, selectionLabel?: string) => void;
  /** Called once when variant data loads with whether any variant has stock > 0.
   *  Derives from supplier-managed stock_quantity, not the product-level field.
   */
  onStockChange?: (anyInStock: boolean) => void;
}

// Styled components for variant selection
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

const VariantSelector: React.FC<VariantSelectorProps> = ({ productId, onVariantChange, onStockChange }) => {
  const [loading, setLoading] = useState(true);
  const [hasVariants, setHasVariants] = useState(false);
  const [optionTypes, setOptionTypes] = useState<VariantOptionType[]>([]);
  const [optionsByType, setOptionsByType] = useState<Record<string, VariantOption[]>>({});
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  // Track selected options per type
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

          // Notify parent of overall stock availability (supplier-managed)
          onStockChange?.(variantList.some(v => v.stock_quantity > 0));

          // Always initialise selections with the first option for each type
          if (data.data.optionTypes && data.data.optionTypes.length > 0) {
            const initialSelections: Record<string, number> = {};
            for (const type of data.data.optionTypes) {
              const options = data.data.optionsByType?.[type.name] || [];
              if (options.length > 0) {
                initialSelections[type.name] = options[0].id;
              }
            }
            setSelectedOptions(initialSelections);
          }
        }
      } catch (err) {
        console.error('Error fetching variants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [productId]);

  // Find matching DB variant based on selected options (only relevant when hasVariants)
  const selectedVariant = useMemo(() => {
    if (!hasVariants || variants.length === 0) return null;

    const selectedOptionIds = Object.values(selectedOptions);

    return variants.find(variant => {
      if (!variant.options) return false;
      const variantOptionIds = variant.options.map(o => o.id);
      return selectedOptionIds.every(id => variantOptionIds.includes(id)) &&
             variantOptionIds.every(id => selectedOptionIds.includes(id));
    }) ?? null;
  }, [hasVariants, variants, selectedOptions]);

  // Build a human-readable label from current selections, e.g. "Thin / 12×18 / Black"
  const selectionLabel = useMemo(() => {
    if (optionTypes.length === 0) return '';
    return optionTypes
      .map(type => {
        const optionId = selectedOptions[type.name];
        const option = optionsByType[type.name]?.find(o => o.id === optionId);
        return option?.display_value ?? '';
      })
      .filter(Boolean)
      .join(' / ');
  }, [optionTypes, optionsByType, selectedOptions]);

  // Notify parent whenever the selection changes
  // Note: onVariantChange intentionally not in deps - it's a notification callback
  useEffect(() => {
    onVariantChange(selectedVariant, selectionLabel || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant, selectionLabel]);

  // Handle option selection
  const handleOptionSelect = (typeName: string, optionId: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [typeName]: optionId
    }));
  };

  // Check if an option combination results in an available variant.
  // When no DB variants exist, every option is treated as available.
  const isOptionAvailable = (typeName: string, optionId: number): boolean => {
    if (!hasVariants || variants.length === 0) return true;

    const testSelection = { ...selectedOptions, [typeName]: optionId };
    const testOptionIds = Object.values(testSelection);

    return variants.some(variant => {
      if (!variant.options) return false;
      const variantOptionIds = variant.options.map(o => o.id);
      return testOptionIds.every(id => variantOptionIds.includes(id)) &&
             variantOptionIds.every(id => testOptionIds.includes(id));
    });
  };

  if (loading) {
    return <LoadingState>Loading options...</LoadingState>;
  }

  // Nothing to show if the DB has no option types at all
  if (optionTypes.length === 0) {
    return null;
  }

  return (
    <div>
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
                $disabled={!isOptionAvailable(type.name, option.id)}
                onClick={() => handleOptionSelect(type.name, option.id)}
                disabled={!isOptionAvailable(type.name, option.id)}
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

      {/* Show selected variant info when DB variant is matched */}
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

      {/* When no DB variants exist but user has made selections, show a confirmation */}
      {!hasVariants && selectionLabel && (
        <SelectedVariantInfo>
          <div style={{ fontSize: '0.875rem', color: '#166534' }}>
            ✓ Selected: {selectionLabel}
          </div>
        </SelectedVariantInfo>
      )}

      {/* Warn only when DB variants exist but no combination matches */}
      {hasVariants && !selectedVariant && Object.keys(selectedOptions).length === optionTypes.length && (
        <OutOfStockWarning>
          This combination is not available. Please select different options.
        </OutOfStockWarning>
      )}
    </div>
  );
};

export default VariantSelector;