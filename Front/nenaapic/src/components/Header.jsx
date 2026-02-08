import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { label: 'À Propos', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' }
  ];

  const headerBackground = isMobile
    ? 'linear-gradient(135deg, rgb(255 228 186 / 48%) 0%, rgb(179 205 255 / 59%) 100%)'
    : 'linear-gradient(135deg, rgb(255, 245, 230) 0%, rgb(255, 232, 240) 25%, rgb(240, 232, 255) 50%, rgb(179 205 255) 75%, rgb(232, 255, 232) 100%)';

  return (
    <>
      {/* Styles pour animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mobile-menu {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .menu-item {
          opacity: 0;
          animation: slideInFromLeft 0.6s ease-out forwards;
        }

        .menu-item:nth-child(1) { animation-delay: 0.2s; }
        .menu-item:nth-child(3) { animation-delay: 0.3s; }
        .menu-item:nth-child(5) { animation-delay: 0.4s; }
        .menu-item:nth-child(7) { animation-delay: 0.5s; }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: '4rem',
          background: headerBackground,
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="h-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo/Home - Left */}
          <a
            href="/"
            className="text-gray-900 text-lg md:text-xl font-bold tracking-widest hover:text-yellow-600 transition-colors duration-300"
            style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
          >
            HOME
          </a>

          {/* Menu Desktop - Right */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-900 text-sm md:text-base font-light tracking-wide hover:text-yellow-600 transition-colors duration-300"
                style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Menu Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-900"
            style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu - Fullscreen avec animation */}
      {isOpen && (
        <nav
          className="mobile-menu fixed inset-0 top-16 flex flex-col z-40 md:hidden overflow-y-auto"
          style={{
            background: 'linear-gradient(135deg, rgb(255 245 230 / 50%) 0%, rgb(255 232 240 / 50%) 25%, rgb(240 232 255 / 50%) 50%, rgb(179 205 255 / 50%) 75%, rgb(232 255 232 / 49%) 100%)',
            backdropFilter: 'blur(15px)',
          }}
        >
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              <a
                href={item.href}
                className="menu-item text-gray-900 text-lg font-medium tracking-wide hover:text-yellow-600 transition-colors duration-300 px-6 py-6"
                onClick={() => setIsOpen(false)}
                style={{ fontWeight: 500, textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
              >
                {item.label}
              </a>
              {index < menuItems.length - 1 && (
                <div className="h-px bg-white/40 mx-6"></div>
              )}
            </div>
          ))}
        </nav>
      )}
    </>
  );
};

export default Header;
