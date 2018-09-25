<template>
<div class="col-md-6">
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">kMeans Parameters</h3>
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
          <label class="col-sm-3 control-label">Centroid 1</label>

          <div class="col-sm-9">
            <el-input-number v-model="params.c1" :min="1" :max="10"></el-input-number>
            <span class="help-block">Index of first point to use as centroid</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">Centroid 2</label>

          <div class="col-sm-9">
            <el-input-number v-model="params.c2" :min="1" :max="10"></el-input-number>
            <span class="help-block">Index of second point to use as centroid</span>
          </div>

        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">Distance Function</label>

          <div class="col-sm-9">
            <select name="distanceFunction" id="inputDistance" v-model="params.distance">
              <option value="euclidean">Euclidean</option>
              <option value="manhattan">Manhattan</option>
            </select>
            <span class="help-block">Distance function to measure
              closeness of points to centroids</span>
          </div>
        </div>
      </div>
      <!-- /.box-body -->
      <div class="box-footer">
        <el-button type="primary" v-on:click="runComputation">Primary</el-button>
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
      <div id="kmeans-viz" class="col-md-12">
        <svg width='100%' height='430'></svg>
      </div>
    </div>
    <!-- /.box-body -->

    <div class="box-footer">
      Small description of the content of the box
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
import kmeansViz from './kmeans_component';

const d3 = require('d3');


export default {
  name: 'kMeans',
  data() {
    return {
      title: 'kMeans',
      kmviz: kmeansViz(),
      idxIteration: 0,
      params: {
        c1: 1,
        c2: 2,
        distance: 'euclidean',
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
            key: 'c1',
            type: 'integer',
            value: 1,
          },
          {
            key: 'c2',
            type: 'integer',
            value: 2,
          },
          {
            key: 'distance',
            type: 'distance_function',
            value: 'euclidean',
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
        distance_function: [
          {
            key: 'euclidean',
            label: 'Euclidean',
          },
          {
            key: 'cityblock',
            label: 'Manhattan',
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
      return this.$store.getters.kMeansSimulation;
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
      this.$store.dispatch('loadKMeansExperiment', this.params);
    },
  },
  watch: {
    clusteringSimulation(val) {
      d3.select('#kmeans-viz svg')
        .datum(val)
        .call(this.kmviz);
      this.kmviz.setIteration(0);
    },
    idxIteration(val) {
      this.kmviz.setIteration(val);
    },
  },
};
</script>
