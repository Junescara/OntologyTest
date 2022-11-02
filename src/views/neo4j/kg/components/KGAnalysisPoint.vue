<template>
  <el-card class="box-card">
    <el-input placeholder="请输入内容" style="width: 300px">
      <el-button slot="append" icon="el-icon-search"/>
    </el-input>
    <el-empty description="这一块用来展示查出来的节点和关系"/>
  </el-card>
</template>

<script>
export default {
  name: 'KGAnalysisPoint'
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
