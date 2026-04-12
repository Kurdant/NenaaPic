import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { apiUrl } from '../utils/api';

const CirclePlusIcon = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="12" r="11" />
    <line x1="12" y1="7" x2="12" y2="17" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

// Fallback local images shown only in development if API unavailable
const fallbackSlides = process.env.NODE_ENV === 'development' ? [
  { directUrl: '/images/portfolio-1.jpg', title: 'Mariage Sarah & Thomas', category: 'mariages' },
  { directUrl: '/images/banner_2.JPG', title: 'Portrait Éditorial', category: 'portraits' },
  { directUrl: '/images/portfolio-2.jpg', title: 'Portrait Studio', category: 'portraits' },
] : [];

const PortfolioSlider = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(fallbackSlides);
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.3 });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch gallery from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(apiUrl('/api/gallery'));
        const data = await res.json();
        if (data.success && data.images.length > 0) {
          setSlides(data.images);
        }
      } catch {
        // Keep fallback slides
      }
    };
    fetchGallery();
  }, []);

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="snap-section h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`relative w-[90vw] md:w-[85vw] h-[55vh] md:h-[65vh] overflow-hidden transition-all duration-700 ${
        sectionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className="absolute inset-0 transition-all duration-500 ease-in-out"
            style={{
              transform: `translateX(${(index - current) * 100}%)`,
              opacity: index === current ? 1 : 0.3,
            }}
          >
            <img
              src={slide.directUrl || slide.image}
              alt={slide.title || ''}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-right">
              <h3 className="font-heading text-white text-lg md:text-2xl mb-1">{slide.title || ''}</h3>
              <span className="text-white/60 text-xs md:text-sm font-body uppercase tracking-wider">{slide.category || ''}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`flex items-center gap-6 mt-6 md:mt-8 transition-all duration-700 delay-200 ${
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <button onClick={prev} className="text-white/60 hover:text-white transition-colors" aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-white/60 text-sm font-body tracking-wider">
          {current + 1} / {slides.length}
        </span>
        <button onClick={next} className="text-white/60 hover:text-white transition-colors" aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className={`mt-6 md:mt-8 transition-all duration-700 delay-[400ms] ${
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-3 text-white text-xs md:text-sm uppercase tracking-[0.2em] font-medium hover:text-primary-yellow transition-colors duration-300 group"
        >
          VOIR TOUT LE PORTFOLIO
          <CirclePlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default PortfolioSlider;
