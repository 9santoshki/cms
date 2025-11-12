'use client';

import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

// Styled components for the elegant contact page
import {
  ContactContainer,
  ContactHero,
  ContactContent,
  ContactGrid,
  ContactInfo,
  ContactFormWrapper,
  ContactForm,
  ContactFormItem,
  FormRow,
  Alert,
  MapSection,
  MapPlaceholder,
  FAQSection,
  FAQGrid,
  FAQItem
} from '../styles/NewContactStyles';

const NewContactPage = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    <ContactContainer>
      {/* Navigation Bar */}
      <Header activePage="contact" />

      {/* Contact Hero Section */}
      <ContactHero>
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out to discuss your project or schedule a consultation.</p>
        </div>
      </ContactHero>

      {/* Contact Content */}
      <ContactContent>
        <div className="content-wrapper">
          <ContactGrid>
            {/* Contact Information */}
            <ContactInfo>
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
            </ContactInfo>
            
            {/* Contact Form */}
            <ContactFormWrapper>
              <div className="form-header">
                <h2>Schedule a Consultation</h2>
                <p>Fill out the form below and our team will contact you within 24 hours.</p>
              </div>
              
              {submitSuccess && (
                <Alert type="success">
                  <i className="fas fa-check-circle"></i>
                  <p>Thank you for your message! We'll be in touch soon.</p>
                </Alert>
              )}
              
              {submitError && (
                <Alert type="error">
                  <i className="fas fa-exclamation-circle"></i>
                  <p>{submitError}</p>
                </Alert>
              )}
              
              <ContactForm onSubmit={handleSubmit}>
                <ContactFormItem>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </ContactFormItem>
                
                <FormRow>
                  <ContactFormItem>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </ContactFormItem>
                  
                  <ContactFormItem>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </ContactFormItem>
                </FormRow>
                
                <ContactFormItem>
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
                </ContactFormItem>
                
                <ContactFormItem>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </ContactFormItem>
                
                <button 
                  type="submit" 
                  className="btn primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </ContactForm>
            </ContactFormWrapper>
          </ContactGrid>
          
          {/* Map Section */}
          <MapSection>
            <h2>Visit Our Studio</h2>
            <MapPlaceholder>
              <div className="map-content">
                <i className="fas fa-map-marked-alt"></i>
                <h3>Interactive Map</h3>
                <p>123 Design Avenue, Creative District, CA 90210</p>
                <button className="btn secondary">Get Directions</button>
              </div>
            </MapPlaceholder>
          </MapSection>
          
          {/* FAQ Section */}
          <FAQSection>
            <h2>Frequently Asked Questions</h2>
            <FAQGrid>
              <FAQItem>
                <h3>How long does the design process typically take?</h3>
                <p>
                  Timeline varies by project scope. Initial consultations take 1-2 weeks, while full design projects 
                  can range from 2-6 months depending on complexity and size.
                </p>
              </FAQItem>
              
              <FAQItem>
                <h3>What is your design fee structure?</h3>
                <p>
                  Fees are customized based on project scope and requirements. We offer hourly rates, flat fees, 
                  and percentage-based pricing. Consultations are complimentary.
                </p>
              </FAQItem>
              
              <FAQItem>
                <h3>Do you work with clients outside your local area?</h3>
                <p>
                  Yes, we offer virtual consultations and remote design services for clients nationwide. 
                  Travel fees may apply for on-site visits outside our local region.
                </p>
              </FAQItem>
              
              <FAQItem>
                <h3>What should I prepare for our initial consultation?</h3>
                <p>
                  Bring inspiration images, floor plans, measurements, and a list of priorities. 
                  Understanding your budget range upfront helps us tailor recommendations to your needs.
                </p>
              </FAQItem>
            </FAQGrid>
          </FAQSection>
        </div>
      </ContactContent>

      <Footer />
    </ContactContainer>
  );
};

export default NewContactPage;