import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.pink.darken4, /* Links, effects, text, etc. */
                secondary: colors.indigo.darken4, /* User defined elements, e.g. footer */
                accent: colors.green.darken1,
            }
        }
    }
});
