'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProduct } from '../context/ProductContext';
import { useUI } from '../context/UIContext';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import Slider from './Slider';

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
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductPrice,
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
  ErrorContainer
} from '../styles/NewHomepageStylesElegant';

const NewHomepage = () => {
  const router = useRouter();
  const { products, fetchProducts, loading, error } = useProduct();
  const cartItems = useCartStore(state => state.items);
  const { user } = useAuth();

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products when component mounts
    fetchProducts();
  }, []); // Empty dependency array to run only once on mount

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
    <HomepageContainer style={{ paddingTop: '80px' }}>
      {/* Navigation Bar - Sticky */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Header activePage="home" />
      </div>
      
      {/* Hero Slider Section */}
      <Slider />


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
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px', 
          padding: '20px 0' 
        }}>
          {products.slice(0, 6).map((product: any) => (
            <div 
              key={product.id} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                minWidth: '250px',
                maxWidth: '300px',
                margin: '0 auto'
              }}
            >
              <ProductCard 
                onClick={() => router.push(`/products/${product.slug || product.id}`)} 
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
              >
                <ProductImage imageClass={product.imageClass} imageUrl={product.primary_image || product.image_url}>
                </ProductImage>
                <ProductInfo style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', margin: '8px 0 4px 0' }}>{product.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#666', margin: '4px 0' }}>{product.description}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', margin: '8px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ fontWeight: 'bold', color: '#c19a6b', fontSize: '1.1rem' }}>
                          ₹{(product.sale_price || product.price)?.toLocaleString()}
                        </span>
                        {product.sale_price && product.price > product.sale_price && (
                          <>
                            <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.85rem' }}>
                              ₹{product.price?.toLocaleString()}
                            </span>
                            <span style={{
                              backgroundColor: '#e74c3c',
                              color: 'white',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: '600'
                            }}>
                              {Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF
                            </span>
                          </>
                        )}
                      </div>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button
                          className="btn secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!user) {
                            // Store the pending cart action in localStorage
                            localStorage.setItem('pendingCartAction', JSON.stringify({
                              product: product,
                              quantity: 1
                            }));
                            // Trigger a global event or callback to show login modal
                            window.dispatchEvent(new CustomEvent('showLoginModal', { detail: { product, quantity: 1 } }));
                          } else {
                            // User is authenticated, proceed with adding to cart using Zustand
                            import('@/store/cartStore').then((module) => {
                              module.useCartStore.getState().addItem({
                                id: Date.now(), // Temporary ID
                                product_id: product.id,
                                quantity: 1,
                                name: product.name,
                                price: product.price,
                                image_url: product.primary_image || product.image_url,
                              });
                            });
                          }
                          }}
                          style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', minWidth: '40px', position: 'relative', zIndex: 1 }}
                          aria-label="Add to cart"
                        >
                          <i className="fas fa-shopping-cart"></i>
                        </button>
                        {(() => {
                          const cartItem = cartItems.find(item => item.product_id === product.id);
                          return cartItem ? (
                            <span style={{
                              position: 'absolute',
                              top: '-10px',
                              right: '-10px',
                              backgroundColor: '#e74c3c',
                              color: 'white',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              fontSize: '0.7rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              border: '2px solid white',
                              zIndex: 2,
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}>
                              {cartItem.quantity}
                            </span>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  </div>
                </ProductInfo>
              </ProductCard>
            </div>
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