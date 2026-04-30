import React, { useState, useCallback } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import HeroBannerV2 from '../components/HeroBannerV2';
import AboutTextSection from '../components/AboutTextSection';
import PortfolioSlider from '../components/PortfolioSlider';
import NavSlider from '../components/NavSlider';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={loading ? 'overflow-hidden h-screen' : ''}>
        <HeroBannerV2 />
        <AboutTextSection />
        <PortfolioSlider />
        <NavSlider />
      </div>
    </>
  );
};

export default HomePage;
