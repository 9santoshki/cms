'use client';

import React, { useState, useEffect, useRef } from 'react';

interface MiniVariantSelectorProps {
  productId: number;
  onVariantSelect: (variantId: number | null, variantName: string, price: number) => void;
}

const MiniVariantSelector: React.FC<MiniVariantSelectorProps> = ({ productId, onVariantSelect }) => {
  const [loading, setLoading] = useState(true);
  const [hasVariants, setHasVariants] = useState(false);
  const [optionTypes, setOptionTypes] = useState<any[]>([]);
  const [optionsByType, setOptionsByType] = useState<Record<string, any[]>>({});
  const [variants, setVariants] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  // Use ref to store callback - prevents useEffect from re-running when callback identity changes
  const onVariantSelectRef = useRef(onVariantSelect);
  onVariantSelectRef.current = onVariantSelect;

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/variants`);
        const data = await response.json();

        if (data.success) {
          setHasVariants(data.data.hasVariants);
          setOptionTypes(data.data.optionTypes || []);
          setOptionsByType(data.data.optionsByType || {});
          setVariants(data.data.variants || []);
        }
      } catch (err) {
        console.error('Error fetching variants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [productId]);

  // Find matching variant - only run when selectedOptions changes
  useEffect(() => {
    if (!hasVariants || variants.length === 0) {
      return;
    }

    const selectedOptionIds = Object.values(selectedOptions).filter(id => id !== undefined && id !== 0);
    if (selectedOptionIds.length === 0) {
      return;
    }

    // Find variant with exact match
    const matchedVariant = variants.find(variant => {
      if (!variant.options) return false;
      const variantOptionIds = variant.options.map((o: any) => o.id);
      return variantOptionIds.length === selectedOptionIds.length &&
             selectedOptionIds.every(id => variantOptionIds.includes(id));
    });

    if (matchedVariant) {
      const price = matchedVariant.sale_price || matchedVariant.price;
      // Use ref to call callback - stable across renders
      onVariantSelectRef.current(matchedVariant.id, matchedVariant.variant_name || '', price);
    }
  }, [selectedOptions, hasVariants, variants]); // Removed handleVariantChange dependency

  const handleOptionChange = (typeName: string, optionId: string) => {
    if (optionId === '') {
      setSelectedOptions(prev => {
        const next = { ...prev };
        delete next[typeName];
        return next;
      });
    } else {
      setSelectedOptions(prev => ({
        ...prev,
        [typeName]: parseInt(optionId, 10)
      }));
    }
  };

  if (loading || !hasVariants || optionTypes.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '4px' }} onClick={(e) => e.stopPropagation()}>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
        {optionTypes.slice(0, 2).map(type => (
          <select
            key={type.id}
            value={selectedOptions[type.name] || ''}
            onChange={(e) => handleOptionChange(type.name, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: '2px 4px',
              border: '1px solid #ddd',
              borderRadius: '3px',
              fontSize: '10px',
              background: '#fff',
              cursor: 'pointer',
              maxWidth: '60px'
            }}
          >
            <option value="">{type.display_name.slice(0, 4)}</option>
            {optionsByType[type.name]?.slice(0, 3).map(option => (
              <option key={option.id} value={option.id}>
                {option.display_value.slice(0, 8)}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
};

export default MiniVariantSelector;