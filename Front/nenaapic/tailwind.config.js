/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1E3A5F',
          yellow: '#F4D35E',
        },
        neutral: {
          black: '#0F1419',
          cream: '#FAFAF8',
          gray: '#2C3E50',
        },
        // Legacy colors (kept for compatibility)
        deep: {
          blue: '#1A2B4A',
        },
        accent: {
          purple: '#8B7AB8',
          coral: '#FF9F87',
          mint: '#A8E6CF',
        },
        gold: '#D4AF37',
      },
      fontFamily: {
        heading: ['Didot', 'Didot LT STD', 'GFS Didot', 'serif'],
        body: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'h1': '3rem',       // 48px
        'h2': '2.25rem',    // 36px
        'h3': '1.75rem',    // 28px
        'h4': '1.25rem',    // 20px
        'body': '1rem',     // 16px
        'small': '0.875rem',// 14px
        'caption': '0.75rem', // 12px
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '120px',
        'section': '150px', // Section-to-section spacing
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'soft': '0 20px 60px rgba(30, 58, 95, 0.15)',
        'sm': '0 2px 8px rgba(0,0,0,0.08)',
        'md': '0 4px 16px rgba(0,0,0,0.12)',
        'lg': '0 8px 24px rgba(0,0,0,0.16)',
        'xl': '0 16px 48px rgba(0,0,0,0.20)',
        '2xl': '0 25px 70px rgba(0,0,0,0.25)',
        'hover': '0 20px 40px rgba(30, 58, 95, 0.2)',
      },
      maxWidth: {
        'container': '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        'DEFAULT': '400ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
