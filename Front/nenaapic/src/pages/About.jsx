import React from 'react';

const About = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #9CC5D6 0%, rgb(139, 122, 184) 100%)',
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
              HERE'S TO LIFE
            </h1>
            <p
              className="text-xl md:text-2xl text-white/90 font-light"
              style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
            >
              Photographe passionnée basée à Nice
            </p>
          </div>

          {/* Contenu principal - Grid 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Image principale */}
            <div className="relative">
              <div
                className="overflow-hidden rounded-2xl shadow-2xl"
                style={{
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <img
                  src="/images/banner_2.jpg"
                  alt="NenaaPic - À Propos"
                  className="w-full h-[600px] object-cover"
                />
              </div>

              {/* Cercle décoratif */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border-4 border-yellow-300 rounded-full opacity-60"></div>
            </div>

            {/* Texte descriptif */}
            <div className="text-white space-y-6">
              <h2
                className="text-4xl font-bold mb-6"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                Ma passion, votre histoire
              </h2>

              <p
                className="text-lg font-light leading-relaxed"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                Photographe passionnée basée à Nice, je capture l'essence de vos moments les plus précieux. 
                Chaque cliché raconte une histoire unique, empreinte d'émotion et d'authenticité.
              </p>

              <p
                className="text-lg font-light leading-relaxed"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                Mon approche artistique combine technique professionnelle et sensibilité créative 
                pour créer des images intemporelles qui vous ressemblent.
              </p>

              {/* Ligne décorative */}
              <div className="relative pt-8">
                <svg className="w-32 h-32 opacity-70" viewBox="0 0 100 100">
                  <line x1="0" y1="50" x2="80" y2="50" stroke="#D4AF37" strokeWidth="2"/>
                  <circle cx="85" cy="50" r="5" fill="#D4AF37"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Section Mission avec liquid glass */}
          <div className="mt-20">
            <div
              className="p-8 md:p-12 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h3
                className="text-3xl font-bold text-white mb-6 text-center"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                MA MISSION
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <p
                  className="text-lg font-light leading-relaxed text-white"
                  style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
                >
                  Ma mission est de créer des images qui transcendent le temps. 
                  Je crois en la puissance de la photographie pour capturer l'émotion brute 
                  et raconter des histoires authentiques.
                </p>

                <p
                  className="text-lg font-light leading-relaxed text-white"
                  style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
                >
                  Chaque client est unique, et mon approche personnalisée garantit 
                  que votre vision prenne vie à travers mon objectif. Ensemble, créons quelque chose d'extraordinaire.
                </p>
              </div>
            </div>
          </div>

          {/* Valeurs - 3 colonnes */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              <h4
                className="text-xl font-bold mb-3"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                Authenticité
              </h4>
              <p
                className="font-light"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                Capturer des moments vrais et sincères
              </p>
            </div>

            <div className="text-center text-white">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h4
                className="text-xl font-bold mb-3"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                Passion
              </h4>
              <p
                className="font-light"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                Dévouement total à mon art
              </p>
            </div>

            <div className="text-center text-white">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h4
                className="text-xl font-bold mb-3"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                Excellence
              </h4>
              <p
                className="font-light"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                Un résultat professionnel garanti
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
