import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import logo from '../assets/logo.svg';
import '../App.css'; // Import the main CSS file

const ServicesPage = () => {
  const navigate = useNavigate();
  const { user, cartItems } = useAppContext();
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/');
  };

  return (
    <div className="services-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="/" className="logo-link">
              <div className="logo-container">
                <img 
                  src={logo} 
                  alt="Colour My Space Logo" 
                  className="logo-image" 
                />
              </div>
            </a>
          </div>
          <div className="nav-menu">
            <a href="/" className="nav-link">Home</a>
            <a href="/shop" className="nav-link">Shop</a>
            <a href="/portfolio" className="nav-link">Portfolio</a>
            <a href="/services" className="nav-link active">Services</a>
            {user && (
              <a href="/orders" className="nav-link">Orders</a>
            )}
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-icons">
            <button className="nav-icon">
              <i className="fas fa-search"></i>
            </button>
            {user ? (
              <>
                <button className="nav-icon" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
                <span className="user-greeting">Hi, {user.name}</span>
              </>
            ) : (
              <button className="nav-icon" onClick={() => navigate('/auth')}>
                <i className="fas fa-user"></i>
              </button>
            )}
            <button className="nav-icon" onClick={() => navigate('/cart')}>
              <i className="fas fa-shopping-cart"></i>
              {cartItems.length > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
          {/* Mobile menu toggle */}
          <div className="nav-toggle">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Services Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Elevating interiors with timeless elegance and functional design</p>
        </div>
      </section>

      {/* Services Content */}
      <section className="services-content">
        <div className="container">
          <div className="services-intro">
            <h2>Comprehensive Design Solutions</h2>
            <p>
              At Colour My Space, we offer a full range of interior design services tailored to meet your unique needs and lifestyle. 
              From conceptualization to completion, our expert team guides you through every step of the design process.
            </p>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-pencil-ruler"></i>
              </div>
              <h3>Design Consultation</h3>
              <p>Comprehensive design planning and concept development tailored to your vision and lifestyle.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-couch"></i>
              </div>
              <h3>Furniture Design</h3>
              <p>Custom furniture pieces crafted to your specifications with premium materials and craftsmanship.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-home"></i>
              </div>
              <h3>Space Planning</h3>
              <p>Optimizing layouts for flow and functionality to maximize your space potential.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-paint-roller"></i>
              </div>
              <h3>Color Consulting</h3>
              <p>Expert color selection for mood and ambiance that reflects your personal style.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Lighting Design</h3>
              <p>Strategic lighting solutions for every space to enhance functionality and atmosphere.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3>Project Management</h3>
              <p>End-to-end oversight from concept to completion with attention to detail and timeline.</p>
            </div>
          </div>

          {/* Process Section */}
          <div className="process-section">
            <h2>Our Design Process</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Discovery</h3>
                <p>Understanding your needs, preferences, and lifestyle through in-depth consultation.</p>
              </div>
              
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Conceptualization</h3>
                <p>Developing initial concepts and mood boards that capture your vision.</p>
              </div>
              
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Design Development</h3>
                <p>Refining concepts into detailed plans with material selections and specifications.</p>
              </div>
              
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Implementation</h3>
                <p>Bringing the design to life with careful project management and quality oversight.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="services-cta">
            <div className="centered-text">
              <h2>Ready to transform your space?</h2>
              <p>Schedule a complimentary 30-minute consultation to discuss your project vision.</p>
            </div>
            <button className="btn primary" onClick={() => {
              const contactElement = document.getElementById('contact');
              if (contactElement) {
                contactElement.scrollIntoView({behavior: 'smooth'});
              }
            }}>
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Colour My Space</h3>
              <p>
                Creating extraordinary interiors that blend timeless elegance with contemporary functionality. 
                Award-winning design services for residential and commercial spaces.
              </p>
              <div className="social-icons">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-pinterest"></i></a>
                <a href="#"><i className="fab fa-houzz"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
              
              <div className="footer-subsection">
                <h4>AWARDS & RECOGNITION</h4>
                <p>Featured in Architectural Digest, Elle Decor, and House Beautiful</p>
              </div>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/portfolio">Portfolio</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Residential Design</a></li>
                <li><a href="#">Commercial Design</a></li>
                <li><a href="#">Space Planning</a></li>
                <li><a href="#">Color Consulting</a></li>
                <li><a href="#">Furniture Design</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Shop</h4>
              <ul>
                <li><a href="/shop">All Products</a></li>
                <li><a href="/shop">New Arrivals</a></li>
                <li><a href="/shop">Best Sellers</a></li>
                <li><a href="/shop">Sale Items</a></li>
                {user && <li><a href="/orders">Order History</a></li>}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Colour My Space Interior Design. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;