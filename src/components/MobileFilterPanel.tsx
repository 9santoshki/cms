'use client';

import React from 'react';

interface MobileFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
  activeFilterSummary?: React.ReactNode;
  children: React.ReactNode;
}

// Static styles defined outside component to avoid recreation per render
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
} as const;

const panelStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: '280px',
  background: 'white',
  zIndex: 1001,
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
} as const;

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
  color: 'white',
} as const;

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '24px',
  cursor: 'pointer',
  padding: '4px',
} as const;

const activeFiltersStyle = {
  padding: '12px 16px',
  background: '#fff3cd',
  borderBottom: '1px solid #e5e5e5',
} as const;

const clearButtonStyle = {
  marginTop: '8px',
  padding: '8px 12px',
  background: '#c19a6b',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '12px',
  cursor: 'pointer',
  width: '100%',
} as const;

const closeFooterStyle = {
  padding: '16px',
} as const;

const closeFooterButtonStyle = {
  width: '100%',
  padding: '12px',
  background: '#c19a6b',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
} as const;

export const MobileFilterPanel: React.FC<MobileFilterPanelProps> = ({
  isOpen,
  onClose,
  onClearFilters,
  hasActiveFilters = false,
  activeFilterSummary,
  children,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div style={overlayStyle} onClick={onClose} />
      )}

      {/* Panel */}
      <div
        style={{
          ...panelStyle,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Header */}
        <div style={headerStyle}>
          <span style={{ fontWeight: '600', fontSize: '16px' }}>Filters</span>
          <button style={closeButtonStyle} onClick={onClose}>
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div style={activeFiltersStyle}>
            <div style={{ fontSize: '12px', color: '#856404', marginBottom: '8px' }}>
              Active filters:
            </div>
            {activeFilterSummary}
            {onClearFilters && (
              <button
                style={clearButtonStyle}
                onClick={() => { onClearFilters(); onClose(); }}
              >
                Clear All
              </button>
            )}
          </div>
        )}

        {/* Filter content */}
        {children}

        {/* Close footer */}
        <div style={closeFooterStyle}>
          <button style={closeFooterButtonStyle} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

// Reusable filter section component for mobile
interface MobileFilterSectionProps {
  title: string;
  options: Array<{ value: string; label: string }>;
  selectedValue: string;
  onSelect: (value: string) => void;
  onCloseAfterSelect?: boolean;
}

const sectionStyle = {
  padding: '12px 16px',
  borderBottom: '1px solid #f0f0f0',
} as const;

const sectionTitleStyle = {
  fontSize: '13px',
  fontWeight: '600',
  color: '#c19a6b',
  marginBottom: '10px',
} as const;

const optionStyle = (selected: boolean) => ({
  padding: '10px 8px',
  fontSize: '14px',
  color: selected ? '#c19a6b' : '#333',
  fontWeight: selected ? '600' : '400',
  cursor: 'pointer',
});

export const MobileFilterSection: React.FC<MobileFilterSectionProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
  onCloseAfterSelect = true,
}) => {
  const handleSelect = (value: string) => {
    onSelect(value);
    if (onCloseAfterSelect) {
      // Parent should handle closing
    }
  };

  return (
    <div style={sectionStyle}>
      <h4 style={sectionTitleStyle}>{title}</h4>
      {options.map(opt => (
        <div
          key={opt.value}
          style={optionStyle(selectedValue === opt.value)}
          onClick={() => handleSelect(opt.value)}
        >
          {opt.label}
        </div>
      ))}
    </div>
  );
};

export default MobileFilterPanel;