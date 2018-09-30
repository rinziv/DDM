<template>
<div id="app" class="wrapper">
  <header class="main-header">
    <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>DDM</b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">Didactic Data Mining</span>
    </a>
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
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
        <router-view></router-view>
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
import Sidebar from './components/Sidebar';
import kMeans from './components/kMeans';
import aPriori from './components/apriori';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Sidebar,
    kMeans,
    aPriori,
  },
  data() {
    return {
      title: 'My Skeleton App',
    };
  },
};
</script>

<style>
  g.polygons path{
    stroke: #999;
    opacity: 0.20;
  }

  .el-tag{
    margin-bottom:2px;
    margin-right: 2px;
    color: #222;
  }

  .el-tag.disabled{
    background-color: #ddd;
  }

  .el-tag .el-icon-error{
    color:darkgray;
  }

  .el-tag .el-icon-success{
    color: green;
  }

  .rule-box{
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(64,158,255,.1);
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid rgba(64,158,255,.2);
    border-radius: 4px;
  }

  .rule-box.disabled{
    background-color: lightgray;
  }

  #app .el-tree-node__content {
    height:auto;
  }
</style>
