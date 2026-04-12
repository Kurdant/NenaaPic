import React, { useState, useEffect } from 'react';
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

const PortfolioCard = ({ item, index }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
    >
      <div className="h-[500px] overflow-hidden">
        <img
          src={item.directUrl || item.image}
          alt={item.title || ''}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end">
        <div className="p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-body mb-1">{item.category}</p>
          <h3 className="text-white font-heading text-xl uppercase">{item.title || ''}</h3>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [heroVisible, setHeroVisible] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ctaRef, ctaVisible] = useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(apiUrl('/api/gallery'));
        const data = await res.json();
        if (data.success) {
          setPortfolioItems(data.images);
        }
      } catch (err) {
        console.error('Erreur chargement galerie:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Build categories dynamically from available images
  const dynamicCategories = ['all', ...new Set(portfolioItems.map(i => i.category).filter(Boolean))];
  const categories = dynamicCategories.map(c => ({
    id: c,
    label: c === 'all' ? 'TOUS' : c.toUpperCase(),
  }));

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen bg-black flex items-center justify-center relative">
        <div
          className={`text-center transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1
            className="font-heading font-bold uppercase text-white tracking-wide mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            PORTFOLIO
          </h1>
          <p className="font-body text-white/75 text-lg tracking-wide">
            Une sélection de mes meilleurs travaux
          </p>
        </div>
      </section>

      {/* Filter + Gallery Section */}
      <section className="bg-[#111] py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`font-body text-xs tracking-[0.2em] uppercase pb-2 transition-all duration-300 border-b-2 ${
                  activeFilter === cat.id
                    ? 'text-white border-white'
                    : 'text-white/40 border-transparent hover:text-white/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <p className="text-white/30 font-body text-sm uppercase tracking-widest">Chargement...</p>
            </div>
          ) : portfolioItems.length === 0 ? (
            <div className="flex justify-center py-20">
              <p className="text-white/30 font-body text-sm uppercase tracking-widest">Aucune photo pour l'instant</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
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
            DISCUTONS DE VOTRE PROJET
          </h2>
          <p className="font-body text-[#2C3E50] text-lg mb-10 max-w-2xl mx-auto">
            Faisons de votre projet le prochain à rejoindre ce portfolio
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

export default Portfolio;
