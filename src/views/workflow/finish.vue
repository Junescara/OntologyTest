<template>
  <div>
    <h1>此页面为完成数据提取页面</h1>
    <el-steps :active="3" align-center>
      <el-step title="步骤1" description="选择出口断面和预报范围"></el-step>
      <el-step title="步骤2" description="对象关系拓扑展示"></el-step>
      <el-step title="步骤3" description="完成数据提取"></el-step>
    </el-steps>

    <el-form ref="form" label-width="80px" class="form">
      <el-form-item>
        <el-empty description="数据提取中，请等待......"></el-empty>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="finish">结束</el-button>
      </el-form-item>
    </el-form>

  </div>


</template>

<script>
export default {
  name: "finish",
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    finish() {
      this.$router.push({ path: '/workflow/choose'})
    }
  }
}
</script>

<style scoped>

</style>
