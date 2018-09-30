<template>
  <div>
    <div class="row">
      <div class="col-md-9">
        <boxFrame title="DBScan Parameters">
          <div class="form-group">
            <label class="col-sm-3 control-label">Dataset</label>
            <div class="col-sm-9">
              <el-select v-model="params.dataset">
                <el-option
                  v-for="item in configuration.dataset"
                  :key="item.key"
                  :label="item.label" :value="item.key"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">Eps</label>

            <div class="col-sm-9">
              <el-input-number v-model="params.eps" :min="1"
                               :max="10" :step="0.1" size="small"></el-input-number>
              <span class="help-block">Epsilon: the distance to search for neighbors</span>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">Min Points</label>

            <div class="col-sm-9">
              <el-input-number v-model="params.min_pts"
                               :min="1" :max="10" size="small"></el-input-number>
              <span class="help-block">The minimum number of points with
              the radius Eps to label a point as core</span>
            </div>
          </div>
          <div class="block"><el-button type="primary" v-on:click="runComputation">Run...</el-button></div>
        </boxFrame>
      </div>
    </div>
    <div class="row">
      <div class="col-md-9">
        <boxFrame :title="title">
          <div class="block">
            <span class="demonstration">Select iteration</span>
            <el-slider
              v-model="idxIteration"
              :step="1"
              :min = "0" :max="numIterations"
              show-stops show-input>
            </el-slider>
          </div>
          <div ref="dbscan-viz" class="col-md-12">
            <svg width='100%' height='430'></svg>
          </div>
        </boxFrame>
      </div>
    </div>
  </div>
</template>

<script>
import dbscanViz from './dbscan_component';

const d3 = require('d3');


export default {
  name: 'DBScan',
  data() {
    return {
      title: 'DBScan',
      dbsviz: dbscanViz(),
      idxIteration: 0,
      params: {
        eps: 1.8,
        min_pts: 3,
        dataset: 'dataset1',
      },
      configuration: {
        parameters: [
          {
            key: 'dataset',
            type: 'dataset',
            value: 'dataset1',
          },
          {
            key: 'eps',
            type: 'float',
            value: 1.8,
          },
          {
            key: 'min_pts',
            type: 'integer',
            value: 3,
          },
        ],
        dataset: [
          {
            key: 'dataset1',
            label: 'Dataset 1',
            path: 'resources/data/clustering1.csv',
          },
          {
            key: 'dataset2',
            label: 'Dataset 2',
            path: 'resources/data/clustering2.csv',
          },
          {
            key: 'dataset3',
            label: 'Dataset 3',
            path: 'resources/data/clustering3.csv',
          },
        ],
      },
    };
  },
  // mounted() {
  //   //this.runComputation();
  // },
  computed: {
    clusteringSimulation() {
      return this.$store.getters.DBScanSimulation;
    },
    numIterations() {
      const ni = this.clusteringSimulation;
      if (ni && ni.iterations) {
        return ni.iterations.length - 1;
      }

      return 0;
    },
  },
  methods: {
    runComputation() {
      const payload = {
        params: this.params,
        link: 'DbscanExperiment',
        setter: 'DBScanSimulation',
      };
      this.$store.dispatch('loadAnExperiment', payload);
      this.dbsviz.setIteration(0);
    },
  },
  watch: {
    clusteringSimulation(val) {
      d3.select(this.$refs['dbscan-viz']).select('svg')
        .datum(val)
        .call(this.dbsviz);
      this.dbsviz.setIteration(0);
    },
    idxIteration(val) {
      this.dbsviz.setIteration(val);
    },
  },
};
</script>
