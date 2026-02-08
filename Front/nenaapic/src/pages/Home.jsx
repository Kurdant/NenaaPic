import React, { useEffect } from 'react';
import HeroBannerV2 from '../components/HeroBannerV2';
import PhotosDesordre from '../components/PhotosDesordre';
import { 
  AboutSection, 
  ServicesSection, 
  PortfolioSection, 
  MissionSection, 
  TestimonialSection, 
  ContactSection 
} from '../components/HomeSections';

const HomePage = () => {
  useEffect(() => {
    // Animation au scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observer toutes les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-off-white overflow-x-hidden">
      {/* 1. Hero Banner avec effet blur */}
      <HeroBannerV2 />

      {/* 2. Section à propos */}
      <AboutSection />

      {/* 3. Section Photos en Désordre + Image Déco 1 */}
      <PhotosDesordre />
      

      {/* 4. Section Services + Image Déco 2 */}
      <ServicesSection />

      {/* 5. Section Portfolio/Galerie + Image Déco 3 */}
      <PortfolioSection />

      {/* 6. Section Mission Statement + Image Déco 4 */}
      <MissionSection />

      {/* 7. Section Témoignage + Image Déco 5 */}
      <TestimonialSection />

      {/* 8. Section Contact/CTA Final */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
