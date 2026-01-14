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
      imageUrl: 'https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927653531-x2pjprnjaw-slider-modern-living-room.jpg'
    },
    {
      id: 2,
      title: 'CLASSIC ELEGANCE',
      subtitle: 'SOPHISTICATED SPACES THAT COMBINE TRADITIONAL ELEGANCE WITH MODERN COMFORT',
      imageUrl: 'https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927655512-p6cyjrf7cy-slider-classic-elegance.jpg'
    },
    {
      id: 3,
      title: 'COASTAL RETREAT',
      subtitle: 'BREATHE EASY WITH AIRY SPACES INSPIRED BY THE NATURAL COASTLINE',
      imageUrl: 'https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927656389-9s5gz1zz4c4-slider-coastal-retreat.jpg'
    }
  ];

  // All 3 buttons to show on each slide
  const buttons = [
    { text: 'VIEW PORTFOLIO', link: '/portfolio' },
    { text: 'BOOK CONSULTATION', link: '/booking' },
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


    </div>
  );
};

export default Slider;