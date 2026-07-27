'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {
  ServicesContainer,
  ServicesHero,
  ServicesContent,
  ServicesIntro,
  ServicesGrid,
  ServiceCard,
  ServiceIcon,
  ProcessSection,
  ProcessSteps,
  ProcessStep,
  ServicesCTA
} from '../styles/ElegantServicesStyles';

const ServicesPage = () => {
  
  
  

  

  return (
    <ServicesContainer>
      <Header activePage="services" />
      
      {/* Services Hero Section */}
      <ServicesHero>
        <div className="container">
          <h1>Our Services</h1>
          <p>Elevating interiors with timeless elegance and functional design</p>
        </div>
      </ServicesHero>

      {/* Services Content */}
      <ServicesContent>
        <div className="container">
          <ServicesIntro>
            <h2>Comprehensive Design Solutions</h2>
            <p>
              At Colour My Space, we offer a full range of interior design services tailored to meet your unique needs and lifestyle. 
              From conceptualization to completion, our expert team guides you through every step of the design process.
            </p>
          </ServicesIntro>

          {/* Services Grid */}
          <ServicesGrid>
            <ServiceCard>
              <ServiceIcon>
                <i className="fas fa-pencil-ruler"></i>
              </ServiceIcon>
              <h3>Design Consultation</h3>
              <p>Comprehensive design planning and concept development tailored to your vision and lifestyle.</p>
            </ServiceCard>
            
            <ServiceCard>
              <ServiceIcon>
                <i className="fas fa-couch"></i>
              </ServiceIcon>
              <h3>Furniture Design</h3>
              <p>Custom furniture pieces crafted to your specifications with premium materials and craftsmanship.</p>
            </ServiceCard>
            
            <ServiceCard>
              <ServiceIcon>
                <i className="fas fa-home"></i>
              </ServiceIcon>
              <h3>Space Planning</h3>
              <p>Optimizing layouts for flow and functionality to maximize your space potential.</p>
            </ServiceCard>
            
            <ServiceCard>
              <ServiceIcon>
                <i className="fas fa-paint-roller"></i>
              </ServiceIcon>
              <h3>Color Consulting</h3>
              <p>Expert color selection for mood and ambiance that reflects your personal style.</p>
            </ServiceCard>
            
            <ServiceCard>
              <ServiceIcon>
                <i className="fas fa-lightbulb"></i>
              </ServiceIcon>
              <h3>Lighting Design</h3>
              <p>Strategic lighting solutions for every space to enhance functionality and atmosphere.</p>
            </ServiceCard>
            
            <ServiceCard>
              <ServiceIcon>
                <i className="fas fa-project-diagram"></i>
              </ServiceIcon>
              <h3>Project Management</h3>
              <p>End-to-end oversight from concept to completion with attention to detail and timeline.</p>
            </ServiceCard>
          </ServicesGrid>

          {/* Process Section */}
          <ProcessSection>
            <h2>Our Design Process</h2>
            <ProcessSteps>
              <ProcessStep>
                <div className="step-number">1</div>
                <h3>Discovery</h3>
                <p>Understanding your needs, preferences, and lifestyle through in-depth consultation.</p>
              </ProcessStep>
              
              <ProcessStep>
                <div className="step-number">2</div>
                <h3>Conceptualization</h3>
                <p>Developing initial concepts and mood boards that capture your vision.</p>
              </ProcessStep>
              
              <ProcessStep>
                <div className="step-number">3</div>
                <h3>Design Development</h3>
                <p>Refining concepts into detailed plans with material selections and specifications.</p>
              </ProcessStep>
              
              <ProcessStep>
                <div className="step-number">4</div>
                <h3>Implementation</h3>
                <p>Bringing the design to life with careful project management and quality oversight.</p>
              </ProcessStep>
            </ProcessSteps>
          </ProcessSection>

          {/* CTA Section */}
          <ServicesCTA>
            <div className="centered-text">
              <h2>Ready to transform your space?</h2>
              <p>Schedule a complimentary 30-minute consultation to discuss your project vision.</p>
            </div>
            <button className="btn primary" onClick={() => window.location.href = '/booking'}>
              Book Consultation
            </button>
          </ServicesCTA>
        </div>
      </ServicesContent>

      <Footer />
    </ServicesContainer>
  );
};

export default ServicesPage;