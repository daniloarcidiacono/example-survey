import Vue from 'vue';
import App from './App.vue';
import filters from '@/shared/filters';
import router from './router';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
Vue.use(filters);

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
