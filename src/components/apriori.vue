<template>
<div class="col-md-12">
  <div class="box box-danger flows">
    <div class="box-header with-border">
      <h3 class="box-title"><i class="fa fa-angle-right"></i>
        {{title}} - Minimum support: {{aprioriSimulation.min_supp}}; -
      Minimum confidence: {{aprioriSimulation.min_conf}};</h3>
    </div>
    <div class="box-body">
      <div id="apriori-viz" class="row">
        <div class="col-md-3">
          <h5>Dataset</h5>
          <div v-for="(b,i) in aprioriSimulation.data" :key="'b'+i">
            <el-tag size="small" v-for="a in b" :key="a"
            :color="colors(a)">{{a}}</el-tag>
          </div>
        </div>
        <div class="col-md-3" v-for="(it, i) in aprioriSimulation.itemsets" :key="'it'+i">
          <h5>Iteration {{i+1}}</h5>
          <div v-for="(is, j) in it" :key="'bi'+i+j" class="row">
            <el-tag v-bind:class="{ 'disabled': (is[2]==='X')}">
                <el-tag size="small" v-for="a in is[0]" :key="'bii'+a"
                  :color="colors(a)">{{a}}</el-tag>
                <span class="label"
                v-bind:class="{ 'bg-gray': (is[2]==='X'), 'bg-blue': (is[2]!=='X')}">
                {{'supp: ' + is[1]}}
                  <i v-if="is[2]==='X'" class="el-icon-error"></i>
                <i v-else class="el-icon-success"></i></span>
            </el-tag>
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
      title: 'aPriori',
      idxIteration: 0,
      colors: d3.scaleOrdinal(d3.schemePastel1),
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
