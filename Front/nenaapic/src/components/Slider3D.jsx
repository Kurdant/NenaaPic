import React, { useState, useEffect, useRef, useCallback } from 'react';

const Slider3D = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringCenter, setIsHoveringCenter] = useState(false);
  const centerRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: '/images/image_deco_1.jpg',
      title: 'CAPTURER L\'INSTANT',
      subtitle: 'Photographie professionnelle et artistique',
      badge: '#Portfolio'
    },
    {
      id: 2,
      image: '/images/banner_2.JPG',
      title: 'MOMENTS PRÉCIEUX',
      subtitle: 'Des souvenirs qui durent toute une vie',
      badge: '#Mariages'
    },
    {
      id: 3,
      image: '/images/image_deco_3.JPG',
      title: 'CRÉATIVITÉ & STYLE',
      subtitle: 'Une vision unique pour chaque projet',
      badge: '#Mode'
    },
    {
      id: 4,
      image: '/images/image_deco_4.jpg',
      title: 'EXCELLENCE & PASSION',
      subtitle: 'L\'art de la photographie d\'exception',
      badge: '#Studio'
    },
    {
      id: 5,
      image: '/images/image_deco_5.jpg',
      title: 'ÉMOTIONS AUTHENTIQUES',
      subtitle: 'Raconter votre histoire en images',
      badge: '#Portraits'
    },
    {
      id: 6,
      image: '/images/banner.jpg',
      title: 'VOTRE VISION',
      subtitle: 'Transformée en œuvre d\'art',
      badge: '#Créatif'
    }
  ];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  const handleMouseMove = (e) => {
    if (!centerRef.current) return;
    const rect = centerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const getPosition = (slideIndex) => {
    let diff = slideIndex - currentIndex;
    if (diff > slides.length / 2) diff -= slides.length;
    if (diff < -slides.length / 2) diff += slides.length;
    return diff;
  };

  const getCardStyle = (position) => {
    const absPos = Math.abs(position);

    // Seulement 5 cartes visibles: -2, -1, 0, 1, 2
    if (absPos > 2) return { display: 'none' };

    const isCenter = position === 0;

    // Dimensions de la carte - responsive
    const isMobile = window.innerWidth < 768;
    const cardW = isMobile ? 250 : 300;
    const cardH = isMobile ? 350 : 450;

    // Échelle progressive très marquée
    let scale;
    if (isCenter) scale = 1.15;
    else if (absPos === 1) scale = 0.85;
    else scale = 0.65;

    // Espacement horizontal: les cartes se chevauchent
    const translateX = position * 230;

    // Décalage vertical progressif
    const translateY = absPos * 30;

    // Profondeur Z
    const translateZ = isCenter ? 200 : -(absPos * 120);

    // Rotation Y: les cartes latérales sont tournées vers le centre
    // Position négative (gauche) → rotation positive (vers la droite)
    // Position positive (droite) → rotation négative (vers la gauche)
    let rotateY = -position * 35;

    // Rotation et translation au survol souris (carte centrale uniquement)
    let rotateX = 0;
    if (isCenter && isHoveringCenter) {
      rotateX = mousePos.y * -6;
      rotateY += mousePos.x * 6;
    }

    // Opacité et blur progressifs
    const opacity = isCenter ? 1 : 0.65 - absPos * 0.1;
    const blur = isCenter ? 0 : absPos * 2;

    return {
      width: `${cardW}px`,
      height: `${cardH}px`,
      transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
      opacity,
      zIndex: 10 - absPos,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Fond avec image floutée de la slide active */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${slides[currentIndex].image})`,
          filter: 'blur(40px) brightness(0.3)',
          transform: 'scale(1.2)',
        }}
      />

      {/* Conteneur principal */}
      <div className="relative z-10 py-16 md:py-20">
        {/* Scène 3D */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{
            perspective: '1200px',
            height: '580px',
            maxWidth: '1400px',
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {slides.map((slide, index) => {
              const position = getPosition(index);
              const isCenter = position === 0;
              const style = getCardStyle(position);

              if (style.display === 'none') return null;

              return (
                <div
                  key={slide.id}
                  className="absolute flex items-center justify-center"
                  style={{
                    ...style,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    ref={isCenter ? centerRef : null}
                    onMouseMove={isCenter ? handleMouseMove : undefined}
                    onMouseEnter={isCenter ? () => setIsHoveringCenter(true) : undefined}
                    onMouseLeave={isCenter ? () => { setIsHoveringCenter(false); setMousePos({ x: 0, y: 0 }); } : undefined}
                    className="relative w-full h-full overflow-hidden"
                    style={{
                      boxShadow: isCenter
                        ? '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)'
                        : '0 15px 40px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Image */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      draggable="false"
                    />

                    {/* Overlay gradient sur carte centrale */}
                    {isCenter && (
                      <>
                        {/* Badge en haut */}
                        <div className="absolute top-5 left-0 right-0 flex justify-center">
                          <span
                            className="text-white text-xs font-medium tracking-widest px-4 py-1.5"
                            style={{
                              background: 'rgba(255,255,255,0.15)',
                              backdropFilter: 'blur(10px)',
                              borderRadius: '2px',
                            }}
                          >
                            {slide.badge}
                          </span>
                        </div>

                        {/* Texte en bas */}
                        <div
                          className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 pt-32 px-6"
                          style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                          }}
                        >
                          <h2
                            className="text-white font-bold text-center leading-tight mb-3"
                            style={{
                              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                              letterSpacing: '0.08em',
                              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                            }}
                          >
                            {slide.title}
                          </h2>
                          <p
                            className="text-white text-center font-light"
                            style={{
                              fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
                              letterSpacing: '0.15em',
                              opacity: 0.85,
                              textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                            }}
                          >
                            {slide.subtitle}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flèches de navigation — chevrons minimalistes */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 text-white transition-opacity duration-300"
            style={{ opacity: 0.4 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.4')}
            aria-label="Photo précédente"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 text-white transition-opacity duration-300"
            style={{ opacity: 0.4 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.4')}
            aria-label="Photo suivante"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider3D;
