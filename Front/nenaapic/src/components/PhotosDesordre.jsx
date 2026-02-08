import React, { useState, useEffect, useRef } from 'react';

const PhotosDesordre = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const centerImageRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: '/images/image_deco_1.jpg',
      title: 'Capturer l\'Instant',
      subtitle: 'Photographie professionnelle et artistique'
    },
    {
      id: 2,
      image: '/images/banner_2.JPG',
      title: 'Moments Précieux',
      subtitle: 'Des souvenirs qui durent toute une vie'
    },
    {
      id: 3,
      image: '/images/image_deco_3.JPG',
      title: 'Créativité & Style',
      subtitle: 'Une vision unique pour chaque projet'
    },
    {
      id: 4,
      image: '/images/image_deco_4.jpg',
      title: 'Excellence & Passion',
      subtitle: 'L\'art de la photographie d\'exception'
    },
    {
      id: 5,
      image: '/images/image_deco_5.jpg',
      title: 'Émotions Authentiques',
      subtitle: 'Raconter votre histoire en images'
    },
    {
      id: 6,
      image: '/images/banner_1.jpg',
      title: 'Votre Vision',
      subtitle: 'Transformée en œuvre d\'art'
    }
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effet de rotation 3D au survol (PC uniquement)
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024 || !centerImageRef.current) return;
    
    const rect = centerImageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculer la position relative d'une slide
  const getSlidePosition = (slideIndex) => {
    let diff = slideIndex - currentIndex;
    if (diff > slides.length / 2) diff -= slides.length;
    if (diff < -slides.length / 2) diff += slides.length;
    return diff;
  };

  // Obtenir le style pour chaque slide selon sa position
  const getSlideStyle = (position) => {
    const isCenter = position === 0;
    
    // Responsive: nombre de slides visibles
    let scale, translateX, translateZ, opacity, zIndex;
    
    if (window.innerWidth >= 1024) {
      // PC: 5 photos visibles (-2, -1, 0, 1, 2)
      if (Math.abs(position) > 2) {
        return { display: 'none' };
      }
      scale = isCenter ? 1 : 1 - Math.abs(position) * 0.2;
      translateX = position * 420;
      translateZ = isCenter ? 0 : -Math.abs(position) * 150;
      opacity = isCenter ? 1 : 1 - Math.abs(position) * 0.3;
      zIndex = 10 - Math.abs(position);
    } else if (window.innerWidth >= 768) {
      // Tablette: 3 photos visibles (-1, 0, 1)
      if (Math.abs(position) > 1) {
        return { display: 'none' };
      }
      scale = isCenter ? 1 : 0.7;
      translateX = position * 360;
      translateZ = isCenter ? 0 : -200;
      opacity = isCenter ? 1 : 0.5;
      zIndex = 10 - Math.abs(position);
    } else {
      // Mobile: 1 photo visible (0)
      if (position !== 0) {
        return { display: 'none' };
      }
      scale = 1;
      translateX = 0;
      translateZ = 0;
      opacity = 1;
      zIndex = 10;
    }

    // Rotation 3D au survol (seulement pour la photo centrale sur PC)
    let rotateX = 0;
    let rotateY = 0;
    if (isCenter && window.innerWidth >= 1024) {
      rotateX = mousePosition.y * -10;
      rotateY = mousePosition.x * 10;
    } else if (window.innerWidth >= 1024) {
      // Rotation pour regarder le centre: chaque photo est tournée selon sa position
      rotateY = position * 10;
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  return (
    <section className="relative py-6 md:py-8 px-4 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Carrousel 3D */}
        <div 
          className="relative h-[500px] md:h-[600px] lg:h-[700px]"
          style={{ perspective: '1500px' }}
        >
          {/* Container des slides */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {slides.map((slide, index) => {
                const position = getSlidePosition(index);
                const isCenter = position === 0;
                const slideStyle = getSlideStyle(position);

                if (slideStyle.display === 'none') return null;

                return (
                  <div
                    key={slide.id}
                    className="absolute"
                    style={slideStyle}
                  >
                    <div 
                      ref={isCenter ? centerImageRef : null}
                      onMouseMove={isCenter ? handleMouseMove : undefined}
                      onMouseLeave={isCenter ? handleMouseLeave : undefined}
                      className="relative p-0 md:p-0 shadow-2xl overflow-hidden"
                      style={{
                        width: window.innerWidth >= 768 ? '360px' : '300px',
                        height: window.innerWidth >= 768 ? '480px' : '400px'
                      }}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Texte superposé (seulement sur la photo centrale) */}
                      {isCenter && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-20">
                          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-6 mb-3 drop-shadow-2xl">
                            {slide.title}
                          </h2>
                          <p className="text-white text-base md:text-lg lg:text-xl text-center px-6 drop-shadow-lg">
                            {slide.subtitle}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Boutons de navigation */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 md:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Photo précédente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 md:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Photo suivante"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicateurs de position */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Aller à la photo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotosDesordre;
