import React from 'react';
import { Link } from 'react-router-dom';

const HeroBannerV2 = () => {
  return (
    <section className="snap-section relative h-screen w-full overflow-hidden">
      {/* Background Image - Full width */}
      <div className="absolute inset-0">
        <img
          src="/images/banner.jpg"
          alt="NenaaPic Photography"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left Side - Blurred Overlay (Desktop only) */}
      <div className="absolute inset-0 w-1/2 hidden md:block">
        <img
          src="/images/banner.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover filter blur-xl"
        />
      </div>

      {/* Text Overlay - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10 mx-4 md:mx-0">
        <div 
          className="text-center px-6 md:px-16 py-12 border border-white/30 max-w-sm md:max-w-none animate-scale-in"
          style={{
            backgroundColor: 'rgb(209 209 209 / 29%)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 0 20px rgb(255 255 255 / 0.2), 0 8px 32px rgb(0 0 0 / 0.1)',
            borderRadius: '16px'
          }}
        >
          <h1 
            className="font-heading font-bold text-white mb-4 tracking-wider animate-fade-in" 
            style={{ 
              fontSize: '3.5rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            NENAAPIC
          </h1>
          <p className="text-white/90 font-body font-light tracking-wide mb-8 text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Capturer la beauté de la vie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/portfolio"
              className="px-6 md:px-10 py-2 md:py-4 text-sm md:text-base bg-primary-yellow text-neutral-black font-medium tracking-wide hover:-translate-y-1 hover:shadow-lg transition-all duration-300 rounded-md"
            >
              EXPLORER MON TRAVAIL
            </Link>
            <Link
              to="/contact"
              className="px-6 md:px-10 py-2 md:py-4 text-sm md:text-base border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-neutral-black transition-all duration-300 rounded-md"
            >
              ME CONTACTER
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Lines - updated colors */}
      <div className="absolute bottom-10 left-10 w-24 h-0.5 bg-primary-yellow"></div>
      <div className="absolute top-10 right-10 w-16 h-16 border-2 border-primary-yellow rounded-full"></div>
    </section>
  );
};

export default HeroBannerV2;
