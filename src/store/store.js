import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const instance = axios.create({
  baseURL: 'http://matlaspisa.isti.cnr.it:5005/api',
  // baseURL: 'http://localhost:5000/api',
});

function prepareRequestParameters(obj) {
  const params = new URLSearchParams();
  Object.keys(obj).forEach((k) => {
    params.append(k, obj[k]);
  });

  return params;
}

export default new Vuex.Store({
  state: {
    data: 'test',
    kMeansSimulation: {},
    DBScanSimulation: {},
    aPrioriSimulation: {},
    DecisionTreeSimulation: {},
  },
  mutations: {
    kMeansSimulation(state, payload) {
      state.kMeansSimulation = payload;
    },
    aPrioriSimulation(state, payload) {
      state.aPrioriSimulation = payload;
    },
    DBScanSimulation(state, payload) {
      state.DBScanSimulation = payload;
    },
    DecisionTreeSimulation(state, payload) {
      state.DecisionTreeSimulation = payload;
    },
  },
  getters: {
    kMeansSimulation(state) {
      return state.kMeansSimulation;
    },
    aPrioriSimulation(state) {
      return state.aPrioriSimulation;
    },
    DBScanSimulation(state) {
      return state.DBScanSimulation;
    },
    DecisionTreeSimulation(state) {
      return state.DecisionTreeSimulation;
    },
  },
  actions: {
    loadKMeansExperiment(context, payload) {
      const params = prepareRequestParameters(payload);
      instance.post('KmeansExperiment', params)
        .then((response) => {
          // console.log(response);
          context.commit('kMeansSimulation', response.data);
        });
    },
    loadAPrioriExperiment(context, payload) {
      const params = prepareRequestParameters(payload);
      instance.post('AprioriExperiment', params)
        .then((response) => {
          // console.log(response);
          context.commit('aPrioriSimulation', response.data);
        });
    },
    loadAnExperiment(context, payload) {
      const params = prepareRequestParameters(payload.params);
      instance.post(payload.link, params)
        .then((response) => {
          console.log(response.data);
          context.commit(payload.setter, response.data);
        });
    },

  },
});
