import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { apiUrl } from '../utils/api';

const CirclePlusIcon = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="12" r="11" />
    <line x1="12" y1="7" x2="12" y2="17" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const Lightbox = ({ item, onClose }) => {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl font-light transition-colors duration-200"
        aria-label="Fermer"
      >
        ×
      </button>
      <div
        className="max-w-[90vw] max-h-[90vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.thumbnailUrl || item.directUrl || item.image}
          alt={item.title || ''}
          className="max-w-full max-h-[80vh] object-contain"
          referrerPolicy="no-referrer"
        />
        {(item.title || item.category) && (
          <div className="text-center">
            {item.category && <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-body">{item.category}</p>}
            {item.title && <p className="text-white font-heading text-lg uppercase mt-1">{item.title}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

const PortfolioCard = ({ item, index, onOpen }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      onClick={() => onOpen(item)}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
    >
      <div className="h-[500px] overflow-hidden">
        <img
          src={item.thumbnailUrl || item.directUrl || item.image}
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


const CategoryCard = ({ category, index, onSelect }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.15 });
  const thumb = category.thumb;

  return (
    <div
      ref={ref}
      onClick={onSelect}
      className={`group relative w-full cursor-pointer overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        height: '90vh',
        transitionDelay: `${(index % 3) * 80}ms`,
      }}
    >
      {/* Background image */}
      <img
        src={thumb?.thumbnailUrl || thumb?.directUrl || thumb?.image}
        alt={category.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
        referrerPolicy="no-referrer"
      />

      {/* Subtle dark overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)' }} />

      {/* Title bottom-left */}
      <div className="absolute left-0 right-0 bottom-0 px-6 md:px-10 pb-8 md:pb-10 flex items-end justify-between">
        <h2
          className="font-heading uppercase text-white"
          style={{ fontSize: 'clamp(1.4rem, 3.5vw, 3rem)', letterSpacing: '0.04em', lineHeight: 1, fontWeight: 400 }}
        >
          {category.label}
        </h2>

        {/* Plus icon bottom-right */}
        <span className="text-white/80 group-hover:text-white transition-colors duration-300 flex-shrink-0">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="20" y1="10" x2="20" y2="30" />
            <line x1="10" y1="20" x2="30" y2="20" />
          </svg>
        </span>
      </div>
    </div>
  );
};


const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl); // null = grid view
  const [heroVisible, setHeroVisible] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [ctaRef, ctaVisible] = useScrollAnimation();

  // Sync active category with URL
  const selectCategory = useCallback((slug) => {
    setActiveCategory(slug);
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  }, [setSearchParams]);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const safetyTimeout = setTimeout(() => controller.abort(), 12000);

    const fetchGallery = async () => {
      try {
        const res = await fetch(apiUrl('/api/gallery'), { signal: controller.signal });
        const data = await res.json();
        if (!cancelled && data.success && Array.isArray(data.images)) {
          setPortfolioItems(data.images);
        }
      } catch (err) {
        if (!cancelled) console.error('Erreur chargement galerie:', err);
      } finally {
        clearTimeout(safetyTimeout);
        if (!cancelled) setLoading(false);
      }
    };
    fetchGallery();

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(safetyTimeout);
    };
  }, []);

  // Reset scroll when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  // Group items by category, keep first image as thumbnail
  const categoriesMap = portfolioItems.reduce((acc, item) => {
    const cat = item.category || 'autres';
    if (!acc[cat]) acc[cat] = { id: cat, label: cat.toUpperCase(), thumb: item, items: [] };
    acc[cat].items.push(item);
    return acc;
  }, {});
  const categoryList = Object.values(categoriesMap);

  const filteredItems = activeCategory
    ? portfolioItems.filter(item => item.category === activeCategory)
    : [];
  const currentCategoryLabel = activeCategory
    ? categoriesMap[activeCategory]?.label
    : '';

  return (
    <div className="min-h-screen bg-black">
      {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}

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
            {activeCategory ? currentCategoryLabel : 'Une sélection de mes meilleurs travaux'}
          </p>
        </div>
      </section>

      {/* Body */}
      {loading ? (
        <section className="bg-black py-32 flex justify-center">
          <p className="text-white/30 font-body text-sm uppercase tracking-widest">Chargement...</p>
        </section>
      ) : portfolioItems.length === 0 ? (
        <section className="bg-black py-32 flex justify-center">
          <p className="text-white/30 font-body text-sm uppercase tracking-widest">Aucune photo pour l'instant</p>
        </section>
      ) : activeCategory === null ? (
        /* CATEGORY CARDS — each 90vh */
        <section className="bg-black">
          {categoryList.map((cat, index) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              index={index}
              onSelect={() => selectCategory(cat.id)}
            />
          ))}
        </section>
      ) : (
        /* CATEGORY GALLERY VIEW */
        <section className="bg-black py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Back button */}
            <div className="mb-10 flex items-center justify-between">
              <button
                onClick={() => selectCategory(null)}
                className="font-heading font-bold text-sm tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                ← Retour
              </button>
              <p className="font-heading font-bold text-sm tracking-[0.25em] uppercase text-white">
                {currentCategoryLabel}
              </p>
            </div>

            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} onOpen={setLightboxItem} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-black py-20 px-4 md:px-8">
        <div
          ref={ctaRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2
            className="font-heading font-bold uppercase text-white mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            DISCUTONS DE VOTRE PROJET
          </h2>
          <p className="font-body text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Faisons de votre projet le prochain à rejoindre ce portfolio
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 text-white font-body text-sm uppercase tracking-[0.2em] hover:opacity-70 transition-opacity duration-300"
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
