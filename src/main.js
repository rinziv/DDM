// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';

import App from './App';
import router from './router';
// eslint-disable-next-line
import store from './store/store';


// eslint-disable-next-line
import 'va/lib/css';
// eslint-disable-next-line
import 'va/lib/script';
// eslint-disable-next-line
import 'element-ui/lib/theme-chalk/index.css';

import BoxFrame from '@/components/boxFrame';


Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(router);
Vue.component('boxFrame', BoxFrame);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
