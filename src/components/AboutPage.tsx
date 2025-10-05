import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import logo from '../assets/logo.svg';
import '../App.css'; // Import the main CSS file

const AboutPage = () => {
  const navigate = useNavigate();
  const { user, cartItems } = useAppContext();
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/');
  };

  return (
    <div className="about-page">
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
            <a href="/about" className="nav-link active">About</a>
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

      {/* About Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About Elegant Spaces</h1>
          <p>Creating extraordinary interiors with timeless elegance and contemporary functionality</p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="container">
          <div className="about-intro">
            <h2>Our Story</h2>
            <p>
              Founded by award-winning designer Sarah Johnson, Elegant Spaces brings over 15 years of experience in creating 
              transformative interiors that reflect our clients' unique lifestyles and aspirations. Our philosophy centers on 
              the belief that exceptional interior design is the intersection of artistry and functionality.
            </p>
          </div>

          {/* Founder Section */}
          <div className="founder-section">
            <div className="founder-image">
              <div className="image-placeholder">Founder Image</div>
            </div>
            <div className="founder-info">
              <h3>Sarah Johnson</h3>
              <h4>Founder & Principal Designer</h4>
              <p>
                With a Master's degree in Interior Architecture from Pratt Institute and over two decades of industry experience, 
                Sarah has established herself as a visionary in contemporary residential and commercial design. Her work has been 
                featured in Architectural Digest, Elle Decor, and House Beautiful.
              </p>
              <p>
                Sarah's design approach combines careful listening with innovative thinking to create spaces that are not only 
                beautiful but also deeply personal and functional. She believes that great design tells a story and enhances 
                the lives of those who inhabit the space.
              </p>
              <div className="awards">
                <h5>Recognitions</h5>
                <ul>
                  <li>Interior Design Excellence Award - 2022</li>
                  <li>Architectural Digest 50 Top Designers - 2021</li>
                  <li>House Beautiful Designer of the Year - 2020</li>
                  <li>Elle Decor Rising Star Award - 2019</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="philosophy-section">
            <h2>Our Philosophy</h2>
            <div className="philosophy-grid">
              <div className="philosophy-card">
                <div className="philosophy-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h3>Client-Centered Design</h3>
                <p>We begin every project by truly understanding our clients' needs, preferences, and lifestyle to create spaces that reflect their personality.</p>
              </div>
              
              <div className="philosophy-card">
                <div className="philosophy-icon">
                  <i className="fas fa-recycle"></i>
                </div>
                <h3>Sustainable Practices</h3>
                <p>Commitment to environmentally responsible design through sustainable materials and practices that minimize environmental impact.</p>
              </div>
              
              <div className="philosophy-card">
                <div className="philosophy-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h3>Attention to Detail</h3>
                <p>Meticulous attention to every element ensures cohesive design that exceeds expectations and stands the test of time.</p>
              </div>
              
              <div className="philosophy-card">
                <div className="philosophy-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Innovative Solutions</h3>
                <p>Creative problem-solving to overcome spatial challenges and achieve functional beauty in every corner of your space.</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image">
                  <div className="image-placeholder">Team Member</div>
                </div>
                <h3>Michael Chen</h3>
                <h4>Senior Designer</h4>
                <p>Specializing in commercial design with expertise in creating inspiring workplace environments.</p>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <div className="image-placeholder">Team Member</div>
                </div>
                <h3>Jennifer Roberts</h3>
                <h4>Lead Designer</h4>
                <p>Focused on residential projects with a passion for blending classic elegance with modern functionality.</p>
              </div>
              
              <div className="team-member">
                <div className="member-image">
                  <div className="image-placeholder">Team Member</div>
                </div>
                <h3>David Park</h3>
                <h4>Project Manager</h4>
                <p>Ensuring seamless execution of every project with meticulous attention to timeline and quality control.</p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="values-section">
            <h2>Our Core Values</h2>
            <div className="values-list">
              <div className="value-item">
                <h3>Integrity</h3>
                <p>Honest communication and transparent partnerships with every client throughout the design journey.</p>
              </div>
              
              <div className="value-item">
                <h3>Excellence</h3>
                <p>Commitment to the highest standards of design, craftsmanship, and service in every project we undertake.</p>
              </div>
              
              <div className="value-item">
                <h3>Innovation</h3>
                <p>Constant exploration of new ideas, materials, and techniques to push the boundaries of interior design.</p>
              </div>
              
              <div className="value-item">
                <h3>Sustainability</h3>
                <p>Dedication to environmentally conscious practices that protect our planet for future generations.</p>
              </div>
            </div>
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
                <li><a href="/about">About</a></li>
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

export default AboutPage;