import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const CirclePlusIcon = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="12" r="11" />
    <line x1="12" y1="7" x2="12" y2="17" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const SportSection = ({ section, reversed }) => {
  const [ref, isVisible] = useScrollAnimation();
  const isDark = !reversed;
  const bgColor = isDark ? 'bg-black' : 'bg-[#FBF7EF]';
  const textColor = isDark ? 'text-white' : 'text-[#0F1419]';
  const descColor = isDark ? 'text-white/70' : 'text-[#2C3E50]';

  return (
    <section className={`${bgColor} py-20 px-4 md:px-8`}>
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className={`overflow-hidden ${reversed ? 'lg:order-2' : ''}`}>
          <img
            src={section.image}
            alt={section.title}
            className="w-full h-[500px] md:h-[600px] object-cover"
          />
        </div>
        <div className={`flex flex-col justify-center py-12 lg:py-0 ${reversed ? 'lg:order-1 lg:pr-16' : 'lg:pl-16'}`}>
          <h3
            className={`font-heading font-bold uppercase ${textColor} mb-4`}
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {section.title}
          </h3>
          <p className={`font-body ${descColor} text-lg leading-relaxed mb-6`}>
            {section.description}
          </p>
          <ul className="space-y-3">
            {section.points.map((point, i) => (
              <li key={i} className={`font-body ${descColor} text-sm flex items-center gap-3`}>
                <span className={isDark ? 'text-white/40' : 'text-[#0F1419]/40'}>—</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const Sport = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [ctaRef, ctaVisible] = useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      title: 'SPORT EN ACTION',
      description:
        "L'instant décisif, figé pour toujours. Je capture l'énergie brute et l'intensité des moments sportifs — la concentration, l'effort, la victoire. Des images dynamiques qui racontent bien plus qu'une performance.",
      image: '/images/image_deco_3.JPG',
      points: [
        'Sports collectifs & individuels',
        'Compétitions et entraînements',
        "Portraits d'athlètes",
        'Reportages sportifs',
      ],
    },
    {
      title: 'SPORT DE PLEIN AIR',
      description:
        "La Côte d'Azur offre un cadre exceptionnel pour la photographie sportive en extérieur. Running au bord de mer, sports nautiques, trail en arrière-pays… je mets en valeur l'alliance entre le corps, l'effort et le paysage.",
      image: '/images/image_deco_5.jpg',
      points: [
        'Running & triathlon',
        'Sports nautiques (surf, paddle, voile)',
        'Cyclisme & trail',
        'Yoga & sports doux',
      ],
    },
    {
      title: "PORTRAIT D'ATHLÈTE",
      description:
        "Au-delà de la performance, je photographie l'âme du sportif. Un regard, une posture, une détermination — autant de facettes que je révèle dans des portraits à la fois puissants et sincères, adaptés à vos projets personnels ou professionnels.",
      image: '/images/portfolio-1.jpg',
      points: [
        'Portraits studio & terrain',
        'Shooting pour clubs & associations',
        'Identité visuelle sportive',
        'Communication & réseaux sociaux',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
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
            SPORT
          </h1>
          <p className="font-body text-white/75 text-lg tracking-wide">
            L'énergie et l'instant capturés
          </p>
        </div>
      </section>

      {/* Alternating sections */}
      {sections.map((section, index) => (
        <SportSection
          key={index}
          section={section}
          reversed={index % 2 !== 0}
        />
      ))}

      {/* CTA */}
      <section className="bg-[#FBF7EF] py-20 px-4 md:px-8">
        <div
          ref={ctaRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2
            className="font-heading font-bold uppercase text-[#0F1419] mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            UN PROJET SPORTIF ?
          </h2>
          <p className="font-body text-[#2C3E50] text-lg mb-10 max-w-2xl mx-auto">
            Parlons de votre projet sportif et créons ensemble des images qui rendent hommage à votre passion.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 text-[#0F1419] font-body text-sm uppercase tracking-[0.2em] hover:opacity-70 transition-opacity duration-300"
          >
            CONTACTEZ-MOI
            <CirclePlusIcon />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Sport;
