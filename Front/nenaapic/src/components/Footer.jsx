import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t-2"
      style={{
        background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE8F0 25%, #F0E8FF 50%, #E8F0FF 75%, #E8FFE8 100%)',
        borderColor: 'rgb(0 0 0 / 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
          {/* Colonne gauche - Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-800 text-sm font-light tracking-wide" style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}>
              © {currentYear} NenaaPic. Tous droits réservés.
            </p>
          </div>

          {/* Colonne centre - Logo/Brand */}
          <div className="text-center">
            <p className="text-gray-800 text-sm font-light tracking-wide" style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}>
              NENAAPIC
            </p>
          </div>

          {/* Colonne droite - Made by */}
          <div className="text-center md:text-right">
            <p className="text-gray-800 text-sm font-light tracking-wide" style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}>
              Made by{' '}
              <a
                href="https://kurdant.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 font-medium hover:text-yellow-600 transition-colors duration-300 underline"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                KurdantDev
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
