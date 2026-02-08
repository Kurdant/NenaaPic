import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simuler un envoi de formulaire
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const textShadowStyle = 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px';

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE8F0 25%, #F0E8FF 50%, #E8F0FF 75%, #E8FFE8 100%)',
      }}
    >
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Titre */}
          <h1
            className="text-6xl md:text-7xl font-bold text-gray-900 text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              marginTop: '2rem',
              marginBottom: '2rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
          >
            CONTACT
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
            {/* Colonne gauche - Image */}
            <div className="flex items-center justify-center">
              <img
                src="/images/image_deco_5.jpg"
                alt="Contact NenaaPic"
                className="w-full h-full object-cover max-h-[600px] md:max-h-none"
                style={{
                  boxShadow: '#8a2be25e 0px 0px 60px 8px',
                }}
              />
            </div>

            {/* Colonne droite - Formulaire */}
            <div className="flex items-center">
              <form
                onSubmit={handleSubmit}
                className="w-full p-8 md:p-10"
                style={{
                  background: 'rgb(20 20 20 / 5%)',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid',
                  borderColor: 'rgb(255 255 255 / 0.3)',
                  borderRadius: '4px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 0 0 60px rgba(0, 0, 0, 0.15)',
                }}
              >
                <h2
                  className="text-gray-900 font-bold mb-2 tracking-wider"
                  style={{ fontSize: '2.2rem', textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}
                >
                  PARLONS ENSEMBLE
                </h2>
                <p className="text-gray-700 font-light mb-8 tracking-wide" style={{ textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 15px' }}>
                  Envoyez-moi un message et je vous répondrai dans les meilleurs délais.
                </p>

                {/* Nom */}
                <div className="mb-6">
                  <label className="block text-gray-900 text-sm font-light tracking-wide mb-2" style={{ textShadow: textShadowStyle }}>
                    VOTRE NOM
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-gray-900/30 text-gray-900 placeholder-gray-700/40 focus:outline-none focus:border-gray-900/60 transition-colors duration-300 py-2 font-light"
                    placeholder="Votre nom complet"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-gray-900 text-sm font-light tracking-wide mb-2" style={{ textShadow: textShadowStyle }}>
                    VOTRE EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-gray-900/30 text-gray-900 placeholder-gray-700/40 focus:outline-none focus:border-gray-900/60 transition-colors duration-300 py-2 font-light"
                    placeholder="votre@email.com"
                  />
                </div>

                {/* Téléphone */}
                <div className="mb-6">
                  <label className="block text-gray-900 text-sm font-light tracking-wide mb-2" style={{ textShadow: textShadowStyle }}>
                    TÉLÉPHONE (OPTIONNEL)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-900/30 text-gray-900 placeholder-gray-700/40 focus:outline-none focus:border-gray-900/60 transition-colors duration-300 py-2 font-light"
                    placeholder="+33 6 XX XX XX XX"
                  />
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label className="block text-gray-900 text-sm font-light tracking-wide mb-2" style={{ textShadow: textShadowStyle }}>
                    VOTRE MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-transparent border-b border-gray-900/30 text-gray-900 placeholder-gray-700/40 focus:outline-none focus:border-gray-900/60 transition-colors duration-300 py-2 font-light resize-none"
                    placeholder="Dites-moi tout..."
                  />
                </div>

                {/* Message de statut */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-300/30 border border-green-600/50 text-gray-900 text-sm font-light">
                    Merci! Votre message a été envoyé avec succès.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-300/30 border border-red-600/50 text-gray-900 text-sm font-light">
                    Une erreur est survenue. Veuillez réessayer.
                  </div>
                )}

                {/* Bouton */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 text-sm md:text-base border-2 border-gray-900 text-gray-900 font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'ENVOI EN COURS...' : 'ENVOYER'}
                </button>

                <p className="text-gray-700/70 text-xs font-light tracking-wide mt-6 text-center">
                  Nous traitons vos données avec respect. Voir notre politique de confidentialité.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
