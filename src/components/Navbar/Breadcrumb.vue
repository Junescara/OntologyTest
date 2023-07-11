<template>
  <!-- // 面包屑组件， separator为分割线，具体可以去elementPlus官网查看 -->
  <el-breadcrumb separator="/">
    <div class="breadcrumb-content">
      <!-- // 动画组件 -->
      <!-- [官网链接](https://cn.vuejs.org/guide/built-ins/transition.html) -->
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          class="breadcrumb-item"
          v-for="item in arr.breadCrumbList"
          :key="item.path"
        >
          <span
            v-if="item.path !== '/index'"
            :class="{ 'text-dark': themeStore.dark }"
          >
            {{ item.meta.title || item.meta.menuName }}
          </span>
          <a
            v-else
            :class="{ 'text-dark': themeStore.dark }"
            @click="handleLine(item)"
            >{{ item.meta.title || item.meta.menuName }}</a
          >
        </el-breadcrumb-item>
      </transition-group>
    </div>
  </el-breadcrumb>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, watch } from "vue";
import { usethemeStore } from "@/store/module/theme.js";
const themeStore = usethemeStore();

const router = useRouter();
const route = useRoute();

// 面包屑数据
let arr = reactive({
  breadCrumbList: [],
});

// 获取面包屑数据
const getBreadcrumbList = () => {
  console.log(route.matched);
  arr.breadCrumbList = [];
  if (route.path !== "/index")
    route.matched.forEach((item) => {
      if (item.meta.title || item.meta.menuName) arr.breadCrumbList.push(item);
    });
  // 判断是否存在首页默认数据，不存在就插入到数据首位
  if (!arr.breadCrumbList.length || arr.breadCrumbList[0].name !== "Dashboard")
    arr.breadCrumbList.unshift({
      path: "/index",
      meta: { title: "首页" },
    });
};

getBreadcrumbList();

// 监听路由变化
watch(route, () => {
  getBreadcrumbList();
});

// 面包屑跳转
const handleLine = ({ redirect, path }) => {
  redirect ? router.push(redirect) : router.push(path);
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/color.less");
.el-breadcrumb {
  height: 100%;
  display: flex;
  padding-left: 10px;
  line-height: 50px;
  // background-color: #fff;
}

.breadcrumb-item {
  margin-left: 8px;
}

.breadcrumb-content {
  position: relative;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
  right: -50px;
}
.text-dark {
  color: @dark-text-color !important;
}
</style>
