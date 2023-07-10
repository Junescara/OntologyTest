<template>
  <div class="tags-content">
    <div v-if="RouteTags.length !== 0">
      <el-tag
        v-for="(tag, index) in RouteTags"
        :key="index"
        closable
        size="small"
        :disable-transitions="false"
        @close="handleClose(index)"
        @click="router.push(tag.path)"
      >
        {{ tag.name }}
      </el-tag>
    </div>
    <div v-else>
      <el-tag
        size="small"
        :disable-transitions="false"
        @click="router.push('/index')"
        >首页</el-tag
      >
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const RouteTags = reactive([]);
const route = useRoute();
const router = useRouter();

// 监听路由变化
watch(route, (oldv, newv) => {
  console.log(newv);
  for (let i in RouteTags) if (RouteTags[i].path === newv.fullPath) return;
  RouteTags.push({ name: route.meta.title || "", path: route.fullPath });
});

const handleClose = (index) => {
  RouteTags.splice(index, 1);
};
</script>

<style lang="less" scoped>
.tags-content {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  background-color: #fff;
  .el-tag {
    height: 26px;
    margin: 5px 10px;
    cursor: pointer;
  }
}
</style>
