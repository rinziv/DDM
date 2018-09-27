<template>
<div class="col-md-8">
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">DBScan Parameters</h3>
    </div>
    <!-- /.box-header -->
    <!-- form start -->
    <form class="form-horizontal">
      <div class="box-body">
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
            <el-input-number v-model="params.eps" :min="1" :max="10" size="small"></el-input-number>
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
      </div>
      <!-- /.box-body -->
      <div class="box-footer">
        <!--todo: include a check for parameters constraints -->
        <el-button type="primary" v-on:click="runComputation">Run...</el-button>
      </div>
      <!-- /.box-footer -->
    </form>
  </div>
  <div class="box box-danger flows">
    <div class="box-header with-border">
      <h3 class="box-title"><i class="fa fa-angle-right"></i> {{title}}</h3>
    </div>
    <div class="box-body">
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
    </div>
    <!-- /.box-body -->

    <div class="box-footer">
      Small description of the content of the box
      <!--todo: add an extensive description-->
    </div>
    <!-- /.box-footer-->
    <!--<div class="overlay">-->
    <!--<i class="fa fa-refresh fa-spin"></i>-->
    <!--</div>-->
  </div>
  <!-- /.box -->
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
    },
  },
  watch: {
    clusteringSimulation(val) {
      d3.select(this.$refs['dbscan-viz']).select('svg')
        .datum(val)
        .call(this.dbsviz);
      // this.dbsviz.setIteration(0);
    },
    idxIteration(val) {
      this.dbsviz.setIteration(val);
    },
  },
};
</script>
