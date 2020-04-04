import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.pink.darken4, /* Vuetify component highlights. */
        secondary: colors.indigo.darken4, /* Heading text, footer, etc. */
        accent: colors.pink.darken4, /* Selected form elements */
      },
    },
  },
})
