import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroBannerV2 = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="snap-section relative h-dvh w-full overflow-hidden">
      <style>{`
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }
        .scroll-drop {
          animation: scrollDrop 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Full-bleed background — objectPosition keeps building visible */}
      <img
        src="/images/banner.jpg"
        alt="NenaaPic Photography — Nice"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '65% center' }}
      />

      {/* Gradient: bottom dark for text + very subtle top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(10,12,16,0.72) 0%, rgba(10,12,16,0.15) 45%, transparent 100%)',
        }}
      />

      {/* Yellow accent strip — grows left to right on load */}
      <div
        className="absolute bottom-0 left-0 h-[3px]"
        style={{
          backgroundColor: '#F4D35E',
          width: loaded ? '100%' : '0%',
          transition: 'width 1.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: '0.9s',
        }}
      />

      {/* Bottom editorial layout */}
      <div className="absolute inset-x-0 bottom-0 px-8 md:px-16 pb-20 md:pb-20 z-10">
        <div className="flex items-end justify-between gap-8">

          {/* LEFT — main text block */}
          <div className="flex flex-col gap-2 md:gap-3">
            <span
              className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.4em] font-body"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: '0.1s',
              }}
            >
              Photographe — Nice, France
            </span>

            <h1
              className="font-heading font-bold text-white uppercase leading-[0.88]"
              style={{
                fontSize: 'clamp(3.8rem, 9.5vw, 8.5rem)',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(22px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                transitionDelay: '0.25s',
              }}
            >
              NENAAPIC
            </h1>

            <p
              className="text-white/65 text-sm md:text-base font-body font-light tracking-wide"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                transitionDelay: '0.45s',
              }}
            >
              Capturer la beauté de la vie
            </p>
          </div>

          {/* RIGHT — CTA + scroll indicator (desktop only) */}
          <div
            className="hidden md:flex flex-col items-end gap-10 flex-shrink-0"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.65s',
            }}
          >
            <Link
              to="/portfolio"
              className="text-white/65 text-[11px] uppercase tracking-[0.3em] hover:text-white transition-colors duration-300 border-b border-white/20 pb-1 hover:border-white/50 font-body"
            >
              Explorer mon travail
            </Link>

            {/* Animated scroll indicator */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/30 text-[9px] uppercase tracking-[0.35em] font-body">Scroll</span>
              <div className="relative w-px h-14 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <div
                  className="scroll-drop absolute top-0 left-0 w-full"
                  style={{ height: '45%', backgroundColor: 'rgba(244,211,94,0.7)' }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroBannerV2;
