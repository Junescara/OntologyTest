<template>
  <el-menu
    :default-active="route.fullPath"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
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
        v-show="subItem.meta.menu"
        :index="`/${subItem.path}`"
        >{{ subItem.meta.title }}</el-menu-item
      >
      
      
    </el-sub-menu>
    <!-- 菜单伸缩按钮 -->
    <el-button
      type="primary"
      :icon="buttonIcon"
      plain
      class="collapse"
      @click="isCollapse = !isCollapse"
    />
  </el-menu>
</template>

<script setup>
import { House, Document } from "@element-plus/icons-vue";
import { ref, watch, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { routes } from "@/router"; //菜单
import { usethemeStore } from "@/store/module/theme.js";

let activePath = ref("/index");
const route = useRoute();
const themeStore = usethemeStore();
let isCollapse = ref(false);
let buttonIcon = computed(() => {
  return isCollapse.value ? "ArrowRight" : "ArrowLeft";
});

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

<style scoped lang="less">
@button-width: 32px;
.el-menu-vertical-demo:not(.el-menu--collapse) {
  position: relative;
  /* width: 200px; */
  min-height: 400px;
  height: 100vh;
}

.el-menu {
  height: 100vh;
  transition: all 0.25s;
}
.collapse {
  position: absolute;
  width: @button-width;
  right: -(@button-width);
  top: 14vh;
}
</style>
