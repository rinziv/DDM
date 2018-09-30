<template>
  <div class="box box-danger flows">
    <div class="box-header with-border">
      <h3 class="box-title"><i class="fa fa-angle-right"></i> {{title}}</h3>
    </div>
    <div class="box-body">
      <slot></slot>
    </div>
    <!-- /.box-body -->

    <div class="box-footer">
      <!--todo: add an extensive description-->
      {{description}}
    </div>
    <!-- /.box-footer-->
    <!--<div class="overlay">-->
    <!--<i class="fa fa-refresh fa-spin"></i>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  name: 'BoxFrame',
  props: ['title', 'description'],
  data() {
    return {
    };
  },
};
</script>
