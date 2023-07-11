<template>
  <el-menu
    :default-active="route.fullPath"
    class="el-menu-vertical-demo"
    :active-text-color="themeColors.data.activeText"
    :text-color="themeColors.data.text"
    :background-color="themeColors.data.backgroundColor"
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
    <el-sub-menu v-for="item in routes" index="/">
      <template #title>
        <el-icon>
          <Document />
        </el-icon>
        <span>{{ item.meta.menuName }}</span>
      </template>
      <!-- 路由循环 -->
      <el-menu-item
        v-for="subItem in item.children"
        v-show="subItem.menu === true"
        :index="`/${subItem.path}`"
        >{{ subItem.meta.title }}</el-menu-item
      >
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { House, Document } from "@element-plus/icons-vue";
import { ref, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import { routes } from "@/router"; //菜单
import { usethemeStore } from "@/store/module/theme.js";

let activePath = ref("/index");
const route = useRoute();
const themeStore = usethemeStore();

let themeColors = reactive({
  data: themeStore.dark ? themeStore.darkColor : themeStore.brightColor,
});
// 监听模式变化
watch(
  () => themeStore.dark,
  (newv) => {
    newv
      ? (themeColors.data = themeStore.darkColor)
      : (themeColors.data = themeStore.brightColor);
  }
);
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
