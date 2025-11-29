'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onToggle }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      onToggle(); // Close the search bar after search
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        backgroundColor: '#f9fafb',
        padding: '15px 20px',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 999
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex'
        }}
      >
        <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name, category..."
            style={{
              flex: 1,
              padding: '12px 15px',
              fontSize: '16px',
              border: '1px solid #d1d5db',
              borderRadius: '4px 0 0 4px',
              outline: 'none'
            }}
            autoFocus
          />
          <button
            type="submit"
            style={{
              padding: '12px 20px',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            <i className="fas fa-search"></i>
          </button>
          <button
            type="button"
            onClick={onToggle}
            style={{
              marginLeft: '10px',
              padding: '12px 15px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;