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

const ALBUMS = [
  {
    slug: 'mariages',
    label: 'Mariages',
    image: '/images/mariage-1.jpg',
  },
  {
    slug: 'portraits',
    label: 'Portraits',
    image: '/images/portfolio-2.jpg',
  },
];

const AlbumCard = ({ album, index }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <Link
      ref={ref}
      to={`/portfolio?category=${album.slug}`}
      className={`group relative block overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        height: 'clamp(420px, 60vh, 640px)',
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <img
        src={album.image}
        alt={album.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.25) 100%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 px-6 md:px-10 pb-8 md:pb-10 flex items-end justify-between">
        <h3
          className="font-heading uppercase text-white"
          style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)', letterSpacing: '0.04em', lineHeight: 1 }}
        >
          {album.label}
        </h3>
        <span className="text-white/80 group-hover:text-white transition-colors duration-300 flex-shrink-0">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="20" y1="10" x2="20" y2="30" />
            <line x1="10" y1="20" x2="30" y2="20" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

const PortfolioAlbums = () => {
  return (
    <section className="w-full bg-black py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {ALBUMS.map((album, i) => (
            <AlbumCard key={album.slug} album={album} index={i} />
          ))}
        </div>

        <div className="mt-12 md:mt-14 flex justify-center">
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-3 text-white font-body text-sm uppercase tracking-[0.25em] hover:opacity-70 transition-opacity duration-300"
          >
            Voir le portfolio
            <CirclePlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioAlbums;
