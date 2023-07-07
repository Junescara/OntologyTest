<template>
  <el-container class="layout-container-demo">
    <el-aside width="250px">
      <SideBar />
    </el-aside>

    <el-container>
      <el-header>
        <NavBar />
      </el-header>
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AppMain from './AppMain.vue';
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
</script>

<style lang="less" scoped>
@el-margin: 3%;

.el-header {
  padding: 0;
  width: 100%;
  background-color: #545c64;
}

.el-side,
.el-main,
.el-container {
  padding: 0;
  height: 100%;
  width: 100%;
}

.el-main {
  margin: @el-margin 0 0 @el-margin;
  background-color: #fff;
}
</style>