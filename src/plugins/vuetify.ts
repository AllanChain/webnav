import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases, // used by some Vuetify internals
    sets: { mdi }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: colors.indigo.base
        }
      },
      dark: {
        colors: {
          primary: colors.indigo.base
        }
      }
    }
  }
})
