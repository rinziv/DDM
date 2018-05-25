<template>
<div class="col-md-12">
  <div class="box box-danger flows">
    <div class="box-header with-border">
      <h3 class="box-title"><i class="fa fa-angle-right"></i>
        {{title}} - Minimum support: {{aprioriSimulation.min_supp}}; -
      Minimum confidence: {{aprioriSimulation.min_conf}};</h3>
    </div>
    <div class="box-body">
      <div class="block">
        <span class="demonstration">Select iteration</span>
        <el-slider
          v-model="idxIteration"
          :step="1"
          :min = "0" :max="aprioriSimulation.itemsets.length +1"
          show-stops show-input>
        </el-slider>
      </div>
      <div id="apriori-viz" class="row">
        <div class="col-md-3">
          <h5>Dataset</h5>
          <div v-for="(b,i) in aprioriSimulation.data" :key="'b'+i">
            <el-tag size="small" v-for="a in b" :key="a"
            :color="colors(a)">{{a}}</el-tag>
          </div>
        </div>
        <div class="col-md-3" v-for="(it, i) in aprioriSimulation.itemsets" :key="'it'+i">
          <h5 v-if="i < idxIteration">Iteration {{i+1}}</h5>
          <div v-if="i < idxIteration" v-for="(is, j) in it" :key="'bi'+i+j" class="row">
            <el-tag v-bind:class="{ 'disabled': (is[2]==='X')}">
                <el-tag size="small" v-for="a in is[0]" :key="'bii'+a"
                  :color="colors(a)">{{a}}</el-tag>
                <span>
                {{'supp: ' + is[1]}}
                  <i v-if="is[2]==='X'" class="el-icon-error"></i>
                <i v-else class="el-icon-success"></i></span>
            </el-tag>
          </div>
        </div>
      </div>
      <div v-if="aprioriSimulation.itemsets.length < idxIteration" class="col-md-12">
        <h5>Rules</h5>
        <div class="col-md-3 rule-box"
        v-for="(r, i) in aprioriSimulation.rules" :key="'r'+i"
        v-bind:class="{ 'disabled': (r[3]==='X')}">
          <span class="pull-right">
            <i v-if="r[3]==='X'" class="el-icon-error"></i>
            <i v-else class="el-icon-success"></i>
          </span>
          <div class="rule">
            <el-tag size="small" v-for="a in r[0]" :key="'rh'+a"
              :color="colors(a)">{{a}}</el-tag>
            <i class="fa fa-long-arrow-right"></i>
            <el-tag size="small" v-for="a in r[1]" :key="'rb'+a"
              :color="colors(a)">{{a}}</el-tag>
          </div>
          <div class="confidence row">
            <div class="col-xs-6">
              Conf: {{format(r[2])}}
            </div>
            <div class="col-xs-6">
              Lift: {{format(r[4])}}
            </div>
          </div>
        </div>
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
const d3 = require('d3');

export default {
  name: 'aPriori',
  data() {
    return {
      title: 'Apriori',
      idxIteration: 0,
      colors: d3.scaleOrdinal(d3.schemePastel1),
      format: d3.format('.3f'),
    };
  },
  mounted() {
  },
  computed: {
    aprioriSimulation() {
      // eslint-disable-next-line
      console.log(this.$store.getters.aprioriSimulation);
      return this.$store.getters.aprioriSimulation;
    },
  },
  watch: {
  },
};
</script>
