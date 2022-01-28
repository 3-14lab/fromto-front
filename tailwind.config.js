module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '13px': '13px',
        '19px': '19px',
        '20px': '20px',
        '28px': '28px',
        '30px': '30px',
        '49px': '49px',
        '50px': '50px',
        '51px': '51px',
        '382px': '382px',
        '400px': '400px',
      },
      backgroundImage: {
        'background': "url('/src/img/background.png')",
        'background-1': "url('/src/img/background-1.png')",
        'hero-sm': "url('/storage/img/sys/sm-hero.jpg')",
      },
      fontFamily: {
        // inter: 'Inter, sans-serif',
        poppins: 'Poppins, sans-serif',
        roboto: 'Roboto, sans-serif',
      }
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'blue': '#5429CC',
      'blue-light': '#6933FF',
      'title': '#374151',
      'body': '#969CB2',
      'shape': '#F0F2F5',
      'white': '#FFF',
      'green-200': '#7CEA9C',
      'green-800': '#43aa8b',
    }
  },
  plugins: [],
}
