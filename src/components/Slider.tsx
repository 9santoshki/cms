import React, { useState, useEffect } from 'react';


const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of background images for the slider
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      title: 'Modern Living Room Design'
    },
    {
      url: 'https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      title: 'Classic Elegance'
    },
    {
      url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      title: 'Coastal Retreat'
    },
    {
      url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      title: 'Minimalist Space'
    }
  ];

  // Auto-advance the slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array since slides is constant

  // Function to go to a specific slide
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="slider">
      <div className="slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.url})` }}
          >
            <div className="slide-content">
              <h1 className="hero-title">Transform Your Space Into Art</h1>
              <p className="hero-subtitle">ELEVATING INTERIORS WITH TIMELESS ELEGANCE AND FUNCTIONAL DESIGN</p>
            </div>
            <div className="slide-buttons">
              <button className="btn primary" onClick={() => document.getElementById('portfolio').scrollIntoView({behavior: 'smooth'})}>View Portfolio</button>
              <button className="btn secondary" onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}>Book Consultation</button>
              <button className="btn tertiary" onClick={() => window.location.href='/shop'}>Shop Now</button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slider dots */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;