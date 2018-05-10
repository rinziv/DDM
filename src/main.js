// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';

// Leaflet dependencies
import 'leaflet';
import 'leaflet/dist/leaflet.css';

import App from './App';
import router from './router';
import store from './store/store';


// eslint-disable-next-line
import 'va/lib/css';
// eslint-disable-next-line
import 'va/lib/script';


Vue.config.productionTip = false;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
