<template>
<div class="col-md-9">
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">Apriori Parameters</h3>
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
          <label class="col-sm-3 control-label">Min sup</label>

          <div class="col-sm-9">
            <el-input-number v-model="params.min_sup"
                             :min="0" :max="1"
                             :step="0.05" size="small"></el-input-number>
            <span class="help-block">Minimum support</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">Min conf</label>

          <div class="col-sm-9">
            <el-input-number v-model="params.min_conf"
                             :min="0" :max="1"
                             :step="0.05" size="small"></el-input-number>
            <span class="help-block">Minimum confidence</span>
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
  <boxFrame
    :title="`${this.title} - Minimum support: ${this.aprioriSimulation.parameters.min_sup}; -
      Minimum confidence: ${this.aprioriSimulation.parameters.min_conf}`"
    v-if="aprioriSimulation.itemsets">
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
      <div v-if="aprioriSimulation.rules.length > 0">
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
      <div v-else>There are no rules.</div>
    </div>
  </boxFrame>
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
      params: {
        dataset: 'dataset1',
        min_sup: 0.3,
        min_conf: 0.8,
      },
      configuration: {
        parameters: [
          {
            key: 'dataset',
            type: 'dataset',
            value: 'dataset1',
          },
          {
            key: 'min_sup',
            type: 'float',
            value: 0.3,
          },
          {
            key: 'min_conf',
            type: 'float',
            value: 0.8,
          },
        ],
        dataset: [
          {
            key: 'dataset1',
            label: 'Dataset 1',
            path: 'resources/data/patterns1.csv',
          },
          {
            key: 'dataset2',
            label: 'Dataset 2',
            path: 'resources/data/patterns2.csv',
          },
          {
            key: 'dataset3',
            label: 'Dataset 3',
            path: 'resources/data/patterns3.csv',
          },
        ],
      },
    };
  },
  mounted() {
  },
  computed: {
    aprioriSimulation() {
      // eslint-disable-next-line
      console.log(this.$store.getters.aPrioriSimulation);
      return this.$store.getters.aPrioriSimulation;
    },
  },
  methods: {
    runComputation() {
      this.$store.dispatch('loadAPrioriExperiment', this.params);
      this.idxIteration = 0;
    },
  },
};
</script>
