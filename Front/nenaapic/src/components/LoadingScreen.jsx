import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Block scroll while loading
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }, 600);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-[600ms] ${
        fadeOut ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
      }`}
      style={{ backgroundColor: '#F5E6C8' }}
    >
      <h1
        className="font-heading font-bold uppercase tracking-[0.3em] text-3xl md:text-4xl"
        style={{ color: '#0F1419' }}
      >
        NENAA PICTURE
      </h1>
    </div>
  );
};

export default LoadingScreen;
