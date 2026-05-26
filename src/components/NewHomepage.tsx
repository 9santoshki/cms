'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useProduct } from '../context/ProductContext';
import { useLanguage } from '../context/LanguageContext';
import Header from './Header';
import Footer from './Footer';
import Slider from './Slider';
import ProductCardWithVariant from './ProductCardWithVariant';
import { HomepageSubcategory } from '../lib/db/categories';

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
  MainHero,
  SectionHeader,
  FeaturedSection,
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

  // Homepage subcategories from database
  const [homepageSubcategories, setHomepageSubcategories] = useState<HomepageSubcategory[]>([]);

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
    fetch('/api/categories/homepage')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setHomepageSubcategories(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch homepage categories:', err));
  }, []);

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
    <HomepageContainer style={{ paddingTop: '130px' }}>
      {/* Navigation Bar - Sticky */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Header activePage="home" />
      </div>

      {/* Hero Slider Section */}
      <Slider />

      {/* Quick Navigation - Subcategory Images */}
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
          gap: '10px',
          padding: '0'
        }}>
          {homepageSubcategories.length > 0 && homepageSubcategories.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/shop?category=${encodeURIComponent(item.category_name)}&subcategory=${encodeURIComponent(item.name)}`)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                background: '#fff',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '120px',
                flex: '0 0 auto',
                border: '1px solid #eee'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c19a6b';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#eee';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '8px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: item.image ? `url('${item.image}')` : 'linear-gradient(135deg, #f5f5f5, #e8e8e8)',
                border: '1px solid #f0f0f0'
              }}>
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#333',
                textAlign: 'center',
                lineHeight: '1.3',
                maxWidth: '110px'
              }}>
                {translateSubcategory(item.name).split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Amazon-style Category Sections */}
      <CategorySectionBlock categoryKey="Living Room" title={t('livingRoom')} />
      <CategorySectionBlock categoryKey="Bedroom" title={t('bedroom')} />
      <CategorySectionBlock categoryKey="Lighting" title={t('lighting')} />
      <CategorySectionBlock categoryKey="Decor" title={t('decor')} />

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

      {/* Featured Products Section */}
      <FeaturedSection>
        <SectionHeader>
          <h2 className="section-title">FEATURED COLLECTION</h2>
          <p className="section-subtitle">
            Curated masterpieces that exemplify our commitment to quality craftsmanship and design excellence
          </p>
        </SectionHeader>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
          padding: '0'
        }}>
          {products.slice(0, 6).map((product: any) => (
            <ProductCardWithVariant
              key={product.id}
              product={product}
            />
          ))}
        </div>
        <div className="section-footer">
          <button className="btn primary" onClick={() => navigate('/shop')}>
            Explore Collection
          </button>
        </div>
      </FeaturedSection>

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