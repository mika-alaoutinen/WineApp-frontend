import Vue from 'vue'
import App from './App.vue'
import router from './routing/Router.js'
import { ValidationProvider } from 'vee-validate';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  ValidationProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')