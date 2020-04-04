import Vue from 'vue'
import { ValidationProvider } from 'vee-validate'
import App from './App.vue'
import router from './routing/Router.js'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  ValidationProvider,
  vuetify,
  render: h => h(App),
}).$mount('#app')
