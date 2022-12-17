// import '../main.scss'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

export default createVuetify({
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
