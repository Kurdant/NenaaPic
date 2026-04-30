import React from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const CirclePlusIcon = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="12" r="11" />
    <line x1="12" y1="7" x2="12" y2="17" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const GetInTouchSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.3 });
  const [linkRef, linkVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      data-light-bg
      className="flex-1 w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#FBF7EF' }}
    >
      <div className="max-w-3xl mx-auto px-8 md:px-16 text-center">
        {/* Giant title */}
        <div
          ref={titleRef}
          className={`mb-8 md:mb-10 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2
            className="font-heading font-bold uppercase leading-[0.95]"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              color: '#0F1419',
            }}
          >
            GET IN TOUCH
          </h2>
        </div>

        {/* Paragraph */}
        <div
          ref={textRef}
          className={`mb-8 md:mb-10 transition-all duration-700 delay-200 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-sm md:text-base leading-relaxed font-body max-w-xl mx-auto"
             style={{ color: '#2C3E50' }}>
            Prête à créer quelque chose d'inoubliable ? Que ce soit pour capturer l'élégance de votre mariage 
            ou donner vie à votre prochain projet créatif, je suis là pour transformer votre vision 
            en images intemporelles. Ensemble, créons une histoire qui résonne.
          </p>
        </div>

        {/* CTA Link */}
        <div
          ref={linkRef}
          className={`transition-all duration-700 delay-[400ms] ${
            linkVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.2em] font-medium hover:opacity-60 transition-opacity duration-300 group"
            style={{ color: '#0F1419' }}
          >
            CONTACTEZ-MOI
            <CirclePlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
