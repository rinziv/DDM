// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';

import App from './App';
import router from './router';


// eslint-disable-next-line
import 'vue2-admin-lte/src/lib/css';
// eslint-disable-next-line
import 'vue2-admin-lte/src/lib/script';

Vue.config.productionTip = false;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
