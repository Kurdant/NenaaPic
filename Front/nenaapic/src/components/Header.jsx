import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const menuItems = [
    { label: 'HOME', href: '/' },
    { label: 'PORTFOLIO', href: '/portfolio' },
    { label: 'SERVICES', href: '/services' },
    { label: 'SPORT', href: '/sport' },
    { label: 'À PROPOS', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <style>{`
        @keyframes menuSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes menuSlideOut {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes menuItemFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .nav-panel {
          animation: menuSlideIn 0.5s ease-out forwards;
        }
        .nav-overlay {
          animation: overlayFadeIn 0.4s ease-out forwards;
        }
        .nav-menu-item {
          opacity: 0;
          animation: menuItemFadeIn 0.5s ease-out forwards;
        }
        .nav-menu-item:nth-child(1) { animation-delay: 0.15s; }
        .nav-menu-item:nth-child(2) { animation-delay: 0.20s; }
        .nav-menu-item:nth-child(3) { animation-delay: 0.25s; }
        .nav-menu-item:nth-child(4) { animation-delay: 0.30s; }
        .nav-menu-item:nth-child(5) { animation-delay: 0.35s; }
        .nav-menu-item:nth-child(6) { animation-delay: 0.40s; }
      `}</style>

      <Link
        to="/"
        className="fixed top-6 left-6 md:top-8 md:left-10 z-[51] hover:opacity-80 transition-opacity duration-300"
        style={{ textDecoration: 'none' }}
      >
        <img
          src="/images/logov2.png"
          alt="NenaaPic"
          className="h-10 md:h-12 w-auto object-contain"
        />
      </Link>

      {/* Floating Burger — top-right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 md:top-8 md:right-10 z-[51] p-1 group"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          /* X close icon */
          <svg width="30" height="30" viewBox="0 0 30 30">
            <line x1="6" y1="6" x2="24" y2="24" stroke="white" strokeWidth="1.5" className="group-hover:stroke-[#F4D35E] transition-colors" />
            <line x1="24" y1="6" x2="6" y2="24" stroke="white" strokeWidth="1.5" className="group-hover:stroke-[#F4D35E] transition-colors" />
          </svg>
        ) : (
          /* 2-line burger */
          <svg width="30" height="20" viewBox="0 0 30 20">
            <line x1="0" y1="4" x2="30" y2="4" stroke="white" strokeWidth="1.5" className="group-hover:stroke-[#F4D35E] transition-colors" />
            <line x1="0" y1="16" x2="30" y2="16" stroke="white" strokeWidth="1.5" className="group-hover:stroke-[#F4D35E] transition-colors" />
          </svg>
        )}
      </button>

      {/* Overlay — semi-transparent left side (desktop), full on mobile */}
      {isOpen && (
        <div
          className="nav-overlay fixed inset-0 z-40"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel — slides from right */}
      {isOpen && (
        <nav
          className="nav-panel fixed top-0 right-0 bottom-0 z-50 bg-black flex flex-col items-end justify-center w-full md:w-1/2"
        >
          <div className="pr-8 md:pr-16 flex flex-col items-end gap-6 md:gap-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`nav-menu-item font-heading font-bold uppercase tracking-wide transition-colors duration-300 text-2xl md:text-[3.5rem] leading-tight ${
                  isActive(item.href)
                    ? 'text-primary-yellow'
                    : 'text-white hover:text-[#F4D35E]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
