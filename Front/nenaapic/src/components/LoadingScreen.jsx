import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const textTimer = setTimeout(() => setTextVisible(true), 300);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }, 700);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-700 ${
        fadeOut ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: 'url(/images/backgroundNenaaChargement.PNG)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Subtle dark overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }} />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center gap-6 transition-all duration-700 ${
          textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <img
          src="/images/logov2.png"
          alt="NenaaPic"
          className="w-20 md:w-24 object-contain"
        />
        <h1
          className="font-heading uppercase tracking-[0.4em] text-white text-xl md:text-2xl"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        >
          NENAAPIC PHOTOGRAPHY
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
