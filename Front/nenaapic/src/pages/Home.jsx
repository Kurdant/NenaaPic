import React, { useState, useCallback } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import HeroBannerV2 from '../components/HeroBannerV2';
import HeroBanner from '../components/HeroBanner';
import AboutTextSection from '../components/AboutTextSection';
import PortfolioAlbums from '../components/PortfolioAlbums';
import NavSlider from '../components/NavSlider';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={loading ? 'overflow-hidden h-screen' : ''}>
        <HeroBannerV2 />
        <HeroBanner />
        <AboutTextSection />
        <PortfolioAlbums />
        <NavSlider />
      </div>
    </>
  );
};

export default HomePage;
