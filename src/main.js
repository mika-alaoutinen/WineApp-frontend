import Vue from 'vue'
import App from './App.vue'
import router from './routing/Router.js'
import vuetify from './plugins/vuetify';
import { ValidationProvider } from 'vee-validate';

Vue.config.productionTip = false;

new Vue({
  router,
  ValidationProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app');