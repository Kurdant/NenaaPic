import React from 'react';

/**
 * Section Wrapper Component
 * Provides consistent spacing, animation, and layout for all page sections
 * 
 * Props:
 *  - children: React elements to render
 *  - className: Additional Tailwind classes
 *  - id: Section identifier for anchors
 *  - variant: 'light', 'dark', 'accent' - controls background color
 *  - animate: boolean - enable scroll animations (default true)
 *  - verticalPadding: 'sm', 'md', 'lg' - controls padding (default 'md')
 */
const Section = ({
  children,
  className = '',
  id = '',
  variant = 'light',
  animate = true,
  verticalPadding = 'md'
}) => {
  const variantClasses = {
    light: 'bg-white',
    dark: 'bg-neutral-black',
    accent: 'bg-neutral-cream',
  };

  const paddingClasses = {
    sm: 'py-12 md:py-16',
    md: 'py-20 md:py-32',
    lg: 'py-32 md:py-48',
  };

  return (
    <section
      id={id}
      className={`
        ${variantClasses[variant] || variantClasses.light}
        ${paddingClasses[verticalPadding] || paddingClasses.md}
        px-4 md:px-8 lg:px-16
        ${animate ? 'animate-fade-in' : ''}
        ${className}
      `}
    >
      <div className="max-w-container mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Section;
