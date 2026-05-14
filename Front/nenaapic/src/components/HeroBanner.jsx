import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const HeroBanner = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '70vh', minHeight: '480px' }}
    >
      <img
        src="/images/banner_2.JPG"
        alt="NenaaPic — galerie"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1400ms] ease-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'
        }`}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.25) 100%)',
        }}
      />
    </section>
  );
};

export default HeroBanner;
