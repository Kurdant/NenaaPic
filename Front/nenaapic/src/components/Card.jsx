// Card Components
// Reusable card structures

import { ButtonPrimary } from './Button';

export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white p-6 rounded-lg shadow-sm
        transition-shadow duration-300
        hover:shadow-md
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const ServiceCard = ({ title, description, bullets, price, image, onContact }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-101 overflow-hidden">
      <div className="grid md:grid-cols-[60%_40%] gap-0">
        {/* Content Section */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-h3 text-neutral-dark mb-4">{title}</h3>
            <p className="text-neutral-light mb-6">{description}</p>
            
            <ul className="space-y-2 mb-6">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-blue mr-2">✓</span>
                  <span className="text-neutral-light">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-primary-yellow text-3xl font-bold mb-4">{price}</p>
            <ButtonPrimary onClick={onContact} className="w-full">
              Me Contacter
            </ButtonPrimary>
          </div>
        </div>

        {/* Image Section */}
        <div className="h-full min-h-[300px] md:min-h-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export const ValueCard = ({ icon, title, description }) => {
  return (
    <Card className="text-center p-8">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="font-heading text-h4 text-neutral-dark mb-3">{title}</h4>
      <p className="text-neutral-light text-sm">{description}</p>
    </Card>
  );
};

export const CarouselCard = ({ title, subtitle, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative h-80 rounded-lg overflow-hidden cursor-pointer group"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-neutral-dark bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-heading text-2xl mb-1">{title}</h3>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>
    </div>
  );
};
