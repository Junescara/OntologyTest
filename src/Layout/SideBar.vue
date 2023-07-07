<template>
  <el-menu
    :default-active="route.fullPath"
    class="el-menu-vertical-demo"
    active-text-color="#ffd04b"
    text-color="#fff"
    background-color="#545c64"
    router
  >
    <!-- 首页 -->
    <el-menu-item index="/index">
      <el-icon>
        <House />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <!-- 子菜单 -->
    <el-sub-menu index="/">
      <template #title>
        <el-icon>
          <Document />
        </el-icon>
        <span>平台功能</span>
      </template>
      <!-- 路由循环 -->
      <el-menu-item
        v-for="item in menus"
        v-show="item.menu === true"
        :index="`/${item.path}`"
        >{{ item.meta.title }}</el-menu-item
      >
      <!-- <el-menu-item index="/student">学生信息</el-menu-item>
      <el-menu-item index="/course">课程信息</el-menu-item>
      <el-menu-item index="/grade">选课信息</el-menu-item> -->
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { House, Document } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { children as menus } from "@/router"; //菜单

let activePath = ref("/index");
const route = useRoute();

// 更新当前所在菜单
watch(
  () => route.fullPath,
  (oldv, newv) => {
    activePath.value = newv;
  }
);
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 200px; */
  min-height: 400px;
  height: 100vh;
}

.el-menu {
  height: 100vh;
}
</style>
