'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getDisplayPrice } from '../lib/utils';

interface VariantOption {
  id: number;
  value: string;
  display_value: string;
}

interface OptionType {
  id: number;
  name: string;
  display_name: string;
}

interface Variant {
  id: number;
  variant_name: string;
  price: number;
  sale_price?: number;
  stock_quantity: number;
  options: Array<{ id: number; value: string; display_value: string }>;
}

interface MiniVariantSelectorProps {
  productId: number;
  onVariantSelect: (
    variantId: number | null,
    variantName: string,
    price: number,
    originalPrice: number,
  ) => void;
  onHasVariants?: (hasVariants: boolean) => void;
}

const MiniVariantSelector: React.FC<MiniVariantSelectorProps> = ({ productId, onVariantSelect, onHasVariants }) => {
  const [loading, setLoading] = useState(true);
  const [hasVariants, setHasVariants] = useState(false);
  const [optionTypes, setOptionTypes] = useState<OptionType[]>([]);
  const [optionsByType, setOptionsByType] = useState<Record<string, VariantOption[]>>({});
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  // Stable callback ref — prevents the variant-match effect from re-running
  const onVariantSelectRef = useRef(onVariantSelect);
  onVariantSelectRef.current = onVariantSelect;

  // Track last dispatched variant id to skip no-op parent updates
  const lastVariantIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const res = await fetch(`/api/products/${productId}/variants`);
        const data = await res.json();
        if (data.success) {
          setHasVariants(data.data.hasVariants);
          setOptionTypes(data.data.optionTypes || []);
          setOptionsByType(data.data.optionsByType || {});
          setVariants(data.data.variants || []);
          onHasVariants?.(data.data.hasVariants);
        }
      } catch (err) {
        console.error('Error fetching variants:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVariants();
  }, [productId]);

  // Reverse map: optionId → typeName (built once when optionsByType loads)
  const optionIdToType = useMemo<Record<number, string>>(() => {
    const map: Record<number, string> = {};
    for (const [typeName, opts] of Object.entries(optionsByType)) {
      for (const opt of opts) map[opt.id] = typeName;
    }
    return map;
  }, [optionsByType]);

  /**
   * For each option type, compute which option IDs are still reachable given
   * the currently selected options for all OTHER types.
   */
  const availableByType = useMemo<Record<string, Set<number>>>(() => {
    if (!hasVariants || variants.length === 0) return {};

    const result: Record<string, Set<number>> = {};
    for (const type of optionTypes) {
      const typeName = type.name;

      // Other selections (excluding this type)
      const otherSelected = Object.entries(selectedOptions)
        .filter(([t]) => t !== typeName)
        .map(([, id]) => id);

      // Variants compatible with all other selections
      const compatible = variants.filter(v => {
        if (!v.options) return false;
        const ids = v.options.map(o => o.id);
        return otherSelected.every(id => ids.includes(id));
      });

      // Collect this type's option IDs from compatible variants
      const available = new Set<number>();
      for (const v of compatible) {
        for (const o of v.options) {
          if (optionIdToType[o.id] === typeName) available.add(o.id);
        }
      }
      result[typeName] = available;
    }
    return result;
  }, [selectedOptions, hasVariants, variants, optionTypes, optionIdToType]);

  // When an option selection changes, clear any now-unavailable selections
  const handleOptionChange = (typeName: string, optionId: string) => {
    setSelectedOptions(prev => {
      const next = optionId === ''
        ? (({ [typeName]: _, ...rest }) => rest)(prev)   // deselect
        : { ...prev, [typeName]: parseInt(optionId, 10) };

      // Drop any other selected options that are no longer available given `next`
      const cleaned: Record<string, number> = {};
      for (const [t, id] of Object.entries(next)) {
        if (t === typeName) {
          cleaned[t] = id;
          continue;
        }
        // Re-check availability against the new selection
        const otherSelected = Object.entries(next)
          .filter(([ot]) => ot !== t)
          .map(([, oid]) => oid);
        const stillAvailable = variants.some(v => {
          if (!v.options) return false;
          const ids = v.options.map(o => o.id);
          return ids.includes(id) && otherSelected.every(oid => ids.includes(oid));
        });
        if (stillAvailable) cleaned[t] = id;
      }
      return cleaned;
    });
  };

  // Fire onVariantSelect when all types are selected and a variant matches
  useEffect(() => {
    if (!hasVariants || variants.length === 0) return;

    const selectedIds = Object.values(selectedOptions).filter(Boolean);
    if (selectedIds.length !== optionTypes.length || optionTypes.length === 0) {
      lastVariantIdRef.current = undefined;
      return;
    }

    const matched = variants.find(v => {
      if (!v.options) return false;
      const ids = v.options.map(o => o.id);
      return ids.length === selectedIds.length && selectedIds.every(id => ids.includes(id));
    });

    if (matched) {
      if (matched.id === lastVariantIdRef.current) return;
      lastVariantIdRef.current = matched.id;
      onVariantSelectRef.current(
        matched.id,
        matched.variant_name || '',
        getDisplayPrice(matched),
        matched.price,
      );
    } else {
      lastVariantIdRef.current = undefined;
    }
  }, [selectedOptions, hasVariants, variants, optionTypes]);

  if (loading || !hasVariants || optionTypes.length === 0) return null;

  return (
    <div style={{ marginTop: '6px' }} onClick={e => e.stopPropagation()}>
      {optionTypes.map(type => {
        const available = availableByType[type.name] ?? new Set();
        const options = optionsByType[type.name] ?? [];
        const selectedId = selectedOptions[type.name];

        return (
          <div key={type.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            {/* Inline label */}
            <span style={{ fontSize: '9px', color: '#a0856c', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {type.display_name}:
            </span>
            {/* Dropdown */}
            <select
              value={selectedId ?? ''}
              onChange={e => {
                e.stopPropagation();
                handleOptionChange(type.name, e.target.value);
              }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%',
                fontSize: '11px',
                border: '1.5px solid #e8d5c0',
                borderRadius: '6px',
                padding: '4px 6px',
                background: '#fffaf6',
                color: '#333',
                cursor: 'pointer',
                outline: 'none',
                fontWeight: '500',
                appearance: 'auto',
              }}
            >
              <option value=''>Select…</option>
              {options.map(opt => (
                <option
                  key={opt.id}
                  value={opt.id}
                  disabled={!available.has(opt.id)}
                >
                  {opt.display_value}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default MiniVariantSelector;
