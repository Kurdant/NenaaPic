import React from 'react';

const Services = () => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://185.216.26.204:5000';

  const services = [
    { 
      name: 'Mariages', 
      description: 'Immortaliser le plus beau jour de votre vie',
      details: 'Reportage complet de votre journée, de la préparation à la soirée. Chaque moment capturé avec émotion et authenticité.',
      image: `${API_URL}/api/uploads/services/mariage.jpg`
    },
    { 
      name: 'Portraits', 
      description: 'Révéler votre personnalité unique',
      details: 'Séance photo personnalisée pour mettre en valeur votre singularité. Portraits professionnels ou artistiques.',
      image: `${API_URL}/api/uploads/services/portraits.jpg`
    },
    { 
      name: 'Entreprise', 
      description: 'Valoriser votre image professionnelle',
      details: 'Photos corporate, événements professionnels, portraits d\'équipe. Renforcez votre image de marque.',
      image: `${API_URL}/api/uploads/services/entreprise.jpg`
    },
    { 
      name: 'Couples', 
      description: 'Capturer votre histoire d\'amour',
      details: 'Séances photo de couple romantiques et naturelles. Immortalisez votre complicité et votre amour.',
      image: `${API_URL}/api/uploads/services/couples.jpg`
    }
  ];

  return (
    <div
      className="min-h-screen"
      style={{ 
        background: 'linear-gradient(135deg, #2a2d3a 0%, #3d4158 50%, #2f3241 100%)'
      }}
    >
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Titre principal */}
          <div className="text-center mb-16">
            <h1
              className="text-6xl md:text-7xl font-bold text-white tracking-wide mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              NOS SERVICES
            </h1>
            <p
              className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto"
              style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
            >
              Des prestations photographiques sur mesure pour tous vos moments précieux
            </p>
          </div>

          {/* Grid de services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Image avec effet hover */}
                <div className="mb-6 overflow-hidden rounded-xl h-64">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                  />
                </div>

                {/* Titre */}
                <h3 
                  className="text-3xl font-bold mb-3 text-white"
                  style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
                >
                  {service.name}
                </h3>

                {/* Description courte */}
                <p 
                  className="text-lg text-white/90 font-medium mb-4"
                  style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
                >
                  {service.description}
                </p>

                {/* Détails */}
                <p 
                  className="text-white/70 font-light leading-relaxed"
                  style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
                >
                  {service.details}
                </p>
              </div>
            ))}
          </div>

          {/* Section CTA */}
          <div
            className="p-8 md:p-12 rounded-2xl text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(12px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
            >
              Prêt à immortaliser vos moments ?
            </h3>
            <p
              className="text-lg text-white/80 font-light mb-8 max-w-2xl mx-auto"
              style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
            >
              Contactez-moi pour discuter de votre projet et créer ensemble des souvenirs inoubliables
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-4 text-lg border-2 border-white text-white font-medium tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 rounded-lg"
              style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
            >
              CONTACTEZ-MOI
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
