<template>
  <div>
    <h1>此页面为展示生成拓扑关系</h1>
    <el-steps :active="2" align-center>
      <el-step title="步骤1" description="选择出口断面和预报范围"></el-step>
      <el-step title="步骤2" description="对象关系拓扑展示"></el-step>
      <el-step title="步骤3" description="完成数据提取"></el-step>
    </el-steps>
    <el-form ref="form" label-width="80px" class="form">
      <el-form-item>
        <el-empty description="这里用来展示拓扑图"></el-empty>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toFinish">确定生成</el-button>
        <el-button @click="toChoose">取消生成</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
export default {
  name: "show",
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    toFinish() {
      this.$router.push({ path: '/workflow/finish'})
    },
    toChoose() {
      this.$router.push({ path: '/workflow/choose'})
    }
  }
}
</script>

<style scoped>
</style>
