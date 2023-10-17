<template>
  <!-- 导航栏 -->
  <el-row class="navbar" :class="{ 'bgc-dark': themeStore.dark }">
    <el-col :span="12"><Breadcrumb /></el-col>
    <el-col :span="12"><Personal /></el-col>
  </el-row>
  <!-- <el-row class="navbar" :class="{ 'bgc-dark': themeStore.dark }">
    <RouteTags />
  </el-row> -->
  <!-- 导航栏结束 -->
</template>

<script setup>
import Breadcrumb from "@/components/Navbar/Breadcrumb.vue";
import RouteTags from "@/components/Navbar/RouteTags.vue";
import Personal from "@/components/Navbar/Personal.vue";
import { usethemeStore } from "@/store/module/theme.js";

const themeStore = usethemeStore();
</script>

<style scoped lang="less">
@import url("../assets/css/color.less");
.navbar {
  // padding: 0;
  // width: 100%;
  // height: 8vh;
  // background-color: #fff;
  // &:nth-child(1) {
  //   border-bottom: 1px solid #c1c1c1;
  // }
  // &:nth-child(2) {
  //   height: 6vh;
  //   // box-shadow: 0px 2px 5px 3px #c1c1c1;
  // }
}
.bgc-dark {
  background-color: @dark-bgc-color;
}
</style>
