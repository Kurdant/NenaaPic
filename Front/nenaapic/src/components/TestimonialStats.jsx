import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

/**
 * Testimonials and Stats Section
 * Shows client testimonial with impressive statistics
 */

const AnimatedStat = ({ stat, index }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`text-center p-8 rounded-lg bg-white border border-primary-yellow/20 hover:border-primary-yellow/40 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="font-heading text-4xl md:text-5xl text-primary-blue mb-3">
        {stat.number}
      </div>
      <p className="text-neutral-gray font-medium">
        {stat.label}
      </p>
    </div>
  );
};

const TestimonialStats = () => {
  const [quoteRef, quoteVisible] = useScrollAnimation();

  const stats = [
    { number: '120+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '95%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="space-y-16">
      <div
        ref={quoteRef}
        className={`bg-neutral-cream rounded-lg p-12 md:p-16 text-center transition-all duration-700 ${
          quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex justify-center mb-6">
          <span className="text-3xl">⭐⭐⭐⭐⭐</span>
        </div>

        <blockquote className="font-heading text-h3 text-primary-blue mb-6 max-w-3xl mx-auto">
          "Best designer I've worked with! Highly professional, creative, and truly understands the vision."
        </blockquote>

        <p className="text-neutral-gray font-medium">
          Sarah Johnson — Creative Director, Design Studio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {stats.map((stat, index) => (
          <AnimatedStat key={index} stat={stat} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialStats;
