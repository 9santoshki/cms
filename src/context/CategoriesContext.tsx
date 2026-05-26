'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface NavCategory {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  is_active: boolean;
  show_in_menu: boolean;
  children?: NavCategory[];
}

interface CategoriesContextValue {
  /** Active parent categories with children nested — used by CategoryNav and homepage sections */
  categories: NavCategory[];
  loading: boolean;
}

const CategoriesContext = createContext<CategoriesContextValue>({
  categories: [],
  loading: true,
});

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCategories(
            (data.data as NavCategory[]).filter(c => c.parent_id === null && c.is_active)
          );
        }
      })
      .catch(err => console.error('Failed to fetch categories:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
