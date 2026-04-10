import React from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

/**
 * Featured Works Grid Component
 * 3-column responsive grid showing project showcase
 * Includes hover effects and scroll animations
 */

const AnimatedCard = ({ project, index, onClick }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={() => onClick(project)}
    >
      <div className="relative overflow-hidden rounded-lg bg-neutral-cream">
        <div className="relative h-64 md:h-72 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/40 transition-colors duration-300" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-neutral-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-heading text-xl text-white mb-2">
            {project.title}
          </h3>
          <p className="text-primary-yellow text-sm font-medium">
            {project.category}
          </p>
        </div>

        <div className="p-6 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="font-heading text-xl text-primary-blue mb-2">
            {project.title}
          </h3>
          <p className="text-neutral-gray text-sm">
            {project.category}
          </p>
        </div>
      </div>
    </div>
  );
};

const FeaturedWorksGrid = ({ projects = [], onProjectClick = () => {} }) => {
  const [titleRef, titleVisible] = useScrollAnimation();

  const defaultProjects = [
    {
      id: 1,
      title: 'Wedding Ceremony',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
    },
    {
      id: 2,
      title: 'Brand Campaign',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop',
    },
    {
      id: 3,
      title: 'Events Showcase',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=600&h=600&fit=crop',
    },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <div className="space-y-12">
      <div
        ref={titleRef}
        className={`text-center mb-16 transition-all duration-700 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="font-heading text-h2 text-primary-blue mb-4">
          Featured Works
        </h2>
        <p className="text-neutral-gray text-lg max-w-2xl mx-auto">
          A selection of recent projects showcasing our expertise in photography and design
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
        {displayProjects.map((project, index) => (
          <AnimatedCard
            key={project.id}
            project={project}
            index={index}
            onClick={onProjectClick}
          />
        ))}
      </div>

      <div className="text-center pt-8">
        <Link
          to="/portfolio"
          className="inline-block px-8 py-3 bg-primary-yellow text-neutral-black font-medium rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          View All Projects
        </Link>
      </div>
    </div>
  );
};

export default FeaturedWorksGrid;
