import React, { useState } from 'react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems = [
    { id: 1, image: '/images/portfolio-1.jpg', category: 'mariages', title: 'Mariage Sarah & Thomas' },
    { id: 2, image: '/images/portfolio-2.jpg', category: 'portraits', title: 'Portrait Studio' },
    { id: 3, image: '/images/portfolio-3.jpg', category: 'couples', title: 'Séance Couple' },
    { id: 4, image: '/images/portfolio-4.jpg', category: 'entreprise', title: 'Corporate Event' },
    { id: 5, image: '/images/portfolio-5.jpg', category: 'mariages', title: 'Mariage Emma & Lucas' },
    { id: 6, image: '/images/portfolio-6.jpg', category: 'portraits', title: 'Portrait Artistique' },
    { id: 7, image: '/images/portfolio-7.jpg', category: 'couples', title: 'Engagement Session' },
    { id: 8, image: '/images/portfolio-8.jpg', category: 'entreprise', title: 'Team Building' },
    { id: 9, image: '/images/portfolio-9.jpg', category: 'mariages', title: 'Mariage Julie & Marc' },
  ];

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'mariages', label: 'Mariages' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'couples', label: 'Couples' },
    { id: 'entreprise', label: 'Entreprise' },
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div
      className="min-h-screen"
      style={{ 
        background: 'linear-gradient(135deg, #FDFCFA 0%, #F5F0E8 50%, #FDFCFA 100%)'
      }}
    >
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h1
              className="text-6xl md:text-7xl font-bold tracking-wide mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#1A2B4A',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              PORTFOLIO
            </h1>
            <p
              className="text-xl md:text-2xl font-light max-w-3xl mx-auto"
              style={{ 
                color: '#1A2B4A',
                textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' 
              }}
            >
              Découvrez une sélection de mes meilleurs travaux
            </p>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-6 py-3 rounded-full font-medium tracking-wide transition-all duration-300 ${
                  activeFilter === cat.id
                    ? 'shadow-lg'
                    : 'hover:scale-105'
                }`}
                style={{
                  background: activeFilter === cat.id 
                    ? 'rgba(26, 43, 74, 0.9)' 
                    : 'rgba(255, 255, 255, 0.8)',
                  color: activeFilter === cat.id ? '#fff' : '#1A2B4A',
                  border: activeFilter === cat.id 
                    ? '2px solid rgba(26, 43, 74, 0.9)' 
                    : '2px solid rgba(26, 43, 74, 0.2)',
                  backdropFilter: 'blur(10px)',
                  textShadow: activeFilter === cat.id 
                    ? 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px'
                    : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grille de portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 8px 32px rgba(0, 0, 0, 0.1)',
                  height: '400px'
                }}
              >
                {/* Image */}
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay au hover */}
                <div
                  className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to top, rgba(26, 43, 74, 0.9) 0%, rgba(26, 43, 74, 0.5) 50%, transparent 100%)',
                  }}
                >
                  <h3
                    className="text-white text-2xl font-bold"
                    style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Section CTA */}
          <div
            className="p-8 md:p-12 rounded-2xl text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(12px)',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.8), 0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ 
                color: '#1A2B4A',
                textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' 
              }}
            >
              Vous aimez ce que vous voyez ?
            </h3>
            <p
              className="text-lg font-light mb-8 max-w-2xl mx-auto"
              style={{ 
                color: '#1A2B4A',
                textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' 
              }}
            >
              Faisons de votre projet le prochain à rejoindre ce portfolio
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-4 text-lg font-medium tracking-wide transition-all duration-300 hover:scale-105 rounded-lg"
              style={{
                background: '#1A2B4A',
                color: '#fff',
                border: '2px solid #1A2B4A',
                textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px'
              }}
            >
              CONTACTEZ-MOI
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
