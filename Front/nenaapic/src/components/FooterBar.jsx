import React from 'react';
import { Link } from 'react-router-dom';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const FooterBar = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
      style={{
        background: 'rgb(255 255 255 / 8%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      {/* Gauche : copyright + made by */}
      <div className="flex flex-col gap-0.5">
        <p className="text-white/40 text-xs tracking-wide">
          © {currentYear} NenaaPic
        </p>
        <span className="text-white/30 text-[10px]">
          made by{' '}
          <a
            href="https://kurdant.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white/40 hover:text-white/70 transition-colors duration-300"
          >
            Kurdant
          </a>
        </span>
      </div>

      {/* Centre : Instagram */}
      <a
        href="https://www.instagram.com/nenaa_pic/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-white transition-colors duration-300"
        aria-label="Instagram"
      >
        <InstagramIcon />
      </a>

      {/* Droite : email + RGPD */}
      <div className="flex flex-col items-end gap-0.5">
        <a
          href="mailto:nenaapic@gmail.com"
          className="text-white/40 text-xs tracking-widest uppercase hover:text-white/70 transition-colors duration-300"
        >
          nenaapic@gmail.com
        </a>
        <Link
          to="/rgpd"
          className="text-white/30 text-[10px] hover:text-white/50 transition-colors duration-300"
        >
          Politique de confidentialité
        </Link>
      </div>
    </div>
  );
};

export default FooterBar;

