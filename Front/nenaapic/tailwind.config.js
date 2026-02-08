/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#4A90E2',
          yellow: '#F7DC6F',
        },
        deep: {
          blue: '#1A2B4A',
        },
        accent: {
          purple: '#8B7AB8',
          coral: '#FF9F87',
          mint: '#A8E6CF',
        },
        neutral: {
          cream: '#FAF8F5',
          'off-white': '#FDFCFA',
          dark: '#2C2C2C',
          light: '#6B6B6B',
          border: '#E8E4DD',
        },
        gold: '#D4AF37',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'h1': '4.5rem',     // 72px
        'h2': '3rem',       // 48px
        'h3': '2.25rem',    // 36px
        'body': '1.125rem', // 18px
        'small': '0.875rem',// 14px
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
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'soft': '0 20px 60px rgba(74, 144, 226, 0.15)',
        'sm': '0 2px 8px rgba(0,0,0,0.08)',
        'md': '0 4px 16px rgba(0,0,0,0.12)',
        'lg': '0 8px 24px rgba(0,0,0,0.16)',
        'xl': '0 16px 48px rgba(0,0,0,0.20)',
        '2xl': '0 25px 70px rgba(0,0,0,0.25)',
      },
      maxWidth: {
        'container': '1280px',
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
