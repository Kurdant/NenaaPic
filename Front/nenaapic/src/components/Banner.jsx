// Banner Components
// Full-width banners for various sections

import { ButtonPrimary } from './Button';

export const HeroBanner = ({ image1, image2, buttonText, onButtonClick }) => {
  return (
    <section className="relative h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="h-screen relative">
          <img
            src={image1}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-2xl px-4">
            <div className="relative">
              <img
                src={image2}
                alt="Hero secondary"
                className="w-full h-80 object-cover rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ButtonPrimary onClick={onButtonClick}>
                  {buttonText}
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <img
          src={image1}
          alt="Hero"
          className="w-full h-1/2 object-cover"
        />
        <div className="relative h-1/2">
          <img
            src={image2}
            alt="Hero secondary"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <ButtonPrimary onClick={onButtonClick}>
              {buttonText}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TitleSection = ({ mainTitle, subtitle, services }) => {
  return (
    <section className="py-16 px-4 text-center">
      <h1 className="font-heading text-h1 text-neutral-dark mb-4">
        {mainTitle}
      </h1>
      <p className="text-neutral-light text-lg">
        {services.join(' | ')}
      </p>
    </section>
  );
};

export const SloganBanner = ({ slogan, className = "" }) => {
  return (
    <section className={`py-16 px-4 bg-gradient-to-r from-primary-blue to-primary-yellow ${className}`}>
      <div className="max-w-container mx-auto">
        <h2 className="font-heading text-h2 text-white text-left md:text-left">
          {slogan}
        </h2>
      </div>
    </section>
  );
};

export const ContactBanner = ({ email, phone, instagram }) => {
  return (
    <section className="py-12 px-4 bg-primary-blue">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-neutral-dark">
          <a href={`mailto:${email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📧</span>
            <span className="font-medium">{email}</span>
          </a>
          <a href={`tel:${phone}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📱</span>
            <span className="font-medium">{phone}</span>
          </a>
          <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📷</span>
            <span className="font-medium">@{instagram}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export const BioBanner = ({ title, description, buttonText, onButtonClick }) => {
  return (
    <section className="py-16 px-4 bg-primary-yellow">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-h2 text-neutral-dark mb-6">{title}</h2>
        <p className="text-neutral-light text-lg leading-relaxed mb-8">{description}</p>
        <ButtonPrimary onClick={onButtonClick}>
          {buttonText}
        </ButtonPrimary>
      </div>
    </section>
  );
};

export const HeaderBanner = ({ title, description, gradient = "from-primary-blue to-accent-blue" }) => {
  return (
    <section className={`py-16 px-4 bg-gradient-to-r ${gradient}`}>
      <div className="max-w-container mx-auto text-center">
        <h1 className="font-heading text-h1 text-white mb-4">{title}</h1>
        <p className="text-white text-lg opacity-90">{description}</p>
      </div>
    </section>
  );
};
