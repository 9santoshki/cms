import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import logo from '../assets/logo.svg';
import '../App.css'; // Import the main CSS file

const ContactPage = () => {
  const navigate = useNavigate();
  const { user, cartItems } = useAppContext();
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
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
            <a href="#about" className="nav-link">About</a>
            <a href="/contact" className="nav-link active">Contact</a>
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

      {/* Contact Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out to discuss your project or schedule a consultation.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                Ready to transform your space? Schedule a complimentary consultation to discuss your project vision and 
                discover how our design expertise can elevate your environment.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h3>Studio Location</h3>
                    <p>123 Design Avenue<br />Creative District, CA 90210</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-text">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567<br />Mon-Fri: 9am-6pm PST</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h3>Email</h3>
                    <p>hello@colourmyspace.com<br />For general inquiries</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="contact-text">
                    <h3>Consultations</h3>
                    <p>Book online or call<br />Same-day appointments available</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <h3>Follow Our Journey</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-pinterest"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-houzz"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <div className="form-header">
                <h2>Schedule a Consultation</h2>
                <p>Fill out the form below and our team will contact you within 24 hours.</p>
              </div>
              
              {submitSuccess && (
                <div className="alert success">
                  <i className="fas fa-check-circle"></i>
                  <p>Thank you for your message! We'll be in touch soon.</p>
                </div>
              )}
              
              {submitError && (
                <div className="alert error">
                  <i className="fas fa-exclamation-circle"></i>
                  <p>{submitError}</p>
                </div>
              )}
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Design Consultation">Design Consultation</option>
                    <option value="Project Collaboration">Project Collaboration</option>
                    <option value="Press Inquiry">Press Inquiry</option>
                    <option value="Career Opportunity">Career Opportunity</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="map-section">
            <h2>Visit Our Studio</h2>
            <div className="map-placeholder">
              <div className="map-content">
                <i className="fas fa-map-marked-alt"></i>
                <h3>Interactive Map</h3>
                <p>123 Design Avenue, Creative District, CA 90210</p>
                <button className="btn secondary">Get Directions</button>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How long does the design process typically take?</h3>
                <p>
                  Timeline varies by project scope. Initial consultations take 1-2 weeks, while full design projects 
                  can range from 2-6 months depending on complexity and size.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>What is your design fee structure?</h3>
                <p>
                  Fees are customized based on project scope and requirements. We offer hourly rates, flat fees, 
                  and percentage-based pricing. Consultations are complimentary.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>Do you work with clients outside your local area?</h3>
                <p>
                  Yes, we offer virtual consultations and remote design services for clients nationwide. 
                  Travel fees may apply for on-site visits outside our local region.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>What should I prepare for our initial consultation?</h3>
                <p>
                  Bring inspiration images, floor plans, measurements, and a list of priorities. 
                  Understanding your budget range upfront helps us tailor recommendations to your needs.
                </p>
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

export default ContactPage;