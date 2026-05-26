'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useCategories, NavCategory } from '@/context/CategoriesContext';
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

// Other category for categories not shown in main menu
const OTHER_CATEGORY = {
  id: 'other',
  name: 'Other',
  slug: 'other',
  icon: 'fa-ellipsis-h',
};

interface CategoryNavProps {
  activeCategory?: string;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory = '' }) => {
  const router = useRouter();
  const { t } = useLanguage();
  const { categories, loading: loadingCategories } = useCategories();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef<boolean>(false);

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

  // Pre-split categories so renders don't re-filter on every paint
  const { menuCategories, otherCategories } = useMemo(() => {
    type MenuCategory = NavCategory & { menuSubs: NavCategory[]; otherSubs: NavCategory[] };
    return {
      menuCategories: categories
        .filter(c => c.show_in_menu)
        .map((cat): MenuCategory => ({
          ...cat,
          menuSubs: (cat.children || []).filter(s => s.show_in_menu),
          otherSubs: (cat.children || []).filter(s => !s.show_in_menu),
        })),
      otherCategories: categories.filter(c => !c.show_in_menu),
    };
  }, [categories]);

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
            <>
              {/* Main menu categories */}
              {menuCategories.map((category) => (
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

                    {category.menuSubs.map((sub) => (
                      <SubcategoryLink
                        key={sub.id}
                        onClick={() => navigateTo(`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}`)}
                      >
                        <i className={`fas ${CATEGORY_ICONS[sub.name] || DEFAULT_ICON}`}></i>
                        {sub.name}
                      </SubcategoryLink>
                    ))}
                    {category.otherSubs.length > 0 && (
                      <>
                        <DropdownDivider />
                        <span style={{ fontSize: '10px', color: '#888', padding: '4px 12px', fontWeight: 600 }}>
                          {t('other') || 'Other'}
                        </span>
                        {category.otherSubs.map((sub) => (
                          <SubcategoryLink
                            key={sub.id}
                            onClick={() => navigateTo(`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}`)}
                            style={{ paddingLeft: '24px', fontSize: '12px' }}
                          >
                            {sub.name}
                          </SubcategoryLink>
                        ))}
                      </>
                    )}

                    <ViewAllLink
                      onClick={() => navigateTo(`/shop?category=${encodeURIComponent(category.name)}`)}
                    >
                      {t('viewAll')} {categoryNames[category.name] || category.name}
                      <i className="fas fa-arrow-right"></i>
                    </ViewAllLink>
                  </CategoryDropdown>
                </CategoryItem>
              ))}

              {/* Other Categories Dropdown */}
              {otherCategories.length > 0 && (
                <CategoryItem
                  key={OTHER_CATEGORY.id}
                  onMouseEnter={() => handleCategoryHover(OTHER_CATEGORY.slug)}
                  onMouseLeave={handleCategoryLeave}
                  ref={(el) => { if (el) dropdownRefs.current[OTHER_CATEGORY.slug] = el; }}
                >
                  <CategoryButton $active={activeCategory === OTHER_CATEGORY.slug}>
                    <i className={`fas ${OTHER_CATEGORY.icon}`}></i>
                    {t('other') || 'Other'}
                    <i className="fas fa-chevron-down"></i>
                  </CategoryButton>

                  <CategoryDropdown
                    $visible={openDropdown === OTHER_CATEGORY.slug}
                    onMouseEnter={() => handleDropdownEnter(OTHER_CATEGORY.slug)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {otherCategories.map((category) => (
                      <React.Fragment key={category.id}>
                        <SubcategoryLink
                          onClick={() => navigateTo(`/shop?category=${encodeURIComponent(category.name)}`)}
                        >
                          <i className={`fas ${CATEGORY_ICONS[category.name] || DEFAULT_ICON}`}></i>
                          {categoryNames[category.name] || category.name}
                        </SubcategoryLink>
                        {(category.children || []).slice(0, 3).map((sub) => (
                          <SubcategoryLink
                            key={sub.id}
                            onClick={() => navigateTo(`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}`)}
                            style={{ paddingLeft: '24px', fontSize: '12px' }}
                          >
                            {sub.name}
                          </SubcategoryLink>
                        ))}
                      </React.Fragment>
                    ))}
                  </CategoryDropdown>
                </CategoryItem>
              )}
            </>
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