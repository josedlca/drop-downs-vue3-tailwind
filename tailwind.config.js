module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing:{
        'n-2/4':'-50%'
      },
      colors:{
        'cm-light-gray': '#f3f4f6',
        'cm-dark-gray': '#344758',
        'lila': '#712ae8'
      }
    }
  },
  variants: {
    extend: {
      ringColor: ['focus-visible']
    },
  },
  plugins: [],
}
