<template>
  <el-container class="layout-container-demo">
    <el-aside width="250px">
      <SideBar />
    </el-aside>

    <el-container>
      <el-header>
        <Breadcrumb />
      </el-header>
      <el-header>
        <RouteTags />
      </el-header>
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AppMain from "./AppMain.vue";
import NavBar from "./NavBar.vue";
import SideBar from "./SideBar.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import RouteTags from "@/components/common/RouteTags.vue";
</script>

<style lang="less" scoped>
@el-margin: 3%;

.el-header {
  padding: 0;
  width: 100%;
  height: 8vh;
  &:nth-child(1) {
    box-shadow: 0px 2px 5px 3px #c1c1c1;
    border-bottom:1px solid #c1c1c1 ;
  }
  &:nth-child(2) {
    height: 6vh;
  }
  // background-color: #545c64;
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
  box-shadow: 0px -2px 5px 3px #c1c1c1;
}
</style>
