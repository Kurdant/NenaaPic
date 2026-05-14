import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  { label: 'HOME',      href: '/',          image: '/images/backgroundNenaaChargement.PNG' },
  { label: 'PORTFOLIO', href: '/portfolio', image: '/images/banner_2.JPG' },
  { label: 'SERVICES',  href: '/services',  image: '/images/image_deco_4.jpg' },
  { label: 'À PROPOS',  href: '/about',     image: '/images/image_deco_5.jpg' },
  { label: 'CONTACT',   href: '/contact',   image: '/images/Photo_ecran_chargement.jpg' },
];

const NavSlider = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const startX = useRef(null);
  const isDragging = useRef(false);

  const prev = useCallback(() => setActive(i => (i - 1 + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setActive(i => (i + 1) % SLIDES.length), []);

  // Touch / mouse drag
  const onPointerDown = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging.current = false;
  };
  const onPointerMove = (e) => {
    if (startX.current === null) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    if (Math.abs(x - startX.current) > 8) isDragging.current = true;
  };
  const onPointerUp = (e) => {
    if (startX.current === null) return;
    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX.current - x;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    startX.current = null;
  };

  const handleLabelClick = () => {
    if (!isDragging.current) navigate(SLIDES[active].href);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden select-none">
      {/* Background images stack — only active is visible */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.href}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} />
        </div>
      ))}

      {/* Slider — 3 panels visible: prev | active | next */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {/* Prev label — barely peeking on left */}
        <button
          onClick={prev}
          className="absolute font-heading font-bold uppercase text-white/20 hover:text-white/40 transition-all duration-300 cursor-pointer overflow-hidden"
          style={{ fontSize: 'clamp(2.8rem, 10vw, 9rem)', letterSpacing: '0.04em', lineHeight: 1, left: 0, transform: 'translateX(-82%)', whiteSpace: 'nowrap' }}
          aria-label="Précédent"
        >
          {SLIDES[(active - 1 + SLIDES.length) % SLIDES.length].label}
        </button>

        {/* Active label — clickable link */}
        <button
          onClick={handleLabelClick}
          className="font-heading font-bold uppercase text-white text-center transition-all duration-500 cursor-pointer hover:opacity-80 w-[90vw]"
          style={{ fontSize: 'clamp(2.8rem, 10vw, 9rem)', letterSpacing: '0.04em', lineHeight: 1 }}
          aria-label={`Aller à ${SLIDES[active].label}`}
        >
          {SLIDES[active].label}
        </button>

        {/* Next label — barely peeking on right */}
        <button
          onClick={next}
          className="absolute font-heading font-bold uppercase text-white/20 hover:text-white/40 transition-all duration-300 cursor-pointer overflow-hidden"
          style={{ fontSize: 'clamp(2.8rem, 10vw, 9rem)', letterSpacing: '0.04em', lineHeight: 1, right: 0, transform: 'translateX(82%)', whiteSpace: 'nowrap' }}
          aria-label="Suivant"
        >
          {SLIDES[(active + 1) % SLIDES.length].label}
        </button>
      </div>


    </section>
  );
};

export default NavSlider;
