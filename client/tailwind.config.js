/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#599f3d',
        primaryDark: '#212529',
        white: '#ffffff',
        grayPrimary: '#f8f9fa',
        grayBorder: '#0000002d',
        grayText: '#718096',
        danger: '#dc3545',
        orange: '#fd7e14',
        progress: '#e9ecef',
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
