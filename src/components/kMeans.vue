<template>
<div class="col-md-6">
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
          :min = "0" :max="clusteringSimulation.iterations.length -1"
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
    };
  },
  mounted() {
    d3.select('#kmeans-viz svg')
      .datum(this.clusteringSimulation)
      .call(this.kmviz);
    this.kmviz.setIteration(0);
  },
  computed: {
    clusteringSimulation() {
      return this.$store.getters.clusteringSimulation;
    },
  },
  watch: {
    idxIteration(val) {
      this.kmviz.setIteration(val);
    },
  },
};
</script>
