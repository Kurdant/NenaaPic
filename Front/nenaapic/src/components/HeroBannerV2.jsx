import React from 'react';

const HeroBannerV2 = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
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
          alt="NenaaPic Photography"
          className="w-full h-full object-cover filter blur-xl"
        />
      </div>

      {/* Text Overlay - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10 mx-4 md:mx-0">
        <div 
          className="text-center px-6 md:px-16 py-12 border border-white/30 max-w-sm md:max-w-none"
          style={{
            backgroundColor: 'rgb(209 209 209 / 29%)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 0 20px rgb(255 255 255 / 0.2), 0 8px 32px rgb(0 0 0 / 0.1)',
            borderRadius: '16px'
          }}
        >
          <h1 
            className="font-bold text-white mb-4 tracking-wider" 
            style={{ 
              fontSize: '3.5rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            NENAAPIC
          </h1>
          <p className="text-white/90 font-light tracking-wide mb-8" style={{ fontSize: '1.2rem', textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}>
            Capturer la beauté de la vie
          </p>
          <button className="px-6 md:px-10 py-2 md:py-4 text-sm md:text-base border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105" style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}>
            EXPLORER MON TRAVAIL
          </button>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute bottom-10 left-10 w-24 h-0.5 bg-yellow-300"></div>
      <div className="absolute top-10 right-10 w-16 h-16 border-2 border-yellow-300 rounded-full"></div>
    </section>
  );
};

export default HeroBannerV2;
