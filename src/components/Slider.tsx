'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/Slider.css'; // Import the slider styles

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
}

const Slider: React.FC = () => {
  // Sample slides data
  const slides: Slide[] = [
    {
      id: 1,
      title: 'MODERN LIVING ROOM DESIGN',
      subtitle: 'ELEVATING INTERIORS WITH TIMELESS ELEGANCE AND FUNCTIONAL DESIGN',
      imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
    },
    {
      id: 2,
      title: 'CLASSIC ELEGANCE',
      subtitle: 'SOPHISTICATED SPACES THAT COMBINE TRADITIONAL ELEGANCE WITH MODERN COMFORT',
      imageUrl: 'https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
    },
    {
      id: 3,
      title: 'COASTAL RETREAT',
      subtitle: 'BREATHE EASY WITH AIRY SPACES INSPIRED BY THE NATURAL COASTLINE',
      imageUrl: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
    }
  ];

  // All 3 buttons to show on each slide
  const buttons = [
    { text: 'VIEW PORTFOLIO', link: '/portfolio' },
    { text: 'BOOK CONSULTATION', link: '/contact' },
    { text: 'SHOP NOW', link: '/shop' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance the slider every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  // Function to go to a specific slide
  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }, []);

  // Function to go to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Function to go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  return (
    <div className="slider-container" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="slider-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: `translateX(${(index - currentSlide) * 100}%)`
            }}
          >
            <div className="slide-content">
              <div className="slide-text">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <div className="slide-buttons">
                  {buttons.map((button, index) => (
                    <button 
                      key={index}
                      className="btn primary"
                      onClick={() => window.location.href = button.link}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider navigation arrows */}
      <button 
        className="slider-nav-arrow prev-arrow" 
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        className="slider-nav-arrow next-arrow" 
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Slider indicators */}
      <div className="slider-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;