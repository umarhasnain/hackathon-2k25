/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secandory: '#ffff',
      }
    },
    screens: {
      'mobile': '510px',
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
    }
  },
  plugins: [
    daisyui,
  ],
}