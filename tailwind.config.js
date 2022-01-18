module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-1': "url('/src/img/background-1.png')",
        'hero-sm': "url('/storage/img/sys/sm-hero.jpg')",
      },
      fontFamily: {
        inter: 'Inter, sans-serif',
      }
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'blue': '#5429CC',
      'blue-light': '#6933FF',
      'title': '#363F5F',
      'body': '#969CB2',
      'shape': '#F0F2F5',
      'white': '#FFF'
    }
  },
  plugins: [],
}
