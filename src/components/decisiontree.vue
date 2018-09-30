<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
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
    </div>
    <div class="row">
      <div class="col-md-6">
        <boxFrame title="Training set">
          <div v-if="simulation">
            <el-table
              :data="training" size="mini"
              style="width: 100%">
              <el-table-column v-for="c in columns" :key="c.prop"
                               :label="c.label" :prop="c.prop"
              ></el-table-column>
            </el-table>
          </div>
        </boxFrame>
      </div>
      <div class="col-md-6">
        <boxFrame title="Test set">
          <div v-if="simulation">
            <el-table
              :data="test" size="mini"
              style="width: 100%">
              <el-table-column v-for="c in columns" :key="c.prop"
                :label="c.label" :prop="c.prop"
              ></el-table-column>
            </el-table>
          </div>
        </boxFrame>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <boxFrame title="Tree model">
          <el-tree :data="tree"
                   :props="defaultProps"
                   :default-expand-all="true"
                   :render-content="renderNode"
                   :expand-on-click-node="false"
                   :highlight-current="true"
                   @node-click="handleNodeClick"></el-tree>
        </boxFrame>
      </div>
      <div class="col-md-6">
        <boxFrame title="Explanation">
          <div class="row">
            <div v-if="childrenGains" class="col-md-12">
                <el-table
                  :data="childrenGains" size="mini"
                  max-height="250"
                  :default-sort = "{prop: 'gain', order: 'descending'}"
                  style="width: 100%">
                  <el-table-column
                    label="Attribute" prop="attribute">
                  </el-table-column>
                  <el-table-column
                    label="Gain" prop="gain">
                  </el-table-column>
                </el-table>
            </div>
          </div>
          <pre>{{selectedNode.calculus}}</pre>
        </boxFrame>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DecisionTree',
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
      defaultProps: {
        'node-key': 'name',
        children: 'children',
        label: this.treeLabel,
      },
      selectedNode: {}, // the node clicked on the tree
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
      return this.dataset('train');
    },
    test() {
      return this.dataset('test');
    },
    columns() {
      // todo: make this dynamic and linked with REST service
      return ['Contract', 'Sex', 'Minutes', 'Churn'].map((v, i) => ({
        label: v,
        prop: `col${i+1}`,
      }));
    },
    tree() {
      return [this.simulation.tree];
    },
    childrenGains() {
      if (this.selectedNode.children_gain) {
        return Object.entries(this.selectedNode.children_gain)
          .map(e => ({
            attribute: e[0].split('#').join(': '),
            gain: e[1],
          }));
      }

      return false;
    },
    dataset() {
      return field => this.simulation[field].map((r) => {
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
    handleNodeClick(data) {
      console.log(data);
      this.selectedNode = data;
    },
    treeLabel(data) {
      // Root_Contract#Travel-Young&Classic?Travel-Young_Minutes#50?<=50.0
      const n = data.name;
      const levels = n.split('_');
      const ll = levels[levels.length - 1]; // get last level
      const tc = ll.split('?')[1];


      return levels.length > 1 ? `is ${tc}?` : 'Root';
    },
    renderNode(createElement, payload) {
      console.log('payload', payload);

      const elements = [
        createElement('h4', this.treeLabel(payload.data)),
        createElement('h5', `Classes: ${Object.entries(payload.data.values)
          .map(e => e.join(': '))
          .join(', ')}`),
      ];

      if (payload.node.childNodes.length > 0) {
        const fc = payload.node.childNodes[0].data.name; // get first child
        const cl = fc.split('_'); // get child levels
        const ll = cl[cl.length - 1]; // get last level
        const tc = ll.split('?')[0].split('#');

        elements.push(
          createElement('h5', `Test class: ${tc[0]} (${tc[1]})`),
        );
      }

      return createElement('div', {}, elements);
    },
  },
  watch: {
    simulation(val) {
      console.log(val);
    },
  },
};
</script>
