<template>
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar" style="height: auto;">
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu tree" data-widget="tree">
        <!-- <li class="header text-blue text-capitalize">Algorithms</li> -->
        <li class="treeview menu-open">
          <a href="#">
            <i class="fa fa-clock-o"></i> <span>Algorithms</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" style="display:block">
            <li><router-link to="/kMeans"><i class="fa fa-circle-o"></i>kMeans</router-link></li>
            <li><router-link to="/aPriori"><i class="fa fa-circle-o"></i>Apriori</router-link></li>
          </ul>
        </li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
    };
  },
};
</script>
