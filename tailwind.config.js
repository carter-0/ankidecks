/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        "sg": { "max": "1024px" },
        "smp": { "max": "640px" },
        'lgp': '420px',
        'llgp': '390px',
        'llmp': '500px',
        'lmp': {'max': '500px'},
        'smp': {'max': '420px'},
        'ssmp': {'max': '390px'}
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
}
