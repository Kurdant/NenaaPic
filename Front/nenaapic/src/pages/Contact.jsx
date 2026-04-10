import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [formRef, formVisible] = useScrollAnimation();
  const [infoRef, infoVisible] = useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-transparent border-b border-black/20 text-[#0F1419] placeholder-black/40 focus:outline-none focus:border-[#0F1419] transition-colors duration-300 py-3 font-body";

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
            CONTACTEZ-MOI
          </h1>
          <p className="font-body text-white/75 text-lg tracking-wide">
            Parlons de votre projet
          </p>
        </div>
      </section>

      {/* Form + Info Section */}
      <section className="bg-[#FBF7EF] py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div
            ref={formRef}
            className={`transition-all duration-700 ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2
              className="font-heading font-bold uppercase text-[#0F1419] mb-2"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              PARLONS ENSEMBLE
            </h2>
            <p className="font-body text-[#2C3E50] mb-10">
              Envoyez-moi un message et je vous répondrai dans les meilleurs délais.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="Votre email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={`${inputClasses} cursor-pointer`}
                  >
                    <option value="">Type de projet</option>
                    <option value="mariage">Mariage</option>
                    <option value="portrait">Portrait</option>
                    <option value="couple">Couple</option>
                    <option value="entreprise">Entreprise</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`${inputClasses} cursor-pointer`}
                  >
                    <option value="">Budget estimé</option>
                    <option value="< 500€">&lt; 500€</option>
                    <option value="500-1000€">500 - 1 000€</option>
                    <option value="1000-2000€">1 000 - 2 000€</option>
                    <option value="> 2000€">&gt; 2 000€</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Téléphone (optionnel)"
                />
              </div>

              <div className="mb-10">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className={`${inputClasses} resize-none`}
                  placeholder="Parlez-moi de votre projet..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 py-3 text-center font-body text-sm text-[#0F1419]/70">
                  Merci, votre message a été envoyé avec succès.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-6 py-3 text-center font-body text-sm text-red-600/70">
                  Une erreur est survenue. Veuillez réessayer.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0F1419] text-white font-body text-sm uppercase tracking-[0.2em] py-4 hover:opacity-80 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'ENVOI EN COURS...' : 'ENVOYER'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div
            ref={infoRef}
            className={`transition-all duration-700 ${
              infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="space-y-10">
              <div>
                <h3
                  className="font-heading font-bold uppercase text-[#0F1419] mb-8"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                >
                  INFORMATIONS
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="font-body text-[#0F1419] font-medium mb-1">Localisation</p>
                    <p className="font-body text-[#2C3E50]">Nice, Côte d'Azur</p>
                  </div>
                  <div>
                    <p className="font-body text-[#0F1419] font-medium mb-1">Email</p>
                    <a
                      href="mailto:contact@nenaapic.com"
                      className="font-body text-[#2C3E50] hover:text-[#0F1419] transition-colors duration-300"
                    >
                      contact@nenaapic.com
                    </a>
                  </div>
                  <div>
                    <p className="font-body text-[#0F1419] font-medium mb-1">Téléphone</p>
                    <a
                      href="tel:+33600000000"
                      className="font-body text-[#2C3E50] hover:text-[#0F1419] transition-colors duration-300"
                    >
                      +33 6 00 00 00 00
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="font-body text-[#0F1419] font-medium mb-4">Réseaux sociaux</p>
                <div className="flex gap-6">
                  <a
                    href="https://instagram.com/nenaapic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-[#2C3E50] uppercase tracking-[0.15em] hover:text-[#0F1419] transition-colors duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com/nenaapic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-[#2C3E50] uppercase tracking-[0.15em] hover:text-[#0F1419] transition-colors duration-300"
                  >
                    Facebook
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src="/images/image_deco_5.jpg"
                  alt="Contact NenaaPic"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
