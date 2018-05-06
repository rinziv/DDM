<template>
<div id="app" class="wrapper">
  <header class="main-header">
    <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>VA</b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Visual Analytics</b> Dash</span>
    </a>
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <Sidebar></Sidebar>
  <!-- Full Width Column -->
  <div class="content-wrapper">
    <div class="no-container">
      <!-- Content Header (Page header) -->
      <section class="content-header">


      </section>

      <!-- Main content -->
      <section class="content">
        <div class="row">
          <HelloWorld></HelloWorld>
        </div>
        <div class="row">
          <MapLeaflet></MapLeaflet>
        </div>
      </section>
      <!-- /.content -->
    </div>
    <!-- /.container -->
  </div>
  <!-- /.content-wrapper -->
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import MapLeaflet from './components/MapLeaflet';
import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  components: {
    HelloWorld,
    MapLeaflet,
    Sidebar,
  },
  data() {
    return {
      title: 'My Skeleton App',
    };
  },
};
</script>

<style>

</style>
