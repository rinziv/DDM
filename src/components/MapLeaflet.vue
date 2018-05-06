<template>
  <div class="col-md-12">
    <div class="box box-danger flows" id="flows-map">
        <div class="box-header with-border">
          <div>
            <h3 class="box-title"><i class="fa fa-car"></i> {{title}}</h3>
          </div>
        </div>
        <div class="box-body">
          <div id="map-viz" style="height: 680px">
            <v-map ref="map" :zoom=13 :center="[41.89,12.51]">
              <v-tilelayer ref="pois"
              url="https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}"
              attribution='Imagery from <a href="http://giscience.uni-hd.de/">GIScience
                Research Group @ University of Heidelberg</a> &mdash;
                Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'/>


            </v-map>
          </div>
        </div><!-- /.box-body -->

        <div class="box-footer">
          Map Visualization
        </div><!-- /.box-footer-->
        <!--<div class="overlay">-->
        <!--<i class="fa fa-refresh fa-spin"></i>-->
        <!--</div>-->
      </div><!-- /.box -->
  </div>

</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

export default {
  name: 'MapLeaflet',
  components: {
    'v-map': Vue2Leaflet.LMap,
    'v-tilelayer': Vue2Leaflet.LTileLayer,
  },
  data() {
    return {
      title: 'Map',
    };
  },
};
</script>
