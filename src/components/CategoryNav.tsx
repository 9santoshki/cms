'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  CategoryNavBar,
  CategoryNavContainer,
  AllProductsLink,
  CategoryItem,
  CategoryButton,
  CategoryDropdown,
  DropdownHeader,
  SubcategoryLink,
  ViewAllLink,
  ServicesDropdown,
  DropdownDivider,
} from '../styles/CategoryNavStyles';

// Category icons mapping
const CATEGORY_ICONS: Record<string, string> = {
  'Living Room': 'fa-couch',
  'Dining Room': 'fa-utensils',
  'Bedroom': 'fa-bed',
  'Office': 'fa-desktop',
  'Home Office': 'fa-desktop',
  'Lighting': 'fa-lightbulb',
  'Decor': 'fa-palette',
  'Outdoor': 'fa-tree',
};

// Default icon for categories not in mapping
const DEFAULT_ICON = 'fa-folder';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  is_active: boolean;
  children?: Category[];
}

// Services category is static (not from database)
const SERVICES_CATEGORY = {
  id: 'services',
  name: 'Services',
  icon: 'fa-concierge-bell',
  subcategories: [
    { id: 'portfolio', name: 'Portfolio', icon: 'fa-images', path: '/portfolio' },
    { id: 'design-services', name: 'Design Services', icon: 'fa-pencil-ruler', path: '/services' },
    { id: 'consultation', name: 'Book Consultation', icon: 'fa-calendar-check', path: '/booking' },
    { id: 'about', name: 'About Us', icon: 'fa-info-circle', path: '/about' },
    { id: 'contact', name: 'Contact', icon: 'fa-envelope', path: '/contact' },
  ]
};

interface CategoryNavProps {
  activeCategory?: string;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory = '' }) => {
  const router = useRouter();
  const { t } = useLanguage();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef<boolean>(false);

  // Fetch categories from database
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) {
        // Filter to only active parent categories
        setCategories(data.data.filter((c: Category) => c.parent_id === null && c.is_active));
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Get translated category names
  const getTranslatedCategories = () => {
    const categoryTranslations: Record<string, string> = {
      'Living Room': t('livingRoom'),
      'Dining Room': t('diningRoom'),
      'Bedroom': t('bedroom'),
      'Home Office': t('homeOffice'),
      'Office': t('homeOffice'),
      'Lighting': t('lighting'),
      'Decor': t('decor'),
      'Outdoor': t('outdoor'),
      'Services': t('services'),
    };
    return categoryTranslations;
  };

  const categoryNames = getTranslatedCategories();

  // Close dropdown when clicking outside - only if not hovering
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if we're intentionally hovering
      if (isHoveringRef.current) return;

      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    // Use pointerdown instead of mousedown for better touch handling
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [openDropdown]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navigateTo = (path: string) => {
    router.push(path);
    setOpenDropdown(null);
  };

  const handleCategoryHover = (categoryId: string) => {
    // Mark that we're hovering over the menu
    isHoveringRef.current = true;

    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(categoryId);
  };

  const handleCategoryLeave = () => {
    // Mark that we left the menu area
    isHoveringRef.current = false;

    // Delay to allow moving to dropdown - increased delay for reliability
    closeTimeoutRef.current = setTimeout(() => {
      if (!isHoveringRef.current) {
        setOpenDropdown(null);
      }
    }, 200);
  };

  const handleDropdownEnter = (categoryId: string) => {
    // Mark that we're hovering over the dropdown
    isHoveringRef.current = true;

    // Clear close timeout when mouse enters dropdown
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(categoryId);
  };

  const handleDropdownLeave = () => {
    // Mark that we left the dropdown
    isHoveringRef.current = false;
    setOpenDropdown(null);
  };

  return (
    <>
      {/* Desktop Category Navigation */}
      <CategoryNavBar>
        <CategoryNavContainer>
          {/* All Products Link */}
          <AllProductsLink
            onClick={() => navigateTo('/shop')}
            onMouseEnter={() => setOpenDropdown(null)}
          >
            <i className="fas fa-th-large"></i>
            {t('allProducts')}
          </AllProductsLink>

          {/* Shopping Categories */}
          {loadingCategories ? (
            <CategoryItem>
              <CategoryButton>
                <i className="fas fa-spinner fa-spin"></i>
                Loading...
              </CategoryButton>
            </CategoryItem>
          ) : (
            categories.map((category) => (
              <CategoryItem
                key={category.id}
                onMouseEnter={() => handleCategoryHover(category.slug)}
                onMouseLeave={handleCategoryLeave}
                ref={(el) => { if (el) dropdownRefs.current[category.slug] = el; }}
              >
                <CategoryButton $active={activeCategory === category.slug}>
                  <i className={`fas ${CATEGORY_ICONS[category.name] || DEFAULT_ICON}`}></i>
                  {categoryNames[category.name] || category.name}
                  <i className="fas fa-chevron-down"></i>
                </CategoryButton>

                <CategoryDropdown
                  $visible={openDropdown === category.slug}
                  onMouseEnter={() => handleDropdownEnter(category.slug)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <DropdownHeader>
                    <h4>{categoryNames[category.name] || category.name}</h4>
                    <p>{t('exploreCollection')}</p>
                  </DropdownHeader>

                  {(category.children || []).map((sub) => (
                    <SubcategoryLink
                      key={sub.id}
                      onClick={() => navigateTo(`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}`)}
                    >
                      <i className={`fas ${CATEGORY_ICONS[sub.name] || DEFAULT_ICON}`}></i>
                      {sub.name}
                    </SubcategoryLink>
                  ))}

                  <ViewAllLink
                    onClick={() => navigateTo(`/shop?category=${encodeURIComponent(category.name)}`)}
                  >
                    {t('viewAll')} {categoryNames[category.name] || category.name}
                    <i className="fas fa-arrow-right"></i>
                  </ViewAllLink>
                </CategoryDropdown>
              </CategoryItem>
            ))
          )}

          {/* Services Category */}
          <CategoryItem
            key={SERVICES_CATEGORY.id}
            onMouseEnter={() => handleCategoryHover(SERVICES_CATEGORY.id)}
            onMouseLeave={handleCategoryLeave}
            ref={(el) => { if (el) dropdownRefs.current[SERVICES_CATEGORY.id] = el; }}
          >
            <CategoryButton $active={activeCategory === SERVICES_CATEGORY.id}>
              <i className={`fas ${SERVICES_CATEGORY.icon}`}></i>
              {categoryNames[SERVICES_CATEGORY.name] || SERVICES_CATEGORY.name}
              <i className="fas fa-chevron-down"></i>
            </CategoryButton>

            <ServicesDropdown
              $visible={openDropdown === SERVICES_CATEGORY.id}
              onMouseEnter={() => handleDropdownEnter(SERVICES_CATEGORY.id)}
              onMouseLeave={handleDropdownLeave}
            >
              {SERVICES_CATEGORY.subcategories.map((sub, idx) => (
                <React.Fragment key={sub.id}>
                  <SubcategoryLink onClick={() => navigateTo(sub.path)}>
                    <i className={`fas ${sub.icon}`}></i>
                    {sub.name}
                  </SubcategoryLink>
                  {idx === 2 && <DropdownDivider />}
                </React.Fragment>
              ))}
            </ServicesDropdown>
          </CategoryItem>
        </CategoryNavContainer>
      </CategoryNavBar>
    </>
  );
};

export default CategoryNav;