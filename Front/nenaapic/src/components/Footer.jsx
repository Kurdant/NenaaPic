import React from 'react';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-black">
      <div className="max-w-container mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="text-center md:text-left">
            <p className="text-white/50 text-sm">
              © {currentYear} NenaaPic. Tous droits réservés.
            </p>
          </div>

          <div className="text-center flex flex-col items-center gap-3">
            <img
              src="/images/logov2.png"
              alt="NenaaPic"
              className="h-8 w-auto object-contain opacity-80"
            />
            <a
              href="https://www.instagram.com/nenaa_pic/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
              aria-label="Instagram NenaaPic"
            >
              <InstagramIcon />
            </a>
            <a
              href="mailto:nenaapic@gmail.com"
              className="text-white/40 text-xs hover:text-white/70 transition-colors duration-300 tracking-wide"
            >
              nenaapic@gmail.com
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/40 text-xs tracking-wide">
              Site fait par{' '}
              <a
                href="https://kurdant.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-300"
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
