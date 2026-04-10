import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const CirclePlusIcon = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="12" r="11" />
    <line x1="12" y1="7" x2="12" y2="17" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const ServiceSection = ({ service, index, reversed }) => {
  const [ref, isVisible] = useScrollAnimation();
  const isDark = !reversed;
  const bgColor = isDark ? 'bg-black' : 'bg-[#FBF7EF]';
  const textColor = isDark ? 'text-white' : 'text-[#0F1419]';
  const descColor = isDark ? 'text-white/70' : 'text-[#2C3E50]';

  return (
    <section className={`${bgColor} py-20 px-4 md:px-8`}>
      <div
        ref={ref}
        className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className={`overflow-hidden ${reversed ? 'lg:order-2' : ''}`}>
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-[500px] md:h-[600px] object-cover"
          />
        </div>

        <div className={`flex flex-col justify-center py-12 lg:py-0 ${reversed ? 'lg:order-1 lg:pr-16' : 'lg:pl-16'}`}>
          <h3
            className={`font-heading font-bold uppercase ${textColor} mb-4`}
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {service.name}
          </h3>
          <p className={`font-body ${descColor} text-lg leading-relaxed mb-6`}>
            {service.description}
          </p>
          <p className={`font-body ${descColor} leading-relaxed mb-8`}>
            {service.details}
          </p>
          <ul className="space-y-3">
            {service.includes.map((item, i) => (
              <li key={i} className={`font-body ${descColor} text-sm flex items-center gap-3`}>
                <span className={isDark ? 'text-white/40' : 'text-[#0F1419]/40'}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="font-heading text-lg text-white uppercase tracking-wide">{question}</span>
        <span
          className={`text-white text-xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
        <p className="font-body text-white/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [faqRef, faqVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      name: 'MARIAGES',
      description: 'Immortaliser le plus beau jour de votre vie',
      details: 'Reportage complet de votre journée, de la préparation à la soirée. Chaque instant est capturé avec soin pour que vous puissiez revivre ces émotions.',
      image: '/images/mariage-1.jpg',
      includes: ['Préparatifs', 'Cérémonie', 'Photos de couple', 'Réception', 'Galerie en ligne'],
    },
    {
      name: 'PORTRAITS',
      description: 'Révéler votre personnalité unique',
      details: 'Séance photo personnalisée pour mettre en valeur votre singularité. En studio ou en extérieur, nous créons ensemble des images qui vous ressemblent.',
      image: '/images/portfolio-2.jpg',
      includes: ['Consultation créative', 'Séance 1h', 'Retouches professionnelles', '15 photos HD'],
    },
    {
      name: 'ENTREPRISE',
      description: 'Valoriser votre image professionnelle',
      details: 'Photos corporate, événements professionnels, portraits d\'équipe. Une image soignée pour renforcer votre identité de marque.',
      image: '/images/image_deco_1.jpg',
      includes: ['Portraits équipe', 'Événements', 'Photos locaux', 'Licence commerciale'],
    },
    {
      name: 'COUPLES',
      description: 'Capturer votre histoire d\'amour',
      details: 'Séances photo de couple romantiques et naturelles. Des moments de complicité immortalisés dans des décors qui vous inspirent.',
      image: '/images/portfolio-3.jpg',
      includes: ['Séance 1h30', 'Lieu au choix', 'Retouches', '20 photos HD'],
    }
  ];

  const faqs = [
    { question: 'Comment se déroule une séance photo ?', answer: 'Nous commençons par un échange pour définir vos attentes, puis nous choisissons ensemble le lieu et le style. Le jour J, je vous guide naturellement pour des photos authentiques.' },
    { question: 'Quel est le délai de livraison ?', answer: 'Les photos sont livrées sous 2 à 4 semaines selon la prestation. Vous recevez une galerie en ligne privée avec toutes vos images retouchées.' },
    { question: 'Proposez-vous des albums photo ?', answer: 'Oui, je propose des albums photo premium personnalisés en option. Les tirages sont réalisés par un laboratoire professionnel.' },
    { question: 'Comment réserver une séance ?', answer: 'Contactez-moi via le formulaire ou par email. Nous échangerons sur votre projet et je vous enverrai un devis personnalisé.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen bg-black flex items-center justify-center">
        <div
          className={`text-center transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1
            className="font-heading font-bold uppercase text-white tracking-wide mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            SERVICES
          </h1>
          <p className="font-body text-white/75 text-lg tracking-wide">
            Des prestations sur mesure
          </p>
        </div>
      </section>

      {/* Services — alternating sections */}
      {services.map((service, index) => (
        <ServiceSection
          key={index}
          service={service}
          index={index}
          reversed={index % 2 !== 0}
        />
      ))}

      {/* FAQ Section */}
      <section className="bg-black py-20 px-4 md:px-8">
        <div
          ref={faqRef}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2
            className="font-heading font-bold uppercase text-white text-center mb-12"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            QUESTIONS FRÉQUENTES
          </h2>
          <div>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FBF7EF] py-20 px-4 md:px-8">
        <div
          ref={ctaRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2
            className="font-heading font-bold uppercase text-[#0F1419] mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            PRÊT À IMMORTALISER VOS MOMENTS ?
          </h2>
          <p className="font-body text-[#2C3E50] text-lg mb-10 max-w-2xl mx-auto">
            Contactez-moi pour discuter de votre projet et créer ensemble des souvenirs inoubliables
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 text-[#0F1419] font-body text-sm uppercase tracking-[0.2em] hover:opacity-70 transition-opacity duration-300"
          >
            CONTACTEZ-MOI
            <CirclePlusIcon />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
