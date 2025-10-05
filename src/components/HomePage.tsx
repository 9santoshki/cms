import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';
import logo from '../assets/logo.svg';
import '../App.css'; // Import the main CSS file
import Slider from './Slider';
import ProductDetail from './ProductDetail';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    products,
    cartItems,
    loading,
    error,
    fetchProducts,
    logout,
  } = useAppContext();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleCheckout = (orderData: any) => {
    // Simulate order processing
    console.log('Order placed:', orderData);
    
    // Save order to history
    const orderWithDate = {
      ...orderData,
      date: new Date().toISOString()
    };
    
    const savedOrders = localStorage.getItem('orderHistory');
    const orderHistory = savedOrders ? JSON.parse(savedOrders) : [];
    orderHistory.push(orderWithDate);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    // Show order confirmation
    setOrderCompleted(true);
    
    // Reset order completion status after 3 seconds
    setTimeout(() => {
      setOrderCompleted(false);
    }, 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading.products) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error.products) {
    return (
      <div className="error-container">
        <p>{error.products}</p>
        <button className="btn primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="App">
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
            <a href="/services" className="nav-link">Services</a>
            {user && (
              <a href="/orders" className="nav-link">Orders</a>
            )}
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
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

      {/* Slider Section */}
      <section id="home">
        <Slider />
      </section>

      {/* Portfolio Section */}
      <section className="featured" id="portfolio">
        <div className="container">
          <h2 className="section-title">DESIGN PORTFOLIO</h2>
          <div className="products-grid">
            {portfolioProjects.map(project => (
              <div className="product-card" key={project.id}>
                <div className={`product-image ${project.imageClass}`}></div>
                <div className="product-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <button className="btn small" onClick={() => window.location.href='/portfolio'}>
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="portfolio-button-container">
            <button className="btn primary" onClick={() => window.location.href='/portfolio'}>
              View More Projects
            </button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="transform-space" id="about">
        <div className="container">
          <h2 className="section-title">ABOUT ELEGANT SPACES</h2>
          <p className="transform-description">
            At Elegant Spaces, we believe that exceptional interior design is the intersection of artistry and functionality. 
            Founded by award-winning designer Sarah Johnson, our studio brings over 15 years of experience in creating 
            transformative spaces that reflect our clients' unique lifestyles and aspirations. 
            We specialize in both residential and commercial projects, offering full-service design from concept to completion. 
            Our approach combines careful listening, innovative design thinking, and meticulous attention to detail to ensure 
            every project exceeds expectations.
          </p>
          <div className="transform-button">
            <button className="btn primary">Meet Our Team</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title">OUR SERVICES</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-pencil-ruler"></i>
              </div>
              <h3>DESIGN CONSULTATION</h3>
              <p>Comprehensive design planning and concept development</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-couch"></i>
              </div>
              <h3>FURNITURE DESIGN</h3>
              <p>Custom furniture pieces crafted to your specifications</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-home"></i>
              </div>
              <h3>SPACE PLANNING</h3>
              <p>Optimizing layouts for flow and functionality</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-paint-roller"></i>
              </div>
              <h3>COLOR CONSULTING</h3>
              <p>Expert color selection for mood and ambiance</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>LIGHTING DESIGN</h3>
              <p>Strategic lighting solutions for every space</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3>PROJECT MANAGEMENT</h3>
              <p>End-to-end oversight from concept to completion</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">CLIENT TESTIMONIALS</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="rating">★★★★★</p>
              <p className="testimonial-text">
                "Sarah transformed our outdated home into a modern masterpiece. Her attention to detail and creative vision 
                exceeded all our expectations. The process was seamless from start to finish!"
              </p>
              <p className="customer-name">Michael & Jennifer Roberts</p>
            </div>
            <div className="testimonial-card">
              <p className="rating">★★★★★</p>
              <p className="testimonial-text">
                "Working with Elegant Spaces was a game-changer for our restaurant. The design elevated our brand and 
                created an atmosphere that our customers love. Revenue has increased by 30% since the redesign!"
              </p>
              <p className="customer-name">David Chen, Bistro 45 Owner</p>
            </div>
            <div className="testimonial-card">
              <p className="rating">★★★★★</p>
              <p className="testimonial-text">
                "The team at Elegant Spaces understood our vision perfectly. They created a home office that inspires 
                productivity while maintaining the warmth of our family space. Truly exceptional work!"
              </p>
              <p className="customer-name">Priya Sharma, Architect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="featured" id="shop">
        <div className="container">
          <h2 className="section-title">OUR COLLECTION</h2>
          <div className="products-grid">
            {products.map(product => (
              <div className="product-card" key={product.id}>
                <div className={`product-image ${product.imageClass}`}></div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-price">₹{product.price.toLocaleString()}</div>
                  <button className="btn small" onClick={() => openProductDetail(product)}>View Details</button>
                  <button className="btn small secondary" onClick={() => window.location.href='/cart'}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          {cartItems.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button className="btn secondary" onClick={() => navigate('/cart')}>
                View Cart ({cartCount})
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Consultation Section */}
      <section className="consultation">
        <div className="container">
          <div className="centered-text">
            <h2>Ready to transform your space?</h2>
            <p>Schedule a complimentary 30-minute consultation to discuss your project vision.</p>
          </div>
          <div className="consultation-button">
            <button className="btn primary">Schedule Now</button>
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
                <li><a href="#home">Home</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#shop">Shop</a></li>
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
                <li><a href="#shop">All Products</a></li>
                <li><a href="#shop">New Arrivals</a></li>
                <li><a href="#shop">Best Sellers</a></li>
                <li><a href="#shop">Sale Items</a></li>
                {user && <li><a href="/orders">Order History</a></li>}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Colour My Space Interior Design. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onBack={closeProductDetail} 
          onAddToCart={handleCheckout} 
        />
      )}
      
      {/* Order Confirmation */}
      {orderCompleted && (
        <div className="order-confirmation">
          <div className="confirmation-content">
            <i className="fas fa-check-circle"></i>
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for your purchase. We'll send you a confirmation email shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;