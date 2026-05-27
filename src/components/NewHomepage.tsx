'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useProduct } from '../context/ProductContext';
import { useLanguage } from '../context/LanguageContext';
import { useCategories } from '../context/CategoriesContext';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import Slider from './Slider';
import ProductCardWithVariant from './ProductCardWithVariant';
import { HomepageSubcategory } from '../lib/db/categories';
import { RecentlyViewedProduct } from '../lib/db/recentlyViewed';

// Font Awesome import
import '@fortawesome/fontawesome-free/css/all.min.css';

// Type definitions
interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  imageClass: string;
}

interface Testimonial {
  id: number;
  text: string;
  author: string;
  rating: number;
}

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}


// Import elegant homepage styles
import {
  HomepageContainer,
  PortfolioSection,
  PortfolioGrid,
  PortfolioCard,
  TestimonialsSection,
  TestimonialsGrid,
  TestimonialCard,
  ServicesSection,
  ServicesGrid,
  ServiceCard,
  ServiceIcon,
  ConsultationSection,
  LoadingSpinner,
  ErrorContainer,
  CategorySection,
  CategorySectionHeader,
  CategoryProductsRow
} from '../styles/NewHomepageStylesElegant';

const NewHomepage = () => {
  const router = useRouter();
  const { products, fetchProducts, loading, error } = useProduct();
  const { t, language } = useLanguage();
  const { categories: parentCategories } = useCategories();
  const { user } = useAuth();

  // Homepage subcategories from database (browse-by-category tiles)
  const [homepageSubcategories, setHomepageSubcategories] = useState<HomepageSubcategory[]>([]);

  // Recently viewed products (logged-in users only)
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  // Memoize subcategory translation map (created once per language change)
  const subcategoryTranslationMap = useMemo(() => ({
    'Sofas & Sectionals': t('sofasSectionals'),
    'Coffee Tables': t('coffeeTables'),
    'TV & Entertainment Units': t('tvEntertainmentUnits'),
    'Accent Chairs': t('accentChairs'),
    'Side Tables': t('sideTables'),
    'Dining Tables': t('diningTables'),
    'Dining Chairs': t('diningChairs'),
    'Bar Carts & Stools': t('barCartsStools'),
    'Beds & Headboards': t('bedsHeadboards'),
    'Dressers & Chests': t('dressersChests'),
    'Nightstands': t('nightstands'),
    'Wardrobes': t('wardrobesArmoires'),
    'Bedding & Throws': t('beddingThrows'),
    'Desks & Work Tables': t('desksWorkTables'),
    'Office Chairs': t('officeChairs'),
    'Bookcases': t('bookcasesShelves'),
    'Chandeliers': t('chandeliers'),
    'Table Lamps': t('tableLamps'),
    'Floor Lamps': t('floorLamps'),
    'Pendant Lights': t('pendantLights'),
    'Wall Art & Prints': t('wallArtPrints'),
    'Mirrors': t('mirrors'),
    'Vases & Planters': t('vasesPlanters'),
    'Candles': t('candlesDiffusers'),
    'Patio Furniture': t('patioFurniture'),
    'Garden Decor': t('gardenPatioDecor'),
    'Outdoor Dining': t('outdoorDiningSets'),
  } as Record<string, string>), [t]);

  // Helper to translate subcategory names
  const translateSubcategory = (name: string): string => {
    return subcategoryTranslationMap[name] || name;
  };

  // Memoize products grouped by category (O(products) once per render, not O(products * categories))
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    for (const product of products) {
      const cat = product.category;
      if (!cat) continue;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(product);
    }
    return grouped;
  }, [products]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products and homepage categories on mount
  useEffect(() => {
    fetchProducts();

    // Fetch subcategories shown on homepage (for the browse-by-category tiles)
    fetch('/api/categories/homepage')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setHomepageSubcategories(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch homepage categories:', err));
  }, []);

  // Fetch recently viewed when user logs in / out
  useEffect(() => {
    if (!user) {
      setRecentlyViewed([]);
      return;
    }
    fetch('/api/recently-viewed')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setRecentlyViewed(data.data);
      })
      .catch(err => console.error('Failed to fetch recently viewed:', err));
  }, [user]);

  const navigate = (path: string) => {
    router.push(path);
  };

  // Portfolio projects for homepage
  const portfolioProjects: PortfolioProject[] = [
    {
      id: 1,
      title: "Modern Minimalist",
      description: "Clean lines and contemporary aesthetics",
      imageClass: "modern"
    },
    {
      id: 2,
      title: "Classic Elegance",
      description: "Timeless designs with refined details",
      imageClass: "classic"
    },
    {
      id: 3,
      title: "Coastal Retreat",
      description: "Light, airy spaces with natural elements",
      imageClass: "coastal"
    }
  ];

  // Testimonials for homepage
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Sarah transformed our outdated home into a modern masterpiece. Her attention to detail and creative vision exceeded all our expectations. The process was seamless from start to finish!",
      author: "Michael & Jennifer Roberts",
      rating: 5
    },
    {
      id: 2,
      text: "Working with Colour My Space was a game-changer for our restaurant. The design elevated our brand and created an atmosphere that our customers love. Revenue has increased by 30% since the redesign!",
      author: "David Chen, Bistro 45 Owner",
      rating: 5
    },
    {
      id: 3,
      text: "The team at Colour My Space understood our vision perfectly. They created a home office that inspires productivity while maintaining the warmth of our family space. Truly exceptional work!",
      author: "Priya Sharma, Architect",
      rating: 5
    }
  ];

  // Services for homepage
  const services: Service[] = [
    {
      id: 1,
      icon: "fas fa-pencil-ruler",
      title: "DESIGN CONSULTATION",
      description: "Comprehensive design planning and concept development"
    },
    {
      id: 2,
      icon: "fas fa-couch",
      title: "FURNITURE DESIGN",
      description: "Custom furniture pieces crafted to your specifications"
    },
    {
      id: 3,
      icon: "fas fa-home",
      title: "SPACE PLANNING",
      description: "Optimizing layouts for flow and functionality"
    },
    {
      id: 4,
      icon: "fas fa-paint-roller",
      title: "COLOR CONSULTING",
      description: "Expert color selection for mood and ambiance"
    },
    {
      id: 5,
      icon: "fas fa-lightbulb",
      title: "LIGHTING DESIGN",
      description: "Strategic lighting solutions for every space"
    },
    {
      id: 6,
      icon: "fas fa-project-diagram",
      title: "PROJECT MANAGEMENT",
      description: "End-to-end oversight from concept to completion"
    }
  ];

  // Reusable category section component
  const CategorySectionBlock = ({ categoryKey, title }: { categoryKey: string; title: string }) => {
    const categoryProducts = productsByCategory[categoryKey] || [];
    return (
      <CategorySection>
        <CategorySectionHeader>
          <h3>{title}</h3>
          <a onClick={() => router.push(`/shop?category=${encodeURIComponent(categoryKey)}`)}>{t('viewAll')}</a>
        </CategorySectionHeader>
        <CategoryProductsRow>
          {categoryProducts.slice(0, 8).map((product: any) => (
            <ProductCardWithVariant
              key={product.id}
              product={product}
              width="180px"
            />
          ))}
          {categoryProducts.length === 0 && (
            <div style={{ padding: '20px', color: '#666', textAlign: 'center', minWidth: '100%' }}>
              No products in this category yet
            </div>
          )}
        </CategoryProductsRow>
      </CategorySection>
    );
  };





  if (loading) {
    return (
      <HomepageContainer>
        <LoadingSpinner />
      </HomepageContainer>
    );
  }

  if (error) {
    console.error('Error loading products:', error);
    return (
      <ErrorContainer>
        <p>{error}</p>
        <button className="btn primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </ErrorContainer>
    );
  }

  return (
    <HomepageContainer>
      {/* Navigation Bar - Sticky */}
      <Header activePage="home" />

      {/* Hero Slider Section */}
      <Slider />

      {/* Browse by Category — image tiles driven by homepage subcategories in DB */}
      <section style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '15px auto 0 auto',
        padding: '15px 30px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 3px 15px rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '15px',
          fontSize: '12px',
          color: '#666',
          fontWeight: '600',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          {t('browseByCategory')}
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '28px',
        }}>
          {homepageSubcategories.length > 0 && homepageSubcategories.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/shop?category=${encodeURIComponent(item.category_name)}&subcategory=${encodeURIComponent(item.name)}`)}
              style={{
                position: 'relative',
                width: '90px',
                height: '90px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                flex: '0 0 auto',
                border: '1px solid #eee',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = '#c19a6b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#eee';
              }}
            >
              {/* Photo — prefer real product image from R2, fall back to static category image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: item.product_image || item.image
                  ? `url('${item.product_image || item.image}')`
                  : 'linear-gradient(135deg, #fef3e2, #fde8c8)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              {/* Gradient overlay for legible label */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.65) 100%)',
              }} />
              {/* Label */}
              <span style={{
                position: 'absolute',
                bottom: '8px',
                left: '4px',
                right: '4px',
                fontSize: '10px',
                fontWeight: '700',
                color: 'white',
                textAlign: 'center',
                lineHeight: '1.2',
                textShadow: '0 1px 3px rgba(0,0,0,0.6)',
              }}>
                {translateSubcategory(item.name)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Category Sections — driven by active parent categories in DB */}
      {parentCategories.map(cat => (
        <CategorySectionBlock
          key={cat.id}
          categoryKey={cat.name}
          title={translateSubcategory(cat.name) || cat.name}
        />
      ))}

      {/* Recently Viewed — only shown to logged-in users with history */}
      {user && recentlyViewed.length > 0 && (
        <section style={{
          width: '88%',
          maxWidth: '1100px',
          margin: '15px auto 0 auto',
          padding: '15px 20px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 3px 15px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}>
            <span style={{ fontSize: '12px', color: '#666', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
              <i className="fas fa-history" style={{ marginRight: '6px', color: '#c19a6b' }} />
              Recently Viewed
            </span>
            <span
              onClick={() => router.push('/shop')}
              style={{ fontSize: '11px', color: '#c19a6b', cursor: 'pointer', fontWeight: '600' }}
            >
              View all →
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
            {recentlyViewed.map(item => (
              <div
                key={item.product_id}
                onClick={() => router.push(`/products/${item.slug || item.product_id}`)}
                style={{
                  flex: '0 0 auto',
                  width: '110px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  border: '1px solid #eee',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#c19a6b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#eee';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '110px',
                  height: '90px',
                  backgroundImage: item.primary_image || item.image_url
                    ? `url('${item.primary_image || item.image_url}')`
                    : 'linear-gradient(135deg, #f5f5f5, #e8e8e8)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                <div style={{ padding: '6px 8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a', lineHeight: '1.3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#B12704', fontWeight: '700', marginTop: '2px' }}>
                    ₹{(item.sale_price && item.sale_price < item.price ? item.sale_price : item.price).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Portfolio Section */}
      <PortfolioSection>
        <div className="section-header">
          <h2 className="section-title">DESIGN PORTFOLIO</h2>
          <p className="section-subtitle">Explore our curated collection of distinctive design concepts that harmoniously blend timeless elegance with contemporary innovation</p>
        </div>
        <PortfolioGrid>
          {portfolioProjects.map((project: PortfolioProject) => (
            project.id && project.imageClass ? (
              <PortfolioCard key={project.id} imageClass={project.imageClass}>
                <div className="project-image"></div>
                <div className="project-overlay">
                  <div className="project-content">
                    <h3>{project.title || 'Project Title'}</h3>
                    <p>{project.description || 'Project Description'}</p>
                  </div>
                </div>
              </PortfolioCard>
            ) : null
          ))}
        </PortfolioGrid>
        <div className="section-footer">
          <button className="btn primary" onClick={() => navigate('/portfolio')}>
            View More Projects
          </button>
        </div>
      </PortfolioSection>

      {/* Services Section */}
      <ServicesSection>
        <div className="section-header">
          <h2 className="section-title">OUR SERVICES</h2>
          <p className="section-subtitle">Professional design solutions tailored to transform your space into an extraordinary experience</p>
        </div>
        <ServicesGrid>
          {services.map((service: Service) => (
            <ServiceCard key={service.id}>
              <ServiceIcon>
                <i className={service.icon}></i>
              </ServiceIcon>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesSection>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <div className="section-header">
          <h2 className="section-title">CLIENT TESTIMONIALS</h2>
          <p className="section-subtitle">Discover what our valued clients say about their transformative experiences with our design services</p>
        </div>
        <TestimonialsGrid>
          {testimonials.map((testimonial: Testimonial) => (
            <TestimonialCard key={testimonial.id}>
              <div className="rating">
                {'★'.repeat(testimonial.rating)}
              </div>
              <div className="testimonial-text">
                "{testimonial.text}"
              </div>
              <div className="customer-name">
                {testimonial.author}
              </div>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </TestimonialsSection>

      {/* Consultation Section */}
      <ConsultationSection>
        <div className="section-content">
          <h2>Ready to transform your space?</h2>
          <p>Schedule a complimentary 30-minute consultation to discuss your project vision.</p>
          <button className="btn primary" onClick={() => navigate('/booking')}>
            Schedule Now
          </button>
        </div>
      </ConsultationSection>

      <Footer />

      {/* Product Detail Modal - Not used, now navigates to individual product page */}


    </HomepageContainer>
  );
};

export default NewHomepage;