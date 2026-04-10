import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-black border-t border-white/10">
      <div className="max-w-container mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="text-center md:text-left">
            <p className="text-white/50 text-sm">
              © {currentYear} NenaaPic. Tous droits réservés.
            </p>
          </div>

          <div className="text-center">
            <p className="font-heading text-white tracking-widest text-sm">
              NENAAPIC
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/50 text-sm">
              Made by{' '}
              <a
                href="https://kurdant.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-yellow hover:text-white transition-colors duration-300"
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
