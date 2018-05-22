import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './assets/js/axios'
import store from './store'
import layer from 'layer-mobile'

Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;
Vue.layer = Vue.prototype.$layer = layer;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
});
