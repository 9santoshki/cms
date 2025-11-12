'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import Header from './Header';
import Footer from './Footer';
import Slider from './Slider';
import ProductDetail from './ProductDetail';

// Font Awesome import
import '@fortawesome/fontawesome-free/css/all.min.css';

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
  const {
    products,
    loading,
    error,
    fetchProducts
  } = useAppContext();
  
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products when component mounts
    fetchProducts();
  }, []); // Empty dependency array to run only once on mount

  const navigate = (path: string) => {
    router.push(path);
  };

  // Portfolio projects for homepage
  const portfolioProjects = [
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
  const testimonials = [
    {
      id: 1,
      text: "Sarah transformed our outdated home into a modern masterpiece. Her attention to detail and creative vision exceeded all our expectations. The process was seamless from start to finish!",
      author: "Michael & Jennifer Roberts",
      rating: 5
    },
    {
      id: 2,
      text: "Working with Elegant Spaces was a game-changer for our restaurant. The design elevated our brand and created an atmosphere that our customers love. Revenue has increased by 30% since the redesign!",
      author: "David Chen, Bistro 45 Owner",
      rating: 5
    },
    {
      id: 3,
      text: "The team at Elegant Spaces understood our vision perfectly. They created a home office that inspires productivity while maintaining the warmth of our family space. Truly exceptional work!",
      author: "Priya Sharma, Architect",
      rating: 5
    }
  ];

  // Services for homepage
  const services = [
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

  const openProductDetail = (product: any) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  

  

  if (loading.products) {
    return (
      <HomepageContainer>
        <LoadingSpinner />
      </HomepageContainer>
    );
  }

  if (error.products) {
    return (
      <ErrorContainer>
        <p>{error.products}</p>
        <button className="btn primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </ErrorContainer>
    );
  }

  return (
    <HomepageContainer>
      {/* Navigation Bar */}
      <Header activePage="home" />

      {/* Hero Slider Section */}
      <Slider />


      {/* Portfolio Section */}
      <PortfolioSection>
        <div className="section-header">
          <h2 className="section-title">DESIGN PORTFOLIO</h2>
          <p className="section-subtitle">Explore our curated collection of distinctive design concepts that harmoniously blend timeless elegance with contemporary innovation</p>
        </div>
        <PortfolioGrid>
          {portfolioProjects.map(project => (
            <PortfolioCard key={project.id} imageClass={project.imageClass}>
              <div className="project-image"></div>
              <div className="project-overlay">
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <button className="btn primary" onClick={() => navigate('/portfolio')}>
                    View Project
                  </button>
                </div>
              </div>
            </PortfolioCard>
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
        <ProductsGrid>
          {products.slice(0, 6).map(product => (
            <ProductCard key={product.id}>
              <ProductImage imageClass={product.imageClass} imageUrl={product.image_url}>
                <div className="add-to-cart-overlay">
                  <button 
                    className="btn primary" 
                    onClick={() => openProductDetail(product)}
                  >
                    View Details
                  </button>
                </div>
              </ProductImage>
              <ProductInfo>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <ProductPrice>₹{product.price.toLocaleString()}</ProductPrice>
                <div className="product-actions">
                  <button 
                    className="btn primary" 
                    onClick={() => openProductDetail(product)}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn secondary" 
                    onClick={() => navigate('/cart')}
                  >
                    Add to Cart
                  </button>
                </div>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
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
          {services.map(service => (
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
          {testimonials.map(testimonial => (
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
          <button className="btn primary" onClick={() => navigate('/contact')}>
            Schedule Now
          </button>
        </div>
      </ConsultationSection>

      <Footer />
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onBack={closeProductDetail} 
        />
      )}
      
      
    </HomepageContainer>
  );
};

export default NewHomepage;