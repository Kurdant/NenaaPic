import React, { useState, useEffect } from 'react';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const PROJECT_TYPES = ['Mariage', 'Portrait', 'Sport', 'Couple', 'Entreprise', 'Autre'];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectProject = (type) => {
    setFormData(prev => ({ ...prev, projectType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 4000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors duration-300 py-4 font-body text-sm tracking-wide";

  return (
    <div className="min-h-screen bg-black">

      {/* ── HERO SPLIT ── */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT — headline + project selector */}
        <div
          className={`flex flex-col justify-end p-10 md:p-16 pb-16 md:pb-20 transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1
            className="font-heading text-white uppercase leading-[0.92] mb-10"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            CRÉONS<br />
            QUELQUE CHOSE{' '}
            <span className="italic">D'UNIQUE.</span>
          </h1>

          <p className="font-body text-white/50 uppercase tracking-[0.2em] text-xs mb-5">
            CHOISISSEZ VOTRE PROJET :
          </p>
          <div className="flex flex-wrap gap-3">
            {PROJECT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => selectProject(type)}
                className={`font-body text-sm px-5 py-2 border transition-all duration-200 tracking-wide ${
                  formData.projectType === type
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/30 hover:border-white/70'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — large italic phrase */}
        <div
          className={`hidden lg:flex items-center justify-center p-16 border-l border-white/10 transition-all duration-1000 delay-200 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p
            className="font-heading italic text-white/80 text-center leading-snug"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)' }}
          >
            CHOISISSEZ VOTRE TYPE DE PROJET,<br />
            REMPLISSEZ LE FORMULAIRE<br />
            ET C'EST PARTI.
          </p>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section
        className="relative py-24 px-8 md:px-16 border-t border-white/10"
        style={{
          backgroundImage: 'url(/images/image_deco_2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.88)' }} />

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Form */}
          <div>
            <h2
              className="font-heading uppercase text-white mb-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              CONTACTEZ-MOI
            </h2>
            <p className="font-body text-white/50 text-sm tracking-wide mb-12">
              Parlons de votre projet
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Votre nom"
                />
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

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Téléphone (optionnel)"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className={`${inputClasses} resize-none`}
                placeholder="Parlez-moi de votre projet..."
              />

              {submitStatus === 'success' && (
                <p className="text-white/60 text-sm text-center">
                  Merci, votre message a été envoyé avec succès.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400/70 text-sm text-center">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-white text-black font-body text-xs uppercase tracking-[0.25em] px-10 py-4 hover:bg-white/80 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'ENVOI EN COURS...' : 'ENVOYER'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-8">
              <div>
                <p className="font-body text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Localisation</p>
                <p className="font-body text-white text-base">Nice, Côte d'Azur</p>
              </div>
              <div>
                <p className="font-body text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Email</p>
                <a
                  href="mailto:elensapic@gmail.com"
                  className="font-body text-white text-base hover:text-white/60 transition-colors duration-300"
                >
                  elensapic@gmail.com
                </a>
              </div>
              <div>
                <p className="font-body text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Instagram</p>
                <a
                  href="https://www.instagram.com/nenaa_pic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-white text-base hover:text-white/60 transition-colors duration-300"
                >
                  <InstagramIcon />
                  @nenaa_pic
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM BAR ── */}
      <div className="bg-black border-t border-white/10 px-8 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <a
          href="https://www.instagram.com/nenaa_pic/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-body text-xs uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors duration-300"
        >
          <InstagramIcon />
          NOTRE INSTAGRAM ↗
        </a>
        <a
          href="mailto:elensapic@gmail.com"
          className="font-body text-xs text-white/30 hover:text-white/60 transition-colors duration-300 tracking-wide"
        >
          elensapic@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Contact;
