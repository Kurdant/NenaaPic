import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Call-to-Action Section
 * Dark background with compelling message and buttons
 */
const CTASection = ({
  title = "Ready to Bring Your Vision to Life?",
  description = "Let's create something amazing together. Get in touch today to discuss your project.",
  primaryButtonText = "Start Your Project",
  secondaryButtonText = "Learn More",
}) => {
  return (
    <div className="bg-neutral-black text-white rounded-lg p-12 md:p-20 text-center space-y-8">
      {/* Title */}
      <h2 className="font-heading text-h2 md:text-h1 leading-tight">
        {title}
      </h2>

      {/* Description */}
      <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
        <Link
          to="/contact"
          className="px-8 py-4 bg-primary-yellow text-neutral-black font-semibold rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 inline-block"
        >
          {primaryButtonText}
        </Link>

        <Link
          to="/portfolio"
          className="px-8 py-4 border-2 border-primary-yellow text-primary-yellow font-semibold rounded-md hover:bg-primary-yellow/10 transition-all duration-300 inline-block"
        >
          {secondaryButtonText}
        </Link>
      </div>
    </div>
  );
};

export default CTASection;
