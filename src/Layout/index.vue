<template>
  <el-container >
    <el-aside width="auto">

    </el-aside>

    <el-container>

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

.el-aside {
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -moz-transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -o-transition: width 0.25s;
  overflow: visible;
}
.el-main {
  margin: 0px 0 0 0px;
  background-color: #fff;
  box-shadow: 0px 0px 0px 0px #c1c1c1;
}
</style>
