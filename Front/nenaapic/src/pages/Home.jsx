import React, { useState, useCallback } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import HeroBannerV2 from '../components/HeroBannerV2';
import AboutTextSection from '../components/AboutTextSection';
import PortfolioSlider from '../components/PortfolioSlider';
import GetInTouchSection from '../components/GetInTouchSection';
import Footer from '../components/Footer';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={`homepage-snap ${loading ? 'overflow-hidden h-screen' : ''}`}>
        <HeroBannerV2 />
        <AboutTextSection />
        <PortfolioSlider />
        <div className="snap-section min-h-screen flex flex-col">
          <GetInTouchSection />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
