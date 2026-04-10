import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const CirclePlusIcon = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="12" r="11" />
    <line x1="12" y1="7" x2="12" y2="17" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const About = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [bioRef, bioVisible] = useScrollAnimation();
  const [approachRef, approachVisible] = useScrollAnimation();
  const [step1Ref, step1Visible] = useScrollAnimation();
  const [step2Ref, step2Visible] = useScrollAnimation();
  const [step3Ref, step3Visible] = useScrollAnimation();
  const [missionRef, missionVisible] = useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen bg-black flex items-center justify-center">
        <div
          className={`text-center transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1
            className="font-heading font-bold uppercase text-white tracking-wide mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            À PROPOS
          </h1>
          <p className="font-body text-white/75 text-lg tracking-wide">
            Photographe passionnée basée à Nice
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bg-[#FBF7EF] py-20 px-4 md:px-8">
        <div
          ref={bioRef}
          className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${
            bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="overflow-hidden">
            <img
              src="/images/banner_2.JPG"
              alt="NenaaPic - Photographe"
              className="w-full h-[600px] object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2
              className="font-heading font-bold uppercase text-[#0F1419]"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              MA PASSION, VOTRE HISTOIRE
            </h2>
            <p className="font-body text-[#2C3E50] text-lg leading-relaxed">
              Photographe passionnée basée à Nice, je capture l'essence de vos moments les plus précieux.
              Chaque cliché raconte une histoire unique, empreinte d'émotion et d'authenticité.
            </p>
            <p className="font-body text-[#2C3E50] text-lg leading-relaxed">
              Mon approche artistique combine technique professionnelle et sensibilité créative
              pour créer des images intemporelles qui vous ressemblent.
            </p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 text-[#0F1419] font-body text-sm uppercase tracking-[0.2em] hover:opacity-70 transition-opacity duration-300 pt-4"
            >
              VOIR MON TRAVAIL
              <CirclePlusIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-black py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            ref={approachRef}
            className={`text-center mb-16 transition-all duration-700 ${
              approachVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2
              className="font-heading font-bold uppercase text-white"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
            >
              MON APPROCHE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div
              ref={step1Ref}
              className={`transition-all duration-700 ${
                step1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <p className="font-heading text-5xl text-white/30 mb-4">01</p>
              <h3 className="font-heading font-bold uppercase text-white text-xl mb-3">DÉCOUVRIR</h3>
              <p className="font-body text-white/70 leading-relaxed">
                Je prends le temps de comprendre votre vision, vos attentes et l'histoire que vous souhaitez raconter.
              </p>
            </div>

            <div
              ref={step2Ref}
              className={`transition-all duration-700 ${
                step2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <p className="font-heading text-5xl text-white/30 mb-4">02</p>
              <h3 className="font-heading font-bold uppercase text-white text-xl mb-3">CRÉER</h3>
              <p className="font-body text-white/70 leading-relaxed">
                Avec un oeil artistique et une technique professionnelle, je capture l'essence de chaque moment.
              </p>
            </div>

            <div
              ref={step3Ref}
              className={`transition-all duration-700 ${
                step3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <p className="font-heading text-5xl text-white/30 mb-4">03</p>
              <h3 className="font-heading font-bold uppercase text-white text-xl mb-3">LIVRER</h3>
              <p className="font-body text-white/70 leading-relaxed">
                Un travail de retouche minutieux pour des images intemporelles qui vous ressemblent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-[#FBF7EF] py-20 px-4 md:px-8">
        <div
          ref={missionRef}
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2
            className="font-heading font-bold uppercase text-[#0F1419] text-center mb-12"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            MA MISSION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <p className="font-body text-[#2C3E50] text-lg leading-relaxed">
              Ma mission est de créer des images qui transcendent le temps.
              Je crois en la puissance de la photographie pour capturer l'émotion brute
              et raconter des histoires authentiques.
            </p>
            <p className="font-body text-[#2C3E50] text-lg leading-relaxed">
              Chaque client est unique, et mon approche personnalisée garantit
              que votre vision prenne vie à travers mon objectif. Ensemble, créons quelque chose d'extraordinaire.
            </p>
          </div>
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-[#0F1419] font-body text-sm uppercase tracking-[0.2em] hover:opacity-70 transition-opacity duration-300"
            >
              CONTACTEZ-MOI
              <CirclePlusIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
