import Vue from 'vue';
import Router from 'vue-router';
import kMeans from '@/components/kMeans';
import aPriori from '@/components/apriori';
import DBScan from '@/components/DBScan';
import decisiontree from '@/components/decisiontree';

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
    {
      path: '/aPriori',
      name: 'aPriori`',
      component: aPriori,
    },
    {
      path: '/dbscan',
      name: 'aDBScan`',
      component: DBScan,
    },
    {
      path: '/decisiontree',
      name: 'decisiontree`',
      component: decisiontree,
    },
  ],
});
