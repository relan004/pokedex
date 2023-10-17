/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  safelist: [
    { pattern: /bg-./ },
    { pattern: /text-./ },
    { pattern: /border-./ },
    { pattern: /to-./ },
    { pattern: /from-./ },
  ],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brown-100': '#E3DAC9',
        'brown-400': '#A87E62',
        'brown-500': '#6F4E37',
      },
    },
  },
}
