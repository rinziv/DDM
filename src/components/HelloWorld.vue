<template>
  <div class="col-md-9">
    <div class="box box-danger flows">
      <div class="box-header with-border">
        <h3 class="box-title"><i class="fa fa-angle-right"></i> {{title}}</h3>
      </div>
      <div class="box-body">
        <h3></h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.</p>
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
export default {
  name: 'HelloWorld',
  data() {
    return {
      title: 'Welcome to Your Vue.js App',
    };
  },
};
</script>
