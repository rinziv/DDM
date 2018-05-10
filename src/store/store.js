import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: 'test',
  },
  mutations: {},
  getters: {
    clusteringSimulation(/* state */) {
      return {
        data: [[1, 3],
          [1, 7],
          [0, 9],
          [9, 4],
          [7, 8],
          [6, 1],
          [0, 4],
          [6, 0],
          [6, 2],
          [1, 5]],
        iterations: [{
          centers: [[1, 7], [1, 5]],
          labels: [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        },
        {
          centers: [[2.6666666666666665, 8.0],
            [4.142857142857143, 2.7142857142857144]],
          labels: [1, 0, 0, 1, 0, 1, 1, 1, 1, 0],
        },
        {
          centers: [[2.25, 7.25], [4.666666666666667, 2.3333333333333335]],
          labels: [1, 0, 0, 1, 0, 1, 0, 1, 1, 0],
        },
        {
          centers: [[1.8, 6.6], [5.6, 2.0]],
          labels: [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
        },
        {
          centers: [[1.6666666666666667, 6.0], [6.75, 1.75]],
          labels: [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
        }],
      };
    },
  },
  actions: {},
});