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

const AboutTextSection = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.3 });
  const [linkRef, linkVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="snap-section h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      <div className="max-w-5xl mx-auto px-8 md:px-16 text-center">
        {/* Giant title */}
        <div
          ref={titleRef}
          className={`mb-12 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-heading font-bold text-white uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            CAPTURER
          </h2>
          <h2 className="font-heading font-bold text-white uppercase italic leading-[0.95]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            L'ESSENCE DE
          </h2>
          <h2 className="font-heading font-bold text-white uppercase leading-[0.95]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            VOS MOMENTS
          </h2>
        </div>

        {/* Two-column text */}
        <div
          ref={textRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto mb-10 transition-all duration-700 delay-200 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-white/75 text-sm md:text-base leading-relaxed text-left font-body">
            Photographe passionnée basée à Nice, mon travail transcende la capture traditionnelle. 
            Je me concentre sur la création d'images artistiques, pleines d'élégance et de style. 
            Chaque image est méticuleusement conçue avec un œil aiguisé pour le détail, 
            transformant les moments en déclarations visuelles intemporelles.
          </p>
          <p className="text-white/75 text-sm md:text-base leading-relaxed text-left font-body">
            Que ce soit pour capturer la beauté d'un mariage, l'émotion d'un portrait, 
            ou l'essence d'une marque, je mets en lumière la personnalité unique de chaque sujet. 
            Mon approche mêle esthétique haut de gamme et sensibilité contemporaine, 
            pour des images à la fois iconiques et profondément personnelles.
          </p>
        </div>

        {/* Link */}
        <div
          ref={linkRef}
          className={`transition-all duration-700 delay-[400ms] ${
            linkVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-3 text-white text-xs md:text-sm uppercase tracking-[0.2em] font-medium hover:text-primary-yellow transition-colors duration-300 group"
          >
            À PROPOS DE NENAAPIC
            <CirclePlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutTextSection;
