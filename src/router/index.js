import Vue from 'vue';
import Router from 'vue-router';
import kMeans from '@/components/kMeans';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'kMeans',
      component: kMeans,
    },
    {
      path: '/kMeans',
      name: 'kMeans',
      component: kMeans,
    },
  ],
});
