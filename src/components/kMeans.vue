<template>
<div class="col-md-9">
  <div class="box box-danger flows">
    <div class="box-header with-border">
      <h3 class="box-title"><i class="fa fa-angle-right"></i> {{title}}</h3>
    </div>
    <div class="box-body">
      <p>There are {{testdata.length}} points</p>
      <div id="kmeans-viz">
        <svg width='100%' height='400'></svg>
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
      testdata: [
        [1, 3],
        [1, 7],
        [0, 9],
        [9, 4],
        [7, 8],
        [6, 1],
        [0, 4],
        [6, 0],
        [6, 2],
        [1, 5],
      ],
      iterations: [
        {
          centers: [
            [1, 7],
            [1, 5],
          ],
          labels: [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        },
        {
          centers: [
            [2.6666666666666665, 8.0],
            [4.142857142857143, 2.7142857142857144],
          ],
          labels: [1, 0, 0, 1, 0, 1, 1, 1, 1, 0],
        },
        {
          centers: [
            [2.25, 7.25],
            [4.666666666666667, 2.3333333333333335],
          ],
          labels: [1, 0, 0, 1, 0, 1, 0, 1, 1, 0],
        },
        {
          centers: [
            [1.8, 6.6],
            [5.6, 2.0],
          ],
          labels: [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
        },
        {
          centers: [
            [1.6666666666666667, 6.0],
            [6.75, 1.75],
          ],
          labels: [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
        },
      ],
    };
  },
  mounted() {
    d3.select('#kmeans-viz svg')
      .datum({
        dataset: this.testdata,
        iterations: this.iterations,
      })
      .call(this.kmviz);
    this.kmviz.setIteration(1);
  },
};
</script>
