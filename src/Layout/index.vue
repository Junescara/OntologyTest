<template>
  <el-container class="layout-container-demo">
    <el-aside width="250px">
      <SideBar />
    </el-aside>

    <el-container>
  
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AppMain from './AppMain.vue';
//import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
</script>

<style lang="less" scoped>





.el-main {
  background-color: #fff;
}
</style>