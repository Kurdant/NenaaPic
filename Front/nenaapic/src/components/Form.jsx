// Form Components
// Input fields, textarea, contact form

import { ButtonPrimary } from './Button';

export const Input = ({ label, type = "text", placeholder, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-neutral-dark font-medium mb-2">
        {label}
        {required && <span className="text-primary-blue ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full px-4 py-3 rounded-lg
          bg-white border border-neutral-border
          text-neutral-dark placeholder-neutral-light
          transition-all duration-300
          focus:outline-none focus:border-primary-blue focus:shadow-sm
        "
      />
    </div>
  );
};

export const Textarea = ({ label, placeholder, value, onChange, required = false, rows = 5 }) => {
  return (
    <div className="mb-4">
      <label className="block text-neutral-dark font-medium mb-2">
        {label}
        {required && <span className="text-primary-blue ml-1">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="
          w-full px-4 py-3 rounded-lg
          bg-white border border-neutral-border
          text-neutral-dark placeholder-neutral-light
          resize-vertical
          transition-all duration-300
          focus:outline-none focus:border-primary-blue focus:shadow-sm
        "
      />
    </div>
  );
};

export const ContactForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Nom"
        placeholder="Votre nom complet"
        required
      />
      <Input
        label="Email"
        type="email"
        placeholder="votre@email.com"
        required
      />
      <Textarea
        label="Message"
        placeholder="Parlez-moi de votre projet..."
        required
        rows={6}
      />
      <ButtonPrimary type="submit" className="w-full">
        Envoyer
      </ButtonPrimary>
    </form>
  );
};
