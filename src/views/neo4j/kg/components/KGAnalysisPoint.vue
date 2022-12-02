<template>
  <el-card class="box-card">
    <el-input placeholder="请输入内容" style="width: 300px">
      <el-button slot="append" icon="el-icon-search"/>
    </el-input>
<!--    <KGVisible></KGVisible>-->
    <KGVisibleVisNetwork></KGVisibleVisNetwork>
  </el-card>
</template>

<script>
import KGVisible from "./KGVisible";
import KGVisibleVisNetwork from "./KGVisibleVisNetwork";
export default {
  name: 'KGAnalysisPoint',
  components: {KGVisible,KGVisibleVisNetwork},
  mounted() {
  },
  methods:{

  }
}
</script>

<style scoped>
.box-card {
  margin-left: 20px;
  margin-right: 20px;
  height: 720px;
  background-color: lightgray;
}
</style>
