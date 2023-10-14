<template>
  <el-container >
    <el-aside width="auto">
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
import AppMain from "./AppMain.vue";
import NavBar from "./NavBar.vue";
import SideBar from "./SideBar.vue";
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
  width: 100%;
  margin-bottom: 30px;
  margin-left: 1px;
}
.el-aside {
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -moz-transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -o-transition: width 0.25s;
  overflow: visible;
}
.el-main {
  height: 100px;
  margin: 30px 0 0 30px;
  background-color: #fff;
  box-shadow: 0px -2px 5px 3px #c1c1c1;
}
</style>
