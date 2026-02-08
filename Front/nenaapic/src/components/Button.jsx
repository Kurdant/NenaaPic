// Button Components
// Self-documenting, reusable button components

export const ButtonPrimary = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-primary-blue text-white
        px-8 py-3 rounded-lg
        font-medium transition-all duration-300
        hover:shadow-md hover:scale-102
        focus:outline-2 focus:outline-primary-blue focus:outline-offset-2
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export const ButtonSecondary = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-transparent border-2 border-primary-blue text-primary-blue
        px-8 py-2.5 rounded-lg
        font-medium transition-all duration-300
        hover:bg-primary-blue hover:text-white
        focus:outline-2 focus:outline-primary-blue focus:outline-offset-2
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export const ButtonAccent = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-primary-yellow text-neutral-dark
        px-8 py-3 rounded-lg
        font-semibold transition-all duration-300
        hover:shadow-md hover:brightness-95
        focus:outline-2 focus:outline-primary-yellow focus:outline-offset-2
        ${className}
      `}
    >
      {children}
    </button>
  );
};
