<template>
  <div class="container">
    <div class="row">
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">Decision Tree Parameters</h3>
        </div>
        <!-- /.box-header -->
        <!-- form start -->
        <div class="box-body">
          <el-form>
            <el-form-item label="Target" prop="target" label-position="left">
              <el-input v-model="params.target"></el-input>
            </el-form-item>
            <el-form-item label="Dataset" prop="dataset">
              <el-select v-model="params.dataset" placeholder="Dataset">
                <el-option
                  v-for="item in configuration.dataset"
                  :key="item.key"
                  :label="item.label" :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Split function" prop="split_function">
              <el-select v-model="params.split_function" placeholder="Split Function">
                <el-option
                  v-for="item in configuration.split_function"
                  :key="item.key"
                  :label="item.label" :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Min samples leaf">
              <el-input-number v-model="params.min_samples_leaf"
                               :min="1" size="small"></el-input-number>
            </el-form-item>
            <el-form-item label="Min samples split">
              <el-input-number v-model="params.min_samples_split"
                               :min="1" size="small"></el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <!--todo: include a check for parameters constraints -->
          <el-button type="primary" v-on:click="runComputation">Run...</el-button>
        </div>
        <!-- /.box-footer -->
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="box box-danger flows">
          <div class="box-header with-border">
            <h3 class="box-title"><i class="fa fa-angle-right"></i> Training set</h3>
          </div>
          <div class="box-body">
            <div v-if="simulation">
              <el-table
                :data="training"
                style="width: 100%">
                <el-table-column
                  label="Col 1" prop="col1">
                </el-table-column>
                <el-table-column
                  label="Col 2" prop="col2">
                </el-table-column>
                <el-table-column
                  label="Col 3" prop="col3">
                </el-table-column>
                <el-table-column
                  label="Col 4" prop="col4">
                </el-table-column>
              </el-table>
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
      <div class="col-md-6">
        <div class="box box-danger flows">
          <div class="box-header with-border">
            <h3 class="box-title"><i class="fa fa-angle-right"></i> Test set</h3>
          </div>
          <div class="box-body">
            <div v-if="simulation">
              <el-table
                :data="test"
                style="width: 100%">
                <el-table-column
                  label="Col 1" prop="col1">
                </el-table-column>
                <el-table-column
                  label="Col 2" prop="col2">
                </el-table-column>
                <el-table-column
                  label="Col 3" prop="col3">
                </el-table-column>
                <el-table-column
                  label="Col 4" prop="col4">
                </el-table-column>
              </el-table>
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
    </div>
  </div>
</template>

<script>

export default {
  name: 'kMeans',
  data() {
    return {
      title: 'Decision Tree',
      idxIteration: 0,
      params: {
        dataset: 'dataset1',
        target: 'Churn',
        split_function: 'me',
        min_samples_leaf: 1,
        min_samples_split: 2,
      },
      configuration: {
        parameters: [
          {
            key: 'dataset',
            type: 'dataset',
            value: 'dataset1',
          },
          {
            key: 'target',
            type: 'string',
            value: 'Churn',
          },
          {
            key: 'split_function',
            type: 'split_function',
            value: 'me',
          },
          {
            key: 'min_samples_leaf',
            type: 'integer',
            value: 1,
          },
          {
            key: 'min_samples_split',
            type: 'integer',
            value: 2,
          },
        ],
        dataset: [
          {
            key: 'dataset1',
            label: 'Dataset 1',
            path_train: 'resources/data/classification1train.csv',
            path_test: 'resources/data/classification1test.csv',
          },
        ],
        split_function: [
          {
            key: 'me',
            label: 'Misclassification Error',
          },
          {
            key: 'gini',
            label: 'Gini Index',
          },
        ],
      },
    };
  },
  mounted() {
    this.runComputation();
  },
  computed: {
    simulation() {
      return this.$store.getters.DecisionTreeSimulation;
    },
    training() {
      return this.simulation.train.map((r) => {
        const res = {};
        r.forEach((c, i) => {
          res[`col${i + 1}`] = c;
        });
        return res;
      });
    },
    test() {
      return this.simulation.test.map((r) => {
        const res = {};
        r.forEach((c, i) => {
          res[`col${i + 1}`] = c;
        });
        return res;
      });
    },
  },
  methods: {
    runComputation() {
      const payload = {
        params: this.params,
        link: 'DecisionTreeExperiment',
        setter: 'DecisionTreeSimulation',
      };
      this.$store.dispatch('loadAnExperiment', payload);
    },
  },
  watch: {
    simulation(val) {
      console.log(val);
    },
  },
};
</script>
