import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

/**
 * Services Grid Component
 * 4-column grid showing main service offerings
 */

const AnimatedServiceCard = ({ service, index }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group text-center p-8 rounded-lg bg-neutral-cream hover:bg-primary-yellow/10 transition-all duration-700 hover:shadow-lg ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>
      <h3 className="font-heading text-h4 text-primary-blue mb-3">
        {service.title}
      </h3>
      <p className="text-neutral-gray text-sm leading-relaxed">
        {service.description}
      </p>
      <div className="w-12 h-1 bg-primary-yellow mx-auto mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

const ServicesGrid = () => {
  const [titleRef, titleVisible] = useScrollAnimation();

  const services = [
    {
      id: 1,
      icon: '📷',
      title: 'Photography',
      description: 'Professional photography for all occasions, from portraits to events'
    },
    {
      id: 2,
      icon: '🎨',
      title: 'Design',
      description: 'Creative design solutions including branding, UI/UX, and marketing materials'
    },
    {
      id: 3,
      icon: '🎬',
      title: 'Video',
      description: 'Cinematic video production, reels, tutorials, and documentaries'
    },
    {
      id: 4,
      icon: '✨',
      title: 'Retouching',
      description: 'Professional photo retouching and editing to enhance your images'
    },
  ];

  return (
    <div className="space-y-12">
      <div
        ref={titleRef}
        className={`text-center mb-16 transition-all duration-700 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="font-heading text-h2 text-primary-blue mb-4">
          My Services
        </h2>
        <p className="text-neutral-gray text-lg max-w-2xl mx-auto">
          Comprehensive creative solutions tailored to your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <AnimatedServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
