/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#e7f8ef',
        secondary: '#232020',
        // white: 'white',
        grayPrimary: '#f8f9fa',
        grayBorder: '#0000002d',
        grayText: '#718096',
        danger: '#dc3545',
        orange: '#e25032',
        accent1: '#4267a6',
        modal: '#0000002d',
        close: '#dee2e6',
      },
      boxShadow: {
        '3xl': ' 0 0 10px rgba(0, 0, 0, 0.2)',
        '5xl': ' 0 0 10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
