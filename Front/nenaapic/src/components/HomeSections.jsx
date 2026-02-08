import React from 'react';

const AboutSection = () => {
  return (
    <section 
      className="py-32 px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #9CC5D6 0%, rgb(139, 122, 184) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu Texte */}
          <div className="text-white space-y-8">
            <h2 className="text-6xl font-bold tracking-wide mb-6">
              HERE'S TO<br />LIFE
            </h2>
            <p className="text-lg font-light leading-relaxed opacity-90">
              Photographe passionnée basée à Nice, je capture l'essence de vos moments les plus précieux. 
              Chaque cliché raconte une histoire unique, empreinte d'émotion et d'authenticité.
            </p>
            <p className="text-lg font-light leading-relaxed opacity-90">
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

          {/* Image Déco 1 */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img
                src="/images/banner_2.jpg"
                alt="About NenaaPic"
                className="w-full h-[600px] object-cover"
              />
            </div>
            
            {/* Cercle décoratif */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-4 border-yellow-300 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    { name: 'Mariages', description: 'Immortaliser le plus beau jour de votre vie' },
    { name: 'Portraits', description: 'Révéler votre personnalité unique' },
    { name: 'Entreprise', description: 'Valoriser votre image professionnelle' },
    { name: 'Couples', description: 'Capturer votre histoire d\'amour' }
  ];

  return (
    <section 
      className="py-32 px-8 relative overflow-hidden"
      style={{ backgroundColor: '#FFF9E6' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Déco 2 */}
          <div className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img
                src="/images/image_deco_2.jpg"
                alt="Services NenaaPic"
                className="w-full h-[600px] object-cover"
              />
            </div>
            
            {/* Ligne décorative bleue */}
            <div className="absolute top-4 right-4">
              <svg className="w-24 h-24 opacity-60" viewBox="0 0 100 100">
                <line x1="20" y1="0" x2="20" y2="100" stroke="#4A90E2" strokeWidth="2"/>
                <line x1="0" y1="20" x2="100" y2="20" stroke="#4A90E2" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Contenu Services */}
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-6xl font-bold tracking-wide mb-12" style={{ color: '#1A2B4A' }}>
              OUR<br />SERVICES
            </h2>
            
            <div className="space-y-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/50 backdrop-blur-sm p-6 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#1A2B4A' }}>
                    {service.name}
                  </h3>
                  <p className="text-gray-700 font-light">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = () => {
  const portfolioImages = [
    '/images/portfolio-1.jpg',
    '/images/portfolio-2.jpg',
    '/images/portfolio-3.jpg',
    '/images/portfolio-4.jpg',
    '/images/portfolio-5.jpg',
    '/images/portfolio-6.jpg',
  ];

  return (
    <section 
      className="py-32 px-8 relative overflow-hidden"
      style={{ backgroundColor: '#FDFCFA' }}
    >
      {/* Formes abstraites en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full" style={{ background: '#4A90E2' }}></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full" style={{ background: '#F7DC6F' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contenu Portfolio */}
          <div className="space-y-8">
            <h2 className="text-6xl font-bold tracking-wide" style={{ color: '#1A2B4A' }}>
              PORTFOLIO
            </h2>
            <p className="text-lg font-light text-gray-700 leading-relaxed">
              Découvrez une sélection de mes meilleurs travaux. 
              Chaque projet est unique et raconte une histoire différente.
            </p>
            
            {/* Grid de 3x2 */}
            <div className="grid grid-cols-3 gap-4">
              {portfolioImages.map((img, index) => (
                <div 
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              ))}
            </div>

            <button className="px-8 py-4 border-2 border-gray-800 text-gray-800 font-medium hover:bg-gray-800 hover:text-white transition-all duration-300">
              VOIR PLUS
            </button>

            {/* Cercle décoratif */}
            <div className="absolute bottom-0 left-0">
              <svg className="w-32 h-32 opacity-40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D4AF37" strokeWidth="2"/>
                <circle cx="50" cy="50" r="25" fill="none" stroke="#D4AF37" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Image Déco 3 */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img
                src="/images/image_deco_3.JPG"
                alt="Portfolio NenaaPic"
                className="w-full h-[700px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MissionSection = () => {
  return (
    <section 
      className="py-32 px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F7DC6F 0%, #A8E6CF 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Déco 4 - Circulaire */}
          <div className="relative">
            <div className="w-96 h-96 mx-auto rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 border-8 border-white">
              <img
                src="/images/image_deco_4.jpg"
                alt="Mission NenaaPic"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Lignes radiales décoratives */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
              <line x1="200" y1="50" x2="200" y2="0" stroke="#D4AF37" strokeWidth="2"/>
              <line x1="300" y1="100" x2="350" y2="50" stroke="#D4AF37" strokeWidth="2"/>
              <line x1="350" y1="200" x2="400" y2="200" stroke="#D4AF37" strokeWidth="2"/>
              <line x1="300" y1="300" x2="350" y2="350" stroke="#D4AF37" strokeWidth="2"/>
              <line x1="200" y1="350" x2="200" y2="400" stroke="#D4AF37" strokeWidth="2"/>
              <line x1="100" y1="300" x2="50" y2="350" stroke="#D4AF37" strokeWidth="2"/>
              <line x1="50" y1="200" x2="0" y2="200" stroke="#D4AF37" strokeWidth="2"/>
              <line x1="100" y1="100" x2="50" y2="50" stroke="#D4AF37" strokeWidth="2"/>
            </svg>
          </div>

          {/* Contenu Mission */}
          <div className="text-gray-900 space-y-8">
            <h2 className="text-6xl font-bold tracking-wide mb-6">
              THIS IS THE<br />PERFECT PLACE<br />FOR YOUR BUSINESS
            </h2>
            <h3 className="text-3xl font-semibold mb-4">MISSION STATEMENT</h3>
            <p className="text-lg font-light leading-relaxed">
              Ma mission est de créer des images qui transcendent le temps. 
              Je crois en la puissance de la photographie pour capturer l'émotion brute 
              et raconter des histoires authentiques.
            </p>
            <p className="text-lg font-light leading-relaxed">
              Chaque client est unique, et mon approche personnalisée garantit 
              que votre vision prenne vie à travers mon objectif.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  return (
    <section 
      className="py-32 px-8 relative overflow-hidden"
      style={{ backgroundColor: '#1A2B4A' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu Témoignage */}
          <div className="text-white space-y-8">
            <svg className="w-16 h-16 opacity-50 mb-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
            
            <h2 className="text-5xl font-bold italic leading-tight mb-8">
              "IT WAS JUST<br />DIVINE WORKING<br />WITH THEM!"
            </h2>
            
            <div className="space-y-2">
              <p className="text-xl font-medium">Sarah & Thomas</p>
              <p className="text-gray-400 font-light">Mariage - Juillet 2025</p>
            </div>

            {/* Ligne décorative coral */}
            <div className="relative pt-8">
              <svg className="w-32 h-32 opacity-70" viewBox="0 0 100 100">
                <line x1="0" y1="50" x2="80" y2="50" stroke="#FF9F87" strokeWidth="2"/>
                <circle cx="85" cy="50" r="5" fill="#FF9F87"/>
              </svg>
            </div>
          </div>

          {/* Image Déco 5 */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img
                src="/images/image_deco_5.jpg"
                alt="Testimonial NenaaPic"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section 
      className="py-32 px-8 relative overflow-hidden"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      {/* Formes abstraites colorées */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full" style={{ background: '#4A90E2' }}></div>
        <div className="absolute top-32 right-20 w-48 h-48 rounded-full" style={{ background: '#F7DC6F' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full" style={{ background: '#8B7AB8' }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
        <h2 className="text-6xl font-bold tracking-wide" style={{ color: '#1A2B4A' }}>
          LET'S CREATE<br />SOMETHING BEAUTIFUL<br />TOGETHER
        </h2>

        <button className="px-12 py-5 text-xl border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105">
          CONTACTEZ-MOI
        </button>

        <div className="flex justify-center items-center gap-12 pt-8">
          <a href="https://www.instagram.com/nenaa_pic/" className="text-gray-700 hover:text-gray-900 transition-colors">
            <span className="text-lg font-medium">Instagram</span>
          </a>
          <span className="text-gray-400">|</span>
          <a href="mailto:contact@nenaapic.com" className="text-gray-700 hover:text-gray-900 transition-colors">
            <span className="text-lg font-medium">Email</span>
          </a>
          <span className="text-gray-400">|</span>
          <a href="tel:+33XXXXXXXXX" className="text-gray-700 hover:text-gray-900 transition-colors">
            <span className="text-lg font-medium">Phone</span>
          </a>
        </div>

        {/* Motif géométrique doré */}
        <div className="flex justify-center gap-8 pt-12">
          <svg className="w-24 h-24 opacity-40" viewBox="0 0 100 100">
            <line x1="50" y1="0" x2="50" y2="40" stroke="#D4AF37" strokeWidth="2"/>
            <line x1="30" y1="50" x2="70" y2="50" stroke="#D4AF37" strokeWidth="2"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="#D4AF37" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export { AboutSection, ServicesSection, PortfolioSection, MissionSection, TestimonialSection, ContactSection };
