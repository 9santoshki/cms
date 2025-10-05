import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import logo from '../assets/logo.svg';
import '../App.css'; // Import the main CSS file


const PortfolioPage = () => {
  const navigate = useNavigate();
  const { user, cartItems } = useAppContext();
  const [activeFilter, setActiveFilter] = useState('All Projects');
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const portfolioProjects = [
    {
      id: 1,
      title: "Modern Minimalist Living Room",
      category: "Residential",
      description: "Clean lines and contemporary aesthetics with a focus on functionality and natural light.",
      imageClass: "modern"
    },
    {
      id: 2,
      title: "Classic Elegance Dining Space",
      category: "Residential",
      description: "Timeless designs with refined details featuring rich textures and elegant furnishings.",
      imageClass: "classic"
    },
    {
      id: 3,
      title: "Coastal Retreat Bedroom",
      category: "Residential",
      description: "Light, airy spaces with natural elements and soothing color palettes inspired by the ocean.",
      imageClass: "coastal"
    },
    {
      id: 4,
      title: "Corporate Office Design",
      category: "Commercial",
      description: "Professional workspace that balances productivity with comfort and aesthetic appeal.",
      imageClass: "office"
    },
    {
      id: 5,
      title: "Boutique Hotel Lobby",
      category: "Hospitality",
      description: "Luxurious and inviting space that creates a memorable first impression for guests.",
      imageClass: "hotel"
    },
    {
      id: 6,
      title: "Restaurant Interior",
      category: "Commercial",
      description: "Atmospheric dining environment that enhances the culinary experience.",
      imageClass: "restaurant"
    }
  ];

  const filterButtons = ['All Projects', 'Residential', 'Commercial', 'Hospitality'];
  
  const filteredProjects = activeFilter === 'All Projects' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeFilter);

  return (
    <div className="portfolio-page">
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
            <a href="/portfolio" className="nav-link active">Portfolio</a>
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
                <button className="nav-icon" onClick={() => navigate('/auth')}>
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
      
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="container">
          <h1>Design Portfolio</h1>
          <p>Showcasing our finest interior design projects across residential, commercial, and hospitality spaces.</p>
        </div>
      </section>

      {/* Portfolio Filter */}
      <section className="portfolio-filter">
        <div className="container">
          <div className="filter-buttons">
            {filterButtons.map(filter => (
              <button 
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="portfolio-grid">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div className="project-card" key={project.id}>
                <div className={`project-image ${project.imageClass}`}></div>
                <div className="project-overlay">
                  <div className="project-info">
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <button className="btn primary">View Project</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-cta">
        <div className="container">
          <h2>Ready to Transform Your Space?</h2>
          <p>Let our expert designers create a space that reflects your unique style and meets your needs.</p>
          <button className="btn primary">Schedule a Consultation</button>
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
                <a href="#">Instagram</a>
                <a href="#">Pinterest</a>
                <a href="#">Houzz</a>
                <a href="#">LinkedIn</a>
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
                <li><a href="/services">Services</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
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
                {user ? <li><a href="/orders">Order History</a></li> : null}
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

export default PortfolioPage;